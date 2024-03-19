import { fireEvent } from '@testing-library/react';
import { ILineChartPoints, LineChart } from '../src/components/LineChart/index';
import { DefaultPalette } from '@fluentui/react';
import { IChartProps, ILineChartGap } from '../src/index';
import { LineChartBase } from '../src/components/LineChart/LineChart.base';
import { getById, testWithWait, testWithoutWait } from '../src/utilities/TestUtility.test';
import { DarkTheme } from '@fluentui/theme-samples';
import { resetIds } from '@fluentui/react';
const env = require('../config/tests');

const runTest = env === 'TEST' ? describe : describe.skip;

const basicPoints: ILineChartPoints[] = [
  {
    legend: 'metaData1',
    data: [
      { x: 20, y: 50 },
      { x: 40, y: 80 },
    ],
    color: 'red',
    onLegendClick: () => {},
  },
  {
    legend: 'metaData2',
    data: [
      { x: 30, y: 60 },
      { x: 50, y: 90 },
    ],
    color: 'green',
  },
  {
    legend: 'metaData3',
    data: [
      { x: 70, y: 30 },
      { x: 40, y: 80 },
    ],
    color: 'yellow',
  },
];

export const basicChartPoints = {
  chartTitle: 'LineChart',
  lineChartData: basicPoints,
};

export const emptyData = {
  chartTitle: 'LineChart',
  lineChartData: [],
};

const simplePoints: ILineChartPoints[] = [
  {
    legend: 'metaData1',
    data: [
      { x: 20, y: 50 },
      { x: 40, y: 80 },
    ],
  },
  {
    legend: 'metaData2',
    data: [
      { x: 30, y: 60 },
      { x: 50, y: 90 },
    ],
  },
  {
    legend: 'metaData3',
    data: [
      { x: 70, y: 30 },
      { x: 40, y: 80 },
    ],
  },
];

export const simpleChartPoints = {
  chartTitle: 'LineChart',
  lineChartData: simplePoints,
};

const data: IChartProps = {
  chartTitle: 'Line Chart',
  lineChartData: [
    {
      legend: 'From_Legacy_to_O365',
      data: [
        {
          x: 0,
          y: 10,
        },
        {
          x: 1,
          y: 20,
        },
        {
          x: 2,
          y: 30,
        },
        {
          x: 3,
          y: 40,
        },
        {
          x: 4,
          y: 50,
        },
        {
          x: 5,
          y: 60,
        },
        {
          x: 6,
          y: 70,
        },
        {
          x: 7,
          y: 80,
        },
        {
          x: 8,
          y: 90,
        },
      ],
      color: DefaultPalette.blue,
      lineOptions: {
        lineBorderWidth: '4',
      },
    },
    {
      legend: 'All',
      data: [
        {
          x: 0,
          y: 100,
        },
        {
          x: 1,
          y: 200,
        },
        {
          x: 2,
          y: 300,
        },
        {
          x: 3,
          y: 400,
        },
        {
          x: 4,
          y: 500,
        },
        {
          x: 5,
          y: 600,
        },
        {
          x: 6,
          y: 700,
        },
      ],
      color: DefaultPalette.green,
      lineOptions: {
        lineBorderWidth: '4',
      },
    },
    {
      legend: 'single point',
      data: [
        {
          x: 0,
          y: 100,
        },
      ],
      color: DefaultPalette.yellow,
    },
    {
      legend: 'two points',
      data: [
        {
          x: 0,
          y: 100,
        },
        {
          x: 1,
          y: 200,
        },
      ],
      color: DefaultPalette.green,
    },
    {
      legend: 'three points',
      data: [
        {
          x: 0,
          y: 100,
        },
        {
          x: 1,
          y: 200,
        },
        {
          x: 2,
          y: 300,
        },
      ],
      color: DefaultPalette.blue,
    },
    {
      legend: 'four points',
      data: [
        {
          x: 0,
          y: 100,
        },
        {
          x: 1,
          y: 200,
        },
        {
          x: 2,
          y: 300,
        },
        {
          x: 3,
          y: 400,
        },
      ],
      color: DefaultPalette.blue,
    },
  ],
};

function sharedBeforeEach() {
  resetIds();
}

runTest('Unit tests for _getPath function', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should return correct path when multiple point shapes are not allowed, widthRatio and width of shape equal to 1',
    LineChart,
    { data: basicChartPoints, allowMultipleShapesForPoints: false, strokeWidth: 0.5 },
    container => {
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      const paths = svg!.querySelectorAll('path');
      expect(paths).toHaveLength(6);
      expect(paths[0]!.getAttribute('d')).toBe(`M-20.5 -17.065217391304344
     A0.5 0.5 0 1 0 -19.5 -17.065217391304344
     M-20.5 -17.065217391304344
     A 0.5 0.5 0 1 1 -19.5 -17.065217391304344
     `);
      expect(paths[1]!.getAttribute('d')).toBe(`M15.5 12.826086956521738
     A0.5 0.5 0 1 0 16.5 12.826086956521738
     M15.5 12.826086956521738
     A 0.5 0.5 0 1 1 16.5 12.826086956521738
     `);
      expect(paths[2]!.getAttribute('d')).toBe(`M27.5 0.8695652173913064
     A0.5 0.5 0 1 0 28.5 0.8695652173913064
     M27.5 0.8695652173913064
     A 0.5 0.5 0 1 1 28.5 0.8695652173913064
     `);
    },
  );

  testWithWait(
    'Should return path on hovering on a point, multiple shapes are not allowed, widthRatio and width of shape equal to 1',
    LineChart,
    { data: basicChartPoints, allowMultipleShapesForPoints: false, strokeWidth: 0.5 },
    container => {
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      const paths = svg!.querySelectorAll('path');
      expect(paths).toHaveLength(8);
      fireEvent.mouseOver(paths[0]);
      expect(paths[0]!.getAttribute('d')).toBe(`M40.5,6V0.5H100.5V6`);
      expect(paths[1]!.getAttribute('d')).toBe(`M-6,275.5H0.5V20.5H-6`);
      expect(paths[2]!.getAttribute('d')).toBe(`M99.5 191.84782608695653
     A0.5 0.5 0 1 0 100.5 191.84782608695653
     M99.5 191.84782608695653
     A 0.5 0.5 0 1 1 100.5 191.84782608695653
     `);
    },
  );

  testWithoutWait(
    'Should return correct path when multiple shapes for points allowed and widthRatio equal to 1',
    LineChart,
    { data: basicChartPoints, allowMultipleShapesForPoints: true, strokeWidth: 0.5 },
    container => {
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      const paths = svg!.querySelectorAll('path');
      expect(paths).toHaveLength(6);
      // w tested with values: 1 (invisible), 1.25 (second/last point)
      expect(paths[0]!.getAttribute('d')).toBe(`M-20.625 -17.425967391304344
     H -19.375
     L-20 -16.343467391304344 Z`);
      expect(paths[1]!.getAttribute('d')).toBe(`M15.375 12.465336956521739
     H 16.625
     L16 13.547836956521738 Z`);
      expect(paths[2]!.getAttribute('d')).toBe(`M27.375 0.24456521739130643
     L28.625 0.24456521739130643
     L28.625 1.4945652173913064
     L27.375 1.4945652173913064
     Z`);
    },
  );

  testWithoutWait(
    'Should return correct path when multiple shapes for points allowed and widthRatio greater than 1',
    LineChart,
    { data: data, allowMultipleShapesForPoints: true, strokeWidth: 0.5 },
    container => {
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      const paths = svg!.querySelectorAll('path');
      expect(paths).toHaveLength(25);
      // w tested with values: 1 (invisible), greater than 1 and less than 1
      expect(paths[0]!.getAttribute('d')).toBe(`M39.6875 -27.684107142857147
     L40.3125 -27.684107142857147
     L40.625 -27.142857142857146
     L40.3125 -26.601607142857144
     L39.6875 -26.601607142857144
     L39.375 -27.142857142857146
     Z`);
      expect(paths[1]!.getAttribute('d')).toBe(`M32.25 -19.718714285714285
     L32.75 -19.718714285714285
     L33 -19.285714285714285
     L32.75 -18.852714285714285
     L32.25 -18.852714285714285
     L32 -19.285714285714285
     Z`);
      expect(paths[2]!.getAttribute('d')).toBe(`M24.75 -11.861571428571429
     L25.25 -11.861571428571429
     L25.5 -11.428571428571429
     L25.25 -10.995571428571429
     L24.75 -10.995571428571429
     L24.5 -11.428571428571429
     Z`);
    },
  );

  testWithWait(
    'Should return path when a point is hovered, multiple shapes for points allowed, widthRatio equal to 1',
    LineChart,
    { data: basicChartPoints, allowMultipleShapesForPoints: true, strokeWidth: 0.5 },
    container => {
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      const paths = svg!.querySelectorAll('path');
      expect(paths).toHaveLength(8);
      fireEvent.mouseOver(paths[0]);
      // w tested with all possible values: 11 (hovered), 1 (invisible), 1.25 (second/last point)
      expect(paths[0]!.getAttribute('d')).toBe(`M40.5,6V0.5H100.5V6`);
      expect(paths[1]!.getAttribute('d')).toBe(`M-6,275.5H0.5V20.5H-6`);
      expect(paths[2]!.getAttribute('d')).toBe(`M99.375 191.48707608695653
     H 100.625
     L100 192.56957608695652 Z`);
    },
  );

  testWithWait(
    'Should return path when an active point is hovered, multiple shapes for points allowed, widthRatio greater than 1',
    LineChart,
    { data: data, allowMultipleShapesForPoints: true, strokeWidth: 0.5 },
    container => {
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      const paths = svg!.querySelectorAll('path');
      expect(paths).toHaveLength(27);
      fireEvent.mouseOver(paths[0]);
      // w tested with all possible values: 11 (hovered), 1 (invisible), 1.25 (second/last point)
      expect(paths[0]!.getAttribute('d')).toBe(`M40.5,6V0.5H128.5V6`);
      expect(paths[1]!.getAttribute('d')).toBe(`M-6,275.5H0.5V20.5H-6`);
      expect(paths[2]!.getAttribute('d')).toBe(`M39.6875 238.0301785714286
     L40.3125 238.0301785714286
     L40.625 238.57142857142858
     L40.3125 239.11267857142857
     L39.6875 239.11267857142857
     L39.375 238.57142857142858
     Z`);
    },
  );
});

runTest('Unit tests for __checkInGap function', () => {
  beforeEach(sharedBeforeEach);

  test('Should return false if pointIndex is not in any gap', () => {
    const gaps: ILineChartGap[] = [
      { startIndex: 3, endIndex: 5 },
      { startIndex: 8, endIndex: 10 },
    ];
    const instance = new LineChartBase({ data: basicChartPoints });
    const { isInGap } = instance._checkInGap(2, gaps, 0);
    expect(isInGap).toBeFalsy();
  });

  test('Should return true if pointIndex is in a gap', () => {
    const gaps: ILineChartGap[] = [
      { startIndex: 3, endIndex: 5 },
      { startIndex: 8, endIndex: 10 },
    ];
    const instance = new LineChartBase({ data: basicChartPoints });
    const { isInGap } = instance._checkInGap(4, gaps, 0);
    expect(isInGap).toBeTruthy();
  });

  test('Should return false if pointIndex is at the start of a gap', () => {
    const gaps: ILineChartGap[] = [
      { startIndex: 3, endIndex: 5 },
      { startIndex: 8, endIndex: 10 },
    ];
    const instance = new LineChartBase({ data: basicChartPoints });
    const { isInGap } = instance._checkInGap(3, gaps, 0);
    expect(isInGap).toBeFalsy();
  });

  test('Should return true if pointIndex is at the end of a gap', () => {
    const gaps: ILineChartGap[] = [
      { startIndex: 3, endIndex: 5 },
      { startIndex: 8, endIndex: 10 },
    ];
    const instance = new LineChartBase({ data: basicChartPoints });
    const { isInGap } = instance._checkInGap(5, gaps, 0);
    expect(isInGap).toBeTruthy();
  });

  test('Should return false if pointIndex is after all gaps', () => {
    const gaps: ILineChartGap[] = [
      { startIndex: 3, endIndex: 5 },
      { startIndex: 8, endIndex: 10 },
    ];
    const instance = new LineChartBase({ data: basicChartPoints });
    const { isInGap } = instance._checkInGap(12, gaps, 1);
    expect(isInGap).toBeFalsy();
  });

  test('Should return false if pointIndex is before all gaps', () => {
    const gaps: ILineChartGap[] = [
      { startIndex: 3, endIndex: 5 },
      { startIndex: 8, endIndex: 10 },
    ];
    const instance = new LineChartBase({ data: basicChartPoints });
    const { isInGap } = instance._checkInGap(2, gaps, 0);
    expect(isInGap).toBeFalsy();
  });

  test('Should return false if gaps array is empty', () => {
    const gaps: ILineChartGap[] = [];
    const instance = new LineChartBase({ data: basicChartPoints });
    const { isInGap } = instance._checkInGap(5, gaps, 0);
    expect(isInGap).toBeFalsy();
  });

  test('Should return false if currentGapIndex is greater than or equal to gaps.length', () => {
    const gaps: ILineChartGap[] = [
      { startIndex: 3, endIndex: 5 },
      { startIndex: 8, endIndex: 10 },
    ];
    const instance = new LineChartBase({ data: basicChartPoints });
    const { isInGap } = instance._checkInGap(5, gaps, 2);
    expect(isInGap).toBeFalsy();
  });
});

runTest('Unit tests for _getPointFill function', () => {
  beforeEach(sharedBeforeEach);

  testWithWait(
    'Should return white if the point is active and allowMultipleShapesForPoints is false',
    LineChart,
    { data: basicChartPoints, allowMultipleShapesForPoints: false, theme: DarkTheme },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(9);
      fireEvent.mouseOver(points[1]);
      expect(getById(container, /circle/i)[1].getAttribute('fill')).toEqual('#1b1a19');
    },
  );

  testWithWait(
    'Should return white if the point is active and allowMultipleShapesForPoints is true and pointIndex is 1',
    LineChart,
    { data: basicChartPoints, allowMultipleShapesForPoints: true, theme: DarkTheme },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(9);
      fireEvent.mouseOver(points[1]);
      expect(getById(container, /circle/i)[1].getAttribute('fill')).toEqual('#1b1a19');
    },
  );

  testWithWait(
    'Should return yellow if the point is not active and allowMultipleShapesForPoints is true and pointIndex is 1',
    LineChart,
    { data: basicChartPoints, allowMultipleShapesForPoints: true, theme: DarkTheme },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(9);
      fireEvent.mouseOver(points[1]);
      expect(getById(container, /circle/i)[0].getAttribute('fill')).toEqual('yellow');
    },
  );

  testWithWait(
    'Should return red if the point is not active, multiple shapes for points allowed and point is not last or second',
    LineChart,
    { data: basicChartPoints, allowMultipleShapesForPoints: true, theme: DarkTheme },
    container => {
      const points = getById(container, /circle/i);
      expect(points).toHaveLength(9);
      fireEvent.mouseOver(points[2]);
      expect(getById(container, /circle/i)[1].getAttribute('fill')).toEqual('yellow');
    },
  );
});

runTest('Unit tests for __injectIndexPropertyInLineChartData function', () => {
  beforeEach(sharedBeforeEach);

  test('Should return an empty array if lineChartData is undefined', () => {
    const instance = new LineChartBase({ data: emptyData });
    const result = instance._injectIndexPropertyInLineChartData(emptyData.lineChartData);
    expect(result).toEqual([]);
  });

  test('Should generate a color for each item in lineChartData if color is not defined', () => {
    const instance = new LineChartBase({ data: simpleChartPoints });
    const result = instance._injectIndexPropertyInLineChartData(simpleChartPoints.lineChartData);
    expect(result).toHaveLength(3);
    expect(result[0].color).toBeDefined();
    expect(result[0].color).toEqual('#637cef');
    expect(result[1].color).toBeDefined();
    expect(result[1].color).toEqual('#e3008c');
    expect(result[2].color).toBeDefined();
    expect(result[2].color).toEqual('#2aa0a4');
  });

  test('Should generate a color for each item in lineChartData with tokens when color is defined', () => {
    const instance = new LineChartBase({ data: basicChartPoints });
    const result = instance._injectIndexPropertyInLineChartData(basicChartPoints.lineChartData);
    expect(result).toHaveLength(3);
    expect(result[0].color).toBeDefined();
    expect(result[0].color).toEqual('red');
    expect(result[1].color).toBeDefined();
    expect(result[1].color).toEqual('green');
    expect(result[2].color).toBeDefined();
    expect(result[2].color).toEqual('yellow');
  });
});
