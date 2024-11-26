import {
  ChartDataPoint,
  ChartProps,
  HorizontalBarChartWithAxisDataPoint,
  VSChartDataPoint,
  VerticalStackedChartProps,
} from '../index';

export const chartPointsVBC = [
  {
    x: 0,
    y: 10000,
    legend: 'First',
    color: 'aqua',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
  },
  {
    x: 10000,
    y: 50000,
    legend: 'Second',
    color: 'blue',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Third',
    color: 'navy',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '37%',
  },
];

const firstChartPointsVSBC: VSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 40,
    color: 'aqua',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
  },
  {
    legend: 'Metadata2',
    data: 5,
    color: 'navy',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '5%',
  },
];

const secondChartPointsVSBC: VSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 30,
    color: 'aqua',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '30%',
  },
  {
    legend: 'Metadata2',
    data: 20,
    color: 'navy',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
];

export const chartPointsVSBC: VerticalStackedChartProps[] = [
  { chartData: firstChartPointsVSBC, xAxisPoint: 0 },
  { chartData: secondChartPointsVSBC, xAxisPoint: 20 },
];

export const chartPoints2VSBC: VerticalStackedChartProps[] = [
  {
    chartData: firstChartPointsVSBC,
    xAxisPoint: 0,
    lineData: [{ y: 15, legend: 'Line1', color: 'yellow' }],
  },
  {
    chartData: secondChartPointsVSBC,
    xAxisPoint: 20,
    lineData: [{ y: 30, legend: 'Line1', color: 'yellow' }],
  },
];

export const emptychartPointsVSBC: VerticalStackedChartProps[] = [{ chartData: [], xAxisPoint: 0 }];

export const pointsHBCWA = [
  {
    x: 10000,
    y: 5000,
    legend: 'Oranges',
    color: 'aqua',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
  },
  {
    x: 20000,
    y: 50000,
    legend: 'Dogs',
    color: 'blue',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: 'navy',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '37%',
  },

  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: 'teal',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '88%',
  },
];

export const pointsDC: ChartDataPoint[] = [
  { legend: 'first', data: 20000, color: '#E5E5E5', xAxisCalloutData: '2020/04/30' },
  { legend: 'second', data: 39000, color: '#0078D4', xAxisCalloutData: '2020/04/20' },
  { legend: 'third', data: 45000, color: '#DADADA', xAxisCalloutData: '2020/04/25' },
];

export const pointsDCElevateMinimumsExample: ChartDataPoint[] = [
  { legend: 'first', data: 39000, color: '#E5E5E5', xAxisCalloutData: '2020/04/30' },
  { legend: 'second', data: 20, color: '#0078D4', xAxisCalloutData: '2020/04/20' },
  { legend: 'third', data: 20, color: '#DADADA', xAxisCalloutData: '2020/04/25' },
  { legend: 'fourth', data: 20, color: '#DADADA', xAxisCalloutData: '2020/04/25' },
  { legend: 'fifth', data: 20, color: '#DADADA', xAxisCalloutData: '2020/04/25' },
  { legend: 'sixth', data: 20, color: '#DADADA', xAxisCalloutData: '2020/04/25' },
];

export const chartPointsDC: ChartProps = {
  chartTitle: 'Donut chart example',
  chartData: pointsDC,
};

export const chartPointsDCElevateMinimums: ChartProps = {
  chartTitle: 'Donut chart example',
  chartData: pointsDC,
};

export const chartPointsHBCWA: HorizontalBarChartWithAxisDataPoint[] = [
  {
    x: 10000,
    y: 5000,
    legend: 'Oranges',
    color: 'aqua',
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '10%',
  },
  {
    x: 20000,
    y: 50000,
    legend: 'Grapes',
    color: 'blue',
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: 'navy',
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '37%',
  },

  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: 'teal',
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '88%',
  },
];

export const chartPointsWithStringYAxisHBCWA: HorizontalBarChartWithAxisDataPoint[] = [
  {
    y: 'String One',
    x: 1000,
    color: 'aqua',
  },
  {
    y: 'String Two',
    x: 5000,
    color: 'blue',
  },
  {
    y: 'String Three',
    x: 3000,
    color: 'navy',
  },
  {
    y: 'String Four',
    x: 2000,
    color: 'blue',
  },
];

export const chartPointsWithAxisToolTipHBCWA: HorizontalBarChartWithAxisDataPoint[] = [
  {
    x: 1000,
    y: 1000,
    color: 'aqua',
  },
  {
    x: 2000,
    y: 5000,
    color: 'blue',
  },
  {
    x: 3000,
    y: 3000,
    color: 'navy',
  },
  {
    x: 4000,
    y: 2000,
    color: 'blue',
  },
];
