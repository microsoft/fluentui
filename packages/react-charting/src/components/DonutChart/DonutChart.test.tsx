jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { IDonutChartProps, DonutChart } from './index';
import { IDonutChartState, DonutChartBase } from './DonutChart.base';
import { IChartProps, IChartDataPoint } from '../../index';

// Wrapper of the DonutChart to be tested.
let wrapper: ReactWrapper<IDonutChartProps, IDonutChartState, DonutChartBase> | undefined;

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
  { legend: 'first', data: 20000, color: '#E5E5E5', xAxisCalloutData: '2020/04/30' },
  { legend: 'second', data: 39000, color: '#0078D4', xAxisCalloutData: '2020/04/20' },
];

const chartTitle = 'Stacked Bar chart example';

const chartPoints: IChartProps = {
  chartTitle: chartTitle,
  chartData: points,
};

describe('DonutChart snapShot testing', () => {
  it('renders DonutChart correctly', () => {
    const component = renderer.create(<DonutChart data={chartPoints} innerRadius={55} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    const component = renderer.create(<DonutChart data={chartPoints} hideLegend={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    const component = renderer.create(<DonutChart data={chartPoints} hideTooltip={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders enabledLegendsWrapLines correctly', () => {
    const component = renderer.create(<DonutChart data={chartPoints} enabledLegendsWrapLines={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders value inside onf the pie', () => {
    const component = renderer.create(<DonutChart data={chartPoints} valueInsideDonut={1000} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('DonutChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should mount legend when hideLegend false ', () => {
    wrapper = mount(<DonutChart data={chartPoints} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    wrapper = mount(<DonutChart data={chartPoints} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerStack ', () => {
    wrapper = mount(<DonutChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerStack');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    wrapper = mount(
      <DonutChart
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
    wrapper = mount(<DonutChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});
