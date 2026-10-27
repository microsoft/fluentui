/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import type { LineChartPoints, LineChartProps } from './index';
import { LineChart } from './index';
import '@testing-library/jest-dom';
import type { CustomizedCalloutData } from '../../types/index';
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

  it.each([
    { policy: 'preserve' as const, perStack: true },
    { policy: 'none' as const, perStack: true },
    { policy: 'preserve' as const, perStack: false },
    { policy: 'none' as const, perStack: false },
  ])(
    'Should refresh a stateful callout without remounting (policy: $policy, stack: $perStack)',
    ({ policy, perStack }) => {
      let calloutMountCount = 0;
      const CalloutContent = ({ calloutProps }: { calloutProps?: CustomizedCalloutData }) => {
        const [value, setValue] = React.useState('');
        React.useEffect(() => {
          calloutMountCount++;
        }, []);
        return (
          <>
            <input aria-label="Callout note" value={value} onChange={event => setValue(event.target.value)} />
            <pre>{JSON.stringify(calloutProps)}</pre>
          </>
        );
      };
      const renderCallout = (calloutProps?: CustomizedCalloutData) => <CalloutContent calloutProps={calloutProps} />;
      const scene = (data: typeof basicChartPoints) => (
        <LineChart
          data={data}
          focusRestorePolicy={policy}
          onRenderCalloutPerStack={perStack ? renderCallout : undefined}
          onRenderCalloutPerDataPoint={perStack ? undefined : renderCallout}
        />
      );
      const { container, rerender } = render(scene(basicChartPoints), { container: root! });
      const point = container.querySelector<SVGElement>('[aria-label="20. metaData1, 50."]');
      expect(point).not.toBeNull();
      act(() => point!.focus());
      const input = screen.getByRole('textbox', { name: 'Callout note' });
      act(() => input.focus());
      fireEvent.change(input, { target: { value: 'Retain my note' } });
      expect(calloutMountCount).toBe(1);

      for (const callbacks of [false, true]) {
        rerender(
          scene({
            ...basicChartPoints,
            lineChartData: basicPoints.map(line => ({
              ...line,
              onLineClick: callbacks ? () => undefined : undefined,
              data: line.data.map(dataPoint => ({
                ...dataPoint,
                onDataPointClick: callbacks ? () => undefined : undefined,
              })),
            })),
          }),
        );
        expect(screen.getByRole('textbox', { name: 'Callout note' })).toBe(input);
        expect(input).toHaveValue('Retain my note');
        expect(container.ownerDocument.activeElement).toBe(input);
        expect(calloutMountCount).toBe(1);
      }

      const previousPath = point!.getAttribute('d');
      rerender(
        scene({
          ...basicChartPoints,
          lineChartData: basicPoints.map((line, lineIndex) => ({
            ...line,
            color: 'blue',
            data: line.data.map((dataPoint, pointIndex) =>
              lineIndex === 0 && pointIndex === 0 ? { ...dataPoint, x: 22, y: 987654 } : dataPoint,
            ),
          })),
        }),
      );

      expect(container.querySelector('[aria-label="22. metaData1, 987654."]')).toBe(point);
      expect(point!.getAttribute('d')).not.toBe(previousPath);
      expect(container.querySelector('pre')).toHaveTextContent('987654');
      expect(container.querySelector('pre')).toHaveTextContent('blue');
      expect(screen.getByRole('textbox', { name: 'Callout note' })).toBe(input);
      expect(input).toHaveValue('Retain my note');
      expect(container.ownerDocument.activeElement).toBe(input);
      expect(calloutMountCount).toBe(1);
    },
  );

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

  it('Should focus the point specified by focusOnReset when data or colors change', () => {
    const focusOnReset = { lineIndex: 1, pointIndex: 1 };
    const updatedData = {
      ...basicChartPoints,
      lineChartData: basicChartPoints.lineChartData.map(line => ({ ...line, color: 'blue' })),
    };
    const { container, rerender } = render(
      <>
        <button data-testid="before-chart">Before chart</button>
        <LineChart data={basicChartPoints} focusOnReset={focusOnReset} focusRestorePolicy="reset" />
      </>,
      { container: root! },
    );
    const beforeChart = screen.getByTestId('before-chart');
    const userSelectedPoint = container.querySelector<SVGElement>('[aria-label="70. metaData3, 30."]');
    expect(userSelectedPoint).not.toBeNull();
    act(() => userSelectedPoint!.focus());
    act(() => beforeChart.focus());

    rerender(
      <>
        <button data-testid="before-chart">Before chart</button>
        <LineChart data={updatedData} focusOnReset={focusOnReset} focusRestorePolicy="reset" />
      </>,
    );

    expect(container.ownerDocument.activeElement).toBe(container.querySelector('[aria-label="50. metaData2, 90."]'));
  });

  it.each([false, true])('Should skip an inactive point (focusOnReset: %s)', enableFocusOnReset => {
    const focusOnReset = enableFocusOnReset ? { lineIndex: 1, pointIndex: 1 } : undefined;
    const { container, rerender } = render(
      <>
        <button data-testid="before-chart">Before chart</button>
        <LineChart data={basicChartPoints} focusOnReset={focusOnReset} focusRestorePolicy="reset" />
      </>,
      { container: root! },
    );
    const point = container.querySelector<SVGElement>('[aria-label="50. metaData2, 90."]')!;
    act(() => point.focus());
    const beforeChart = screen.getByTestId('before-chart');
    act(() => beforeChart.focus());
    fireEvent.click(screen.getByRole('option', { name: 'metaData1' }));
    expect(point).not.toHaveAttribute('tabindex');
    const updatedData = {
      ...basicChartPoints,
      lineChartData: basicPoints.map(line => ({ ...line, color: 'blue' })),
    };

    rerender(
      <>
        <button data-testid="before-chart">Before chart</button>
        <LineChart data={updatedData} focusOnReset={focusOnReset} focusRestorePolicy="reset" />
      </>,
    );

    expect(container.ownerDocument.activeElement).toBe(beforeChart);
    expect(point).not.toHaveAttribute('tabindex');
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);
  });

  it.each([false, true])('Should not restore focus for equivalent data (cloned: %s)', cloneData => {
    const { container, rerender } = render(
      <>
        <button data-testid="before-chart">Before chart</button>
        <LineChart data={basicChartPoints} focusOnReset={{ lineIndex: 1, pointIndex: 1 }} focusRestorePolicy="reset" />
      </>,
      { container: root! },
    );
    act(() => container.querySelector<SVGElement>('[aria-label="50. metaData2, 90."]')!.focus());
    const beforeChart = screen.getByTestId('before-chart');
    act(() => beforeChart.focus());
    const data = cloneData
      ? {
          ...basicChartPoints,
          lineChartData: basicPoints.map(line => ({ ...line, data: line.data.map(point => ({ ...point })) })),
        }
      : basicChartPoints;

    rerender(
      <>
        <button data-testid="before-chart">Before chart</button>
        <LineChart data={data} focusOnReset={{ lineIndex: 1, pointIndex: 1 }} focusRestorePolicy="reset" width={700} />
      </>,
    );

    expect(container.ownerDocument.activeElement).toBe(beforeChart);
  });

  it.each([false, true])(
    'Should not restore focus when only inline handlers change (focusOnReset: %s)',
    enableFocusOnReset => {
      const createData = (isInteractive = true) => ({
        ...basicChartPoints,
        lineChartData: basicPoints.map(line => ({
          ...line,
          onLineClick: isInteractive ? () => undefined : undefined,
          data: line.data.map(point => ({
            ...point,
            onDataPointClick: isInteractive ? () => undefined : undefined,
          })),
        })),
      });
      const focusOnReset = enableFocusOnReset ? { lineIndex: 1, pointIndex: 1 } : undefined;
      const { container, rerender } = render(
        <>
          <button data-testid="before-chart">Before chart</button>
          <LineChart data={createData()} focusOnReset={focusOnReset} focusRestorePolicy="reset" />
        </>,
        { container: root! },
      );
      act(() => container.querySelector<SVGElement>('[aria-label="50. metaData2, 90."]')!.focus());
      const beforeChart = screen.getByTestId('before-chart');
      act(() => beforeChart.focus());

      for (const isInteractive of [true, false, true]) {
        rerender(
          <>
            <button data-testid="before-chart">Before chart</button>
            <LineChart
              data={createData(isInteractive)}
              focusOnReset={focusOnReset}
              focusRestorePolicy="reset"
              width={700}
            />
          </>,
        );

        expect(container.ownerDocument.activeElement).toBe(beforeChart);
      }
    },
  );

  it.each([
    { optimizeLargeData: false, x: 0, y: 0 },
    { optimizeLargeData: true, x: 0, y: 0 },
    { optimizeLargeData: false, x: 35, y: 45 },
    { optimizeLargeData: true, x: 35, y: 45 },
  ])(
    'Should reopen the path-line callout at the same position (optimized: $optimizeLargeData, x: $x, y: $y)',
    ({ optimizeLargeData, x, y }) => {
      const data = {
        ...basicChartPoints,
        lineChartData: basicPoints.map(line => ({
          ...line,
          lineOptions: { curve: optimizeLargeData ? undefined : ('linear' as const), mode: 'lines' as const },
        })),
      };
      const updatedData = {
        ...data,
        lineChartData: data.lineChartData.map(line => ({ ...line, color: 'blue' })),
      };
      const focusOnReset = { lineIndex: 1, pointIndex: 1 };
      const { container, rerender } = render(
        <>
          <button data-testid="before-chart">Before chart</button>
          <LineChart
            data={data}
            optimizeLargeData={optimizeLargeData}
            focusOnReset={focusOnReset}
            focusRestorePolicy="reset"
          />
        </>,
        { container: root! },
      );
      const beforeChart = screen.getByTestId('before-chart');
      const highlightCircle = container.querySelector<SVGCircleElement>(
        'circle[id^="staticHighlightCircle"][id$="_1"]',
      )!;
      const highlightRect = highlightCircle.getBoundingClientRect();
      Object.defineProperty(highlightCircle, 'getBoundingClientRect', {
        value: () => ({ ...highlightRect, x, y }),
      });
      act(() => beforeChart.focus());

      rerender(
        <>
          <button data-testid="before-chart">Before chart</button>
          <LineChart
            data={updatedData}
            optimizeLargeData={optimizeLargeData}
            focusOnReset={focusOnReset}
            focusRestorePolicy="reset"
          />
        </>,
      );

      const line = container.querySelectorAll<SVGPathElement>('path[id^="lineID"]')[1];
      expect(line).toBeDefined();
      expect(container.ownerDocument.activeElement).toBe(line);
      expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);
      expect(getByClass(container, /calloutContentRoot/i)[0]).toHaveTextContent('90');
      expect(
        container.querySelector<SVGCircleElement>('circle[id^="staticHighlightCircle"][id$="_1"]')!.getAttribute('cx'),
      ).not.toBe('0');
      act(() => beforeChart.focus());
      expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);

      act(() => line.focus());
      expect(container.ownerDocument.activeElement).toBe(line);
      expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);
      expect(getByClass(container, /calloutContentRoot/i)[0]).toHaveTextContent('90');
      act(() => beforeChart.focus());

      rerender(
        <>
          <button data-testid="before-chart">Before chart</button>
          <LineChart data={data} optimizeLargeData={optimizeLargeData} focusRestorePolicy="reset" />
        </>,
      );

      expect(container.ownerDocument.activeElement).toBe(line);
      expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);
      expect(getByClass(container, /calloutContentRoot/i)[0]).toHaveTextContent('90');
    },
  );

  it.each([false, true])(
    'Should preserve a focused path when markers coexist and the path is removed (optimized: %s)',
    optimizeLargeData => {
      const scene = (markersOnly: boolean) => (
        <LineChart
          data={{
            ...basicChartPoints,
            lineChartData: basicPoints.map(line => ({
              ...line,
              lineOptions: {
                curve: 'linear',
                mode: markersOnly ? 'markers' : 'lines+markers',
              },
            })),
          }}
          optimizeLargeData={optimizeLargeData}
        />
      );
      const { container, rerender } = render(scene(false), { container: root! });
      const path = container.querySelector<SVGPathElement>('path[id^="lineID"][tabindex="0"]')!;
      expect(path).not.toBeNull();
      expect(container.querySelector('circle[role="option"][tabindex="0"]')).not.toBeNull();
      act(() => path.focus());
      expect(container.ownerDocument.activeElement).toBe(path);

      rerender(scene(true));

      expect(path.isConnected).toBe(false);
      const marker = container.querySelector<SVGElement>('circle[role="option"][tabindex="0"]')!;
      expect(marker).not.toBeNull();
      expect(container.ownerDocument.activeElement).toBe(marker);
    },
  );

  it('Should restore the previously focused point when focusOnReset is not provided', () => {
    const updatedData = {
      ...basicChartPoints,
      lineChartData: basicChartPoints.lineChartData.map(line => ({ ...line, color: 'blue' })),
    };
    const { container, rerender } = render(
      <>
        <button data-testid="before-chart">Before chart</button>
        <LineChart data={basicChartPoints} focusRestorePolicy="reset" />
      </>,
      { container: root! },
    );
    const beforeChart = screen.getByTestId('before-chart');
    const previouslyFocusedPoint = container.querySelector<SVGElement>('[aria-label="70. metaData3, 30."]');
    expect(previouslyFocusedPoint).not.toBeNull();
    act(() => previouslyFocusedPoint!.focus());
    act(() => beforeChart.focus());

    rerender(
      <>
        <button data-testid="before-chart">Before chart</button>
        <LineChart data={updatedData} focusRestorePolicy="reset" />
      </>,
    );

    expect(container.ownerDocument.activeElement).toBe(container.querySelector('[aria-label="70. metaData3, 30."]'));
  });
});

describe('LineChart - source coordinates after legend filtering', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  const renderModes = ['single', 'points', 'curved', 'optimized'] as const;
  type RenderMode = (typeof renderModes)[number];
  const createData = (mode: RenderMode, revision = 0): LineChartProps['data'] => ({
    lineChartData: ['A', 'B', 'C'].map((legend, index) => ({
      legend,
      color: revision ? 'purple' : ['red', 'green', 'blue'][index],
      data: Array.from({ length: mode === 'single' ? 1 : 2 }, (_, pointIndex) => ({
        x: index * 10 + pointIndex + 1,
        y: index * 100 + pointIndex + revision + 1,
      })),
      lineOptions: {
        curve: mode === 'curved' ? 'linear' : undefined,
        mode: mode === 'points' || mode === 'single' ? 'lines+markers' : 'lines',
      },
    })),
  });
  const scene = (mode: RenderMode, data: LineChartProps['data'], props: Partial<LineChartProps> = {}) => (
    <>
      <button data-testid="outside">Outside</button>
      <LineChart
        data={data}
        width={600}
        height={400}
        yMinValue={0}
        yMaxValue={400}
        optimizeLargeData={mode === 'optimized'}
        allowMultipleShapesForPoints={mode === 'points'}
        legendProps={{ canSelectMultipleLegends: true, selectedLegends: ['B'] }}
        onRenderCalloutPerStack={dataPoint => <pre data-testid="selected-callout">{JSON.stringify(dataPoint)}</pre>}
        {...props}
      />
    </>
  );
  const getTarget = (container: HTMLElement, mode: RenderMode, legend = 'B') =>
    container.querySelector<SVGElement>(
      mode === 'curved' || mode === 'optimized'
        ? 'path[id^="lineID"][tabindex="0"]'
        : `[role="option"][aria-label*=". ${legend},"][tabindex="0"]`,
    )!;

  describe.each(renderModes)('%s', mode => {
    it.each([0, 1, 2])('resolves source series index %s without redirecting inactive targets', lineIndex => {
      const config = {
        focusRestorePolicy: 'reset' as const,
        focusOnReset: { lineIndex, pointIndex: 0 },
      };
      const { container, rerender, getByTestId } = render(scene(mode, createData(mode), config));
      act(() => getByTestId('outside').focus());

      rerender(scene(mode, createData(mode, 10), config));

      expect(container.ownerDocument.activeElement).toBe(
        lineIndex === 1 ? getTarget(container, mode) : getByTestId('outside'),
      );
      if (lineIndex === 1) {
        expect(getByTestId('selected-callout')).toHaveTextContent('"legend":"B"');
        expect(getByTestId('selected-callout')).toHaveTextContent('"y":111');
      }
    });

    it.each([
      { policy: 'preserve' as const, perStack: true },
      { policy: 'none' as const, perStack: true },
      { policy: 'preserve' as const, perStack: false },
      { policy: 'none' as const, perStack: false },
    ])('refreshes selected custom content without remounting ($policy, stack: $perStack)', ({ policy, perStack }) => {
      let mountCount = 0;
      const Content = ({ data }: { data?: CustomizedCalloutData }) => {
        const [note, setNote] = React.useState('');
        React.useEffect(() => {
          mountCount++;
        }, []);
        return (
          <>
            <input aria-label="Selected callout note" value={note} onChange={event => setNote(event.target.value)} />
            <pre data-testid="selected-callout">{JSON.stringify(data)}</pre>
          </>
        );
      };
      const renderContent = (data?: CustomizedCalloutData) => <Content data={data} />;
      const config = {
        focusRestorePolicy: policy,
        onRenderCalloutPerStack: perStack ? renderContent : undefined,
        onRenderCalloutPerDataPoint: perStack ? undefined : renderContent,
      };
      const { container, rerender, getByRole, getByTestId } = render(scene(mode, createData(mode), config));
      const target = getTarget(container, mode);
      expect(target).not.toBeNull();
      act(() => target.focus());
      expect(getByTestId('selected-callout')).toHaveTextContent('"legend":"B"');
      const input = getByRole('textbox', { name: 'Selected callout note' });
      act(() => input.focus());
      fireEvent.change(input, { target: { value: 'Keep my note' } });

      rerender(scene(mode, createData(mode), config));
      const callbacks = createData(mode);
      callbacks.lineChartData = callbacks.lineChartData!.map(line => ({
        ...line,
        onLineClick: () => undefined,
      }));
      rerender(scene(mode, callbacks, config));
      rerender(scene(mode, createData(mode, 10), config));

      expect(getByTestId('selected-callout')).toHaveTextContent('"legend":"B"');
      expect(getByTestId('selected-callout')).toHaveTextContent('"y":111');
      expect(getByTestId('selected-callout')).toHaveTextContent('purple');
      expect(getByRole('textbox', { name: 'Selected callout note' })).toBe(input);
      expect(input).toHaveValue('Keep my note');
      expect(container.ownerDocument.activeElement).toBe(input);
      expect(mountCount).toBe(1);
      if (mode === 'single' || mode === 'points') {
        expect(getTarget(container, mode)).toHaveAttribute('aria-label', '11. B, 111.');
      }
    });
  });

  it('keeps source coordinates when legends are clicked in a different order', () => {
    const config = {
      focusRestorePolicy: 'reset' as const,
      focusOnReset: { lineIndex: 2, pointIndex: 0 },
      legendProps: { canSelectMultipleLegends: true },
    };
    const { container, rerender, getByTestId, getByRole } = render(scene('points', createData('points'), config));
    fireEvent.click(getByRole('option', { name: 'C' }));
    fireEvent.click(getByRole('option', { name: 'A' }));
    act(() => getByTestId('outside').focus());

    rerender(scene('points', createData('points', 10), config));

    expect(container.ownerDocument.activeElement).toBe(getTarget(container, 'points', 'C'));
    expect(getByTestId('selected-callout')).toHaveTextContent('"legend":"C"');
    expect(getByTestId('selected-callout')).toHaveTextContent('"y":211');
  });

  it('treats a reordered series index as a position in the current input', () => {
    const config = { focusRestorePolicy: 'reset' as const, focusOnReset: { lineIndex: 1, pointIndex: 0 } };
    const { container, rerender, getByTestId } = render(scene('points', createData('points'), config));
    act(() => getByTestId('outside').focus());
    const reordered = createData('points', 10);
    reordered.lineChartData = [reordered.lineChartData![2], reordered.lineChartData![0], reordered.lineChartData![1]];

    rerender(scene('points', reordered, config));
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
    rerender(
      scene('points', createData('points', 20), {
        ...config,
        focusOnReset: { lineIndex: 1, pointIndex: 0 },
      }),
    );
    expect(container.ownerDocument.activeElement).toBe(getTarget(container, 'points'));
  });

  it.each([
    { lineIndex: 3, pointIndex: 0 },
    { lineIndex: 1, pointIndex: 2 },
  ])('skips missing source coordinates $lineIndex/$pointIndex', focusOnReset => {
    const config = { focusRestorePolicy: 'reset' as const, focusOnReset };
    const { container, rerender, getByTestId } = render(scene('points', createData('points'), config));
    act(() => getByTestId('outside').focus());
    rerender(scene('points', createData('points', 10), config));
    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
  });

  it.each([
    { selection: ['C'], lineIndex: 2, shouldRestore: true },
    { selection: ['C'], lineIndex: 1, shouldRestore: false },
    { selection: [], lineIndex: 1, shouldRestore: true },
  ])('uses the updated controlled selection for source index $lineIndex', ({ selection, lineIndex, shouldRestore }) => {
    const config = { focusRestorePolicy: 'reset' as const, focusOnReset: { lineIndex, pointIndex: 0 } };
    const { container, rerender, getByTestId } = render(scene('points', createData('points'), config));
    act(() => getByTestId('outside').focus());

    rerender(
      scene('points', createData('points', 10), {
        ...config,
        legendProps: { canSelectMultipleLegends: true, selectedLegends: selection },
      }),
    );

    expect(container.ownerDocument.activeElement).toBe(
      shouldRestore ? getTarget(container, 'points', lineIndex === 2 ? 'C' : 'B') : getByTestId('outside'),
    );
    expect(container.querySelector('[aria-label="21. C, 211."]')).not.toBeNull();
    expect(container.querySelector('[aria-label="11. B, 111."]') !== null).toBe(selection.length === 0);
  });

  it('skips an unplottable point rather than focusing its line-path fallback', () => {
    const data = createData('curved');
    data.lineChartData![1].data[0].y = Number.NaN;
    const config = { focusRestorePolicy: 'reset' as const, focusOnReset: { lineIndex: 1, pointIndex: 0 } };
    const { container, rerender, getByTestId } = render(scene('curved', data, config));
    act(() => getByTestId('outside').focus());

    rerender(
      scene(
        'curved',
        { ...data, lineChartData: data.lineChartData!.map(line => ({ ...line, color: 'purple' })) },
        config,
      ),
    );

    expect(container.ownerDocument.activeElement).toBe(getByTestId('outside'));
  });

  it.each(['curved', 'optimized'] as const)('preserves selected %s path focus when switching to markers', mode => {
    const data = createData(mode);
    data.lineChartData = data.lineChartData!.map(line => ({
      ...line,
      lineOptions: { ...line.lineOptions, mode: 'lines+markers' },
    }));
    const { container, rerender, getByTestId } = render(scene(mode, data));
    const path = getTarget(container, mode);
    act(() => path.focus());
    expect(getByTestId('selected-callout')).toHaveTextContent('"legend":"B"');

    rerender(
      scene(mode, {
        ...data,
        lineChartData: data.lineChartData!.map(line => ({
          ...line,
          lineOptions: { ...line.lineOptions, mode: 'markers' },
        })),
      }),
    );

    expect(path.isConnected).toBe(false);
    const marker = container.querySelector('[aria-label="11. B, 101."]');
    expect(marker).not.toBeNull();
    expect(container.ownerDocument.activeElement).toBe(marker);
    expect(getByTestId('selected-callout')).toHaveTextContent('"legend":"B"');
  });
});
