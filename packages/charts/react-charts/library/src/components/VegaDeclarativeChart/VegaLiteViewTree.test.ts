import type { VegaLiteSpec, VegaLiteUnitSpec } from './VegaLiteTypes';
import { buildVegaViewTree, getVegaViewSourceSpec } from './VegaLiteViewTree';
import type { VegaViewNode } from './VegaLiteViewTree';
import { getVegaCenteredAreaGeometry } from './VegaLiteCenteredArea';
import { getVegaRangedGeometry } from './VegaLiteRangedGeometry';
import {
  missingFacetSpec,
  nestedConcatSpec,
  repeatMatrixSpec,
  transformedConcatSpec,
} from '../../testing/fixtures/composition';

function units(node: VegaViewNode): Extract<VegaViewNode, { type: 'unit' }>[] {
  return node.type === 'unit' ? [node] : node.children.flatMap(units);
}

function structure(node: VegaViewNode): unknown {
  return node.type === 'unit'
    ? { type: node.type, path: node.path }
    : {
        type: node.type,
        direction: node.direction,
        columns: node.columns,
        path: node.path,
        children: node.children.map(structure),
      };
}

function freeze(value: unknown): void {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
}

describe('buildVegaViewTree', () => {
  describe('inferred positional extents', () => {
    const centered: VegaLiteSpec = {
      mark: 'area',
      data: {
        values: [
          { x: 1, series: 'First', amount: 2 },
          { x: 1, series: 'Second', amount: 6 },
          { x: 2, series: 'First', amount: 4 },
          { x: 2, series: 'Second', amount: 4 },
        ],
      },
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'amount', type: 'quantitative', stack: 'center' },
        color: { field: 'series', type: 'nominal' },
      },
    };

    it('uses the finished prepared center-area stack, not its largest raw contribution', () => {
      const spec = JSON.parse(JSON.stringify(centered)) as VegaLiteSpec;
      freeze(spec);
      const prepared = units(buildVegaViewTree(spec, { mode: 'strict' }))[0].spec;
      const geometry = getVegaCenteredAreaGeometry(prepared, 200, 100);
      expect(prepared.encoding?.y?.scale?.domain).toEqual([0, 8]);
      expect(geometry.yDomain).toEqual([0, 8]);
      expect(Math.max(...geometry.points.map(point => point.upper))).toBe(8);
      expect(geometry.points.every(point => point.yUpper >= 0 && point.yLower <= 100)).toBe(true);
      expect(getVegaViewSourceSpec(prepared).encoding?.y?.scale?.domain).toEqual([0, 8]);
      expect(spec.encoding?.y?.scale).toBeUndefined();
    });

    it.each(['bar', 'area'] as const)('infers default zero-stack totals for colored %s units', mark => {
      const spec: VegaLiteSpec = {
        mark,
        data: {
          values: [
            { x: 'A', series: 'First', amount: 10 },
            { x: 'A', series: 'Second', amount: 15 },
            { x: 'B', series: 'First', amount: 12 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'ordinal' },
          y: { field: 'amount', type: 'quantitative' },
          color: { field: 'series', type: 'nominal' },
        },
      };
      const prepared = units(buildVegaViewTree(spec))[0].spec;
      expect(prepared.encoding?.y?.scale?.domain).toEqual([0, 25]);
      expect(getVegaViewSourceSpec(prepared).encoding?.y?.scale?.domain).toEqual([0, 25]);
    });

    it.each([
      ['zero', [0, 10]],
      ['center', [0, 17]],
      ['normalize', [-1, 1]],
    ] as const)('computes %s stack extrema with separate typed ordinal groups', (stack, expected) => {
      const spec: VegaLiteSpec = {
        mark: 'bar',
        data: {
          values: [
            { group: 1, series: 'B', n: 4 },
            { group: 1, series: 'A', n: 6 },
            { group: '1', series: 'B', n: 3 },
            { group: '1', series: 'A', n: -7 },
            { group: false, series: 'A', n: -9 },
            { group: false, series: 'B', n: -8 },
          ],
        },
        encoding: {
          x: { field: 'group', type: 'ordinal' },
          y: { field: 'n', type: 'quantitative', stack },
          color: { field: 'series', type: 'nominal', scale: { domain: ['A', 'B'] } },
        },
      };
      const prepared = units(buildVegaViewTree(spec))[0].spec;
      expect(prepared.encoding?.y?.scale?.domain).toEqual(stack === 'zero' ? [-17, expected[1]] : expected);
      expect(getVegaViewSourceSpec(prepared).encoding?.y?.scale?.domain).toEqual(prepared.encoding?.y?.scale?.domain);
    });

    it.each([
      [
        [2, 6],
        [0, 1],
      ],
      [
        [-2, -6],
        [-1, 0],
      ],
      [
        [0, 0],
        [0, 0],
      ],
    ])('normalizes sign-aware extents for contributions %j', (amounts, expected) => {
      const prepared = units(
        buildVegaViewTree({
          mark: 'bar',
          data: { values: amounts.map(n => ({ x: 'A', n })) },
          encoding: { x: { field: 'x', type: 'nominal' }, y: { field: 'n', type: 'quantitative', stack: 'normalize' } },
        }),
      )[0].spec;
      expect(prepared.encoding?.y?.scale?.domain).toEqual(expected);
    });

    it.each(['zero', 'center'] as const)('stacks explicit %s without a color field on horizontal bars', stack => {
      const prepared = units(
        buildVegaViewTree({
          mark: { type: 'bar', orient: 'horizontal' },
          data: {
            values: [
              { group: 'A', n: 10 },
              { group: 'A', n: 15 },
            ],
          },
          encoding: { y: { field: 'group', type: 'nominal' }, x: { field: 'n', type: 'quantitative', stack } },
        }),
      )[0].spec;
      expect(prepared.encoding?.x?.scale?.domain).toEqual([0, 25]);
    });

    it('does not mistake plain duplicate-x bars, disabled stacks, offset groups or lines for stacks', () => {
      const base: VegaLiteSpec = {
        mark: 'bar',
        data: {
          values: [
            { x: 'A', series: 'First', amount: 10 },
            { x: 'A', series: 'Second', amount: 15 },
          ],
        },
        encoding: { x: { field: 'x', type: 'nominal' }, y: { field: 'amount', type: 'quantitative' } },
      };
      const color = { field: 'series', type: 'nominal' } as const;
      const specs: VegaLiteSpec[] = [
        base,
        { ...base, encoding: { ...base.encoding, color, y: { ...base.encoding?.y, stack: null } } },
        // Legacy JSON can disable stacking with false, though the authoring type accepts only null.
        {
          ...base,
          encoding: { ...base.encoding, color, y: { ...base.encoding?.y, stack: false } },
        } as unknown as VegaLiteSpec,
        { ...base, encoding: { ...base.encoding, color, xOffset: { field: 'series', type: 'nominal' } } },
        { ...base, mark: 'line', encoding: { ...base.encoding, color } },
      ];
      specs.forEach(spec => expect(units(buildVegaViewTree(spec))[0].spec.encoding?.y?.scale?.domain).toEqual([0, 15]));
    });

    it('unions child stack extents across different prepared aggregate fields and parent scopes', () => {
      const spec: VegaLiteSpec = {
        resolve: { scale: { y: 'shared' } },
        hconcat: [
          { ...centered, encoding: { ...centered.encoding, y: { ...centered.encoding?.y, aggregate: 'sum' } } },
          {
            mark: 'bar',
            data: {
              values: [
                { group: 'A', series: 'First', other: 10 },
                { group: 'A', series: 'Second', other: 15 },
              ],
            },
            encoding: {
              x: { field: 'group', type: 'nominal' },
              y: { field: 'other', type: 'quantitative' },
              color: { field: 'series', type: 'nominal' },
            },
          },
        ],
      };
      const cells = units(buildVegaViewTree(spec, { mode: 'strict' }));
      cells.forEach(cell => {
        expect(cell.spec.encoding?.y?.scale?.domain).toEqual([0, 25]);
        expect(getVegaViewSourceSpec(cell.spec).encoding?.y?.scale?.domain).toEqual([0, 25]);
      });
      expect(cells[0].spec.encoding?.y?.field).not.toBe('amount');
      expect(getVegaViewSourceSpec(cells[0].spec).encoding?.y?.aggregate).toBe('sum');
    });

    it('keeps inferred centered-bar layer endpoints inside the final shared plot domain', () => {
      const spec: VegaLiteSpec = {
        layer: [
          { ...centered, mark: 'bar', encoding: { ...centered.encoding, x: { field: 'x', type: 'ordinal' } } },
          {
            mark: 'bar',
            data: { values: [{ x: 1, low: 10, high: 50 }] },
            encoding: {
              x: { field: 'x', type: 'ordinal' },
              y: { field: 'low', type: 'quantitative' },
              y2: { field: 'high' },
            },
          },
        ],
      };
      freeze(spec);
      const prepared = units(buildVegaViewTree(spec))[0].spec;
      prepared.layer?.forEach(layer => expect(layer.encoding?.y?.scale?.domain).toEqual([0, 50]));
      getVegaViewSourceSpec(prepared).layer?.forEach(layer =>
        expect(layer.encoding?.y?.scale?.domain).toEqual([0, 50]),
      );
      const geometry = getVegaRangedGeometry(prepared, 200, 100);
      expect(geometry.marks).toHaveLength(5);
      expect(geometry.marks.every(mark => mark.y >= 0 && mark.y + mark.height <= 100)).toBe(true);
      expect(geometry.marks[4]).toMatchObject({ y: 0, height: 80 });
    });

    it.each(['x', 'y'] as const)('includes %s2 field endpoints without assigning a secondary scale', channel => {
      const secondary = channel === 'x' ? 'x2' : 'y2';
      const prepared = units(
        buildVegaViewTree({
          mark: 'bar',
          data: { values: [{ start: 10, end: 50 }] },
          encoding: { [channel]: { field: 'start', type: 'quantitative' }, [secondary]: { field: 'end' } },
        }),
      )[0].spec;
      expect(prepared.encoding?.[channel]?.scale?.domain).toEqual([0, 50]);
      expect(getVegaViewSourceSpec(prepared).encoding?.[channel]?.scale?.domain).toEqual([0, 50]);
      expect(prepared.encoding?.[secondary]).toEqual({ field: 'end' });
    });

    it('includes secondary datum endpoints, without reusing count-without-field as their value', () => {
      const prepared = units(
        buildVegaViewTree({
          mark: 'bar',
          data: { values: [{ x: 'A' }, { x: 'A' }] },
          encoding: {
            x: { field: 'x', type: 'nominal' },
            y: { aggregate: 'count', type: 'quantitative' },
            y2: { datum: 50 },
          },
        }),
      )[0].spec;
      expect(prepared.encoding?.y?.scale?.domain).toEqual([0, 50]);
      expect(getVegaViewSourceSpec(prepared).encoding?.y).toMatchObject({
        aggregate: 'count',
        scale: { domain: [0, 50] },
      });
      expect(getVegaViewSourceSpec(prepared).encoding?.y2).toEqual({ datum: 50 });
    });

    it('includes both temporal range endpoints and copies independent Date domains to provenance', () => {
      const spec: VegaLiteSpec = {
        resolve: { scale: { x: 'shared' } },
        hconcat: [
          {
            mark: 'bar',
            data: { values: [{ start: '2026-02-01', end: '2026-05-01' }] },
            encoding: {
              x: { field: 'start', type: 'temporal', scale: { type: 'utc' } },
              x2: { field: 'end' },
            },
          },
          {
            mark: 'bar',
            data: { values: [{ start: '2026-03-01', end: '2026-01-01' }] },
            encoding: {
              x: { field: 'start', type: 'temporal', scale: { type: 'utc' } },
              x2: { field: 'end' },
            },
          },
        ],
      };
      const cells = units(buildVegaViewTree(spec));
      cells.forEach(cell => {
        expect(cell.spec.encoding?.x?.scale?.domain).toEqual([new Date('2026-01-01'), new Date('2026-05-01')]);
        const source = getVegaViewSourceSpec(cell.spec);
        expect(source.encoding?.x?.scale?.domain).toEqual(cell.spec.encoding?.x?.scale?.domain);
        expect(source.encoding?.x?.scale?.domain?.[0]).not.toBe(cell.spec.encoding?.x?.scale?.domain?.[0]);
      });
    });

    it('never widens authored unit stack/range domains, while still unioning shared authored domains', () => {
      const first: VegaLiteSpec = {
        ...centered,
        encoding: { ...centered.encoding, y: { ...centered.encoding?.y, scale: { domain: [1, 3] } } },
      };
      const second: VegaLiteSpec = {
        mark: 'bar',
        data: { values: [{ start: 10, end: 50 }] },
        encoding: {
          y: { field: 'start', type: 'quantitative', scale: { domain: [10, 20] } },
          y2: { field: 'end' },
        },
      };
      expect(units(buildVegaViewTree(first))[0].spec.encoding?.y?.scale?.domain).toEqual([1, 3]);
      expect(units(buildVegaViewTree(second))[0].spec.encoding?.y?.scale?.domain).toEqual([10, 20]);
      const shared = units(buildVegaViewTree({ hconcat: [first, second], resolve: { scale: { y: 'shared' } } }));
      shared.forEach(cell => expect(cell.spec.encoding?.y?.scale?.domain).toEqual([1, 20]));
    });

    it('charges inferred stack grouping rows against the view work budget, but does not scan authored stacks', () => {
      const inferred: VegaLiteSpec = {
        ...centered,
        data: {
          values: Array.from({ length: 80 }, (_, index) => ({
            x: index % 2,
            series: index % 3 ? 'First' : 'Second',
            amount: 1,
          })),
        },
      };
      const authored: VegaLiteSpec = {
        ...inferred,
        encoding: { ...inferred.encoding, y: { ...inferred.encoding?.y, scale: { domain: [0, 40] } } },
      };
      let lower = 0;
      let upper = 100000;
      while (lower < upper) {
        const budget = Math.floor((lower + upper) / 2);
        try {
          buildVegaViewTree(authored, { maxWork: budget });
          upper = budget;
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect((error as Error).message).toMatch(/work.*limit/i);
          lower = budget + 1;
        }
      }
      expect(() => buildVegaViewTree(authored, { maxWork: upper + 80 })).not.toThrow();
      expect(() => buildVegaViewTree(inferred, { maxWork: upper + 80 })).toThrow(/work.*limit/i);
    });

    it('reads unknown source specs by identity without getters or callable scale/row hooks', () => {
      const getter = jest.fn(() => {
        throw new Error('unsafe getter');
      });
      const hook = jest.fn(() => {
        throw new Error('unsafe hook');
      });
      const unknown = Object.defineProperty({}, 'encoding', { enumerable: true, get: getter }) as VegaLiteSpec;
      expect(getVegaViewSourceSpec(unknown)).toBe(unknown);
      const spec = {
        mark: 'bar',
        data: {
          values: [
            { x: 'A', n: 2, series: 'A' },
            { x: 'A', n: { valueOf: hook, toString: hook }, series: 'B' },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'nominal' },
          y: { field: 'n', type: 'quantitative', stack: 'center', scale: hook },
          y2: Object.defineProperty({}, 'field', { enumerable: true, get: getter }),
          color: { field: 'series', type: 'nominal' },
        },
      } as unknown as VegaLiteSpec;
      const prepared = units(buildVegaViewTree(spec))[0].spec;
      expect(prepared.encoding?.y?.scale?.domain).toEqual([0, 2]);
      expect(hook).not.toHaveBeenCalled();
      expect(getter).not.toHaveBeenCalled();
    });
  });

  it('parses inline and chained named data before transforms, retaining cloned field Dates and provenance', () => {
    const spec = {
      datasets: { raw: [{ n: '2', when: '04/03/2026' }], alias: { name: 'raw' } },
      config: { mark: { tooltip: { content: 'data' } } },
      hconcat: [
        {
          data: { name: 'alias', format: { parse: { n: 'number', when: "utc:'%d/%m/%Y'" } } },
          mark: 'point',
          transform: [{ calculate: 'datum.n + 1', as: 'n' }],
          encoding: { x: { field: 'when', type: 'temporal' } },
        },
        {
          data: {
            values: [{ n: '4', when: '2026-01-02' }],
            format: { parse: { n: 'number', when: "date:'%Y-%m-%d'" } },
          },
          mark: 'point',
        },
      ],
    } as unknown as VegaLiteSpec;
    freeze(spec);
    const cells = units(buildVegaViewTree(spec, { mode: 'strict' }));
    expect(cells[0].spec.data?.values).toEqual([{ n: 3, when: new Date('2026-03-04') }]);
    expect(cells[1].spec.data?.values?.[0].n).toBe(4);
    expect(cells[1].spec.data?.values?.[0].when).toBeInstanceOf(Date);
    const source = getVegaViewSourceSpec(cells[0].spec);
    expect(source.data?.values?.[0].when).toEqual(new Date('2026-03-04'));
    expect(source.data?.values?.[0].when).not.toBe(cells[0].spec.data?.values?.[0].when);
    expect(source.transform).toBeUndefined();
    expect(source.config?.mark).toMatchObject({ tooltip: { content: 'data' } });
  });

  it('resolves inherited named chains and child shadows, but rejects named cycles deterministically', () => {
    const spec = {
      datasets: { base: [{ n: 1 }], alias: { name: 'base' } },
      data: { name: 'alias' },
      hconcat: [{ mark: 'point' }, { datasets: { base: [{ n: 8 }] }, data: { name: 'alias' }, mark: 'point' }],
    } as unknown as VegaLiteSpec;
    expect(units(buildVegaViewTree(spec, { mode: 'strict' })).map(cell => cell.spec.data?.values)).toEqual([
      [{ n: 1 }],
      [{ n: 8 }],
    ]);
    for (const mode of ['legacy', 'strict'] as const) {
      expect(() =>
        buildVegaViewTree(
          {
            datasets: { a: { name: 'b' }, b: { name: 'a' } },
            data: { name: 'a' },
            mark: 'point',
          } as unknown as VegaLiteSpec,
          { mode },
        ),
      ).toThrow(/cyclic.*dataset/i);
    }
    expect(() =>
      buildVegaViewTree({ datasets: { a: { name: 'missing' } }, data: { name: 'a' } } as unknown as VegaLiteSpec, {
        mode: 'strict',
      }),
    ).toThrow(/dataset.*missing/i);
  });

  it.each(['x', 'y'] as const)(
    'shares categorical %s across cells while independent categories remain local',
    channel => {
      const children: VegaLiteSpec[] = [
        {
          mark: 'point',
          data: { values: [{ c: 'B' }, { c: 'A' }] },
          encoding: { [channel]: { field: 'c', type: 'nominal' } },
        },
        { mark: 'point', data: { values: [{ c: 'C' }] }, encoding: { [channel]: { field: 'c', type: 'ordinal' } } },
        { mark: 'point', data: { values: [] }, encoding: { [channel]: { field: 'c', type: 'nominal' } } },
      ];
      const shared = units(buildVegaViewTree({ hconcat: children, resolve: { scale: { [channel]: 'shared' } } }));
      shared.forEach(cell => {
        expect(cell.spec.encoding?.[channel]?.scale?.domain).toEqual(['A', 'B', 'C']);
        expect(getVegaViewSourceSpec(cell.spec).encoding?.[channel]?.scale?.domain).toEqual(['A', 'B', 'C']);
      });
      expect(shared[2].spec.data?.values).toEqual([]);
      const independent = units(
        buildVegaViewTree({ hconcat: children, resolve: { scale: { [channel]: 'independent' } } }),
      );
      expect(independent.map(cell => cell.spec.encoding?.[channel]?.scale?.domain)).toEqual([
        ['A', 'B'],
        ['C'],
        undefined,
      ]);
    },
  );

  it('retains the full missing facet Cartesian shape, row/column headers and shared positional categories without mutating title', () => {
    const spec: VegaLiteSpec = {
      data: {
        values: [
          { r: 'B', c: 'Q2' },
          { r: 'A', c: 'Q1' },
        ],
      },
      facet: { row: { field: 'r' }, column: { field: 'c' } },
      spec: {
        title: 'Original',
        mark: 'point',
        encoding: {
          x: { field: 'c', type: 'nominal' },
          y: { field: 'r', type: 'ordinal' },
        },
      },
    };
    freeze(spec);
    const cells = units(buildVegaViewTree(spec));
    expect(cells.map(cell => [cell.path, cell.spec.title, cell.spec.data?.values?.length])).toEqual([
      ['root/facet/0/0', 'r: A · c: Q1 · Original', 1],
      ['root/facet/0/1', 'r: A · c: Q2 · Original', 0],
      ['root/facet/1/0', 'r: B · c: Q1 · Original', 0],
      ['root/facet/1/1', 'r: B · c: Q2 · Original', 1],
    ]);
    cells.forEach(cell => {
      expect(cell.spec.encoding?.x?.scale?.domain).toEqual(['Q1', 'Q2']);
      expect(cell.spec.encoding?.y?.scale?.domain).toEqual(['A', 'B']);
    });
    expect(spec.spec?.title).toBe('Original');
  });

  it('shares temporal Date extents without zero, including explicit datetime objects and safe Date clones', () => {
    const hook = jest.fn(() => 0);
    const date = new Date('2026-03-04');
    date.getTime = hook;
    const spec = {
      resolve: { scale: { x: 'shared' } },
      hconcat: [
        {
          mark: 'point',
          data: { values: [{ d: date }] },
          encoding: { x: { field: 'd', type: 'temporal', scale: { type: 'utc', zero: true } } },
        },
        {
          mark: 'point',
          data: { values: [{ d: '2026-01-01' }] },
          encoding: {
            x: {
              field: 'd',
              type: 'temporal',
              scale: {
                type: 'utc',
                domain: [
                  { year: 2026, month: 2, date: 1 },
                  { year: 2026, month: 4, date: 1 },
                ],
              },
            },
          },
        },
      ],
    } as unknown as VegaLiteSpec;
    const cells = units(buildVegaViewTree(spec));
    cells.forEach(cell => {
      expect(cell.spec.encoding?.x?.scale?.domain).toEqual([new Date('2026-02-01'), new Date('2026-04-01')]);
      expect(cell.spec.encoding?.x?.scale?.domain?.every((value: unknown) => value instanceof Date)).toBe(true);
      expect(getVegaViewSourceSpec(cell.spec).encoding?.x?.scale?.domain).toEqual(cell.spec.encoding?.x?.scale?.domain);
    });
    expect(cells[0].spec.encoding?.x?.scale?.domain?.[0]).not.toBe(cells[1].spec.encoding?.x?.scale?.domain?.[0]);
    expect(hook).not.toHaveBeenCalled();
  });

  it('keeps unit explicit temporal domains and shared nested-layer provenance at the original channel locations', () => {
    const spec = {
      data: { values: [{ nested: { d: '2026-02-01', n: 2 } }] },
      layer: [
        {
          layer: [
            {
              mark: 'line',
              transform: [{ calculate: 'datum.nested.n + 1', as: 'n' }],
              encoding: {
                x: {
                  field: 'nested.d',
                  type: 'temporal',
                  scale: {
                    type: 'utc',
                    domain: [
                      { year: 2026, month: 1, date: 1 },
                      { year: 2026, month: 3, date: 1 },
                    ],
                  },
                },
                y: { field: 'n', aggregate: 'sum', type: 'quantitative' },
              },
            },
          ],
        },
        { mark: 'point', encoding: { x: { field: 'nested.d', type: 'temporal', scale: { type: 'utc' } } } },
      ],
    } as unknown as VegaLiteSpec;
    const prepared = units(buildVegaViewTree(spec, { mode: 'strict' }))[0].spec;
    const source = getVegaViewSourceSpec(prepared);
    const leaf = (prepared.layer?.[0] as unknown as VegaLiteSpec).layer?.[0] as VegaLiteSpec;
    const original = getVegaViewSourceSpec(leaf);
    expect(original).toBe((source.layer?.[0] as unknown as VegaLiteSpec).layer?.[0]);
    expect(original.encoding?.x?.field).toBe('nested.d');
    expect(original.encoding?.y?.aggregate).toBe('sum');
    expect(original.data?.values?.[0].n).toBe(3);
    expect(original.transform).toBeUndefined();
    expect(original.encoding?.x?.scale?.domain).toEqual([new Date('2026-01-01'), new Date('2026-03-01')]);
  });

  it('deeply merges inherited config defaults without dropping tooltip settings or sharing sibling objects', () => {
    const spec = {
      config: { mark: { tooltip: { content: 'data' } }, axis: { labelOverlap: true, title: 'Default' } },
      hconcat: [
        { mark: 'point', config: { mark: { tooltip: { content: 'encoding' } }, axis: { title: 'Child' } } },
        { mark: 'point', config: { mark: { tooltip: null }, axis: { title: 'Other' } } },
        { mark: 'point', config: { mark: { filled: true } } },
      ],
    } as unknown as VegaLiteSpec;
    freeze(spec);
    const cells = units(buildVegaViewTree(spec));
    expect(cells[0].spec.config?.axis).toEqual({ labelOverlap: true, title: 'Child' });
    expect(cells[1].spec.config?.mark).toMatchObject({ tooltip: null });
    expect(cells[2].spec.config?.mark).toEqual({ tooltip: { content: 'data' }, filled: true });
    expect(cells[0].spec.config?.axis).not.toBe(cells[1].spec.config?.axis);
    expect(getVegaViewSourceSpec(cells[2].spec).config).toEqual(cells[2].spec.config);
  });

  it('enforces configurable expansion, row and transform-work budgets before Cartesian copying', () => {
    const repeat = {
      data: { values: [{ a: 1, b: 2 }] },
      repeat: { row: ['a', 'b'], column: ['a', 'b'] },
      spec: { mark: 'point' },
    } as unknown as VegaLiteSpec;
    expect(() => buildVegaViewTree(repeat, { maxViews: 3 })).toThrow(/expansion.*budget/i);
    expect(() => buildVegaViewTree({ data: { values: [{ n: 1 }, { n: 2 }] } }, { maxRows: 1 })).toThrow(/row.*limit/i);
    expect(() =>
      buildVegaViewTree(
        { data: { values: [{ n: 1 }] }, transform: [{ fold: ['n', 'n', 'n', 'n'], as: ['field', 'value'] }] },
        { maxRows: 2 },
      ),
    ).toThrow(/row.*limit/i);
    expect(() =>
      buildVegaViewTree(
        { data: { values: [{ n: 1 }] }, transform: [{ calculate: 'datum.n + 1000000000', as: 'n' }] },
        { maxWork: 20 },
      ),
    ).toThrow(/work.*limit/i);
  });

  it('clones repeat arrays without getters and keeps declared field order, data and prototype paths isolated', () => {
    const getter = jest.fn(() => 'unsafe');
    const fields = ['b', 'a'];
    Object.defineProperty(fields, '2', { enumerable: true, get: getter });
    const row = JSON.parse('{"a":1,"b":2,"__proto__":{"n":3}}');
    const cells = units(
      buildVegaViewTree({
        data: { values: [row] },
        repeat: fields,
        spec: {
          mark: 'point',
          encoding: {
            x: { field: { repeat: 'repeat' }, type: 'quantitative' },
            tooltip: [{ field: '__proto__.n' }],
          },
        },
      } as unknown as VegaLiteSpec),
    );
    expect(cells.map(cell => getVegaViewSourceSpec(cell.spec).encoding?.x?.field)).toEqual(['b', 'a']);
    expect(cells[0].spec.data?.values).not.toBe(cells[1].spec.data?.values);
    expect(getter).not.toHaveBeenCalled();
    expect(Object.getPrototypeOf(cells[0].spec.data?.values?.[0])).toBe(Object.prototype);
  });

  it('sorts inferred shared categorical domains globally, not by the child visit order', () => {
    const cells = units(
      buildVegaViewTree({
        resolve: { scale: { x: 'shared' } },
        hconcat: [
          { mark: 'point', data: { values: [{ c: 'Z' }] }, encoding: { x: { field: 'c', type: 'nominal' } } },
          { mark: 'point', data: { values: [{ c: 'A' }] }, encoding: { x: { field: 'c', type: 'nominal' } } },
        ],
      }),
    );
    cells.forEach(cell => expect(cell.spec.encoding?.x?.scale?.domain).toEqual(['A', 'Z']));
  });

  it('rejects prototype-shaped repeat reference names rather than resolving inherited objects', () => {
    expect(() =>
      buildVegaViewTree({
        repeat: ['a'],
        spec: {
          mark: 'point',
          encoding: {
            x: { field: { repeat: '__proto__' }, type: 'quantitative' },
          },
        },
      } as unknown as VegaLiteSpec),
    ).toThrow(/unresolved.*repeat/i);
  });

  it('bounds text and transformed row budgets even across consecutive expansion transforms', () => {
    expect(() => buildVegaViewTree({ title: 'long title', mark: 'point' }, { maxTextLength: 4 })).toThrow(
      /text.*limit/i,
    );
    expect(() =>
      buildVegaViewTree(
        {
          data: { values: [{ a: [1, 2, 3] }] },
          transform: [{ fold: ['a', 'a'], as: ['key', 'value'] }, { flatten: ['value'] }],
        },
        { maxRows: 5 },
      ),
    ).toThrow(/row.*limit/i);
  });

  it('retains source encoding semantics after consuming parent and child transforms once', () => {
    const spec: VegaLiteSpec = {
      data: {
        values: [
          { when: '2024-01-02', value: 2 },
          { when: '2024-01-03', value: 4 },
        ],
      },
      transform: [{ calculate: 'datum.value + 1', as: 'value' }],
      encoding: { x: { field: 'when', type: 'temporal', timeUnit: 'utcmonth' } },
      hconcat: [
        {
          mark: 'line',
          transform: [{ calculate: 'datum.value * 2', as: 'value' }],
          encoding: {
            y: { field: 'value', aggregate: { exponential: 0.5 }, type: 'quantitative', title: 'EMA' },
            tooltip: [{ field: 'value', aggregate: { exponential: 0.5 }, type: 'quantitative', title: 'EMA' }],
          },
        },
      ],
    };
    freeze(spec);
    const prepared = units(buildVegaViewTree(spec, { mode: 'strict' }))[0].spec;
    const source = getVegaViewSourceSpec(prepared);
    expect(source).not.toBe(prepared);
    expect(source.transform).toBeUndefined();
    expect(source.hconcat).toBeUndefined();
    expect(source.data?.values?.map(row => row.value)).toEqual([6, 10]);
    expect(source.encoding?.x).toMatchObject({ field: 'when', timeUnit: 'utcmonth' });
    expect(source.encoding?.y).toMatchObject({ field: 'value', aggregate: { exponential: 0.5 }, title: 'EMA' });
    expect(prepared.encoding?.x?.timeUnit).toBeUndefined();
    expect(prepared.encoding?.y?.aggregate).toBeUndefined();
    expect(prepared.data?.values).toHaveLength(1);
    expect(getVegaViewSourceSpec(prepared)).toBe(source);
    expect(getVegaViewSourceSpec(spec)).toBe(spec);
  });

  it('synchronizes shared derived domains to original channels in every source layer', () => {
    // Materialized units carry inherited global config even though the authoring unit type omits it.
    const line: VegaLiteUnitSpec & Pick<VegaLiteSpec, 'config'> = {
      mark: 'line',
      config: { line: { tooltip: null } },
      encoding: { y: { field: 'nested.value', aggregate: 'mean', type: 'quantitative' } },
    };
    const spec: VegaLiteSpec = {
      data: {
        values: [
          { group: 'A', nested: { value: 3 } },
          { group: 'A', nested: { value: 5 } },
        ],
      },
      config: { mark: { tooltip: null } },
      resolve: { scale: { y: 'shared' } },
      hconcat: [
        {
          encoding: { x: { field: 'group', type: 'nominal' } },
          layer: [
            {
              mark: 'bar',
              encoding: {
                y: { field: 'nested.value', aggregate: 'sum', type: 'quantitative', axis: { title: 'Total' } },
              },
            },
            line,
          ],
        },
        { mark: 'point', data: { values: [{ value: 20 }] }, encoding: { y: { field: 'value', type: 'quantitative' } } },
      ],
    };
    const cells = units(buildVegaViewTree(spec));
    const source = getVegaViewSourceSpec(cells[0].spec);
    source.layer?.forEach(layer => {
      expect(layer.encoding?.y?.field).toBe('nested.value');
      expect(layer.encoding?.y?.scale?.domain).toEqual([0, 20]);
      expect(layer.transform).toBeUndefined();
      expect(layer.data?.values).toHaveLength(2);
      expect((layer as VegaLiteSpec).config?.mark).toEqual({ tooltip: null });
    });
    expect(source.layer?.[0].encoding?.y?.axis?.title).toBe('Total');
    expect((source.layer?.[1] as VegaLiteSpec).config?.line).toEqual({ tooltip: null });
    expect(getVegaViewSourceSpec(cells[1].spec).encoding?.y?.scale?.domain).toEqual([0, 20]);
    expect(spec.hconcat?.[0].layer?.[0].encoding?.y?.scale).toBeUndefined();
  });

  it('keeps named lookup datasets unprocessed while materializing the primary pipeline', () => {
    const cells = units(
      buildVegaViewTree(
        {
          datasets: { table: [{ id: 1, value: 2 }] },
          data: { name: 'table' },
          transform: [{ calculate: 'datum.value + 10', as: 'value' }],
          hconcat: [
            {
              mark: 'point',
              transform: [
                { lookup: 'id', from: { data: { name: 'table' }, key: 'id', fields: ['value'] }, as: 'original' },
              ],
            },
          ],
        } as VegaLiteSpec,
        { mode: 'strict' },
      ),
    );
    expect(getVegaViewSourceSpec(cells[0].spec).data?.values).toEqual([{ id: 1, value: 12, original: 2 }]);
  });

  it('shares count domains across missing facet cells without inventing a source count field', () => {
    const cells = units(
      buildVegaViewTree(
        {
          data: {
            values: [
              { region: 'A', quarter: 'Q1' },
              { region: 'A', quarter: 'Q1' },
              { region: 'B', quarter: 'Q2' },
            ],
          },
          facet: { row: { field: 'region' }, column: { field: 'quarter' } },
          spec: {
            mark: 'bar',
            encoding: {
              x: { field: 'quarter', type: 'nominal' },
              y: { aggregate: 'count', type: 'quantitative', title: 'Records' },
            },
          },
        },
        { mode: 'strict' },
      ),
    );
    expect(cells).toHaveLength(4);
    expect(cells.map(cell => getVegaViewSourceSpec(cell.spec).data?.values?.length)).toEqual([2, 0, 0, 1]);
    cells.forEach(cell => {
      expect(cell.spec.encoding?.y?.scale?.domain).toEqual([0, 2]);
      expect(cell.spec.encoding?.y?.aggregate).toBeUndefined();
      expect(getVegaViewSourceSpec(cell.spec).encoding?.y).toEqual({
        aggregate: 'count',
        type: 'quantitative',
        title: 'Records',
        scale: { domain: [0, 2] },
      });
    });
  });

  it('expands nested horizontal, vertical and grid concat with explicit, stable scoped paths', () => {
    const tree = buildVegaViewTree(nestedConcatSpec);
    expect(structure(tree)).toEqual({
      type: 'concat',
      direction: 'horizontal',
      columns: undefined,
      path: 'root',
      children: [
        { type: 'unit', path: 'root/hconcat/0' },
        {
          type: 'concat',
          direction: 'vertical',
          columns: undefined,
          path: 'root/hconcat/1',
          children: [
            { type: 'unit', path: 'root/hconcat/1/vconcat/0' },
            {
              type: 'concat',
              direction: 'grid',
              columns: 2,
              path: 'root/hconcat/1/vconcat/1',
              children: [
                { type: 'unit', path: 'root/hconcat/1/vconcat/1/concat/0' },
                { type: 'unit', path: 'root/hconcat/1/vconcat/1/concat/1' },
              ],
            },
          ],
        },
      ],
    });
    expect(tree).toMatchObject({ title: 'Dashboard' });
    units(tree).forEach(unit => {
      expect(unit.spec.data?.values).toEqual([
        { x: 1, y: 2 },
        { x: 3, y: 8 },
      ]);
      expect(unit.spec.encoding?.x?.field).toBe('x');
    });
  });

  it('retains all row/column facet cells, including empty data, headers and full color legends', () => {
    const tree = buildVegaViewTree(missingFacetSpec);
    expect(tree).toMatchObject({ type: 'concat', direction: 'grid', columns: 2, title: 'Sales' });
    const cells = units(tree);
    expect(cells.map(cell => cell.path)).toEqual([
      'root/facet/0/0',
      'root/facet/0/1',
      'root/facet/1/0',
      'root/facet/1/1',
    ]);
    expect(cells.map(cell => cell.spec.title)).toEqual([
      'Region: A · Quarter: Q1',
      'Region: A · Quarter: Q2',
      'Region: B · Quarter: Q1',
      'Region: B · Quarter: Q2',
    ]);
    expect(cells.map(cell => cell.spec.data?.values)).toEqual([
      [{ region: 'A', quarter: 'Q1', amount: 8, category: 'alpha' }],
      [{ region: 'A', quarter: 'Q2', amount: 3, category: 'beta' }],
      [],
      [{ region: 'B', quarter: 'Q2', amount: 2, category: 'beta' }],
    ]);
    cells.forEach(cell => {
      // Implicit colored bars stack from zero. scale.zero:false disables domain expansion,
      // but cannot remove the actual stack baseline from the data extent.
      expect(cell.spec.encoding?.y?.scale?.domain).toEqual([0, 8]);
      expect(cell.spec.encoding?.color?.scale?.domain).toEqual(['alpha', 'beta']);
      expect(cell.spec.encoding?.color?.legend).toEqual({ title: 'Category' });
    });
  });

  it('supports shorthand facet with columns and aggregate sorting on the final calculated field', () => {
    const spec = {
      data: {
        values: [
          { group: 'A', n: 3 },
          { group: 'B', n: 2 },
          { group: 'B', n: 2 },
        ],
      },
      transform: [{ calculate: 'datum.n * 10', as: 'score' }],
      facet: { field: 'group', sort: { field: 'score', op: 'sum', order: 'descending' } },
      columns: 2,
      spec: { mark: 'bar' },
    } as unknown as VegaLiteSpec;
    const tree = buildVegaViewTree(spec);
    expect(tree).toMatchObject({ type: 'concat', direction: 'grid', columns: 2 });
    expect(units(tree).map(cell => cell.spec.title)).toEqual(['group: B', 'group: A']);
    expect(units(tree)[0].spec.data?.values).toEqual([
      { group: 'B', n: 2, score: 20 },
      { group: 'B', n: 2, score: 20 },
    ]);
  });

  it('expands repeat matrices and resolves repeat refs inside tooltip field definitions', () => {
    const tree = buildVegaViewTree(repeatMatrixSpec);
    expect(tree).toMatchObject({ type: 'concat', direction: 'grid', columns: 2 });
    expect(units(tree).map(cell => [cell.path, cell.spec.encoding?.x?.field, cell.spec.encoding?.y?.field])).toEqual([
      ['root/repeat/0/0', 'c', 'a'],
      ['root/repeat/0/1', 'd', 'a'],
      ['root/repeat/1/0', 'c', 'b'],
      ['root/repeat/1/1', 'd', 'b'],
    ]);
    expect(units(tree)[3].spec.encoding?.tooltip).toEqual([{ field: 'b' }, { field: 'd' }]);
  });

  it('supports array repeat refs and an explicit column count', () => {
    const tree = buildVegaViewTree({
      repeat: ['a', 'b'],
      columns: 1,
      data: { values: [{ a: 1, b: 2 }] },
      spec: { mark: 'point', encoding: { x: { field: { repeat: 'repeat' }, type: 'quantitative' } } },
    } as unknown as VegaLiteSpec);
    expect(tree).toMatchObject({ type: 'concat', direction: 'grid', columns: 1 });
    expect(units(tree).map(cell => cell.spec.encoding?.x?.field)).toEqual(['a', 'b']);
  });

  it('executes inherited parent/child transforms once and shares domains of transformed values', () => {
    const cells = units(buildVegaViewTree(transformedConcatSpec, { mode: 'strict' }));
    expect(cells.map(cell => cell.spec.data?.values)).toEqual([
      [
        { x: 2, y: 5, z: 10 },
        { x: 3, y: 11, z: 22 },
      ],
      [{ x: 3, y: 11, z: 33 }],
    ]);
    cells.forEach(cell => {
      expect(cell.spec.transform).toBeUndefined();
      expect(cell.spec.encoding?.x?.scale?.domain).toEqual([2, 3]);
      expect(cell.spec.encoding?.y?.scale?.domain).toEqual([10, 33]);
      expect(cell.spec.encoding?.color?.scale?.domain).toEqual([10, 33]);
    });
  });

  it('keeps independent domains and legends scoped to each cell', () => {
    const spec = {
      ...transformedConcatSpec,
      resolve: {
        scale: { x: 'independent', y: 'independent', color: 'independent' },
        legend: { color: 'independent' },
      },
    } as VegaLiteSpec;
    const cells = units(buildVegaViewTree(spec));
    expect(cells.map(cell => cell.spec.encoding?.x?.scale?.domain)).toEqual([
      [2, 3],
      [3, 3],
    ]);
    expect(cells.map(cell => cell.spec.encoding?.y?.scale?.domain)).toEqual([
      [10, 22],
      [33, 33],
    ]);
    expect(cells.map(cell => cell.spec.encoding?.color?.scale?.domain)).toEqual([
      [10, 22],
      [33, 33],
    ]);
  });

  it('shares encoding aggregate domains after unit semantic preparation, not the raw input', () => {
    const spec = {
      data: {
        values: [
          { g: 'A', n: 3 },
          { g: 'A', n: 5 },
          { g: 'B', n: 2 },
        ],
      },
      resolve: { scale: { y: 'shared' } },
      hconcat: [
        {
          mark: 'bar',
          encoding: {
            x: { field: 'g', type: 'nominal' },
            y: { field: 'n', aggregate: 'sum', type: 'quantitative', scale: { zero: false } },
          },
        },
        { mark: 'point', encoding: { y: { field: 'n', type: 'quantitative', scale: { zero: false } } } },
      ],
    } as VegaLiteSpec;
    expect(units(buildVegaViewTree(spec)).map(cell => cell.spec.encoding?.y?.scale?.domain)).toEqual([
      [2, 8],
      [2, 8],
    ]);
  });

  it('inherits encoding and materialized data into layers, honoring child data and transform overrides', () => {
    const tree = buildVegaViewTree({
      data: { values: [{ x: 1, y: 2 }] },
      transform: [{ calculate: 'datum.y + 1', as: 'y' }],
      encoding: { x: { field: 'x', type: 'quantitative' } },
      layer: [
        { mark: 'line', encoding: { y: { field: 'y', type: 'quantitative' } } },
        { mark: 'point', data: { values: [{ x: 5, y: 7 }] }, transform: [{ calculate: 'datum.y * 2', as: 'y' }] },
      ],
    });
    expect(tree.type).toBe('unit');
    if (tree.type !== 'unit') {
      throw new Error('Expected a layered unit');
    }
    expect(tree.spec.layer?.[0].data?.values).toEqual([{ x: 1, y: 3 }]);
    expect(tree.spec.layer?.[1].data?.values).toEqual([{ x: 5, y: 14 }]);
    expect(tree.spec.layer?.[0].encoding?.x?.field).toBe('x');
    expect(tree.spec.layer?.[1].encoding?.x?.field).toBe('x');
  });

  it('resolves own named datasets including __proto__ without reading inherited dataset properties', () => {
    const datasets = JSON.parse('{"__proto__":[{"x":7}]}');
    const tree = buildVegaViewTree({ datasets, data: { name: '__proto__' }, mark: 'point' } as VegaLiteSpec);
    expect(units(tree)[0].spec.data?.values).toEqual([{ x: 7 }]);
    expect(() =>
      buildVegaViewTree(
        {
          datasets: Object.create({ inherited: [{ x: 1 }] }),
          data: { name: 'inherited' },
          mark: 'point',
        } as VegaLiteSpec,
        { mode: 'strict' },
      ),
    ).toThrow(/dataset.*inherited/i);
  });

  it('resolves lookup named sources inherited from the root', () => {
    const tree = buildVegaViewTree({
      datasets: { primary: [{ id: 1 }], secondary: [{ id: 1, score: 9 }] },
      data: { name: 'primary' },
      hconcat: [
        {
          mark: 'point',
          transform: [{ lookup: 'id', from: { data: { name: 'secondary' }, key: 'id', fields: ['score'] } }],
        },
      ],
    } as VegaLiteSpec);
    expect(units(tree)[0].spec.data?.values).toEqual([{ id: 1, score: 9 }]);
  });

  it('does not mutate frozen inputs or share records, encodings or data between sibling cells', () => {
    const spec = JSON.parse(JSON.stringify(nestedConcatSpec)) as VegaLiteSpec;
    freeze(spec);
    const cells = units(buildVegaViewTree(spec));
    cells[0].spec.data!.values![0].x = 99;
    cells[0].spec.encoding!.x!.field = 'changed';
    expect(cells[1].spec.data?.values?.[0].x).toBe(1);
    expect(cells[1].spec.encoding?.x?.field).toBe('x');
    expect(units(buildVegaViewTree(spec))[0].spec.data?.values?.[0].x).toBe(1);
  });

  it('rejects cyclic and excessively deep view specs deterministically', () => {
    const cycle: VegaLiteSpec = { hconcat: [] };
    cycle.hconcat!.push(cycle);
    expect(() => buildVegaViewTree(cycle)).toThrow(/cyclic|depth/i);
    let deep: VegaLiteSpec = { mark: 'point' };
    for (let i = 0; i < 70; i++) {
      deep = { vconcat: [deep] };
    }
    expect(() => buildVegaViewTree(deep)).toThrow(/depth/i);
  });

  it('respects nested independent scale boundaries while sharing the surrounding scope', () => {
    const tree = buildVegaViewTree({
      resolve: { scale: { y: 'shared' } },
      hconcat: [
        {
          vconcat: [
            {
              mark: 'point',
              data: { values: [{ n: 2 }] },
              encoding: { y: { field: 'n', type: 'quantitative', scale: { zero: false } } },
            },
            {
              mark: 'point',
              data: { values: [{ n: 8 }] },
              encoding: { y: { field: 'n', type: 'quantitative', scale: { zero: false } } },
            },
          ],
          resolve: { scale: { y: 'shared' } },
        },
        {
          vconcat: [
            {
              mark: 'point',
              data: { values: [{ n: 100 }] },
              encoding: { y: { field: 'n', type: 'quantitative', scale: { zero: false } } },
            },
            {
              mark: 'point',
              data: { values: [{ n: 200 }] },
              encoding: { y: { field: 'n', type: 'quantitative', scale: { zero: false } } },
            },
          ],
          resolve: { scale: { y: 'independent' } },
        },
        {
          mark: 'point',
          data: { values: [{ n: 20 }] },
          encoding: { y: { field: 'n', type: 'quantitative', scale: { zero: false } } },
        },
      ],
    });
    expect(units(tree).map(cell => cell.spec.encoding?.y?.scale?.domain)).toEqual([
      [2, 20],
      [2, 20],
      [100, 100],
      [200, 200],
      [2, 20],
    ]);
  });

  it('keeps explicitly independent layer domains separate from a surrounding shared view scope', () => {
    const spec = {
      resolve: { scale: { y: 'shared' } },
      hconcat: [
        {
          resolve: { scale: { y: 'independent' } },
          layer: [
            {
              mark: 'line',
              data: { values: [{ n: 2 }] },
              encoding: { y: { field: 'n', type: 'quantitative', scale: { zero: false } } },
            },
            {
              mark: 'point',
              data: { values: [{ n: 8 }] },
              encoding: { y: { field: 'n', type: 'quantitative', scale: { zero: false } } },
            },
          ],
        },
        {
          mark: 'point',
          data: { values: [{ n: 100 }] },
          encoding: { y: { field: 'n', type: 'quantitative', scale: { zero: false } } },
        },
      ],
    } as unknown as VegaLiteSpec;
    const cells = units(buildVegaViewTree(spec));
    expect(cells[0].spec.layer?.map(layer => layer.encoding?.y?.scale?.domain)).toEqual([
      [2, 2],
      [8, 8],
    ]);
    expect(cells[1].spec.encoding?.y?.scale?.domain).toEqual([100, 100]);
  });

  it('never invokes getters or callable data hooks during facet grouping and cloning', () => {
    const getter = jest.fn(() => [{ group: 'hidden' }]);
    const hook = jest.fn(() => 'unsafe');
    const row = { group: { id: 1, toJSON: hook } };
    const datasets = Object.defineProperty({}, 'hidden', { enumerable: true, get: getter });
    buildVegaViewTree({
      datasets,
      data: { values: [row] },
      facet: { field: 'group' },
      spec: { mark: 'point' },
    } as unknown as VegaLiteSpec);
    expect(getter).not.toHaveBeenCalled();
    expect(hook).not.toHaveBeenCalled();
  });

  it('includes zero by default on linear quantitative axes, but never for color or logarithmic axes', () => {
    const cells = units(
      buildVegaViewTree({
        hconcat: [
          {
            mark: 'point',
            data: { values: [{ n: 2 }, { n: 8 }] },
            encoding: {
              x: { field: 'n', type: 'quantitative' },
              y: { field: 'n', type: 'quantitative', scale: { type: 'log' } },
              color: { field: 'n', type: 'quantitative' },
            },
          },
        ],
      }),
    );
    expect(cells[0].spec.encoding?.x?.scale?.domain).toEqual([0, 8]);
    expect(cells[0].spec.encoding?.y?.scale?.domain).toEqual([2, 8]);
    expect(cells[0].spec.encoding?.color?.scale?.domain).toEqual([2, 8]);
  });
});
