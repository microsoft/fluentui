import * as utils from './utilities';
import * as colors from './colors';
import { TimeLocaleDefinition as d3TimeLocaleDefinition } from 'd3-time-format';

// Reference to the test plan: packages\react-charting\docs\TestPlans\Utilities\UnitTests.md

describe('Unit test to convert data to localized string', () => {
  test('Should return undefined when data provided is undefined', () => {
    expect(utils.convertToLocaleString(undefined)).toBeUndefined();
  });

  test('Should return the localised data in the given culture when input data is a string', () => {
    expect(utils.convertToLocaleString('text', 'en-GB')).toBe('text');
    expect(utils.convertToLocaleString('text', 'ar-SY')).toBe('text');
  });

  test('Should return the localised data in the given culture when the input data is a number', () => {
    expect(utils.convertToLocaleString(10, 'en-GB')).toBe('10');
    expect(utils.convertToLocaleString(2560, 'ar-SY')).toBe('٢٬٥٦٠');
  });

  test('Should return the localised data when the input data is a string containing a number', () => {
    expect(utils.convertToLocaleString('10', 'en-GB')).toBe('10');
    expect(utils.convertToLocaleString('1234', 'ar-SY')).toBe('١٬٢٣٤');
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

interface ICreateXAxisParams extends Partial<Omit<utils.IXAxisParams, 'domainNRangeValues'>> {
  domainNRangeValues?: Partial<utils.IDomainNRange>;
}
const createXAxisParams = (xAxisParams?: ICreateXAxisParams): utils.IXAxisParams => {
  const xAxisElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  return {
    xAxisElement,
    containerHeight: 100,
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
    utils.createNumericXAxis(xAxisParams, utils.ChartTypes.VerticalBarChart);
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });

  it('should create rounded x-axis labels when showRoundOffXTickValues is true', () => {
    const xAxisParams = createXAxisParams({
      domainNRangeValues: { dStartValue: 0.243, dEndValue: 0.433 },
      showRoundOffXTickValues: true,
    });
    const result = utils.createNumericXAxis(xAxisParams, utils.ChartTypes.VerticalBarChart);
    matchResult(convertXAxisResultToJson(result));
  });

  it('should render the x-axis labels correctly for specific tick size and padding values', () => {
    const xAxisParams = createXAxisParams({ xAxistickSize: 10, tickPadding: 5 });
    utils.createNumericXAxis(xAxisParams, utils.ChartTypes.VerticalBarChart);
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });

  it('should create the x-axis labels correctly for a specific number of ticks', () => {
    const xAxisParams = createXAxisParams({ xAxisCount: 3 });
    const result = utils.createNumericXAxis(xAxisParams, utils.ChartTypes.VerticalBarChart);
    matchResult(convertXAxisResultToJson(result, false, xAxisParams.xAxisCount));
  });

  it('should render the x-axis labels correctly for horizontal bar chart with axis', () => {
    const xAxisParams = createXAxisParams();
    utils.createNumericXAxis(xAxisParams, utils.ChartTypes.HorizontalBarChartWithAxis);
    expect(xAxisParams.xAxisElement).toMatchSnapshot();
  });
});

describe('createDateXAxis', () => {
  const domainNRangeValues: ICreateXAxisParams['domainNRangeValues'] = {
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
    const result = utils.createDateXAxis(xAxisParams, {}, undefined, undefined, undefined, (dateTime: Date) =>
      dateTime.toUTCString(),
    );
    matchResult(convertXAxisResultToJson(result));
  });

  it('should create the x-axis labels correctly when culture and options are provided', () => {
    const xAxisParams = createXAxisParams({ domainNRangeValues });
    const result = utils.createDateXAxis(xAxisParams, {}, 'ar-EG', { dateStyle: 'full', timeStyle: 'long' });
    matchResult(convertXAxisResultToJson(result));
  });

  it('should create the x-axis labels correctly when timeFormatLocale is provided', () => {
    // Fetched from https://unpkg.com/d3-time-format@2/locale/it-IT.json
    const timeFormatLocale: d3TimeLocaleDefinition = {
      dateTime: '%A %e %B %Y, %X',
      date: '%d/%m/%Y',
      time: '%H:%M:%S',
      periods: ['AM', 'PM'],
      days: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
      shortDays: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
      months: [
        'Gennaio',
        'Febbraio',
        'Marzo',
        'Aprile',
        'Maggio',
        'Giugno',
        'Luglio',
        'Agosto',
        'Settembre',
        'Ottobre',
        'Novembre',
        'Dicembre',
      ],
      shortMonths: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    };
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

  it('should create the x-axis labels correctly for specific padding values', () => {
    const xAxisParams = createXAxisParams({ xAxisPadding: 0.5 });
    const result = utils.createStringXAxis(xAxisParams, {}, dataset);
    matchResult(convertXAxisResultToJson(result, true));
  });

  it('should create the x-axis labels correctly for specific inner and outer padding values', () => {
    const xAxisParams = createXAxisParams({ xAxisInnerPadding: 0.5, xAxisOuterPadding: 1 / 3 });
    const result = utils.createStringXAxis(xAxisParams, {}, dataset);
    matchResult(convertXAxisResultToJson(result, true));
  });
});

test('prepareDatapoints should return an array of uniformly distributed data points', () => {
  const result = utils.prepareDatapoints(100, 0, 3);
  matchResult(result);
});
