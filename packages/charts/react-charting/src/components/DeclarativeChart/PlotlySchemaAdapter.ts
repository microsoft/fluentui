/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import * as React from 'react';
import {
  bin as d3Bin,
  extent as d3Extent,
  sum as d3Sum,
  min as d3Min,
  max as d3Max,
  range as d3Range,
  Bin,
} from 'd3-array';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { format as d3Format } from 'd3-format';
import { IDonutChartProps } from '../DonutChart/index';
import {
  IChartDataPoint,
  IChartProps,
  IHorizontalBarChartWithAxisDataPoint,
  ILineChartPoints,
  IVerticalStackedChartProps,
  IHeatMapChartData,
  IHeatMapChartDataPoint,
  IVerticalBarChartDataPoint,
  ISankeyChartData,
  ILineChartLineOptions,
  IGanttChartDataPoint,
} from '../../types/IDataPoint';
import { ISankeyChartProps } from '../SankeyChart/index';
import { IVerticalStackedBarChartProps } from '../VerticalStackedBarChart/index';
import { IHorizontalBarChartWithAxisProps } from '../HorizontalBarChartWithAxis/index';
import { ILineChartProps } from '../LineChart/index';
import { IAreaChartProps } from '../AreaChart/index';
import { IHeatMapChartProps } from '../HeatMapChart/index';
import { DataVizPalette, getColorFromToken } from '../../utilities/colors';
import { GaugeChartVariant, IGaugeChartProps, IGaugeChartSegment } from '../GaugeChart/index';
import { IGroupedVerticalBarChartProps } from '../GroupedVerticalBarChart/index';
import { IVerticalBarChartProps } from '../VerticalBarChart/index';
import { IChartTableProps } from '../ChartTable/index';
import {
  DEFAULT_DATE_STRING,
  findNumericMinMaxOfY,
  formatScientificLimitWidth,
  MIN_DONUT_RADIUS,
} from '../../utilities/utilities';
import type {
  Datum,
  Layout,
  PlotlySchema,
  PieData,
  PlotData,
  SankeyData,
  ScatterLine,
  TypedArray,
  Data,
  TableData,
  Color,
  LayoutAxis,
  XAxisName,
  TraceInfo,
  DTickValue,
  AxisType,
} from '@fluentui/chart-utilities';
import {
  isArrayOrTypedArray,
  isDate,
  isDateArray,
  isNumberArray,
  isStringArray,
  isYearArray,
  isInvalidValue,
  formatToLocaleString,
  isNumber,
  isObjectArray,
  getAxisIds,
  getAxisKey,
  isScatterAreaChart,
} from '@fluentui/chart-utilities';
import { curveCardinal as d3CurveCardinal } from 'd3-shape';
import { IScatterChartProps } from '../ScatterChart/index';
import type { ColorwayType } from './PlotlyColorAdapter';
import { IFunnelChartDataPoint, IFunnelChartProps } from '../FunnelChart/FunnelChart.types';
import { getOpacity, extractColor, resolveColor, createColorScale } from './PlotlyColorAdapter';
import { ILegend, ILegendsProps } from '../Legends/index';
import { rgb } from 'd3-color';
import { ICartesianChartProps } from '../CommonComponents/index';
import { IGanttChartProps } from '../GanttChart/GanttChart.types';
import { calculatePrecision, precisionRound } from '@fluentui/react';

export const NON_PLOT_KEY_PREFIX = 'nonplot_';
export const SINGLE_REPEAT = 'repeat(1, 1fr)';

type DomainInterval = {
  start: number;
  end: number;
};

export type AxisProperties = {
  xAnnotation?: string;
  yAnnotation?: string;
  row: number;
  column: number;
  xDomain: DomainInterval;
  yDomain: DomainInterval;
};
export type GridAxisProperties = Record<string, AxisProperties>;

export type GridProperties = {
  templateRows: string;
  templateColumns: string;
  layout: GridAxisProperties;
};

type ScatterChartTypes = 'area' | 'line' | 'scatter';

interface ISecondaryYAxisValues {
  secondaryYAxistitle?: string;
  secondaryYScaleOptions?: { yMinValue?: number; yMaxValue?: number };
}

const dashOptions = {
  dot: {
    strokeDasharray: '1, 5',
    strokeLinecap: 'round',
    strokeWidth: '2',
    lineBorderWidth: '4',
  },
  dash: {
    strokeDasharray: '5, 5',
    strokeLinecap: 'butt',
    strokeWidth: '2',
    lineBorderWidth: '4',
  },
  longdash: {
    strokeDasharray: '10, 5',
    strokeLinecap: 'butt',
    strokeWidth: '2',
    lineBorderWidth: '4',
  },
  dashdot: {
    strokeDasharray: '5, 5, 1, 5',
    strokeLinecap: 'butt',
    strokeWidth: '2',
    lineBorderWidth: '4',
  },
  longdashdot: {
    strokeDasharray: '10, 5, 1, 5',
    strokeLinecap: 'butt',
    strokeWidth: '2',
    lineBorderWidth: '4',
  },
  solid: {
    strokeDasharray: '0',
    strokeLinecap: 'butt',
    strokeWidth: '2',
    lineBorderWidth: '4',
  },
} as const;

function getTitles(layout: Partial<Layout> | undefined) {
  const titles = {
    chartTitle: typeof layout?.title === 'string' ? layout.title : layout?.title?.text ?? '',
    xAxisTitle: typeof layout?.xaxis?.title === 'string' ? layout?.xaxis?.title : layout?.xaxis?.title?.text ?? '',
    yAxisTitle: typeof layout?.yaxis?.title === 'string' ? layout?.yaxis?.title : layout?.yaxis?.title?.text ?? '',
  };
  return titles;
}

const getXAxisTickFormat = (series: Data, layout: Partial<Layout> | undefined) => {
  const xAxis = getXAxisProperties(series, layout);
  if (xAxis?.tickformat) {
    return {
      tickFormat: xAxis?.tickformat,
    };
  }

  return {};
};

const getYAxisTickFormat = (series: Data, layout: Partial<Layout> | undefined) => {
  const yAxis = getYAxisProperties(series, layout);
  if (yAxis?.tickformat) {
    return {
      yAxisTickFormat: d3Format(yAxis?.tickformat),
    };
  }

  return {};
};

const getYMinMaxValues = (series: Data, layout: Partial<Layout> | undefined) => {
  const range = getYAxisProperties(series, layout)?.range;
  if (range && range.length === 2) {
    return {
      yMinValue: range[0],
      yMaxValue: range[1],
    };
  }
  return {};
};

const getYAxisProperties = (series: Data, layout: Partial<Layout> | undefined): Partial<LayoutAxis> | undefined => {
  return layout?.yaxis;
};

const getXAxisProperties = (series: Data, layout: Partial<Layout> | undefined): Partial<LayoutAxis> | undefined => {
  return layout?.xaxis;
};

const getFormattedCalloutYData = (
  yVal: string | number,
  yAxisFormat: ReturnType<typeof getYAxisTickFormat>,
): string => {
  if (typeof yAxisFormat?.yAxisTickFormat === 'function' && typeof yVal === 'number') {
    return yAxisFormat.yAxisTickFormat(yVal);
  }
  return formatToLocaleString(yVal) as string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const correctYearMonth = (xValues: Datum[] | Datum[][] | TypedArray): any[] => {
  const presentYear = new Date().getFullYear();
  if (xValues.length > 0 && Array.isArray(xValues[0])) {
    throw new Error('updateXValues:: 2D array not supported');
  }
  const dates = (xValues as Datum[]).map(possiblyMonthValue => {
    const parsedDate = `${possiblyMonthValue} 01, ${presentYear}`;
    return isDate(parsedDate) ? new Date(parsedDate) : null;
  });
  const filteredDateIndexPairs = dates.map((date, index) => [date, index]).filter(([date]) => date !== null) as [
    Date,
    number,
  ][];
  for (let i = filteredDateIndexPairs.length - 1; i > 0; i--) {
    const currentDate = filteredDateIndexPairs[i][0];
    const previousDate = filteredDateIndexPairs[i - 1][0];
    const currentMonth = currentDate.getMonth();
    const previousMonth = previousDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousYear = previousDate.getFullYear();
    if (previousMonth >= currentMonth) {
      filteredDateIndexPairs[i - 1][0].setFullYear(currentYear - 1);
    } else if (previousYear > currentYear) {
      filteredDateIndexPairs[i - 1][0].setFullYear(currentYear);
    }
    dates[filteredDateIndexPairs[i - 1][1]] = filteredDateIndexPairs[i - 1][0];
  }
  xValues = (xValues as Datum[]).map((month, index) => {
    if (dates[index] === null) {
      return null;
    }

    return `${month} 01, ${dates[index]!.getFullYear()}`;
  });
  return xValues;
};

const usesSecondaryYScale = (series: Partial<PlotData>, layout: Partial<Layout> | undefined): boolean => {
  return series.yaxis === 'y2' && (layout?.yaxis2?.anchor === 'x' || layout?.yaxis2?.side === 'right');
};

const getSecondaryYAxisValues = (data: Data[], layout: Partial<Layout> | undefined): ISecondaryYAxisValues => {
  let containsSecondaryYAxis = false;
  let yMinValue: number | undefined;
  let yMaxValue: number | undefined;
  let allLineSeries = true;

  data.forEach((series: Partial<PlotData>) => {
    if (usesSecondaryYScale(series, layout)) {
      containsSecondaryYAxis = true;

      const yValues = series.y as number[];
      if (yValues) {
        yMinValue = Math.min(...yValues);
        yMaxValue = Math.max(...yValues);
      }

      if (series.type !== 'scatter' || isScatterAreaChart(series)) {
        allLineSeries = false;
      }
    }
  });

  if (!containsSecondaryYAxis) {
    return {};
  }

  if (!allLineSeries) {
    if (typeof yMinValue === 'number') {
      yMinValue = Math.min(yMinValue, 0);
    }
    if (typeof yMaxValue === 'number') {
      yMaxValue = Math.max(yMaxValue, 0);
    }
  }
  if (layout?.yaxis2?.range) {
    yMinValue = layout.yaxis2.range[0];
    yMaxValue = layout.yaxis2.range[1];
  }

  return {
    secondaryYAxistitle:
      typeof layout?.yaxis2?.title === 'string'
        ? layout.yaxis2.title
        : typeof layout?.yaxis2?.title?.text === 'string'
        ? layout.yaxis2.title.text
        : undefined,
    secondaryYScaleOptions: {
      yMinValue,
      yMaxValue,
    },
  };
};

export const _getGaugeAxisColor = (
  colorway: string[] | undefined,
  colorwayType: ColorwayType,
  color: Color | undefined,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): string => {
  const extractedColors = extractColor(colorway, colorwayType, color, colorMap, isDarkTheme);
  return resolveColor(extractedColors, 0, '', colorMap, colorway, isDarkTheme);
};

export const resolveXAxisPoint = (
  x: Datum,
  isXYearCategory: boolean,
  isXString: boolean,
  isXDate: boolean,
  isXNumber: boolean,
): string | Date | number => {
  if (x === null || x === undefined) {
    return '';
  }
  if (isXYearCategory) {
    return x.toString();
  }
  if (isXString) {
    if (isXDate) {
      const date = new Date(x as string);
      return date;
    }
    if (isXNumber) {
      return parseFloat(x as string);
    }
    return x;
  }
  return x;
};

/**
 * Checks if a key should be ignored during normalization
 * @param key The key to check
 * @returns true if the key should be ignored
 */
const shouldIgnoreKey = (key: string): boolean => {
  const lowerKey = key.toLowerCase();
  if (lowerKey.includes('style') || lowerKey === 'style') {
    return true;
  }
  // Use regex to match common CSS property patterns
  // (color, fill, stroke, border, background, font, shadow, outline, etc.)
  const cssKeyRegex = new RegExp(
    '^(color|fill|stroke|border|background|font|shadow|outline|margin|padding|gap|align|justify|display|flex|grid|' +
      'text|line|letter|word|vertical|horizontal|overflow|position|top|right|bottom|left|zindex|z-index|opacity|' +
      'filter|clip|cursor|resize|transition|animation|transform|box|column|row|direction|visibility|' +
      'content|width|height|aspect|image|user|pointer|caret|scroll|%)|(-webkit-|-moz-|-ms-|-o-)',
    'i',
  );
  if (cssKeyRegex.test(lowerKey)) {
    return true;
  }
  return false;
};

/**
 * Flattens a nested object into a single level object with dot notation keys
 * @param obj Object to flatten
 * @param prefix Optional prefix for keys
 * @returns Flattened object
 */
const flattenObject = (obj: Record<string, unknown>, prefix: string = ''): Record<string, unknown> => {
  const flattened: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date)) {
        // Recursively flatten nested objects
        Object.assign(flattened, flattenObject(value as Record<string, unknown>, newKey));
      } else {
        flattened[newKey] = value;
      }
    }
  }

  return flattened;
};

/**
 * Normalizes an array of objects by flattening nested structures and creating grouped data
 * Uses json_normalize approach with D3 color detection and filtering
 * @param data Array of objects to normalize
 * @returns Object containing traces for grouped vertical bar chart
 */
export const normalizeObjectArrayForGVBC = (
  data: Array<Record<string, unknown>>,
  xLabels?: string[],
): { traces: Array<Record<string, unknown>>; x: string[] } => {
  if (!data || data.length === 0) {
    return { traces: [], x: [] };
  }

  // Use provided xLabels if available, otherwise default to Item 1, Item 2, ...
  const x = xLabels && xLabels.length === data.length ? xLabels : data.map((_, index) => `Item ${index + 1}`);

  // First, flatten all objects and collect all unique keys, excluding style keys
  const flattenedObjects = data.map((item, index) => {
    if (typeof item === 'object' && item !== null) {
      const flattened = flattenObject(item);
      // Only keep keys where the value is numeric (number or numeric string) and not a style key
      const filtered: Record<string, unknown> = {};
      Object.keys(flattened).forEach(key => {
        const value = flattened[key];
        if (!shouldIgnoreKey(key) && (typeof value === 'number' || (typeof value === 'string' && isNumber(value)))) {
          filtered[key] = value;
        }
      });
      return filtered;
    } else if (typeof item === 'number' || (typeof item === 'string' && isNumber(item))) {
      // Only keep primitive numeric values
      return { [x[index] || `item_${index}`]: item };
    } else {
      // Non-numeric primitive, ignore by returning empty object
      return {};
    }
  });

  // Collect all unique keys across all objects
  const allKeys = new Set<string>();
  flattenedObjects.forEach(obj => {
    Object.keys(obj).forEach(key => allKeys.add(key));
  });

  // Create traces for each key (property)
  const traces: Array<Record<string, unknown>> = [];

  allKeys.forEach(key => {
    const yValues: number[] = [];
    let hasValidData = false;
    let isNumericData = false;

    flattenedObjects.forEach((obj, index) => {
      const value = obj[key];
      if (typeof value === 'number') {
        yValues.push(value);
        hasValidData = true;
        isNumericData = true;
      } else if (typeof value === 'string' && isNumber(value)) {
        yValues.push(parseFloat(value));
        hasValidData = true;
        isNumericData = true;
      }
    });

    // Only create trace if we have valid numeric data
    if (hasValidData && isNumericData) {
      const trace: Record<string, unknown> = {
        type: 'bar',
        name: key,
        x,
        y: yValues,
      };

      traces.push(trace);
    }
  });

  return { traces, x };
};

export const transformPlotlyJsonToDonutProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IDonutChartProps => {
  const firstData = input.data[0] as Partial<PieData>;
  // extract colors for each series only once
  // use piecolorway if available
  // otherwise, default to colorway from template
  const colors: string[] | string | null | undefined = extractColor(
    input.layout?.piecolorway ?? input.layout?.template?.layout?.colorway,
    colorwayType,
    input.layout?.piecolorway ?? firstData?.marker?.colors,
    colorMap,
    isDarkTheme,
    true,
  );

  const mapLegendToDataPoint: Record<string, IChartDataPoint> = {};
  // clear colorMap for donut chart to reassign colors as the colorMap initially gets assigned by
  // getAllupLegendsProps function without sorting labels by value
  colorMap.current.clear();

  // Sort labels by value descending before mapping
  if (firstData.labels && firstData.values) {
    const markerColors = (firstData.marker?.colors as unknown as string[]) || undefined;
    const hasMarkerColors = Array.isArray(markerColors) && markerColors.length >= firstData.labels.length;
    const labelValuePairs = firstData.labels.map((label, index) => ({
      label,
      value: getNumberAtIndexOrDefault(firstData.values, index),
      index,
      color: hasMarkerColors ? markerColors[index] : undefined,
    }));
    // Filter out invalid values
    const validPairs = labelValuePairs.filter(pair => !isInvalidValue(pair.value));
    // Sort descending by value; when marker colors are present, keep color attached to the label
    validPairs.sort((a, b) => (b.value as number) - (a.value as number));
    validPairs.forEach((pair, sortedIdx) => {
      const legend = `${pair.label}`;
      const color: string =
        pair.color ??
        resolveColor(
          colors,
          sortedIdx,
          legend,
          colorMap,
          input.layout?.piecolorway ?? input.layout?.template?.layout?.colorway,
          isDarkTheme,
          true,
        );
      if (!mapLegendToDataPoint[legend]) {
        mapLegendToDataPoint[legend] = {
          legend,
          data: pair.value,
          color,
        };
      } else {
        mapLegendToDataPoint[legend].data! += pair.value as number;
      }
    });
  }

  const width: number = input.layout?.width ?? 440;
  const height: number = input.layout?.height ?? 220;
  const hideLabels: boolean = firstData.textinfo
    ? !['value', 'percent', 'label+percent'].includes(firstData.textinfo)
    : false;
  const donutMarginHorizontal: number = hideLabels ? 0 : 80;
  const donutMarginVertical: number = 40 + (hideLabels ? 0 : 40);
  const innerRadius: number = firstData.hole
    ? firstData.hole * (Math.min(width - donutMarginHorizontal, height - donutMarginVertical) / 2)
    : MIN_DONUT_RADIUS;
  const { chartTitle } = getTitles(input.layout);
  // Build anticlockwise order by keeping the first item, reversing the rest
  const legends = Object.keys(mapLegendToDataPoint);
  const reorderedEntries =
    legends.length > 1
      ? ([
          [legends[0], mapLegendToDataPoint[legends[0]]],
          ...legends
            .slice(1)
            .reverse()
            .map(key => [key, mapLegendToDataPoint[key]] as const),
        ] as ReadonlyArray<readonly [string, IChartDataPoint]>)
      : legends.map(key => [key, mapLegendToDataPoint[key]] as const);
  return {
    data: {
      chartTitle,
      chartData: reorderedEntries.map(([, v]) => v as IChartDataPoint),
    },
    hideLegend: isMultiPlot || input.layout?.showlegend === false,
    width: input.layout?.width,
    height,
    innerRadius,
    hideLabels,
    showLabelsInPercent: firstData.textinfo ? ['percent', 'label+percent'].includes(firstData.textinfo) : true,
    roundCorners: true,
    order: 'sorted',
  };
};

export const transformPlotlyJsonToVSBCProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
  fallbackVSBC?: boolean,
): IVerticalStackedBarChartProps => {
  const mapXToDataPoints: { [key: string]: IVerticalStackedChartProps } = {};
  let yMaxValue = 0;
  let yMinValue = 0;
  const secondaryYAxisValues = getSecondaryYAxisValues(input.data, input.layout);
  const { legends, hideLegend } = getLegendProps(input.data, input.layout, isMultiPlot);
  let colorScale: ((value: number) => string) | undefined = undefined;
  const yAxisTickFormat = getYAxisTickFormat(input.data[0], input.layout);
  input.data.forEach((series: Partial<PlotData>, index1: number) => {
    colorScale = createColorScale(input.layout, series, colorScale);

    const isXYearCategory = isYearArray(series.x); // Consider year as categorical not numeric continuous axis
    // extract bar colors for each series only once
    const extractedBarColors = extractColor(
      input.layout?.template?.layout?.colorway,
      colorwayType,
      series.marker?.color,
      colorMap,
      isDarkTheme,
    ) as string[] | string | undefined;
    // extract line colors for each series only once
    const extractedLineColors = extractColor(
      input.layout?.template?.layout?.colorway,
      colorwayType,
      series.line?.color,
      colorMap,
      isDarkTheme,
    ) as string[] | string | undefined;

    const xValues = series.x as Datum[];
    const isXDate = isDateArray(xValues);
    const isXString = isStringArray(xValues);
    const isXNumber = isNumberArray(xValues);
    const validXYRanges = getValidXYRanges(series);
    validXYRanges.forEach(([rangeStart, rangeEnd], rangeIdx) => {
      const rangeXValues = series.x!.slice(rangeStart, rangeEnd);
      const rangeYValues = series.y!.slice(rangeStart, rangeEnd);

      (rangeXValues as Datum[]).forEach((x: string | number, index2: number) => {
        if (!mapXToDataPoints[x]) {
          mapXToDataPoints[x] = {
            xAxisPoint: resolveXAxisPoint(x, isXYearCategory, isXString, isXDate, isXNumber),
            chartData: [],
            lineData: [],
          };
        }
        const legend: string = legends[index1];
        // resolve color for each legend's bars from the colorscale or extracted colors
        const color = colorScale
          ? colorScale(
              isArrayOrTypedArray(series.marker?.color)
                ? ((series.marker?.color as Color[])?.[index2 % (series.marker?.color as Color[]).length] as number)
                : 0,
            )
          : resolveColor(
              extractedBarColors,
              index2,
              legend,
              colorMap,
              input.layout?.template?.layout?.colorway,
              isDarkTheme,
            );
        const opacity = getOpacity(series, index2);
        const yVal: number | string = rangeYValues[index2] as number | string;
        const yAxisCalloutData = getFormattedCalloutYData(yVal, yAxisTickFormat);
        if (series.type === 'bar') {
          mapXToDataPoints[x].chartData.push({
            legend,
            data: yVal,
            color: rgb(color).copy({ opacity }).formatHex8() ?? color,
            yAxisCalloutData,
          });
          if (typeof yVal === 'number') {
            yMaxValue = Math.max(yMaxValue, yVal);
          }
        } else if (series.type === 'scatter' || !!fallbackVSBC) {
          const lineColor = resolveColor(
            extractedLineColors,
            index1,
            legend,
            colorMap,
            input.layout?.template?.layout?.colorway,
            isDarkTheme,
          );
          const lineOptions = getLineOptions(series.line);
          const legendShape = getLegendShape(series);

          mapXToDataPoints[x].lineData!.push({
            legend: legend + (validXYRanges.length > 1 ? `.${rangeIdx + 1}` : ''),
            legendShape,
            y: yVal,
            color: rgb(lineColor).copy({ opacity }).formatHex8() ?? color,
            lineOptions: {
              ...(lineOptions ?? {}),
              mode: series.mode,
            },
            useSecondaryYScale: usesSecondaryYScale(series, input.layout),
            yAxisCalloutData,
          });
          if (!usesSecondaryYScale(series, input.layout) && typeof yVal === 'number') {
            yMaxValue = Math.max(yMaxValue, yVal);
            yMinValue = Math.min(yMinValue, yVal);
          }
        }
      });
    });
  });

  const vsbcData = Object.values(mapXToDataPoints);

  return {
    data: vsbcData,
    width: input.layout?.width,
    height: input.layout?.height ?? 350,
    barWidth: 'auto',
    yMaxValue,
    yMinValue,
    mode: 'plotly',
    ...secondaryYAxisValues,
    hideTickOverlap: true,
    hideLegend,
    roundCorners: true,
    supportNegativeData: true,
    barGapMax: 2,
    showYAxisLables: true,
    noOfCharsToTruncate: 20,
    showYAxisLablesTooltip: true,
    wrapXAxisLables: typeof vsbcData[0]?.xAxisPoint === 'string',
    ...getTitles(input.layout),
    ...getAxisCategoryOrderProps(input.data, input.layout),
    ...getYMinMaxValues(input.data[0], input.layout),
    ...getXAxisTickFormat(input.data[0], input.layout),
    ...yAxisTickFormat,
    ...getBarProps(input.data, input.layout),
    ...getAxisTickProps(input.data, input.layout),
  };
};

export const transformPlotlyJsonToGVBCProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IGroupedVerticalBarChartProps => {
  // Handle object arrays in y values by normalizing the data first
  let processedInput = { ...input };

  // Check if any bar traces have object arrays as y values
  const hasObjectArrayData = input.data.some(
    (series: Partial<PlotData>) => series.type === 'bar' && isObjectArray(series.y),
  );

  if (hasObjectArrayData) {
    // Process each trace that has object array y values
    const processedData = input.data
      .map((series: Partial<PlotData>, index: number) => {
        if (series.type === 'bar' && isObjectArray(series.y)) {
          // Normalize the object array to create multiple traces for GVBC
          const { traces } = normalizeObjectArrayForGVBC(
            series.y as unknown as Array<Record<string, unknown>>,
            Array.isArray(series.x) ? (series.x as string[]) : undefined,
          );

          // Return all the new traces, each representing a property from the objects
          return traces.map((trace: Record<string, unknown>) => ({
            ...trace,
            // Copy other properties from the original series if needed
            marker: series.marker,
          }));
        }
        return [series];
      })
      .flat();

    processedInput = {
      ...input,
      data: processedData,
    };
  }

  const gvbcDataV2: IGroupedVerticalBarChartProps['dataV2'] = [];
  const secondaryYAxisValues = getSecondaryYAxisValues(processedInput.data, processedInput.layout);
  const { legends, hideLegend } = getLegendProps(processedInput.data, processedInput.layout, isMultiPlot);
  let colorScale: ((value: number) => string) | undefined = undefined;
  const yAxisTickFormat = getYAxisTickFormat(processedInput.data[0], processedInput.layout);
  processedInput.data.forEach((series: Partial<PlotData>, index1: number) => {
    colorScale = createColorScale(processedInput.layout, series, colorScale);
    const legend: string = legends[index1];
    const legendShape = getLegendShape(series);

    if (series.type === 'bar') {
      // extract bar colors for each series only once
      const extractedBarColors = extractColor(
        processedInput.layout?.template?.layout?.colorway,
        colorwayType,
        series.marker?.color,
        colorMap,
        isDarkTheme,
      ) as string[] | string | undefined;

      gvbcDataV2.push({
        type: 'bar',
        legend,
        key: legend,
        data: (series.x as Datum[])
          .map((x, xIndex) => {
            if (isInvalidValue(x) || isInvalidValue(series.y?.[xIndex])) {
              return;
            }

            // resolve color for each legend's bars from the colorscale or extracted colors
            const color = colorScale
              ? colorScale(
                  isArrayOrTypedArray(series.marker?.color)
                    ? ((series.marker?.color as Color[])?.[xIndex % (series.marker?.color as Color[]).length] as number)
                    : 0,
                )
              : resolveColor(
                  extractedBarColors,
                  xIndex,
                  legend,
                  colorMap,
                  processedInput.layout?.template?.layout?.colorway,
                  isDarkTheme,
                );
            const opacity = getOpacity(series, xIndex);
            const yVal = series.y![xIndex] as number;

            return {
              x: x!.toString(),
              y: yVal,
              yAxisCalloutData: getFormattedCalloutYData(yVal, yAxisTickFormat),
              color: rgb(color).copy({ opacity }).formatHex8() ?? color,
            };
          })
          .filter(item => typeof item !== 'undefined'),
        useSecondaryYScale: usesSecondaryYScale(series, processedInput.layout),
      });
    } else if (series.type === 'scatter') {
      // extract line colors for each series only once
      const extractedLineColors = extractColor(
        processedInput.layout?.template?.layout?.colorway,
        colorwayType,
        series.line?.color,
        colorMap,
        isDarkTheme,
      ) as string[] | string | undefined;
      const lineColor = resolveColor(
        extractedLineColors,
        index1,
        legend,
        colorMap,
        processedInput.layout?.template?.layout?.colorway,
        isDarkTheme,
      );
      const lineOptions = getLineOptions(series.line);
      const opacity = getOpacity(series, index1);
      const validXYRanges = getValidXYRanges(series);

      validXYRanges.forEach(([rangeStart, rangeEnd]) => {
        const rangeXValues = series.x!.slice(rangeStart, rangeEnd) as Datum[];
        const rangeYValues = series.y!.slice(rangeStart, rangeEnd) as Datum[];

        gvbcDataV2.push({
          type: 'line',
          legend,
          legendShape,
          data: rangeXValues.map((x, i: number) => {
            const yVal = rangeYValues[i] as number;
            return {
              x: x!.toString(),
              y: yVal,
              yAxisCalloutData: getFormattedCalloutYData(yVal, yAxisTickFormat),
            };
          }),
          color: rgb(lineColor).copy({ opacity }).formatHex8() ?? lineColor,
          lineOptions: {
            ...(lineOptions ?? {}),
            mode: series.mode,
          },
          useSecondaryYScale: usesSecondaryYScale(series, processedInput.layout),
        });
      });
    }
  });

  return {
    dataV2: gvbcDataV2,
    width: processedInput.layout?.width,
    height: processedInput.layout?.height ?? 350,
    barwidth: 'auto',
    mode: 'plotly',
    ...secondaryYAxisValues,
    hideTickOverlap: true,
    hideLegend,
    roundCorners: true,
    wrapXAxisLables: true,
    ...getTitles(processedInput.layout),
    ...getAxisCategoryOrderProps(processedInput.data, processedInput.layout),
    ...getYMinMaxValues(processedInput.data[0], processedInput.layout),
    ...getXAxisTickFormat(processedInput.data[0], processedInput.layout),
    ...yAxisTickFormat,
    ...getBarProps(processedInput.data, processedInput.layout),
    ...getAxisTickProps(processedInput.data, processedInput.layout),
  };
};

export const transformPlotlyJsonToVBCProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IVerticalBarChartProps => {
  const vbcData: IVerticalBarChartDataPoint[] = [];
  const { legends, hideLegend } = getLegendProps(input.data, input.layout, isMultiPlot);
  let colorScale: ((value: number) => string) | undefined = undefined;

  input.data.forEach((series: Partial<PlotData>, seriesIdx: number) => {
    if (!series.x) {
      return;
    }

    colorScale = createColorScale(input.layout, series, colorScale);

    // extract colors for each series only once
    const extractedColors = extractColor(
      input.layout?.template?.layout?.colorway,
      colorwayType,
      series.marker?.color,
      colorMap,
      isDarkTheme,
    ) as string[] | string | undefined;

    const xValues: (string | number)[] = [];
    const yValues: number[] = [];
    series.x.forEach((xVal, index) => {
      const yVal = getNumberAtIndexOrDefault(series.y, index);
      if (isInvalidValue(xVal) || isInvalidValue(yVal)) {
        return;
      }

      xValues.push(xVal as string | number);
      yValues.push(yVal as number);
    });

    const isXString = isStringArray(xValues);
    // TODO: In case of a single bin, add an empty bin of the same size to prevent the
    // default bar width from being used and ensure the bar spans the full intended range.
    const xBins = createBins(xValues, series.xbins?.start, series.xbins?.end, series.xbins?.size);
    const yBins: number[][] = xBins.map(() => []);
    let total = 0;

    xValues.forEach((xVal, index) => {
      const binIdx = findBinIndex(xBins, xVal, isXString);
      if (binIdx !== -1) {
        yBins[binIdx].push(yValues[index]);
      }
    });

    const y = yBins.map(bin => {
      const yVal = calculateHistFunc(series.histfunc, bin);
      total += yVal;
      return yVal;
    });

    xBins.forEach((bin, index) => {
      const legend: string = legends[seriesIdx];
      // resolve color for each legend's bars from the colorscale or extracted colors
      const color = colorScale
        ? colorScale(
            isArrayOrTypedArray(series.marker?.color)
              ? ((series.marker?.color as Color[])?.[index % (series.marker?.color as Color[]).length] as number)
              : 0,
          )
        : resolveColor(extractedColors, index, legend, colorMap, input.layout?.template?.layout?.colorway, isDarkTheme);
      const opacity = getOpacity(series, index);
      const yVal = calculateHistNorm(
        series.histnorm,
        y[index],
        total,
        isXString ? bin.length : getBinSize(bin as Bin<number, number>),
      );

      vbcData.push({
        x: isXString ? bin.join(', ') : getBinCenter(bin as Bin<number, number>),
        y: yVal,
        legend,
        color: rgb(color).copy({ opacity }).formatHex8() ?? color,
        ...(isXString
          ? {}
          : { xAxisCalloutData: `[${(bin as Bin<number, number>).x0} - ${(bin as Bin<number, number>).x1})` }),
      });
    });
  });

  return {
    data: vbcData,
    width: input.layout?.width,
    height: input.layout?.height ?? 350,
    supportNegativeData: true,
    mode: 'histogram',
    hideTickOverlap: true,
    maxBarWidth: 50,
    hideLegend,
    roundCorners: true,
    wrapXAxisLables: typeof vbcData[0]?.x === 'string',
    ...getTitles(input.layout),
    ...getAxisCategoryOrderProps(input.data, input.layout),
    ...getYMinMaxValues(input.data[0], input.layout),
  };
};

export const transformPlotlyJsonToAreaChartProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IAreaChartProps => {
  return transformPlotlyJsonToScatterTraceProps(
    input,
    isMultiPlot,
    'area',
    colorMap,
    colorwayType,
    isDarkTheme,
  ) as IAreaChartProps;
};

export const transformPlotlyJsonToLineChartProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): ILineChartProps => {
  return transformPlotlyJsonToScatterTraceProps(
    input,
    isMultiPlot,
    'line',
    colorMap,
    colorwayType,
    isDarkTheme,
  ) as ILineChartProps;
};

export const transformPlotlyJsonToScatterChartProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): ILineChartProps => {
  return transformPlotlyJsonToScatterTraceProps(
    input,
    isMultiPlot,
    'scatter',
    colorMap,
    colorwayType,
    isDarkTheme,
  ) as IScatterChartProps;
};

const transformPlotlyJsonToScatterTraceProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  chartType: ScatterChartTypes,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): ILineChartProps | IAreaChartProps | IScatterChartProps => {
  const isScatterMarkers = [
    'text',
    'markers',
    'text+markers',
    'markers+text',
    'lines+markers',
    'markers+line',
    'text+lines+markers',
    'lines+markers+text',
  ].includes((input.data[0] as PlotData)?.mode);
  const isAreaChart = chartType === 'area';
  const isScatterChart = chartType === 'scatter';
  const secondaryYAxisValues = getSecondaryYAxisValues(input.data, input.layout);
  let mode: string = 'tonexty';
  const { legends, hideLegend } = getLegendProps(input.data, input.layout, isMultiPlot);
  const yAxisTickFormat = getYAxisTickFormat(input.data[0], input.layout);
  const chartData: ILineChartPoints[] = input.data
    .map((series: Partial<PlotData>, index: number) => {
      const colors = isScatterMarkers
        ? series?.mode?.includes('line')
          ? series.line?.color
          : series.marker?.color
        : series.line?.color;
      // extract colors for each series only once
      const extractedColors = extractColor(
        input.layout?.template?.layout?.colorway,
        colorwayType,
        colors,
        colorMap,
        isDarkTheme,
      ) as string[] | string | undefined;
      const xValues = series.x as Datum[];
      const isXString = isStringArray(xValues);
      const isXDate = isDateArray(xValues);
      const isXNumber = isNumberArray(xValues);
      const isXYearCategory = isYearArray(series.x); // Consider year as categorical not numeric continuous axis
      const legend: string = legends[index];
      // resolve color for each legend's lines from the extracted colors
      const seriesColor = resolveColor(
        extractedColors,
        index,
        legend,
        colorMap,
        input.layout?.template?.layout?.colorway,
        isDarkTheme,
      );
      const seriesOpacity = getOpacity(series, index);
      mode = series.fill === 'tozeroy' ? 'tozeroy' : 'tonexty';
      // if mode contains 'text', we prioritize showing the text over curving the line
      const lineOptions =
        !series.mode?.includes('text') && series.type !== 'scatterpolar' ? getLineOptions(series.line) : undefined;
      const legendShape = getLegendShape(series);

      const validXYRanges = getValidXYRanges(series);
      return validXYRanges.map(([rangeStart, rangeEnd], rangeIdx) => {
        const rangeXValues = xValues.slice(rangeStart, rangeEnd);
        const rangeYValues = series.y!.slice(rangeStart, rangeEnd);
        const markerSizes = isArrayOrTypedArray(series.marker?.size)
          ? (series.marker!.size as number[]).slice(rangeStart, rangeEnd)
          : [];
        const markerColors = isArrayOrTypedArray(series.marker?.color)
          ? (series.marker!.color as string[]).slice(rangeStart, rangeEnd)
          : Array.isArray(series.marker?.color)
          ? (series.marker!.color as string[]).slice(rangeStart, rangeEnd)
          : undefined;
        const textValues = Array.isArray(series.text) ? series.text.slice(rangeStart, rangeEnd) : undefined;

        return {
          legend,
          legendShape,
          data: rangeXValues.map((x, i: number) => ({
            x: resolveXAxisPoint(x, isXYearCategory, isXString, isXDate, isXNumber),
            y: rangeYValues[i],
            ...(Array.isArray(series.marker?.size)
              ? { markerSize: markerSizes[i] }
              : typeof series.marker?.size === 'number'
              ? { markerSize: series.marker.size }
              : {}),
            ...(markerColors ? { markerColor: markerColors[i] } : {}),
            ...(textValues ? { text: textValues[i] } : {}),
            yAxisCalloutData: getFormattedCalloutYData(rangeYValues[i] as number, yAxisTickFormat),
          })),
          color: rgb(seriesColor).copy({ opacity: seriesOpacity }).formatHex8() ?? seriesColor,
          lineOptions: {
            ...(lineOptions ?? {}),
            mode: series.type !== 'scatterpolar' ? series.mode : 'scatterpolar',
            // originXOffset is not typed on Layout, but may be present in input.layout as a part of projection of
            // scatter polar coordingates to cartesian coordinates

            ...(series.type === 'scatterpolar'
              ? {
                  originXOffset: (input.layout as { __polarOriginX?: number } | undefined)?.__polarOriginX,
                  direction: input.layout?.polar?.angularaxis?.direction,
                  rotation: input.layout?.polar?.angularaxis?.rotation,
                  axisLabel: (series as { __axisLabel: string[] }).__axisLabel
                    ? (series as { __axisLabel: string[] }).__axisLabel
                    : {},
                }
              : {}),
          },
          useSecondaryYScale: usesSecondaryYScale(series, input.layout),
        } as ILineChartPoints;
      });
    })
    .flat();

  const yMinMax = getYMinMaxValues(input.data[0], input.layout);
  if (yMinMax.yMinValue === undefined && yMinMax.yMaxValue === undefined) {
    const yMinMaxValues = findNumericMinMaxOfY(chartData);
    yMinMax.yMinValue = yMinMaxValues.startValue;
    yMinMax.yMaxValue = yMinMaxValues.endValue;
  }

  const numDataPoints = chartData.reduce((total, lineChartPoints) => total + lineChartPoints.data.length, 0);

  const chartProps: IChartProps = {
    lineChartData: chartData,
  };

  const scatterChartProps: IChartProps = {
    scatterChartData: chartData,
  };

  const commonProps = {
    supportNegativeData: true,
    ...secondaryYAxisValues,
    width: input.layout?.width,
    height: input.layout?.height ?? 350,
    hideTickOverlap: true,
    hideLegend,
    useUTC: false,
    optimizeLargeData: numDataPoints > 1000,
    ...getTitles(input.layout),
    ...getXAxisTickFormat(input.data[0], input.layout),
    ...yAxisTickFormat,
    ...getAxisScaleTypeProps(input.data, input.layout),
    ...getAxisTickProps(input.data, input.layout),
  };

  if (isAreaChart) {
    return {
      data: chartProps,
      mode,
      ...commonProps,
    } as IAreaChartProps;
  } else {
    return {
      data: isScatterChart ? scatterChartProps : chartProps,
      roundedTicks: true,
      enableReflow: false,
      ...commonProps,
      ...yMinMax,
      ...(isScatterChart
        ? {
            showYAxisLablesTooltip: true,
            ...getAxisCategoryOrderProps(input.data, input.layout),
          }
        : {}),
    } as ILineChartProps | IScatterChartProps;
  }
};

export const transformPlotlyJsonToHorizontalBarWithAxisProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IHorizontalBarChartWithAxisProps => {
  const { legends, hideLegend } = getLegendProps(input.data, input.layout, isMultiPlot);
  let colorScale: ((value: number) => string) | undefined = undefined;
  const chartData: IHorizontalBarChartWithAxisDataPoint[] = input.data
    .map((series: Partial<PlotData>, index: number) => {
      colorScale = createColorScale(input.layout, series, colorScale);

      // extract colors for each series only once
      const extractedColors = extractColor(
        input.layout?.template?.layout?.colorway,
        colorwayType,
        series.marker?.color,
        colorMap,
        isDarkTheme,
      ) as string[] | string | undefined;
      const legend = legends[index];
      return (series.y as Datum[])
        .map((yValue, i: number) => {
          if (isInvalidValue(series.x?.[i]) || isInvalidValue(yValue)) {
            return null;
          }
          // resolve color for each legend's bars from the colorscale or extracted colors
          const color = colorScale
            ? colorScale(
                isArrayOrTypedArray(series.marker?.color)
                  ? ((series.marker?.color as Color[])?.[i % (series.marker?.color as Color[]).length] as number)
                  : 0,
              )
            : resolveColor(extractedColors, i, legend, colorMap, input.layout?.template?.layout?.colorway, isDarkTheme);
          const opacity = getOpacity(series, i);

          return {
            x: series.x![i],
            y: yValue,
            legend,
            color: rgb(color).copy({ opacity }).formatHex8() ?? color,
          } as IHorizontalBarChartWithAxisDataPoint;
        })
        .filter(point => point !== null) as IHorizontalBarChartWithAxisDataPoint[];
    })
    .flat();

  const chartHeight: number = input.layout?.height ?? 450;
  const margin: number = input.layout?.margin?.l ?? 0;
  const padding: number = input.layout?.margin?.pad ?? 0;
  const availableHeight: number = chartHeight - margin - padding;
  const numberOfRows = new Set(chartData.map(d => d.y)).size || 1;
  const scalingFactor = 0.01;
  const gapFactor = 1 / (1 + scalingFactor * numberOfRows);
  const barHeight = availableHeight / (numberOfRows * (1 + gapFactor));

  return {
    data: chartData,
    secondaryYAxistitle:
      typeof input.layout?.yaxis2?.title === 'string'
        ? input.layout?.yaxis2?.title
        : input.layout?.yaxis2?.title?.text || '',
    barHeight,
    showYAxisLables: true,
    height: chartHeight,
    width: input.layout?.width,
    hideTickOverlap: true,
    hideLegend,
    noOfCharsToTruncate: 20,
    showYAxisLablesTooltip: true,
    roundCorners: true,
    ...getTitles(input.layout),
    ...getAxisCategoryOrderProps(input.data, input.layout),
    ...getBarProps(input.data, input.layout, true),
    ...getAxisTickProps(input.data, input.layout),
  };
};

export const transformPlotlyJsonToGanttChartProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IGanttChartProps => {
  const { legends, hideLegend } = getLegendProps(input.data, input.layout, isMultiPlot);
  let colorScale: ((value: number) => string) | undefined = undefined;
  const chartData: IGanttChartDataPoint[] = input.data
    .map((series: Partial<PlotData>, index: number) => {
      colorScale = createColorScale(input.layout, series, colorScale);

      // extract colors for each series only once
      const extractedColors = extractColor(
        input.layout?.template?.layout?.colorway,
        colorwayType,
        series.marker?.color,
        colorMap,
        isDarkTheme,
      ) as string[] | string | undefined;
      const legend = legends[index];
      const isXDate = input.layout?.xaxis?.type === 'date' || isDateArray(series.x);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const convertXValueToNumber = (value: any) => {
        return isInvalidValue(value) ? 0 : isXDate ? +parseLocalDate(value) : +value;
      };

      return (series.y as Datum[])
        .map((yVal, i: number) => {
          if (isInvalidValue(yVal)) {
            return null;
          }
          // resolve color for each legend's bars from the colorscale or extracted colors
          const color = colorScale
            ? colorScale(
                isArrayOrTypedArray(series.marker?.color)
                  ? ((series.marker?.color as Color[])?.[i % (series.marker?.color as Color[]).length] as number)
                  : 0,
              )
            : resolveColor(extractedColors, i, legend, colorMap, input.layout?.template?.layout?.colorway, isDarkTheme);
          const opacity = getOpacity(series, i);
          const base = convertXValueToNumber(series.base?.[i]);
          const xVal = convertXValueToNumber(series.x?.[i]);

          return {
            x: {
              start: isXDate ? new Date(base) : base,
              end: isXDate ? new Date(base + xVal) : base + xVal,
            },
            y: yVal,
            legend,
            color: rgb(color).copy({ opacity }).formatHex8() ?? color,
          } as IGanttChartDataPoint;
        })
        .filter(point => point !== null) as IGanttChartDataPoint[];
    })
    .flat();

  return {
    data: chartData,
    showYAxisLables: true,
    height: input.layout?.height ?? 350,
    width: input.layout?.width,
    hideTickOverlap: true,
    hideLegend,
    noOfCharsToTruncate: 20,
    showYAxisLablesTooltip: true,
    roundCorners: true,
    useUTC: false,
    ...getTitles(input.layout),
    ...getAxisCategoryOrderProps(input.data, input.layout),
    ...getBarProps(input.data, input.layout, true),
    ...getAxisTickProps(input.data, input.layout),
  };
};

export const transformPlotlyJsonToHeatmapProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IHeatMapChartProps => {
  const firstData = input.data[0] as Partial<PlotData>;
  const heatmapDataPoints: IHeatMapChartDataPoint[] = [];
  let zMin = Number.POSITIVE_INFINITY;
  let zMax = Number.NEGATIVE_INFINITY;

  if (firstData.type === 'histogram2d') {
    const xValues: (string | number)[] = [];
    const yValues: (string | number)[] = [];
    const zValues: number[] = [];
    firstData.x?.forEach((xVal, index) => {
      const zVal = getNumberAtIndexOrDefault(firstData.z, index);
      if (isInvalidValue(xVal) || isInvalidValue(firstData.y?.[index]) || isInvalidValue(zVal)) {
        return;
      }

      xValues.push(xVal as string | number);
      yValues.push(firstData.y![index] as string | number);
      zValues.push(zVal as number);
    });

    const isXString = isStringArray(xValues);
    const isYString = isStringArray(yValues);
    const xBins = createBins(xValues, firstData.xbins?.start, firstData.xbins?.end, firstData.xbins?.size);
    const yBins = createBins(yValues, firstData.ybins?.start, firstData.ybins?.end, firstData.ybins?.size);
    const zBins: number[][][] = yBins.map(() => xBins.map(() => []));
    let total = 0;

    xValues.forEach((xVal, index) => {
      const xBinIdx = findBinIndex(xBins, xVal, isXString);
      const yBinIdx = findBinIndex(yBins, yValues[index], isYString);
      if (xBinIdx !== -1 && yBinIdx !== -1) {
        zBins[yBinIdx][xBinIdx].push(zValues[index]);
      }
    });

    const z = zBins.map(row => {
      return row.map(bin => {
        const zVal = calculateHistFunc(firstData.histfunc, bin);
        total += zVal;
        return zVal;
      });
    });

    xBins.forEach((xBin, xIdx) => {
      yBins.forEach((yBin, yIdx) => {
        const zVal = calculateHistNorm(
          firstData.histnorm,
          z[yIdx][xIdx],
          total,
          isXString ? xBin.length : getBinSize(xBin as Bin<number, number>),
          isYString ? yBin.length : getBinSize(yBin as Bin<number, number>),
        );

        heatmapDataPoints.push({
          x: isXString ? xBin.join(', ') : getBinCenter(xBin as Bin<number, number>),
          y: isYString ? yBin.join(', ') : getBinCenter(yBin as Bin<number, number>),
          value: zVal,
          rectText: zVal,
        });

        if (typeof zVal === 'number') {
          zMin = Math.min(zMin, zVal);
          zMax = Math.max(zMax, zVal);
        }
      });
    });
  } else {
    (firstData.x as Datum[])?.forEach((xVal, xIdx: number) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      firstData.y?.forEach((yVal: any, yIdx: number) => {
        const zVal = (firstData.z as number[][])?.[yIdx]?.[xIdx];

        heatmapDataPoints.push({
          x: input.layout?.xaxis?.type === 'date' ? (xVal as Date) : xVal ?? 0,
          y: input.layout?.yaxis?.type === 'date' ? (yVal as Date) : yVal,
          value: zVal,
          rectText: zVal,
        });

        if (typeof zVal === 'number') {
          zMin = Math.min(zMin, zVal);
          zMax = Math.max(zMax, zVal);
        }
      });
    });
  }

  const heatmapData: IHeatMapChartData = {
    legend: firstData.name ?? '',
    data: heatmapDataPoints,
    value: 0,
  };

  // Initialize domain and range to default values
  const defaultDomain = [zMin, (zMax + zMin) / 2, zMax];
  const defaultRange = [
    getColorFromToken(DataVizPalette.color1),
    getColorFromToken(DataVizPalette.color2),
    getColorFromToken(DataVizPalette.color3),
  ];

  let colorscale =
    firstData?.colorscale ??
    input.layout?.colorscale ??
    input.layout?.coloraxis?.colorscale ??
    input.layout?.template?.layout?.colorscale ??
    (firstData.type === 'histogram2d' && input.layout?.template?.data?.histogram2d?.[0]?.colorscale) ??
    input.layout?.template?.data?.heatmap?.[0]?.colorscale;

  // determine if the types diverging, sequential or sequentialminus are present in colorscale
  if (
    colorscale &&
    typeof colorscale === 'object' &&
    ('diverging' in colorscale || 'sequential' in colorscale || 'sequentialminus' in colorscale)
  ) {
    const isDivergent = zMin < 0 && zMax > 0; // Data spans both positive and negative values
    const isSequential = zMin >= 0; // Data is entirely positive
    const isSequentialMinus = zMax <= 0; // Data is entirely negative

    if (isDivergent) {
      colorscale = colorscale?.diverging;
    } else if (isSequential) {
      colorscale = colorscale?.sequential;
    } else if (isSequentialMinus) {
      colorscale = colorscale?.sequentialminus;
    }
  }

  const domainValuesForColorScale: number[] = Array.isArray(colorscale)
    ? (colorscale as Array<[number, string]>).map(arr => arr[0] * (zMax - zMin) + zMin)
    : defaultDomain;

  const rangeValuesForColorScale: string[] = Array.isArray(colorscale)
    ? (colorscale as Array<[number, string]>).map(arr => arr[1])
    : defaultRange;

  return {
    data: [heatmapData],
    domainValuesForColorScale,
    rangeValuesForColorScale,
    hideLegend: true,
    showYAxisLables: true,
    sortOrder: 'none',
    width: input.layout?.width,
    height: input.layout?.height ?? 350,
    hideTickOverlap: true,
    noOfCharsToTruncate: 20,
    showYAxisLablesTooltip: true,
    wrapXAxisLables: true,
    ...getTitles(input.layout),
    ...getAxisCategoryOrderProps([firstData], input.layout),
    ...getAxisTickProps(input.data, input.layout),
  };
};

export const transformPlotlyJsonToSankeyProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): ISankeyChartProps => {
  const { link, node } = input.data[0] as SankeyData;
  const validLinks = (link?.value ?? [])
    .map((val: number, index: number) => {
      if (isInvalidValue(val) || isInvalidValue(link?.source?.[index]) || isInvalidValue(link?.target?.[index])) {
        return null;
      }

      return {
        value: val,
        source: link?.source![index],
        target: link?.target![index],
      };
    })
    // Filter out negative nodes, unequal nodes and self-references (circular links)
    .filter(x => x !== null && x.source >= 0 && x.target >= 0 && x.source !== x.target);
  const extractedNodeColors = extractColor(
    input.layout?.template?.layout?.colorway,
    colorwayType,
    node?.color,
    colorMap,
    isDarkTheme,
  );
  const sankeyChartData = {
    nodes: node.label?.map((label: string, index: number) => {
      const color = resolveColor(
        extractedNodeColors,
        index,
        label,
        colorMap,
        input.layout?.template?.layout?.colorway,
        isDarkTheme,
      );

      return {
        nodeId: index,
        name: label,
        color,
      };
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    links: validLinks.map((validLink: any, index: number) => {
      return {
        ...validLink,
      };
    }),
  } as ISankeyChartData;

  const styles: ISankeyChartProps['styles'] = {
    root: {
      ...(input.layout?.font?.size ? { fontSize: input.layout.font?.size } : {}),
    },
  };

  const { chartTitle } = getTitles(input.layout);

  return {
    data: {
      chartTitle,
      SankeyChartData: sankeyChartData,
    },
    width: input.layout?.width,
    height: input.layout?.height ?? 468,
    styles,
    enableReflow: false,
  };
};

export const transformPlotlyJsonToGaugeProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IGaugeChartProps => {
  const firstData = input.data[0] as PlotData;
  const stepsColors = firstData.gauge?.steps ? firstData.gauge.steps.map(step => step.color) : undefined;
  const extractedColors = extractColor(
    input.layout?.template?.layout?.colorway,
    colorwayType,
    stepsColors,
    colorMap,
    isDarkTheme,
  );
  const segments = firstData.gauge?.steps?.length
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      firstData.gauge.steps.map((step: any, index: number): IGaugeChartSegment => {
        const legend = step.name || `Segment ${index + 1}`;
        const color = resolveColor(
          extractedColors,
          index,
          legend,
          colorMap,
          input.layout?.template?.layout?.colorway,
          isDarkTheme,
        );
        return {
          legend,
          size: step.range?.[1] - step.range?.[0],
          color,
        };
      })
    : [
        {
          legend: 'Current',
          size: firstData.value ?? 0 - (firstData.gauge?.axis?.range?.[0] ?? 0),
          color: _getGaugeAxisColor(
            input.layout?.template?.layout?.colorway,
            colorwayType,
            firstData.gauge?.axis?.color,
            colorMap,
            isDarkTheme,
          ),
        },
        {
          legend: 'Target',
          size: (firstData.gauge?.axis?.range?.[1] ?? 100) - (firstData.value ?? 0),
          color: DataVizPalette.disabled,
        },
      ];

  let sublabel: string | undefined;
  let sublabelColor: string | undefined;
  if (firstData.delta?.reference) {
    const diff = firstData.value - firstData.delta.reference;
    if (diff >= 0) {
      sublabel = `\u25B2 ${diff}`;
      const extractedIncreasingDeltaColors = extractColor(
        input.layout?.template?.layout?.colorway,
        colorwayType,
        firstData.delta?.increasing?.color,
        colorMap,
        isDarkTheme,
      );
      const color = resolveColor(
        extractedIncreasingDeltaColors,
        0,
        '',
        colorMap,
        input.layout?.template?.layout?.colorway,
        isDarkTheme,
      );
      sublabelColor = color;
    } else {
      sublabel = `\u25BC ${Math.abs(diff)}`;
      const extractedDecreasingDeltaColors = extractColor(
        input.layout?.template?.layout?.colorway,
        colorwayType,
        firstData.delta?.decreasing?.color,
        colorMap,
        isDarkTheme,
      );
      const color = resolveColor(
        extractedDecreasingDeltaColors,
        0,
        '',
        colorMap,
        input.layout?.template?.layout?.colorway,
        isDarkTheme,
      );
      sublabelColor = color;
    }
  }

  const styles: IGaugeChartProps['styles'] = {
    sublabel: {
      fill: sublabelColor,
    },
  };

  const { chartTitle } = getTitles(input.layout);

  return {
    segments,
    chartValue: firstData.value ?? 0,
    chartTitle,
    sublabel,
    // range values can be null
    minValue: typeof firstData.gauge?.axis?.range?.[0] === 'number' ? firstData.gauge?.axis?.range?.[0] : undefined,
    maxValue: typeof firstData.gauge?.axis?.range?.[1] === 'number' ? firstData.gauge?.axis?.range?.[1] : undefined,
    chartValueFormat: () => firstData.value?.toString() ?? '',
    width: input.layout?.width,
    height: input.layout?.height ?? 220,
    styles,
    variant: firstData.gauge?.steps?.length ? GaugeChartVariant.MultipleSegments : GaugeChartVariant.SingleSegment,
    roundCorners: true,
  };
};
const cleanText = (text: string): string => {
  return text
    .replace(/&lt;[^&]*?&gt;/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;br&gt;|\\u003cbr\\u003e|<br>/gi, '')
    .replace(/\$[^$]*\$/g, '$')
    .trim();
};

const formatValue = (
  value: string | number | boolean | null,
  colIndex: number,
  cells: TableData['cells'],
): string | number | boolean | null => {
  if (value === null || typeof value === 'boolean') {
    return value;
  }

  const formatStr = Array.isArray(cells!.format) ? cells!.format[colIndex] : cells!.format;
  const prefix = Array.isArray(cells!.prefix) ? cells!.prefix[colIndex] : cells!.prefix;
  const suffix = Array.isArray(cells!.suffix) ? cells!.suffix[colIndex] : cells!.suffix;
  let formatted = value;
  if (typeof value === 'number') {
    if (typeof formatStr === 'string') {
      try {
        formatted = d3Format(formatStr)(value);
      } catch {
        formatted = formatScientificLimitWidth(value);
      }
    } else {
      formatted = formatScientificLimitWidth(value);
    }
  }
  return `${prefix ?? ''}${formatted}${suffix ?? ''}`;
};

function resolveCellStyle<T>(raw: T | T[] | T[][] | undefined, rowIndex: number, colIndex: number): T | undefined {
  if (Array.isArray(raw)) {
    const rowEntry = raw[colIndex] ?? raw[0];
    if (Array.isArray(rowEntry)) {
      return rowEntry[rowIndex] ?? rowEntry[0];
    }
    return rowEntry;
  }
  return raw;
}

export const transformPlotlyJsonToChartTableProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IChartTableProps => {
  const tableData = input.data[0] as TableData;

  const normalizeHeaders = (
    values: (string | number | boolean | null)[] | (string | number | boolean | null)[][],
    header: TableData['header'],
  ): { value: string | number | boolean | null; style?: React.CSSProperties }[] => {
    const cleanedValues: (string | number | boolean | null)[] = Array.isArray(values[0])
      ? (values as string[][]).map(row =>
          row
            .map(cell => cleanText(cell))
            .filter(Boolean)
            .join(' '),
        )
      : (values as string[]).map(cell => cleanText(cell));

    return cleanedValues.map((value, colIndex) => {
      //headers are at first row only
      const rowIndex = 0;
      const fontColor = resolveCellStyle(header?.font?.color, rowIndex, colIndex) as string | undefined;
      const fontSize = resolveCellStyle(header?.font?.size, rowIndex, colIndex) as number | undefined;
      const backgroundColor = resolveCellStyle(header?.fill?.color, rowIndex, colIndex) as string | undefined;
      const textAlign = resolveCellStyle(header?.align, rowIndex, colIndex) as
        | React.CSSProperties['textAlign']
        | undefined;

      const style: React.CSSProperties = {
        ...(typeof fontColor === 'string' ? { color: fontColor } : {}),
        ...(typeof fontSize === 'number' ? { fontSize } : {}),
        ...(typeof backgroundColor === 'string' ? { backgroundColor } : {}),
        ...(textAlign ? { textAlign } : {}),
      };

      return { value, style };
    });
  };
  const columns = tableData.cells?.values ?? [];
  const cells =
    tableData.cells && Object.keys(tableData.cells).length > 0
      ? tableData.cells
      : input.layout?.template?.data?.table?.[0]?.cells;
  const rows = columns[0].map((_, rowIndex: number) =>
    columns.map((col, colIndex) => {
      const cellValue = col[rowIndex];
      const cleanValue = typeof cellValue === 'string' ? cleanText(cellValue) : cellValue;

      const formattedValue =
        typeof cleanValue === 'string' || typeof cleanValue === 'number'
          ? formatValue(cleanValue, colIndex, cells)
          : cleanValue;

      const fontColor = resolveCellStyle(cells?.font?.color, rowIndex, colIndex) as string | undefined;
      const fontSize = resolveCellStyle(cells?.font?.size, rowIndex, colIndex) as number | undefined;
      const backgroundColor = resolveCellStyle(cells?.fill?.color, rowIndex, colIndex) as string | undefined;
      const textAlign = resolveCellStyle(cells?.align, rowIndex, colIndex) as
        | React.CSSProperties['textAlign']
        | undefined;

      const style: React.CSSProperties = {
        ...(fontColor ? { color: fontColor } : {}),
        ...(typeof fontSize === 'number' ? { fontSize } : {}),
        ...(backgroundColor ? { backgroundColor } : {}),
        ...(textAlign ? { textAlign } : {}),
      };

      return {
        value: formattedValue,
        style,
      };
    }),
  );

  const styles: IChartTableProps['styles'] = {
    root: {
      ...(input.layout?.font?.size ? { fontSize: input.layout.font.size } : {}),
    },
  };

  return {
    headers: normalizeHeaders(
      tableData.header?.values ?? [],
      tableData.header && Object.keys(tableData.header).length > 0
        ? tableData.header
        : input.layout?.template?.data?.table![0].header,
    ),
    rows,
    width: input.layout?.width,
    height: input.layout?.height,
    styles,
  };
};

function getCategoriesAndValues(series: Partial<PlotData>): {
  categories: (string | number)[];
  values: (string | number)[];
} {
  const orientation = series.orientation || 'h';
  const y = series.labels ?? series.y ?? series.stage;
  const x = series.values ?? series.x ?? series.value;
  const xIsString = isStringArray(x as Datum[] | Datum[][] | TypedArray | undefined);
  const yIsString = isStringArray(y as Datum[] | Datum[][] | TypedArray | undefined);
  const xIsNumber = isNumberArray(x as Datum[] | Datum[][] | TypedArray | undefined);
  const yIsNumber = isNumberArray(y as Datum[] | Datum[][] | TypedArray | undefined);

  // Helper to ensure array of (string | number)
  const toArray = (arr: unknown): (string | number)[] => {
    if (Array.isArray(arr)) {
      return arr as (string | number)[];
    }
    if (typeof arr === 'string' || typeof arr === 'number') {
      return [arr];
    }
    return [];
  };

  if (orientation === 'h') {
    if (yIsString && xIsNumber) {
      return { categories: toArray(y), values: toArray(x) };
    } else if (xIsString && yIsNumber) {
      return { categories: toArray(x), values: toArray(y) };
    } else {
      return { categories: yIsString ? toArray(y) : toArray(x), values: yIsString ? toArray(x) : toArray(y) };
    }
  } else {
    if (xIsString && yIsNumber) {
      return { categories: toArray(x), values: toArray(y) };
    } else if (yIsString && xIsNumber) {
      return { categories: toArray(y), values: toArray(x) };
    } else {
      return { categories: xIsString ? toArray(x) : toArray(y), values: xIsString ? toArray(y) : toArray(x) };
    }
  }
}

export const transformPlotlyJsonToFunnelChartProps = (
  input: PlotlySchema,
  isMultiPlot: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IFunnelChartProps => {
  const funnelData: IFunnelChartDataPoint[] = [];

  // Determine if data is stacked based on multiple series with multiple values per series
  const isStacked =
    input.data.length > 1 &&
    input.data.every((series: Partial<PlotData>) => {
      const values = series.values ?? series.x ?? series.value;
      const labels = series.labels ?? series.y ?? series.stage;
      return Array.isArray(labels) && Array.isArray(values) && values.length > 1 && labels.length > 1;
    });

  if (isStacked) {
    // Assign a color per series/category and use it for all subValues of that category
    const seriesColors: Record<string, string> = {};
    input.data.forEach((series: Partial<PlotData>, seriesIdx: number) => {
      const category = series.name || `Category ${seriesIdx + 1}`;
      // Use the same color for this category across all stages
      const extractedColors = extractColor(
        input.layout?.template?.layout?.colorway,
        colorwayType,
        series.marker?.colors ?? series.marker?.color,
        colorMap,
        isDarkTheme,
      );
      // Always use the first color for the series/category
      const color = resolveColor(
        extractedColors,
        0,
        category,
        colorMap,
        input.layout?.template?.layout?.colorway,
        isDarkTheme,
      );
      seriesColors[category] = color;

      const labels = series.labels ?? series.y ?? series.stage;
      const values = series.values ?? series.x ?? series.value;

      if (!isArrayOrTypedArray(labels) || !isArrayOrTypedArray(values)) {
        return;
      }
      if (labels && isArrayOrTypedArray(labels) && labels.length > 0) {
        (labels as (string | number)[]).forEach((label: string, i: number) => {
          const stageIndex = funnelData.findIndex(stage => stage.stage === label);
          const valueNum = Number((values as (string | number)[])[i]);
          if (isNaN(valueNum)) {
            return;
          }
          if (stageIndex === -1) {
            funnelData.push({
              stage: label,
              subValues: [{ category, value: valueNum, color }],
            });
          } else {
            funnelData[stageIndex].subValues!.push({ category, value: valueNum, color });
          }
        });
      }
    });
  } else {
    // Non-stacked data handling (multiple series with single-value arrays)
    input.data.forEach((series: Partial<PlotData>, seriesIdx: number) => {
      const { categories, values } = getCategoriesAndValues(series);

      if (!isArrayOrTypedArray(categories) || !isArrayOrTypedArray(values)) {
        return;
      }

      const extractedColors = extractColor(
        input.layout?.template?.layout?.colorway,
        colorwayType,
        series.marker?.colors ?? series.marker?.color,
        colorMap,
        isDarkTheme,
      );

      categories.forEach((label: string, i: number) => {
        const color = resolveColor(
          extractedColors,
          i,
          label,
          colorMap,
          input.layout?.template?.layout?.colorway,
          isDarkTheme,
        );
        const valueNum = Number(values[i]);
        if (isNaN(valueNum)) {
          return;
        }
        funnelData.push({
          stage: label,
          value: valueNum,
          color,
        });
      });
    });
  }

  return {
    data: funnelData,
    width: input.layout?.width,
    height: input.layout?.height,
    orientation: (input.data[0] as Partial<PlotData>)?.orientation === 'v' ? 'horizontal' : 'vertical',
    hideLegend: isMultiPlot || input.layout?.showlegend === false,
  };
};

export const projectPolarToCartesian = (input: PlotlySchema): PlotlySchema => {
  const projection: PlotlySchema = { ...input };

  // Find the global min and max radius across all series
  let minRadius = 0;
  let maxRadius = 0;
  for (let sindex = 0; sindex < input.data.length; sindex++) {
    const rVals = (input.data[sindex] as Partial<PlotData>).r;
    if (rVals && isArrayOrTypedArray(rVals)) {
      for (let ptindex = 0; ptindex < rVals.length; ptindex++) {
        if (!isInvalidValue(rVals[ptindex])) {
          minRadius = Math.min(minRadius, rVals[ptindex] as number);
          maxRadius = Math.max(maxRadius, rVals[ptindex] as number);
        }
      }
    }
  }

  // If there are negative radii, compute the shift
  const radiusShift = minRadius < 0 ? -minRadius : 0;

  // Collect all unique theta values from all scatterpolar series for equal spacing
  const allThetaValues: Set<string> = new Set();
  for (let sindex = 0; sindex < input.data.length; sindex++) {
    const series = input.data[sindex] as Partial<PlotData>;
    if (series.theta && isArrayOrTypedArray(series.theta)) {
      series.theta.forEach(theta => allThetaValues.add(String(theta)));
    }
  }

  // Project all points and create a perfect square domain
  const allX: number[] = [];
  const allY: number[] = [];
  let originX: number | null = null;
  for (let sindex = 0; sindex < input.data.length; sindex++) {
    const series = input.data[sindex] as Partial<PlotData>;
    // If scatterpolar, set __axisLabel to all unique theta values for equal spacing
    if (isArrayOrTypedArray(series.theta)) {
      (series as { __axisLabel: string[] }).__axisLabel = Array.from(allThetaValues);
    }
    series.x = [] as Datum[];
    series.y = [] as Datum[];
    const thetas = series.theta!;
    const rVals = series.r!;

    // Skip if rVals or thetas are not arrays
    if (!isArrayOrTypedArray(rVals) || !isArrayOrTypedArray(thetas)) {
      projection.data[sindex] = series;
      continue;
    }

    // retrieve polar axis settings
    const dirMultiplier = input.layout?.polar?.angularaxis?.direction === 'clockwise' ? -1 : 1;
    const startAngleInRad = ((input.layout?.polar?.angularaxis?.rotation ?? 0) * Math.PI) / 180;

    // Compute tick positions if categorical
    let uniqueTheta: Datum[] = [];
    let categorical = false;
    if (!isNumberArray(thetas)) {
      uniqueTheta = Array.from(new Set(thetas));
      categorical = true;
    }

    for (let ptindex = 0; ptindex < rVals.length; ptindex++) {
      if (isInvalidValue(thetas?.[ptindex]) || isInvalidValue(rVals?.[ptindex])) {
        continue;
      }

      // Map theta to angle in radians
      let thetaRad: number;
      if (categorical) {
        const idx = uniqueTheta.indexOf(thetas[ptindex]);
        const step = (2 * Math.PI) / uniqueTheta.length;
        thetaRad = startAngleInRad + dirMultiplier * idx * step;
      } else {
        thetaRad = startAngleInRad + dirMultiplier * (((thetas[ptindex] as number) * Math.PI) / 180);
      }
      // Shift only the polar origin (not the cartesian)
      const rawRadius = rVals[ptindex] as number;
      const polarRadius = rawRadius + radiusShift; // Only for projection
      // Calculate cartesian coordinates (with shifted polar origin)
      const x = polarRadius * Math.cos(thetaRad);
      const y = polarRadius * Math.sin(thetaRad);

      // Calculate the cartesian coordinates of the original polar origin (0,0)
      // This is the point that should be mapped to (0,0) in cartesian coordinates
      if (sindex === 0 && ptindex === 0) {
        // For polar origin (r=0, θ=0), cartesian coordinates are (0,0)
        // But since we shifted the radius by radiusShift, the cartesian origin is at (radiusShift, 0)
        originX = radiusShift;
      }

      series.x.push(x);
      series.y.push(y);
      allX.push(x);
      allY.push(y);
    }

    // Map text to each data point for downstream chart rendering
    if (series.x && series.y) {
      (series as { data?: unknown[] }).data = series.x.map((xVal, idx) => ({
        x: xVal,
        y: (series.y as number[])[idx],
        ...(series.text ? { text: (series.text as string[])[idx] } : {}),
      }));
    }

    projection.data[sindex] = series;
  }

  // 7. Recenter all cartesian coordinates
  if (originX !== null) {
    for (let sindex = 0; sindex < projection.data.length; sindex++) {
      const series = projection.data[sindex] as Partial<PlotData>;
      if (series.x && series.y) {
        series.x = (series.x as number[]).map((v: number) => v - originX!);
      }
    }
    // Also recenter allX for normalization
    for (let i = 0; i < allX.length; i++) {
      allX[i] = allX[i] - originX!;
    }
  }

  // 8. Find the maximum absolute value among all x and y
  let maxAbs = Math.max(...allX.map(Math.abs), ...allY.map(Math.abs));
  maxAbs = maxAbs === 0 ? 1 : maxAbs;

  // 9. Rescale all points so that the largest |x| or |y| is 0.5
  for (let sindex = 0; sindex < projection.data.length; sindex++) {
    const series = projection.data[sindex] as Partial<PlotData>;
    if (series.x && series.y) {
      series.x = (series.x as number[]).map((v: number) => v / (2 * maxAbs));
      series.y = (series.y as number[]).map((v: number) => v / (2 * maxAbs));
    }
  }

  // 10. Customize layout for perfect square with absolute positioning
  const size = input.layout?.width || input.layout?.height || 500;
  projection.layout = {
    ...projection.layout,
    width: size,
    height: size,
  };
  // Attach originX as custom properties
  (projection.layout as { __polarOriginX?: number }).__polarOriginX = originX ?? undefined;

  return projection;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPlainObject(obj: any) {
  if (window && window.process && window.process.versions) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  return (
    Object.prototype.toString.call(obj) === '[object Object]' &&
    Object.getPrototypeOf(obj).hasOwnProperty('hasOwnProperty')
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
var arrayAttributes: any[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var stack: any[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isArrayStack: any[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var baseContainer: any, baseAttrName: any;
/**
 * Interate iteratively through the trace object and find all the array attributes.
 * 1 trace record = 1 series of data
 * @param trace
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findArrayAttributes(trace: any) {
  // Init basecontainer and baseAttrName
  crawlIntoTrace(baseContainer, 0, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function crawlIntoTrace(container: any, i: number, astrPartial: any) {
  var item = container[stack[i]];
  var newAstrPartial = astrPartial + stack[i];
  if (i === stack.length - 1) {
    if (isArrayOrTypedArray(item)) {
      arrayAttributes.push(baseAttrName + newAstrPartial);
    }
  } else {
    if (isArrayStack[i]) {
      if (Array.isArray(item)) {
        for (var j = 0; j < item.length; j++) {
          if (isPlainObject(item[j])) {
            crawlIntoTrace(item[j], i + 1, newAstrPartial + '[' + j + '].');
          }
        }
      }
    } else if (isPlainObject(item)) {
      crawlIntoTrace(item, i + 1, newAstrPartial + '.');
    }
  }
}

function getLineOptions(line: Partial<ScatterLine> | undefined): ILineChartLineOptions | undefined {
  if (!line) {
    return;
  }

  let lineOptions: ILineChartLineOptions = {};
  if (line.dash) {
    lineOptions = { ...lineOptions, ...dashOptions[line.dash] };
  }

  switch (line.shape) {
    case 'spline':
      const smoothing = typeof line.smoothing === 'number' ? line.smoothing : 1;
      lineOptions.curve = d3CurveCardinal.tension(1 - smoothing / 1.3);
      break;
    case 'hv':
      lineOptions.curve = 'stepAfter';
      break;
    case 'vh':
      lineOptions.curve = 'stepBefore';
      break;
    case 'hvh':
      lineOptions.curve = 'step';
      break;
    default:
      lineOptions.curve = 'linear';
  }

  return Object.keys(lineOptions).length > 0 ? lineOptions : undefined;
}

// TODO: Use binary search to find the appropriate bin for numeric value.
const findBinIndex = (
  bins: string[][] | Bin<number, number>[],
  value: string | number | null | undefined,
  isString: boolean,
) => {
  if (typeof value === 'undefined' || value === null) {
    return -1;
  }

  return isString
    ? (bins as string[][]).findIndex(bin => bin.includes(value as string))
    : (bins as Bin<number, number>[]).findIndex(
        (bin, index) =>
          (value as number) >= bin.x0! &&
          (index === bins.length - 1 ? (value as number) <= bin.x1! : (value as number) < bin.x1!),
      );
};

const getBinSize = (bin: Bin<number, number>) => {
  return bin.x1! - bin.x0!;
};

const getBinCenter = (bin: Bin<number, number>) => {
  return (bin.x1! + bin.x0!) / 2;
};

// TODO: Add support for date axes
const createBins = (
  data: TypedArray | Datum[] | Datum[][] | undefined,
  binStart?: number | string,
  binEnd?: number | string,
  binSize?: number | string,
) => {
  if (!data || data.length === 0) {
    return [];
  }

  if (isStringArray(data)) {
    const categories = Array.from(new Set(data as string[]));
    const start = typeof binStart === 'number' ? Math.ceil(binStart) : 0;
    const stop = typeof binEnd === 'number' ? Math.floor(binEnd) + 1 : categories.length;
    const step = typeof binSize === 'number' ? binSize : 1;

    return d3Range(start, stop, step).map(i => categories.slice(i, i + step));
  }

  const scale = d3ScaleLinear()
    .domain(d3Extent<number>(data as number[]) as [number, number])
    .nice();
  let [minVal, maxVal] = scale.domain();

  minVal = typeof binStart === 'number' ? binStart : minVal;
  maxVal = typeof binEnd === 'number' ? binEnd : maxVal;

  const binGenerator = d3Bin().domain([minVal, maxVal]);

  if (typeof binSize === 'number' && binSize > 0) {
    const thresholds: number[] = [];
    const precision = Math.max(calculatePrecision(minVal), calculatePrecision(binSize));
    let th = precisionRound(minVal, precision);

    while (th < precisionRound(maxVal + binSize, precision)) {
      thresholds.push(th);
      th = precisionRound(th + binSize, precision);
    }

    minVal = thresholds[0];
    maxVal = thresholds[thresholds.length - 1];
    binGenerator.domain([minVal, maxVal]).thresholds(thresholds);

    // When the domain ends at the last threshold (maxVal), d3Bin creates an extra final bin where
    // both x0 and x1 are equal to maxVal and inclusive. The previous bin also has x1 equal to maxVal,
    // but it is exclusive. To maintain consistent bin widths, remove the final bin,
    // making the previous bin the last one, with both x0 and x1 inclusive.
    return binGenerator(data as number[]).slice(0, -1);
  }

  return binGenerator(data as number[]);
};

const calculateHistFunc = (histfunc: PlotData['histfunc'] | undefined, bin: number[]) => {
  switch (histfunc) {
    case 'sum':
      return d3Sum(bin);
    case 'avg':
      return bin.length === 0 ? 0 : d3Sum(bin) / bin.length;
    case 'min':
      return d3Min(bin) ?? 0;
    case 'max':
      return d3Max(bin) ?? 0;
    default:
      return bin.length;
  }
};

const calculateHistNorm = (
  histnorm: PlotData['histnorm'] | undefined,
  value: number,
  total: number,
  dx: number,
  dy: number = 1,
) => {
  switch (histnorm) {
    case 'percent':
      return total === 0 ? 0 : (value / total) * 100;
    case 'probability':
      return total === 0 ? 0 : value / total;
    case 'density':
      return dx * dy === 0 ? 0 : value / (dx * dy);
    case 'probability density':
      return total * dx * dy === 0 ? 0 : value / (total * dx * dy);
    default:
      return value;
  }
};

const getLegendShape = (series: Partial<PlotData>): ILegend['shape'] => {
  const dashType = series.line?.dash || 'solid';
  if (dashType === 'dot' || dashType === 'dash' || dashType === 'dashdot') {
    return 'dottedLine';
  } else if (series.mode?.includes('markers')) {
    return 'circle';
  }
  return 'default';
};

export const getAllupLegendsProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  traceInfo: TraceInfo[],
  isDarkTheme?: boolean,
): ILegendsProps => {
  const allupLegends: ILegend[] = [];
  // reduce on showlegend boolean propperty. reduce should return true if at least one series has showlegend true
  const toShowLegend = input.data.reduce((acc, series) => {
    return (
      acc || (series as Partial<PlotData>).showlegend === true || (series as Partial<PlotData>).showlegend === undefined
    );
  }, false);

  if (toShowLegend) {
    input.data.forEach((series: Data, index) => {
      if (traceInfo[index].type === 'donut') {
        const pieSeries = series as Partial<PieData>;
        const colors: string[] | string | null | undefined = extractColor(
          input.layout?.piecolorway ?? input.layout?.template?.layout?.colorway,
          colorwayType,
          input.layout?.piecolorway ?? pieSeries?.marker?.colors,
          colorMap,
          isDarkTheme,
          true,
        );

        pieSeries.labels?.forEach((label, labelIndex: number) => {
          const legend = `${label}`;
          // resolve color for each legend from the extracted colors
          const color: string = resolveColor(
            colors,
            labelIndex,
            legend,
            colorMap,
            input.layout?.piecolorway ?? input.layout?.template?.layout?.colorway,
            isDarkTheme,
            true,
          );
          if (legend !== '' && allupLegends.some(group => group.title === legend) === false) {
            allupLegends.push({
              title: legend,
              color,
            });
          }
        });
      } else if (isNonPlotType(traceInfo[index].type) === false) {
        const plotSeries = series as Partial<PlotData>;
        const name = plotSeries.legendgroup;
        const color = plotSeries.line?.color || plotSeries.marker?.color;
        const legendShape = getLegendShape(plotSeries);
        const resolvedColor = extractColor(
          input.layout?.template?.layout?.colorway,
          colorwayType,
          color,
          colorMap,
          isDarkTheme,
        );
        if (name !== undefined && name !== '' && allupLegends.some(group => group.title === name) === false) {
          allupLegends.push({
            title: name,
            color: resolvedColor as string,
            shape: legendShape,
          });
        }
      }
    });
  }

  return {
    legends: allupLegends,
    centerLegends: true,
    enabledWrapLines: true,
    canSelectMultipleLegends: true,
  };
};

const getLegendProps = (data: Data[], layout: Partial<Layout> | undefined, isMultiPlot: boolean) => {
  const legends: string[] = [];
  if (data.length === 1) {
    legends.push(data[0].name || '');
  } else {
    data.forEach((series, index) => {
      legends.push(series.name || `Series ${index + 1}`);
    });
  }

  const hideLegendsData = data.every((series: Partial<PlotData>) => series.showlegend === false);
  const hideLegendsInferred = layout?.showlegend === false || (layout?.showlegend !== true && legends.length < 2);

  return {
    legends,
    hideLegend: isMultiPlot || hideLegendsInferred || hideLegendsData,
  };
};

export const getNumberAtIndexOrDefault = (data: PlotData['z'] | undefined, index: number) => {
  if (isArrayOrTypedArray(data)) {
    if (typeof data![index] !== 'number' || !isFinite(data![index] as number)) {
      return;
    }

    return data![index] as number;
  }

  return 1;
};

export const getValidXYRanges = (series: Partial<PlotData>) => {
  if (!isArrayOrTypedArray(series.x) || !isArrayOrTypedArray(series.y)) {
    return [];
  }

  const ranges: [number, number][] = [];
  let start = 0;
  let end = 0;
  for (; end < series.x!.length; end++) {
    if (isInvalidValue(series.x![end]) || isInvalidValue(series.y![end])) {
      if (end - start > 0) {
        ranges.push([start, end]);
      }
      start = end + 1;
    }
  }
  if (end - start > 0) {
    ranges.push([start, end]);
  }

  return ranges;
};

const getIndexFromKey = (key: string, pattern: string): number => {
  const normalizedKey = key.replace(pattern, '') === '' ? '1' : key.replace(pattern, '');
  return parseInt(normalizedKey, 10) - 1;
};

export const isNonPlotType = (chartType: string): boolean => {
  return ['donut', 'sankey', 'pie'].includes(chartType);
};

export const getGridProperties = (
  schema: PlotlySchema | undefined,
  isMultiPlot: boolean,
  validTracesInfo: TraceInfo[],
): GridProperties => {
  const domainX: DomainInterval[] = [];
  const domainY: DomainInterval[] = [];
  let cartesianDomains = 0;
  type AnnotationProps = {
    xAnnotation?: string;
    yAnnotation?: string;
  };
  const annotations: Record<number, AnnotationProps> = {};
  let templateRows = '1fr';
  let templateColumns = '1fr';
  const gridLayout: GridAxisProperties = {};
  if (!isMultiPlot) {
    return { templateRows, templateColumns, layout: gridLayout };
  }

  const layout = schema?.layout as Partial<Layout> | undefined;

  if (layout !== undefined && layout !== null && Object.keys(layout).length > 0) {
    Object.keys(layout ?? {}).forEach(key => {
      if (key.startsWith('xaxis')) {
        const index = getIndexFromKey(key, 'xaxis');
        const anchor = (layout[key as keyof typeof layout] as Partial<LayoutAxis>)?.anchor ?? 'y';
        const anchorIndex = getIndexFromKey(anchor, 'y');
        if (index !== anchorIndex) {
          throw new Error(`Invalid layout: xaxis ${index + 1} anchor should be y${anchorIndex + 1}`);
        }
        const xAxisLayout = layout[key as keyof typeof layout] as Partial<LayoutAxis>;
        const domainXInfo: DomainInterval = {
          start: xAxisLayout?.domain ? xAxisLayout.domain[0] : 0,
          end: xAxisLayout?.domain ? xAxisLayout.domain[1] : 1,
        };
        domainX.push(domainXInfo);
      } else if (key.startsWith('yaxis')) {
        const index = getIndexFromKey(key, 'yaxis');
        const anchor = (layout[key as keyof typeof layout] as Partial<LayoutAxis>)?.anchor ?? 'x';
        const anchorIndex = getIndexFromKey(anchor, 'x');
        if (index !== anchorIndex) {
          if ((index === 1 && anchorIndex === 0) || layout.yaxis2?.side === 'right') {
            // Special case for secondary y axis where yaxis2 can anchor to x1
            return { templateRows, templateColumns };
          }
          throw new Error(`Invalid layout: yaxis ${index + 1} anchor should be x${anchorIndex + 1}`);
        }
        const yAxisLayout = layout[key as keyof typeof layout] as Partial<LayoutAxis>;
        const domainYInfo: DomainInterval = {
          start: yAxisLayout?.domain ? yAxisLayout.domain[0] : 0,
          end: yAxisLayout?.domain ? yAxisLayout.domain[1] : 1,
        };
        domainY.push(domainYInfo);
      }
    });
  }

  cartesianDomains = domainX.length; // Assuming that the number of x and y axes is the same
  validTracesInfo.forEach((trace, index) => {
    if (isNonPlotType(trace.type)) {
      const series = schema?.data?.[index] as Partial<PieData> | Partial<SankeyData>;
      const domainXInfo: DomainInterval = {
        start: series.domain?.x ? series.domain.x[0] : 0,
        end: series.domain?.x ? series.domain.x[1] : 1,
      };
      const domainYInfo: DomainInterval = {
        start: series.domain?.y ? series.domain.y[0] : 0,
        end: series.domain?.y ? series.domain.y[1] : 1,
      };
      domainX.push(domainXInfo);
      domainY.push(domainYInfo);
    }
  });

  if (layout !== undefined && layout !== null && Object.keys(layout).length > 0) {
    layout.annotations?.forEach(annotation => {
      const xMatches = domainX.flatMap((interval, idx) =>
        (annotation?.x as number) >= interval.start && (annotation?.x as number) <= interval.end ? [idx] : [],
      );
      const yMatch = domainY.findIndex(
        (interval, yIndex) =>
          xMatches.includes(yIndex) &&
          (annotation?.y as number) >= interval.start &&
          (annotation?.y as number) <= interval.end,
      );

      if (yMatch !== -1) {
        if (annotations[yMatch] === undefined) {
          annotations[yMatch] = {} as AnnotationProps;
        }
        if ((annotation?.textangle as number) === 90) {
          annotations[yMatch].yAnnotation = annotation.text;
        } else {
          annotations[yMatch].xAnnotation = annotation.text;
        }
      }
    });
  }

  if (domainX.length > 0) {
    const uniqueXIntervals = new Map<string, DomainInterval>();
    domainX.forEach(interval => {
      const key = `${interval.start}-${interval.end}`;
      if (!uniqueXIntervals.has(key)) {
        uniqueXIntervals.set(key, interval);
      }
    });

    const sortedXStart = Array.from(uniqueXIntervals.values())
      .map(interval => interval.start)
      .sort();

    templateColumns = `repeat(${sortedXStart.length}, 1fr)`;

    domainX.forEach((interval, index) => {
      const cellName =
        index >= cartesianDomains
          ? `${NON_PLOT_KEY_PREFIX}${index - cartesianDomains + 1}`
          : (`x${index === 0 ? '' : index + 1}` as XAxisName);

      const columnIndex = sortedXStart.findIndex(start => start === interval.start);
      const columnNumber = columnIndex + 1; // Column numbers are 1-based

      const annotationProps = annotations[index] as AnnotationProps;
      const xAnnotation = annotationProps?.xAnnotation;

      const row: AxisProperties = {
        row: -1,
        column: columnNumber,
        xAnnotation,
        xDomain: interval,
        yDomain: { start: 0, end: 1 }, // Default yDomain for x-axis
      };
      gridLayout[cellName] = row;
    });
  }

  if (domainY.length > 0) {
    const uniqueYIntervals = new Map<string, DomainInterval>();
    domainY.forEach(interval => {
      const key = `${interval.start}-${interval.end}`;
      if (!uniqueYIntervals.has(key)) {
        uniqueYIntervals.set(key, interval);
      }
    });
    const sortedYStart = Array.from(uniqueYIntervals.values())
      .map(interval => interval.start)
      .sort();

    const numberOfRows = sortedYStart.length;

    templateRows = `repeat(${numberOfRows}, 1fr)`;

    domainY.forEach((interval, index) => {
      const cellName =
        index >= cartesianDomains
          ? `${NON_PLOT_KEY_PREFIX}${index - cartesianDomains + 1}`
          : (`x${index === 0 ? '' : index + 1}` as XAxisName);

      const rowIndex = sortedYStart.findIndex(start => start === interval.start);
      const rowNumber = numberOfRows - rowIndex; // Rows are 1-based and we need to reverse the order for CSS grid
      const annotationProps = annotations[index] as AnnotationProps;
      const yAnnotation = annotationProps?.yAnnotation;

      const cell = gridLayout[cellName];

      if (cell !== undefined) {
        cell.row = rowNumber;
        cell.yAnnotation = yAnnotation;
        cell.yDomain = interval;
      }
    });
  }

  return {
    templateRows,
    templateColumns,
    layout: gridLayout,
  };
};

type GetAxisCategoryOrderPropsResult = Pick<ICartesianChartProps, 'xAxisCategoryOrder' | 'yAxisCategoryOrder'>;

/**
 * @see {@link https://github.com/plotly/plotly.js/blob/master/src/plots/cartesian/category_order_defaults.js#L50}
 */
const getAxisCategoryOrderProps = (data: Data[], layout: Partial<Layout> | undefined) => {
  const result: GetAxisCategoryOrderPropsResult = {};

  const axesById: Record<string, Partial<LayoutAxis> | undefined> = {
    x: layout?.xaxis,
    y: layout?.yaxis,
  };
  Object.keys(axesById).forEach(axId => {
    const ax = axesById[axId];
    const axLetter = axId[0] as 'x' | 'y';
    const propName = `${axLetter}AxisCategoryOrder` as keyof GetAxisCategoryOrderPropsResult;

    const values: Datum[] = [];
    data.forEach((series: Partial<PlotData>) => {
      series[axLetter]?.forEach(val => {
        if (!isInvalidValue(val)) {
          values.push(val as Datum);
        }
      });
    });

    const isAxisTypeCategory =
      ax?.type === 'category' || (isStringArray(values) && !isNumberArray(values) && !isDateArray(values));
    if (!isAxisTypeCategory) {
      result[propName] = 'data';
      return;
    }

    const isValidArray = isArrayOrTypedArray(ax?.categoryarray) && ax!.categoryarray!.length > 0;
    if (isValidArray && (!ax?.categoryorder || ax.categoryorder === 'array')) {
      result[propName] = ax!.categoryarray;
      return;
    }

    if (!ax?.categoryorder || ax.categoryorder === 'trace' || ax.categoryorder === 'array') {
      const categoriesInTraceOrder = Array.from(new Set(values as string[]));
      result[propName] = ax?.autorange === 'reversed' ? categoriesInTraceOrder.reverse() : categoriesInTraceOrder;
      return;
    }

    result[propName] = ax.categoryorder;
  });

  return result;
};

/**
 * This is experimental. Use it only with valid datetime strings to verify if they conform to the ISO 8601 format.
 */
const isoDateRegex = /^\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{1,9})?)?(Z)?)?$/;

/**
 * We want to display localized date and time in the charts, so the useUTC prop is set to false.
 * But this can sometimes cause the formatters to display the datetime incorrectly.
 * To work around this issue, we use this function to adjust datetime strings so that they are always interpreted
 * as local time, allowing the formatters to produce the correct output.
 *
 * FIXME: The formatters should always produce a clear and accurate localized output, regardless of the
 * format used to create the date object.
 */
const parseLocalDate = (value: string | number) => {
  if (typeof value === 'string') {
    const match = value.match(isoDateRegex);
    if (match) {
      if (!match[3]) {
        value += 'T00:00';
      } else if (match[6]) {
        value = value.replace('Z', '');
      }
    }
  }
  return new Date(value);
};

const getBarProps = (
  data: Data[],
  layout: Partial<Layout> | undefined,
  isHorizontal?: boolean,
):
  | Pick<
      IVerticalBarChartProps,
      'barWidth' | 'maxBarWidth' | 'xAxisInnerPadding' | 'xAxisOuterPadding' | 'xAxisPadding'
    >
  | Pick<IGanttChartProps, 'barHeight' | 'maxBarHeight' | 'yAxisPadding'> => {
  let padding: number | undefined;

  if (typeof layout?.bargap === 'number') {
    if (layout.bargap >= 0 && layout.bargap <= 1) {
      padding = layout.bargap;
    } else {
      // Plotly uses a default bargap of 0.2, as noted here: https://github.com/plotly/plotly.js/blob/1d5a249e43dd31ae50acf02117a19e5ac97387e9/src/traces/bar/layout_defaults.js#L58.
      // However, we don't use this value as our default padding because it causes the bars to
      // appear disproportionately wide in large containers.
      padding = 0.2;
    }
  }

  const plotlyBarWidths = data
    .map((series: Partial<PlotData>) => {
      if (series.type === 'bar' && (isArrayOrTypedArray(series.width) || typeof series.width === 'number')) {
        return series.width;
      }
      return [];
    })
    .flat();
  const maxPlotlyBarWidth = d3Max(plotlyBarWidths as number[]);
  if (typeof maxPlotlyBarWidth === 'number') {
    padding = 1 - maxPlotlyBarWidth;
    padding = Math.max(0, Math.min(padding, 1));
  }

  if (typeof padding === 'undefined') {
    return {};
  }

  if (isHorizontal) {
    return {
      maxBarHeight: 1000,
      yAxisPadding: padding,
    };
  }

  return {
    barWidth: 'auto',
    maxBarWidth: 1000,
    xAxisInnerPadding: padding,
    xAxisOuterPadding: padding / 2,
  };
};

type GetAxisScaleTypePropsResult = Pick<ICartesianChartProps, 'xScaleType' | 'yScaleType' | 'secondaryYScaleType'>;

const getAxisScaleTypeProps = (data: Data[], layout: Partial<Layout> | undefined): GetAxisScaleTypePropsResult => {
  const result: GetAxisScaleTypePropsResult = {};
  const axisObjects = getAxisObjects(data, layout);

  if (axisObjects.x?.type === 'log') {
    result.xScaleType = 'log';
  }
  if (axisObjects.y?.type === 'log') {
    result.yScaleType = 'log';
  }
  if (axisObjects.y2?.type === 'log') {
    result.secondaryYScaleType = 'log';
  }

  return result;
};

type GetAxisTickPropsResult = Pick<
  ICartesianChartProps,
  'tickValues' | 'xAxisTickCount' | 'xAxis' | 'yAxisTickValues' | 'yAxisTickCount' | 'yAxis'
>;

/**
 * @see {@link https://github.com/plotly/plotly.js/blob/master/src/plots/cartesian/tick_value_defaults.js#L8}
 */
const getAxisTickProps = (data: Data[], layout: Partial<Layout> | undefined): GetAxisTickPropsResult => {
  const props: GetAxisTickPropsResult = {};
  const axisObjects = getAxisObjects(data, layout);

  Object.keys(axisObjects).forEach(axId => {
    const ax = axisObjects[axId];
    if (!ax) {
      return;
    }

    const axType = getAxisType(data, axId[0] as 'x' | 'y', ax);

    if ((!ax.tickmode || ax.tickmode === 'array') && isArrayOrTypedArray(ax.tickvals)) {
      const tickValues = axType === 'date' ? ax.tickvals!.map(v => new Date(v)) : ax.tickvals;

      if (axId === 'x') {
        props.tickValues = tickValues;
      } else if (axId === 'y') {
        props.yAxisTickValues = tickValues;
      }
      return;
    }

    if ((!ax.tickmode || ax.tickmode === 'linear') && ax.dtick) {
      const dtick = plotlyDtick(ax.dtick, axType);
      const tick0 = plotlyTick0(ax.tick0, axType, dtick);

      if (axId === 'x') {
        props.xAxis = {
          tickStep: dtick,
          tick0,
        };
      } else if (axId === 'y') {
        props.yAxis = {
          tickStep: dtick,
          tick0,
        };
      }
      return;
    }

    if ((!ax.tickmode || ax.tickmode === 'auto') && typeof ax.nticks === 'number' && ax.nticks >= 0) {
      if (axId === 'x') {
        props.xAxisTickCount = ax.nticks;
      } else if (axId === 'y') {
        props.yAxisTickCount = ax.nticks;
      }
    }
  });

  return props;
};

/**
 * @see {@link https://github.com/plotly/plotly.js/blob/master/src/plots/cartesian/clean_ticks.js#L16}
 */
const plotlyDtick = (dtick: DTickValue | undefined, axType: AxisType | undefined) => {
  const isLogAx = axType === 'log';
  const isDateAx = axType === 'date';
  const isCatAx = axType === 'category';
  const dtickDflt = isDateAx ? 86400000 : 1;

  if (!dtick) {
    return dtickDflt;
  }

  if (isNumber(dtick)) {
    dtick = Number(dtick);
    if (dtick <= 0) {
      return dtickDflt;
    }
    if (isCatAx) {
      // category dtick must be positive integers
      return Math.max(1, Math.round(dtick));
    }
    if (isDateAx) {
      // date dtick must be at least 0.1ms (our current precision)
      return Math.max(0.1, dtick);
    }
    return dtick;
  }

  if (typeof dtick !== 'string' || !(isDateAx || isLogAx)) {
    return dtickDflt;
  }

  const prefix = dtick.charAt(0);
  const dtickNum = isNumber(dtick.slice(1)) ? Number(dtick.slice(1)) : 0;

  if (
    dtickNum <= 0 ||
    !(
      // "M<n>" gives ticks every (integer) n months
      (
        (isDateAx && prefix === 'M' && dtickNum === Math.round(dtickNum)) ||
        // "L<f>" gives ticks linearly spaced in data (not in position) every (float) f
        (isLogAx && prefix === 'L') ||
        // "D1" gives powers of 10 with all small digits between, "D2" gives only 2 and 5
        (isLogAx && prefix === 'D' && (dtickNum === 1 || dtickNum === 2))
      )
    )
  ) {
    return dtickDflt;
  }

  return dtick;
};

/**
 * @see {@link https://github.com/plotly/plotly.js/blob/master/src/plots/cartesian/clean_ticks.js#L70}
 */
const plotlyTick0 = (tick0: number | string | undefined, axType: AxisType | undefined, dtick: string | number) => {
  if (axType === 'date') {
    return isDate(tick0) ? new Date(tick0!) : new Date(DEFAULT_DATE_STRING);
  }
  if (dtick === 'D1' || dtick === 'D2') {
    // D1 and D2 modes ignore tick0 entirely
    return undefined;
  }
  // Aside from date axes, tick0 must be numeric
  return isNumber(tick0) ? Number(tick0) : 0;
};

const getAxisObjects = (data: Data[], layout: Partial<Layout> | undefined) => {
  // Traces are grouped by their xaxis property, and for each group/subplot, the adapter functions
  // are called with the corresponding filtered data. As a result, all traces passed to an adapter
  // function share the same xaxis.
  let xAxisId: number | undefined;
  const yAxisIds = new Set<number>();
  data.forEach((series: Partial<PlotData>) => {
    const axisIds = getAxisIds(series);
    xAxisId = axisIds.x;
    yAxisIds.add(axisIds.y);
  });

  const axisObjects: Record<string, Partial<LayoutAxis> | undefined> = {};

  if (typeof xAxisId === 'number') {
    axisObjects.x = layout?.[getAxisKey('x', xAxisId)];
  }

  const sortedYAxisIds = Array.from(yAxisIds).sort();
  if (sortedYAxisIds.length > 0) {
    axisObjects.y = layout?.[getAxisKey('y', sortedYAxisIds[0])];
  }
  if (sortedYAxisIds.length > 1) {
    axisObjects.y2 = layout?.[getAxisKey('y', sortedYAxisIds[1])];
  }

  return axisObjects;
};

const getAxisType = (data: Data[], axLetter: 'x' | 'y', ax: Partial<LayoutAxis> | undefined): AxisType | undefined => {
  const values: Datum[] = [];
  data.forEach((series: Partial<PlotData>) => {
    series[axLetter]?.forEach(val => {
      if (!isInvalidValue(val)) {
        values.push(val as Datum);
      }
    });
  });

  // Note: When ax.type is explicitly specified, Plotly casts the values to match that type.
  // Therefore, simply checking the type of the values may not be sufficient. At the moment,
  // we don’t always perform this casting ourselves and instead use the values as provided.

  if (isNumberArray(values)) {
    if (ax?.type === 'log') {
      return 'log';
    }
    return 'linear';
  }

  if (isDateArray(values)) {
    return 'date';
  }

  if (isStringArray(values)) {
    return 'category';
  }
};
