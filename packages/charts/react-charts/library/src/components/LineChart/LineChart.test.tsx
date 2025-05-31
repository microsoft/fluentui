/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { LineChartPoints, LineChart } from './index';
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

/* function updateChartWidthAndHeight() {
  jest.useFakeTimers();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
  window.HTMLElement.prototype.getBoundingClientRect = () =>
    ({
      bottom: 44,
      height: 50,
      left: 10,
      right: 35.67,
      top: 20,
      width: 650,
    } as DOMRect);
} */

function sharedAfterEach() {
  jest.useRealTimers();
  window.requestAnimationFrame = originalRAF;
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
      const xAxisLabels = getById(container, /showDots/i);
      fireEvent.mouseOver(xAxisLabels[0]);
      // Assert
      expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('Febr...');
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
  it('renders LineChart correctly', async () => {
    let wrapper = render(<LineChart data={basicChartPoints} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders hideLegend correctly', async () => {
    let wrapper = render(<LineChart data={basicChartPoints} hideLegend={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', async () => {
    let wrapper = render(<LineChart data={basicChartPoints} hideTooltip={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', async () => {
    let wrapper = render(<LineChart data={basicChartPoints} enabledLegendsWrapLines={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', async () => {
    let wrapper = render(<LineChart data={basicChartPoints} showXAxisLablesTooltip={true} />);
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

    let wrapper = render(<LineChart data={basicChartPoints} wrapXAxisLables={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', async () => {
    let wrapper = render(<LineChart data={basicChartPoints} yAxisTickFormat={'/%d'} />);
    expect(wrapper).toMatchSnapshot();
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
    let wrapper = render(<LineChart data={basicChartPoints} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('LineChart - basic props', () => {
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    let wrapper = render(<LineChart data={basicChartPoints} hideLegend={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    let wrapper = render(<LineChart data={basicChartPoints} hideLegend={false} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    let wrapper = render(<LineChart data={basicChartPoints} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    let wrapper = render(<LineChart data={basicChartPoints} hideTooltip={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
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
  it('No empty chart aria label div rendered', () => {
    let wrapper = render(<LineChart data={basicChartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    const emptyChartPoints = {
      chartTitle: 'EmptyLineChart',
      lineChartData: [],
    };
    let wrapper = render(<LineChart data={emptyChartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});

describe('LineChart - mouse events', () => {
  let root: HTMLDivElement | null;

  beforeEach(() => {
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

  // @FIXME: this tests is failing with jest 29.7.0
  it('Should render callout correctly on mouseover', () => {
    // Render the LineChart and simulate mouseover using React Testing Library
    const { container } = render(<LineChart data={basicChartPoints} />, { container: root! });
    // Find the first line element by id pattern
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
});
