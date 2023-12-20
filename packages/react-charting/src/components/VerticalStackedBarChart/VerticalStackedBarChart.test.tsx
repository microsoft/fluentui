jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import {
  IVSChartDataPoint,
  IVerticalStackedBarChartProps,
  VerticalStackedBarChart,
  IVerticalStackedChartProps,
} from '../../index';
import { IVerticalStackedBarChartState, VerticalStackedBarChartBase } from './VerticalStackedBarChart.base';
import toJson from 'enzyme-to-json';

// Wrapper of the VerticalStackedBarChart to be tested.
let wrapper:
  | ReactWrapper<IVerticalStackedBarChartProps, IVerticalStackedBarChartState, VerticalStackedBarChartBase>
  | undefined;

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

const firstChartPoints: IVSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 40,
    color: DefaultPalette.accent,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
  },
  {
    legend: 'Metadata2',
    data: 5,
    color: DefaultPalette.blueMid,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '5%',
  },
];

const secondChartPoints: IVSChartDataPoint[] = [
  {
    legend: 'Metadata1',
    data: 30,
    color: DefaultPalette.accent,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '30%',
  },
  {
    legend: 'Metadata2',
    data: 20,
    color: DefaultPalette.blueMid,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
];

export const chartPoints: IVerticalStackedChartProps[] = [
  { chartData: firstChartPoints, xAxisPoint: 0 },
  { chartData: secondChartPoints, xAxisPoint: 20 },
];

const chartPoints2: IVerticalStackedChartProps[] = [
  { chartData: firstChartPoints, xAxisPoint: 0, lineData: [{ y: 15, legend: 'Line1', color: DefaultPalette.yellow }] },
  {
    chartData: secondChartPoints,
    xAxisPoint: 20,
    lineData: [{ y: 30, legend: 'Line1', color: DefaultPalette.yellow }],
  },
];

export const emptyChartPoints: IVerticalStackedChartProps[] = [{ chartData: [], xAxisPoint: 0 }];

describe('VerticalStackedBarChart snapShot testing', () => {
  it('renders VerticalStackedBarChart correctly', () => {
    const component = renderer.create(<VerticalStackedBarChart data={chartPoints} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    const component = renderer.create(<VerticalStackedBarChart data={chartPoints} hideLegend={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    const component = renderer.create(<VerticalStackedBarChart data={chartPoints} hideTooltip={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    const component = renderer.create(<VerticalStackedBarChart data={chartPoints} enabledLegendsWrapLines={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    const component = renderer.create(<VerticalStackedBarChart data={chartPoints} showXAxisLablesTooltip={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    const component = renderer.create(<VerticalStackedBarChart data={chartPoints} wrapXAxisLables={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders isCalloutForStack correctly', () => {
    const component = renderer.create(<VerticalStackedBarChart data={chartPoints} isCalloutForStack={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    const component = renderer.create(<VerticalStackedBarChart data={chartPoints} yAxisTickFormat={'/%d'} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should not render bar labels', () => {
    const component = renderer.create(<VerticalStackedBarChart data={chartPoints} hideLabels={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('VerticalStackedBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    wrapper = mount(<VerticalStackedBarChart data={chartPoints} hideLegend={true} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    wrapper = mount(<VerticalStackedBarChart data={chartPoints} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    wrapper = mount(<VerticalStackedBarChart data={chartPoints} />);
    const hideTooltipDom = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    wrapper = mount(<VerticalStackedBarChart data={chartPoints} hideTooltip={true} />);
    const hideTooltipDom = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should render onRenderCalloutPerStack ', () => {
    wrapper = mount(
      <VerticalStackedBarChart
        data={chartPoints}
        onRenderCalloutPerStack={(props: IVerticalStackedChartProps) =>
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
    wrapper = mount(<VerticalStackedBarChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    wrapper = mount(
      <VerticalStackedBarChart
        data={chartPoints}
        onRenderCalloutPerDataPoint={(props: IVSChartDataPoint) =>
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
    wrapper = mount(<VerticalStackedBarChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(VerticalStackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const component = mount(<VerticalStackedBarChart {...props} />);
    component.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(VerticalStackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const component = mount(<VerticalStackedBarChart {...props} />);
    component.setProps({ ...props, hideTooltip: true });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('VerticalStackedBarChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  // FIXME - non deterministic snapshots causing master pipeline breaks
  it.skip('Should render callout correctly on mouseover', async () => {
    wrapper = mount(
      <VerticalStackedBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} enabledLegendsWrapLines />,
    );

    // Wait for the chart to be resized
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();

    wrapper.find('rect').at(0).simulate('mouseover');
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  // FIXME - looks like test leak. if previous one is skipped assertion in this test fails
  it.skip('Should render callout correctly on mousemove', async () => {
    wrapper = mount(
      <VerticalStackedBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} enabledLegendsWrapLines />,
    );
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    wrapper.find('rect').at(2).simulate('mousemove');
    const html1 = wrapper.html();
    wrapper.find('rect').at(3).simulate('mousemove');
    const html2 = wrapper.html();
    expect(html1).not.toBe(html2);
  });

  it('Should render customized callout on mouseover', async () => {
    wrapper = mount(
      <VerticalStackedBarChart
        data={chartPoints}
        calloutProps={{ doNotLayer: true }}
        enabledLegendsWrapLines
        onRenderCalloutPerDataPoint={(props: IVSChartDataPoint) =>
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

  it('Should render customized callout per stack on mouseover', async () => {
    wrapper = mount(
      <VerticalStackedBarChart
        data={chartPoints2}
        calloutProps={{ doNotLayer: true }}
        enabledLegendsWrapLines
        onRenderCalloutPerStack={(props: IVerticalStackedChartProps) =>
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
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);
  it('No empty chart aria label div rendered', () => {
    wrapper = mount(<VerticalStackedBarChart data={chartPoints} />);
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    wrapper = mount(<VerticalStackedBarChart data={emptyChartPoints} />);
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(1);
  });
});
