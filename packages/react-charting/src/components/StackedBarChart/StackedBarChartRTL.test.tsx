/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { IChartDataPoint, IChartProps, IStackedBarChartProps } from '../../StackedBarChart';
import {
  getByClass,
  getById,
  testScreenResolutionChanges,
  testWithWait,
  testWithoutWait,
} from '../../utilities/TestUtility';
import { StackedBarChart } from './StackedBarChart';
import { DefaultPalette, ThemeProvider } from '@fluentui/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { StackedBarChartBase } from './StackedBarChart.base';
import { DarkTheme } from '@fluentui/theme-samples';

const points: IChartDataPoint[] = [
  {
    legend: 'first',
    data: 300,
    color: DefaultPalette.blue,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
  },
  { legend: 'second', data: 100, color: DefaultPalette.green },
  { legend: 'third', data: -200, color: DefaultPalette.red },
  { legend: 'fourth', data: 400, color: DefaultPalette.orange },
];

const data: IChartProps = {
  chartTitle: 'Stacked Bar chart example',
  chartData: points,
};

const emptyPoints: IChartDataPoint[] = [
  { legend: 'first', color: DefaultPalette.blue },
  { legend: 'second', color: DefaultPalette.green },
  { legend: 'third', color: DefaultPalette.red },
  { legend: 'forth', color: DefaultPalette.orange },
];

const chartTitle = 'Stacked Bar chart example';

const emptyData: IChartProps = {
  chartTitle,
  chartData: emptyPoints,
};

describe('Stacked bar chart rendering', () => {
  testWithoutWait('Should render the stacked bar chart with non-empty data', StackedBarChart, { data }, container => {
    // Assert
    expect(container).toMatchSnapshot();
  });

  testWithoutWait(
    'Should render the stacked bar chart with empty data',
    StackedBarChart,
    { data: emptyData },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Stacked bar chart - Subcomponent bar', () => {
  testWithWait(
    'Should render the stacked bar with the given bar height',
    StackedBarChart,
    { data, ignoreFixStyle: true, barHeight: 5 },
    container => {
      // Assert
      expect(getById(container, /_SBC_bar/i)).toHaveLength(data.chartData!.length);
      expect(getById(container, /_SBC_bar/i)[0].getAttribute('height')).toEqual('5');
    },
  );

  testWithWait(
    'Should render the stacked bar with the given bar height',
    StackedBarChart,
    { data: emptyData, barBackgroundColor: DefaultPalette.red },
    container => {
      // Assert
      expect(getById(container, /_SBC_bar/i)).toHaveLength(0);
      expect(getById(container, /_SBC_empty_bar_/i)).toHaveLength(1);
      expect(getById(container, /_SBC_empty_bar_/i)[0].getAttribute('fill')).toEqual(DefaultPalette.red);
    },
  );
});

describe('Stacked bar chart - Subcomponent benchmark', () => {
  testWithWait(
    'Should render the benchmark triangle',
    StackedBarChart,
    { data, benchmarkData: points[0] },
    container => {
      // Assert
      expect(getByClass(container, /benchmarkContainer/i)).toHaveLength(1);
    },
  );
});

describe('Vertical bar chart - Subcomponent Legends', () => {
  testWithWait('Should show any rendered legends when hideLegend is not set', StackedBarChart, { data }, container => {
    // Arrange
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    // Assert
    expect(legends).toHaveLength(4);
  });

  testWithWait(
    'Should not show any rendered legends when hideLegend is true',
    StackedBarChart,
    { data, hideLegend: true },
    container => {
      // Arrange
      const legends = screen.queryAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      // Assert
      expect(legends).toHaveLength(0);
    },
  );

  testWithWait(
    'Should not show any rendered legends when benchmark data is provided',
    StackedBarChart,
    { data, benchmarkData: points[0] },
    container => {
      // Assert
      // The benchmark legend (first) should also appear making the legend ('first') count to 2
      expect(screen.getAllByText('first')).toHaveLength(2);
    },
  );

  test('Should reduce the opacity of the other bars and their legends on mouse over a bar legend', async () => {
    // Arrange
    const { container } = render(<StackedBarChart data={data} />);
    const bars = getById(container, /_SBC_bar/i);
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    // Assert
    expect(bars).toHaveLength(data.chartData!.length);
    expect(legends).toHaveLength(4);
    // Act
    fireEvent.mouseOver(screen.getByText('second'));
    await waitFor(() => {
      // Assert
      expect(screen.getByText('first')).toHaveStyle('opacity: 0.67');
      expect(getByClass(container, /opacityChangeOnHover/i)).toHaveLength(4);
      expect(getByClass(container, /opacityChangeOnHover/i)[0]).toHaveStyle('opacity: 0.1');
    });
  });

  test('Should change the opacity of the other bars and their legends on mouse out from a bar legend', async () => {
    // Arrange
    const { container } = render(<StackedBarChart data={data} />);
    const bars = getById(container, /_SBC_bar/i);
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    // Assert
    expect(bars).toHaveLength(data.chartData!.length);
    expect(legends).toHaveLength(4);
    // Act
    fireEvent.mouseOut(screen.getByText('second'));
    await waitFor(() => {
      // Assert
      expect(screen.getByText('first')).not.toHaveAttribute('opacity');
      expect(getByClass(container, /opacityChangeOnHover/i)).toHaveLength(4);
      expect(getByClass(container, /opacityChangeOnHover/i)[0]).not.toHaveAttribute('opacity');
    });
  });

  test('Should reduce the opacity of the other bars and their legends on mouse click a bar legend', async () => {
    // Arrange
    const { container } = render(<StackedBarChart data={data} />);
    const bars = getById(container, /_SBC_bar/i);
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    // Assert
    expect(bars).toHaveLength(data.chartData!.length);
    expect(legends).toHaveLength(4);
    // Act
    fireEvent.click(screen.getByText('second'));
    await waitFor(() => {
      // Assert
      expect(screen.getByText('first')).toHaveStyle('opacity: 0.67');
      expect(getByClass(container, /opacityChangeOnHover/i)).toHaveLength(4);
      expect(getByClass(container, /opacityChangeOnHover/i)[0]).toHaveStyle('opacity: 0.1');
    });
  });
});

describe('Stacked bar chart - Subcomponent callout', () => {
  testWithWait(
    'Should call the handler on mouse over bar',
    StackedBarChart,
    { data, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const handleMouseOver = jest.spyOn(StackedBarChartBase.prototype as any, '_onBarHover');
      const bars = getById(container, /_SBC_bar/i);
      // Assert
      expect(getById(container, /_SBC_bar/i)).toHaveLength(data.chartData!.length);
      // Act
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(handleMouseOver).toHaveBeenCalled();
    },
  );

  testWithWait(
    'Should show the callout on mouse over bar',
    StackedBarChart,
    { data, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = getById(container, /_SBC_bar/i);
      // Assert
      expect(getById(container, /_SBC_bar/i)).toHaveLength(data.chartData!.length);
      // Act
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getByClass(container, /callout/i)).toBeDefined();
      expect(getByClass(container, /callout/i)[0].getAttribute('opacity')).toBeNull();
    },
  );

  testWithWait(
    'Should show the custom callout over the bar on mouse over',
    StackedBarChart,
    {
      data,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: IStackedBarChartProps) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      // Arrange
      const bars = getById(container, /_SBC_bar/i);
      // Assert
      expect(bars).toHaveLength(data.chartData!.length);
      // Act
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /callout/i)).toBeDefined();
      expect(screen.queryByText('Custom Callout Content')).toBeDefined();
    },
  );
});

describe('Screen resolution', () => {
  testScreenResolutionChanges(() => {
    // Arrange
    const { container } = render(<StackedBarChart data={data} />);
    // Assert
    expect(container).toMatchSnapshot();
  });
});

test('Should reflect theme change', () => {
  // Arrange
  const { container } = render(
    <ThemeProvider theme={DarkTheme}>
      <StackedBarChart culture={window.navigator.language} data={data} />
    </ThemeProvider>,
  );
  // Assert
  expect(container).toMatchSnapshot();
});
