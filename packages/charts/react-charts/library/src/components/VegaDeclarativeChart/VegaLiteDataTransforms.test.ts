import {
  aggregateVegaValues,
  applyVegaTransforms,
  evaluateVegaPredicate,
  prepareVegaLiteSpec,
  readVegaField,
} from './VegaLiteDataTransforms';
import type { VegaLiteSpec } from './VegaLiteTypes';
import {
  peerRows,
  statisticsRows,
  statisticsExpectations,
  temporalExpectations,
  windowExpectations,
  binRows,
  binBounds,
  stackRows,
  stackBounds,
  isoTemporalExpectations,
} from './testing/fixtures/data-semantics';

const strict = { mode: 'strict' as const };
const prepare = (spec: unknown) => prepareVegaLiteSpec(spec as VegaLiteSpec, strict);

describe('readVegaField', () => {
  const row = { nested: { items: [{ value: 7 }] }, 'a.b': 11, 'a[b]': 13, 'a\\b': 17, 0: 19 };
  it.each([
    ['nested.items[0].value', 7],
    ['nested["items"][0]["value"]', 7],
    ['a\\.b', 11],
    ['a\\[b\\]', 13],
    ['a\\\\b', 17],
    ['0', 19],
  ])('%s', (field, expected) => {
    expect(readVegaField(row, field as string)).toBe(expected);
  });
  it('never traverses inherited properties or invokes getters/callables', () => {
    const getter = jest.fn(() => 5);
    const valueOf = jest.fn(() => 9);
    const hostile = Object.create({ hidden: 3 });
    Object.defineProperty(hostile, 'getter', { get: getter, enumerable: true });
    hostile.valueOf = valueOf;
    expect(readVegaField(hostile, 'hidden')).toBeUndefined();
    expect(readVegaField(hostile, 'getter')).toBeUndefined();
    expect(readVegaField(hostile, 'valueOf')).toBeUndefined();
    expect(readVegaField(hostile, 'constructor.prototype')).toBeUndefined();
    expect(getter).not.toHaveBeenCalled();
    expect(valueOf).not.toHaveBeenCalled();
  });
  it('rejects malformed paths safely', () => {
    for (const field of ['nested[', 'nested..value', 'nested[foo()]', 'nested.items[0]oops']) {
      expect(readVegaField(row, field)).toBeUndefined();
    }
  });
});

describe('aggregateVegaValues', () => {
  it.each(statisticsExpectations)('%s with missing/invalid inputs', (op, expected) => {
    const actual = aggregateVegaValues(statisticsRows, 'value', op, strict);
    expect(actual).toBeCloseTo(expected as number, 12);
  });
  it('matches upstream distinct string keys including missing and invalid', () => {
    // Vega TupleStore.distinct uses string keys: numeric 1 and string '1' coincide.
    expect(
      aggregateVegaValues([{ v: 1 }, { v: 1 }, { v: '1' }, { v: null }, {}, { v: NaN }], 'v', 'distinct', strict),
    ).toBe(4);
  });
  it('preserves min/max scalar types and arg extrema provenance', () => {
    const rows = [
      { v: 'z', id: 1 },
      { v: 'a', id: 2 },
      { v: 'a', id: 3 },
    ];
    expect(aggregateVegaValues(rows, 'v', 'min', strict)).toBe('a');
    expect(aggregateVegaValues(rows, 'v', 'max', strict)).toBe('z');
    expect(aggregateVegaValues(rows, 'v', 'argmin', strict)).toEqual(rows[1]);
    expect(aggregateVegaValues(rows, 'v', 'argmax', strict)).toEqual(rows[0]);
  });
  it('uses undefined for empty scalar samples and singleton sample variance', () => {
    expect(aggregateVegaValues([], undefined, 'count', strict)).toBe(0);
    for (const op of ['sum', 'mean', 'median', 'min', 'product', 'variance']) {
      expect(aggregateVegaValues([], 'v', op, strict)).toBeUndefined();
    }
    expect(aggregateVegaValues([{ v: 2 }], 'v', 'variance', strict)).toBeUndefined();
    expect(aggregateVegaValues([{ v: 2 }], 'v', 'variancep', strict)).toBe(0);
  });
  it.each([
    [{ exponential: 0.5 }, 34 / 7],
    [{ exponentialb: 0.5 }, 4.25],
    [{ exponential: 0 }, 6],
    [{ exponentialb: 0 }, 6],
    [{ exponential: 1 }, NaN],
    [{ exponentialb: 1 }, 0],
  ])('parameterized %j retains zero/one and upstream weighting', (op, expected) => {
    // Recurrence at retention .5: 2 -> 5 -> 8.5; normalization=1+.5+.25.
    const actual = aggregateVegaValues([{ v: 2 }, { v: null }, { v: 4 }, { v: 6 }], 'v', op, strict);
    if (Number.isNaN(expected)) {
      expect(actual).toBeNaN();
    } else {
      expect(actual).toBeCloseTo(expected);
    }
  });
  it.each([
    { exponential: -1 },
    { exponential: 2 },
    { exponential: NaN },
    { exponential: '0.5' },
    { exponential: 0.5, exponentialb: 0.5 },
    {},
  ])('rejects invalid parameter %j', op => {
    expect(() => aggregateVegaValues([{ v: 1 }], 'v', op, strict)).toThrow(/aggregate|parameter/i);
  });
  it('has explicit legacy unknown operation fallback', () => {
    expect(aggregateVegaValues(statisticsRows, 'value', 'unknown')).toBe(8);
    expect(() => aggregateVegaValues(statisticsRows, 'value', 'unknown', strict)).toThrow(/unknown/i);
  });
});

describe('transforms', () => {
  it('aggregates collision-free typed group keys and joins without overwriting source rows', () => {
    const rows = [
      { g: '__proto__', v: 1 },
      { g: 1, v: 3 },
      { g: '1', v: 5 },
      { g: '__proto__', v: 7 },
    ];
    const result = applyVegaTransforms(
      rows,
      [{ aggregate: [{ op: 'mean', field: 'v', as: 'm' }], groupby: ['g'] }],
      strict,
    );
    expect(result).toEqual([
      { g: '__proto__', m: 4 },
      { g: 1, m: 3 },
      { g: '1', m: 5 },
    ]);
    const joined = applyVegaTransforms(
      rows,
      [{ joinaggregate: [{ op: 'sum', field: 'v', as: 's' }], groupby: ['g'] }],
      strict,
    );
    expect(joined.map(r => r.s)).toEqual([8, 3, 5, 8]);
    expect(rows[0]).toEqual({ g: '__proto__', v: 1 });
  });
  it('window peer ranks, string sorting and independent accumulators', () => {
    const window = Object.keys(windowExpectations).map(as => ({
      as,
      op: (
        {
          row: 'row_number',
          rank: 'rank',
          dense: 'dense_rank',
          percent: 'percent_rank',
          cume: 'cume_dist',
          sum: 'sum',
          other: 'sum',
        } as Record<string, string>
      )[as],
      field: as === 'other' ? 'other' : 'value',
    }));
    const result = applyVegaTransforms(peerRows, [{ window, sort: [{ field: 'label' }] }], strict);
    for (const [field, expected] of Object.entries(windowExpectations)) {
      expect(result.map(r => r[field])).toEqual(expected);
    }
    expect(result.map(r => r.value)).toEqual([1, 3, 2, 4]);
  });
  it('signed frames expand peers unless ignorePeers is true', () => {
    const window = [{ op: 'sum', field: 'value', as: 's' }];
    const base = { window, sort: [{ field: 'label' }], frame: [-1, 0] };
    // Row 3 starts at the first b peer, not at a: peer expansion gives 3+2=5.
    expect(applyVegaTransforms(peerRows, [base], strict).map(r => r.s)).toEqual([1, 6, 5, 9]);
    expect(applyVegaTransforms(peerRows, [{ ...base, ignorePeers: true }], strict).map(r => r.s)).toEqual([1, 4, 5, 6]);
  });
  it('supports navigation, full frame scalar aggregates, ntile and multisort', () => {
    const result = applyVegaTransforms(
      peerRows,
      [
        {
          sort: [{ field: 'label' }, { field: 'value', order: 'ascending' }],
          frame: [null, null],
          window: [
            { op: 'lag', field: 'value', as: 'lag' },
            { op: 'lead', field: 'value', param: 0, as: 'lead' },
            { op: 'first_value', field: 'value', as: 'first' },
            { op: 'last_value', field: 'value', as: 'last' },
            { op: 'nth_value', field: 'value', param: 2, as: 'nth' },
            { op: 'ntile', param: 3, as: 'tile' },
            { op: 'median', field: 'value', as: 'median' },
          ],
        },
      ],
      strict,
    );
    expect(result.map(r => r.lag)).toEqual([null, 1, 2, 3]);
    expect(result.map(r => r.lead)).toEqual([2, 3, 4, null]);
    expect(result.map(r => r.first)).toEqual([1, 1, 1, 1]);
    expect(result.map(r => r.last)).toEqual([4, 4, 4, 4]);
    expect(result.map(r => r.nth)).toEqual([2, 2, 2, 2]);
    // Upstream ntile is ceil(3*cume_dist), not SQL equal-sized buckets.
    expect(result.map(r => r.tile)).toEqual([1, 2, 3, 3]);
    expect(result.map(r => r.median)).toEqual([2.5, 2.5, 2.5, 2.5]);
  });
  it('resets ranks per group and handles singleton percent rank', () => {
    // Tagged WindowOps.percent_rank computes (rank-1)/(n-1), so singleton=0/0.
    expect(
      applyVegaTransforms(
        [{ g: 'a' }, { g: 'b' }],
        [{ groupby: ['g'], window: [{ op: 'percent_rank', as: 'r' }] }],
        strict,
      ).map(r => r.r),
    ).toEqual([NaN, NaN]);
  });
  it('without sort, ranks and cumulative distributions follow input order rather than making every row a peer', () => {
    const result = applyVegaTransforms(
      peerRows,
      [
        {
          window: [
            { op: 'rank', as: 'r' },
            { op: 'dense_rank', as: 'd' },
            { op: 'cume_dist', as: 'c' },
          ],
        },
      ],
      strict,
    );
    expect(result.map(r => r.r)).toEqual([1, 2, 3, 4]);
    expect(result.map(r => r.d)).toEqual([1, 2, 3, 4]);
    expect(result.map(r => r.c)).toEqual([0.25, 0.5, 0.75, 1]);
  });
  it('supports forward-only and empty frames', () => {
    const base = { window: [{ op: 'sum', field: 'value', as: 's' }], ignorePeers: true };
    expect(
      applyVegaTransforms([{ value: 1 }, { value: 2 }, { value: 3 }], [{ ...base, frame: [1, 2] }], strict).map(
        r => r.s,
      ),
    ).toEqual([5, 3, undefined]);
  });
  it('strictly validates operations even with no input rows', () => {
    expect(() => applyVegaTransforms([], [{ window: [{ op: 'bogus', as: 'r' }] }], strict)).toThrow(/bogus/i);
    expect(() => applyVegaTransforms([], [{ filter: { selection: 'brush' } }], strict)).toThrow(/predicate/i);
  });
  it('rejects conflicting transform keys and malformed predicates', () => {
    expect(() => applyVegaTransforms(peerRows, [{ filter: 'true', calculate: '1', as: 'v' }], strict)).toThrow(
      /conflict/i,
    );
    expect(() => evaluateVegaPredicate({ and: 'not an array' }, {}, strict)).toThrow(/predicate/i);
    expect(evaluateVegaPredicate({ field: 'v', equal: '1' }, { v: 1 }, strict)).toBe(false);
  });
  it('unknown windows throw strictly and retain legacy row numbering', () => {
    const transforms = [{ window: [{ op: 'bogus', as: 'r' }] }];
    expect(() => applyVegaTransforms(peerRows, transforms, strict)).toThrow(/bogus/i);
    expect(applyVegaTransforms(peerRows, transforms).map(r => r.r)).toEqual([1, 2, 3, 4]);
  });
  it('object predicates and safe expressions compose', () => {
    const rows = [{ n: 2 }, { n: 4 }, { n: null }, {}];
    const result = applyVegaTransforms(
      rows,
      [
        {
          filter: {
            and: [
              { field: 'n', valid: true },
              { field: 'n', range: [2, 3] },
            ],
          },
        },
        { calculate: 'datum.n * 3 + 1', as: 'out' },
      ],
      strict,
    );
    expect(result).toEqual([{ n: 2, out: 7 }]);
    expect(evaluateVegaPredicate({ not: { field: 'n', oneOf: [3, 4] } }, rows[0], strict)).toBe(true);
    expect(
      evaluateVegaPredicate(
        {
          or: [
            { field: 'n', equal: 4 },
            { field: 'n', lt: 3 },
          ],
        },
        rows[1],
        strict,
      ),
    ).toBe(true);
  });
  it('rejects unsupported expressions and never invokes coercion hooks/getters', () => {
    const hook = jest.fn(() => 8);
    const rows = [{ v: { valueOf: hook, toString: hook } }];
    expect(() => applyVegaTransforms(rows, [{ calculate: 'datum.v + 1', as: 'n' }], strict)).toThrow();
    expect(() =>
      applyVegaTransforms(rows, [{ filter: 'datum.constructor.constructor("return 1")()' }], strict),
    ).toThrow();
    expect(hook).not.toHaveBeenCalled();
    expect(applyVegaTransforms([{ n: 2 }], [{ filter: 'invalid()' }])).toEqual([{ n: 2 }]);
  });
  it.each(['toString(abs)', 'toNumber(toString)', 'abs', 'datum.v()', 'datum.v.valueOf()', 'datum[abs]'])(
    'rejects indirect function use: %s',
    calculate => {
      const hook = jest.fn(() => 1);
      const getter = jest.fn(() => hook);
      const v = Object.defineProperty({ valueOf: hook, toString: hook }, 'getter', { get: getter, enumerable: true });
      expect(() => applyVegaTransforms([{ v }], [{ calculate, as: 'out' }], strict)).toThrow();
      expect(hook).not.toHaveBeenCalled();
      expect(getter).not.toHaveBeenCalled();
    },
  );
  it('diagnoses unsupported functions/time units/aggregates even on empty input', () => {
    for (const transform of [
      { calculate: 'invalid()', as: 'v' },
      { timeUnit: 'weekisoweek', field: 'd', as: 'v' },
      { joinaggregate: [{ op: 'ci0', field: 'v', as: 'v' }] },
      { window: [{ op: 'prev_value', field: 'v', as: 'v' }] },
      { window: [{ op: 'ntile', param: 0, as: 'v' }] },
      { regression: 'v', on: 'x', order: 3 },
    ]) {
      expect(() => applyVegaTransforms([], [transform], strict)).toThrow();
    }
    expect(() =>
      evaluateVegaPredicate({ and: [{ field: 'v', equal: 2 }, { selection: 'brush' }] }, { v: 1 }, strict),
    ).toThrow(/unsupported/);
  });
  it('fold resolves field paths and safe arbitrary output names', () => {
    const result = applyVegaTransforms(
      [{ nested: { v: 3 }, 'a.b': 5 }],
      [{ fold: ['nested.v', 'a\\.b', 'absent'], as: ['__proto__', 'value'] }],
      strict,
    );
    expect(result.map(r => [readVegaField(r, '__proto__'), r.value])).toEqual([
      ['nested.v', 3],
      ['a\\.b', 5],
      ['absent', undefined],
    ]);
    expect(Object.getPrototypeOf(result[0])).toBe(Object.prototype);
  });
  it('lookup supports paths, defaults, whole records and first matching key', () => {
    const secondary = [
      { id: 1, nested: { n: 3 } },
      { id: 1, nested: { n: 99 } },
    ];
    const from = { data: { values: secondary }, key: 'id', fields: ['nested.n'] };
    expect(applyVegaTransforms([{ k: 1 }, { k: 2 }], [{ lookup: 'k', from, as: ['out'], default: 0 }], strict)).toEqual(
      [
        { k: 1, out: 3 },
        { k: 2, out: 0 },
      ],
    );
    expect(
      applyVegaTransforms(
        [{ k: 1 }],
        [{ lookup: 'k', from: { data: { values: secondary }, key: 'id' }, as: 'record' }],
        strict,
      )[0].record,
    ).toEqual(secondary[0]);
  });
  it('imputes grouped union keys using value/mean and keyvals range', () => {
    const rows = [
      { g: 'a', k: 1, v: 2 },
      { g: 'a', k: 3, v: 6 },
      { g: 'b', k: 2, v: 10 },
    ];
    const result = applyVegaTransforms(
      rows,
      [{ impute: 'v', key: 'k', groupby: ['g'], method: 'mean', keyvals: { start: 1, stop: 4 } }],
      strict,
    );
    expect(result.filter(r => r.g === 'a').map(r => [r.k, r.v])).toEqual([
      [1, 2],
      [3, 6],
      [2, 4],
    ]);
    expect(result.filter(r => r.g === 'b').map(r => [r.k, r.v])).toEqual([
      [2, 10],
      [1, 10],
      [3, 10],
    ]);
  });
  it('imputes existing nulls and missing keys with a signed local frame', () => {
    const result = applyVegaTransforms(
      [
        { k: 0, v: 2 },
        { k: 1, v: null },
        { k: 3, v: 8 },
      ],
      [{ impute: 'v', key: 'k', keyvals: [0, 1, 2, 3], method: 'mean', frame: [-1, 1] }],
      strict,
    );
    expect(result.map(r => [r.k, r.v])).toEqual([
      [0, 2],
      [1, 2],
      [3, 8],
      [2, 8],
    ]);
  });
  it('interpolates quantiles with explicit probabilities, custom names and group fields', () => {
    const result = applyVegaTransforms(
      [
        { g: 'a', v: 0 },
        { g: 'a', v: 10 },
        { g: 'b', v: 20 },
      ],
      [{ quantile: 'v', probs: [0, 0.25, 0.5, 1], groupby: ['g'], as: ['p', 'q'] }],
      strict,
    );
    expect(result).toEqual([
      { g: 'a', p: 0, q: 0 },
      { g: 'a', p: 0.25, q: 2.5 },
      { g: 'a', p: 0.5, q: 5 },
      { g: 'a', p: 1, q: 10 },
      { g: 'b', p: 0, q: 20 },
      { g: 'b', p: 0.25, q: 20 },
      { g: 'b', p: 0.5, q: 20 },
      { g: 'b', p: 1, q: 20 },
    ]);
    expect(
      applyVegaTransforms([{ v: 0 }, { v: 10 }], [{ quantile: 'v', step: 0.5 }], strict).map(r => r.value),
    ).toEqual([2.5, 7.5]);
    expect(() => applyVegaTransforms([], [{ quantile: 'v', step: 0 }], strict)).toThrow();
  });
  it('linear regression computes grouped fits, parameters and validates degenerate/method options', () => {
    const rows = [
      { g: 'a', x: 0, y: 1 },
      { g: 'a', x: 1, y: 3 },
      { g: 'a', x: 2, y: 5 },
      { g: 'b', x: 0, y: 4 },
      { g: 'b', x: 2, y: 4 },
    ];
    expect(applyVegaTransforms(rows, [{ regression: 'y', on: 'x', groupby: ['g'], as: ['u', 'v'] }], strict)).toEqual([
      { g: 'a', u: 0, v: 1 },
      { g: 'a', u: 2, v: 5 },
      { g: 'b', u: 0, v: 4 },
      { g: 'b', u: 2, v: 4 },
    ]);
    expect(applyVegaTransforms(rows, [{ regression: 'y', on: 'x', groupby: ['g'], params: true }], strict)[0]).toEqual({
      g: 'a',
      keys: ['a'],
      coef: [1, 2],
      rSquared: 1,
    });
    expect(() =>
      applyVegaTransforms(
        [
          { x: 1, y: 2 },
          { x: 1, y: 3 },
        ],
        [{ regression: 'y', on: 'x' }],
        strict,
      ),
    ).toThrow(/degenerate/i);
    expect(() => applyVegaTransforms(rows, [{ regression: 'y', on: 'x', method: 'poly' }], strict)).toThrow(/method/i);
  });
  it('executes faithful LOESS and Gaussian density branches instead of strictly rejecting them', () => {
    expect(
      applyVegaTransforms(
        [
          { x: 0, y: 1 },
          { x: 1, y: 3 },
          { x: 2, y: 5 },
        ],
        [{ loess: 'y', on: 'x', bandwidth: 1 }],
        strict,
      ),
    ).toEqual([
      { x: 0, y: 1 },
      { x: 1, y: 3 },
      { x: 2, y: 5 },
    ]);
    const density = applyVegaTransforms([{ v: 0 }, { v: 2 }], [{ density: 'v', bandwidth: 1, steps: 2 }], strict);
    expect(density.map(r => r.value)).toEqual([0, 1, 2]);
    expect(density[1].density).toBeCloseTo(Math.exp(-0.5) / Math.sqrt(2 * Math.PI), 12);
    expect(() => applyVegaTransforms([], [{ unknown: 'v' }], strict)).toThrow(/unsupported/i);
  });
  it('preserves frozen cyclical objects and pollution-sensitive writes', () => {
    const cycle: Record<string, unknown> = {};
    cycle.self = cycle;
    Object.freeze(cycle);
    const row = Object.freeze({ cycle });
    const result = applyVegaTransforms(
      [row],
      [
        { calculate: '2', as: '__proto__' },
        { calculate: '3', as: 'constructor' },
      ],
      strict,
    )[0];
    expect((result.cycle as Record<string, unknown>).self).toBe(result.cycle);
    expect(readVegaField(result, '__proto__')).toBe(2);
    expect(readVegaField(result, 'constructor')).toBe(3);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.prototype.hasOwnProperty.call(row, '__proto__')).toBe(false);
  });
  it('rejects huge quantile/impute work before allocation and deep expressions', () => {
    expect(() => applyVegaTransforms([], [{ quantile: 'v', step: 1e-12 }], strict)).toThrow(/limit/i);
    expect(() =>
      applyVegaTransforms([], [{ impute: 'v', key: 'k', keyvals: { start: 0, stop: 1e10 } }], strict),
    ).toThrow(/limit/i);
    expect(() =>
      applyVegaTransforms([{}], [{ calculate: '('.repeat(200) + '1' + ')'.repeat(200), as: 'v' }], strict),
    ).toThrow(/depth/i);
  });
  it.each([strict, { mode: 'legacy' as const }])('never swallows WORKBUDGET failures in %j mode', options => {
    const check = (run: () => unknown) => {
      try {
        run();
        throw new Error('budget was not enforced');
      } catch (error) {
        expect(error).toMatchObject({ code: 'WORKBUDGET' });
      }
    };
    check(() => applyVegaTransforms([], [{ quantile: 'v', step: 1e-12 }], options));
    check(() =>
      applyVegaTransforms(
        [{ k: 1, v: 2 }],
        [{ impute: 'v', key: 'k', keyvals: Array.from({ length: 1500 }, (_, i) => i) }],
        options,
      ),
    );
    check(() =>
      applyVegaTransforms(
        Array.from({ length: 1500 }, () => ({ v: 1 })),
        [{ window: [{ op: 'sum', field: 'v' }], frame: [null, null] }],
        options,
      ),
    );
    check(() => applyVegaTransforms([{}], [{ calculate: '-'.repeat(200) + '1', as: 'v' }], options));
  });
  it('does not spend quadratic frame work on frame-independent ranks', () => {
    const rows = Array.from({ length: 1500 }, (_, i) => ({ v: i }));
    expect(
      applyVegaTransforms(rows, [{ window: [{ op: 'rank', as: 'r' }], frame: [null, null] }], strict)[1499].r,
    ).toBe(1500);
  });
});

describe('remaining transform semantics', () => {
  it('bin preserves tuples and Vega right-closed bounds, missing values and infinities', () => {
    const result = applyVegaTransforms(
      binRows,
      [{ bin: { extent: [0, 10], step: 2 }, field: 'v', as: ['lo', 'hi'] }],
      strict,
    );
    expect(result.map(r => [r.lo, r.hi])).toEqual(binBounds);
    expect(result.map(r => r.v)).toEqual(binRows.map(r => r.v));
    const filtered = applyVegaTransforms(
      binRows,
      [{ bin: { extent: [0, 10], step: 2 }, field: 'v', as: 'b' }, { filter: 'isFinite(datum.b)' }],
      strict,
    );
    expect(filtered.map(r => r.b)).toEqual([0, 0, 2, 8, 8]);
  });
  it.each([
    [{ maxbins: 4 }, [0, 5, 5]],
    [{ step: 3 }, [0, 6, 9]],
    [{ steps: [1, 2, 5], maxbins: 4 }, [0, 6, 8]],
    [{ step: 2, anchor: 1 }, [-Infinity, 7, 9]],
    [{ step: 2, extent: [1, 9], nice: false }, [-Infinity, 7, Infinity]],
    [{ maxbins: 4, base: 2, divide: [2] }, [0, 4, 8]],
    [{ maxbins: 20, minstep: 5 }, [0, 5, 5]],
    [{ maxbins: 4, span: 100 }, [0, 0, 0]],
  ])('bin honors static planning options %j', (bin, expected) => {
    expect(
      applyVegaTransforms([{ v: 0 }, { v: 7 }, { v: 10 }], [{ bin, field: 'v', as: ['lo', 'hi'] }], strict).map(
        r => r.lo,
      ),
    ).toEqual(expected);
  });
  it('bin handles constant, fractional, negative and empty domains without allocating thresholds', () => {
    expect(applyVegaTransforms([{ v: 5 }], [{ bin: true, field: 'v' }], strict)[0]).toMatchObject({
      bin0: 5,
      bin1: 5.5,
    });
    // Upstream applies ceil twice: binary .6/.1 rounding extends stop to .7.
    expect(
      applyVegaTransforms([{ v: 0.3 }, { v: 0.6 }], [{ bin: { step: 0.1, extent: [0, 0.6] }, field: 'v' }], strict).map(
        r => r.bin0,
      ),
    ).toEqual([0.30000000000000004, 0.6000000000000001]);
    expect(
      applyVegaTransforms([{ v: -3 }, { v: -1 }], [{ bin: { step: 1 }, field: 'v' }], strict).map(r => r.bin0),
    ).toEqual([-3, -2]);
    expect(applyVegaTransforms([], [{ bin: true, field: 'v' }], strict)).toEqual([]);
    expect(applyVegaTransforms([{ v: null }], [{ bin: true, field: 'v' }], strict)[0].bin0).toBeNull();
  });
  it('flatten expands parallel arrays by row, preserves nulls and pads missing/holey arrays', () => {
    const rows = [
      { id: 1, a: [1, null, 3], b: ['x'] },
      { id: 2, a: [], b: [] },
      { id: 3, b: ['z', 'w'] },
    ];
    const result = applyVegaTransforms(rows, [{ flatten: ['a', 'b'], as: ['u', 'v'], index: 'i' }], strict);
    expect(result.map(r => [r.id, r.u, r.v, r.i])).toEqual([
      [1, 1, 'x', 0],
      [1, null, null, 1],
      [1, 3, null, 2],
      [3, null, 'z', 0],
      [3, null, 'w', 1],
    ]);
    const holey = new Array(3);
    holey[1] = 4;
    expect(applyVegaTransforms([{ a: holey }], [{ flatten: ['a'] }], strict).map(r => r.a)).toEqual([null, 4, null]);
    expect(rows[0].a).toEqual([1, null, 3]);
  });
  it('flatten uses safe paths/aliases, clones frozen metadata and never reads array or object getters', () => {
    const getter = jest.fn(() => 99);
    const array = Object.defineProperty([1, 2], '1', { get: getter });
    const source = Object.freeze({
      nested: Object.freeze({ a: Object.freeze(array) }),
      meta: Object.freeze({ tag: 'keep' }),
    });
    const result = applyVegaTransforms(
      [source],
      [{ flatten: ['nested.a', 'constructor'], as: ['__proto__', 'safe'] }],
      strict,
    );
    expect(result.map(r => [readVegaField(r, '__proto__'), r.safe])).toEqual([
      [1, null],
      [null, null],
    ]);
    expect(result[0].meta).toEqual({ tag: 'keep' });
    expect(result[0].meta).not.toBe(source.meta);
    expect(Object.getPrototypeOf(result[0])).toBe(Object.prototype);
    expect(getter).not.toHaveBeenCalled();
  });
  it('pivot sorts and limits global keys, aggregates duplicate cells, and preserves typed grouping', () => {
    const rows = [
      { g: 1, k: 'z', v: 4 },
      { g: '1', k: 'b', v: 8 },
      { g: 1, k: 'a', v: 2 },
      { g: 1, k: 'a', v: 6 },
    ];
    const transform = { pivot: 'k', value: 'v', groupby: ['g'] };
    expect(applyVegaTransforms(rows, [transform], strict)).toEqual([
      { g: 1, a: 8, b: undefined, z: 4 },
      { g: '1', a: undefined, b: 8, z: undefined },
    ]);
    expect(applyVegaTransforms(rows, [{ ...transform, limit: 2, op: 'mean' }], strict)).toEqual([
      { g: 1, a: 4, b: undefined },
      { g: '1', a: undefined, b: 8 },
    ]);
    expect(applyVegaTransforms(rows, [{ ...transform, op: 'count' }], strict).map(r => [r.a, r.b, r.z])).toEqual([
      [2, 0, 1],
      [0, 1, 0],
    ]);
  });
  it('pivot safely writes pollution-sensitive scalar column and grouping names', () => {
    const rows = [
      { k: '__proto__', v: 2 },
      { k: 'constructor', v: 3 },
      { k: 'toString', v: 4 },
    ];
    const result = applyVegaTransforms(rows, [{ pivot: 'k', value: 'v' }], strict)[0];
    expect(Object.keys(result)).toEqual(['__proto__', 'constructor', 'toString']);
    expect(readVegaField(result, '__proto__')).toBe(2);
    expect(readVegaField(result, 'constructor')).toBe(3);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
  });
  it.each(['zero', 'normalize', 'center'] as const)(
    'stack %s honors stable sort, grouped offsets and negative values in original tuple order',
    offset => {
      const result = applyVegaTransforms(
        stackRows,
        [{ stack: 'v', groupby: ['g'], sort: [{ field: 'order' }], offset, as: ['lo', 'hi'] }],
        strict,
      );
      result.forEach((row, i) => {
        expect(row.lo).toBeCloseTo(stackBounds[offset][i][0], 14);
        expect(row.hi).toBeCloseTo(stackBounds[offset][i][1], 14);
      });
      expect(result.map(r => r.v)).toEqual(stackRows.map(r => r.v));
      expect(stackRows[0]).not.toHaveProperty('lo');
    },
  );
  it('stack supports descending multisort, safe aliases, zero totals and scalar-only coercion', () => {
    const rows = [
      { g: 'a', k: 1, v: 2 },
      { g: 'a', k: 1, v: 3 },
      { g: 'a', k: 2, v: 4 },
    ];
    const result = applyVegaTransforms(
      rows,
      [
        {
          stack: 'v',
          sort: [
            { field: 'k', order: 'descending' },
            { field: 'v', order: 'descending' },
          ],
          as: ['__proto__', 'hi'],
        },
      ],
      strict,
    );
    expect(result.map(r => [readVegaField(r, '__proto__'), r.hi])).toEqual([
      [7, 9],
      [4, 7],
      [0, 4],
    ]);
    expect(
      applyVegaTransforms([{ v: 0 }, { v: 0 }], [{ stack: 'v', offset: 'normalize' }], strict).map(r => [r.y0, r.y1]),
    ).toEqual([
      [0, NaN],
      [NaN, NaN],
    ]);
    expect(applyVegaTransforms([{ v: null }, { v: '2' }], [{ stack: 'v' }], strict).map(r => [r.y0, r.y1])).toEqual([
      [0, 0],
      [0, 2],
    ]);
    const hook = jest.fn(() => 2);
    const hostile = applyVegaTransforms([{ v: { valueOf: hook } }], [{ stack: 'v' }], strict);
    expect(hostile[0].y1).toBeNaN();
    expect(hook).not.toHaveBeenCalled();
  });
  it('sample uses a size-bounded reservoir and Math.random, without inventing seed semantics', () => {
    const rows = Array.from({ length: 5 }, (_, id) => ({ id }));
    const random = jest.spyOn(Math, 'random').mockReturnValueOnce(0).mockReturnValueOnce(0.99).mockReturnValueOnce(0.4);
    try {
      expect(applyVegaTransforms(rows, [{ sample: 2 }], strict)).toEqual([{ id: 2 }, { id: 1 }]);
      expect(random).toHaveBeenCalledTimes(3);
      random.mockClear();
      expect(applyVegaTransforms(rows, [{ sample: 0 }], strict)).toEqual([]);
      expect(applyVegaTransforms(rows, [{ sample: 10 }], strict)).toEqual(rows);
      expect(random).not.toHaveBeenCalled();
    } finally {
      random.mockRestore();
    }
  });
  it.each(isoTemporalExpectations)('floors ISO %s at %s', (timeUnit, d, expected) => {
    const result = applyVegaTransforms([{ d }], [{ timeUnit, field: 'd', as: 'out' }], strict);
    expect((result[0].out as Date).toISOString()).toBe(expected);
  });
  it('supports ISO stepped weeks and stepped composite weekdays with Vega day-of-year phase', () => {
    const run = (unit: string, step: number, d: string) =>
      (
        applyVegaTransforms([{ d }], [{ timeUnit: { unit, step }, field: 'd', as: 'out' }], strict)[0].out as Date
      ).toISOString();
    expect(run('utcyearisoweek', 2, '2021-01-01T12:00:00Z')).toBe('2020-12-28T00:00:00.000Z');
    expect(run('utcyearisoweekday', 2, '2021-01-03T12:00:00Z')).toBe('2021-01-03T00:00:00.000Z');
    expect(run('utcyearweek', 2, '2024-02-14T12:00:00Z')).toBe('2024-02-04T00:00:00.000Z');
    expect(run('utcyearisoweekday', 2, '2021-01-02T12:00:00Z')).toBe('2021-01-01T00:00:00.000Z');
  });
  it.each([
    { bin: { step: 0 }, field: 'v' },
    { bin: { maxbins: -1 }, field: 'v' },
    { bin: { extent: [2, 1] }, field: 'v' },
    { bin: { steps: [] }, field: 'v' },
    { bin: { base: 1 }, field: 'v' },
    { bin: { divide: [0] }, field: 'v' },
    { bin: { unknown: 1 }, field: 'v' },
    { bin: true },
    { flatten: [] },
    { flatten: ['a', 2] },
    { flatten: ['a'], as: [2] },
    { pivot: 'k' },
    { pivot: 'k', value: 'v', op: 'bogus' },
    { pivot: 'k', value: 'v', limit: -1 },
    { stack: 'v', offset: 'wiggle' },
    { stack: 'v', sort: [{ field: 'k', order: 'wrong' }] },
    { stack: 'v', as: ['a', 'a'] },
    { sample: -1 },
    { sample: 1.2 },
    { sample: 2, seed: 1 },
    { extent: 'v', param: 'domain' },
    { bin: true, field: 'v', stack: 'v' },
    { aggregate: [{ op: 'sum' }] },
    { aggregate: [{ op: 'mean', field: 'v', extra: true }] },
    { window: [{ op: 'lag' }] },
    { aggregate: 'bad' },
    { window: [], groupby: [2] },
    { timeUnit: { unit: 'year', step: 1, unknown: true }, field: 'd', as: 'out' },
    { timeUnit: 'yearisoweekmonth', field: 'd', as: 'out' },
  ])('strict preflight rejects malformed/unsupported properties on empty input: %j', transform => {
    expect(() => applyVegaTransforms([], [transform], strict)).toThrow();
  });
  it('retains legacy unknown transforms and refuses ambiguous scalar pivot collisions', () => {
    const rows = [{ v: 2 }];
    expect(applyVegaTransforms(rows, [{ extent: 'v', param: 'domain' }])).toEqual(rows);
    expect(applyVegaTransforms(rows, [{ unknown: true }])).toEqual(rows);
    expect(() => applyVegaTransforms([{ k: {}, v: 2 }], [{ pivot: 'k', value: 'v' }], strict)).toThrow(
      /scalar|unsupported/i,
    );
    expect(() =>
      applyVegaTransforms(
        [
          { k: 1, v: 2 },
          { k: '1', v: 3 },
        ],
        [{ pivot: 'k', value: 'v' }],
        strict,
      ),
    ).toThrow(/collision|unsupported/i);
  });
  it.each([strict, { mode: 'legacy' as const }])(
    'guards flatten fanout, pivot work and bin numerical bounds in %j',
    options => {
      for (const run of [
        () => applyVegaTransforms([{ a: new Array(100001) }], [{ flatten: ['a'] }], options),
        () =>
          applyVegaTransforms(
            [{ a: Array.from({ length: 1500 }, (_, i) => i) }],
            [{ flatten: ['a'], as: ['out'] }],
            options,
          ),
        () =>
          applyVegaTransforms(
            Array.from({ length: 1500 }, (_, k) => ({ k, v: 1 })),
            [{ pivot: 'k', value: 'v' }],
            options,
          ),
        () =>
          applyVegaTransforms([{ v: 1 }], [{ bin: { extent: [-1e308, 1e308], step: 1e-300 }, field: 'v' }], options),
      ]) {
        expect(run).toThrow(/limit|budget/i);
      }
    },
  );
});

describe('remaining transform edge cases', () => {
  it('pivot counts exclude matched NaN but include missing cells; distinct sees unmatched NaN sentinels', () => {
    const rows = [
      { g: 'a', k: 'x', v: NaN },
      { g: 'a', k: 'x', v: null },
      { g: 'a', k: 'y', v: 2 },
    ];
    expect(applyVegaTransforms(rows, [{ pivot: 'k', value: 'v', op: 'count', groupby: ['g'] }], strict)).toEqual([
      { g: 'a', x: 1, y: 1 },
    ]);
    expect(applyVegaTransforms(rows, [{ pivot: 'k', value: 'v', op: 'distinct', groupby: ['g'] }], strict)).toEqual([
      { g: 'a', x: 2, y: 2 },
    ]);
    // Upstream uses === for the pivot accessor, so a NaN pivot key never matches itself.
    expect(applyVegaTransforms([{ k: NaN, v: 2 }], [{ pivot: 'k', value: 'v' }], strict)).toEqual([{ NaN: undefined }]);
    expect(() => applyVegaTransforms(rows, [{ pivot: 'k', value: 'v', op: 'values' }], strict)).toThrow(
      /scalar|unsupported/i,
    );
  });
  it('stack caches original values when output aliases overwrite the value or sort fields', () => {
    const rows = Object.freeze([Object.freeze({ v: 2 }), Object.freeze({ v: 3 })]);
    expect(
      applyVegaTransforms(rows as unknown as Record<string, unknown>[], [{ stack: 'v', as: ['lo', 'v'] }], strict),
    ).toEqual([
      { v: 2, lo: 0 },
      { v: 5, lo: 2 },
    ]);
  });
  it('local calendar flooring follows local DST boundaries rather than elapsed 24-hour intervals', () => {
    const dates = [new Date(2024, 2, 9, 23), new Date(2024, 2, 10, 23), new Date(2024, 10, 3, 23)];
    const result = applyVegaTransforms(
      dates.map(d => ({ d })),
      [{ timeUnit: 'yearmonthdate', field: 'd', as: 'out' }],
      strict,
    );
    result.forEach((row, i) => {
      const d = row.out as Date;
      expect([d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()]).toEqual([
        2024,
        dates[i].getMonth(),
        dates[i].getDate(),
        0,
      ]);
    });
    const weeks = applyVegaTransforms(
      dates.map(d => ({ d })),
      [{ timeUnit: 'yearisoweek', field: 'd', as: 'out' }],
      strict,
    );
    expect(
      weeks.map(row => {
        const d = row.out as Date;
        return [d.getFullYear(), d.getMonth(), d.getDate(), d.getDay(), d.getHours()];
      }),
    ).toEqual([
      [2024, 2, 4, 1, 0],
      [2024, 2, 4, 1, 0],
      [2024, 9, 28, 1, 0],
    ]);
    const iso = applyVegaTransforms(
      [{ d: new Date(2021, 0, 1, 12) }],
      [{ timeUnit: 'yearisoweek', field: 'd', as: 'out' }],
      strict,
    )[0].out as Date;
    expect([iso.getFullYear(), iso.getMonth(), iso.getDate(), iso.getDay(), iso.getHours()]).toEqual([
      2020, 11, 28, 1, 0,
    ]);
  });
  it('bin, flatten and pivot do not invoke data or option coercion hooks', () => {
    const hook = jest.fn(() => 2);
    const rows = [{ v: { valueOf: hook, toString: hook }, nested: { values: [2] } }];
    expect(applyVegaTransforms(rows, [{ bin: { step: 1, extent: [0, 2] }, field: 'v' }], strict)[0].bin0).toBeNaN();
    expect(() => applyVegaTransforms(rows, [{ pivot: 'v', value: 'v' }], strict)).toThrow(/scalar/);
    const bin = Object.defineProperty({ extent: [0, 2] }, 'step', { get: hook, enumerable: true });
    expect(applyVegaTransforms([{ v: 1 }], [{ bin, field: 'v' }], strict)).toHaveLength(1);
    expect(hook).not.toHaveBeenCalled();
  });
});

describe('prepareVegaLiteSpec', () => {
  it('normalizes standalone bin/flatten/pivot/stack exactly once and retains encoding metadata through aggregation', () => {
    const spec = {
      mark: 'bar',
      data: {
        values: [
          { g: 'a', values: [1, 2] },
          { g: 'b', values: [3] },
        ],
      },
      transform: [
        { flatten: ['values'], as: ['v'] },
        { bin: { step: 2, extent: [0, 4] }, field: 'v', as: ['lo', 'hi'] },
        { pivot: 'g', value: 'v', groupby: ['lo', 'hi'] },
        { stack: 'a', groupby: ['lo'], as: ['start', 'end'] },
      ],
      encoding: {
        x: { field: 'lo', type: 'quantitative', title: 'Bins', scale: { zero: false } },
        y: { field: 'end', aggregate: 'sum', title: 'Total', axis: { labelAngle: 45 } },
        tooltip: [
          { field: 'lo', title: 'Lower' },
          { field: 'end', aggregate: 'sum', title: 'Total', format: '.2f' },
        ],
      },
    };
    const result = prepare(spec);
    expect(result.transform).toBeUndefined();
    expect(result.encoding!.x).toMatchObject({ field: 'lo', title: 'Bins', scale: { zero: false } });
    expect(result.encoding!.y).toMatchObject({ title: 'Total', axis: { labelAngle: 45 } });
    expect(result.encoding!.y!.aggregate).toBeUndefined();
    expect(result.encoding!.tooltip[1]).toMatchObject({
      title: 'Total',
      format: '.2f',
      field: result.encoding!.y!.field,
    });
    expect(result.data!.values!.map(row => row[result.encoding!.y!.field!])).toEqual([1, 2]);
    expect(prepare(result)).toEqual(result);
    expect(spec.transform).toHaveLength(4);
  });
  it.each(temporalExpectations)('materializes %s without aggregation or ordinal coercion', (timeUnit, expected) => {
    const result = prepare({
      mark: 'point',
      data: {
        values: [
          { d: '2024-02-14T19:27:43Z', v: 1 },
          { d: 'invalid', v: 2 },
        ],
      },
      encoding: { x: { field: 'd', type: 'temporal', timeUnit }, y: { field: 'v', type: 'quantitative' } },
    });
    expect(result.data!.values).toHaveLength(2);
    expect((result.data!.values![0][result.encoding!.x!.field!] as Date).toISOString()).toBe(expected);
    expect(result.data!.values![1][result.encoding!.x!.field!]).toBeNull();
    expect(result.encoding!.x!.type).toBe('temporal');
    expect(result.encoding!.x!.timeUnit).toBeUndefined();
  });
  it('standalone local day means weekday and date means month day', () => {
    const d = new Date(2024, 1, 14, 23, 45);
    const result = applyVegaTransforms(
      [{ d }],
      [
        { timeUnit: 'day', field: 'd', as: 'weekday' },
        { timeUnit: 'date', field: 'd', as: 'date' },
      ],
      strict,
    )[0];
    expect((result.weekday as Date).getDay()).toBe(3);
    expect((result.date as Date).getDate()).toBe(14);
  });
  it('preserves leap day, UTC offset boundaries, years below 100, epoch zero and stepped months', () => {
    const result = applyVegaTransforms(
      [{ d: '2024-03-01T00:30:00+02:00' }],
      [{ timeUnit: 'utcyearmonthdate', field: 'd', as: 'out' }],
      strict,
    )[0];
    expect((result.out as Date).toISOString()).toBe('2024-02-29T00:00:00.000Z');
    const early = applyVegaTransforms(
      [{ d: '0099-05-10T00:00:00Z' }],
      [{ timeUnit: 'utcyear', field: 'd', as: 'out' }],
      strict,
    )[0];
    expect((early.out as Date).getUTCFullYear()).toBe(99);
    const zero = applyVegaTransforms([{ d: 0 }], [{ timeUnit: 'utcyear', field: 'd', as: 'out' }], strict)[0];
    expect((zero.out as Date).getUTCFullYear()).toBe(1970);
    const stepped = applyVegaTransforms(
      [{ d: '2024-08-10T00:00:00Z' }],
      [{ timeUnit: { unit: 'utcmonth', step: 3 }, field: 'd', as: 'out' }],
      strict,
    )[0];
    expect((stepped.out as Date).toISOString()).toBe('2012-07-01T00:00:00.000Z');
  });
  it('anchors standalone weekday to Sunday January 1, 2012 in local and UTC time', () => {
    for (const timeUnit of ['day', 'utcday']) {
      const result = applyVegaTransforms(
        [{ d: new Date(2024, 0, 7, 12) }],
        [{ timeUnit, field: 'd', as: 'out' }],
        strict,
      )[0];
      const date = result.out as Date;
      expect(
        timeUnit === 'day'
          ? [date.getFullYear(), date.getMonth(), date.getDate(), date.getDay()]
          : [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCDay()],
      ).toEqual([2012, 0, 1, 0]);
    }
  });
  it('aggregates x, y and tooltip together grouping by every nonaggregated field channel', () => {
    const result = prepare({
      mark: 'bar',
      data: {
        values: [
          { c: 'red', o: 'A', t: 'u', x: 2, y: 4 },
          { c: 'red', o: 'A', t: 'u', x: 4, y: 8 },
          { c: 'red', o: 'B', t: 'u', x: 10, y: 12 },
        ],
      },
      encoding: {
        x: { field: 'x', aggregate: 'mean' },
        y: { field: 'y', aggregate: 'sum' },
        color: { field: 'c' },
        xOffset: { field: 'o' },
        tooltip: [{ field: 't' }, { field: 'y', aggregate: 'median', title: 'Median' }],
      },
    });
    const values = result.data!.values!;
    const tooltip = result.encoding!.tooltip;
    expect(values).toHaveLength(2);
    expect(values.map(r => r[result.encoding!.x!.field!])).toEqual([3, 10]);
    expect(values.map(r => r[result.encoding!.y!.field!])).toEqual([12, 12]);
    expect(values.map(r => r[tooltip[1].field])).toEqual([6, 12]);
    expect(tooltip[1].aggregate).toBeUndefined();
    expect(tooltip[1].title).toBe('Median');
    expect(result.encoding!.y!.aggregate).toBeUndefined();
  });
  it('clones frozen nested values, Dates, numeric and pollution-sensitive keys without getters', () => {
    const getter = jest.fn(() => 1);
    const row = Object.freeze(
      Object.defineProperty(
        { d: Object.freeze(new Date('2024-01-01Z')), nested: Object.freeze({ n: 5 }), 'a.b': 9, 0: 3 },
        'danger',
        { get: getter, enumerable: true },
      ),
    );
    const spec = Object.freeze({
      mark: 'point',
      data: Object.freeze({ values: Object.freeze([row]) }),
      encoding: Object.freeze({ x: Object.freeze({ field: 'nested.n' }), y: Object.freeze({ field: 'a\\.b' }) }),
    });
    const result = prepare(spec);
    expect(result.data!.values![0][result.encoding!.x!.field!]).toBe(5);
    expect(result.data!.values![0][result.encoding!.y!.field!]).toBe(9);
    expect(result.data!.values![0].d).toBeInstanceOf(Date);
    expect(result.data!.values![0].d).not.toBe(row.d);
    expect(result.data!.values![0]['0']).toBe(3);
    expect(getter).not.toHaveBeenCalled();
    expect(spec.encoding.x.field).toBe('nested.n');
  });
  it('inherits nested layer data/encoding and applies parent before child exactly once', () => {
    const result = prepare({
      data: { values: [{ v: 1 }] },
      encoding: { x: { field: 'v' } },
      transform: [{ calculate: 'datum.v + 1', as: 'v' }],
      layer: [
        {
          transform: [{ calculate: 'datum.v * 3', as: 'v' }],
          layer: [{ mark: 'point', transform: [{ calculate: 'datum.v + 4', as: 'v' }] }],
        },
        { mark: 'line' },
      ],
    });
    const nested = result.layer![0] as unknown as VegaLiteSpec;
    expect(nested.layer![0].data!.values).toEqual([{ v: 10 }]);
    expect(result.layer![1].data!.values).toEqual([{ v: 2 }]);
    expect(nested.layer![0].encoding!.x!.field).toBe('v');
    expect(result.transform).toBeUndefined();
    expect(nested.transform).toBeUndefined();
    expect(prepare(result)).toEqual(result);
  });
  it('resolves inline named datasets and child source overrides without external loading', () => {
    const result = prepare({
      datasets: { shared: [{ n: 2 }] },
      data: { name: 'shared' },
      transform: [{ calculate: 'datum.n * 2', as: 'n' }],
      hconcat: [{ mark: 'point' }, { mark: 'bar', data: { values: [{ n: 7 }] } }],
    });
    expect(result.hconcat![0].data!.values).toEqual([{ n: 4 }]);
    expect(result.hconcat![1].data!.values).toEqual([{ n: 7 }]);
    expect(() => prepare({ mark: 'line', data: { url: 'https://example.com/data' } })).toThrow(/data|url/i);
  });
  it('uses collision-free provenance aliases for temporal and aggregate fields', () => {
    const spec = {
      mark: 'line',
      data: {
        values: [
          { d: '2024-02-14Z', v: 2, __vega_0: 99 },
          { d: '2024-02-15Z', v: 4, __vega_0: 99 },
        ],
      },
      encoding: { x: { field: 'd', timeUnit: 'utcmonth' }, y: { field: 'v', aggregate: { exponential: 0.5 } } },
    };
    const result = prepare(spec);
    expect(result.data!.values).toHaveLength(1);
    expect(result.data!.values![0][result.encoding!.y!.field!]).toBeCloseTo(10 / 3);
    expect(result.encoding!.x!.field).not.toBe('__vega_0');
  });
  it('skips constant annotations, preserves line/point marks and retains unaggregated rows', () => {
    const spec = {
      data: { values: [{ v: 1 }, { v: 2 }] },
      layer: [
        {
          mark: { type: 'line', point: true },
          encoding: { x: { field: 'v' }, color: { value: 'red', title: 'Annotation', aggregate: 'bogus' } },
        },
        { mark: 'point', encoding: { x: { field: 'v' }, y: { datum: 0, field: 'annotation', timeUnit: 'bogus' } } },
      ],
    };
    const result = prepare(spec);
    expect(result.layer![0].mark).toEqual({ type: 'line', point: true });
    expect(result.layer![1].mark).toBe('point');
    expect(result.layer!.map(layer => layer.data!.values)).toEqual([
      [{ v: 1 }, { v: 2 }],
      [{ v: 1 }, { v: 2 }],
    ]);
    expect(result.layer![0].encoding!.color).toEqual(spec.layer[0].encoding.color);
    expect(result.layer![1].encoding!.y).toEqual(spec.layer[1].encoding.y);
    expect(prepare(result)).toEqual(result);
    expect(spec.data.values).toEqual([{ v: 1 }, { v: 2 }]);
  });
  it('deduplicates inherited temporal/aggregate definitions without mutating any source or allocating duplicate aliases', () => {
    const shared = { field: 'd', type: 'temporal', timeUnit: 'utcmonth' };
    const spec = {
      data: {
        values: [
          { d: '2024-02-14Z', v: 2 },
          { d: '2024-02-15Z', v: 4 },
        ],
      },
      encoding: { x: shared },
      transform: [{ calculate: 'datum.v + 1', as: 'v' }],
      layer: [
        {
          mark: 'line',
          encoding: { tooltip: [{ ...shared }, { field: 'v', aggregate: 'sum' }], y: { field: 'v', aggregate: 'sum' } },
        },
        { mark: 'point', encoding: { y: { field: 'v' } } },
      ],
    };
    const result = prepare(spec);
    const line = result.layer![0];
    expect(line.encoding!.x!.field).toBe(line.encoding!.tooltip[0].field);
    expect(line.encoding!.y!.field).toBe(line.encoding!.tooltip[1].field);
    expect(line.data!.values).toHaveLength(1);
    expect(line.data!.values![0][line.encoding!.y!.field!]).toBe(8);
    expect(result.layer![1].data!.values!.map(row => row.v)).toEqual([3, 5]);
    expect(shared).toEqual({ field: 'd', type: 'temporal', timeUnit: 'utcmonth' });
    expect(spec.transform).toHaveLength(1);
    expect(prepare(result)).toEqual(result);
  });
});
