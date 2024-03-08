jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import {
  IChartProps,
  IChartDataPoint,
  IHorizontalBarChartProps,
  HorizontalBarChart,
  HorizontalBarChartVariant,
} from './index';
import { IHorizontalBarChartState, HorizontalBarChartBase } from './HorizontalBarChart.base';
import toJson from 'enzyme-to-json';
import * as renderer from 'react-test-renderer';

// Wrapper of the HorizontalBarChart to be tested.
let wrapper: ReactWrapper<IHorizontalBarChartProps, IHorizontalBarChartState, HorizontalBarChartBase> | undefined;

function sharedBeforeEach() {
  resetIds();
}

function sharedAfterEach() {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
}

export const chartPoints: IChartProps[] = [
  {
    chartTitle: 'one',
    chartData: [
      {
        legend: 'one',
        horizontalBarChartdata: { x: 1543, y: 15000 },
        color: DefaultPalette.tealDark,
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
        color: DefaultPalette.purple,
        xAxisCalloutData: '2020/04/30',
        yAxisCalloutData: '19%',
      },
    ],
  },
];

describe('HorizontalBarChart snapShot testing', () => {
  beforeEach(() => {
    sharedBeforeEach();
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
  beforeEach(sharedBeforeEach);
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
        onRenderCalloutPerHorizontalBar={(props: IChartDataPoint) =>
          props ? (
            <div className="onRenderCalloutPerHorizonalBar">
              <p>Custom Callout Content</p>
            </div>
          ) : null
        }
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
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const renderMock = jest.spyOn(HorizontalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const component = mount(<HorizontalBarChart {...props} />);
    component.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(HorizontalBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const component = mount(<HorizontalBarChart {...props} />);
    component.setProps({ ...props, hideTooltip: true });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('HorizontalBarChart - mouse events', () => {
  beforeEach(() => {
    sharedBeforeEach();
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    sharedAfterEach();
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('Should render callout correctly on mouseover', () => {
    wrapper = mount(<HorizontalBarChart data={chartPoints} calloutProps={{ doNotLayer: true }} />);
    wrapper.find('rect').at(2).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render customized callout on mouseover', () => {
    wrapper = mount(
      <HorizontalBarChart
        data={chartPoints}
        calloutProps={{ doNotLayer: true }}
        onRenderCalloutPerHorizontalBar={(props: IChartDataPoint) =>
          props ? (
            <div>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </div>
          ) : null
        }
      />,
    );
    wrapper.find('rect').at(0).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);

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
