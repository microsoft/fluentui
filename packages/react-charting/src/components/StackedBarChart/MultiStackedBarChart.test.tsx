jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IChartProps, IChartDataPoint, IMultiStackedBarChartProps, MultiStackedBarChart } from '../../index';
import { IMultiStackedBarChartState, MultiStackedBarChartBase } from './MultiStackedBarChart.base';

// Wrapper of the MultiStackedBarChart to be tested.
let wrapper: ReactWrapper<IMultiStackedBarChartProps, IMultiStackedBarChartState, MultiStackedBarChartBase> | undefined;

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

const firstChartPoints: IChartDataPoint[] = [
  {
    legend: 'Debit card numbers (EU and USA)',
    data: 40,
    color: DefaultPalette.red,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '40%',
  },
  {
    legend: 'Passport numbers (USA)',
    data: 23,
    color: DefaultPalette.green,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '23%',
  },
];

const secondChartPoints: IChartDataPoint[] = [
  {
    legend: 'Phone Numbers',
    data: 40,
    color: DefaultPalette.blue,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '87%',
  },
  {
    legend: 'Credit card Numbers',
    data: 23,
    color: DefaultPalette.green,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '87%',
  },
];

const chartPoints: IChartProps[] = [
  {
    chartTitle: 'Monitored',
    chartData: firstChartPoints,
  },
  {
    chartTitle: 'Unmonitored',
    chartData: secondChartPoints,
  },
];

describe('MultiStackedBarChart snapShot testing', () => {
  it('renders MultiStackedBarChart correctly', () => {
    const component = renderer.create(<MultiStackedBarChart data={chartPoints} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    const component = renderer.create(<MultiStackedBarChart data={chartPoints} hideLegend={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    const component = renderer.create(<MultiStackedBarChart data={chartPoints} hideTooltip={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideRatio correctly', () => {
    const component = renderer.create(<MultiStackedBarChart data={chartPoints} hideRatio={[true, false]} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideDenominator correctly', () => {
    const component = renderer.create(<MultiStackedBarChart data={chartPoints} hideDenominator={[true, true]} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('MultiStackedBarChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    wrapper = mount(<MultiStackedBarChart data={chartPoints} hideLegend={true} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    wrapper = mount(<MultiStackedBarChart data={chartPoints} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    wrapper = mount(<MultiStackedBarChart data={chartPoints} />);
    const hideTootipDom = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTootipDom).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    wrapper = mount(<MultiStackedBarChart data={chartPoints} hideTooltip={true} />);
    const hideTootipDom = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideTootipDom.length).toBe(0);
  });

  it('Should not mount callout when hideDenominator true ', () => {
    wrapper = mount(<MultiStackedBarChart data={chartPoints} hideDenominator={[true, true]} />);
    const hideDenominatorDom = wrapper.getDOMNode().querySelectorAll('[class^="ratioDenominator"]');
    expect(hideDenominatorDom.length).toBe(0);
  });

  it('Should not mount callout when hideDenominator false ', () => {
    wrapper = mount(<MultiStackedBarChart data={chartPoints} />);
    const hideDenominatorDom = wrapper.getDOMNode().querySelectorAll('[class^="ratioDenominator"]');
    expect(hideDenominatorDom.length).toBeDefined();
  });

  it('Should render onRenderCalloutPerDataPoint ', () => {
    wrapper = mount(
      <MultiStackedBarChart
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
    wrapper = mount(<MultiStackedBarChart data={chartPoints} />);
    const renderedDOM = wrapper.getDOMNode().getElementsByClassName('.onRenderCalloutPerDataPoint');
    expect(renderedDOM!.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(MultiStackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
    };
    const component = mount(<MultiStackedBarChart {...props} />);
    component.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(MultiStackedBarChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const component = mount(<MultiStackedBarChart {...props} />);
    component.setProps({ ...props, hideTooltip: true });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});
