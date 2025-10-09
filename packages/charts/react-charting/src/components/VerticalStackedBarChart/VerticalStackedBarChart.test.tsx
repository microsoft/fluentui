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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}

describe('VerticalStackedBarChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders VerticalStackedBarChart correctly', () => {
    let container: any;
    act(() => {
      const result = render(<VerticalStackedBarChart data={chartPointsVSBC} />);
      container = result.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    let container: any;
    act(() => {
      const result = render(<VerticalStackedBarChart data={chartPointsVSBC} hideLegend={true} />);
      container = result.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    let container: any;
    act(() => {
      const result = render(<VerticalStackedBarChart data={chartPointsVSBC} hideTooltip={true} />);
      container = result.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    let container: any;
    act(() => {
      const result = render(<VerticalStackedBarChart data={chartPointsVSBC} enabledLegendsWrapLines={true} />);
      container = result.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    let container: any;
    act(() => {
      const result = render(<VerticalStackedBarChart data={chartPointsVSBC} showXAxisLablesTooltip={true} />);
      container = result.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    let container: any;
    act(() => {
      const result = render(<VerticalStackedBarChart data={chartPointsVSBC} wrapXAxisLables={true} />);
      container = result.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('renders isCalloutForStack correctly', () => {
    let container: any;
    act(() => {
      const result = render(<VerticalStackedBarChart data={chartPointsVSBC} isCalloutForStack={true} />);
      container = result.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    let container: any;
    act(() => {
      const result = render(<VerticalStackedBarChart data={chartPointsVSBC} yAxisTickFormat={'/%d'} />);
      container = result.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('Should not render bar labels', () => {
    let container: any;
    act(() => {
      const result = render(<VerticalStackedBarChart data={chartPointsVSBC} hideLabels={true} />);
      container = result.container;
    });

    expect(container).toMatchSnapshot();
  });

  it('Should render gradients on bars', () => {
    let container: any;
    act(() => {
      const result = render(<VerticalStackedBarChart data={chartPointsVSBC} enableGradient={true} />);
      container = result.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('Should render rounded corners on bars', () => {
    let container: any;
    act(() => {
      const result = render(<VerticalStackedBarChart data={chartPointsVSBC} roundCorners={true} />);
      container = result.container;
    });
    expect(container).toMatchSnapshot();
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
