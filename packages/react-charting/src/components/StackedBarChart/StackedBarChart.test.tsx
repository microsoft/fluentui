jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IChartProps, IChartDataPoint, IStackedBarChartProps, StackedBarChart } from '../../index';
import { IStackedBarChartState, StackedBarChartBase } from './StackedBarChart.base';

// Wrapper of the StackedBarChart to be tested.
let wrapper: ReactWrapper<IStackedBarChartProps, IStackedBarChartState, StackedBarChartBase> | undefined;

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

const points: IChartDataPoint[] = [
  { legend: 'first Lorem ipsum dolor sit amet', data: 40, color: DefaultPalette.magentaDark },
  { legend: 'Winter is coming', data: 23, color: DefaultPalette.red },
];
const chartTitle = 'Stacked bar chart 2nd example';

const chartPoints: IChartProps = {
  chartTitle: chartTitle,
  chartData: points,
};

describe('StackedBarChart snapShot testing', () => {
  it('renders StackedBarChart correctly', () => {
    const component = renderer.create(<StackedBarChart data={chartPoints} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    const component = renderer.create(<StackedBarChart data={chartPoints} hideLegend={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    const component = renderer.create(<StackedBarChart data={chartPoints} hideTooltip={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideNumberDisplay correctly', () => {
    const component = renderer.create(<StackedBarChart data={chartPoints} hideNumberDisplay={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideDenominator correctly', () => {
    const component = renderer.create(<StackedBarChart data={chartPoints} hideDenominator={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders ignoreFixStyle correctly', () => {
    const component = renderer.create(<StackedBarChart data={chartPoints} ignoreFixStyle={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    const component = renderer.create(<StackedBarChart data={chartPoints} enabledLegendsWrapLines={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('StackedBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    wrapper = mount(<StackedBarChart data={chartPoints} hideLegend={true} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    wrapper = mount(<StackedBarChart data={chartPoints} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    wrapper = mount(<StackedBarChart data={chartPoints} />);
    const hideTooltipDom = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    wrapper = mount(<StackedBarChart data={chartPoints} hideTooltip={true} />);
    const hideTooltipDom = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTooltipDom.length).toBe(0);
  });

  it('Should not mount callout when hideDenominator true ', () => {
    wrapper = mount(<StackedBarChart data={chartPoints} hideDenominator={true} />);
    const hideDenominatorDom = wrapper.getDOMNode().querySelectorAll('[class^="ratioDenominator"]');
    expect(hideDenominatorDom.length).toBe(0);
  });

  it('Should not mount callout when hideDenominator false ', () => {
    wrapper = mount(<StackedBarChart data={chartPoints} />);
    const hideDenominatorDom = wrapper.getDOMNode().querySelectorAll('[class^="ratioDenominator"]');
    expect(hideDenominatorDom.length).toBeDefined();
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    wrapper = mount(
      <StackedBarChart
        data={chartPoints}
        onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
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
    wrapper = mount(<StackedBarChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(StackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const component = mount(<StackedBarChart {...props} />);
    component.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(StackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const component = mount(<StackedBarChart {...props} />);
    component.setProps({ ...props, hideTooltip: true });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});
