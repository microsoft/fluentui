/* eslint-disable one-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDonutChartProps } from '../DonutChart/index';
import {
  IChartProps,
  IHorizontalBarChartWithAxisDataPoint,
  ILineChartPoints,
  IVerticalStackedChartProps,
} from '../../types/IDataPoint';
import { getNextColor } from '../../utilities/colors';
import { IVerticalStackedBarChartProps } from '../VerticalStackedBarChart/index';
import { ILineChartProps } from '../LineChart/index';
import { IHorizontalBarChartWithAxisProps } from '../HorizontalBarChartWithAxis/index';
import { isDateArray, isNumberArray } from './DeclarativeChart';
import { IAreaChartProps } from '../AreaChart/index';

export const transformPlotlyJsonToDonutProps = (jsonObj: any): IDonutChartProps => {
  const { data, layout } = jsonObj;
  const donutData: IChartProps = {
    chartTitle: layout.title,
    chartData: data[0].labels.map((label: string, index: number) => {
      return {
        legend: label,
        data: data[0].values[index],
        color: getNextColor(index),
      };
    }),
  };

  const width: number = layout.width || 440;
  const height: number = layout.height || 220;
  const innerRadius: number = (Math.min(width, height - 40) * (data[0].hole || 0.5)) / 2;

  return {
    data: donutData,
    hideLegend: !layout.showlegend,
    width,
    height,
    innerRadius,
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
