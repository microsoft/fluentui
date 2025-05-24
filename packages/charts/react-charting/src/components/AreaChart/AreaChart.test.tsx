jest.mock('react-dom');
import * as React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { resetIds } from '../../Utilities';
import { AreaChart } from './index';
import { IAreaChartState, AreaChartBase } from './AreaChart.base';
import { ICustomizedCalloutData, ILineChartPoints } from '../../index';
import { getById, getByClass, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

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
  // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
  // cleaned up in fake timers world
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
describe.skip('AreaChart snapShot testing', () => {
  beforeEach(() => {
    resetIds();
  });
  afterEach(sharedAfterEach);

  test('renders Areachart correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} />);
    expect(container).toMatchSnapshot();
  });

  test('renders hideLegend correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} hideLegend={true} />);
    expect(container).toMatchSnapshot();
  });

  test('renders hideTooltip correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} hideTooltip={true} />);
    expect(container).toMatchSnapshot();
  });

  test('renders enabledLegendsWrapLines correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} enabledLegendsWrapLines={true} />);
    expect(container).toMatchSnapshot();
  });

  test('renders yAxisTickFormat correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} yAxisTickFormat={'/%d'} />);
    expect(container).toMatchSnapshot();
  });

  test('renders Areachart with single point correctly', async () => {
    const { container } = render(<AreaChart data={singleChartPoint} />);
    expect(container).toMatchSnapshot();
  });

  test('Should render with default colors when line color is not provided', async () => {
    const lineColor = points[0].color;
    delete points[0].color;

    const { container } = render(<AreaChart data={chartPoints} />);
    expect(container).toMatchSnapshot();

    points[0].color = lineColor;
  });

  test('Should not render circles when optimizeLargeData is true', async () => {
    const { container } = render(<AreaChart data={chartPoints} optimizeLargeData />);
    expect(container).toMatchSnapshot();
  });

  test('renders showXAxisLablesTooltip correctly', async () => {
    const { container } = render(<AreaChart data={chartPoints} showXAxisLablesTooltip={true} />);
    expect(container).toMatchSnapshot();
  });

  test('renders wrapXAxisLables correctly', async () => {
    const mockGetComputedTextLength = jest.fn().mockReturnValue(100);

    // Replace the original method with the mock implementation
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

  test('Should not mount legend when hideLegend true', () => {
    const { container } = render(<AreaChart data={chartPoints} hideLegend={true} />);
    const hideLegendDOM = container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  test('Should mount legend when hideLegend false', () => {
    const { container } = render(<AreaChart data={chartPoints} />);
    const hideLegendDOM = container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  test('Should mount callout when hideTootip false', () => {
    const { container } = render(<AreaChart data={chartPoints} />);
    const hideLegendDOM = container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  test('Should not mount callout when hideTootip true', () => {
    const { container } = render(<AreaChart data={chartPoints} hideTooltip={true} />);
    const hideLegendDOM = container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  test('Should render onRenderCalloutPerStack', () => {
    const { container } = render(
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
    const renderedDOM = container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM).toBeDefined();
  });

  test('Should not render onRenderCalloutPerStack', () => {
    const { container } = render(<AreaChart data={chartPoints} />);
    const renderedDOM = container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  test('Should render onRenderCalloutPerDataPoint', () => {
    const { container } = render(
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
    const renderedDOM = container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  test('Should not render onRenderCalloutPerDataPoint', () => {
    const { container } = render(<AreaChart data={chartPoints} />);
    const renderedDOM = container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(() => {
    resetIds();
  });

  test('No prop changes', () => {
    const renderMock = jest.spyOn(AreaChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };

    const { rerender } = render(<AreaChart {...props} />);
    rerender(<AreaChart {...props} />);

    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  test('prop changes', () => {
    const renderMock = jest.spyOn(AreaChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hideLegend: true,
    };

    const { rerender } = render(<AreaChart {...props} />);
    rerender(<AreaChart {...props} hideTooltip={true} />);

    renderMock.mockRestore();
  });
});

describe('AreaChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  testWithWait(
    'Should render callout correctly on mouseover',
    AreaChart,
    { data: chartPoints, calloutProps: { doNotLayer: true } },
    container => {
      const areas = getById(container, /graph-areaChart/i);
      fireEvent.mouseOver(areas[0]);
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );

  testWithWait(
    'Should render callout correctly on mousemove',
    AreaChart,
    { data: chartPoints, calloutProps: { doNotLayer: true } },
    container => {
      const areas = getById(container, /graph-areaChart/i);
      fireEvent.mouseMove(areas[0], { clientX: 40, clientY: 0 });
      const firstCalloutPosition = getById(container, /toolTipcallout/i)[0].style.left;

      fireEvent.mouseMove(areas[0], { clientX: -20, clientY: 0 });
      const secondCalloutPosition = getById(container, /toolTipcallout/i)[0].style.left;

      expect(firstCalloutPosition).not.toBe(secondCalloutPosition);
    },
  );

  testWithWait(
    'Should render customized callout on mouseover',
    AreaChart,
    {
      data: chartPoints,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerDataPoint: (props: ICustomizedCalloutData) =>
        props ? (
          <div>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </div>
        ) : null,
    },
    container => {
      const areas = getById(container, /graph-areaChart/i);
      fireEvent.mouseOver(areas[0]);
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );

  testWithWait(
    'Should render customized callout per stack on mouseover',
    AreaChart,
    {
      data: chartPoints,
      calloutProps: { doNotLayer: true },
      onRenderCalloutPerStack: (props: ICustomizedCalloutData) =>
        props ? (
          <div>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </div>
        ) : null,
    },
    container => {
      const areas = getById(container, /graph-areaChart/i);
      fireEvent.mouseOver(areas[0]);
      expect(getById(container, /toolTipcallout/i)).toBeDefined();
    },
  );
});

describe('Render empty chart aria label div when chart is empty', () => {
  test('No empty chart aria label div rendered', () => {
    const { container } = render(<AreaChart data={chartPoints} />);
    const renderedDOM = container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  test('Empty chart aria label div rendered', () => {
    const { container } = render(<AreaChart data={emptyChartPoints} />);
    const renderedDOM = container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});

describe('AreaChart - Accessibility tests', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<AreaChart data={chartPoints} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
