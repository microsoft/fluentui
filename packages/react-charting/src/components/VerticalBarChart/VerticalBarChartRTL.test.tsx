/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { chartPoints } from './VerticalBarChart.test';
import { DefaultPalette } from '@fluentui/react';
import { VerticalBarChart } from './VerticalBarChart';
import { VerticalBarChartBase } from './VerticalBarChart.base';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';
import {
  getByClass,
  getById,
  testScreenResolutionChanges,
  testWithWait,
  testWithoutWait,
} from '../../utilities/TestUtility.test';
import { IVerticalBarChartProps } from './VerticalBarChart.types';
import * as utils from '@fluentui/react/lib/Utilities';

const pointsWithLine = [
  {
    x: 0,
    y: 10000,
    legend: 'Oranges',
    color: DefaultPalette.accent,
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
    color: DefaultPalette.blueDark,
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
    color: DefaultPalette.blueMid,
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
    color: DefaultPalette.blueLight,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '88%',
  },
  {
    x: 52000,
    y: 43000,
    legend: 'Giraffes',
    color: DefaultPalette.blue,
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
    color: DefaultPalette.blueDark,
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
    color: DefaultPalette.blue,
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
    color: DefaultPalette.blueLight,
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

export const stringPoints = [
  {
    x: 'medium',
    y: 3500,
    color: '#627CEF',
  },
  {
    x: 'long',
    y: 2500,
    color: '#C19C00',
  },
];

const stringPointsWithLine = [
  {
    x: '0',
    y: 100,
    legend: 'Oranges',
    color: DefaultPalette.accent,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
    lineData: {
      y: 70,
      yAxisCalloutData: '34%',
      useSecondaryYScale: true,
    },
  },
  {
    x: '100',
    y: 500,
    legend: 'Dogs',
    color: DefaultPalette.blueDark,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
    lineData: {
      y: 300,
    },
  },
];

describe('Vertical bar chart rendering', () => {
  testWithoutWait(
    'Should render the vertical bar chart with numeric x-axis data',
    VerticalBarChart,
    { data: chartPoints },
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

  testWithoutWait(
    'Should render the vertical bar chart with numeric x-axis data - RTL',
    VerticalBarChart,
    { data: chartPoints },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
    () => {
      jest.spyOn(utils, 'getRTL').mockImplementation(() => true);
    },
  );

  testWithWait(
    'Should render the vertical bar chart with secondary y scale options set to true',
    VerticalBarChart,
    { data: chartPoints, secondaryYScaleOptions: true },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should render the vertical bar chart with showXAxisLablesTooltip set to true',
    VerticalBarChart,
    { data: simplePoints, showXAxisLablesTooltip: true, wrapXAxisLables: false },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should render the vertical bar chart with string x-axis data with given container width and bar width',
    VerticalBarChart,
    { data: stringPoints, width: 1000, barWidth: 1 },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Vertical bar chart - Subcomponent bar', () => {
  testWithWait(
    'Should render the bar with the given width',
    VerticalBarChart,
    { data: chartPoints, barWidth: 100 },
    container => {
      // Assert
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(3);
      expect(bars[0].getAttribute('width')).toEqual('100');
      expect(bars[1].getAttribute('width')).toEqual('100');
      expect(bars[2].getAttribute('width')).toEqual('100');
    },
  );

  testWithWait(
    'Should render the bars with the specified colors',
    VerticalBarChart,
    { data: chartPoints },
    container => {
      // colors mentioned in the data points itself
      // Assert
      const bars = getById(container, /_VBC_bar/i);
      expect(bars[0].getAttribute('fill')).toEqual('#0078d4');
      expect(bars[1].getAttribute('fill')).toEqual('#002050');
      expect(bars[2].getAttribute('fill')).toEqual('#00188f');
    },
  );

  testWithWait(
    'Should render the bars with the a single color',
    VerticalBarChart,
    { data: chartPoints, useSingleColor: true },
    container => {
      // Assert
      const bars = getById(container, /_VBC_bar/i);
      expect(bars[0].getAttribute('fill')).toEqual('#00bcf2');
      expect(bars[1].getAttribute('fill')).toEqual('#00bcf2');
      expect(bars[2].getAttribute('fill')).toEqual('#00bcf2');
    },
  );

  testWithWait(
    'Should render the bars with labels hidden',
    VerticalBarChart,
    { data: chartPoints, hideLabels: true },
    container => {
      // Assert
      expect(getByClass(container, /barLabel/i)).toHaveLength(0);
    },
  );

  test('Should call the handler on mouse over bar', async () => {
    // Arrange
    const handleMouseOver = jest.spyOn(VerticalBarChartBase.prototype as any, '_onBarHover');
    const { container } = render(<VerticalBarChart data={pointsWithLine} />);
    await waitFor(() => {
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(8);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(handleMouseOver).toHaveBeenCalled();
    });
  });

  test('Should call the handler on mouse focus on bar', async () => {
    // Arrange
    const handleMouseFocus = jest.spyOn(VerticalBarChartBase.prototype as any, '_onBarFocus');
    const { container } = render(<VerticalBarChart data={pointsWithLine} />);
    await waitFor(() => {
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(8);
      fireEvent.focus(bars[0]);
      // Assert
      expect(handleMouseFocus).toHaveBeenCalled();
    });
  });
});

describe('Vertical bar chart - Subcomponent line', () => {
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
    'Should render line along with bars with line border',
    VerticalBarChart,
    { data: pointsWithLine, lineOptions: { lineBorderWidth: '2' } },
    container => {
      const line = getById(container, /_VBC_line/i);
      const points = getById(container, /_VBC_point/i);
      // Assert
      expect(line).toHaveLength(2);
      expect(points).toHaveLength(7);
    },
  );

  testWithoutWait(
    'Should render line along with bars with string data',
    VerticalBarChart,
    { data: stringPointsWithLine, secondaryYScaleOptions: true },
    container => {
      const line = getById(container, /_VBC_line/i);
      const points = getById(container, /_VBC_point/i);
      // Assert
      expect(line).toHaveLength(1);
      expect(points).toHaveLength(2);
    },
  );
});

describe('Vertical bar chart - Subcomponent Legends', () => {
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
      expect(bars[0]).toHaveStyle('opacity: 0.1');
      expect(bars[1]).toBeDefined();
      expect(bars[1]).toHaveStyle('opacity: 0.1');
      expect(bars[2]).toBeDefined();
      expect(bars[2]).toHaveStyle('opacity: 0.1');
      expect(bars[3]).toBeDefined();
      expect(bars[3]).toHaveStyle('opacity: 0.1');
      expect(bars[4]).toBeDefined();
      expect(bars[4]).toHaveStyle('opacity: 0.1');
      expect(bars[5]).toBeDefined();
      expect(bars[5]).toHaveStyle('opacity: 0.1');
      expect(bars[6]).toBeDefined();
      expect(bars[6]).toHaveStyle('opacity: 0.1');
      expect(bars[7]).toBeDefined();
      expect(bars[7]).toHaveStyle('opacity: 0.1');
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
      expect(bars[1]).toHaveStyle('opacity: 0.1');
      expect(bars[2]).toBeDefined();
      expect(bars[2]).toHaveStyle('opacity: 0.1');
      expect(bars[3]).toBeDefined();
      expect(bars[3]).toHaveStyle('opacity: 0.1');
      expect(bars[4]).toBeDefined();
      expect(bars[4]).toHaveStyle('opacity: 0.1');
      expect(bars[5]).toBeDefined();
      expect(bars[5]).toHaveStyle('opacity: 0.1');
      expect(bars[6]).toBeDefined();
      expect(bars[6]).toHaveStyle('opacity: 0.1');
      expect(bars[7]).toBeDefined();
      expect(bars[7]).toHaveStyle('opacity: 0.1');
    },
  );
  test('Should call the handler on mouse click from legend', async () => {
    // Arrange
    const handleMouseClick = jest.spyOn(VerticalBarChartBase.prototype as any, '_onLegendClick');
    render(<VerticalBarChart data={pointsWithLine} calloutProps={{ doNotLayer: true }} />);
    await waitFor(() => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(8);
      fireEvent.click(legends[0]);
      // Assert
      expect(handleMouseClick).toHaveBeenCalled();
    });
  });
  test('Should call the handler on mouse leave from legend', async () => {
    // Arrange
    const handleMouseLeave = jest.spyOn(VerticalBarChartBase.prototype as any, '_onLegendLeave');
    render(<VerticalBarChart data={pointsWithLine} calloutProps={{ doNotLayer: true }} />);
    await waitFor(() => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(8);
      fireEvent.mouseLeave(legends[0]);
      // Assert
      expect(handleMouseLeave).toHaveBeenCalled();
    });
  });
  test('Should call the handler on mouse leave from legend - with lineLegendText and lineLegendColor', async () => {
    // Arrange
    const handleMouseLeave = jest.spyOn(VerticalBarChartBase.prototype as any, '_onLegendLeave');
    render(<VerticalBarChart data={pointsWithLine} lineLegendText="just line" lineLegendColor={DefaultPalette.blue} />);
    await waitFor(() => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(9);
      fireEvent.mouseLeave(legends[0]);
      // Assert
      expect(handleMouseLeave).toHaveBeenCalled();
    });
  });
  test('Should call the handler on mouse click on legend - with lineLegendText and lineLegendColor', async () => {
    // Arrange
    const handleMouseClick = jest.spyOn(VerticalBarChartBase.prototype as any, '_onLegendClick');
    render(<VerticalBarChart data={pointsWithLine} lineLegendText="just line" lineLegendColor={DefaultPalette.blue} />);
    await waitFor(() => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(9);
      fireEvent.click(legends[0]);
      // Assert
      expect(handleMouseClick).toHaveBeenCalled();
    });
  });
});

describe('Vertical bar chart - Subcomponent callout', () => {
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
      onRenderCalloutPerDataPoint: (props: IVerticalBarChartProps) =>
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
      onRenderCalloutPerDataPoint: (props: IVerticalBarChartProps) =>
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

  testWithWait(
    'Should show the callout over the bar on mouse over and no legend is selected',
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
    'Should show the callout over the bar on mouse over and its legend is selected',
    VerticalBarChart,
    { data: pointsWithLine, calloutProps: { doNotLayer: true } },
    container => {
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(8);
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.click(legends[1]);
      fireEvent.mouseOver(bars[1]);
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );

  testWithWait(
    'Should show the custom callout over the bar on mouse over - without line',
    VerticalBarChart,
    {
      data: chartPoints,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: IVerticalBarChartProps) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(3);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(screen.queryByText('Custom Callout Content')).toBeDefined();
    },
  );
});

describe('Vertical bar chart - Subcomponent xAxis Labels', () => {
  testWithWait(
    'Should show the x-axis labels tooltip when hovered',
    VerticalBarChart,
    { data: pointsWithLine, showXAxisLablesTooltip: true },
    container => {
      const bars = getById(container, /_VBC_bar/i);
      expect(bars).toHaveLength(8);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /showDots/i)).toHaveLength(5);
      expect(getById(container, /showDots/i)[0]!.textContent!).toEqual('20,0...');
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
  testScreenResolutionChanges(() => {
    const { container } = render(<VerticalBarChart data={chartPoints} width={300} height={300} />);
    // Assert
    expect(container).toMatchSnapshot();
  });
});

test('Should reflect theme change', () => {
  // Arrange
  const { container } = render(
    <ThemeProvider theme={DarkTheme}>
      <VerticalBarChart culture={window.navigator.language} data={chartPoints} />
    </ThemeProvider>,
  );
  // Assert
  expect(container).toMatchSnapshot();
});

describe('Vertical bar chart re-rendering', () => {
  test('Should re-render the vertical bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<VerticalBarChart data={[]} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_VBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<VerticalBarChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_VBC_empty/i)).toHaveLength(0);
    });
  });
});
