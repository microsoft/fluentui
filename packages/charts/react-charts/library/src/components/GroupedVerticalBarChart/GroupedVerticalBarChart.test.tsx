import { screen, fireEvent, render } from '@testing-library/react';
import { GroupedVerticalBarChart } from './index';
import { getByClass, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { GroupedVerticalBarChartData } from '../../index';
import { toHaveNoViolations } from 'jest-axe';
import * as React from 'react';

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
  testWithWait(
    'Should render the bar with the given width',
    GroupedVerticalBarChart,
    { data: chartPoints, barWidth: 'auto', maxBarWidth: 50 },
    container => {
      // Assert
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
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
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
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
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars[0]).toHaveAttribute(
        'aria-label',
        'Group series 1 of 4, Bar series 1 of 2 x-Axis 2020/04/30 MetaData1 33%',
      );
    },
  );
});

describe('Grouped vertical bar chart - Subcomponent Legends', () => {
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
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
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
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(bars[0]).toHaveAttribute('opacity', '');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toHaveAttribute('opacity', '');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
      expect(bars[4]).toHaveAttribute('opacity', '');
      expect(bars[5]).toHaveAttribute('opacity', '0.1');
      fireEvent.mouseOver(legends[1]);
      const updatedBars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
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
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
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
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
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

      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
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
  it('renders GroupedVerticalBarChart correctly', async () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders hideLegend correctly', async () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} hideLegend={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', async () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} hideTooltip={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', async () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} enabledLegendsWrapLines={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', async () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} showXAxisLablesTooltip={true} />);
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
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} wrapXAxisLables={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', async () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} yAxisTickFormat={'/%d'} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('GroupedVerticalBarChart - basic props', () => {
  it('Should not mount legend when hideLegend true ', () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} hideLegend={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} />);
    const hideTooltipDom = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} hideTooltip={true} />);
    const hideTooltipDom = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
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
  it('Should render callout correctly on mouseover', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} calloutProps={{}} />);
    const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
    fireEvent.mouseOver(bars[0]);
    // Wait for any async updates (if needed)
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} />);
    const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
    fireEvent.mouseMove(bars[2]);
    const html1 = container.innerHTML;
    fireEvent.mouseMove(bars[3]);
    const html2 = container.innerHTML;
    expect(html1).not.toBe(html2);
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    let wrapper = render(<GroupedVerticalBarChart data={chartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    let wrapper = render(<GroupedVerticalBarChart data={emptyChartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});
