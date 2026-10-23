import { screen, fireEvent, render, act, within } from '@testing-library/react';
import { GroupedVerticalBarChart } from './index';
import { getByClass, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import type { GroupedVerticalBarChartData, GVBarChartSeriesPoint, GroupedVerticalBarChartProps } from '../../index';
import { toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import { specialChartNames } from '../../utilities/test-data/specialChartNames';
import { getNextColor } from '../../utilities/colors';

expect.extend(toHaveNoViolations);

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
const originalGetComputedStyle = window.getComputedStyle;
const originalGetBoundingClientRect = window.Element.prototype.getBoundingClientRect;

function updateChartWidthAndHeight() {
  jest.useFakeTimers();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
  window.Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
    bottom: 44,
    height: 50,
    left: 10,
    right: 35.67,
    top: 20,
    width: 650,
    x: 10,
    y: 20,
  } as DOMRect);
  window.getComputedStyle = jest.fn().mockImplementation(element => {
    const style = originalGetComputedStyle(element);
    return {
      ...style,
      marginTop: '0px',
      marginBottom: '0px',
      getPropertyValue: (prop: string) => {
        if (prop === 'margin-top' || prop === 'margin-bottom') {
          return '0px';
        }
        return style.getPropertyValue(prop);
      },
    } as CSSStyleDeclaration;
  });
}
function sharedAfterEach() {
  jest.useRealTimers();
  window.requestAnimationFrame = originalRAF;
  window.Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  window.getComputedStyle = originalGetComputedStyle;
}

const accessibilityDataPoints: GroupedVerticalBarChartData[] = [
  {
    name: 'Metadata info multi lines text Completed',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: '#00bcf2',
        legend: 'MetaData1',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '33%',
        callOutAccessibilityData: {
          ariaLabel: 'Group series 1 of 4, Bar series 1 of 2 x-Axis 2020/04/30 MetaData1 33%',
        },
      },
      {
        key: 'series2',
        data: 44000,
        color: '#0078d4',
        legend: 'MetaData4',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '44%',
        callOutAccessibilityData: {
          ariaLabel: 'Bar series 2 of 2 x-Axis 2020/04/30 MetaData4 44%',
        },
      },
    ],
    stackCallOutAccessibilityData: {
      ariaLabel: 'Group series 1 of 4 x-Axis 2020/04/30 MetaData1 33% MetaData4 44%',
    },
  },
];

const chartPoints = [
  {
    name: 'Metadata info multi lines text Completed',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: '#00bcf2',
        legend: 'MetaData1',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '33%',
      },
      {
        key: 'series2',
        data: 44000,
        color: '#0078d4',
        legend: 'MetaData4',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '44%',
      },
    ],
  },
  {
    name: 'Meta Data2',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: '#00bcf2',
        legend: 'MetaData1',
        xAxisCalloutData: '2020/05/30',
        yAxisCalloutData: '33%',
      },
      {
        key: 'series2',
        data: 3000,
        color: '#0078d4',
        legend: 'MetaData4',
        xAxisCalloutData: '2020/05/30',
        yAxisCalloutData: '3%',
      },
    ],
  },

  {
    name: 'Single line text ',
    series: [
      {
        key: 'series1',
        data: 14000,
        color: '#00bcf2',
        legend: 'MetaData1',
        xAxisCalloutData: '2020/06/30',
        yAxisCalloutData: '14%',
      },
      {
        key: 'series2',
        data: 50000,
        color: '#0078d4',
        legend: 'MetaData4',
        xAxisCalloutData: '2020/06/30',
        yAxisCalloutData: '50%',
      },
    ],
  },
];

const dataGVBC = [
  {
    name: 'Jan - Mar',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: '#0078d4',
        legend: '2022',
        xAxisCalloutData: '2022/04/30',
        yAxisCalloutData: '29%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 1 of 2 2022, x value 2022/04/30, y value 29%',
        },
      },
      {
        key: 'series2',
        data: 44000,
        color: '#107c10',
        legend: '2023',
        xAxisCalloutData: '2023/04/30',
        yAxisCalloutData: '44%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 2 of 2 2023, x value 2023/04/30, y value 44%',
        },
      },
      {
        key: 'series3',
        data: 54000,
        color: '#107c10',
        legend: '2024',
        xAxisCalloutData: '2024/04/30',
        yAxisCalloutData: '44%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 3 of 4 2022, x value 2024/04/30, y value 44%',
        },
      },
      {
        key: 'series4',
        data: 24000,
        color: '#ffb900',
        legend: '2021',
        xAxisCalloutData: '2021/04/30',
        yAxisCalloutData: '44%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 4 of 4 2021, x value 2021/04/30, y value 44%',
        },
      },
    ],
  },
  {
    name: 'Apr - Jun',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: '#0078d4',
        legend: '2022',
        xAxisCalloutData: '2022/05/30',
        yAxisCalloutData: '29%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 1 of 2 2022, x value 2022/05/30, y value 29%',
        },
      },
      {
        key: 'series2',
        data: 3000,
        color: '#107c10',
        legend: '2023',
        xAxisCalloutData: '2023/05/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 2 of 2 2023, x value 2023/05/30, y value 3%',
        },
      },
      {
        key: 'series3',
        data: 9000,
        color: '#e81123',
        legend: '2024',
        xAxisCalloutData: '2024/05/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 3 of 4 2024, x value 2024/05/30, y value 3%',
        },
      },
      {
        key: 'series4',
        data: 12000,
        color: 'ffb900',
        legend: '2021',
        xAxisCalloutData: '2021/05/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 4 of 4 2021, x value 2021/05/30, y value 3%',
        },
      },
    ],
  },

  {
    name: 'Jul - Sep',
    series: [
      {
        key: 'series1',
        data: 14000,
        color: '#0078d4',
        legend: '2022',
        xAxisCalloutData: '2022/06/30',
        yAxisCalloutData: '13%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 1 of 2 2022, x value 2022/06/30, y value 13%',
        },
      },
      {
        key: 'series2',
        data: 50000,
        color: '#107c10',
        legend: '2023',
        xAxisCalloutData: '2023/06/30',
        yAxisCalloutData: '50%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 2 of 2 2023, x value 2023/06/30, y value 50%',
        },
      },
      {
        key: 'series3',
        data: 60000,
        color: '#107c10',
        legend: '2024',
        xAxisCalloutData: '2024/06/30',
        yAxisCalloutData: '50%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 3 of 4 2024, x value 2024/06/30, y value 50%',
        },
      },
      {
        key: 'series4',
        data: 10000,
        color: '#ffb900',
        legend: '2021',
        xAxisCalloutData: '2021/06/30',
        yAxisCalloutData: '50%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 4 of 4 2021, x value 2021/06/30, y value 50%',
        },
      },
    ],
  },
  {
    name: 'Oct - Dec',
    series: [
      {
        key: 'series1',
        data: 33000,
        color: '#0078d4',
        legend: '2022',
        xAxisCalloutData: '2022/07/30',
        yAxisCalloutData: '29%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 1 of 2 2022, x value 2022/07/30, y value 29%',
        },
      },
      {
        key: 'series2',
        data: 3000,
        color: '#107c10',
        legend: '2023',
        xAxisCalloutData: '2023/07/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 2 of 2 2023, x value 2023/07/30, y value 3%',
        },
      },
      {
        key: 'series3',
        data: 6000,
        color: '#107c10',
        legend: '2024',
        xAxisCalloutData: '2024/07/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 3 of 4 2024, x value 2024/07/30, y value 3%',
        },
      },
      {
        key: 'series4',
        data: 15000,
        color: '#ffb900',
        legend: '2021',
        xAxisCalloutData: '2021/07/30',
        yAxisCalloutData: '3%',
        callOutAccessibilityData: {
          ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 4 of 4 2021, x value 2021/07/30, y value 3%',
        },
      },
    ],
  },
];

describe('Grouped Vertical bar chart rendering', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should render the grouped vertical bar chart with string x-axis data',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should render the grouped vertical bar chart with string x-axis data with given container width and bar width',
    GroupedVerticalBarChart,
    { data: chartPoints, width: 1000, barWidth: 16 },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Grouped vertical bar chart - Subcomponent bar', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithWait(
    'Should render the bar with the given width',
    GroupedVerticalBarChart,
    { data: chartPoints, barWidth: 'auto', maxBarWidth: 50 },
    container => {
      // Assert
      const bars = container.querySelectorAll('rect[role="option"]');
      expect(bars).toHaveLength(6);
      expect(bars[0].getAttribute('width')).toEqual('50');
      expect(bars[1].getAttribute('width')).toEqual('50');
      expect(bars[2].getAttribute('width')).toEqual('50');
    },
  );

  testWithWait(
    'Should render the bars with the specified colors',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      // colors mentioned in the data points itself
      // Assert
      const bars = container.querySelectorAll('rect[role="option"]');
      expect(bars[0].getAttribute('fill')).toEqual('#00bcf2');
      expect(bars[1].getAttribute('fill')).toEqual('#0078d4');
      expect(bars[2].getAttribute('fill')).toEqual('#00bcf2');
      expect(bars[3].getAttribute('fill')).toEqual('#0078d4');
      expect(bars[4].getAttribute('fill')).toEqual('#00bcf2');
      expect(bars[5].getAttribute('fill')).toEqual('#0078d4');
    },
  );

  testWithWait(
    'Should render the bars with labels hidden',
    GroupedVerticalBarChart,
    { data: chartPoints, hideLabels: true },
    container => {
      // Assert
      expect(getByClass(container, /barLabel/i)).toHaveLength(0);
    },
  );

  testWithWait(
    'Should render the with custom accessibility data',
    GroupedVerticalBarChart,
    { data: accessibilityDataPoints },
    container => {
      // Assert
      const bars = container.querySelectorAll('rect[role="option"]');
      expect(bars[0]).toHaveAttribute(
        'aria-label',
        'Group series 1 of 4, Bar series 1 of 2 x-Axis 2020/04/30 MetaData1 33%',
      );
    },
  );
});

describe('Grouped vertical bar chart - Subcomponent Legends', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should not show any rendered legends when hideLegend is true',
    GroupedVerticalBarChart,
    { data: chartPoints, hideLegend: true },
    container => {
      // Assert
      // Legends have 'rect' as a part of their classname
      const legends = getByClass(container, /legend-/i);
      expect(legends).toHaveLength(0);
    },
  );

  testWithoutWait(
    'Should reduce the opacity of the other bars on mouse over a bar legend',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      //const legends = getByClass(container, /legend-/i);
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.mouseOver(legends[0]);
      const bars = container.querySelectorAll('rect[role="option"]');
      // Assert
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithoutWait(
    'Should update the opacity of the other bars on mouse move from one bar legend to another bar legend',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.mouseOver(legends[0]);
      const bars = container.querySelectorAll('rect[role="option"]');
      // Assert
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
      fireEvent.mouseOver(legends[1]);
      const updatedBars = container.querySelectorAll('rect[role="option"]');
      // Assert
      expect(updatedBars[0]).toHaveAttribute('opacity', '0.1');
      expect(updatedBars[1]).toHaveAttribute('opacity', '');
      expect(updatedBars[2]).toHaveAttribute('opacity', '0.1');
      expect(updatedBars[3]).toHaveAttribute('opacity', '');
      expect(updatedBars[4]).toHaveAttribute('opacity', '0.1');
      expect(updatedBars[5]).toHaveAttribute('opacity', '');
    },
  );

  testWithWait(
    'Should select legend on single mouse click on legends',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.click(legends![0]);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      const bars = container.querySelectorAll('rect[role="option"]');
      // Assert
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'true');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'false');
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithWait(
    'Should deselect legend on double mouse click on legends',
    GroupedVerticalBarChart,
    { data: chartPoints },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.click(legends![0]);
      fireEvent.click(legends![0]);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      const bars = container.querySelectorAll('rect[role="option"]');
      // Assert
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'false');
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '');
    },
  );

  testWithoutWait(
    'Should select multiple legends on click',
    GroupedVerticalBarChart,
    { data: dataGVBC, legendProps: { canSelectMultipleLegends: true } },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      const firstLegend = legends[1];
      const secondLegend = legends[2];
      expect(firstLegend).toBeDefined();
      expect(secondLegend).toBeDefined();

      fireEvent.click(firstLegend!);
      fireEvent.click(secondLegend!);

      // Assert
      expect(firstLegend).toHaveAttribute('aria-selected', 'true');
      expect(secondLegend).toHaveAttribute('aria-selected', 'true');

      const bars = container.querySelectorAll('rect[role="option"]');
      expect(bars[0]).toHaveAttribute('opacity', '0.1');
      expect(bars[1]).toHaveAttribute('opacity', '');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '0.1');
      expect(bars[5]).toHaveAttribute('opacity', '');
      expect(bars[6]).toHaveAttribute('opacity', '');
      expect(bars[7]).toHaveAttribute('opacity', '0.1');
      expect(bars[8]).toHaveAttribute('opacity', '0.1');
      expect(bars[9]).toHaveAttribute('opacity', '');
      expect(bars[10]).toHaveAttribute('opacity', '');
      expect(bars[11]).toHaveAttribute('opacity', '0.1');
    },
  );
});

export const emptyChartPoints = [
  {
    name: 'Empty chart',
    series: [],
  },
];

describe('GroupedVerticalBarChart snapShot testing', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it('renders GroupedVerticalBarChart correctly', async () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders hideLegend correctly', async () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} hideLegend={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', async () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} hideTooltip={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', async () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} enabledLegendsWrapLines={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', async () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} showXAxisLablesTooltip={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', async () => {
    const mockGetComputedTextLength = jest.fn().mockReturnValue(100);

    // Replace the original method with the mock implementation
    Object.defineProperty(
      Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
      'getComputedTextLength',
      {
        value: mockGetComputedTextLength,
      },
    );
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} wrapXAxisLables={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', async () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} yAxisTickFormat={'.1f'} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('GroupedVerticalBarChart - basic props', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} hideLegend={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} />);
    const hideTooltipDom = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} hideTooltip={true} />);
    const hideTooltipDom = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it('No prop changes', () => {
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const { rerender, container } = render(<GroupedVerticalBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<GroupedVerticalBarChart {...props} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).toBe(htmlBefore);
  });

  it('prop changes', () => {
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };

    const props1 = {
      data: dataGVBC,
      height: 200,
      width: 400,
    };

    const { rerender, container } = render(<GroupedVerticalBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<GroupedVerticalBarChart {...props1} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('GroupedVerticalBarChart - mouse events', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it('Should render callout correctly on mouseover', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} calloutProps={{}} />);
    const bars = container.querySelectorAll('rect[role="option"]');
    fireEvent.mouseOver(bars[0]);
    // Wait for any async updates (if needed)
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} />);
    const bars = container.querySelectorAll('rect[role="option"]');
    fireEvent.mouseMove(bars[2]);
    const html1 = container.innerHTML;
    fireEvent.mouseMove(bars[3]);
    const html2 = container.innerHTML;
    expect(html1).not.toBe(html2);
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it('No empty chart aria label div rendered', () => {
    const wrapper = render(<GroupedVerticalBarChart data={chartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    const wrapper = render(<GroupedVerticalBarChart data={emptyChartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});

// Keep new popover interactions after existing snapshots: Tabster initializes shared document state on focus.
describe('GroupedVerticalBarChart custom JSX callout hooks', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it.each(['hover', 'focus'])('receives the original point on %s and updates the custom content', event => {
    const onRenderCalloutPerDataPoint = jest.fn((point?: GVBarChartSeriesPoint) => (
      <div data-testid="custom-point">{point?.data}</div>
    ));
    const { container, rerender } = render(
      <GroupedVerticalBarChart data={chartPoints} onRenderCalloutPerDataPoint={onRenderCalloutPerDataPoint} />,
    );
    expect(onRenderCalloutPerDataPoint).not.toHaveBeenCalled();
    const bars = container.querySelectorAll('rect[role="option"]');
    const show = event === 'hover' ? fireEvent.mouseOver : fireEvent.focus;
    show(bars[0]);
    expect(onRenderCalloutPerDataPoint.mock.calls.slice(-1)[0][0]).toBe(chartPoints[0].series[0]);
    expect(screen.getByTestId('custom-point')).toHaveTextContent('33000');
    expect(container.querySelector('.fui-PopoverSurface')).toHaveTextContent(/^33000$/);
    show(bars[1]);
    expect(onRenderCalloutPerDataPoint.mock.calls.slice(-1)[0][0]).toBe(chartPoints[0].series[1]);
    expect(screen.getByTestId('custom-point')).toHaveTextContent('44000');

    const replacement = jest.fn((point?: GVBarChartSeriesPoint) => <div>replacement {point?.data}</div>);
    rerender(<GroupedVerticalBarChart data={chartPoints} onRenderCalloutPerDataPoint={replacement} />);
    expect(replacement.mock.calls.slice(-1)[0][0]).toBe(chartPoints[0].series[1]);
    expect(screen.getByText('replacement 44000')).toBeInTheDocument();
    fireEvent.mouseLeave(container.querySelector('svg')!);
    expect(container.querySelector('.fui-PopoverSurface')).toBeNull();
  });

  it.each([false, true])('selects the callback matching isCalloutForStack=%s', isCalloutForStack => {
    const pointRender = jest.fn((point?: GVBarChartSeriesPoint) => <div>point {point?.data}</div>);
    const stackRender = jest.fn((group?: GroupedVerticalBarChartData) => <div>stack {group?.name}</div>);
    const { container } = render(
      <GroupedVerticalBarChart
        data={chartPoints}
        isCalloutForStack={isCalloutForStack}
        onRenderCalloutPerDataPoint={pointRender}
        onRenderCalloutPerStack={stackRender}
      />,
    );
    fireEvent.focus(container.querySelector('rect[role="option"]')!);
    if (isCalloutForStack) {
      expect(stackRender.mock.calls.slice(-1)[0][0]).toBe(chartPoints[0]);
      expect(pointRender).not.toHaveBeenCalled();
      expect(container.querySelector('.fui-PopoverSurface')).toHaveTextContent(`stack ${chartPoints[0].name}`);
    } else {
      expect(pointRender.mock.calls.slice(-1)[0][0]).toBe(chartPoints[0].series[0]);
      expect(stackRender).not.toHaveBeenCalled();
    }
  });

  it.each([
    [false, 'hover'],
    [false, 'focus'],
    [true, 'hover'],
    [true, 'focus'],
  ] as const)('does not mount a surface when the selected renderer returns null (stack=%s, %s)', (stack, event) => {
    const renderNull = jest.fn(() => null);
    const { container } = render(
      <GroupedVerticalBarChart
        data={chartPoints}
        isCalloutForStack={stack}
        onRenderCalloutPerDataPoint={renderNull}
        onRenderCalloutPerStack={renderNull}
      />,
    );
    const show = event === 'hover' ? fireEvent.mouseOver : fireEvent.focus;
    show(container.querySelector('rect[role="option"]')!);
    expect(renderNull).toHaveBeenCalled();
    expect(container.querySelector('.fui-PopoverSurface')).toBeNull();
  });

  it.each([
    [false, 'hover'],
    [false, 'focus'],
    [true, 'hover'],
    [true, 'focus'],
  ] as const)(
    'falls back to native content when the selected hook returns undefined (stack=%s, %s)',
    (stack, event) => {
      const renderDefault = jest.fn().mockReturnValue(undefined);
      const { container } = render(
        <GroupedVerticalBarChart
          data={chartPoints}
          isCalloutForStack={stack}
          onRenderCalloutPerDataPoint={renderDefault}
          onRenderCalloutPerStack={renderDefault}
        />,
      );
      const show = event === 'hover' ? fireEvent.mouseOver : fireEvent.focus;
      show(container.querySelector('rect[role="option"]')!);
      expect(renderDefault).toHaveBeenCalled();
      expect(container.querySelector('.fui-PopoverSurface')).toHaveTextContent('33%');
    },
  );

  it('keeps the native default and existing customCallout alias when no matching hook is supplied', () => {
    const props: GroupedVerticalBarChartProps = { data: chartPoints };
    const { container, rerender } = render(<GroupedVerticalBarChart {...props} />);
    fireEvent.focus(container.querySelector('rect[role="option"]')!);
    expect(container.querySelector('.fui-PopoverSurface')).toHaveTextContent('33%');
    rerender(
      <GroupedVerticalBarChart
        {...props}
        calloutProps={{ customCallout: { customizedCallout: <div>legacy custom content</div> } }}
      />,
    );
    expect(screen.getByText('legacy custom content')).toBeInTheDocument();
  });

  it('passes converted dataV2 points without losing source metadata', () => {
    const point = { x: 'group', y: 12, sourceRow: { id: 'native row' } };
    const onRenderCalloutPerDataPoint = jest.fn((data?: GVBarChartSeriesPoint) => <div>custom {data?.data}</div>);
    const { container } = render(
      <GroupedVerticalBarChart
        dataV2={[{ type: 'bar', legend: 'Bar', data: [point] }]}
        onRenderCalloutPerDataPoint={onRenderCalloutPerDataPoint}
      />,
    );
    fireEvent.focus(container.querySelector('rect[role="option"]')!);
    expect(onRenderCalloutPerDataPoint.mock.calls.slice(-1)[0][0]).toMatchObject({
      ...point,
      key: 'Bar',
      legend: 'Bar',
      data: 12,
    });
  });

  it('passes a typed mixed-series group and converted line point on focus', () => {
    const barPoint = { x: 'group', y: 12 };
    const linePoint = { x: 'group', y: 18, sourceRow: { id: 'line row' } };
    const dataV2: GroupedVerticalBarChartProps['dataV2'] = [
      { type: 'bar', legend: 'Bar', data: [barPoint] },
      { type: 'line', legend: 'Line', data: [linePoint] },
    ];
    const stackRender = jest.fn((data?: GroupedVerticalBarChartData) => <div>{data?.series.length} points</div>);
    const pointRender = jest.fn((data?: GVBarChartSeriesPoint) => <div>point {data?.data}</div>);
    const { container, rerender } = render(
      <GroupedVerticalBarChart dataV2={dataV2} isCalloutForStack onRenderCalloutPerStack={stackRender} />,
    );
    fireEvent.focus(container.querySelector('circle[role="option"]')!);
    expect(stackRender.mock.calls.slice(-1)[0][0]).toMatchObject({
      name: 'group',
      series: [
        { legend: 'Bar', data: 12 },
        { legend: 'Line', data: 18, sourceRow: linePoint.sourceRow },
      ],
    });
    rerender(<GroupedVerticalBarChart dataV2={dataV2} onRenderCalloutPerDataPoint={pointRender} />);
    expect(pointRender.mock.calls.slice(-1)[0][0]).toMatchObject({ ...linePoint, legend: 'Line', data: 18 });
  });
});

describe('GroupedVerticalBarChart - category and series names', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it.each([
    { sharedCategory: '__proto__', lineOnlyCategory: 'constructor' },
    { sharedCategory: 'constructor', lineOnlyCategory: '__proto__' },
  ])(
    'preserves dataV2 bars and lines at $sharedCategory and line-only data at $lineOnlyCategory',
    ({ sharedCategory, lineOnlyCategory }) => {
      const { container } = render(
        <GroupedVerticalBarChart
          isCalloutForStack
          dataV2={[
            { type: 'bar', legend: 'groupSeries', data: [{ x: sharedCategory, y: 10 }] },
            {
              type: 'line',
              legend: 'toString',
              data: [
                { x: sharedCategory, y: 20 },
                { x: lineOnlyCategory, y: 30 },
              ],
            },
          ]}
        />,
      );

      const bar = screen.getByRole('option', { name: `${sharedCategory}. groupSeries, 10.` });
      const sharedDot = screen.getByRole('option', { name: `${sharedCategory}. toString, 20.` });
      const lineOnlyDot = screen.getByRole('option', { name: `${lineOnlyCategory}. toString, 30.` });
      expect(container.querySelectorAll('rect[role="option"]')).toHaveLength(1);
      expect(container.querySelectorAll('circle[role="option"]')).toHaveLength(2);
      expect(
        screen.getByRole('listbox', { name: `${lineOnlyCategory}, category 2 of 2, with 0 bars` }),
      ).toBeInTheDocument();

      [bar, sharedDot].forEach(point => {
        fireEvent.focus(point);
        const callout = within(screen.getByRole('group'));
        expect(callout.getByText(sharedCategory)).toBeInTheDocument();
        expect(callout.getByText('groupSeries')).toBeInTheDocument();
        expect(callout.getByText('toString')).toBeInTheDocument();
        expect(callout.getByText('10')).toBeInTheDocument();
        expect(callout.getByText('20')).toBeInTheDocument();
        expect(callout.queryByText('30')).not.toBeInTheDocument();
        fireEvent.blur(point);
      });

      fireEvent.focus(lineOnlyDot);
      const callout = within(screen.getByRole('group'));
      expect(callout.getByText(lineOnlyCategory)).toBeInTheDocument();
      expect(callout.getByText('toString')).toBeInTheDocument();
      expect(callout.getByText('30')).toBeInTheDocument();
      expect(callout.queryByText('groupSeries')).not.toBeInTheDocument();
      expect(callout.queryByText('10')).not.toBeInTheDocument();
      expect(callout.queryByText('20')).not.toBeInTheDocument();
    },
  );

  it.each(['Revenue', ...specialChartNames])(
    'preserves repeated %s bars and sums only their group callout values',
    legend => {
      const data: GroupedVerticalBarChartData[] = [
        {
          name: 'A',
          series: [
            { key: 'first', legend, data: 10 },
            { key: 'second', legend, data: 15 },
            { key: 'other', legend: 'Other', data: 7 },
          ],
        },
        { name: 'B', series: [{ key: 'third', legend, data: 40 }] },
      ];
      const { container } = render(<GroupedVerticalBarChart data={data} isCalloutForStack />);

      expect(container.querySelectorAll('rect[role="option"]')).toHaveLength(4);
      expect(screen.getByRole('option', { name: 'A. Other, 7.' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: `B. ${legend}, 40.` })).toBeInTheDocument();
      [10, 15].forEach(value => {
        const bar = screen.getByRole('option', { name: `A. ${legend}, ${value}.` });
        fireEvent.focus(bar);
        const callout = within(screen.getByRole('group'));
        expect(callout.getByText('A')).toBeInTheDocument();
        expect(callout.getAllByText(legend)).toHaveLength(1);
        expect(callout.getByText('25')).toBeInTheDocument();
        expect(callout.getByText('Other')).toBeInTheDocument();
        expect(callout.getByText('7')).toBeInTheDocument();
        [10, 15, 40].forEach(individualValue => {
          expect(callout.queryByText(String(individualValue))).not.toBeInTheDocument();
        });
        fireEvent.blur(bar);
      });
      expect(data[0].series.map(point => point.data)).toEqual([10, 15, 7]);
      expect(data[1].series[0].data).toBe(40);
    },
  );

  it.each(['data', 'dataV2'] as const)(
    'preserves special categories, legends and fallback colors through %s',
    input => {
      const names = ['Revenue', ...specialChartNames];
      const props =
        input === 'data'
          ? {
              data: names.map((name, index) => ({
                name,
                series: [{ key: name, legend: name, data: index + 1 }],
              })),
            }
          : {
              dataV2: names.map((name, index) => ({
                type: 'bar' as const,
                legend: name,
                data: [{ x: name, y: index + 1 }],
              })),
            };
      const { container } = render(<GroupedVerticalBarChart {...props} />);

      expect(container.querySelectorAll('rect[role="option"]')).toHaveLength(names.length);
      names.forEach((name, index) => {
        expect(screen.getByRole('option', { name: `${name}. ${name}, ${index + 1}.` })).toHaveAttribute(
          'fill',
          getNextColor(index),
        );
      });
    },
  );

  it.each(['constructor', '__proto__', 'toString'])(
    'reuses the first fallback color for repeated %s legends',
    legend => {
      render(
        <GroupedVerticalBarChart
          data={[
            { name: 'A', series: [{ key: 'first', legend, data: 10 }] },
            { name: 'B', series: [{ key: 'second', legend, data: 20 }] },
          ]}
        />,
      );
      expect(screen.getByRole('option', { name: `A. ${legend}, 10.` })).toHaveAttribute('fill', getNextColor(0));
      expect(screen.getByRole('option', { name: `B. ${legend}, 20.` })).toHaveAttribute('fill', getNextColor(0));
    },
  );

  it.each(['constructor', '__proto__', 'toString'])('selects and deselects %s through the chart legend', legend => {
    render(
      <GroupedVerticalBarChart
        data={[
          {
            name: 'A',
            series: [
              { key: 'special', legend, data: 10 },
              { key: 'ordinary', legend: 'Revenue', data: 20 },
            ],
          },
        ]}
      />,
    );
    const legendOption = screen.getByRole('option', { name: legend });
    const otherBar = screen.getByRole('option', { name: 'A. Revenue, 20.' });
    expect(legendOption).toHaveAttribute('aria-selected', 'false');
    fireEvent.click(legendOption);
    expect(legendOption).toHaveAttribute('aria-selected', 'true');
    expect(otherBar).toHaveAttribute('opacity', '0.1');
    fireEvent.click(legendOption);
    expect(legendOption).toHaveAttribute('aria-selected', 'false');
    expect(otherBar).not.toHaveAttribute('opacity', '0.1');
  });
});

describe('GroupedVerticalBarChart custom callouts with special names', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  it('preserves original repeated bar and group identities at a special category and legend', () => {
    const data: GroupedVerticalBarChartData[] = [
      {
        name: '__proto__',
        series: [
          { key: 'first', legend: 'groupSeries', data: 10 },
          { key: 'second', legend: 'groupSeries', data: 15 },
        ],
      },
    ];
    const pointRender = jest.fn((point?: GVBarChartSeriesPoint) => <div>point {point?.data}</div>);
    const stackRender = jest.fn((group?: GroupedVerticalBarChartData) => <div>group {group?.name}</div>);
    const { container, rerender } = render(
      <GroupedVerticalBarChart data={data} onRenderCalloutPerDataPoint={pointRender} />,
    );
    const bars = container.querySelectorAll('rect[role="option"]');
    expect(bars).toHaveLength(2);
    [fireEvent.mouseOver, fireEvent.focus].forEach(show => {
      bars.forEach((bar, index) => {
        show(bar);
        expect(pointRender.mock.calls.slice(-1)[0][0]).toBe(data[0].series[index]);
        expect(container.querySelector('.fui-PopoverSurface')).toHaveTextContent(`point ${data[0].series[index].data}`);
      });
    });

    rerender(<GroupedVerticalBarChart data={data} isCalloutForStack onRenderCalloutPerStack={stackRender} />);
    fireEvent.focus(container.querySelector('rect[role="option"]')!);
    expect(stackRender.mock.calls.slice(-1)[0][0]).toBe(data[0]);
    expect(data[0].series.map(point => point.data)).toEqual([10, 15]);
    expect(data[0].series.every(point => point.color === undefined)).toBe(true);
  });

  it('converts mixed and line-only special categories with aggregated bars and secondary-line metadata', () => {
    const firstBar = { x: '__proto__', y: 10, sourceRow: { id: 'first bar' } };
    const secondBar = { x: '__proto__', y: 15, sourceRow: { id: 'second bar' } };
    const sharedLine = { x: '__proto__', y: 20, sourceRow: { id: 'shared line' } };
    const lineOnly = { x: 'constructor', y: 30, sourceRow: { id: 'line only' }, yAxisCalloutData: '30 units' };
    const stackRender = jest.fn((group?: GroupedVerticalBarChartData) => <div>{group?.series.length} series</div>);
    const { container } = render(
      <GroupedVerticalBarChart
        isCalloutForStack
        dataV2={[
          { type: 'bar', key: 'first', legend: 'groupSeries', data: [firstBar] },
          { type: 'bar', key: 'second', legend: 'groupSeries', data: [secondBar] },
          { type: 'line', legend: 'toString', useSecondaryYScale: true, data: [sharedLine, lineOnly] },
        ]}
        onRenderCalloutPerStack={stackRender}
      />,
    );
    expect(container.querySelectorAll('rect[role="option"]')).toHaveLength(2);
    const dots = container.querySelectorAll('circle[role="option"]');
    expect(dots).toHaveLength(2);
    fireEvent.focus(dots[0]);
    const sharedGroup = stackRender.mock.calls.slice(-1)[0][0];
    expect(sharedGroup).toMatchObject({
      name: '__proto__',
      series: [
        { ...firstBar, key: 'first', legend: 'groupSeries', data: 25 },
        { ...sharedLine, key: 'toString', legend: 'toString', data: 20, useSecondaryYScale: true },
      ],
    });
    expect(sharedGroup?.series).toHaveLength(2);
    fireEvent.focus(dots[1]);
    const lineOnlyGroup = stackRender.mock.calls.slice(-1)[0][0];
    expect(lineOnlyGroup).toMatchObject({
      name: 'constructor',
      series: [{ ...lineOnly, key: 'toString', legend: 'toString', data: 30, useSecondaryYScale: true }],
    });
    expect(lineOnlyGroup?.series).toHaveLength(1);
    expect([firstBar.y, secondBar.y, sharedLine.y, lineOnly.y]).toEqual([10, 15, 20, 30]);
  });

  it('preserves metadata in a converted secondary-line point at a line-only special category', () => {
    const linePoint = {
      x: 'constructor',
      y: 30,
      sourceRow: { id: 'line row' },
      xAxisCalloutData: 'line category',
      yAxisCalloutData: '30 units',
      onClick: jest.fn(),
    };
    const pointRender = jest.fn((point?: GVBarChartSeriesPoint) => <div>line {point?.data}</div>);
    const { container } = render(
      <GroupedVerticalBarChart
        dataV2={[
          { type: 'bar', legend: 'groupSeries', data: [{ x: '__proto__', y: 10 }] },
          { type: 'line', legend: 'toString', useSecondaryYScale: true, data: [linePoint] },
        ]}
        onRenderCalloutPerDataPoint={pointRender}
      />,
    );
    const dot = container.querySelector('circle[role="option"]')!;
    expect(Number.isFinite(Number.parseFloat(dot.getAttribute('cx')!))).toBe(true);
    fireEvent.focus(dot);
    expect(pointRender.mock.calls.slice(-1)[0][0]).toMatchObject({
      ...linePoint,
      key: 'toString',
      legend: 'toString',
      data: 30,
      useSecondaryYScale: true,
    });
    expect(container.querySelector('.fui-PopoverSurface')).toHaveTextContent('line 30');
  });
});
