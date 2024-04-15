import { DefaultPalette } from '@fluentui/react/lib/Styling';
import {
  IChartDataPoint,
  IChartProps,
  IHorizontalBarChartWithAxisDataPoint,
  IVSChartDataPoint,
  IVerticalStackedChartProps,
} from '../index';

export const chartPointsVBC = [
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

const firstChartPointsVSBC: IVSChartDataPoint[] = [
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

const secondChartPointsVSBC: IVSChartDataPoint[] = [
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

export const chartPointsVSBC: IVerticalStackedChartProps[] = [
  { chartData: firstChartPointsVSBC, xAxisPoint: 0 },
  { chartData: secondChartPointsVSBC, xAxisPoint: 20 },
];

export const chartPoints2VSBC: IVerticalStackedChartProps[] = [
  {
    chartData: firstChartPointsVSBC,
    xAxisPoint: 0,
    lineData: [{ y: 15, legend: 'Line1', color: DefaultPalette.yellow }],
  },
  {
    chartData: secondChartPointsVSBC,
    xAxisPoint: 20,
    lineData: [{ y: 30, legend: 'Line1', color: DefaultPalette.yellow }],
  },
];

export const emptychartPointsVSBC: IVerticalStackedChartProps[] = [{ chartData: [], xAxisPoint: 0 }];

export const pointsHBCWA = [
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

export const pointsDC: IChartDataPoint[] = [
  { legend: 'first', data: 20000, color: '#E5E5E5', xAxisCalloutData: '2020/04/30' },
  { legend: 'second', data: 39000, color: '#0078D4', xAxisCalloutData: '2020/04/20' },
  { legend: 'third', data: 45000, color: '#DADADA', xAxisCalloutData: '2020/04/25' },
];

export const pointsDCElevateMinimumsExample: IChartDataPoint[] = [
  { legend: 'first', data: 39000, color: '#E5E5E5', xAxisCalloutData: '2020/04/30' },
  { legend: 'second', data: 20, color: '#0078D4', xAxisCalloutData: '2020/04/20' },
  { legend: 'third', data: 20, color: '#DADADA', xAxisCalloutData: '2020/04/25' },
  { legend: 'fourth', data: 20, color: '#DADADA', xAxisCalloutData: '2020/04/25' },
  { legend: 'fifth', data: 20, color: '#DADADA', xAxisCalloutData: '2020/04/25' },
  { legend: 'sixth', data: 20, color: '#DADADA', xAxisCalloutData: '2020/04/25' },
];

export const chartPointsDC: IChartProps = {
  chartTitle: 'Donut chart example',
  chartData: pointsDC,
};

export const chartPointsDCElevateMinimums: IChartProps = {
  chartTitle: 'Donut chart example',
  chartData: pointsDC,
};

export const chartPointsHBCWA: IHorizontalBarChartWithAxisDataPoint[] = [
  {
    x: 10000,
    y: 5000,
    legend: 'Oranges',
    color: DefaultPalette.accent,
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '10%',
  },
  {
    x: 20000,
    y: 50000,
    legend: 'Grapes',
    color: DefaultPalette.blueDark,
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: DefaultPalette.blueMid,
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '37%',
  },

  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: DefaultPalette.blueLight,
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '88%',
  },
];

export const chartPointsWithStringYAxisHBCWA: IHorizontalBarChartWithAxisDataPoint[] = [
  {
    y: 'String One',
    x: 1000,
    color: DefaultPalette.accent,
  },
  {
    y: 'String Two',
    x: 5000,
    color: DefaultPalette.blueDark,
  },
  {
    y: 'String Three',
    x: 3000,
    color: DefaultPalette.blueMid,
  },
  {
    y: 'String Four',
    x: 2000,
    color: DefaultPalette.blue,
  },
];

export const chartPointsWithAxisToolTipHBCWA: IHorizontalBarChartWithAxisDataPoint[] = [
  {
    x: 1000,
    y: 1000,
    color: DefaultPalette.accent,
  },
  {
    x: 2000,
    y: 5000,
    color: DefaultPalette.blueDark,
  },
  {
    x: 3000,
    y: 3000,
    color: DefaultPalette.blueMid,
  },
  {
    x: 4000,
    y: 2000,
    color: DefaultPalette.blue,
  },
];
