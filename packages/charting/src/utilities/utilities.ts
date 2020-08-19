import { ILineChartPoints, ILineChartDataPoint, IEventsAnnotationProps } from '@uifabric/charting';
import { max as d3Max, min as d3Min } from 'd3-array';
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import * as d3TimeFormat from 'd3-time-format';

export interface IMargins {
  /**
   * left margin for the chart.
   */
  left?: number;
  /**
   * Right margin for the chart.
   */
  right?: number;
  /**
   * Top margin for the chart.
   */
  top?: number;
  /**
   * Bottom margin for the chart.
   */
  bottom?: number;
}

export interface IXAxisParams {
  margins: IMargins;
  containerWidth: number;
  xAxisElement?: SVGElement | null;
  domainXMin?: number | Date | null;
  domainXMax?: number | Date | null;
  xAxisCount?: number;
  showRoundOffXTickValues?: boolean;
  tickSize?: number;
  tickPadding?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  points?: any;
}
export interface ITickParams {
  tickValues?: Date[] | number[];
  tickFormat?: string;
}

export interface IYAxisParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  points?: any;
  margins: IMargins;
  containerWidth: number;
  containerHeight: number;
  yAxisElement?: SVGElement | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yAxisTickFormat?: any;
  yAxisTickCount: number;
  finalYMaxVal?: number;
  finalYMinVal?: number;
  yMaxValue?: number;
  yMinValue?: number;
  tickPadding?: number;
  showYAxisGridLines: boolean;
  eventAnnotationProps?: IEventsAnnotationProps;
  eventLabelHeight?: number;
}

export interface IContainerValues {
  width: number;
  height: number;
  shouldResize: boolean;
  reqID: number;
}

export interface IFitContainerParams {
  containerWidth: number;
  containerHeight: number;
  hideLegend: boolean;
  legendContainer: HTMLDivElement;
  container: HTMLDivElement | null | HTMLElement;
}

export function createNumericXAxis(xAxisParams: IXAxisParams) {
  const {
    domainXMin,
    domainXMax,
    margins,
    containerWidth,
    showRoundOffXTickValues = false,
    tickSize = 10,
    tickPadding = 10,
    xAxisCount = 10,
    xAxisElement,
    points,
  } = xAxisParams;
  const xMinVal = domainXMin
    ? domainXMin
    : d3Min(points, (point: ILineChartPoints) => {
        return d3Min(point.data, (item: ILineChartDataPoint) => item.x as number);
      })!;
  const xMaxVal = domainXMax
    ? domainXMax
    : d3Max(points, (point: ILineChartPoints) => {
        return d3Max(point.data, (item: ILineChartDataPoint) => {
          return item.x as number;
        });
      })!;
  const xAxisScale = d3ScaleLinear()
    .domain([xMinVal, xMaxVal])
    .range([margins.left!, containerWidth - margins.right!]);
  showRoundOffXTickValues && xAxisScale.nice();

  const xAxis = d3AxisBottom(xAxisScale)
    .tickSize(tickSize)
    .tickPadding(tickPadding)
    .ticks(xAxisCount)
    .tickSizeOuter(0);
  if (xAxisElement) {
    d3Select(xAxisElement)
      .call(xAxis)
      .selectAll('text');
  }
  return xAxisScale;
}

export function createDateXAxis(xAxisParams: IXAxisParams, tickParams: ITickParams) {
  const xAxisData: Date[] = [];
  let sDate = new Date();
  // selecting least date and comparing it with data passed to get farthest Date for the range on X-axis
  let lDate = new Date(-8640000000000000);
  xAxisParams.points.forEach((singleLineChartData: ILineChartPoints) => {
    singleLineChartData.data.forEach((point: ILineChartDataPoint) => {
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
    .range([xAxisParams.margins.left!, xAxisParams.containerWidth - xAxisParams.margins.right!]);
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

export function prepareDatapoints(maxVal: number, minVal: number, splitInto: number): number[] {
  const val = Math.ceil((maxVal - minVal) / splitInto);
  const dataPointsArray: number[] = [minVal, minVal + val];
  while (dataPointsArray[dataPointsArray.length - 1] < maxVal) {
    dataPointsArray.push(dataPointsArray[dataPointsArray.length - 1] + val);
  }
  return dataPointsArray;
}

export function createYAxis(yAxisParams: IYAxisParams) {
  const {
    finalYMaxVal = 0,
    finalYMinVal = 0,
    yAxisElement = null,
    yMaxValue = 0,
    yMinValue = 0,
    showYAxisGridLines = false,
    containerHeight,
    containerWidth,
    margins,
    tickPadding = 12,
    yAxisTickFormat,
    yAxisTickCount = 4,
    eventAnnotationProps,
    eventLabelHeight,
    points,
  } = yAxisParams;
  let finalYmax: number;
  let finalYmin: number;
  if (finalYMaxVal || finalYMinVal) {
    finalYmax = finalYMaxVal!;
    finalYmin = finalYMinVal!;
  } else {
    const yMax = d3Max(points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: ILineChartDataPoint) => item.y);
    })!;
    const yMin = d3Min(points, (point: ILineChartPoints) => {
      return d3Min(point.data, (item: ILineChartDataPoint) => item.y);
    })!;

    finalYmax = yMax > yMaxValue! ? yMax : yMaxValue!;
    finalYmin = yMin < yMinValue! ? 0 : yMinValue!;
  }
  const domainValues = prepareDatapoints(finalYmax, finalYmin, yAxisTickCount);
  const yAxisScale = d3ScaleLinear()
    .domain([finalYmin, domainValues[domainValues.length - 1]])
    .range([containerHeight - margins.bottom!, margins.top! + (eventAnnotationProps! ? eventLabelHeight! : 0)]);
  const yAxis = d3AxisLeft(yAxisScale)
    .tickPadding(tickPadding)
    .tickValues(domainValues);
  yAxisTickFormat ? yAxis.tickFormat(yAxisTickFormat) : yAxis.ticks(yAxisTickCount, 's');
  showYAxisGridLines && yAxis.tickSizeInner(-(containerWidth - margins.left! - margins.right!));
  yAxisElement
    ? d3Select(yAxisElement)
        .call(yAxis)
        .selectAll('text')
    : '';
  return yAxisScale;
}

export function calloutData(values: ILineChartPoints[]) {
  let combinedResult: {
    legend: string;
    y: number;
    x: number | Date | string;
    color: string;
    yAxisCalloutData?: string | { [id: string]: number };
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
      e1.x = e1.x instanceof Date ? e1.x.getTime() : e1.x;
      const filteredValues = [{ legend: e1.legend, y: e1.y, color: e1.color, yAxisCalloutData: e1.yAxisCalloutData }];
      combinedResult
        .slice(index + 1)
        .forEach(
          (e2: { legend: string; y: number; x: number | Date | string; color: string; yAxisCalloutData: string }) => {
            e2.x = e2.x instanceof Date ? e2.x.getTime() : e2.x;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((e: { [x: string]: any }) => e[comp])
    // store the keys of the unique objects
    .map((e: string, i: number, final: string[]) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter((e: number) => arr[e])
    .map((e: number) => arr[e]);
  return unique;
}

export function fitContainer(containerParams: IFitContainerParams) {
  const { legendContainer, container, containerWidth, containerHeight, hideLegend = false } = containerParams;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const animatedId = requestAnimationFrame(() => {});
  const legendContainerComputedStyles = getComputedStyle(legendContainer);
  const legendContainerHeight =
    (legendContainer.getBoundingClientRect().height || (!hideLegend ? 32 : 0)) +
    parseFloat(legendContainerComputedStyles.marginTop || '0') +
    parseFloat(legendContainerComputedStyles.marginBottom || '0');

  const containerClientRect = container!.getBoundingClientRect();
  const currentContainerWidth = containerClientRect.width;
  const currentContainerHeight = containerClientRect.height > legendContainerHeight ? containerClientRect.height : 350;
  const containerValues = {
    width: currentContainerWidth!,
    height: currentContainerHeight! - legendContainerHeight!,
    shouldResize:
      containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight - legendContainerHeight,
    reqID: animatedId,
  };
  return containerValues;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createWrapOfXLabels(wrapLabelProps: any) {
  const { node, xAxis, noOfCharsToTruncate, showXAxisLablesTooltip } = wrapLabelProps;
  if (node === null) {
    return;
  }
  const axisNode = d3Select(node).call(xAxis);
  let removeVal = 0;
  const width = 10;
  const arr: number[] = [];
  axisNode.selectAll('.tick text').each(function() {
    const text = d3Select(this);
    const totalWord = text.text();
    const truncatedWord = `${text.text().slice(0, noOfCharsToTruncate)}...`;
    const totalWordLength = text.text().length;
    const words = text
      .text()
      .split(/\s+/)
      .reverse();
    arr.push(words.length);
    let word: string = '';
    let line: string[] = [];
    let lineNumber: number = 0;
    const lineHeight = 1.1; // ems
    const y = text.attr('y');
    const dy = parseFloat(text.attr('dy'));
    let tspan = text
      .text(null)
      .append('tspan')
      .attr('x', 0)
      .attr('y', y)
      .attr('id', 'BaseSpan')
      .attr('dy', dy + 'em');

    if (showXAxisLablesTooltip && totalWordLength > noOfCharsToTruncate) {
      tspan = text
        .append('tspan')
        .attr('id', 'showDots')
        .attr('x', 0)
        .attr('y', y)
        .attr('dy', ++lineNumber * lineHeight + dy + 'em')
        .text(truncatedWord);
    } else if (showXAxisLablesTooltip && totalWordLength <= noOfCharsToTruncate) {
      tspan = text
        .append('tspan')
        .attr('id', 'LessLength')
        .attr('x', 0)
        .attr('y', y)
        .attr('dy', ++lineNumber * lineHeight + dy + 'em')
        .text(totalWord);
    } else {
      while ((word = words.pop()!)) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node()!.getComputedTextLength() > width && line.length > 1) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text
            .append('tspan')
            .attr('id', 'WordBreakId')
            .attr('x', 0)
            .attr('y', y)
            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
            .text(word);
        }
      }
      const maxDigit = Math.max(...arr);
      let maxHeight: number = 12; // intial value to render corretly first time
      axisNode.selectAll('text').each(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const outerHTMLElement = document.getElementById('WordBreakId') as any;
        const BoxCordinates = outerHTMLElement && outerHTMLElement.getBoundingClientRect();
        const boxHeight = BoxCordinates && BoxCordinates.height;
        if (boxHeight > maxHeight) {
          maxHeight = boxHeight;
        }
      });
      removeVal = (maxDigit - 3) * maxHeight; // we are getting more height if take direclty
    }
  });
  return removeVal > 0 ? removeVal : 0;
}
