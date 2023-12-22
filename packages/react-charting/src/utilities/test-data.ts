import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IChartDataPoint, IChartProps, IVSChartDataPoint, IVerticalStackedChartProps } from '../index';

export const chartPoints_VBC = [
  {
    x: 0,
    y: 10000,
    legend: 'First',
    color: DefaultPalette.accent,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
  },
  {
    x: 10000,
    y: 50000,
    legend: 'Second',
    color: DefaultPalette.blueDark,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Third',
    color: DefaultPalette.blueMid,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '37%',
  },
];

const firstChartPoints_VSBC: IVSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 40,
    color: DefaultPalette.accent,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
  },
  {
    legend: 'Metadata2',
    data: 5,
    color: DefaultPalette.blueMid,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '5%',
  },
];

const secondChartPoints_VSBC: IVSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 30,
    color: DefaultPalette.accent,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '30%',
  },
  {
    legend: 'Metadata2',
    data: 20,
    color: DefaultPalette.blueMid,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
];

export const chartPoints_VSBC: IVerticalStackedChartProps[] = [
  { chartData: firstChartPoints_VSBC, xAxisPoint: 0 },
  { chartData: secondChartPoints_VSBC, xAxisPoint: 20 },
];

export const chartPoints2_VSBC: IVerticalStackedChartProps[] = [
  {
    chartData: firstChartPoints_VSBC,
    xAxisPoint: 0,
    lineData: [{ y: 15, legend: 'Line1', color: DefaultPalette.yellow }],
  },
  {
    chartData: secondChartPoints_VSBC,
    xAxisPoint: 20,
    lineData: [{ y: 30, legend: 'Line1', color: DefaultPalette.yellow }],
  },
];

export const emptychartPoints_VSBC: IVerticalStackedChartProps[] = [{ chartData: [], xAxisPoint: 0 }];

export const points_HBCWA = [
  {
    x: 10000,
    y: 5000,
    legend: 'Oranges',
    color: DefaultPalette.accent,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
  },
  {
    x: 20000,
    y: 50000,
    legend: 'Dogs',
    color: DefaultPalette.blueDark,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: DefaultPalette.blueMid,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '37%',
  },

  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: DefaultPalette.blueLight,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '88%',
  },
];

export const points_DC: IChartDataPoint[] = [
  { legend: 'first', data: 20000, color: '#E5E5E5', xAxisCalloutData: '2020/04/30' },
  { legend: 'second', data: 39000, color: '#0078D4', xAxisCalloutData: '2020/04/20' },
  { legend: 'third', data: 45000, color: '#DADADA', xAxisCalloutData: '2020/04/25' },
];

export const chartPoints_DC: IChartProps = {
  chartTitle: 'Donut chart example',
  chartData: points_DC,
};
