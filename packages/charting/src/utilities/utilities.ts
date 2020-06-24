import { ILineChartPoints, ILineChartDataPoint, IEventsAnnotationProps } from '@uifabric/charting';
import { max as d3Max, min as d3Min } from 'd3-array';
import { axisBottom as d3AxisBottom } from 'd3-axis';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import * as d3TimeFormat from 'd3-time-format';
import { axisLeft as d3AxisLeft } from 'd3-axis';

export interface IXAxisParams {
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  containerWidth: number;
  xAxisElement?: SVGElement | null;
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
  // tslint:disable-next-line: no-any
  eventAnnotationProps?: IEventsAnnotationProps;
  eventLabelHeight?: number;
}

export function createNumericXAxis(points: ILineChartPoints[], xAxisParams: IXAxisParams) {
  const xMax = d3Max(points, (point: ILineChartPoints) => {
    return d3Max(point.data, (item: ILineChartDataPoint) => {
      return item.x as number;
    });
  })!;
  const xAxisScale = d3ScaleLinear()
    .domain([0, xMax])
    .range([xAxisParams.margins.left, xAxisParams.containerWidth - xAxisParams.margins.right]);
  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(10)
    .tickPadding(12)
    .ticks(7)
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
    .tickPadding(12);
  tickParams.tickValues ? xAxis.tickValues(tickParams.tickValues) : '';
  tickParams.tickFormat ? xAxis.tickFormat(d3TimeFormat.timeFormat(tickParams.tickFormat)) : '';
  if (xAxisParams.xAxisElement) {
    d3Select(xAxisParams.xAxisElement)
      .call(xAxis)
      .selectAll('text');
  }
  return xAxisScale;
}

// tslint:disable-next-line: no-any
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
