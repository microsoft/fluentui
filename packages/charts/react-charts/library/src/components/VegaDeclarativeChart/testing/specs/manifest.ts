import type { VegaLiteSpec } from '../../VegaLiteTypes';

// The library type-check includes this test-only module without Node globals enabled.
// Declare only the CommonJS JSON-loading boundary; do not change compiler options or dependencies.
declare const require: (id: string) => unknown;

type Scalar = string | number | boolean | null;
export type CorpusColumn = {
  field?: string;
  channel?: 'x' | 'y' | 'x2' | 'y2' | 'color';
  tooltip?: number;
  normalize?: 'local-date';
};
export type CorpusTable = {
  columns: CorpusColumn[];
  rows: Scalar[][];
  title?: string;
};
export type CorpusEntry = {
  file: string;
  spec: VegaLiteSpec;
  description: string;
  priority: 'P0' | 'P1' | 'P2';
  /** Required conformance, NOT a claim that today's adapter implements the feature. */
  support: 'required';
  sources: { tag: 'grammar' | 'semantics' | 'authoring'; url: string }[];
  expectedTables: CorpusTable[];
  publicSvgCount: number;
  composed?: boolean;
  /** Hand-derived [x, y, width, height] at a 200 by 100 plot viewport. */
  geometry?: { rectangles: number[][]; roundedEnds?: ('top' | 'bottom')[] };
  tooltipLabels?: string[];
  resource?: { url: string; rows: Record<string, unknown>[] };
};

export const corpusGrammar = {
  version: '6.5.0',
  schema: 'https://raw.githubusercontent.com/vega/vega-lite/v6.5.0/build/vega-lite-schema.json',
  omitted: [
    {
      feature: 'isoweek / utcisoweek / yearisoweek',
      reason: 'Not in the pinned 6.5.0 TimeUnit grammar; Sunday-based week is not ISO week.',
      source: 'https://raw.githubusercontent.com/vega/vega-lite/v6.5.0/src/timeunit.ts',
    },
  ],
};

const xy: CorpusColumn[] = [{ channel: 'x' }, { channel: 'y' }];
const fields = (...names: string[]): CorpusColumn[] => names.map(field => ({ field }));
const table = (columns: CorpusColumn[], rows: Scalar[][]): CorpusTable => ({ columns, rows });
const aggregateSource =
  'https://raw.githubusercontent.com/vega/vega/v6.4.0/packages/vega-transforms/src/util/AggregateOps.js';

function entry(
  file: string,
  description: string,
  priority: CorpusEntry['priority'],
  topic: string,
  expectedTables: CorpusTable[],
  options: Partial<Pick<CorpusEntry, 'publicSvgCount' | 'composed' | 'geometry' | 'tooltipLabels' | 'resource'>> = {},
  semanticSource?: string,
): CorpusEntry {
  // CommonJS loading avoids requiring resolveJsonModule or introducing a runtime/schema dependency.
  // No generated TS specification substitutes for the real JSON document.
  const spec = require(`./${file}`) as VegaLiteSpec;
  return {
    file,
    spec,
    description,
    priority,
    support: 'required',
    sources: [
      { tag: 'grammar', url: corpusGrammar.schema },
      { tag: 'authoring', url: `https://vega.github.io/vega-lite/docs/${topic}.html` },
      {
        tag: 'semantics',
        url:
          semanticSource ??
          `https://raw.githubusercontent.com/vega/vega-lite/v6.5.0/site/docs/${
            ['concat', 'facet', 'repeat'].includes(topic) ? 'composition' : 'transform'
          }/${topic}.md`,
      },
    ],
    expectedTables,
    publicSvgCount: 1,
    ...options,
  };
}

/**
 * Small seeded records and independently worked matrices, not adapter-produced golden files.
 * EMA: s = retention*s + value; exponential = s*(1-r)/(1-r^valid), exponentialb = s*(1-r).
 * A: s=11.625, valid=3, rows=4; B: s=9, valid=2, rows=2. Nulls do not advance s.
 * Variance: A has squared deviations summing to 40; B sums to 8. Divide by n-1 versus n.
 * Window matrices follow the authored frame endpoints and documented peer expansion, row by row.
 * Geometry is linear interpolation/band subdivision; center starts at (maxTotal-total)/2.
 */
export const specificationCorpus: CorpusEntry[] = [
  entry(
    'ema-encoding.vl.json',
    'Parameterized EMA encoding aliases and valid/count distinction',
    'P0',
    'aggregate',
    [
      table(
        [{ channel: 'x' }, { channel: 'y' }, { tooltip: 0 }, { tooltip: 1 }, { tooltip: 2 }],
        [
          ['A', 62 / 7, 62 / 7, 4, 3],
          ['B', 7.2, 7.2, 2, 2],
        ],
      ),
    ],
    {},
    aggregateSource,
  ),
  entry(
    'ema-transform-bias.vl.json',
    'Unbiased and biased EMA transform outputs with unequal counts',
    'P0',
    'aggregate',
    [
      table(fields('group', 'ema', 'biased', 'rows', 'valid', 'missing'), [
        ['A', 62 / 7, 8.71875, 4, 3, 1],
        ['B', 7.2, 6.75, 2, 2, 0],
      ]),
    ],
    {},
    aggregateSource,
  ),
  entry(
    'median-variance.vl.json',
    'Even/odd medians, sample/population variance and distinct encoding aliases',
    'P0',
    'aggregate',
    [
      table(
        [{ channel: 'x' }, { channel: 'y' }, { tooltip: 0 }, { tooltip: 1 }, { tooltip: 2 }, { tooltip: 3 }],
        [
          ['A', 5, 5, 40 / 3, 10, 4],
          ['B', 4, 4, 4, 8 / 3, 3],
        ],
      ),
    ],
    {},
    aggregateSource,
  ),
  entry('window-peers.vl.json', 'Tied cumulative frames and multiple independent sums', 'P0', 'window', [
    table(fields('id', 'amount_sum', 'cost_sum', 'rank', 'dense'), [
      [1, 6, 30, 1, 1],
      [2, 6, 30, 1, 1],
      [3, 14, 60, 3, 2],
      [4, 30, 100, 4, 3],
    ]),
  ]),
  entry(
    'window-ignore-peers.vl.json',
    'Trailing frames ignore peers but rank and lag ignore the frame',
    'P0',
    'window',
    [
      table(fields('id', 'amount_sum', 'cost_sum', 'rank', 'previous', 'first'), [
        [1, 2, 10, 1, null, 2],
        [2, 6, 30, 1, 2, 2],
        [3, 12, 50, 3, 4, 4],
        [4, 24, 70, 4, 8, 8],
      ]),
    ],
  ),
  entry(
    'window-forward-frame.vl.json',
    'Forward frames expand both peer endpoints independently of lead',
    'P0',
    'window',
    [
      table(fields('id', 'amount_sum', 'cost_sum', 'rank', 'next', 'last'), [
        [1, 6, 30, 1, 4, 4],
        [2, 14, 60, 1, 8, 8],
        [3, 24, 70, 3, 16, 16],
        [4, 16, 40, 4, null, 16],
      ]),
    ],
  ),
  entry(
    'utcday-encoding.vl.json',
    'Cyclic UTC day reference dates and encoding aggregation',
    'P0',
    'timeunit',
    [
      table(
        [{ channel: 'x' }, { channel: 'y' }, { tooltip: 0 }],
        [
          ['2012-01-01T00:00:00.000Z', 6, '2012-01-01T00:00:00.000Z'],
          ['2012-01-02T00:00:00.000Z', 3, '2012-01-02T00:00:00.000Z'],
        ],
      ),
    ],
    {},
    'https://raw.githubusercontent.com/vega/vega/v6.4.0/packages/vega-time/src/floor.js',
  ),
  entry(
    'yearmonthdate-transform.vl.json',
    'Leap-day local calendar and offset-sensitive UTC calendar',
    'P0',
    'timeunit',
    [
      table(
        [{ field: 'id' }, { field: 'local_day', normalize: 'local-date' }, { field: 'utc_day' }, { channel: 'y' }],
        [
          [1, '2024-02-29', '2024-03-01T00:00:00.000Z', 2],
          [2, '2024-03-01', '2024-02-29T00:00:00.000Z', 4],
        ],
      ),
    ],
    {},
    'https://raw.githubusercontent.com/vega/vega/v6.4.0/packages/vega-time/src/floor.js',
  ),
  entry('bin-transform.vl.json', 'Exact finite bins, closed maximum extent and grouped frequency', 'P1', 'bin', [
    table(fields('start', 'end', 'frequency'), [
      [-4, 0, 2],
      [0, 4, 2],
      [4, 8, 2],
    ]),
  ]),
  entry('flatten-parallel.vl.json', 'Renamed flattened arrays and null padding', 'P1', 'flatten', [
    table(fields('id', 'step', 'value', 'label'), [
      ['A', 1, 2, 'one'],
      ['A', 2, 4, 'two'],
      ['A', 3, 6, null],
      ['B', 1, 8, 'only'],
    ]),
  ]),
  entry('pivot-escaped-field.vl.json', 'Duplicate pivot sums and literal dotted output field', 'P1', 'pivot', [
    table(
      [{ field: 'group' }, ...xy],
      [
        ['A', 3, 7],
        ['B', 4, 8],
      ],
    ),
  ]),
  entry(
    'lookup-inline.vl.json',
    'Inline nested lookup fields, aliases, default and downstream calculate',
    'P1',
    'lookup',
    [
      table(fields('id', 'name', 'rate', 'total'), [
        [1, 'One', 2, 6],
        [2, 'Two', 5, 10],
        [3, 0, 0, 0],
      ]),
    ],
  ),
  entry('normalized-bar-order.vl.json', 'Normalized order must not be replaced by color-domain order', 'P0', 'stack', [
    table(fields('category', 'series', 'amount', 'priority'), [
      ['B', 'Second', 6, 1],
      ['B', 'First', 2, 2],
      ['A', 'Second', 3, 1],
      ['A', 'First', 1, 2],
    ]),
  ]),
  entry(
    'xoffset-not-color.vl.json',
    'Independent categorical xOffset grouping and diverging baseline',
    'P2',
    'encoding',
    [
      table(fields('category', 'slot', 'amount', 'tone'), [
        ['A', 'left', 4, 'Warm'],
        ['A', 'right', 8, 'Warm'],
        ['B', 'left', -4, 'Cool'],
        ['B', 'right', 2, 'Cool'],
      ]),
    ],
    {
      geometry: {
        rectangles: [
          [0, 30, 50, 20],
          [50, 10, 50, 40],
          [100, 50, 50, 20],
          [150, 40, 50, 10],
        ],
      },
    },
    'https://raw.githubusercontent.com/vega/vega-lite/v6.5.0/src/compile/mark/encode/position-rect.ts',
  ),
  entry(
    'yoffset-named-group.vl.json',
    'Independent horizontal yOffset grouping and top-to-bottom bands',
    'P2',
    'encoding',
    [
      table(fields('category', 'slot', 'amount', 'tone'), [
        ['A', 'left', 4, 'Warm'],
        ['A', 'right', 8, 'Warm'],
        ['B', 'left', -4, 'Cool'],
        ['B', 'right', 2, 'Cool'],
      ]),
    ],
    {
      geometry: {
        rectangles: [
          [100, 0, 40, 25],
          [100, 25, 80, 25],
          [60, 50, 40, 25],
          [100, 75, 20, 25],
        ],
      },
    },
    'https://raw.githubusercontent.com/vega/vega-lite/v6.5.0/src/compile/mark/encode/position-rect.ts',
  ),
  entry(
    'ranged-negative-corners.vl.json',
    'Signed primary versus secondary endpoints and rounded ends',
    'P2',
    'bar',
    [
      table(fields('category', 'value', 'baseline'), [
        ['A', -8, -2],
        ['B', 8, 2],
      ]),
    ],
    {
      geometry: {
        rectangles: [
          [0, 60, 100, 30],
          [100, 10, 100, 30],
        ],
        roundedEnds: ['bottom', 'top'],
      },
    },
    'https://raw.githubusercontent.com/vega/vega-lite/v6.5.0/src/compile/mark/encode/position-rect.ts',
  ),
  entry(
    'center-bars.vl.json',
    'Maximum-total centering, explicit order and absolute negative contributions',
    'P2',
    'stack',
    [
      table(fields('category', 'series', 'amount', 'priority'), [
        ['A', 'First', 2, 0],
        ['A', 'Second', 6, 1],
        ['B', 'First', -2, 0],
        ['B', 'Second', 2, 1],
      ]),
    ],
    {
      geometry: {
        rectangles: [
          [0, 75, 100, 25],
          [0, 0, 100, 75],
          [100, 50, 100, 25],
          [100, 25, 100, 25],
        ],
      },
    },
  ),
  entry(
    'recursive-concat-dataset.vl.json',
    'Real named dataset in recursive concat with once-only inherited transforms',
    'P1',
    'concat',
    [
      table(xy, [
        [1, 5],
        [2, 9],
      ]),
      table(xy, [
        [1, 5],
        [2, 9],
      ]),
      table(xy, [[2, 8]]),
    ],
    { composed: true, publicSvgCount: 3 },
  ),
  entry(
    'facet-missing-cells.vl.json',
    'Missing facet fields and empty Cartesian cells',
    'P1',
    'facet',
    [
      { ...table(xy, [[1, 2]]), title: 'Region: (missing) · Quarter: Q1' },
      { ...table(xy, []), title: 'Region: (missing) · Quarter: Q2' },
      { ...table(xy, [[2, 4]]), title: 'Region: North · Quarter: Q1' },
      { ...table(xy, []), title: 'Region: North · Quarter: Q2' },
      { ...table(xy, []), title: 'Region: South · Quarter: Q1' },
      { ...table(xy, [[3, 6]]), title: 'Region: South · Quarter: Q2' },
    ],
    { composed: true, publicSvgCount: 3 },
  ),
  entry(
    'repeat-matrix.vl.json',
    'Four independently typed repeat bindings',
    'P1',
    'repeat',
    [
      table(xy, [
        [1, 1],
        [2, 2],
      ]),
      table(xy, [
        [10, 1],
        [20, 2],
      ]),
      table(xy, [
        [1, 10],
        [2, 20],
      ]),
      table(xy, [
        [10, 10],
        [20, 20],
      ]),
    ],
    { composed: true, publicSvgCount: 4 },
  ),
  entry(
    'filtered-tooltip-newlines.vl.json',
    'Leaf field predicates, newlines, escaping and explicit tooltip privacy',
    'P0',
    'filter',
    [
      table(
        [{ channel: 'x' }, { channel: 'y' }, { field: 'note' }, { field: 'stats\\.value' }],
        [
          [1, 4, 'line one\nline two', 9],
          [3, 6, 'backup\nsecond line', 11],
        ],
      ),
    ],
    {
      tooltipLabels: [
        'Note: line one\nline two; Amount: 4.0; Literal: 9',
        'Note: backup\nsecond line; Amount: 6.0; Literal: 11',
      ],
    },
    'https://vega.github.io/vega-lite/docs/tooltip.html',
  ),
  entry(
    'tooltip-field-filter.vl.json',
    'Field-bound tooltip filters preserve all plot rows, zero/null values and per-mark ARIA privacy',
    'P1',
    'tooltip',
    [
      table(
        [...xy, { tooltip: 0 }, { tooltip: 1 }, { tooltip: 2 }],
        [
          [1, 4, 'zero', 0, 'not numeric'],
          [2, 6, 'missing', null, null],
          [3, 8, 'positive', 5, 7],
        ],
      ),
    ],
    {
      tooltipLabels: ['Note: zero', 'Note: missing; value: null', 'Note: positive; value: 5; forecast: 7'],
    },
    'https://raw.githubusercontent.com/vega/vega-lite/v6.5.0/src/predicate.ts',
  ),
  entry(
    'managed-resource.vl.json',
    'Offline host authority, parse and calculate without browser fetch',
    'P1',
    'data',
    [
      table(xy, [
        ['2024-01-02T00:00:00.000Z', 6],
        ['2024-01-03T00:00:00.000Z', 12],
      ]),
    ],
    {
      resource: {
        url: 'https://fixtures.example.test/corpus/managed.json',
        rows: [
          { when: '2024-01-02', amount: '2' },
          { when: '2024-01-03', amount: '4' },
        ],
      },
    },
    'https://vega.github.io/vega-lite/docs/data.html#format',
  ),
];
