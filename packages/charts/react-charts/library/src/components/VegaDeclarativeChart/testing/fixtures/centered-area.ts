import type { VegaLiteSpec } from '../../VegaLiteTypes';

/** Materialized scalar rows: preparation, aliases and aggregates belong to the caller. */
export const centeredAreaRows = [
  { x: 0, value: 2, series: 'A', rank: 1, private: 'hidden' },
  { x: 0, value: 4, series: 'B', rank: 0, private: 'hidden' },
  { x: 2, value: 2, series: 'A', rank: 1, private: 'hidden' },
  { x: 2, value: 8, series: 'B', rank: 0, private: 'hidden' },
];

export const centeredAreaSpec = (overrides: Partial<VegaLiteSpec> = {}): VegaLiteSpec => ({
  title: 'Centered area',
  mark: 'area',
  data: { values: centeredAreaRows },
  encoding: {
    x: { field: 'x', type: 'quantitative' },
    y: { field: 'value', type: 'quantitative', stack: 'center' },
    color: { field: 'series', type: 'nominal' },
  },
  ...overrides,
});

export const centeredAreaLayerSpec = (): VegaLiteSpec => {
  const unit = centeredAreaSpec();
  return {
    title: 'Layered centered area',
    data: unit.data,
    encoding: unit.encoding,
    layer: [
      { mark: 'area' },
      {
        mark: { type: 'area', opacity: 0.5 },
        data: {
          values: [
            { x: 0, value: 12, series: 'C' },
            { x: 4, value: 4, series: 'C' },
          ],
        },
      },
    ],
  };
};
