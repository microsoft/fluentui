import type { VegaLiteSpec } from '../../components/VegaDeclarativeChart/VegaLiteTypes';

/** Producer-style composition fixtures; casts bridge the additive grammar types under development. */
export const nestedConcatSpec = {
  title: 'Dashboard',
  datasets: {
    table: [
      { x: 1, y: 2 },
      { x: 3, y: 8 },
    ],
  },
  data: { name: 'table' },
  encoding: { x: { field: 'x', type: 'quantitative', scale: { zero: false } } },
  hconcat: [
    { mark: 'point', encoding: { y: { field: 'y', type: 'quantitative' } } },
    { vconcat: [{ mark: 'bar' }, { concat: [{ mark: 'line' }, { mark: 'point' }], columns: 2 }] },
  ],
} as unknown as VegaLiteSpec;

export const missingFacetSpec = {
  title: 'Sales',
  data: {
    values: [
      { region: 'B', quarter: 'Q2', amount: 2, category: 'beta' },
      { region: 'A', quarter: 'Q1', amount: 8, category: 'alpha' },
      { region: 'A', quarter: 'Q2', amount: 3, category: 'beta' },
    ],
  },
  facet: {
    row: { field: 'region', type: 'nominal', header: { title: 'Region' } },
    column: { field: 'quarter', type: 'ordinal', header: { title: 'Quarter' } },
  },
  spec: {
    mark: 'bar',
    encoding: {
      x: { field: 'quarter', type: 'ordinal' },
      y: { field: 'amount', type: 'quantitative', scale: { zero: false } },
      color: { field: 'category', type: 'nominal', legend: { title: 'Category' } },
    },
  },
} as unknown as VegaLiteSpec;

export const repeatMatrixSpec = {
  datasets: { 'data-altair': [{ a: 1, b: 5, c: 10, d: 20 }] },
  data: { name: 'data-altair' },
  repeat: { row: ['a', 'b'], column: ['c', 'd'] },
  spec: {
    mark: 'point',
    encoding: {
      x: { field: { repeat: 'column' }, type: 'quantitative', scale: { zero: false } },
      y: { field: { repeat: 'row' }, type: 'quantitative', scale: { zero: false } },
      tooltip: [{ field: { repeat: 'row' } }, { field: { repeat: 'column' } }],
    },
  },
} as unknown as VegaLiteSpec;

export const transformedConcatSpec = {
  data: {
    values: [
      { x: 1, y: 1 },
      { x: 2, y: 4 },
      { x: 3, y: 10 },
    ],
  },
  transform: [{ filter: 'datum.x > 1' }, { calculate: 'datum.y + 1', as: 'y' }],
  resolve: { scale: { x: 'shared', y: 'shared', color: 'shared' } },
  hconcat: [
    {
      mark: 'point',
      transform: [{ calculate: 'datum.y * 2', as: 'z' }],
      encoding: {
        x: { field: 'x', type: 'quantitative', scale: { zero: false } },
        y: { field: 'z', type: 'quantitative', scale: { zero: false } },
        color: { field: 'z', type: 'quantitative' },
      },
    },
    {
      mark: 'point',
      transform: [{ filter: 'datum.x === 3' }, { calculate: 'datum.y * 3', as: 'z' }],
      encoding: {
        x: { field: 'x', type: 'quantitative', scale: { zero: false } },
        y: { field: 'z', type: 'quantitative', scale: { zero: false } },
        color: { field: 'z', type: 'quantitative' },
      },
    },
  ],
} as unknown as VegaLiteSpec;
