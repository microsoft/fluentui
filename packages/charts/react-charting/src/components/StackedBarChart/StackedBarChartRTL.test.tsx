/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { IChartDataPoint, IChartProps, IStackedBarChartProps } from '../../StackedBarChart';
import {
  getByClass,
  getById,
  testScreenResolutionChanges,
  testWithWait,
  testWithoutWait,
} from '../../utilities/TestUtility.test';
import { StackedBarChart } from './StackedBarChart';
import { DefaultPalette, ThemeProvider, resetIds } from '@fluentui/react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { StackedBarChartBase } from './StackedBarChart.base';
import { DarkTheme } from '@fluentui/theme-samples';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

function sharedBeforeEach() {
  resetIds();
}

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

const onePoint: IChartDataPoint[] = [
  {
    legend: 'first',
    data: 300,
    color: DefaultPalette.blue,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
    placeHolder: true,
  },
];

const twoPoints: IChartDataPoint[] = [
  {
    legend: 'first',
    data: 300,
    color: DefaultPalette.blue,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
  },
  { legend: 'second', data: 100, color: DefaultPalette.green },
];

const data: IChartProps = {
  chartTitle: 'Stacked Bar chart example',
  chartData: points,
};

const onePointData: IChartProps = {
  chartTitle: 'Stacked Bar chart example',
  chartData: onePoint,
};

const twoPointsData: IChartProps = {
  chartTitle: 'Stacked Bar chart example',
  chartData: twoPoints,
  chartDataAccessibilityData: {
    ariaLabel: 'test',
  },
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
  beforeEach(sharedBeforeEach);

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
  beforeEach(sharedBeforeEach);

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
    'Should render the empty bars with the specified background color',
    StackedBarChart,
    { data: emptyData, barBackgroundColor: DefaultPalette.red },
    container => {
      // Assert
      expect(getById(container, /_SBC_bar/i)).toHaveLength(0);
      expect(getById(container, /_SBC_empty_bar_/i)).toHaveLength(1);
      expect(getById(container, /_SBC_empty_bar_/i)[0].getAttribute('fill')).toEqual(DefaultPalette.red);
    },
  );

  testWithWait(
    'Should render the number on top of the bar with only one data point',
    StackedBarChart,
    { data: onePointData },
    container => {
      // Assert
      const ratioNumerator = getByClass(container, /ratioNumerator/i);
      const ratioDenominator = getByClass(container, /ratioDenominator/i);
      expect(ratioNumerator).toBeDefined();
      expect(ratioNumerator[0].textContent).toEqual('300');
      expect(ratioDenominator).toHaveLength(0);
    },
  );

  testWithWait(
    'Should render the ratio on top of the bar with only two data points',
    StackedBarChart,
    { data: twoPointsData },
    container => {
      // Assert
      const ratioNumerator = getByClass(container, /ratioNumerator/i);
      const ratioDenominator = getByClass(container, /ratioDenominator/i);
      expect(ratioNumerator).toBeDefined();
      expect(ratioNumerator[0].textContent).toEqual('300');
      expect(ratioDenominator).toBeDefined();
      expect(ratioDenominator[0].textContent).toEqual(' / 400');
    },
  );

  testWithWait(
    'Should not render the ratio on top of the bar with data points count greater than two',
    StackedBarChart,
    { data },
    container => {
      // Assert
      const ratioNumerator = getByClass(container, /ratioNumerator/i);
      const ratioDenominator = getByClass(container, /ratioDenominator/i);
      expect(ratioNumerator).toHaveLength(0);
      expect(ratioDenominator).toHaveLength(0);
    },
  );

  testWithWait(
    'Should render a colored arrow on top when target data is specified',
    StackedBarChart,
    { data, targetData: points[0] },
    container => {
      // Assert
      const targetMarker = getByClass(container, /target/i);
      expect(targetMarker).toHaveLength(1);
      expect(targetMarker[0]).toHaveStyle(`border-top: 7px solid`);
      expect(targetMarker[0]).toHaveStyle(`border-top-color: ${DefaultPalette.blue}`);
      const legends = getByClass(container, /^legend-/i);
      expect(legends).toHaveLength(5);
      expect(legends[4].textContent).toEqual('first');
    },
  );

  testWithWait(
    'Should enable chartDataAccessibilityData prop only if ratio or numbers are enabled to be shown',
    StackedBarChart,
    { data: twoPointsData },
    container => {
      const textRole = screen.getAllByRole('text');
      // Assert
      expect(textRole).toHaveLength(2);
      expect(textRole[1].getAttribute('aria-label')).toEqual('test');
    },
  );
});

describe('Stacked bar chart - Subcomponent benchmark', () => {
  beforeEach(sharedBeforeEach);

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
  beforeEach(sharedBeforeEach);

  testWithWait('Should show any rendered legends when hideLegend is not set', StackedBarChart, { data }, container => {
    // Arrange
    const legends = getByClass(container, /^legend-/i);
    // Assert
    expect(legends).toHaveLength(4);
  });

  testWithWait(
    'Should not show any rendered legends when hideLegend is true',
    StackedBarChart,
    { data, hideLegend: true },
    container => {
      // Arrange
      const legends = getByClass(container, /^legend-/i);
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

  testWithWait(
    'Should not show legend if data is marked as placeholder',
    StackedBarChart,
    { data: onePointData },
    container => {
      // Assert
      // The benchmark legend (first) should also appear making the legend ('first') count to 2
      expect(screen.queryAllByText('first')).toHaveLength(0);
    },
  );

  test('Should reduce the opacity of the other bars and their legends on mouse over a bar legend', async () => {
    // Arrange
    const { container } = render(<StackedBarChart data={data} />);
    const bars = getById(container, /_SBC_bar/i);
    const legends = getByClass(container, /^legend-/i);
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
    const legends = getByClass(container, /^legend-/i);
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
    const legends = getByClass(container, /^legend-/i);
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
  beforeEach(sharedBeforeEach);

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
  beforeEach(sharedBeforeEach);

  testScreenResolutionChanges(() => {
    // Arrange
    const { container } = render(<StackedBarChart data={data} />);
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Stacked Bar Chart - Theme', () => {
  beforeEach(sharedBeforeEach);

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
});

describe('Stacked Bar Chart - axe-core', () => {
  beforeEach(sharedBeforeEach);

  test('Should pass accessibility tests', async () => {
    const { container } = render(<StackedBarChart data={data} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
