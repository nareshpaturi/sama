import { Phase, PatternConfig, PHASES } from './types';

export type EngineState = 'idle' | 'running' | 'paused' | 'done';

export interface EngineEvents {
  onPhaseStart: (phase: Phase, cycle: number, durationMs: number) => void;
  onTick: (
    phase: Phase,
    cycle: number,
    phaseElapsedMs: number,
    phaseDurationMs: number,
    totalElapsedMs: number,
  ) => void;
  onComplete: () => void;
}

export interface EngineSnapshot {
  state: EngineState;
  phase: Phase;
  cycle: number; // 1-based
  totalCycles: number;
  phaseElapsedMs: number;
  phaseDurationMs: number;
  totalElapsedMs: number;
  totalDurationMs: number;
}

interface ScheduledPhase {
  phase: Phase;
  durationMs: number;
}

/**
 * Drift-free breathing timer.
 *
 * Instead of chaining timeouts (which drift), every tick recomputes position
 * from wall-clock timestamps, so animation, tones and haptics stay aligned
 * with the true phase schedule — even across pause/resume.
 */
export class BreathingEngine {
  private schedule: ScheduledPhase[];
  private cycleMs: number;
  private totalMs: number;
  private totalCycles: number;
  private events: EngineEvents;

  private state: EngineState = 'idle';
  private timer: ReturnType<typeof setInterval> | null = null;
  private startStamp = 0;
  private pausedAccumMs = 0;
  private pauseStamp = 0;
  private lastPhaseGlobalIndex = -1;

  constructor(pattern: PatternConfig, totalCycles: number, events: EngineEvents) {
    this.totalCycles = Math.max(1, Math.floor(totalCycles));
    this.events = events;
    this.schedule = PHASES.map((phase) => ({
      phase,
      durationMs: Math.round(pattern[`${phase}Sec` as keyof PatternConfig] * 1000),
    })).filter((s) => s.durationMs > 0);
    if (this.schedule.length === 0) {
      this.schedule = [{ phase: 'inhale', durationMs: 4000 }];
    }
    this.cycleMs = this.schedule.reduce((sum, s) => sum + s.durationMs, 0);
    this.totalMs = this.cycleMs * this.totalCycles;
  }

  getState(): EngineState {
    return this.state;
  }

  start(): void {
    if (this.state === 'running') return;
    this.stopTimer();
    this.state = 'running';
    this.startStamp = Date.now();
    this.pausedAccumMs = 0;
    this.lastPhaseGlobalIndex = -1;
    this.tick();
    this.timer = setInterval(() => this.tick(), 100);
  }

  pause(): void {
    if (this.state !== 'running') return;
    this.state = 'paused';
    this.pauseStamp = Date.now();
    this.stopTimer();
  }

  resume(): void {
    if (this.state !== 'paused') return;
    this.pausedAccumMs += Date.now() - this.pauseStamp;
    this.state = 'running';
    this.tick();
    this.timer = setInterval(() => this.tick(), 100);
  }

  /** Stops the engine without firing onComplete. */
  stop(): void {
    this.stopTimer();
    if (this.state !== 'done') this.state = 'idle';
  }

  snapshot(): EngineSnapshot {
    const totalElapsedMs = this.elapsedMs();
    const { phaseIndex, cycle, phaseElapsedMs } = this.locate(totalElapsedMs);
    const scheduled = this.schedule[phaseIndex];
    return {
      state: this.state,
      phase: scheduled.phase,
      cycle,
      totalCycles: this.totalCycles,
      phaseElapsedMs,
      phaseDurationMs: scheduled.durationMs,
      totalElapsedMs: Math.min(totalElapsedMs, this.totalMs),
      totalDurationMs: this.totalMs,
    };
  }

  private elapsedMs(): number {
    if (this.state === 'idle') return 0;
    if (this.state === 'done') return this.totalMs;
    const now = this.state === 'paused' ? this.pauseStamp : Date.now();
    return Math.max(0, now - this.startStamp - this.pausedAccumMs);
  }

  private locate(totalElapsedMs: number): {
    phaseIndex: number;
    globalIndex: number;
    cycle: number;
    phaseElapsedMs: number;
  } {
    const clamped = Math.min(totalElapsedMs, this.totalMs - 1);
    const globalIndex = Math.floor(clamped / this.cycleMs) * this.schedule.length;
    let within = clamped % this.cycleMs;
    let phaseIndex = 0;
    for (let i = 0; i < this.schedule.length; i++) {
      if (within < this.schedule[i].durationMs) {
        phaseIndex = i;
        break;
      }
      within -= this.schedule[i].durationMs;
      phaseIndex = i;
    }
    const cycle = Math.min(this.totalCycles, Math.floor(clamped / this.cycleMs) + 1);
    return { phaseIndex, globalIndex: globalIndex + phaseIndex, cycle, phaseElapsedMs: within };
  }

  private tick(): void {
    const totalElapsedMs = this.elapsedMs();
    if (totalElapsedMs >= this.totalMs) {
      this.state = 'done';
      this.stopTimer();
      this.events.onComplete();
      return;
    }
    const { phaseIndex, globalIndex, cycle, phaseElapsedMs } = this.locate(totalElapsedMs);
    const scheduled = this.schedule[phaseIndex];
    if (globalIndex !== this.lastPhaseGlobalIndex) {
      this.lastPhaseGlobalIndex = globalIndex;
      this.events.onPhaseStart(scheduled.phase, cycle, scheduled.durationMs);
    }
    this.events.onTick(
      scheduled.phase,
      cycle,
      phaseElapsedMs,
      scheduled.durationMs,
      totalElapsedMs,
    );
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
