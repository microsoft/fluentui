import { getByClass, testWithWait } from '../src/utilities/TestUtility.test';
import { Sparkline } from '../src/Sparkline';
import { SparklineBase } from '../src/components/Sparkline/Sparkline.base';

const env = require('../config/tests');
const runTest = env === 'TEST' ? describe : describe.skip;

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

runTest('Is Chart Empty', () => {
  test('Should return true when chart data is empty', () => {
    const instance = new SparklineBase({
      data: {},
    });
    expect(instance).toBeDefined();
    expect(instance._isChartEmpty()).toEqual(true);
  });

  test('Should return false when chart data is available', () => {
    const instance = new SparklineBase({
      data: chartData,
    });
    expect(instance).toBeDefined();
    expect(instance._isChartEmpty()).toEqual(false);
  });
});
