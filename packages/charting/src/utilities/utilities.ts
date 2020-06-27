import { ILineChartPoints, ILineChartDataPoint, IEventsAnnotationProps } from '@uifabric/charting';
import { max as d3Max, min as d3Min } from 'd3-array';
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import * as d3TimeFormat from 'd3-time-format';

export interface IXAxisParams {
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  containerWidth: number;
  xAxisElement?: SVGElement | null;
  xMin?: number | Date | null;
  xMax?: number | Date | null;
  xAxisCount?: number;
  showRoundOffXTickValues?: boolean;
  tickSize?: number;
  tickPadding?: number;
}
export interface ITickParams {
  tickValues?: Date[] | number[];
  tickFormat?: string;
}

export interface IYAxisParams {
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  containerWidth: number;
  yAxisElement?: SVGElement | null;
  // tslint:disable-next-line: no-any
  yAxisTickFormat: any;
  yAxisTickCount?: number;
  yMaxValue: number;
  yMinValue: number;
  containerHeight: number;
  eventAnnotationProps?: IEventsAnnotationProps;
  eventLabelHeight?: number;
}

export function createNumericXAxis(points: ILineChartPoints[], xAxisParams: IXAxisParams) {
  const xMinVal = xAxisParams.xMin ? xAxisParams.xMin : 0;
  const xMaxVal = xAxisParams.xMax
    ? xAxisParams.xMax
    : d3Max(points, (point: ILineChartPoints) => {
        return d3Max(point.data, (item: ILineChartDataPoint) => {
          return item.x as number;
        });
      })!;

  const xAxisScale = d3ScaleLinear()
    .domain([xMinVal, xMaxVal])
    .range([xAxisParams.margins.left, xAxisParams.containerWidth - xAxisParams.margins.right]);

  xAxisParams.showRoundOffXTickValues && xAxisScale.nice();

  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(xAxisParams.tickSize ? xAxisParams.tickSize : 10)
    .tickPadding(xAxisParams.tickPadding ? xAxisParams.tickPadding : 10)
    .ticks(xAxisParams.xAxisCount ? xAxisParams.xAxisCount : 10)
    .tickSizeOuter(0);

  if (xAxisParams.xAxisElement) {
    d3Select(xAxisParams.xAxisElement)
      .call(xAxis)
      .selectAll('text');
  }
  return xAxisScale;
}

export function createDateXAxis(points: ILineChartPoints[], xAxisParams: IXAxisParams, tickParams: ITickParams) {
  const xAxisData: Date[] = [];
  let sDate = new Date();
  // selecting least date and comparing it with data passed to get farthest Date for the range on X-axis
  let lDate = new Date(-8640000000000000);
  points.map((singleLineChartData: ILineChartPoints) => {
    singleLineChartData.data.map((point: ILineChartDataPoint) => {
      xAxisData.push(point.x as Date);
      if (point.x < sDate) {
        sDate = point.x as Date;
      }
      if (point.x > lDate) {
        lDate = point.x as Date;
      }
    });
  });

  const xAxisScale = d3ScaleTime()
    .domain([sDate, lDate])
    .range([xAxisParams.margins.left, xAxisParams.containerWidth - xAxisParams.margins.right]);
  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(10)
    .tickPadding(10);
  tickParams.tickValues ? xAxis.tickValues(tickParams.tickValues) : '';
  tickParams.tickFormat ? xAxis.tickFormat(d3TimeFormat.timeFormat(tickParams.tickFormat)) : '';
  if (xAxisParams.xAxisElement) {
    d3Select(xAxisParams.xAxisElement)
      .call(xAxis)
      .selectAll('text');
  }
  return xAxisScale;
}

export function createYAxis(points: ILineChartPoints[], yAxisParams: IYAxisParams) {
  const yMax = d3Max(points, (point: ILineChartPoints) => {
    return d3Max(point.data, (item: ILineChartDataPoint) => item.y);
  })!;
  const yMin = d3Min(points, (point: ILineChartPoints) => {
    return d3Min(point.data, (item: ILineChartDataPoint) => item.y);
  })!;
  const finalYmax = yMax > yAxisParams.yMaxValue ? yMax : yAxisParams.yMaxValue;
  const finalYmin = yMin < yAxisParams.yMinValue ? 0 : yAxisParams.yMinValue;
  const domainValues = prepareDatapoints(finalYmax, finalYmin, 4);
  const yAxisScale = d3ScaleLinear()
    .domain([finalYmin, domainValues[domainValues.length - 1]])
    .range([
      yAxisParams.containerHeight - yAxisParams.margins.bottom,
      yAxisParams.margins.top + (yAxisParams.eventAnnotationProps! ? yAxisParams.eventLabelHeight! : 0),
    ]);
  const yAxis = d3AxisLeft(yAxisScale)
    .tickSize(-(yAxisParams.containerWidth - yAxisParams.margins.left - yAxisParams.margins.right))
    .tickPadding(12)
    .tickValues(domainValues);

  yAxisParams.yAxisTickFormat
    ? yAxis.tickFormat(yAxisParams.yAxisTickFormat)
    : yAxis.ticks(yAxisParams.yAxisTickCount ? yAxisParams.yAxisTickCount : 4, 's');
  yAxisParams.yAxisElement
    ? d3Select(yAxisParams.yAxisElement)
        .call(yAxis)
        .selectAll('text')
    : '';
  return yAxisScale;
}

export function prepareDatapoints(maxVal: number, minVal: number, splitInto: number): number[] {
  const val = Math.ceil((maxVal - minVal) / splitInto);
  const dataPointsArray: number[] = [minVal, minVal + val];
  while (dataPointsArray[dataPointsArray.length - 1] < maxVal) {
    dataPointsArray.push(dataPointsArray[dataPointsArray.length - 1] + val);
  }
  return dataPointsArray;
}

export function calloutData(values: ILineChartPoints[]) {
  let combinedResult: {
    legend: string;
    y: number;
    x: number | Date | string;
    color: string;
    yAxisCalloutData?: string;
  }[] = [];

  values.forEach((element: { data: ILineChartDataPoint[]; legend: string; color: string }) => {
    const elements = element.data.map((ele: ILineChartDataPoint) => {
      return { legend: element.legend, ...ele, color: element.color };
    });
    combinedResult = combinedResult.concat(elements);
  });

  const result: { x: number | Date | string; values: { legend: string; y: number }[] }[] = [];
  combinedResult.forEach(
    (
      e1: { legend: string; y: number; x: number | Date | string; color: string; yAxisCalloutData: string },
      index: number,
    ) => {
      e1.x = e1.x instanceof Date ? e1.x.toLocaleDateString() : e1.x;
      const filteredValues = [{ legend: e1.legend, y: e1.y, color: e1.color, yAxisCalloutData: e1.yAxisCalloutData }];
      combinedResult
        .slice(index + 1)
        .forEach(
          (e2: { legend: string; y: number; x: number | Date | string; color: string; yAxisCalloutData: string }) => {
            e2.x = e2.x instanceof Date ? e2.x.toLocaleDateString() : e2.x;
            if (e1.x === e2.x) {
              filteredValues.push({
                legend: e2.legend,
                y: e2.y,
                color: e2.color,
                yAxisCalloutData: e2.yAxisCalloutData,
              });
            }
          },
        );
      result.push({ x: e1.x, values: filteredValues });
    },
  );
  return getUnique(result, 'x');
}

export function getUnique(
  arr: { x: number | Date | string; values: { legend: string; y: number }[] }[],
  comp: string | number,
) {
  const unique = arr
    // tslint:disable-next-line:no-any
    .map((e: { [x: string]: any }) => e[comp])
    // store the keys of the unique objects
    .map((e: string, i: number, final: string[]) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter((e: number) => arr[e])
    .map((e: number) => arr[e]);
  return unique;
}
