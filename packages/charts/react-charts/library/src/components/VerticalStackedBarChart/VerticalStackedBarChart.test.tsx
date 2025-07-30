import { render, screen, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { VSChartDataPoint, VerticalStackedChartProps } from '../../index';
import { forEachTimezone, getByClass, getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { VerticalStackedBarChart } from './VerticalStackedBarChart';
import { chartPoints2VSBC, chartPointsVSBC } from '../../utilities/test-data';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as renderer from 'react-test-renderer';

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
  Object.defineProperty(window, 'requestAnimationFrame123', {
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

export const emptychartPointsVSBC: VerticalStackedChartProps[] = [{ chartData: [], xAxisPoint: 0 }];

const firstChartPoints: VSChartDataPoint[] = [
  { legend: 'Metadata1', data: 2, color: '#0078d4' },
  { legend: 'Metadata2', data: 0.5, color: '#002050' },
  { legend: 'Metadata3', data: 0, color: '#00188f' },
];

const secondChartPoints: VSChartDataPoint[] = [
  { legend: 'Metadata1', data: 30, color: '#0078d4' },
  { legend: 'Metadata2', data: 3, color: '#002050' },
  { legend: 'Metadata3', data: 40, color: '#00188f' },
];

const thirdChartPoints: VSChartDataPoint[] = [
  { legend: 'Metadata1', data: 10, color: '#0078d4' },
  { legend: 'Metadata2', data: 60, color: '#002050' },
  { legend: 'Metadata3', data: 30, color: '#00188f' },
];

const firstChartNegativePoints: VSChartDataPoint[] = [
  { legend: 'Metadata1', data: -2, color: '0078d4' },
  { legend: 'Metadata2', data: 0.5, color: '#002050' },
  { legend: 'Metadata3', data: 0, color: '#00188f' },
];

const secondChartNegativePoints: VSChartDataPoint[] = [
  { legend: 'Metadata1', data: -30, color: '#0078d4' },
  { legend: 'Metadata2', data: -3, color: '#002050' },
  { legend: 'Metadata3', data: -40, color: '#00188f' },
];

const thirdChartNegativePoints: VSChartDataPoint[] = [
  { legend: 'Metadata1', data: 10, color: '0078d4' },
  { legend: 'Metadata2', data: 60, color: '#002050' },
  { legend: 'Metadata3', data: -30, color: '#00188f' },
];

const simplePoints = [
  {
    chartData: firstChartPoints,
    xAxisPoint: 'January',
    activeLegend: 'Supported Builds',
    lineData: [{ y: 42, legend: 'Supported Builds', color: '#0078d4' }],
  },
  {
    chartData: secondChartPoints,
    xAxisPoint: 'February',
    lineData: [{ y: 41, legend: 'Supported Builds', color: '#0078d4' }],
  },
  {
    chartData: thirdChartPoints,
    xAxisPoint: 'March',
    lineData: [{ y: 100, legend: 'Supported Builds', color: '#0078d4' }],
  },
];

const negativePoints = [
  {
    chartData: firstChartNegativePoints,
    xAxisPoint: 'January',
    activeLegend: 'Supported Builds',
    lineData: [{ y: 42, legend: 'Supported Builds', color: '#0078d4' }],
  },
  {
    chartData: secondChartNegativePoints,
    xAxisPoint: 'February',
    lineData: [{ y: 41, legend: 'Supported Builds', color: '#0078d4' }],
  },
  {
    chartData: thirdChartNegativePoints,
    xAxisPoint: 'March',
    lineData: [{ y: 100, legend: 'Supported Builds', color: '#0078d4' }],
  },
];

const datePoints = [
  {
    chartData: firstChartPoints,
    xAxisPoint: new Date('2019/05/01'),
    lineData: [{ y: 42, legend: 'Supported Builds', color: '#0078d4' }],
  },
  {
    chartData: secondChartPoints,
    xAxisPoint: new Date('2019/09/01'),
    lineData: [{ y: 41, legend: 'Supported Builds', color: '#0078d4' }],
  },
  {
    chartData: thirdChartPoints,
    xAxisPoint: new Date('2020/03/01'),
    lineData: [{ y: 100, legend: 'Supported Builds', color: '#0078d4' }],
  },
];
const simplePointsWithLine = [
  {
    chartData: firstChartPoints,
    xAxisPoint: 0,
    lineData: [{ y: 42, legend: 'Supported Builds', color: '#0078d4' }],
  },
  {
    chartData: secondChartPoints,
    xAxisPoint: 20,
    lineData: [{ y: 33, legend: 'Supported Builds', color: '#0078d4' }],
  },
];

const simpleChartPoints: VSChartDataPoint[] = [
  { legend: 'Metadata1', data: 2, color: '#0078d4' },
  { legend: 'Metadata2', data: 0.5, color: '#00188f' },
];

const simplePointsWithoutLine = [
  {
    chartData: simpleChartPoints,
    xAxisPoint: 20,
  },
];

const maxBarGap = 5;

describe('Vertical stacked bar chart rendering', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should render the vertical stacked bar chart with numeric x-axis data',
    VerticalStackedBarChart,
    { data: chartPointsVSBC },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe.skip('Vertical stacked bar chart rendering with Date x-axis data', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should render the vertical stacked bar chart with Date x-axis data',
    VerticalStackedBarChart,
    {
      data: datePoints,
      timeFormat: '%m/%d',
      tickValues: [new Date('2019/05/01'), new Date('2019/09/01'), new Date('2020/03/01')],
    },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render the vertical stacked bar chart with Date x-axis data and no tick values',
    VerticalStackedBarChart,
    {
      data: datePoints,
      timeFormat: '%m/%d',
    },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render the vertical stacked bar chart with Date x-axis data and no tick format',
    VerticalStackedBarChart,
    {
      data: datePoints,
      tickValues: [new Date('2019/05/01'), new Date('2019/09/01'), new Date('2020/03/01')],
    },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  forEachTimezone(tzName => {
    beforeEach(sharedBeforeEach);
    afterEach(sharedAfterEach);
    testWithoutWait(
      `Should render the vertical stacked bar chart with Date x-axis data in ${tzName} timezone`,
      VerticalStackedBarChart,
      {
        data: datePoints,
      },
      container => {
        // Assert
        expect(container).toMatchSnapshot();
      },
    );
  });

  testWithoutWait(
    'Should render the vertical stacked bar chart with negative points',
    VerticalStackedBarChart,
    { data: negativePoints },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Vertical stacked bar chart - Subcomponent Line', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should render line with the data provided',
    VerticalStackedBarChart,
    { data: simplePoints },
    container => {
      // Assert
      const lines = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'line');
      expect(lines).toBeDefined();
    },
  );
});

describe.skip('Vertical stacked bar chart - Subcomponent bar', () => {
  test('Should render the bar with the given xAxisInnerPadding and check x attribute differences', async () => {
    // Arrange
    const { container, rerender } = render(
      <VerticalStackedBarChart data={simplePoints} xAxisInnerPadding={0.5} xAxisOuterPadding={0.5} />,
    );

    // Act
    const bars = container.querySelectorAll('rect');
    const x1Iteration1 = parseFloat(bars[0].getAttribute('x') || '0');
    const x2Iteration1 = parseFloat(bars[1].getAttribute('x') || '0');
    const iteration1Diff = x2Iteration1 - x1Iteration1;

    // Re-render with different xAxisInnerPadding
    rerender(<VerticalStackedBarChart data={simplePoints} xAxisInnerPadding={0.75} xAxisOuterPadding={0.5} />);
    const barsUpdated = container.querySelectorAll('rect');
    const x1Iteration2 = parseFloat(barsUpdated[0].getAttribute('x') || '0');
    const x2Iteration2 = parseFloat(barsUpdated[1].getAttribute('x') || '0');
    const iteration2Diff = x2Iteration2 - x1Iteration2;

    // Assert
    expect(iteration1Diff).toBeLessThan(iteration2Diff);
  });
});

describe('Vertical stacked bar chart - Subcomponent bar', () => {
  testWithWait(
    'Should set minimum bar height',
    VerticalStackedBarChart,
    { data: simplePoints, barMinimumHeight: 100 },
    container => {
      // Legends have 'rect' as a part of their classname
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(bars[0].getAttribute('height')).toEqual('100');
    },
  );

  testWithWait(
    'Should render the bar with the given width',
    VerticalStackedBarChart,
    { data: simplePointsWithLine, barWidth: 100, maxBarWidth: 200 },
    container => {
      // Assert
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(5);
      expect(bars[0].getAttribute('width')).toEqual('100');
      expect(bars[1].getAttribute('width')).toEqual('100');
    },
  );

  testWithWait(
    'Should render the bar with the given maximum bar gap',
    VerticalStackedBarChart,
    { data: simplePointsWithoutLine, barGapMax: maxBarGap },
    container => {
      // Assert
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(2);
      const firstBarYvalue = Number(bars[1].getAttribute('y'));
      const firstBarHeight = Number(bars[1].getAttribute('height'));
      const secondBarYvalue = Number(bars[0].getAttribute('y'));
      expect(firstBarYvalue! + firstBarHeight + maxBarGap).toEqual(secondBarYvalue!);
    },
  );

  testWithWait(
    'Should render the bar with the given bar corner radius',
    VerticalStackedBarChart,
    { data: simplePointsWithoutLine, barCornerRadius: 6 },
    container => {
      // Assert
      const legend = screen.queryByText('a 6 6');
      expect(legend).toBeDefined();
    },
  );

  testWithWait(
    'Should render the bar with the specified color',
    VerticalStackedBarChart,
    { data: simplePoints },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(bars[0].getAttribute('fill')).toEqual('#0078d4');
      expect(bars[1].getAttribute('fill')).toEqual('#002050');
    },
  );

  testWithWait(
    'Should render the stacked bar with the specified data',
    VerticalStackedBarChart,
    { data: simplePoints },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(bars).toHaveLength(8);
    },
  );
});

describe('Vertical stacked bar chart - Subcomponent Legends', () => {
  testWithoutWait(
    'Should not show any rendered legends when hideLegend is true',
    VerticalStackedBarChart,
    { data: simplePoints, hideLegend: true },
    container => {
      // Assert
      // Legends have 'rect' as a part of their classname
      expect(getByClass(container, /rect/i)).toHaveLength(0);
    },
  );

  testWithWait(
    'Should reduce the opacity of the other bars/lines on mouse over a line legend',
    VerticalStackedBarChart,
    { data: simplePoints },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      const line = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'line');
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.mouseOver(legends[0]);
      // Assert
      expect(line[8].getAttribute('opacity')).toEqual('1');
      expect(bars[0]).toHaveAttribute('opacity', '0.1');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toHaveAttribute('opacity', '0.1');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '0.1');
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
      expect(bars[6]).toHaveAttribute('opacity', '0.1');
      expect(bars[7]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithWait(
    'Should reduce the opacity of the other bars/lines on mouse over a bar legend',
    VerticalStackedBarChart,
    { data: simplePoints },
    container => {
      // Arrange
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      const line = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'line');
      fireEvent.mouseOver(legends![1]);

      // Assert
      expect(line[8].getAttribute('opacity')).toEqual('0.1');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '0.1');
      expect(bars[6]).toHaveAttribute('opacity', '0.1');
      expect(bars[7]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithWait(
    'Should reset the opacity of the lines on mouse leave a bar legend',
    VerticalStackedBarChart,
    { data: simplePoints },
    container => {
      // Arrange
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.mouseOver(legends![1]);
      fireEvent.mouseLeave(legends![1]);
      const line = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'line');
      // Assert
      expect(line[8].getAttribute('opacity')).toEqual('1');
    },
  );

  testWithWait(
    'Should select legend on single mouse click on legends',
    VerticalStackedBarChart,
    { data: simplePoints },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.click(legends![1]);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      // Assert
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'true');
      expect(legendsAfterClickEvent[2]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[3]).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithWait(
    'Should deselect legend on double mouse click on legends',
    VerticalStackedBarChart,
    { data: simplePoints },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.click(legends![1]);
      fireEvent.click(legends![1]);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      // Assert
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[2]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[3]).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithWait(
    'Should select line legend on single mouse click on line legends',
    VerticalStackedBarChart,
    { data: simplePoints },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.click(legends![0]);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      // Assert
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'true');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[2]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[3]).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithoutWait(
    'Should select multiple legends on click',
    VerticalStackedBarChart,
    { data: simplePoints, legendProps: { canSelectMultipleLegends: true }, calloutProps: { doNotLayer: true } },
    container => {
      const firstLegend = screen.queryByText('Metadata1')?.closest('button');
      const secondLegend = screen.queryByText('Metadata2')?.closest('button');
      expect(firstLegend).toBeDefined();
      expect(secondLegend).toBeDefined();
      fireEvent.click(firstLegend!);
      fireEvent.click(secondLegend!);
      //Assert
      expect(firstLegend).toHaveAttribute('aria-selected', 'true');
      expect(secondLegend).toHaveAttribute('aria-selected', 'true');
    },
  );
});

//TODO: Callout not appearing when we mouse over/click on bars, we need to fix this isse
describe.skip('Vertical stacked bar chart - Subcomponent callout', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
    sharedAfterEach();
  });

  testWithWait(
    'Should show the callout over the bar on mouse over',
    VerticalStackedBarChart,
    { data: simplePoints, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.click(bars[2]);
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );

  testWithWait(
    'Should show the stacked callout over the bar on mouse over',
    VerticalStackedBarChart,
    { data: simplePoints, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(8);
      fireEvent.mouseOver(bars[2]);
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should show the callout over the line on mouse over',
    VerticalStackedBarChart,
    { data: simplePoints, calloutProps: { doNotLayer: true } },
    container => {
      const lines = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'line');
      fireEvent.mouseOver(lines[0]);
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should show the custom callout over the bar on mouse over',
    VerticalStackedBarChart,
    {
      data: simplePoints,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: VSChartDataPoint) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should show the custom callout over the line on mouse over',
    VerticalStackedBarChart,
    {
      data: simplePoints,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: VSChartDataPoint) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      const lines = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'line');
      fireEvent.mouseOver(lines[0]);
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Vertical stacked bar chart - Subcomponent xAxis Labels', () => {
  testWithWait(
    'Should show the x-axis labels tooltip when hovered',
    VerticalStackedBarChart,
    { data: simplePoints, showXAxisLablesTooltip: true },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(8);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /showDots/i)).toHaveLength(3);
      expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('Janu...');
    },
  );

  testWithWait(
    'Should show rotated x-axis labels',
    VerticalStackedBarChart,
    { data: simplePoints, rotateXAxisLables: true },
    container => {
      // Assert
      expect(getByClass(container, /tick/i)[0].getAttribute('transform')).toContain('rotate(-45)');
    },
  );
});

describe('Vertical stacked bar chart - Screen resolution', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  testWithWait(
    'Should remain unchanged on zoom in',
    VerticalStackedBarChart,
    { data: simplePoints, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
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
    VerticalStackedBarChart,
    { data: simplePoints, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
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

describe('VerticalStackedBarChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  testWithWait(
    'Should render callout correctly on mouseover',
    VerticalStackedBarChart,
    { data: chartPointsVSBC, calloutProps: { doNotLayer: true }, enabledLegendsWrapLines: true },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(4);
      fireEvent.mouseOver(bars[0]);
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should render callout correctly on mousemove',
    VerticalStackedBarChart,
    { data: chartPointsVSBC, calloutProps: { doNotLayer: true }, enabledLegendsWrapLines: true },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(4);
      fireEvent.mouseMove(bars[2]);
      const html1 = container.innerHTML;
      fireEvent.mouseMove(bars[3]);
      const html2 = container.innerHTML;
      expect(html1).not.toBe(html2);
    },
  );

  testWithWait(
    'Should render customized callout on mouseover',
    VerticalStackedBarChart,
    {
      data: chartPointsVSBC,
      calloutProps: { doNotLayer: true },
      enabledLegendsWrapLines: true,
      onRenderCalloutPerDataPoint: (props: VSChartDataPoint) =>
        props ? (
          <div>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </div>
        ) : null,
    },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(4);
      fireEvent.mouseOver(bars[0]);
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should render customized callout per stack on mouseover',
    VerticalStackedBarChart,
    {
      data: chartPoints2VSBC,
      calloutProps: { doNotLayer: true },
      enabledLegendsWrapLines: true,
      onRenderCalloutPerStack: (props: VerticalStackedChartProps) =>
        props ? (
          <div>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </div>
        ) : null,
    },
    container => {
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(4);
      fireEvent.mouseOver(bars[0]);
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Vertical Stacked Bar Chart - axe-core', () => {
  afterEach(sharedAfterEach);
  test('Should pass accessibility tests', async () => {
    const { container } = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});

/* eslint-disable @typescript-eslint/no-deprecated */
describe('VerticalStackedBarChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders VerticalStackedBarChart correctly', () => {
    let component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    let component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} hideLegend={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    let component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} hideTooltip={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    let component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} enabledLegendsWrapLines={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    let component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} showXAxisLablesTooltip={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    let component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} wrapXAxisLables={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders isCalloutForStack correctly', () => {
    let component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} isCalloutForStack={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    let component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} yAxisTickFormat={'/%d'} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should not render bar labels', () => {
    let component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} hideLabels={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render gradients on bars', () => {
    let component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} enableGradient={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render rounded corners on bars', () => {
    let component = renderer.create(<VerticalStackedBarChart data={chartPointsVSBC} roundCorners={true} />);
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
/* eslint-enable @typescript-eslint/no-deprecated */

describe('VerticalStackedBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    let wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} hideLegend={true} />);
    const hideLegendDOM = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    let wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const hideLegendDOM = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    let wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const hideTooltipDom = wrapper.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    let wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} hideTooltip={true} />);
    const hideTooltipDom = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should render onRenderCalloutPerStack ', () => {
    let wrapper = render(
      <VerticalStackedBarChart
        data={chartPointsVSBC}
        onRenderCalloutPerStack={(props: VerticalStackedChartProps) =>
          props ? (
            <div className="onRenderCalloutPerStack">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );

    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    let wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    let wrapper = render(
      <VerticalStackedBarChart
        data={chartPointsVSBC}
        onRenderCalloutPerDataPoint={(props: VSChartDataPoint) =>
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
    let wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const props = {
      data: chartPointsVSBC,
      height: 300,
      width: 600,
    };
    const { rerender, container } = render(<VerticalStackedBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<VerticalStackedBarChart {...props} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).toBe(htmlBefore);
  });

  it('prop changes', () => {
    const props = {
      data: chartPointsVSBC,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const { rerender, container } = render(<VerticalStackedBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<VerticalStackedBarChart {...props} hideLegend={false} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);
  it('No empty chart aria label div rendered', () => {
    let wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    let wrapper = render(<VerticalStackedBarChart data={emptychartPointsVSBC} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });

  test('should render empty chart div when data array is empty', () => {
    let wrapper = render(<VerticalStackedBarChart data={[]} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});
