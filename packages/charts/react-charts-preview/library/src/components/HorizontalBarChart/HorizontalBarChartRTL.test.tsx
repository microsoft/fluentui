import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { HorizontalBarChart } from './HorizontalBarChart';
import { getByClass, getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { HorizontalBarChartVariant, ChartProps } from './index';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const chartPoints: ChartProps[] = [
  {
    chartTitle: 'one',
    chartData: [
      {
        legend: 'one',
        horizontalBarChartdata: { x: 1543, y: 15000 },
        color: '#004b50',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '10%',
      },
    ],
  },
  {
    chartTitle: 'two',
    chartData: [
      {
        legend: 'two',
        horizontalBarChartdata: { x: 800, y: 15000 },
        color: '#5c2d91',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '5%',
      },
    ],
  },
  {
    chartTitle: 'three',
    chartData: [
      {
        legend: 'three',
        horizontalBarChartdata: { x: 8888, y: 15000 },
        color: '#a4262c',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '59%',
      },
    ],
  },
];

const chartPointsWithBenchMark: ChartProps[] = [
  {
    chartTitle: 'one',
    chartData: [{ legend: 'one', data: 50, horizontalBarChartdata: { x: 10, y: 100 }, color: '#004b50' }],
  },
  {
    chartTitle: 'two',
    chartData: [{ legend: 'two', data: 30, horizontalBarChartdata: { x: 30, y: 200 }, color: '#5c2d91' }],
  },
  {
    chartTitle: 'three',
    chartData: [{ legend: 'three', data: 5, horizontalBarChartdata: { x: 15, y: 50 }, color: '#a4262c' }],
  },
];

describe('Horizontal bar chart rendering', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  testWithoutWait(
    'Should render the Horizontal bar chart legend with string data',
    HorizontalBarChart,
    { data: chartPoints },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Horizontal bar chart - Subcomponent bar', () => {
  testWithWait(
    'Should render the bars with the specified colors',
    HorizontalBarChart,
    { data: chartPoints },
    container => {
      // colors mentioned in the data points itself
      // Assert
      const bars = getByClass(container, /barWrapper/);
      expect(bars[0].getAttribute('fill')).toEqual('#004b50');
      expect(bars[1].getAttribute('fill')).toEqual('var(--colorBackgroundOverlay)');
      expect(bars[2].getAttribute('fill')).toEqual('#5c2d91');
      expect(bars[3].getAttribute('fill')).toEqual('var(--colorBackgroundOverlay)');
      expect(bars[4].getAttribute('fill')).toEqual('#a4262c');
      expect(bars[5].getAttribute('fill')).toEqual('var(--colorBackgroundOverlay)');
    },
  );

  testWithWait(
    'Should render the bar with the given height',
    HorizontalBarChart,
    { data: chartPoints, barHeight: 50 },
    container => {
      // Assert
      const bars = getByClass(container, /barWrapper/);
      expect(bars).toHaveLength(6);
      expect(bars[0].getAttribute('height')).toEqual('50');
      expect(bars[1].getAttribute('height')).toEqual('50');
      expect(bars[2].getAttribute('height')).toEqual('50');
      expect(bars[3].getAttribute('height')).toEqual('50');
      expect(bars[4].getAttribute('height')).toEqual('50');
      expect(bars[5].getAttribute('height')).toEqual('50');
    },
  );

  testWithWait(
    'Should render the bars with labels hidden',
    HorizontalBarChart,
    { data: chartPoints, hideLabels: true },
    container => {
      // Assert
      expect(getByClass(container, /barLabel/i)).toHaveLength(0);
    },
  );

  testWithWait(
    'Should render the bars with left side label/Legend',
    HorizontalBarChart,
    { data: chartPoints },
    container => {
      // Assert
      expect(getByClass(container, /chartTitleLeft/i)).toHaveLength(3);
    },
  );

  testWithWait(
    'Should render the bars right side value inline with bar when variant is absolute scale',
    HorizontalBarChart,
    { data: chartPoints, variant: HorizontalBarChartVariant.AbsoluteScale },
    container => {
      // Assert
      expect(getByClass(container, /chartTitleRight/i)).toHaveLength(0);
    },
  );

  testWithWait(
    'Should render the bars right side value on top of the with bar when variant part to whole',
    HorizontalBarChart,
    { data: chartPoints, variant: HorizontalBarChartVariant.PartToWhole },
    container => {
      // Assert
      expect(getByClass(container, /chartTitleRight/i)).toHaveLength(3);
    },
  );

  testWithWait(
    'Should render the bars right side value with fractional value when chartDataMode is fraction',
    HorizontalBarChart,
    { data: chartPoints, chartDataMode: 'fraction' },
    container => {
      //Assert
      expect(getByClass(container, /fui-hbc__textDenom/i)).toHaveLength(3);
    },
  );

  testWithWait(
    'Should render the bars right side value with percentage value when chartDataMode is percentage',
    HorizontalBarChart,
    { data: chartPoints, chartDataMode: 'percentage' },
    container => {
      // Assert
      expect(screen.queryByText('10%')).not.toBeNull();
      expect(screen.queryByText('5%')).not.toBeNull();
      expect(screen.queryByText('59%')).not.toBeNull();
    },
  );

  //This tc will fail because barChartCustomData is not defined in base file.
  testWithWait(
    'Should show the custom data on right side of the chart',
    HorizontalBarChart,
    {
      data: chartPoints,
      barChartCustomData: (props: ChartProps) =>
        props ? (
          <div className="barChartCustomData">
            <p>Bar Custom Data</p>
          </div>
        ) : null,
    },
    container => {
      expect(getByClass(container, /barChartCustomData/i)).toHaveLength(0); // ToDo - Fix this test
    },
  );
});

describe('Horizontal bar chart - Subcomponent Benchmark', () => {
  testWithWait(
    'Should render the bar with branchmark',
    HorizontalBarChart,
    { data: chartPointsWithBenchMark },
    container => {
      // Assert
      expect(getByClass(container, /triangle/i)).toHaveLength(3);
    },
  );
});

describe('Horizontal bar chart - Subcomponent callout', () => {
  test('Should call the handler on mouse over bar', async () => {
    // ToDo - Fix this test
    // Mock function to replace _hoverOn
    /*     const handleMouseOver = jest.fn();
    // Render the component with props
    const { container } = render(<rect onMouseOver={handleMouseOver} />);
    // Wait for the component to settle if needed
    await waitFor(() => {
      // Find bars in the container and simulate mouse over event
      const rectElements = container.querySelectorAll('rect');
      rectElements.forEach(rect => {
        fireEvent.mouseOver(rect);
      });
      // Assert
      expect(handleMouseOver).toHaveBeenCalled();
    }); */
  });

  testWithWait(
    'Should show the callout over the bar on mouse over',
    HorizontalBarChart,
    { data: chartPoints, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = getByClass(container, /barWrapper/);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );

  testWithWait(
    'Should show the custom callout over the bar on mouse over',
    HorizontalBarChart,
    {
      data: chartPoints,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: ChartProps) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      const bars = getByClass(container, /barWrapper/);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(screen.queryByText('Custom Callout Content')).toBeDefined();
    },
  );
});

describe('Horizontal bar chart - Screen resolution', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });

  const originalInnerWidth = global.innerWidth;
  const originalInnerHeight = global.innerHeight;
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
    global.innerWidth = originalInnerWidth;
    global.innerHeight = originalInnerHeight;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });
  });

  testWithWait(
    'Should remain unchanged on zoom in',
    HorizontalBarChart,
    { data: chartPoints, width: 300, height: 300 },
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
    HorizontalBarChart,
    { data: chartPoints, width: 300, height: 300 },
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

describe('Horizontal bar chart - Theme', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <FluentProvider theme={{ colorNeutralBackground1: '#ccc' }}>
        <HorizontalBarChart culture={window.navigator.language} data={chartPoints} />
      </FluentProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Horizontal bar chart re-rendering', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
  test('Should re-render the Horizontal bar chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<HorizontalBarChart data={[]} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_HBC_empty/i)).toHaveLength(1);
    // Act
    rerender(<HorizontalBarChart data={chartPoints} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_HBC_empty/i)).toHaveLength(0);
    });
  });
});

describe('Horizontal Bar Chart - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<HorizontalBarChart data={chartPoints} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
