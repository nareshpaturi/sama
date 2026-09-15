import { Fragment } from 'react';
import { useWindowDimensions } from 'react-native';
import Svg, { Rect, Text as SvgText, Line } from 'react-native-svg';
import { colors, fonts, spacing } from '../theme';

interface Props {
  data: { label: string; minutes: number }[];
}

const HEIGHT = 160;
const LABEL_HEIGHT = 24;

/** Simple bar chart of practice minutes per day. */
export default function TrendChart({ data }: Props) {
  const { width } = useWindowDimensions();
  const chartWidth = Math.max(200, width - spacing.lg * 2 - spacing.md * 2);
  const plotHeight = HEIGHT - LABEL_HEIGHT;
  const n = data.length;
  const max = Math.max(1, ...data.map((d) => d.minutes));
  const slot = n > 0 ? chartWidth / n : chartWidth;
  const barWidth = Math.max(3, Math.min(30, slot * 0.55));
  const showAllLabels = n <= 10;

  return (
    <Svg width={chartWidth} height={HEIGHT}>
      <Line
        x1={0}
        y1={plotHeight}
        x2={chartWidth}
        y2={plotHeight}
        stroke={colors.divider}
        strokeWidth={1}
      />
      {data.map((d, i) => {
        const barHeight = Math.max(d.minutes > 0 ? 3 : 0, (d.minutes / max) * (plotHeight - 8));
        const x = i * slot + (slot - barWidth) / 2;
        const showLabel = showAllLabels || i % 5 === 0 || i === n - 1;
        return (
          <Fragment key={`${d.label}-${i}`}>
            <Rect
              x={x}
              y={plotHeight - barHeight}
              width={barWidth}
              height={barHeight}
              rx={barWidth / 2}
              fill={d.minutes > 0 ? colors.sky : colors.surfaceMuted}
            />
            {showLabel ? (
              <SvgText
                x={i * slot + slot / 2}
                y={plotHeight + 16}
                fontSize={10}
                fill={colors.inkSoft}
                fontFamily={fonts.sansRegular}
                textAnchor="middle"
              >
                {d.label}
              </SvgText>
            ) : null}
          </Fragment>
        );
      })}
    </Svg>
  );
}
