import * as React from 'react';
import { resetIds } from '../../Utilities';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IChartProps, IChartDataPoint, HorizontalBarChart, HorizontalBarChartVariant } from './index';
import { render, act } from '@testing-library/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

function sharedBeforeEach() {
  resetIds();
}

export const chartPoints: IChartProps[] = [
  {
    chartTitle: 'one',
    chartData: [
      {
        legend: 'one',
        horizontalBarChartdata: { x: 1543, y: 15000 },
        color: DefaultPalette.tealDark,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '94%',
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
        yAxisCalloutData: '19%',
      },
    ],
  },
];
const chartPointsWithBenchMark: IChartProps[] = [
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
describe('HorizontalBarChart snapShot testing', () => {
  beforeEach(() => {
    sharedBeforeEach();
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('Should render absolute-scale variant correctly', () => {
    const { container } = render(
      <HorizontalBarChart data={chartPoints} variant={HorizontalBarChartVariant.AbsoluteScale} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should not render bar labels in absolute-scale variant', () => {
    const { container } = render(
      <HorizontalBarChart data={chartPoints} variant={HorizontalBarChartVariant.AbsoluteScale} hideLabels={true} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render gradients on bars', () => {
    const { container } = render(<HorizontalBarChart data={chartPoints} enableGradient={true} />);
    expect(container).toMatchSnapshot();
  });
  it('Should render rounded corners on bars', () => {
    const { container } = render(<HorizontalBarChart data={chartPoints} roundCorners={true} />);
    expect(container).toMatchSnapshot();
  });
});

describe('HorizontalBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);

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
    const wrapper = render(
      <HorizontalBarChart
        data={chartPoints}
        onRenderCalloutPerHorizontalBar={(props: IChartDataPoint) =>
          props ? (
            <div className="onRenderCalloutPerHorizonalBar">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );
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
  beforeEach(sharedBeforeEach);
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

  it('prop changes', () => {
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hidelabels: false,
    };

    const props1 = {
      data: chartPointsWithBenchMark,
      height: 300,
      width: 600,
      hidelabels: true,
    };
    const { rerender, container } = render(<HorizontalBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<HorizontalBarChart {...props1} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('HorizontalBarChart - mouse events', () => {
  beforeEach(() => {
    sharedBeforeEach();
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('Should render callout correctly on mouseover', async () => {
    const wrapper = render(<HorizontalBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
    // Find the first bar (rect) and fire mouseOver
    const rects = wrapper.container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);
    act(() => {
      rects[2].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    });
    // Wait for callout to appear
    expect(wrapper.container).toMatchSnapshot();
  });

  it('Should render customized callout on mouseover', async () => {
    const { container } = render(
      <HorizontalBarChart
        data={chartPoints}
        calloutProps={{ doNotLayer: true }}
        onRenderCalloutPerHorizontalBar={(props: IChartDataPoint) =>
          props ? (
            <div>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </div>
          ) : null
        }
      />,
    );
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);
    act(() => {
      rects[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    });
    // Wait for the custom callout content to appear
    expect(container).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);

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
