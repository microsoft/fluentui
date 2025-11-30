'use client';

import * as React from 'react';
// Using custom VegaLiteTypes for internal adapter logic
// For public API, VegaDeclarativeChart accepts vega-lite's TopLevelSpec
import type {
  VegaLiteSpec,
  VegaLiteUnitSpec,
  VegaLiteMarkDef,
  VegaLiteData,
  VegaLiteInterpolate,
} from './VegaLiteTypes';
import type { LineChartProps } from '../LineChart/index';
import type { VerticalBarChartProps } from '../VerticalBarChart/index';
import type { VerticalStackedBarChartProps } from '../VerticalStackedBarChart/index';
import type { GroupedVerticalBarChartProps } from '../GroupedVerticalBarChart/index';
import type { HorizontalBarChartWithAxisProps } from '../HorizontalBarChartWithAxis/index';
import type { AreaChartProps } from '../AreaChart/index';
import type { DonutChartProps } from '../DonutChart/index';
import type { ScatterChartProps } from '../ScatterChart/index';
import type { HeatMapChartProps } from '../HeatMapChart/index';
import type {
  ChartProps,
  LineChartPoints,
  LineChartDataPoint,
  VerticalBarChartDataPoint,
  VerticalStackedChartProps,
  HorizontalBarChartWithAxisDataPoint,
  ChartDataPoint,
  ScatterChartDataPoint,
  HeatMapChartData,
  HeatMapChartDataPoint,
  ChartAnnotation,
  LineDataInVerticalStackedBarChart,
  AxisCategoryOrder,
} from '../../types/index';
import type { ColorFillBarsProps } from '../LineChart/index';
import type { Legend, LegendsProps } from '../Legends/index';
import { getNextColor } from '../../utilities/colors';
import { format as d3Format } from 'd3-format';
import { bin as d3Bin, extent as d3Extent, sum as d3Sum, min as d3Min, max as d3Max, mean as d3Mean } from 'd3-array';
import type { Bin } from 'd3-array';

/**
 * Vega-Lite to Fluent Charts adapter for line/point charts.
 * 
 * Transforms Vega-Lite JSON specifications into Fluent LineChart props.
 * Supports basic line charts with temporal/quantitative axes and color-encoded series.
 * 
 * TODO: Future enhancements
 * - Multi-view layouts (facet, concat, repeat)
 * - Selection interactions
 * - Remote data loading (url)
 * - Transform pipeline (filter, aggregate, calculate)
 * - Conditional encodings
 * - Additional mark types (area, bar, etc.)
 * - Tooltip customization
 */

/**
 * Determines if a spec is a layered specification
 */
function isLayerSpec(spec: VegaLiteSpec): spec is VegaLiteSpec & { layer: VegaLiteUnitSpec[] } {
  return Array.isArray(spec.layer) && spec.layer.length > 0;
}

/**
 * Determines if a spec is a single unit specification
 */
function isUnitSpec(spec: VegaLiteSpec): boolean {
  return spec.mark !== undefined && spec.encoding !== undefined;
}

/**
 * Extracts inline data values from a Vega-Lite data specification
 * TODO: Add support for URL-based data loading
 * TODO: Add support for named dataset resolution
 * TODO: Add support for data format parsing (csv, tsv)
 */
function extractDataValues(data: VegaLiteData | undefined): Array<Record<string, unknown>> {
  if (!data) {
    return [];
  }

  if (data.values && Array.isArray(data.values)) {
    return data.values;
  }

  // TODO: Handle data.url - load remote data
  if (data.url) {
    console.warn('VegaLiteSchemaAdapter: Remote data URLs are not yet supported');
    return [];
  }

  // TODO: Handle data.name - resolve named datasets
  if (data.name) {
    console.warn('VegaLiteSchemaAdapter: Named datasets are not yet supported');
    return [];
  }

  return [];
}

/**
 * Normalizes a Vega-Lite spec into an array of unit specs with resolved data and encoding
 * Handles both single-view and layered specifications
 */
function normalizeSpec(spec: VegaLiteSpec): VegaLiteUnitSpec[] {
  if (isLayerSpec(spec)) {
    // Layered spec: merge shared data and encoding with each layer
    const sharedData = spec.data;
    const sharedEncoding = spec.encoding;

    return spec.layer.map(layer => ({
      ...layer,
      data: layer.data || sharedData,
      encoding: {
        ...sharedEncoding,
        ...layer.encoding,
      },
    }));
  }

  if (isUnitSpec(spec)) {
    // Single unit spec
    return [
      {
        mark: spec.mark!,
        encoding: spec.encoding,
        data: spec.data,
      },
    ];
  }

  console.warn('VegaLiteSchemaAdapter: Unsupported spec structure');
  return [];
}

/**
 * Parses a value to a Date if it's temporal, otherwise returns as number or string
 */
function parseValue(value: unknown, isTemporalType: boolean): Date | number | string {
  if (value === null || value === undefined) {
    return '';
  }

  if (isTemporalType) {
    // Try parsing as date
    const dateValue = new Date(value as string | number);
    if (!isNaN(dateValue.getTime())) {
      return dateValue;
    }
  }

  if (typeof value === 'number') {
    return value;
  }

  return String(value);
}

/**
 * Maps Vega-Lite interpolate to Fluent curve options
 * Note: Only maps to curve types supported by LineChartLineOptions
 */
function mapInterpolateToCurve(interpolate: VegaLiteInterpolate | undefined): 'linear' | 'natural' | 'step' | 'stepAfter' | 'stepBefore' | undefined {
  if (!interpolate) {
    return undefined;
  }

  switch (interpolate) {
    case 'linear':
    case 'linear-closed':
      return 'linear';
    case 'step':
      return 'step';
    case 'step-before':
      return 'stepBefore';
    case 'step-after':
      return 'stepAfter';
    case 'natural':
      return 'natural';
    // Note: basis, cardinal, monotone, catmull-rom are not supported by LineChartLineOptions
    default:
      return 'linear';
  }
}

/**
 * Extracts mark properties from VegaLiteMarkDef
 */
function getMarkProperties(mark: VegaLiteMarkDef): {
  color?: string;
  interpolate?: VegaLiteInterpolate;
  strokeWidth?: number;
  point?: boolean | { filled?: boolean; size?: number };
} {
  if (typeof mark === 'string') {
    return {};
  }
  return {
    color: mark.color,
    interpolate: mark.interpolate,
    strokeWidth: mark.strokeWidth,
    point: mark.point,
  };
}

/**
 * Extracts annotations from Vega-Lite layers with text or rule marks
 * Text marks become text annotations, rule marks become reference lines
 */
function extractAnnotations(spec: VegaLiteSpec): ChartAnnotation[] {
  const annotations: ChartAnnotation[] = [];

  if (!spec.layer || !Array.isArray(spec.layer)) {
    return annotations;
  }

  spec.layer.forEach((layer, index) => {
    const mark = typeof layer.mark === 'string' ? layer.mark : layer.mark?.type;
    const encoding = layer.encoding || {};

    // Text marks become annotations
    if (mark === 'text' && encoding.x && encoding.y) {
      const textValue = encoding.text?.value || encoding.text?.field || '';
      const xValue = encoding.x.value || encoding.x.field;
      const yValue = encoding.y.value || encoding.y.field;

      if (textValue && (xValue !== undefined || encoding.x.datum !== undefined) && 
          (yValue !== undefined || encoding.y.datum !== undefined)) {
        annotations.push({
          id: `text-annotation-${index}`,
          text: String(textValue),
          coordinates: {
            type: 'data',
            x: (encoding.x as any).datum || xValue || 0,
            y: (encoding.y as any).datum || yValue || 0,
          },
          style: {
            textColor: typeof layer.mark === 'object' ? layer.mark.color : undefined,
          },
        });
      }
    }

    // Rule marks can become reference lines (horizontal or vertical)
    if (mark === 'rule') {
      // Horizontal rule (y value constant)
      if (encoding.y && (encoding.y.value !== undefined || (encoding.y as any).datum !== undefined)) {
        const yValue = encoding.y.value || (encoding.y as any).datum;
        annotations.push({
          id: `rule-h-${index}`,
          text: '', // Rules typically don't have text
          coordinates: {
            type: 'data',
            x: 0,
            y: yValue as number,
          },
          style: {
            borderColor: typeof layer.mark === 'object' ? layer.mark.color : '#000',
            borderWidth: typeof layer.mark === 'object' ? layer.mark.strokeWidth || 1 : 1,
          },
        });
      }
      // Vertical rule (x value constant)
      else if (encoding.x && (encoding.x.value !== undefined || (encoding.x as any).datum !== undefined)) {
        const xValue = encoding.x.value || (encoding.x as any).datum;
        annotations.push({
          id: `rule-v-${index}`,
          text: '',
          coordinates: {
            type: 'data',
            x: xValue as number | string | Date,
            y: 0,
          },
          style: {
            borderColor: typeof layer.mark === 'object' ? layer.mark.color : '#000',
            borderWidth: typeof layer.mark === 'object' ? layer.mark.strokeWidth || 1 : 1,
          },
        });
      }
    }
  });

  return annotations;
}

/**
 * Extracts color fill bars (background regions) from rect marks with x/x2 or y/y2 encodings
 */
function extractColorFillBars(spec: VegaLiteSpec, isDarkTheme?: boolean): ColorFillBarsProps[] {
  const colorFillBars: ColorFillBarsProps[] = [];

  if (!spec.layer || !Array.isArray(spec.layer)) {
    return colorFillBars;
  }

  let colorIndex = 0;
  spec.layer.forEach((layer, index) => {
    const mark = typeof layer.mark === 'string' ? layer.mark : layer.mark?.type;
    const encoding = layer.encoding || {};

    // Rect marks with x and x2 become color fill bars (vertical regions)
    if (mark === 'rect' && encoding.x && encoding.x2) {
      const color = typeof layer.mark === 'object' && layer.mark.color 
        ? layer.mark.color 
        : getNextColor(colorIndex++, 0, isDarkTheme);
      
      // Extract start and end x values
      const startX = (encoding.x as any).datum || (encoding.x as any).value;
      const endX = (encoding.x2 as any).datum || (encoding.x2 as any).value;

      if (startX !== undefined && endX !== undefined) {
        colorFillBars.push({
          legend: `region-${index}`,
          color,
          data: [{ startX, endX }],
          applyPattern: false,
        });
      }
    }
  });

  return colorFillBars;
}

/**
 * Extracts tick configuration from axis properties
 */
function extractTickConfig(spec: VegaLiteSpec): {
  tickValues?: (number | Date | string)[];
  xAxisTickCount?: number;
  yAxisTickCount?: number;
} {
  const config: {
    tickValues?: (number | Date | string)[];
    xAxisTickCount?: number;
    yAxisTickCount?: number;
  } = {};

  const encoding = spec.encoding || {};

  if (encoding.x?.axis) {
    if (encoding.x.axis.values) {
      config.tickValues = encoding.x.axis.values as (number | string)[];
    }
    if (encoding.x.axis.tickCount) {
      config.xAxisTickCount = encoding.x.axis.tickCount;
    }
  }

  if (encoding.y?.axis) {
    if (encoding.y.axis.tickCount) {
      config.yAxisTickCount = encoding.y.axis.tickCount;
    }
  }

  return config;
}

/**
 * Extracts Y-axis scale type from encoding
 * Returns 'log' if logarithmic scale is specified, undefined otherwise
 */
function extractYAxisType(encoding: any): 'log' | undefined {
  const yScale = encoding?.y?.scale;
  return yScale?.type === 'log' ? 'log' : undefined;
}

/**
 * Converts Vega-Lite sort specification to Fluent Charts AxisCategoryOrder
 * Supports: 'ascending', 'descending', null, array, or object with op/order
 * @param sort - Vega-Lite sort specification
 * @returns AxisCategoryOrder compatible value
 */
function convertVegaSortToAxisCategoryOrder(sort: any): AxisCategoryOrder | undefined {
  if (!sort) {
    return undefined;
  }

  // Handle string sorts: 'ascending' | 'descending'
  if (typeof sort === 'string') {
    if (sort === 'ascending') {
      return 'category ascending';
    }
    if (sort === 'descending') {
      return 'category descending';
    }
    return undefined;
  }

  // Handle array sort (explicit ordering)
  if (Array.isArray(sort)) {
    return sort as string[];
  }

  // Handle object sort with op and order
  if (typeof sort === 'object' && sort.op && sort.order) {
    const op = sort.op === 'average' ? 'mean' : sort.op; // Map 'average' to 'mean'
    const order = sort.order === 'ascending' ? 'ascending' : 'descending';
    return `${op} ${order}` as AxisCategoryOrder;
  }

  return undefined;
}

/**
 * Extracts axis category ordering from Vega-Lite encoding
 * Returns props for xAxisCategoryOrder and yAxisCategoryOrder
 */
function extractAxisCategoryOrderProps(encoding: any): {
  xAxisCategoryOrder?: AxisCategoryOrder;
  yAxisCategoryOrder?: AxisCategoryOrder;
} {
  const result: {
    xAxisCategoryOrder?: AxisCategoryOrder;
    yAxisCategoryOrder?: AxisCategoryOrder;
  } = {};

  if (encoding?.x?.sort) {
    const xOrder = convertVegaSortToAxisCategoryOrder(encoding.x.sort);
    if (xOrder) {
      result.xAxisCategoryOrder = xOrder;
    }
  }

  if (encoding?.y?.sort) {
    const yOrder = convertVegaSortToAxisCategoryOrder(encoding.y.sort);
    if (yOrder) {
      result.yAxisCategoryOrder = yOrder;
    }
  }

  return result;
}

/**
 * Groups data rows into series based on color encoding field
 * Returns a map of series name to data points
 */
function groupDataBySeries(
  dataValues: Array<Record<string, unknown>>,
  xField: string | undefined,
  yField: string | undefined,
  colorField: string | undefined,
  isXTemporal: boolean,
  isYTemporal: boolean,
): Map<string, LineChartDataPoint[]> {
  const seriesMap = new Map<string, LineChartDataPoint[]>();

  if (!xField || !yField) {
    return seriesMap;
  }

  dataValues.forEach(row => {
    const xValue = parseValue(row[xField], isXTemporal);
    const yValue = parseValue(row[yField], isYTemporal);

    // Skip invalid values
    if (xValue === '' || yValue === '' || (typeof yValue !== 'number' && typeof yValue !== 'string')) {
      return;
    }

    const seriesName = colorField && row[colorField] !== undefined ? String(row[colorField]) : 'default';

    if (!seriesMap.has(seriesName)) {
      seriesMap.set(seriesName, []);
    }

    seriesMap.get(seriesName)!.push({
      x: typeof xValue === 'string' ? parseFloat(xValue) || 0 : xValue,
      y: yValue as number,
    });
  });

  return seriesMap;
}

/**
 * Transforms Vega-Lite specification to Fluent LineChart props
 * 
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns LineChartProps for rendering with Fluent LineChart component
 */
export function transformVegaLiteToLineChartProps(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): LineChartProps {
  // Normalize spec into unit specs
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No valid unit specs found in specification');
  }

  // For now, handle single unit spec (first layer)
  // TODO: Support multiple layers by combining data from all layers
  const primarySpec = unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};
  const markProps = getMarkProperties(primarySpec.mark);

  // Extract field names and types
  const xField = encoding.x?.field;
  const yField = encoding.y?.field;
  const colorField = encoding.color?.field;

  const isXTemporal = encoding.x?.type === 'temporal';
  const isYTemporal = encoding.y?.type === 'temporal';

  // Group data into series
  const seriesMap = groupDataBySeries(dataValues, xField, yField, colorField, isXTemporal, isYTemporal);

  // Convert series map to LineChartPoints array
  const lineChartData: LineChartPoints[] = [];
  let seriesIndex = 0;

  seriesMap.forEach((dataPoints, seriesName) => {
    const color = markProps.color || getNextColor(seriesIndex, 0, isDarkTheme);

    const curveOption = mapInterpolateToCurve(markProps.interpolate);

    lineChartData.push({
      legend: seriesName,
      data: dataPoints,
      color,
      ...(curveOption && {
        lineOptions: {
          curve: curveOption,
        },
      }),
    });

    seriesIndex++;
  });

  // Extract chart title
  const chartTitle = typeof spec.title === 'string' ? spec.title : spec.title?.text;

  // Extract axis titles and formats
  const xAxisTitle = encoding.x?.axis?.title ?? undefined;
  const yAxisTitle = encoding.y?.axis?.title ?? undefined;
  const tickFormat = encoding.x?.axis?.format;
  const yAxisTickFormatString = encoding.y?.axis?.format;

  // Convert y-axis format string to d3-format function
  const yAxisTickFormat = yAxisTickFormatString ? d3Format(yAxisTickFormatString) : undefined;

  // Extract tick values and counts
  const tickValues = encoding.x?.axis?.values;
  const yAxisTickCount = encoding.y?.axis?.tickCount;

  // Extract domain/range for min/max values
  const yMinValue = Array.isArray(encoding.y?.scale?.domain) ? encoding.y.scale.domain[0] as number : undefined;
  const yMaxValue = Array.isArray(encoding.y?.scale?.domain) ? encoding.y.scale.domain[1] as number : undefined;

  // Extract annotations and color fill bars from layers
  const annotations = extractAnnotations(spec);
  const colorFillBars = extractColorFillBars(spec, isDarkTheme);

  // Check for log scale on Y-axis
  const yAxisType = extractYAxisType(encoding);

  // Extract axis category ordering
  const categoryOrderProps = extractAxisCategoryOrderProps(encoding);

  // Build LineChartProps
  const chartProps: ChartProps = {
    lineChartData,
    ...(chartTitle && { chartTitle }),
  };

  return {
    data: chartProps,
    width: typeof spec.width === 'number' ? spec.width : undefined,
    height: typeof spec.height === 'number' ? spec.height : undefined,
    ...(xAxisTitle && { chartTitle: xAxisTitle }),
    ...(yAxisTitle && { yAxisTitle }),
    ...(tickFormat && { tickFormat }),
    ...(yAxisTickFormat && { yAxisTickFormat }),
    ...(tickValues && { tickValues }),
    ...(yAxisTickCount && { yAxisTickCount }),
    ...(yMinValue !== undefined && { yMinValue }),
    ...(yMaxValue !== undefined && { yMaxValue }),
    ...(annotations.length > 0 && { annotations }),
    ...(colorFillBars.length > 0 && { colorFillBars }),
    ...(yAxisType && { yAxisType }),
    ...categoryOrderProps,
    hideLegend: encoding.color?.legend?.disable ?? false,
  };
}

/**
 * Generates legend props from Vega-Lite specification
 * Used for multi-plot scenarios where legends are rendered separately
 * 
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns LegendsProps for rendering legends
 */
export function getVegaLiteLegendsProps(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): LegendsProps {
  const unitSpecs = normalizeSpec(spec);
  const legends: Legend[] = [];

  if (unitSpecs.length === 0) {
    return {
      legends,
      centerLegends: true,
      enabledWrapLines: true,
      canSelectMultipleLegends: true,
    };
  }

  const primarySpec = unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};
  const colorField = encoding.color?.field;

  if (!colorField) {
    return {
      legends,
      centerLegends: true,
      enabledWrapLines: true,
      canSelectMultipleLegends: true,
    };
  }

  // Extract unique series names
  const seriesNames = new Set<string>();
  dataValues.forEach(row => {
    if (row[colorField] !== undefined) {
      seriesNames.add(String(row[colorField]));
    }
  });

  // Generate legends
  let seriesIndex = 0;
  seriesNames.forEach(seriesName => {
    const color = getNextColor(seriesIndex, 0, isDarkTheme);
    legends.push({
      title: seriesName,
      color,
    });
    seriesIndex++;
  });

  return {
    legends,
    centerLegends: true,
    enabledWrapLines: true,
    canSelectMultipleLegends: true,
  };
}

/**
 * Extracts chart titles from Vega-Lite specification
 */
export function getVegaLiteTitles(spec: VegaLiteSpec): {
  chartTitle?: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
} {
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    return {};
  }

  const primarySpec = unitSpecs[0];
  const encoding = primarySpec.encoding || {};

  return {
    chartTitle: typeof spec.title === 'string' ? spec.title : spec.title?.text,
    xAxisTitle: encoding.x?.axis?.title ?? undefined,
    yAxisTitle: encoding.y?.axis?.title ?? undefined,
  };
}

/**
 * Transforms Vega-Lite specification to Fluent VerticalBarChart props
 * 
 * Supports bar mark with quantitative y-axis and nominal/ordinal x-axis
 * 
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns VerticalBarChartProps for rendering
 */
export function transformVegaLiteToVerticalBarChartProps(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): VerticalBarChartProps {
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No valid unit specs found in specification');
  }

  const primarySpec = unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};
  const markProps = getMarkProperties(primarySpec.mark);

  const xField = encoding.x?.field;
  const yField = encoding.y?.field;
  const colorField = encoding.color?.field;

  if (!xField || !yField) {
    throw new Error('VegaLiteSchemaAdapter: Both x and y encodings are required for bar charts');
  }

  const barData: VerticalBarChartDataPoint[] = [];
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  dataValues.forEach(row => {
    const xValue = row[xField];
    const yValue = row[yField];

    if (xValue === undefined || yValue === undefined || typeof yValue !== 'number') {
      return;
    }

    const legend = colorField && row[colorField] !== undefined ? String(row[colorField]) : String(xValue);
    
    if (!colorIndex.has(legend)) {
      colorIndex.set(legend, currentColorIndex++);
    }

    const color = markProps.color || getNextColor(colorIndex.get(legend)!, 0, isDarkTheme);

    barData.push({
      x: xValue as number | string,
      y: yValue,
      legend,
      color,
    });
  });

  const titles = getVegaLiteTitles(spec);

  // Extract axis category ordering
  const categoryOrderProps = extractAxisCategoryOrderProps(encoding);

  return {
    data: barData,
    chartTitle: titles.chartTitle,
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
    roundCorners: true,
    wrapXAxisLables: typeof barData[0]?.x === 'string',
    ...categoryOrderProps,
  };
}

/**
 * Transforms Vega-Lite specification to Fluent VerticalStackedBarChart props
 * 
 * Supports stacked bar charts with color encoding for stacking
 * 
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns VerticalStackedBarChartProps for rendering
 */
export function transformVegaLiteToVerticalStackedBarChartProps(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): VerticalStackedBarChartProps {
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No valid unit specs found in specification');
  }

  // Separate bar and line specs from layered specifications
  const barSpecs = unitSpecs.filter(s => {
    const mark = typeof s.mark === 'string' ? s.mark : s.mark?.type;
    return mark === 'bar';
  });
  
  const lineSpecs = unitSpecs.filter(s => {
    const mark = typeof s.mark === 'string' ? s.mark : s.mark?.type;
    return mark === 'line' || mark === 'point';
  });

  if (barSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: At least one bar layer is required for stacked bar charts');
  }

  const primarySpec = barSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};
  const markProps = getMarkProperties(primarySpec.mark);

  const xField = encoding.x?.field;
  const yField = encoding.y?.field;
  const colorField = encoding.color?.field;
  const colorValue = encoding.color?.value; // Static color value

  if (!xField || !yField) {
    throw new Error('VegaLiteSchemaAdapter: x and y encodings are required for stacked bar charts');
  }

  // Group data by x value, then by color (stack)
  const mapXToDataPoints: { [key: string]: VerticalStackedChartProps } = {};
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  // Process bar data
  dataValues.forEach(row => {
    const xValue = row[xField];
    const yValue = row[yField];
    const stackValue = colorField ? row[colorField] : 'Bar'; // Default legend if no color field

    if (xValue === undefined || yValue === undefined || typeof yValue !== 'number') {
      return;
    }

    const xKey = String(xValue);
    const legend = stackValue !== undefined ? String(stackValue) : 'Bar';

    if (!mapXToDataPoints[xKey]) {
      mapXToDataPoints[xKey] = {
        xAxisPoint: xValue as number | string,
        chartData: [],
        lineData: [],
      };
    }

    if (!colorIndex.has(legend)) {
      colorIndex.set(legend, currentColorIndex++);
    }

    // Use static color if provided, otherwise use color scale
    const color = colorValue || markProps.color || getNextColor(colorIndex.get(legend)!, 0, isDarkTheme);

    mapXToDataPoints[xKey].chartData.push({
      legend,
      data: yValue,
      color,
    });
  });

  // Process line data from additional layers (if any)
  lineSpecs.forEach((lineSpec, lineIndex) => {
    const lineDataValues = extractDataValues(lineSpec.data);
    const lineEncoding = lineSpec.encoding || {};
    const lineMarkProps = getMarkProperties(lineSpec.mark);

    const lineXField = lineEncoding.x?.field;
    const lineYField = lineEncoding.y?.field;
    const lineColorField = lineEncoding.color?.field;

    if (!lineXField || !lineYField) {
      return; // Skip if required fields are missing
    }

    const lineLegendBase = lineColorField ? 'Line' : `Line ${lineIndex + 1}`;
    
    lineDataValues.forEach(row => {
      const xValue = row[lineXField];
      const yValue = row[lineYField];

      if (xValue === undefined || yValue === undefined) {
        return;
      }

      const xKey = String(xValue);
      const lineLegend = lineColorField && row[lineColorField] !== undefined 
        ? String(row[lineColorField]) 
        : lineLegendBase;

      // Ensure x-axis point exists
      if (!mapXToDataPoints[xKey]) {
        mapXToDataPoints[xKey] = {
          xAxisPoint: xValue as number | string,
          chartData: [],
          lineData: [],
        };
      }

      // Determine line color
      let lineColor: string;
      if (lineMarkProps.color) {
        lineColor = lineMarkProps.color;
      } else if (lineColorField && row[lineColorField] !== undefined) {
        const lineColorKey = String(row[lineColorField]);
        if (!colorIndex.has(lineColorKey)) {
          colorIndex.set(lineColorKey, currentColorIndex++);
        }
        lineColor = getNextColor(colorIndex.get(lineColorKey)!, 0, isDarkTheme);
      } else {
        // Default color for lines
        lineColor = getNextColor(currentColorIndex++, 0, isDarkTheme);
      }

      // Determine if this line should use secondary Y-axis
      // Check if spec has independent Y scales AND line uses different Y field than bars
      const hasIndependentYScales = (spec as any).resolve?.scale?.y === 'independent';
      const useSecondaryYScale = hasIndependentYScales && lineYField !== yField;

      const lineData: LineDataInVerticalStackedBarChart = {
        y: yValue as number,
        color: lineColor,
        legend: lineLegend,
        legendShape: 'triangle',
        data: typeof yValue === 'number' ? yValue : undefined,
        useSecondaryYScale,
      };

      // Add line options if available
      if (lineMarkProps.strokeWidth) {
        lineData.lineOptions = {
          strokeWidth: lineMarkProps.strokeWidth,
        };
      }

      mapXToDataPoints[xKey].lineData!.push(lineData);
    });
  });

  const chartData = Object.values(mapXToDataPoints);
  const titles = getVegaLiteTitles(spec);

  // Check if we have secondary Y-axis data
  const hasSecondaryYAxis = chartData.some(point => 
    point.lineData?.some(line => line.useSecondaryYScale)
  );

  // Extract secondary Y-axis properties from line layers
  let secondaryYAxisProps = {};
  if (hasSecondaryYAxis && lineSpecs.length > 0) {
    const lineSpec = lineSpecs[0];
    const lineEncoding = lineSpec.encoding || {};
    const lineYAxis = lineEncoding.y?.axis;
    
    if (lineYAxis?.title) {
      secondaryYAxisProps = {
        secondaryYAxistitle: lineYAxis.title,
      };
    }
  }

  // Check for log scale on primary Y-axis
  const yAxisType = extractYAxisType(encoding);

  // Extract axis category ordering
  const categoryOrderProps = extractAxisCategoryOrderProps(encoding);

  return {
    data: chartData,
    chartTitle: titles.chartTitle,
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
    width: spec.width as number | undefined,
    height: (spec.height as number | undefined) ?? 350,
    hideLegend: true,
    showYAxisLables: true,
    roundCorners: true,
    hideTickOverlap: true,
    barGapMax: 2,
    noOfCharsToTruncate: 20,
    showYAxisLablesTooltip: true,
    wrapXAxisLables: typeof chartData[0]?.xAxisPoint === 'string',
    ...(yAxisType && { yAxisType }),
    ...secondaryYAxisProps,
    ...categoryOrderProps,
  };
}

/**
 * Transforms Vega-Lite specification to Fluent GroupedVerticalBarChart props
 * 
 * Supports grouped bar charts with color encoding for grouping
 * 
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns GroupedVerticalBarChartProps for rendering
 */
export function transformVegaLiteToGroupedVerticalBarChartProps(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): GroupedVerticalBarChartProps {
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No valid unit specs found in specification');
  }

  const primarySpec = unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};

  const xField = encoding.x?.field;
  const yField = encoding.y?.field;
  const colorField = encoding.color?.field;

  if (!xField || !yField || !colorField) {
    throw new Error('VegaLiteSchemaAdapter: x, y, and color encodings are required for grouped bar charts');
  }

  // Group data by x value (name), then by color (series)
  const groupedData: { [key: string]: { [legend: string]: number } } = {};
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  dataValues.forEach(row => {
    const xValue = row[xField];
    const yValue = row[yField];
    const groupValue = row[colorField];

    if (xValue === undefined || yValue === undefined || typeof yValue !== 'number' || groupValue === undefined) {
      return;
    }

    const xKey = String(xValue);
    const legend = String(groupValue);

    if (!groupedData[xKey]) {
      groupedData[xKey] = {};
    }

    groupedData[xKey][legend] = yValue;

    if (!colorIndex.has(legend)) {
      colorIndex.set(legend, currentColorIndex++);
    }
  });

  // Convert to GroupedVerticalBarChartData format
  const chartData = Object.keys(groupedData).map(name => {
    const series = Object.keys(groupedData[name]).map(legend => ({
      key: legend,
      data: groupedData[name][legend],
      legend,
      color: getNextColor(colorIndex.get(legend)!, 0, isDarkTheme),
    }));

    return {
      name,
      series,
    };
  });

  const titles = getVegaLiteTitles(spec);

  return {
    data: chartData,
    chartTitle: titles.chartTitle,
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
  };
}

/**
 * Transforms Vega-Lite specification to Fluent HorizontalBarChartWithAxis props
 * 
 * Supports horizontal bar charts with quantitative x-axis and nominal/ordinal y-axis
 * 
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns HorizontalBarChartWithAxisProps for rendering
 */
export function transformVegaLiteToHorizontalBarChartProps(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): HorizontalBarChartWithAxisProps {
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No valid unit specs found in specification');
  }

  const primarySpec = unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};
  const markProps = getMarkProperties(primarySpec.mark);

  const xField = encoding.x?.field;
  const yField = encoding.y?.field;
  const colorField = encoding.color?.field;

  if (!xField || !yField) {
    throw new Error('VegaLiteSchemaAdapter: Both x and y encodings are required for horizontal bar charts');
  }

  const barData: HorizontalBarChartWithAxisDataPoint[] = [];
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  dataValues.forEach(row => {
    const xValue = row[xField];
    const yValue = row[yField];

    if (xValue === undefined || yValue === undefined || typeof xValue !== 'number') {
      return;
    }

    const legend = colorField && row[colorField] !== undefined ? String(row[colorField]) : String(yValue);
    
    if (!colorIndex.has(legend)) {
      colorIndex.set(legend, currentColorIndex++);
    }

    const color = markProps.color || getNextColor(colorIndex.get(legend)!, 0, isDarkTheme);

    barData.push({
      x: xValue,
      y: yValue as number | string,
      legend,
      color,
    });
  });

  const titles = getVegaLiteTitles(spec);
  const annotations = extractAnnotations(spec);
  const tickConfig = extractTickConfig(spec);

  const result: HorizontalBarChartWithAxisProps = {
    data: barData,
    chartTitle: titles.chartTitle,
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
  };

  if (annotations.length > 0) {
    result.annotations = annotations;
  }

  if (tickConfig.tickValues) {
    result.tickValues = tickConfig.tickValues as number[] | string[] | Date[];
  }

  if (tickConfig.xAxisTickCount) {
    result.xAxisTickCount = tickConfig.xAxisTickCount;
  }

  if (tickConfig.yAxisTickCount) {
    result.yAxisTickCount = tickConfig.yAxisTickCount;
  }

  return result;
}

/**
 * Transforms Vega-Lite specification to Fluent AreaChart props
 * 
 * Area charts use the same data structure as line charts but with filled areas.
 * Supports temporal/quantitative x-axis and quantitative y-axis with color-encoded series
 * 
 * Vega-Lite Stacking Behavior:
 * - If y.stack is null or undefined with no color encoding: mode = 'tozeroy' (fill to zero baseline)
 * - If y.stack is 'zero' or color encoding exists: mode = 'tonexty' (stacked areas)
 * - Multiple series with color encoding automatically stack
 * 
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns AreaChartProps for rendering
 */
export function transformVegaLiteToAreaChartProps(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): AreaChartProps {
  // Area charts use the same structure as line charts in Fluent Charts
  // The only difference is the component renders with filled areas
  const lineChartProps = transformVegaLiteToLineChartProps(spec, colorMap, isDarkTheme);
  
  // Determine stacking mode based on Vega-Lite spec
  const unitSpecs = normalizeSpec(spec);
  const primarySpec = unitSpecs[0];
  const encoding = primarySpec?.encoding || {};
  
  // Check if stacking is enabled
  // In Vega-Lite, area charts stack by default when color encoding is present
  // stack can be explicitly set to null to disable stacking
  const hasColorEncoding = !!encoding.color?.field;
  const stackConfig = encoding.y?.stack;
  const isStacked = stackConfig !== null && (stackConfig === 'zero' || hasColorEncoding);
  
  // Set mode: 'tozeroy' for single series, 'tonexty' for stacked
  const mode: 'tozeroy' | 'tonexty' = isStacked ? 'tonexty' : 'tozeroy';
  
  return {
    ...lineChartProps,
    mode,
  } as AreaChartProps;
}

/**
 * Transforms Vega-Lite specification to Fluent ScatterChart props
 * 
 * Supports scatter plots with quantitative x and y axes and color-encoded series
 * 
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns ScatterChartProps for rendering
 */
export function transformVegaLiteToScatterChartProps(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): ScatterChartProps {
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No valid unit specs found in specification');
  }

  const primarySpec = unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};
  const markProps = getMarkProperties(primarySpec.mark);

  const xField = encoding.x?.field;
  const yField = encoding.y?.field;
  const colorField = encoding.color?.field;
  const sizeField = encoding.size?.field;

  if (!xField || !yField) {
    throw new Error('VegaLiteSchemaAdapter: Both x and y encodings are required for scatter charts');
  }

  const isXTemporal = encoding.x?.type === 'temporal';
  const isYTemporal = encoding.y?.type === 'temporal';

  // Group data by series (color encoding)
  const groupedData: Record<string, Array<Record<string, unknown>>> = {};
  
  dataValues.forEach(row => {
    const seriesName = colorField && row[colorField] !== undefined ? String(row[colorField]) : 'default';
    
    if (!groupedData[seriesName]) {
      groupedData[seriesName] = [];
    }
    
    groupedData[seriesName].push(row);
  });

  const seriesNames = Object.keys(groupedData);

  const chartData: LineChartPoints[] = seriesNames.map((seriesName, index) => {
    const seriesData = groupedData[seriesName];
    
    const points: ScatterChartDataPoint[] = seriesData.map(row => {
      const xValue = parseValue(row[xField], isXTemporal);
      const yValue = parseValue(row[yField], isYTemporal);
      const markerSize = sizeField && row[sizeField] !== undefined ? Number(row[sizeField]) : undefined;

      return {
        x: typeof xValue === 'number' || xValue instanceof Date ? xValue : String(xValue),
        y: typeof yValue === 'number' ? yValue : 0,
        ...(markerSize !== undefined && { markerSize }),
      };
    });

    // Get color for this series
    const colorValue = colorField && encoding.color?.scale?.range && Array.isArray(encoding.color.scale.range)
      ? encoding.color.scale.range[index]
      : markProps.color;
    const color = typeof colorValue === 'string' ? colorValue : getNextColor(index, 0, isDarkTheme);

    return {
      legend: seriesName,
      data: points,
      color,
    };
  });

  const titles = getVegaLiteTitles(spec);
  const annotations = extractAnnotations(spec);
  const tickConfig = extractTickConfig(spec);

  // Check for log scale on Y-axis
  const yAxisType = extractYAxisType(encoding);

  // Extract axis category ordering
  const categoryOrderProps = extractAxisCategoryOrderProps(encoding);

  const result: ScatterChartProps = {
    data: {
      chartTitle: titles.chartTitle,
      scatterChartData: chartData,
    },
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
    ...(yAxisType && { yAxisType }),
    ...categoryOrderProps,
  };

  if (annotations.length > 0) {
    result.annotations = annotations;
  }

  if (tickConfig.tickValues) {
    result.tickValues = tickConfig.tickValues as number[] | string[] | Date[];
  }

  if (tickConfig.xAxisTickCount) {
    result.xAxisTickCount = tickConfig.xAxisTickCount;
  }

  if (tickConfig.yAxisTickCount) {
    result.yAxisTickCount = tickConfig.yAxisTickCount;
  }

  return result;
}

/**
 * Transforms Vega-Lite specification to Fluent DonutChart props
 * 
 * Supports pie/donut charts with arc marks and theta encoding
 * 
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns DonutChartProps for rendering
 */
export function transformVegaLiteToDonutChartProps(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): DonutChartProps {
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No valid unit specs found in specification');
  }

  const primarySpec = unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};

  const thetaField = encoding.theta?.field;
  const colorField = encoding.color?.field;

  if (!thetaField) {
    throw new Error('VegaLiteSchemaAdapter: Theta encoding is required for donut charts');
  }

  // Extract innerRadius from mark properties if available
  const mark = primarySpec.mark;
  const innerRadius = typeof mark === 'object' && (mark as any)?.innerRadius !== undefined 
    ? (mark as any).innerRadius 
    : 0;

  const chartData: ChartDataPoint[] = [];
  const colorIndex = new Map<string, number>();
  let currentColorIndex = 0;

  dataValues.forEach(row => {
    const value = row[thetaField];
    const legend = colorField && row[colorField] !== undefined ? String(row[colorField]) : String(value);

    if (value === undefined || typeof value !== 'number') {
      return;
    }

    if (!colorIndex.has(legend)) {
      colorIndex.set(legend, currentColorIndex++);
    }

    chartData.push({
      legend,
      data: value,
      color: getNextColor(colorIndex.get(legend)!, 0, isDarkTheme),
    });
  });

  const titles = getVegaLiteTitles(spec);

  return {
    data: {
      chartTitle: titles.chartTitle,
      chartData,
    },
    innerRadius,
  };
}

/**
 * Transforms Vega-Lite specification to Fluent HeatMapChart props
 * 
 * Supports heatmaps with rect marks and x/y/color encodings
 * 
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns HeatMapChartProps for rendering
 */
export function transformVegaLiteToHeatMapChartProps(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): HeatMapChartProps {
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No valid unit specs found in specification');
  }

  const primarySpec = unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};

  const xField = encoding.x?.field;
  const yField = encoding.y?.field;
  const colorField = encoding.color?.field;

  if (!xField || !yField || !colorField) {
    throw new Error('VegaLiteSchemaAdapter: x, y, and color encodings are required for heatmap charts');
  }

  const heatmapDataPoints: HeatMapChartDataPoint[] = [];
  let minValue = Number.POSITIVE_INFINITY;
  let maxValue = Number.NEGATIVE_INFINITY;

  dataValues.forEach(row => {
    const xValue = row[xField];
    const yValue = row[yField];
    const colorValue = row[colorField];

    if (xValue === undefined || yValue === undefined || colorValue === undefined) {
      return;
    }

    const value = typeof colorValue === 'number' ? colorValue : 0;
    
    minValue = Math.min(minValue, value);
    maxValue = Math.max(maxValue, value);

    heatmapDataPoints.push({
      x: xValue as string | Date | number,
      y: yValue as string | Date | number,
      value,
      rectText: value,
    });
  });

  const heatmapData: HeatMapChartData = {
    legend: '',
    data: heatmapDataPoints,
    value: 0,
  };

  const titles = getVegaLiteTitles(spec);

  // Create color scale domain and range
  // Use a simple 5-point gradient from min to max
  const steps = 5;
  const domainValues: number[] = [];
  const rangeValues: string[] = [];
  
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    domainValues.push(minValue + (maxValue - minValue) * t);
    
    // Generate gradient from blue to red (cold to hot)
    // In dark theme, use different colors
    if (isDarkTheme) {
      // Dark theme: darker blue to bright orange
      const r = Math.round(0 + 255 * t);
      const g = Math.round(100 + (165 - 100) * t);
      const b = Math.round(255 - 255 * t);
      rangeValues.push(`rgb(${r}, ${g}, ${b})`);
    } else {
      // Light theme: light blue to red
      const r = Math.round(0 + 255 * t);
      const g = Math.round(150 - 150 * t);
      const b = Math.round(255 - 255 * t);
      rangeValues.push(`rgb(${r}, ${g}, ${b})`);
    }
  }

  return {
    chartTitle: titles.chartTitle,
    data: [heatmapData],
    domainValuesForColorScale: domainValues,
    rangeValuesForColorScale: rangeValues,
    xAxisTitle: titles.xAxisTitle,
    yAxisTitle: titles.yAxisTitle,
    width: spec.width as number | undefined,
    height: (spec.height as number | undefined) ?? 350,
    hideLegend: true,
    showYAxisLables: true,
    sortOrder: 'none',
    hideTickOverlap: true,
    noOfCharsToTruncate: 20,
    showYAxisLablesTooltip: true,
    wrapXAxisLables: true,
  };
}

/**
 * Helper function to get bin center for display
 */
function getBinCenter(bin: Bin<number, number>): number {
  return (bin.x0! + bin.x1!) / 2;
}

/**
 * Helper function to calculate histogram aggregation function
 * 
 * @param aggregate - Aggregation type (count, sum, mean, min, max)
 * @param bin - Binned data values
 * @returns Aggregated value
 */
function calculateHistogramAggregate(
  aggregate: 'count' | 'sum' | 'mean' | 'average' | 'median' | 'min' | 'max' | undefined,
  bin: number[],
): number {
  switch (aggregate) {
    case 'sum':
      return d3Sum(bin);
    case 'mean':
    case 'average':
      return bin.length === 0 ? 0 : d3Mean(bin) ?? 0;
    case 'min':
      return d3Min(bin) ?? 0;
    case 'max':
      return d3Max(bin) ?? 0;
    case 'count':
    default:
      return bin.length;
  }
}

/**
 * Transforms Vega-Lite specification to Fluent VerticalBarChart props for histogram rendering
 * 
 * Supports histograms with binned x-axis and aggregated y-axis
 * Vega-Lite syntax: `{ "mark": "bar", "encoding": { "x": { "field": "value", "bin": true }, "y": { "aggregate": "count" } } }`
 * 
 * @param spec - Vega-Lite specification
 * @param colorMap - Color mapping ref for consistent coloring
 * @param isDarkTheme - Whether dark theme is active
 * @returns VerticalBarChartProps for rendering histogram
 */
export function transformVegaLiteToHistogramProps(
  spec: VegaLiteSpec,
  colorMap: React.RefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): VerticalBarChartProps {
  const unitSpecs = normalizeSpec(spec);

  if (unitSpecs.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No valid unit specs found in specification');
  }

  const primarySpec = unitSpecs[0];
  const dataValues = extractDataValues(primarySpec.data);
  const encoding = primarySpec.encoding || {};

  const xField = encoding.x?.field;
  const yAggregate = encoding.y?.aggregate || 'count';
  const binConfig = encoding.x?.bin;

  if (!xField || !binConfig) {
    throw new Error('VegaLiteSchemaAdapter: Histogram requires x encoding with bin property');
  }

  // Extract numeric values from the field
  const values = dataValues
    .map(row => row[xField])
    .filter(val => typeof val === 'number') as number[];

  if (values.length === 0) {
    throw new Error('VegaLiteSchemaAdapter: No numeric values found for histogram binning');
  }

  // Create bins using d3
  const [minVal, maxVal] = d3Extent(values) as [number, number];
  const binGenerator = d3Bin().domain([minVal, maxVal]);

  // Apply bin configuration
  if (typeof binConfig === 'object') {
    if (binConfig.maxbins) {
      binGenerator.thresholds(binConfig.maxbins);
    }
    if (binConfig.extent) {
      binGenerator.domain(binConfig.extent);
    }
  }

  const bins = binGenerator(values);
  
  // Calculate histogram data points
  const histogramData: VerticalBarChartDataPoint[] = bins.map(bin => {
    const x = getBinCenter(bin);
    const y = calculateHistogramAggregate(yAggregate, bin);
    const xAxisCalloutData = `[${bin.x0} - ${bin.x1})`;

    return {
      x,
      y,
      legend: encoding.color?.field ? String(dataValues[0]?.[encoding.color.field]) : 'Frequency',
      color: getNextColor(0, 0, isDarkTheme),
      xAxisCalloutData,
    };
  });

  const titles = getVegaLiteTitles(spec);
  const annotations = extractAnnotations(spec);

  return {
    data: histogramData,
    chartTitle: titles.chartTitle,
    xAxisTitle: titles.xAxisTitle || xField,
    yAxisTitle: titles.yAxisTitle || yAggregate,
    roundCorners: true,
    hideTickOverlap: true,
    maxBarWidth: 50,
    ...(annotations.length > 0 && { annotations }),
    mode: 'histogram',
  };
}
