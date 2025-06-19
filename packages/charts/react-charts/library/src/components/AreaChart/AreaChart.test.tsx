/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as React from 'react';
import { AreaChart, CustomizedCalloutData, LineChartPoints } from './index';
import { getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

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

const chart1Points = [
  {
    x: 20,
    y: 9,
  },
  {
    x: 25,
    y: 14,
  },
  {
    x: 30,
    y: 14,
  },
  {
    x: 35,
    y: 23,
  },
  {
    x: 40,
    y: 20,
  },
  {
    x: 45,
    y: 31,
  },
  {
    x: 50,
    y: 29,
  },
  {
    x: 55,
    y: 27,
  },
  {
    x: 60,
    y: 37,
  },
  {
    x: 65,
    y: 51,
  },
];

const chart2Points = [
  {
    x: 20,
    y: 21,
  },
  {
    x: 25,
    y: 25,
  },
  {
    x: 30,
    y: 10,
  },
  {
    x: 35,
    y: 10,
  },
  {
    x: 40,
    y: 14,
  },
  {
    x: 45,
    y: 18,
  },
  {
    x: 50,
    y: 9,
  },
  {
    x: 55,
    y: 23,
  },
  {
    x: 60,
    y: 7,
  },
  {
    x: 65,
    y: 55,
  },
];

const chart3Points = [
  {
    x: 20,
    y: 30,
  },
  {
    x: 25,
    y: 35,
  },
  {
    x: 30,
    y: 33,
  },
  {
    x: 35,
    y: 40,
  },
  {
    x: 40,
    y: 10,
  },
  {
    x: 45,
    y: 40,
  },
  {
    x: 50,
    y: 34,
  },
  {
    x: 55,
    y: 40,
  },
  {
    x: 60,
    y: 60,
  },
  {
    x: 65,
    y: 40,
  },
];

const chartPoints = [
  {
    legend: 'legend1',
    data: chart1Points,
    color: 'green',
  },
  {
    legend: 'legend2',
    data: chart2Points,
    color: 'yellow',
  },
  {
    legend: 'legend3',
    data: chart3Points,
    color: 'blue',
  },
];

const chartData = {
  chartTitle: 'Area chart multiple example',
  lineChartData: chartPoints,
};

const chart1PointsWithDate = [
  {
    x: new Date('01/06/2018'),
    y: 5,
  },
  {
    x: new Date('01/08/2018'),
    y: 16,
  },
  {
    x: new Date('01/16/2018'),
    y: 6,
  },
  {
    x: new Date('02/06/2018'),
    y: 30,
  },
  {
    x: new Date('02/16/2018'),
    y: 10,
  },
];

const chart2PointsWithDate = [
  {
    x: new Date('01/06/2018'),
    y: 10,
  },
  {
    x: new Date('01/08/2018'),
    y: 33,
  },
  {
    x: new Date('01/16/2018'),
    y: 21,
  },
  {
    x: new Date('02/06/2018'),
    y: 44,
  },
  {
    x: new Date('02/16/2018'),
    y: 22,
  },
];

const chartPointsWithDate = [
  {
    legend: 'legend1',
    data: chart1PointsWithDate,
    color: '#0099BC',
    opacity: 0.7,
    lineOptions: {
      strokeWidth: 2,
      strokeDasharray: '5 5',
    },
  },
  {
    legend: 'legend2',
    data: chart2PointsWithDate,
    color: '#77004D',
    opacity: 0.8,
    lineOptions: {
      strokeWidth: 5,
      stroke: '#002050',
    },
  },
];

const negativeChart1Points = [
  {
    x: 20,
    y: -9,
  },
  {
    x: 25,
    y: -14,
  },
  {
    x: 30,
    y: -14,
  },
  {
    x: 35,
    y: -23,
  },
  {
    x: 40,
    y: -20,
  },
  {
    x: 45,
    y: -31,
  },
  {
    x: 50,
    y: -29,
  },
  {
    x: 55,
    y: -27,
  },
  {
    x: 60,
    y: -37,
  },
  {
    x: 65,
    y: -51,
  },
];

const negativeChart2Points = [
  {
    x: 20,
    y: -21,
  },
  {
    x: 25,
    y: -25,
  },
  {
    x: 30,
    y: -10,
  },
  {
    x: 35,
    y: -10,
  },
  {
    x: 40,
    y: -14,
  },
  {
    x: 45,
    y: -18,
  },
  {
    x: 50,
    y: -9,
  },
  {
    x: 55,
    y: -23,
  },
  {
    x: 60,
    y: -7,
  },
  {
    x: 65,
    y: -55,
  },
];

const negativeChart3Points = [
  {
    x: 20,
    y: -30,
  },
  {
    x: 25,
    y: -35,
  },
  {
    x: 30,
    y: -33,
  },
  {
    x: 35,
    y: -40,
  },
  {
    x: 40,
    y: -10,
  },
  {
    x: 45,
    y: -40,
  },
  {
    x: 50,
    y: -34,
  },
  {
    x: 55,
    y: -40,
  },
  {
    x: 60,
    y: -60,
  },
  {
    x: 65,
    y: -40,
  },
];

const negativeChartPoints = [
  {
    legend: 'legend1',
    data: negativeChart1Points,
    color: 'green',
  },
  {
    legend: 'legend2',
    data: negativeChart2Points,
    color: 'yellow',
  },
  {
    legend: 'legend3',
    data: negativeChart3Points,
    color: 'blue',
  },
];

const negativeChartData = {
  chartTitle: 'Area chart multiple negative y value example',
  lineChartData: negativeChartPoints,
};

const chartDataWithDates = {
  chartTitle: 'Area chart styled example',
  lineChartData: chartPointsWithDate,
  pointOptions: { r: 10, strokeWidth: 3, opacity: 1, stroke: '#002050' },
  pointLineOptions: { strokeWidth: 2, strokeDasharray: '10 10', stroke: '#002050' },
};

const secondaryYScalePoints = [{ yMaxValue: 50000, yMinValue: 10000 }];

describe('Area chart rendering', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait(
    'Should render the area chart with numeric x-axis data',
    AreaChart,
    { data: chartData },
    container => {
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render the Area chart with secondary Y axis',
    AreaChart,
    { data: chartData, secondaryYScaleOptions: secondaryYScalePoints },
    container => {
      // Assert
      expect(getById(container, /yAxisGElementSecondarychart_/i)).toBeDefined();
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render the Area Chart with negative y values',
    AreaChart,
    { data: negativeChartData, supportNegativeData: true },
    container => {
      //Asset
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render the Area Chart with tozeroy mode',
    AreaChart,
    { data: chartData, mode: 'tozeroy' },
    container => {
      //Asset
      expect(container).toMatchSnapshot();
    },
  );
});

describe.skip('Area chart rendering with date x-axis data', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithoutWait(
    `Should render the area chart with date x-axis data`,
    AreaChart,
    { data: chartDataWithDates },
    container => {
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Area chart - Subcomponent Area', () => {
  testWithoutWait('Should render the Areas with the specified colors', AreaChart, { data: chartData }, container => {
    const areas = getById(container, /graph-areaChart/i);
    // Assert
    expect(areas[0].getAttribute('fill')).toEqual('green');
    expect(areas[1].getAttribute('fill')).toEqual('yellow');
    expect(areas[2].getAttribute('fill')).toEqual('blue');
  });
});

describe('Area chart - Subcomponent legend', () => {
  testWithoutWait(
    'Should highlight the corresponding Area on mouse over on legends',
    AreaChart,
    { data: chartData },
    container => {
      const legend = screen.queryByText('legend1');
      expect(legend).toBeDefined();
      fireEvent.mouseOver(legend!);
      // Assert
      const areas = getById(container, /graph-areaChart/i);
      expect(areas[0].getAttribute('fill-opacity')).toEqual('0.7');
      expect(areas[1].getAttribute('fill-opacity')).toEqual('0.1');
      expect(areas[2].getAttribute('fill-opacity')).toEqual('0.1');
    },
  );

  testWithoutWait(
    'Should reduce opacity of the other lines in Area chat and opacity should be zero for selected Area',
    AreaChart,
    { data: chartData },
    container => {
      const legend = screen.queryByText('legend1');
      expect(legend).toBeDefined();
      fireEvent.mouseOver(legend!);
      // Assert
      const areaLines = getById(container, /line-areaChart/i);
      expect(areaLines[0].getAttribute('opacity')).toEqual('0');
      expect(areaLines[1].getAttribute('opacity')).toEqual('0.1');
      expect(areaLines[2].getAttribute('opacity')).toEqual('0.1');
    },
  );

  testWithoutWait(
    'Should highlight the corresponding Legend on mouse over on legends',
    AreaChart,
    { data: chartData },
    container => {
      const legend1 = screen.queryByText('legend1');
      expect(legend1).toBeDefined();
      fireEvent.mouseOver(legend1!);
      // Assert
      expect(screen.queryByText('legend2')).toHaveStyle('opacity: 0.67');
    },
  );

  testWithoutWait(
    'Should select legend on single mouse click on legends',
    AreaChart,
    { data: chartData, hideLegend: false },
    container => {
      const legend = screen.queryByText('legend1');
      expect(legend).toBeDefined();
      fireEvent.click(legend!);
      // Assert
      expect(getById(container, /graph-areaChart/i)[1]).toHaveAttribute('fill-opacity', '0.1');
      const firstLegend = screen.queryByText('legend1')?.closest('button');
      expect(firstLegend).toHaveAttribute('aria-selected', 'true');
    },
  );

  testWithoutWait(
    'Should deselect legend on double mouse click on legends',
    AreaChart,
    { data: chartData, hideLegend: false },
    container => {
      const legend = screen.queryByText('legend1');
      expect(legend).toBeDefined();

      //single click on first legend
      fireEvent.click(legend!);
      expect(getById(container, /graph-areaChart/i)[1]).toHaveAttribute('fill-opacity', '0.1');
      const firstLegend = screen.queryByText('legend1')?.closest('button');
      expect(firstLegend).toHaveAttribute('aria-selected', 'true');
      // double click on same first legend
      fireEvent.click(legend!);
      // Assert
      expect(firstLegend).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithoutWait(
    'Should select multiple legends on single mouse click on legends',
    AreaChart,
    { data: chartData, legendProps: { canSelectMultipleLegends: true } },
    container => {
      const legend1 = screen.queryByText('legend1')?.closest('button');
      expect(legend1).toBeDefined();
      const legend2 = screen.queryByText('legend2')?.closest('button');
      expect(legend2).toBeDefined();

      fireEvent.click(legend1!);
      fireEvent.click(legend2!);

      // Assert
      expect(legend1).toHaveAttribute('aria-selected', 'true');
      expect(legend2).toHaveAttribute('aria-selected', 'true');
      expect(getById(container, /graph-areaChart/i)[0]).toHaveAttribute('fill-opacity', '0.7');
      expect(getById(container, /graph-areaChart/i)[1]).toHaveAttribute('fill-opacity', '0.7');
      expect(getById(container, /graph-areaChart/i)[2]).toHaveAttribute('fill-opacity', '0.1');
    },
  );
});

describe('Screen resolution', () => {
  beforeEach(updateChartWidthAndHeight);
  afterEach(sharedAfterEach);

  testWithWait(
    'Should remain unchanged on zoom in',
    AreaChart,
    { data: chartData, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
      // Arrange
      global.innerWidth = window.innerWidth / 2;
      global.innerHeight = window.innerHeight / 2;
      act(() => {
        global.dispatchEvent(new Event('resize'));
      });
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithWait(
    'Should remain unchanged on zoom out',
    AreaChart,
    { data: chartData, rotateXAxisLables: true, width: 300, height: 300 },
    container => {
      // Arrange
      global.innerWidth = window.innerWidth * 2;
      global.innerHeight = window.innerHeight * 2;
      act(() => {
        global.dispatchEvent(new Event('resize'));
      });
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('AreaChart - Accessibility tests', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<AreaChart data={chartData} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});

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

const points: LineChartPoints[] = [
  {
    legend: 'metaData1',
    data: [
      { x: 20, y: 50 },
      { x: 40, y: 80 },
    ],
    color: 'red',
  },
];

describe('AreaChart snapShot testing', () => {
  it('renders Areachart correctly', async () => {
    let wrapper = render(<AreaChart data={chartData} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders hideLegend correctly', async () => {
    let wrapper = render(<AreaChart data={chartData} hideLegend={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', async () => {
    let wrapper = render(<AreaChart data={chartData} hideTooltip={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', async () => {
    let wrapper = render(<AreaChart data={chartData} enabledLegendsWrapLines={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', async () => {
    let wrapper = render(<AreaChart data={chartData} yAxisTickFormat={'/%d'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Areachart with single point correctly', async () => {
    let wrapper = render(<AreaChart data={singleChartPoint} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render with default colors when line color is not provided', async () => {
    const lineColor = points[0].color;
    delete points[0].color;
    let wrapper = render(<AreaChart data={{ chartTitle: 'AreaChart', lineChartData: chartPoints }} />);
    expect(wrapper).toMatchSnapshot();
    points[0].color = lineColor;
  });

  it('Should not render circles when optimizeLargeData is true', async () => {
    let wrapper = render(<AreaChart data={chartData} optimizeLargeData />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', async () => {
    let wrapper = render(<AreaChart data={chartData} showXAxisLablesTooltip={true} />);
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
    let wrapper = render(<AreaChart data={chartData} wrapXAxisLables={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('AreaChart - basic props', () => {
  it('Should not mount legend when hideLegend true ', () => {
    let wrapper = render(<AreaChart data={chartData} hideLegend={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    let wrapper = render(<AreaChart data={chartData} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });
  it('Should mount callout when hideTootip false ', () => {
    let wrapper = render(<AreaChart data={chartData} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });
  it('Should not mount callout when hideTootip true ', () => {
    let wrapper = render(<AreaChart data={chartData} hideTooltip={true} />);
    const hideLegendDOM = wrapper!.container.querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should render onRenderCalloutPerStack ', () => {
    let wrapper = render(
      <AreaChart
        data={chartData}
        onRenderCalloutPerStack={(props: CustomizedCalloutData) =>
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
    let wrapper = render(<AreaChart data={chartData} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    let wrapper = render(
      <AreaChart
        data={chartData}
        onRenderCalloutPerDataPoint={(props: CustomizedCalloutData) =>
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
    let wrapper = render(<AreaChart data={chartData} />);
    const renderedDOM = wrapper!.container.getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const props = {
      data: { chartTitle: 'AreaChart', lineChartData: chartPoints },
      height: 300,
      width: 600,
    };
    const { rerender, container } = render(<AreaChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<AreaChart {...props} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).toBe(htmlBefore);
  });

  it('prop changes', () => {
    const props = {
      data: { chartTitle: 'AreaChart', lineChartData: chartPoints },
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const { rerender, container } = render(<AreaChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<AreaChart {...props} hideLegend={false} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('AreaChart - mouse events', () => {
  it('Should render callout correctly on mouseover', () => {
    let wrapper = render(<AreaChart data={chartData} />);
    const bars = wrapper.container.querySelectorAll('rect');
    fireEvent.mouseOver(bars[0]);
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('Should render callout correctly on mousemove', () => {
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

    let wrapper = render(<AreaChart data={chartData} />);
    const bars = wrapper.container.querySelectorAll('rect');
    fireEvent.mouseMove(bars[0], { clientX: 40, clientY: 0 });
    const html1 = wrapper.container.innerHTML;
    fireEvent.mouseMove(bars[0], { clientX: -80, clientY: 0 });
    const html2 = wrapper.container.innerHTML;
    expect(html1).not.toBe(html2);
  });

  it('Should render customized callout on mouseover', () => {
    let wrapper = render(
      <AreaChart
        data={chartData}
        onRenderCalloutPerDataPoint={(props: CustomizedCalloutData) =>
          props ? (
            <div>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </div>
          ) : null
        }
      />,
    );

    const bars = wrapper.container.querySelectorAll('rect');
    fireEvent.mouseOver(bars[0]);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render customized callout per stack on mouseover', () => {
    let wrapper = render(
      <AreaChart
        data={chartData}
        onRenderCalloutPerStack={(props: CustomizedCalloutData) =>
          props ? (
            <div>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </div>
          ) : null
        }
      />,
    );
    const bars = wrapper.container.querySelectorAll('rect');
    fireEvent.mouseOver(bars[0]);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    let wrapper = render(<AreaChart data={chartData} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    let wrapper = render(<AreaChart data={emptyChartPoints} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(1);
  });
});
