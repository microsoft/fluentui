/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import type { LineChartPoints } from './index';
import { LineChart } from './index';
import '@testing-library/jest-dom';

import {
  getByClass,
  getById,
  testWithWait,
  testWithoutWait,
  isTimezoneSet,
  isTestEnv,
} from '../../utilities/TestUtility.test';
import { axe, toHaveNoViolations } from 'jest-axe';
const { Timezone } = require('../../../scripts/constants');

expect.extend(toHaveNoViolations);

const originalRAF = window.requestAnimationFrame;
const originalGetComputedStyle = window.getComputedStyle;
const originalGetBoundingClientRect = window.Element.prototype.getBoundingClientRect;

function updateChartWidthAndHeight() {
  jest.useFakeTimers();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
  window.Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
    bottom: 44,
    height: 50,
    left: 10,
    right: 35.67,
    top: 20,
    width: 650,
    x: 10,
    y: 20,
  } as DOMRect);
  window.getComputedStyle = jest.fn().mockImplementation(element => {
    const style = originalGetComputedStyle(element);
    return {
      ...style,
      marginTop: '0px',
      marginBottom: '0px',
      getPropertyValue: (prop: string) => {
        if (prop === 'margin-top' || prop === 'margin-bottom') {
          return '0px';
        }
        return style.getPropertyValue(prop);
      },
    } as CSSStyleDeclaration;
  });
}

function sharedAfterEach() {
  jest.useRealTimers();
  window.requestAnimationFrame = originalRAF;
  window.Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  window.getComputedStyle = originalGetComputedStyle;
}

const basicPoints: LineChartPoints[] = [
  {
    legend: 'metaData1',
    data: [
      { x: 20, y: 50 },
      { x: 40, y: 80 },
    ],
    color: 'red',
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

const basicChartPoints = {
  chartTitle: 'LineChart',
  lineChartData: basicPoints,
};

const datePoints: LineChartPoints[] = [
  {
    data: [
      { x: new Date('2020-01-01T00:00:00.000Z'), y: 30 },
      { x: new Date('2020-02-01T00:00:00.000Z'), y: 50 },
      { x: new Date('2020-03-01T00:00:00.000Z'), y: 30 },
      { x: new Date('2020-04-01T00:00:00.000Z'), y: 50 },
      { x: new Date('2020-05-01T00:00:00.000Z'), y: 30 },
      { x: new Date('2020-06-01T00:00:00.000Z'), y: 50 },
    ],
    legend: 'First',
    lineOptions: {
      lineBorderWidth: '4',
    },
  },
];

const dateChartPoints = {
  chartTitle: 'LineChart',
  lineChartData: datePoints,
};

const colorFillBarData = [
  {
    legend: 'Time range 1',
    color: 'blue',
    data: [
      {
        startX: new Date('2020-01-01T00:00:00.000Z'),
        endX: new Date('2020-02-01T00:00:00.000Z'),
      },
    ],
  },
  {
    legend: 'Time range 2',
    color: 'red',
    data: [
      {
        startX: new Date('2018-04-01T00:00:00.000Z'),
        endX: new Date('2020-05-01T00:00:00.000Z'),
      },
    ],
    applyPattern: true,
  },
];

const pointsWithGaps: LineChartPoints[] = [
  {
    legend: 'Normal Data',
    hideNonActiveDots: true,
    lineOptions: {
      lineBorderWidth: '4',
    },
    gaps: [
      {
        startIndex: 3,
        endIndex: 4,
      },
      {
        startIndex: 6,
        endIndex: 7,
      },
    ],
    data: [
      {
        x: new Date('2020-03-03T00:00:00.000Z'),
        y: 216000,
      },
      {
        x: new Date('2020-03-03T10:30:00.000Z'),
        y: 218123,
        hideCallout: true,
      },
      // gap here
      {
        x: new Date('2020-03-03T11:00:00.000Z'),
        y: 219000,
        hideCallout: true,
      },
      {
        x: new Date('2020-03-04T00:00:00.000Z'),
        y: 248000,
        hideCallout: true,
      },
      // gap here
      {
        x: new Date('2020-03-05T00:00:00.000Z'),
        y: 252000,
        hideCallout: true,
      },
      {
        x: new Date('2020-03-06T00:00:00.000Z'),
        y: 274000,
      },
      {
        x: new Date('2020-03-07T00:00:00.000Z'),
        y: 260000,
        hideCallout: true,
      },
      // gap here
      {
        x: new Date('2020-03-08T00:00:00.000Z'),
        y: 300000,
        hideCallout: true,
      },
      {
        x: new Date('2020-03-08T12:00:00.000Z'),
        y: 218000,
      },
      {
        x: new Date('2020-03-09T00:00:00.000Z'),
        y: 218000,
      },
      {
        x: new Date('2020-03-10T00:00:00.000Z'),
        y: 269000,
      },
    ],
    color: '#0000FF',
  },
];

const secondaryYScalePoints = [{ yMaxValue: 50000, yMinValue: 10000 }];

const chartPointsWithGaps = {
  chartTitle: 'LineChart',
  lineChartData: pointsWithGaps,
};

const tickValues = [
  new Date('2020-03-03T00:00:00.000Z'),
  new Date('2020-03-04T00:00:00.000Z'),
  new Date('2020-03-05T00:00:00.000Z'),
  new Date('2020-03-06T00:00:00.000Z'),
  new Date('2020-03-07T00:00:00.000Z'),
  new Date('2020-03-08T00:00:00.000Z'),
  new Date('2020-03-09T00:00:00.000Z'),
];

describe('Line chart rendering', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should render the Line chart with numeric x-axis data',
    LineChart,
    { data: basicChartPoints },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render the Line chart with date x-axis data',
    LineChart,
    { data: dateChartPoints },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
    undefined,
    undefined,
    !(isTimezoneSet(Timezone.UTC) && isTestEnv()),
  );

  const testCases = [
    ['when tick Values is given', { data: dateChartPoints, tickValues, tickFormat: '%m/%d' }],
    ['when tick Values not given and tick format is given', { data: dateChartPoints, tickFormat: '%m/%d' }],
    ['when tick Values is given and tick format not given', { data: dateChartPoints, tickValues }],
    ['when tick Values given and tick format is %m/%d/%y', { data: dateChartPoints, tickFormat: '%m/%d/%y' }],
    ['when tick Values given and tick format is %d', { data: dateChartPoints, tickValues, tickFormat: '%d' }],
    ['when tick Values given and tick format is %m', { data: dateChartPoints, tickValues, tickFormat: '%m' }],
    ['when tick Values given and tick format is %m/%y', { data: dateChartPoints, tickValues, tickFormat: '%m/%y' }],
  ];
  testCases.forEach(([testcase, props]) => {
    testWithWait(
      `Should render the Line chart with date x-axis data ${testcase}`,
      LineChart,
      props,
      container => {
        // Assert
        expect(container).toMatchSnapshot();
      },
      undefined,
      undefined,
      !(isTimezoneSet(Timezone.UTC) && isTestEnv()),
    );
  });

  testWithoutWait(
    'Should render the Line chart with points in multiple shapes',
    LineChart,
    { data: basicChartPoints, allowMultipleShapesForPoints: true },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render the Line Chart with secondary Y axis',
    LineChart,
    { data: basicChartPoints, secondaryYScaleOptions: secondaryYScalePoints },
    container => {
      // Assert
      expect(getById(container, /yAxisGElementSecondarychart_/i)).toBeDefined();
    },
  );
});

const simplePoints = {
  chartTitle: 'Line Chart',
  lineChartData: [
    {
      legend: 'From_Legacy_to_O365',
      data: [
        {
          x: new Date('2020-03-03T00:00:00.000Z'),
          y: 297,
        },
        {
          x: new Date('2020-03-04T00:00:00.000Z'),
          y: 284,
        },
        {
          x: new Date('2020-03-05T00:00:00.000Z'),
          y: 282,
        },
        {
          x: new Date('2020-03-06T00:00:00.000Z'),
          y: 294,
        },
        {
          x: new Date('2020-03-07T00:00:00.000Z'),
          y: 294,
        },
        {
          x: new Date('2020-03-08T00:00:00.000Z'),
          y: 300,
        },
        {
          x: new Date('2020-03-09T00:00:00.000Z'),
          y: 298,
        },
      ],
      color: 'blue',
      lineOptions: {
        lineBorderWidth: '4',
      },
    },
    {
      legend: 'All',
      data: [
        {
          x: new Date('2020-03-03T00:00:00.000Z'),
          y: 292,
        },
        {
          x: new Date('2020-03-04T00:00:00.000Z'),
          y: 287,
        },
        {
          x: new Date('2020-03-05T00:00:00.000Z'),
          y: 287,
        },
        {
          x: new Date('2020-03-06T00:00:00.000Z'),
          y: 292,
        },
        {
          x: new Date('2020-03-07T00:00:00.000Z'),
          y: 287,
        },
        {
          x: new Date('2020-03-08T00:00:00.000Z'),
          y: 297,
        },
        {
          x: new Date('2020-03-09T00:00:00.000Z'),
          y: 292,
        },
      ],
      color: 'green',
      lineOptions: {
        lineBorderWidth: '4',
      },
    },
  ],
};

const eventAnnotationProps = {
  events: [
    {
      event: 'event 1',
      date: new Date('2020-03-04T00:00:00.000Z'),
      onRenderCard: () => <div>event 1 message</div>,
    },
    {
      event: 'event 2',
      date: new Date('2020-03-04T00:00:00.000Z'),
      onRenderCard: () => <div>event 2 message</div>,
    },
    {
      event: 'event 3',
      date: new Date('2020-03-04T00:00:00.000Z'),
      onRenderCard: () => <div>event 3 message</div>,
    },
    {
      event: 'event 4',
      date: new Date('2020-03-06T00:00:00.000Z'),
      onRenderCard: () => <div>event 4 message</div>,
    },
    {
      event: 'event 5',
      date: new Date('2020-03-08T00:00:00.000Z'),
      onRenderCard: () => <div>event 5 message</div>,
    },
  ],
  strokeColor: 'red',
  labelColor: 'Yellow',
  labelHeight: 18,
  labelWidth: 2,
  mergedLabel: (count: number) => `${count} events`,
};

describe('Line chart - Subcomponent line', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should render the lines with the specified colors',
    LineChart,
    { data: basicChartPoints },
    container => {
      const lines = getById(container, /lineID/i);
      // Assert
      expect(lines[0].getAttribute('stroke')).toEqual('yellow');
      expect(lines[1].getAttribute('stroke')).toEqual('green');
      expect(lines[2].getAttribute('stroke')).toEqual('red');
    },
  );

  testWithoutWait(
    'Should render the line with the sepcified gaps',
    LineChart,
    { data: chartPointsWithGaps },
    container => {
      const lines = getById(container, /lineID/i);
      // Assert
      expect(lines).toHaveLength(8);
    },
  );
});

describe('Line chart - Subcomponent legend', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should highlight the corresponding Line on mouse over on legends',
    LineChart,
    { data: basicChartPoints },
    container => {
      const legend = screen.queryByText('metaData1');
      expect(legend).toBeDefined();
      fireEvent.mouseOver(legend!);
      // Assert
      const lines = getById(container, /lineID/i);
      expect(lines[0].getAttribute('opacity')).toEqual('0.1');
      expect(lines[1].getAttribute('opacity')).toEqual('0.1');
      expect(lines[2].getAttribute('opacity')).toEqual('1');
      expect(screen.queryByText('metaData2')).toHaveStyle('opacity: 0.67');
    },
  );

  testWithoutWait(
    'Should reset the highlighted line on mouse leave on legends',
    LineChart,
    { data: basicChartPoints },
    container => {
      const legend = screen.queryByText('metaData1');
      expect(legend).toBeDefined();
      fireEvent.mouseOver(legend!);
      // Assert
      const lines = getById(container, /lineID/i);
      expect(lines[0].getAttribute('opacity')).toEqual('0.1');
      expect(lines[1].getAttribute('opacity')).toEqual('0.1');
      expect(lines[2].getAttribute('opacity')).toEqual('1');

      fireEvent.mouseLeave(legend!);
      expect(lines[0].getAttribute('opacity')).toEqual('1');
      expect(lines[1].getAttribute('opacity')).toEqual('1');
      expect(lines[2].getAttribute('opacity')).toEqual('1');
    },
  );

  testWithoutWait(
    'Should select legend on single mouse click on legends',
    LineChart,
    { data: basicChartPoints, hideLegend: false },
    container => {
      // Arrange
      const legend = screen.queryByText('metaData1');
      expect(legend).toBeDefined();
      fireEvent.click(legend!);
      // Assert
      expect(getById(container, /line/i)[1]).toHaveAttribute('opacity', '0.1');
      const firstLegend = screen.queryByText('metaData1')?.closest('button');
      expect(firstLegend).toHaveAttribute('aria-selected', 'true');
    },
  );

  testWithoutWait(
    'Should deselect legend on double mouse click on legends',
    LineChart,
    { data: basicChartPoints, hideLegend: false },
    container => {
      const legend = screen.queryByText('metaData1');
      expect(legend).toBeDefined();
      //single click on first legend
      fireEvent.click(legend!);
      expect(getById(container, /line/i)[1]).toHaveAttribute('opacity', '0.1');
      const firstLegend = screen.queryByText('metaData1')?.closest('button');
      expect(firstLegend).toHaveAttribute('aria-selected', 'true');
      // double click on same first legend
      fireEvent.click(legend!);
      // Assert
      expect(firstLegend).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithoutWait(
    'Should select muultiple legends on single mouse click on different legends',
    LineChart,
    {
      data: basicChartPoints,
      hideLegend: false,
      legendProps: {
        allowFocusOnLegends: true,
        canSelectMultipleLegends: true,
      },
    },
    container => {
      // Arrange
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends[0]).toBeDefined();
      fireEvent.click(legends[0]!);
      expect(legends[1]).toBeDefined();
      fireEvent.click(legends[1]!);
      const legendsAfterClick = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      // Assert
      expect(legendsAfterClick[0]).toHaveAttribute('aria-selected', 'true');
      expect(legendsAfterClick[1]).toHaveAttribute('aria-selected', 'true');
      expect(legendsAfterClick[2]).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithoutWait(
    'Should select muultiple color fill bar legends',
    LineChart,
    {
      data: basicChartPoints,
      colorFillBars: colorFillBarData,
      legendProps: {
        allowFocusOnLegends: true,
        canSelectMultipleLegends: true,
      },
    },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(5);
      expect(legends[3]).toBeDefined();
      //fireEvent.click(legends[3]!); - ToDo fix this test
      //expect(legends[4]).toBeDefined();
      //fireEvent.click(legends[4]!);
      const legendsAfterClick = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      // Assert
      expect(legendsAfterClick[0]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClick[1]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClick[2]).toHaveAttribute('aria-selected', 'false');
      // expect(legendsAfterClick[3]).toHaveAttribute('aria-selected', 'true'); - ToDo - Fix this test
      // expect(legendsAfterClick[4]).toHaveAttribute('aria-selected', 'true'); - ToDo - Fix this test
    },
  );

  testWithWait(
    'Should highlight the data points and render the corresponding callout',
    LineChart,
    { data: basicChartPoints },
    container => {
      // Arrange
      const firstPointonLine = getById(container, /lineID/)[0];
      expect(firstPointonLine).toBeDefined();
      fireEvent.mouseOver(firstPointonLine);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toHaveLength(0);
    },
  );
});

describe('Line chart - Subcomponent Time Range', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithWait(
    'Should render time range with sepcified data',
    LineChart,
    { data: dateChartPoints, colorFillBars: colorFillBarData },
    container => {
      // Assert
      expect(getByClass(container, /rect/i).length > 0);
    },
  );

  testWithWait(
    'Should highlight corresponding time range on legend click',
    LineChart,
    { data: dateChartPoints, colorFillBars: colorFillBarData },
    container => {
      const legend = screen.queryByText('Time range 1');
      expect(legend).toBeDefined();
      fireEvent.click(legend!);
      const timeRangeLegend = screen.queryByText('Time range 1')?.closest('button');
      const lines = getById(container, /lineID/i);
      const filledBars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(timeRangeLegend).toHaveAttribute('aria-selected', 'true');
      expect(lines[0].getAttribute('opacity')).toEqual('0.1');
      expect(filledBars[0].getAttribute('fill-opacity')).toEqual('0.4');
      expect(filledBars[1].getAttribute('fill-opacity')).toEqual('0.1');
    },
  );
});

describe('Line chart - Subcomponent xAxis Labels', () => {
  testWithWait(
    'Should show the x-axis labels tooltip when hovered',
    LineChart,
    { data: dateChartPoints, showXAxisLablesTooltip: true },
    container => {
      // Arrange
      const xAxisLabels = container.querySelectorAll('tspan');
      fireEvent.mouseOver(xAxisLabels[0]);
      // Assert
      expect(xAxisLabels[0].textContent).toEqual('Febr...');
    },
    undefined,
    undefined,
    !(isTimezoneSet(Timezone.UTC) && isTestEnv()),
  );
});

describe('Line chart - Subcomponent Event', () => {
  const mockGetComputedTextLength = jest.fn().mockReturnValue(100);
  // Replace the original method with the mock implementation
  Object.defineProperty(
    Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
    'getComputedTextLength',
    {
      value: mockGetComputedTextLength,
    },
  );
  testWithWait(
    'Should render events with defined data',
    LineChart,
    { data: simplePoints, eventAnnotationProps, tickValues, tickFormat: '%m/%d' },
    container => {
      // Arrange
      const event = screen.queryByText('3 events');
      // Assert
      expect(event).toBeDefined();
      fireEvent.click(event!);
    },
    undefined,
    undefined,
    !(isTimezoneSet(Timezone.UTC) && isTestEnv()),
  );
});

describe('Screen resolution', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithWait(
    'Should remain unchanged on zoom in',
    LineChart,
    { data: basicChartPoints, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
      // Arrange
      global.innerWidth = window.innerWidth / 2;
      global.innerHeight = window.innerHeight / 2;
      act(() => {
        global.dispatchEvent(new Event('resize'));
      });
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should remain unchanged on zoom out',
    LineChart,
    { data: basicChartPoints, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
      // Arrange
      global.innerWidth = window.innerWidth * 2;
      global.innerHeight = window.innerHeight * 2;
      act(() => {
        global.dispatchEvent(new Event('resize'));
      });
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Theme and accessibility', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <FluentProvider theme={{ colorNeutralBackground1: '#ccc' }}>
        <LineChart culture={window.navigator.language} data={basicChartPoints} />
      </FluentProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Line chart - Accessibility', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<LineChart data={basicChartPoints} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});

describe('LineChart snapShot testing', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it('renders LineChart correctly', async () => {
    const wrapper = render(<LineChart data={basicChartPoints} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders hideLegend correctly', async () => {
    const wrapper = render(<LineChart data={basicChartPoints} hideLegend={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', async () => {
    const wrapper = render(<LineChart data={basicChartPoints} hideTooltip={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', async () => {
    const wrapper = render(<LineChart data={basicChartPoints} enabledLegendsWrapLines={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', async () => {
    const wrapper = render(<LineChart data={basicChartPoints} showXAxisLablesTooltip={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('renders wrapXAxisLables correctly', async () => {
    const mockGetComputedTextLength = jest.fn().mockReturnValue(100);
    // Replace the original method with the mock implementation
    Object.defineProperty(
      Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
      'getComputedTextLength',
      {
        value: mockGetComputedTextLength,
      },
    );

    const wrapper = render(<LineChart data={basicChartPoints} wrapXAxisLables={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', async () => {
    const wrapper = render(<LineChart data={basicChartPoints} yAxisTickFormat={'.1f'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('exposes optimized large-data lines as labeled options', () => {
    render(<LineChart data={basicChartPoints} optimizeLargeData />);

    expect(screen.getByRole('listbox', { name: 'metaData1 data series' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'metaData1, line 1 of 3 with 2 data points.' })).toBeInTheDocument();
  });

  it('Should render with default colors when line color is not provided', async () => {
    const points: LineChartPoints[] = [
      {
        legend: 'metaData1',
        data: [
          { x: 20, y: 50 },
          { x: 40, y: 80 },
        ],
        color: 'red',
      },
    ];

    delete points[0].color;
    const wrapper = render(<LineChart data={basicChartPoints} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('LineChart - prototype pollution hardening', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it.each(['__proto__', 'constructor', 'prototype'])(
    'renders without crashing or polluting Object.prototype when a legend is "%s"',
    magicKey => {
      const maliciousChartPoints = {
        chartTitle: 'LineChart',
        lineChartData: [
          {
            legend: magicKey,
            data: [
              { x: 1, y: 3 },
              { x: 2, y: 4 },
            ],
            color: 'red',
          },
        ] as LineChartPoints[],
      };

      expect(() => render(<LineChart data={maliciousChartPoints} />)).not.toThrow();
      expect(Object.prototype.hasOwnProperty.call(Object.prototype, 'push')).toBe(false);
    },
  );
});

describe('LineChart - basic props', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    const wrapper = render(<LineChart data={basicChartPoints} hideLegend={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    const wrapper = render(<LineChart data={basicChartPoints} hideLegend={false} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    const wrapper = render(<LineChart data={basicChartPoints} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    const wrapper = render(<LineChart data={basicChartPoints} hideTooltip={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it('No prop changes', () => {
    const props = {
      data: basicChartPoints,
      height: 300,
      width: 600,
    };

    const { rerender, container } = render(<LineChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<LineChart {...props} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).toBe(htmlBefore);
  });

  it('prop changes', async () => {
    const props = {
      data: basicChartPoints,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const { rerender, container } = render(<LineChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<LineChart {...props} hideLegend={false} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it('No empty chart aria label div rendered', () => {
    const wrapper = render(<LineChart data={basicChartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    const emptyChartPoints = {
      chartTitle: 'EmptyLineChart',
      lineChartData: [],
    };
    const wrapper = render(<LineChart data={emptyChartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});

describe('LineChart - mouse events', () => {
  let root: HTMLDivElement | null;

  beforeEach(() => {
    updateChartWidthAndHeight();
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    sharedAfterEach();

    if (root) {
      document.body.removeChild(root);
      root = null;
    }
  });

  it('Should render callout correctly on mouseover', () => {
    // Render the LineChart and simulate mouseover using React Testing Library
    const { container } = render(<LineChart data={basicChartPoints} />, { container: root! });
    const line = container.querySelector('line[id^="lineID"]');
    expect(line).toBeDefined();
    act(() => {
      fireEvent.mouseOver(line!);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', () => {
    // Render the LineChart and simulate mousemove using React Testing Library
    const { container } = render(<LineChart data={basicChartPoints} />, { container: root! });
    // Find the first and second circle elements by id pattern
    const circles = container.querySelectorAll('path[id^="circle"]');
    expect(circles.length).toBeGreaterThan(1);

    act(() => {
      fireEvent.mouseMove(circles[0]);
    });
    const html1 = container.innerHTML;

    act(() => {
      fireEvent.mouseMove(circles[1]);
    });
    const html2 = container.innerHTML;

    expect(html1).not.toBe(html2);
  });

  // @FIXME: this tests is failing with jest 29.7.0
  it('Should render customized callout on mouseover', () => {
    // Render the LineChart with a custom callout renderer using React Testing Library
    const onRenderCalloutPerDataPoint = (props: any) =>
      props ? (
        <div className="onRenderCalloutPerDataPoint">
          <p>Custom Callout Content</p>
        </div>
      ) : null;

    const { container } = render(
      <LineChart data={basicChartPoints} onRenderCalloutPerDataPoint={onRenderCalloutPerDataPoint} />,
      { container: root! },
    );

    // Find the first line element by id pattern
    const line = container.querySelector('line[id^="lineID"]');
    expect(line).toBeDefined();
    fireEvent.mouseOver(line!);

    // Assert that the custom callout is rendered
    expect(getById(container, /toolTipcallout/i)).toBeDefined();
    expect(screen.queryByText('Custom Callout Content')).toBeDefined();
  });

  // @FIXME: this tests is failing with jest 29.7.0
  it('Should render customized callout per stack on mouseover', () => {
    // Render the LineChart with a custom callout renderer using React Testing Library
    const onRenderCalloutPerStack = (props: any) =>
      props ? (
        <div>
          <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
      ) : null;

    const { container } = render(
      <LineChart data={basicChartPoints} onRenderCalloutPerStack={onRenderCalloutPerStack} />,
      { container: root! },
    );

    // Find the first line element by id pattern and simulate mouseover
    const line = container.querySelector('line[id^="lineID"]');
    expect(line).toBeDefined();
    act(() => {
      fireEvent.mouseOver(line!);
    });

    // Assert that the custom callout is rendered
    expect(container.querySelector('pre')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it('Should dismiss the callout when focus leaves the chart', () => {
    const { container } = render(
      <>
        <button data-testid="before-chart">Before chart</button>
        <LineChart data={basicChartPoints} />
      </>,
      { container: root! },
    );
    const dataPoint = container.querySelector<SVGElement>('[id^="circle"][tabindex="0"]');

    expect(dataPoint).not.toBeNull();
    fireEvent.focus(dataPoint!);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);

    fireEvent.blur(dataPoint!, { relatedTarget: screen.getByTestId('before-chart') });
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);
  });

  it('Should keep the callout open when focus moves within the chart', () => {
    const { container } = render(<LineChart data={basicChartPoints} />, { container: root! });
    const dataPoints = container.querySelectorAll<SVGElement>('[id^="circle"][tabindex="0"]');

    expect(dataPoints.length).toBeGreaterThan(1);
    fireEvent.focus(dataPoints[0]);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);

    fireEvent.blur(dataPoints[0], { relatedTarget: dataPoints[1] });
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);
  });

  it('Should keep the callout open when focus moves into custom callout content', () => {
    const onRenderCalloutPerDataPoint = () => <button data-testid="callout-action">Callout action</button>;
    const { container } = render(
      <LineChart
        data={basicChartPoints}
        isCalloutForStack={false}
        onRenderCalloutPerDataPoint={onRenderCalloutPerDataPoint}
      />,
      { container: root! },
    );
    const dataPoint = container.querySelector<SVGElement>('[id^="circle"][tabindex="0"]');

    expect(dataPoint).not.toBeNull();
    fireEvent.focus(dataPoint!);
    const calloutAction = screen.getByTestId('callout-action');

    fireEvent.blur(dataPoint!, { relatedTarget: calloutAction });
    expect(screen.getByTestId('callout-action')).toBeInTheDocument();
  });
});

describe('Axes of a chart without data', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  const emptyChartPoints = { chartTitle: 'EmptyLineChart', lineChartData: [] };
  const lineWithoutPoints = {
    chartTitle: 'EmptyLineChart',
    lineChartData: [{ legend: 'metaData1', data: [], color: 'red' }],
  };
  const emptyChartLabel = '[aria-label="Graph has no data to display"]';
  const getChartLabel = (container: HTMLElement) =>
    container.querySelector('svg[role="region"]')!.getAttribute('aria-label');
  const getTicks = (container: HTMLElement, axis: 'x' | 'y') =>
    Array.from(container.querySelectorAll<SVGGElement>(`[id^="${axis}AxisGElement"] .tick`));
  const getTickLabels = (container: HTMLElement, axis: 'x' | 'y') =>
    getTicks(container, axis).map(tick => tick.textContent);
  const getTickPosition = (tick: SVGGElement) =>
    Number(/translate\(([^,]+),/.exec(tick.getAttribute('transform')!)![1]);

  it('Should render both axes when numeric tick values and yMaxValue are set', () => {
    const { container } = render(
      <LineChart data={emptyChartPoints} tickValues={[0, 25, 50, 75, 100]} yMaxValue={40} />,
    );
    expect(container.querySelectorAll(emptyChartLabel)).toHaveLength(0);
    expect(getTickLabels(container, 'x')).toEqual(['0', '25', '50', '75', '100']);
    expect(getTickLabels(container, 'y')).toEqual(['0', '10', '20', '30', '40']);
  });

  it('Should take the axis ranges from xMinValue, xMaxValue, yMinValue and yMaxValue', () => {
    const { container } = render(
      <LineChart data={emptyChartPoints} xMinValue={0} xMaxValue={100} yMinValue={20} yMaxValue={60} />,
    );
    const xLabels = getTickLabels(container, 'x');
    expect(xLabels[0]).toBe('0');
    expect(xLabels[xLabels.length - 1]).toBe('100');
    expect(getTickLabels(container, 'y')).toEqual(['20', '30', '40', '50', '60']);
  });

  it('Should render a date axis when the tick values are dates', () => {
    const tickValues = [
      new Date('2020-03-03T00:00:00.000Z'),
      new Date('2020-03-04T00:00:00.000Z'),
      new Date('2020-03-05T00:00:00.000Z'),
    ];
    const { container } = render(<LineChart data={emptyChartPoints} tickValues={tickValues} yMaxValue={40} />);
    expect(container.querySelectorAll(emptyChartLabel)).toHaveLength(0);
    expect(getTicks(container, 'x')).toHaveLength(3);
    expect(getChartLabel(container)).toContain('The X axis displays time');
  });

  it('Should render the axes when the lines have no data points', () => {
    const { container } = render(
      <LineChart data={lineWithoutPoints} tickValues={[0, 25, 50, 75, 100]} yMaxValue={40} />,
    );
    expect(container.querySelectorAll(emptyChartLabel)).toHaveLength(0);
    expect(getTickLabels(container, 'x')).toEqual(['0', '25', '50', '75', '100']);
  });

  it('Should render a log y-axis when yMinValue is above 0', () => {
    const { container } = render(
      <LineChart
        data={emptyChartPoints}
        xMinValue={0}
        xMaxValue={100}
        yMinValue={1}
        yMaxValue={1000}
        yScaleType="log"
      />,
    );
    const yLabels = getTickLabels(container, 'y');
    expect(container.querySelectorAll(emptyChartLabel)).toHaveLength(0);
    expect(yLabels[0]).toBe('1');
    expect(yLabels[yLabels.length - 1]).toBe('1k');
  });

  const primaryYAxis = '[id^="yAxisGElement"]:not([id^="yAxisGElementSecondary"])';
  const secondaryYAxis = '[id^="yAxisGElementSecondary"]';
  const getYTickLabels = (container: HTMLElement, axis: string) =>
    Array.from(container.querySelectorAll(`${axis} .tick`)).map(tick => tick.textContent);

  it('Should take the range of the secondary y-axis from secondaryYScaleOptions', () => {
    const { container } = render(
      <LineChart
        data={emptyChartPoints}
        xMinValue={0}
        xMaxValue={100}
        yMaxValue={40}
        secondaryYScaleOptions={{ yMinValue: 20, yMaxValue: 60 }}
      />,
    );
    expect(getYTickLabels(container, primaryYAxis)).toEqual(['0', '10', '20', '30', '40']);
    expect(getYTickLabels(container, secondaryYAxis)).toEqual(['20', '30', '40', '50', '60']);
  });

  it('Should render a log secondary y-axis when its yMinValue is above 0', () => {
    const { container } = render(
      <LineChart
        data={emptyChartPoints}
        xMinValue={0}
        xMaxValue={100}
        yMaxValue={40}
        secondaryYScaleOptions={{ yMinValue: 1, yMaxValue: 100 }}
        secondaryYScaleType="log"
      />,
    );
    const labels = getYTickLabels(container, secondaryYAxis);
    expect(labels[0]).toBe('1');
    expect(labels[labels.length - 1]).toBe('100');
  });

  it.each([
    ['there are no lines', emptyChartPoints],
    ['the lines have no data points', lineWithoutPoints],
  ])('Should say in the chart label that there is no data when %s', (_name, data) => {
    const { container } = render(<LineChart data={data} tickValues={[0, 25, 50, 75, 100]} yMaxValue={40} />);
    expect(getChartLabel(container)).toContain('Graph has no data to display');
  });

  it('Should not say in the chart label that there is no data when there is data', () => {
    const { container } = render(<LineChart data={basicChartPoints} xMinValue={0} xMaxValue={100} yMaxValue={100} />);
    expect(getChartLabel(container)).not.toContain('Graph has no data to display');
  });

  it('Should render a legend list only when there is a legend to show', () => {
    const rangeProps = { tickValues: [0, 25, 50, 75, 100], yMaxValue: 40 };
    const withoutLines = render(<LineChart data={emptyChartPoints} {...rangeProps} />).container;
    const withLine = render(<LineChart data={lineWithoutPoints} {...rangeProps} />).container;

    expect(withoutLines.querySelectorAll('[role="listbox"]')).toHaveLength(0);
    expect(withLine.querySelectorAll('[role="option"]')).toHaveLength(1);
  });

  it('Should close an open callout when the data goes away, and keep it closed when the data comes back', () => {
    const rangeProps = { xMinValue: 0, xMaxValue: 100, yMaxValue: 100 };
    const { container, rerender } = render(<LineChart data={basicChartPoints} {...rangeProps} />);
    fireEvent.focus(container.querySelector<SVGElement>('[id^="circle"][tabindex="0"]')!);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);

    rerender(<LineChart data={emptyChartPoints} {...rangeProps} />);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);
    expect(container.querySelectorAll('[id^="lineID"]')).toHaveLength(0);
    expect(getTicks(container, 'y').length).toBeGreaterThan(1);

    rerender(<LineChart data={basicChartPoints} {...rangeProps} />);
    expect(container.querySelectorAll('[id^="lineID"]').length).toBeGreaterThan(0);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);
  });

  it('Should not draw a series that was selected before the data went away', () => {
    const chartProps = {
      xMinValue: 0,
      xMaxValue: 100,
      yMaxValue: 100,
      legendProps: { canSelectMultipleLegends: true },
    };
    const { container, rerender } = render(<LineChart data={basicChartPoints} {...chartProps} />);
    const legend = container.querySelector<HTMLElement>('button[role="option"]')!;
    fireEvent.click(legend);
    expect(legend).toHaveAttribute('aria-selected', 'true');
    expect(container.querySelectorAll('[id^="lineID"]').length).toBeGreaterThan(0);

    rerender(<LineChart data={emptyChartPoints} {...chartProps} />);
    expect(container.querySelectorAll('[id^="lineID"]')).toHaveLength(0);
    expect(container.querySelectorAll('[id^="circle"]')).toHaveLength(0);
    expect(getTicks(container, 'y').length).toBeGreaterThan(1);
  });

  it('Should hide the hover guide line when the data goes away', () => {
    const rangeProps = { xMinValue: 0, xMaxValue: 100, yMaxValue: 100 };
    const { container, rerender } = render(<LineChart data={basicChartPoints} {...rangeProps} />);
    const getGuideLine = () => container.querySelector('line[id^="verticalLine"]')!;
    fireEvent.focus(container.querySelector<SVGElement>('[id^="circle"][tabindex="0"]')!);
    expect(getGuideLine()).not.toHaveAttribute('visibility', 'hidden');

    rerender(<LineChart data={emptyChartPoints} {...rangeProps} />);
    expect(getGuideLine()).toHaveAttribute('visibility', 'hidden');
  });

  it('Should draw color fill bars over the y range when there is no data', () => {
    const { container } = render(
      <LineChart
        data={emptyChartPoints}
        xMinValue={0}
        xMaxValue={100}
        yMaxValue={40}
        colorFillBars={[{ legend: 'Range 1', color: 'blue', data: [{ startX: 10, endX: 30 }] }]}
      />,
    );
    const bars = container.querySelectorAll('rect[fill-opacity]');
    const tickPositions = getTicks(container, 'y').map(tick =>
      Number(/translate\(0,([^)]+)\)/.exec(tick.getAttribute('transform')!)![1]),
    );
    const top = Math.min(...tickPositions);
    const bottom = Math.max(...tickPositions);

    expect(bars).toHaveLength(1);
    const y = Number(bars[0].getAttribute('y'));
    const height = Number(bars[0].getAttribute('height'));
    expect(Number(bars[0].getAttribute('width'))).toBeGreaterThan(0);
    // The bar reaches from 0 up to yMaxValue: it starts 3px above the highest tick and ends at the lowest one.
    expect(height).toBeCloseTo(bottom - top + 3, 5);
    expect(Math.abs(y + height - bottom)).toBeLessThan(1);
  });

  it('Should keep the color fill bars when a selected series goes away with the data', () => {
    const chartProps = {
      xMinValue: 0,
      xMaxValue: 100,
      yMaxValue: 100,
      legendProps: { canSelectMultipleLegends: true },
      colorFillBars: [{ legend: 'Range 1', color: 'blue', data: [{ startX: 10, endX: 30 }] }],
    };
    const { container, rerender } = render(<LineChart data={basicChartPoints} {...chartProps} />);
    // With data, a selected series hides the bars that are not selected.
    fireEvent.click(container.querySelector<HTMLElement>('button[role="option"]')!);
    expect(container.querySelectorAll('rect[fill-opacity]')).toHaveLength(0);

    rerender(<LineChart data={emptyChartPoints} {...chartProps} />);
    expect(container.querySelectorAll('rect[fill-opacity]')).toHaveLength(1);
  });

  it('Should mirror the x-axis in RTL', () => {
    const chart = <LineChart data={emptyChartPoints} tickValues={[0, 25, 50, 75, 100]} yMaxValue={40} />;
    const ltrTicks = getTicks(render(chart).container, 'x');
    const rtlTicks = getTicks(
      render(
        <FluentProvider dir="rtl" theme={{}}>
          {chart}
        </FluentProvider>,
      ).container,
      'x',
    );

    expect(ltrTicks.map(tick => tick.textContent)).toEqual(['0', '25', '50', '75', '100']);
    expect(rtlTicks.map(tick => tick.textContent)).toEqual(['0', '25', '50', '75', '100']);
    expect(getTickPosition(ltrTicks[0])).toBeLessThan(getTickPosition(ltrTicks[4]));
    expect(getTickPosition(rtlTicks[0])).toBeGreaterThan(getTickPosition(rtlTicks[4]));
  });

  it('Should keep the ticks apart in RTL when xMinValue is set next to the tick values', () => {
    const { container } = render(
      <FluentProvider dir="rtl" theme={{}}>
        <LineChart data={emptyChartPoints} tickValues={[0, 25, 50, 75, 100]} xMinValue={0} yMaxValue={40} />
      </FluentProvider>,
    );
    const positions = getTicks(container, 'x').map(getTickPosition);
    expect(new Set(positions).size).toBe(5);
  });

  it.each([
    ['only the x-axis has a range', { xMinValue: 0, xMaxValue: 100 }],
    ['only the y-axis has a range', { yMaxValue: 40 }],
    ['the x-axis range has no end', { xMinValue: 0, yMaxValue: 40 }],
    ['the x-axis range is a single value', { tickValues: [50], yMaxValue: 40 }],
    ['a log y-axis would start at 0', { xMinValue: 0, xMaxValue: 100, yMaxValue: 40, yScaleType: 'log' as const }],
    [
      'a log x-axis would start at 0',
      { tickValues: [1, 10, 100], xMinValue: 0, yMaxValue: 40, xScaleType: 'log' as const },
    ],
  ])('Should render only the empty chart aria label div when %s', (_name, rangeProps) => {
    const { container } = render(<LineChart data={emptyChartPoints} {...rangeProps} />);
    expect(container.querySelectorAll(emptyChartLabel)).toHaveLength(1);
    expect(container.querySelector('svg')).toBeNull();
  });
});

describe('Axes of a chart without data - Accessibility', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(
      <LineChart
        data={{ chartTitle: 'EmptyLineChart', lineChartData: [] }}
        tickValues={[0, 25, 50, 75, 100]}
        yMaxValue={40}
      />,
    );
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
