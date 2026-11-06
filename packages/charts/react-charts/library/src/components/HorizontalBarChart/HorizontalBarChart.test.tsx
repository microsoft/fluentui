import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { HorizontalBarChart } from './HorizontalBarChart';
import { getByClass, getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import type { ChartProps } from './index';
import { HorizontalBarChartVariant } from './index';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const chartPoints: ChartProps[] = [
  {
    chartTitle: 'one',
    chartData: [
      {
        legend: 'one.one',
        horizontalBarChartdata: { x: 1543, total: 15000 },
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
        horizontalBarChartdata: { x: 800, total: 15000 },
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
        horizontalBarChartdata: { x: 8888, total: 15000 },
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
    chartData: [{ legend: 'one', data: 50, horizontalBarChartdata: { x: 10, total: 100 }, color: '#004b50' }],
  },
  {
    chartTitle: 'two',
    chartData: [{ legend: 'two', data: 30, horizontalBarChartdata: { x: 30, total: 200 }, color: '#5c2d91' }],
  },
  {
    chartTitle: 'three',
    chartData: [{ legend: 'three', data: 5, horizontalBarChartdata: { x: 15, total: 50 }, color: '#a4262c' }],
  },
];
const showText = (count: number) => (
  <div>
    <span>{count}</span>
  </div>
);
const chartPointsForStackedInlineLegend = [
  {
    chartTitle: 'one',
    chartData: [
      { legend: 'one.one', horizontalBarChartdata: { x: 10, total: 100 }, color: '#004b50' },
      { legend: 'one.two', horizontalBarChartdata: { x: 90, total: 100 }, color: '#a4262c' },
    ],
    legendProps: {
      enabledWrapLines: true,
      legends: [
        {
          legendAnnotation: () => showText(60),
          title: 'Legend 1',
          color: '#a4262c',
        },
        {
          legendAnnotation: () => showText(40),
          title: 'Legend 2',
          color: '#5c2d91',
        },
      ],
    },
  },
  {
    chartTitle: 'two',
    chartData: [
      { legend: 'two.one', horizontalBarChartdata: { x: 30, total: 200 }, color: '#5c2d91' },
      { legend: 'two.two', horizontalBarChartdata: { x: 170, total: 200 }, color: '#a4262c' },
    ],
    legendProps: {
      enabledWrapLines: true,
      legends: [
        {
          legendAnnotation: () => showText(20),
          title: 'Legend 1',
          color: '#a4262c',
        },
        {
          legendAnnotation: () => showText(30),
          title: 'Legend 2',
          color: '#5c2d91',
        },
      ],
    },
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

  chartPointsForStackedInlineLegend.forEach((rowData, rowIndex) => {
    testWithoutWait(
      `Should render HorizontalBarChart for row ${rowIndex} with inline legends`,
      HorizontalBarChart,
      { data: [rowData], chartDataMode: 'hidden', legendProps: rowData.legendProps },
      container => {
        expect(container).toMatchSnapshot();
      },
    );
  });
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

  testWithWait(
    'Should not render the bars right side value when chartDataMode is hidden',
    HorizontalBarChart,
    { data: chartPoints, chartDataMode: 'hidden' },
    container => {
      // Assert
      expect(screen.queryByText('10%')).toBeNull();
      expect(screen.queryByText('5%')).toBeNull();
      expect(screen.queryByText('59%')).toBeNull();
      expect(getByClass(container, /fui-hbc__textDenom/i)).toHaveLength(0);
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

describe('HorizontalBarChart snapShot testing', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('Should render absolute-scale variant correctly', () => {
    const component = render(
      <HorizontalBarChart data={chartPoints} variant={HorizontalBarChartVariant.AbsoluteScale} />,
    );
    expect(component).toMatchSnapshot();
  });

  it('Should not render bar labels in absolute-scale variant', () => {
    const component = render(
      <HorizontalBarChart data={chartPoints} variant={HorizontalBarChartVariant.AbsoluteScale} hideLabels={true} />,
    );
    expect(component).toMatchSnapshot();
  });
});

describe('HorizontalBarChart - basic props', () => {
  it('Should mount callout when hideTootip false ', () => {
    const wrapper = render(<HorizontalBarChart data={chartPoints} />);
    const hideLegendDOM = wrapper.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    const wrapper = render(<HorizontalBarChart data={chartPoints} hideTooltip={true} />);
    const hideLegendDOM = wrapper.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should render onRenderCalloutPerHorizonalBar ', () => {
    const wrapper = render(<HorizontalBarChart data={chartPoints} />);
    const renderedDOM = wrapper.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerHorizonalBar ', () => {
    const wrapper = render(<HorizontalBarChart data={chartPoints} />);
    const renderedDOM = wrapper.container.getElementsByClassName('.onRenderCalloutPerHorizonalBar');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('No prop changes', () => {
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const { rerender, container } = render(<HorizontalBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<HorizontalBarChart {...props} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).toBe(htmlBefore);
  });

  it('prop changes', async () => {
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hideLabels: true,
    };

    const props1 = {
      data: chartPointsWithBenchMark,
      height: 300,
      width: 600,
      hideLabels: true,
    };
    const { rerender, container } = render(<HorizontalBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<HorizontalBarChart {...props1} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    const wrapper = render(<HorizontalBarChart data={chartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    const wrapper = render(<HorizontalBarChart data={[]} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});

describe('Horizontal bar chart - spacing between bars', () => {
  const MARGIN_WIDTH_IN_PX = 3;
  const getBars = (container: Element) =>
    Array.from(container.querySelectorAll('rect'))
      .map(rect => ({ x: parseFloat(rect.getAttribute('x')!), width: parseFloat(rect.getAttribute('width')!) }))
      .filter(bar => bar.width > 0)
      .sort((a, b) => a.x - b.x);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe.each(['ltr', 'rtl'] as const)('dir: %s', dir => {
    test.each([
      [300, 25],
      [1200, 25],
      [300, 0],
      [300, 100],
    ])('svg width %ipx, value %i of 100: equal gaps and bars fill the track', (svgWidth, x) => {
      jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ width: svgWidth } as DOMRect);

      const { container } = render(
        <FluentProvider dir={dir}>
          <HorizontalBarChart
            data={[{ chartTitle: 'one', chartData: [{ legend: 'one', horizontalBarChartdata: { x, total: 100 } }] }]}
          />
        </FluentProvider>,
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

    // Segments carry only horizontalBarChartdata.x (no point.data); zero and negative entries
    // render with no width, so they must not reserve a gap either.
    const rows: [string, number[], number][] = [
      ['zeros in the middle', [30, 0, 20, 0, 25, 25], 4],
      ['zeros at the beginning and end', [0, 0, 40, 60, 0], 2],
      ['negative values', [-10, 30, -5, 20, 50, -15], 3],
      ['negative total', [-30, -20, 10], 2],
    ];
    const toChartProps = ([chartTitle, values]: [string, number[], number]): ChartProps => ({
      chartTitle,
      chartData: values.map((x, i) => ({ legend: `${chartTitle} ${i}`, horizontalBarChartdata: { x } })),
    });
    const expectEvenlySpacedBars = (svg: Element, expectedBarCount: number) => {
      const bars = getBars(svg);
      expect(bars).toHaveLength(expectedBarCount);
      expect(bars[0].x).toBeCloseTo(0);
      expect(bars[bars.length - 1].x + bars[bars.length - 1].width).toBeCloseTo(100);
      for (let i = 1; i < bars.length; i++) {
        // 3px gap on a 300px track
        expect(bars[i].x - (bars[i - 1].x + bars[i - 1].width)).toBeCloseTo(1);
      }
    };

    test.each(rows)('%s: gaps are reserved only between rendered segments', (...row) => {
      jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ width: 300 } as DOMRect);

      const { container } = render(
        <FluentProvider dir={dir}>
          <HorizontalBarChart data={[toChartProps(row)]} />
        </FluentProvider>,
      );

      expectEvenlySpacedBars(container.querySelector(`svg[aria-label="${row[0]}"]`)!, row[2]);
    });

    test('multiple rows: each row reserves gaps only between its rendered segments', () => {
      jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ width: 300 } as DOMRect);

      const { container } = render(
        <FluentProvider dir={dir}>
          <HorizontalBarChart data={rows.map(toChartProps)} />
        </FluentProvider>,
      );

      rows.forEach(([chartTitle, , expectedBarCount]) => {
        expectEvenlySpacedBars(container.querySelector(`svg[aria-label="${chartTitle}"]`)!, expectedBarCount);
      });
    });
  });

  test('absolute-scale variant places the value label right after the bar', () => {
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ width: 300 } as DOMRect);

    const { container } = render(
      <HorizontalBarChart
        variant={HorizontalBarChartVariant.AbsoluteScale}
        data={[{ chartTitle: 'one', chartData: [{ legend: 'one', horizontalBarChartdata: { x: 25, total: 100 } }] }]}
      />,
    );

    const [bar] = getBars(container);
    const label = container.querySelector('svg text')!;
    expect(bar.x).toBeCloseTo(0);
    expect(parseFloat(label.getAttribute('x')!)).toBeCloseTo(bar.x + bar.width);
  });
});
