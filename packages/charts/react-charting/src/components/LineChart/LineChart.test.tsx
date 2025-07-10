import * as React from 'react';
import { resetIds } from '../../Utilities';
import { render, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ILineChartPoints, LineChart } from './index';
import { LineChartBase } from './LineChart.base';
import { ICustomizedCalloutData } from '../../index';
import { fireEvent } from '@testing-library/react';

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
  chartTitle: 'LineChart',
  lineChartData: points,
};

export const emptyChartPoints = {
  chartTitle: 'EmptyLineChart',
  lineChartData: [],
};

describe.skip('LineChart snapShot testing', () => {
  beforeEach(() => {
    resetIds();
  });

  // @FIXME: this tests is failing with jest 29.7.0
  it('renders LineChart correctly', async () => {
    const { container } = render(<LineChart data={chartPoints} />);
    await waitFor(() => expect(container).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it.skip('renders hideLegend correctly', async () => {
    const { container } = render(<LineChart data={chartPoints} hideLegend={true} />);
    await waitFor(() => expect(container).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', async () => {
    const { container } = render(<LineChart data={chartPoints} hideTooltip={true} />);
    await waitFor(() => expect(container).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', async () => {
    const { container } = render(<LineChart data={chartPoints} enabledLegendsWrapLines={true} />);
    await waitFor(() => expect(container).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', async () => {
    const { container } = render(<LineChart data={chartPoints} showXAxisLablesTooltip={true} />);
    await waitFor(() => expect(container).toBeInTheDocument());
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
    const { container } = render(<LineChart data={chartPoints} wrapXAxisLables={true} />);
    await waitFor(() => expect(container).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', async () => {
    const { container } = render(<LineChart data={chartPoints} yAxisTickFormat={'/%d'} />);
    await waitFor(() => expect(container).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it('Should render with default colors when line color is not provided', async () => {
    const lineColor = points[0].color;
    delete points[0].color;
    const { container } = render(<LineChart data={chartPoints} />);
    await waitFor(() => expect(container).toBeInTheDocument());
    expect(container).toMatchSnapshot();
    points[0].color = lineColor;
  });
});

describe('LineChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    const { container } = render(<LineChart data={chartPoints} hideLegend={true} />);
    expect(container.querySelectorAll('[class^="legendContainer"]').length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    const { container } = render(<LineChart data={chartPoints} hideLegend={false} />);
    expect(container.querySelectorAll('[class^="legendContainer"]').length).toBeGreaterThan(0);
  });

  it('Should mount callout when hideTootip false ', () => {
    const { container } = render(<LineChart data={chartPoints} />);
    expect(container.querySelectorAll('[class^="ms-Layer"]')).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    const { container } = render(<LineChart data={chartPoints} hideTooltip={true} />);
    expect(container.querySelectorAll('[class^="ms-Layer"]').length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(() => {
    resetIds();
  });

  it('No prop changes', async () => {
    const renderMock = jest.spyOn(LineChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const { rerender } = render(<LineChart {...props} />);
    await act(async () => {
      rerender(<LineChart {...props} />);
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', async () => {
    const renderMock = jest.spyOn(LineChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const { rerender } = render(<LineChart {...props} />);
    await act(async () => {
      rerender(<LineChart {...props} hideTooltip={true} />);
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('LineChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  // FIXME: this tests is failing react 18 - added proper act wrapping which trigger huge snapshot diff
  it.skip('Should render callout correctly on mouseover', async () => {
    const { container } = render(<LineChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
    // Find the line element and fire mouseover
    const line = container.querySelector('line[id^="lineID"]');
    if (line) {
      await act(async () => {
        await userEvent.hover(line);
      });
    }
    expect(container).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', async () => {
    const { container } = render(<LineChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
    const circles = container.querySelectorAll('path[id^="circle"]');
    if (circles.length > 1) {
      // Simulate mouse move using fireEvent
      await act(async () => {
        fireEvent.mouseMove(circles[0]);
      });
      const html1 = container.innerHTML;
      await act(async () => {
        fireEvent.mouseMove(circles[1]);
      });
      const html2 = container.innerHTML;
      expect(html1).not.toBe(html2);
    }
  });

  it('Should render customized callout on mouseover', async () => {
    const { container } = render(
      <LineChart
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
    );
    const line = container.querySelector('line[id^="lineID"]');
    if (line) {
      await act(async () => {
        await userEvent.hover(line);
      });
    }
    expect(container).toMatchSnapshot();
  });

  it('Should render customized callout per stack on mouseover', async () => {
    const { container } = render(
      <LineChart
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
    );
    const line = container.querySelector('line[id^="lineID"]');
    if (line) {
      await act(async () => {
        await userEvent.hover(line);
      });
    }
    expect(container).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(() => {
    resetIds();
  });

  it('No empty chart aria label div rendered', () => {
    const { container } = render(<LineChart data={chartPoints} />);
    expect(container.querySelectorAll('[aria-label="Graph has no data to display"]').length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    const { container } = render(<LineChart data={emptyChartPoints} />);
    expect(container.querySelectorAll('[aria-label="Graph has no data to display"]').length).toBe(1);
  });
});
