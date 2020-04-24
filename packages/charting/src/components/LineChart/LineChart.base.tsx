import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { axisLeft as d3AxisLeft, axisBottom as d3AxisBottom } from 'd3-axis';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime } from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import * as d3TimeFormat from 'd3-time-format';
import { ILegend, Legends } from '../Legends/index';
import { classNamesFunction, getId } from 'office-ui-fabric-react/lib/Utilities';
import { IProcessedStyleSet, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import {
  ILineChartProps,
  ILineChartStyleProps,
  ILineChartStyles,
  ILineChartDataPoint,
  ILineChartPoints,
} from './LineChart.types';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react';

const getClassNames = classNamesFunction<ILineChartStyleProps, ILineChartStyles>();

export interface IRefArrayData {
  index?: string;
  refElement?: SVGGElement;
}

export class LineChartBase extends React.Component<
  ILineChartProps,
  {
    _width: number;
    _height: number;
    containerWidth: number;
    containerHeight: number;
    isCalloutVisible: boolean;
    YValueHover: { legend?: string; y?: number; color?: string }[];
    hoverYValue: string | number | null;
    hoverXValue: string | number | null;
    refArray: IRefArrayData[];
    activeLegend: string;
    lineColor: string;
    // tslint:disable-next-line:no-any
    refSelected: any;
    hoveredLineColor: string;
    selectedLegend: string;
  }
> {
  private _points: ILineChartPoints[];
  // tslint:disable-next-line:no-any
  private _calloutPoints: any;
  private _classNames: IProcessedStyleSet<ILineChartStyles>;
  private _reqID: number;
  private xAxisElement: SVGElement | null;
  private yAxisElement: SVGElement | null;
  // tslint:disable-next-line:no-any
  private _xAxisScale: any = '';
  // tslint:disable-next-line:no-any
  private _yAxisScale: any = '';
  private _uniqLineText: string;
  private chartContainer: HTMLDivElement;
  private legendContainer: HTMLDivElement;
  private _calloutId: string;
  // These margins are necessary for d3Scales to appear without cutting off
  private margins = { top: 20, right: 20, bottom: 35, left: 40 };
  private minLegendContainerHeight: number = 32;
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      _width: this.props.width || 600,
      _height: this.props.height || 350,
      containerHeight: 0,
      containerWidth: 0,
      isCalloutVisible: false,
      hoverYValue: '',
      refArray: [],
      hoverXValue: '',
      activeLegend: '',
      YValueHover: [],
      lineColor: '',
      refSelected: '',
      hoveredLineColor: '',
      selectedLegend: '',
    };
    this._points = this.props.data.lineChartData ? this.props.data.lineChartData : [];
    this._calloutPoints = this.CalloutData(this._points) ? this.CalloutData(this._points) : [];
    this._calloutId = getId('callout');
    this._uniqLineText =
      '_line_' +
      Math.random()
        .toString(36)
        .substring(7);
    this._fitParentContainer = this._fitParentContainer.bind(this);
  }

  public componentDidMount(): void {
    this._fitParentContainer();
    window.addEventListener('resize', this._fitParentContainer);
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this._reqID);
  }

  public render(): JSX.Element {
    const { theme, className, styles, tickValues, tickFormat, yAxisTickFormat, hideLegend = false } = this.props;
    this._points = this.props.data.lineChartData ? this.props.data.lineChartData : [];
    if (this.props.parentRef) {
      this._fitParentContainer();
    }
    let dataPresent = false;
    let dataType = false;
    if (this._points && this._points.length > 0) {
      this._points.map((chartData: ILineChartPoints) => {
        if (chartData.data.length > 0) {
          dataPresent = true;
          dataType = chartData.data[0].x instanceof Date;
          return;
        }
      });
    }
    let lines: JSX.Element[] = [];
    if (dataPresent) {
      dataType ? this._createDateXAxis(tickValues, tickFormat) : this._createNumericXAxis();
      const strokeWidth = this.props.strokeWidth ? this.props.strokeWidth : 4;
      this._createYAxis(yAxisTickFormat);
      lines = this._createLines(strokeWidth);
    }
    const legendBars = this._createLegends(this._points!);
    this._classNames = getClassNames(styles!, {
      theme: theme!,
      width: this.state._width,
      height: this.state._height,
      color: this.state.lineColor,
      className,
    });
    const svgDimensions = {
      width: this.state.containerWidth,
      height: this.state.containerHeight,
    };
    return (
      <div
        ref={(rootElem: HTMLDivElement) => (this.chartContainer = rootElem)}
        className={this._classNames.root}
        role={'presentation'}
      >
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <svg width={svgDimensions.width} height={svgDimensions.height}>
            <g
              ref={(e: SVGElement | null) => {
                this.xAxisElement = e;
              }}
              transform={`translate(0, ${svgDimensions.height - 35})`}
              className={this._classNames.xAxis}
            />
            <g
              ref={(e: SVGElement | null) => {
                this.yAxisElement = e;
              }}
              transform={`translate(40, 0)`}
              className={this._classNames.yAxis}
            />
            <g>{lines}</g>
          </svg>
        </FocusZone>
        <div ref={(e: HTMLDivElement) => (this.legendContainer = e)} className={this._classNames.legendContainer}>
          {!hideLegend && legendBars}
        </div>
        {this.state.isCalloutVisible ? (
          <Callout
            target={this.state.refSelected}
            isBeakVisible={false}
            gapSpace={10}
            directionalHint={DirectionalHint.topAutoEdge}
            id={this._calloutId}
          >
            <div className={this._classNames.calloutContentRoot} role={'presentation'}>
              <span className={this._classNames.calloutContentX}>{this.state.hoverXValue}</span>
              {this.state.YValueHover &&
                this.state.YValueHover.map(
                  (
                    xValue: {
                      legend?: string;
                      y?: number;
                      color?: string;
                      yAxisCalloutData?: string;
                    },
                    index: number,
                  ) => (
                    <span
                      key={index}
                      className={mergeStyles(this._classNames.calloutContentY, { color: xValue.color })}
                    >
                      <span>{xValue.yAxisCalloutData ? xValue.yAxisCalloutData : `${xValue.legend} ${xValue.y}`}</span>
                    </span>
                  ),
                )}
            </div>
          </Callout>
        ) : null}
      </div>
    );
  }

  private CalloutData = (values: ILineChartPoints[]) => {
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
    return this.getUnique(result, 'x');
  };

  private getUnique = (
    arr: { x: number | Date | string; values: { legend: string; y: number }[] }[],
    comp: string | number,
  ) => {
    const unique = arr
      // tslint:disable-next-line:no-any
      .map((e: { [x: string]: any }) => e[comp])
      // store the keys of the unique objects
      .map((e: string, i: number, final: string[]) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter((e: number) => arr[e])
      .map((e: number) => arr[e]);

    return unique;
  };

  private _fitParentContainer(): void {
    const { containerWidth, containerHeight } = this.state;
    const { hideLegend = false } = this.props;

    this._reqID = requestAnimationFrame(() => {
      const legendContainerComputedStyles = getComputedStyle(this.legendContainer);
      const legendContainerHeight =
        (this.legendContainer.getBoundingClientRect().height || (!hideLegend ? this.minLegendContainerHeight : 0)) +
        parseFloat(legendContainerComputedStyles.marginTop || '0') +
        parseFloat(legendContainerComputedStyles.marginBottom || '0');

      const container = this.props.parentRef ? this.props.parentRef : this.chartContainer;
      const currentContainerWidth = container.getBoundingClientRect().width;
      const currentContainerHeight =
        container.getBoundingClientRect().height > legendContainerHeight
          ? container.getBoundingClientRect().height
          : 350;
      const shouldResize =
        containerWidth !== currentContainerWidth || containerHeight !== currentContainerHeight - legendContainerHeight;
      if (shouldResize) {
        this.setState({
          containerWidth: currentContainerWidth,
          containerHeight: currentContainerHeight - legendContainerHeight,
        });
      }
    });
  }

  private _createLegends(data: ILineChartPoints[]): JSX.Element {
    const legendDataItems = data.map((point: ILineChartPoints, index: number) => {
      const color: string = point.color;
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color: color,
        action: () => {
          if (this.state.selectedLegend === point.legend) {
            this.setState({ selectedLegend: '' });
            this._handleLegendClick(point, null);
          } else {
            this.setState({ selectedLegend: point.legend });
            this._handleLegendClick(point, point.legend);
          }
          this.setState({ activeLegend: point.legend });
        },
        onMouseOutAction: () => {
          this.setState({ activeLegend: '' });
        },
        hoverAction: () => {
          this.setState({ activeLegend: point.legend });
        },
      };
      return legend;
    });
    const legends = (
      <Legends
        legends={legendDataItems}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        overflowProps={this.props.legendsOverflowProps}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
      />
    );
    return legends;
  }

  private _createNumericXAxis(): void {
    const xMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: ILineChartDataPoint) => {
        return item.x as number;
      });
    })!;
    const xAxisScale = d3ScaleLinear()
      .domain([0, xMax])
      .range([this.margins.left, this.state.containerWidth - this.margins.right]);
    this._xAxisScale = xAxisScale;
    const xAxis = d3AxisBottom(xAxisScale)
      .tickSize(10)
      .tickPadding(12)
      .ticks(7)
      .tickSizeOuter(0);
    if (this.xAxisElement) {
      d3Select(this.xAxisElement)
        .call(xAxis)
        .selectAll('text')
        .style('font', '10px Segoe UI semibold');
    }
  }

  private _prepareDatapoints(maxVal: number, minVal: number, splitInto: number): number[] {
    const val = Math.ceil((maxVal - minVal) / splitInto);
    const dataPointsArray: number[] = [minVal, minVal + val];
    while (dataPointsArray[dataPointsArray.length - 1] < maxVal) {
      dataPointsArray.push(dataPointsArray[dataPointsArray.length - 1] + val);
    }
    return dataPointsArray;
  }

  private _createDateXAxis = (tickValues?: Date[] | number[], tickFormat?: string) => {
    const xAxisData: Date[] = [];
    let sDate = new Date();
    // selecting least date and comparing it with data passed to get farthest Date for the range on X-axis
    let lDate = new Date(-8640000000000000);
    this._points.map((singleLineChartData: ILineChartPoints) => {
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
      .range([this.margins.left, this.state.containerWidth - this.margins.right]);
    this._xAxisScale = xAxisScale;
    const xAxis = d3AxisBottom(xAxisScale)
      .tickSize(10)
      .tickPadding(12);
    tickValues ? xAxis.tickValues(tickValues) : '';
    tickFormat ? xAxis.tickFormat(d3TimeFormat.timeFormat(tickFormat)) : '';
    if (this.xAxisElement) {
      d3Select(this.xAxisElement)
        .call(xAxis)
        .selectAll('text')
        .style('font', '10px Segoe UI Semibold');
    }
  };

  // tslint:disable-next-line: no-any
  private _createYAxis = (yAxisTickFormat: any) => {
    const { yMaxValue = 0, yMinValue = 0 } = this.props;
    const yMax = d3Max(this._points, (point: ILineChartPoints) => {
      return d3Max(point.data, (item: ILineChartDataPoint) => item.y);
    })!;
    const yMin = d3Min(this._points, (point: ILineChartPoints) => {
      return d3Min(point.data, (item: ILineChartDataPoint) => item.y);
    })!;
    const finalYmax = yMax > yMaxValue ? yMax : yMaxValue;
    const finalYmin = yMin < yMinValue ? 0 : yMinValue;
    const domainValues = this._prepareDatapoints(finalYmax, finalYmin, 4);
    const yAxisScale = d3ScaleLinear()
      .domain([finalYmin, domainValues[domainValues.length - 1]])
      .range([this.state.containerHeight - this.margins.bottom, this.margins.top]);
    this._yAxisScale = yAxisScale;
    const yAxis = d3AxisLeft(yAxisScale)
      .tickSize(-(this.state.containerWidth - this.margins.left - this.margins.right))
      .tickPadding(12)
      .tickValues(domainValues)
      .tickFormat(yAxisTickFormat);
    this.yAxisElement
      ? d3Select(this.yAxisElement)
          .call(yAxis)
          .selectAll('text')
          .style('font', '10px Segoe UI semibold')
      : '';
  };

  private _createLines(strokeWidth: number): JSX.Element[] {
    const lines = [];
    for (let i = 0; i < this._points.length; i++) {
      const legendVal: string = this._points[i].legend;
      const lineColor: string = this._points[i].color;
      if (this._points[i].data.length === 1) {
        const keyVal = this._uniqLineText + i;
        const x1 = this._points[i].data[0].x;
        const y1 = this._points[i].data[0].y;
        lines.push(
          <circle
            id={keyVal}
            key={keyVal}
            r={3.5}
            cx={this._xAxisScale(x1)}
            cy={this._yAxisScale(y1)}
            fill={lineColor}
          />,
        );
      }
      for (let j = 1; j < this._points[i].data.length; j++) {
        const keyVal = this._uniqLineText + i + '_' + j;
        const x1 = this._points[i].data[j - 1].x;
        const y1 = this._points[i].data[j - 1].y;
        const xAxisCalloutData = this._points[i].data[j - 1].xAxisCalloutData;
        if (this.state.activeLegend === legendVal || this.state.activeLegend === '') {
          lines.push(
            <line
              id={keyVal}
              key={keyVal}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(this._points[i].data[j].x)}
              y2={this._yAxisScale(this._points[i].data[j].y)}
              strokeWidth={strokeWidth}
              ref={(e: SVGLineElement | null) => {
                this._refCallback(e!, keyVal);
              }}
              stroke={lineColor}
              strokeLinecap={'round'}
              onMouseOver={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData)}
              onMouseMove={this._handleHover.bind(this, x1, y1, lineColor, xAxisCalloutData)}
              onMouseOut={this._handleMouseOut}
              opacity={1}
              data-is-focusable={i === 0 ? true : false}
              onFocus={this._handleFocus.bind(this, keyVal, x1, y1, lineColor, xAxisCalloutData)}
              onBlur={this._handleMouseOut}
              aria-labelledby={this._calloutId}
              onClick={this._onLineClick.bind(this, this._points[i].onLineClick)}
            />,
          );
        } else {
          lines.push(
            <line
              id={keyVal}
              key={keyVal}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(this._points[i].data[j].x)}
              y2={this._yAxisScale(this._points[i].data[j].y)}
              strokeWidth={strokeWidth}
              stroke={lineColor}
              strokeLinecap={'round'}
              opacity={0.1}
            />,
          );
        }
      }
    }
    return lines;
  }

  private _refCallback(element: SVGGElement, legendTitle: string): void {
    this.state.refArray.push({ index: legendTitle, refElement: element });
  }

  private _handleFocus = (
    keyVal: string,
    x: number | Date,
    y: number | string,
    lineColor: string,
    xAxisCalloutData: string,
  ) => {
    const formattedData = x instanceof Date ? x.toLocaleDateString() : x;
    const found = this._calloutPoints.find((element: { x: string | number }) => element.x === formattedData);
    this.state.refArray.map((obj: IRefArrayData) => {
      if (obj.index === keyVal) {
        this.setState({
          isCalloutVisible: true,
          refSelected: obj.refElement,
          hoverXValue: xAxisCalloutData ? xAxisCalloutData : '' + formattedData,
          hoverYValue: y,
          YValueHover: found.values,
          lineColor: lineColor,
        });
      }
    });
  };

  private _handleHover = (
    x: number | Date,
    y: number | string,
    lineColor: string,
    xAxisCalloutData: string,
    mouseEvent: React.MouseEvent<SVGPathElement>,
  ) => {
    mouseEvent.persist();
    const formattedData = x instanceof Date ? x.toLocaleDateString() : x;

    const found = this._calloutPoints.find((element: { x: string | number }) => element.x === formattedData);
    this.setState({
      isCalloutVisible: true,
      refSelected: mouseEvent,
      hoverXValue: xAxisCalloutData ? xAxisCalloutData : '' + formattedData,
      hoverYValue: y,
      YValueHover: found.values,
      lineColor: lineColor,
    });
  };

  private _onLineClick = (func: () => void) => {
    if (!!func) {
      func();
    }
  };

  private _handleMouseOut = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _handleLegendClick = (point: ILineChartPoints, selectedLegend: string | null): void => {
    if (point.onLegendClick) {
      point.onLegendClick(selectedLegend);
    }
  };
}
