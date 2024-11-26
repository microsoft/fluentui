/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDonutChartProps } from '../DonutChart/index';
import {
  IChartDataPoint,
  IChartProps,
  IHorizontalBarChartWithAxisDataPoint,
  ILineChartPoints,
  IVerticalStackedChartProps,
  IHeatMapChartData,
  IHeatMapChartDataPoint,
} from '../../types/IDataPoint';
import { getNextColor } from '../../utilities/colors';
import { IVerticalStackedBarChartProps } from '../VerticalStackedBarChart/index';
import { IHorizontalBarChartWithAxisProps } from '../HorizontalBarChartWithAxis/index';
import { ILineChartProps } from '../LineChart/index';
import { IAreaChartProps } from '../AreaChart/index';
import { IHeatMapChartProps } from '../HeatMapChart/index';

const isDate = (value: any): boolean => !isNaN(Date.parse(value));
const isNumber = (value: any): boolean => !isNaN(parseFloat(value)) && isFinite(value);
export const isDateArray = (array: any[]): boolean => Array.isArray(array) && array.every(isDate);
export const isNumberArray = (array: any[]): boolean => Array.isArray(array) && array.every(isNumber);

export const transformPlotlyJsonToDonutProps = (jsonObj: any): IDonutChartProps => {
  const { data, layout } = jsonObj;
  const firstData = data[0];

  const donutData = firstData.labels?.map((label: string, index: number): IChartDataPoint => {
    return {
      legend: label,
      data: firstData.values?.[index],
      color: firstData.marker?.colors?.[index] || getNextColor(index),
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

export const transformPlotlyJsonToColumnProps = (jsonObj: any): IVerticalStackedBarChartProps => {
  const { data, layout } = jsonObj;
  const mapXToDataPoints: { [key: string]: IVerticalStackedChartProps } = {};
  let yMaxValue = 0;

  data.forEach((series: any, index1: number) => {
    series.x.forEach((x: string | number, index2: number) => {
      if (!mapXToDataPoints[x]) {
        mapXToDataPoints[x] = { xAxisPoint: x, chartData: [], lineData: [] };
      }
      if (series.type === 'bar') {
        mapXToDataPoints[x].chartData.push({
          legend: series.name,
          data: series.y[index2],
          color: series.marker?.color || getNextColor(index1),
        });
      } else if (series.type === 'line') {
        mapXToDataPoints[x].lineData!.push({
          legend: series.name,
          y: series.y[index2],
          color: series.marker?.color || getNextColor(index1),
        });
      }
      yMaxValue = Math.max(yMaxValue, series.y[index2]);
    });
  });

  return {
    data: Object.values(mapXToDataPoints),
    chartTitle: layout.title,
    // width: layout.width,
    // height: layout.height,
    barWidth: 'auto',
    yMaxValue,
  };
};

export const transformPlotlyJsonToScatterChartProps = (
  jsonObj: any,
  isAreaChart: boolean,
): ILineChartProps | IAreaChartProps => {
  const { data, layout } = jsonObj;

  const chartData: ILineChartPoints[] = data.map((series: any, index: number) => {
    const xValues = series.x;
    const isString = typeof xValues[0] === 'string';
    const isXDate = isDateArray(xValues);
    const isXNumber = isNumberArray(xValues);

    return {
      legend: series.name || `Series ${index + 1}`,
      data: xValues.map((x: string | number, i: number) => ({
        x: isString ? (isXDate ? new Date(x) : isXNumber ? parseFloat(x as string) : x) : x,
        y: series.y[i],
      })),
      color: series.line?.color || getNextColor(index),
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

export const transformPlotlyJsonToHorizontalBarWithAxisProps = (jsonObj: any): IHorizontalBarChartWithAxisProps => {
  const { data, layout } = jsonObj;

  const chartData: IHorizontalBarChartWithAxisDataPoint[] = data
    .map((series: any, index: number) => {
      return series.y.map((yValue: string, i: number) => ({
        x: series.x[i],
        y: yValue,
        legend: series.name,
        color: series.marker?.color || getNextColor(index),
      }));
    })
    .flat();

  return {
    data: chartData,
    chartTitle: layout.title || '',
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
        x: xVal,
        y: yVal,
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
