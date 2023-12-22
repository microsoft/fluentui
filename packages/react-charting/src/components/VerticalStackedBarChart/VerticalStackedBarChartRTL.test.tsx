import { render, screen, fireEvent, act } from '@testing-library/react';
import { chartPoints } from './VerticalStackedBarChart.test';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IVSChartDataPoint } from '../../index';
import { VerticalStackedBarChart } from './VerticalStackedBarChart';
import { getByClass, getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { VerticalStackedBarChartBase } from './VerticalStackedBarChart.base';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const firstChartPoints: IVSChartDataPoint[] = [
  { legend: 'Metadata1', data: 2, color: DefaultPalette.blue },
  { legend: 'Metadata2', data: 0.5, color: DefaultPalette.blueMid },
  { legend: 'Metadata3', data: 0, color: DefaultPalette.blueLight },
];

const secondChartPoints: IVSChartDataPoint[] = [
  { legend: 'Metadata1', data: 30, color: DefaultPalette.blue },
  { legend: 'Metadata2', data: 3, color: DefaultPalette.blueMid },
  { legend: 'Metadata3', data: 40, color: DefaultPalette.blueLight },
];

const thirdChartPoints: IVSChartDataPoint[] = [
  { legend: 'Metadata1', data: 10, color: DefaultPalette.blue },
  { legend: 'Metadata2', data: 60, color: DefaultPalette.blueMid },
  { legend: 'Metadata3', data: 30, color: DefaultPalette.blueLight },
];

const simplePoints = [
  {
    chartData: firstChartPoints,
    xAxisPoint: 'January',
    lineData: [{ y: 42, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
  {
    chartData: secondChartPoints,
    xAxisPoint: 'February',
    lineData: [{ y: 41, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
  {
    chartData: thirdChartPoints,
    xAxisPoint: 'March',
    lineData: [{ y: 100, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
];

const simplePointsWithLine = [
  {
    chartData: firstChartPoints,
    xAxisPoint: 20,
    lineData: [{ y: 42, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
];

const simpleChartPoints: IVSChartDataPoint[] = [
  { legend: 'Metadata1', data: 2, color: DefaultPalette.blue },
  { legend: 'Metadata2', data: 0.5, color: DefaultPalette.blueMid },
];

const simplePointsWithoutLine = [
  {
    chartData: simpleChartPoints,
    xAxisPoint: 20,
  },
];

const maxBarGap = 5;

describe('Vertical stacked bar chart rendering', () => {
  testWithoutWait(
    'Should render the vertical stacked bar chart with numeric x-axis data',
    VerticalStackedBarChart,
    { data: chartPoints },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Vertical stacked bar chart - Subcomponent Line', () => {
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
    { data: simplePointsWithLine, barWidth: 100 },
    container => {
      // Assert
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(2);
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
      expect(bars[0].getAttribute('fill')).toEqual(DefaultPalette.blue);
      expect(bars[1].getAttribute('fill')).toEqual(DefaultPalette.blueMid);
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
      expect(bars[0]).toHaveStyle('opacity: 0.1');
      expect(bars[1]).toHaveStyle('opacity: 0.1');
      expect(bars[2]).toHaveStyle('opacity: 0.1');
      expect(bars[3]).toHaveStyle('opacity: 0.1');
      expect(bars[4]).toHaveStyle('opacity: 0.1');
      expect(bars[5]).toHaveStyle('opacity: 0.1');
      expect(bars[6]).toHaveStyle('opacity: 0.1');
      expect(bars[7]).toHaveStyle('opacity: 0.1');
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
      expect(bars[1]).not.toHaveAttribute('opacity');
      expect(bars[1]).toHaveStyle('opacity: 0.1');
      expect(bars[3]).toHaveStyle('opacity: 0.1');
      expect(bars[4]).toHaveStyle('opacity: 0.1');
      expect(bars[6]).toHaveStyle('opacity: 0.1');
      expect(bars[7]).toHaveStyle('opacity: 0.1');
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
});

describe('Vertical stacked bar chart - Subcomponent callout', () => {
  testWithWait(
    'Should call the handler on mouse over bar and on mouse leave from bar',
    VerticalStackedBarChart,
    { data: simplePoints, calloutProps: { doNotLayer: true } },
    container => {
      // eslint-disable-next-line
      const handleMouseOver = jest.spyOn(VerticalStackedBarChartBase.prototype as any, '_onStackHover');
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(bars).toHaveLength(8);
      fireEvent.mouseOver(bars[0]);
      expect(handleMouseOver).toHaveBeenCalled();
    },
  );

  testWithWait(
    'Should show the callout over the bar on mouse over',
    VerticalStackedBarChart,
    { data: simplePoints, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.mouseOver(bars[2]);
      // Assert
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
      expect(getByClass(container, /calloutlegendText/i)).toBeDefined();
      expect(getByClass(container, /calloutlegendText/i)).toHaveLength(4);
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
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );

  testWithWait(
    'Should show the custom callout over the bar on mouse over',
    VerticalStackedBarChart,
    {
      data: simplePoints,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: IVSChartDataPoint) =>
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
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(screen.queryByText('Custom Callout Content')).toBeDefined();
    },
  );

  testWithWait(
    'Should show the custom callout over the line on mouse over',
    VerticalStackedBarChart,
    {
      data: simplePoints,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: IVSChartDataPoint) =>
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
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(screen.queryByText('Custom Callout Content')).toBeDefined();
    },
  );

  testWithWait(
    'Should call the handler on mouse click on the bar',
    VerticalStackedBarChart,
    { data: simplePoints, calloutProps: { doNotLayer: true } },
    container => {
      // eslint-disable-next-line
      const handleMouseclick = jest.spyOn(VerticalStackedBarChartBase.prototype as any, '_onClick');
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(bars).toHaveLength(8);
      fireEvent.click(bars[0]);
      expect(handleMouseclick).toHaveBeenCalled();
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

describe('Vertical stacked bar chart - Theme', () => {
  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <ThemeProvider theme={DarkTheme}>
        <VerticalStackedBarChart culture={window.navigator.language} data={chartPoints} />
      </ThemeProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Vertical Stacked Bar Chart - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<VerticalStackedBarChart data={chartPoints} />);
    const axeResults = await axe(container);
    expect(axeResults).toHaveNoViolations();
  }, 10000);
});
