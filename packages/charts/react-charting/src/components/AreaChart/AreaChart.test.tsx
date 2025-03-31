jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import { mount, ReactWrapper } from 'enzyme';
import { IAreaChartProps, AreaChart } from './index';
import { IAreaChartState, AreaChartBase } from './AreaChart.base';
import { ICustomizedCalloutData, ILineChartPoints } from '../../index';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';

// Wrapper of the AreaChart to be tested.
let wrapper: ReactWrapper<IAreaChartProps, IAreaChartState, AreaChartBase> | undefined;
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

  it('renders Areachart correctly', async () => {
    await act(async () => {
      wrapper = mount(<AreaChart data={chartPoints} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
  it('renders hideLegend correctly', async () => {
    await act(async () => {
      wrapper = mount(<AreaChart data={chartPoints} hideLegend={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', async () => {
    await act(async () => {
      wrapper = mount(<AreaChart data={chartPoints} hideTooltip={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', async () => {
    await act(async () => {
      wrapper = mount(<AreaChart data={chartPoints} enabledLegendsWrapLines={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
  it('renders yAxisTickFormat correctly', async () => {
    await act(async () => {
      wrapper = mount(<AreaChart data={chartPoints} yAxisTickFormat={'/%d'} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('renders Areachart with single point correctly', async () => {
    await act(async () => {
      wrapper = mount(<AreaChart data={singleChartPoint} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render with default colors when line color is not provided', async () => {
    const lineColor = points[0].color;
    delete points[0].color;

    await act(async () => {
      wrapper = mount(<AreaChart data={chartPoints} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });

    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();

    points[0].color = lineColor;
  });

  it('Should not render circles when optimizeLargeData is true', async () => {
    await act(async () => {
      wrapper = mount(<AreaChart data={chartPoints} optimizeLargeData />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', async () => {
    await act(async () => {
      wrapper = mount(<AreaChart data={chartPoints} showXAxisLablesTooltip={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    if (wrapper) {
      const tree = toJson(wrapper, { mode: 'deep' });
      expect(tree).toMatchSnapshot();
    }
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
    await act(async () => {
      wrapper = mount(<AreaChart data={chartPoints} wrapXAxisLables={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});

describe('AreaChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    act(() => {
      wrapper = mount(<AreaChart data={chartPoints} hideLegend={true} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    act(() => {
      wrapper = mount(<AreaChart data={chartPoints} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });
  it('Should mount callout when hideTootip false ', () => {
    act(() => {
      wrapper = mount(<AreaChart data={chartPoints} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });
  it('Should not mount callout when hideTootip true ', () => {
    act(() => {
      wrapper = mount(<AreaChart data={chartPoints} hideTooltip={true} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should render onRenderCalloutPerStack ', () => {
    act(() => {
      wrapper = mount(
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
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM).toBeDefined();
  });
  it('Should not render onRenderCalloutPerStack ', () => {
    act(() => {
      wrapper = mount(<AreaChart data={chartPoints} />);
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    act(() => {
      wrapper = mount(
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
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    act(() => {
      wrapper = mount(<AreaChart data={chartPoints} />);
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(() => {
    resetIds();
  });
  it('No prop changes', () => {
    const renderMock = jest.spyOn(AreaChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    act(() => {
      const component = mount(<AreaChart {...props} />);
      component.setProps({ ...props });
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
      const component = mount(<AreaChart {...props} />);
      component.setProps({ ...props, hideTooltip: true });
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

  it('Should render callout correctly on mouseover', () => {
    act(() => {
      wrapper = mount(<AreaChart data={chartPoints} calloutProps={{ doNotLayer: true }} />, { attachTo: root });
    });
    wrapper!.find('rect').simulate('mouseover');
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', () => {
    act(() => {
      wrapper = mount(<AreaChart data={chartPoints} calloutProps={{ doNotLayer: true }} />, { attachTo: root });
    });
    wrapper!.find('rect').simulate('mousemove', { clientX: 40, clientY: 0 });
    const html1 = wrapper!.html();
    wrapper!.find('rect').simulate('mousemove', { clientX: -20, clientY: 0 });
    const html2 = wrapper!.html();
    expect(html1).not.toBe(html2);
  });

  it('Should render customized callout on mouseover', () => {
    act(() => {
      wrapper = mount(
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
        { attachTo: root },
      );
    });
    wrapper!.find('rect').simulate('mouseover');
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render customized callout per stack on mouseover', () => {
    act(() => {
      wrapper = mount(
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
        { attachTo: root },
      );
    });
    wrapper!.find('rect').simulate('mouseover');
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  describe('Render empty chart aria label div when chart is empty', () => {
    it('No empty chart aria label div rendered', () => {
      act(() => {
        wrapper = mount(<AreaChart data={chartPoints} />);
      });
      const renderedDOM = wrapper!.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
      expect(renderedDOM!.length).toBe(0);
    });
    it('Empty chart aria label div rendered', () => {
      act(() => {
        wrapper = mount(<AreaChart data={emptyChartPoints} />);
      });
      const renderedDOM = wrapper!.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
      expect(renderedDOM!.length).toBe(1);
    });
  });
});
