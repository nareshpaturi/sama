---
name: sama-implementation-standards
description: Implement or review Sama app features using established React Native, Expo, TypeScript, accessibility, testing, and mobile-platform practices. Use for changes under app/, src/, native configuration, tests, or implementation planning. Enforces small reusable modules, design-system reuse, simple composition, and concise code instead of duplicated or verbose implementations.
---

# Sama implementation standards

Use these rules whenever implementing or reviewing production code for Sama.

## Start with repository evidence

1. Read the relevant PRD, UX handoff, implementation checkpoint, existing code, and tests before editing.
2. Treat `docs/product-requirements.html` as the scope authority, `docs/ux-design.html` as the interaction authority, `docs/branding-design.html` as the visual authority, and `src/theme.ts` as the runtime token source.
3. Follow the lean MVP boundary. Do not add post-MVP features, abstractions for hypothetical features, or dependencies without a current requirement.
4. Prefer platform and framework guidance from official React Native, Expo, Apple, Android, and W3C/WAI sources when repository evidence is insufficient. Label assumptions and verify version compatibility before adopting an API.

## Design modules around responsibilities

- Keep route and screen files focused on composition, navigation, and screen-level state.
- Put domain behavior in focused modules such as timer engines, reducers, repositories, selectors, and adapters.
- Put reusable presentation and interaction patterns in shared components.
- Keep native HealthKit and Health Connect behavior behind a platform-neutral interface.
- Keep persistence behind repositories; UI code must not issue raw storage or database operations.
- Keep time calculations pure and deterministic. Animation observes timer state and never owns elapsed time.
- Prefer pure functions and explicit data flow over hidden mutable state.
- Prefer composition over inheritance and configuration over copied variants.

A module should have one clear reason to change. Split a file when it mixes unrelated domain, persistence, platform, and presentation concerns—not merely because it reaches an arbitrary line count.

## Reuse before creating

Before adding a component, hook, helper, token, type, or service:

1. Search for an existing implementation.
2. Extend or compose an existing primitive when its responsibility remains coherent.
3. Create a shared abstraction only after at least two real call sites need the same behavior, unless a platform boundary or independently testable domain rule clearly requires one immediately.
4. Avoid near-duplicate components distinguished only by copy, color, or minor layout. Express those differences through typed props and semantic tokens.
5. Do not create generic “utils”, “helpers”, or catch-all services. Name modules after the domain behavior they own.

## Keep code concise and readable

- Implement the smallest complete solution that satisfies the acceptance criteria.
- Avoid speculative layers, wrapper components with no behavior, pass-through hooks, duplicated state, and unnecessary indirection.
- Use early returns and small named functions to keep control flow shallow.
- Prefer declarative mapping over repeated markup when items share behavior and structure.
- Derive values instead of storing duplicate state.
- Use precise names; do not compensate for unclear design with long comments.
- Add comments only for non-obvious constraints, platform behavior, safety rules, or tradeoffs.
- Do not compress code into clever expressions when it harms debugging, accessibility, or type safety. Concise means low duplication and clear intent, not minimal character count.

## TypeScript and API boundaries

- Keep strict types at module and platform boundaries. Avoid `any`, unsafe assertions, and stringly typed state.
- Model finite workflows with discriminated unions or explicit state machines.
- Validate data read from storage or native modules before it enters domain logic.
- Keep component props minimal and semantic. Avoid broad prop bags and leaking native/platform details into screens.
- Represent unavailable, pending, failed, and completed states explicitly; do not overload `null` with several meanings.

## React and React Native practices

- Keep state as local as practical and lift it only when multiple owners genuinely require it.
- Do not use effects to derive render values; calculate them during render or with a pure selector.
- Use effects only to synchronize with external systems, and clean up subscriptions, timers, audio, and lifecycle listeners.
- Avoid premature memoization. Add `memo`, `useMemo`, or `useCallback` only for measured cost or required referential stability.
- Use stable identifiers for list keys; never use array indexes for mutable lists.
- Respect safe areas, keyboard behavior, app lifecycle, audio focus, and platform conventions.
- Do not add a global state library unless existing state boundaries cannot solve a demonstrated problem.

## Design system and accessibility

- Use semantic tokens from `src/theme.ts`; do not introduce screen-local brand colors or typography values.
- Reuse shared controls and interaction states before styling a new one.
- Meet at least 44×44 pt touch targets on iOS and 48×48 dp on Android.
- Support Dynamic Type, VoiceOver, TalkBack, reduced motion, non-color phase cues, and visible pressed/focus states.
- Give controls accurate roles, labels, values, selected/disabled states, and concise hints.
- Keep core guidance usable through visual-only, tone-only, and haptic-only paths.
- Never hide a required action or safety message because text size increases.

## Safety, privacy, and health data

- Keep breathing fully usable offline and without Health permissions.
- Request permissions only after contextual explanation and only for shipped functionality.
- Never fabricate, interpolate, carry forward, or mislabel health values.
- Keep guided cadence distinct from measured respiratory rate.
- Make writes idempotent and represent pending, success, unavailable, declined/restricted, and failure states honestly.
- Collect and persist only data required by the current MVP.
- Do not add medical, diagnostic, causal, or treatment claims.

## Tests and validation

- Test domain behavior at the narrowest stable boundary: pure timer tests, reducer/state-machine tests, repository contract tests, and component interaction/accessibility tests.
- Add regression coverage for every corrected bug when practical.
- Prefer behavior assertions over implementation-detail snapshots.
- Validate the smallest affected scope first, then run broader type, test, build, and platform checks as confidence grows.
- For timer, lifecycle, audio, accessibility, or native Health behavior, retain physical-device evidence where the implementation plan requires it.
- Do not claim a platform behavior is validated from a JavaScript bundle or simulator-only check when physical hardware is required.

## Review checklist

Before considering a change complete, confirm:

- The implementation is inside the lean MVP scope.
- Existing components, tokens, hooks, and repositories were reused where appropriate.
- New modules have one clear responsibility and a real call site.
- No state, markup, platform logic, or styling is duplicated unnecessarily.
- Screens compose reusable pieces rather than owning domain or persistence logic.
- Accessibility and unavailable/error states are implemented, not deferred in core flows.
- Tests cover the important behavior and validation results are reported accurately.
- The solution is the smallest maintainable implementation, not the most abstract or most verbose one.
