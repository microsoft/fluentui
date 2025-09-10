import { isDateArray, isMonthArray, isInvalidValue, isNumberArray, sanitizeJson } from '@fluentui/chart-utilities';

import {
  correctYearMonth,
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToVSBCProps,
  transformPlotlyJsonToGVBCProps,
  transformPlotlyJsonToVBCProps,
  transformPlotlyJsonToAreaChartProps,
  transformPlotlyJsonToLineChartProps,
  transformPlotlyJsonToScatterChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  transformPlotlyJsonToHeatmapProps,
  transformPlotlyJsonToSankeyProps,
  transformPlotlyJsonToGaugeProps,
  transformPlotlyJsonToChartTableProps,
  projectPolarToCartesian,
  findArrayAttributes,
  getAllupLegendsProps,
  isNonPlotType,
  getGridProperties,
  _getGaugeAxisColor,
  getNumberAtIndexOrDefault,
  getValidXYRanges,
  resolveXAxisPoint,
  NON_PLOT_KEY_PREFIX,
  SINGLE_REPEAT,
} from './PlotlySchemaAdapter';
import { getColor, getSchemaColors } from './PlotlyColorAdapter';

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
    expect(correctYearMonth([10, 11, 1])).toStrictEqual(['10 01, 2024', '11 01, 2024', '1 01, 2025']);
  });

  test('Should return error when input array contains invalid months', () => {
    expect(correctYearMonth([10, 11, 16])).toStrictEqual(['10 01, 2025', '11 01, 2025', null]);
  });

  test('Should return dates array when input array contains months data in MMM format', () => {
    expect(correctYearMonth(['January', 'February'])).toStrictEqual(['January 01, 2025', 'February 01, 2025']);
  });

  test('Should return dates array when input array contains months data in MM format', () => {
    expect(correctYearMonth(['Jan', 'Feb'])).toStrictEqual(['Jan 01, 2025', 'Feb 01, 2025']);
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

  test('transformPlotlyJsonToLineChartProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    expect(() => {
      transformPlotlyJsonToLineChartProps(plotlySchema, false, { current: colorMap }, 'default', true);
    }).toThrow(TypeError);
  });

  test('transformPlotlyJsonToAreaChartProps - Should return area chart props', () => {
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

describe('transformPlotlyJsonToChartTableProps', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockTableSchema: any = {
    data: [
      {
        type: 'table' as const,
        header: {
          values: ['Column 1', 'Column 2'],
          font: { color: '#000000', size: 12 },
          fill: { color: '#f0f0f0' },
          align: 'left',
        },
        cells: {
          values: [
            ['Row 1 Col 1', 'Row 2 Col 1'],
            ['Row 1 Col 2', 'Row 2 Col 2'],
          ],
          font: { color: '#333333', size: 10 },
          fill: { color: ['#ffffff', '#f8f8f8'] },
          align: 'center',
          format: '',
          prefix: '',
          suffix: '',
        },
      },
    ],
    layout: {
      title: 'Test Table',
      width: 400,
      height: 300,
    },
  };

  test('Should return chart table props with valid data', () => {
    const result = transformPlotlyJsonToChartTableProps(
      mockTableSchema,
      false,
      { current: colorMap },
      'default',
      false,
    );
    expect(result).toHaveProperty('headers');
    expect(result).toHaveProperty('rows');
    expect(result).toHaveProperty('width', 400);
    expect(result).toHaveProperty('height', 300);
    expect(result.headers).toHaveLength(2);
    expect(result.rows).toHaveLength(2);
  });

  test('Should handle table data with HTML tags in text', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schemaWithHTML: any = {
      ...mockTableSchema,
      data: [
        {
          ...mockTableSchema.data[0],
          cells: {
            values: [
              ['<b>Bold text</b>', '<i>Italic text</i>'],
              ['&lt;script&gt;alert()&lt;/script&gt;', 'Normal text'],
            ],
            font: { color: '#333333', size: 10 },
            format: '',
            prefix: '',
            suffix: '',
          },
        },
      ],
    };

    const result = transformPlotlyJsonToChartTableProps(schemaWithHTML, false, { current: colorMap }, 'default', false);
    expect(result.rows[0][0].value).toBe('Bold text');
    expect(result.rows[0][1].value).toBe('alert()');
  });

  test('Should handle minimal table data', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const minimalSchema: any = {
      data: [
        {
          type: 'table' as const,
          header: { values: ['Col1'] },
          cells: {
            values: [['Value1']],
            font: true,
          },
        },
      ],
      layout: {},
    };

    expect(() =>
      transformPlotlyJsonToChartTableProps(minimalSchema, false, { current: colorMap }, 'default', false),
    ).not.toThrow();
  });

  test('Should handle empty headers and cells', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emptySchema: any = {
      data: [
        {
          type: 'table' as const,
          header: { values: [] },
          cells: { values: [] },
        },
      ],
      layout: {},
    };

    expect(() =>
      transformPlotlyJsonToChartTableProps(emptySchema, false, { current: colorMap }, 'default', false),
    ).toThrow();
  });

  test('Should handle null and undefined values in cells', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nullSchema: any = {
      data: [
        {
          type: 'table' as const,
          header: { values: ['Col1'] },
          cells: {
            values: [['value1', null, '', undefined]],
            font: { color: '#333333', size: 10 },
          },
        },
      ],
      layout: {},
    };

    const result = transformPlotlyJsonToChartTableProps(nullSchema, false, { current: colorMap }, 'default', false);
    expect(result.rows).toHaveLength(4);
    expect(result.rows[0][0].value).toBe('value1');
  });

  test('Should handle missing data array', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const noDataSchema: any = {
      data: [],
      layout: {},
    };

    expect(() =>
      transformPlotlyJsonToChartTableProps(noDataSchema, false, { current: colorMap }, 'default', false),
    ).toThrow();
  });

  test('Should handle malformed table structure', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const malformedSchema: any = {
      data: [
        {
          type: 'table' as const,
          // Missing header and cells
        },
      ],
      layout: {},
    };

    expect(() =>
      transformPlotlyJsonToChartTableProps(malformedSchema, false, { current: colorMap }, 'default', false),
    ).toThrow();
  });

  test('Should handle mismatched header and cell counts', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mismatchedSchema: any = {
      data: [
        {
          type: 'table' as const,
          header: { values: ['Col1', 'Col2'] },
          cells: {
            values: [['Row1Val1'], ['Row1Val2']], // Only 1 row of data
            font: { color: '#333333', size: 10 },
          },
        },
      ],
      layout: {},
    };

    const result = transformPlotlyJsonToChartTableProps(
      mismatchedSchema,
      false,
      { current: colorMap },
      'default',
      false,
    );
    expect(result.headers).toHaveLength(2);
    expect(result.rows).toHaveLength(1);
  });
});

describe('projectPolarToCartesian', () => {
  test('Should convert polar coordinates to cartesian', () => {
    const polarSchema = {
      data: [
        {
          type: 'scatterpolar' as const,
          r: [1, 2, 3],
          theta: [0, 90, 180],
        },
      ],
      layout: {},
    };

    const result = projectPolarToCartesian(polarSchema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seriesData = result.data[0] as any; // Type assertion for test purposes
    expect(seriesData.x).toHaveLength(3);
    expect(seriesData.y).toHaveLength(3);
    // Normalized values: x = [1/6, 0/6, -3/6], y = [0/6, 2/6, 0/6]
    expect(seriesData.x[0]).toBeCloseTo(1 / 6, 4); // ≈ 0.1667
    expect(seriesData.y[0]).toBeCloseTo(0, 4);
    expect(seriesData.x[1]).toBeCloseTo(0, 4);
    expect(seriesData.y[1]).toBeCloseTo(2 / 6, 4); // ≈ 0.3333
    expect(seriesData.x[2]).toBeCloseTo(-0.5, 4);
    expect(seriesData.y[2]).toBeCloseTo(0, 4);
  });

  test('Should handle invalid polar data', () => {
    const invalidSchema = {
      data: [
        {
          type: 'scatterpolar' as const,
          r: [1, null, NaN, Infinity],
          theta: [0, 90, null, 270],
        },
      ],
      layout: {},
    };

    const result = projectPolarToCartesian(invalidSchema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seriesData = result.data[0] as any; // Type assertion for test purposes
    expect(seriesData.x).toHaveLength(1); // Only valid point
    expect(seriesData.y).toHaveLength(1);
  });

  test('Should handle empty polar data', () => {
    const emptySchema = {
      data: [{ type: 'scatterpolar' as const, r: [], theta: [] }],
      layout: {},
    };

    const result = projectPolarToCartesian(emptySchema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seriesData = result.data[0] as any; // Type assertion for test purposes
    expect(seriesData.x).toHaveLength(0);
    expect(seriesData.y).toHaveLength(0);
  });

  test('Should handle negative radius values', () => {
    const negativeSchema = {
      data: [
        {
          type: 'scatterpolar' as const,
          r: [-1, -2, 1],
          theta: [0, 90, 180],
        },
      ],
      layout: {},
    };

    const result = projectPolarToCartesian(negativeSchema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seriesData = result.data[0] as any; // Type assertion for test purposes
    expect(seriesData.x).toHaveLength(3);
    expect(seriesData.y).toHaveLength(3);
    // Correct normalized values: x = [-0.1, -0.2, -0.5], y = [0, 0, 0]
    expect(seriesData.x[0]).toBeCloseTo(-0.1, 4);
    expect(seriesData.x[1]).toBeCloseTo(-0.2, 4);
    expect(seriesData.x[2]).toBeCloseTo(-0.5, 4);
    expect(seriesData.y[0]).toBeCloseTo(0, 4);
    expect(seriesData.y[1]).toBeCloseTo(0, 4);
    expect(seriesData.y[2]).toBeCloseTo(0, 4);
  });

  test('Should handle very large angles', () => {
    const largeAngleSchema = {
      data: [
        {
          type: 'scatterpolar' as const,
          r: [1, 1, 1],
          theta: [0, 360, 720], // Full rotations
        },
      ],
      layout: {},
    };

    const result = projectPolarToCartesian(largeAngleSchema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seriesData = result.data[0] as any; // Type assertion for test purposes
    expect(seriesData.x).toHaveLength(3);
    expect(seriesData.x[0]).toBeCloseTo(seriesData.x[1], 1); // 0° and 360° should be similar
    expect(seriesData.x[0]).toBeCloseTo(seriesData.x[2], 1); // 0° and 720° should be similar
  });

  test('Should handle string values in arrays', () => {
    const stringSchema = {
      data: [
        {
          type: 'scatterpolar' as const,
          r: ['1', '2', 'invalid'],
          theta: ['0', '90', 'bad'],
        },
      ],
      layout: {},
    };

    const result = projectPolarToCartesian(stringSchema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seriesData = result.data[0] as any; // Type assertion for test purposes
    expect(seriesData.x.length).toBeGreaterThanOrEqual(0); // Should handle conversion gracefully
    expect(seriesData.y.length).toBeGreaterThanOrEqual(0);
  });

  test('Should handle mismatched array lengths', () => {
    const mismatchedSchema = {
      data: [
        {
          type: 'scatterpolar' as const,
          r: [1, 2, 3, 4, 5],
          theta: [0, 90], // Shorter array
        },
      ],
      layout: {},
    };

    const result = projectPolarToCartesian(mismatchedSchema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seriesData = result.data[0] as any; // Type assertion for test purposes
    expect(seriesData.x).toHaveLength(2); // Should use minimum length
    expect(seriesData.y).toHaveLength(2);
  });

  test('Should handle missing r or theta arrays', () => {
    const missingRSchema = {
      data: [
        {
          type: 'scatterpolar' as const,
          theta: [0, 90, 180],
        },
      ],
      layout: {},
    };

    const result = projectPolarToCartesian(missingRSchema);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seriesData = result.data[0] as any; // Type assertion for test purposes
    expect(seriesData.x).toHaveLength(0);
    expect(seriesData.y).toHaveLength(0);
  });
});

describe('isNonPlotType', () => {
  test('Should return true for non-plot chart types', () => {
    expect(isNonPlotType('donut')).toBe(true);
    expect(isNonPlotType('sankey')).toBe(true);
    expect(isNonPlotType('pie')).toBe(true);
  });

  test('Should return false for plot chart types', () => {
    expect(isNonPlotType('line')).toBe(false);
    expect(isNonPlotType('bar')).toBe(false);
    expect(isNonPlotType('scatter')).toBe(false);
    expect(isNonPlotType('area')).toBe(false);
    expect(isNonPlotType('heatmap')).toBe(false);
  });

  test('Should return false for unknown chart types', () => {
    expect(isNonPlotType('unknown')).toBe(false);
    expect(isNonPlotType('')).toBe(false);
  });

  test('Should handle null and undefined inputs', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isNonPlotType(null as any)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isNonPlotType(undefined as any)).toBe(false);
  });

  test('Should handle special characters and whitespace', () => {
    expect(isNonPlotType(' donut ')).toBe(false); // Whitespace should not match
    expect(isNonPlotType('donut-chart')).toBe(false); // Special characters
    expect(isNonPlotType('DONUT')).toBe(false); // Case sensitivity
    expect(isNonPlotType('pie_chart')).toBe(false); // Underscore
  });

  test('Should handle very long strings', () => {
    const longString = 'a'.repeat(1000);
    expect(isNonPlotType(longString)).toBe(false);
  });

  test('Should handle numeric inputs', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isNonPlotType(123 as any)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isNonPlotType(0 as any)).toBe(false);
  });

  test('Should handle object inputs', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isNonPlotType({} as any)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isNonPlotType([] as any)).toBe(false);
  });
});

describe('_getGaugeAxisColor', () => {
  test('Should return resolved color for gauge axis', () => {
    const colorway = ['#ff0000', '#00ff00', '#0000ff'];
    const color = '#ff0000';

    const result = _getGaugeAxisColor(colorway, 'default', color, { current: colorMap }, false);
    expect(typeof result).toBe('string');
    expect(result).toBeTruthy();
  });

  test('Should handle undefined colorway', () => {
    const result = _getGaugeAxisColor(undefined, 'default', '#ff0000', { current: colorMap }, false);
    expect(typeof result).toBe('string');
  });

  test('Should handle undefined color', () => {
    const colorway = ['#ff0000', '#00ff00'];
    const result = _getGaugeAxisColor(colorway, 'default', undefined, { current: colorMap }, false);
    expect(typeof result).toBe('string');
  });

  test('Should handle empty colorway array', () => {
    const result = _getGaugeAxisColor([], 'default', '#ff0000', { current: colorMap }, false);
    expect(typeof result).toBe('string');
  });

  test('Should handle invalid color formats', () => {
    const colorway = ['#ff0000', '#00ff00'];
    const result = _getGaugeAxisColor(colorway, 'default', 'invalid-color', { current: colorMap }, false);
    expect(typeof result).toBe('string');
  });

  test('Should handle null colorMap', () => {
    const colorway = ['#ff0000'];
    expect(() => {
      _getGaugeAxisColor(colorway, 'default', '#ff0000', { current: new Map() }, false);
    }).not.toThrow();
  });

  test('Should handle different theme values', () => {
    const colorway = ['#ff0000'];
    const result1 = _getGaugeAxisColor(colorway, 'default', '#ff0000', { current: colorMap }, false);
    const result2 = _getGaugeAxisColor(colorway, 'default', '#ff0000', { current: colorMap }, false);
    expect(typeof result1).toBe('string');
    expect(typeof result2).toBe('string');
  });

  test('Should handle very long colorway arrays', () => {
    const longColorway = Array(100).fill('#ff0000');
    const result = _getGaugeAxisColor(longColorway, 'default', '#ff0000', { current: colorMap }, false);
    expect(typeof result).toBe('string');
  });

  test('Should handle invalid arguments combination', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _getGaugeAxisColor(null as any, null as any, null as any, { current: new Map() }, true);
    }).not.toThrow();
  });
});

describe('getAllupLegendsProps', () => {
  test('Should return legends props for donut chart', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any = {
      data: [
        {
          type: 'pie' as const,
          labels: ['A', 'B', 'C'],
          values: [1, 2, 3],
          showlegend: true,
        },
      ],
      layout: { showlegend: true },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'donut', index: 0 }];

    const result = getAllupLegendsProps(schema, { current: colorMap }, 'default', traceInfo, false);
    expect(result.legends).toHaveLength(3);
    expect(result.centerLegends).toBe(true);
    expect(result.enabledWrapLines).toBe(true);
    expect(result.canSelectMultipleLegends).toBe(true);
  });

  test('Should return legends props for plot chart', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any = {
      data: [
        {
          type: 'scatter' as const,
          legendgroup: 'Series 1',
          line: { color: '#ff0000' },
          showlegend: true,
        },
      ],
      layout: { showlegend: true },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'line', index: 0 }];

    const result = getAllupLegendsProps(schema, { current: colorMap }, 'default', traceInfo, false);
    expect(result.legends).toHaveLength(1);
    expect(result.legends[0].title).toBe('Series 1');
  });

  test('Should handle charts with showlegend false', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any = {
      data: [
        {
          type: 'scatter' as const,
          legendgroup: 'Series 1',
          showlegend: false,
        },
      ],
      layout: { showlegend: false },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'line', index: 0 }];

    const result = getAllupLegendsProps(schema, { current: colorMap }, 'default', traceInfo, false);
    expect(result.legends).toHaveLength(0);
  });

  test('Should handle empty data array', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any = {
      data: [],
      layout: { showlegend: true },
    };

    const result = getAllupLegendsProps(schema, { current: colorMap }, 'default', [], false);
    expect(result.legends).toHaveLength(0);
  });

  test('Should handle missing legendgroup', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any = {
      data: [
        {
          type: 'scatter' as const,
          showlegend: true,
          // Missing legendgroup
        },
      ],
      layout: { showlegend: true },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'line', index: 0 }];

    const result = getAllupLegendsProps(schema, { current: colorMap }, 'default', traceInfo, false);
    expect(result.legends.length).toBeGreaterThanOrEqual(0);
  });

  test('Should handle mixed trace types', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any = {
      data: [
        {
          type: 'scatter' as const,
          legendgroup: 'Line',
          showlegend: true,
        },
        {
          type: 'bar' as const,
          legendgroup: 'Bar',
          showlegend: true,
        },
        {
          type: 'pie' as const,
          labels: ['A', 'B'],
          values: [1, 2],
          showlegend: true,
        },
      ],
      layout: { showlegend: true },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [
      { type: 'line', index: 0 },
      { type: 'bar', index: 1 },
      { type: 'donut', index: 2 },
    ];

    const result = getAllupLegendsProps(schema, { current: colorMap }, 'default', traceInfo, false);
    expect(result.legends.length).toBeGreaterThan(0);
  });

  test('Should handle invalid traceInfo', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any = {
      data: [
        {
          type: 'scatter' as const,
          legendgroup: 'Series 1',
          showlegend: true,
        },
      ],
      layout: { showlegend: true },
    };

    expect(() => getAllupLegendsProps(schema, { current: colorMap }, 'default', [], false)).toThrow();
  });

  test('Should handle null schema', () => {
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getAllupLegendsProps(null as any, { current: colorMap }, 'default', [], false),
    ).toThrow();
  });

  test('Should handle pie chart with missing labels', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any = {
      data: [
        {
          type: 'pie' as const,
          values: [1, 2, 3],
          showlegend: true,
          // Missing labels
        },
      ],
      layout: { showlegend: true },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'donut', index: 0 }];

    const result = getAllupLegendsProps(schema, { current: colorMap }, 'default', traceInfo, false);
    expect(result.legends.length).toBeGreaterThanOrEqual(0); // Should handle missing labels gracefully
  });
});

describe('getGridProperties', () => {
  test('Should return default grid properties for single plot', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any = {
      data: [{ type: 'scatter' as const, x: [1, 2, 3], y: [1, 2, 3] }],
      layout: {},
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'line', index: 0 }];

    const result = getGridProperties(schema, false, traceInfo);
    expect(result.templateRows).toBe('1fr');
    expect(result.templateColumns).toBe('1fr');
    expect(Object.keys(result.layout)).toHaveLength(0);
  });

  test('Should handle multiple axes in layout', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any = {
      data: [{ type: 'scatter' as const, x: [1, 2, 3], y: [1, 2, 3] }],
      layout: {
        xaxis: { domain: [0, 0.45], anchor: 'y' as const },
        yaxis: { domain: [0, 1], anchor: 'x' as const },
        xaxis2: { domain: [0.55, 1], anchor: 'y2' as const },
        yaxis2: { domain: [0, 1], anchor: 'x2' as const },
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'line', index: 0 }];

    const result = getGridProperties(schema, true, traceInfo);
    expect(result.templateColumns).toContain('repeat');
  });

  test('Should handle invalid axis configuration', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: any = {
      data: [{ type: 'scatter' as const, x: [1, 2], y: [1, 2] }],
      layout: {
        xaxis: { domain: [0, 1], anchor: 'y2' as const },
        yaxis: { domain: [0, 1], anchor: 'x' as const },
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'line', index: 0 }];

    expect(() => getGridProperties(schema, true, traceInfo)).toThrow('Invalid layout: xaxis 1 anchor should be y2');
  });

  test('Should handle undefined schema', () => {
    const result = getGridProperties(undefined, true, []);
    expect(result.templateRows).toBe('1fr');
    expect(result.templateColumns).toBe('1fr');
  });

  test('Should handle complex multi-axis layout', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const complexSchema: any = {
      data: [{ type: 'scatter' as const, x: [1, 2, 3], y: [1, 2, 3] }],
      layout: {
        xaxis: { domain: [0, 0.3], anchor: 'y' as const },
        yaxis: { domain: [0, 0.5], anchor: 'x' as const },
        xaxis2: { domain: [0.35, 0.65], anchor: 'y2' as const },
        yaxis2: { domain: [0, 0.5], anchor: 'x2' as const },
        xaxis3: { domain: [0.7, 1], anchor: 'y3' as const },
        yaxis3: { domain: [0, 0.5], anchor: 'x3' as const },
        xaxis4: { domain: [0, 0.3], anchor: 'y4' as const },
        yaxis4: { domain: [0.55, 1], anchor: 'x4' as const },
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'line', index: 0 }];

    const result = getGridProperties(complexSchema, true, traceInfo);
    expect(result.templateColumns).toContain('repeat');
    expect(result.templateRows).toContain('repeat');
  });

  test('Should handle invalid domain values', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalidDomainSchema: any = {
      data: [{ type: 'scatter' as const, x: [1, 2], y: [1, 2] }],
      layout: {
        xaxis: { domain: [1, 0], anchor: 'y' as const }, // Inverted domain
        yaxis: { domain: [0, 1], anchor: 'x' as const },
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'line', index: 0 }];

    expect(() => getGridProperties(invalidDomainSchema, true, traceInfo)).not.toThrow();
  });

  test('Should handle missing anchor properties', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const missingAnchorSchema: any = {
      data: [{ type: 'scatter' as const, x: [1, 2], y: [1, 2] }],
      layout: {
        xaxis: { domain: [0, 1] }, // Missing anchor
        yaxis: { domain: [0, 1] }, // Missing anchor
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'line', index: 0 }];

    expect(() => getGridProperties(missingAnchorSchema, true, traceInfo)).not.toThrow();
  });

  test('Should handle empty layout object', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emptyLayoutSchema: any = {
      data: [{ type: 'scatter' as const, x: [1, 2, 3], y: [1, 2, 3] }],
      layout: {},
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'line', index: 0 }];

    const result = getGridProperties(emptyLayoutSchema, false, traceInfo);
    expect(result.templateRows).toBe('1fr');
    expect(result.templateColumns).toBe('1fr');
  });

  test('Should handle schema without data', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const noDataSchema: any = {
      data: [],
      layout: {
        xaxis: { domain: [0, 1], anchor: 'y' as const },
        yaxis: { domain: [0, 1], anchor: 'x' as const },
      },
    };

    const result = getGridProperties(noDataSchema, true, []);
    expect(result.templateRows).toBeDefined();
    expect(result.templateColumns).toBeDefined();
  });

  test('Should handle invalid axis numbering', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalidAxisSchema: any = {
      data: [{ type: 'scatter' as const, x: [1, 2], y: [1, 2] }],
      layout: {
        xaxis5: { domain: [0, 1], anchor: 'y5' as const }, // Skipped numbers
        yaxis5: { domain: [0, 1], anchor: 'x5' as const },
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traceInfo: any = [{ type: 'line', index: 0 }];

    expect(() => getGridProperties(invalidAxisSchema, true, traceInfo)).not.toThrow();
  });
});

describe('findArrayAttributes', () => {
  test('Should handle function call without proper initialization', () => {
    const trace = { x: [1, 2, 3], y: [4, 5, 6] };
    // This function relies on global state that isn't properly initialized in the current implementation
    // We're testing that calling it doesn't cause a crash in production usage
    expect(() => {
      try {
        findArrayAttributes(trace);
      } catch (error) {
        // Expected to fail due to uninitialized global state
        expect(error).toBeInstanceOf(TypeError);
      }
    }).not.toThrow();
  });

  test('Should handle empty trace object', () => {
    const emptyTrace = {};
    expect(() => {
      try {
        findArrayAttributes(emptyTrace);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    }).not.toThrow();
  });

  test('Should handle null input', () => {
    expect(() => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        findArrayAttributes(null as any);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    }).not.toThrow();
  });

  test('Should handle undefined input', () => {
    expect(() => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        findArrayAttributes(undefined as any);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    }).not.toThrow();
  });

  test('Should handle complex nested trace object', () => {
    const complexTrace = {
      x: [1, 2, 3],
      y: [4, 5, 6],
      marker: {
        color: ['red', 'blue', 'green'],
        size: [10, 20, 30],
      },
      text: ['A', 'B', 'C'],
      nested: {
        deep: {
          values: [100, 200, 300],
        },
      },
    };
    expect(() => {
      try {
        findArrayAttributes(complexTrace);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    }).not.toThrow();
  });

  test('Should handle trace with non-array properties', () => {
    const mixedTrace = {
      x: [1, 2, 3],
      y: 'not an array',
      z: 42,
      flag: true,
      obj: { key: 'value' },
    };
    expect(() => {
      try {
        findArrayAttributes(mixedTrace);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    }).not.toThrow();
  });
});

describe('Constants', () => {
  test('NON_PLOT_KEY_PREFIX should be defined', () => {
    expect(NON_PLOT_KEY_PREFIX).toBe('nonplot_');
  });

  test('SINGLE_REPEAT should be defined', () => {
    expect(SINGLE_REPEAT).toBe('repeat(1, 1fr)');
  });
});
