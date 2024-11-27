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
} from '../../types/IDataPoint';
import { getNextColor } from '../../utilities/colors';
import { IVerticalStackedBarChartProps } from '../VerticalStackedBarChart/index';
import { IHorizontalBarChartWithAxisProps } from '../HorizontalBarChartWithAxis/index';
import { ILineChartProps } from '../LineChart/index';
import { IAreaChartProps } from '../AreaChart/index';

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
        legend: yValue,
        color: series.marker?.color || getNextColor(index),
      }));
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
    styles: {
      root: {
        height: chartHeight,
        width: layout.width || 600,
      },
    },
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
