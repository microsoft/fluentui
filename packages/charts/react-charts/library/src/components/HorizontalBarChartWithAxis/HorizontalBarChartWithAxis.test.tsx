import { screen, fireEvent } from '@testing-library/react';
import { getByClass, getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { HorizontalBarChartWithAxis } from './HorizontalBarChartWithAxis';
import { toHaveNoViolations } from 'jest-axe';
import { HorizontalBarChartWithAxisDataPoint } from '../../HorizontalBarChart';
import { render } from '@testing-library/react';
import * as React from 'react';
expect.extend(toHaveNoViolations);

const pointsForWrapLabels = [
  {
    y: 'String One',
    x: 1000,
    color: '#0078d4',
  },
  {
    y: 'String Two',
    x: 5000,
    color: '#00bcf2',
  },
  {
    y: 'String Three',
    x: 3000,
    color: '#00188f',
  },
  {
    y: 'String Four',
    x: 2000,
    color: '#002050',
  },
];

const chartPointsHBCWA: HorizontalBarChartWithAxisDataPoint[] = [
  {
    x: 10000,
    y: 5000,
    legend: 'Oranges',
    color: '#0078d4',
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '10%',
  },
  {
    x: 20000,
    y: 50000,
    legend: 'Grapes',
    color: '#00bcf2',
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: '#00188f',
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '37%',
  },

  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: '#002050',
    yAxisCalloutData: '2020/04/30',
    xAxisCalloutData: '88%',
  },
];

const stackedChartPointsHBCWA: HorizontalBarChartWithAxisDataPoint[] = [
  {
    x: 10000,
    y: 'Q1',
    legend: 'Product A',
    color: '#0078d4',
    xAxisCalloutData: '10K',
    yAxisCalloutData: 'Q1',
  },
  {
    x: -5000,
    y: 'Q1',
    legend: 'Product B',
    color: '#ff8c00',
    xAxisCalloutData: '-5K',
    yAxisCalloutData: 'Q1',
  },
  {
    x: 8000,
    y: 'Q1',
    legend: 'Product C',
    color: '#107c10',
    xAxisCalloutData: '8K',
    yAxisCalloutData: 'Q1',
  },

  {
    x: -7000,
    y: 'Q2',
    legend: 'Product A',
    color: '#0078d4',
    xAxisCalloutData: '-7K',
    yAxisCalloutData: 'Q2',
  },
  {
    x: 12000,
    y: 'Q2',
    legend: 'Product B',
    color: '#ff8c00',
    xAxisCalloutData: '12K',
    yAxisCalloutData: 'Q2',
  },
  {
    x: 3000,
    y: 'Q2',
    legend: 'Product C',
    color: '#107c10',
    xAxisCalloutData: '3K',
    yAxisCalloutData: 'Q2',
  },

  {
    x: 15000,
    y: 'Q3',
    legend: 'Product A',
    color: '#0078d4',
    xAxisCalloutData: '15K',
    yAxisCalloutData: 'Q3',
  },
  {
    x: -4000,
    y: 'Q3',
    legend: 'Product B',
    color: '#ff8c00',
    xAxisCalloutData: '-4K',
    yAxisCalloutData: 'Q3',
  },
  {
    x: 5000,
    y: 'Q3',
    legend: 'Product C',
    color: '#107c10',
    xAxisCalloutData: '5K',
    yAxisCalloutData: 'Q3',
  },
];

const chartPointsWithStringYAxisHBCWA: HorizontalBarChartWithAxisDataPoint[] = [
  {
    y: 'String One',
    x: 1000,
    color: '#0078d4',
  },
  {
    y: 'String Two',
    x: 5000,
    color: '#00bcf2',
  },
  {
    y: 'String Three',
    x: 3000,
    color: '#00188f',
  },
  {
    y: 'String Four',
    x: 2000,
    color: '#002050',
  },
];

export const chartPointsWithAxisToolTipHBCWA: HorizontalBarChartWithAxisDataPoint[] = [
  {
    x: 1000,
    y: 1000,
    color: '#0078d4',
  },
  {
    x: 2000,
    y: 5000,
    color: '#00bcf2',
  },
  {
    x: 3000,
    y: 3000,
    color: '#00188f',
  },
  {
    x: 4000,
    y: 2000,
    color: '#002050',
  },
];

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

describe('Horizontal bar chart with axis rendering', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should render the Horizontal bar chart with axis with numaric yaxis data',
    HorizontalBarChartWithAxis,
    { data: chartPointsHBCWA },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render the Horizontal bar chart with axis with string yaxis data',
    HorizontalBarChartWithAxis,
    { data: chartPointsWithStringYAxisHBCWA },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Horizontal bar chart with axis - Subcomponent bar', () => {
  testWithWait(
    'Should render the bars with the specified colors',
    HorizontalBarChartWithAxis,
    { data: chartPointsHBCWA },
    container => {
      // colors mentioned in the data points itself
      // Assert
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(4);
      expect(bars[0].getAttribute('fill')).toEqual('#0078d4');
      expect(bars[1].getAttribute('fill')).toEqual('#002050');
      expect(bars[2].getAttribute('fill')).toEqual('#00188f');
      expect(bars[3].getAttribute('fill')).toEqual('#00bcf2');
    },
  );

  testWithWait(
    'Should render the bars with the single color',
    HorizontalBarChartWithAxis,
    { data: chartPointsHBCWA, useSingleColor: true },
    container => {
      // colors mentioned in the data points itself
      // Assert
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(4);
      expect(bars[0].getAttribute('fill')).toEqual('#e3008c');
      expect(bars[1].getAttribute('fill')).toEqual('#e3008c');
      expect(bars[2].getAttribute('fill')).toEqual('#e3008c');
      expect(bars[3].getAttribute('fill')).toEqual('#e3008c');
    },
  );

  testWithWait(
    'Should render the bar with the given height',
    HorizontalBarChartWithAxis,
    { data: chartPointsHBCWA, barHeight: 50 },
    container => {
      // Assert
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      expect(bars).toHaveLength(4);
      expect(bars[0].getAttribute('height')).toEqual('50');
      expect(bars[1].getAttribute('height')).toEqual('50');
      expect(bars[2].getAttribute('height')).toEqual('50');
      expect(bars[3].getAttribute('height')).toEqual('50');
    },
  );
});

describe('Horizontal bar chart with axis- Subcomponent Legends', () => {
  testWithoutWait(
    'Should not show any rendered legends when hideLegend is true',
    HorizontalBarChartWithAxis,
    { data: chartPointsHBCWA, hideLegend: true },
    container => {
      // Assert
      // Legends have 'rect' as a part of their classname
      expect(getByClass(container, /legend/i)).toHaveLength(0);
    },
  );

  testWithWait(
    'Should select legend on single mouse click on legends',
    HorizontalBarChartWithAxis,
    { data: chartPointsHBCWA },
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
    HorizontalBarChartWithAxis,
    { data: chartPointsHBCWA },
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

  testWithoutWait(
    'Should select multiple legends on multiple mouse click on legends',
    HorizontalBarChartWithAxis,
    { data: chartPointsHBCWA, legendProps: { canSelectMultipleLegends: true } },
    container => {
      // const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      const legend1 = screen.getByText('Grapes')?.closest('button');
      const legend2 = screen.getByText('Apples')?.closest('button');

      expect(legend1).toBeDefined();
      expect(legend2).toBeDefined();

      fireEvent.click(legend1!);
      fireEvent.click(legend2!);
      const legendsAfterClickEvent = screen.getAllByText(
        (content, element) => element!.tagName.toLowerCase() === 'button',
      );
      // Assert
      expect(legendsAfterClickEvent[0]).toHaveAttribute('aria-selected', 'false');
      expect(legendsAfterClickEvent[1]).toHaveAttribute('aria-selected', 'true');
      expect(legendsAfterClickEvent[2]).toHaveAttribute('aria-selected', 'true');
      expect(legendsAfterClickEvent[3]).toHaveAttribute('aria-selected', 'false');
    },
  );
});

describe('Horizontal bar chart with axis - Subcomponent Labels', () => {
  testWithWait(
    'Should render the bars with labels hidden',
    HorizontalBarChartWithAxis,
    { data: chartPointsHBCWA, hideLabels: true },
    container => {
      // Assert
      expect(getByClass(container, /barLabel/i)).toHaveLength(0);
    },
  );

  testWithWait(
    'Should reduce the opacity of the other bars on mouse over a bar legend',
    HorizontalBarChartWithAxis,
    { data: chartPointsHBCWA },
    async container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.mouseOver(legends[0]);
      await new Promise(resolve => setTimeout(resolve));
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(bars).toHaveLength(4);
      expect(bars[0]).toHaveAttribute('opacity', '1');
      expect(bars[1]).toHaveAttribute('opacity', '0.1');
      expect(bars[2]).toHaveAttribute('opacity', '0.1');
      expect(bars[3]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithWait(
    'Should reset the opacity of the bars on mouse leave a bar legend',
    HorizontalBarChartWithAxis,
    { data: chartPointsHBCWA },
    async container => {
      // Arrange
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      fireEvent.mouseOver(legends![0]);
      await new Promise(resolve => setTimeout(resolve));
      fireEvent.mouseLeave(legends![0]);
      await new Promise(resolve => setTimeout(resolve));
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      // Assert
      expect(bars[0]).toHaveAttribute('opacity', '1');
      expect(bars[1]).toHaveAttribute('opacity', '1');
      expect(bars[2]).toHaveAttribute('opacity', '1');
      expect(bars[3]).toHaveAttribute('opacity', '1');
    },
  );

  testWithWait(
    'Should show the callout with axis tooltip data',
    HorizontalBarChartWithAxis,
    { data: chartPointsWithAxisToolTipHBCWA, calloutProps: { doNotLayer: true } },
    async container => {
      // Arrange
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.mouseOver(bars[0]);
      await new Promise(resolve => setTimeout(resolve));
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(getByClass(container, /calloutDateTimeContainer/i)).toBeDefined();
      const xAxisCallOutData = getByClass(container, /calloutContentX/i);
      expect(xAxisCallOutData).toBeDefined();
      expect(xAxisCallOutData[0].textContent).toEqual('1000 ');
      const yAxisCallOutData = getByClass(container, /calloutContentY/i);
      expect(yAxisCallOutData).toBeDefined();
      expect(yAxisCallOutData[0].textContent).toEqual('1000');
    },
  );

  testWithWait(
    'Should show the callout with string yaxis tooltip data',
    HorizontalBarChartWithAxis,
    { data: chartPointsWithStringYAxisHBCWA, calloutProps: { doNotLayer: true } },
    async container => {
      // Arrange
      const bars = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.mouseOver(bars[0]);
      await new Promise(resolve => setTimeout(resolve));
      // Assert
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
      expect(getByClass(container, /calloutDateTimeContainer/i)).toBeDefined();
      const xAxisCallOutData = getByClass(container, /calloutContentX/i);
      expect(xAxisCallOutData).toBeDefined();
      expect(xAxisCallOutData[0].textContent).toEqual('String One ');
      const yAxisCallOutData = getByClass(container, /calloutContentY/i);
      expect(yAxisCallOutData).toBeDefined();
      expect(yAxisCallOutData[0].textContent).toEqual('1000');
    },
  );
});

describe('HorizontalBarChartWithAxis snapShot testing', () => {
  it('renders HorizontalBarChartWithAxis correctly', () => {
    let component = render(<HorizontalBarChartWithAxis data={chartPointsHBCWA} />);
    expect(component).toMatchSnapshot();
  });

  it('renders Stacked HorizontalBarChartWithAxis correctly', () => {
    let component = render(<HorizontalBarChartWithAxis data={stackedChartPointsHBCWA} />);
    expect(component).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    let component = render(<HorizontalBarChartWithAxis data={chartPointsHBCWA} hideLegend={true} />);
    expect(component).toMatchSnapshot();
  });

  it('renders showToolTipForYAxisLabels correctly', () => {
    let component = render(<HorizontalBarChartWithAxis data={pointsForWrapLabels} showYAxisLablesTooltip={true} />);
    expect(component).toMatchSnapshot();
  });

  it('renders showYAxisLables correctly', () => {
    let component = render(
      <HorizontalBarChartWithAxis data={pointsForWrapLabels} showYAxisLables={true} showYAxisLablesTooltip={false} />,
    );
    expect(component).toMatchSnapshot();
  });

  it('Should render gradients on bars', () => {
    const component = render(<HorizontalBarChartWithAxis data={chartPointsHBCWA} enableGradient={true} />);
    expect(component).toMatchSnapshot();
  });
  it('Should render rounded corners on bars', () => {
    const component = render(<HorizontalBarChartWithAxis data={chartPointsHBCWA} roundCorners={true} />);
    expect(component).toMatchSnapshot();
  });
});

describe('HorizontalBarChartWithAxis - basic props', () => {
  it('Should not mount legend when hideLegend true ', () => {
    let wrapper = render(<HorizontalBarChartWithAxis data={chartPointsHBCWA} hideLegend={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    let wrapper = render(<HorizontalBarChartWithAxis data={chartPointsHBCWA} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    let wrapper = render(<HorizontalBarChartWithAxis data={chartPointsHBCWA} />);
    const calloutDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(calloutDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    let wrapper = render(<HorizontalBarChartWithAxis data={chartPointsHBCWA} hideTooltip={true} />);
    const calloutDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(calloutDOM!.length).toBe(0);
  });
});

describe.skip('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const props = {
      data: chartPointsHBCWA,
      height: 300,
      width: 600,
    };
    const { rerender, container } = render(<HorizontalBarChartWithAxis {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<HorizontalBarChartWithAxis {...props} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).toBe(htmlBefore);
  });

  it('prop changes', () => {
    const props = {
      data: chartPointsHBCWA,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const { rerender, container } = render(<HorizontalBarChartWithAxis {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<HorizontalBarChartWithAxis {...props} hideLegend={false} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});
