/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VerticalBarChart } from './VerticalBarChart';
import { FluentProvider } from '@fluentui/react-provider';
import {
  forEachTimezone,
  getByClass,
  getById,
  isTimezoneSet,
  testScreenResolutionChanges,
  testWithWait,
  testWithoutWait,
} from '../../utilities/TestUtility.test';
import { VerticalBarChartProps } from './VerticalBarChart.types';
import { VerticalBarChartDataPoint } from '../../index';
import { allNegativeChartPointsVBC, chartPointsVBC, negativeChartPointsVBC } from '../../utilities/test-data';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as renderer from 'react-test-renderer';
const { Timezone } = require('../../../scripts/constants');
const env = require('../../../config/tests');

expect.extend(toHaveNoViolations);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

beforeAll(() => {
  // https://github.com/jsdom/jsdom/issues/3368
  global.ResizeObserver = class ResizeObserver {
    public observe() {
      // do nothing
    }
    public unobserve() {
      // do nothing
    }
    public disconnect() {
      // do nothing
    }
  };
});

const originalRAF = window.requestAnimationFrame;

function sharedBeforeEach() {
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
}
function sharedAfterEach() {
  jest.useRealTimers();
  window.requestAnimationFrame = originalRAF;
}

const pointsWithLine = [
  {
    x: 0,
    y: 10000,
    legend: 'Oranges',
    color: '#0078d4',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
    lineData: {
      y: 7000,
      yAxisCalloutData: '34%',
    },
  },
  {
    x: 10000,
    y: 50000,
    legend: 'Dogs',
    color: '#002050',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
    lineData: {
      y: 30000,
    },
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: '#00188f',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '37%',
    lineData: {
      y: 3000,
      yAxisCalloutData: '43%',
    },
  },
  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: '#00bcf2',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '88%',
  },
  {
    x: 52000,
    y: 43000,
    legend: 'Giraffes',
    color: '#0078d4',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '71%',
    lineData: {
      y: 30000,
    },
  },
  {
    x: 68000,
    y: 30000,
    legend: 'Cats',
    color: '#002050',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
    lineData: {
      y: 5000,
    },
  },
  {
    x: 80000,
    y: 20000,
    legend: 'Elephants',
    color: '#0078d4',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '87%',
    lineData: {
      y: 16000,
    },
  },
  {
    x: 92000,
    y: 45000,
    legend: 'Monkeys',
    color: '#00bcf2',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '33%',
    lineData: {
      y: 40000,
      yAxisCalloutData: '45%',
    },
  },
];

const datePointsWithLine = [
  {
    x: new Date('2018/01/01'),
    y: 10000,
    legend: 'Oranges',
    color: '#0078d4',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
    lineData: {
      y: 7000,
      yAxisCalloutData: '34%',
    },
  },
  {
    x: new Date('2018/03/01'),
    y: 50000,
    legend: 'Dogs',
    color: '#002050',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
    lineData: {
      y: 30000,
    },
  },
  {
    x: new Date('2018/05/01'),
    y: 30000,
    legend: 'Apples',
    color: '#00188f',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '37%',
    lineData: {
      y: 3000,
      yAxisCalloutData: '43%',
    },
  },
  {
    x: new Date('2018/07/01'),
    y: 13000,
    legend: 'Bananas',
    color: '#00bcf2',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '88%',
  },
  {
    x: new Date('2018/09/01'),
    y: 43000,
    legend: 'Giraffes',
    color: '#0078d4',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '71%',
    lineData: {
      y: 30000,
    },
  },
  {
    x: new Date('2018/11/01'),
    y: 30000,
    legend: 'Cats',
    color: '#002050',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
    lineData: {
      y: 5000,
    },
  },
  {
    x: new Date('2019/02/01'),
    y: 20000,
    legend: 'Elephants',
    color: '#0078d4',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '87%',
    lineData: {
      y: 16000,
    },
  },
  {
    x: new Date('2019/04/01'),
    y: 45000,
    legend: 'Monkeys',
    color: '#00bcf2',
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '33%',
    lineData: {
      y: 40000,
      yAxisCalloutData: '45%',
    },
  },
];

const simplePoints = [
  {
    x: 'This is a medium long label. ',
    y: 3500,
    color: '#627CEF',
  },
  {
    x: 'This is a long label This is a long label',
    y: 2500,
    color: '#C19C00',
  },
  {
    x: 'This label is as long as the previous one',
    y: 1900,
    color: '#E650AF',
  },
  {
    x: 'A short label',
    y: 2800,
    color: '#0E7878',
  },
];

const simpleDatePoints = [
  {
    x: new Date('2019/02/01'),
    y: 3500,
    color: '#627CEF',
  },
  {
    x: new Date('2019/05/01'),
    y: 2500,
    color: '#C19C00',
  },
  {
    x: new Date('2019/08/01'),
    y: 1900,
    color: '#E650AF',
  },
];

const secondaryYScalePoints = [{ yMaxValue: 50000, yMinValue: 10000 }];

describe('Vertical bar chart rendering', () => {
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should render the vertical bar chart with numeric x-axis data',
    VerticalBarChart,
    { data: chartPointsVBC },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render the vertical bar chart with string x-axis data',
    VerticalBarChart,
    { data: simplePoints },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  forEachTimezone((tzName, tzIdentifier) => {
    testWithoutWait(
      `Should render the vertical bar chart with Date x-axis data in ${tzName} timezone`,
      VerticalBarChart,
      { data: simpleDatePoints },
      container => {
        // Assert
        expect(container).toMatchSnapshot();
      },
      undefined,
      undefined,
      !(isTimezoneSet(tzIdentifier) && env === 'TEST'),
    );
  });

  testWithoutWait(
    'Should render the vertical bar chart with formatted Date x-axis data',
    VerticalBarChart,
    {
      data: datePointsWithLine,
      tickFormat: '%m/%d',
      tickValues: [new Date('01-01-2018'), new Date('01-03-2018'), new Date('01-05-2018')],
    },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
    undefined,
    undefined,
    !(isTimezoneSet(Timezone.UTC) && env === 'TEST'),
  );

  testWithoutWait(
    'Should render the vertical bar chart with Date x-axis data when tick Values not given',
    VerticalBarChart,
    {
      data: datePointsWithLine,
      tickFormat: '%m/%d',
    },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
    undefined,
    undefined,
    !(isTimezoneSet(Timezone.UTC) && env === 'TEST'),
  );

  testWithoutWait(
    'Should render the vertical bar chart with Date x-axis data when tick format not given',
    VerticalBarChart,
    {
      data: datePointsWithLine,
      tickValues: [new Date('01-01-2018'), new Date('01-03-2018'), new Date('01-05-2018')],
    },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
    undefined,
    undefined,
    !(isTimezoneSet(Timezone.UTC) && env === 'TEST'),
  );

  testWithoutWait(
    'Should render the vertical bar chart with Date x-axis data when tick values and tick format not given',
    VerticalBarChart,
    {
      data: datePointsWithLine,
    },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
    undefined,
    undefined,
    !(isTimezoneSet(Timezone.UTC) && env === 'TEST'),
  );

  testWithoutWait(
    'Should render the vertical bar chart with secondary Y axis',
    VerticalBarChart,
    { data: chartPointsVBC, secondaryYScaleOptions: secondaryYScalePoints },
    container => {
      // Assert
      expect(getById(container, /yAxisGElementSecondarychart_/i)).toBeDefined();
    },
  );

  testWithoutWait(
    'Should render the vertical bar chart with all negative y value bars correctly',
    VerticalBarChart,
    { data: allNegativeChartPointsVBC },
    container => {
      //Asset
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'should render the vertical bar chart with some positive and some negative y value bars correctly',
    VerticalBarChart,
    { data: negativeChartPointsVBC },
    container => {
      //Asset
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Vertical bar chart - Subcomponent bar', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  testWithWait(
    'Should render the bar with the given width',
    VerticalBarChart,
    { data: chartPointsVBC, barWidth: 100, maxBarWidth: 200 },
    container => {
      // Assert
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(3);
      expect(bars[0].getAttribute('width')).toEqual('100');
      expect(bars[1].getAttribute('width')).toEqual('100');
      expect(bars[2].getAttribute('width')).toEqual('100');
    },
  );

  test('Should render the bar with the given xAxisInnerPadding and check x attribute differences', async () => {
    // Arrange
    const { container, rerender } = render(
      <VerticalBarChart data={simplePoints} xAxisInnerPadding={0.5} xAxisOuterPadding={0.5} />,
    );

    // Act
    const bars = container.querySelectorAll('rect');
    const x1Iteration1 = parseFloat(bars[0].getAttribute('x') || '0');
    const x2Iteration1 = parseFloat(bars[1].getAttribute('x') || '0');
    const iteration1Diff = x2Iteration1 - x1Iteration1;

    // Re-render with different xAxisInnerPadding
    rerender(<VerticalBarChart data={simplePoints} xAxisInnerPadding={0.75} xAxisOuterPadding={0.5} />);
    const barsUpdated = container.querySelectorAll('rect');
    const x1Iteration2 = parseFloat(barsUpdated[0].getAttribute('x') || '0');
    const x2Iteration2 = parseFloat(barsUpdated[1].getAttribute('x') || '0');
    const iteration2Diff = x2Iteration2 - x1Iteration2;

    // Assert
    expect(iteration1Diff).toBeLessThan(iteration2Diff);
  });

  testWithWait(
    'Should render the bar with the given width with Date X-Axis',
    VerticalBarChart,
    {
      data: simpleDatePoints,
      barWidth: 10,
    },
    async container => {
      // Assert
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(3);
      expect(bars[0].getAttribute('width')).toEqual('10');
      expect(bars[1].getAttribute('width')).toEqual('10');
      expect(bars[2].getAttribute('width')).toEqual('10');
    },
  );

  testWithWait(
    'Should render the bars with the specified colors',
    VerticalBarChart,
    { data: chartPointsVBC },
    container => {
      // colors mentioned in the data points itself
      // Assert
      const bars = getById(container, /_VBC_bar/i);
      expect(bars[0].getAttribute('fill')).toEqual('aqua');
      expect(bars[1].getAttribute('fill')).toEqual('blue');
      expect(bars[2].getAttribute('fill')).toEqual('navy');
    },
  );

  testWithWait(
    'Should render the bars with the a single color',
    VerticalBarChart,
    { data: chartPointsVBC, useSingleColor: true },
    container => {
      // Assert
      const bars = getById(container, /_VBC_bar/i);
      expect(bars[0].getAttribute('fill')).toEqual('var(--colorPaletteBlueBackground2)');
      expect(bars[1].getAttribute('fill')).toEqual('var(--colorPaletteBlueBackground2)');
      expect(bars[2].getAttribute('fill')).toEqual('var(--colorPaletteBlueBackground2)');
    },
  );

  testWithWait(
    'Should render the bars with labels hidden',
    VerticalBarChart,
    { data: chartPointsVBC, hideLabels: true },
    container => {
      // Assert
      expect(getByClass(container, /barLabel/i)).toHaveLength(0);
    },
  );
});

describe('Vertical bar chart - Subcomponent line', () => {
  afterEach(sharedAfterEach);

  testWithoutWait('Should render line along with bars', VerticalBarChart, { data: pointsWithLine }, container => {
    const line = getById(container, /_VBC_line/i);
    const points = getById(container, /_VBC_point/i);
    // Assert
    expect(line).toHaveLength(1);
    expect(points).toHaveLength(7);
  });
  testWithoutWait(
    'Should highlight the data points and not render the corresponding callout',
    VerticalBarChart,
    { data: pointsWithLine },
    container => {
      const firstPointonLine = getById(container, /_VBC_point/i)[0];
      expect(firstPointonLine).toBeDefined();
      fireEvent.mouseOver(firstPointonLine);
      // Assert
      expect(firstPointonLine.getAttribute('visibility')).toEqual('visibility');
      expect(getById(container, /toolTipcallout/i)).toHaveLength(0);
    },
  );

  testWithoutWait(
    'Should render line along with bars using Date X-Axis',
    VerticalBarChart,
    { data: datePointsWithLine },
    container => {
      const line = getById(container, /_VBC_line/i);
      const points = getById(container, /_VBC_point/i);
      // Assert
      expect(line).toHaveLength(1);
      expect(points).toHaveLength(7);
    },
  );
  testWithoutWait(
    'Should highlight the data points and not render the corresponding callout using Date X-Axis',
    VerticalBarChart,
    { data: datePointsWithLine },
    container => {
      const firstPointonLine = getById(container, /_VBC_point/i)[0];
      expect(firstPointonLine).toBeDefined();
      fireEvent.mouseOver(firstPointonLine);
      // Assert
      expect(firstPointonLine.getAttribute('visibility')).toEqual('visibility');
      expect(getById(container, /toolTipcallout/i)).toHaveLength(0);
    },
  );
});

describe('Vertical bar chart - Subcomponent Legends', () => {
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should not show any rendered legends when hideLegend is true',
    VerticalBarChart,
    { data: pointsWithLine, hideLegend: true },
    container => {
      // Legends have 'rect' as a part of their classname
      expect(getByClass(container, /rect/i)).toHaveLength(0);
    },
  );
  testWithWait(
    'Should reduce the opacity of the other bars/lines and their legends on mouse over a line legend',
    VerticalBarChart,
    { data: pointsWithLine, lineLegendText: 'just line' },
    container => {
      const bars = getById(container, /_VBC_bar/i);
      const line = getById(container, /_VBC_line/i)[0];
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(line).toBeDefined();
      expect(bars).toHaveLength(8);
      expect(legends).toHaveLength(9);
      fireEvent.mouseOver(screen.getByText('just line'));
      expect(line.getAttribute('opacity')).toEqual('1');
      expect(screen.getByText('Oranges')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Dogs')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Apples')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Bananas')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Giraffes')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Cats')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Elephants')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Monkeys')).toHaveStyle('opacity: 0.67');
      expect(line).toBeDefined();
      expect(bars[0]).toBeDefined();
      expect(bars[0]).toHaveAttribute('opacity', '0.1');
      expect(bars[1]).toBeDefined();
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toBeDefined();
      expect(bars[2]).toHaveAttribute('opacity', '0.1');
      expect(bars[3]).toBeDefined();
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toBeDefined();
      expect(bars[4]).toHaveAttribute('opacity', '0.1');
      expect(bars[5]).toBeDefined();
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
      expect(bars[6]).toBeDefined();
      expect(bars[6]).toHaveAttribute('opacity', '0.1');
      expect(bars[7]).toBeDefined();
      expect(bars[7]).toHaveAttribute('opacity', '0.1');
    },
  );
  testWithWait(
    'Should reduce the opacity of the other bars/lines and their legends on mouse over a bar legend',
    VerticalBarChart,
    { data: pointsWithLine, lineLegendText: 'just line' },
    container => {
      const bars = getById(container, /_VBC_bar/i);
      const line = getById(container, /_VBC_line/i);
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(line).toBeDefined();
      expect(bars).toHaveLength(8);
      expect(legends).toHaveLength(9);
      fireEvent.mouseOver(screen.getByText('Oranges'));
      expect(screen.getByText('just line')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Dogs')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Apples')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Bananas')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Giraffes')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Cats')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Elephants')).toHaveStyle('opacity: 0.67');
      expect(screen.getByText('Monkeys')).toHaveStyle('opacity: 0.67');
      expect(line).toBeDefined();
      expect(bars[1]).toBeDefined();
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toBeDefined();
      expect(bars[2]).toHaveAttribute('opacity', '0.1');
      expect(bars[3]).toBeDefined();
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toBeDefined();
      expect(bars[4]).toHaveAttribute('opacity', '0.1');
      expect(bars[5]).toBeDefined();
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
      expect(bars[6]).toBeDefined();
      expect(bars[6]).toHaveAttribute('opacity', '0.1');
      expect(bars[7]).toBeDefined();
      expect(bars[7]).toHaveAttribute('opacity', '0.1');
    },
  );
});

describe('Vertical bar chart - Subcomponent callout', () => {
  afterEach(sharedAfterEach);

  test('Should call the handler on mouse over bar and on mouse leave from bar', async () => {
    // Arrange
    const { container } = render(<VerticalBarChart data={pointsWithLine} />);
    await waitFor(() => {
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(8);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    });
  });

  testWithWait(
    'Should show the callout over the bar on mouse over',
    VerticalBarChart,
    { data: pointsWithLine, calloutProps: { doNotLayer: true } },
    container => {
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(8);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );

  testWithWait(
    'Should show the callout over the line on mouse over',
    VerticalBarChart,
    { data: pointsWithLine, calloutProps: { doNotLayer: true } },
    container => {
      const line = getById(container, /_VBC_line/i)[0];
      expect(line).toBeDefined();
      fireEvent.mouseOver(line);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );

  testWithWait(
    'Should show the custom callout over the bar on mouse over',
    VerticalBarChart,
    {
      data: pointsWithLine,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: VerticalBarChartProps) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(8);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(screen.queryByText('Custom Callout Content')).toBeDefined();
    },
  );

  testWithWait(
    'Should not show the custom callout over the line on mouse over',
    VerticalBarChart,
    {
      data: pointsWithLine,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: VerticalBarChartProps) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      const line = getById(container, /_VBC_line/i)[0];
      expect(line).toBeDefined();
      fireEvent.mouseOver(line);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(screen.queryByText('Custom Callout Content')).toBeNull();
    },
  );
});

describe('Vertical bar chart - Subcomponent xAxis Labels', () => {
  afterEach(sharedAfterEach);

  testWithWait(
    'Should show the x-axis labels tooltip when hovered',
    VerticalBarChart,
    { data: pointsWithLine, showXAxisLablesTooltip: true },
    container => {
      expect(getById(container, /showDots/i)).toHaveLength(10);
      expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('10,0...');
    },
  );

  testWithWait(
    'Should show rotated x-axis labels',
    VerticalBarChart,
    { data: simplePoints, rotateXAxisLables: true },
    container => {
      // Arrange
      expect(getByClass(container, /tick/i)[0].getAttribute('transform')).toContain('rotate(-45)');
    },
  );
});

describe('Screen resolution', () => {
  afterEach(sharedAfterEach);

  testScreenResolutionChanges(() => {
    const { container } = render(<VerticalBarChart data={chartPointsVBC} width={300} height={300} />);
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Theme Change', () => {
  afterEach(sharedAfterEach);
  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <FluentProvider theme={{ colorNeutralBackground1: '#ccc' }}>
        <VerticalBarChart culture={window.navigator.language} data={chartPointsVBC} />
      </FluentProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Vertical bar chart re-rendering', () => {
  afterEach(sharedAfterEach);

  test('Should re-render the vertical bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<VerticalBarChart data={[]} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_VBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<VerticalBarChart data={chartPointsVBC} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_VBC_empty/i)).toHaveLength(0);
    });
  });
});

describe('VerticalBarChart - mouse events', () => {
  afterEach(sharedAfterEach);

  testWithWait(
    'Should render callout correctly on mouseover',
    VerticalBarChart,
    { data: chartPointsVBC, calloutProps: { doNotLayer: true }, enabledLegendsWrapLines: true },
    container => {
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(3);
      fireEvent.mouseOver(bars[1]);
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should render customized callout on mouseover',
    VerticalBarChart,
    {
      data: chartPointsVBC,
      calloutProps: { doNotLayer: true },
      enabledLegendsWrapLines: true,
      onRenderCalloutPerDataPoint: (props: VerticalBarChartDataPoint) =>
        props ? (
          <div>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </div>
        ) : null,
    },
    container => {
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(3);
      fireEvent.mouseOver(bars[1]);
      expect(container).toMatchSnapshot();
    },
  );
});

describe('VerticalBarChart - accessibility', () => {
  afterEach(sharedAfterEach);

  test('Should pass accessibility tests', async () => {
    const { container } = render(<VerticalBarChart data={chartPointsVBC} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});

/* eslint-disable @typescript-eslint/no-deprecated */
describe('VerticalBarChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('renders VerticalBarChart correctly', () => {
    let component = renderer.create(<VerticalBarChart data={chartPointsVBC} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    let component = renderer.create(<VerticalBarChart data={chartPointsVBC} hideLegend={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    let component = renderer.create(<VerticalBarChart data={chartPointsVBC} hideTooltip={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    let component = renderer.create(<VerticalBarChart data={chartPointsVBC} enabledLegendsWrapLines={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    let component = renderer.create(<VerticalBarChart data={chartPointsVBC} showXAxisLablesTooltip={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    let component = renderer.create(<VerticalBarChart data={chartPointsVBC} wrapXAxisLables={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    let component = renderer.create(<VerticalBarChart data={chartPointsVBC} yAxisTickFormat={'/%d'} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should not render bar labels', () => {
    let component = renderer.create(<VerticalBarChart data={chartPointsVBC} hideLabels={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render gradients on bars', () => {
    let component = renderer.create(<VerticalBarChart data={chartPointsVBC} enableGradient={false} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render rounded corners on bars', () => {
    let component = renderer.create(<VerticalBarChart data={chartPointsVBC} roundCorners={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
/* eslint-enable @typescript-eslint/no-deprecated */

describe('VerticalBarChart - basic props', () => {
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    let wrapper = render(<VerticalBarChart data={chartPointsVBC} hideLegend={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    let wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    let wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    let wrapper = render(<VerticalBarChart data={chartPointsVBC} hideTooltip={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    let wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    let wrapper = render(
      <VerticalBarChart
        data={chartPointsVBC}
        onRenderCalloutPerDataPoint={(props: VerticalBarChartDataPoint) =>
          props ? (
            <div className="onRenderCalloutPerDataPoint">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    let wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const props = {
      data: chartPointsVBC,
      height: 300,
      width: 600,
    };
    const { rerender, container } = render(<VerticalBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<VerticalBarChart {...props} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).toBe(htmlBefore);
  });

  it('prop changes', () => {
    const props = {
      data: chartPointsVBC,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const { rerender, container } = render(<VerticalBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<VerticalBarChart {...props} hideLegend={false} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    let wrapper = render(<VerticalBarChart data={chartPointsVBC} enabledLegendsWrapLines />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    let wrapper = render(<VerticalBarChart data={[]} enabledLegendsWrapLines />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});

describe('Render empty chart calling with respective to props', () => {
  it('No prop changes', () => {
    const props = {
      data: chartPointsVBC,
    };
    const { rerender, container } = render(<VerticalBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<VerticalBarChart {...props} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).toBe(htmlBefore);
  });

  it('Prop changes', () => {
    const props: { data: any[]; hideLegend: boolean } = {
      data: chartPointsVBC,
      hideLegend: true,
    };
    const { rerender, container } = render(<VerticalBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<VerticalBarChart {...props} hideLegend={false} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});
