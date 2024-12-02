/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
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
} from '../../types/IDataPoint';
import { ISankeyChartProps } from '../SankeyChart/index';
import { IVerticalStackedBarChartProps } from '../VerticalStackedBarChart/index';
import { IHorizontalBarChartWithAxisProps } from '../HorizontalBarChartWithAxis/index';
import { ILineChartProps } from '../LineChart/index';
import { IAreaChartProps } from '../AreaChart/index';
import { IHeatMapChartProps } from '../HeatMapChart/index';
import { getNextColor } from '../../utilities/colors';
import { IGaugeChartProps, IGaugeChartSegment } from '../GaugeChart/index';
import { IGroupedVerticalBarChartProps } from '../GroupedVerticalBarChart/index';

const isDate = (value: any): boolean => !isNaN(Date.parse(value));
const isNumber = (value: any): boolean => !isNaN(parseFloat(value)) && isFinite(value);
export const isDateArray = (array: any[]): boolean => isArrayOrTypedArray(array) && array.every(isDate);
export const isNumberArray = (array: any[]): boolean => isArrayOrTypedArray(array) && array.every(isNumber);

export const getColor = (legendLabel: string, colorMap: React.MutableRefObject<Map<string, string>>): string => {
  if (!colorMap.current.has(legendLabel)) {
    const nextColor = getNextColor(colorMap.current.size + 1);
    colorMap.current.set(legendLabel, nextColor);
    return nextColor;
  }

  return colorMap.current.get(legendLabel) as string;
};

export const transformPlotlyJsonToDonutProps = (
  jsonObj: any,
  colorMap: React.MutableRefObject<Map<string, string>>,
): IDonutChartProps => {
  const { data, layout } = jsonObj;
  const firstData = data[0];

  const donutData = firstData.labels?.map((label: string, index: number): IChartDataPoint => {
    const color = getColor(label, colorMap);
    return {
      legend: label,
      data: firstData.values?.[index],
      color,
    };
  });

  // TODO: innerRadius as a fraction needs to be supported internally. The pixel value depends on
  // chart dimensions, arc label dimensions and the legend container height, all of which are subject to change.
  const width: number = layout?.width || 440;
  const height: number = layout?.height || 220;
  const hideLabels = firstData.textinfo ? !['value', 'percent'].includes(firstData.textinfo) : false;
  const donutMarginHorizontal = hideLabels ? 0 : 80;
  const donutMarginVertical = 40 + (hideLabels ? 0 : 40);
  const innerRadius: number = firstData.hole
    ? firstData.hole * (Math.min(width - donutMarginHorizontal, height - donutMarginVertical) / 2)
    : 0;

  const styles: IDonutChartProps['styles'] = {
    root: {
      '[class^="arcLabel"]': {
        fontSize: firstData.textfont?.size,
      },
    },
  };

  return {
    data: {
      chartTitle: layout?.title,
      chartData: donutData,
    },
    hideLegend: layout?.showlegend === false ? true : false,
    width,
    height,
    innerRadius,
    hideLabels,
    showLabelsInPercent: firstData.textinfo ? firstData.textinfo === 'percent' : true,
    styles,
    // TODO: Render custom hover card based on textinfo
    // onRenderCalloutPerDataPoint: undefined,
  };
};

export const transformPlotlyJsonToVSBCProps = (
  jsonObj: any,
  colorMap: React.MutableRefObject<Map<string, string>>,
): IVerticalStackedBarChartProps => {
  const { data, layout } = jsonObj;
  const mapXToDataPoints: { [key: string]: IVerticalStackedChartProps } = {};
  let yMaxValue = 0;

  data.forEach((series: any, index1: number) => {
    series.x?.forEach((x: string | number, index2: number) => {
      if (!mapXToDataPoints[x]) {
        mapXToDataPoints[x] = { xAxisPoint: x, chartData: [], lineData: [] };
      }
      const legend: string = series.name || `Series ${index1 + 1}`;
      if (series.type === 'bar') {
        const color = getColor(legend, colorMap);
        mapXToDataPoints[x].chartData.push({
          legend,
          data: series.y?.[index2],
          color,
        });
      } else if (series.type === 'line') {
        const color = getColor(legend, colorMap);
        mapXToDataPoints[x].lineData!.push({
          legend,
          y: series.y?.[index2],
          color,
        });
      }

      yMaxValue = Math.max(yMaxValue, series.y?.[index2]);
    });
  });

  return {
    data: Object.values(mapXToDataPoints),
    chartTitle: layout?.title,
    // width: layout?.width,
    // height: layout?.height,
    barWidth: 'auto',
    yMaxValue,
  };
};

// TODO: Add support for continuous x-axis in grouped vertical bar chart
export const transformPlotlyJsonToGVBCProps = (
  jsonObj: any,
  colorMap: React.MutableRefObject<Map<string, string>>,
): IGroupedVerticalBarChartProps => {
  const { data, layout } = jsonObj;
  const mapXToDataPoints: Record<string, IGroupedVerticalBarChartData> = {};

  data.forEach((series: any, index1: number) => {
    series.x?.forEach((x: string | number, index2: number) => {
      if (!mapXToDataPoints[x]) {
        mapXToDataPoints[x] = { name: x.toString(), series: [] };
      }
      if (series.type === 'bar') {
        const legend: string = series.name || `Series ${index1 + 1}`;
        const color = getColor(legend, colorMap);

        mapXToDataPoints[x].series.push({
          key: legend,
          data: series.y?.[index2],
          color,
          legend,
        });
      }
    });
  });

  return {
    data: Object.values(mapXToDataPoints),
    chartTitle: layout?.title,
    // width: layout?.width,
    // height: layout?.height,
    barwidth: 'auto',
  };
};

export const transformPlotlyJsonToScatterChartProps = (
  jsonObj: any,
  isAreaChart: boolean,
  colorMap: React.MutableRefObject<Map<string, string>>,
): ILineChartProps | IAreaChartProps => {
  const { data, layout } = jsonObj;

  const chartData: ILineChartPoints[] = data.map((series: any, index: number) => {
    const xValues = series.x;
    const isString = typeof xValues[0] === 'string';
    const isXDate = isDateArray(xValues);
    const isXNumber = isNumberArray(xValues);
    const legend = series.name || `Series ${index + 1}`;
    const lineColor = getColor(legend, colorMap);

    return {
      legend,
      data: xValues.map((x: string | number, i: number) => ({
        x: isString ? (isXDate ? new Date(x) : isXNumber ? parseFloat(x as string) : x) : x,
        y: series.y[i],
      })),
      color: lineColor,
    };
  });

  const chartProps: IChartProps = {
    chartTitle: layout.title || '',
    lineChartData: chartData,
  };

  if (isAreaChart) {
    return {
      data: chartProps,
    } as IAreaChartProps;
  } else {
    return {
      data: chartProps,
    } as ILineChartProps;
  }
};

export const transformPlotlyJsonToHorizontalBarWithAxisProps = (
  jsonObj: any,
  colorMap: React.MutableRefObject<Map<string, string>>,
): IHorizontalBarChartWithAxisProps => {
  const { data, layout } = jsonObj;

  const chartData: IHorizontalBarChartWithAxisDataPoint[] = data
    .map((series: any, index: number) => {
      return series.y.map((yValue: string, i: number) => {
        const color = getColor(yValue, colorMap);
        return {
          x: series.x[i],
          y: yValue,
          legend: yValue,
          color,
        };
      });
    })
    .flat();

  const chartHeight = layout.height || 350;
  const margin = layout.margin?.l || 0;
  const padding = layout.margin?.pad || 0;
  const availableHeight = chartHeight - margin - padding;
  const numberOfBars = data[0].y.length;
  const gapFactor = 0.5;
  const barHeight = availableHeight / (numberOfBars * (1 + gapFactor));

  return {
    data: chartData,
    chartTitle: layout.title || '',
    barHeight,
    showYAxisLables: true,
    styles: {
      root: {
        height: chartHeight,
        width: layout.width || 600,
      },
    },
  };
};

// FIXME: Order of string axis ticks does not match the order in plotly json
// TODO: Add support for custom hover card
export const transformPlotlyJsonToHeatmapProps = (jsonObj: any): IHeatMapChartProps => {
  const { data, layout } = jsonObj;
  const firstData = data[0];
  const heatmapDataPoints: IHeatMapChartDataPoint[] = [];
  let zMin = Number.POSITIVE_INFINITY;
  let zMax = Number.NEGATIVE_INFINITY;

  firstData.x?.forEach((xVal: any, xIdx: number) => {
    firstData.y?.forEach((yVal: any, yIdx: number) => {
      const zVal = firstData.z?.[yIdx]?.[xIdx];

      heatmapDataPoints.push({
        x: layout.xaxis?.type === 'date' ? new Date(xVal) : xVal,
        y: layout.yaxis?.type === 'date' ? new Date(yVal) : yVal,
        value: zVal,
      });

      zMin = Math.min(zMin, zVal);
      zMax = Math.max(zMax, zVal);
    });
  });
  const heatmapData: IHeatMapChartData = {
    legend: firstData.name || '',
    data: heatmapDataPoints,
    value: 0,
  };

  // Convert normalized values to actual values
  const domainValuesForColorScale: number[] = firstData.colorscale?.map((arr: any) => arr[0] * (zMax - zMin) + zMin);
  const rangeValuesForColorScale: string[] = firstData.colorscale?.map((arr: any) => arr[1]);

  return {
    data: [heatmapData],
    domainValuesForColorScale,
    rangeValuesForColorScale,
    hideLegend: true,
  };
};

export const transformPlotlyJsonToSankeyProps = (
  jsonObj: any,
  colorMap: React.MutableRefObject<Map<string, string>>,
): ISankeyChartProps => {
  const { data, layout } = jsonObj;
  const { link, node } = data[0];
  const validLinks = link.value
    .map((val: number, index: number) => ({
      value: val,
      source: link.source[index],
      target: link.target[index],
    }))
    // eslint-disable-next-line @typescript-eslint/no-shadow
    //@ts-expect-error Dynamic link object. Ignore for now.
    .filter(x => x.source !== x.target); // Filter out self-references (circular links)

  const sankeyChartData = {
    nodes: node.label.map((label: string, index: number) => {
      const color = getColor(label, colorMap);

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
  };

  const width: number = layout?.width || 440;
  const height: number = layout?.height || 220;
  const styles: ISankeyChartProps['styles'] = {
    root: {
      fontSize: layout.font?.size,
    },
  };
  const shouldResize: number = width + height;
  return {
    data: {
      chartTitle: layout?.title,
      SankeyChartData: sankeyChartData,
    },
    width,
    height,
    styles,
    shouldResize,
    enableReflow: true,
  };
};

export const transformPlotlyJsonToGaugeProps = (
  jsonObj: any,
  colorMap: React.MutableRefObject<Map<string, string>>,
): IGaugeChartProps => {
  const { data, layout } = jsonObj;
  const firstData = data[0];

  const segments = firstData.gauge?.steps?.map((step: any, index: number): IGaugeChartSegment => {
    const legend = step.name || `Segment ${index + 1}`;
    const color = getColor(legend, colorMap);
    return {
      legend,
      size: step.range?.[1] - step.range?.[0],
      color,
    };
  });

  let sublabel: string | undefined;
  let sublabelColor: string | undefined;
  if (typeof firstData.delta?.reference === 'number') {
    const diff = firstData.value - firstData.delta.reference;
    if (diff >= 0) {
      sublabel = `\u25B2 ${diff}`;
      const color = getColor(firstData.delta.increasing?.color || '', colorMap);
      sublabelColor = color;
    } else {
      sublabel = `\u25BC ${Math.abs(diff)}`;
      const color = getColor(firstData.delta.decreasing?.color || '', colorMap);
      sublabelColor = color;
    }
  }

  const styles: IGaugeChartProps['styles'] = {
    sublabel: {
      fill: sublabelColor,
    },
  };

  return {
    segments,
    chartValue: firstData.value,
    chartTitle: firstData.title?.text,
    sublabel,
    // range values can be null
    minValue: firstData.gauge?.axis?.range?.[0] ?? undefined,
    maxValue: firstData.gauge?.axis?.range?.[1] ?? undefined,
    chartValueFormat: () => firstData.value,
    width: layout?.width,
    height: layout?.height,
    hideLegend: true,
    styles,
  };
};

function isTypedArray(a: any) {
  return ArrayBuffer.isView(a) && !(a instanceof DataView);
}

function isArrayOrTypedArray(a: any) {
  return Array.isArray(a) || isTypedArray(a);
}

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
  for (const attribute of arrayAttributes) {
    console.log(attribute);
  }
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
