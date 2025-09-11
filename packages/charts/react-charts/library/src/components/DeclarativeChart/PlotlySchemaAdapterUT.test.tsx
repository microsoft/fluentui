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
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  transformPlotlyJsonToHeatmapProps,
  transformPlotlyJsonToSankeyProps,
  transformPlotlyJsonToGaugeProps,
  getNumberAtIndexOrDefault,
  getValidXYRanges,
  resolveXAxisPoint,
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
    expect(getColor('test', { current: colorMap }, true)).toBe('#637cef');
  });

  test('Should return color code when we had legend title', () => {
    expect(getColor('test', { current: colorMap }, false)).toBe('#637cef');
  });

  test('Should return color code when we had legend title is empty', () => {
    expect(getColor('', { current: colorMap }, false)).toBe('#f7630c');
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
