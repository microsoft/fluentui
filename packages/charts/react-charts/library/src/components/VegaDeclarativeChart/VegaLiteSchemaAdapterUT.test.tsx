import {
  transformVegaLiteToLineChartProps,
  transformVegaLiteToVerticalBarChartProps,
  transformVegaLiteToHistogramProps,
  transformVegaLiteToPolarChartProps,
  transformVegaLiteToGroupedVerticalBarChartProps,
  transformVegaLiteToVerticalStackedBarChartProps,
  transformVegaLiteToScatterChartProps,
  getVegaLiteLegendsProps,
  getVegaLiteTitles,
} from './VegaLiteSchemaAdapter';
import { validateVegaLiteSpec } from './VegaLiteDiagnostics';
import type { VegaLiteSpec } from './VegaLiteTypes';

const colorMap = new Map<string, string>();

describe('VegaLiteSchemaAdapter', () => {
  beforeEach(() => {
    // Clear colorMap before each test to ensure test isolation
    colorMap.clear();
  });

  describe('transform property handling', () => {
    function transformData(values: Array<Record<string, unknown>>, transform: VegaLiteSpec['transform']) {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: { values },
        transform,
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      };

      return transformVegaLiteToLineChartProps(spec, { current: colorMap }, false).data.lineChartData![0].data;
    }

    it.each(['constructor', 'toString', '__proto__'])('does not fold the inherited %s property', field => {
      const points = transformData(
        [{ x: 1, y: 10 }],
        [
          { fold: ['y', field] },
          // Vega fold emits a missing-value tuple; explicitly discard it, never read the prototype.
          { filter: { field: 'value', valid: true } },
          { calculate: 'isValid(datum.value) ? 1 : 0', as: 'y' },
        ],
      );

      expect(points).toHaveLength(1);
      expect(points[0]).toMatchObject({ x: 1, y: 1 });
    });

    it.each(['constructor', 'toString', '__proto__'])('preserves the own %s data field when folding', field => {
      const points = transformData([{ x: 1, [field]: 42 }], [{ fold: [field] }, { calculate: 'datum.value', as: 'y' }]);

      expect(points).toHaveLength(1);
      expect(points[0]).toMatchObject({ x: 1, y: 42 });
    });

    it('preserves an own __proto__ field while copying other fields during fold', () => {
      const points = transformData(
        [{ x: 1, y: 10, ['__proto__']: { value: 42 } }],
        [{ fold: ['y'] }, { calculate: 'isValid(datum.__proto__) ? datum.__proto__.value : 0', as: 'y' }],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: 42 })]);
    });

    it('preserves an own __proto__ grouping field during aggregation', () => {
      const points = transformData(
        [{ x: 1, value: { amount: 42 } }],
        [
          { calculate: 'datum.value', as: '__proto__' },
          { aggregate: [{ op: 'count', as: 'count' }], groupby: ['x', '__proto__'] },
          { calculate: 'isValid(datum.__proto__) ? datum.__proto__.amount : 0', as: 'y' },
        ],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: 42 })]);
    });

    it('preserves an aggregate output named __proto__ as an own data field', () => {
      const points = transformData(
        [{ x: 1 }, { x: 1 }],
        [
          { aggregate: [{ op: 'count', as: '__proto__' }], groupby: ['x'] },
          { calculate: 'isValid(datum.__proto__) ? datum.__proto__ : 0', as: 'y' },
        ],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: 2 })]);
    });

    it.each(['count', '__proto__'])('preserves aggregate row coercion with the %s output field', field => {
      const points = transformData(
        [{ x: 1 }, { x: 1 }],
        [
          { aggregate: [{ op: 'count', as: field }], groupby: ['x'] },
          { calculate: `length(toString(datum)) + datum['${field}']`, as: 'y' },
        ],
      );

      expect(points).toHaveLength(1);
      expect(points[0]).toMatchObject({ x: 1, y: 17 });
    });

    it.each(['constructor', 'toString', '__proto__'])('does not materialize an inherited %s grouping field', field => {
      const points = transformData(
        [{ x: 1 }, { x: 1, [field]: undefined }],
        [
          { aggregate: [{ op: 'count', as: 'count' }], groupby: ['x', field] },
          { calculate: `isValid(datum['${field}']) ? -1 : datum.count`, as: 'y' },
        ],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: 2 })]);
    });

    it.each(['constructor', 'toString', '__proto__'])('preserves an own %s grouping field', field => {
      const points = transformData(
        [{ x: 1, [field]: 42 }],
        [
          { aggregate: [{ op: 'count', as: 'count' }], groupby: ['x', field] },
          { calculate: `datum['${field}']`, as: 'y' },
        ],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: 42 })]);
    });

    it.each(['window', 'joinaggregate', 'density'])('groups missing fields as undefined in %s', kind => {
      const grouping: VegaLiteSpec['transform'] =
        kind === 'window'
          ? [{ window: [{ op: 'row_number', as: 'y' }], groupby: ['constructor'] }]
          : kind === 'joinaggregate'
          ? [{ joinaggregate: [{ op: 'count', as: 'y' }], groupby: ['constructor'] }]
          : [
              { density: 'value', groupby: ['constructor'], steps: 20 },
              { calculate: 'datum.value', as: 'x' },
              { calculate: 'isValid(datum.constructor) ? -1 : 1', as: 'y' },
            ];
      const points = transformData(
        [
          { x: 1, value: 0 },
          { x: 2, value: 1, constructor: undefined },
        ],
        grouping,
      );

      if (kind === 'density') {
        expect(points).toHaveLength(21);
        expect(points.map(point => ({ x: point.x, y: point.y }))).toEqual(
          Array.from({ length: 21 }, (_, index) => ({ x: index / 20, y: 1 })),
        );
      } else {
        expect(points.map(point => point.y)).toEqual(kind === 'window' ? [1, 2] : [2, 2]);
      }
    });

    it.each(['window', 'joinaggregate'])('preserves __proto__ output and ordinary row coercion in %s', kind => {
      const transform: VegaLiteSpec['transform'] =
        kind === 'window'
          ? [{ window: [{ op: 'count', as: '__proto__' }] }]
          : [{ joinaggregate: [{ op: 'count', as: '__proto__' }] }];
      const points = transformData(
        [{ x: 1 }],
        [...transform, { calculate: 'length(toString(datum)) + datum.__proto__', as: 'y' }],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: 16 })]);
    });

    it.each(['window', 'joinaggregate'])('preserves separate groups for own special fields in %s', kind => {
      const transform: VegaLiteSpec['transform'] =
        kind === 'window'
          ? [{ window: [{ op: 'row_number', as: 'y' }], groupby: ['constructor', 'toString', '__proto__'] }]
          : [{ joinaggregate: [{ op: 'count', as: 'y' }], groupby: ['constructor', 'toString', '__proto__'] }];
      const points = transformData(
        [
          { x: 1, constructor: 'A', toString: 'A', ['__proto__']: 'A' },
          { x: 2, constructor: 'B', toString: 'B', ['__proto__']: 'B' },
          { x: 3, constructor: 'A', toString: 'A', ['__proto__']: 'A' },
        ],
        transform,
      );

      expect(points).toHaveLength(3);
      expect(points).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ x: 1, y: kind === 'window' ? 1 : 2 }),
          expect.objectContaining({ x: 2, y: 1 }),
          expect.objectContaining({ x: 3, y: 2 }),
        ]),
      );
    });

    it.each(['aggregate', 'window', 'joinaggregate'])('ignores inherited input values in %s', kind => {
      const row: Record<string, unknown> = Object.assign(Object.create({ amount: 42 }), { x: 1 });
      const prototype = Object.getPrototypeOf(row);
      const transform: VegaLiteSpec['transform'] =
        kind === 'aggregate'
          ? [{ aggregate: [{ op: 'sum', field: 'amount', as: 'total' }], groupby: ['x'] }]
          : kind === 'window'
          ? [{ window: [{ op: 'sum', field: 'amount', as: 'total' }] }]
          : [{ joinaggregate: [{ op: 'sum', field: 'amount', as: 'total' }] }];
      // An all-missing Vega sum is undefined, not zero. Project it without losing the row.
      const points = transformData(
        [row],
        [...transform, { calculate: 'isValid(datum.total) ? datum.total : -1', as: 'y' }],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: -1 })]);
      expect(Object.keys(row)).toEqual(['x']);
      expect(Object.getPrototypeOf(row)).toBe(prototype);
      expect(prototype.amount).toBe(42);
    });

    it('ignores inherited window sort values', () => {
      const row: Record<string, unknown> = Object.assign(Object.create({ order: 42 }), { x: 1 });
      const points = transformData(
        [row, { x: 2, order: 0 }],
        [{ window: [{ op: 'row_number', as: 'y' }], sort: [{ field: 'order' }] }],
      );

      expect(points.map(point => point.y)).toEqual([1, 2]);
    });

    it('preserves an own __proto__ grouping field and row coercion in density', () => {
      const points = transformData(
        [
          { sample: 0, ['__proto__']: 42 },
          { sample: 1, ['__proto__']: 42 },
        ],
        [
          { density: 'sample', groupby: ['__proto__'], steps: 20 },
          { calculate: 'datum.value', as: 'x' },
          { calculate: 'datum.__proto__ + length(toString(datum))', as: 'y' },
        ],
      );

      expect(points).toHaveLength(21);
      expect(points.map(point => ({ x: point.x, y: point.y }))).toEqual(
        Array.from({ length: 21 }, (_, index) => ({ x: index / 20, y: 57 })),
      );
    });

    it('preserves an imputed __proto__ field', () => {
      const points = transformData(
        [
          { x: 1, ['__proto__']: 10 },
          { x: 3, ['__proto__']: 30 },
        ],
        [
          { impute: '__proto__', key: 'x', keyvals: [2], value: 42 },
          { calculate: 'datum.__proto__ + length(toString(datum))', as: 'y' },
        ],
      );

      expect(points).toHaveLength(3);
      expect(points.map(point => ({ x: point.x, y: point.y }))).toEqual([
        { x: 1, y: 25 },
        { x: 3, y: 45 },
        { x: 2, y: 57 },
      ]);
    });

    it('preserves impute overwrite order when the key and field coincide', () => {
      const points = transformData(
        [{ x: 1 }, { x: 3 }],
        [
          { impute: 'x', key: 'x', keyvals: [2], value: 42 },
          { calculate: 'datum.x', as: 'y' },
        ],
      );

      expect(points).toHaveLength(3);
      // Vega appends imputed tuples after source tuples and writes the value after the key.
      // Different key/value constants make that overwrite order observable.
      expect(points.map(point => point.x)).toEqual([1, 3, 42]);
      expect(points.map(point => point.y)).toEqual([1, 3, 42]);
    });

    it('preserves __proto__ lookup fields without copying inherited fields', () => {
      const points = transformData(
        [{ x: 1 }],
        [
          {
            lookup: 'x',
            from: {
              data: { values: [{ key: 1, ['__proto__']: 42 }] },
              key: 'key',
              fields: ['__proto__', 'constructor'],
            },
          },
          { calculate: 'isValid(datum.constructor) ? -1 : datum.__proto__ + length(toString(datum))', as: 'y' },
        ],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: 57 })]);
    });

    it('matches missing lookup keys as undefined rather than inherited values', () => {
      const points = transformData(
        [{ x: 1 }],
        [
          {
            lookup: 'constructor',
            from: { data: { values: [{ constructor: undefined, value: 42 }] }, key: 'constructor', fields: ['value'] },
          },
          { calculate: 'isValid(datum.value) ? datum.value : -1', as: 'y' },
        ],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: 42 })]);
    });

    it('matches missing secondary lookup keys as undefined', () => {
      const points = transformData(
        [{ x: 1, constructor: undefined }],
        [
          {
            lookup: 'constructor',
            from: { data: { values: [{ value: 42 }] }, key: 'constructor', fields: ['value'] },
          },
          { calculate: 'isValid(datum.value) ? datum.value : -1', as: 'y' },
        ],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: 42 })]);
    });

    it.each(['count', 'sum'] as const)('preserves a __proto__ timeUnit aggregate field for %s', aggregate => {
      const spec: VegaLiteSpec = {
        mark: 'bar',
        data: {
          values: [
            { date: '2026-01-01T12:00:00', ['__proto__']: 20 },
            { date: '2026-01-02T12:00:00', ['__proto__']: 22 },
          ],
        },
        encoding: {
          x: { field: 'date', timeUnit: 'month', type: 'temporal' },
          y: { field: '__proto__', aggregate, type: 'quantitative' },
        },
      };
      const original = JSON.parse(JSON.stringify(spec));
      const result = transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false);

      // A temporal month is a local calendar Date; display labels are not the data coordinate.
      expect(result.data).toEqual([
        expect.objectContaining({ x: new Date(2012, 0, 1), y: aggregate === 'count' ? 2 : 42 }),
      ]);
      expect(spec).toEqual(original);
    });

    it.each(['regression', 'loess', 'quantile'])('ignores inherited values in %s numeric transforms', kind => {
      const row: Record<string, unknown> = Object.assign(Object.create({ y: 100 }), { x: 3 });
      const transform: VegaLiteSpec['transform'] =
        kind === 'quantile'
          ? [
              { quantile: 'y', probs: [1] },
              { calculate: '1', as: 'x' },
              { calculate: 'datum.value', as: 'y' },
            ]
          : [{ [kind]: 'y', on: 'x' }];
      const points = transformData([{ x: 1, y: 10 }, { x: 2, y: 20 }, row], transform);

      // Vega's two-point LOESS fits each point, unlike the old moving-average approximation.
      expect(points.map(point => ({ x: point.x, y: point.y }))).toEqual(
        kind === 'quantile'
          ? [{ x: 1, y: 20 }]
          : [
              { x: 1, y: 10 },
              { x: 2, y: 20 },
            ],
      );
      expect(Object.keys(row)).toEqual(['x']);
      expect(Object.getPrototypeOf(row).y).toBe(100);
    });

    it('preserves ordinary fold, calculate and aggregate results', () => {
      const points = transformData(
        [
          { x: 1, first: 2, second: 3 },
          { x: 2, first: 4, second: 5 },
        ],
        [
          { fold: ['first', 'second'] },
          { calculate: 'pow(datum.value, 2)', as: 'squared' },
          { aggregate: [{ op: 'sum', field: 'squared', as: 'y' }], groupby: ['x'] },
        ],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: 13 }), expect.objectContaining({ x: 2, y: 41 })]);
    });

    it('keeps quantile probabilities numeric and preserves every requested quantile', () => {
      const points = transformData(
        [{ y: 5 }, { y: 15 }, { y: 25 }],
        [
          { quantile: 'y', probs: [0, 0.5, 1] },
          { calculate: 'datum.prob', as: 'x' },
          { calculate: 'datum.value', as: 'y' },
        ],
      );

      expect(points).toHaveLength(3);
      expect(points.map(point => ({ x: point.x, y: point.y }))).toEqual([
        { x: 0, y: 5 },
        { x: 0.5, y: 15 },
        { x: 1, y: 25 },
      ]);
    });

    it('does not invent intermediate impute keys without keyvals', () => {
      const points = transformData(
        [
          { x: 1, y: 10 },
          { x: 3, y: 30 },
        ],
        [{ impute: 'y', key: 'x', value: 42 }],
      );

      expect(points).toEqual([expect.objectContaining({ x: 1, y: 10 }), expect.objectContaining({ x: 3, y: 30 })]);
    });

    it('does not implicitly aggregate rows sharing a timeUnit coordinate', () => {
      const spec: VegaLiteSpec = {
        mark: 'bar',
        data: {
          values: [
            { date: '2026-01-01T12:00:00', value: 20 },
            { date: '2026-01-02T12:00:00', value: 22 },
          ],
        },
        encoding: {
          x: { field: 'date', type: 'temporal', timeUnit: 'month' },
          y: { field: 'value', type: 'quantitative' },
        },
      };
      const original = JSON.parse(JSON.stringify(spec));
      const result = transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false);

      expect(result.data).toEqual([
        expect.objectContaining({ x: new Date(2012, 0, 1), y: 20 }),
        expect.objectContaining({ x: new Date(2012, 0, 1), y: 22 }),
      ]);
      expect(spec).toEqual(original);
    });
  });

  describe('transformVegaLiteToLineChartProps', () => {
    test('Should transform basic line chart with quantitative axes', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { x: 1, y: 28 },
            { x: 2, y: 55 },
            { x: 3, y: 43 },
            { x: 4, y: 91 },
            { x: 5, y: 81 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      };

      const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      expect(result.data.lineChartData).toHaveLength(1);
      expect(result.data.lineChartData![0].data).toHaveLength(5);
      expect(result.data.lineChartData![0].legend).toBe('default');
      expect(result.data.lineChartData![0].data.map(point => ({ x: point.x, y: point.y }))).toEqual([
        { x: 1, y: 28 },
        { x: 2, y: 55 },
        { x: 3, y: 43 },
        { x: 4, y: 91 },
        { x: 5, y: 81 },
      ]);
      expect(result).toMatchSnapshot();
    });

    test('Should transform line chart with temporal x-axis', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { date: '2024-01-01', value: 100 },
            { date: '2024-02-01', value: 150 },
            { date: '2024-03-01', value: 120 },
            { date: '2024-04-01', value: 180 },
          ],
        },
        encoding: {
          x: { field: 'date', type: 'temporal', axis: { title: 'Date' } },
          y: { field: 'value', type: 'quantitative', axis: { title: 'Value' } },
        },
        title: 'Time Series Chart',
      };

      const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      expect(result.data.lineChartData).toHaveLength(1);
      expect(result.data.lineChartData![0].data).toHaveLength(4);
      expect(result.data.lineChartData![0].data[0].x).toBeInstanceOf(Date);
      expect(result.yAxisTitle).toBe('Value');
      expect(result.data.lineChartData![0].data.map(point => ({ x: point.x, y: point.y }))).toEqual([
        { x: new Date('2024-01-01'), y: 100 },
        { x: new Date('2024-02-01'), y: 150 },
        { x: new Date('2024-03-01'), y: 120 },
        { x: new Date('2024-04-01'), y: 180 },
      ]);
      expect(result).toMatchSnapshot();
    });

    test('Should transform multi-series chart with color encoding', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { x: 1, y: 28, category: 'A' },
            { x: 2, y: 55, category: 'A' },
            { x: 3, y: 43, category: 'A' },
            { x: 1, y: 35, category: 'B' },
            { x: 2, y: 60, category: 'B' },
            { x: 3, y: 50, category: 'B' },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
          color: { field: 'category', type: 'nominal' },
        },
      };

      const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      expect(result.data.lineChartData).toHaveLength(2);
      expect(result.data.lineChartData![0].legend).toBe('A');
      expect(result.data.lineChartData![1].legend).toBe('B');
      expect(result.data.lineChartData![0].data).toHaveLength(3);
      expect(result.data.lineChartData![1].data).toHaveLength(3);
      expect(result.data.lineChartData!.map(series => series.data.map(point => ({ x: point.x, y: point.y })))).toEqual([
        [
          { x: 1, y: 28 },
          { x: 2, y: 55 },
          { x: 3, y: 43 },
        ],
        [
          { x: 1, y: 35 },
          { x: 2, y: 60 },
          { x: 3, y: 50 },
        ],
      ]);
      expect(result).toMatchSnapshot();
    });

    test('Should transform layered spec with line and point marks', () => {
      const spec: VegaLiteSpec = {
        data: {
          values: [
            { x: 1, y: 28 },
            { x: 2, y: 55 },
            { x: 3, y: 43 },
          ],
        },
        layer: [
          {
            mark: 'line',
            encoding: {
              x: { field: 'x', type: 'quantitative' },
              y: { field: 'y', type: 'quantitative' },
            },
          },
          {
            mark: 'point',
            encoding: {
              x: { field: 'x', type: 'quantitative' },
              y: { field: 'y', type: 'quantitative' },
            },
          },
        ],
      };

      const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      expect(result.data.lineChartData).toHaveLength(1);
      expect(result.data.lineChartData![0].data).toHaveLength(3);
      expect(result.data.lineChartData![0].data.map(point => ({ x: point.x, y: point.y }))).toEqual([
        { x: 1, y: 28 },
        { x: 2, y: 55 },
        { x: 3, y: 43 },
      ]);
      expect(result).toMatchSnapshot();
    });

    test('Should extract axis titles and formats', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { x: 1, y: 100 },
            { x: 2, y: 200 },
          ],
        },
        encoding: {
          x: {
            field: 'x',
            type: 'quantitative',
            axis: { title: 'X Axis', format: '.0f' },
          },
          y: {
            field: 'y',
            type: 'quantitative',
            axis: { title: 'Y Axis', format: '.2f', tickCount: 5 },
          },
        },
        title: 'Chart with Formats',
        width: 800,
        height: 400,
      };

      const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      expect(result.tickFormat).toBe('.0f');
      expect(result.yAxisTickFormat).toBe('.2f');
      expect(result.yAxisTickCount).toBe(5);
      expect(result.width).toBe(800);
      expect(result.height).toBe(400);
      expect(result.data.lineChartData).toHaveLength(1);
      expect(result.data.lineChartData![0].data).toEqual([
        expect.objectContaining({ x: 1, y: 100 }),
        expect.objectContaining({ x: 2, y: 200 }),
      ]);
      expect(result).toMatchSnapshot();
    });

    test('Should handle interpolation mapping', () => {
      const spec: VegaLiteSpec = {
        mark: {
          type: 'line',
          interpolate: 'monotone',
        },
        data: {
          values: [
            { x: 1, y: 28 },
            { x: 2, y: 55 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      };

      const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      // Vega-Lite 'monotone' maps to 'linear' in Fluent Charts (closest approximation)
      expect(result.data.lineChartData![0].lineOptions?.curve).toBe('linear');
      expect(result.data.lineChartData).toHaveLength(1);
      expect(result.data.lineChartData![0].data).toEqual([
        expect.objectContaining({ x: 1, y: 28 }),
        expect.objectContaining({ x: 2, y: 55 }),
      ]);
      expect(result).toMatchSnapshot();
    });

    test('Should handle y-axis domain/range', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { x: 1, y: 50 },
            { x: 2, y: 150 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: {
            field: 'y',
            type: 'quantitative',
            scale: { domain: [0, 200] },
          },
        },
      };

      const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      expect(result.yMinValue).toBe(0);
      expect(result.yMaxValue).toBe(200);
      expect(result.data.lineChartData).toHaveLength(1);
      expect(result.data.lineChartData![0].data).toEqual([
        expect.objectContaining({ x: 1, y: 50 }),
        expect.objectContaining({ x: 2, y: 150 }),
      ]);
      expect(result).toMatchSnapshot();
    });

    test('Should hide legend when disabled', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { x: 1, y: 28, category: 'A' },
            { x: 2, y: 55, category: 'B' },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
          color: { field: 'category', type: 'nominal', legend: { disable: true } },
        },
      };

      const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      expect(result.hideLegend).toBe(true);
      expect(result.data.lineChartData).toHaveLength(2);
      expect(result.data.lineChartData!.map(series => ({ legend: series.legend, data: series.data }))).toEqual([
        { legend: 'A', data: [expect.objectContaining({ x: 1, y: 28 })] },
        { legend: 'B', data: [expect.objectContaining({ x: 2, y: 55 })] },
      ]);
      expect(result).toMatchSnapshot();
    });

    test('Should throw error for empty spec', () => {
      const spec: VegaLiteSpec = {};

      expect(() => transformVegaLiteToLineChartProps(spec, { current: colorMap }, false)).toThrow(
        'No valid unit specs found',
      );
    });
  });

  describe('getVegaLiteLegendsProps', () => {
    test('Should generate legends for multi-series chart', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { x: 1, y: 28, series: 'Alpha' },
            { x: 2, y: 55, series: 'Beta' },
            { x: 3, y: 43, series: 'Gamma' },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
          color: { field: 'series', type: 'nominal' },
        },
      };

      const result = getVegaLiteLegendsProps(spec, { current: colorMap }, false);

      expect(result).toMatchSnapshot();
      expect(result.legends).toHaveLength(3);
      expect(result.legends.map(l => l.title)).toContain('Alpha');
      expect(result.legends.map(l => l.title)).toContain('Beta');
      expect(result.legends.map(l => l.title)).toContain('Gamma');
      expect(result.canSelectMultipleLegends).toBe(true);
    });

    test('Should return empty legends when no color encoding', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { x: 1, y: 28 },
            { x: 2, y: 55 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      };

      const result = getVegaLiteLegendsProps(spec, { current: colorMap }, false);

      expect(result).toMatchSnapshot();
      expect(result.legends).toHaveLength(0);
    });
  });

  describe('getVegaLiteTitles', () => {
    test('Should extract chart and axis titles', () => {
      const spec: VegaLiteSpec = {
        title: 'Sales Over Time',
        mark: 'line',
        data: { values: [] },
        encoding: {
          x: { field: 'month', type: 'temporal', axis: { title: 'Month' } },
          y: { field: 'sales', type: 'quantitative', axis: { title: 'Sales ($)' } },
        },
      };

      const result = getVegaLiteTitles(spec);

      expect(result).toMatchSnapshot();
      expect(result.chartTitle).toBe('Sales Over Time');
      expect(result.xAxisTitle).toBe('Month');
      expect(result.yAxisTitle).toBe('Sales ($)');
    });

    test('Should handle object-form title', () => {
      const spec: VegaLiteSpec = {
        title: { text: 'Main Title', subtitle: 'Subtitle' },
        mark: 'line',
        data: { values: [] },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      };

      const result = getVegaLiteTitles(spec);

      expect(result).toMatchSnapshot();
      expect(result.chartTitle).toBe('Main Title');
    });

    test('Should return empty titles for minimal spec', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: { values: [] },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      };

      const result = getVegaLiteTitles(spec);

      expect(result).toMatchSnapshot();
      expect(result.chartTitle).toBeUndefined();
      expect(result.xAxisTitle).toBeUndefined();
      expect(result.yAxisTitle).toBeUndefined();
    });
  });

  describe('Data Validation', () => {
    describe('Empty Data Validation', () => {
      test('Should throw error for empty data array in LineChart', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: { values: [] },
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        };

        expect(() => transformVegaLiteToLineChartProps(spec, { current: colorMap }, false)).toThrow(
          'Empty data array for LineChart',
        );
      });

      test('Should throw error for empty data array in VerticalBarChart', () => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: { values: [] },
          encoding: {
            x: { field: 'category', type: 'nominal' },
            y: { field: 'value', type: 'quantitative' },
          },
        };

        expect(() => transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false)).toThrow(
          'Empty data array for VerticalBarChart',
        );
      });

      test('Should throw error for data with no valid values in specified field', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [{ x: null, y: 10 }, { x: undefined, y: 20 }, { y: 30 }],
          },
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        };

        expect(() => transformVegaLiteToLineChartProps(spec, { current: colorMap }, false)).toThrow(
          "No valid values found for field 'x' in LineChart",
        );
      });
    });

    describe('Null/Undefined Value Handling', () => {
      test('Should gracefully skip null and undefined values in data', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { x: 1, y: 28 },
              { x: 2, y: null },
              { x: null, y: 43 },
              { x: 3, y: undefined },
              { x: 4, y: 91 },
            ],
          },
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        };

        const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

        // Should only include the two valid data points
        expect(result.data.lineChartData![0].data).toHaveLength(2);
        expect(result.data.lineChartData![0].data[0].x).toBe(1);
        expect(result.data.lineChartData![0].data[0].y).toBe(28);
        expect(result.data.lineChartData![0].data[1].x).toBe(4);
        expect(result.data.lineChartData![0].data[1].y).toBe(91);
      });

      test('Should skip NaN and Infinity values', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { x: 1, y: 28 },
              { x: 2, y: NaN },
              { x: 3, y: Infinity },
              { x: 4, y: -Infinity },
              { x: 5, y: 81 },
            ],
          },
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        };

        const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

        // Should only include valid numeric values
        expect(result.data.lineChartData![0].data).toHaveLength(2);
        expect(result.data.lineChartData![0].data[0].y).toBe(28);
        expect(result.data.lineChartData![0].data[1].y).toBe(81);
      });
    });

    describe('Nested Array Detection', () => {
      test('Should throw error for nested arrays in x field', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { x: [1, 2, 3], y: 28 },
              { x: [4, 5], y: 55 },
            ],
          },
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        };

        expect(() => transformVegaLiteToLineChartProps(spec, { current: colorMap }, false)).toThrow(
          "Nested arrays not supported for field 'x'",
        );
      });

      test('Should throw error for nested arrays in y field', () => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [
              { category: 'A', value: [10, 20] },
              { category: 'B', value: [30, 40] },
            ],
          },
          encoding: {
            x: { field: 'category', type: 'nominal' },
            y: { field: 'value', type: 'quantitative' },
          },
        };

        expect(() => transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false)).toThrow(
          "Nested arrays not supported for field 'value'",
        );
      });
    });

    describe('Encoding Type Validation', () => {
      test('Should auto-correct quantitative encoding with string values to nominal', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { x: 'one', y: 28 },
              { x: 'two', y: 55 },
            ],
          },
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        };

        const original = JSON.parse(JSON.stringify(spec));
        // Legacy fallback can render categories, but normalization must remain pure.
        const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

        expect(result.data.lineChartData).toHaveLength(1);
        expect(result.data.lineChartData![0].data.map(point => ({ x: point.x, y: point.y }))).toEqual([
          { x: 0, y: 28 },
          { x: 1, y: 55 },
        ]);
        expect(result.tickValues).toEqual(['one', 'two']);
        expect(spec).toEqual(original);
        expect(spec.encoding!.x?.type).toBe('quantitative');
      });

      test('Should throw error for temporal encoding with invalid date strings', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { date: 'not-a-date', value: 100 },
              { date: 'invalid', value: 150 },
            ],
          },
          encoding: {
            x: { field: 'date', type: 'temporal' },
            y: { field: 'value', type: 'quantitative' },
          },
        };

        expect(() => transformVegaLiteToLineChartProps(spec, { current: colorMap }, false)).toThrow(
          "Field 'date' marked as temporal but contains invalid date values",
        );
      });

      test('Should accept valid temporal values', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { date: '2024-01-01', value: 100 },
              { date: '2024-02-01', value: 150 },
            ],
          },
          encoding: {
            x: { field: 'date', type: 'temporal' },
            y: { field: 'value', type: 'quantitative' },
          },
        };

        const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);
        expect(result.data.lineChartData).toHaveLength(1);
        expect(result.data.lineChartData![0].data).toHaveLength(2);
      });

      test('Should accept nominal encoding with any values', () => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [
              { category: 'A', value: 10 },
              { category: 123, value: 20 },
              { category: true, value: 30 },
            ],
          },
          encoding: {
            x: { field: 'category', type: 'nominal' },
            y: { field: 'value', type: 'quantitative' },
          },
        };

        const result = transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false);
        expect(result.data).toHaveLength(3);
      });
    });

    describe('Encoding Compatibility Validation', () => {
      test('Should render bar chart with quantitative axes by treating x as categories', () => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [
              { x: 1, y: 28 },
              { x: 2, y: 55 },
            ],
          },
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        };

        // Bar charts with quantitative axes render by converting x to categorical strings
        const result = transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false);
        expect(result.data).toHaveLength(2);
        expect(result.data![0].x).toBe('1');
        expect(result.data![0].y).toBe(28);
        expect(result.data![1].x).toBe('2');
        expect(result.data![1].y).toBe(55);
      });

      test('Should accept bar chart with nominal x-axis', () => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [
              { category: 'A', value: 10 },
              { category: 'B', value: 20 },
            ],
          },
          encoding: {
            x: { field: 'category', type: 'nominal' },
            y: { field: 'value', type: 'quantitative' },
          },
        };

        const result = transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false);
        expect(result.data).toHaveLength(2);
      });

      test('Should accept bar chart with ordinal x-axis', () => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [
              { category: 'low', value: 10 },
              { category: 'medium', value: 20 },
              { category: 'high', value: 30 },
            ],
          },
          encoding: {
            x: { field: 'category', type: 'ordinal' },
            y: { field: 'value', type: 'quantitative' },
          },
        };

        const result = transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false);
        expect(result.data).toHaveLength(3);
      });
    });

    describe('Histogram-Specific Validation', () => {
      test('Should throw error for histogram without numeric values', () => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [{ value: 'text1' }, { value: 'text2' }],
          },
          encoding: {
            x: { field: 'value', bin: true },
            y: { aggregate: 'count' },
          },
        };

        expect(() => transformVegaLiteToHistogramProps(spec, { current: colorMap }, false)).toThrow(
          'No numeric values found for histogram binning',
        );
      });

      test('Should accept histogram with valid numeric values', () => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [{ value: 10 }, { value: 20 }, { value: 30 }, { value: 25 }, { value: 15 }],
          },
          encoding: {
            x: { field: 'value', bin: true },
            y: { aggregate: 'count' },
          },
        };

        const result = transformVegaLiteToHistogramProps(spec, { current: colorMap }, false);
        expect(result.data).toBeDefined();
        expect(result.data!.length).toBeGreaterThan(0);
      });

      test('Should filter out invalid values before binning', () => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [
              { value: 10 },
              { value: null },
              { value: 20 },
              { value: undefined },
              { value: NaN },
              { value: 30 },
            ],
          },
          encoding: {
            x: { field: 'value', bin: true },
            y: { aggregate: 'count' },
          },
        };

        const result = transformVegaLiteToHistogramProps(spec, { current: colorMap }, false);
        // Should only bin the 3 valid numeric values
        expect(result.data).toBeDefined();
        expect(result.data!.length).toBeGreaterThan(0);
      });
    });

    describe('Semantic Feature Diagnostics', () => {
      test('Should accept and execute a supported transform pipeline without diagnostics', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { x: 1, y: 28 },
              { x: 2, y: 55 },
            ],
          },
          transform: [{ filter: 'datum.y > 30' }],
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        };

        const original = JSON.parse(JSON.stringify(spec));
        expect(validateVegaLiteSpec(spec)).toEqual([]);
        expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
        const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);
        expect(result.data.lineChartData).toHaveLength(1);
        expect(result.data.lineChartData![0].data).toEqual([expect.objectContaining({ x: 2, y: 55 })]);
        expect(spec).toEqual(original);
      });

      test('Should report unsupported selections at their authored path', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { x: 1, y: 28 },
              { x: 2, y: 55 },
            ],
          },
          selection: {
            brush: { type: 'interval' },
          },
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        };

        const original = JSON.parse(JSON.stringify(spec));
        expect(validateVegaLiteSpec(spec)).toEqual([
          {
            code: 'unsupported-property',
            path: '$.selection',
            severity: 'warning',
            message: 'Parameter/selection interactions are not implemented.',
            remedy: 'Remove this property or implement its semantics before rendering.',
          },
        ]);
        expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([
          {
            code: 'unsupported-property',
            path: '$.selection',
            severity: 'error',
            message: 'Parameter/selection interactions are not implemented.',
            remedy: 'Remove this property or implement its semantics before rendering.',
          },
        ]);
        expect(spec).toEqual(original);
      });

      test('Should accept valid repeat and facet templates instead of warning about supported composition', () => {
        const unit: VegaLiteSpec = {
          mark: 'line',
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        };
        const spec: VegaLiteSpec = {
          data: {
            values: [
              { x: 1, y: 28 },
              { x: 2, y: 55 },
            ],
          },
          repeat: ['x', 'y'],
          spec: {
            ...unit,
            encoding: { ...unit.encoding, y: { field: { repeat: 'repeat' }, type: 'quantitative' } },
          },
        };
        const original = JSON.parse(JSON.stringify(spec));
        expect(validateVegaLiteSpec(spec)).toEqual([]);
        expect(validateVegaLiteSpec(spec, { mode: 'strict' })).toEqual([]);
        const facet: VegaLiteSpec = { data: spec.data, facet: { field: 'x', type: 'nominal' }, spec: unit };
        expect(validateVegaLiteSpec(facet)).toEqual([]);
        expect(validateVegaLiteSpec(facet, { mode: 'strict' })).toEqual([]);
        expect(spec).toEqual(original);
      });
    });

    describe('Color Scheme Support', () => {
      test('Should use category10 color scheme for multi-series line chart', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { x: 1, y: 28, category: 'A' },
              { x: 2, y: 55, category: 'A' },
              { x: 1, y: 35, category: 'B' },
              { x: 2, y: 60, category: 'B' },
            ],
          },
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
            color: {
              field: 'category',
              type: 'nominal',
              scale: { scheme: 'category10' },
            },
          },
        };

        const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

        expect(result.data.lineChartData).toHaveLength(2);
        // Colors should be from category10 -> Fluent mapping
        expect(result.data.lineChartData![0].color).toBeTruthy();
        expect(result.data.lineChartData![1].color).toBeTruthy();
      });

      test('Should use custom color range when provided', () => {
        const customColors = ['#ff0000', '#00ff00', '#0000ff'];
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [
              { category: 'A', value: 28 },
              { category: 'B', value: 55 },
              { category: 'C', value: 43 },
            ],
          },
          encoding: {
            x: { field: 'category', type: 'nominal' },
            y: { field: 'value', type: 'quantitative' },
            color: {
              field: 'category',
              type: 'nominal',
              scale: { range: customColors },
            },
          },
        };

        const result = transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false);

        expect(result.data).toHaveLength(3);
        // Should use custom colors from range
        expect(result.data![0].color).toBe(customColors[0]);
        expect(result.data![1].color).toBe(customColors[1]);
        expect(result.data![2].color).toBe(customColors[2]);
      });

      test('Should prioritize custom range over scheme', () => {
        const customColors = ['#ff0000', '#00ff00'];
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { x: 1, y: 28, category: 'A' },
              { x: 2, y: 55, category: 'A' },
              { x: 1, y: 35, category: 'B' },
              { x: 2, y: 60, category: 'B' },
            ],
          },
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
            color: {
              field: 'category',
              type: 'nominal',
              scale: {
                scheme: 'category10',
                range: customColors, // Range should take priority
              },
            },
          },
        };

        const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

        expect(result.data.lineChartData).toHaveLength(2);
        // Should use custom range, not category10
        expect(result.data.lineChartData![0].color).toBe(customColors[0]);
        expect(result.data.lineChartData![1].color).toBe(customColors[1]);
      });
    });
  });

  describe('ColorMap - Persistent Colors', () => {
    test('Should maintain consistent colors across re-renders using colorMap', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { date: '2023-01-01', value: 10, series: 'A' },
            { date: '2023-01-02', value: 20, series: 'A' },
            { date: '2023-01-01', value: 15, series: 'B' },
            { date: '2023-01-02', value: 25, series: 'B' },
          ],
        },
        encoding: {
          x: { field: 'date', type: 'temporal' },
          y: { field: 'value', type: 'quantitative' },
          color: { field: 'series', type: 'nominal' },
        },
      };

      // First render - colorMap is empty
      const testColorMap = new Map<string, string>();
      const props1 = transformVegaLiteToLineChartProps(spec, { current: testColorMap }, false);

      // Verify colors are assigned
      expect(props1.data?.lineChartData).toHaveLength(2);
      const seriesAColor1 = props1.data?.lineChartData?.find(s => s.legend === 'A')?.color;
      const seriesBColor1 = props1.data?.lineChartData?.find(s => s.legend === 'B')?.color;
      expect(seriesAColor1).toBeDefined();
      expect(seriesBColor1).toBeDefined();

      // Verify colorMap is populated
      expect(testColorMap.size).toBe(2);
      expect(testColorMap.get('A')).toBe(seriesAColor1);
      expect(testColorMap.get('B')).toBe(seriesBColor1);

      // Second render with same colorMap - colors should be identical
      const props2 = transformVegaLiteToLineChartProps(spec, { current: testColorMap }, false);
      const seriesAColor2 = props2.data?.lineChartData?.find(s => s.legend === 'A')?.color;
      const seriesBColor2 = props2.data?.lineChartData?.find(s => s.legend === 'B')?.color;

      expect(seriesAColor2).toBe(seriesAColor1);
      expect(seriesBColor2).toBe(seriesBColor1);
    });

    test('Should assign colors in order when series are added', () => {
      const testColorMap = new Map<string, string>();

      // First spec with series A
      const spec1: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { x: 1, y: 10, series: 'A' },
            { x: 2, y: 20, series: 'A' },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
          color: { field: 'series', type: 'nominal' },
        },
      };

      const props1 = transformVegaLiteToLineChartProps(spec1, { current: testColorMap }, false);
      const colorA = props1.data?.lineChartData?.find(s => s.legend === 'A')?.color;

      // Second spec adds series B - should get next color
      const spec2: VegaLiteSpec = {
        ...spec1,
        data: {
          values: [...spec1.data!.values!, { x: 1, y: 15, series: 'B' }, { x: 2, y: 25, series: 'B' }],
        },
      };

      const props2 = transformVegaLiteToLineChartProps(spec2, { current: testColorMap }, false);
      const colorA2 = props2.data?.lineChartData?.find(s => s.legend === 'A')?.color;
      const colorB = props2.data?.lineChartData?.find(s => s.legend === 'B')?.color;

      // Series A should keep same color
      expect(colorA2).toBe(colorA);
      // Series B should have different color
      expect(colorB).not.toBe(colorA);
      // colorMap should have both
      expect(testColorMap.size).toBe(2);
    });
  });

  describe('StrokeDash Support', () => {
    test('Should apply strokeDash pattern to line chart', () => {
      const spec: VegaLiteSpec = {
        mark: {
          type: 'line',
          strokeDash: [5, 5], // Dashed line
          strokeWidth: 3,
        },
        data: {
          values: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 15 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      };

      const props = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      expect(props.data?.lineChartData).toHaveLength(1);
      const series = props.data?.lineChartData?.[0];
      expect(series?.lineOptions).toBeDefined();
      expect(series?.lineOptions?.strokeDasharray).toBe('5 5');
      expect(series?.lineOptions?.strokeWidth).toBe(3);
    });

    test('Should apply dotted line pattern', () => {
      const spec: VegaLiteSpec = {
        mark: {
          type: 'line',
          strokeDash: [2, 2], // Dotted line
        },
        data: {
          values: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      };

      const props = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      const series = props.data?.lineChartData?.[0];
      expect(series?.lineOptions?.strokeDasharray).toBe('2 2');
    });

    test('Should apply custom dash pattern', () => {
      const spec: VegaLiteSpec = {
        mark: {
          type: 'line',
          strokeDash: [10, 5, 2, 5], // Custom pattern
        },
        data: {
          values: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      };

      const props = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      const series = props.data?.lineChartData?.[0];
      expect(series?.lineOptions?.strokeDasharray).toBe('10 5 2 5');
    });

    test('Should work without strokeDash (solid line)', () => {
      const spec: VegaLiteSpec = {
        mark: {
          type: 'line',
          strokeWidth: 2,
        },
        data: {
          values: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      };

      const props = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      const series = props.data?.lineChartData?.[0];
      // Should have strokeWidth but no strokeDasharray
      expect(series?.lineOptions?.strokeWidth).toBe(2);
      expect(series?.lineOptions?.strokeDasharray).toBeUndefined();
    });
  });

  describe('Ordinal X-Axis - Category Support', () => {
    test('Should map ordinal x-axis values to sequential indices', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { quarter: 'Q1 2024', sales: 100 },
            { quarter: 'Q2 2024', sales: 150 },
            { quarter: 'Q3 2024', sales: 180 },
            { quarter: 'Q4 2024', sales: 200 },
          ],
        },
        encoding: {
          x: { field: 'quarter', type: 'ordinal' },
          y: { field: 'sales', type: 'quantitative' },
        },
      };

      const props = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      // Should have 4 data points with sequential x-values (0, 1, 2, 3)
      const series = props.data?.lineChartData?.[0];
      expect(series?.data).toHaveLength(4);
      expect(series?.data?.[0].x).toBe(0);
      expect(series?.data?.[1].x).toBe(1);
      expect(series?.data?.[2].x).toBe(2);
      expect(series?.data?.[3].x).toBe(3);

      // Y values should be preserved
      expect(series?.data?.[0].y).toBe(100);
      expect(series?.data?.[1].y).toBe(150);
      expect(series?.data?.[2].y).toBe(180);
      expect(series?.data?.[3].y).toBe(200);

      // tickValues should contain the ordinal labels
      expect(props.tickValues).toEqual(['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024']);
    });

    test('Should handle multi-series ordinal data consistently', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { quarter: 'Q1 2024', department: 'Sales', performance: 85 },
            { quarter: 'Q1 2024', department: 'Marketing', performance: 70 },
            { quarter: 'Q2 2024', department: 'Sales', performance: 90 },
            { quarter: 'Q2 2024', department: 'Marketing', performance: 75 },
            { quarter: 'Q3 2024', department: 'Sales', performance: 95 },
            { quarter: 'Q3 2024', department: 'Marketing', performance: 80 },
          ],
        },
        encoding: {
          x: { field: 'quarter', type: 'ordinal' },
          y: { field: 'performance', type: 'quantitative' },
          color: { field: 'department', type: 'nominal' },
        },
      };

      const props = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      // Should have 2 series
      expect(props.data?.lineChartData).toHaveLength(2);

      // Both series should have same x-values (0, 1, 2)
      const salesSeries = props.data?.lineChartData?.find(s => s.legend === 'Sales');
      const marketingSeries = props.data?.lineChartData?.find(s => s.legend === 'Marketing');

      expect(salesSeries?.data).toHaveLength(3);
      expect(marketingSeries?.data).toHaveLength(3);

      expect(salesSeries?.data?.[0].x).toBe(0);
      expect(salesSeries?.data?.[1].x).toBe(1);
      expect(salesSeries?.data?.[2].x).toBe(2);

      expect(marketingSeries?.data?.[0].x).toBe(0);
      expect(marketingSeries?.data?.[1].x).toBe(1);
      expect(marketingSeries?.data?.[2].x).toBe(2);

      // tickValues should contain ordinal labels
      expect(props.tickValues).toEqual(['Q1 2024', 'Q2 2024', 'Q3 2024']);
    });

    test('Should work with nominal x-axis type (synonym for ordinal)', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { category: 'Low', value: 10 },
            { category: 'Medium', value: 20 },
            { category: 'High', value: 30 },
          ],
        },
        encoding: {
          x: { field: 'category', type: 'nominal' },
          y: { field: 'value', type: 'quantitative' },
        },
      };

      const props = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      const series = props.data?.lineChartData?.[0];
      expect(series?.data).toHaveLength(3);
      expect(series?.data?.[0].x).toBe(0);
      expect(series?.data?.[1].x).toBe(1);
      expect(series?.data?.[2].x).toBe(2);
      expect(props.tickValues).toEqual(['Low', 'Medium', 'High']);
    });

    test('Should handle quantitative x-axis without ordinal mapping', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 30 },
          ],
        },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'y', type: 'quantitative' },
        },
      };

      const props = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

      const series = props.data?.lineChartData?.[0];
      // Should use original numeric x values
      expect(series?.data?.[0].x).toBe(1);
      expect(series?.data?.[1].x).toBe(2);
      expect(series?.data?.[2].x).toBe(3);
      // Should not have ordinal tickValues
      expect(props.tickValues).toBeUndefined();
    });
  });

  describe('Polar Charts - Theta and Radius Encoding', () => {
    test('Should handle arc marks with theta and radius as polar area charts', () => {
      const spec: VegaLiteSpec = {
        mark: { type: 'arc', innerRadius: 0 },
        data: {
          values: [
            { category: 'A', value: 28, radius: 10 },
            { category: 'B', value: 55, radius: 15 },
            { category: 'C', value: 43, radius: 12 },
          ],
        },
        encoding: {
          theta: { field: 'value', type: 'quantitative' },
          radius: { field: 'radius', type: 'quantitative' },
          color: { field: 'category', type: 'nominal' },
        },
      };

      const props = transformVegaLiteToPolarChartProps(spec, { current: colorMap }, false);

      // Should create polar chart data
      expect(props.data).toHaveLength(3);

      // Each series should be area polar (arc marks become area polar)
      expect(props.data?.[0].type).toBe('areapolar');
      expect(props.data?.[1].type).toBe('areapolar');
      expect(props.data?.[2].type).toBe('areapolar');

      // Check data structure
      expect(props.data?.[0].legend).toBe('A');
      expect(props.data?.[0].data).toHaveLength(1);
      expect(props.data?.[0].data?.[0].theta).toBe(28);
      expect(props.data?.[0].data?.[0].r).toBe(10);
    });

    test('Should handle line marks with theta and radius', () => {
      const spec: VegaLiteSpec = {
        mark: 'line',
        data: {
          values: [
            { angle: 0, distance: 5 },
            { angle: 90, distance: 10 },
            { angle: 180, distance: 7 },
            { angle: 270, distance: 12 },
          ],
        },
        encoding: {
          theta: { field: 'angle', type: 'quantitative' },
          radius: { field: 'distance', type: 'quantitative' },
        },
      };

      const props = transformVegaLiteToPolarChartProps(spec, { current: colorMap }, false);

      // Should create single line polar series
      expect(props.data).toHaveLength(1);
      expect(props.data?.[0].type).toBe('linepolar');
      expect(props.data?.[0].data).toHaveLength(4);

      // Check data points
      expect(props.data?.[0].data?.[0]).toEqual({ theta: 0, r: 5 });
      expect(props.data?.[0].data?.[1]).toEqual({ theta: 90, r: 10 });
    });

    test('Should handle point marks with theta and radius as scatter polar', () => {
      const spec: VegaLiteSpec = {
        mark: 'point',
        data: {
          values: [
            { angle: 45, distance: 8, series: 'S1' },
            { angle: 135, distance: 12, series: 'S1' },
            { angle: 225, distance: 6, series: 'S2' },
          ],
        },
        encoding: {
          theta: { field: 'angle', type: 'quantitative' },
          radius: { field: 'distance', type: 'quantitative' },
          color: { field: 'series', type: 'nominal' },
        },
      };

      const props = transformVegaLiteToPolarChartProps(spec, { current: colorMap }, false);

      // Should create two scatter polar series
      expect(props.data).toHaveLength(2);
      expect(props.data?.[0].type).toBe('scatterpolar');
      expect(props.data?.[1].type).toBe('scatterpolar');

      const s1Series = props.data?.find(s => s.legend === 'S1');
      const s2Series = props.data?.find(s => s.legend === 'S2');

      expect(s1Series?.data).toHaveLength(2);
      expect(s2Series?.data).toHaveLength(1);
    });

    test('Should handle categorical theta encoding in polar charts', () => {
      const spec: VegaLiteSpec = {
        mark: 'area',
        data: {
          values: [
            { direction: 'North', strength: 8 },
            { direction: 'East', strength: 12 },
            { direction: 'South', strength: 6 },
            { direction: 'West', strength: 10 },
          ],
        },
        encoding: {
          theta: { field: 'direction', type: 'nominal' },
          radius: { field: 'strength', type: 'quantitative' },
        },
      };

      const props = transformVegaLiteToPolarChartProps(spec, { current: colorMap }, false);

      // Should create area polar chart
      expect(props.data).toHaveLength(1);
      expect(props.data?.[0].type).toBe('areapolar');

      // Categorical theta values should be preserved as strings
      expect(props.data?.[0].data?.[0].theta).toBe('North');
      expect(props.data?.[0].data?.[1].theta).toBe('East');

      // Should have category order for angular axis
      expect(props.angularAxis?.categoryOrder).toEqual(['North', 'East', 'South', 'West']);
    });
  });

  describe('Aggregate Bar Charts', () => {
    test('Should handle count aggregation for vertical bars', () => {
      const spec: VegaLiteSpec = {
        mark: 'bar',
        data: {
          values: [
            { category: 'A' },
            { category: 'A' },
            { category: 'B' },
            { category: 'A' },
            { category: 'C' },
            { category: 'B' },
          ],
        },
        encoding: {
          x: { field: 'category', type: 'nominal' },
          y: { aggregate: 'count', type: 'quantitative', title: 'Count' },
        },
      };

      const props = transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false);

      // Should aggregate counts per category
      expect(props.data).toHaveLength(3);

      // Find data points by category
      const pointA = props.data!.find(d => d.x === 'A');
      const pointB = props.data!.find(d => d.x === 'B');
      const pointC = props.data!.find(d => d.x === 'C');

      expect(pointA?.y).toBe(3); // 'A' appears 3 times
      expect(pointB?.y).toBe(2); // 'B' appears 2 times
      expect(pointC?.y).toBe(1); // 'C' appears 1 time

      // Check title
      expect(props.yAxisTitle).toBe('Count');
    });

    test('Should handle sum aggregation for vertical bars', () => {
      const spec: VegaLiteSpec = {
        mark: 'bar',
        data: {
          values: [
            { category: 'A', value: 10 },
            { category: 'A', value: 20 },
            { category: 'B', value: 15 },
            { category: 'A', value: 5 },
            { category: 'C', value: 30 },
            { category: 'B', value: 25 },
          ],
        },
        encoding: {
          x: { field: 'category', type: 'nominal' },
          y: { field: 'value', aggregate: 'sum', type: 'quantitative' },
        },
      };

      const props = transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false);

      // Should aggregate sums per category
      expect(props.data).toHaveLength(3);

      const pointA = props.data!.find(d => d.x === 'A');
      const pointB = props.data!.find(d => d.x === 'B');
      const pointC = props.data!.find(d => d.x === 'C');

      expect(pointA?.y).toBe(35); // 10 + 20 + 5
      expect(pointB?.y).toBe(40); // 15 + 25
      expect(pointC?.y).toBe(30); // 30
    });

    test('Should handle mean aggregation for vertical bars', () => {
      const spec: VegaLiteSpec = {
        mark: 'bar',
        data: {
          values: [
            { category: 'A', value: 10 },
            { category: 'A', value: 20 },
            { category: 'B', value: 15 },
            { category: 'A', value: 30 },
            { category: 'B', value: 25 },
          ],
        },
        encoding: {
          x: { field: 'category', type: 'nominal' },
          y: { field: 'value', aggregate: 'mean', type: 'quantitative' },
        },
      };

      const props = transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false);

      expect(props.data).toHaveLength(2);

      const pointA = props.data!.find(d => d.x === 'A');
      const pointB = props.data!.find(d => d.x === 'B');

      expect(pointA?.y).toBe(20); // (10 + 20 + 30) / 3
      expect(pointB?.y).toBe(20); // (15 + 25) / 2
    });
  });

  describe('Prototype pollution hardening', () => {
    const pollutionKeys = ['__proto__', 'constructor', 'prototype'];

    afterEach(() => {
      // Ensure no test leaked a polluting property onto Object.prototype.
      for (const key of ['polluted', 'injected', 'NODE_OPTIONS']) {
        delete (Object.prototype as Record<string, unknown>)[key];
      }
    });

    test.each(pollutionKeys)(
      'transformVegaLiteToGroupedVerticalBarChartProps does not pollute Object.prototype via x value "%s"',
      magicKey => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [
              { category: magicKey, value: 1, series: 'polluted' },
              { category: 'A', value: 2, series: 'polluted' },
            ],
          },
          encoding: {
            x: { field: 'category', type: 'nominal' },
            y: { field: 'value', type: 'quantitative' },
            color: { field: 'series', type: 'nominal' },
            xOffset: { field: 'series' },
          },
        };

        const result = transformVegaLiteToGroupedVerticalBarChartProps(spec, { current: colorMap }, false);

        expect(({} as Record<string, unknown>).polluted).toBeUndefined();
        expect(Object.prototype.hasOwnProperty.call(Object.prototype, 'polluted')).toBe(false);
        // The malicious category is still processed as ordinary data.
        expect(result.data!.some(d => d.name === magicKey)).toBe(true);
      },
    );

    test.each(pollutionKeys)(
      'transformVegaLiteToGroupedVerticalBarChartProps does not pollute Object.prototype via series value "%s"',
      magicKey => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [{ category: 'A', value: 1, series: magicKey }],
          },
          encoding: {
            x: { field: 'category', type: 'nominal' },
            y: { field: 'value', type: 'quantitative' },
            color: { field: 'series', type: 'nominal' },
            xOffset: { field: 'series' },
          },
        };

        expect(() => transformVegaLiteToGroupedVerticalBarChartProps(spec, { current: colorMap }, false)).not.toThrow();
        expect(Object.prototype.hasOwnProperty.call(Object.prototype, '1')).toBe(false);
      },
    );

    test.each(pollutionKeys)(
      'transformVegaLiteToVerticalStackedBarChartProps does not pollute or crash via x value "%s"',
      magicKey => {
        const spec: VegaLiteSpec = {
          mark: 'bar',
          data: {
            values: [
              { category: magicKey, value: 1, series: 'polluted' },
              { category: 'A', value: 2, series: 'polluted' },
            ],
          },
          encoding: {
            x: { field: 'category', type: 'nominal' },
            y: { field: 'value', type: 'quantitative' },
            color: { field: 'series', type: 'nominal' },
          },
        };

        expect(() => transformVegaLiteToVerticalStackedBarChartProps(spec, { current: colorMap }, false)).not.toThrow();
        expect(Object.prototype.hasOwnProperty.call(Object.prototype, 'polluted')).toBe(false);
      },
    );

    test.each(pollutionKeys)(
      'transformVegaLiteToScatterChartProps does not pollute or crash via series value "%s"',
      magicKey => {
        const spec: VegaLiteSpec = {
          mark: 'point',
          data: {
            values: [
              { x: 1, y: 2, series: magicKey },
              { x: 3, y: 4, series: magicKey },
            ],
          },
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
            color: { field: 'series', type: 'nominal' },
          },
        };

        expect(() => transformVegaLiteToScatterChartProps(spec, { current: colorMap }, false)).not.toThrow();
        expect(Object.prototype.hasOwnProperty.call(Object.prototype, 'polluted')).toBe(false);
      },
    );

    test('environment-shaped series name is not written onto Object.prototype', () => {
      const envKey = 'NODE_OPTIONS';
      const spec: VegaLiteSpec = {
        mark: 'bar',
        data: {
          values: [{ category: '__proto__', value: 1, series: envKey }],
        },
        encoding: {
          x: { field: 'category', type: 'nominal' },
          y: { field: 'value', type: 'quantitative' },
          color: { field: 'series', type: 'nominal' },
          xOffset: { field: 'series' },
        },
      };

      transformVegaLiteToGroupedVerticalBarChartProps(spec, { current: colorMap }, false);

      expect(({} as Record<string, unknown>)[envKey]).toBeUndefined();
      expect(Object.prototype.hasOwnProperty.call(Object.prototype, envKey)).toBe(false);
    });

    test('transform pipeline cannot launder the Function constructor through prototype fields', () => {
      const marker = '__msrcFluentUiVegaBypass';
      const spec: VegaLiteSpec = {
        mark: 'bar',
        data: { values: [{ category: 'A', value: 1 }] },
        transform: [
          { calculate: 'abs', as: '__proto__' },
          { aggregate: [{ op: 'count', as: '_s1' }], groupby: ['__proto__', 'category', 'value'] },
          { aggregate: [{ op: 'count', as: '_s2' }], groupby: ['constructor', 'category', 'value'] },
          { calculate: `datum.constructor("globalThis.${marker} = 'owned'; return 1337")()`, as: 'computed' },
        ],
        encoding: {
          x: { field: 'category', type: 'nominal' },
          y: { field: 'value', type: 'quantitative' },
        },
      };

      delete (globalThis as unknown as Record<string, unknown>)[marker];
      try {
        transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false);
        expect((globalThis as unknown as Record<string, unknown>)[marker]).toBeUndefined();
      } finally {
        delete (globalThis as unknown as Record<string, unknown>)[marker];
      }
    });
  });
});
