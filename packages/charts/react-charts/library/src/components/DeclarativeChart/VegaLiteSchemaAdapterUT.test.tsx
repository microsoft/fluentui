import {
  transformVegaLiteToLineChartProps,
  getVegaLiteLegendsProps,
  getVegaLiteTitles,
} from './VegaLiteSchemaAdapter';
import type { VegaLiteSpec } from './VegaLiteTypes';

const colorMap = new Map<string, string>();

describe('VegaLiteSchemaAdapter', () => {
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

      expect(result).toMatchSnapshot();
      expect(result.data.lineChartData).toHaveLength(1);
      expect(result.data.lineChartData![0].data).toHaveLength(5);
      expect(result.data.lineChartData![0].legend).toBe('default');
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

      expect(result).toMatchSnapshot();
      expect(result.data.lineChartData).toHaveLength(1);
      expect(result.data.lineChartData![0].data[0].x).toBeInstanceOf(Date);
      expect(result.yAxisTitle).toBe('Value');
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

      expect(result).toMatchSnapshot();
      expect(result.data.lineChartData).toHaveLength(2);
      expect(result.data.lineChartData![0].legend).toBe('A');
      expect(result.data.lineChartData![1].legend).toBe('B');
      expect(result.data.lineChartData![0].data).toHaveLength(3);
      expect(result.data.lineChartData![1].data).toHaveLength(3);
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

      expect(result).toMatchSnapshot();
      expect(result.data.lineChartData).toHaveLength(1);
      expect(result.data.lineChartData![0].data).toHaveLength(3);
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

      expect(result).toMatchSnapshot();
      expect(result.tickFormat).toBe('.0f');
      expect(result.yAxisTickFormat).toBe('.2f');
      expect(result.yAxisTickCount).toBe(5);
      expect(result.width).toBe(800);
      expect(result.height).toBe(400);
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

      expect(result).toMatchSnapshot();
      expect(result.data.lineChartData![0].lineOptions?.curve).toBe('monotoneX');
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

      expect(result).toMatchSnapshot();
      expect(result.yMinValue).toBe(0);
      expect(result.yMaxValue).toBe(200);
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

      expect(result).toMatchSnapshot();
      expect(result.hideLegend).toBe(true);
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
});
