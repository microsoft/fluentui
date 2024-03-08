jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { IPieChartProps, PieChart } from './index';
import { PieChartBase } from './PieChart.base';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

// Wrapper of the PieChart to be tested.
let wrapper: ReactWrapper<IPieChartProps, {}, PieChartBase> | undefined;

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
  { y: 50, x: 'A' },
  { y: 25, x: 'B' },
  { y: 25, x: 'C' },
];
export const colors = [DefaultPalette.red, DefaultPalette.blue, DefaultPalette.green];

describe('PieChart snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders PieChart correctly', () => {
    const component = renderer.create(<PieChart data={chartPoints} colors={colors} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with colors, width and height data correctly', () => {
    const component = renderer.create(<PieChart data={chartPoints} height={300} width={600} colors={colors} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('PieChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should mount legend when hideLegend false ', () => {
    wrapper = mount(<PieChart data={chartPoints} colors={colors} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    wrapper = mount(<PieChart data={chartPoints} colors={colors} />);
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const renderMock = jest.spyOn(PieChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      colors: colors,
    };
    const component = mount(<PieChart {...props} />);
    component.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(PieChartBase.prototype, 'render');
    const props = {
      data: chartPoints,
      height: 300,
      colors: colors,
    };
    const component = mount(<PieChart {...props} />);
    component.setProps({ ...props, width: 600 });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);

  it('No empty chart aria label div rendered', () => {
    wrapper = mount(<PieChart data={chartPoints} colors={colors} />);
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    wrapper = mount(<PieChart data={[]} colors={colors} />);
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(1);
  });
});
