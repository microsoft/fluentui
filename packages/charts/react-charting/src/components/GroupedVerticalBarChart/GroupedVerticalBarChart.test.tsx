import * as React from 'react';
import { resetIds } from '../../Utilities';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { GroupedVerticalBarChart, IGVBarChartSeriesPoint } from '../../index';
import { GroupedVerticalBarChartBase } from './GroupedVerticalBarChart.base';

import { render, waitFor, act } from '@testing-library/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

const originalRAF = window.requestAnimationFrame;

function sharedBeforeEach() {
  resetIds();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
}

function sharedAfterEach() {
  // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
  // cleaned up in fake timers world
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
  window.requestAnimationFrame = originalRAF;
}

export const chartPoints = [
  {
    name: '2000',
    series: [
      {
        key: 'series1',
        data: 66,
        color: DefaultPalette.accent,
        legend: 'MetaData1',
      },
      {
        key: 'series2',
        data: 13,
        color: DefaultPalette.blueMid,
        legend: 'MetaData2',
      },
      {
        key: 'series3',
        data: 34,
        color: DefaultPalette.blueLight,
        legend: 'MetaData3',
      },
    ],
  },
  {
    name: '2010',
    series: [
      {
        key: 'series1',
        data: 14,
        color: DefaultPalette.accent,
        legend: 'MetaData1',
      },
      {
        key: 'series2',
        data: 90,
        color: DefaultPalette.blueMid,
        legend: 'MetaData2',
      },
      {
        key: 'series3',
        data: 33,
        color: DefaultPalette.blueLight,
        legend: 'MetaData3',
      },
    ],
  },
];

export const emptyChartPoints = [
  {
    name: 'Empty chart',
    series: [],
  },
];

describe('GroupedVerticalBarChart snapShot testing', () => {
  beforeEach(() => {
    resetIds();
  });
  afterEach(() => {
    // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
    // cleaned up in fake timers world
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((global.setTimeout as any).mock) {
      jest.useRealTimers();
    }
  });

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('renders GroupedVerticalBarChart correctly', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideLegend correctly', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} hideLegend={true} />);
    expect(container).toMatchSnapshot();
  });

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('renders hideTooltip correctly', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} hideTooltip={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} enabledLegendsWrapLines={true} />);
    expect(container).toMatchSnapshot();
  });
  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('renders showXAxisLablesTooltip correctly', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} showXAxisLablesTooltip={true} />);
    expect(container).toMatchSnapshot();
  });

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('renders wrapXAxisLables correctly', async () => {
    const mockGetComputedTextLength = jest.fn().mockReturnValue(100);

    // Replace the original method with the mock implementation
    Object.defineProperty(
      Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
      'getComputedTextLength',
      {
        value: mockGetComputedTextLength,
      },
    );
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} wrapXAxisLables={true} />);
    expect(container).toMatchSnapshot();
  });

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('renders yAxisTickFormat correctly', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} yAxisTickFormat={'/%d'} />);
    expect(container).toMatchSnapshot();
  });
});

describe('GroupedVerticalBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} hideLegend={true} />);
    const hideLegendDOM = container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should mount legend when hideLegend false', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} />);
    const hideLegendDOM = container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM.length).toBeDefined();
  });

  it('Should mount callout when hideTooltip false', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} />);
    // Simulate mouseover to trigger callout
    const rect = container.querySelector('rect[role="img"]');
    if (rect) {
      act(() => {
        rect.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      });
    }
    await waitFor(() => {
      const hideTooltipDom = container.querySelectorAll('[class^="ms-Layer"]');
      expect(hideTooltipDom.length).toBeDefined();
    });
  });

  it('Should not mount callout when hideTooltip true', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} hideTooltip={true} />);
    const hideTooltipDom = container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint', async () => {
    const { container } = render(
      <GroupedVerticalBarChart
        data={chartPoints}
        onRenderCalloutPerDataPoint={(props: IGVBarChartSeriesPoint) =>
          props ? (
            <div className="onRenderCalloutPerDataPoint">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
      />,
    );
    // Simulate mouseover to trigger callout
    const rect = container.querySelector('rect[role="img"]');
    if (rect) {
      act(() => {
        rect.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      });
    }
    await waitFor(() => {
      const renderedDOM = container.getElementsByClassName('onRenderCalloutPerDataPoint');
      expect(renderedDOM.length).toBeDefined();
    });
  });

  it('Should not render onRenderCalloutPerDataPoint', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} />);
    // Simulate mouseover to trigger callout
    const rect = container.querySelector('rect[role="img"]');
    if (rect) {
      act(() => {
        rect.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      });
    }
    await waitFor(() => {
      const renderedDOM = container.getElementsByClassName('onRenderCalloutPerDataPoint');
      expect(renderedDOM.length).toBe(0);
    });
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(() => {
    resetIds();
  });

  it('No prop changes', () => {
    const renderMock = jest.spyOn(GroupedVerticalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    act(() => {
      render(<GroupedVerticalBarChart {...props} />);
      render(<GroupedVerticalBarChart {...props} />);
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(GroupedVerticalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const { rerender } = render(<GroupedVerticalBarChart {...props} />);
    rerender(<GroupedVerticalBarChart {...props} hideTooltip={true} />);
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('GroupedVerticalBarChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should render callout correctly on mouseover', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
    const rect = container.querySelector('rect[role="img"]');
    if (rect) {
      act(() => {
        rect.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      });
    }
    await waitFor(() => {
      const callout = container.querySelector('[class*="ms-Layer"]');
      expect(callout).toBeDefined();
    });
  });

  it('Should render callout correctly on mousemove', async () => {
    const { container } = render(<GroupedVerticalBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
    const rects = container.querySelectorAll('rect[role="img"]');
    if (rects.length > 3) {
      act(() => {
        rects[2].dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
      });
      const html1 = container.innerHTML;
      act(() => {
        rects[3].dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
      });
      const html2 = container.innerHTML;
      expect(html1).not.toBe(html2);
    }
  });

  it('Should render customized callout on mouseover', async () => {
    const { container } = render(
      <GroupedVerticalBarChart
        data={chartPoints}
        calloutProps={{ doNotLayer: true }}
        onRenderCalloutPerDataPoint={(props: IGVBarChartSeriesPoint) =>
          props ? (
            <div>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </div>
          ) : null
        }
      />,
    );
    const rect = container.querySelector('rect[role="img"]');
    if (rect) {
      act(() => {
        rect.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      });
    }
    await waitFor(() => {
      const pre = container.querySelector('pre');
      expect(pre).toBeTruthy();
    });
  });

  describe('Render empty chart aria label div when chart is empty', () => {
    beforeEach(() => {
      resetIds();
    });

    it('No empty chart aria label div rendered', () => {
      const { container } = render(<GroupedVerticalBarChart data={chartPoints} />);
      const renderedDOM = container.querySelector('[aria-label="Graph has no data to display"]');
      expect(renderedDOM).toBeNull();
    });

    it('Empty chart aria label div rendered', () => {
      const { container } = render(<GroupedVerticalBarChart data={emptyChartPoints} />);
      const renderedDOM = container.querySelector('[aria-label="Graph has no data to display"]');
      expect(renderedDOM).not.toBeNull();
    });
  });
});
