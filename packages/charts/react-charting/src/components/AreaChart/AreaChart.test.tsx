import * as React from 'react';
import { resetIds } from '../../Utilities';
import { AreaChart } from './index';
import { AreaChartBase } from './AreaChart.base';
import { ICustomizedCalloutData, ILineChartPoints } from '../../index';
import { render, act } from '@testing-library/react';

const originalRAF = window.requestAnimationFrame;

function sharedBeforeEach() {
  resetIds();
  jest.useFakeTimers();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
}

function sharedAfterEach() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
  jest.useRealTimers();
  window.requestAnimationFrame = originalRAF;
}

const points: ILineChartPoints[] = [
  {
    legend: 'metaData1',
    data: [
      { x: 20, y: 50 },
      { x: 40, y: 80 },
    ],
    color: 'red',
  },
];
export const chartPoints = {
  chartTitle: 'AreaChart',
  lineChartData: points,
};

const singlePoint = [
  {
    legend: 'metaData1',
    data: [{ x: 20, y: 50 }],
    color: 'red',
  },
];
const singleChartPoint = {
  chartTitle: 'AreaChart',
  lineChartData: singlePoint,
};

const emptyPoint = [
  {
    legend: 'metaData1',
    data: [],
    color: 'red',
  },
];
export const emptyChartPoints = {
  chartTitle: 'EmptyAreaChart',
  lineChartData: emptyPoint,
};

// FIXME - non deterministic snapshots causing master pipeline breaks
describe('AreaChart snapShot testing', () => {
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

  it('renders Areachart correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideLegend correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} hideLegend={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} hideTooltip={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} enabledLegendsWrapLines={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} yAxisTickFormat={'/%d'} />);
    expect(container).toMatchSnapshot();
  });

  it('renders Areachart with single point correctly', async () => {
    const { container } = render(<AreaChart data={singleChartPoint} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render with default colors when line color is not provided', async () => {
    const lineColor = points[0].color;
    delete points[0].color;
    const { container } = render(<AreaChart data={chartPoints} />);
    expect(container).toMatchSnapshot();

    points[0].color = lineColor;
  });

  it('Should not render circles when optimizeLargeData is true', async () => {
    const { container } = render(<AreaChart data={chartPoints} optimizeLargeData />);
    expect(container).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} showXAxisLablesTooltip={true} />);
    expect(container).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', async () => {
    const mockGetComputedTextLength = jest.fn().mockReturnValue(100);

    Object.defineProperty(
      Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
      'getComputedTextLength',
      {
        value: mockGetComputedTextLength,
      },
    );
    const { container } = render(<AreaChart data={chartPoints} wrapXAxisLables={true} />);
    expect(container).toMatchSnapshot();
  });
});

describe('AreaChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true', async () => {
    await act(async () => {
      render(<AreaChart data={chartPoints} hideLegend={true} />);
    });
    const legend = document.body.querySelectorAll('[class^="legendContainer"]');
    expect(legend.length).toBe(0);
  });

  it('Should mount legend when hideLegend false', async () => {
    await act(async () => {
      render(<AreaChart data={chartPoints} />);
    });
    const legend = document.body.querySelectorAll('[class^="legendContainer"]');
    expect(legend.length).toBeDefined();
  });

  it('Should mount callout when hideTooltip false', async () => {
    await act(async () => {
      render(<AreaChart data={chartPoints} />);
    });
    const callout = document.body.querySelectorAll('[class^="ms-Layer"]');
    expect(callout.length).toBeDefined();
  });

  it('Should not mount callout when hideTooltip true', async () => {
    await act(async () => {
      render(<AreaChart data={chartPoints} hideTooltip={true} />);
    });
    const callout = document.body.querySelectorAll('[class^="ms-Layer"]');
    expect(callout.length).toBe(0);
  });

  it('Should render onRenderCalloutPerStack', async () => {
    await act(async () => {
      render(
        <AreaChart
          data={chartPoints}
          onRenderCalloutPerStack={(props: ICustomizedCalloutData) =>
            props ? (
              <div className="onRenderCalloutPerStack">
                <p>Custom Callout Content</p>
              </div>
            ) : null
          }
        />,
      );
    });
    const customCallout = document.body.getElementsByClassName('onRenderCalloutPerStack');
    expect(customCallout.length).toBeDefined();
  });

  it('Should not render onRenderCalloutPerStack', async () => {
    await act(async () => {
      render(<AreaChart data={chartPoints} />);
    });
    const customCallout = document.body.getElementsByClassName('onRenderCalloutPerStack');
    expect(customCallout.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint', async () => {
    await act(async () => {
      render(
        <AreaChart
          data={chartPoints}
          onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
            props ? (
              <div className="onRenderCalloutPerDataPoint">
                <p>Custom Callout Content</p>
              </div>
            ) : null
          }
        />,
      );
    });
    const customCallout = document.body.getElementsByClassName('onRenderCalloutPerDataPoint');
    expect(customCallout.length).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint', async () => {
    await act(async () => {
      render(<AreaChart data={chartPoints} />);
    });
    const customCallout = document.body.getElementsByClassName('onRenderCalloutPerDataPoint');
    expect(customCallout.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(() => {
    resetIds();
    jest.clearAllMocks();
  });

  it('No prop changes', () => {
    const renderMock = jest.spyOn(AreaChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    act(() => {
      render(<AreaChart {...props} />);
      render(<AreaChart {...props} />);
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(AreaChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    act(() => {
      const { rerender, unmount } = render(<AreaChart {...props} />);
      rerender(<AreaChart {...props} hideTooltip={true} />);
      unmount();
    });
    renderMock.mockRestore();
  });
});

describe('AreaChart - mouse events', () => {
  let root: HTMLDivElement | null;

  beforeEach(() => {
    sharedBeforeEach();

    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    sharedAfterEach();

    if (root) {
      document.body.removeChild(root);
      root = null;
    }
  });

  it.skip('Should render callout correctly on mouseover', async () => {
    await act(async () => {
      render(<AreaChart data={chartPoints} calloutProps={{ doNotLayer: true }} />, { container: root! });
    });
    const rect = document.body.querySelector('rect');
    expect(rect).toBeTruthy();
    if (rect) {
      act(() => {
        rect.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      });
    }
    expect(document.body).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', async () => {
    await act(async () => {
      render(<AreaChart data={chartPoints} calloutProps={{ doNotLayer: true }} />, { container: root! });
    });
    const rect = document.body.querySelector('rect');
    expect(rect).toBeTruthy();
    let html1 = '';
    let html2 = '';
    if (rect) {
      act(() => {
        rect.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 40, clientY: 0 }));
      });
      html1 = document.body.innerHTML;
      act(() => {
        rect.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: -20, clientY: 0 }));
      });
      html2 = document.body.innerHTML;
    }
    expect(html1).not.toBe(html2);
  });

  it.skip('Should render customized callout on mouseover', async () => {
    await act(async () => {
      render(
        <AreaChart
          data={chartPoints}
          calloutProps={{ doNotLayer: true }}
          onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
            props ? (
              <div>
                <pre>{JSON.stringify(props, null, 2)}</pre>
              </div>
            ) : null
          }
        />,
        { container: root! },
      );
    });
    const rect = document.body.querySelector('rect');
    expect(rect).toBeTruthy();
    if (rect) {
      act(() => {
        rect.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      });
    }
    expect(document.body).toMatchSnapshot();
  });

  it.skip('Should render customized callout per stack on mouseover', async () => {
    await act(async () => {
      render(
        <AreaChart
          data={chartPoints}
          calloutProps={{ doNotLayer: true }}
          onRenderCalloutPerStack={(props: ICustomizedCalloutData) =>
            props ? (
              <div>
                <pre>{JSON.stringify(props, null, 2)}</pre>
              </div>
            ) : null
          }
        />,
        { container: root! },
      );
    });
    const rect = document.body.querySelector('rect');
    expect(rect).toBeTruthy();
    if (rect) {
      act(() => {
        rect.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      });
    }
    expect(document.body).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', async () => {
    await act(async () => {
      render(<AreaChart data={chartPoints} />);
    });
    const renderedDOM = document.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM.length).toBe(0);
  });
  it('Empty chart aria label div rendered', async () => {
    await act(async () => {
      render(<AreaChart data={emptyChartPoints} />);
    });
    const renderedDOM = document.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM.length).toBe(1);
  });
});
