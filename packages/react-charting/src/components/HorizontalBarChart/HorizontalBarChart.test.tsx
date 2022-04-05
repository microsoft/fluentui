jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { IChartProps, IChartDataPoint, IHorizontalBarChartProps, HorizontalBarChart } from './index';
import { IHorizontalBarChartState, HorizontalBarChartBase } from './HorizontalBarChart.base';

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

const chartPoints: IChartProps[] = [
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
