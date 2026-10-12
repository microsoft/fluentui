import { validateVegaLiteSpec } from './VegaLiteDiagnostics';
import type { VegaLiteDiagnostic } from './VegaLiteDiagnostics';
import type { VegaLiteSpec } from './VegaLiteTypes';
import { applyVegaTransforms, prepareVegaLiteSpec } from './VegaLiteDataTransforms';
import { canRenderVegaRangedSpec, getVegaRangedGeometry } from './VegaLiteRangedGeometry';
import { buildVegaTooltip } from './VegaLiteTooltip';
import { parseVegaDataValues } from './VegaLiteResourceLoader';
import { buildVegaViewTree } from './VegaLiteViewTree';
import { canRenderVegaCenteredAreaSpec, getVegaCenteredAreaGeometry } from './VegaLiteCenteredArea';
import {
  transformVegaLiteToVerticalStackedBarChartProps,
  transformVegaLiteToAreaChartProps,
} from './VegaLiteSchemaAdapter';
import { specificationCorpus } from './testing/specs/manifest';
import { binRows, binBounds, stackRows, stackBounds, isoTemporalExpectations } from './testing/fixtures/data-semantics';
import * as integrationFixtures from '../../testing/fixtures/integration';

const xy = {
  x: { field: 'x', type: 'quantitative' },
  y: { field: 'y', type: 'quantitative' },
};
const unit = (properties: Record<string, unknown> = {}): VegaLiteSpec =>
  ({ mark: 'line', encoding: xy, data: { values: [{ x: 1, y: 2 }] }, ...properties } as VegaLiteSpec);
const raw = (value: unknown): VegaLiteSpec => value as VegaLiteSpec;
const paths = (diagnostics: VegaLiteDiagnostic[], code: string): string[] =>
  diagnostics.filter(item => item.code === code).map(item => item.path);

describe('strict field-bound tooltip filter grammar', () => {
  const filtered = (filter: unknown, definition: Record<string, unknown> = {}) =>
    unit({ encoding: { ...xy, tooltip: [{ field: 'y', ...definition, filter }] } });
  it.each([
    { equal: 0 },
    { equal: false },
    { equal: 'ordinary string' },
    { valid: true },
    { valid: false },
    { oneOf: [0, 2] },
    { oneOf: ['a', 'b'] },
    { oneOf: [true, false] },
    { range: [null, 0] },
    { range: [0, null] },
    { range: [null, null] },
    { lt: 0 },
    { lte: 'z' },
    { gt: -1 },
    { gte: 0 },
    { and: [{ gte: 0 }, { or: [{ equal: 0 }, { not: { valid: false } }] }] },
  ])('accepts supported bound predicate %j without inspecting row values', filter => {
    expect(validateVegaLiteSpec(filtered(filter), { mode: 'strict' })).toEqual([]);
  });
  it.each([
    [null, '', 'invalid-tooltip-filter'],
    ['datum.y > 0', '', 'invalid-tooltip-filter'],
    [{}, '', 'invalid-tooltip-filter'],
    [{ equal: 0, gt: 1 }, '', 'invalid-tooltip-filter'],
    [{ and: [] }, '.and', 'invalid-tooltip-filter'],
    [{ or: true }, '.or', 'invalid-tooltip-filter'],
    [{ not: null }, '.not', 'invalid-tooltip-filter'],
    [{ valid: 'true' }, '.valid', 'invalid-tooltip-filter'],
    [{ equal: null }, '.equal', 'invalid-tooltip-filter'],
    [{ gt: false }, '.gt', 'invalid-tooltip-filter'],
    [{ range: [0] }, '.range', 'invalid-tooltip-filter'],
    [{ range: ['a', 1] }, '.range[0]', 'invalid-tooltip-filter'],
    [{ oneOf: [0, 'a'] }, '.oneOf', 'invalid-tooltip-filter'],
    [{ oneOf: [null] }, '.oneOf[0]', 'invalid-tooltip-filter'],
    [{ equal: { year: '2024' } }, '.equal.year', 'invalid-tooltip-filter'],
    [{ equal: { month: 'invented' } }, '.equal.month', 'invalid-tooltip-filter'],
    [{ equal: { day: 'invented' } }, '.equal.day', 'invalid-tooltip-filter'],
    [{ equal: { utc: 'true', year: 2024 } }, '.equal.utc', 'invalid-tooltip-filter'],
    [{ equal: { month: 13 } }, '.equal.month', 'invalid-tooltip-filter'],
    [{ equal: { quarter: 0 } }, '.equal.quarter', 'invalid-tooltip-filter'],
    [{ equal: { hours: NaN } }, '.equal.hours', 'invalid-tooltip-filter'],
    [{ equal: { year: 2024, unrelated: 1 } }, '.equal.unrelated', 'unsupported-property'],
    [{ range: [Infinity, 1] }, '.range[0]', 'invalid-tooltip-filter'],
    [{ and: [{ equal: 0 }, { not: { valid: 1 } }] }, '.and[1].not.valid', 'invalid-tooltip-filter'],
    [{ and: [{ equal: 0 }, { field: 'secret', equal: 1 }] }, '.and[1].field', 'unsupported-property'],
    [{ timeUnit: 'year', equal: 0 }, '.timeUnit', 'unsupported-property'],
    [{ unknown: true }, '.unknown', 'unsupported-property'],
    [{ equal: { signal: 'secret' } }, '.equal.signal', 'unsupported-property'],
  ])('diagnoses %j at its precise predicate path', (filter, suffix, code) => {
    for (const mode of ['legacy', 'strict'] as const) {
      const diagnostics = validateVegaLiteSpec(filtered(filter), { mode });
      expect(diagnostics).toContainEqual(
        expect.objectContaining({
          code,
          path: `$.encoding.tooltip[0].filter${suffix}`,
          severity: mode === 'strict' || code === 'invalid-tooltip-filter' ? 'error' : 'warning',
        }),
      );
      expect(diagnostics.every(item => typeof item.path === 'string' && !!item.remedy)).toBe(true);
    }
  });
  it('accepts safe DateTime bounds structurally on empty data without executing tooltip calculations', () => {
    const spec = filtered(
      { range: [{ year: 2024, month: 'Feb', date: 29, utc: true }, { year: 2025 }] },
      {
        type: 'temporal',
        field: 'date',
      },
    );
    spec.data = { values: [] };
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
  });
  it('accepts ordinary string comparisons, boolean membership and DateTime alternatives on empty sources', () => {
    for (const filter of [
      { equal: 'not a date' },
      { oneOf: [true, false] },
      { oneOf: [{ year: 2024 }, { month: 'Feb', day: 'Monday' }] },
      { and: [{ lte: { year: 2025 } }, { not: { valid: false } }] },
    ]) {
      const spec = filtered(filter);
      spec.data = { values: [] };
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    }
  });
  it('validates sparse logical and bound entries, rather than skipping missing array elements', () => {
    const hole = new Array(1);
    expect(validateVegaLiteSpec(filtered({ and: hole }), { mode: 'strict' })).toContainEqual(
      expect.objectContaining({ code: 'invalid-tooltip-filter', path: '$.encoding.tooltip[0].filter.and[0]' }),
    );
    expect(validateVegaLiteSpec(filtered({ oneOf: hole }), { mode: 'strict' })).toContainEqual(
      expect.objectContaining({ code: 'invalid-tooltip-filter', path: '$.encoding.tooltip[0].filter.oneOf[0]' }),
    );
  });
  it('rejects filter outside a tooltip-array field definition and retains unrelated property diagnostics', () => {
    for (const channel of ['x', 'y', 'color', 'tooltip']) {
      const spec = unit({ encoding: { ...xy, [channel]: { field: 'x', filter: { gt: 0 }, ignored: true } } });
      expect(paths(validateVegaLiteSpec(spec, { mode: 'strict' }), 'unsupported-property')).toEqual([
        `$.encoding.${channel}.filter`,
        `$.encoding.${channel}.ignored`,
      ]);
    }
    expect(
      paths(
        validateVegaLiteSpec(unit({ encoding: { ...xy, tooltip: [{ value: 0, filter: { gt: 0 } }] } })),
        'invalid-field',
      ),
    ).toContain('$.encoding.tooltip[0].field');
  });
  it('never invokes getters, even inside short-circuited logical branches', () => {
    const getter = jest.fn(() => 0);
    const leaf = {};
    Object.defineProperty(leaf, 'equal', { get: getter, enumerable: true });
    expect(validateVegaLiteSpec(filtered({ or: [{ equal: 2 }, leaf] }), { mode: 'strict' })).toContainEqual(
      expect.objectContaining({ code: 'unsafe-accessor', path: '$.encoding.tooltip[0].filter.or[1].equal' }),
    );
    expect(getter).not.toHaveBeenCalled();
  });
});

describe('strict shared-scale compatibility', () => {
  const child = (type: string | undefined, name = 'x', scale?: Record<string, unknown>) =>
    unit({ data: { values: [] }, encoding: { x: { field: name, type, ...(scale ? { scale } : {}) }, y: xy.y } });
  it.each(['layer', 'hconcat', 'vconcat', 'concat'])('reports heterogeneous %s explicitly shared x families', kind => {
    const spec = { [kind]: [child('quantitative'), child('nominal', 'category')], resolve: { scale: { x: 'shared' } } };
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toContainEqual(
      expect.objectContaining({
        code: 'incompatible-shared-scale',
        path: '$.resolve.scale.x',
        severity: 'error',
      }),
    );
  });
  it('diagnoses default shared layer scales under facets at the conflicting child endpoint', () => {
    const spec = { facet: { field: 'group' }, spec: { layer: [child('quantitative'), child('nominal')] } };
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toContainEqual(
      expect.objectContaining({
        code: 'incompatible-shared-scale',
        path: '$.spec.layer[1].encoding.x',
      }),
    );
  });
  it('reports supported native y-log versus y-linear shared scales without claiming x-log support', () => {
    const children = [undefined, 'log'].map(type =>
      unit({
        encoding: { ...xy, y: { ...xy.y, scale: { type } } },
      }),
    );
    expect(
      validateVegaLiteSpec({ hconcat: children, resolve: { scale: { y: 'shared' } } }, { mode: 'strict' }),
    ).toContainEqual(expect.objectContaining({ code: 'incompatible-shared-scale', path: '$.resolve.scale.y' }));
  });
  it('accepts homogeneous different fields and default independent concat axes', () => {
    for (const spec of [
      { hconcat: [child('quantitative'), child('quantitative', 'other')], resolve: { scale: { x: 'shared' } } },
      { hconcat: [child('quantitative'), child('nominal')] },
      { layer: [child('nominal'), child('ordinal', 'other')] },
    ]) {
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    }
  });
  it('does not expose independently resolved nested axes to an outer shared domain', () => {
    const nested = { hconcat: [child('nominal')], resolve: { scale: { x: 'independent' } } };
    expect(
      validateVegaLiteSpec(
        { hconcat: [child('quantitative'), nested], resolve: { scale: { x: 'shared' } } },
        { mode: 'strict' },
      ),
    ).toEqual([]);
  });
  it('honors a nested layer independent boundary, even with an explicit shared outer axis', () => {
    const nested = { layer: [child('nominal')], resolve: { scale: { x: 'independent' } } };
    expect(
      validateVegaLiteSpec(
        { hconcat: [child('quantitative'), nested], resolve: { scale: { x: 'shared' } } },
        { mode: 'strict' },
      ),
    ).toEqual([]);
  });
  it('does not infer unknown transformed fields or execute inherited/coercible row values', () => {
    const hook = jest.fn(() => 1);
    const data = { values: [{ x: { valueOf: hook }, y: 2 }] };
    const spec = {
      data,
      hconcat: [
        child('quantitative'),
        {
          mark: 'point',
          transform: [{ calculate: 'datum.y', as: 'derived' }],
          encoding: { x: { field: 'derived' }, y: xy.y },
        },
      ],
      resolve: { scale: { x: 'shared' } },
    };
    expect(paths(validateVegaLiteSpec(spec, { mode: 'strict' }), 'incompatible-shared-scale')).toEqual([]);
    expect(hook).not.toHaveBeenCalled();
  });
  it('infers undefined types from inherited own data while never coercing unknown values', () => {
    const spec = {
      data: { values: [{ x: 0, category: 'a', y: 2 }] },
      layer: [
        unit({ data: undefined, encoding: { x: { field: 'x', type: undefined }, y: xy.y } }),
        unit({ data: undefined, encoding: { x: { field: 'category', type: undefined }, y: xy.y } }),
      ],
    };
    // Omit absent data rather than authoring an invalid data:undefined declaration.
    spec.layer.forEach(item => delete item.data);
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toContainEqual(
      expect.objectContaining({
        code: 'incompatible-shared-scale',
        path: '$.layer[1].encoding.x',
      }),
    );
  });
});

describe('axis suppression renderer capability', () => {
  const geometryUnits = [
    { name: 'ranged bar', spec: unit({ mark: 'bar', encoding: { ...xy, y2: { datum: 0 } } }) },
    { name: 'ranged rect', spec: unit({ mark: 'rect', encoding: { ...xy, y2: { datum: 0 } } }) },
    { name: 'plain tick', spec: unit({ mark: 'tick' }) },
    { name: 'rounded bar', spec: unit({ mark: { type: 'bar', cornerRadiusEnd: 4 } }) },
    {
      name: 'centered bar',
      spec: unit({
        mark: 'bar',
        encoding: {
          x: { field: 'g', type: 'nominal' },
          y: { ...xy.y, stack: 'center' },
          color: { field: 'g', type: 'nominal' },
        },
        data: { values: [{ g: 'A', y: 2 }] },
      }),
    },
    { name: 'centered area', spec: unit({ mark: 'area', encoding: { ...xy, y: { ...xy.y, stack: 'center' } } }) },
  ];
  const geometryLayers = (centered: boolean): VegaLiteSpec =>
    raw({
      data: { values: [{ x: 1, y: 2, start: 0 }] },
      encoding: { ...xy, y: { ...xy.y, ...(centered ? { stack: 'center' } : {}) } },
      layer: centered
        ? [{ mark: 'area' }, { mark: 'area' }]
        : [{ mark: 'bar', encoding: { y2: { field: 'start' } } }, { mark: 'bar' }],
    });

  it.each(['line', 'bar', 'point', 'circle', 'area', 'rect'])(
    'diagnoses native axis suppression for %s without throwing or changing defaults',
    mark => {
      const baseline = unit({
        mark,
        ...(mark === 'rect'
          ? {
              encoding: {
                x: { field: 'x', type: 'nominal' },
                y: { field: 'y', type: 'nominal' },
                color: { field: 'value', type: 'quantitative' },
              },
              data: { values: [{ x: 'A', y: 'B', value: 2 }] },
            }
          : {}),
      });
      expect(canRenderVegaRangedSpec(baseline)).toBe(false);
      expect(canRenderVegaCenteredAreaSpec(baseline)).toBe(false);
      expect(validateVegaLiteSpec(baseline, { mode: 'strict' })).toEqual([]);
      for (const axes of [['x'], ['y'], ['x', 'y']] as const) {
        const spec = { ...baseline, encoding: { ...baseline.encoding } };
        for (const axis of axes) {
          spec.encoding[axis] = Object.freeze({ ...spec.encoding[axis], axis: null });
        }
        Object.freeze(spec.encoding);
        Object.freeze(spec);
        const original = JSON.stringify(spec);
        const legacy = validateVegaLiteSpec(spec);
        expect(legacy).toEqual(
          axes.map(axis => ({
            code: 'unsupported-property',
            path: `$.encoding.${axis}.axis`,
            severity: 'warning',
            message: 'Axis suppression is not implemented by the selected native renderer.',
            remedy: 'Remove axis: null or use a supported ranged or centered-area renderer.',
          })),
        );
        expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual(
          legacy.map(item => ({ ...item, severity: 'error' })),
        );
        expect(JSON.stringify(spec)).toBe(original);
        expect(validateVegaLiteSpec(baseline, { mode: 'strict' })).toEqual([]);
      }
    },
  );

  it.each(geometryUnits)('accepts axis suppression on predicate-proven $name units', ({ spec: baseline }) => {
    for (const axes of [['x'], ['y'], ['x', 'y']] as const) {
      const spec = { ...baseline, encoding: { ...baseline.encoding } };
      for (const axis of axes) {
        spec.encoding[axis] = { ...spec.encoding[axis], axis: null };
      }
      const centered = canRenderVegaCenteredAreaSpec(spec);
      expect(canRenderVegaRangedSpec(spec) || centered).toBe(true);
      expect(validateVegaLiteSpec(spec)).toEqual([]);
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
      const geometry = centered ? getVegaCenteredAreaGeometry(spec, 100, 100) : getVegaRangedGeometry(spec, 100, 100);
      for (const axis of axes) {
        expect(geometry.axes[axis]).toEqual({ title: undefined, ticks: [] });
      }
    }
  });

  it.each([false, true])('requires parent geometry proof for inherited layer axes (centered: %s)', centered => {
    const baseline = geometryLayers(centered);
    const spec = raw({
      ...baseline,
      encoding: { ...baseline.encoding, x: { ...xy.x, axis: null }, y: { ...baseline.encoding!.y, axis: null } },
    });
    const predicate = centered ? canRenderVegaCenteredAreaSpec : canRenderVegaRangedSpec;
    expect(predicate(spec)).toBe(true);
    if (!centered) {
      expect(canRenderVegaRangedSpec(raw({ ...spec.layer![1], encoding: spec.encoding }))).toBe(false);
    }
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    expect(validateVegaLiteSpec(raw({ hconcat: [spec, unit()] }), { mode: 'strict' })).toEqual([]);
    for (const unsupported of [
      { ...spec, layer: [spec.layer![0], { mark: 'line' }] },
      { layer: [spec] },
      { ...spec, resolve: { scale: { y: 'independent' } } },
      { ...spec, resolve: { axis: { x: 'independent' } } },
    ]) {
      expect(predicate(raw(unsupported))).toBe(false);
      const prefix = 'encoding' in unsupported ? '$' : '$.layer[0]';
      for (const mode of ['legacy', 'strict'] as const) {
        const diagnostics = validateVegaLiteSpec(unsupported, { mode });
        for (const axis of ['x', 'y']) {
          expect(diagnostics).toContainEqual(
            expect.objectContaining({
              code: 'unsupported-property',
              path: `${prefix}.encoding.${axis}.axis`,
              severity: mode === 'strict' ? 'error' : 'warning',
            }),
          );
          expect(diagnostics.filter(item => item.path === `${prefix}.encoding.${axis}.axis`)).toHaveLength(1);
        }
      }
    }
  });

  it.each([false, true])('does not confuse geometry intent with a supported route (centered: %s)', centered => {
    const spec = unit({
      mark: centered ? 'area' : 'bar',
      encoding: {
        ...xy,
        x: { ...xy.x, axis: null },
        y: { ...xy.y, ...(centered ? { stack: 'center' } : {}), scale: { type: 'log' } },
        ...(centered ? {} : { y2: { datum: 0 } }),
      },
    });
    expect(canRenderVegaRangedSpec(spec)).toBe(false);
    expect(canRenderVegaCenteredAreaSpec(spec)).toBe(false);
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toContainEqual(
      expect.objectContaining({ code: 'unsupported-property', path: '$.encoding.x.axis', severity: 'error' }),
    );
  });

  it.each(['layer', 'hconcat', 'facet', 'repeat'])(
    'keeps inherited native axis-suppression paths exact through %s',
    composition => {
      const encoding = { ...xy, x: { ...xy.x, axis: null } };
      const spec = raw({
        data: { values: [{ x: 1, y: 2, group: 'A' }] },
        encoding,
        ...(composition === 'facet'
          ? { facet: { field: 'group' }, spec: { mark: 'line' } }
          : composition === 'repeat'
          ? { repeat: ['x'], spec: { mark: 'line' } }
          : { [composition]: [{ mark: 'line' }, { mark: 'point' }] }),
      });
      for (const mode of ['legacy', 'strict'] as const) {
        expect(validateVegaLiteSpec(spec, { mode })).toEqual([
          expect.objectContaining({
            code: 'unsupported-property',
            path: '$.encoding.x.axis',
            severity: mode === 'strict' ? 'error' : 'warning',
          }),
        ]);
      }
    },
  );

  it('does not invoke axis accessors while determining renderer capabilities', () => {
    const getter = jest.fn(() => null);
    const spec = unit({ mark: 'bar', encoding: { ...xy, y2: { datum: 0 }, x: { ...xy.x } } });
    Object.defineProperty(spec.encoding!.x!, 'axis', { enumerable: true, get: getter });
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([
      expect.objectContaining({ code: 'unsafe-accessor', path: '$.encoding.x.axis', severity: 'error' }),
    ]);
    expect(getter).not.toHaveBeenCalled();
  });
});

describe('validateVegaLiteSpec', () => {
  it('accepts a basic unit, is deterministic and never mutates frozen input', () => {
    const spec = unit();
    Object.freeze(spec.encoding?.x);
    Object.freeze(spec.encoding);
    Object.freeze(spec.data?.values);
    Object.freeze(spec.data);
    Object.freeze(spec);
    expect(validateVegaLiteSpec(spec)).toEqual([]);
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    expect(validateVegaLiteSpec(spec)).toEqual(validateVegaLiteSpec(spec));
  });

  it('returns actionable diagnostics instead of throwing in strict mode', () => {
    const spec = unit({ mark: 'not-a-mark' });
    const legacy = validateVegaLiteSpec(spec);
    const strict = validateVegaLiteSpec(spec, { mode: 'strict' });
    expect(legacy).toContainEqual(
      expect.objectContaining({ code: 'unsupported-mark', path: '$.mark', severity: 'warning' }),
    );
    expect(strict).toEqual(legacy.map(item => ({ ...item, severity: 'error' })));
    strict.forEach(item => {
      expect(Object.keys(item).sort()).toEqual(['code', 'message', 'path', 'remedy', 'severity']);
      expect(item.message.length).toBeGreaterThan(0);
      expect(item.remedy.length).toBeGreaterThan(0);
    });
  });

  it.each(['trail', 'errorbar', 'errorband', 'image', 'geoshape', 'boxplot'])(
    'does not claim native support for %s',
    mark => {
      expect(paths(validateVegaLiteSpec(unit({ mark })), 'unsupported-mark')).toEqual(['$.mark']);
    },
  );

  it('reports image fallback as a warning in legacy, not as supported rendering', () => {
    expect(validateVegaLiteSpec(unit({ mark: { type: 'image' } }))).toContainEqual(
      expect.objectContaining({ code: 'unsupported-mark', path: '$.mark.type', severity: 'warning' }),
    );
  });

  it('accepts plain and interval ticks routed to ranged geometry, not a scatter fallback', () => {
    expect(validateVegaLiteSpec(unit({ mark: 'tick', encoding: { ...xy, x2: { field: 'end' } } }))).toEqual([]);
    expect(validateVegaLiteSpec(unit({ mark: 'tick' }), { mode: 'strict' })).toEqual([]);
    expect(paths(validateVegaLiteSpec(raw({ mark: 'tick' })), 'unsupported-combination')).toEqual(['$.mark']);
  });

  it('accepts linear ranged, categorical offset and native y-log combinations', () => {
    expect(
      validateVegaLiteSpec(
        unit({
          mark: { type: 'bar', cornerRadiusEnd: 4 },
          encoding: {
            x: { field: 'category', type: 'nominal' },
            y: xy.y,
            y2: { field: 'start' },
            xOffset: { field: 'group', type: 'nominal' },
          },
        }),
      ),
    ).toEqual([]);
    expect(validateVegaLiteSpec(unit({ encoding: { ...xy, y: { ...xy.y, scale: { type: 'log' } } } }))).toEqual([]);
  });

  it.each(['pow', 'sqrt', 'symlog', 'invented'])('rejects ignored native %s scale', type => {
    expect(
      paths(validateVegaLiteSpec(unit({ encoding: { ...xy, x: { ...xy.x, scale: { type } } } })), 'unsupported-scale'),
    ).toEqual(['$.encoding.x.scale.type']);
  });

  it('does not accept log for ranged geometry or x-log for native lines', () => {
    for (const spec of [
      unit({ mark: 'bar', encoding: { ...xy, y2: { field: 'end' }, y: { ...xy.y, scale: { type: 'log' } } } }),
      unit({ encoding: { ...xy, x: { ...xy.x, scale: { type: 'log' } } } }),
    ]) {
      expect(paths(validateVegaLiteSpec(spec), 'unsupported-scale')).toHaveLength(1);
    }
  });

  it('reports ignored native reverse but accepts the implemented ranged reverse', () => {
    const encoding = { ...xy, y: { ...xy.y, scale: { reverse: true } } };
    expect(paths(validateVegaLiteSpec(unit({ encoding })), 'unsupported-property')).toEqual([
      '$.encoding.y.scale.reverse',
    ]);
    expect(validateVegaLiteSpec(unit({ mark: 'bar', encoding: { ...encoding, y2: { field: 'start' } } }))).toEqual([]);
  });

  it('reports unsupported channel and mark/channel combinations separately', () => {
    expect(
      paths(validateVegaLiteSpec(unit({ encoding: { ...xy, longitude: { field: 'lng' } } })), 'unsupported-channel'),
    ).toEqual(['$.encoding.longitude']);
    expect(
      paths(validateVegaLiteSpec(unit({ encoding: { ...xy, xOffset: { field: 'g' } } })), 'unsupported-combination'),
    ).toContain('$.encoding.xOffset');
    expect(
      paths(validateVegaLiteSpec(unit({ encoding: { ...xy, theta: { field: 'v' } } })), 'unsupported-combination'),
    ).toContain('$.encoding.theta');
  });

  it('supports single test/value color conditions, not parameter or general conditional definitions', () => {
    expect(
      validateVegaLiteSpec(
        unit({ encoding: { ...xy, color: { condition: { test: 'datum.y > 1', value: 'red' }, value: 'blue' } } }),
      ),
    ).toEqual([]);
    for (const condition of [
      { param: 'brush', value: 'red' },
      [{ test: 'true', value: 'red' }],
      { test: 'true', field: 'g' },
    ]) {
      expect(
        paths(validateVegaLiteSpec(unit({ encoding: { ...xy, color: { condition } } })), 'unsupported-condition'),
      ).toEqual(['$.encoding.color.condition']);
    }
  });

  it('reports modern parameters and legacy selections until interaction implementation', () => {
    const result = validateVegaLiteSpec(
      unit({ params: [{ name: 'brush', select: 'interval' }], selection: { brush: { type: 'interval' } } }),
    );
    expect(paths(result, 'unsupported-property')).toEqual(['$.params', '$.selection']);
  });

  it.each([
    'valid',
    'missing',
    'distinct',
    'values',
    'product',
    'q1',
    'q3',
    'variance',
    'variancep',
    'stdev',
    'stdevp',
    'stderr',
    'argmin',
    'argmax',
  ])('accepts implemented aggregate %s in encodings and transforms', op => {
    expect(
      validateVegaLiteSpec(
        unit({
          encoding: { ...xy, y: { ...xy.y, aggregate: op } },
          transform: [{ aggregate: [{ op, field: 'y', as: 'a' }], groupby: ['x'] }],
        }),
      ),
    ).toEqual([]);
  });

  it.each([0, 0.5, 1])('preserves valid exponential retention %s including zero', parameter => {
    for (const name of ['exponential', 'exponentialb']) {
      expect(
        validateVegaLiteSpec(unit({ encoding: { ...xy, y: { ...xy.y, aggregate: { [name]: parameter } } } })),
      ).toEqual([]);
    }
  });

  it.each(['ci0', 'ci1', 'bootstrap', 'made-up'])('does not claim unsupported statistical aggregate %s', aggregate => {
    expect(
      paths(validateVegaLiteSpec(unit({ encoding: { ...xy, y: { ...xy.y, aggregate } } })), 'unsupported-aggregate'),
    ).toEqual(['$.encoding.y.aggregate']);
  });

  it.each([
    { exponential: -1 },
    { exponentialb: 2 },
    { exponential: NaN },
    { exponential: '0' },
    { exponential: 0.5, exponentialb: 0.5 },
    'exponential',
    'exponentialb',
  ])('rejects malformed aggregate %j', aggregate => {
    expect(
      paths(validateVegaLiteSpec(unit({ encoding: { ...xy, y: { ...xy.y, aggregate } } })), 'invalid-aggregate'),
    ).toEqual(['$.encoding.y.aggregate']);
  });

  it('does not confuse Vega-Lite argmin object syntax with implemented scalar argmin', () => {
    expect(
      paths(
        validateVegaLiteSpec(unit({ encoding: { ...xy, y: { ...xy.y, aggregate: { argmin: 'y' } } } })),
        'unsupported-aggregate',
      ),
    ).toEqual(['$.encoding.y.aggregate']);
  });

  it('accepts implemented navigation windows and diagnoses unknown operations even on empty data', () => {
    const ops = [
      'row_number',
      'rank',
      'dense_rank',
      'percent_rank',
      'cume_dist',
      'ntile',
      'lag',
      'lead',
      'first_value',
      'last_value',
      'nth_value',
    ];
    expect(
      validateVegaLiteSpec(
        unit({ transform: [{ window: ops.map(op => ({ op, field: 'y', as: op })), frame: [null, 0] }] }),
      ),
    ).toEqual([]);
    expect(
      paths(
        validateVegaLiteSpec(unit({ data: { values: [] }, transform: [{ window: [{ op: 'made-up', as: 'v' }] }] })),
        'unsupported-window-op',
      ),
    ).toEqual(['$.transform[0].window[0].op']);
  });

  it.each([
    ['ntile', 0],
    ['nth_value', -1],
    ['lag', -1],
    ['lead', 0.5],
    ['ntile', '2'],
    ['rank', 3],
  ])('checks window parameter for %s = %s', (op, param) => {
    expect(
      paths(validateVegaLiteSpec(unit({ transform: [{ window: [{ op, param, as: 'v' }] }] })), 'invalid-window-param'),
    ).toEqual(['$.transform[0].window[0].param']);
  });

  it.each([[[1, -1]], [[0]], [[0, 1.5]]])('rejects malformed window frame %j', frame => {
    expect(
      paths(
        validateVegaLiteSpec(unit({ transform: [{ window: [{ op: 'sum', field: 'y' }], frame }] })),
        'invalid-transform',
      ),
    ).toEqual(['$.transform[0].frame']);
  });

  it('covers supported transforms and diagnoses unknown properties rather than accepting every object', () => {
    const transform = [
      { filter: { field: 'y', gte: 0 } },
      { calculate: 'datum.y * 2', as: 'v' },
      { fold: ['x', 'y'], as: ['key', 'value'] },
      { timeUnit: 'utcyearmonth', field: 'date', as: 'm' },
      { joinaggregate: [{ op: 'sum', field: 'y', as: 's' }], groupby: ['x'] },
      { quantile: 'y', probs: [0, 0.5, 1], as: ['p', 'v'] },
      { regression: 'y', on: 'x', method: 'linear' },
      { impute: 'y', key: 'x', method: 'mean' },
      { lookup: 'x', from: { data: { values: [{ key: 1, label: 'a' }] }, key: 'key', fields: ['label'] } },
    ];
    expect(validateVegaLiteSpec(unit({ transform }))).toEqual([]);
    expect(
      paths(validateVegaLiteSpec(unit({ transform: [{ extent: 'y', param: 'domain' }] })), 'unsupported-transform'),
    ).toEqual(['$.transform[0]']);
    expect(
      paths(
        validateVegaLiteSpec(unit({ transform: [{ regression: 'y', on: 'x', method: 'poly' }] })),
        'unsupported-property',
      ),
    ).toEqual(['$.transform[0].method']);
    expect(
      paths(validateVegaLiteSpec(unit({ transform: [{ filter: 'true', surprise: true }] })), 'unsupported-property'),
    ).toEqual(['$.transform[0].surprise']);
  });

  it('accepts faithful LOESS and proves the strict preparation retains its numerical curve', () => {
    const spec = unit({
      data: { values: Array.from({ length: 10 }, (_, x) => ({ x, y: x * x })) },
      transform: [{ loess: 'y', on: 'x', bandwidth: 0.6 }],
    });
    expect(validateVegaLiteSpec(spec)).toEqual([]);
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    const prepared = prepareVegaLiteSpec(spec, { mode: 'strict' });
    expect(prepared.transform).toBeUndefined();
    expect(prepared.data?.values).toHaveLength(10);
    expect(prepared.data?.values?.[0].y).toBeCloseTo(-1.1623902762975042, 11);
    expect(prepared.data?.values?.[9].y).toBeCloseTo(79.8376097237025, 11);
  });

  it.each(['shared', 'independent'])(
    'accepts grouped density with implemented %s resolution and numeric output',
    resolve => {
      const spec = unit({
        data: {
          values: [
            { g: 'a', y: 0 },
            { g: 'a', y: 2 },
            { g: 'b', y: 4 },
          ],
        },
        transform: [{ density: 'y', bandwidth: 1, steps: 2, groupby: ['g'], resolve, as: ['u', 'v'] }],
        encoding: {
          x: { field: 'u', type: 'quantitative' },
          y: { field: 'v', type: 'quantitative' },
          color: { field: 'g' },
        },
      });
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
      const rows = prepareVegaLiteSpec(spec, { mode: 'strict' }).data!.values!;
      expect(rows.filter(row => row.g === 'a').map(row => row.u)).toEqual(resolve === 'shared' ? [0, 2, 4] : [0, 1, 2]);
      expect(rows.filter(row => row.g === 'a')[0].v).toBeCloseTo(0.2264666234573104, 12);
    },
  );

  it.each([
    { loess: 'y', on: 'x', bandwidth: 0, groupby: [], as: ['u', null] },
    { density: 'y', bandwidth: 0, steps: 0, minsteps: 0, maxsteps: 0, as: [null, 'p'] },
    { density: 'y', counts: true, cumulative: true, steps: 4 },
    { density: 'y', minsteps: 4, maxsteps: 2, resolve: 'independent' },
  ])('accepts implemented statistical defaults/options %j, including zero and partial aliases', transform => {
    expect(validateVegaLiteSpec(unit({ transform: [transform] }), { mode: 'strict' })).toEqual([]);
    expect(() => applyVegaTransforms([], [transform], { mode: 'strict' })).not.toThrow();
  });

  it.each([
    [{ loess: 'y', on: 'x', bandwidth: -1 }, 'bandwidth'],
    [{ loess: 'y', on: 'x', bandwidth: 1.1 }, 'bandwidth'],
    [{ loess: 'y', on: 'x', bandwidth: '0.3' }, 'bandwidth'],
    [{ density: 'y', bandwidth: NaN }, 'bandwidth'],
    [{ density: 'y', bandwidth: Infinity }, 'bandwidth'],
    [{ density: 'y', steps: -1 }, 'steps'],
    [{ density: 'y', steps: 1.5 }, 'steps'],
    [{ density: 'y', maxsteps: 10001 }, 'maxsteps'],
    [{ density: 'y', minsteps: '25' }, 'minsteps'],
    [{ density: 'y', extent: [2, 1] }, 'extent'],
    [{ density: 'y', extent: [0, Infinity] }, 'extent'],
    [{ density: 'y', counts: 1 }, 'counts'],
    [{ density: 'y', cumulative: 'yes' }, 'cumulative'],
    [{ density: 'y', resolve: 'union' }, 'resolve'],
    [{ loess: 'y', on: 'x', as: ['u', 3] }, 'as'],
    [{ density: 'y', as: ['a', 'b', 'c'] }, 'as'],
  ])('rejects malformed statistics %j at the authored option even on empty rows', (transform, property) => {
    const diagnostics = validateVegaLiteSpec(unit({ data: { values: [] }, transform: [transform] }));
    expect(diagnostics).toContainEqual(
      expect.objectContaining({ path: `$.transform[0].${property}`, severity: 'error' }),
    );
    expect(paths(diagnostics, 'approximate-transform')).toEqual([]);
    expect(() => applyVegaTransforms([], [transform as Record<string, unknown>], { mode: 'strict' })).toThrow();
  });

  it.each([
    [{ loess: 'y' }, 'on'],
    [{ loess: '', on: 'x' }, 'loess'],
    [{ density: 2 }, 'density'],
  ])('diagnoses missing/malformed statistics fields %j', (transform, property) => {
    expect(paths(validateVegaLiteSpec(unit({ transform: [transform] })), 'invalid-field')).toContain(
      `$.transform[0].${property}`,
    );
  });

  it.each([
    [{ loess: 'y', on: 'x', iterations: 5 }, 'iterations'],
    [{ density: 'y', kernel: 'epanechnikov' }, 'kernel'],
    [{ density: 'y', on: 'x' }, 'on'],
  ])(
    'continues to diagnose unsupported statistics options %j, not the implemented transform itself',
    (transform, property) => {
      const spec = unit({ transform: [transform] });
      expect(paths(validateVegaLiteSpec(spec), 'unsupported-property')).toEqual([`$.transform[0].${property}`]);
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toContainEqual(
        expect.objectContaining({
          code: 'unsupported-property',
          path: `$.transform[0].${property}`,
          severity: 'error',
        }),
      );
      expect(() => applyVegaTransforms([], [transform as Record<string, unknown>], { mode: 'strict' })).toThrow(
        /unsupported/i,
      );
    },
  );

  it('detects conflicting transforms and unsupported selection predicates', () => {
    expect(
      paths(
        validateVegaLiteSpec(unit({ transform: [{ filter: 'true', calculate: '1', as: 'x' }] })),
        'invalid-transform',
      ),
    ).toEqual(['$.transform[0]']);
    expect(
      paths(validateVegaLiteSpec(unit({ transform: [{ filter: { param: 'brush' } }] })), 'unsupported-condition'),
    ).toEqual(['$.transform[0].filter']);
  });

  it('keeps exact paths through concat, facet, repeat and nested layers', () => {
    const spec = raw({
      concat: [
        {
          facet: { row: { field: 'r' }, column: { field: 'c' } },
          spec: {
            repeat: ['a'],
            spec: { layer: [{ layer: [unit({ mark: 'trail' })] }] },
          },
        },
      ],
      columns: 2,
    });
    expect(paths(validateVegaLiteSpec(spec), 'unsupported-mark')).toEqual([
      '$.concat[0].spec.spec.layer[0].layer[0].mark',
    ]);
  });

  it('resolves named datasets only from own local/ancestor scopes, never sibling scopes', () => {
    const spec = raw({
      datasets: { top: [{ x: 1, y: 2 }] },
      hconcat: [
        unit({ data: { name: 'top' } }),
        { datasets: { local: [] }, vconcat: [unit({ data: { name: 'local' } })] },
        unit({ data: { name: 'local' } }),
      ],
    });
    expect(paths(validateVegaLiteSpec(spec), 'unresolved-data')).toEqual(['$.hconcat[2].data.name']);
    const inherited = Object.create({ hidden: [] });
    expect(
      paths(validateVegaLiteSpec(unit({ datasets: inherited, data: { name: 'hidden' } })), 'unresolved-data'),
    ).toEqual(['$.data.name']);
  });

  it('accepts facet/repeat fields only inside declared repeat templates', () => {
    expect(
      validateVegaLiteSpec(
        raw({
          repeat: { row: ['x'], column: ['y'] },
          spec: {
            mark: 'point',
            encoding: {
              x: { field: { repeat: 'column' }, type: 'quantitative' },
              y: { field: { repeat: 'row' }, type: 'quantitative' },
            },
          },
        }),
      ),
    ).toEqual([]);
    expect(
      paths(validateVegaLiteSpec(unit({ encoding: { ...xy, x: { field: { repeat: 'row' } } } })), 'invalid-field'),
    ).toEqual(['$.encoding.x.field']);
  });

  it('validates composition shapes and detects children the view tree would otherwise ignore', () => {
    expect(paths(validateVegaLiteSpec(raw({ concat: [unit()], columns: 0 })), 'invalid-composition')).toEqual([
      '$.columns',
    ]);
    expect(paths(validateVegaLiteSpec(raw({ facet: { row: { field: 'r' } } })), 'invalid-composition')).toContain(
      '$.spec',
    );
    expect(paths(validateVegaLiteSpec(raw({ hconcat: [unit()], vconcat: [unit()] })), 'invalid-composition')).toContain(
      '$',
    );
    expect(paths(validateVegaLiteSpec(raw({ layer: [{ concat: [unit()] }] })), 'unsupported-combination')).toContain(
      '$.layer[0]',
    );
  });

  it('requires a declared host resolver for data URLs, including nested lookup sources', () => {
    const spec = unit({
      data: { url: 'https://example.test/a.csv', format: { type: 'csv' } },
      transform: [{ lookup: 'x', from: { data: { url: 'lookup.json' }, key: 'x', fields: ['label'] } }],
    });
    expect(paths(validateVegaLiteSpec(spec), 'external-data-resolver')).toEqual([
      '$.data.url',
      '$.transform[0].from.data.url',
    ]);
    expect(validateVegaLiteSpec(spec, { allowExternalData: true })).toEqual([]);
  });

  it.each(['json', 'csv', 'tsv'])(
    'accepts declared %s resource format with property and supported scalar parses',
    type => {
      expect(
        validateVegaLiteSpec(
          unit({
            data: {
              url: 'a',
              format: {
                type,
                property: 'payload.rows',
                parse: { x: 'number', y: 'boolean', date: 'date', label: 'string' },
              },
            },
          }),
          { allowExternalData: true },
        ),
      ).toEqual([]);
    },
  );

  it('rejects unsupported formats/parses, invalid records and malformed typed fields', () => {
    expect(
      paths(
        validateVegaLiteSpec(unit({ data: { url: 'a', format: { type: 'topojson' } } }), { allowExternalData: true }),
        'unsupported-format',
      ),
    ).toEqual(['$.data.format.type']);
    expect(
      paths(
        validateVegaLiteSpec(unit({ data: { url: 'a', format: { parse: { x: 'auto' } } } }), {
          allowExternalData: true,
        }),
        'unsupported-format',
      ),
    ).toEqual(['$.data.format.parse.x']);
    expect(paths(validateVegaLiteSpec(unit({ data: { values: [1] } })), 'invalid-data')).toEqual(['$.data.values[0]']);
    const diagnostics = validateVegaLiteSpec(unit({ encoding: { x: { field: 42, type: 'made-up' }, y: xy.y } }));
    expect(paths(diagnostics, 'invalid-field')).toEqual(['$.encoding.x.field']);
    expect(paths(diagnostics, 'invalid-type')).toEqual(['$.encoding.x.type']);
  });

  it('diagnoses ignored configuration and native opacities rather than claiming full configuration support', () => {
    const diagnostics = validateVegaLiteSpec(
      unit({
        config: { line: { opacity: 0.5 } },
        mark: { type: 'line', fillOpacity: 0.4 },
        encoding: { ...xy, x: { ...xy.x, scale: { clamp: true } } },
      }),
    );
    expect(paths(diagnostics, 'unsupported-property')).toEqual([
      '$.config.line.opacity',
      '$.mark.fillOpacity',
      '$.encoding.x.scale.clamp',
    ]);
  });

  it.each(['mark', 'line', 'area', 'bar', 'point', 'circle', 'square', 'rect', 'arc', 'tick'])(
    'permits only implemented config.%s.tooltip semantics',
    namespace => {
      const mark = namespace === 'mark' ? 'line' : namespace;
      const encoding =
        mark === 'arc'
          ? { theta: { field: 'y', type: 'quantitative' } }
          : mark === 'rect'
          ? { ...xy, color: { field: 'y', type: 'quantitative' } }
          : xy;
      const spec = unit({ mark, encoding, config: { [namespace]: { tooltip: null } } });
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
      expect(buildVegaTooltip(spec, { x: 1, y: 2, secret: 'PRIVATE' })).toMatchObject({ disabled: true, fields: [] });
    },
  );

  it.each([true, false, null, 'Authored tooltip', { content: 'encoding' }, { content: 'data' }])(
    'accepts implemented mark/config tooltip %j without enabling unrelated config',
    tooltip => {
      for (const spec of [unit({ mark: { type: 'line', tooltip } }), unit({ config: { line: { tooltip } } })]) {
        expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
        const result = buildVegaTooltip(spec, { x: 1, y: 2, private: 'SOURCE' });
        expect(result.disabled).toBe(tooltip === null || tooltip === false);
        if (typeof tooltip === 'string') {
          expect(result.fields).toEqual([{ title: '', value: tooltip }]);
        }
        if (typeof tooltip === 'object' && tooltip?.content === 'data') {
          expect(result.ariaLabel).toContain('private: SOURCE');
        } else {
          expect(result.ariaLabel).not.toContain('private');
        }
      }
    },
  );

  it('honors config tooltip precedence and preserves config-only null without extra columns', () => {
    const spec = unit({ config: { mark: { tooltip: { content: 'data' } }, line: { tooltip: null } } });
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    expect(buildVegaTooltip(spec, { x: 1, y: 2, secret: 'PRIVATE' })).toEqual({
      disabled: true,
      fields: [],
      ariaLabel: 'x: 1; y: 2',
    });
  });

  it('accepts formatting config read by tooltip definitions and proves numeric/time output', () => {
    const spec = unit({
      config: { numberFormat: '.2f', timeFormat: '%Y' },
      encoding: {
        ...xy,
        tooltip: [
          { field: 'y', type: 'quantitative' },
          { field: 'date', type: 'temporal', formatType: 'utc' },
        ],
      },
    });
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    expect(buildVegaTooltip(spec, { x: 1, y: 2.345, date: new Date('2024-01-01T00:00:00Z') }).fields).toEqual([
      { title: 'y', value: '2.35' },
      { title: 'date', value: '2024' },
    ]);
    const explicit = unit({
      ...spec,
      encoding: { ...xy, tooltip: { field: 'y', type: 'quantitative', format: '.1f' } },
    });
    expect(buildVegaTooltip(explicit, { y: 2.345 }).fields[0].value).toBe('2.3');
  });

  it('diagnoses unknown config blocks and options at individual paths, including alongside a supported tooltip', () => {
    const spec = unit({
      config: {
        view: { stroke: null },
        line: { tooltip: true, opacity: 0.5 },
        mark: { color: 'red' },
        numberFormat: '.1f',
      },
    });
    expect(paths(validateVegaLiteSpec(spec), 'unsupported-property')).toEqual([
      '$.config.view',
      '$.config.line.opacity',
      '$.config.mark.color',
    ]);
    expect(validateVegaLiteSpec(spec, { mode: 'strict' }).every(item => item.severity === 'error')).toBe(true);
  });

  it.each([
    [{ line: 1 }, '$.config.line'],
    [{ numberFormat: 1 }, '$.config.numberFormat'],
    [{ timeFormat: false }, '$.config.timeFormat'],
    [{ mark: { tooltip: [] } }, '$.config.mark.tooltip'],
    [{ mark: { tooltip: 42 } }, '$.config.mark.tooltip'],
  ])('rejects invalid implemented config values %j rather than silently ignoring them', (config, path) => {
    expect(validateVegaLiteSpec(unit({ config }))).toContainEqual(expect.objectContaining({ path, severity: 'error' }));
  });

  it('does not accept ignored tooltip content options or custom formatters', () => {
    expect(
      paths(
        validateVegaLiteSpec(unit({ config: { mark: { tooltip: { content: 'encoding', ignored: true } } } })),
        'unsupported-property',
      ),
    ).toEqual(['$.config.mark.tooltip.ignored']);
    expect(
      paths(
        validateVegaLiteSpec(unit({ config: { mark: { tooltip: { content: 'unknown' } } } })),
        'unsupported-property',
      ),
    ).toEqual(['$.config.mark.tooltip.content']);
    expect(
      paths(
        validateVegaLiteSpec(unit({ encoding: { ...xy, tooltip: { field: 'y', formatType: 'custom' } } })),
        'unsupported-property',
      ),
    ).toEqual(['$.encoding.tooltip.formatType']);
  });

  it.each([
    { type: 'tick', size: 20, thickness: 2 },
    { type: 'bar', cornerRadiusEnd: 4 },
  ])('agrees with the actual ranged predicate for plain sized ticks/rounded bars %j', mark => {
    const spec = unit({ mark });
    expect(canRenderVegaRangedSpec(spec)).toBe(true);
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    const geometry = getVegaRangedGeometry(spec, 100, 100);
    expect(geometry.marks).toHaveLength(1);
    if (mark.type === 'tick') {
      expect(geometry.marks[0]).toMatchObject({ width: 20, height: 2 });
    } else {
      expect(geometry.marks[0].roundedEnd).toBe('top');
    }
  });

  it('accepts single-position tick units and ranged clamp on linear primary/offset scales', () => {
    const single = unit({ mark: 'tick', encoding: { x: xy.x } });
    expect(canRenderVegaRangedSpec(single)).toBe(true);
    expect(validateVegaLiteSpec(single, { mode: 'strict' })).toEqual([]);
    const spec = unit({
      mark: 'bar',
      data: { values: [{ x: 20, y: 2 }] },
      encoding: {
        ...xy,
        x: { ...xy.x, scale: { domain: [0, 10], clamp: true } },
        x2: { datum: 0 },
        yOffset: { value: 0, scale: { clamp: true } },
      },
    });
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    expect(getVegaRangedGeometry(spec, 100, 100).marks[0].x1).toBe(100);
  });

  it.each(['log', 'pow', 'sqrt', 'symlog'])('keeps nonlinear %s diagnostics on plain ticks and rounded bars', type => {
    for (const mark of ['tick', { type: 'bar', cornerRadiusEnd: 4 }]) {
      const spec = unit({ mark, encoding: { ...xy, y: { ...xy.y, scale: { type } } } });
      expect(canRenderVegaRangedSpec(spec)).toBe(false);
      expect(paths(validateVegaLiteSpec(spec, { mode: 'strict' }), 'unsupported-scale')).toEqual([
        '$.encoding.y.scale.type',
      ]);
    }
  });

  it('does not claim native bar size or configuration defaults are implemented', () => {
    const spec = unit({ mark: { type: 'bar', size: 20 }, config: { bar: { cornerRadiusEnd: 4 } } });
    expect(paths(validateVegaLiteSpec(spec), 'unsupported-property')).toEqual([
      '$.config.bar.cornerRadiusEnd',
      '$.mark.size',
    ]);
  });

  it('rejects invalid temporal datum anchors, bin anchors and scale clamp flags', () => {
    for (const datum of [true, {}, new Date(NaN), 'not a date']) {
      expect(
        validateVegaLiteSpec(unit({ mark: 'tick', encoding: { ...xy, x: { datum, type: 'temporal' } } })),
      ).toContainEqual(expect.objectContaining({ severity: 'error' }));
    }
    for (const anchor of ['zero', NaN, Infinity, {}]) {
      expect(
        validateVegaLiteSpec(unit({ mark: 'bar', encoding: { ...xy, x: { ...xy.x, bin: { anchor } } } })),
      ).toContainEqual(expect.objectContaining({ path: '$.encoding.x.bin.anchor', severity: 'error' }));
    }
    expect(
      validateVegaLiteSpec(unit({ mark: 'tick', encoding: { ...xy, x: { ...xy.x, scale: { clamp: 1 } } } })),
    ).toContainEqual(expect.objectContaining({ path: '$.encoding.x.scale.clamp', severity: 'error' }));
  });

  it('preserves temporal Date anchors and median while diagnosing unknown field options', () => {
    expect(
      validateVegaLiteSpec(
        unit({
          mark: 'tick',
          encoding: { ...xy, x: { datum: new Date(0), type: 'temporal', scale: { type: 'utc' } } },
        }),
        { mode: 'strict' },
      ),
    ).toEqual([]);
    expect(
      paths(
        validateVegaLiteSpec(unit({ encoding: { ...xy, y: { ...xy.y, aggregate: 'median', surprise: true } } })),
        'unsupported-property',
      ),
    ).toEqual(['$.encoding.y.surprise']);
  });

  it.each(['bar', 'area'])('rejects center stacks without the matching renderer predicate (%s)', mark => {
    expect(
      paths(
        validateVegaLiteSpec(
          unit({ mark, encoding: { ...xy, color: { field: 'g' }, y: { ...xy.y, stack: 'center' } } }),
          { mode: 'strict' },
        ),
        'unsupported-property',
      ),
    ).toEqual(['$.encoding.y.stack']);
  });

  it('makes unknown window operations strict errors even with empty input', () => {
    const transform = { window: [{ op: 'unknown', field: 'y', as: 'v' }] };
    expect(
      validateVegaLiteSpec(unit({ data: { values: [] }, transform: [transform] }), { mode: 'strict' }),
    ).toContainEqual(
      expect.objectContaining({
        code: 'unsupported-window-op',
        path: '$.transform[0].window[0].op',
        severity: 'error',
      }),
    );
    expect(() => applyVegaTransforms([], [transform], { mode: 'strict' })).toThrow(
      /unknown aggregate operation unknown/i,
    );
  });

  it.each(["date:'%Y'", 'date:"%Y-%m-%d"', 'utc:%Y-%m-%d', "utc:'%G-W%V-%u'"])(
    'accepts the loader custom date declaration %s even without rows or I/O',
    declaration => {
      for (const data of [{ values: [] }, { url: 'dates.csv' }, { name: 'dates' }]) {
        const spec = unit({ datasets: { dates: [] }, data: { ...data, format: { parse: { date: declaration } } } });
        expect(validateVegaLiteSpec(spec, { allowExternalData: true, mode: 'strict' })).toEqual([]);
        expect(() => parseVegaDataValues({ values: [], format: { parse: { date: declaration } } })).not.toThrow();
      }
    },
  );

  it.each(['date:', "utc:'%Y", 'date:%J', 'utc:%', 'auto', 42])(
    'rejects malformed scalar parse %j at its exact field, including on empty data',
    declaration => {
      const spec = unit({ data: { values: [], format: { parse: { 'odd.date': declaration } } } });
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toContainEqual(
        expect.objectContaining({
          code: 'unsupported-format',
          path: '$.data.format.parse["odd.date"]',
          severity: 'error',
        }),
      );
    },
  );

  it('validates parsed inline/text/named values rather than their unparsed source types', () => {
    const encoding = { x: { field: 'd', type: 'temporal' }, y: xy.y };
    for (const data of [
      { values: [{ d: '04/03/2026', y: '2' }], format: { parse: { d: "utc:'%d/%m/%Y'", y: 'number' } } },
      { values: 'd,y\n04/03/2026,2\n', format: { type: 'csv', parse: { d: "utc:'%d/%m/%Y'", y: 'number' } } },
      { name: 'dates', format: { parse: { d: "utc:'%d/%m/%Y'", y: 'number' } } },
      {
        values: '{"rows":[{"d":"04/03/2026","y":"2"}]}',
        format: {
          type: 'json',
          property: 'rows',
          parse: { d: "utc:'%d/%m/%Y'", y: 'number' },
        },
      },
    ]) {
      const spec = unit({ data, encoding, datasets: { dates: [{ d: '04/03/2026', y: '2' }] } });
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
      const tree = buildVegaViewTree(spec, { mode: 'strict' });
      expect(tree.type).toBe('unit');
      if (tree.type === 'unit') {
        expect(tree.spec.data!.values).toEqual([{ d: new Date('2026-03-04'), y: 2 }]);
      }
    }
    expect(validateVegaLiteSpec(unit({ data: { values: 'not JSON' } }), { mode: 'strict' })).toContainEqual(
      expect.objectContaining({ code: 'invalid-data', path: '$.data.values', severity: 'error' }),
    );
  });

  it('accepts exact bin bounds, flattened aliases and pivot output without rechecking derived fields against sources', () => {
    const fixtures = [
      {
        rows: binRows,
        transform: { bin: { extent: [0, 10], step: 2 }, field: 'v', as: ['lo', 'hi'] },
        encoding: { x: { field: 'lo', type: 'quantitative' }, y: { field: 'hi', type: 'quantitative' } },
      },
      { rows: [{ a: [1, 2], b: [3] }], transform: { flatten: ['a', 'b'], as: ['x', 'y'], index: 'i' }, encoding: xy },
      {
        rows: [
          { k: 'x', v: 1 },
          { k: 'y', v: 2 },
        ],
        transform: { pivot: 'k', value: 'v', op: 'sum', limit: 0 },
        encoding: xy,
      },
    ];
    fixtures.forEach(({ rows, transform, encoding }, index) => {
      const spec = unit({ data: { values: rows }, transform: [transform], encoding });
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
      const result = applyVegaTransforms(rows, [transform], { mode: 'strict' });
      if (index === 0) {
        expect(result.map(row => [row.lo, row.hi])).toEqual(binBounds);
      }
      if (index === 1) {
        expect(result.map(row => [row.x, row.y, row.i])).toEqual([
          [1, 3, 0],
          [2, null, 1],
        ]);
      }
      if (index === 2) {
        expect(result).toEqual([{ x: 1, y: 2 }]);
      }
    });
  });

  it.each(['zero', 'normalize', 'center'] as const)(
    'accepts standalone %s stack transform independently of mark stacking',
    offset => {
      const transform = {
        stack: 'v',
        groupby: ['g'],
        sort: [{ field: 'order', order: 'ascending' }],
        offset,
        as: ['lo', 'hi'],
      };
      expect(validateVegaLiteSpec(unit({ transform: [transform] }), { mode: 'strict' })).toEqual([]);
      applyVegaTransforms(stackRows, [transform], { mode: 'strict' }).forEach((row, index) => {
        expect(row.lo).toBeCloseTo(stackBounds[offset][index][0], 14);
        expect(row.hi).toBeCloseTo(stackBounds[offset][index][1], 14);
      });
    },
  );

  it.each([
    { bin: true, field: 'y' },
    {
      bin: { base: 2, maxbins: 4, minstep: 0, nice: false, divide: [2], steps: [1, 2], span: 4, anchor: 0 },
      field: 'y',
      as: 'b',
    },
    { bin: { extent: [0, 4], step: 1 }, field: 'y', as: [null, 'hi'] },
    { flatten: ['x', 'y'], as: [null, 'v'] },
    { flatten: ['x'], as: [], index: 'i' },
    { pivot: 'x', value: 'y', groupby: [], op: 'median', limit: 2 },
    { stack: 'y', as: [null, 'hi'] },
    { stack: 'y', as: ['lo', 'y'] },
    { fold: ['x'], as: ['k', 'v'] },
    { sample: 0 },
    { sample: 10 },
  ])('accepts implemented defaults and partial aliases on empty rows %j', transform => {
    expect(validateVegaLiteSpec(unit({ data: { values: [] }, transform: [transform] }), { mode: 'strict' })).toEqual(
      [],
    );
    expect(() => applyVegaTransforms([], [transform], { mode: 'strict' })).not.toThrow();
  });

  it.each([
    [{ bin: true }, 'field'],
    [{ bin: false, field: 'y' }, 'bin'],
    [{ bin: { step: 0 }, field: 'y' }, 'bin.step'],
    [{ bin: { base: 1 }, field: 'y' }, 'bin.base'],
    [{ bin: { maxbins: -1 }, field: 'y' }, 'bin.maxbins'],
    [{ bin: { minstep: -1 }, field: 'y' }, 'bin.minstep'],
    [{ bin: { span: Infinity }, field: 'y' }, 'bin.span'],
    [{ bin: { nice: 1 }, field: 'y' }, 'bin.nice'],
    [{ bin: { divide: [0] }, field: 'y' }, 'bin.divide'],
    [{ bin: { steps: [2, 1] }, field: 'y' }, 'bin.steps'],
    [{ bin: { steps: [] }, field: 'y' }, 'bin.steps'],
    [{ bin: { extent: [2, 1] }, field: 'y' }, 'bin.extent'],
    [{ bin: { anchor: '0' }, field: 'y' }, 'bin.anchor'],
    [{ bin: true, field: 'y', as: '' }, 'as'],
    [{ flatten: [] }, 'flatten'],
    [{ flatten: ['a', 2] }, 'flatten[1]'],
    [{ flatten: ['a'], as: ['a', 'b'] }, 'as'],
    [{ flatten: ['a'], index: 'a' }, 'index'],
    [{ pivot: 'x' }, 'value'],
    [{ pivot: '', value: 'y' }, 'pivot'],
    [{ pivot: 'x', value: 'y', op: {} }, 'op'],
    [{ pivot: 'x', value: 'y', limit: -1 }, 'limit'],
    [{ pivot: 'x', value: 'y', limit: 1.5 }, 'limit'],
    [{ stack: '' }, 'stack'],
    [{ stack: 'y', offset: 'wiggle' }, 'offset'],
    [{ stack: 'y', groupby: [2] }, 'groupby[0]'],
    [{ stack: 'y', sort: [{ order: 'ascending' }] }, 'sort[0].field'],
    [{ stack: 'y', sort: [{ field: 'x', order: 'wrong' }] }, 'sort[0].order'],
    [{ stack: 'y', as: ['v', 'v'] }, 'as'],
    [{ stack: 'y', as: 'v' }, 'as'],
    [{ stack: 'y', as: ['', 'v'] }, 'as'],
    [{ sample: -1 }, 'sample'],
    [{ sample: 1.2 }, 'sample'],
    [{ sample: '2' }, 'sample'],
    [{ sample: Number.MAX_SAFE_INTEGER + 1 }, 'sample'],
  ])('rejects new kernel malformed %j at its authored field before any rows', (transform, property) => {
    expect(
      validateVegaLiteSpec(unit({ data: { values: [] }, transform: [transform] }), { mode: 'strict' }),
    ).toContainEqual(expect.objectContaining({ path: `$.transform[0].${property}`, severity: 'error' }));
    expect(() => applyVegaTransforms([], [transform as Record<string, unknown>], { mode: 'strict' })).toThrow();
  });

  it.each([
    [{ bin: { unknown: 1 }, field: 'y' }, 'bin.unknown'],
    [{ flatten: ['a'], surprise: true }, 'surprise'],
    [{ pivot: 'x', value: 'y', as: ['a'] }, 'as'],
    [{ stack: 'y', sort: [{ field: 'x', op: 'sum' }] }, 'sort[0].op'],
    [{ sample: 2, seed: 1 }, 'seed'],
    [{ regression: 'y', on: 'x', method: 'poly' }, 'method'],
  ])('rejects unsupported new transform overrides %j at the individual property', (transform, property) => {
    expect(
      paths(validateVegaLiteSpec(unit({ transform: [transform] }), { mode: 'strict' }), 'unsupported-property'),
    ).toEqual([`$.transform[0].${property}`]);
  });

  it.each(['values', 'argmin', 'argmax', 'made-up'])('rejects non-scalar/unimplemented pivot %s operations', op => {
    expect(
      validateVegaLiteSpec(unit({ transform: [{ pivot: 'x', value: 'y', op }] }), { mode: 'strict' }),
    ).toContainEqual(expect.objectContaining({ path: '$.transform[0].op', severity: 'error' }));
  });

  it.each(isoTemporalExpectations)(
    'accepts ISO time-unit %s with exact week-year output for %s',
    (timeUnit, d, expected) => {
      const transform = { timeUnit, field: 'd', as: 'out' };
      expect(validateVegaLiteSpec(unit({ transform: [transform] }), { mode: 'strict' })).toEqual([]);
      expect((applyVegaTransforms([{ d }], [transform], { mode: 'strict' })[0].out as Date).toISOString()).toBe(
        expected,
      );
      expect(
        validateVegaLiteSpec(unit({ encoding: { ...xy, x: { field: 'd', type: 'temporal', timeUnit } } }), {
          mode: 'strict',
        }),
      ).toEqual([]);
    },
  );

  it.each([
    ['yearisoweekmonth', ''],
    ['binnedbogus', ''],
    [{ unit: 'year', utc: 'true' }, '.utc'],
    [{ unit: 'year', binned: 1 }, '.binned'],
    [{ unit: 'isoweek', step: 0 }, '.step'],
  ])('rejects invalid ISO/binned calendar declaration %j at its option', (timeUnit, suffix) => {
    expect(
      validateVegaLiteSpec(unit({ transform: [{ timeUnit, field: 'd', as: 'out' }] }), { mode: 'strict' }),
    ).toContainEqual(expect.objectContaining({ path: `$.transform[0].timeUnit${suffix}`, severity: 'error' }));
  });

  it('gates raw public fixture corpus strictly, without hidden preparation/fallback', () => {
    Object.entries(integrationFixtures).forEach(([name, spec]) => {
      expect({ name, diagnostics: validateVegaLiteSpec(spec, { mode: 'strict', allowExternalData: true }) }).toEqual({
        name,
        diagnostics: [],
      });
    });
  });

  it.each(specificationCorpus)(
    '$file: accepts the independent raw JSON corpus without erasing authored attributes',
    entry => {
      const original = JSON.stringify(entry.spec);
      expect(validateVegaLiteSpec(entry.spec, { mode: 'strict', allowExternalData: !!entry.resource })).toEqual([]);
      expect(JSON.stringify(entry.spec)).toBe(original);
    },
  );

  it.each(['bar', 'rect', 'tick'])('accepts x.bin:binned only on the real ranged %s endpoint path', mark => {
    const spec = unit({
      mark,
      data: { values: [{ lo: 1, hi: 3, y: 2 }] },
      encoding: {
        x: { field: 'lo', type: 'quantitative', bin: 'binned', scale: { domain: [0, 4] } },
        x2: { field: 'hi' },
        y: { ...xy.y, scale: { domain: [0, 4] } },
      },
    });
    expect(canRenderVegaRangedSpec(spec)).toBe(true);
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    const [geometry] = getVegaRangedGeometry(spec, 100, 100).marks;
    expect([geometry.x1, geometry.x2]).toEqual([25, 75]);
    expect(spec.encoding!.x!.bin).toBe('binned');
  });

  it.each([
    ['bar', undefined],
    ['bar', { datum: 3 }],
    ['bar', { field: '' }],
    ['bar', { field: 3 }],
    ['line', { field: 'hi' }],
    ['point', { field: 'hi' }],
    ['area', { field: 'hi' }],
  ])('diagnoses x.bin:binned for %s without a supported field endpoint %j', (mark, x2) => {
    const spec = unit({ mark, encoding: { ...xy, x: { ...xy.x, bin: 'binned' }, ...(x2 ? { x2 } : {}) } });
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toContainEqual(
      expect.objectContaining({
        code: 'unsupported-property',
        path: '$.encoding.x.bin',
        severity: 'error',
      }),
    );
  });

  it.each(['bar', 'area'])('accepts materialized normalized %s stack order and checks actual native output', mark => {
    const spec = unit({
      mark,
      data: {
        values: [
          { category: 'A', series: 'First', y: 2, priority: 1 },
          { category: 'A', series: 'Second', y: 6, priority: 2 },
        ],
      },
      encoding: {
        x: { field: 'category', type: 'nominal' },
        y: { ...xy.y, stack: 'normalize' },
        color: { field: 'series', type: 'nominal', scale: { domain: ['First', 'Second'] } },
        order: { field: 'priority', type: 'quantitative', sort: 'descending' },
      },
    });
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    if (mark === 'bar') {
      const props = transformVegaLiteToVerticalStackedBarChartProps(spec, { current: new Map() }, false, {
        mode: 'strict',
      });
      expect(props.data![0].chartData.map(point => [point.legend, point.data])).toEqual([
        ['Second', 0.75],
        ['First', 0.25],
      ]);
    } else {
      const props = transformVegaLiteToAreaChartProps(spec, { current: new Map() }, false, { mode: 'strict' });
      expect(props.data!.lineChartData!.map(series => [series.legend, series.data[0].y])).toEqual([
        ['Second', 0.75],
        ['First', 0.25],
      ]);
    }
  });

  it.each(['zero', 'normalize', undefined])('accepts native stacked field/order definitions with %s offset', stack => {
    for (const mark of ['bar', 'area']) {
      const spec = unit({
        mark,
        encoding: {
          x: { field: 'category', type: 'ordinal' },
          y: { ...xy.y, ...(stack ? { stack } : {}) },
          color: { field: 'series', type: 'nominal' },
          order: [
            { field: 'priority', sort: 'descending' },
            { field: 'series', type: 'nominal' },
          ],
        },
      });
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    }
  });

  it.each([
    { mark: 'line' },
    { mark: 'point' },
    { mark: 'rect' },
    { y: { ...xy.y, stack: null } },
    { color: undefined },
    { x: xy.x },
    { x2: { field: 'end' } },
    { xOffset: { field: 'group' } },
  ])('does not claim order on a renderer that ignores it %j', override => {
    const { mark = 'bar', ...encoding } = override;
    const spec = unit({
      mark,
      encoding: {
        x: { field: 'category', type: 'nominal' },
        y: { ...xy.y, stack: 'normalize' },
        color: { field: 'series', type: 'nominal' },
        order: { field: 'priority', sort: 'descending' },
        ...encoding,
      },
    });
    expect(paths(validateVegaLiteSpec(spec, { mode: 'strict' }), 'unsupported-combination')).toContain(
      '$.encoding.order',
    );
  });

  it.each([
    [{ value: 1 }, '.field'],
    [{ field: 'priority', sort: 'none' }, '.sort'],
    [{ field: 'priority', aggregate: 'sum' }, '.aggregate'],
    [{ field: 'priority', condition: { test: 'true', value: 1 } }, '.condition'],
  ])('rejects ignored or malformed stack order options %j at their authored path', (order, suffix) => {
    const spec = unit({
      mark: 'bar',
      encoding: {
        x: { field: 'category', type: 'nominal' },
        y: { ...xy.y, stack: 'normalize' },
        color: { field: 'series', type: 'nominal' },
        order,
      },
    });
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toContainEqual(
      expect.objectContaining({
        path: `$.encoding.order${suffix}`,
        severity: 'error',
      }),
    );
  });

  it.each(['quantitative', 'ordinal', 'temporal'])(
    'accepts predicate-compatible strict centered area %s units with real closed geometry',
    type => {
      const xs = type === 'temporal' ? ['2026-10-11T00:00:00Z', '2026-10-12T00:00:00Z'] : [0, 2];
      const spec = unit({
        mark: { type: 'area', interpolate: 'linear', opacity: 0.8, fillOpacity: 0.5 },
        data: {
          values: [
            { x: xs[0], y: 2, g: 'A' },
            { x: xs[0], y: 4, g: 'B' },
            { x: xs[1], y: 2, g: 'A' },
            { x: xs[1], y: 8, g: 'B' },
          ],
        },
        encoding: {
          x: { field: 'x', type },
          y: { ...xy.y, stack: 'center' },
          color: { field: 'g', type: 'nominal' },
          order: { field: 'g', sort: 'descending' },
        },
      });
      expect(canRenderVegaCenteredAreaSpec(spec)).toBe(true);
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
      const prepared = prepareVegaLiteSpec(spec, { mode: 'strict' });
      const geometry = getVegaCenteredAreaGeometry(prepared, 200, 100);
      expect(geometry.warnings).toEqual([]);
      expect(geometry.series).toHaveLength(2);
      expect(geometry.series[0].points.map(point => [point.lower, point.upper])).toEqual([
        [6, 8],
        [8, 10],
      ]);
      expect(geometry.series.every(series => series.d.endsWith('Z') && !/NaN|Infinity/.test(series.d))).toBe(true);
    },
  );

  it('supports flat compatible all-center-area layers and inherited exact diagnostic paths, never mixed/nested/independent layers', () => {
    const spec = raw({
      data: {
        values: [
          { x: 0, y: 2, g: 'A' },
          { x: 2, y: 4, g: 'A' },
        ],
      },
      encoding: { ...xy, y: { ...xy.y, stack: 'center' }, color: { field: 'g', type: 'nominal' } },
      layer: [{ mark: 'area' }, { mark: { type: 'area', opacity: 0.5 } }],
      resolve: {
        scale: { x: 'shared', y: 'shared', color: 'shared' },
        axis: { x: 'shared', y: 'shared' },
        legend: { color: 'shared' },
      },
    });
    expect(canRenderVegaCenteredAreaSpec(spec)).toBe(true);
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    expect(getVegaCenteredAreaGeometry(spec, 200, 100).series).toHaveLength(2);
    expect(validateVegaLiteSpec(raw({ hconcat: [spec, unit()] }), { mode: 'strict' })).toEqual([]);
    for (const unsupported of [
      { ...spec, resolve: { scale: { y: 'independent' } } },
      { ...spec, resolve: { scale: { color: 'independent' } } },
      { ...spec, resolve: { axis: { x: 'independent' } } },
      { ...spec, resolve: { legend: { color: 'independent' } } },
      { ...spec, layer: [spec.layer![0], { mark: 'line' }] },
      { layer: [spec] },
      { ...spec, layer: [spec.layer![0], { mark: 'area', encoding: { y: { ...xy.y, stack: 'zero' } } }] },
      {
        ...spec,
        layer: [
          spec.layer![0],
          { mark: 'area', encoding: { y: { ...xy.y, stack: 'center', scale: { reverse: true } } } },
        ],
      },
    ]) {
      expect(canRenderVegaCenteredAreaSpec(raw(unsupported))).toBe(false);
      expect(validateVegaLiteSpec(unsupported, { mode: 'strict' })).toContainEqual(
        expect.objectContaining({
          code: 'unsupported-property',
          path: 'encoding' in unsupported ? '$.encoding.y.stack' : '$.layer[0].encoding.y.stack',
          severity: 'error',
        }),
      );
    }
  });

  it('accepts only implemented centered-area mark/scale/impute options, not native stroke/point fallbacks', () => {
    const spec = unit({
      mark: { type: 'area', interpolate: 'basis' },
      encoding: {
        x: { ...xy.x, scale: { range: [200, 0], clamp: true, reverse: true } },
        y: { ...xy.y, stack: 'center', impute: null, scale: { range: [100, 0], reverse: true, clamp: true } },
      },
    });
    expect(canRenderVegaCenteredAreaSpec(spec)).toBe(true);
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    for (const key of ['point', 'strokeWidth', 'strokeDash']) {
      expect(
        paths(
          validateVegaLiteSpec(
            { ...spec, mark: { type: 'area', [key]: key === 'point' ? true : key === 'strokeDash' ? [2, 2] : 2 } },
            { mode: 'strict' },
          ),
          'unsupported-property',
        ),
      ).toContain(`$.mark.${key}`);
    }
    expect(
      paths(
        validateVegaLiteSpec(
          { ...spec, encoding: { ...spec.encoding, y: { ...spec.encoding!.y, impute: { value: 0 } } } },
          { mode: 'strict' },
        ),
        'unsupported-property',
      ),
    ).toContain('$.encoding.y.impute');
    expect(
      paths(
        validateVegaLiteSpec(
          { ...spec, encoding: { ...spec.encoding, x: { ...xy.x, scale: { paddingInner: 0.5 } } } },
          { mode: 'strict' },
        ),
        'unsupported-property',
      ),
    ).toContain('$.encoding.x.scale.paddingInner');
  });

  it.each([
    ['line', 'x'],
    ['line', 'y'],
    ['line', 'color'],
    ['point', 'size'],
    ['arc', 'theta'],
    ['arc', 'radius'],
    ['line', 'tooltip'],
  ])('accepts projected %s/%s title and tooltip:false without leaking omitted fields', (mark, channel) => {
    const encoding =
      mark === 'arc'
        ? { theta: { field: 'y', type: 'quantitative' }, radius: { field: 'y', type: 'quantitative' } }
        : { ...xy, color: { field: 'g', type: 'nominal' }, size: { field: 'y', type: 'quantitative' } };
    if (mark === 'line') {
      delete (encoding as Record<string, unknown>).size;
    }
    const spec = unit({
      mark,
      encoding: {
        ...encoding,
        [channel]: { ...encoding[channel as keyof typeof encoding], field: 'secret', title: 'Private', tooltip: false },
      },
    });
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    expect(buildVegaTooltip(spec, { x: 1, y: 2, g: 'A', secret: 'PRIVATE' }).ariaLabel).not.toMatch(
      /Private|PRIVATE|secret/,
    );
    expect(
      validateVegaLiteSpec(
        { ...spec, encoding: { ...spec.encoding, [channel]: { field: 'secret', tooltip: 'no' } } },
        { mode: 'strict' },
      ),
    ).toContainEqual(expect.objectContaining({ path: `$.encoding.${channel}.tooltip`, severity: 'error' }));
  });

  it('accepts only predicate-supported vertical/horizontal linear center bars, including authored order', () => {
    const encoding = {
      x: { field: 'g', type: 'nominal' },
      y: { field: 'v', type: 'quantitative', stack: 'center' },
      color: { field: 'series', type: 'nominal' },
      order: [{ field: 'series', type: 'nominal', sort: 'descending' }],
    };
    for (const axes of [encoding, { ...encoding, x: encoding.y, y: encoding.x }]) {
      const spec = unit({ mark: 'bar', encoding: axes, data: { values: [{ g: 'A', series: 'a', v: 2 }] } });
      expect(canRenderVegaRangedSpec(spec)).toBe(true);
      expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
      expect(getVegaRangedGeometry(spec, 100, 100).marks).toHaveLength(1);
    }
    for (const override of [
      { mark: 'area' },
      { encoding: { ...encoding, y: { ...encoding.y, scale: { type: 'log' } } } },
      { encoding: { ...encoding, color: { field: 'series', type: 'quantitative' } } },
      { encoding: { ...encoding, y2: { field: 'end' } } },
    ]) {
      const spec = unit({ mark: 'bar', encoding, ...override });
      expect(canRenderVegaRangedSpec(spec)).toBe(false);
      expect(paths(validateVegaLiteSpec(spec, { mode: 'strict' }), 'unsupported-property')).toContain(
        '$.encoding.y.stack',
      );
    }
  });

  it('allows compatible flat ranged units and plain nonstacked bars only under the supported parent predicate', () => {
    const spec = raw({
      data: { values: [{ g: 'A', lo: 1, hi: 4 }] },
      encoding: { x: { field: 'g', type: 'nominal' }, y: { field: 'hi', type: 'quantitative' } },
      resolve: { scale: { x: 'shared', y: 'shared', color: 'shared' } },
      layer: [
        { mark: 'bar', encoding: { y2: { field: 'lo' } } },
        { mark: { type: 'bar', opacity: 0.5 }, encoding: { y: { field: 'hi', type: 'quantitative', stack: null } } },
        { mark: 'rect', encoding: { y2: { field: 'lo' } } },
        { mark: 'tick' },
      ],
    });
    expect(canRenderVegaRangedSpec(spec)).toBe(true);
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    expect(getVegaRangedGeometry(spec, 100, 100).marks).toHaveLength(4);
    for (const unsupported of [
      { ...spec, resolve: { scale: { y: 'independent' } } },
      { ...spec, layer: [...spec.layer!, { mark: 'line' }] },
      { layer: [spec] },
      {
        ...spec,
        layer: [
          ...spec.layer!,
          { mark: 'bar', encoding: { y: { field: 'hi', type: 'quantitative', scale: { reverse: true } } } },
        ],
      },
      { ...spec, encoding: { ...spec.encoding, color: { field: 'g' } }, layer: [{ mark: 'bar' }, { mark: 'tick' }] },
    ]) {
      expect(canRenderVegaRangedSpec(raw(unsupported))).toBe(false);
      expect(
        paths(validateVegaLiteSpec(unsupported, { mode: 'strict' }), 'unsupported-combination').length,
      ).toBeGreaterThan(0);
    }
    expect(validateVegaLiteSpec(raw({ hconcat: [spec, unit()] }), { mode: 'strict' })).toEqual([]);
  });

  it('does not call original layer/scale/order/parse getters when consulting pure helpers', () => {
    const getter = jest.fn(() => {
      throw new Error('must not run');
    });
    const spec = unit({
      mark: 'bar',
      encoding: { x: { field: 'g', type: 'nominal' }, y: { ...xy.y, stack: 'center' }, color: { field: 'g' } },
    });
    Object.defineProperty(spec, 'layer', { enumerable: true, get: getter });
    Object.defineProperty(spec.encoding!.y!, 'scale', { enumerable: true, get: getter });
    Object.defineProperty(spec.encoding!, 'order', { enumerable: true, get: getter });
    spec.data!.format = { parse: Object.defineProperty({}, 'd', { enumerable: true, get: getter }) };
    expect(paths(validateVegaLiteSpec(spec, { mode: 'strict' }), 'unsafe-accessor')).toHaveLength(4);
    expect(getter).not.toHaveBeenCalled();
  });

  it('checks axis format and configuration defaults as strings without broadening ignored config', () => {
    expect(
      validateVegaLiteSpec(unit({ encoding: { ...xy, x: { ...xy.x, axis: { format: {} } } } }), { mode: 'strict' }),
    ).toContainEqual(expect.objectContaining({ path: '$.encoding.x.axis.format', severity: 'error' }));
    expect(
      paths(
        validateVegaLiteSpec(unit({ config: { axis: { format: '%Y' } } }), { mode: 'strict' }),
        'unsupported-property',
      ),
    ).toEqual(['$.config.axis']);
  });

  it.each([
    { extent: 'y', param: 'domain' },
    { extent: 'y', signal: 'domain' },
  ])('keeps standalone extent signals/parameters unsupported %j', transform => {
    expect(
      paths(validateVegaLiteSpec(unit({ transform: [transform] }), { mode: 'strict' }), 'unsupported-transform'),
    ).toEqual(['$.transform[0]']);
    expect(() => applyVegaTransforms([], [transform], { mode: 'strict' })).toThrow(/extent/i);
  });

  it.each([
    { density: 'y', extent: [0, 2], bandwidth: 1, steps: 2 },
    { regression: 'y', on: 'x', extent: [0, 2] },
  ])('accepts valid statistics extent through the corrected dispatcher %j', transform => {
    expect(validateVegaLiteSpec(unit({ transform: [transform] }), { mode: 'strict' })).toEqual([]);
    const rows = applyVegaTransforms(
      [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
      ],
      [transform],
      { mode: 'strict' },
    );
    expect(rows.map(row => row.x ?? row.value)).toEqual('density' in transform ? [0, 1, 2] : [0, 2]);
  });

  it.each([
    { density: 'y', extent: [2, 0] },
    { regression: 'y', on: 'x', extent: [2, 0] },
  ])('keeps invalid ordered statistics extent checks %j after the dispatch fix', transform => {
    expect(
      paths(validateVegaLiteSpec(unit({ transform: [transform] }), { mode: 'strict' }), 'invalid-transform'),
    ).toEqual(['$.transform[0].extent']);
    expect(() =>
      applyVegaTransforms(
        [
          { x: 1, y: 2 },
          { x: 2, y: 4 },
        ],
        [transform],
        { mode: 'strict' },
      ),
    ).toThrow(/extent/i);
  });

  it.each([
    { fold: ['x'], as: [null, 'v'] },
    { quantile: 'y', as: [null, 'v'] },
    { regression: 'y', on: 'x', as: [null, 'v'] },
  ])('does not allow null aliases that older kernels compact instead of preserving position %j', transform => {
    expect(
      paths(validateVegaLiteSpec(unit({ transform: [transform] }), { mode: 'strict' }), 'unsupported-property'),
    ).toEqual(['$.transform[0].as']);
  });

  it('bounds declaration compilation and returns malformed new fields without invoking coercion', () => {
    expect(
      validateVegaLiteSpec(unit({ data: { values: [], format: { parse: { d: `utc:${'x'.repeat(100001)}` } } } }), {
        mode: 'strict',
      }),
    ).toContainEqual(expect.objectContaining({ code: 'work-limit', severity: 'error' }));
    const hook = jest.fn(() => 'a');
    expect(() =>
      validateVegaLiteSpec(unit({ transform: [{ flatten: [{ toString: hook }] }] }), { mode: 'strict' }),
    ).not.toThrow();
    expect(hook).not.toHaveBeenCalled();
  });

  it('accepts untrusted/known raw Vega input at the public validation boundary and returns a diagnostic', () => {
    const knownRawVega = { $schema: 'https://vega.github.io/schema/vega/v5.json', marks: [] };
    const untrusted: unknown = knownRawVega;
    expect(paths(validateVegaLiteSpec(untrusted, { mode: 'strict' }), 'raw-vega')).toEqual(['$']);
    expect(paths(validateVegaLiteSpec(knownRawVega), 'raw-vega')).toEqual(['$']);
  });

  it('accepts ranged temporal Date domains without invoking overridden Date methods', () => {
    const getter = jest.fn(() => {
      throw new Error('must not run');
    });
    const start = new Date(0);
    Object.defineProperty(start, 'getTime', { value: getter });
    const spec = unit({
      mark: 'tick',
      encoding: {
        ...xy,
        x: {
          datum: new Date(500),
          type: 'temporal',
          scale: { type: 'utc', domain: [start, new Date(1000)] },
        },
      },
    });
    expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
    expect(getter).not.toHaveBeenCalled();
  });

  it('does not accept ignored clamp on categorical ranged scales or color scales', () => {
    const spec = unit({
      mark: 'tick',
      encoding: {
        ...xy,
        x: { field: 'group', type: 'nominal', scale: { type: 'band', clamp: true } },
        color: { field: 'group', scale: { clamp: true } },
      },
    });
    expect(paths(validateVegaLiteSpec(spec), 'unsupported-property')).toEqual([
      '$.encoding.x.scale.clamp',
      '$.encoding.color.scale.clamp',
    ]);
  });

  it('rejects raw Vega, invalid spec primitives and empty specs without throwing', () => {
    expect(
      paths(
        validateVegaLiteSpec(raw({ $schema: 'https://vega.github.io/schema/vega/v5.json', marks: [] })),
        'raw-vega',
      ),
    ).toEqual(['$']);
    for (const spec of [null, 1, [], {}]) {
      expect(paths(validateVegaLiteSpec(raw(spec)), 'invalid-spec')).toEqual(['$']);
    }
  });

  it('ignores inherited spec properties and never invokes own accessors, including array elements', () => {
    const getter = jest.fn(() => {
      throw new Error('must not execute');
    });
    const spec = Object.create({ mark: 'image' });
    Object.defineProperty(spec, 'encoding', { get: getter, enumerable: true });
    const rows: unknown[] = [];
    Object.defineProperty(rows, '0', { get: getter, enumerable: true });
    spec.data = { values: rows };
    const result = validateVegaLiteSpec(raw(spec));
    expect(paths(result, 'unsafe-accessor')).toEqual(['$.encoding', '$.data.values[0]']);
    expect(paths(result, 'unsupported-mark')).toEqual([]);
    expect(getter).not.toHaveBeenCalled();
  });

  it('treats hostile own dataset names as inert data without prototype pollution', () => {
    const spec = unit({ datasets: JSON.parse('{"__proto__":[],"constructor":[]}'), data: { name: '__proto__' } });
    expect(validateVegaLiteSpec(spec)).toEqual([]);
    expect(Object.getPrototypeOf({})).toBe(Object.prototype);
  });

  it('bounds cyclic, deep and wide input and reports the exact failing path', () => {
    const cyclic: Record<string, unknown> = { mark: 'line' };
    cyclic.spec = cyclic;
    expect(paths(validateVegaLiteSpec(raw(cyclic)), 'cycle')).toEqual(['$.spec']);
    let deep: Record<string, unknown> = { mark: 'line' };
    for (let i = 0; i < 150; i++) {
      deep = { spec: deep };
    }
    const depth = validateVegaLiteSpec(raw(deep)).find(item => item.code === 'depth-limit');
    expect(depth?.path).toMatch(/^\$(\.spec)+$/);
    expect(depth?.severity).toBe('error');
    expect(validateVegaLiteSpec(unit({ data: { values: Array.from({ length: 100001 }, () => ({})) } }))).toContainEqual(
      expect.objectContaining({ code: 'work-limit', severity: 'error' }),
    );
  });

  it('allows shared acyclic objects and reports bracket-escaped unusual JSON property paths', () => {
    expect(validateVegaLiteSpec(raw({ hconcat: [unit(), unit()] }))).toEqual([]);
    expect(
      paths(validateVegaLiteSpec(unit({ encoding: { ...xy, 'odd.channel': { field: 'a' } } })), 'unsupported-channel'),
    ).toEqual(['$.encoding["odd.channel"]']);
  });

  it('points inherited encoding diagnostics at their actual declaration, once per source path', () => {
    const spec = raw({
      encoding: { x: { ...xy.x, scale: { type: 'pow' } }, y: xy.y },
      layer: [{ mark: 'line' }, { layer: [{ mark: 'point' }] }],
    });
    expect(paths(validateVegaLiteSpec(spec), 'unsupported-scale')).toEqual(['$.encoding.x.scale.type']);
  });

  it('detects incompatible field data without invoking object coercion or silently correcting the type', () => {
    const coercion = jest.fn(() => 1);
    const diagnostics = validateVegaLiteSpec(unit({ data: { values: [{ x: 'not numeric', y: 2 }] } }));
    expect(paths(diagnostics, 'invalid-field-type')).toEqual(['$.encoding.x.type']);
    expect(validateVegaLiteSpec(unit({ data: { values: [{ x: '1', y: 2 }] } }))).toEqual([]);
    validateVegaLiteSpec(unit({ data: { values: [{ x: { valueOf: coercion }, y: 2 }] } }));
    expect(coercion).not.toHaveBeenCalled();
  });

  it('does not validate derived transform fields against untransformed source rows', () => {
    expect(
      validateVegaLiteSpec(
        unit({ transform: [{ calculate: '1', as: 'x' }], data: { values: [{ x: 'source text', y: 2 }] } }),
      ),
    ).toEqual([]);
  });

  it('detects known-but-ignored secondary scale and incompatible layer combinations', () => {
    expect(
      paths(
        validateVegaLiteSpec(
          unit({ mark: 'bar', encoding: { ...xy, x2: { field: 'end', scale: { domain: [0, 10] } } } }),
        ),
        'unsupported-property',
      ),
    ).toContain('$.encoding.x2.scale');
    expect(
      paths(
        validateVegaLiteSpec(raw({ layer: [unit({ mark: 'arc', encoding: { theta: { field: 'x' } } }), unit()] })),
        'unsupported-combination',
      ),
    ).toContain('$.layer');
  });

  it('does not silently ignore declared encodings on empty or malformed compositions', () => {
    expect(
      paths(validateVegaLiteSpec(raw({ encoding: { longitude: { field: 'x' } }, layer: [] })), 'unsupported-channel'),
    ).toEqual(['$.encoding.longitude']);
  });

  it('does not narrow legacy fields and supports typed repeat authoring through the template seam', () => {
    const ordinary: VegaLiteSpec = { mark: 'line', encoding: { x: { field: 'x' }, y: { field: 'y' } } };
    const oldField: string | undefined = ordinary.encoding?.x?.field;
    const repeat: VegaLiteSpec = {
      repeat: ['x', 'y'],
      spec: {
        mark: 'point',
        encoding: {
          x: { field: { repeat: 'repeat' }, type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      },
    };
    expect(oldField).toBe('x');
    expect(validateVegaLiteSpec(repeat)).toEqual([]);
  });

  it('reports invalid named data at real dataset JSON paths, not synthetic .values paths', () => {
    expect(paths(validateVegaLiteSpec(unit({ datasets: { named: [1] } })), 'invalid-data')).toEqual([
      '$.datasets.named[0]',
    ]);
  });

  it('bounds semantic work across views inheriting a large dataset', () => {
    const spec = raw({
      data: { values: Array.from({ length: 20000 }, () => ({ x: 1, y: 2 })) },
      encoding: xy,
      hconcat: Array.from({ length: 20 }, () => ({ mark: 'line' })),
    });
    expect(validateVegaLiteSpec(spec)).toContainEqual(
      expect.objectContaining({ code: 'work-limit', severity: 'error' }),
    );
  });

  it('returns a diagnostic for objects that cannot be inspected safely', () => {
    const exotic = new Proxy(
      {},
      {
        getPrototypeOf: () => {
          throw new Error('uninspectable');
        },
      },
    );
    expect(validateVegaLiteSpec(raw(exotic), { mode: 'strict' })).toContainEqual(
      expect.objectContaining({ code: 'invalid-spec', path: '$', severity: 'error' }),
    );
  });

  it('never calls array-owned methods and bounds sparse array lengths before cloning', () => {
    const rows = [{ x: 1, y: 2 }];
    Object.defineProperty(rows, 'forEach', { value: 42 });
    expect(validateVegaLiteSpec(unit({ data: { values: rows } }))).toContainEqual(
      expect.objectContaining({ code: 'invalid-spec', path: '$.data.values.forEach', severity: 'error' }),
    );
    expect(validateVegaLiteSpec(unit({ data: { values: new Array(1000001) } }))).toContainEqual(
      expect.objectContaining({ code: 'work-limit', path: '$.data.values', severity: 'error' }),
    );
  });

  it('requires a known geometry combination rather than accepting any recognized mark', () => {
    for (const mark of ['line', 'point', 'bar', 'area', 'rect', 'arc']) {
      expect(paths(validateVegaLiteSpec(raw({ mark })), 'unsupported-combination')).toContain('$.mark');
    }
    expect(
      validateVegaLiteSpec(raw({ mark: 'arc', encoding: { theta: { field: 'v', type: 'quantitative' } } })),
    ).toEqual([]);
  });
});
