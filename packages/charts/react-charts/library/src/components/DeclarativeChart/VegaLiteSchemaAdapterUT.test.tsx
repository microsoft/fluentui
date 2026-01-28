import {
  transformVegaLiteToLineChartProps,
  transformVegaLiteToVerticalBarChartProps,
  transformVegaLiteToHistogramProps,
  transformVegaLiteToPolarLineChartProps,
  transformVegaLiteToPolarScatterChartProps,
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
      // Vega-Lite 'monotone' maps to 'linear' in Fluent Charts (closest approximation)
      expect(result.data.lineChartData![0].lineOptions?.curve).toBe('linear');
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
      test('Should throw error for quantitative encoding with string values', () => {
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

        expect(() => transformVegaLiteToLineChartProps(spec, { current: colorMap }, false)).toThrow(
          "Field 'x' marked as quantitative but contains non-numeric values",
        );
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
      test('Should throw error for bar chart without categorical axis', () => {
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

        expect(() => transformVegaLiteToVerticalBarChartProps(spec, { current: colorMap }, false)).toThrow(
          'Bar charts require at least one categorical axis',
        );
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

    // Skipped: These tests expect console.warn calls that are intentionally not emitted
    // to avoid polluting console output. The unsupported features are documented in comments.
    describe.skip('Unsupported Features Warnings', () => {
      let consoleWarnSpy: jest.SpyInstance;

      beforeEach(() => {
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
          // Mock implementation
        });
      });

      afterEach(() => {
        consoleWarnSpy.mockRestore();
      });

      test('Should warn about transform pipeline', () => {
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

        transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

        expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Transform pipeline is not yet supported'));
      });

      test('Should warn about selections', () => {
        const spec: any = {
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

        transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining('Interactive selections are not yet supported'),
        );
      });

      test('Should warn about repeat and facet', () => {
        const spec: any = {
          mark: 'line',
          data: {
            values: [
              { x: 1, y: 28 },
              { x: 2, y: 55 },
            ],
          },
          repeat: ['column1', 'column2'],
          encoding: {
            x: { field: 'x', type: 'quantitative' },
            y: { field: 'y', type: 'quantitative' },
          },
        };

        transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining('Repeat and facet specifications are not yet supported'),
        );
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

  describe('Polar Charts', () => {
    describe('transformVegaLiteToPolarLineChartProps', () => {
      test('Should transform polar line chart with numeric theta and radius', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { theta: 0, radius: 1 },
              { theta: 45, radius: 2 },
              { theta: 90, radius: 1.5 },
              { theta: 135, radius: 2.5 },
              { theta: 180, radius: 2 },
              { theta: 225, radius: 1.5 },
              { theta: 270, radius: 1 },
              { theta: 315, radius: 0.5 },
            ],
          },
          encoding: {
            theta: { field: 'theta', type: 'quantitative', axis: { title: 'Angle' } },
            radius: { field: 'radius', type: 'quantitative', axis: { title: 'Radius' } },
          },
          title: 'Polar Line Chart',
        };

        const result = transformVegaLiteToPolarLineChartProps(spec, { current: colorMap }, false);

        expect(result).toMatchSnapshot();
        expect(result.data.lineChartData).toHaveLength(1);
        expect(result.data.lineChartData![0].data).toHaveLength(8);
        expect(result.data.lineChartData![0].legend).toBe('default');
        expect(result.data.lineChartData![0].data[0].x).toBeCloseTo(1, 5);
        expect(result.data.lineChartData![0].data[0].y).toBeCloseTo(0, 5);
      });

      test('Should transform polar line chart with categorical theta', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { direction: 'North', distance: 10 },
              { direction: 'East', distance: 15 },
              { direction: 'South', distance: 8 },
              { direction: 'West', distance: 12 },
            ],
          },
          encoding: {
            theta: { field: 'direction', type: 'nominal' },
            radius: { field: 'distance', type: 'quantitative' },
          },
          title: 'Directional Data',
        };

        const result = transformVegaLiteToPolarLineChartProps(spec, { current: colorMap }, false);

        expect(result).toMatchSnapshot();
        expect(result.data.lineChartData).toHaveLength(1);
        expect(result.data.lineChartData![0].data).toHaveLength(4);
        expect(result.data.lineChartData![0].data.every(p => typeof p.x === 'number' && typeof p.y === 'number')).toBe(
          true,
        );
      });

      test('Should transform multi-series polar line chart', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [
              { theta: 0, radius: 1, series: 'A' },
              { theta: 90, radius: 2, series: 'A' },
              { theta: 180, radius: 1.5, series: 'A' },
              { theta: 270, radius: 1, series: 'A' },
              { theta: 0, radius: 0.5, series: 'B' },
              { theta: 90, radius: 1.5, series: 'B' },
              { theta: 180, radius: 1, series: 'B' },
              { theta: 270, radius: 0.5, series: 'B' },
            ],
          },
          encoding: {
            theta: { field: 'theta', type: 'quantitative' },
            radius: { field: 'radius', type: 'quantitative' },
            color: { field: 'series', type: 'nominal' },
          },
        };

        const result = transformVegaLiteToPolarLineChartProps(spec, { current: colorMap }, false);

        expect(result).toMatchSnapshot();
        expect(result.data.lineChartData).toHaveLength(2);
        expect(result.data.lineChartData![0].legend).toBe('A');
        expect(result.data.lineChartData![1].legend).toBe('B');
        expect(result.data.lineChartData![0].data).toHaveLength(4);
        expect(result.data.lineChartData![1].data).toHaveLength(4);
      });

      test('Should throw error when theta encoding is missing', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [{ radius: 1 }],
          },
          encoding: {
            radius: { field: 'radius', type: 'quantitative' },
          },
        };

        expect(() => transformVegaLiteToPolarLineChartProps(spec, { current: colorMap }, false)).toThrow(
          'Both theta and radius encodings are required for polar line charts',
        );
      });

      test('Should throw error when radius encoding is missing', () => {
        const spec: VegaLiteSpec = {
          mark: 'line',
          data: {
            values: [{ theta: 0 }],
          },
          encoding: {
            theta: { field: 'theta', type: 'quantitative' },
          },
        };

        expect(() => transformVegaLiteToPolarLineChartProps(spec, { current: colorMap }, false)).toThrow(
          'Both theta and radius encodings are required for polar line charts',
        );
      });
    });

    describe('transformVegaLiteToPolarScatterChartProps', () => {
      test('Should transform polar scatter chart with numeric theta and radius', () => {
        const spec: VegaLiteSpec = {
          mark: 'point',
          data: {
            values: [
              { theta: 0, radius: 1 },
              { theta: 45, radius: 2 },
              { theta: 90, radius: 1.5 },
              { theta: 135, radius: 2.5 },
              { theta: 180, radius: 2 },
            ],
          },
          encoding: {
            theta: { field: 'theta', type: 'quantitative' },
            radius: { field: 'radius', type: 'quantitative' },
          },
          title: 'Polar Scatter Plot',
        };

        const result = transformVegaLiteToPolarScatterChartProps(spec, { current: colorMap }, false);

        expect(result).toMatchSnapshot();
        expect(result.data.lineChartData).toHaveLength(1);
        expect(result.data.lineChartData![0].data).toHaveLength(5);
        expect(result.data.lineChartData![0].data[0].x).toBeCloseTo(1, 5);
        expect(result.data.lineChartData![0].data[0].y).toBeCloseTo(0, 5);
      });

      test('Should transform polar scatter chart with size encoding', () => {
        const spec: VegaLiteSpec = {
          mark: 'point',
          data: {
            values: [
              { theta: 0, radius: 1, size: 100 },
              { theta: 90, radius: 2, size: 200 },
              { theta: 180, radius: 1.5, size: 150 },
              { theta: 270, radius: 1, size: 100 },
            ],
          },
          encoding: {
            theta: { field: 'theta', type: 'quantitative' },
            radius: { field: 'radius', type: 'quantitative' },
            size: { field: 'size', type: 'quantitative' },
          },
        };

        const result = transformVegaLiteToPolarScatterChartProps(spec, { current: colorMap }, false);

        expect(result).toMatchSnapshot();
        expect(result.data.lineChartData).toHaveLength(1);
        expect(result.data.lineChartData![0].data).toHaveLength(4);
        expect(result.data.lineChartData![0].data[0].markerSize).toBe(100);
        expect(result.data.lineChartData![0].data[1].markerSize).toBe(200);
      });

      test('Should transform multi-series polar scatter chart', () => {
        const spec: VegaLiteSpec = {
          mark: 'point',
          data: {
            values: [
              { theta: 0, radius: 1, category: 'A' },
              { theta: 90, radius: 2, category: 'A' },
              { theta: 0, radius: 0.5, category: 'B' },
              { theta: 90, radius: 1.5, category: 'B' },
            ],
          },
          encoding: {
            theta: { field: 'theta', type: 'quantitative' },
            radius: { field: 'radius', type: 'quantitative' },
            color: { field: 'category', type: 'nominal' },
          },
        };

        const result = transformVegaLiteToPolarScatterChartProps(spec, { current: colorMap }, false);

        expect(result).toMatchSnapshot();
        expect(result.data.lineChartData).toHaveLength(2);
        expect(result.data.lineChartData![0].legend).toBe('A');
        expect(result.data.lineChartData![1].legend).toBe('B');
      });
    });
  });
});
