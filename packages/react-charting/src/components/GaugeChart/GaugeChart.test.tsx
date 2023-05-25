import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { GaugeChart, GaugeValueFormat, IGaugeChartProps } from './index';
import { ARC_PADDING, GaugeChartBase, IGaugeChartState } from './GaugeChart.base';
import { resetIds, setRTL } from '../../Utilities';
import { DataVizPalette } from '../../utilities/colors';
import toJson from 'enzyme-to-json';
import { render, screen, fireEvent } from '@testing-library/react';

// Wrapper of the DonutChart to be tested.
let wrapper: ReactWrapper<IGaugeChartProps, IGaugeChartState, GaugeChartBase> | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SVGElement: any = window.SVGElement;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let originalGetComputedTextLength: any;

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

const segments = [
  { size: 33, color: DataVizPalette.success, legend: 'Low Risk' },
  { size: 34, color: DataVizPalette.warning, legend: 'Medium Risk' },
  { size: 33, color: DataVizPalette.error, legend: 'High Risk' },
];

describe('GaugeChart - snapshot testing', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('should render GaugeChart correctly', () => {
    wrapper = mount(<GaugeChart segments={segments} chartValue={25} />);
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('should not render min and max values of the gauge when the hideLimits prop is true', () => {
    wrapper = mount(<GaugeChart segments={segments} chartValue={25} hideLimits />);
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('should render the chart title correctly', () => {
    wrapper = mount(<GaugeChart segments={segments} chartValue={25} chartTitle="Riskometer" />);
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('should render the sublabel correctly', () => {
    wrapper = mount(<GaugeChart segments={segments} chartValue={25} sublabel="Low Risk" />);
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('should render GaugeChart correctly when the layout direction is RTL', () => {
    setRTL(true);

    wrapper = mount(<GaugeChart segments={segments} chartValue={25} />);
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();

    setRTL(false);
  });

  it('should not render the legends when the hideLegend prop is true', () => {
    wrapper = mount(<GaugeChart segments={segments} chartValue={25} hideLegend />);
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('should render the chart value in fraction format', () => {
    wrapper = mount(<GaugeChart segments={segments} chartValue={25} chartValueFormat={GaugeValueFormat.Fraction} />);
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('should render a placeholder color for the segment with no color', () => {
    wrapper = mount(
      <GaugeChart
        segments={[
          { size: 60, color: DataVizPalette.color6, legend: 'Used' },
          { size: 40, legend: 'Available' },
        ]}
        chartValue={60}
      />,
    );
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it(`should render a placeholder segment when the total size of the segments is less than
  the difference between maxValue and minValue props`, () => {
    wrapper = mount(
      <GaugeChart
        segments={[{ size: 60, color: 'blue', legend: 'Used' }]}
        chartValue={60}
        minValue={0}
        maxValue={100}
      />,
    );
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});

describe('GaugeChart - event listeners testing', () => {
  beforeEach(() => {
    sharedBeforeEach();

    originalGetComputedTextLength = SVGElement.prototype.getComputedTextLength;
    SVGElement.prototype.getComputedTextLength = () => {
      return 30;
    };
  });

  afterEach(() => {
    sharedAfterEach();

    SVGElement.prototype.getComputedTextLength = originalGetComputedTextLength;
  });

  it(`should show a callout when the mouse enters and moves on a segment and
  hide it when the mouse leaves the segment`, () => {
    const { container } = render(
      <GaugeChart segments={segments} chartValue={25} calloutProps={{ doNotLayer: true }} />,
    );

    const segment = container.querySelector('[class^="segment"]');
    fireEvent.mouseEnter(segment!);
    expect(container).toMatchSnapshot();

    fireEvent.mouseMove(segment!);
    expect(container.querySelector('.ms-Callout')).toBeDefined();

    fireEvent.mouseLeave(segment!);
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it('should show an outline around the segment on focus and hide it on blur', () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={25} />);

    const segment = container.querySelector('[class^="segment"]');
    fireEvent.focus(segment!);
    expect(segment?.getAttribute('stroke-width')).toBe(ARC_PADDING.toString());
    expect(container.querySelector('.ms-Callout')).toBeDefined();

    fireEvent.blur(segment!);
    expect(segment?.getAttribute('stroke-width')).toBe('0');
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it(`should highlight the corresponding segment when the mouse is over a legend and
  unhighlight it when mouse is out of the legend`, () => {
    const { container } = render(
      <GaugeChart segments={segments} chartValue={25} calloutProps={{ doNotLayer: true }} />,
    );

    const legend = screen.getByText(segments[0].legend);
    fireEvent.mouseOver(legend!);
    const segs = container.querySelectorAll('[class^="segment"]');
    expect(segs[0].getAttribute('fill-opacity')).toBe('1');
    for (let i = 0; i < segs.length; i++) {
      if (i !== 0) {
        expect(segs[i].getAttribute('fill-opacity')).toBe('0.1');
      }
    }
    expect(container.querySelector('.ms-Callout')).toBeDefined();

    fireEvent.mouseOut(legend!);
    for (let i = 0; i < segs.length; i++) {
      expect(segs[i].getAttribute('fill-opacity')).toBe('1');
    }
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it(`should highlight the corresponding segment when a legend is clicked and
  unhighlight it when the legend is clicked again`, () => {
    const { container } = render(
      <GaugeChart segments={segments} chartValue={25} calloutProps={{ doNotLayer: true }} />,
    );

    const legend = screen.getByText(segments[0].legend);
    fireEvent.click(legend!);
    const segs = container.querySelectorAll('[class^="segment"]');
    expect(segs[0].getAttribute('fill-opacity')).toBe('1');
    for (let i = 0; i < segs.length; i++) {
      if (i !== 0) {
        expect(segs[i].getAttribute('fill-opacity')).toBe('0.1');
      }
    }
    expect(container.querySelector('.ms-Callout')).toBeDefined();

    fireEvent.click(legend!);
    for (let i = 0; i < segs.length; i++) {
      expect(segs[i].getAttribute('fill-opacity')).toBe('1');
    }
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });
});
