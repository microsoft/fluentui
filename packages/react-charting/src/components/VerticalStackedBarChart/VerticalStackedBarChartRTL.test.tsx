import { render, screen, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider, resetIds } from '@fluentui/react';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IVSChartDataPoint, IVerticalStackedChartProps } from '../../index';
import { VerticalStackedBarChart } from './VerticalStackedBarChart';
import {
  forEachTimezone,
  getByClass,
  getById,
  isTimezoneSet,
  testWithWait,
  testWithoutWait,
} from '../../utilities/TestUtility.test';
import { VerticalStackedBarChartBase } from './VerticalStackedBarChart.base';
import * as utils from '@fluentui/react/lib/Utilities';
import { chartPoints2VSBC, chartPointsVSBC } from '../../utilities/test-data';
import { axe, toHaveNoViolations } from 'jest-axe';
const { Timezone } = require('../../../scripts/constants');
const env = require('../../../config/tests');

expect.extend(toHaveNoViolations);

beforeEach(() => {
  resetIds();
});

const originalRAF = window.requestAnimationFrame;

function updateChartWidthAndHeight() {
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
    activeLegend: 'Supported Builds',
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

const datePoints = [
  {
    chartData: firstChartPoints,
    xAxisPoint: new Date('2019/05/01'),
    lineData: [{ y: 42, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
  {
    chartData: secondChartPoints,
    xAxisPoint: new Date('2019/09/01'),
    lineData: [{ y: 41, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
  {
    chartData: thirdChartPoints,
    xAxisPoint: new Date('2020/03/01'),
    lineData: [{ y: 100, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
];
const simplePointsWithLine = [
  {
    chartData: firstChartPoints,
    xAxisPoint: 0,
    lineData: [{ y: 42, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
  },
  {
    chartData: secondChartPoints,
    xAxisPoint: 20,
    lineData: [{ y: 33, legend: 'Supported Builds', color: DefaultPalette.magentaLight }],
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
  beforeEach(updateChartWidthAndHeight);
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
    undefined,
    undefined,
    !(isTimezoneSet(Timezone.UTC) && env === 'TEST'),
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
    undefined,
    undefined,
    !(isTimezoneSet(Timezone.UTC) && env === 'TEST'),
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
    undefined,
    undefined,
    !(isTimezoneSet(Timezone.UTC) && env === 'TEST'),
  );

  forEachTimezone((tzName, tzIdentifier) => {
    beforeEach(updateChartWidthAndHeight);
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
      undefined,
      undefined,
      !(isTimezoneSet(tzIdentifier) && env === 'TEST'),
    );
  });
});

describe('Vertical stacked bar chart - Subcomponent Line', () => {
  beforeEach(updateChartWidthAndHeight);
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

  testWithoutWait(
    'Should render the vertical stacked bar chart with numeric x-axis data - RTL',
    VerticalStackedBarChart,
    { data: simplePoints },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
    () => {
      jest.spyOn(utils, 'getRTL').mockImplementation(() => true);
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

  testWithWait(
    'Should call the handler on mouse leave from bar legend',
    VerticalStackedBarChart,
    { data: simplePoints, calloutProps: { doNotLayer: true } },
    container => {
      // eslint-disable-next-line
      const handleMouseLeave = jest.spyOn(VerticalStackedBarChartBase.prototype as any, '_onLegendLeave');
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.mouseLeave(legends[0]);
      // Assert
      expect(handleMouseLeave).toHaveBeenCalled();
    },
  );

  testWithWait(
    'Should call the handler on mouse over on legend',
    VerticalStackedBarChart,
    { data: simplePointsWithLine, calloutProps: { doNotLayer: true } },
    container => {
      // eslint-disable-next-line
      const handleMouseOver = jest.spyOn(VerticalStackedBarChartBase.prototype as any, '_onLegendHover');
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.mouseOver(legends[0]);
      // Assert
      expect(handleMouseOver).toHaveBeenCalled();
    },
  );

  testWithWait(
    'Should call the handler on mouse click on legend',
    VerticalStackedBarChart,
    { data: simplePointsWithLine, calloutProps: { doNotLayer: true } },
    container => {
      // eslint-disable-next-line
      const handleMouseClick = jest.spyOn(VerticalStackedBarChartBase.prototype as any, '_onLegendClick');
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.click(legends[0]);
      // Assert
      expect(handleMouseClick).toHaveBeenCalled();
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
  beforeEach(updateChartWidthAndHeight);
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

describe('Vertical stacked bar chart - Theme', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <ThemeProvider theme={DarkTheme}>
        <VerticalStackedBarChart culture={window.navigator.language} data={chartPointsVSBC} />
      </ThemeProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('VerticalStackedBarChart - mouse events', () => {
  beforeEach(updateChartWidthAndHeight);
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
      onRenderCalloutPerDataPoint: (props: IVSChartDataPoint) =>
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
      onRenderCalloutPerStack: (props: IVerticalStackedChartProps) =>
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
  test('Should pass accessibility tests', async () => {
    const { container } = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
