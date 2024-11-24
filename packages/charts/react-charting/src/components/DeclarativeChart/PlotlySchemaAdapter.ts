import { IDonutChartProps } from '../DonutChart/index';
import { IChartProps, IVerticalStackedChartProps } from '../../types/IDataPoint';
import { getNextColor } from '../../utilities/colors';
import { IVerticalStackedBarChartProps } from '../VerticalStackedBarChart/index';

export const transformPlotlyJsonToDonutProps = (obj: any): IDonutChartProps => {
    const donutData: IChartProps = {
      chartTitle: obj.layout.title,
      chartData: obj.data[0].labels.map((label: string, index: number) => {
        return {
          legend: label,
          data: obj.data[0].values[index],
          color: getNextColor(index),
        };
      }),
    };
  
    const width: number = obj.layout.width || 440;
    const height: number = obj.layout.height || 220;
    const innerRadius: number = (Math.min(width, height - 40) * (obj.data[0].hole || 0.5)) / 2;
  
    return {
      data: donutData,
      hideLegend: !obj.layout.showlegend,
      width,
      height,
      innerRadius,
    };
  };
  
export const transformPlotlyJsonToColumnProps = (obj: any): IVerticalStackedBarChartProps => {
    const mapXToDataPoints: { [key: string]: IVerticalStackedChartProps } = {};
    let yMaxValue = 0;

    obj.data.forEach((series: any, index1: number) => {
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
      chartTitle: obj.layout.title,
      // width: obj.layout.width,
      // height: obj.layout.height,
      barWidth: 'auto',
      yMaxValue,
    };
};

function isTypedArray(a: any) {
    return ArrayBuffer.isView(a) && !(a instanceof DataView);
}

function isArrayOrTypedArray(a: any) {
    return Array.isArray(a) || isTypedArray(a);
}

function isPlainObject(obj: any) {
    if(window && window.process && window.process.versions) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    return (
        Object.prototype.toString.call(obj) === '[object Object]' &&
        Object.getPrototypeOf(obj).hasOwnProperty('hasOwnProperty')
    );
};

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
    if(i === stack.length - 1) {
        if(isArrayOrTypedArray(item)) {
            arrayAttributes.push(baseAttrName + newAstrPartial);
        }
    } else {
        if(isArrayStack[i]) {
            if(Array.isArray(item)) {
                for(var j = 0; j < item.length; j++) {
                    if(isPlainObject(item[j])) {
                        crawlIntoTrace(item[j], i + 1, newAstrPartial + '[' + j + '].');
                    }
                }
            }
        } else if(isPlainObject(item)) {
            crawlIntoTrace(item, i + 1, newAstrPartial + '.');
        }
    }
}