jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IGroupedVerticalBarChartProps, GroupedVerticalBarChart, IGVBarChartSeriesPoint } from '../../index';
import { IGroupedVerticalBarChartState, GroupedVerticalBarChartBase } from './GroupedVerticalBarChart.base';

// Wrapper of the GroupedVerticalBarChart to be tested.
let wrapper:
  | ReactWrapper<IGroupedVerticalBarChartProps, IGroupedVerticalBarChartState, GroupedVerticalBarChartBase>
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

const chartPoints = [
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

describe('GroupedVerticalBarChart snapShot testing', () => {
  it('renders GroupedVerticalBarChart correctly', () => {
    const component = renderer.create(<GroupedVerticalBarChart data={chartPoints} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    const component = renderer.create(<GroupedVerticalBarChart data={chartPoints} hideLegend={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    const component = renderer.create(<GroupedVerticalBarChart data={chartPoints} hideTooltip={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    const component = renderer.create(<GroupedVerticalBarChart data={chartPoints} enabledLegendsWrapLines={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showXAxisLablesTooltip correctly', () => {
    const component = renderer.create(<GroupedVerticalBarChart data={chartPoints} showXAxisLablesTooltip={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapXAxisLables correctly', () => {
    const component = renderer.create(<GroupedVerticalBarChart data={chartPoints} wrapXAxisLables={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    const component = renderer.create(<GroupedVerticalBarChart data={chartPoints} yAxisTickFormat={'/%d'} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('GroupedVerticalBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    wrapper = mount(<GroupedVerticalBarChart data={chartPoints} hideLegend={true} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    wrapper = mount(<GroupedVerticalBarChart data={chartPoints} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    wrapper = mount(<GroupedVerticalBarChart data={chartPoints} />);
    const hideTooltipDom = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    wrapper = mount(<GroupedVerticalBarChart data={chartPoints} hideTooltip={true} />);
    const hideTooltipDom = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
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
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerDataPoint ', () => {
    wrapper = mount(<GroupedVerticalBarChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(GroupedVerticalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const component = mount(<GroupedVerticalBarChart {...props} />);
    component.setProps({ ...props });
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
    const component = mount(<GroupedVerticalBarChart {...props} />);
    component.setProps({ ...props, hideTooltip: true });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});
