import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { GaugeChart, GaugeChartVariant, GaugeValueFormat, IGaugeChartProps } from './index';
import {
  ARC_PADDING,
  GaugeChartBase,
  IGaugeChartState,
  BREAKPOINTS,
  calcNeedleRotation,
  getSegmentLabel,
  getChartValueLabel,
  IExtendedSegment,
} from './GaugeChart.base';
import { resetIds, setRTL } from '../../Utilities';
import { DataVizPalette } from '../../utilities/colors';
import toJson from 'enzyme-to-json';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider } from '@fluentui/react';
import { DarkTheme } from '@fluentui/theme-samples';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Wrapper of the GaugeChart to be tested.
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

describe('GaugeChart snapshot tests', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('should render GaugeChart correctly', () => {
    wrapper = mount(<GaugeChart segments={segments} chartValue={25} />);
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('should not render min and max values of the gauge when the hideMinMax prop is true', () => {
    wrapper = mount(<GaugeChart segments={segments} chartValue={25} hideMinMax />);
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

  it('should render a color from DataVizPalette for the segment with no color', () => {
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

  it('should render GaugeChart correctly in dark theme', () => {
    wrapper = mount(
      <ThemeProvider theme={DarkTheme}>
        <GaugeChart segments={segments} chartValue={25} />
      </ThemeProvider>,
    );
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});

describe('GaugeChart rendering and behavior tests', () => {
  beforeEach(() => {
    sharedBeforeEach();

    originalGetComputedTextLength = SVGElement.prototype.getComputedTextLength;
    SVGElement.prototype.getComputedTextLength = () => {
      return 0;
    };
  });

  afterEach(() => {
    sharedAfterEach();

    SVGElement.prototype.getComputedTextLength = originalGetComputedTextLength;
  });

  it('should truncate the chart value with ellipsis when its length exceeds the max width', () => {
    SVGElement.prototype.getComputedTextLength = () => {
      return 1000;
    };

    const { container } = render(<GaugeChart segments={segments} chartValue={25} />);

    expect(container.querySelector('[class^="chartValue"]')).toHaveTextContent('...');
  });

  it('should update the font size of the chart value when the chart resizes', () => {
    const { rerender } = render(<GaugeChart segments={segments} chartValue={25} />);

    const bounds = [80, ...BREAKPOINTS.map(bp => bp.minRadius * 2 + 32), 1000];
    for (let i = 1; i < bounds.length; i++) {
      const width = Math.floor(Math.random() * (bounds[i] - bounds[i - 1]) + bounds[i - 1]);
      rerender(<GaugeChart segments={segments} chartValue={25} hideMinMax width={width} height={1000} />);
      expect(screen.getByText('25%')).toHaveStyle(
        `font-size: ${i < 2 ? BREAKPOINTS[0].fontSize : BREAKPOINTS[i - 2].fontSize}px`,
      );
    }
  });

  it('should not show a callout when the hideTooltip prop is true', () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={25} hideTooltip />);

    fireEvent.mouseEnter(container.querySelector('[class^="segment"]')!);
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it('should ensure the needle rotation remains within the range of 0 to 180 degrees at all times', () => {
    expect(calcNeedleRotation(-100, 0, 100)).toBe(0);
    expect(calcNeedleRotation(0, 100, 200)).toBe(0);

    expect(calcNeedleRotation(67, 0, 100)).toBeCloseTo(120.6);
    expect(calcNeedleRotation(133, 100, 200)).toBeCloseTo(59.4);

    expect(calcNeedleRotation(200, 0, 100)).toBe(180);
    expect(calcNeedleRotation(300, 100, 200)).toBe(180);
  });

  it('should render segment sizes correctly', () => {
    const extendedSegement1: IExtendedSegment = { ...segments[0], start: 0, end: 33 };

    expect(getSegmentLabel(extendedSegement1, 0, 100)).toMatch(/0 - 33/);
    expect(getSegmentLabel(extendedSegement1, 0, 100, undefined, true)).toMatch(/0 to 33/);

    expect(getSegmentLabel(extendedSegement1, 0, 100, GaugeChartVariant.SingleSegment)).toMatch(/33%/);
    expect(getSegmentLabel(extendedSegement1, 0, 100, GaugeChartVariant.SingleSegment, true)).toMatch(/33%/);

    expect(getSegmentLabel(extendedSegement1, 0, 100, GaugeChartVariant.MultipleSegments)).toMatch(/0 - 33/);
    expect(getSegmentLabel(extendedSegement1, 0, 100, GaugeChartVariant.MultipleSegments, true)).toMatch(/0 to 33/);

    const extendedSegement2: IExtendedSegment = { ...segments[0], start: 100, end: 133 };

    expect(getSegmentLabel(extendedSegement2, 100, 200)).toMatch(/100 - 133/);
    expect(getSegmentLabel(extendedSegement2, 100, 200, undefined, true)).toMatch(/100 to 133/);

    expect(getSegmentLabel(extendedSegement2, 100, 200, GaugeChartVariant.SingleSegment)).toMatch(/100 - 133/);
    expect(getSegmentLabel(extendedSegement2, 100, 200, GaugeChartVariant.SingleSegment, true)).toMatch(/100 to 133/);

    expect(getSegmentLabel(extendedSegement2, 100, 200, GaugeChartVariant.MultipleSegments)).toMatch(/100 - 133/);
    expect(getSegmentLabel(extendedSegement2, 100, 200, GaugeChartVariant.MultipleSegments, true)).toMatch(
      /100 to 133/,
    );
  });

  it('should render the chart value correctly', () => {
    const customChartValue = 'Custom chart value';

    expect(getChartValueLabel(25, 0, 100)).toBe('25%');
    expect(getChartValueLabel(25, 0, 100, undefined, true)).toBe('25/100');

    expect(getChartValueLabel(25, 0, 100, GaugeValueFormat.Percentage)).toBe('25%');
    expect(getChartValueLabel(25, 0, 100, GaugeValueFormat.Percentage, true)).toBe('25/100');

    expect(getChartValueLabel(25, 0, 100, GaugeValueFormat.Fraction)).toBe('25/100');
    expect(getChartValueLabel(25, 0, 100, GaugeValueFormat.Fraction, true)).toBe('25%');

    expect(getChartValueLabel(25, 0, 100, () => customChartValue)).toBe(customChartValue);
    expect(getChartValueLabel(25, 0, 100, () => customChartValue, true)).toBe('25/100');

    expect(getChartValueLabel(125, 100, 200)).toBe('125');
    expect(getChartValueLabel(125, 100, 200, undefined, true)).toBe('125');

    expect(getChartValueLabel(125, 100, 200, GaugeValueFormat.Percentage)).toBe('125');
    expect(getChartValueLabel(125, 100, 200, GaugeValueFormat.Percentage, true)).toBe('125');

    expect(getChartValueLabel(125, 100, 200, GaugeValueFormat.Fraction)).toBe('125');
    expect(getChartValueLabel(125, 100, 200, GaugeValueFormat.Fraction, true)).toBe('125');

    expect(getChartValueLabel(125, 100, 200, () => customChartValue)).toBe(customChartValue);
    expect(getChartValueLabel(125, 100, 200, () => customChartValue, true)).toBe('125');
  });
});

describe('GaugeChart interaction and accessibility tests', () => {
  beforeEach(() => {
    sharedBeforeEach();

    originalGetComputedTextLength = SVGElement.prototype.getComputedTextLength;
    SVGElement.prototype.getComputedTextLength = () => {
      return 0;
    };
  });

  afterEach(() => {
    sharedAfterEach();

    SVGElement.prototype.getComputedTextLength = originalGetComputedTextLength;
  });

  it(`should show a callout when the mouse moves over a segment and
  hide it when the mouse leaves the chart`, () => {
    const { container } = render(
      <GaugeChart segments={segments} chartValue={25} calloutProps={{ doNotLayer: true }} />,
    );

    const segment = container.querySelector('[class^="segment"]');
    fireEvent.mouseEnter(segment!);
    expect(container).toMatchSnapshot();

    fireEvent.mouseMove(segment!);
    expect(container.querySelector('.ms-Callout')).not.toBeNull();

    fireEvent.mouseLeave(container.querySelector('[class^="chart"]')!);
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it('should show an outline around the segment on focus and hide it on blur', () => {
    const { container } = render(
      <GaugeChart
        segments={segments}
        chartValue={25}
        chartValueFormat={GaugeValueFormat.Fraction}
        calloutProps={{ doNotLayer: true }}
      />,
    );

    const segment = container.querySelector('[class^="segment"]');
    fireEvent.focus(segment!);
    expect(segment).toHaveAttribute('stroke-width', ARC_PADDING.toString());
    expect(container.querySelector('.ms-Callout')).not.toBeNull();

    fireEvent.blur(segment!);
    expect(segment).toHaveAttribute('stroke-width', '0');
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it(`should show a callout when the mouse moves over the chart value and
  hide it when the mouse leaves the chart`, () => {
    const { container } = render(
      <GaugeChart segments={segments} chartValue={25} width={252} height={128} calloutProps={{ doNotLayer: true }} />,
    );

    const chartValue = screen.getByText('25%');
    fireEvent.mouseEnter(chartValue);
    expect(container.querySelector('.ms-Callout')).not.toBeNull();

    fireEvent.mouseMove(chartValue);
    expect(container.querySelector('.ms-Callout')).not.toBeNull();

    fireEvent.mouseLeave(container.querySelector('[class^="chart"]')!);
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it(`should show a callout when the mouse moves over the needle and
  hide it when the mouse leaves the chart`, () => {
    const { container } = render(
      <GaugeChart
        segments={segments}
        chartValue={25}
        chartValueFormat={GaugeValueFormat.Fraction}
        calloutProps={{ doNotLayer: true }}
      />,
    );

    const needle = container.querySelector('[class^="needle"]');
    fireEvent.mouseEnter(needle!);
    expect(container.querySelector('.ms-Callout')).not.toBeNull();

    fireEvent.mouseMove(needle!);
    expect(container.querySelector('.ms-Callout')).not.toBeNull();

    fireEvent.mouseLeave(container.querySelector('[class^="chart"]')!);
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it('should show a callout when the needle is focused and hide it when blurred', () => {
    const { container } = render(
      <GaugeChart segments={segments} chartValue={25} calloutProps={{ doNotLayer: true }} />,
    );

    const needle = container.querySelector('[class^="needle"]');
    fireEvent.focus(needle!);
    expect(container.querySelector('.ms-Callout')).not.toBeNull();

    fireEvent.blur(needle!);
    expect(container.querySelector('.ms-Callout')).toBeNull();
  });

  it(`should highlight the corresponding segment when the mouse moves over a legend and
  unhighlight it when the mouse moves out of the legend`, () => {
    const { container } = render(
      <GaugeChart segments={segments} chartValue={25} calloutProps={{ doNotLayer: true }} />,
    );

    const legend = screen.getByText(segments[0].legend);
    fireEvent.mouseOver(legend);
    const segs = container.querySelectorAll('[class^="segment"]');
    expect(segs[0]).toHaveAttribute('fill-opacity', '1');
    for (let i = 0; i < segs.length; i++) {
      if (i !== 0) {
        expect(segs[i]).toHaveAttribute('fill-opacity', '0.1');
      }
    }

    fireEvent.mouseOut(legend);
    for (let i = 0; i < segs.length; i++) {
      expect(segs[i]).toHaveAttribute('fill-opacity', '1');
    }
  });

  it(`should highlight the corresponding segment when a legend is clicked and
  unhighlight it when the legend is clicked again`, () => {
    const { container } = render(
      <GaugeChart segments={segments} chartValue={25} calloutProps={{ doNotLayer: true }} />,
    );

    const legend = screen.getByText(segments[0].legend);
    fireEvent.click(legend);
    const segs = container.querySelectorAll('[class^="segment"]');
    expect(segs[0]).toHaveAttribute('fill-opacity', '1');
    for (let i = 0; i < segs.length; i++) {
      if (i !== 0) {
        expect(segs[i]).toHaveAttribute('fill-opacity', '0.1');
      }
    }

    fireEvent.click(legend);
    for (let i = 0; i < segs.length; i++) {
      expect(segs[i]).toHaveAttribute('fill-opacity', '1');
    }
  });

  it(`should show a callout when the mouse enters a highlighted segment and
  hide it when the mouse enters any unhighlighted segments`, () => {
    const { container } = render(
      <GaugeChart segments={segments} chartValue={25} calloutProps={{ doNotLayer: true }} />,
    );

    fireEvent.click(screen.getByText(segments[0].legend));
    const segs = container.querySelectorAll('[class^="segment"]');
    fireEvent.mouseEnter(segs[0]);
    expect(container.querySelector('.ms-Callout')).not.toBeNull();
    for (let i = 0; i < segs.length; i++) {
      if (i !== 0) {
        fireEvent.mouseEnter(segs[i]);
        expect(container.querySelector('.ms-Callout')).toBeNull();
      }
    }
  });
});

describe('Gauge Chart - axe-core', () => {
  beforeEach(() => {
    sharedBeforeEach();

    originalGetComputedTextLength = SVGElement.prototype.getComputedTextLength;
    SVGElement.prototype.getComputedTextLength = () => {
      return 0;
    };
  });

  afterEach(() => {
    sharedAfterEach();

    SVGElement.prototype.getComputedTextLength = originalGetComputedTextLength;
  });
  it('Should pass accessibility tests', async () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={25} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
