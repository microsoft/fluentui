import * as React from 'react';

/**
 * Helper to render categorical labels for scatterpolar charts
 */
export function renderScatterPolarCategoryLabels({
  data,
  xAxisScale,
  yAxisScale,
  className,
  maybeLineOptions,
}: {
  data: { text?: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xAxisScale: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yAxisScale: any;
  className: string;
  maybeLineOptions?: { originXOffset?: number };
}): React.JSX.Element[] {
  const uniqueCategories: string[] = [];
  data.forEach(pt => {
    if (pt.text && !uniqueCategories.includes(pt.text)) {
      uniqueCategories.push(pt.text);
    }
  });
  const numCategories = uniqueCategories.length;
  return uniqueCategories.map((cat, idx) => {
    const angle = ((2 * Math.PI) / numCategories) * idx;
    const r = 0.6;
    const originXOffset = maybeLineOptions?.originXOffset || 0;
    const x = xAxisScale(r * Math.cos(angle) - originXOffset / 2);
    const y = yAxisScale(r * Math.sin(angle));
    return (
      <text
        key={`scatterpolar-label-${cat}`}
        x={x}
        y={y}
        className={className}
        textAnchor="middle"
        alignmentBaseline="middle"
        opacity={1}
      >
        {cat}
      </text>
    );
  });
}
