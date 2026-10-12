import { aggregateVegaValues, applyVegaTransforms, prepareVegaLiteSpec, readVegaField } from './VegaLiteDataTransforms';
import type { VegaLiteSpec } from './VegaLiteTypes';

const strict = { mode: 'strict' as const };
const transform = (rows: Record<string, unknown>[], spec: Record<string, unknown>) =>
  applyVegaTransforms(rows, [spec], strict);
const closePoints = (rows: Record<string, unknown>[], expected: number[][], x = 'x', y = 'y') => {
  expect(rows).toHaveLength(expected.length);
  rows.forEach((row, i) => {
    expect(row[x]).toBeCloseTo(expected[i][0], 12);
    expect(row[y]).toBeCloseTo(expected[i][1], 11);
  });
};

// Numerical oracles executed directly from tagged upstream sources, not this implementation:
// https://github.com/vega/vega/tree/v6.4.0/packages/vega-statistics/src
// regression/loess.js + points.js + ols.js; bandwidth.js; kde.js; normal.js; sampleCurve.js.
// Vega-Lite density's default resolve='shared' and alias fallbacks are pinned separately:
// https://github.com/vega/vega-lite/tree/v6.4.1/src/compile/data
const quadratic = Array.from({ length: 10 }, (_, x) => ({ x, y: x * x }));
const quadraticFit = [
  -1.1623902762975042, 1.9766127409522767, 5.314521258765684, 10.320274990770066, 17.313061815746963, 26.31306181574696,
  37.320274990770066, 50.314521258765694, 64.97661274095228, 79.8376097237025,
];

describe('strict statistics spec fixtures', () => {
  it('prepares a complete LOESS spec with the tagged numerical curve and no residual transform', () => {
    const spec: VegaLiteSpec = {
      mark: 'line',
      data: { values: quadratic },
      transform: [{ loess: 'y', on: 'x', bandwidth: 0.6 }],
      encoding: { x: { field: 'x', type: 'quantitative' }, y: { field: 'y', type: 'quantitative' } },
    };
    const out = prepareVegaLiteSpec(spec, strict);
    closePoints(
      out.data!.values!,
      quadraticFit.map((y, x) => [x, y]),
    );
    expect(out.transform).toBeUndefined();
    expect(spec.data!.values).toEqual(quadratic);
    expect(spec.transform).toHaveLength(1);
  });
  it('prepares a complete grouped KDE spec using Lite shared-domain resolution and numerical values', () => {
    const spec: VegaLiteSpec = {
      mark: 'line',
      data: {
        values: [
          { g: 'a', v: 0 },
          { g: 'a', v: 2 },
          { g: 'b', v: 1 },
        ],
      },
      transform: [{ density: 'v', groupby: ['g'], bandwidth: 1, steps: 2 }],
      encoding: {
        x: { field: 'value', type: 'quantitative' },
        y: { field: 'density', type: 'quantitative' },
        color: { field: 'g', type: 'nominal' },
      },
    };
    const out = prepareVegaLiteSpec(spec, strict);
    closePoints(
      out.data!.values!.filter(row => row.g === 'a'),
      [
        [0, 0.2264666234573104],
        [1, 0.24197072451914337],
        [2, 0.2264666234573104],
      ],
      'value',
      'density',
    );
    expect(out.data!.values!.filter(row => row.g === 'b').map(row => row.value)).toEqual([0, 1, 2]);
    expect(out.data!.values!.filter(row => row.g === 'b')[1].density).toBeCloseTo(1 / Math.sqrt(2 * Math.PI), 12);
    expect(out.transform).toBeUndefined();
    expect(out.encoding!.color!.field).toBe('g');
  });
});

describe('faithful Vega LOESS', () => {
  it('fits a curved signal with local tricube regression rather than a moving average', () => {
    closePoints(
      transform(quadratic, { loess: 'y', on: 'x', bandwidth: 0.6 }),
      quadraticFit.map((y, x) => [x, y]),
    );
  });
  it('performs both robust bisquare reweighting passes for a large outlier', () => {
    const rows = Array.from({ length: 15 }, (_, x) => ({ x, y: x === 7 ? 80 : Math.sin(x / 2) + x / 3 }));
    const expected = [
      0.23427084631267991, 0.7636923254892105, 1.2773079795547426, 1.7714531993884455, 2.166538211208338,
      2.358856267108999, 2.187190791770881, 2.19691694484799, 2.1621748236018945, 1.9385870267560765, 2.452235189606956,
      3.107251468489756, 3.810652026620511, 4.524577012310594, 5.247418100579307,
    ];
    closePoints(
      transform(rows, { loess: 'y', on: 'x', bandwidth: 0.6 }),
      expected.map((y, x) => [x, y]),
    );
  });
  it('numerically sorts x, moves over duplicate neighbors and averages repeated output x', () => {
    const rows = [
      [2, 8],
      [0, 0],
      [1, 1],
      [1, 3],
      [3, 9],
      [4, 16],
    ].map(([x, y]) => ({ x: String(x), y }));
    closePoints(transform(rows, { loess: 'y', on: 'x', bandwidth: 0.8 }), [
      [0, -8.881784197001252e-16],
      [1, 2],
      [2, 8],
      [3, 10.925555893602393],
      [4, 15.378898270264397],
    ]);
  });
  it('mean-centers large coordinates before fitting', () => {
    closePoints(
      transform(
        quadratic.map(({ x, y }) => ({ x: x + 1e9, y: y + 1e9 })),
        { loess: 'y', on: 'x', bandwidth: 0.6 },
      ),
      quadraticFit.map((y, x) => [x + 1e9, y + 1e9]),
    );
  });
  it('keeps independent groups, resolves field paths and custom output names without source columns', () => {
    const rows = [0, 1, 2].flatMap(x => [
      { g: 'a', nested: { x, y: x * 2 + 1 }, private: 1 },
      { g: 'b', nested: { x, y: x * 3 + 10 }, private: 2 },
    ]);
    const out = transform(rows, { loess: 'nested.y', on: 'nested.x', groupby: ['g'], as: ['u', 'v'], bandwidth: 1 });
    expect(out).toEqual([
      { g: 'a', u: 0, v: 1 },
      { g: 'a', u: 1, v: 3 },
      { g: 'a', u: 2, v: 5 },
      { g: 'b', u: 0, v: 10 },
      { g: 'b', u: 1, v: 13 },
      { g: 'b', u: 2, v: 16 },
    ]);
    expect(rows[0].private).toBe(1);
  });
  it('matches regression points coercion: empty strings and booleans are numeric, null and NaN are skipped', () => {
    closePoints(
      transform(
        [
          { x: '', y: '1' },
          { x: true, y: 3 },
          { x: '2', y: 5 },
          { x: null, y: 200 },
          { x: undefined, y: 300 },
          { x: 'bad', y: 400 },
          { x: 3, y: NaN },
        ],
        { loess: 'y', on: 'x', bandwidth: 1 },
      ),
      [
        [0, 1],
        [1, 3],
        [2, 5],
      ],
    );
  });
  it('converts Dates without calling user coercion hooks', () => {
    const hook = jest.fn(() => 1);
    const rows = [
      { x: new Date(0), y: 1 },
      { x: new Date(1), y: 3 },
      { x: new Date(2), y: 5 },
      { x: { valueOf: hook }, y: 99 },
    ];
    closePoints(transform(rows, { loess: 'y', on: 'x', bandwidth: 1 }), [
      [0, 1],
      [1, 3],
      [2, 5],
    ]);
    expect(hook).not.toHaveBeenCalled();
  });
  it('preserves upstream singleton NaN and constant-x mean instead of inventing a fit', () => {
    expect(transform([{ x: 1, y: 2 }], { loess: 'y', on: 'x' })).toEqual([{ x: 1, y: NaN }]);
    expect(
      transform(
        [
          { x: 1, y: 2 },
          { x: 1, y: 4 },
        ],
        { loess: 'y', on: 'x' },
      ),
    ).toEqual([{ x: 1, y: 3 }]);
  });
  it('handles no points and groups with no valid pairs', () => {
    expect(transform([], { loess: 'y', on: 'x' })).toEqual([]);
    expect(transform([{ g: 'a', x: null, y: 1 }], { loess: 'y', on: 'x', groupby: ['g'] })).toEqual([]);
  });
  it('uses upstream bandwidth zero fallback and default aliases', () => {
    expect(transform(quadratic, { loess: 'y', on: 'x', bandwidth: 0 })).toEqual(
      transform(quadratic, { loess: 'y', on: 'x' }),
    );
    expect(transform(quadratic, { loess: 'y', on: 'x', as: ['u', null] }).map(r => r.y)).toEqual(
      transform(quadratic, { loess: 'y', on: 'x' }).map(r => r.y),
    );
  });
  it.each([-0.1, 1.1, NaN, Infinity, '0.3'])('rejects invalid bandwidth %s even on empty input', bandwidth => {
    expect(() => transform([], { loess: 'y', on: 'x', bandwidth })).toThrow(/bandwidth/i);
  });
  it.each([
    { loess: 'y' },
    { loess: 'y', on: 4 },
    { loess: 'y', on: 'x', groupby: 'g' },
    { loess: 'y', on: 'x', as: ['u', 3] },
    { loess: 'y', on: 'x', iterations: 9 },
  ])('rejects malformed or unsupported transform %j', spec => {
    expect(() => transform([], spec)).toThrow(/requires|invalid|unsupported/i);
  });
});

describe('faithful Vega Gaussian KDE', () => {
  const pdf = [0.2264666234573104, 0.24079146121509565, 0.24197072451914337, 0.24079146121509565, 0.2264666234573104];
  const cdf = [0.2613750659740896, 0.37913483127143555, 0.5, 0.6208651687285645, 0.7386249340259103];
  it.each([false, true])('matches upstream numerical %s cumulative curve, endpoints included', cumulative => {
    closePoints(
      transform([{ v: 0 }, { v: 2 }], { density: 'v', bandwidth: 1, steps: 4, cumulative }),
      (cumulative ? cdf : pdf).map((y, i) => [i / 2, y]),
      'value',
      'density',
    );
  });
  it.each([false, true])('counts scale %s cumulative by group sample size, not total source rows', cumulative => {
    const out = transform(
      [
        { g: 'a', v: 0 },
        { g: 'a', v: 2 },
        { g: 'b', v: 1 },
      ],
      { density: 'v', bandwidth: 1, steps: 4, extent: [0, 2], groupby: ['g'], counts: true, cumulative },
    );
    closePoints(
      out.filter(r => r.g === 'a'),
      (cumulative ? cdf : pdf).map((y, i) => [i / 2, 2 * y]),
      'value',
      'density',
    );
    expect(out.filter(r => r.g === 'b')[2].density).toBeCloseTo(cumulative ? 0.5 : 1 / Math.sqrt(2 * Math.PI), 12);
  });
  it('selects Scott/Vega bandwidth using 1.06 and sample deviation / IQR, not Silverman nrd0', () => {
    const expected = [
      0.06520843248766704, 0.13478623564176842, 0.182199819195564, 0.1951311769923215, 0.18219981919556397,
      0.13478623564176842, 0.06520843248766704,
    ];
    closePoints(
      transform(
        [1, 2, 3, 4, 5].map(v => ({ v })),
        { density: 'v', extent: [0, 6], steps: 6 },
      ),
      expected.map((y, x) => [x, y]),
      'value',
      'density',
    );
  });
  it.each([
    [[0, 0, 0, 0, 100], 34.35791984988657],
    [[5], 5.300000000000001],
    [[0, 0, 0], 0.8509060554658446],
    [[5, 5, 5], 4.2545302773292235],
  ])('uses the verified bandwidth fallback for %j', (values, bandwidth) => {
    const x = values[0];
    const expected =
      values.reduce((sum, value) => sum + Math.exp(-0.5 * ((x - value) / bandwidth) ** 2), 0) /
      (values.length * bandwidth * Math.sqrt(2 * Math.PI));
    expect(
      transform(
        values.map(v => ({ v })),
        { density: 'v', extent: [x, x + 1], steps: 1 },
      )[0].density,
    ).toBeCloseTo(expected, 12);
  });
  it('defaults to shared Vega-Lite domains and maxsteps while independent uses local domains', () => {
    const rows = [
      { g: 'a', v: 0 },
      { g: 'a', v: 2 },
      { g: 'b', v: 4 },
      { g: 'b', v: 8 },
    ];
    const shared = transform(rows, { density: 'v', groupby: ['g'], bandwidth: 1, maxsteps: 4 });
    expect(shared.filter(r => r.g === 'a').map(r => r.value)).toEqual([0, 2, 4, 6, 8]);
    expect(shared.filter(r => r.g === 'b').map(r => r.value)).toEqual([0, 2, 4, 6, 8]);
    const independent = transform(rows, {
      density: 'v',
      groupby: ['g'],
      bandwidth: 1,
      steps: 4,
      resolve: 'independent',
    });
    expect(independent.filter(r => r.g === 'a').map(r => r.value)).toEqual([0, 0.5, 1, 1.5, 2]);
    expect(independent.filter(r => r.g === 'b').map(r => r.value)).toEqual([4, 5, 6, 7, 8]);
    expect(shared).toEqual(
      transform(rows, { density: 'v', groupby: ['g'], bandwidth: 1, maxsteps: 4, resolve: 'shared' }),
    );
  });
  it('adapts independent curves using normalized angular error and the maximum resolution', () => {
    const expected = [
      [-1, 0.021910375617264968],
      [-0.875, 0.045576041473259846],
      [-0.75, 0.08598284481054302],
      [-0.625, 0.14712126425225483],
      [-0.5, 0.22831135837877967],
      [-0.25, 0.410201277853377],
      [-0.125, 0.47491362872627296],
      [0, 0.49867970890118424],
      [0.125, 0.4749217011683799],
      [0.25, 0.4102360032307554],
      [0.5, 0.2287521013392367],
      [0.625, 0.14847620402929337],
      [0.75, 0.08976066732736332],
      [0.875, 0.05512929874367318],
      [1, 0.043820751233921346],
      [1.125, 0.05512929874367318],
      [1.25, 0.08976066732736332],
      [1.375, 0.14847620402929337],
      [1.5, 0.2287521013392367],
      [1.75, 0.4102360032307554],
      [1.875, 0.4749217011683799],
      [2, 0.49867970890118424],
      [2.125, 0.47491362872627296],
      [2.25, 0.410201277853377],
      [2.5, 0.22831135837877967],
      [2.625, 0.14712126425225483],
      [2.75, 0.08598284481054302],
      [2.875, 0.045576041473259846],
      [3, 0.021910375617264968],
    ];
    closePoints(
      transform([{ v: 0 }, { v: 2 }], {
        density: 'v',
        bandwidth: 0.4,
        extent: [-1, 3],
        minsteps: 4,
        maxsteps: 32,
        resolve: 'independent',
      }),
      expected,
      'value',
      'density',
    );
  });
  it('steps override minsteps/maxsteps and shared groups still select their own bandwidths', () => {
    const out = transform(
      [
        { g: 'a', v: 0 },
        { g: 'a', v: 0 },
        { g: 'b', v: 5 },
        { g: 'b', v: 5 },
      ],
      { density: 'v', groupby: ['g'], steps: 4, minsteps: 10, maxsteps: 20 },
    );
    expect(out.filter(r => r.g === 'a').map(r => r.value)).toEqual([0, 1.25, 2.5, 3.75, 5]);
    expect(out[0].density).toBeCloseTo(1 / (1.06 * 2 ** -0.2 * Math.sqrt(2 * Math.PI)), 12);
    expect(out[9].density).toBeCloseTo(1 / (5.3 * 2 ** -0.2 * Math.sqrt(2 * Math.PI)), 12);
  });
  it('matches CDF extreme tails, including West continued fraction beyond 7.071 sigma', () => {
    const out = transform([{ v: 0 }], { density: 'v', bandwidth: 1, extent: [-8, 8], steps: 2, cumulative: true });
    // Tagged West approximation, not the analytically exact normal tail.
    expect(out[0].density).toBeCloseTo(6.220960520142783e-16, 28);
    expect(out[1].density).toBe(0.5);
    expect(out[2].density).toBeCloseTo(1 - 6.220960520142783e-16, 15);
    expect(
      transform([{ v: 0 }], { density: 'v', bandwidth: 1, extent: [-40, 40], steps: 2, cumulative: true }).map(
        r => r.density,
      ),
    ).toEqual([0, 0.5, 1]);
  });
  it('supports constant domains, empty input, safe aliases and nested group fields', () => {
    const out = transform([{ meta: { g: '__proto__' }, v: 5 }], {
      density: 'v',
      groupby: ['meta.g'],
      bandwidth: 1,
      steps: 2,
      as: ['__proto__', 'constructor'],
    });
    expect(out.map(r => readVegaField(r, '__proto__'))).toEqual([5, 5, 5]);
    out.forEach(row => {
      expect(row['meta.g']).toBe('__proto__');
      expect(readVegaField(row, 'constructor')).toBeCloseTo(1 / Math.sqrt(2 * Math.PI), 12);
      expect(Object.getPrototypeOf(row)).toBe(Object.prototype);
    });
    expect(transform([], { density: 'v' })).toEqual([]);
    expect(transform([], { density: 'v', groupby: ['g'], extent: [0, 1] })).toEqual([]);
  });
  it('retains raw KDE support: null/empty strings coerce to zero rather than being dropped', () => {
    const out = transform([{ v: null }, { v: '' }, { v: 2 }], { density: 'v', bandwidth: 1, extent: [0, 2], steps: 2 });
    expect(out[0].density).toBeCloseTo((2 + Math.exp(-2)) / (3 * Math.sqrt(2 * Math.PI)), 12);
    const invalid = transform([{ v: 0 }, { v: 'bad' }], { density: 'v', bandwidth: 1, extent: [0, 1], steps: 1 });
    expect(invalid.map(r => r.density)).toEqual([NaN, NaN]);
  });
  it('uses upstream zero/default sampling parameters and enforces minsteps above maxsteps independently', () => {
    const rows = [{ v: 0 }, { v: 2 }];
    const defaultCurve = transform(rows, { density: 'v' });
    expect(defaultCurve).toHaveLength(201);
    expect(defaultCurve).toEqual(transform(rows, { density: 'v', bandwidth: 0, steps: 0, minsteps: 0, maxsteps: 0 }));
    closePoints(
      transform(rows, { density: 'v', bandwidth: 1, minsteps: 4, maxsteps: 2, resolve: 'independent' }),
      pdf.map((y, i) => [i / 2, y]),
      'value',
      'density',
    );
  });
  it('uses each group bandwidth and treats partially specified output aliases like the Lite compiler', () => {
    const rows = [{ v: 0 }, { v: 2 }];
    expect(transform(rows, { density: 'v', bandwidth: 1, steps: 4, as: [null, 'p'] })).toEqual(
      pdf.map((p, i) => ({ value: i / 2, p })),
    );
  });
  it('does not execute density support object coercion hooks', () => {
    const hook = jest.fn(() => 0);
    const out = transform([{ v: 0 }, { v: { valueOf: hook, toString: hook } }], {
      density: 'v',
      bandwidth: 1,
      extent: [0, 1],
      steps: 1,
    });
    expect(out.map(r => r.density)).toEqual([NaN, NaN]);
    expect(hook).not.toHaveBeenCalled();
  });
  it.each([
    { density: 'v', bandwidth: -1 },
    { density: 'v', bandwidth: NaN },
    { density: 'v', bandwidth: Infinity },
    { density: 'v', steps: -1 },
    { density: 'v', steps: 1.5 },
    { density: 'v', minsteps: Infinity },
    { density: 'v', extent: [2, 1] },
    { density: 'v', extent: [0, Infinity] },
    { density: 'v', extent: [0] },
    { density: 'v', cumulative: 'yes' },
    { density: 'v', counts: 1 },
    { density: 'v', resolve: 'union' },
    { density: 2 },
    { density: 'v', groupby: [2] },
    { density: 'v', as: 'out' },
  ])('rejects invalid parameters on empty input %j', spec => {
    expect(() => transform([], spec)).toThrow(/invalid|requires/i);
  });
});

describe('statistical safety and scalar validity', () => {
  it.each(['strict', 'legacy'] as const)('never swallows LOESS/KDE work-budget limits in %s mode', mode => {
    const options = { mode };
    const runs = [
      () =>
        applyVegaTransforms(
          Array.from({ length: 2000 }, (_, x) => ({ x, y: x })),
          [{ loess: 'y', on: 'x', bandwidth: 1 }],
          options,
        ),
      () => applyVegaTransforms([{ v: 1 }], [{ density: 'v', steps: 1e9 }], options),
      () =>
        applyVegaTransforms(
          Array.from({ length: 20000 }, (_, v) => ({ v })),
          [{ density: 'v', steps: 200 }],
          options,
        ),
    ];
    runs.forEach(run => {
      try {
        run();
        throw new Error('budget was not enforced');
      } catch (error) {
        expect(error).toMatchObject({ code: 'WORKBUDGET' });
      }
    });
  });
  it('uses raw aggregate validity, not successful numeric coercion, for scalar denominators', () => {
    const rows = [2, 'bad', null, '', NaN].map(v => ({ v }));
    expect(aggregateVegaValues(rows, 'v', 'valid', strict)).toBe(2);
    expect(aggregateVegaValues(rows, 'v', 'missing', strict)).toBe(2);
    for (const op of ['mean', 'sum', 'product', 'variance', 'variancep', 'stdev', 'stderr']) {
      expect(aggregateVegaValues(rows, 'v', op, strict)).toBeNaN();
    }
    expect(aggregateVegaValues(rows, 'v', 'median', strict)).toBe(2);
  });
  it('retains string addition in the tagged exponential accumulator', () => {
    // AggregateOps.exponential: 2 -> .5*2+'4' = '14' -> .5*'14'+6 = 13.
    expect(aggregateVegaValues([{ v: 2 }, { v: '4' }, { v: 6 }], 'v', { exponential: 0.5 }, strict)).toBeCloseTo(
      52 / 7,
      12,
    );
  });
  it('keeps numeric strings and booleans in sample variance while skipping only raw missing/NaN', () => {
    const rows = [false, '2', 4, null, '', undefined, NaN].map(v => ({ v }));
    expect(aggregateVegaValues(rows, 'v', 'valid', strict)).toBe(3);
    expect(aggregateVegaValues(rows, 'v', 'missing', strict)).toBe(3);
    expect(aggregateVegaValues(rows, 'v', 'mean', strict)).toBe(2);
    expect(aggregateVegaValues(rows, 'v', 'variance', strict)).toBe(4);
    expect(aggregateVegaValues(rows, 'v', 'variancep', strict)).toBeCloseTo(8 / 3, 12);
  });
});
