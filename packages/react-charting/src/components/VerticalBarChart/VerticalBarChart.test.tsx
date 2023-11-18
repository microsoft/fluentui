jest.mock('react-dom');
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { resetIds } from '../../Utilities';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { VerticalBarChart, IVerticalBarChartProps, IVerticalBarChartDataPoint } from '../../index';
import { IVerticalBarChartState, VerticalBarChartBase } from './VerticalBarChart.base';
import toJson from 'enzyme-to-json';

// Wrapper of the VerticalBarChart to be tested.
let wrapper: ReactWrapper<IVerticalBarChartProps, IVerticalBarChartState, VerticalBarChartBase> | undefined;

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

export const chartPoints = [
  {
    x: 0,
    y: 10000,
    legend: 'First',
    color: DefaultPalette.accent,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
  },
  {
    x: 10000,
    y: 50000,
    legend: 'Second',
    color: DefaultPalette.blueDark,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Third',
    color: DefaultPalette.blueMid,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '37%',
  },
];

describe('VerticalBarChart snapShot testing', () => {
  it('renders VerticalBarChart correctly', () => {
    const component = renderer.create(<VerticalBarChart data={chartPoints} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    const component = renderer.create(<VerticalBarChart data={chartPoints} hideLegend={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    const component = renderer.create(<VerticalBarChart data={chartPoints} hideTooltip={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    const component = renderer.create(<VerticalBarChart data={chartPoints} enabledLegendsWrapLines={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    const component = renderer.create(<VerticalBarChart data={chartPoints} showXAxisLablesTooltip={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    const component = renderer.create(<VerticalBarChart data={chartPoints} wrapXAxisLables={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    const component = renderer.create(<VerticalBarChart data={chartPoints} yAxisTickFormat={'/%d'} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should not render bar labels', () => {
    const component = renderer.create(<VerticalBarChart data={chartPoints} hideLabels={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('VerticalBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    wrapper = mount(<VerticalBarChart data={chartPoints} hideLegend={true} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    wrapper = mount(<VerticalBarChart data={chartPoints} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    wrapper = mount(<VerticalBarChart data={chartPoints} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    wrapper = mount(<VerticalBarChart data={chartPoints} hideTooltip={true} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    wrapper = mount(<VerticalBarChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    wrapper = mount(
      <VerticalBarChart
        data={chartPoints}
        onRenderCalloutPerDataPoint={(props: IVerticalBarChartDataPoint) =>
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
    wrapper = mount(<VerticalBarChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(VerticalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const component = mount(<VerticalBarChart {...props} />);
    component.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(VerticalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const component = mount(<VerticalBarChart {...props} />);
    component.setProps({ ...props, hideTooltip: true });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('VerticalBarChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should render callout correctly on mouseover', async () => {
    wrapper = mount(
      <VerticalBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} enabledLegendsWrapLines />,
    );

    // Wait for the chart to be resized
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();

    wrapper.find('rect').at(1).simulate('mouseover');
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render customized callout on mouseover', async () => {
    wrapper = mount(
      <VerticalBarChart
        data={chartPoints}
        calloutProps={{ doNotLayer: true }}
        enabledLegendsWrapLines
        onRenderCalloutPerDataPoint={(props: IVerticalBarChartDataPoint) =>
          props ? (
            <div>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </div>
          ) : null
        }
      />,
    );
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    wrapper.find('rect').at(0).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    wrapper = mount(
      <VerticalBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} enabledLegendsWrapLines />,
    );
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    wrapper = mount(<VerticalBarChart data={[]} calloutProps={{ doNotLayer: true }} enabledLegendsWrapLines />);
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(1);
  });
});

describe('Render empty chart calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(VerticalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
    };
    const component = mount(<VerticalBarChart {...props} />);
    component.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('Prop changes', () => {
    const renderMock = jest.spyOn(VerticalBarChartBase.prototype, 'render');
    const props = {
      data: [],
    };
    const component = mount(<VerticalBarChart {...props} />);
    component.setProps({ ...props, data: chartPoints });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});
