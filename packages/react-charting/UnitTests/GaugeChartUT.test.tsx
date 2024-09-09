import { GaugeChartVariant, GaugeValueFormat, IGaugeChartProps } from '../src/components/GaugeChart/index';
import {
  GaugeChartBase,
  IExtendedSegment,
  calcNeedleRotation,
  getChartValueLabel,
  getSegmentLabel,
} from '../src/components/GaugeChart/GaugeChart.base';
import { DataVizPalette } from '../src/utilities/colors';
import { DarkTheme } from '@fluentui/theme-samples';
import { IYValueHover } from '../src/index';

const env = require('../config/tests');
const runTest = env === 'TEST' ? describe : describe.skip;

const segments = [
  { size: 33, color: DataVizPalette.success, legend: 'Low Risk' },
  { size: 34, color: DataVizPalette.warning, legend: 'Medium Risk' },
  { size: 33, color: DataVizPalette.error, legend: 'High Risk' },
];

const extendedSegments: IExtendedSegment[] = [
  { size: 33, color: DataVizPalette.success, legend: 'Low Risk', start: 0, end: 33 },
  { size: 34, color: DataVizPalette.warning, legend: 'Medium Risk', start: 34, end: 77 },
  { size: 33, color: DataVizPalette.error, legend: 'High Risk', start: 78, end: 100 },
];

const data: IGaugeChartProps = { segments: segments, chartValue: 100, theme: DarkTheme, hideMinMax: true };
const emptyData: IGaugeChartProps = { segments: [], chartValue: 100, theme: DarkTheme };

runTest('_processProps', () => {
  test('Should return proper arcs data', () => {
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();
    const result = instance._processProps();
    expect(result.arcs).toHaveLength(3);
    expect(result.arcs[0].segmentIndex).toEqual(0);
    expect(result.arcs[1].segmentIndex).toEqual(1);
    expect(result.arcs[2].segmentIndex).toEqual(2);
    expect(result.arcs[0].d).toEqual('M0,0Z');
    expect(result.arcs[1].d).toEqual('M0,0Z');
    expect(result.arcs[2].d).toEqual('M0,0Z');
  });

  test('Should return zero arcs when there is no data', () => {
    const instance = new GaugeChartBase(emptyData);
    expect(instance).toBeDefined();
    const result = instance._processProps();
    expect(result.arcs).toHaveLength(0);
  });
});

runTest('_getMargins', () => {
  test('Should return margins data properly when hideMinMax is false', () => {
    const instance = new GaugeChartBase({
      segments: segments,
      chartValue: 100,
      theme: DarkTheme,
      hideMinMax: false,
    });
    expect(instance).toBeDefined();
    const result = instance._getMargins();
    expect(result.bottom).toEqual(16);
    expect(result.top).toEqual(18);
    expect(result.left).toEqual(56);
    expect(result.right).toEqual(56);
  });

  test('Should return margins data properly when hideMinMax is true', () => {
    const instance = new GaugeChartBase({
      segments: segments,
      chartValue: 100,
      theme: DarkTheme,
      hideMinMax: true,
    });
    expect(instance).toBeDefined();
    const result = instance._getMargins();
    expect(result.bottom).toEqual(16);
    expect(result.top).toEqual(18);
    expect(result.left).toEqual(16);
    expect(result.right).toEqual(16);
  });

  test('Should return margins data properly when hideMinMax is false and chart title is available', () => {
    const instance = new GaugeChartBase({
      segments: segments,
      chartValue: 100,
      theme: DarkTheme,
      hideMinMax: false,
      chartTitle: 'Gauge Chart',
    });
    expect(instance).toBeDefined();
    const result = instance._getMargins();
    expect(result.bottom).toEqual(16);
    expect(result.top).toEqual(43);
    expect(result.left).toEqual(56);
    expect(result.right).toEqual(56);
  });

  test('Should return margins data properly when hideMinMax is true and chart title is available', () => {
    const instance = new GaugeChartBase({
      segments: segments,
      chartValue: 100,
      theme: DarkTheme,
      hideMinMax: true,
      chartTitle: 'Gauge Chart',
    });
    expect(instance).toBeDefined();
    const result = instance._getMargins();
    expect(result.bottom).toEqual(16);
    expect(result.top).toEqual(43);
    expect(result.left).toEqual(16);
    expect(result.right).toEqual(16);
  });

  test('Should return margins data properly when hideMinMax is false and sublabel text is available', () => {
    const instance = new GaugeChartBase({
      segments: segments,
      chartValue: 100,
      theme: DarkTheme,
      hideMinMax: false,
      sublabel: 'Chart Data',
    });
    expect(instance).toBeDefined();
    const result = instance._getMargins();
    expect(result.bottom).toEqual(36);
    expect(result.top).toEqual(18);
    expect(result.left).toEqual(56);
    expect(result.right).toEqual(56);
  });

  test('Should return margins data properly when hideMinMax is true and sublabel text is available', () => {
    const instance = new GaugeChartBase({
      segments: segments,
      chartValue: 100,
      theme: DarkTheme,
      hideMinMax: true,
      sublabel: 'Chart Data',
    });
    expect(instance).toBeDefined();
    const result = instance._getMargins();
    expect(result.bottom).toEqual(36);
    expect(result.top).toEqual(18);
    expect(result.left).toEqual(16);
    expect(result.right).toEqual(16);
  });

  test('Should return margins data properly when hideMinMax is false and chartTitle,sublabel text is available', () => {
    const instance = new GaugeChartBase({
      segments: segments,
      chartValue: 100,
      theme: DarkTheme,
      hideMinMax: false,
      chartTitle: 'Gauge Chart',
      sublabel: 'Chart data',
    });
    expect(instance).toBeDefined();
    const result = instance._getMargins();
    expect(result.bottom).toEqual(36);
    expect(result.top).toEqual(43);
    expect(result.left).toEqual(56);
    expect(result.right).toEqual(56);
  });

  test('Should return margins data properly when hideMinMax is true and chartTitle,sublabel text is available', () => {
    const instance = new GaugeChartBase({
      segments: segments,
      chartValue: 100,
      theme: DarkTheme,
      hideMinMax: true,
      chartTitle: 'Gauge Chart',
      sublabel: 'Chart data',
    });
    expect(instance).toBeDefined();
    const result = instance._getMargins();
    expect(result.bottom).toEqual(36);
    expect(result.top).toEqual(43);
    expect(result.left).toEqual(16);
    expect(result.right).toEqual(16);
  });
});

runTest('calcNeedleRotation', () => {
  test('Should return proper needleRotation value when chartValue greater than minValue and maxValue', () => {
    const result = calcNeedleRotation(100, 33, 37);
    expect(result).toEqual(180);
  });

  test('Should return proper needleRotation value when chartValue in between minValue and maxValue', () => {
    const result = calcNeedleRotation(50, 0, 100);
    expect(result).toEqual(90);
  });

  test('Should return proper needleRotation value when ChartValue same as minValue', () => {
    const result = calcNeedleRotation(0, 0, 100);
    expect(result).toEqual(0);
  });

  test('Should return proper needleRotation value when chartValue same as maxValue', () => {
    const result = calcNeedleRotation(100, 0, 100);
    expect(result).toEqual(180);
  });

  test('Should return proper needleRotation value when ChartValue, minValue and maxValues are same', () => {
    const result = calcNeedleRotation(100, 100, 100);
    expect(result).toEqual(NaN);
  });

  test('Should return proper needleRotation value when maxValue is less than minValue', () => {
    const result = calcNeedleRotation(100, 100, 0);
    expect(result).toEqual(-0);
  });
});

runTest('getSegmentLabel', () => {
  test('Should return proper segment label value with variant and isAriaLabel values', () => {
    const result = getSegmentLabel(extendedSegments[0], 0, 100);
    expect(result).toEqual('0 - 33');
  });

  test('Should return proper segment label value with variant is SingleSegment and isAriaLabel is default/false', () => {
    const result = getSegmentLabel(extendedSegments[1], 0, 100, GaugeChartVariant.SingleSegment);
    expect(result).toEqual('34 (34%)');
  });

  test('Should return proper segment label value with variant is SingleSegment and isAriaLabel is true', () => {
    const result = getSegmentLabel(extendedSegments[1], 0, 100, GaugeChartVariant.SingleSegment, true);
    expect(result).toEqual('Medium Risk, 34 out of 100 or 34%');
  });

  test('Should return proper segment label value with variant is MultipleSegments and isAriaLabel is true', () => {
    const result = getSegmentLabel(extendedSegments[1], 0, 100, GaugeChartVariant.MultipleSegments, true);
    expect(result).toEqual('Medium Risk, 34 to 77');
  });

  test('Should return proper segment label value with variant is MultipleSegments and isAriaLabel is false', () => {
    const result = getSegmentLabel(extendedSegments[1], 0, 100, GaugeChartVariant.MultipleSegments, false);
    expect(result).toEqual('34 - 77');
  });

  test('Should return proper segment label value with minValue is greater than zero, variant is SingleSegment and isAriaLabel is true', () => {
    const result = getSegmentLabel(extendedSegments[1], 50, 100, GaugeChartVariant.SingleSegment, true);
    expect(result).toEqual('Medium Risk, 34 to 77');
  });

  test('Should return proper segment label value with minValue is greater than zero, variant is MultipleSegments and isAriaLabel is true', () => {
    const result = getSegmentLabel(extendedSegments[1], 50, 100, GaugeChartVariant.MultipleSegments, true);
    expect(result).toEqual('Medium Risk, 34 to 77');
  });
});

runTest('getChartValueLabel', () => {
  test('Should return proper chart label value when chartValueFormat is Default Value', () => {
    const result = getChartValueLabel(50, 0, 100);
    expect(result).toEqual('50%');
  });

  test('Should return proper chart label value when chartValueFormat is Fraction', () => {
    const result = getChartValueLabel(50, 0, 100, GaugeValueFormat.Fraction);
    expect(result).toEqual('50/100');
  });

  test('Should return proper chart label value when chartValueFormat is Percentage', () => {
    const result = getChartValueLabel(50, 0, 100, GaugeValueFormat.Percentage);
    expect(result).toEqual('50%');
  });

  test('Should return proper chart label value when chartValueFormat is Percentage and forCallout is true', () => {
    const result = getChartValueLabel(50, 0, 100, GaugeValueFormat.Percentage, true);
    expect(result).toEqual('50/100');
  });

  test('Should return proper chart label value when minValue is greater than zero, chartValueFormat is Percentage and forCallout is true', () => {
    const result = getChartValueLabel(50, 20, 100, GaugeValueFormat.Percentage, true);
    expect(result).toEqual('50');
  });

  test('Should return proper chart label value when minValue is zero, chartValueFormat is Fraction and forCallout is true', () => {
    const result = getChartValueLabel(50, 0, 100, GaugeValueFormat.Fraction, true);
    expect(result).toEqual('50%');
  });

  test('Should return proper chart label value when minValue is zero, chartValueFormat is Percentage and forCallout is true', () => {
    const result = getChartValueLabel(50, 0, 100, GaugeValueFormat.Percentage, true);
    expect(result).toEqual('50/100');
  });
});

runTest('_getStylesBasedOnBreakpoint', () => {
  test('Should return proper arcWidth and chartValueSize when _outerRadius is not defined', () => {
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();
    const result = instance._getStylesBasedOnBreakpoint();
    expect(result.arcWidth).toEqual(12);
    expect(result.chartValueSize).toEqual(20);
  });

  test('Should return proper arcWidth and chartValueSize when _outerRadius is less than minRadius', () => {
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();
    instance._outerRadius = 50;
    const result = instance._getStylesBasedOnBreakpoint();
    expect(result.arcWidth).toEqual(12);
    expect(result.chartValueSize).toEqual(20);
  });

  test('Should return proper arcWidth and chartValueSize when _outerRadius is greater than minRadius', () => {
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();
    instance._outerRadius = 105;
    const result = instance._getStylesBasedOnBreakpoint();
    expect(result.arcWidth).toEqual(20);
    expect(result.chartValueSize).toEqual(32);
  });
});

runTest('_wrapContent', () => {
  const content = 'Lorem ipsum dolor sit amet';
  const id = 'tooltip-host1';

  test('should terminate when text node is not found', () => {
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();
    const isOverflowing = instance._wrapContent(content, id, 15);
    expect(isOverflowing).toBe(false);
  });

  test('should truncate text content when it exceeds the maxWidth', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SVGElement: any = window.SVGElement;
    const originalGetComputedTextLength = SVGElement.prototype.getComputedTextLength;
    let calls = 0;
    SVGElement.prototype.getComputedTextLength = jest.fn().mockImplementation(() => content.length - calls++);

    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.id = id;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.appendChild(textElement);
    document.body.appendChild(svg);
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();

    const isOverflowing = instance._wrapContent(content, id, 10);
    expect(isOverflowing).toBe(true);

    document.body.removeChild(svg);

    SVGElement.prototype.getComputedTextLength = originalGetComputedTextLength;
  });

  test('should not truncate text content when it is under maxWidth range', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SVGElement: any = window.SVGElement;
    const originalGetComputedTextLength = SVGElement.prototype.getComputedTextLength;
    let calls = 0;
    SVGElement.prototype.getComputedTextLength = jest.fn().mockImplementation(() => content.length - calls++);

    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.id = id;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.appendChild(textElement);
    document.body.appendChild(svg);
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();

    const isOverflowing = instance._wrapContent(content, id, 100);
    expect(isOverflowing).toBe(false);

    document.body.removeChild(svg);

    SVGElement.prototype.getComputedTextLength = originalGetComputedTextLength;
  });
});

runTest('_yValueHoverSubCountsExists', () => {
  test('Should return false when yAxisCalloutData value is not defined', () => {
    const hoverData: IYValueHover[] = [{ legend: 'test1' }];
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();
    const result = instance._yValueHoverSubCountsExists(hoverData);
    expect(result).toEqual(false);
  });

  test('Should return false when yAxisCalloutData value is string', () => {
    const hoverData: IYValueHover[] = [
      { legend: 'test1', yAxisCalloutData: '100', color: '#FFFFF', y: 20 },
      { legend: 'test2', yAxisCalloutData: '100', color: '#FFFFF', y: 20 },
    ];
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();
    const result = instance._yValueHoverSubCountsExists(hoverData);
    expect(result).toEqual(false);
  });

  test('Should return true when yAxisCalloutData value is not a string value', () => {
    const hoverData: IYValueHover[] = [
      { legend: 'test1', yAxisCalloutData: { Key: 100 }, color: '#FFFFF', y: 20 },
      { legend: 'test2', yAxisCalloutData: '100', color: '#FFFFF', y: 20 },
    ];
    const instance = new GaugeChartBase(data);
    expect(instance).toBeDefined();
    const result = instance._yValueHoverSubCountsExists(hoverData);
    expect(result).toEqual(true);
  });
});
