import * as utils from './utilities';
import * as colors from './colors';
import { TimeLocaleDefinition as d3TimeLocaleDefinition } from 'd3-time-format';
import { format as d3Format } from 'd3-format';
import {
  DataPoint,
  HorizontalBarChartWithAxisDataPoint,
  LineChartPoints,
  VerticalBarChartDataPoint,
} from '../types/DataPoint';
import { ScaleBand } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { conditionalDescribe, isTimezoneSet } from './TestUtility.test';
import * as vbcUtils from './vbc-utils';
import { formatToLocaleString } from '@fluentui/chart-utilities';
const { Timezone } = require('../../scripts/constants');
const env = require('../../config/tests');

// Reference to the test plan: packages\react-charting\docs\TestPlans\Utilities\UnitTests.md
const X_ORIGIN = 0;

describe('Unit test to format data to localized string', () => {
  test('Should return undefined when data provided is undefined', () => {
    expect(formatToLocaleString(undefined)).toBeUndefined();
  });
  test('Should return NaN when data is NaN', () => {
    expect(formatToLocaleString(NaN)).toBeNaN();
  });
  test('Should return localized 0 when data is numeric 0', () => {
    expect(formatToLocaleString(0)).toBe('0');
  });
  test('Should return localized 123 when data is string 123', () => {
    expect(formatToLocaleString('123')).toBe('123');
  });
  test('Should return localized 1234 when data is string 1234', () => {
    expect(formatToLocaleString('1234')).toBe('1234');
  });
  test('Should return localized Hello World when data is string Hello World', () => {
    expect(formatToLocaleString('Hello World')).toBe('Hello World');
  });
  test('Should return 0 as string when data is empty string', () => {
    expect(formatToLocaleString('')).toBe('');
  });
  test('Should return 0 as string when data is single whitespace string', () => {
    expect(formatToLocaleString(' ')).toBe('0');
  });
  test('Should return the localised data in the given culture when input data is a string', () => {
    expect(formatToLocaleString('text', 'en-GB')).toBe('text');
    expect(formatToLocaleString('text', 'ar-SY')).toBe('text');
  });

  test('Should return the localised data in the given culture when the input data is a number', () => {
    expect(formatToLocaleString(10, 'en-GB')).toBe('10');
    expect(formatToLocaleString(25600, 'ar-SY')).toBe('٢٥٬٦٠٠');
  });

  test('Do not localize 4 digit numbers', () => {
    expect(formatToLocaleString(1000, 'en-GB')).toBe('1000');
    expect(formatToLocaleString(2560, 'ar-SY')).toBe('٢٥٦٠');
    expect(formatToLocaleString('2000')).toBe('2000');
  });

  test('Should return the localised data when the input data is a string containing a number', () => {
    expect(formatToLocaleString('10', 'en-GB')).toBe('10');
    expect(formatToLocaleString('12345', 'ar-SY')).toBe('١٢٬٣٤٥');
  });
});

describe('Unit test to return the accessible data object', () => {
  test('Should return the appropriate accessible data object no parameters are provided as input', () => {
    expect(utils.getAccessibleDataObject()).toEqual({
      role: 'text',
      'data-is-focusable': true,
      'aria-label': undefined,
      'aria-labelledby': undefined,
      'aria-describedby': undefined,
    });
  });

  test('Should return the appropriate accessible data object only role is provided as input', () => {
    expect(utils.getAccessibleDataObject(undefined, 'button')).toEqual({
      role: 'button',
      'data-is-focusable': true,
      'aria-label': undefined,
      'aria-labelledby': undefined,
      'aria-describedby': undefined,
    });
  });

  test('Should return the accessible data when both role and isDataFocusable is provided as input', () => {
    expect(utils.getAccessibleDataObject(undefined, 'text', false)).toEqual({
      role: 'text',
      'data-is-focusable': false,
      'aria-label': undefined,
      'aria-labelledby': undefined,
      'aria-describedby': undefined,
    });
  });

  test('Should return the appropriate accessible data object when all parameters are provided as input', () => {
    const accessibleData = {
      ariaLabel: 'Start button',
      ariaLabelledBy: 'Button',
      ariaDescribedBy: 'This is a start button',
    };
    expect(utils.getAccessibleDataObject(accessibleData, 'button', false)).toEqual({
      role: 'button',
      'data-is-focusable': false,
      'aria-label': 'Start button',
      'aria-labelledby': 'Button',
      'aria-describedby': 'This is a start button',
    });
  });
});

describe('Unit test for getting colors from token and returning the theme specific color', () => {
  test('Should return the token itself when the token is not from DataVizPallette', () => {
    expect(colors.getColorFromToken('blue')).toEqual('blue');
  });
  test('Should return the color code when the token is from DataVizPallette', () => {
    expect(colors.getColorFromToken('qualitative.1')).toEqual('#637cef');
  });

  test('Should return the first color when dark theme is disabled and length of colors list is more than 1', () => {
    expect(colors.getColorFromToken('qualitative.11', false)).toEqual('#3c51b4');
  });

  test('Should return the first color when dark theme is enabled and length of colors list is equal to 1', () => {
    expect(colors.getColorFromToken('qualitative.1', true)).toEqual('#637cef');
  });

  test('Should return the second color when dark theme is enabled and length of colors list is more than 1', () => {
    expect(colors.getColorFromToken('qualitative.11', true)).toEqual('#93a4f4');
  });
});

interface CreateXAxisParams extends Partial<Omit<utils.IXAxisParams, 'domainNRangeValues'>> {
  domainNRangeValues?: Partial<utils.IDomainNRange>;
}
const createXAxisParams = (xAxisParams?: CreateXAxisParams): utils.IXAxisParams => {
  const xAxisElement = document.createElementNS('http://www.w3.org/2000/svg', 'g') as SVGSVGElement;

  return {
    xAxisElement,
    containerHeight: 100,
    containerWidth: 200,
    ...xAxisParams,
    domainNRangeValues: {
      dStartValue: 0,
      dEndValue: 100,
      rStartValue: 0,
      rEndValue: 100,
      ...xAxisParams?.domainNRangeValues,
    },
    margins: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      ...xAxisParams?.margins,
    },
    calcMaxLabelWidth: utils.calculateLongestLabelWidth,
  };
};
const convertXAxisResultToJson = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: { xScale: any; tickValues: string[] },
  isStringAxis: boolean = false,
  tickCount: number = 6,
): [number, string][] => {
  const tickValues = isStringAxis ? result.tickValues : result.xScale.ticks(tickCount);
  return tickValues.map((item: number | Date | string, i: number) => [result.xScale(item), result.tickValues[i]]);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const matchResult = (result: any) => {
  expect(result).toMatchSnapshot();
};

describe('createNumericXAxis', () => {
  it('should render the x-axis labels correctly', () => {
    const xAxisParams = createXAxisParams();
    utils.createNumericXAxis(xAxisParams, {}, utils.ChartTypes.VerticalBarChart);
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });

  it('should create rounded x-axis labels when showRoundOffXTickValues is true', () => {
    const xAxisParams = createXAxisParams({
      domainNRangeValues: { dStartValue: 0.243, dEndValue: 0.433 },
      showRoundOffXTickValues: true,
    });
    const result = utils.createNumericXAxis(xAxisParams, {}, utils.ChartTypes.VerticalBarChart);
    matchResult(convertXAxisResultToJson(result));
  });

  // Tick size determines the length of the tick marks on the axis line.
  // Tick padding refers to the space between a tick mark and its corresponding tick label.
  it('should render the x-axis labels correctly for specific tick size and padding values', () => {
    const xAxisParams = createXAxisParams({ xAxistickSize: 10, tickPadding: 5 });
    utils.createNumericXAxis(xAxisParams, {}, utils.ChartTypes.VerticalBarChart);
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });

  it('should create the x-axis labels correctly for a specific number of ticks', () => {
    const xAxisParams = createXAxisParams({ xAxisCount: 3 });
    const result = utils.createNumericXAxis(xAxisParams, {}, utils.ChartTypes.VerticalBarChart);
    matchResult(convertXAxisResultToJson(result, false, xAxisParams.xAxisCount));
  });

  it('should render the x-axis labels correctly for horizontal bar chart with axis', () => {
    const xAxisParams = createXAxisParams();
    utils.createNumericXAxis(xAxisParams, {}, utils.ChartTypes.HorizontalBarChartWithAxis);
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });
});

conditionalDescribe(isTimezoneSet(Timezone.UTC) && env === 'TEST')('createDateXAxis', () => {
  const domainNRangeValues: CreateXAxisParams['domainNRangeValues'] = {
    dStartValue: new Date(2021, 6, 1),
    dEndValue: new Date(2022, 5, 30),
  };

  it('should render the x-axis labels correctly', () => {
    const xAxisParams = createXAxisParams({ domainNRangeValues });
    utils.createDateXAxis(xAxisParams, {});
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });

  it('should render the x-axis labels correctly for specific tick size and padding values', () => {
    const xAxisParams = createXAxisParams({ domainNRangeValues, xAxistickSize: 10, tickPadding: 5 });
    utils.createDateXAxis(xAxisParams, {});
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });

  it('should create the x-axis labels correctly for a specific number of ticks', () => {
    const xAxisParams = createXAxisParams({ domainNRangeValues, xAxisCount: 12 });
    const result = utils.createDateXAxis(xAxisParams, {});
    matchResult(convertXAxisResultToJson(result, false, xAxisParams.xAxisCount));
  });

  it('should create the x-axis labels correctly when customDateTimeFormatter is provided', () => {
    const xAxisParams = createXAxisParams({ domainNRangeValues });
    const customDateTimeFormatter = (dateTime: Date) => {
      return `${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;
    };
    const result = utils.createDateXAxis(xAxisParams, {}, undefined, undefined, undefined, customDateTimeFormatter);
    matchResult(convertXAxisResultToJson(result));
  });

  it('should create the x-axis labels correctly when culture and options are provided', () => {
    const xAxisParams = createXAxisParams({ domainNRangeValues });
    const result = utils.createDateXAxis(xAxisParams, {}, 'ar-EG', { dateStyle: 'full' });
    matchResult(convertXAxisResultToJson(result));
  });

  it('should create the x-axis labels correctly when timeFormatLocale is provided', () => {
    const timeFormatLocale: d3TimeLocaleDefinition = require('d3-time-format/locale/it-IT.json');
    const xAxisParams = createXAxisParams({ domainNRangeValues });
    const result = utils.createDateXAxis(xAxisParams, {}, undefined, undefined, timeFormatLocale);
    matchResult(convertXAxisResultToJson(result));
  });

  it('should render the x-axis labels correctly when tickParams is provided', () => {
    const xAxisParams = createXAxisParams({ domainNRangeValues });
    utils.createDateXAxis(xAxisParams, {
      tickValues: [
        new Date(2021, 6, 1),
        new Date(2021, 9, 1),
        new Date(2022, 0, 1),
        new Date(2022, 3, 1),
        new Date(2022, 5, 30),
      ],
      tickFormat: '%a, %d %b %Y',
    });
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });
});

describe('createStringXAxis', () => {
  const dataset: string[] = ['X-axis label 1', 'X-axis label 2', 'X-axis label 3'];

  it('should render the x-axis labels correctly', () => {
    const xAxisParams = createXAxisParams();
    utils.createStringXAxis(xAxisParams, {}, dataset);
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });

  it('should render the x-axis labels correctly for specific tick size and padding values', () => {
    const xAxisParams = createXAxisParams({ xAxistickSize: 10, tickPadding: 5 });
    utils.createStringXAxis(xAxisParams, {}, dataset);
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });

  // Padding is a convenience method for setting the inner and outer padding to the same value.
  it('should create the x-axis labels correctly for specific padding values', () => {
    const xAxisParams = createXAxisParams({ xAxisPadding: 0.5 });
    const result = utils.createStringXAxis(xAxisParams, {}, dataset);
    matchResult(convertXAxisResultToJson(result, true));
  });

  // Inner padding specifies the percentage of the range to reserve for blank space between bands (bars).
  // Outer padding specifies the percentage of the range to reserve for blank space
  // before the first band (bar) and after the last band (bar).
  it('should create the x-axis labels correctly for specific inner and outer padding values', () => {
    const xAxisParams = createXAxisParams({ xAxisInnerPadding: 0.5, xAxisOuterPadding: 1 / 3 });
    const result = utils.createStringXAxis(xAxisParams, {}, dataset);
    matchResult(convertXAxisResultToJson(result, true));
  });
});

describe('prepareDatapoints', () => {
  it('should return an array of uniformly distributed data points', () => {
    const result = utils.prepareDatapoints(100, 0, 3, false);
    matchResult(result);
  });

  it('should return fractional data points when interval is less than 1', () => {
    const result = utils.prepareDatapoints(2, 0, 3, false);
    matchResult(result);
  });

  it('should return integer data points when dataset only consists of integers', () => {
    const result = utils.prepareDatapoints(2, 0, 3, true);
    matchResult(result);
  });

  it('should handle the case where the range spans across zero', () => {
    const result = utils.prepareDatapoints(0, -7, 3, false);
    matchResult(result);
  });

  it('should return data points when minVal is negative and maxVal is non-negative', () => {
    const result = utils.prepareDatapoints(3, -5, 2, false);
    matchResult(result);
  });

  it('should return data points for positive only range', () => {
    const result = utils.prepareDatapoints(5, 1, 1, false);
    matchResult(result);
  });

  it('should return data points for a negative only range', () => {
    const result = utils.prepareDatapoints(-1, -5, 1, false);
    matchResult(result);
  });
});

describe('prepareDatapoints for rounded tick value cases', () => {
  it('should return an array with rounded data points when roundedTicks is true and yMinValue is 0', () => {
    const result = utils.prepareDatapoints(100, 0, 3, true, true);
    matchResult(result);
  });

  it('should return an array with rounded data points when roundedTicks is true and yMinValue is positive', () => {
    const result = utils.prepareDatapoints(100, 50, 4, true, true);
    matchResult(result);
  });

  it('should return an array with rounded data points when roundedTicks is true and yMinValue is negative', () => {
    const result = utils.prepareDatapoints(100, -100, 4, true, true);
    matchResult(result);
  });

  it('should return an array with rounded data points when roundedTicks is true and yMaxValue is negative', () => {
    const result = utils.prepareDatapoints(-100, -200, 4, true, true);
    matchResult(result);
  });

  it('should return an array with rounded data points with non-integral dataset', () => {
    const result = utils.prepareDatapoints(12.8, -8.4, 4, false, true);
    matchResult(result);
  });

  it('should return an array with rounded data points with large numbers in dataset', () => {
    const result = utils.prepareDatapoints(9874663, -8996557, 4, true, true);
    matchResult(result);
  });

  it('should return an array with rounded data points with variation in dataset', () => {
    const result = utils.prepareDatapoints(589030.78, -234.45, 4, false, true);
    matchResult(result);
  });

  it('should return array with rounded datapoints when yMax is power of 10 with floating point precision error', () => {
    const result = utils.prepareDatapoints(1000.000000002, -234.45, 4, false, true);
    matchResult(result);
  });
});

const createYAxisParams = (yAxisParams?: Partial<utils.IYAxisParams>): utils.IYAxisParams => {
  const yAxisElement = document.createElementNS('http://www.w3.org/2000/svg', 'g') as SVGSVGElement;

  return {
    yMinMaxValues: {
      startValue: 0,
      endValue: 100,
    },
    containerWidth: 100,
    containerHeight: 100,
    yAxisElement,
    yAxisTickCount: 4,
    ...yAxisParams,
    margins: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      ...yAxisParams?.margins,
    },
  };
};

describe('createYAxisForHorizontalBarChartWithAxis', () => {
  it('should render y-axis labels correctly with specific min and max tick values', () => {
    const yAxisParams = createYAxisParams({ yMaxValue: 10, yMinValue: 1 });
    delete yAxisParams.yMinMaxValues;
    utils.createYAxisForHorizontalBarChartWithAxis(yAxisParams, false);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly with specific tick padding value', () => {
    const yAxisParams = createYAxisParams({ tickPadding: 5 });
    utils.createYAxisForHorizontalBarChartWithAxis(yAxisParams, false);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly with a specific number of ticks', () => {
    const yAxisParams = createYAxisParams({ yAxisTickCount: 2 });
    utils.createYAxisForHorizontalBarChartWithAxis(yAxisParams, false);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly when layout direction is RTL', () => {
    const yAxisParams = createYAxisParams();
    utils.createYAxisForHorizontalBarChartWithAxis(yAxisParams, true);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly with a custom tick format', () => {
    const yAxisParams = createYAxisParams({ yAxisTickFormat: (domainValue: number) => `₹${domainValue}` });
    utils.createYAxisForHorizontalBarChartWithAxis(yAxisParams, false);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });
});

describe('createNumericYAxisForOtherCharts', () => {
  it('should render y-axis labels correctly with specific min and max tick values', () => {
    const yAxisParams = createYAxisParams({ yMaxValue: 10, yMinValue: 1, maxOfYVal: 5 });
    delete yAxisParams.yMinMaxValues;
    const axisData: utils.IAxisData = { yAxisDomainValues: [] };
    utils.createNumericYAxis(yAxisParams, false, axisData, false, utils.ChartTypes.VerticalBarChart);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly with specific tick padding value', () => {
    const yAxisParams = createYAxisParams({ tickPadding: 5 });
    const axisData: utils.IAxisData = { yAxisDomainValues: [] };
    utils.createNumericYAxis(yAxisParams, false, axisData, false, utils.ChartTypes.LineChart);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly with a specific number of ticks', () => {
    const yAxisParams = createYAxisParams({ yAxisTickCount: 3 });
    const axisData: utils.IAxisData = { yAxisDomainValues: [] };
    utils.createNumericYAxis(yAxisParams, false, axisData, false, utils.ChartTypes.VerticalBarChart);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly for charts with event annotations', () => {
    const yAxisParams = createYAxisParams({
      eventAnnotationProps: { events: [], mergedLabel: () => '' },
      eventLabelHeight: 20,
    });
    const axisData: utils.IAxisData = { yAxisDomainValues: [] };
    utils.createNumericYAxis(yAxisParams, false, axisData, false, utils.ChartTypes.LineChart);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly when layout direction is RTL', () => {
    const yAxisParams = createYAxisParams();
    const axisData: utils.IAxisData = { yAxisDomainValues: [] };
    utils.createNumericYAxis(yAxisParams, true, axisData, false, utils.ChartTypes.VerticalBarChart);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly for secondary scale', () => {
    const yAxisParams = createYAxisParams();
    const axisData: utils.IAxisData = { yAxisDomainValues: [] };
    utils.createNumericYAxis(yAxisParams, false, axisData, false, utils.ChartTypes.LineChart, true);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly for secondary scale when layout direction is RTL', () => {
    const yAxisParams = createYAxisParams();
    const axisData: utils.IAxisData = { yAxisDomainValues: [] };
    utils.createNumericYAxis(yAxisParams, true, axisData, false, utils.ChartTypes.VerticalBarChart, true);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly with a custom tick format', () => {
    const yAxisParams = createYAxisParams({ yAxisTickFormat: d3Format('$') });
    const axisData: utils.IAxisData = { yAxisDomainValues: [] };
    utils.createNumericYAxis(yAxisParams, false, axisData, false, utils.ChartTypes.LineChart);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });
});

describe('createStringYAxis', () => {
  const dataPoints: string[] = ['Y-axis label 1', 'Y-axis label 2', 'Y-axis label 3'];

  it('should render y-axis labels correctly for horizontal bar chart with axis', () => {
    const yAxisParams = createYAxisParams();
    utils.createStringYAxisForHorizontalBarChartWithAxis(yAxisParams, dataPoints, false, 16);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly for other charts', () => {
    const yAxisParams = createYAxisParams();
    utils.createStringYAxis(yAxisParams, dataPoints, false);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });
});

describe('createStringYAxisForHorizontalBarChartWithAxis', () => {
  const dataPoints: string[] = ['label 1', 'label 2', 'label 3'];

  it('should render y-axis labels correctly with specific tick padding value', () => {
    const yAxisParams = createYAxisParams({ tickPadding: 5 });
    utils.createStringYAxisForHorizontalBarChartWithAxis(yAxisParams, dataPoints, false, 16);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly when layout direction is RTL', () => {
    const yAxisParams = createYAxisParams();
    utils.createStringYAxisForHorizontalBarChartWithAxis(yAxisParams, dataPoints, true, 16);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly with a custom tick format', () => {
    const yAxisParams = createYAxisParams({ yAxisTickFormat: (value: string) => `Y-axis ${value}` });
    utils.createStringYAxisForHorizontalBarChartWithAxis(yAxisParams, dataPoints, false, 16);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });
});

describe('createStringYAxis', () => {
  const dataPoints: string[] = ['label 1', 'label 2', 'label 3'];

  it('should render y-axis labels correctly with specific tick padding value', () => {
    const yAxisParams = createYAxisParams({ tickPadding: 5 });
    utils.createStringYAxis(yAxisParams, dataPoints, false);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly for specific padding values', () => {
    const yAxisParams = createYAxisParams({ yAxisPadding: 0.5 });
    utils.createStringYAxis(yAxisParams, dataPoints, false);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly when layout direction is RTL', () => {
    const yAxisParams = createYAxisParams();
    utils.createStringYAxis(yAxisParams, dataPoints, true);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it('should render y-axis labels correctly with a custom tick format', () => {
    const yAxisParams = createYAxisParams({ yAxisTickFormat: (value: string) => `Y-axis ${value}` });
    utils.createStringYAxis(yAxisParams, dataPoints, false);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });
});

describe('calloutData', () => {
  it('should return an array of data points grouped by their numeric x coordinates', () => {
    const values: LineChartPoints[] = [
      {
        legend: 'Line 1',
        data: [
          { x: 10, y: 10 },
          { x: 20, y: 20 },
        ],
      },
      {
        legend: 'Line 2',
        data: [
          { x: 10, y: 30 },
          { x: 30, y: 20 },
        ],
      },
    ];
    const result = utils.calloutData(values);
    matchResult(result);
  });

  it('should return an array of data points grouped by their date-based x coordinates', () => {
    const values: LineChartPoints[] = [
      {
        legend: 'Line 1',
        data: [
          { x: new Date(Date.UTC(2021, 0, 1)), y: 10 },
          { x: new Date(Date.UTC(2021, 0, 2)), y: 20 },
        ],
      },
      {
        legend: 'Line 2',
        data: [
          { x: new Date(Date.UTC(2021, 0, 1)), y: 30 },
          { x: new Date(Date.UTC(2021, 0, 3)), y: 20 },
        ],
      },
    ];
    const result = utils.calloutData(values);
    matchResult(result);
  });
});

test(`getUnique should return an array of data points with unique values
determined by the provided comparison key`, () => {
  const arr = [
    {
      x: 10,
      values: [
        { legend: 'Line 1', y: 10 },
        { legend: 'Line 2', y: 30 },
      ],
    },
    { x: 10, values: [{ legend: 'Line 1', y: 10 }] },
    { x: 20, values: [{ legend: 'Line 1', y: 20 }] },
    { x: 30, values: [{ legend: 'Line 2', y: 20 }] },
  ];
  const result = utils.getUnique(arr, 'x');
  matchResult(result);
});

test(`silceOrAppendToArray should add the element to the array if it's not present,
and remove it if already included`, () => {
  let array: string[] = [];

  array = utils.silceOrAppendToArray(array, 'Legend 1');
  expect(array).toEqual(['Legend 1']);

  array = utils.silceOrAppendToArray(array, 'Legend 2');
  expect(array).toEqual(['Legend 1', 'Legend 2']);

  array = utils.silceOrAppendToArray(array, 'Legend 3');
  expect(array).toEqual(['Legend 1', 'Legend 2', 'Legend 3']);

  array = utils.silceOrAppendToArray(array, 'Legend 2');
  expect(array).toEqual(['Legend 1', 'Legend 3']);

  array = utils.silceOrAppendToArray(array, 'Legend 1');
  expect(array).toEqual(['Legend 3']);

  array = utils.silceOrAppendToArray(array, 'Legend 3');
  expect(array).toEqual([]);
});

describe('createWrapOfXLabels', () => {
  let xAxisParams: utils.IXAxisParams;
  let result: { xScale: ScaleBand<string>; tickValues: string[] };

  beforeEach(() => {
    xAxisParams = createXAxisParams();
    result = utils.createStringXAxis(xAxisParams, {}, ['X-axis label 1', 'X-axis label 2', 'X-axis label 3']);
  });

  it('should terminate when no node is provided', () => {
    expect(
      utils.createWrapOfXLabels({
        node: null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        xAxis: result.xScale as any,
        noOfCharsToTruncate: 20,
        showXAxisLablesTooltip: false,
      }),
    ).toBeUndefined();
  });

  it(`should truncate x-axis labels when their length exceeds noOfCharsToTruncate
  and showXAxisLablesTooltip is true`, () => {
    utils.createWrapOfXLabels({
      node: xAxisParams.xAxisElement!,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      xAxis: result.xScale as any,
      noOfCharsToTruncate: 10,
      showXAxisLablesTooltip: true,
    });
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });

  it(`should retain full x-axis labels when their length is less than noOfCharsToTruncate
  and showXAxisLablesTooltip is true`, () => {
    utils.createWrapOfXLabels({
      node: xAxisParams.xAxisElement!,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      xAxis: result.xScale as any,
      noOfCharsToTruncate: 20,
      showXAxisLablesTooltip: true,
    });
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });

  it('should wrap x-axis labels when their width exceeds the maximum allowed line width', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SVGElement: any = window.SVGElement;
    const originalGetComputedTextLength = SVGElement.prototype.getComputedTextLength;
    let calls = 0;
    const results = [6, 12, 7]; // 'X-axis', 'X-axis label', 'label 1'
    SVGElement.prototype.getComputedTextLength = jest.fn().mockImplementation(() => results[calls++ % results.length]);
    const originalGetBoundingClientRect = SVGElement.prototype.getBoundingClientRect;
    SVGElement.prototype.getBoundingClientRect = jest.fn().mockReturnValue({ height: 15 });

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.appendChild(xAxisParams.xAxisElement!);
    document.body.appendChild(svg);

    const removeVal = utils.createWrapOfXLabels({
      node: xAxisParams.xAxisElement!,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      xAxis: result.xScale as any,
      noOfCharsToTruncate: 20,
      showXAxisLablesTooltip: false,
    });
    expect(removeVal).toBe(15);
    expect(xAxisParams.xAxisElement).toMatchSnapshot();

    document.body.removeChild(svg);

    SVGElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    SVGElement.prototype.getComputedTextLength = originalGetComputedTextLength;
  });
});

describe('createYAxisLabels', () => {
  let yAxisParams: utils.IYAxisParams;
  let yAxis: ScaleBand<string>;

  beforeEach(() => {
    yAxisParams = createYAxisParams();
    yAxis = utils.createStringYAxisForHorizontalBarChartWithAxis(
      yAxisParams,
      ['Y-axis label 1', 'Y-axis label 2', 'Y-axis label 3'],
      false,
      16,
    );
  });

  it('should terminate when no node is provided', () => {
    expect(utils.createYAxisLabels(null, undefined, 20, false, false)).toBeUndefined();
  });

  it('should retain full y-axis labels when truncateLabel is false', () => {
    utils.createYAxisLabels(yAxisParams.yAxisElement!, yAxis, 20, false, false);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  it(`should truncate y-axis labels when their length exceeds noOfCharsToTruncate
  and truncateLabel is true`, () => {
    utils.createYAxisLabels(yAxisParams.yAxisElement!, yAxis, 10, true, false);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('should offset y-axis labels when layout direction is RTL', () => {
    utils.createYAxisLabels(yAxisParams.yAxisElement!, yAxis, 20, false, true);
    expect(yAxisParams.yAxisElement).toMatchSnapshot();
  });
});

describe('wrapContent', () => {
  const content = 'Lorem ipsum dolor sit amet';
  const id = 'tooltip-host1';

  it('should terminate when text node is not found', () => {
    const isOverflowing = utils.wrapContent(content, id, 15);
    expect(isOverflowing).toBe(false);
  });

  it('should truncate text content when it exceeds the maxWidth', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SVGElement: any = window.SVGElement;
    const originalGetComputedTextLength = SVGElement.prototype.getComputedTextLength;
    let calls = 0;
    SVGElement.prototype.getComputedTextLength = jest.fn().mockImplementation(() => content.length - calls++);

    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.id = id;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.appendChild(textElement);
    document.body.appendChild(svg);

    const isOverflowing = utils.wrapContent(content, id, 10);
    expect(isOverflowing).toBe(true);
    expect(textElement).toMatchSnapshot();

    document.body.removeChild(svg);

    SVGElement.prototype.getComputedTextLength = originalGetComputedTextLength;
  });
});

describe('tooltipOfAxislabels', () => {
  it('should terminate when no x-axis node is provided', () => {
    const tooltipProps = {
      tooltipCls: 'tooltip-1',
      id: 'VBCTooltipId_1',
      axis: null,
    };
    expect(utils.tooltipOfAxislabels(tooltipProps)).toBeNull();
  });

  it('should render a tooltip for x-axis labels', () => {
    const xAxisParams = createXAxisParams();
    const result = utils.createStringXAxis(xAxisParams, {}, ['X-axis label 1', 'X-axis label 2', 'X-axis label 3']);
    utils.createWrapOfXLabels({
      node: xAxisParams.xAxisElement!,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      xAxis: result.xScale as any,
      noOfCharsToTruncate: 10,
      showXAxisLablesTooltip: true,
    });

    const tooltipProps = {
      tooltipCls: 'tooltip-1',
      id: 'VBCTooltipId_1',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axis: d3Select(xAxisParams.xAxisElement!).call(result.xScale as any),
    };
    utils.tooltipOfAxislabels(tooltipProps);
    expect(document.body).toMatchSnapshot();
  });
});

describe('getXAxisType', () => {
  it('should return false when chart is empty', () => {
    let points: LineChartPoints[] = [];
    expect(utils.getXAxisType(points)).toBe(false);

    points = [{ legend: 'Line 1', data: [] }];
    expect(utils.getXAxisType(points)).toBe(false);
  });

  it('should return false for data points with numeric x coordinates', () => {
    const points: LineChartPoints[] = [{ legend: 'Line 1', data: [{ x: 10, y: 10 }] }];
    expect(utils.getXAxisType(points)).toBe(false);
  });

  it('should return true for data points with date-based x coordinates', () => {
    const points: LineChartPoints[] = [{ legend: 'Line 1', data: [{ x: new Date(), y: 10 }] }];
    expect(utils.getXAxisType(points)).toBe(true);
  });
});

describe('domainRangeOfDateForAreaChart', () => {
  const points: LineChartPoints[] = [
    {
      legend: 'Line 1',
      data: [
        { x: new Date(Date.UTC(2021, 0, 3)), y: 10 },
        { x: new Date(Date.UTC(2021, 0, 2)), y: 20 },
      ],
    },
  ];
  const margins: utils.IMargins = {
    left: 5,
    right: 10,
    top: 0,
    bottom: 0,
  };

  it('should return domain and range values correctly for date x-axis', () => {
    const result = utils.domainRangeOfDateForAreaLineScatterVerticalBarCharts(
      points,
      margins,
      100,
      false,
      [],
      utils.ChartTypes.AreaChart,
    );
    matchResult(result);
  });

  it('should return domain and range values correctly for date x-axis when tickValues are provided', () => {
    const result = utils.domainRangeOfDateForAreaLineScatterVerticalBarCharts(
      points,
      margins,
      100,
      false,
      [new Date(Date.UTC(2021, 0, 1)), new Date(Date.UTC(2021, 0, 4))],
      utils.ChartTypes.AreaChart,
    );
    matchResult(result);
  });

  it('should return domain and range values correctly for date x-axis when layout direction is RTL', () => {
    const result = utils.domainRangeOfDateForAreaLineScatterVerticalBarCharts(
      points,
      margins,
      100,
      true,
      [],
      utils.ChartTypes.AreaChart,
    );
    matchResult(result);
  });
});

describe('domainRangeOfNumericForAreaChart', () => {
  const points: LineChartPoints[] = [
    {
      legend: 'Line 1',
      data: [
        { x: 10, y: 20 },
        { x: 30, y: 40 },
      ],
    },
  ];
  const margins: utils.IMargins = {
    left: 5,
    right: 10,
    top: 0,
    bottom: 0,
  };

  it('should return domain and range values correctly for numeric x-axis', () => {
    const result = utils.domainRangeOfNumericForAreaLineScatterCharts(points, margins, 100, false);
    matchResult(result);
  });

  it('should return domain and range values correctly for numeric x-axis when layout direction is RTL', () => {
    const result = utils.domainRangeOfNumericForAreaLineScatterCharts(points, margins, 100, true);
    matchResult(result);
  });
});

describe('domainRangeOfNumericForHorizontalBarChartWithAxis', () => {
  const points: HorizontalBarChartWithAxisDataPoint[] = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
  ];
  const margins: utils.IMargins = {
    left: 5,
    right: 10,
    top: 0,
    bottom: 0,
  };

  it('should return domain and range values correctly for numeric x-axis', () => {
    const result = utils.domainRangeOfNumericForHorizontalBarChartWithAxis(points, margins, 100, false, 1, X_ORIGIN);
    matchResult(result);
  });

  it('should return domain and range values correctly for numeric x-axis when layout direction is RTL', () => {
    const result = utils.domainRangeOfNumericForHorizontalBarChartWithAxis(points, margins, 100, true, 1, X_ORIGIN);
    matchResult(result);
  });
});

describe('domainRangeOfNumericForHorizontalBarChartWithAxisStacked', () => {
  const points: HorizontalBarChartWithAxisDataPoint[] = [
    { x: 10, y: 20 },
    { x: 20, y: 40 },
    { x: 30, y: 40 },
    { x: 50, y: 20 },
  ];
  const margins: utils.IMargins = {
    left: 5,
    right: 10,
    top: 0,
    bottom: 0,
  };

  it('should return domain and range values correctly for numeric x-axis', () => {
    const result = utils.domainRangeOfNumericForHorizontalBarChartWithAxis(points, margins, 100, false, 1, X_ORIGIN);
    matchResult(result);
  });

  it('should return domain and range values correctly for numeric x-axis when layout direction is RTL', () => {
    const result = utils.domainRangeOfNumericForHorizontalBarChartWithAxis(points, margins, 100, true, 1, X_ORIGIN);
    matchResult(result);
  });
});

describe('domainRangeOfXStringAxis', () => {
  const margins: utils.IMargins = {
    left: 5,
    right: 10,
    top: 0,
    bottom: 0,
  };

  it('should return domain and range values correctly for string x-axis', () => {
    const result = utils.domainRangeOfXStringAxis(margins, 100, false);
    matchResult(result);
  });

  it('should return domain and range values correctly for string x-axis when layout direction is RTL', () => {
    const result = utils.domainRangeOfXStringAxis(margins, 100, true);
    matchResult(result);
  });
});

describe('domainRangeOfVSBCNumeric', () => {
  const points: DataPoint[] = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
  ];
  const margins: utils.IMargins = {
    left: 5,
    right: 10,
    top: 0,
    bottom: 0,
  };

  it('should return domain and range values correctly for numeric x-axis', () => {
    const result = utils.domainRangeOfVSBCNumeric(points, margins, 100, false, 16);
    matchResult(result);
  });

  it('should return domain and range values correctly for numeric x-axis when layout direction is RTL', () => {
    const result = utils.domainRangeOfVSBCNumeric(points, margins, 100, true, 16);
    matchResult(result);
  });
});

describe('domainRageOfVerticalNumeric', () => {
  const points: DataPoint[] = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
  ];
  const margins: utils.IMargins = {
    left: 5,
    right: 10,
    top: 0,
    bottom: 0,
  };

  it('should return domain and range values correctly for numeric x-axis', () => {
    const result = utils.domainRangeOfVerticalNumeric(points, margins, 100, false, 16);
    matchResult(result);
  });

  it('should return domain and range values correctly for numeric x-axis when layout direction is RTL', () => {
    const result = utils.domainRangeOfVerticalNumeric(points, margins, 100, true, 16);
    matchResult(result);
  });
});

describe('getDomainNRangeValues', () => {
  const margins: utils.IMargins = {
    left: 5,
    right: 10,
    top: 0,
    bottom: 0,
  };

  it('should return domain and range values correctly for line chart with numeric x-axis', () => {
    const points: LineChartPoints[] = [
      {
        legend: 'Line 1',
        data: [
          { x: 10, y: 20 },
          { x: 30, y: 40 },
        ],
      },
    ];
    const result = utils.domainRangeOfNumericForAreaLineScatterCharts(points, margins, 100, false);
    matchResult(result);
  });

  it('should return domain and range values correctly for vertical stacked bar chart with numeric x-axis', () => {
    const points: DataPoint[] = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const result = utils.domainRangeOfVSBCNumeric(points, margins, 100, false, 16);
    matchResult(result);
  });

  it('should return domain and range values correctly for vertical bar chart with numeric x-axis', () => {
    const points: DataPoint[] = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const result = utils.domainRangeOfVerticalNumeric(points, margins, 100, false, 16);
    matchResult(result);
  });

  it('should return domain and range values correctly for horizontal bar chart with numeric x-axis', () => {
    const points: HorizontalBarChartWithAxisDataPoint[] = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const result = utils.domainRangeOfNumericForHorizontalBarChartWithAxis(points, margins, 100, false, 16);
    matchResult(result);
  });

  it('should return domain and range values correctly for line chart with date x-axis', () => {
    const points: LineChartPoints[] = [
      {
        legend: 'Line 1',
        data: [
          { x: new Date(Date.UTC(2021, 0, 3)), y: 10 },
          { x: new Date(Date.UTC(2021, 0, 2)), y: 20 },
        ],
      },
    ];
    const result = utils.domainRangeOfDateForAreaLineScatterVerticalBarCharts(
      points,
      margins,
      100,
      false,
      undefined,
      utils.ChartTypes.AreaChart,
      16,
    );
    matchResult(result);
  });

  it("should return empty domain and range values for charts that don't support date x-axis", () => {
    const result = utils.domainRangeOfDateForAreaLineScatterVerticalBarCharts(
      [],
      margins,
      100,
      false,
      undefined,
      utils.ChartTypes.GroupedVerticalBarChart,
      16,
    );
    matchResult(result);
  });

  it('should return domain and range values correctly for charts with string x-axis', () => {
    const result = utils.domainRangeOfXStringAxis(margins, 100, false);
    matchResult(result);
  });
});

test('findNumericMinMaxOfY should return minimum and maximum values for line chart with numeric y-axis', () => {
  const points: LineChartPoints[] = [
    {
      legend: 'Line 1',
      data: [
        { x: 10, y: 20 },
        { x: 30, y: 40 },
      ],
    },
  ];
  const result = utils.findNumericMinMaxOfY(points);
  matchResult(result);
});

test('findVSBCNumericMinMaxOfY should return minimum and maximum values for numeric y-axis', () => {
  const points: DataPoint[] = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
  ];
  const result = utils.findVSBCNumericMinMaxOfY(points);
  matchResult(result);
});

describe('findVerticalNumericMinMaxOfY', () => {
  it('should return minimum and maximum values for numeric y-axis', () => {
    const points: VerticalBarChartDataPoint[] = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const result = utils.findVerticalNumericMinMaxOfY(points);
    matchResult(result);
  });

  it('should return minimum and maximum values for numeric y-axis when line data is also provided', () => {
    const points: VerticalBarChartDataPoint[] = [
      { x: 10, y: 20, lineData: { y: 50 } },
      { x: 30, y: 40, lineData: { y: 10 } },
    ];
    const result = utils.findVerticalNumericMinMaxOfY(points);
    matchResult(result);
  });
});

describe('findHBCWANumericMinMaxOfY', () => {
  it('should return empty minimum and maximum values for non numeric y-axis', () => {
    const points: HorizontalBarChartWithAxisDataPoint[] = [
      { x: 10, y: 'label 1' },
      { x: 20, y: 'label 2' },
    ];
    const result = utils.findHBCWANumericMinMaxOfY(points, utils.YAxisType.StringAxis);
    matchResult(result);
  });

  it('should return minimum and maximum values for numeric y-axis', () => {
    const points: HorizontalBarChartWithAxisDataPoint[] = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const result = utils.findHBCWANumericMinMaxOfY(points, utils.YAxisType.NumericAxis);
    matchResult(result);
  });
});

describe('getMinMaxOfYAxis', () => {
  it('should return minimum and maximum values for line chart with numeric y-axis', () => {
    const points: LineChartPoints[] = [
      {
        legend: 'Line 1',
        data: [
          { x: 10, y: 20 },
          { x: 30, y: 40 },
        ],
      },
    ];
    const result = utils.findNumericMinMaxOfY(points);
    matchResult(result);
  });

  it('should return minimum and maximum values for vertical stacked bar chart with numeric y-axis', () => {
    const points: DataPoint[] = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const result = utils.findVSBCNumericMinMaxOfY(points);
    matchResult(result);
  });

  it('should return minimum and maximum values for vertical bar chart with numeric y-axis', () => {
    const points: VerticalBarChartDataPoint[] = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const result = utils.findVerticalNumericMinMaxOfY(points);
    matchResult(result);
  });

  it('should return minimum and maximum values for horizontal bar chart with numeric y-axis', () => {
    const points: HorizontalBarChartWithAxisDataPoint[] = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const result = utils.findHBCWANumericMinMaxOfY(points, utils.YAxisType.NumericAxis);
    matchResult(result);
  });
});

test('getTypeOfAxis should return the correct axis type based on the provided label and isXAxis flag', () => {
  expect(utils.getTypeOfAxis('label 1', true)).toBe(utils.XAxisTypes.StringAxis);
  expect(utils.getTypeOfAxis(100, true)).toBe(utils.XAxisTypes.NumericAxis);
  expect(utils.getTypeOfAxis(new Date(), true)).toBe(utils.XAxisTypes.DateAxis);
  expect(utils.getTypeOfAxis('label 1', false)).toBe(utils.YAxisType.StringAxis);
  expect(utils.getTypeOfAxis(100, false)).toBe(utils.YAxisType.NumericAxis);
  expect(utils.getTypeOfAxis(new Date(), false)).toBe(utils.YAxisType.DateAxis);
});

describe('rotateXAxisLabels', () => {
  let xAxisParams: utils.IXAxisParams;
  let result: { xScale: ScaleBand<string>; tickValues: string[] };

  beforeEach(() => {
    xAxisParams = createXAxisParams();
    result = utils.createStringXAxis(xAxisParams, {}, ['X-axis label 1', 'X-axis label 2', 'X-axis label 3']);
  });

  it('should terminate when no x-axis node is provided', () => {
    expect(
      utils.rotateXAxisLabels({
        node: null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        xAxis: result.xScale as any,
      }),
    ).toBeUndefined();
  });

  it('should rotate x-axis labels to 45 degrees anticlockwise', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SVGElement: any = window.SVGElement;
    const originalGetBoundingClientRect = SVGElement.prototype.getBoundingClientRect;
    SVGElement.prototype.getBoundingClientRect = jest.fn().mockReturnValue({ height: 15 });

    const rotatedHeight = utils.rotateXAxisLabels({
      node: xAxisParams.xAxisElement!,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      xAxis: result.xScale as any,
    });
    expect(rotatedHeight).toBe(Math.floor(15 * Math.sin(Math.PI / 4)));
    expect(xAxisParams.xAxisElement).toMatchSnapshot();

    SVGElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });
});

test('wrapTextInsideDonut should wrap valueInsideDonut when it exceeds the maxWidth', () => {
  const content = 'Lorem ipsum dolor sit amet';
  const className = 'insideDonutString-1';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SVGElement: any = window.SVGElement;
  const originalGetComputedTextLength = SVGElement.prototype.getComputedTextLength;
  let calls = 0;
  const results = [5, 11, 11, 9, 14]; // 'Lorem', 'Lorem ipsum', 'ipsum dolor', 'dolor sit', 'dolor sit amet'
  SVGElement.prototype.getComputedTextLength = jest.fn().mockImplementation(() => results[calls++ % results.length]);

  const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textElement.innerHTML = content;
  textElement.classList.add(className);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.appendChild(textElement);
  document.body.appendChild(svg);

  utils.wrapTextInsideDonut(className, 10);
  expect(textElement).toMatchSnapshot();

  document.body.removeChild(svg);

  SVGElement.prototype.getComputedTextLength = originalGetComputedTextLength;
});

test('formatScientificLimitWidth should format a numeric value with appropriate SI prefix', () => {
  expect(utils.formatScientificLimitWidth(19.53)).toBe('19.53');
  expect(utils.formatScientificLimitWidth(983)).toBe('983');
  expect(utils.formatScientificLimitWidth(9801)).toBe('9.8k');
  expect(utils.formatScientificLimitWidth(100990000)).toBe('101M');
});

describe('getClosestPairDiffAndRange', () => {
  it('should return undefined if data length is less than 2', () => {
    const data: number[] = [1];
    const result = vbcUtils.getClosestPairDiffAndRange(data);
    expect(result).toBeUndefined();
  });

  it('should return the minimum difference and range for number data', () => {
    const data: number[] = [1, 5, 3, 9, 2];
    const result = vbcUtils.getClosestPairDiffAndRange(data);
    expect(result).toEqual([1, 8]);
  });

  it('should return the minimum difference and range for date data', () => {
    const data: Date[] = [new Date('2022-01-01'), new Date('2022-01-05'), new Date('2022-01-03')];
    const result = vbcUtils.getClosestPairDiffAndRange(data);
    expect(result).toEqual([2 * 24 * 60 * 60 * 1000, 4 * 24 * 60 * 60 * 1000]);
  });
});

describe('test array equality utility', () => {
  it('both arrays are undefined', () => {
    expect(utils.areArraysEqual(undefined, undefined) === true);
  });

  it('second array is undefined', () => {
    expect(utils.areArraysEqual(['ac', 'bd'], undefined) === true);
  });

  it('first array is undefined', () => {
    expect(utils.areArraysEqual(undefined, ['cg', 'df']) === false);
  });

  it('both arrays are unequal', () => {
    expect(utils.areArraysEqual(['ae', 'bf'], ['cg', 'dh']) === false);
  });

  it('both arrays are equal', () => {
    expect(utils.areArraysEqual(['ab', 'cd', 'ef', 'gh'], ['ab', 'cd', 'ef', 'gh']) === true);
  });
});

describe('defaultYAxisTickFormatter tests', () => {
  it('should format small numbers and maintain precision', () => {
    expect(utils.defaultYAxisTickFormatter(1000)).toBe('1k');
    expect(utils.defaultYAxisTickFormatter(123.56)).toBe('123.56');
    expect(utils.defaultYAxisTickFormatter(148)).toBe('148');
    expect(utils.defaultYAxisTickFormatter(999.56)).toBe('999.56');
    expect(utils.defaultYAxisTickFormatter(1995.89)).toBe('2k');
  });
  it('should format large numbers with SI prefixes', () => {
    expect(utils.defaultYAxisTickFormatter(1e6)).toBe('1M'); // 1 million
    expect(utils.defaultYAxisTickFormatter(1e9)).toBe('1B'); // 1 billion (G replaced with B)
    expect(utils.defaultYAxisTickFormatter(1.5e9)).toBe('1.5B'); // 1.5 billion
  });

  it('should format small numbers without SI prefixes', () => {
    expect(utils.defaultYAxisTickFormatter(0.123)).toBe('0.12'); // Small number
    expect(utils.defaultYAxisTickFormatter(0.0000343)).toBe('0.000034'); // Scientific notation for very small numbers
  });

  it('should format negative numbers correctly', () => {
    expect(utils.defaultYAxisTickFormatter(-1e6)).toBe('−1M'); // Negative 1 million
    expect(utils.defaultYAxisTickFormatter(-1e9)).toBe('−1B'); // Negative 1 billion (G replaced with B)
    expect(utils.defaultYAxisTickFormatter(-0.123)).toBe('−0.12'); // Small negative number
  });

  it('should handle zero correctly', () => {
    expect(utils.defaultYAxisTickFormatter(0)).toBe('0'); // Zero
  });

  it('should not replace G with B for values less than 1e9', () => {
    expect(utils.defaultYAxisTickFormatter(1e8)).toBe('100M'); // 100 million (no G to replace)
  });

  it('should format very small numbers in scientific notation', () => {
    expect(utils.defaultYAxisTickFormatter(0.0000001)).toBe('1e-7'); // Scientific notation
  });
});

describe('createMeasurementSpan test', () => {
  it('should create a span with a unique id on each call', () => {
    const span1 = utils.createMeasurementSpan('text1', 'class1');
    const span2 = utils.createMeasurementSpan('text2', 'class2');
    expect(document.getElementById(span1.id)).toBeTruthy();
    expect(document.getElementById(span2.id)).toBeTruthy();
    expect(span1.id).not.toBe(span2.id);
  });
});

describe('generateLinearTicks', () => {
  it('generates ticks within the domain', () => {
    expect(utils.generateLinearTicks(0, 1, [0, 5])).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('respects tick0 offset', () => {
    expect(utils.generateLinearTicks(0.5, 1, [0, 5])).toEqual([0.5, 1.5, 2.5, 3.5, 4.5]);
  });

  it('handles non-integer tickStep', () => {
    expect(utils.generateLinearTicks(0, 0.5, [0, 2])).toEqual([0, 0.5, 1, 1.5, 2]);
  });

  it('rounds to avoid floating point issues', () => {
    expect(utils.generateLinearTicks(0, 0.1, [0, 0.3])).toEqual([0, 0.1, 0.2, 0.3]);
  });

  it('works when domainMin > tick0', () => {
    expect(utils.generateLinearTicks(0, 2, [5, 12])).toEqual([6, 8, 10, 12]);
  });

  it('works when domainMax < tick0', () => {
    expect(utils.generateLinearTicks(10, 2, [2, 8])).toEqual([2, 4, 6, 8]);
  });

  it('handles reversed domain', () => {
    expect(utils.generateLinearTicks(0, 1, [5, 0])).toEqual([0, 1, 2, 3, 4, 5]);
  });
});

describe('generateMonthlyTicks', () => {
  const jan1 = new Date(2020, 0, 1); // Jan 1, 2020 (local time)

  it('generates ticks every 1 month within domain', () => {
    const ticks = utils.generateMonthlyTicks(jan1, 1, [new Date(2020, 0, 1), new Date(2020, 5, 30)]);
    expect(ticks.map(d => d.toISOString().slice(0, 10))).toEqual([
      '2020-01-01',
      '2020-02-01',
      '2020-03-01',
      '2020-04-01',
      '2020-05-01',
      '2020-06-01',
    ]);
  });

  it('generates ticks every 3 months within domain', () => {
    const ticks = utils.generateMonthlyTicks(jan1, 3, [new Date(2020, 0, 1), new Date(2020, 11, 31)]);
    expect(ticks.map(d => d.toISOString().slice(0, 10))).toEqual([
      '2020-01-01',
      '2020-04-01',
      '2020-07-01',
      '2020-10-01',
    ]);
  });

  it('works when domainMin > tick0', () => {
    const ticks = utils.generateMonthlyTicks(jan1, 2, [new Date(2020, 2, 1), new Date(2020, 8, 1)]);
    expect(ticks.map(d => d.toISOString().slice(0, 10))).toEqual([
      '2020-03-01',
      '2020-05-01',
      '2020-07-01',
      '2020-09-01',
    ]);
  });

  it('works when domainMax < tick0', () => {
    const ticks = utils.generateMonthlyTicks(new Date(2020, 11, 1), 2, [new Date(2020, 2, 1), new Date(2020, 8, 1)]);
    expect(ticks.map(d => d.toISOString().slice(0, 10))).toEqual(['2020-04-01', '2020-06-01', '2020-08-01']);
  });

  it('handles leap years correctly (Feb 29)', () => {
    const ticks = utils.generateMonthlyTicks(new Date(2020, 0, 31), 1, [new Date(2020, 0, 1), new Date(2020, 2, 31)]);
    // Jan 31 → Feb (adjust to Feb 29 since Feb 31 is invalid) → Mar 31
    expect(ticks.map(d => d.toISOString().slice(0, 10))).toEqual(['2020-01-31', '2020-02-29', '2020-03-31']);
  });

  it('handles end-of-month correctly (short months)', () => {
    const ticks = utils.generateMonthlyTicks(new Date(2021, 0, 31), 1, [new Date(2021, 0, 1), new Date(2021, 4, 31)]);
    // Jan 31 → Feb (28th in non-leap year) → Mar 31 → Apr 30 → May 31
    expect(ticks.map(d => d.toISOString().slice(0, 10))).toEqual([
      '2021-01-31',
      '2021-02-28',
      '2021-03-31',
      '2021-04-30',
      '2021-05-31',
    ]);
  });

  it('works with UTC mode', () => {
    const ticks = utils.generateMonthlyTicks(
      new Date(Date.UTC(2020, 0, 1)),
      2,
      [new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(2020, 6, 1))],
      true,
    );
    expect(ticks.map(d => d.toISOString().slice(0, 10))).toEqual([
      '2020-01-01',
      '2020-03-01',
      '2020-05-01',
      '2020-07-01',
    ]);
  });
});
