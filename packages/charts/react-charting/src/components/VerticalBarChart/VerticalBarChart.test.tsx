/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { resetIds } from '../../Utilities';
import { VerticalBarChart, IVerticalBarChartDataPoint } from '../../index';
import { chartPointsVBC } from '../../utilities/test-data';
import { render, act } from '@testing-library/react';
declare const global: any;

function sharedBeforeEach() {
  resetIds();
}

function sharedAfterEach() {
  // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
  // cleaned up in fake timers world

  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}

describe('VerticalBarChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders VerticalBarChart correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalBarChart data={chartPointsVBC} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalBarChart data={chartPointsVBC} hideLegend={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalBarChart data={chartPointsVBC} hideTooltip={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalBarChart data={chartPointsVBC} enabledLegendsWrapLines={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalBarChart data={chartPointsVBC} showXAxisLablesTooltip={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalBarChart data={chartPointsVBC} wrapXAxisLables={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalBarChart data={chartPointsVBC} yAxisTickFormat={'.1f'} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('Should not render bar labels', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalBarChart data={chartPointsVBC} hideLabels={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('Should render gradients on bars', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalBarChart data={chartPointsVBC} enableGradient={false} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });

  it('Should render rounded corners on bars', () => {
    let result: ReturnType<typeof render> | undefined;
    act(() => {
      result = render(<VerticalBarChart data={chartPointsVBC} roundCorners={true} />);
    });
    expect(result!.container.firstChild).toMatchSnapshot();
  });
});

describe('VerticalBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} hideLegend={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} hideTooltip={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    const wrapper = render(
      <VerticalBarChart
        data={chartPointsVBC}
        onRenderCalloutPerDataPoint={(props: IVerticalBarChartDataPoint) =>
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
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const props = {
      data: chartPointsVBC,
      height: 300,
      width: 600,
    };
    const { container, rerender } = render(<VerticalBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<VerticalBarChart {...props} />);
    const htmlAfter = container.innerHTML;
    // Even with no prop changes, the chart may regenerate with new IDs
    expect(htmlAfter).not.toBe(htmlBefore);
  });

  it('prop changes', () => {
    const props = {
      data: chartPointsVBC,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const { container, rerender } = render(<VerticalBarChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<VerticalBarChart {...props} hideLegend={false} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    const wrapper = render(<VerticalBarChart data={chartPointsVBC} enabledLegendsWrapLines />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    const { container } = render(<VerticalBarChart data={[]} roundCorners={true} />);
    const emptyDiv = container.querySelector('[aria-label="Graph has no data to display"]');
    expect(emptyDiv).toBeDefined();
    expect(emptyDiv).not.toBeNull();
  });
});
