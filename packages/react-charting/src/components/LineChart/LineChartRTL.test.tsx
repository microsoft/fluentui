/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { DefaultPalette, ThemeProvider } from '@fluentui/react';
import { ILineChartPoints, LineChart } from './index';
import { mergeStyles } from '@fluentui/merge-styles';

import { getByClass, getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const beforeAll = () => {
  jest.spyOn(Date.prototype, 'toLocaleString').mockReturnValue('08/25/2023');
  jest.spyOn(Date.prototype, 'toLocaleTimeString').mockReturnValue('08/25/2023');
};

const calloutItemStyle = mergeStyles({
  borderBottom: '1px solid #D9D9D9',
  padding: '3px',
});

const basicPoints: ILineChartPoints[] = [
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

const datePoints: ILineChartPoints[] = [
  {
    data: [
      { x: new Date('01/01/2020'), y: 30 },
      { x: new Date('02/01/2020'), y: 50 },
      { x: new Date('03/01/2020'), y: 30 },
      { x: new Date('04/01/2020'), y: 50 },
      { x: new Date('05/01/2020'), y: 30 },
      { x: new Date('06/01/2020'), y: 50 },
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
        startX: new Date('01/01/2020'),
        endX: new Date('02/01/2020'),
      },
    ],
  },
  {
    legend: 'Time range 2',
    color: 'red',
    data: [
      {
        startX: new Date('04/01/2018'),
        endX: new Date('05/01/2018'),
      },
    ],
    applyPattern: true,
  },
];

const pointsWithGaps: ILineChartPoints[] = [
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
    color: DefaultPalette.blue,
  },
];

const chartPointsWithGaps = {
  chartTitle: 'LineChart',
  lineChartData: pointsWithGaps,
};

describe('Line chart rendering', () => {
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
    beforeAll,
  );

  testWithoutWait(
    'Should render the Line chart with points in multiple shapes',
    LineChart,
    { data: basicChartPoints, allowMultipleShapesForPoints: true },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
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

const tickValues = [
  new Date('2020-03-03'),
  new Date('2020-03-04'),
  new Date('2020-03-05'),
  new Date('2020-03-06'),
  new Date('2020-03-07'),
  new Date('2020-03-08'),
  new Date('2020-03-09'),
];

const eventAnnotationProps = {
  events: [
    {
      event: 'event 1',
      date: new Date('2020-03-04T00:00:00.000Z'),
      onRenderCard: () => <div className={calloutItemStyle}>event 1 message</div>,
    },
    {
      event: 'event 2',
      date: new Date('2020-03-04T00:00:00.000Z'),
      onRenderCard: () => <div className={calloutItemStyle}>event 2 message</div>,
    },
    {
      event: 'event 3',
      date: new Date('2020-03-04T00:00:00.000Z'),
      onRenderCard: () => <div className={calloutItemStyle}>event 3 message</div>,
    },
    {
      event: 'event 4',
      date: new Date('2020-03-06T00:00:00.000Z'),
      onRenderCard: () => <div className={calloutItemStyle}>event 4 message</div>,
    },
    {
      event: 'event 5',
      date: new Date('2020-03-08T00:00:00.000Z'),
      onRenderCard: () => <div className={calloutItemStyle}>event 5 message</div>,
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
    undefined,
    beforeAll,
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
      expect(firstLegend).toHaveAttribute('tabIndex', '0');
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
      expect(firstLegend).toHaveAttribute('tabIndex', '0');
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
      fireEvent.click(legends[3]!);
      expect(legends[4]).toBeDefined();
      fireEvent.click(legends[4]!);
      const legendsAfterClick = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      // Assert
      expect(legendsAfterClick[0]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClick[1]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClick[2]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClick[3]).toHaveAttribute('aria-selected', 'true');
      expect(legendsAfterClick[4]).toHaveAttribute('aria-selected', 'true');
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
    undefined,
    beforeAll,
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
    undefined,
    beforeAll,
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
    beforeAll,
  );

  testWithWait(
    'Should show rotated x-axis labels',
    LineChart,
    { data: dateChartPoints, rotateXAxisLables: true },
    container => {
      // Assert
      expect(getByClass(container, /tick/i)[0].getAttribute('transform')).toContain('translate(40.5,0)');
    },
    undefined,
    beforeAll,
  );
});

describe.skip('Line chart - Subcomponent Event', () => {
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
    beforeAll,
  );
});

describe('Screen resolution', () => {
  const originalInnerWidth = global.innerWidth;
  const originalInnerHeight = global.innerHeight;
  afterEach(() => {
    global.innerWidth = originalInnerWidth;
    global.innerHeight = originalInnerHeight;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });
  });

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

test('Should reflect theme change', () => {
  // Arrange
  const { container } = render(
    <ThemeProvider theme={DarkTheme}>
      <LineChart culture={window.navigator.language} data={basicChartPoints} />
    </ThemeProvider>,
  );
  // Assert
  expect(container).toMatchSnapshot();
});

test('Should pass accessibility tests', async () => {
  const { container } = render(<LineChart data={basicChartPoints} />);
  const axeResults = await axe(container);
  expect(axeResults).toHaveNoViolations();
}, 10000);

import { validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';
import { LineChartBehaviorDefinition } from './LineChartBehaviorDefinition.js/LineChartBehaviorDefinition';

describe('meets accessibility requirements', () => {
  const testFacade = new ComponentTestFacade(LineChart, { data: { basicChartPoints } });
  const errors = validateBehavior(LineChartBehaviorDefinition, testFacade);
  expect(errors).toEqual([]);
});
