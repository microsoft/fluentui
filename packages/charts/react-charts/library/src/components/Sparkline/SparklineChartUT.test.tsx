import { getByClass, testWithWait } from '../../utilities/TestUtility.test';
import { Sparkline } from './Sparkline';
import { ChartProps } from './index';
import { emptySparklinePoints } from './Sparkline.test';
import { getByRole, queryAllByAttribute, render } from '@testing-library/react';
import * as React from 'react';

const env = require('../../../config/tests.js');
const runTest = env === 'TEST' ? describe : describe;

const sparkline1Points: ChartProps = {
  chartTitle: '10.21',
  lineChartData: [
    {
      legend: '19.64',
      color: '#00AA00',
      data: [
        {
          x: 1,
          y: 58.13,
        },
        {
          x: 2,
          y: 140.98,
        },
        {
          x: 3,
          y: 20,
        },
        {
          x: 4,
          y: 89.7,
        },
        {
          x: 5,
          y: 99,
        },
        {
          x: 6,
          y: 13.28,
        },
        {
          x: 7,
          y: 31.32,
        },
        {
          x: 8,
          y: 10.21,
        },
      ],
    },
  ],
};

const sl1 = [
  {
    x: 1,
    y: 58.13,
  },
  {
    x: 2,
    y: 140.98,
  },
  {
    x: 3,
    y: 20,
  },
  {
    x: 4,
    y: 89.7,
  },
  {
    x: 5,
    y: 99,
  },
  {
    x: 6,
    y: 13.28,
  },
  {
    x: 7,
    y: 31.32,
  },
  {
    x: 8,
    y: 10.21,
  },
];

const chartPoints = [
  {
    legend: 'legend1',
    color: 'blue',
    data: sl1,
  },
];

export const chartData = {
  chartTitle: 'Spark line chart example',
  lineChartData: chartPoints,
};

runTest('Get Line Path', () => {
  testWithWait('Should return the line path', Sparkline, { data: chartData }, container => {
    const testLinePath = getByClass(container, 'line');
    expect(testLinePath.length).toBe(1);
  });

  testWithWait('Should return the correct stroke value', Sparkline, { data: chartData }, container => {
    const testLinePath = getByClass(container, 'line');
    expect(testLinePath.length).toBe(1);
    expect(testLinePath[0].getAttribute('stroke')).toEqual('blue');
  });

  testWithWait('Should return the correct opacity value', Sparkline, { data: chartData }, container => {
    const testLinePath = getByClass(container, 'line');
    expect(testLinePath.length).toBe(1);
    expect(testLinePath[0].getAttribute('opacity')).toEqual('1');
  });
});

runTest('Get Area Path', () => {
  testWithWait('Should return Area path', Sparkline, { data: chartData }, container => {
    const testAreaPath = getByClass(container, 'area');
    expect(testAreaPath.length).toBe(1);
  });
  testWithWait('Should return the correct fill-opacity value', Sparkline, { data: chartData }, container => {
    const testAreaPath = getByClass(container, 'area');
    expect(testAreaPath.length).toBe(1);
    expect(testAreaPath[0].getAttribute('fill-opacity')).toEqual('0.2');
  });
  testWithWait('Should return the correct opacity value', Sparkline, { data: chartData }, container => {
    const testAreaPath = getByClass(container, 'area');
    expect(testAreaPath.length).toBe(1);
    expect(testAreaPath[0].getAttribute('opacity')).toEqual('1');
  });
});

describe('Is Chart Empty', () => {
  // beforeEach(sharedBeforeEach);

  // FIXME: Started failing after upgrade to React 18
  test.skip('Test Sparkline chart with empty data', async () => {
    // Arrange
    const { container } = render(<Sparkline data={emptySparklinePoints} />);
    // Assert
    expect(container).toMatchSnapshot();
    // @ts-expect-error - invalid API usage  TS2345: Argument of type 'RegExp' is not assignable to parameter of type 'ByRoleMatcher'.
    expect(getByRole(container, /alert/i)).toBeDefined;
  });

  test('Test Sparkline chart with data', async () => {
    // Arrange
    const { container } = render(<Sparkline data={sparkline1Points} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById.length).toBe(2);
  });
});
