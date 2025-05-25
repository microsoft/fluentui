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
import { IDonutChartProps } from '../DonutChart/index';
import {
  IChartDataPoint,
  IChartProps,
  IHorizontalBarChartWithAxisDataPoint,
  ILineChartPoints,
  IVerticalStackedChartProps,
  IHeatMapChartData,
  IHeatMapChartDataPoint,
  IGroupedVerticalBarChartData,
  IVerticalBarChartDataPoint,
  ISankeyChartData,
  ILineChartLineOptions,
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
import { findNumericMinMaxOfY } from '../../utilities/utilities';
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
} from '@fluentui/chart-utilities';
import {
  isArrayOfType,
  isArrayOrTypedArray,
  isDate,
  isDateArray,
  isNumberArray,
  isYearArray,
} from '@fluentui/chart-utilities';
import { timeParse } from 'd3-time-format';
import { curveCardinal as d3CurveCardinal } from 'd3-shape';
import type { ColorwayType } from './PlotlyColorAdapter';
import { extractColor, resolveColor } from './PlotlyColorAdapter';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isMonth = (possiblyMonthValue: any): boolean => {
  const parseFullMonth = timeParse('%B');
  const parseShortMonth = timeParse('%b');
  return parseFullMonth(possiblyMonthValue) !== null || parseShortMonth(possiblyMonthValue) !== null;
};

export const isMonthArray = (data: Datum[] | Datum[][] | TypedArray): boolean => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return isArrayOfType(data, (value: any): boolean => isMonth(value) || value === null);
};

function getTitles(layout: Partial<Layout> | undefined) {
  const titles = {
    chartTitle: typeof layout?.title === 'string' ? layout.title : layout?.title?.text ?? '',
    xAxisTitle: typeof layout?.xaxis?.title === 'string' ? layout?.xaxis?.title : layout?.xaxis?.title?.text ?? '',
    yAxisTitle: typeof layout?.yaxis?.title === 'string' ? layout?.yaxis?.title : layout?.yaxis?.title?.text ?? '',
  };
  return titles;
}

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

const usesSecondaryYScale = (series: Partial<PlotData>): boolean => {
  return series.yaxis === 'y2';
};

const getSecondaryYAxisValues = (
  data: Data[],
  layout: Partial<Layout> | undefined,
  maxAllowedMinY?: number,
  minAllowedMaxY?: number,
): ISecondaryYAxisValues => {
  let containsSecondaryYAxis = false;
  let yMinValue: number | undefined;
  let yMaxValue: number | undefined;

  data.forEach((series: Partial<PlotData>) => {
    if (usesSecondaryYScale(series)) {
      containsSecondaryYAxis = true;

      const yValues = series.y as number[];
      if (yValues) {
        yMinValue = Math.min(...yValues);
        yMaxValue = Math.max(...yValues);
      }
    }
  });

  if (!containsSecondaryYAxis) {
    return {};
  }

  if (typeof yMinValue === 'number' && typeof maxAllowedMinY === 'number') {
    yMinValue = Math.min(yMinValue, maxAllowedMinY);
  }
  if (typeof yMaxValue === 'number' && typeof minAllowedMaxY === 'number') {
    yMaxValue = Math.max(yMaxValue, minAllowedMaxY);
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
  return resolveColor(extractedColors, 0, '', colorMap, isDarkTheme);
};

export const transformPlotlyJsonToDonutProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IDonutChartProps => {
  const firstData = input.data[0] as Partial<PieData>;

  // extract colors for each series only once
  const colors: string[] | string | null | undefined = extractColor(
    input.layout?.template?.layout?.colorway,
    colorwayType,
    firstData?.marker?.colors,
    colorMap,
    isDarkTheme,
  );

  const mapLegendToDataPoint: Record<string, IChartDataPoint> = {};
  firstData.labels?.forEach((label, index: number) => {
    const value = getNumberAtIndexOrDefault(firstData.values, index);
    if (isInvalidValue(value) || (value as number) < 0) {
      return;
    }

    const legend = `${label}`;
    // resolve color for each legend from the extracted colors
    const color: string = resolveColor(colors, index, legend, colorMap, isDarkTheme);

    if (!mapLegendToDataPoint[legend]) {
      mapLegendToDataPoint[legend] = {
        legend,
        data: value,
        color,
      };
    } else {
      mapLegendToDataPoint[legend].data! += value as number;
    }
  });

  const width: number = input.layout?.width ?? 440;
  const height: number = input.layout?.height ?? 220;
  const hideLabels: boolean = firstData.textinfo
    ? !['value', 'percent', 'label+percent'].includes(firstData.textinfo)
    : false;
  const donutMarginHorizontal: number = hideLabels ? 0 : 80;
  const donutMarginVertical: number = 40 + (hideLabels ? 0 : 40);
  const innerRadius: number = firstData.hole
    ? firstData.hole * (Math.min(width - donutMarginHorizontal, height - donutMarginVertical) / 2)
    : 0;
  const { chartTitle } = getTitles(input.layout);

  return {
    data: {
      chartTitle,
      chartData: Object.values(mapLegendToDataPoint),
    },
    hideLegend: input.layout?.showlegend === false ? true : false,
    width: input.layout?.width,
    height,
    innerRadius,
    hideLabels,
    showLabelsInPercent: firstData.textinfo ? ['percent', 'label+percent'].includes(firstData.textinfo) : true,
    roundCorners: true,
  };
};

export const transformPlotlyJsonToVSBCProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
  fallbackVSBC?: boolean,
): IVerticalStackedBarChartProps => {
  const mapXToDataPoints: { [key: string]: IVerticalStackedChartProps } = {};
  let yMaxValue = 0;
  let yMinValue = 0;
  const secondaryYAxisValues = getSecondaryYAxisValues(input.data, input.layout);
  const { legends, hideLegend } = getLegendProps(input.data, input.layout);
  input.data.forEach((series: Partial<PlotData>, index1: number) => {
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

    const validXYRanges = getValidXYRanges(series);
    validXYRanges.forEach(([rangeStart, rangeEnd], rangeIdx) => {
      const rangeXValues = series.x!.slice(rangeStart, rangeEnd);
      const rangeYValues = series.y!.slice(rangeStart, rangeEnd);

      (rangeXValues as Datum[]).forEach((x: string | number, index2: number) => {
        if (!mapXToDataPoints[x]) {
          mapXToDataPoints[x] = { xAxisPoint: isXYearCategory ? x.toString() : x, chartData: [], lineData: [] };
        }
        const legend: string = legends[index1];
        // resolve color for each legend's bars from the extracted colors
        const color = resolveColor(extractedBarColors, index1, legend, colorMap, isDarkTheme);
        const yVal: number = rangeYValues[index2] as number;
        if (series.type === 'bar') {
          mapXToDataPoints[x].chartData.push({
            legend,
            data: yVal,
            color,
          });
          yMaxValue = Math.max(yMaxValue, yVal);
        } else if (series.type === 'scatter' || !!fallbackVSBC) {
          const lineColor = resolveColor(extractedLineColors, index1, legend, colorMap, isDarkTheme);
          const lineOptions = getLineOptions(series.line);
          const dashType = series.line?.dash || 'solid';
          const legendShape =
            dashType === 'dot' || dashType === 'dash' || dashType === 'dashdot'
              ? 'dottedLine'
              : series.mode?.includes('markers')
              ? 'circle'
              : 'default';
          mapXToDataPoints[x].lineData!.push({
            legend: legend + (validXYRanges.length > 1 ? `.${rangeIdx + 1}` : ''),
            legendShape,
            y: yVal,
            color: lineColor,
            lineOptions: {
              ...(lineOptions ?? {}),
              mode: series.mode,
            },
            useSecondaryYScale: usesSecondaryYScale(series),
          });
          if (!usesSecondaryYScale(series)) {
            yMaxValue = Math.max(yMaxValue, yVal);
            yMinValue = Math.min(yMinValue, yVal);
          }
        }
      });
    });
  });

  const { chartTitle, xAxisTitle, yAxisTitle } = getTitles(input.layout);

  return {
    data: Object.values(mapXToDataPoints),
    width: input.layout?.width,
    height: input.layout?.height ?? 350,
    barWidth: 'auto',
    yMaxValue,
    yMinValue,
    chartTitle,
    xAxisTitle,
    yAxisTitle,
    mode: 'plotly',
    ...secondaryYAxisValues,
    hideTickOverlap: true,
    hideLegend,
    roundCorners: true,
    supportNegativeData: true,
  };
};

export const transformPlotlyJsonToGVBCProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IGroupedVerticalBarChartProps => {
  const mapXToDataPoints: Record<string, IGroupedVerticalBarChartData> = {};
  const secondaryYAxisValues = getSecondaryYAxisValues(input.data, input.layout, 0, 0);
  const { legends, hideLegend } = getLegendProps(input.data, input.layout);

  input.data.forEach((series: Partial<PlotData>, index1: number) => {
    // extract colors for each series only once
    const extractedColors = extractColor(
      input.layout?.template?.layout?.colorway,
      colorwayType,
      series.marker?.color,
      colorMap,
      isDarkTheme,
    ) as string[] | string | undefined;
    (series.x as Datum[])?.forEach((x: string | number, xIndex: number) => {
      if (isInvalidValue(x) || isInvalidValue(series.y?.[xIndex])) {
        return;
      }

      if (!mapXToDataPoints[x]) {
        mapXToDataPoints[x] = { name: x.toString(), series: [] };
      }

      if (series.type === 'bar') {
        const legend: string = legends[index1];
        // resolve color for each legend's bars from the extracted colors
        const color = resolveColor(extractedColors, index1, legend, colorMap, isDarkTheme);
        mapXToDataPoints[x].series.push({
          key: legend,
          data: series.y![xIndex] as number,
          xAxisCalloutData: x as string,
          color,
          legend,
          useSecondaryYScale: usesSecondaryYScale(series),
        });
      }
    });
  });

  const { chartTitle, xAxisTitle, yAxisTitle } = getTitles(input.layout);

  return {
    data: Object.values(mapXToDataPoints),
    width: input.layout?.width,
    height: input.layout?.height ?? 350,
    barwidth: 'auto',
    chartTitle,
    xAxisTitle,
    yAxisTitle,
    mode: 'plotly',
    ...secondaryYAxisValues,
    hideTickOverlap: true,
    hideLegend,
    roundCorners: true,
  };
};

export const transformPlotlyJsonToVBCProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IVerticalBarChartProps => {
  const vbcData: IVerticalBarChartDataPoint[] = [];
  const { legends, hideLegend } = getLegendProps(input.data, input.layout);

  input.data.forEach((series: Partial<PlotData>, seriesIdx: number) => {
    if (!series.x) {
      return;
    }

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
      // resolve color for each legend's bars from the extracted colors
      const color = resolveColor(extractedColors, seriesIdx, legend, colorMap, isDarkTheme);
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
        color,
        ...(isXString
          ? {}
          : { xAxisCalloutData: `[${(bin as Bin<number, number>).x0} - ${(bin as Bin<number, number>).x1})` }),
      });
    });
  });

  const { chartTitle, xAxisTitle, yAxisTitle } = getTitles(input.layout);

  return {
    data: vbcData,
    width: input.layout?.width,
    height: input.layout?.height ?? 350,
    supportNegativeData: true,
    chartTitle,
    xAxisTitle,
    yAxisTitle,
    mode: 'histogram',
    hideTickOverlap: true,
    maxBarWidth: 50,
    hideLegend,
    roundCorners: true,
  };
};

export const transformPlotlyJsonToScatterChartProps = (
  input: PlotlySchema,
  isAreaChart: boolean,
  isScatterMarkers: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): ILineChartProps | IAreaChartProps => {
  const secondaryYAxisValues = getSecondaryYAxisValues(
    input.data,
    input.layout,
    isAreaChart ? 0 : undefined,
    isAreaChart ? 0 : undefined,
  );
  let mode: string = 'tonexty';
  const { legends, hideLegend } = getLegendProps(input.data, input.layout);
  const chartData: ILineChartPoints[] = input.data
    .map((series: Partial<PlotData>, index: number) => {
      // extract colors for each series only once
      const extractedColors = extractColor(
        input.layout?.template?.layout?.colorway,
        colorwayType,
        isScatterMarkers ? series.marker?.color : series.line?.color,
        colorMap,
        isDarkTheme,
      ) as string[] | string | undefined;
      const xValues = series.x as Datum[];
      const isString = isStringArray(xValues);
      const isXDate = isDateArray(xValues);
      const isXNumber = isNumberArray(xValues);
      const legend: string = legends[index];
      // resolve color for each legend's lines from the extracted colors
      const seriesColor = resolveColor(extractedColors, index, legend, colorMap, isDarkTheme);
      mode = series.fill === 'tozeroy' ? 'tozeroy' : 'tonexty';
      const lineOptions = getLineOptions(series.line);
      const dashType = series.line?.dash || 'solid';
      const legendShape =
        dashType === 'dot' || dashType === 'dash' || dashType === 'dashdot'
          ? 'dottedLine'
          : series.mode?.includes('markers')
          ? 'circle'
          : 'default';

      const validXYRanges = getValidXYRanges(series);
      return validXYRanges.map(([rangeStart, rangeEnd], rangeIdx) => {
        const rangeXValues = xValues.slice(rangeStart, rangeEnd);
        const rangeYValues = series.y!.slice(rangeStart, rangeEnd);
        const markerSizes = isArrayOrTypedArray(series.marker?.size)
          ? (series.marker!.size as number[]).slice(rangeStart, rangeEnd)
          : [];

        return {
          legend,
          legendShape,
          data: rangeXValues.map((x, i: number) => ({
            x: isString ? (isXDate ? new Date(x as string) : isXNumber ? parseFloat(x as string) : x) : x,
            y: rangeYValues[i],
            ...(Array.isArray(series.marker?.size)
              ? { markerSize: markerSizes[i] }
              : typeof series.marker?.size === 'number'
              ? { markerSize: series.marker.size }
              : {}),
          })),
          color: seriesColor,
          lineOptions: {
            ...(lineOptions ?? {}),
            mode: series.mode,
          },
          useSecondaryYScale: usesSecondaryYScale(series),
        } as ILineChartPoints;
      });
    })
    .flat();

  const yMinMaxValues = findNumericMinMaxOfY(chartData);
  const { chartTitle, xAxisTitle, yAxisTitle } = getTitles(input.layout);
  const numDataPoints = chartData.reduce((total, lineChartPoints) => total + lineChartPoints.data.length, 0);

  const chartProps: IChartProps = {
    chartTitle,
    lineChartData: chartData,
  };

  if (isAreaChart) {
    return {
      data: chartProps,
      supportNegativeData: true,
      xAxisTitle,
      yAxisTitle,
      ...secondaryYAxisValues,
      mode,
      width: input.layout?.width,
      height: input.layout?.height ?? 350,
      hideTickOverlap: true,
      hideLegend,
      useUTC: false,
      optimizeLargeData: numDataPoints > 1000,
    } as IAreaChartProps;
  } else {
    return {
      data: chartProps,
      supportNegativeData: true,
      xAxisTitle,
      yAxisTitle,
      ...secondaryYAxisValues,
      roundedTicks: true,
      yMinValue: yMinMaxValues.startValue,
      yMaxValue: yMinMaxValues.endValue,
      width: input.layout?.width,
      height: input.layout?.height ?? 350,
      hideTickOverlap: true,
      enableReflow: false,
      hideLegend,
      useUTC: false,
      optimizeLargeData: numDataPoints > 1000,
    } as ILineChartProps;
  }
};

export const transformPlotlyJsonToHorizontalBarWithAxisProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  colorwayType: ColorwayType,
  isDarkTheme?: boolean,
): IHorizontalBarChartWithAxisProps => {
  const { legends, hideLegend } = getLegendProps(input.data, input.layout);
  const chartData: IHorizontalBarChartWithAxisDataPoint[] = input.data
    .map((series: Partial<PlotData>, index: number) => {
      // extract colors for each series only once
      const extractedColors = extractColor(
        input.layout?.template?.layout?.colorway,
        colorwayType,
        series.marker?.color,
        colorMap,
        isDarkTheme,
      ) as string[] | string | undefined;
      const legend = legends[index];
      // resolve color for each legend's bars from the extracted colors
      const color = resolveColor(extractedColors, index, legend, colorMap, isDarkTheme);
      return (series.y as Datum[])
        .map((yValue, i: number) => {
          if (isInvalidValue(series.x?.[i]) || isInvalidValue(yValue)) {
            return null;
          }

          return {
            x: series.x![i],
            y: yValue,
            legend,
            color,
          } as IHorizontalBarChartWithAxisDataPoint;
        })
        .filter(point => point !== null) as IHorizontalBarChartWithAxisDataPoint[];
    })
    .reverse()
    .flat()
    //reversing the order to invert the Y bars order as required by plotly.
    .reverse();

  const chartHeight: number = input.layout?.height ?? 450;
  const margin: number = input.layout?.margin?.l ?? 0;
  const padding: number = input.layout?.margin?.pad ?? 0;
  const availableHeight: number = chartHeight - margin - padding;
  const numberOfBars = input.data.reduce((total: number, item: PlotData) => {
    return total + (item.y?.length || 0);
  }, 0);
  const scalingFactor = 0.01;
  const gapFactor = 1 / (1 + scalingFactor * numberOfBars);
  const barHeight = availableHeight / (numberOfBars * (1 + gapFactor));

  const { chartTitle, xAxisTitle, yAxisTitle } = getTitles(input.layout);

  return {
    data: chartData,
    chartTitle,
    xAxisTitle,
    yAxisTitle,
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
  };
};

export const transformPlotlyJsonToHeatmapProps = (input: PlotlySchema): IHeatMapChartProps => {
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
  const domainValuesForColorScale: number[] = Array.isArray(firstData.colorscale)
    ? (firstData.colorscale as Array<[number, string]>).map(arr => arr[0] * (zMax - zMin) + zMin)
    : defaultDomain;

  const rangeValuesForColorScale: string[] = Array.isArray(firstData.colorscale)
    ? (firstData.colorscale as Array<[number, string]>).map(arr => arr[1])
    : defaultRange;

  const { chartTitle, xAxisTitle, yAxisTitle } = getTitles(input.layout);

  return {
    data: [heatmapData],
    domainValuesForColorScale,
    rangeValuesForColorScale,
    hideLegend: true,
    showYAxisLables: true,
    chartTitle,
    xAxisTitle,
    yAxisTitle,
    sortOrder: 'none',
    width: input.layout?.width,
    height: input.layout?.height ?? 350,
    hideTickOverlap: true,
    noOfCharsToTruncate: 20,
    showYAxisLablesTooltip: true,
  };
};

export const transformPlotlyJsonToSankeyProps = (
  input: PlotlySchema,
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
      const color = resolveColor(extractedNodeColors, index, label, colorMap, isDarkTheme);

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
    enableReflow: true,
  };
};

export const transformPlotlyJsonToGaugeProps = (
  input: PlotlySchema,
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
        const color = resolveColor(extractedColors, index, legend, colorMap, isDarkTheme);
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
      const color = resolveColor(extractedIncreasingDeltaColors, 0, '', colorMap, isDarkTheme);
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
      const color = resolveColor(extractedDecreasingDeltaColors, 0, '', colorMap, isDarkTheme);
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

export const transformPlotlyJsonToChartTableProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): IChartTableProps => {
  const tableData = input.data[0] as TableData;

  const normalizeHeaders = (
    values: (string | number | boolean | null)[] | (string | number | boolean | null)[][],
  ): (string | number | boolean | null)[] => {
    // Case: values is array of arrays
    if (Array.isArray(values[0])) {
      return (values as string[][]).map(row =>
        row
          .map(cell => cleanText(cell))
          .filter(Boolean)
          .join(' '),
      );
    }

    // Case: values is 1d array
    return (values as string[]).map(cell => cleanText(cell));
  };
  const columns = tableData.cells?.values ?? [];
  const rows = columns[0].map((_, rowIndex: number) =>
    columns.map(col => {
      const cell = col[rowIndex];
      return typeof cell === 'string' ? cleanText(cell) : cell;
    }),
  );

  const styles: IChartTableProps['styles'] = {
    root: {
      ...(input.layout?.font?.size ? { fontSize: input.layout.font.size } : {}),
    },
  };

  return {
    headers: normalizeHeaders(tableData.header?.values ?? []),
    rows,
    width: input.layout?.width,
    height: input.layout?.height,
    styles,
  };
};

export const projectPolarToCartesian = (input: PlotlySchema): PlotlySchema => {
  const projection: PlotlySchema = { ...input };
  for (let sindex = 0; sindex < input.data.length; sindex++) {
    const series = input.data[sindex] as Partial<PlotData>;
    series.x = [] as Datum[];
    series.y = [] as Datum[];
    for (let ptindex = 0; ptindex < (series.r?.length ?? 0); ptindex++) {
      if (isInvalidValue(series.theta?.[ptindex]) || isInvalidValue(series.r?.[ptindex])) {
        continue;
      }

      const thetaRad = ((series.theta![ptindex] as number) * Math.PI) / 180;
      const radius = series.r![ptindex] as number;
      series.x.push(radius * Math.cos(thetaRad));
      series.y.push(radius * Math.sin(thetaRad));
    }
    projection.data[sindex] = series;
  }

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringArray = (arr: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return isArrayOfType(arr, (value: any) => typeof value === 'string' || value === null);
};

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
    const precision = Math.max(getPrecision(minVal), getPrecision(binSize));
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

const getPrecision = (value: number) => {
  return value.toString().split('.')[1]?.length ?? 0;
};

const precisionRound = (value: number, precision: number) => {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};

const getLegendProps = (data: Data[], layout: Partial<Layout> | undefined) => {
  const legends: string[] = [];
  if (data.length === 1) {
    legends.push(data[0].name || '');
  } else {
    data.forEach((series, index) => {
      legends.push(series.name || `Series ${index + 1}`);
    });
  }

  const hideLegends = data.every((series: Partial<PlotData>) => series.showlegend === false);

  return {
    legends,
    hideLegend:
      layout?.showlegend === false || (layout?.showlegend !== true && legends.length < 2) ? true : hideLegends,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isInvalidValue = (value: any) => {
  return typeof value === 'undefined' || value === null || (typeof value === 'number' && !isFinite(value));
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
