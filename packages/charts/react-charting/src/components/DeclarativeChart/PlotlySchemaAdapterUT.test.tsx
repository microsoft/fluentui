import {
  isDateArray,
  isNumberArray,
  isMonthArray,
  updateXValues,
  getColor,
  transformPlotlyJsonToDonutProps,
  transformPlotlyJsonToVSBCProps,
  transformPlotlyJsonToGVBCProps,
  transformPlotlyJsonToVBCProps,
  transformPlotlyJsonToScatterChartProps,
  transformPlotlyJsonToHorizontalBarWithAxisProps,
  transformPlotlyJsonToHeatmapProps,
  transformPlotlyJsonToSankeyProps,
  transformPlotlyJsonToGaugeProps,
  sanitizeJson,
} from './PlotlySchemaAdapter';

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

  test.skip('Should return true when input array contains date in simple date Object format', () => {
    expect(isDateArray([11 / 2 / 2025, 10 / 2 / 2025])).toBe(true);
  });

  test.skip('Should return false when input array is empty', () => {
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

describe('updateXValues', () => {
  test('Should return dates array when input array contains months data', () => {
    expect(updateXValues([10, 11, 1])).toStrictEqual(['10 01, 2024', '11 01, 2024', '1 01, 2025']);
  });

  test('Should return error when input array contains invalid months', () => {
    try {
      expect(updateXValues([10, 11, 16])).toStrictEqual([]);
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of null (reading 'getMonth')"));
    }
  });

  test('Should return dates array when input array contains months data in MMM format', () => {
    expect(updateXValues(['January', 'February'])).toStrictEqual(['January 01, 2025', 'February 01, 2025']);
  });

  test('Should return dates array when input array contains months data in MM format', () => {
    expect(updateXValues(['Jan', 'Feb'])).toStrictEqual(['Jan 01, 2025', 'Feb 01, 2025']);
  });

  test('Should return dates array when input array is empty', () => {
    expect(updateXValues([])).toStrictEqual([]);
  });
});

describe('getColor', () => {
  test('Should return color code when we had legend title', () => {
    expect(getColor('test', { current: colorMap }, true)).toBe('#e3008c');
  });

  test('Should return color code when we had legend title', () => {
    expect(getColor('test', { current: colorMap }, false)).toBe('#e3008c');
  });

  test('Should return color code when we had legend title is empty', () => {
    expect(getColor('', { current: colorMap }, false)).toBe('#2aa0a4');
  });
});

describe('transform Plotly Json To chart Props', () => {
  test('transformPlotlyJsonToDonutProps - Should return donut chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_donut_test.json');
    expect(transformPlotlyJsonToDonutProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToDonutProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(transformPlotlyJsonToDonutProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading '0')"));
    }
  });

  test('transformPlotlyJsonToDonutProps - Should return pie chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_pie_test.json');
    expect(transformPlotlyJsonToDonutProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToVSBCProps - Should return VSBC props', () => {
    const plotlySchema = require('./tests/schema/fluent_verticalstackedbarchart_test.json');
    expect(transformPlotlyJsonToVSBCProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToVSBCProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(transformPlotlyJsonToVSBCProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading 'forEach')"));
    }
  });

  test('transformPlotlyJsonToGVBCProps - Should return GVBC props', () => {
    const plotlySchema = require('./tests/schema/fluent_groupedverticalbarchart_test.json');
    expect(transformPlotlyJsonToGVBCProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToGVBCProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(transformPlotlyJsonToGVBCProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading 'forEach')"));
    }
  });

  test('transformPlotlyJsonToVBCProps - Should return VBC props', () => {
    const plotlySchema = require('./tests/schema/fluent_verticalbar_histogram_test.json');
    expect(transformPlotlyJsonToVBCProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToVBCProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(transformPlotlyJsonToVBCProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading 'forEach')"));
    }
  });

  test('transformPlotlyJsonToScatterChartProps - Should return line chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_line_test.json');
    expect(transformPlotlyJsonToScatterChartProps(plotlySchema, true, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToScatterChartProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(transformPlotlyJsonToScatterChartProps(plotlySchema, true, { current: colorMap }, true)).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading 'map')"));
    }
  });

  test('transformPlotlyJsonToScatterChartProps - Should return area chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_area_test.json');
    expect(transformPlotlyJsonToScatterChartProps(plotlySchema, true, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToHorizontalBarWithAxisProps - Should return HBC with axis chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_horizontalbar_test.json');
    expect(
      transformPlotlyJsonToHorizontalBarWithAxisProps(plotlySchema, { current: colorMap }, true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToHorizontalBarWithAxisProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(
        transformPlotlyJsonToHorizontalBarWithAxisProps(plotlySchema, { current: colorMap }, true),
      ).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading 'map')"));
    }
  });

  test('transformPlotlyJsonToHeatmapProps - Should return heatmap chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_heatmap_test.json');
    expect(transformPlotlyJsonToHeatmapProps(plotlySchema)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToHeatmapProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(transformPlotlyJsonToHeatmapProps(plotlySchema)).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading '0')"));
    }
  });

  test('transformPlotlyJsonToSankeyProps - Should return sankey chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_sankey_test.json');
    expect(transformPlotlyJsonToSankeyProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToSankeyProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(transformPlotlyJsonToSankeyProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
    } catch (e) {
      expect(e).toStrictEqual(TypeError("Cannot read properties of undefined (reading '0')"));
    }
  });

  test('transformPlotlyJsonToGaugeProps - Should return gauge chart props', () => {
    const plotlySchema = require('./tests/schema/fluent_gauge_test.json');
    expect(transformPlotlyJsonToGaugeProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToGaugeProps - Should throw an error when we pass invalid data', () => {
    const plotlySchema = require('./tests/schema/fluent_nesteddata_test.json');
    try {
      expect(transformPlotlyJsonToGaugeProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
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
