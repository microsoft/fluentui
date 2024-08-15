jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IGroupedVerticalBarChartProps, GroupedVerticalBarChart, IGVBarChartSeriesPoint } from '../../index';
import { IGroupedVerticalBarChartState, GroupedVerticalBarChartBase } from './GroupedVerticalBarChart.base';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';

// Wrapper of the GroupedVerticalBarChart to be tested.
let wrapper:
  | ReactWrapper<IGroupedVerticalBarChartProps, IGroupedVerticalBarChartState, GroupedVerticalBarChartBase>
  | undefined;
const originalRAF = window.requestAnimationFrame;

function sharedBeforeEach() {
  resetIds();
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

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('renders GroupedVerticalBarChart correctly', async () => {
    await act(async () => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', async () => {
    await act(async () => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} hideLegend={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('renders hideTooltip correctly', async () => {
    await act(async () => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} hideTooltip={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', async () => {
    await act(async () => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} enabledLegendsWrapLines={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('renders showXAxisLablesTooltip correctly', async () => {
    await act(async () => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} showXAxisLablesTooltip={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('renders wrapXAxisLables correctly', async () => {
    await act(async () => {
      const mockGetComputedTextLength = jest.fn().mockReturnValue(100);

      // Replace the original method with the mock implementation
      Object.defineProperty(
        Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
        'getComputedTextLength',
        {
          value: mockGetComputedTextLength,
        },
      );
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} wrapXAxisLables={true} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('renders yAxisTickFormat correctly', async () => {
    await act(async () => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} yAxisTickFormat={'/%d'} />);
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});

describe('GroupedVerticalBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    act(() => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} hideLegend={true} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    act(() => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    act(() => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} />);
    });
    const hideTooltipDom = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    act(() => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} hideTooltip={true} />);
    });
    const hideTooltipDom = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    act(() => {
      wrapper = mount(
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
    });
    const renderedDOM = wrapper!.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    act(() => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} />);
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
    const renderMock = jest.spyOn(GroupedVerticalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    act(() => {
      const component = mount(<GroupedVerticalBarChart {...props} />);
      component.setProps({ ...props });
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
    act(() => {
      const component = mount(<GroupedVerticalBarChart {...props} />);
      component.setProps({ ...props, hideTooltip: true });
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('GroupedVerticalBarChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should render callout correctly on mouseover', async () => {
    await act(async () => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
      wrapper.find('rect').at(0).simulate('mouseover');
      await new Promise(resolve => setTimeout(resolve));
      wrapper.update();
    });
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', () => {
    act(() => {
      wrapper = mount(<GroupedVerticalBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
    });
    wrapper!.find('rect').at(2).simulate('mousemove');
    const html1 = wrapper!.html();
    wrapper!.find('rect').at(3).simulate('mousemove');
    const html2 = wrapper!.html();
    expect(html1).not.toBe(html2);
  });

  it('Should render customized callout on mouseover', () => {
    act(() => {
      wrapper = mount(
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
    });
    wrapper!.find('rect').at(0).simulate('mouseover');
    const tree = toJson(wrapper!, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  describe('Render empty chart aria label div when chart is empty', () => {
    beforeEach(() => {
      resetIds();
    });
    it('No empty chart aria label div rendered', () => {
      act(() => {
        wrapper = mount(<GroupedVerticalBarChart data={chartPoints} />);
      });
      const renderedDOM = wrapper!.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
      expect(renderedDOM!.length).toBe(0);
    });

    it('Empty chart aria label div rendered', () => {
      act(() => {
        wrapper = mount(<GroupedVerticalBarChart data={emptyChartPoints} />);
      });
      const renderedDOM = wrapper!.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
      expect(renderedDOM!.length).toBe(1);
    });
  });
});
