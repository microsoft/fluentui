import * as React from 'react';
import { HeatMapChart, IHeatMapChartProps } from '../src/HeatMapChart';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HeatMapChartBase } from '../src/components/HeatMapChart/HeatMapChart.base';
import { IHeatMapChartData, IHeatMapChartDataPoint } from '../src/HorizontalBarChart';
import { render } from '@testing-library/react';
import { dataToBuffer } from 'memfs/lib/volume';
import { YAxisType } from '../src/utilities/index';

const env = require('../config/tests');
const runTest = env === 'TEST' ? describe : describe.skip;

const emptyData: IHeatMapChartData[] = [];
const domainValuesForColorScale = [0, 600];
const rangeValuesForColorScale = ['lightblue', 'darkblue'];
const yPoint: string[] = ['p1', 'p2'];
const xPoint: string[] = ['Test1', 'test2'];

const yPoint1: number[] = [10];
const xPoint1: number[] = [20];

const yPoint2: Date[] = [new Date('2020-03-03')];
const xPoint2: Date[] = [new Date('2020-04-03')];

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
        descriptionMessage: `Due to unexpected heavy rain, all the pollutants are washed
        off and people of alaska are hoping for more of this days`,
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

runTest('_getXandY', () => {
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
    expect(result.x).toEqual(20);
    expect(result.y).toEqual(10);
  });

  test('Should return proper X and Y values for date xPoint and yPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataDatePoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const result = instance._getXandY();
    expect(result).toBeDefined();
    expect(result.x).toEqual(new Date('2020-04-03T00:00:00.000Z'));
    expect(result.y).toEqual(new Date('2020-03-03T00:00:00.000Z'));
  });
});

runTest('_getOpacity', () => {
  test('Should return proper X and Y values for string xPoint and yPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapData,
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
  test('Should return proper X and Y values for string xPoint and yPoint', () => {
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
  test('Should return proper X and Y values for string xPoint and yPoint', () => {
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
  test('Should return proper xIndex for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const xIndex = instance._getXIndex(xPoint[0]);
    expect(xIndex).toEqual('Test1');
  });

  test('Should return proper xIndex for number xPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const xIndex = instance._getXIndex(xPoint1[0]);
    expect(xIndex).toEqual('20');
  });

  test('Should return proper xIndex for date xPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const xIndex = instance._getXIndex(xPoint2[0]);
    expect(xIndex).toEqual('Fri Apr 03 2020 05:30:00 GMT+0530 (India Standard Time)');
  });
});

runTest('_getYIndex', () => {
  test('Should return proper xIndex for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const yIndex = instance._getYIndex(yPoint[0]);
    expect(yIndex).toEqual('p1');
  });

  test('Should return proper xIndex for number xPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const yIndex = instance._getYIndex(yPoint1[0]);
    expect(yIndex).toEqual('10');
  });

  test('Should return proper xIndex for date xPoint', () => {
    const instance = new HeatMapChartBase({
      data: HeatMapDataNumaricPoints,
      domainValuesForColorScale: domainValuesForColorScale,
      rangeValuesForColorScale: rangeValuesForColorScale,
    });
    expect(instance).toBeDefined();
    const yIndex = instance._getYIndex(yPoint2[0]);
    expect(yIndex).toEqual('Tue Mar 03 2020 05:30:00 GMT+0530 (India Standard Time)');
  });
});

runTest('_getAriaLabel', () => {
  test('Should return proper aria-label for String xPoint', () => {
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

  test('Should return proper aria-label for String xPoint', () => {
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

  test('Should return proper aria-label for String xPoint', () => {
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

  test('Should return proper aria-label for String xPoint', () => {
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

  test('Should return proper aria-label for String xPoint', () => {
    const p1 = {
      x: new Date('2020-03-03'),
      y: new Date('2020-04-03'),
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
    expect(ariaLabel).toEqual(
      'Tue Mar 03 2020 05:30:00 GMT+0530 (India Standard Time), Fri Apr 03 2020 05:30:00 GMT+0530 (India Standard Time). legend1, 100.',
    );
  });

  test('Should return proper aria-label for String xPoint', () => {
    const p1 = {
      x: new Date('2020-03-03'),
      y: new Date('2020-04-03'),
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
    expect(ariaLabel).toEqual(
      'Tue Mar 03 2020 05:30:00 GMT+0530 (India Standard Time), Fri Apr 03 2020 05:30:00 GMT+0530 (India Standard Time). , 100.',
    );
  });

  test('Should return proper aria-label for String xPoint', () => {
    const p1 = {
      x: 100,
      y: new Date('2020-04-03'),
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
    expect(ariaLabel).toEqual('100, Fri Apr 03 2020 05:30:00 GMT+0530 (India Standard Time). , 100.');
  });
});

runTest('_getFormattedLabelForXAxisDataPoint', () => {
  test('Should return proper aria-label for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const label = instance._getFormattedLabelForYAxisDataPoint(yPoint[0]);
    expect(label).toEqual('p1');
  });

  test('Should return proper aria-label for String xPoint', () => {
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

runTest('_getFormattedLabelForXAxisDataPoint', () => {
  test('Should return proper aria-label for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const label = instance._getFormattedLabelForXAxisDataPoint(xPoint[0]);
    expect(label).toEqual('Test1');
  });

  test('Should return proper aria-label for String xPoint', () => {
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

runTest('_getStringFormattedNumber', () => {
  test('Should return proper aria-label for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getStringFormattedNumber('1000');
    expect(result).toEqual('1k');
  });

  test('Should return proper aria-label for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getStringFormattedNumber('10000', '.2~s');
    expect(result).toEqual('10k');
  });

  test('Should return proper aria-label for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getStringFormattedNumber('');
    expect(result).toEqual('0');
  });

  test('Should return proper aria-label for String xPoint', () => {
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

runTest('_getStringFormattedDate', () => {
  test('Should return proper aria-label for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getStringFormattedDate('10');
    expect(result).toEqual('Jan/01');
  });

  test('Should return proper aria-label for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getStringFormattedDate('');
    expect(result).toEqual('Jan/01');
  });

  test('Should return proper aria-label for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    const result = instance._getStringFormattedDate('10', '%b/%d/%Y');
    expect(result).toEqual('Jan/01/1970');
  });
});

runTest('_getYAxisDataPoints', () => {
  test('Should return proper aria-label for String xPoint', () => {
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

  test('Should return proper aria-label for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    instance._yAxisType = YAxisType.NumericAxis;
    const yPoint1: Date = new Date('2020-03-03');
    const result = instance._getYAxisDataPoints({ 100: '1', 30: '1' });
    expect(result[0]).toEqual('30');
    expect(result[1]).toEqual('100');
  });

  test('Should return proper aria-label for String xPoint', () => {
    const instance = new HeatMapChartBase({
      data: emptyData,
      domainValuesForColorScale: [],
      rangeValuesForColorScale: [],
    });
    expect(instance).toBeDefined();
    instance._yAxisType = YAxisType.DateAxis;
    const result = instance._getYAxisDataPoints({ '30': '1', '10': '1' });
    expect(result[0]).toEqual('Jan/01');
    expect(result[1]).toEqual('Jan/01');
  });
});
