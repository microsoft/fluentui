import {
  transformVegaLiteToLineChartProps,
  transformVegaLiteToVerticalBarChartProps,
  transformVegaLiteToHistogramProps,
  transformVegaLiteToPolarChartProps,
  getVegaLiteLegendsProps,
  getVegaLiteTitles,
} from './VegaLiteSchemaAdapter';
import type { VegaLiteSpec } from './VegaLiteTypes';

const colorMap = new Map<string, string>();

describe('VegaLiteSchemaAdapter', () => {
  beforeEach(() => {
    // Clear colorMap before each test to ensure test isolation
    colorMap.clear();
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

        // Should auto-correct quantitative to nominal when data contains strings
        // This matches Plotly behavior - render as categorical chart
        const result = transformVegaLiteToLineChartProps(spec, { current: colorMap }, false);

        // Should successfully transform (not throw error)
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();

        // Type should be auto-corrected to nominal
        expect(spec.encoding!.x?.type).toBe('nominal');
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
});
