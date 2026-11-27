import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { VegaDeclarativeChart } from '@fluentui/react-charts';
import type { VegaLiteSpec } from '@fluentui/react-charts';

const size = { width: 480, height: 240 };

export const HistogramCounts = (): JSXElement => (
  <VegaDeclarativeChart
    semanticMode="strict"
    chartSchema={{
      vegaLiteSpec: {
        ...size,
        title: 'Latency histogram',
        mark: 'bar',
        data: { values: [1, 2, 8, 12, 15, 28].map(latency => ({ latency })) },
        encoding: {
          x: { field: 'latency', type: 'quantitative', bin: { extent: [0, 30], step: 10 } },
          y: { aggregate: 'count', type: 'quantitative', title: 'Frequency' },
          tooltip: [{ aggregate: 'count', type: 'quantitative', title: 'Records' }],
        },
      },
    }}
  />
);
HistogramCounts.parameters = focusedParameters(
  'Bin six latency readings into three fixed-width intervals. Hover or focus each bar to verify the counts 3, 2, and 1; the count does not require a field.',
);

export const TickStrip = (): JSXElement => (
  <VegaDeclarativeChart
    semanticMode="strict"
    chartSchema={{
      vegaLiteSpec: {
        ...size,
        title: 'Individual latency readings',
        mark: 'tick',
        data: { values: [3, 7, 13, 16].map(latency => ({ latency })) },
        encoding: {
          x: { field: 'latency', type: 'quantitative' },
          tooltip: [{ field: 'latency', type: 'quantitative', title: 'Latency (ms)' }],
        },
      },
    }}
  />
);
TickStrip.parameters = focusedParameters(
  'A single quantitative channel places one tick per reading. Unlike the histogram, this view does not aggregate the source rows.',
);

const loessSpec: VegaLiteSpec = {
  ...size,
  title: 'Smoothed response curve',
  mark: { type: 'line', point: true },
  data: { values: [2, 5, 3, 7, 6, 10, 9, 12].map((reading, sample) => ({ sample, reading })) },
  transform: [{ loess: 'reading', on: 'sample', bandwidth: 0.75 }],
  encoding: {
    x: { field: 'sample', type: 'quantitative' },
    y: { field: 'reading', type: 'quantitative', title: 'Smoothed reading' },
  },
};
export const LoessSmoothing = (): JSXElement => (
  <VegaDeclarativeChart semanticMode="strict" chartSchema={{ vegaLiteSpec: loessSpec }} />
);
LoessSmoothing.parameters = focusedParameters(
  'LOESS replaces each noisy reading with a locally fitted value. The rendered points are fitted values, not the input readings.',
);

const densitySpec: VegaLiteSpec = {
  ...size,
  title: 'Estimated latency distribution',
  mark: { type: 'line', point: true },
  data: { values: [1, 2, 2, 3, 5].map(latency => ({ latency })) },
  transform: [{ density: 'latency', bandwidth: 1, extent: [0, 6], steps: 6, as: ['latency', 'estimate'] }],
  encoding: {
    x: { field: 'latency', type: 'quantitative' },
    y: { field: 'estimate', type: 'quantitative', title: 'Probability density' },
  },
};
export const DensityEstimate = (): JSXElement => (
  <VegaDeclarativeChart semanticMode="strict" chartSchema={{ vegaLiteSpec: densitySpec }} />
);
DensityEstimate.parameters = {
  docs: {
    description: { story: 'Kernel density samples a continuous estimate at seven positions from 0 through 6.' },
  },
};

function focusedParameters(story: string) {
  return {
    // The Storybook source plugin attaches the complete file to its last story export.
    get fullSource(): string | undefined {
      const sourceStory = DensityEstimate;
      return (sourceStory.parameters as { fullSource?: string }).fullSource;
    },
    docs: { description: { story } },
  };
}
