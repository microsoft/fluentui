/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { DataVizPalette, getColorFromToken, getNextColor } from '../../utilities/colors';
import { GaugeChartVariant, IGaugeChartProps, IGaugeChartSegment } from '../GaugeChart/index';
import { IGroupedVerticalBarChartProps } from '../GroupedVerticalBarChart/index';
import { IVerticalBarChartProps } from '../VerticalBarChart/index';
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
import { color as d3Color } from 'd3-color';

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

const isMonth = (possiblyMonthValue: any): boolean => {
  const parseFullMonth = timeParse('%B');
  const parseShortMonth = timeParse('%b');
  return parseFullMonth(possiblyMonthValue) !== null || parseShortMonth(possiblyMonthValue) !== null;
};

export const isMonthArray = (data: Datum[] | Datum[][] | TypedArray): boolean => {
  return isArrayOfType(data, isMonth);
};

function getTitles(layout: Partial<Layout> | undefined) {
  const titles = {
    chartTitle: typeof layout?.title === 'string' ? layout.title : layout?.title?.text ?? '',
    xAxisTitle: typeof layout?.xaxis?.title === 'string' ? layout?.xaxis?.title : layout?.xaxis?.title?.text ?? '',
    yAxisTitle: typeof layout?.yaxis?.title === 'string' ? layout?.yaxis?.title : layout?.yaxis?.title?.text ?? '',
  };
  return titles;
}

export const correctYearMonth = (xValues: Datum[] | Datum[][] | TypedArray): any[] => {
  const presentYear = new Date().getFullYear();
  if (xValues.length > 0 && Array.isArray(xValues[0])) {
    throw new Error('updateXValues:: 2D array not supported');
  }
  const dates = (xValues as Datum[]).map(possiblyMonthValue => {
    const parsedDate = `${possiblyMonthValue} 01, ${presentYear}`;
    return isDate(parsedDate) ? new Date(parsedDate) : null;
  });
  for (let i = dates.length - 1; i > 0; i--) {
    const currentMonth = dates[i]!.getMonth();
    const previousMonth = dates[i - 1]!.getMonth();
    const currentYear = dates[i]!.getFullYear();
    const previousYear = dates[i - 1]!.getFullYear();
    if (previousMonth >= currentMonth) {
      dates[i - 1]!.setFullYear(dates[i]!.getFullYear() - 1);
    } else if (previousYear > currentYear) {
      dates[i - 1]!.setFullYear(currentYear);
    }
  }
  xValues = (xValues as Datum[]).map((month, index) => {
    return `${month} 01, ${dates[index]!.getFullYear()}`;
  });
  return xValues;
};

export const getColor = (
  legendLabel: string,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): string => {
  if (!colorMap.current.has(legendLabel)) {
    const nextColor = getNextColor(colorMap.current.size + 1, 0, isDarkTheme);
    colorMap.current.set(legendLabel, nextColor);
    return nextColor;
  }

  return colorMap.current.get(legendLabel) as string;
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

export const getSchemaColors = (
  colors: Array<string | number | null | undefined>,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): string[] | undefined => {
  const hexColors: string[] = [];
  if (!colors) {
    return undefined;
  }
  if (isArrayOrTypedArray(colors)) {
    colors.forEach((element, index) => {
      const colorString = element?.toString().trim();
      const nextFluentColor = getColor(`Label_${index}`, colorMap, isDarkTheme);
      if (colorString) {
        const parsedColor = d3Color(colorString);
        hexColors.push(parsedColor ? parsedColor.formatHex() : nextFluentColor);
      } else {
        hexColors.push(nextFluentColor);
      }
    });
  }
  return hexColors;
};

export const transformPlotlyJsonToDonutProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  useFluentVizColorPalette: boolean,
  isDarkTheme?: boolean,
): IDonutChartProps => {
  const firstData = input.data[0] as PieData;
  let colors: string[] | string | null | undefined = undefined;
  if (!useFluentVizColorPalette) {
    colors = firstData.marker?.colors ? getSchemaColors(firstData?.marker?.colors, colorMap, isDarkTheme) : undefined;
  }

  const mapLegendToDataPoint: Record<string, IChartDataPoint> = {};
  firstData.labels?.forEach((label: string, index: number) => {
    let color: string = '';
    if (colors && isStringArray(colors)) {
      color = colors[index % colors.length];
    } else if (typeof colors === 'string') {
      color = colors;
    } else {
      color = getColor(label, colorMap, isDarkTheme);
    }
    //ToDo how to handle string data?
    const value = typeof firstData.values?.[index] === 'number' ? (firstData.values[index] as number) : 1;

    if (!mapLegendToDataPoint[label]) {
      mapLegendToDataPoint[label] = {
        legend: label,
        data: value,
        color,
      };
    } else {
      mapLegendToDataPoint[label].data! += value;
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
  };
};

export const transformPlotlyJsonToVSBCProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
  fallbackVSBC?: boolean,
): IVerticalStackedBarChartProps => {
  const mapXToDataPoints: { [key: string]: IVerticalStackedChartProps } = {};
  let yMaxValue = 0;
  const secondaryYAxisValues = getSecondaryYAxisValues(input.data, input.layout);
  const { legends, hideLegend } = getLegendProps(input.data, input.layout);
  input.data.forEach((series: PlotData, index1: number) => {
    const isXYearCategory = isYearArray(series.x); // Consider year as categorical not numeric continuous axis
    (series.x as Datum[])?.forEach((x: string | number, index2: number) => {
      if (!mapXToDataPoints[x]) {
        mapXToDataPoints[x] = { xAxisPoint: isXYearCategory ? x.toString() : x, chartData: [], lineData: [] };
      }
      const legend: string = legends[index1];
      const yVal: number = (series.y?.[index2] as number) ?? 0;
      if (series.type === 'bar') {
        const color = getColor(legend, colorMap, isDarkTheme);
        mapXToDataPoints[x].chartData.push({
          legend,
          data: yVal,
          color,
        });
        yMaxValue = Math.max(yMaxValue, yVal);
      } else if (series.type === 'scatter' || !!fallbackVSBC) {
        const color = getColor(legend, colorMap, isDarkTheme);
        const lineOptions = getLineOptions(series.line);
        const dashType = series.line?.dash || 'solid';
        const legendShape =
          dashType === 'dot' || dashType === 'dash' || dashType === 'dashdot' ? 'dottedLine' : 'default';
        mapXToDataPoints[x].lineData!.push({
          legend,
          legendShape,
          y: yVal,
          color,
          ...(lineOptions ? { lineOptions } : {}),
          useSecondaryYScale: usesSecondaryYScale(series),
        });
        if (!usesSecondaryYScale(series)) {
          yMaxValue = Math.max(yMaxValue, yVal);
        }
      }
    });
  });

  const { chartTitle, xAxisTitle, yAxisTitle } = getTitles(input.layout);

  return {
    data: Object.values(mapXToDataPoints),
    width: input.layout?.width,
    height: input.layout?.height ?? 350,
    barWidth: 'auto',
    yMaxValue,
    chartTitle,
    xAxisTitle,
    yAxisTitle,
    mode: 'plotly',
    ...secondaryYAxisValues,
    hideTickOverlap: true,
    hideLegend,
  };
};

export const transformPlotlyJsonToGVBCProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): IGroupedVerticalBarChartProps => {
  const mapXToDataPoints: Record<string, IGroupedVerticalBarChartData> = {};
  const secondaryYAxisValues = getSecondaryYAxisValues(input.data, input.layout, 0, 0);
  const { legends, hideLegend } = getLegendProps(input.data, input.layout);

  input.data.forEach((series: PlotData, index1: number) => {
    (series.x as Datum[])?.forEach((x: string | number, xIndex: number) => {
      if (!mapXToDataPoints[x]) {
        mapXToDataPoints[x] = { name: x.toString(), series: [] };
      }

      if (series.type === 'bar') {
        const legend: string = legends[index1];
        const color = getColor(legend, colorMap, isDarkTheme);

        mapXToDataPoints[x].series.push({
          key: legend,
          data: (series.y?.[xIndex] as number) ?? 0,
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
  };
};

export const transformPlotlyJsonToVBCProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): IVerticalBarChartProps => {
  const vbcData: IVerticalBarChartDataPoint[] = [];
  const { legends, hideLegend } = getLegendProps(input.data, input.layout);

  input.data.forEach((series: Partial<PlotData>, seriesIdx: number) => {
    if (!series.x) {
      return;
    }

    const isXString = isStringArray(series.x);
    // TODO: In case of a single bin, add an empty bin of the same size to prevent the
    // default bar width from being used and ensure the bar spans the full intended range.
    const xBins = createBins(series.x, series.xbins?.start, series.xbins?.end, series.xbins?.size);
    const yBins: number[][] = xBins.map(() => []);
    let total = 0;

    series.x.forEach((xVal, index) => {
      const binIdx = findBinIndex(xBins, xVal as string | number | null, isXString);
      if (binIdx !== -1) {
        yBins[binIdx].push((series.y?.[index] as number | null | undefined) ?? 1);
      }
    });

    const y = yBins.map(bin => {
      const yVal = calculateHistFunc(series.histfunc, bin);
      total += yVal;
      return yVal;
    });

    xBins.forEach((bin, index) => {
      const legend: string = legends[seriesIdx];
      const color: string = getColor(legend, colorMap, isDarkTheme);
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
  };
};

export const transformPlotlyJsonToScatterChartProps = (
  input: PlotlySchema,
  isAreaChart: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
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
  const chartData: ILineChartPoints[] = input.data.map((series: PlotData, index: number) => {
    const xValues = series.x as Datum[];
    const isString = typeof xValues[0] === 'string';
    const isXDate = isDateArray(xValues);
    const isXNumber = isNumberArray(xValues);
    const legend: string = legends[index];
    const lineColor = getColor(legend, colorMap, isDarkTheme);
    mode = series.fill === 'tozeroy' ? 'tozeroy' : 'tonexty';
    const lineOptions = getLineOptions(series.line);
    const dashType = series.line?.dash || 'solid';
    const legendShape = dashType === 'dot' || dashType === 'dash' || dashType === 'dashdot' ? 'dottedLine' : 'default';

    return {
      legend,
      legendShape,
      data: xValues.map((x, i: number) => ({
        x: isString ? (isXDate ? new Date(x as string) : isXNumber ? parseFloat(x as string) : x) : x,
        y: series.y[i],
        ...(Array.isArray(series.marker?.size)
          ? { markerSize: series.marker.size[i] }
          : typeof series.marker?.size === 'number'
          ? { markerSize: series.marker.size }
          : {}),
      })),
      color: lineColor,
      ...(lineOptions ? { lineOptions } : {}),
      useSecondaryYScale: usesSecondaryYScale(series),
    } as ILineChartPoints;
  });

  const yMinMaxValues = findNumericMinMaxOfY(chartData);
  const { chartTitle, xAxisTitle, yAxisTitle } = getTitles(input.layout);

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
    } as ILineChartProps;
  }
};

export const transformPlotlyJsonToHorizontalBarWithAxisProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): IHorizontalBarChartWithAxisProps => {
  const { legends, hideLegend } = getLegendProps(input.data, input.layout);
  const chartData: IHorizontalBarChartWithAxisDataPoint[] = input.data
    .map((series: PlotData, index: number) => {
      const legend = legends[index];
      const color = getColor(legend, colorMap, isDarkTheme);
      return (series.y as Datum[]).map((yValue: string, i: number) => {
        return {
          x: series.x[i],
          y: yValue,
          legend,
          color,
        } as IHorizontalBarChartWithAxisDataPoint;
      });
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
  };
};

export const transformPlotlyJsonToHeatmapProps = (input: PlotlySchema): IHeatMapChartProps => {
  const firstData = input.data[0] as Partial<PlotData>;
  const heatmapDataPoints: IHeatMapChartDataPoint[] = [];
  let zMin = Number.POSITIVE_INFINITY;
  let zMax = Number.NEGATIVE_INFINITY;

  if (firstData.type === 'histogram2d') {
    const isXString = isStringArray(firstData.x);
    const isYString = isStringArray(firstData.y);
    const xBins = createBins(firstData.x, firstData.xbins?.start, firstData.xbins?.end, firstData.xbins?.size);
    const yBins = createBins(firstData.y, firstData.ybins?.start, firstData.ybins?.end, firstData.ybins?.size);
    const zBins: number[][][] = yBins.map(() => xBins.map(() => []));
    let total = 0;

    firstData.x?.forEach((xVal, index) => {
      const xBinIdx = findBinIndex(xBins, xVal as string | number | null, isXString);
      const yBinIdx = findBinIndex(yBins, firstData.y?.[index] as string | number | null | undefined, isYString);
      if (xBinIdx !== -1 && yBinIdx !== -1) {
        zBins[yBinIdx][xBinIdx].push((firstData.z?.[index] as number | null | undefined) ?? 1);
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
  isDarkTheme?: boolean,
): ISankeyChartProps => {
  const { link, node } = input.data[0] as SankeyData;
  const validLinks = (link?.value ?? [])
    .map((val: number, index: number) => ({
      value: val,
      source: link?.source![index],
      target: link?.target![index],
    }))
    // eslint-disable-next-line @typescript-eslint/no-shadow
    // Filter out negative nodes, unequal nodes and self-references (circular links)
    .filter(x => x.source >= 0 && x.target >= 0 && x.source !== x.target);

  const sankeyChartData = {
    nodes: node.label?.map((label: string, index: number) => {
      const color = getColor(label, colorMap, isDarkTheme);

      return {
        nodeId: index,
        name: label,
        color,
      };
    }),
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
  isDarkTheme?: boolean,
): IGaugeChartProps => {
  const firstData = input.data[0] as PlotData;

  const segments = firstData.gauge?.steps?.length
    ? firstData.gauge.steps.map((step: any, index: number): IGaugeChartSegment => {
        const legend = step.name || `Segment ${index + 1}`;
        const color = getColor(legend, colorMap, isDarkTheme);
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
          color: getColor('Current', colorMap, isDarkTheme),
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
      const color = getColorFromToken(DataVizPalette.success, isDarkTheme);
      sublabelColor = color;
    } else {
      sublabel = `\u25BC ${Math.abs(diff)}`;
      const color = getColorFromToken(DataVizPalette.error, isDarkTheme);
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
  };
};

export const projectPolarToCartesian = (input: PlotlySchema): PlotlySchema => {
  const projection: PlotlySchema = { ...input };
  for (let sindex = 0; sindex < input.data.length; sindex++) {
    const series: PlotData = input.data[sindex] as PlotData;
    series.x = [];
    series.y = [];
    for (let ptindex = 0; ptindex < series.r.length; ptindex++) {
      const thetaRad = ((series.theta[ptindex] as number) * Math.PI) / 180;
      const radius = series.r[ptindex] as number;
      series.x[ptindex] = radius * Math.cos(thetaRad);
      series.y[ptindex] = radius * Math.sin(thetaRad);
    }
    projection.data[sindex] = series;
  }

  return projection;
};

function isPlainObject(obj: any) {
  if (window && window.process && window.process.versions) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  return (
    Object.prototype.toString.call(obj) === '[object Object]' &&
    Object.getPrototypeOf(obj).hasOwnProperty('hasOwnProperty')
  );
}

var arrayAttributes: any[] = [];
var stack: any[] = [];
var isArrayStack: any[] = [];
var baseContainer: any, baseAttrName: any;
/**
 * Interate iteratively through the trace object and find all the array attributes.
 * 1 trace record = 1 series of data
 * @param trace
 */
export function findArrayAttributes(trace: any) {
  // Init basecontainer and baseAttrName
  crawlIntoTrace(baseContainer, 0, '');
}

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

const isStringArray = (arr: any) => {
  return isArrayOfType(arr, (value: any) => typeof value === 'string');
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
