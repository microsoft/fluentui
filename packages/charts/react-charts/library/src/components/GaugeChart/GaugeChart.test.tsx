import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { getByClass, testWithoutWait, testScreenResolutionChanges } from '../../utilities/TestUtility.test';
import { axe, toHaveNoViolations } from 'jest-axe';
import {
  ExtendedSegment,
  GaugeChart,
  calcNeedleRotation,
  getSegmentLabel,
  getChartValueLabel,
  ARC_PADDING,
} from './GaugeChart';
expect.extend(toHaveNoViolations);

enum GaugeValueFormat {
  Percentage = 'percentage',
  Fraction = 'fraction',
}

enum GaugeChartVariant {
  SingleSegment = 'single-segment',
  MultipleSegments = 'multiple-segments',
}

const BREAKPOINTS = [
  { minRadius: 52, arcWidth: 12, fontSize: 20 },
  { minRadius: 70, arcWidth: 16, fontSize: 24 },
  { minRadius: 88, arcWidth: 20, fontSize: 32 },
  { minRadius: 106, arcWidth: 24, fontSize: 32 },
  { minRadius: 124, arcWidth: 28, fontSize: 40 },
  { minRadius: 142, arcWidth: 32, fontSize: 40 },
];

const segments = [
  { size: 33, color: '#107c10', legend: 'Low Risk' },
  { size: 34, color: '#f7630c', legend: 'Medium Risk' },
  { size: 33, color: '#c50f1f', legend: 'High Risk' },
];
const originalRAF = window.requestAnimationFrame;

function sharedAfterEach() {
  jest.useRealTimers();
  window.requestAnimationFrame = originalRAF;
}

describe('Gauge chart rendering - ', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
    sharedAfterEach();
  });

  const mockGetComputedTextLength = jest.fn().mockReturnValue(100);
  // Replace the original method with the mock implementation
  Object.defineProperty(
    Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
    'getComputedTextLength',
    {
      value: mockGetComputedTextLength,
    },
  );
  testWithoutWait('Should render properly without chart value', GaugeChart, { segments: segments }, container => {
    // Assert
    expect(container).toMatchSnapshot();
  });

  testWithoutWait(
    'Should render properly with chart value',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render properly with chart title',
    GaugeChart,
    { segments: segments, chartValue: 30, chartTitle: 'Gauge Chart with title' },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render properly with roundCorners',
    GaugeChart,
    { segments: segments, chartValue: 30, roundCorners: true },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Gauge chart interactions', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
    sharedAfterEach();
  });

  testWithoutWait(
    'Should show callout on mouse over',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      fireEvent.mouseOver(segments[0]);
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should not show callout on mouse over when hideTooltip is true',
    GaugeChart,
    { segments: segments, chartValue: 30, hideTooltip: true },
    container => {
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      fireEvent.mouseOver(segments[0]);
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should hide callout on mouse leave',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      fireEvent.mouseOver(segments[0]);
      // Assert
      expect(container).toMatchSnapshot();
      fireEvent.mouseLeave(segments[0]);
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait('Should show callout on focus', GaugeChart, { segments: segments, chartValue: 30 }, container => {
    const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
    fireEvent.focus(segments[0]);
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Gauge chart - Subcomponent Legend', () => {
  afterEach(sharedAfterEach);
  testWithoutWait(
    'Should render chart with legends properly',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      expect(getByClass(container, /rect/i)).toHaveLength(3);
    },
  );

  testWithoutWait(
    'Should not show legends when hideLegend is true',
    GaugeChart,
    { segments: segments, chartValue: 30, hideLegend: true },
    container => {
      expect(getByClass(container, /rect/i)).toHaveLength(0);
    },
  );

  testWithoutWait(
    'Should reduce the opacity of the other segments and legends on mouse over a legend',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.mouseOver(legends[0]);
      expect(container).toMatchSnapshot();
      const legendsAfterMouseOver = getByClass(container, /legend__text/i);
      expect(legendsAfterMouseOver).toHaveLength(3);
      expect(legendsAfterMouseOver[1]).toHaveStyle('opacity: 0.67');
      expect(legendsAfterMouseOver[2]).toHaveStyle('opacity: 0.67');
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      expect(segments[0]).toHaveAttribute('opacity', '1');
      expect(segments[1]).toHaveAttribute('opacity', '0.1');
      expect(segments[2]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithoutWait(
    'Should reduce the opacity of the other segments and legends on mouse click on a legend',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      expect(container).toMatchSnapshot();
      const legendsAfterMouseOver = getByClass(container, /legend__text/i);
      expect(legendsAfterMouseOver).toHaveLength(3);
      expect(legendsAfterMouseOver[1]).toHaveStyle('opacity: 0.67');
      expect(legendsAfterMouseOver[2]).toHaveStyle('opacity: 0.67');
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      expect(segments[0]).toHaveAttribute('opacity', '1');
      expect(segments[1]).toHaveAttribute('opacity', '0.1');
      expect(segments[2]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithoutWait(
    'Should update the opacity of the other segments and legends on double mouse click on a legend',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      const legendsAfterMouseOver = getByClass(container, /legend__text/i);
      expect(legendsAfterMouseOver).toHaveLength(3);
      expect(legendsAfterMouseOver[1]).toHaveStyle('opacity: 0.67');
      expect(legendsAfterMouseOver[2]).toHaveStyle('opacity: 0.67');
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      expect(segments[0]).toHaveAttribute('opacity', '1');
      expect(segments[1]).toHaveAttribute('opacity', '0.1');
      expect(segments[2]).toHaveAttribute('opacity', '0.1');
      fireEvent.click(legends[0]);
      expect(segments[0]).toHaveAttribute('opacity', '1');
      expect(segments[1]).toHaveAttribute('opacity', '1');
      expect(segments[2]).toHaveAttribute('opacity', '1');
    },
  );

  testWithoutWait(
    'Should select legend when mouse click on legend',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'true');
      expect(legends[1]).toHaveAttribute('aria-selected', 'false');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithoutWait(
    'Should deselect legend when mouse double click on legend',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'true');
      expect(legends[1]).toHaveAttribute('aria-selected', 'false');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
      fireEvent.click(legends[0]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'false');
      expect(legends[1]).toHaveAttribute('aria-selected', 'false');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithoutWait(
    'Should select multiple legends when mouse click on different legends when canSelectMultipleLegends is true',
    GaugeChart,
    { segments: segments, chartValue: 30, legendProps: { canSelectMultipleLegends: true } },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'true');
      expect(legends[1]).toHaveAttribute('aria-selected', 'false');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
      fireEvent.click(legends[1]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'true');
      expect(legends[1]).toHaveAttribute('aria-selected', 'true');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithoutWait(
    'Should not select multiple legends when mouse click on different legends when canSelectMultipleLegends is false',
    GaugeChart,
    { segments: segments, chartValue: 30, legendProps: { canSelectMultipleLegends: false } },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'true');
      expect(legends[1]).toHaveAttribute('aria-selected', 'false');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
      fireEvent.click(legends[1]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'false');
      expect(legends[1]).toHaveAttribute('aria-selected', 'true');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
    },
  );
});

describe('Screen resolution', () => {
  afterEach(sharedAfterEach);
  testScreenResolutionChanges(() => {
    const { container } = render(<GaugeChart segments={segments} chartValue={30} width={300} height={300} />);
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Gauge bar chart re-rendering', () => {
  afterEach(sharedAfterEach);
  test('Should re-render the Gauge chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<GaugeChart segments={[]} chartValue={0} />);
    // Assert
    expect(getByClass(container, /rect/i)).toHaveLength(0);
    // Act
    rerender(<GaugeChart segments={segments} chartValue={30} />);
    await waitFor(() => {
      // Assert
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toMatchSnapshot();
    });
  });
});

describe('Gauge Chart - Theme Change', () => {
  afterEach(sharedAfterEach);
  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <FluentProvider theme={{ colorNeutralBackground1: '#ccc' }}>
        <GaugeChart culture={window.navigator.language} segments={segments} chartValue={30} />
      </FluentProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Gauge Chart - axe-core', () => {
  afterEach(sharedAfterEach);
  test('Should pass accessibility tests', async () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={30} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});

describe('GaugeChart snapshot tests', () => {
  it('should render GaugeChart correctly', () => {
    let wrapper = render(<GaugeChart segments={segments} chartValue={25} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render min and max values of the gauge when the hideMinMax prop is true', () => {
    let wrapper = render(<GaugeChart segments={segments} chartValue={25} hideMinMax />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the chart title correctly', () => {
    let wrapper = render(<GaugeChart segments={segments} chartValue={25} chartTitle="Riskometer" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the sublabel correctly', () => {
    let wrapper = render(<GaugeChart segments={segments} chartValue={25} sublabel="Low Risk" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render the legends when the hideLegend prop is true', () => {
    let wrapper = render(<GaugeChart segments={segments} chartValue={25} hideLegend />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the chart value in fraction format', () => {
    let wrapper = render(
      <GaugeChart segments={segments} chartValue={25} chartValueFormat={GaugeValueFormat.Fraction} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it(`should render a placeholder segment when the total size of the segments is less than
  the difference between maxValue and minValue props`, () => {
    let wrapper = render(
      <GaugeChart
        segments={[{ size: 60, color: 'blue', legend: 'Used' }]}
        chartValue={60}
        minValue={0}
        maxValue={100}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('GaugeChart rendering and behavior tests', () => {
  it('should truncate the chart value with ellipsis when its length exceeds the max width', () => {
    const mockGetComputedTextLength = jest.fn().mockReturnValue(1000);
    const tspanProto = Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan'));
    const descriptor = Object.getOwnPropertyDescriptor(tspanProto, 'getComputedTextLength');
    if (!descriptor || descriptor.configurable) {
      Object.defineProperty(tspanProto, 'getComputedTextLength', {
        value: mockGetComputedTextLength,
        configurable: true,
      });
    }

    const { container } = render(<GaugeChart segments={segments} chartValue={25} />);
    expect(getByClass(container, /chartValue/i)).toHaveLength(1);
    expect(getByClass(container, /chartValue/i)[0]).toHaveTextContent('...');
  });

  it('should update the font size of the chart value when the chart resizes', () => {
    const { container, rerender } = render(<GaugeChart segments={segments} chartValue={25} />);
    const bounds = [80, ...BREAKPOINTS.map(bp => bp.minRadius * 2 + 32), 1000];
    for (let i = 1; i < bounds.length; i++) {
      const width = Math.floor(Math.random() * (bounds[i] - bounds[i - 1]) + bounds[i - 1]);
      rerender(<GaugeChart segments={segments} chartValue={25} hideMinMax width={width} height={1000} />);
      const legendText = getByClass(container, /chartValue /i)[0];
      expect(Number(legendText.getAttribute('font-size'))).toBe(
        i < 2 ? BREAKPOINTS[0].fontSize : BREAKPOINTS[i - 2].fontSize,
      );
    }
  });

  it('should not show a callout when the hideTooltip prop is true', () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={25} hideTooltip />);
    const segs = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
    if (segs.length > 0) {
      fireEvent.mouseEnter(segs[0]!);
    }
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);
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
    const extendedSegement1: ExtendedSegment = { ...segments[0], start: 0, end: 33 };

    expect(getSegmentLabel(extendedSegement1, 0, 100)).toMatch(/0 - 33/);
    expect(getSegmentLabel(extendedSegement1, 0, 100, undefined, true)).toMatch(/0 to 33/);

    expect(getSegmentLabel(extendedSegement1, 0, 100, GaugeChartVariant.SingleSegment)).toMatch(/33%/);
    expect(getSegmentLabel(extendedSegement1, 0, 100, GaugeChartVariant.SingleSegment, true)).toMatch(/33%/);

    expect(getSegmentLabel(extendedSegement1, 0, 100, GaugeChartVariant.MultipleSegments)).toMatch(/0 - 33/);
    expect(getSegmentLabel(extendedSegement1, 0, 100, GaugeChartVariant.MultipleSegments, true)).toMatch(/0 to 33/);

    const extendedSegement2: ExtendedSegment = { ...segments[0], start: 100, end: 133 };

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

describe('Gauge Chart - axe-core (React Testing Library)', () => {
  // Replace the original method with the mock implementation
  const mockGetComputedTextLength = jest.fn().mockReturnValue(100);
  const tspanProto = Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan'));
  const descriptor = Object.getOwnPropertyDescriptor(tspanProto, 'getComputedTextLength');
  if (!descriptor || descriptor.configurable) {
    Object.defineProperty(tspanProto, 'getComputedTextLength', {
      value: mockGetComputedTextLength,
      configurable: true,
    });
  }
  it('Should pass accessibility tests', async () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={25} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});

describe('GaugeChart interaction and accessibility tests', () => {
  // Replace the original method with the mock implementation
  const mockGetComputedTextLength = jest.fn().mockReturnValue(100);
  const tspanProto = Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan'));
  const descriptor = Object.getOwnPropertyDescriptor(tspanProto, 'getComputedTextLength');
  if (!descriptor || descriptor.configurable) {
    Object.defineProperty(tspanProto, 'getComputedTextLength', {
      value: mockGetComputedTextLength,
      configurable: true,
    });
  }

  it('should show an outline around the segment on focus and hide it on blur', () => {
    render(<GaugeChart segments={segments} chartValue={25} chartValueFormat={GaugeValueFormat.Fraction} />);
    const segmentslist = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
    fireEvent.focus(segmentslist[0]!);
    expect(segmentslist[0]).toHaveAttribute('stroke-width', ARC_PADDING.toString());

    fireEvent.blur(segmentslist[0]!);
    expect(segmentslist[0]).toHaveAttribute('stroke-width', '0');
  });

  it(`should highlight the corresponding segment when the mouse moves over a legend and
  unhighlight it when the mouse moves out of the legend`, () => {
    render(<GaugeChart segments={segments} chartValue={25} />);

    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    fireEvent.mouseOver(legends[0]);
    const segs = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
    expect(segs[0].getAttribute('opacity')).toEqual('1');
    expect(segs[1].getAttribute('opacity')).toEqual('0.1');
    expect(segs[2].getAttribute('opacity')).toEqual('0.1');

    fireEvent.mouseOut(legends[0]);
    expect(segs[0].getAttribute('opacity')).toEqual('1');
    expect(segs[1].getAttribute('opacity')).toEqual('1');
    expect(segs[2].getAttribute('opacity')).toEqual('1');
  });

  it(`should highlight the corresponding segment when a legend is clicked and
  unhighlight it when the legend is clicked again`, () => {
    render(<GaugeChart segments={segments} chartValue={25} />);
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    fireEvent.click(legends[0]);
    const segs = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
    expect(segs[0].getAttribute('opacity')).toEqual('1');
    expect(segs[1].getAttribute('opacity')).toEqual('0.1');
    expect(segs[2].getAttribute('opacity')).toEqual('0.1');
    fireEvent.click(legends[0]);
    expect(segs[0].getAttribute('opacity')).toEqual('1');
    expect(segs[1].getAttribute('opacity')).toEqual('1');
    expect(segs[2].getAttribute('opacity')).toEqual('1');
  });

  it(`should highlight multiple segments when the legend multi select is enabled`, () => {
    render(
      <GaugeChart
        segments={segments}
        chartValue={25}
        chartValueFormat={GaugeValueFormat.Fraction}
        legendProps={{ canSelectMultipleLegends: true }}
      />,
    );
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    fireEvent.click(legends[0]);
    fireEvent.click(legends[1]);
    const segs = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
    expect(segs[0].getAttribute('opacity')).toEqual('1');
    expect(segs[1].getAttribute('opacity')).toEqual('1');
    expect(segs[2].getAttribute('opacity')).toEqual('0.1');
  });
});

describe('Gauge Chart - Callout', () => {
  it('should show a callout when the needle is focused and hide it when blurred', () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={25} />);

    const segmentslist = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
    const needle = segmentslist[3];
    fireEvent.focus(needle!);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);

    fireEvent.blur(needle!);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);
  });

  it(`should show a callout when the mouse enters a highlighted segment and
  hide it when the mouse enters any unhighlighted segments`, () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={25} />);
    const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
    fireEvent.click(legends[0]);
    const segs = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
    fireEvent.mouseEnter(segs[0]);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);
    fireEvent.mouseEnter(segs[1]);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);
    fireEvent.mouseEnter(segs[2]);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);
    //When mouse is on needle callout should be shown
    fireEvent.mouseEnter(segs[3]);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);
  });

  it(`should show a callout when the mouse moves over the chart value and
  hide it when the mouse leaves the chart`, () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={25} width={252} height={128} />);

    const chartValue = screen.getByText('25%');
    fireEvent.mouseEnter(chartValue);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);

    fireEvent.mouseMove(chartValue);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);

    fireEvent.mouseLeave(chartValue);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);
  });

  it(`should show a callout when the mouse moves over the needle and
  hide it when the mouse leaves the chart`, () => {
    const { container } = render(
      <GaugeChart segments={segments} chartValue={25} chartValueFormat={GaugeValueFormat.Fraction} />,
    );

    const segmentslist = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
    const needle = segmentslist[3];
    fireEvent.mouseEnter(needle!);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);

    fireEvent.mouseMove(needle!);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);

    fireEvent.mouseLeave(needle!);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);
  });

  it(`should show a callout when the mouse moves over a segment and
  hide it when the mouse leaves the chart`, () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={25} />);
    const segmentslist = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
    fireEvent.mouseEnter(segmentslist[0]!);
    fireEvent.mouseMove(segmentslist[0]!);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(1);
    fireEvent.mouseLeave(segmentslist[0]!);
    expect(getByClass(container, /calloutContentRoot/i)).toHaveLength(0);
  });
});

describe('GaugeChart - Annotations', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('should render an annotation at the specified value', () => {
    const { container } = render(
      <GaugeChart
        segments={segments}
        chartValue={50}
        annotations={[
          {
            text: 'Target',
            coordinates: { value: 75, position: 'outer' },
          },
        ]}
      />,
    );
    expect(screen.getByText('Target')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render multiple annotations', () => {
    const { container } = render(
      <GaugeChart
        segments={segments}
        chartValue={50}
        annotations={[
          {
            text: 'Low',
            coordinates: { value: 25, position: 'outer' },
          },
          {
            text: 'High',
            coordinates: { value: 75, position: 'outer' },
          },
        ]}
      />,
    );
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render annotations at different radial positions', () => {
    const { container } = render(
      <GaugeChart
        segments={segments}
        chartValue={50}
        annotations={[
          {
            text: 'Inner',
            coordinates: { value: 25, position: 'inner' },
          },
          {
            text: 'Arc',
            coordinates: { value: 50, position: 'arc' },
          },
          {
            text: 'Outer',
            coordinates: { value: 75, position: 'outer' },
          },
        ]}
      />,
    );
    expect(screen.getByText('Inner')).toBeInTheDocument();
    expect(screen.getByText('Arc')).toBeInTheDocument();
    expect(screen.getByText('Outer')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should apply custom styles to annotations', () => {
    render(
      <GaugeChart
        segments={segments}
        chartValue={50}
        annotations={[
          {
            text: 'Styled',
            coordinates: { value: 50, position: 'outer' },
            style: {
              textColor: 'red',
              fontSize: '14px',
              fontWeight: 'bold',
            },
          },
        ]}
      />,
    );
    const annotation = screen.getByText('Styled');
    expect(annotation).toBeInTheDocument();
  });

  it('should use custom ariaLabel for accessibility', () => {
    render(
      <GaugeChart
        segments={segments}
        chartValue={50}
        annotations={[
          {
            text: 'Target',
            coordinates: { value: 75, position: 'outer' },
            ariaLabel: 'Target value at 75',
          },
        ]}
      />,
    );
    expect(screen.getByLabelText('Target value at 75')).toBeInTheDocument();
  });

  it('should not render annotations when array is empty', () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={50} annotations={[]} />);
    expect(getByClass(container, /annotationText/i)).toHaveLength(0);
  });

  it('should support custom annotation rendering', () => {
    const customRenderer = jest.fn((annotation, defaultRender) => {
      return (
        <g key={annotation.id} data-testid="custom-annotation">
          <text>{`Custom: ${annotation.text}`}</text>
        </g>
      );
    });

    render(
      <GaugeChart
        segments={segments}
        chartValue={50}
        annotations={[
          {
            id: 'custom-1',
            text: 'Target',
            coordinates: { value: 75, position: 'outer' },
          },
        ]}
        onRenderAnnotation={customRenderer}
      />,
    );
    expect(customRenderer).toHaveBeenCalled();
    expect(screen.getByText('Custom: Target')).toBeInTheDocument();
  });
});

describe('GaugeChart - Annotation helper functions', () => {
  it('calcValueToAngle should convert value to correct angle', () => {
    const { calcValueToAngle } = require('./GaugeChart');
    // At minValue (0), angle should be -90 degrees = -PI/2 radians
    expect(calcValueToAngle(0, 0, 100)).toBeCloseTo(-Math.PI / 2, 5);
    // At maxValue (100), angle should be +90 degrees = PI/2 radians
    expect(calcValueToAngle(100, 0, 100)).toBeCloseTo(Math.PI / 2, 5);
    // At midpoint (50), angle should be 0 degrees = 0 radians
    expect(calcValueToAngle(50, 0, 100)).toBeCloseTo(0, 5);
  });

  it('calcAnnotationPosition should calculate correct positions', () => {
    const { calcAnnotationPosition } = require('./GaugeChart');
    const innerRadius = 50;
    const outerRadius = 70;

    // At value 50 (center), x should be 0
    const posCenter = calcAnnotationPosition(50, 'outer', 0, 100, innerRadius, outerRadius);
    expect(posCenter.x).toBeCloseTo(0, 3);
    expect(posCenter.y).toBeLessThan(0); // y should be negative (above center)

    // At value 0 (left), x should be negative
    const posLeft = calcAnnotationPosition(0, 'outer', 0, 100, innerRadius, outerRadius);
    expect(posLeft.x).toBeLessThan(0);

    // At value 100 (right), x should be positive
    const posRight = calcAnnotationPosition(100, 'outer', 0, 100, innerRadius, outerRadius);
    expect(posRight.x).toBeGreaterThan(0);
  });

  it('calcAnnotationPosition should apply radial offset correctly', () => {
    const { calcAnnotationPosition } = require('./GaugeChart');
    const innerRadius = 50;
    const outerRadius = 70;

    const posNoOffset = calcAnnotationPosition(50, 'outer', 0, 100, innerRadius, outerRadius, 0);
    const posWithOffset = calcAnnotationPosition(50, 'outer', 0, 100, innerRadius, outerRadius, 10);

    // At value 50, both should have x = 0, but offset should move y further from center
    expect(Math.abs(posWithOffset.y)).toBeGreaterThan(Math.abs(posNoOffset.y));
  });
});

describe('GaugeChart - Arrow Annotations', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('should render an annotation with an arrow', () => {
    const { container } = render(
      <GaugeChart
        segments={segments}
        chartValue={75}
        annotations={[
          {
            id: 'arrow-annotation',
            text: 'Target Zone',
            coordinates: { value: 75, position: 'outer', radialOffset: 30 },
            arrow: {
              show: true,
              color: '#0078d4',
              width: 2,
              headStyle: 2,
              tailOffsetX: 0,
              tailOffsetY: -40,
            },
          },
        ]}
      />,
    );
    expect(screen.getByText('Target Zone')).toBeInTheDocument();
    // Check that a line element (arrow shaft) is rendered
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBeGreaterThan(0);
  });

  it('should render arrow with custom head style', () => {
    const { container } = render(
      <GaugeChart
        segments={segments}
        chartValue={50}
        annotations={[
          {
            id: 'custom-arrow',
            text: 'Custom Arrow',
            coordinates: { value: 50, position: 'outer', radialOffset: 40 },
            arrow: {
              show: true,
              headStyle: 4,
              color: 'red',
              width: 3,
              headSize: 1.5,
              tailOffsetY: -50,
            },
          },
        ]}
      />,
    );
    expect(screen.getByText('Custom Arrow')).toBeInTheDocument();
    // Check for polygon element (arrowhead)
    const polygons = container.querySelectorAll('polygon');
    expect(polygons.length).toBeGreaterThan(0);
  });

  it('should not render arrow when show is false', () => {
    const { container } = render(
      <GaugeChart
        segments={segments}
        chartValue={50}
        annotations={[
          {
            text: 'No Arrow',
            coordinates: { value: 50, position: 'outer' },
            arrow: {
              show: false,
            },
          },
        ]}
      />,
    );
    expect(screen.getByText('No Arrow')).toBeInTheDocument();
    // Should not have any line elements for arrows
    const annotationLines = container.querySelectorAll('.annotation-arrow line');
    expect(annotationLines.length).toBe(0);
  });

  it('should render multiple annotations with arrows', () => {
    const { container } = render(
      <GaugeChart
        segments={segments}
        chartValue={50}
        annotations={[
          {
            id: 'arrow-1',
            text: 'Low',
            coordinates: { value: 25, position: 'outer', radialOffset: 25 },
            arrow: { show: true, color: 'green', tailOffsetY: -30 },
          },
          {
            id: 'arrow-2',
            text: 'High',
            coordinates: { value: 75, position: 'outer', radialOffset: 25 },
            arrow: { show: true, color: 'red', tailOffsetY: -30 },
          },
        ]}
      />,
    );
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    const lines = container.querySelectorAll('.annotation-arrow line');
    expect(lines.length).toBe(2);
  });
});

describe('GaugeChart - Arrow helper functions', () => {
  it('getArrowHeadPath should return correct path for different styles', () => {
    const { getArrowHeadPath } = require('./GaugeChart');

    // Style 0 should return empty string (no head)
    expect(getArrowHeadPath(0, 1, 1)).toBe('');

    // Style 2 (default filled arrowhead) should return a closed path
    const path2 = getArrowHeadPath(2, 1, 1);
    expect(path2).toContain('M 0 0');
    expect(path2).toContain('Z');

    // All other styles should return non-empty paths
    for (let style = 1; style <= 8; style++) {
      const path = getArrowHeadPath(style, 1, 1);
      expect(path.length).toBeGreaterThan(0);
    }
  });
});
