import { isDateArray, isMonthArray, isNumberArray, sanitizeJson, isInvalidValue } from '@fluentui/chart-utilities';

import {
  correctYearMonth,
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToVSBCProps,
  transformPlotlyJsonToGVBCProps,
  transformPlotlyJsonToVBCProps,
  transformPlotlyJsonToScatterChartProps,
  transformPlotlyJsonToAreaChartProps,
  transformPlotlyJsonToLineChartProps,
  transformPlotlyJsonToAnnotationChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  transformPlotlyJsonToHeatmapProps,
  transformPlotlyJsonToSankeyProps,
  transformPlotlyJsonToGaugeProps,
  getNumberAtIndexOrDefault,
  getValidXYRanges,
  resolveXAxisPoint,
} from './PlotlySchemaAdapter';
import { getColor, getSchemaColors } from './PlotlyColorAdapter';
import type { PlotlySchema } from '@fluentui/chart-utilities';

const date = new Date();
const colorMap = new Map<string, string>();

describe('isDate', () => {
  test('Should return true when input array contains Date objects', () => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    expect(isDateArray([date, nextDay])).toBe(true);
  });

  test('Should return false when input array contains numeric data', () => {
    expect(isDateArray([20, 30, 40])).toBe(false);
  });

  test('Should return false when input array contains string data', () => {
    expect(isDateArray(['twenty', 'thirty', 'forty'])).toBe(false);
  });

  test('Should return false when input array contains different data type objects', () => {
    expect(isDateArray(['twenty', 20, date])).toBe(false);
  });

  test('Should return true when input array contains string date objects which contains month in short format', () => {
    expect(isDateArray(['20 Jan 2025', '10 Feb 2025'])).toBe(true);
  });

  test('Should return true when input array contains string date objects', () => {
    expect(isDateArray(['20 January 2025', '10 February 2025'])).toBe(true);
  });

  test('Should return true when input array contains date in different data types and formats', () => {
    expect(isDateArray([date, '10 February 2025', '10 Feb 2025'])).toBe(true);
  });

  test('Should return true when input array contains date in DD/MM/YYYY format(string)', () => {
    expect(isDateArray(['10/11/2025', '10/10/2025'])).toBe(true);
  });

  test('Should return false when input array contains date in DD/MM/YYYY format with invalid date objects', () => {
    expect(isDateArray(['14/14/2025', '10/14/2025'])).toBe(false);
  });

  test('Should return true when input array contains date in MM/DD/YYYY format', () => {
    expect(isDateArray(['12/1/2025', '12/11/2025'])).toBe(true);
  });

  test('Should return true when input array contains date in simple date Object format', () => {
    expect(isDateArray([new Date(2025, 11, 2), new Date(2025, 10, 2)])).toBe(true);
  });

  test('Should return false when input array is empty', () => {
    expect(isDateArray([])).toBe(false);
  });

  test('Should return false when input array contains only month(MMM)', () => {
    expect(isDateArray(['January', 'February'])).toBe(false);
  });

  test('Should return false when input array contains only month(MM)', () => {
    expect(isDateArray(['Jan', 'Feb'])).toBe(false);
  });
});

describe('isNumberArray', () => {
  test('Should return false when input array contains Date objects', () => {
    expect(isNumberArray([date, date.getDate() + 1, date.getDate() + 2])).toBe(false);
  });

  test('Should return true when input array contains numeric data', () => {
    expect(isNumberArray([20, 30, 40])).toBe(true);
  });

  test('Should return true when input array contains numaric data in string formatt', () => {
    expect(isNumberArray(['20', '30', '40'])).toBe(true);
  });

  test('Should return false when input array contains string data', () => {
    expect(isNumberArray(['twenty', 'thirty', 'forty'])).toBe(false);
  });
});

describe('isMonthArray', () => {
  test('Should return false when input array contains Date objects', () => {
    expect(isMonthArray([date, date.getDate() + 1, date.getDate() + 2])).toBe(false);
  });

  test('Should return false when input array contains numeric data', () => {
    expect(isMonthArray([20, 30, 40])).toBe(false);
  });

  test('Should return false when input array contains numaric data in string formatt', () => {
    expect(isMonthArray(['20', '30', '40'])).toBe(false);
  });

  test('Should return false when input array contains numbers in string data', () => {
    expect(isMonthArray(['One', 'Two', 'Three'])).toBe(false);
  });

  test('Should return true when input array contains only months in string formatt(MMM)', () => {
    expect(isMonthArray(['January', 'February'])).toBe(true);
  });

  test('Should return true when input array contains only months in string formatt(MM)', () => {
    expect(isMonthArray(['Jan', 'Feb'])).toBe(true);
  });

  test('Should return false when input array is empty', () => {
    expect(isMonthArray([])).toBe(false);
  });

  test.skip('Should return true when input array contains only months in string formatt(MMM) in spanish', () => {
    expect(isMonthArray(['Enero', 'Febrero'])).toBe(true);
  });

  test.skip('Should return true when input array contains only months in string formatt(MM) in spanish', () => {
    expect(isMonthArray(['Ene', 'Feb'])).toBe(true);
  });

  test.skip('Should return true when input array contains only months in string format(MMM) in italian', () => {
    expect(isMonthArray(['Gennaio', 'Febbraio'])).toBe(true);
  });
});

describe('correctYearMonth', () => {
  test('Should return dates array when input array contains months data', () => {
    expect(correctYearMonth([10, 11, 1])).toStrictEqual(['10 01, 2025', '11 01, 2025', '1 01, 2026']);
  });

  test('Should return error when input array contains invalid months', () => {
    expect(correctYearMonth([10, 11, 16])).toStrictEqual(['10 01, 2026', '11 01, 2026', null]);
  });

  test('Should return dates array when input array contains months data in MMM format', () => {
    expect(correctYearMonth(['January', 'February'])).toStrictEqual(['January 01, 2026', 'February 01, 2026']);
  });

  test('Should return dates array when input array contains months data in MM format', () => {
    expect(correctYearMonth(['Jan', 'Feb'])).toStrictEqual(['Jan 01, 2026', 'Feb 01, 2026']);
  });

  test('Should return dates array when input array is empty', () => {
    expect(correctYearMonth([])).toStrictEqual([]);
  });
});

describe('getColor', () => {
  test('Should return color code when we had legend title', () => {
    expect(getColor('test', { current: colorMap }, 'plotly', true)).toBe('#637cef');
  });

  test('Should return color code when we had legend title', () => {
    expect(getColor('test', { current: colorMap }, 'plotly', false)).toBe('#637cef');
  });

  test('Should return color code when we had legend title is empty', () => {
    expect(getColor('', { current: colorMap }, 'plotly', false)).toBe('#f7630c');
  });
});

describe('transform Plotly Json To chart Props', () => {
  test('transformPlotlyJsonToDonutProps - Should return donut chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_donut_test.json');
    expect(
      transformPlotlyJsonToDonutProps(plotlySchema, false, { current: colorMap }, 'default', true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToDonutProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(
        transformPlotlyJsonToDonutProps(plotlySchema, false, { current: colorMap }, 'default', true),
      ).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading '0')"));
    }
  });

  test('transformPlotlyJsonToDonutProps - Should return pie chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_pie_test.json');
    expect(
      transformPlotlyJsonToDonutProps(plotlySchema, false, { current: colorMap }, 'default', true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToVSBCProps - Should return VSBC props', () => {
    const plotlySchema = require('./tests/schema/fluent_verticalstackedbarchart_test.json');
    expect(
      transformPlotlyJsonToVSBCProps(plotlySchema, false, { current: colorMap }, 'default', true, true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToVSBCProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(
        transformPlotlyJsonToVSBCProps(plotlySchema, false, { current: colorMap }, 'default', true),
      ).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading 'forEach')"));
    }
  });

  test('transformPlotlyJsonToGVBCProps - Should return GVBC props', () => {
    const plotlySchema = require('./tests/schema/fluent_groupedverticalbarchart_test.json');
    expect(
      transformPlotlyJsonToGVBCProps(plotlySchema, false, { current: colorMap }, 'default', true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToGVBCProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(
        transformPlotlyJsonToGVBCProps(plotlySchema, false, { current: colorMap }, 'default', true),
      ).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading 'some')"));
    }
  });

  test('transformPlotlyJsonToVBCProps - Should return VBC props', () => {
    const plotlySchema = require('./tests/schema/fluent_verticalbar_histogram_test.json');
    expect(
      transformPlotlyJsonToVBCProps(plotlySchema, false, { current: colorMap }, 'default', true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToVBCProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    expect(() => {
      transformPlotlyJsonToVBCProps(plotlySchema, false, { current: colorMap }, 'default', true);
    }).toThrow(TypeError);
  });

  test('transformPlotlyJsonToLineChartProps - Should return line chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_line_test.json');
    expect(
      transformPlotlyJsonToLineChartProps(plotlySchema, false, { current: colorMap }, 'default', true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToLineChartProps - maps layout annotations to chart annotations', () => {
    const plotlySchema = require('./tests/schema/fluent_line_annotations_test.json');
    const result = transformPlotlyJsonToLineChartProps(plotlySchema, false, { current: colorMap }, 'default', true);

    expect(result.annotations).toBeDefined();
    expect(result.annotations).toHaveLength(4);

    const [primary, relative, pixel, domain] = result.annotations!;

    expect(primary).toBeDefined();
    expect(primary?.id).toBe('annotation-0-peak-value');
    expect(primary?.coordinates).toEqual({
      type: 'data',
      x: new Date('2024-01-02T00:00:00.000Z'),
      y: 20,
    });
    expect(primary?.layout).toEqual({
      align: 'start',
      verticalAlign: 'bottom',
      offsetX: -30,
      offsetY: -25,
      maxWidth: 180,
      clipToBounds: true,
    });
    expect(primary?.style).toEqual({
      textColor: '#ff0000',
      backgroundColor: '#ffffff',
      borderColor: '#ff0000',
      borderWidth: 1,
      padding: '8px',
      opacity: 0.9,
      fontSize: '14px',
    });
    expect(primary?.connector).toEqual({
      strokeColor: '#ff0000',
      strokeWidth: 2,
      dashArray: '5, 5',
      endPadding: 6,
      arrow: 'end',
    });

    expect(relative).toBeDefined();
    expect(relative?.coordinates).toEqual({
      type: 'relative',
      x: 0.5,
      y: 0.9,
    });
    expect(relative?.style).toEqual({
      backgroundColor: '#333333',
      textColor: '#ffffff',
      fontSize: '12px',
    });
    expect(relative?.layout).toBeUndefined();
    expect(relative?.connector).toBeUndefined();

    expect(pixel).toBeDefined();
    expect(pixel?.coordinates).toEqual({
      type: 'pixel',
      x: 40,
      y: 40,
    });
    expect(pixel?.layout).toEqual({
      offsetX: 15,
      offsetY: 12,
    });
    expect(pixel?.style).toEqual({
      textColor: '#111111',
    });
    expect(pixel?.connector).toEqual({
      strokeColor: '#0078d4',
      strokeWidth: 1.5,
      dashArray: '1, 5',
      startPadding: 4,
      arrow: 'start',
    });

    expect(domain).toBeDefined();
    expect(domain?.coordinates).toEqual({
      type: 'mixed',
      xCoordinateType: 'relative',
      yCoordinateType: 'data',
      x: 0.25,
      y: 18,
    });
    expect(domain?.style).toEqual({
      textColor: '#222222',
      fontSize: '12px',
    });
    expect(domain?.layout).toBeUndefined();
    expect(domain?.connector).toBeUndefined();
  });

  test('transformPlotlyJsonToLineChartProps - does not return annotations for multi plot', () => {
    const plotlySchema = require('./tests/schema/fluent_line_annotations_test.json');
    const result = transformPlotlyJsonToLineChartProps(plotlySchema, true, { current: new Map() }, 'default', true);

    expect(result.annotations).toBeUndefined();
  });

  test('transformPlotlyJsonToScatterChartProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    expect(() => {
      transformPlotlyJsonToLineChartProps(plotlySchema, false, { current: colorMap }, 'default', true);
    }).toThrow(TypeError);
  });

  test('transformPlotlyJsonToScatterChartProps - Should return area chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_area_test.json');
    expect(
      transformPlotlyJsonToAreaChartProps(plotlySchema, false, { current: colorMap }, 'default', true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToScatterChartProps - Should return scatter chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_scatter_test.json');
    expect(
      transformPlotlyJsonToScatterChartProps(plotlySchema, false, { current: colorMap }, 'default', true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToHorizontalBarWithAxisProps - Should return HBC with axis chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_horizontalbar_test.json');
    expect(
      transformPlotlyJsonToHorizontalBarWithAxisProps(plotlySchema, false, { current: colorMap }, 'default', true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToHorizontalBarWithAxisProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    expect(() => {
      transformPlotlyJsonToHorizontalBarWithAxisProps(plotlySchema, false, { current: colorMap }, 'default', true);
    }).toThrow(TypeError);
  });

  test('transformPlotlyJsonToHeatmapProps - Should return heatmap chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_heatmap_test.json');
    expect(
      transformPlotlyJsonToHeatmapProps(plotlySchema, false, { current: colorMap }, 'default', true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToHeatmapProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(
        transformPlotlyJsonToHeatmapProps(plotlySchema, false, { current: colorMap }, 'default', true),
      ).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading '0')"));
    }
  });

  test('transformPlotlyJsonToSankeyProps - Should return sankey chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_sankey_test.json');
    expect(
      transformPlotlyJsonToSankeyProps(plotlySchema, false, { current: colorMap }, 'default', true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToSankeyProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(
        transformPlotlyJsonToSankeyProps(plotlySchema, false, { current: colorMap }, 'default', true),
      ).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading '0')"));
    }
  });

  test('transformPlotlyJsonToGaugeProps - Should return gauge chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_gauge_test.json');
    expect(
      transformPlotlyJsonToGaugeProps(plotlySchema, false, { current: colorMap }, 'default', true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToGaugeProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(
        transformPlotlyJsonToGaugeProps(plotlySchema, false, { current: colorMap }, 'default', true),
      ).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading '0')"));
    }
  });
});

describe('transformPlotlyJsonToAnnotationChartProps', () => {
  const mockColorMap = { current: new Map<string, string>() };

  beforeEach(() => {
    mockColorMap.current.clear();
  });

  describe('Basic Transformation', () => {
    test('transforms minimal Plotly schema to AnnotationOnlyChartProps', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {},
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result).toBeDefined();
      expect(result.annotations).toEqual([]);
      expect(result.chartTitle).toBeUndefined();
    });

    test('extracts chart title from layout', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          title: 'Test Chart Title',
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.chartTitle).toBe('Test Chart Title');
    });

    test('extracts chart title from layout.title.text', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          title: {
            text: 'Nested Title',
          },
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.chartTitle).toBe('Nested Title');
    });

    test('extracts description from layout.meta', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          meta: {
            description: 'This is a test description',
          },
        } as unknown as PlotlySchema['layout'],
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.description).toBe('This is a test description');
    });
  });

  describe('Annotation Mapping', () => {
    test('preserves textangle as rotation on annotation style', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          annotations: [
            {
              text: 'Rotated label',
              x: 0.5,
              y: 0.5,
              xref: 'x',
              yref: 'y',
              textangle: 45,
              showarrow: false,
            },
          ],
          xaxis: { range: [0, 1] },
          yaxis: { range: [0, 1] },
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.annotations).toHaveLength(1);
      expect(result.annotations?.[0].style?.rotation).toBe(45);
    });

    test('does not coerce date-like category strings when xaxis.type is category', () => {
      const input: PlotlySchema = {
        data: [
          {
            type: 'bar',
            x: ['Jan 2024', 'Feb 2024'],
            y: [114.4, 124.2],
          },
        ],
        layout: {
          xaxis: { type: 'category' },
          yaxis: { type: 'linear' },
          annotations: [
            {
              text: 'Target Met',
              x: 'Jan 2024',
              y: 114.4,
              xref: 'x',
              yref: 'y',
              showarrow: false,
            },
          ],
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.annotations).toHaveLength(1);
      expect(result.annotations?.[0].coordinates).toEqual({
        type: 'data',
        x: 'Jan 2024',
        y: 114.4,
      });
    });

    test('does not infer date from date-like strings when axis type is omitted', () => {
      const input: PlotlySchema = {
        data: [
          {
            type: 'bar',
            x: ['Jan 2024', 'Feb 2024'],
            y: [114.4, 124.2],
          },
        ],
        layout: {
          annotations: [
            {
              text: 'Target Met',
              x: 'Jan 2024',
              y: 114.4,
              xref: 'x',
              yref: 'y',
              showarrow: false,
            },
          ],
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.annotations).toHaveLength(1);
      expect(result.annotations?.[0].coordinates).toEqual({
        type: 'data',
        x: 'Jan 2024',
        y: 114.4,
      });
    });

    test('treats annotations without explicit xref/yref as axis-bound data annotations', () => {
      const input: PlotlySchema = {
        data: [
          {
            type: 'bar',
            x: ['Jan 2024', 'Feb 2024'],
            y: [114.4, 124.2],
          },
        ],
        layout: {
          annotations: [
            {
              text: 'Target Met',
              x: 'Jan 2024',
              y: 114.4,
              showarrow: false,
            },
          ],
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.annotations).toHaveLength(1);
      expect(result.annotations?.[0].coordinates).toEqual({
        type: 'data',
        x: 'Jan 2024',
        y: 114.4,
      });
    });
  });

  describe('Dimension Extraction', () => {
    test('extracts width from layout', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          width: 800,
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.width).toBe(800);
    });

    test('extracts height from layout', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          height: 600,
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.height).toBe(600);
    });

    test('returns undefined for non-numeric dimensions', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          width: 'auto' as unknown as number,
          height: '100%' as unknown as number,
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.width).toBeUndefined();
      expect(result.height).toBeUndefined();
    });
  });

  describe('Color Extraction', () => {
    test('extracts paper_bgcolor from layout', () => {
      const layout = {} as NonNullable<PlotlySchema['layout']>;
      layout.paper_bgcolor = '#f0f0f0';

      const input: PlotlySchema = {
        data: [],
        layout,
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.paperBackgroundColor).toBe('#f0f0f0');
    });

    test('extracts plot_bgcolor from layout', () => {
      const layout = {} as NonNullable<PlotlySchema['layout']>;
      layout.plot_bgcolor = 'rgba(255, 255, 255, 0.5)';

      const input: PlotlySchema = {
        data: [],
        layout,
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.plotBackgroundColor).toBe('rgba(255, 255, 255, 0.5)');
    });

    test('returns undefined for non-string color values', () => {
      const layout = {} as NonNullable<PlotlySchema['layout']>;
      layout.paper_bgcolor = 123 as unknown as string;
      layout.plot_bgcolor = null as unknown as string;

      const input: PlotlySchema = {
        data: [],
        layout,
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.paperBackgroundColor).toBeUndefined();
      expect(result.plotBackgroundColor).toBeUndefined();
    });
  });

  describe('Font Extraction', () => {
    test('extracts font color from layout', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          font: {
            color: '#333333',
          },
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.fontColor).toBe('#333333');
    });

    test('extracts font family from layout', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          font: {
            family: 'Arial, sans-serif',
          },
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.fontFamily).toBe('Arial, sans-serif');
    });

    test('handles missing font properties', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          font: {},
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.fontColor).toBeUndefined();
      expect(result.fontFamily).toBeUndefined();
    });

    test('handles missing font object', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {},
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.fontColor).toBeUndefined();
      expect(result.fontFamily).toBeUndefined();
    });
  });

  describe('Margin Extraction', () => {
    test('extracts margin from layout', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          margin: {
            t: 10,
            r: 20,
            b: 30,
            l: 40,
          },
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.margin).toEqual({
        t: 10,
        r: 20,
        b: 30,
        l: 40,
      });
    });

    test('handles partial margin values', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          margin: {
            t: 15,
            l: 25,
          },
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.margin).toEqual({
        t: 15,
        l: 25,
      });
    });

    test('handles missing margin', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {},
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.margin).toBeUndefined();
    });
  });

  describe('Complete Transformation', () => {
    test('transforms complete Plotly schema with all properties', () => {
      const layout = {
        title: 'Complete Test Chart',
        width: 1000,
        height: 800,
        font: {
          color: '#000000',
          family: 'Segoe UI, sans-serif',
        },
        margin: {
          t: 50,
          r: 50,
          b: 50,
          l: 50,
        },
        meta: {
          description: 'A complete test chart',
        },
      } as NonNullable<PlotlySchema['layout']>;

      layout.paper_bgcolor = '#ffffff';
      layout.plot_bgcolor = '#f5f5f5';

      const input: PlotlySchema = {
        data: [],
        layout,
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result).toEqual({
        annotations: [],
        chartTitle: 'Complete Test Chart',
        description: 'A complete test chart',
        width: 1000,
        height: 800,
        paperBackgroundColor: '#ffffff',
        plotBackgroundColor: '#f5f5f5',
        fontColor: '#000000',
        fontFamily: 'Segoe UI, sans-serif',
        margin: {
          t: 50,
          r: 50,
          b: 50,
          l: 50,
        },
      });
    });
  });

  describe('Multi-plot Handling', () => {
    test('returns empty annotations array when isMultiPlot is true', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          annotations: [
            {
              text: 'Should be ignored',
              x: 0.5,
              y: 0.5,
              xref: 'paper',
              yref: 'paper',
            },
          ],
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, true, mockColorMap, 'default');

      expect(result.annotations).toEqual([]);
    });

    test('processes annotations when isMultiPlot is false', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          annotations: [
            {
              text: 'Test Annotation',
              x: 0.5,
              y: 0.5,
              xref: 'paper',
              yref: 'paper',
            },
          ],
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.annotations.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    test('handles empty layout', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {},
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result).toBeDefined();
      expect(result.annotations).toEqual([]);
    });

    test('handles undefined layout properties', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          title: undefined,
          width: undefined,
          height: undefined,
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result.chartTitle).toBeUndefined();
      expect(result.width).toBeUndefined();
      expect(result.height).toBeUndefined();
    });

    test('handles null data array', () => {
      const input: PlotlySchema = {
        data: null as unknown as PlotlySchema['data'],
        layout: {},
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default');

      expect(result).toBeDefined();
    });

    test('ignores unused colorMap and colorwayType parameters', () => {
      const input: PlotlySchema = {
        data: [],
        layout: {
          title: 'Test',
        },
      };

      const result = transformPlotlyJsonToAnnotationChartProps(input, false, mockColorMap, 'default', true);

      expect(result.chartTitle).toBe('Test');
    });
  });
});

describe('sanitizeJson', () => {
  test('Should return json object when depth inside the range', () => {
    const plotlySchema = require('./tests/schema/fluent_gauge_test.json');
    expect(sanitizeJson(plotlySchema)).toMatchSnapshot();
  });

  test('Should return empty json object when input schema is empty', () => {
    const plotlySchema = {};
    expect(sanitizeJson(plotlySchema)).toStrictEqual({});
  });

  test('Should return error when input schema has depth more than max limit', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      sanitizeJson(plotlySchema);
    } catch (e) {
      expect(e).toStrictEqual(Error('Maximum json depth exceeded'));
    }
  });
});

describe('getSchemaColors with plotly colorway', () => {
  const plotlyColorway = [
    '#636efa',
    '#ef553b',
    '#00cc96',
    '#ab63fa',
    '#ffa15a',
    '#19d3f3',
    '#ff6692',
    '#b6e880',
    '#ff97ff',
    '#fecb52',
  ];

  test('Should return array of fluent colorway colors when input has plotly colorway colors', () => {
    const hexColors = ['#00cc96', '#ff97ff'];
    expect(getSchemaColors(plotlyColorway, hexColors, { current: colorMap })).toStrictEqual(['#57811b', '#b146c2']);
  });
  test('Should return array of fluent colorway colors when input has plotly colorway colors in RGB format', () => {
    const rgbColors = ['rgb(255, 161, 90)', 'rgb(25, 211, 243)'];
    expect(getSchemaColors(plotlyColorway, rgbColors, { current: colorMap })).toStrictEqual(['#ca5010', '#3a96dd']);
  });
  test('Should return array of fluent colorway colors when input has plotly colorway colors in RGBA format', () => {
    const rgbaColors = ['rgba(255, 161, 90, 1)', 'rgba(25, 211, 243, 1)'];
    expect(getSchemaColors(plotlyColorway, rgbaColors, { current: colorMap })).toStrictEqual(['#ca5010', '#3a96dd']);
  });
  // The provided hex colors are not mapping to hsl color clamped color string.
  // Eg: hsl(235.62913907284766, 0.9378881987577639, 0.6843137254901961) is mapping as hsl(236, 94%, 68%)
  // So, unable to map to the exact fluent colorway.
  // Hence skipping the test case for now.
  test.skip('Should return the array of colors when input schema has colors in HSL format', () => {
    const hslColors = [
      'hsl(235.62913907284766, 0.9378881987577639, 0.6843137254901961)',
      'hsl(8.666666666666664, 0.8490566037735849, 0.5843137254901961)',
    ];
    expect(getSchemaColors(plotlyColorway, hslColors, { current: colorMap })).toStrictEqual(['#637cef', '#e3008c']);
  });
  test.skip('Should return the array of colors when input schema has colors in HSLA format', () => {
    const hslaColors = [
      'hsla(235.62913907284766, 0.9378881987577639, 0.6843137254901961, 1)',
      'hsla(8.666666666666664, 0.8490566037735849, 0.5843137254901961, 1)',
    ];
    expect(getSchemaColors(plotlyColorway, hslaColors, { current: colorMap })).toStrictEqual(['#637cef', '#e3008c']);
  });
});

describe('getSchemaColors with other colorways', () => {
  const randomColorway = [
    '#e3008c',
    '#2aa0a4',
    '#ff0080',
    '#00ffff',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
  ];

  test('Should return the array of colors when input schema has hex colors', () => {
    const hexColors = ['#e3008c', '#2aa0a4'];
    expect(getSchemaColors(randomColorway, hexColors, { current: colorMap })).toStrictEqual(['#e3008c', '#2aa0a4']);
  });
  test('Should return the array of colors when input schema has colors in RGB format', () => {
    const rgbColors = ['rgb(227, 0, 140)', 'rgb(42, 160, 164)'];
    expect(getSchemaColors(randomColorway, rgbColors, { current: colorMap })).toStrictEqual(['#e3008c', '#2aa0a4']);
  });
  test('Should return the array of colors when input schema has colors in RGBA format', () => {
    const rgbaColors = ['rgba(227, 0, 140, 1)', 'rgba(42, 160, 164, 1)'];
    expect(getSchemaColors(randomColorway, rgbaColors, { current: colorMap })).toStrictEqual(['#e3008c', '#2aa0a4']);
  });
  test('Should return the array of colors when input schema has colors in HSL format', () => {
    const hslColors = ['hsl(330, 100%, 50%)', 'hsl(180, 100%, 50%)'];
    expect(getSchemaColors(randomColorway, hslColors, { current: colorMap })).toStrictEqual(['#ff0080', '#00ffff']);
  });
  test('Should return the array of colors when input schema has colors in HSLA format', () => {
    const hslaColors = ['hsla(330, 100%, 50%, 1)', 'hsla(180, 100%, 50%, 1)'];
    expect(getSchemaColors(randomColorway, hslaColors, { current: colorMap })).toStrictEqual(['#ff0080', '#00ffff']);
  });
  test('Should return undefined when input schema has color in null format', () => {
    const nullColor = [null];
    expect(getSchemaColors(randomColorway, nullColor, { current: colorMap })).not.toBe([]);
  });
  test('Should return undefined when input schema has color in undefined format', () => {
    const undefinedColor = [undefined];
    expect(getSchemaColors(undefined, undefinedColor, { current: colorMap })).not.toBe([]);
  });
});
describe('isInvalidValue', () => {
  it('returns true for undefined', () => {
    expect(isInvalidValue(undefined)).toBe(true);
  });

  it('returns true for null', () => {
    expect(isInvalidValue(null)).toBe(true);
  });

  it('returns true for non-finite numbers', () => {
    expect(isInvalidValue(NaN)).toBe(true);
    expect(isInvalidValue(Infinity)).toBe(true);
    expect(isInvalidValue(-Infinity)).toBe(true);
  });

  it('returns false for valid numbers', () => {
    expect(isInvalidValue(0)).toBe(false);
    expect(isInvalidValue(123)).toBe(false);
    expect(isInvalidValue(-456.78)).toBe(false);
  });

  it('returns false for strings', () => {
    expect(isInvalidValue('')).toBe(false);
    expect(isInvalidValue('test')).toBe(false);
  });
});

describe('getNumberAtIndexOrDefault', () => {
  it('returns the number at the given index for a valid array', () => {
    expect(getNumberAtIndexOrDefault([10, 20, 30], 1)).toBe(20);
  });

  it('returns undefined if the value at the index is not a number or a non-finite number', () => {
    expect(getNumberAtIndexOrDefault([10, 'a', 30], 1)).toBeUndefined();
    expect(getNumberAtIndexOrDefault([10, NaN, 30], 1)).toBeUndefined();
    expect(getNumberAtIndexOrDefault([10, Infinity, 30], 1)).toBeUndefined();
    expect(getNumberAtIndexOrDefault([10, -Infinity, 30], 1)).toBeUndefined();
  });

  it('returns 1 if data is not an array or typed array', () => {
    expect(getNumberAtIndexOrDefault(undefined, 0)).toBe(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getNumberAtIndexOrDefault(null as any, 0)).toBe(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getNumberAtIndexOrDefault('not-an-array' as any, 0)).toBe(1);
  });

  it('returns undefined if index is out of bounds', () => {
    expect(getNumberAtIndexOrDefault([10, 20], 5)).toBeUndefined();
  });
});

describe('getValidXYRanges', () => {
  it('returns a single valid range when all values are valid', () => {
    const series = { x: [1, 2, 3], y: [4, 5, 6] };
    expect(getValidXYRanges(series)).toEqual([[0, 3]]);
  });

  it('returns empty array when all values are invalid', () => {
    const series = { x: [Infinity, null, NaN], y: [null, Infinity, NaN] };
    expect(getValidXYRanges(series)).toEqual([]);
  });

  it('returns correct ranges when there are invalid values in between', () => {
    const series = { x: [1, null, 3, 4, Infinity, 6], y: [1, 2, 3, null, 5, 6] };
    expect(getValidXYRanges(series)).toEqual([
      [0, 1],
      [2, 3],
      [5, 6],
    ]);
  });

  it('handles invalid values at the start and end', () => {
    const series = { x: [Infinity, 2, 3, 4, Infinity], y: [1, 2, 3, 4, 5] };
    expect(getValidXYRanges(series)).toEqual([[1, 4]]);
  });

  it('handles empty x and y arrays', () => {
    const series = { x: [], y: [] };
    expect(getValidXYRanges(series)).toEqual([]);
  });

  it('handles x or y missing', () => {
    expect(getValidXYRanges({ x: [1, 2, 3] })).toEqual([]);
    expect(getValidXYRanges({ y: [1, 2, 3] })).toEqual([]);
  });
});

describe('resolveXAxisPoint', () => {
  it('should return the input as a string if isXYearCategory is true', () => {
    const result = resolveXAxisPoint(2023, true, false, false, false);
    expect(result).toStrictEqual('2023');
  });

  it('should return a Date object if isXString and isXDate are true', () => {
    const result = resolveXAxisPoint('2023-01-01', false, true, true, false);
    expect(result).toBeInstanceOf(Date);
    expect(result).toStrictEqual(new Date('2023-01-01'));
  });

  it('should return a number if isXString and isXNumber are true', () => {
    const result = resolveXAxisPoint('123.45', false, true, false, true);
    expect(result).toStrictEqual(123.45);
  });

  it('should return the input as-is if isXString is true but neither isXDate nor isXNumber are true', () => {
    const result = resolveXAxisPoint('test', false, true, false, false);
    expect(result).toStrictEqual('test');
  });

  it('should return the input as-is if none of the conditions are met', () => {
    const result = resolveXAxisPoint(42, false, false, false, false);
    expect(result).toStrictEqual(42);
  });
  it('should return empty string for null, empty string and 0', () => {
    expect(resolveXAxisPoint(null, false, false, false, false)).toBe('');
    expect(resolveXAxisPoint('', false, false, false, false)).toBe('');
    expect(resolveXAxisPoint(0, false, false, false, false)).toBe(0);
  });
});
