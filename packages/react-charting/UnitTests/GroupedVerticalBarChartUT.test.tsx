import * as React from 'react';
import { render } from '@testing-library/react';
import { DarkTheme } from '@fluentui/theme-samples';
import {
  GroupedVerticalBarChart,
  IGVBarChartSeriesPoint,
  IGroupedVerticalBarChartData,
  IGroupedVerticalBarChartStyleProps,
  IGroupedVerticalBarChartStyles,
} from '../src/index';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { GroupedVerticalBarChartBase } from '../src/components/GroupedVerticalBarChart/GroupedVerticalBarChart.base';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { resetIds } from '@fluentui/react';
import { ChartTypes, XAxisTypes } from '../src/utilities/utilities';

const env = require('../config/tests');

const runTest = env === 'TEST' ? describe : describe.skip;

const getClassNames = classNamesFunction<IGroupedVerticalBarChartStyleProps, IGroupedVerticalBarChartStyles>();

const chartPoints: IGroupedVerticalBarChartData[] = [
  {
    name: 'Jan - Mar',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '29%',
      },
      {
        key: 'series2',
        data: 44000,
        color: DefaultPalette.blue,
        legend: '2023',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '44%',
      },
    ],
  },
  {
    name: 'Apr - Jun',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2020/05/30',
        yAxisCalloutData: '29%',
      },
      {
        key: 'series2',
        data: 3000,
        color: DefaultPalette.blue,
        legend: '2023',
        xAxisCalloutData: '2020/05/30',
        yAxisCalloutData: '3%',
      },
    ],
  },

  {
    name: 'Jul - Sep',
    series: [
      {
        key: 'series1',
        data: 14000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2020/06/30',
        yAxisCalloutData: '13%',
      },
      {
        key: 'series2',
        data: 50000,
        color: DefaultPalette.blue,
        legend: '2023',
        xAxisCalloutData: '2020/06/30',
        yAxisCalloutData: '50%',
      },
    ],
  },
  {
    name: 'Oct - Dec',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2020/07/30',
        yAxisCalloutData: '29%',
      },
      {
        key: 'series2',
        data: 3000,
        color: DefaultPalette.blue,
        legend: '2023',
        xAxisCalloutData: '2020/07/30',
        yAxisCalloutData: '3%',
      },
    ],
  },
];

const chartPointsWithSingleSeries: IGroupedVerticalBarChartData[] = [
  {
    name: 'Jan - Mar',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '29%',
      },
    ],
  },
  {
    name: 'Apr - Jun',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2020/05/30',
        yAxisCalloutData: '29%',
      },
    ],
  },

  {
    name: 'Jul - Sep',
    series: [
      {
        key: 'series1',
        data: 14000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2020/06/30',
        yAxisCalloutData: '13%',
      },
    ],
  },
  {
    name: 'Oct - Dec',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: DefaultPalette.blue,
        legend: '2022',
        xAxisCalloutData: '2020/07/30',
        yAxisCalloutData: '29%',
      },
    ],
  },
];

const datasetForBars = [
  [
    {
      key: 'series1',
      data: 33000,
      color: DefaultPalette.blue,
      legend: '2022',
      xAxisCalloutData: '2020/05/30',
      yAxisCalloutData: '29%',
    },
    {
      key: 'series2',
      data: 3000,
      color: DefaultPalette.blue,
      legend: '2023',
      xAxisCalloutData: '2020/05/30',
      yAxisCalloutData: '3%',
    },
  ],
  [
    {
      key: 'series1',
      data: 33000,
      color: DefaultPalette.blue,
      legend: '2022',
      xAxisCalloutData: '2020/05/30',
      yAxisCalloutData: '29%',
    },
    {
      key: 'series2',
      data: 3000,
      color: DefaultPalette.blue,
      legend: '2023',
      xAxisCalloutData: '2020/05/30',
      yAxisCalloutData: '3%',
    },
  ],
];

const areaLabelPoints: IGVBarChartSeriesPoint[] = [
  {
    key: 'series1',
    data: 33000,
    color: DefaultPalette.blue,
    legend: '2022',
    xAxisCalloutData: '2020/07/30',
    yAxisCalloutData: '29%',
  },
  {
    key: 'series1',
    data: 33000,
    color: DefaultPalette.blue,
    legend: '2022',
  },
  {
    key: 'series1',
    data: 33000,
    color: DefaultPalette.blue,
    legend: '2022',
    xAxisCalloutData: '2020/07/30',
  },
  {
    key: 'series1',
    data: 33000,
    color: DefaultPalette.blue,
    legend: '2022',
    yAxisCalloutData: '29%',
  },
];

const margins = {
  left: 10,
  right: 10,
  top: 10,
  bottom: 10,
};

function sharedBeforeEach() {
  resetIds();
}

runTest('_createDataSetOfGVBC', () => {
  beforeEach(sharedBeforeEach);

  test('Should create grouped vertical bar chart data for multiple series', () => {
    render(<GroupedVerticalBarChart data={chartPoints} />);
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    const result = instance._createDataSetOfGVBC(chartPoints);
    expect(result).toBeDefined();
    expect(result['datasetForBars']).toHaveLength(4);
    expect(result['keys']).toHaveLength(2);
    expect(result['xAxisLabels']).toHaveLength(4);

    const datasetForBars = result['datasetForBars'];
    const firstBar = datasetForBars[0];
    expect(firstBar['series1']['key']).toEqual('series1');
    expect(firstBar['series2']['key']).toEqual('series2');
    expect(result['keys'][0]).toEqual('series1');
    expect(result['keys'][1]).toEqual('series2');
    expect(result['xAxisLabels'][0]).toEqual('Jan - Mar');
    expect(result['xAxisLabels'][1]).toEqual('Apr - Jun');
    expect(result['xAxisLabels'][2]).toEqual('Jul - Sep');
    expect(result['xAxisLabels'][3]).toEqual('Oct - Dec');
  });

  test('Should create grouped vertical bar chart data for single series', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    const result = instance._createDataSetOfGVBC(chartPointsWithSingleSeries);
    expect(result).toBeDefined();
    expect(result['datasetForBars']).toHaveLength(4);
    expect(result['keys']).toHaveLength(1);
    expect(result['xAxisLabels']).toHaveLength(4);

    const datasetForBars = result['datasetForBars'];
    const firstBar = datasetForBars[0];
    expect(firstBar['series1']['key']).toEqual('series1');
    expect(result['keys'][0]).toEqual('series1');
    expect(result['xAxisLabels'][0]).toEqual('Jan - Mar');
    expect(result['xAxisLabels'][1]).toEqual('Apr - Jun');
    expect(result['xAxisLabels'][2]).toEqual('Jul - Sep');
    expect(result['xAxisLabels'][3]).toEqual('Oct - Dec');
  });
});

runTest('_createDataset', () => {
  beforeEach(sharedBeforeEach);

  test('Should create bars data for multiple series', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    const result = instance._createDataset(chartPoints);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
    expect(result[0]['series1']).not.toBeNull();
    expect(result[0]['series2']).not.toBeNull();
    expect(result[0]['series1']['key']).toEqual('series1');
    expect(result[0]['series2']['key']).toEqual('series2');
    expect(result[0]['series1']['data']).toEqual(33000);
    expect(result[0]['series2']['data']).toEqual(44000);
    expect(result[0]['xAxisPoint']).toEqual('Jan - Mar');
  });

  test('Should create bars data for single series', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    const result = instance._createDataset(chartPointsWithSingleSeries);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
    expect(result[0]['series1']).not.toBeNull();
    expect(result[0]['series1']['key']).toEqual('series1');
    expect(result[0]['series1']['data']).toEqual(33000);
    expect(result[0]['xAxisPoint']).toEqual('Jan - Mar');
  });
});

runTest('_getLegendData', () => {
  beforeEach(sharedBeforeEach);

  test('Should return legends data for multiple series', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const result = instance._getLegendData(chartPoints, palette);
    expect(result).toBeDefined();
    expect(result['props']).not.toBeNull();
    const legends = result['props']['legends'];
    expect(legends).toHaveLength(2);
    expect(legends[0]['title']).toEqual('2022');
    expect(legends[1]['title']).toEqual('2023');
  });

  test('Should return legends data for single series', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    const { palette } = DarkTheme;
    const result = instance._getLegendData(chartPointsWithSingleSeries, palette);
    expect(result).toBeDefined();
    expect(result['props']).not.toBeNull();
    const legends = result['props']['legends'];
    expect(legends).toHaveLength(1);
    expect(legends[0]['title']).toEqual('2022');
  });
});

runTest('_isChartEmpty', () => {
  beforeEach(sharedBeforeEach);

  test('Should return true when chart data is empty ', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    expect(instance._isChartEmpty()).toEqual(true);
  });

  test('Should return false when chart data is available ', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    expect(instance._isChartEmpty()).toEqual(false);
  });
});

runTest('_getAriaLabel', () => {
  beforeEach(sharedBeforeEach);

  test('Should return correct aria label for a point with xAxisCalloutData and yAxisCalloutData', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(areaLabelPoints[0], '')).toEqual('2020/07/30. 2022, 29%.');
  });

  test('Should return correct aria label for a point without xAxisCalloutData and yAxisCalloutData', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(areaLabelPoints[1], '')).toEqual('. 2022, 33000.');
  });

  test('Should return correct aria label for a point with xAxisCalloutData and without yAxisCalloutData', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(areaLabelPoints[2], '')).toEqual('2020/07/30. 2022, 33000.');
  });

  test('Should return correct aria label for a point without xAxisCalloutData and with yAxisCalloutData', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(areaLabelPoints[3], '')).toEqual('. 2022, 29%.');
  });

  test('Should return correct aria label for a point with xAxisPoint and without xAxisCalloutData yAxisCalloutData', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: [],
    });
    expect(instance).toBeDefined();
    expect(instance._getAriaLabel(areaLabelPoints[1], 'Test')).toEqual('Test. 2022, 33000.');
  });
});

runTest('Get Domain Margins', () => {
  beforeEach(sharedBeforeEach);

  test('Should return the correct margins when total width is greater than required width', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const dataSet = instance._createDataSetOfGVBC(chartPoints);
    expect(dataSet).toBeDefined();
    expect(dataSet['keys']).toHaveLength(2);
    expect(dataSet['xAxisLabels']).toHaveLength(4);
    instance._getMargins(margins);
    instance._keys = dataSet['keys'];
    instance._xAxisLabels = dataSet['xAxisLabels'];
    instance._classNames = getClassNames(instance.props.styles!, {
      theme: instance.props.theme!,
      href: instance.props.href!,
    });
    var result = instance._getDomainMargins(1000);
    expect(result['bottom']).toEqual(10);
    expect(result['left']).toEqual(18);
    expect(result['right']).toEqual(18);
    expect(result['top']).toEqual(10);
  });

  test('Should return the correct margins when total width is less than required width', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const dataSet = instance._createDataSetOfGVBC(chartPoints);
    expect(dataSet).toBeDefined();
    expect(dataSet['keys']).toHaveLength(2);
    expect(dataSet['xAxisLabels']).toHaveLength(4);
    instance._getMargins(margins);
    instance._keys = dataSet['keys'];
    instance._xAxisLabels = dataSet['xAxisLabels'];
    instance._classNames = getClassNames(instance.props.styles!, {
      theme: instance.props.theme!,
      href: instance.props.href!,
    });
    var result = instance._getDomainMargins(50);
    expect(result['bottom']).toEqual(10);
    expect(result['left']).toEqual(18);
    expect(result['right']).toEqual(18);
    expect(result['top']).toEqual(10);
  });
});

runTest('Get Scales', () => {
  beforeEach(sharedBeforeEach);

  test('Should return correct x0Scale and x1Scale', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const dataSet = instance._createDataSetOfGVBC(chartPoints);
    expect(dataSet).toBeDefined();
    expect(dataSet['keys']).toHaveLength(2);
    expect(dataSet['xAxisLabels']).toHaveLength(4);
    instance._getMargins(margins);
    instance._keys = dataSet['keys'];
    instance._xAxisLabels = dataSet['xAxisLabels'];
    instance._classNames = getClassNames(instance.props.styles!, {
      theme: instance.props.theme!,
      href: instance.props.href!,
    });
    var x0Scale = instance._createX0Scale(1000);
    expect(x0Scale).not.toBeNull();
    const domains = x0Scale['domain'];
    const ranges = x0Scale['range'];
    expect(domains).not.toBeNull();
    expect(ranges).not.toBeNull();
    var x1Scale = instance._createX1Scale();
    expect(x1Scale).not.toBeNull();
  });
});

runTest('_buildGraph', () => {
  beforeEach(sharedBeforeEach);

  test('Should return the correct graph data', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
    const dataSet = instance._createDataSetOfGVBC(chartPoints);
    expect(dataSet).toBeDefined();
    expect(dataSet['keys']).toHaveLength(2);
    expect(dataSet['xAxisLabels']).toHaveLength(4);
    instance._getMargins(margins);
    instance._keys = dataSet['keys'];
    instance._xAxisLabels = dataSet['xAxisLabels'];
    instance._datasetForBars = datasetForBars;
    instance._classNames = getClassNames(instance.props.styles!, {
      theme: instance.props.theme!,
      href: instance.props.href!,
    });
    var x0Scale = instance._createX0Scale(1000);
    expect(x0Scale).not.toBeNull();
    const domains = x0Scale['domain'];
    const ranges = x0Scale['range'];
    expect(domains).not.toBeNull();
    expect(ranges).not.toBeNull();

    var x1Scale = instance._createX1Scale();
    expect(x1Scale).not.toBeNull();

    const result = instance._buildGraph(datasetForBars[0], x0Scale, x1Scale, 500, undefined!);
    expect(result).not.toBeNull();
    expect(result['props']['children'][0]).not.toBeNull();
    expect(result['props']['children'][0]).not.toBeNull();
    expect(result['props']['children'][0][0]).not.toBeNull();
    const bar = result['props']['children'][0][0];
    expect(bar['props']['aria-label']).toEqual('2020/05/30. 2022, 29%.');
  });

  runTest('_getDomainNRangeValues', () => {
    beforeEach(sharedBeforeEach);
    test('Should return correct domain and range values for numeric axis type', () => {
      const instance = new GroupedVerticalBarChartBase({
        data: chartPoints,
      });
      expect(instance).toBeDefined();
      const dataSet = instance._createDataSetOfGVBC(chartPoints);
      expect(dataSet).toBeDefined();
      const rangeValues = instance._getDomainNRangeValues(
        dataSet.datasetForBars,
        margins,
        100,
        ChartTypes.GroupedVerticalBarChart,
        false,
        XAxisTypes.NumericAxis,
      );
      expect(rangeValues).toBeDefined();
      expect(rangeValues.dStartValue).toEqual(0);
      expect(rangeValues.dEndValue).toEqual(0);
      expect(rangeValues.rStartValue).toEqual(0);
      expect(rangeValues.rEndValue).toEqual(0);
    });

    test('Should return correct domain and range values for date axis type', () => {
      const instance = new GroupedVerticalBarChartBase({
        data: chartPoints,
      });
      expect(instance).toBeDefined();
      const dataSet = instance._createDataSetOfGVBC(chartPoints);
      expect(dataSet).toBeDefined();
      const rangeValues = instance._getDomainNRangeValues(
        dataSet.datasetForBars,
        margins,
        100,
        ChartTypes.GroupedVerticalBarChart,
        false,
        XAxisTypes.DateAxis,
      );
      expect(rangeValues).toBeDefined();
      expect(rangeValues.dStartValue).toEqual(0);
      expect(rangeValues.dEndValue).toEqual(0);
      expect(rangeValues.rStartValue).toEqual(0);
      expect(rangeValues.rEndValue).toEqual(0);
    });
  });
});
