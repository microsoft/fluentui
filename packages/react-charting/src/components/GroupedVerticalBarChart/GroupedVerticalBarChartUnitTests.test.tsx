import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { GroupedVerticalBarChartBase } from './GroupedVerticalBarChart.base';
import { IGroupedVerticalBarChartData } from '../../index';

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

describe('unit tests', () => {
  test('Should create grouped vertical bar', () => {
    const instance = new GroupedVerticalBarChartBase({
      data: chartPoints,
    });
    expect(instance).toBeDefined();
  });
});
