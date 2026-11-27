import type { VegaLiteSpec } from '../../VegaDeclarativeChart';

/** Small public-API fixtures with explicit dimensions and deterministic source tuples. */
export const integrationLineSpec: VegaLiteSpec = {
  width: 240,
  height: 120,
  mark: 'line',
  data: {
    values: [
      { x: 1, y: 2 },
      { x: 2, y: 4 },
    ],
  },
  encoding: {
    x: { field: 'x', type: 'quantitative' },
    y: { field: 'y', type: 'quantitative' },
  },
};

/** A producer's named dataset flows through nested flat and grid composition. */
export const integrationConcatSpec: VegaLiteSpec = {
  datasets: { table: integrationLineSpec.data!.values! },
  data: { name: 'table' },
  encoding: integrationLineSpec.encoding,
  width: 240,
  height: 120,
  hconcat: [
    { mark: 'line' },
    { vconcat: [{ mark: 'point' }, { concat: [{ mark: 'line' }, { mark: 'point' }], columns: 2 }] },
  ],
};

/** Cartesian facets deliberately include a missing cell and a missing facet value. */
export const integrationFacetSpec: VegaLiteSpec = {
  data: {
    values: [
      { region: 'North', quarter: 'Q1', amount: 4 },
      { region: 'South', quarter: 'Q2', amount: 8 },
      { quarter: 'Q1', amount: 2 },
    ],
  },
  facet: {
    row: { field: 'region', type: 'nominal', header: { title: 'Region' } },
    column: { field: 'quarter', type: 'ordinal', header: { title: 'Quarter' } },
  },
  spec: {
    width: 240,
    height: 120,
    mark: 'bar',
    encoding: {
      x: { field: 'quarter', type: 'ordinal' },
      y: { field: 'amount', type: 'quantitative' },
    },
  },
};

/** Object field references are resolved before any native adapter receives a repeat cell. */
export const integrationRepeatSpec: VegaLiteSpec = {
  datasets: { table: [{ a: 1, b: 2, c: 3, d: 4 }] },
  data: { name: 'table' },
  repeat: { row: ['a', 'b'], column: ['c', 'd'] },
  spec: {
    mark: 'point',
    width: 240,
    height: 120,
    encoding: {
      x: { field: { repeat: 'column' }, type: 'quantitative' },
      y: { field: { repeat: 'row' }, type: 'quantitative' },
    },
  },
};

/** Parent calculation must run once, not once per native renderer/preparation pass. */
export const integrationRangedSpec: VegaLiteSpec = {
  width: 240,
  height: 120,
  mark: 'bar',
  data: { values: [{ task: 'Alpha', start: 1, end: 4 }] },
  transform: [{ calculate: 'datum.end + 1', as: 'end' }],
  encoding: {
    x: { field: 'start', type: 'quantitative', scale: { domain: [0, 10] } },
    x2: { field: 'end' },
    y: { field: 'task', type: 'nominal' },
    tooltip: [
      { field: 'task', title: 'Task' },
      { field: 'end', title: 'Finish', type: 'quantitative', format: '.1f' },
    ],
  },
};

/** Late series ensure a shared legend is not hardcoded to the first child's tuples. */
export const integrationLegendSpec: VegaLiteSpec = {
  width: 240,
  height: 120,
  hconcat: [
    integrationLineSpec,
    {
      ...integrationLineSpec,
      data: { values: [{ x: 1, y: 3, series: 'Later' }] },
      encoding: { ...integrationLineSpec.encoding, color: { field: 'series', type: 'nominal' } },
    },
    {
      ...integrationLineSpec,
      data: { values: [{ x: 1, y: 5, series: 'Last' }] },
      encoding: { ...integrationLineSpec.encoding, color: { field: 'series', type: 'nominal' } },
    },
  ],
};

/** Relative resources are resolved only by an explicitly supplied, cancellable host callback. */
export const integrationResourceSpec: VegaLiteSpec = {
  ...integrationLineSpec,
  data: { url: 'table.csv', format: { type: 'csv', parse: { x: 'number', y: 'number' } } },
};

/** Encoding aggregation is materialized once while visual and ARIA titles retain author-facing field names. */
export const integrationAggregateSpec: VegaLiteSpec = {
  ...integrationRangedSpec,
  transform: [],
  data: {
    values: [
      { task: 'Alpha', start: 1, end: 2 },
      { task: 'Alpha', start: 1, end: 3 },
    ],
  },
  encoding: {
    ...integrationRangedSpec.encoding,
    x2: { field: 'end', aggregate: 'sum', type: 'quantitative' },
    tooltip: [{ field: 'end', aggregate: 'sum', type: 'quantitative', format: '.1f' }],
  },
};
