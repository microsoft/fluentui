import * as React from 'react';
import { queryAllByAttribute, render, waitFor } from '@testing-library/react';
import { AreaChart } from '../../index';

const chart1Points = [
  {
    x: 20,
    y: 7000,
    xAxisCalloutData: '2018/01/01',
    yAxisCalloutData: '10%',
  },
  {
    x: 25,
    y: 9000,
    xAxisCalloutData: '2018/01/15',
    yAxisCalloutData: '18%',
  },
  {
    x: 30,
    y: 13000,
    xAxisCalloutData: '2018/01/28',
    yAxisCalloutData: '24%',
  },
  {
    x: 35,
    y: 15000,
    xAxisCalloutData: '2018/02/01',
    yAxisCalloutData: '25%',
  },
  {
    x: 40,
    y: 11000,
    xAxisCalloutData: '2018/03/01',
    yAxisCalloutData: '15%',
  },
  {
    x: 45,
    y: 8760,
    xAxisCalloutData: '2018/03/15',
    yAxisCalloutData: '30%',
  },
  {
    x: 50,
    y: 3500,
    xAxisCalloutData: '2018/03/28',
    yAxisCalloutData: '18%',
  },
  {
    x: 55,
    y: 20000,
    xAxisCalloutData: '2018/04/04',
    yAxisCalloutData: '32%',
  },
  {
    x: 60,
    y: 17000,
    xAxisCalloutData: '2018/04/15',
    yAxisCalloutData: '29%',
  },
  {
    x: 65,
    y: 1000,
    xAxisCalloutData: '2018/05/05',
    yAxisCalloutData: '43%',
  },
  {
    x: 70,
    y: 12000,
    xAxisCalloutData: '2018/06/01',
    yAxisCalloutData: '45%',
  },
  {
    x: 75,
    y: 6876,
    xAxisCalloutData: '2018/01/15',
    yAxisCalloutData: '18%',
  },
  {
    x: 80,
    y: 12000,
    xAxisCalloutData: '2018/04/30',
    yAxisCalloutData: '55%',
  },
  {
    x: 85,
    y: 7000,
    xAxisCalloutData: '2018/05/04',
    yAxisCalloutData: '12%',
  },
  {
    x: 90,
    y: 10000,
    xAxisCalloutData: '2018/06/01',
    yAxisCalloutData: '45%',
  },
];

const chartPoints = [
  {
    legend: 'legend1',
    data: chart1Points,
    color: '#0099BC',
  },
];

const emptyChartPoints = [
  {
    legend: 'legend1',
    data: [],
    color: '#0099BC',
  },
];

const chartData = {
  chartTitle: 'Area chart basic example',
  lineChartData: chartPoints,
};

const emptyChartData = {
  chartTitle: 'Area chart basic example',
  lineChartData: emptyChartPoints,
};

describe('Vertical bar chart rendering', () => {
  test('Should re-render the vertical bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<AreaChart data={emptyChartData} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_AreaChart_empty/i)).toHaveLength(1);
    // Act
    rerender(<AreaChart data={chartData} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_AreaChart_empty/i)).toHaveLength(0);
    });
  });
});
