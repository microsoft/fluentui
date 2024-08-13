import * as React from 'react';
import { HeatMapChart, IHeatMapChartProps } from '../src/HeatMapChart';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HeatMapChartBase } from '../src/components/HeatMapChart/HeatMapChart.base';
import { IHeatMapChartData, IHeatMapChartDataPoint } from '../src/HorizontalBarChart';
import { render } from '@testing-library/react';
import { dataToBuffer } from 'memfs/lib/volume';
import { XAxisTypes, YAxisType } from '../src/utilities/index';
import { conditionalTest, isTimezoneSet, forEachTimezone } from '../src/utilities/TestUtility.test';
import { resetIds } from '@fluentui/react';

const env = require('../config/tests');
const runTest = env === 'TEST' ? describe : describe.skip;
const { Timezone } = require('../scripts/constants');

const emptyData: IHeatMapChartData[] = [];
const domainValuesForColorScale = [0, 600];
const rangeValuesForColorScale = ['lightblue', 'darkblue'];
const yPoint: string[] = ['p1', 'p2'];
const xPoint: string[] = ['Test1', 'test2'];

const yPoint1: number[] = [10000];
const xPoint1: number[] = [20000];

const yPoint2: Date[] = [new Date('2020-03-03T15:00Z')];
const xPoint2: Date[] = [new Date('2020-04-03T15:00Z')];

const HeatMapData: IHeatMapChartProps['data'] = [
  {
    value: 100,
    legend: 'Execllent (0-200)',
    data: [
      {
        x: xPoint[0],
        y: yPoint[0],
        value: 50,
        rectText: 50,
        ratio: [50, 2391],
        descriptionMessage: 'a good day to start with in Texas with best air quality',
      },
      {
        x: xPoint[1],
        y: yPoint[1],
        value: 25,
        rectText: 25,
        ratio: [25, 2479],
        descriptionMessage: `Due to unexpected heavy rain`,
      },
    ],
  },
];

const HeatMapDataNumaricPoints: IHeatMapChartProps['data'] = [
  {
    value: 100,
    legend: 'Execllent (0-200)',
    data: [
      {
        x: xPoint1[0],
        y: yPoint1[0],
        value: 50,
        rectText: 50,
        ratio: [50, 2391],
        descriptionMessage: 'a good day to start with in Texas with best air quality',
      },
    ],
  },
  {
    value: 300,
    legend: 'poor(200-400)',
    data: [
      {
        x: xPoint1[0],
        y: yPoint1[0],
        value: 50,
        rectText: 50,
        ratio: [50, 2391],
        descriptionMessage: 'poor air quality',
      },
    ],
  },
];

const HeatMapDataDatePoints: IHeatMapChartProps['data'] = [
  {
    value: 100,
    legend: 'Execllent (0-200)',
    data: [
      {
        x: xPoint2[0],
        y: yPoint2[0],
        value: 50,
        rectText: 50,
        ratio: [50, 2391],
        descriptionMessage: 'a good day to start with in Texas with best air quality',
      },
    ],
  },
];

function sharedBeforeEach() {
  resetIds();
}

runTest('_getXandY', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper X and Y values for string xPoint and yPoint', () => {
    render(<HeatMapChart data={HeatMapData} domainValuesForColorScale={[]} rangeValuesForColorScale={[]} />);
    const instance = new HeatMapChartBase({
      data: HeatMapData,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const result = instance._getXandY();
    expect(result).toBeDefined();
    expect(result.x).toEqual('Test1');
    expect(result.y).toEqual('p1');
  });

  test('Should return proper X and Y values for numaric xPoint and yPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const result = instance._getXandY();
    expect(result).toBeDefined();
    expect(result.x).toEqual(20000);
    expect(result.y).toEqual(10000);
  });
});

runTest('_getOpacity', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper opacity for legends', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const result = instance._getOpacity(HeatMapDataNumaricPoints[0].legend);
    expect(result).toBeDefined();
    expect(result).toEqual('1');
    const result1 = instance._getOpacity(HeatMapDataNumaricPoints[1].legend);
    expect(result1).toBeDefined();
    expect(result1).toEqual('1');
  });
});

runTest('_createLegendBars', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper legends data', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    instance._colorScale = instance._getColorScale();
    const result = instance._createLegendBars();
    expect(result).toBeDefined();
    expect(result.props.legends).toHaveLength(2);
    const legends = result.props.legends;
    expect(legends[0].title).toEqual('Execllent (0-200)');
    expect(legends[1].title).toEqual('poor(200-400)');
  });
});

runTest('_getColorScale', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper color scale data', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const colorScale = instance._getColorScale();
    expect(colorScale).toBeDefined();
    expect(colorScale(HeatMapDataNumaricPoints[0].value)).toEqual('rgb(144, 180, 215)');
    expect(colorScale(HeatMapDataNumaricPoints[1].value)).toEqual('rgb(87, 108, 185)');
    expect(colorScale(-100)).toEqual('rgb(202, 252, 245)');
    expect(colorScale(700)).toEqual('rgb(0, 0, 124)');
  });
});

runTest('_getXIndex', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper xIndex for string xPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    instance._xAxisType = XAxisTypes.StringAxis;
    const xIndex = instance._getXIndex(xPoint[0]);
    expect(xIndex).toEqual('Test1');
  });

  test('Should return proper xIndex for numeric xPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    instance._xAxisType = XAxisTypes.NumericAxis;
    const xIndex = instance._getXIndex(xPoint1[0]);
    expect(xIndex).toEqual('20000');
  });
});

runTest('_getYIndex', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper yIndex for string yPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    instance._yAxisType = YAxisType.StringAxis;
    const yIndex = instance._getYIndex(yPoint[0]);
    expect(yIndex).toEqual('p1');
  });

  test('Should return proper yIndex for numeric yPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    instance._yAxisType = YAxisType.NumericAxis;
    const yIndex = instance._getYIndex(yPoint1[0]);
    expect(yIndex).toEqual('10000');
  });
});

runTest('_getAriaLabel', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper aria-label for numeric xPoint and yPoint', () => {
    const p1 = {
      x: 10,
      y: 30,
      value: 100,
      legend: 'legend1',
    };
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const ariaLabel = instance._getAriaLabel(p1);
    expect(ariaLabel).toEqual('10, 30. legend1, 100.');
  });

  test('Should return proper aria-label for numeric xPoint and yPoint without legend value', () => {
    const p1 = {
      x: 10,
      y: 30,
      value: 100,
      legend: '',
    };
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const ariaLabel = instance._getAriaLabel(p1);
    expect(ariaLabel).toEqual('10, 30. , 100.');
  });

  test('Should return proper aria-label for string xPoint and yPoint', () => {
    const p1 = {
      x: 'x1',
      y: 'y1',
      value: 100,
      legend: 'legend1',
    };
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const ariaLabel = instance._getAriaLabel(p1);
    expect(ariaLabel).toEqual('x1, y1. legend1, 100.');
  });

  test('Should return proper aria-label for string xPoint and yPoint without legend', () => {
    const p1 = {
      x: 'x1',
      y: 'y1',
      value: 100,
      legend: '',
    };
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const ariaLabel = instance._getAriaLabel(p1);
    expect(ariaLabel).toEqual('x1, y1. , 100.');
  });
});

runTest('_getFormattedLabelForXAxisDataPoint', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper xAxis label for non empty string', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const label = instance._getFormattedLabelForXAxisDataPoint(xPoint[0]);
    expect(label).toEqual('Test1');
  });

  test('Should return proper xAxis label for empty string', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const label = instance._getFormattedLabelForXAxisDataPoint('');
    expect(label).toEqual('');
  });
});

runTest('_getFormattedLabelForYAxisDataPoint', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper yAxis label for non empty string', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const label = instance._getFormattedLabelForYAxisDataPoint(yPoint[0]);
    expect(label).toEqual('p1');
  });

  test('Should return proper yAxis label for empty data', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const label = instance._getFormattedLabelForYAxisDataPoint('');
    expect(label).toEqual('');
  });
});

runTest('_getStringFormattedNumber', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper string formatted number for numeric value', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getStringFormattedNumber('1000');
    expect(result).toEqual('1k');
  });

  test('Should return proper string formatted number with format string', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getStringFormattedNumber('10000', '.2~s');
    expect(result).toEqual('10k');
  });

  test('Should return proper string formatted number for empty data', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getStringFormattedNumber('');
    expect(result).toEqual('0');
  });

  test('Should return proper string formatted number for string value', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getStringFormattedNumber('Test1');
    expect(result).toEqual('NaN');
  });
});

runTest('_getXAxisDataPoints', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper xAxis data points for string points', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getXAxisDataPoints({ B: '1', A: '1' });
    expect(result[0]).toEqual('A');
    expect(result[1]).toEqual('B');
  });

  test('Should return proper xAxis data points for numeric points', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    instance._xAxisType = XAxisTypes.NumericAxis;
    const result = instance._getXAxisDataPoints({ 100: '1', 30: '1' });
    expect(result[0]).toEqual('30');
    expect(result[1]).toEqual('100');
  });
});

runTest('_getYAxisDataPoints', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper yAxis data points for string points', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getYAxisDataPoints({ B: '1', A: '1' });
    expect(result[0]).toEqual('A');
    expect(result[1]).toEqual('B');
  });

  test('Should return proper yAxis data points for numeric points', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    instance._yAxisType = YAxisType.NumericAxis;
    const result = instance._getYAxisDataPoints({ 100: '1', 30: '1' });
    expect(result[0]).toEqual('30');
    expect(result[1]).toEqual('100');
  });
});

runTest('_createNewDataSet', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper data set for default axis type', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._createNewDataSet(HeatMapData, '%b/%d', '.2~s', '%b/%d', '.2~s');
    expect(result).toMatchSnapshot();
    expect(result.xAxisPoints[0]).toEqual('');
    expect(result.yAxisPoints[0]).toEqual('');
  });

  test('Should return proper data set for string axis type', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    instance._xAxisType = XAxisTypes.StringAxis;
    instance._yAxisType = YAxisType.StringAxis;
    const result = instance._createNewDataSet(HeatMapData, undefined, undefined, undefined, undefined);
    expect(result.dataSet.p1[0].descriptionMessage).toEqual('a good day to start with in Texas with best air quality');
    expect(result.dataSet.p1[0].x).toEqual('Test1');
    expect(result.dataSet.p1[0].y).toEqual('p1');
    expect(result.dataSet.p2[0].descriptionMessage).toEqual('Due to unexpected heavy rain');
    expect(result.dataSet.p2[0].x).toEqual('test2');
    expect(result.dataSet.p2[0].y).toEqual('p2');
    expect(result.xAxisPoints[0]).toEqual('Test1');
    expect(result.xAxisPoints[1]).toEqual('test2');
    expect(result.yAxisPoints[0]).toEqual('p1');
    expect(result.yAxisPoints[1]).toEqual('p2');
  });

  test('Should return proper data set for date axis with date axis type', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    instance._xAxisType = XAxisTypes.DateAxis;
    instance._yAxisType = YAxisType.DateAxis;
    expect(instance).toBeDefined();
    const result = instance._createNewDataSet(HeatMapDataDatePoints, '%b/%d', undefined, '%b/%d', undefined);
    expect(result.xAxisPoints[0]).toEqual('Apr/03');
    expect(result.yAxisPoints[0]).toEqual('Mar/03');
  });

  test('Should return proper data set for numeric axis type', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    instance._xAxisType = XAxisTypes.NumericAxis;
    instance._yAxisType = YAxisType.NumericAxis;
    expect(instance).toBeDefined();
    const result = instance._createNewDataSet(HeatMapDataNumaricPoints, undefined, undefined, undefined, undefined);
    expect(result.xAxisPoints[0]).toEqual('20k');
    expect(result.yAxisPoints[0]).toEqual('10k');
  });
});

runTest('Timezone related test cases', () => {
  forEachTimezone((tzName, tzIdentifier) => {
    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper data set for date axis with default axis type in ${tzName} timezone`,
      () => {
        const instance = new HeatMapChartBase({
          data: emptyData,
          domainValuesForColorScale: [],
          rangeValuesForColorScale: [],
        });
        expect(instance).toBeDefined();
        instance._yAxisType = YAxisType.DateAxis;
        instance._xAxisType = XAxisTypes.DateAxis;
        const result = instance._createNewDataSet(HeatMapDataDatePoints, '%b/%d', '.2~s', '%b/%d', '.2~s');
        expect(result.xAxisPoints[0]).toMatchSnapshot();
        expect(result.yAxisPoints[0]).toMatchSnapshot();
      },
    );

    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper aria-label for date xPoint and yPoint in ${tzName} timezone`,
      () => {
        const p1 = {
          x: new Date('2020-03-03T15:00Z'),
          y: new Date('2020-04-03T15:00Z'),
          value: 100,
          legend: 'legend1',
        };
        const instance = new HeatMapChartBase({
          data: emptyData,
          domainValuesForColorScale: [],
          rangeValuesForColorScale: [],
        });
        expect(instance).toBeDefined();
        const ariaLabel = instance._getAriaLabel(p1);
        expect(ariaLabel).toMatchSnapshot();
      },
    );

    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper aria-label for date xPoint and yPoint without legend in ${tzName} timezone`,
      () => {
        const p1 = {
          x: new Date('2020-03-03T15:00Z'),
          y: new Date('2020-04-03T15:00Z'),
          value: 100,
          legend: '',
        };
        const instance = new HeatMapChartBase({
          data: emptyData,
          domainValuesForColorScale: [],
          rangeValuesForColorScale: [],
        });
        expect(instance).toBeDefined();
        const ariaLabel = instance._getAriaLabel(p1);
        expect(ariaLabel).toMatchSnapshot();
      },
    );

    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper aria-label for numeric xPoint and date yPoint in ${tzName} timezone`,
      () => {
        const p1 = {
          x: 100,
          y: new Date('2020-04-03T15:00Z'),
          value: 100,
          legend: '',
        };
        const instance = new HeatMapChartBase({
          data: emptyData,
          domainValuesForColorScale: [],
          rangeValuesForColorScale: [],
        });
        expect(instance).toBeDefined();
        const ariaLabel = instance._getAriaLabel(p1);
        expect(ariaLabel).toMatchSnapshot();
      },
    );

    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper X and Y values for date xPoint and yPoint in ${tzName} timezone`,
      () => {
        const instance = new HeatMapChartBase({
          data: HeatMapDataDatePoints,
          domainValuesForColorScale: domainValuesForColorScale,
          rangeValuesForColorScale: rangeValuesForColorScale,
        });
        expect(instance).toBeDefined();
        const result = instance._getXandY();
        expect(result).toBeDefined();
        expect(result.x).toMatchSnapshot();
        expect(result.y).toMatchSnapshot();
      },
    );

    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper xIndex for date xPoint in ${tzName} timezone`,
      () => {
        const instance = new HeatMapChartBase({
          data: HeatMapDataNumaricPoints,
          domainValuesForColorScale: domainValuesForColorScale,
          rangeValuesForColorScale: rangeValuesForColorScale,
        });
        expect(instance).toBeDefined();
        instance._xAxisType = XAxisTypes.DateAxis;
        const xIndex = instance._getXIndex(xPoint2[0]);
        expect(xIndex).toMatchSnapshot();
      },
    );

    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper yIndex for date xPoint in ${tzName} timezone`,
      () => {
        const instance = new HeatMapChartBase({
          data: HeatMapDataNumaricPoints,
          domainValuesForColorScale: domainValuesForColorScale,
          rangeValuesForColorScale: rangeValuesForColorScale,
        });
        expect(instance).toBeDefined();
        instance._yAxisType = YAxisType.DateAxis;
        const yIndex = instance._getYIndex(yPoint2[0]);
        expect(yIndex).toMatchSnapshot();
      },
    );

    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper string formatted date for date point in ${tzName} timezone`,
      () => {
        const instance = new HeatMapChartBase({
          data: emptyData,
          domainValuesForColorScale: [],
          rangeValuesForColorScale: [],
        });
        expect(instance).toBeDefined();
        const result = instance._getStringFormattedDate('100000000');
        expect(result).toMatchSnapshot();
      },
    );

    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper string formatted date for empty point in ${tzName} timezone`,
      () => {
        const instance = new HeatMapChartBase({
          data: emptyData,
          domainValuesForColorScale: [],
          rangeValuesForColorScale: [],
        });
        expect(instance).toBeDefined();
        const result = instance._getStringFormattedDate('');
        expect(result).toMatchSnapshot();
      },
    );

    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper string formatted date for date point in ${tzName} timezone`,
      () => {
        const instance = new HeatMapChartBase({
          data: emptyData,
          domainValuesForColorScale: [],
          rangeValuesForColorScale: [],
        });
        expect(instance).toBeDefined();
        const result = instance._getStringFormattedDate('100000000', '%b/%d/%Y');
        expect(result).toMatchSnapshot();
      },
    );

    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper xAxis data points for date points in ${tzName} timezone`,
      () => {
        const instance = new HeatMapChartBase({
          data: emptyData,
          domainValuesForColorScale: [],
          rangeValuesForColorScale: [],
        });
        expect(instance).toBeDefined();
        instance._xAxisType = XAxisTypes.DateAxis;
        const result = instance._getXAxisDataPoints({ '30': '1', '10': '1' });
        expect(result[0]).toMatchSnapshot();
      },
    );

    conditionalTest(isTimezoneSet(tzIdentifier) && env === 'TEST')(
      `Should return proper yAxis data points for date points in ${tzName} timezone`,
      () => {
        const instance = new HeatMapChartBase({
          data: emptyData,
          domainValuesForColorScale: [],
          rangeValuesForColorScale: [],
        });
        expect(instance).toBeDefined();
        instance._yAxisType = YAxisType.DateAxis;
        const result = instance._getYAxisDataPoints({ '300000000': '1', '100000000': '1' });
        expect(result[0]).toMatchSnapshot();
      },
    );
  });

  runTest('Should return proper min and max for y axis', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale,
      rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const result = instance._getMinMaxOfYAxis();
    expect(result).toBeDefined();
    expect(result.startValue).toEqual(0);
    expect(result.endValue).toEqual(0);
  });
});
