import {
  ChartDataPoint,
  ChartProps,
  HorizontalBarChartWithAxisDataPoint,
  VSChartDataPoint,
  GanttChartDataPoint,
  VerticalStackedChartProps,
  VerticalBarChartDataPoint,
  DataVizPalette,
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

export const allNegativeChartPointsVBC: VerticalBarChartDataPoint[] = [
  {
    x: 0,
    y: -10000,
    legend: 'First',
    color: DataVizPalette.color1,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
  },
  {
    x: 10000,
    y: -50000,
    legend: 'Second',
    color: DataVizPalette.color2,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: -30000,
    legend: 'Third',
    color: DataVizPalette.color3,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '37%',
  },
];

export const negativeChartPointsVBC: VerticalBarChartDataPoint[] = [
  {
    x: 0,
    y: 10000,
    legend: 'First',
    color: DataVizPalette.color1,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
  },
  {
    x: 10000,
    y: -50000,
    legend: 'Second',
    color: DataVizPalette.color2,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Third',
    color: DataVizPalette.color3,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '37%',
  },
];

export const ganttData: GanttChartDataPoint[] = [
  {
    x: {
      start: new Date('2017-01-01'),
      end: new Date('2017-02-02'),
    },
    y: 'Job-1',
    legend: 'Complete',
    color: DataVizPalette.success,
    gradient: ['#0C5E0C', '#107C10'],
  },
  {
    x: {
      start: new Date('2017-01-17'),
      end: new Date('2017-02-17'),
    },
    y: 'Job-2',
    legend: 'Complete',
    color: DataVizPalette.success,
    gradient: ['#0C5E0C', '#107C10'],
  },
  {
    x: {
      start: new Date('2017-01-14'),
      end: new Date('2017-03-14'),
    },
    y: 'Job-4',
    legend: 'Complete',
    color: DataVizPalette.success,
    gradient: ['#0C5E0C', '#107C10'],
  },
  {
    x: {
      start: new Date('2017-02-15'),
      end: new Date('2017-03-15'),
    },
    y: 'Job-1',
    legend: 'Incomplete',
    color: DataVizPalette.warning,
    gradient: ['#DE590B', '#F7630C'],
  },
  {
    x: {
      start: new Date('2017-01-17'),
      end: new Date('2017-02-17'),
    },
    y: 'Job-2',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: ['#B10E1C', '#CC2635'],
  },
  {
    x: {
      start: new Date('2017-03-10'),
      end: new Date('2017-03-20'),
    },
    y: 'Job-3',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: ['#B10E1C', '#CC2635'],
  },
  {
    x: {
      start: new Date('2017-04-01'),
      end: new Date('2017-04-20'),
    },
    y: 'Job-3',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: ['#B10E1C', '#CC2635'],
  },
  {
    x: {
      start: new Date('2017-05-18'),
      end: new Date(new Date('2017-06-18')),
    },
    y: 'Job-3',
    legend: 'Not Started',
    color: DataVizPalette.error,
    gradient: ['#B10E1C', '#CC2635'],
  },
];

export const ganttDataWithLongY: GanttChartDataPoint[] = [
  {
    x: {
      start: new Date('2024-05-01'),
      end: new Date('2024-05-07'),
    },
    y: 'Site Preparation',
    legend: 'No',
    color: '#637cefff',
  },
  {
    x: {
      start: new Date('2024-05-08'),
      end: new Date('2024-05-21'),
    },
    y: 'Foundation Work',
    legend: 'No',
    color: '#637cefff',
  },
  {
    x: {
      start: new Date('2024-05-22'),
      end: new Date('2024-06-02'),
    },
    y: 'Framing',
    legend: 'No',
    color: '#637cefff',
  },
  {
    x: {
      start: new Date('2024-06-03'),
      end: new Date('2024-06-09'),
    },
    y: 'Roof Installation',
    legend: 'No',
    color: '#637cefff',
  },
  {
    x: {
      start: new Date('2024-06-10'),
      end: new Date('2024-06-23'),
    },
    y: 'Plumbing/Electrical',
    legend: 'No',
    color: '#637cefff',
  },
  {
    x: {
      start: new Date('2024-07-08'),
      end: new Date('2024-07-17'),
    },
    y: 'Exterior Finishing',
    legend: 'No',
    color: '#637cefff',
  },
  {
    x: {
      start: new Date('2024-06-24'),
      end: new Date('2024-07-07'),
    },
    y: 'Interior Finishing',
    legend: 'Yes (Phase 1)',
    color: '#f7630cff',
  },
  {
    x: {
      start: new Date('2024-07-18'),
      end: new Date('2024-07-24'),
    },
    y: 'Final Inspections',
    legend: 'Yes (Phase 2)',
    color: '#57811bff',
  },
];

export const ganttDataWithNumericY: GanttChartDataPoint[] = [
  {
    x: {
      start: new Date('2021-01-01'),
      end: new Date('2022-01-10'),
    },
    y: 1,
    legend: 'HR',
    color: '#637cefff',
  },
  {
    x: {
      start: new Date('2022-01-15'),
      end: new Date('2022-01-20'),
    },
    y: 2,
    legend: 'Finance',
    color: '#f7630cff',
  },
  {
    x: {
      start: new Date('2022-02-01'),
      end: new Date('2022-02-08'),
    },
    y: 3,
    legend: 'IT',
    color: '#57811bff',
  },
  {
    x: {
      start: new Date('2022-02-10'),
      end: new Date('2022-02-20'),
    },
    y: 4,
    legend: 'Operations',
    color: '#9373c0ff',
  },
  {
    x: {
      start: new Date('2022-03-01'),
      end: new Date('2022-03-10'),
    },
    y: 5,
    legend: 'Customer Support',
    color: '#ca5010ff',
  },
  {
    x: {
      start: new Date('2022-03-05'),
      end: new Date('2022-03-15'),
    },
    y: 6,
    legend: 'Legal',
    color: '#3a96ddff',
  },
];
