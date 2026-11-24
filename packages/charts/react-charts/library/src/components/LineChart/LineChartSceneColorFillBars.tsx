import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ColorFillBarsProps } from './LineChart.types';
import type { LineChartPlotContext, LineChartResolvedPoint } from './LineChart.types';
import { getColorFromToken } from '../../utilities/index';

const topPositions = new WeakMap<readonly LineChartResolvedPoint[], number>();

function topPosition(points: readonly LineChartResolvedPoint[]): number {
  const cached = topPositions.get(points);
  if (cached !== undefined) {
    return cached;
  }
  let top = Infinity;
  for (const point of points) {
    top = Math.min(top, point.position.y);
  }
  topPositions.set(points, top);
  return top;
}

/** Existing fill bars remain data-height shading, distinct from custom full-plot bands. */
export const LineChartSceneColorFillBars = ({
  bars,
  plot,
  id,
  baseline,
}: {
  bars: ColorFillBarsProps[];
  plot: LineChartPlotContext;
  id: string;
  baseline: number;
}): JSXElement => {
  if (!bars.length) {
    return <></>;
  }
  let position = Infinity;
  for (const series of plot.series) {
    if (series.phase !== 'exit' && series.scaleKey === 'y') {
      position = Math.min(position, topPosition(series.points));
    }
  }
  const top = Number.isFinite(position) ? position : undefined;
  const bottom = plot.projectY('y', baseline);
  if (top === undefined || bottom === undefined) {
    return <></>;
  }
  return (
    <g clipPath={`url(#${plot.plotClipPathId})`} pointerEvents="none" aria-hidden="true">
      <defs>
        {bars.map((bar, index) =>
          bar.applyPattern ? (
            <pattern key={index} id={`${id}-color-fill-${index}`} width={16} height={16} patternUnits="userSpaceOnUse">
              <path d="M0,16L16,0M-4,4L4,-4M12,20L20,12" stroke={getColorFromToken(bar.color)} strokeWidth={1.25} />
            </pattern>
          ) : null,
        )}
      </defs>
      {bars.map((bar, index) =>
        bar.data.map((range, rangeIndex) => {
          const start = plot.projectX(range.startX);
          const end = plot.projectX(range.endX);
          return start === undefined || end === undefined ? null : (
            <rect
              key={`${index}:${rangeIndex}`}
              x={Math.min(start, end)}
              y={Math.min(top - 3, bottom)}
              width={Math.abs(end - start)}
              height={Math.abs(bottom - top) + 3}
              fill={bar.applyPattern ? `url(#${id}-color-fill-${index})` : getColorFromToken(bar.color)}
              opacity={bar.applyPattern ? 1 : 0.4}
            />
          );
        }),
      )}
    </g>
  );
};
