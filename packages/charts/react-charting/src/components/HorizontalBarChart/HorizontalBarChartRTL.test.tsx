import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider, resetIds, setRTL } from '@fluentui/react';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { HorizontalBarChart } from './HorizontalBarChart';
import { getByClass, getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { HorizontalBarChartBase } from './HorizontalBarChart.base';
import { HorizontalBarChartVariant, IChartProps } from './index';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

function sharedBeforeEach() {
  resetIds();
}

const chartPoints: IChartProps[] = [
  {
    chartTitle: 'one',
    chartData: [
      {
        legend: 'one',
        horizontalBarChartdata: { x: 1543, y: 15000 },
        color: DefaultPalette.tealDark,
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
        color: DefaultPalette.purple,
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
        color: DefaultPalette.redDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '59%',
      },
    ],
  },
];

const chartPointsWithBenchMark: IChartProps[] = [
  {
    chartTitle: 'one',
    chartData: [{ legend: 'one', data: 50, horizontalBarChartdata: { x: 10, y: 100 }, color: DefaultPalette.tealDark }],
  },
  {
    chartTitle: 'two',
    chartData: [{ legend: 'two', data: 30, horizontalBarChartdata: { x: 30, y: 200 }, color: DefaultPalette.purple }],
  },
  {
    chartTitle: 'three',
    chartData: [{ legend: 'three', data: 5, horizontalBarChartdata: { x: 15, y: 50 }, color: DefaultPalette.redDark }],
  },
];

describe('Horizontal bar chart rendering', () => {
  beforeEach(() => {
    sharedBeforeEach();
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
  beforeEach(sharedBeforeEach);

  testWithWait(
    'Should render the bars with the specified colors',
    HorizontalBarChart,
    { data: chartPoints },
    container => {
      // colors mentioned in the data points itself
      // Assert
      const bars = getByClass(container, /barWrapper-/i);
      expect(bars[0].getAttribute('fill')).toEqual(DefaultPalette.tealDark);
      expect(bars[1].getAttribute('fill')).toEqual(DefaultPalette.neutralLight);
      expect(bars[2].getAttribute('fill')).toEqual(DefaultPalette.purple);
      expect(bars[3].getAttribute('fill')).toEqual(DefaultPalette.neutralLight);
      expect(bars[4].getAttribute('fill')).toEqual(DefaultPalette.redDark);
      expect(bars[5].getAttribute('fill')).toEqual(DefaultPalette.neutralLight);
    },
  );

  testWithWait(
    'Should render the bar with the given height',
    HorizontalBarChart,
    { data: chartPoints, barHeight: 50 },
    container => {
      // Assert
      const bars = getByClass(container, /barWrapper-/i);
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
    'Should render the bars right side value with franctional value when chartDataMode is fraction',
    HorizontalBarChart,
    { data: chartPoints, chartDataMode: 'fraction' },
    container => {
      // Assert
      expect(getByClass(container, /chartDataTextDenominator/i)).toHaveLength(3);
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

  testWithWait(
    'Should show the custom data on right side of the chart',
    HorizontalBarChart,
    {
      data: chartPoints,
      barChartCustomData: (props: IChartProps) =>
        props ? (
          <div className="barChartCustomData">
            <p>Bar Custom Data</p>
          </div>
        ) : null,
    },
    container => {
      expect(getByClass(container, /barChartCustomData/i)).toHaveLength(3);
    },
  );
});

describe('Horizontal bar chart - Subcomponent Benchmark', () => {
  beforeEach(sharedBeforeEach);

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
  beforeEach(sharedBeforeEach);

  testWithWait(
    'Should call the handler on mouse over bar and on mouse leave from bar',
    HorizontalBarChart,
    { data: chartPoints, calloutProps: { doNotLayer: true } },
    container => {
      // eslint-disable-next-line
      const handleMouseOver = jest.spyOn(HorizontalBarChartBase.prototype as any, '_hoverOn');
      const bars = getByClass(container, /barWrapper-/i);
      // Assert
      expect(bars).toHaveLength(6);
      fireEvent.mouseOver(bars[0]);
      expect(handleMouseOver).toHaveBeenCalled();
    },
  );

  testWithWait(
    'Should show the callout over the bar on mouse over',
    HorizontalBarChart,
    { data: chartPoints, calloutProps: { doNotLayer: true } },
    container => {
      // Arrange
      const bars = getByClass(container, /barWrapper-/i);
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
      onRenderCalloutPerDataPoint: (props: IChartProps) =>
        props ? (
          <div className="onRenderCalloutPerDataPoint">
            <p>Custom Callout Content</p>
          </div>
        ) : null,
    },
    container => {
      const bars = getByClass(container, /barWrapper-/i);
      fireEvent.mouseOver(bars[0]);
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(screen.queryByText('Custom Callout Content')).toBeDefined();
    },
  );
});

describe('Horizontal bar chart - Screen resolution', () => {
  beforeEach(() => {
    sharedBeforeEach();
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
    sharedBeforeEach();
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <ThemeProvider theme={DarkTheme}>
        <HorizontalBarChart culture={window.navigator.language} data={chartPoints} />
      </ThemeProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Horizontal bar chart re-rendering', () => {
  beforeEach(() => {
    sharedBeforeEach();
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
  beforeEach(sharedBeforeEach);

  test('Should pass accessibility tests', async () => {
    const { container } = render(<HorizontalBarChart data={chartPoints} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});

describe('Horizontal bar chart - spacing between bars', () => {
  const MARGIN_WIDTH_IN_PX = 3;
  const getBars = (container: HTMLElement) =>
    Array.from(container.querySelectorAll('rect'))
      .map(rect => ({ x: parseFloat(rect.getAttribute('x')!), width: parseFloat(rect.getAttribute('width')!) }))
      .filter(bar => bar.width > 0)
      .sort((a, b) => a.x - b.x);

  beforeEach(sharedBeforeEach);
  afterEach(() => {
    setRTL(false);
    jest.restoreAllMocks();
  });

  describe.each([false, true])('isRTL: %s', isRTL => {
    test.each([
      [300, 25],
      [1200, 25],
      [300, 0],
      [300, 100],
    ])('svg width %ipx, value %i of 100: equal gaps and bars fill the track', (svgWidth, x) => {
      setRTL(isRTL);
      jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ width: svgWidth } as DOMRect);

      const { container } = render(
        <HorizontalBarChart
          data={[{ chartTitle: 'one', chartData: [{ legend: 'one', horizontalBarChartdata: { x, y: 100 } }] }]}
        />,
      );

      const bars = getBars(container);
      const expectedGap = (MARGIN_WIDTH_IN_PX / svgWidth) * 100;

      expect(bars).toHaveLength(x > 0 && x < 100 ? 2 : 1);
      expect(bars[0].x).toBeCloseTo(0);
      expect(bars[bars.length - 1].x + bars[bars.length - 1].width).toBeCloseTo(100);
      for (let i = 1; i < bars.length; i++) {
        expect(bars[i].x - (bars[i - 1].x + bars[i - 1].width)).toBeCloseTo(expectedGap);
      }
    });
  });

  test('absolute-scale variant places the value label right after the bar', () => {
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ width: 300 } as DOMRect);

    const { container } = render(
      <HorizontalBarChart
        variant={HorizontalBarChartVariant.AbsoluteScale}
        data={[{ chartTitle: 'one', chartData: [{ legend: 'one', horizontalBarChartdata: { x: 25, y: 100 } }] }]}
      />,
    );

    const [bar] = getBars(container);
    const label = container.querySelector('svg text')!;
    expect(bar.x).toBeCloseTo(0);
    expect(parseFloat(label.getAttribute('x')!)).toBeCloseTo(bar.x + bar.width);
  });
});
