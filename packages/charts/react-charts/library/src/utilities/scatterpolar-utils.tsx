import * as React from 'react';
import { ScaleLinear } from 'd3-scale';
import { JSXElement } from '@fluentui/react-utilities';

/**
 * Helper to render categorical labels for scatterpolar charts with improved overlap logic across all series
 * Now places labels at equal angles for all unique texts, regardless of data positions.
 */
export function renderScatterPolarCategoryLabels({
  allSeriesData,
  xAxisScale,
  yAxisScale,
  className,
  lineOptions,
  minPixelGap = 40,
}: {
  allSeriesData: { data: { x: number; y: number; text?: string }[] }[];
  xAxisScale: ScaleLinear<number, number>;
  yAxisScale: ScaleLinear<number, number>;
  className: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lineOptions?: any;
  minPixelGap?: number;
}): JSXElement[] {
  const maybeLineOptions = extractMaybeLineOptions(lineOptions);

  // 1. Aggregate all data points from all series
  const allLabels: { x: number; y: number; text: string }[] = [];
  allSeriesData.forEach(series => {
    series.data.forEach(pt => {
      if (pt.text) {
        allLabels.push({ x: pt.x, y: pt.y, text: pt.text });
      }
    });
  });

  // 2. Deduplicate by text (angle label)
  const uniqueTexts = Array.from(new Set(allLabels.map(l => l.text)));

  // 3. Place labels at equal angles
  const renderedLabels: JSXElement[] = [];
  const placedPositions: { x: number; y: number }[] = [];
  const labelRadius = 0.7; // You can adjust this value for more/less offset
  const numLabels = uniqueTexts.length;

  // Respect schema or prop rotation and direction (default ccw, 0°)
  const dirMultiplier = maybeLineOptions?.direction === 'clockwise' ? -1 : 1;
  const rotationRad = ((maybeLineOptions?.rotation ?? 0) * Math.PI) / 180;

  uniqueTexts.forEach((text, i) => {
    const angle = rotationRad + dirMultiplier * ((2 * Math.PI) / numLabels) * i;
    const originXOffset = maybeLineOptions?.originXOffset || 0;
    const x = xAxisScale(labelRadius * Math.cos(angle) - originXOffset / 2);
    const y = yAxisScale(labelRadius * Math.sin(angle));

    // Check distance from all previously placed labels
    const isFarEnough = placedPositions.every(pos => Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2) >= minPixelGap);

    if (renderedLabels.length === 0 || isFarEnough) {
      renderedLabels.push(
        <text
          key={`scatterpolar-label-${text}`}
          x={x}
          y={y}
          className={className}
          textAnchor="middle"
          alignmentBaseline="middle"
          opacity={1}
        >
          {text}
        </text>,
      );
      placedPositions.push({ x, y });
    }
  });

  return renderedLabels;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractMaybeLineOptions(lineOptions: any):
  | {
      originXOffset?: number;
      direction?: 'clockwise' | 'counterclockwise';
      rotation?: number;
    }
  | undefined {
  return lineOptions
    ? {
        originXOffset: lineOptions.originXOffset,
        direction:
          lineOptions.direction === 'clockwise' || lineOptions.direction === 'counterclockwise'
            ? lineOptions.direction
            : undefined,
        rotation: lineOptions.rotation,
      }
    : undefined;
}
