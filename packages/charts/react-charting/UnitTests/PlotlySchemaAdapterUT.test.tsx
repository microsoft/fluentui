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
} from '../src/components/DeclarativeChart/PlotlySchemaAdapter';

const colorMap = new Map<string, string>();
const env = require('../config/tests');
const runTest = env === 'TEST' ? describe : describe.skip;

runTest('isDate', () => {
  test('Should return true when input array contains Date objects', () => {
    var date = new Date();
    expect(isDateArray([date, date.getDate() + 1, date.getDate() + 2])).toBe(true);
  });

  test('Should return false when input array contains numeric data', () => {
    expect(isDateArray([20, 30, 40])).toBe(false);
  });

  test('Should return false when input array contains string data', () => {
    expect(isDateArray(['twenty', 'thirty', 'forty'])).toBe(false);
  });
});

runTest('isNumberArray', () => {
  test('Should return false when input array contains Date objects', () => {
    var date = new Date();
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

runTest('isMonthArray', () => {
  test('Should return false when input array contains Date objects', () => {
    var date = new Date();
    expect(isMonthArray([date, date.getDate() + 1, date.getDate() + 2])).toBe(false);
  });

  test('Should return true when input array contains months data', () => {
    expect(isMonthArray([10, 11, 1])).toBe(true);
  });

  test('Should return false when input array contains numeric data(apart from months 1 to 12)', () => {
    expect(isMonthArray([20, 30, 40])).toBe(false);
  });

  test('Should return false when input array contains numaric data in string formatt', () => {
    expect(isMonthArray(['20', '30', '40'])).toBe(false);
  });

  test('Should return false when input array contains string data', () => {
    expect(isMonthArray(['One', 'Two', 'Three'])).toBe(false);
  });
});

runTest('updateXValues', () => {
  test('Should return true when input array contains months data', () => {
    expect(updateXValues([10, 11, 1])).toStrictEqual(['10 01, 2024', '11 01, 2024', '1 01, 2025']);
  });

  test.skip('Should return true when input array contains months data', () => {
    var date = new Date();
    expect(updateXValues([10, 11, 16])).toStrictEqual(['10 01, 2024', '11 01, 2024', '1 01, 2025']);
  });
});

runTest('getColor', () => {
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

runTest('transform Plotly Json To chart Props', () => {
  test('transformPlotlyJsonToDonutProps - Should return donut chart props', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_donut_test.json');
    expect(transformPlotlyJsonToDonutProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToDonutProps - Should return pie chart props', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_pie_test.json');
    expect(transformPlotlyJsonToDonutProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToVSBCProps - Should return VSBC props', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_verticalstackedbarchart_test.json');
    expect(transformPlotlyJsonToVSBCProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToGVBCProps - Should return GVBC props', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_groupedverticalbarchart_test.json');
    expect(transformPlotlyJsonToGVBCProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToVBCProps - Should return VBC props', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_verticalbar_histogram_test.json');
    expect(transformPlotlyJsonToVBCProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToScatterChartProps - Should return line chart props', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_line_test.json');
    expect(transformPlotlyJsonToScatterChartProps(plotlySchema, true, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToScatterChartProps - Should return area chart props', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_area_test.json');
    expect(transformPlotlyJsonToScatterChartProps(plotlySchema, true, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToHorizontalBarWithAxisProps - Should return Horizontal bar chart with axis chart props', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_horizontalbar_test.json');
    expect(
      transformPlotlyJsonToHorizontalBarWithAxisProps(plotlySchema, { current: colorMap }, true),
    ).toMatchSnapshot();
  });

  test('transformPlotlyJsonToHeatmapProps - Should return heatmap chart props', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_heatmap_test.json');
    expect(transformPlotlyJsonToHeatmapProps(plotlySchema)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToSankeyProps - Should return sankey chart props', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_sankey_test.json');
    expect(transformPlotlyJsonToSankeyProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });

  test('transformPlotlyJsonToGaugeProps - Should return gauge chart props', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_gauge_test.json');
    expect(transformPlotlyJsonToGaugeProps(plotlySchema, { current: colorMap }, true)).toMatchSnapshot();
  });
});

runTest('sanitizeJson', () => {
  test('Should return json object when depth inside the range', () => {
    const plotlySchema = require('../src/components/DeclarativeChart/tests/schema/fluent_gauge_test.json');
    expect(sanitizeJson(plotlySchema, 0)).toMatchSnapshot();
  });
});
