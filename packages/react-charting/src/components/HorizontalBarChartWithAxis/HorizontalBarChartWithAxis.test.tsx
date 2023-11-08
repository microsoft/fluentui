jest.mock('react-dom');
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { HorizontalBarChartWithAxis, IHorizontalBarChartWithAxisProps } from '../../index';
import { IHorizontalBarChartWithAxisState, HorizontalBarChartWithAxisBase } from './HorizontalBarChartWithAxis.base';
import { resetIds } from '@fluentui/react';
import toJson from 'enzyme-to-json';

let wrapper:
  | ReactWrapper<IHorizontalBarChartWithAxisProps, IHorizontalBarChartWithAxisState, HorizontalBarChartWithAxisBase>
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

const points = [
  {
    x: 10000,
    y: 5000,
    legend: 'Oranges',
    color: DefaultPalette.accent,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '10%',
  },
  {
    x: 20000,
    y: 50000,
    legend: 'Dogs',
    color: DefaultPalette.blueDark,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '20%',
  },
  {
    x: 25000,
    y: 30000,
    legend: 'Apples',
    color: DefaultPalette.blueMid,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '37%',
  },

  {
    x: 40000,
    y: 13000,
    legend: 'Bananas',
    color: DefaultPalette.blueLight,
    xAxisCalloutData: '2020/04/30',
    yAxisCalloutData: '88%',
  },
];

const pointsForWrapLabels = [
  {
    y: 'String One',
    x: 1000,
    color: DefaultPalette.accent,
  },
  {
    y: 'String Two',
    x: 5000,
    color: DefaultPalette.blueDark,
  },
  {
    y: 'String Three',
    x: 3000,
    color: DefaultPalette.blueMid,
  },
  {
    y: 'String Four',
    x: 2000,
    color: DefaultPalette.blue,
  },
];

describe('HorizontalBarChartWithAxis snapShot testing', () => {
  it('renders HorizontalBarChartWithAxis correctly', () => {
    const component = renderer.create(<HorizontalBarChartWithAxis data={points} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders hideLegend correctly', () => {
    const component = renderer.create(<HorizontalBarChartWithAxis data={points} hideLegend={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showToolTipForYAxisLabels correctly', () => {
    const component = renderer.create(
      <HorizontalBarChartWithAxis data={pointsForWrapLabels} showYAxisLablesTooltip={true} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showYAxisLables correctly', () => {
    const component = renderer.create(
      <HorizontalBarChartWithAxis data={pointsForWrapLabels} showYAxisLables={true} showYAxisLablesTooltip={false} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('HorizontalBarChartWithAxis - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    wrapper = mount(<HorizontalBarChartWithAxis data={points} hideLegend={true} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });
  it('Should mount legend when hideLegend false ', () => {
    wrapper = mount(<HorizontalBarChartWithAxis data={points} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });
  it('Should mount callout when hideTootip false ', () => {
    wrapper = mount(<HorizontalBarChartWithAxis data={points} />);
    const calloutDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(calloutDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    wrapper = mount(<HorizontalBarChartWithAxis data={points} hideTooltip={true} />);
    const calloutDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(calloutDOM!.length).toBe(0);
  });
});
describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(HorizontalBarChartWithAxisBase.prototype, 'render');
    const props = {
      data: points,
      height: 300,
      width: 600,
    };
    mount(<HorizontalBarChartWithAxis {...props} />);
    expect(renderMock).toHaveBeenCalledTimes(1);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(HorizontalBarChartWithAxisBase.prototype, 'render');
    const props = {
      data: points,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    const component = mount(<HorizontalBarChartWithAxis {...props} />);
    component.setProps({ ...props, hideTooltip: true });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('HorizontalBarChartWithAxis - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should render callout correctly on mouseover', async () => {
    wrapper = mount(<HorizontalBarChartWithAxis data={points} calloutProps={{ doNotLayer: true }} />);

    // Wait for the chart to be resized

    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();

    wrapper.find('rect').at(1).simulate('mouseover');
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});
