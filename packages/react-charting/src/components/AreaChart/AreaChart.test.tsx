jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { IAreaChartProps, AreaChart } from './index';
import { IAreaChartState, AreaChartBase } from './AreaChart.base';
import { ICustomizedCalloutData } from '../../index';
import toJson from 'enzyme-to-json';

// Wrapper of the AreaChart to be tested.
let wrapper: ReactWrapper<IAreaChartProps, IAreaChartState, AreaChartBase> | undefined;

function sharedBeforeEach() {
  resetIds();
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
}

const points = [
  {
    legend: 'metaData1',
    data: [
      { x: 20, y: 50 },
      { x: 40, y: 80 },
    ],
    color: 'red',
  },
];
const chartPoints = {
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

describe('AreaChart snapShot testing', () => {
  it('renders Areachart correctly', () => {
    const component = renderer.create(<AreaChart data={chartPoints} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend hhh correctly', () => {
    const component = renderer.create(<AreaChart data={chartPoints} hideLegend={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    const component = renderer.create(<AreaChart data={chartPoints} hideTooltip={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    const component = renderer.create(<AreaChart data={chartPoints} enabledLegendsWrapLines={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    const component = renderer.create(<AreaChart data={chartPoints} showXAxisLablesTooltip={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    const component = renderer.create(<AreaChart data={chartPoints} wrapXAxisLables={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    const component = renderer.create(<AreaChart data={chartPoints} yAxisTickFormat={'/%d'} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Areachart with single point correctly', () => {
    const component = renderer.create(<AreaChart data={singleChartPoint} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('AreaChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    wrapper = mount(<AreaChart data={chartPoints} hideLegend={true} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    wrapper = mount(<AreaChart data={chartPoints} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    wrapper = mount(<AreaChart data={chartPoints} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    wrapper = mount(<AreaChart data={chartPoints} hideTooltip={true} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should render onRenderCalloutPerStack ', () => {
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
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    wrapper = mount(<AreaChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
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
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    wrapper = mount(<AreaChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(AreaChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const component = mount(<AreaChart {...props} />);
    component.setProps({ ...props });
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
    const component = mount(<AreaChart {...props} />);
    component.setProps({ ...props, hideTooltip: true });
    expect(renderMock).toHaveBeenCalledTimes(2);
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
    // document.getElementbyId() returns null if component is not attached to DOM
    wrapper = mount(<AreaChart data={chartPoints} calloutProps={{ doNotLayer: true }} />, { attachTo: root });
    wrapper.find('rect').simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render callout correctly on mousemove', () => {
    wrapper = mount(<AreaChart data={chartPoints} calloutProps={{ doNotLayer: true }} />, { attachTo: root });
    wrapper.find('rect').simulate('mousemove', { clientX: 40, clientY: 0 });
    const html1 = wrapper.html();
    wrapper.find('rect').simulate('mousemove', { clientX: -20, clientY: 0 });
    const html2 = wrapper.html();
    expect(html1).not.toBe(html2);
  });

  it('Should render customized callout on mouseover', () => {
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
    wrapper.find('rect').simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render customized callout per stack on mouseover', () => {
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
    wrapper.find('rect').simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});
