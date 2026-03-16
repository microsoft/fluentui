/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { resetIds } from '../../Utilities';
import { IVSChartDataPoint, VerticalStackedBarChart, IVerticalStackedChartProps } from '../../index';
import { chartPointsVSBC, emptychartPointsVSBC } from '../../utilities/test-data';
import { render, act } from '@testing-library/react';

function sharedBeforeEach() {
  resetIds();
}

function sharedAfterEach() {
  // cleaned up in fake timers world

  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}

describe('VerticalStackedBarChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders VerticalStackedBarChart correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalStackedBarChart data={chartPointsVSBC} hideLegend={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalStackedBarChart data={chartPointsVSBC} hideTooltip={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalStackedBarChart data={chartPointsVSBC} enabledLegendsWrapLines={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalStackedBarChart data={chartPointsVSBC} showXAxisLablesTooltip={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalStackedBarChart data={chartPointsVSBC} wrapXAxisLables={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders isCalloutForStack correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalStackedBarChart data={chartPointsVSBC} isCalloutForStack={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalStackedBarChart data={chartPointsVSBC} yAxisTickFormat={'.1f'} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('Should not render bar labels', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalStackedBarChart data={chartPointsVSBC} hideLabels={true} />);
    });

    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('Should render gradients on bars', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalStackedBarChart data={chartPointsVSBC} enableGradient={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('Should render rounded corners on bars', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalStackedBarChart data={chartPointsVSBC} roundCorners={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });
});

describe('VerticalStackedBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not render legend when hideLegend true ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} hideLegend={true} />);
    const hideLegendDOM = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should render legend when hideLegend false ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const hideLegendDOM = wrapper.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should render callout when hideTootip false ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const hideTooltipDom = wrapper.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom).toBeDefined();
  });

  it('Should not render callout when hideTootip true ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} hideTooltip={true} />);
    const hideTooltipDom = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should render onRenderCalloutPerStack ', () => {
    const wrapper = render(
      <VerticalStackedBarChart
        data={chartPointsVSBC}
        onRenderCalloutPerStack={(props: IVerticalStackedChartProps) =>
          props ? (
            <div className="onRenderCalloutPerStack">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );

    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    const wrapper = render(
      <VerticalStackedBarChart
        data={chartPointsVSBC}
        onRenderCalloutPerDataPoint={(props: IVSChartDataPoint) =>
          props ? (
            <div className="onRenderCalloutPerDataPoint">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const props = {
      data: chartPointsVSBC,
      height: 300,
      width: 600,
    };
    const { container, rerender } = render(<VerticalStackedBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<VerticalStackedBarChart {...props} />);
    const htmlAfter = container.innerHTML;
    // Even with no prop changes, the chart may regenerate with new IDs
    expect(htmlAfter).not.toBe(htmlBefore);
  });

  it('prop changes', () => {
    const props = {
      data: chartPointsVSBC,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const { container, rerender } = render(<VerticalStackedBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<VerticalStackedBarChart {...props} hideLegend={false} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);
  it('No empty chart aria label div rendered', () => {
    const wrapper = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    const { container } = render(<VerticalStackedBarChart data={emptychartPointsVSBC} />);
    const emptyDiv = container.querySelector('[aria-label="Graph has no data to display"]');
    expect(emptyDiv).toBeDefined();
    expect(emptyDiv).not.toBeNull();
  });

  test('should render empty chart div when data array is empty', () => {
    const { container } = render(<VerticalStackedBarChart data={[]} roundCorners={true} />);
    const emptyDiv = container.querySelector('[aria-label="Graph has no data to display"]');
    expect(emptyDiv).toBeDefined();
    expect(emptyDiv).not.toBeNull();
  });
});
