jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import { mount, ReactWrapper } from 'enzyme';
import { ILineChartPoints, ILineChartProps, LineChart } from './index';
import { ILineChartState, LineChartBase } from './LineChart.base';
import { ICustomizedCalloutData } from '../../index';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';

// Wrapper of the LineChart to be tested.
let wrapper: ReactWrapper<ILineChartProps, ILineChartState, LineChartBase> | undefined;
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
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }

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
  chartTitle: 'LineChart',
  lineChartData: points,
};

export const emptyChartPoints = {
  chartTitle: 'EmptyLineChart',
  lineChartData: [],
};

describe('LineChart snapShot testing', () => {
  beforeEach(() => {
    resetIds();
  });
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }

    // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
    // cleaned up in fake timers world
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((global.setTimeout as any).mock) {
      jest.useRealTimers();
    }
  });
  // @FIXME: this tests is failing with jest 29.7.0
  it.skip('renders LineChart correctly', async () => {
    await act(async () => {
      wrapper = mount(<LineChart data={chartPoints} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  // @FIXME: this tests is failing with jest 29.7.0
  it.skip('renders hideLegend correctly', async () => {
    await act(async () => {
      wrapper = mount(<LineChart data={chartPoints} hideLegend={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  // @FIXME: this tests is failing with jest 29.7.0
  it.skip('renders hideTooltip correctly', async () => {
    await act(async () => {
      wrapper = mount(<LineChart data={chartPoints} hideTooltip={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  // @FIXME: this tests is failing with jest 29.7.0
  it.skip('renders enabledLegendsWrapLines correctly', async () => {
    await act(async () => {
      wrapper = mount(<LineChart data={chartPoints} enabledLegendsWrapLines={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  // @FIXME: this tests is failing with jest 29.7.0
  it.skip('renders showXAxisLablesTooltip correctly', async () => {
    await act(async () => {
      wrapper = mount(<LineChart data={chartPoints} showXAxisLablesTooltip={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    if (wrapper) {
      const tree = toJson(wrapper, { mode: 'deep' });
      expect(tree).toMatchSnapshot();
    }
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

    await act(async () => {
      wrapper = mount(<LineChart data={chartPoints} wrapXAxisLables={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper!.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  // @FIXME: this tests is failing with jest 29.7.0
  it.skip('renders yAxisTickFormat correctly', async () => {
    await act(async () => {
      wrapper = mount(<LineChart data={chartPoints} yAxisTickFormat={'/%d'} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  // @FIXME: this tests is failing with jest 29.7.0
  it.skip('Should render with default colors when line color is not provided', async () => {
    const lineColor = points[0].color;
    delete points[0].color;
    await act(async () => {
      wrapper = mount(<LineChart data={chartPoints} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();

    points[0].color = lineColor;
  });
});

describe('LineChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    act(() => {
      wrapper = mount(<LineChart data={chartPoints} hideLegend={true} />);
      wrapper.update();
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    act(() => {
      wrapper = mount(<LineChart data={chartPoints} hideLegend={false} />);
      wrapper.update();
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    act(() => {
      wrapper = mount(<LineChart data={chartPoints} />);
      wrapper.update();
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    act(() => {
      wrapper = mount(<LineChart data={chartPoints} hideTooltip={true} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(() => {
    resetIds();
  });

  it('No prop changes', () => {
    const renderMock = jest.spyOn(LineChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    act(() => {
      const component = mount(<LineChart {...props} />);
      component.setProps({ ...props });
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(LineChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    act(() => {
      const component = mount(<LineChart {...props} />);
      component.setProps({ ...props, hideTooltip: true });
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('LineChart - mouse events', () => {
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

  // @FIXME: this tests is failing with jest 29.7.0
  it.skip('Should render callout correctly on mouseover', () => {
    act(() => {
      // document.getElementbyId() returns null if component is not attached to DOM
      wrapper = mount(<LineChart data={chartPoints} calloutProps={{ doNotLayer: true }} />, { attachTo: root });
      wrapper.find('line[id^="lineID"]').at(0).simulate('mouseover');
    });
    // Direct DOM changes like toggling visibility attr of verticalLine dont seem to update enzyme wrapper here
    // but these changes are visible in wrapper.html()
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', () => {
    act(() => {
      wrapper = mount(<LineChart data={chartPoints} calloutProps={{ doNotLayer: true }} />, { attachTo: root });
      wrapper.find('path[id^="circle"]').at(0).simulate('mousemove');
      const html1 = wrapper.html();
      wrapper.find('path[id^="circle"]').at(1).simulate('mousemove');
      const html2 = wrapper.html();
      expect(html1).not.toBe(html2);
    });
  });

  // @FIXME: this tests is failing with jest 29.7.0
  it.skip('Should render customized callout on mouseover', () => {
    act(() => {
      wrapper = mount(
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
        { attachTo: root },
      );
      wrapper.find('line[id^="lineID"]').at(0).simulate('mouseover');
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  // @FIXME: this tests is failing with jest 29.7.0
  it.skip('Should render customized callout per stack on mouseover', () => {
    act(() => {
      wrapper = mount(
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
        { attachTo: root },
      );
      wrapper.find('line[id^="lineID"]').at(0).simulate('mouseover');
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(() => {
    resetIds();
  });

  it('No empty chart aria label div rendered', () => {
    act(() => {
      wrapper = mount(<LineChart data={chartPoints} />);
    });
    const renderedDOM = wrapper!.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    act(() => {
      wrapper = mount(<LineChart data={emptyChartPoints} />);
    });
    const renderedDOM = wrapper!.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(1);
  });
});
