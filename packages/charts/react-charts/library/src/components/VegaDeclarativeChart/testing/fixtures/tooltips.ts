import type { VegaLiteSpec } from '../../VegaLiteTypes';

/** The local spec types intentionally cover less than the Vega-Lite tooltip schema. */
export const tooltipSpec = (spec: Record<string, unknown>): VegaLiteSpec => spec as unknown as VegaLiteSpec;

export const tooltipRow: Record<string, unknown> = {
  category: 'North',
  amount: 1234.5,
  series: 'Retail',
  angle: 0,
  distance: 4,
  weight: 2,
  notes: ['first line', 'second line'],
  zero: 0,
  nil: null,
  invalid: NaN,
  nested: { value: 7 },
  'a.b': 11,
  'a[b]': 13,
  date: '2024-02-29T12:34:56Z',
  secret: 'DO NOT DISCLOSE',
};

export const projectedTooltipSpec = tooltipSpec({
  mark: 'point',
  encoding: {
    x: { field: 'category', type: 'nominal', title: 'Category' },
    y: { field: 'amount', type: 'quantitative', title: 'Amount', format: ',.1f' },
    color: { field: 'series', type: 'nominal', title: 'Series' },
    theta: { field: 'angle', type: 'quantitative', title: 'Angle' },
    radius: { field: 'distance', type: 'quantitative', title: 'Distance' },
    size: { field: 'weight', type: 'quantitative', title: 'Weight' },
  },
});

export const aggregateTooltipSpec = tooltipSpec({
  mark: 'bar',
  data: {
    values: [
      { category: 'A', amount: 2 },
      { category: 'A', amount: 6 },
      { category: 'B', amount: 100 },
    ],
  },
  encoding: {
    x: { field: 'category', type: 'nominal', title: 'Category' },
    y: { field: 'amount', aggregate: 'mean', type: 'quantitative', title: 'Average amount', format: '.1f' },
  },
});
