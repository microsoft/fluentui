jest.mock('react-dom');
import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { ChartProps, HorizontalBarChartProps, HorizontalBarChart, HorizontalBarChartVariant } from './index';
import toJson from 'enzyme-to-json';
import * as renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

// Wrapper of the HorizontalBarChart to be tested.
let wrapper: ReactWrapper<HorizontalBarChartProps> | undefined;

function sharedAfterEach() {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
}

export const chartPoints: ChartProps[] = [
  {
    chartTitle: 'one',
    chartData: [
      {
        legend: 'one',
        horizontalBarChartdata: { x: 1543, y: 15000 },
        color: '#004b50',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '94%',
      },
    ],
  },
  {
    chartTitle: 'two',
    chartData: [
      {
        legend: 'two',
        horizontalBarChartdata: { x: 800, y: 15000 },
        color: '#5c2d91',
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '19%',
      },
    ],
  },
];

describe('HorizontalBarChart snapShot testing', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('Should render absolute-scale variant correctly', () => {
    const component = renderer.create(
      <HorizontalBarChart data={chartPoints} variant={HorizontalBarChartVariant.AbsoluteScale} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should not render bar labels in absolute-scale variant', () => {
    const component = renderer.create(
      <HorizontalBarChart data={chartPoints} variant={HorizontalBarChartVariant.AbsoluteScale} hideLabels={true} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('HorizontalBarChart - basic props', () => {
  afterEach(sharedAfterEach);

  it('Should mount callout when hideTootip false ', () => {
    wrapper = mount(<HorizontalBarChart data={chartPoints} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    wrapper = mount(<HorizontalBarChart data={chartPoints} hideTooltip={true} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM.length).toBe(0);
  });

  it('Should render onRenderCalloutPerHorizonalBar ', () => {
    wrapper = mount(
      <HorizontalBarChart
        data={chartPoints}
        /* onRenderCalloutPerHorizontalBar={(props: IChartDataPoint) =>
          props ? (
            <div className="onRenderCalloutPerHorizonalBar">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        } */
      />,
    );
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM).toBeDefined();
  });

  it('Should not render onRenderCalloutPerHorizonalBar ', () => {
    wrapper = mount(<HorizontalBarChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerHorizonalBar');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const component = mount(<HorizontalBarChart {...props} />);
    expect(component).toMatchSnapshot();
    component.setProps({ ...props });
    expect(component).toMatchSnapshot();
  });

  it('prop changes', async () => {
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const component = mount(<HorizontalBarChart {...props} />);
    expect(component.props().hideTooltip).toBe(undefined);
    await act(async () => {
      component.setProps({ ...props, hideTooltip: true });
    });
    expect(component.props().hideTooltip).toBe(true);
    component.unmount();
  });
});

describe('HorizontalBarChart - mouse events', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    sharedAfterEach();
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('Should render callout correctly on mouseover', () => {
    wrapper = mount(<HorizontalBarChart data={chartPoints} />);
    wrapper.find('rect').at(2).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render customized callout on mouseover', () => {
    wrapper = mount(
      <HorizontalBarChart
        data={chartPoints}
        /* onRenderCalloutPerHorizontalBar={(props: IChartDataPoint) =>
          props ? (
            <div>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </div>
          ) : null
        } */
      />,
    );
    wrapper.find('rect').at(0).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    wrapper = mount(<HorizontalBarChart data={chartPoints} />);
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    wrapper = mount(<HorizontalBarChart data={[]} />);
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(1);
  });
});
