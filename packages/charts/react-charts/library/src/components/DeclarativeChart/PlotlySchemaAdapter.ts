/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { bin as d3Bin, extent as d3Extent, sum as d3Sum, min as d3Min, max as d3Max, merge as d3Merge } from 'd3-array';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { format as d3Format, precisionFixed as d3PrecisionFixed } from 'd3-format';
import { DonutChartProps } from '../DonutChart/index';
import { ChartDataPoint, ChartProps, LineChartPoints, VerticalBarChartDataPoint } from '../../types/DataPoint';
import { LineChartProps } from '../LineChart/index';
import { getNextColor } from '../../utilities/colors';
import { VerticalBarChartProps } from '../VerticalBarChart/index';
import { findNumericMinMaxOfY } from '../../utilities/utilities';
import type {
  Datum,
  Layout,
  PlotlySchema,
  PieData,
  PlotData,
  TypedArray,
} from '@fluentui/chart-utilities';
import {
  isArrayOfType,
  isDate,
  isDateArray,
  isNumberArray,
} from '@fluentui/chart-utilities';
import { timeParse } from 'd3-time-format';

interface SecondaryYAxisValues {
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

const invalidate2Dseries = (series: PlotData, chartType: string): void => {
  if (series.x?.length > 0 && Array.isArray(series.x[0])) {
    throw new Error(`transform to ${chartType}:: 2D x array not supported`);
  }
  if (series.y?.length > 0 && Array.isArray(series.y[0])) {
    throw new Error(`transform to ${chartType}:: 2D y array not supported`);
  }
};

const getLegend = (series: PlotData, index: number): string => {
  return series.name || `Series ${index + 1}`;
};

function getTitles(layout: Partial<Layout> | undefined) {
  const titles = {
    chartTitle: typeof layout?.title === 'string' ? layout.title : layout?.title?.text ?? '',
    xAxisTitle: typeof layout?.xaxis?.title === 'string' ? layout?.xaxis?.title : layout?.xaxis?.title?.text ?? '',
    yAxisTitle: typeof layout?.yaxis?.title === 'string' ? layout?.yaxis?.title : layout?.yaxis?.title?.text ?? '',
  };
  return titles;
}

export const updateXValues = (xValues: Datum[] | Datum[][] | TypedArray): any[] => {
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

const getSecondaryYAxisValues = (series: PlotData, layout: Partial<Layout> | undefined) => {
  const secondaryYAxisValues: SecondaryYAxisValues = {};
  if (layout && layout.yaxis2 && series.yaxis === 'y2') {
    secondaryYAxisValues.secondaryYAxistitle =
      typeof layout.yaxis2.title === 'string'
        ? layout.yaxis2.title
        : typeof layout.yaxis2.title?.text === 'string'
        ? layout.yaxis2.title.text
        : '';
    if (layout.yaxis2.range) {
      secondaryYAxisValues.secondaryYScaleOptions = {
        yMinValue: layout.yaxis2.range[0],
        yMaxValue: layout.yaxis2.range[1],
      };
    } else {
      const yValues = series.y as number[];
      if (yValues) {
        secondaryYAxisValues.secondaryYScaleOptions = {
          yMinValue: Math.min(...yValues),
          yMaxValue: Math.max(...yValues),
        };
      }
    }
  }
  secondaryYAxisValues.secondaryYAxistitle =
    secondaryYAxisValues.secondaryYAxistitle !== '' ? secondaryYAxisValues.secondaryYAxistitle : undefined;
  secondaryYAxisValues.secondaryYScaleOptions =
    secondaryYAxisValues.secondaryYScaleOptions && Object.keys(secondaryYAxisValues.secondaryYScaleOptions).length !== 0
      ? secondaryYAxisValues.secondaryYScaleOptions
      : undefined;
  return secondaryYAxisValues;
};

export const transformPlotlyJsonToDonutProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): DonutChartProps => {
  const firstData = input.data[0] as PieData;

  const donutData = firstData.labels?.map((label: string, index: number): ChartDataPoint => {
    const color = getColor(label, colorMap, isDarkTheme);
    return {
      legend: label,
      data: firstData.values?.[index] as number, //ToDo how to handle string data?
      color,
    };
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
      chartData: donutData,
    },
    hideLegend: input.layout?.showlegend === false ? true : false,
    width,
    height,
    innerRadius,
    hideLabels,
    showLabelsInPercent: firstData.textinfo ? ['percent', 'label+percent'].includes(firstData.textinfo) : true,
  };
};

export const transformPlotlyJsonToVBCProps = (
  input: PlotlySchema,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): VerticalBarChartProps => {
  const vbcData: VerticalBarChartDataPoint[] = [];

  input.data.forEach((series: PlotData, index: number) => {
    invalidate2Dseries(series, 'VBC');

    if (!series.x) {
      return;
    }

    const scale = d3ScaleLinear()
      .domain(d3Extent<number>(series.x as number[]) as [number, number])
      .nice();
    let [xMin, xMax] = scale.domain();

    xMin = typeof series.xbins?.start === 'number' ? series.xbins.start : xMin;
    xMax = typeof series.xbins?.end === 'number' ? series.xbins.end : xMax;

    const bin = d3Bin().domain([xMin, xMax]);

    if (typeof series.xbins?.size === 'number') {
      const thresholds: number[] = [];
      let th = xMin;
      const precision = d3PrecisionFixed(series.xbins.size);
      const format = d3Format(`.${precision}f`);

      while (th < xMax + series.xbins.size) {
        thresholds.push(parseFloat(format(th)));
        th += series.xbins.size;
      }

      xMin = thresholds[0];
      xMax = thresholds[thresholds.length - 1];
      bin.domain([xMin, xMax]).thresholds(thresholds);
    }

    const buckets = bin(series.x as number[]);
    // If the start or end of xbins is specified, then the number of datapoints may become less than x.length
    const totalDataPoints = d3Merge(buckets).length;

    buckets.forEach(bucket => {
      const legend: string = getLegend(series, index);
      const color: string = getColor(legend, colorMap, isDarkTheme);
      let y = bucket.length;

      if (series.histnorm === 'percent') {
        y = (bucket.length / totalDataPoints) * 100;
      } else if (series.histnorm === 'probability') {
        y = bucket.length / totalDataPoints;
      } else if (series.histnorm === 'density') {
        y = bucket.x0 === bucket.x1 ? 0 : bucket.length / (bucket.x1! - bucket.x0!);
      } else if (series.histnorm === 'probability density') {
        y = bucket.x0 === bucket.x1 ? 0 : bucket.length / (totalDataPoints * (bucket.x1! - bucket.x0!));
      } else if (series.histfunc === 'sum') {
        y = d3Sum(bucket);
      } else if (series.histfunc === 'avg') {
        y = bucket.length === 0 ? 0 : d3Sum(bucket) / bucket.length;
      } else if (series.histfunc === 'min') {
        y = d3Min(bucket)!;
      } else if (series.histfunc === 'max') {
        y = d3Max(bucket)!;
      }

      vbcData.push({
        x: (bucket.x1! + bucket.x0!) / 2,
        y,
        legend,
        color,
        xAxisCalloutData: `[${bucket.x0} - ${bucket.x1})`,
      });
    });
  });

  const { chartTitle, xAxisTitle, yAxisTitle } = getTitles(input.layout);

  return {
    data: vbcData,
    // width: layout?.width,
    // height: layout?.height,
    chartTitle,
    xAxisTitle,
    yAxisTitle,
    hideTickOverlap: true,
  };
};

export const transformPlotlyJsonToScatterChartProps = (
  input: PlotlySchema,
  isAreaChart: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
  isDarkTheme?: boolean,
): LineChartProps => {
  let secondaryYAxisValues: SecondaryYAxisValues = {};
  const chartData: LineChartPoints[] = input.data.map((series: PlotData, index: number) => {
    invalidate2Dseries(series, 'Scatter');
    const xValues = series.x as Datum[];
    const isString = typeof xValues[0] === 'string';
    const isXDate = isDateArray(xValues);
    const isXNumber = isNumberArray(xValues);
    const legend: string = getLegend(series, index);
    const lineColor = getColor(legend, colorMap, isDarkTheme);
    secondaryYAxisValues = getSecondaryYAxisValues(series, input.layout);

    return {
      legend,
      ...(series.line?.dash && dashOptions[series.line.dash]
        ? { lineOptions: { ...dashOptions[series.line.dash] } }
        : {}),
      data: xValues.map((x, i: number) => ({
        x: isString ? (isXDate ? new Date(x as string) : isXNumber ? parseFloat(x as string) : x) : x,
        y: series.y[i],
      })),
      color: lineColor,
    } as LineChartPoints;
  });

  const yMinMaxValues = findNumericMinMaxOfY(chartData);
  const { chartTitle, xAxisTitle, yAxisTitle } = getTitles(input.layout);

  const chartProps: ChartProps = {
    chartTitle,
    lineChartData: chartData,
  };

  return {
    data: chartProps,
    supportNegativeData: true,
    xAxisTitle,
    yAxisTitle,
    secondaryYAxistitle: secondaryYAxisValues.secondaryYAxistitle,
    secondaryYScaleOptions: secondaryYAxisValues.secondaryYScaleOptions,
    roundedTicks: true,
    yMinValue: yMinMaxValues.startValue,
    yMaxValue: yMinMaxValues.endValue,
    hideTickOverlap: true,
  } as LineChartProps;
};
