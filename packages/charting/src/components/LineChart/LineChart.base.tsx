import * as React from 'react';
import { Axis as D3Axis } from 'd3-axis';
import { clientPoint } from 'd3-selection';
import { bisector } from 'd3-array';
import { ILegend, Legends } from '../Legends/index';
import { getId, find } from 'office-ui-fabric-react/lib/Utilities';
import {
  CartesianChart,
  IBasestate,
  IChildProps,
  ILineChartProps,
  ILineChartPoints,
  ILineChartDataPoint,
  ICustomizedCalloutData,
  IMargins,
  IColorFillBarsProps,
} from '../../index';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { EventsAnnotation } from './eventAnnotation/EventAnnotation';
import { calloutData, ChartTypes, getXAxisType, XAxisTypes, getTypeOfAxis } from '../../utilities/index';

type NumericAxis = D3Axis<number | { valueOf(): number }>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bisect = bisector((d: any) => d.x).left;
enum InterceptVisibility {
  show = 'visibility',
  hide = 'hidden',
}
export interface ILineChartState extends IBasestate {
  // This array contains data of selected legends for points
  selectedLegendPoints: ILineChartPoints[];
  // This array contains data of selected legends for color bars
  selectedColorBarLegend: IColorFillBarsProps[];
  // This is a boolean value which is set to true
  // when at least one legend is selected
  isSelectedLegend: boolean;
  // This value will be used as customized callout props - point callout.
  dataPointCalloutProps?: ICustomizedCalloutData;
  // This value will be used as Customized callout props - For stack callout.
  stackCalloutProps?: ICustomizedCalloutData;
  lineXValue: number;
  isCircleClicked: boolean;
  displayOfLine: InterceptVisibility;
  nearestCircleToHighlight: number | string | Date | null;
}

export class LineChartBase extends React.Component<ILineChartProps, ILineChartState> {
  private _points: ILineChartPoints[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _calloutPoints: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xAxisScale: any = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _yAxisScale: any = '';
  private _circleId: string;
  private _lineId: string;
  private _verticalLine: string;
  private _colorFillBarPatternId: string;
  private _uniqueCallOutID: string;
  private margins: IMargins;
  private eventLabelHeight: number = 36;
  private lines: JSX.Element[];
  private _renderedColorFillBars: JSX.Element[];
  private _colorFillBars: IColorFillBarsProps[];
  private _colorFillBarsOpacity: number;
  private _rectId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _xAxisRectScale: any;

  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      hoverXValue: '',
      activeLegend: '',
      YValueHover: [],
      refSelected: '',
      selectedLegend: '',
      isCalloutVisible: false,
      selectedLegendPoints: [],
      selectedColorBarLegend: [],
      isSelectedLegend: false,
      lineXValue: 0,
      displayOfLine: InterceptVisibility.hide,
      isCircleClicked: false,
      nearestCircleToHighlight: null,
    };
    this._points = this.props.data.lineChartData || [];
    this._colorFillBars = [];
    this._colorFillBarsOpacity = 0.4;
    this._calloutPoints = calloutData(this._points) || [];
    this._circleId = getId('circle');
    this._lineId = getId('lineID');
    this._verticalLine = getId('verticalLine');
    this._rectId = getId('rectangle');
    this._colorFillBarPatternId = getId('colorFillBarPattern');
    props.eventAnnotationProps &&
      props.eventAnnotationProps.labelHeight &&
      (this.eventLabelHeight = props.eventAnnotationProps.labelHeight);
  }

  public componentDidUpdate(prevProps: ILineChartProps): void {
    /** note that height and width are not used to resize or set as dimesions of the chart,
     * fitParentContainer is responisble for setting the height and width or resizing of the svg/chart
     */
    if (
      prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width ||
      prevProps.data !== this.props.data
    ) {
      this._points = this.props.data.lineChartData || [];
      this._calloutPoints = calloutData(this._points) || [];
    }
  }

  public render(): JSX.Element {
    const { tickValues, tickFormat, eventAnnotationProps, legendProps } = this.props;
    this._points = this.props.data.lineChartData || [];

    const isXAxisDateType = getXAxisType(this._points);
    let points = this._points;
    if (legendProps && !!legendProps.canSelectMultipleLegends) {
      points = this.state.selectedLegendPoints.length >= 1 ? this.state.selectedLegendPoints : this._points;
      this._calloutPoints = calloutData(points);
    }

    const legendBars = this._createLegends(this._points!);
    const calloutProps = {
      isCalloutVisible: this.state.isCalloutVisible,
      directionalHint: DirectionalHint.topAutoEdge,
      YValueHover: this.state.YValueHover,
      hoverXValue: this.state.hoverXValue,
      id: `toolTip${this._uniqueCallOutID}`,
      target: this.state.refSelected,
      isBeakVisible: false,
      gapSpace: 15,
      ...this.props.calloutProps,
    };
    const tickParams = {
      tickValues: tickValues,
      tickFormat: tickFormat,
    };

    return (
      <CartesianChart
        {...this.props}
        points={points}
        chartType={ChartTypes.LineChart}
        isCalloutForStack
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        getmargins={this._getMargins}
        getGraphData={this._initializeLineChartData}
        xAxisType={isXAxisDateType ? XAxisTypes.DateAxis : XAxisTypes.NumericAxis}
        customizedCallout={this._getCustomizedCallout()}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          this._xAxisScale = props.xScale!;
          this._yAxisScale = props.yScale!;
          this._xAxisRectScale = props.xScale;
          const ticks = this._xAxisRectScale.ticks();
          const width1 = this._xAxisRectScale(ticks[ticks.length - 1]);
          const rectHeight = props.containerHeight! - this.margins.top!;
          return (
            <>
              <rect
                id={this._rectId}
                key={this._rectId}
                width={Math.max(width1, 0)}
                height={Math.max(rectHeight, 0)}
                fill={'transparent'}
                onMouseMove={this._onRectMouseMove}
                onMouseOut={this._onRectMouseOut}
                onMouseOver={this._onRectMouseMove}
              />
              <g>
                <g>
                  {this._renderedColorFillBars}
                  {this.lines}
                </g>
                {eventAnnotationProps && (
                  <EventsAnnotation
                    {...eventAnnotationProps}
                    scale={props.xScale!}
                    chartYTop={this.margins.top! + this.eventLabelHeight}
                    chartYBottom={props.containerHeight! - 35}
                  />
                )}
              </g>
            </>
          );
        }}
      />
    );
  }

  private _getCustomizedCallout = () => {
    return this.props.onRenderCalloutPerStack
      ? this.props.onRenderCalloutPerStack(this.state.stackCalloutProps)
      : this.props.onRenderCalloutPerDataPoint
      ? this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps)
      : null;
  };

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  private _initializeLineChartData = (
    xScale: NumericAxis,
    yScale: NumericAxis,
    containerHeight: number,
    containerWidth: number,
  ) => {
    this._xAxisScale = xScale;
    this._yAxisScale = yScale;
    this._renderedColorFillBars = this.props.colorFillBars ? this._createColorFillBars(containerHeight) : [];
    this.lines = this._createLines(containerHeight);
  };

  private _onRectMouseMove = (
    mouseEvent: React.MouseEvent<SVGRectElement | SVGPathElement | SVGCircleElement | SVGLineElement>,
  ) => {
    mouseEvent.persist();
    let lineChartData: ILineChartPoints[];
    if (this.props.legendProps && !!this.props.legendProps.canSelectMultipleLegends) {
      lineChartData = this.state.selectedLegendPoints.length >= 1 ? this.state.selectedLegendPoints : this._points;
    } else {
      const { data } = this.props;
      lineChartData = data.lineChartData!;
    }
    // This will get the value of the X when mouse is on the chart
    const xOffset = this._xAxisRectScale.invert(clientPoint(document.getElementById(this._rectId)!, mouseEvent)[0]);
    const i = bisect(lineChartData![0].data, xOffset);
    const d0 = lineChartData![0].data[i - 1] as ILineChartDataPoint;
    const d1 = lineChartData![0].data[i] as ILineChartDataPoint;
    let axisType: XAxisTypes | null = null;
    let pointToHighlight: string | Date | number | null = null;
    let index: null | number = null;
    axisType = lineChartData![0] && (getTypeOfAxis(lineChartData![0].data[0].x, true) as XAxisTypes);
    if (d0 === undefined && d1 !== undefined) {
      pointToHighlight = d1.x;
      index = i;
    } else if (d0 !== undefined && d1 === undefined) {
      pointToHighlight = d0.x;
      index = i - 1;
    } else {
      let x0;
      let point0;
      let point1;
      switch (axisType) {
        case XAxisTypes.DateAxis:
          x0 = new Date(xOffset).getTime();
          point0 = (d0.x as Date).getTime();
          point1 = (d1.x as Date).getTime();
          pointToHighlight = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? d1.x : d0.x;
          index = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? i : i - 1;
          break;
        case XAxisTypes.NumericAxis:
          x0 = xOffset as number;
          point0 = d0.x as number;
          point1 = d1.x as number;
          pointToHighlight = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? d1.x : d0.x;
          index = Math.abs(x0 - point0) > Math.abs(x0 - point1) ? i : i - 1;
          break;
        default:
          break;
      }
    }
    const xAxisCalloutData = lineChartData![0].data[index as number].xAxisCalloutData;
    const formattedDate = pointToHighlight instanceof Date ? pointToHighlight.toLocaleDateString() : pointToHighlight;
    const modifiedXVal = pointToHighlight instanceof Date ? pointToHighlight.getTime() : pointToHighlight;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found: any = find(this._calloutPoints, (element: { x: string | number }) => {
      return element.x === modifiedXVal;
    });
    this.setState({
      refSelected: mouseEvent,
      isCalloutVisible: true,
      nearestCircleToHighlight:
        axisType === XAxisTypes.DateAxis ? (pointToHighlight as Date).getTime() : pointToHighlight,
      lineXValue: this._xAxisRectScale(pointToHighlight),
      displayOfLine: InterceptVisibility.show,
      isCircleClicked: false,
      stackCalloutProps: found!,
      YValueHover: found.values,
      dataPointCalloutProps: found!,
      hoverXValue: xAxisCalloutData ? xAxisCalloutData : formattedDate,
    });
  };

  private _onRectMouseOut = () => {
    this.setState({
      refSelected: null,
      isCalloutVisible: false,
      nearestCircleToHighlight: null,
      lineXValue: 0,
      displayOfLine: InterceptVisibility.hide,
      isCircleClicked: false,
      stackCalloutProps: undefined,
      dataPointCalloutProps: undefined,
      hoverXValue: undefined,
      YValueHover: [],
    });
  };

  private _handleSingleLegendSelectionAction = (lineChartItem: ILineChartPoints | IColorFillBarsProps) => {
    if (this.state.selectedLegend === lineChartItem.legend) {
      this.setState({ selectedLegend: '', activeLegend: lineChartItem.legend });
      this._handleLegendClick(lineChartItem, null);
    } else {
      this.setState({
        selectedLegend: lineChartItem.legend,
        activeLegend: lineChartItem.legend,
      });
      this._handleLegendClick(lineChartItem, lineChartItem.legend);
    }
  };

  private _onHoverCardHide = () => {
    this.setState({
      selectedLegendPoints: [],
      selectedColorBarLegend: [],
      isSelectedLegend: false,
    });
  };

  private _getCircleRadius = (xDataPoint: number | Date): number => {
    const { isCircleClicked, nearestCircleToHighlight } = this.state;
    if (isCircleClicked && nearestCircleToHighlight === xDataPoint) {
      return 1;
    } else if (nearestCircleToHighlight === xDataPoint) {
      return 8;
    } else {
      return 0.2;
    }
  };

  private _updateCircleFillColor = (xDataPoint: number | Date, lineColor: string): string => {
    if (this.state.isCircleClicked && this.state.nearestCircleToHighlight === xDataPoint) {
      return lineColor;
    } else {
      return this.state.nearestCircleToHighlight === xDataPoint ? this.props.theme!.palette.white : lineColor;
    }
  };

  private _createLegends(data: ILineChartPoints[]): JSX.Element {
    const { legendProps } = this.props;
    const isLegendMultiSelectEnabled = !!(legendProps && !!legendProps.canSelectMultipleLegends);
    const legendDataItems = data.map((point: ILineChartPoints, index: number) => {
      const color: string = point.color;
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color: color,
        action: () => {
          if (isLegendMultiSelectEnabled) {
            this._handleMultipleLineLegendSelectionAction(point);
          } else {
            this._handleSingleLegendSelectionAction(point);
          }
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

    const colorFillBarsLegendDataItems = this.props.colorFillBars
      ? this.props.colorFillBars.map((colorFillBar: IColorFillBarsProps, index: number) => {
          const title = colorFillBar.legend;
          const legend: ILegend = {
            title,
            color: colorFillBar.color,
            action: () => {
              if (isLegendMultiSelectEnabled) {
                this._handleMultipleColorFillBarLegendSelectionAction(colorFillBar);
              } else {
                this._handleSingleLegendSelectionAction(colorFillBar);
              }
            },
            onMouseOutAction: () => {
              this.setState({ activeLegend: '' });
            },
            hoverAction: () => {
              this.setState({ activeLegend: title });
            },
            opacity: this._colorFillBarsOpacity,
            stripePattern: colorFillBar.applyPattern,
          };
          return legend;
        })
      : [];

    const legends = (
      <Legends
        legends={[...legendDataItems, ...colorFillBarsLegendDataItems]}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        overflowProps={this.props.legendsOverflowProps}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
        {...(isLegendMultiSelectEnabled && { onLegendHoverCardLeave: this._onHoverCardHide })}
        {...this.props.legendProps}
      />
    );
    return legends;
  }

  private _createLines(containerHeight: number): JSX.Element[] {
    const lines = [];
    if (this.state.isSelectedLegend) {
      this._points = this.state.selectedLegendPoints;
    } else {
      this._points = this.props.data && this.props.data.lineChartData ? this.props.data.lineChartData : [];
    }
    let lineColor: string;
    for (let i = 0; i < this._points.length; i++) {
      const legendVal: string = this._points[i].legend;
      lineColor = this._points[i].color;
      if (this._points[i].data.length === 1) {
        const x1 = this._points[i].data[0].x;
        const x1Point = x1 instanceof Date ? (x1 as Date).getTime() : x1;
        const y1 = this._points[i].data[0].y;
        lines.push(
          <circle
            id={`${this._circleId}${i}`}
            key={`${this._circleId}${i}`}
            r={this._getCircleRadius(x1Point)}
            cx={this._xAxisScale(x1)}
            cy={this._yAxisScale(y1)}
            fill={this._updateCircleFillColor(x1, lineColor)}
            onMouseMove={this._onRectMouseMove}
            onMouseOut={this._onRectMouseOut}
            onMouseOver={this._onRectMouseMove}
          />,
        );
      }
      for (let j = 1; j < this._points[i].data.length; j++) {
        const lineId = `${this._lineId}${i}${j}`;
        const circleId = `${this._circleId}${i}${j}`;
        const x1 = this._points[i].data[j - 1].x;
        const x1Point = x1 instanceof Date ? (x1 as Date).getTime() : x1;
        const y1 = this._points[i].data[j - 1].y;
        const x2 = this._points[i].data[j].x;
        const x2Point = x2 instanceof Date ? (x2 as Date).getTime() : x2;
        const y2 = this._points[i].data[j].y;
        if (this.state.activeLegend === legendVal || this.state.activeLegend === '' || this.state.isSelectedLegend) {
          lines.push(
            <line
              id={lineId}
              key={lineId}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(x2)}
              y2={this._yAxisScale(y2)}
              strokeWidth={this.props.strokeWidth || 4}
              onMouseMove={this._onRectMouseMove}
              onMouseOut={this._onRectMouseOut}
              onMouseOver={this._onRectMouseMove}
              stroke={lineColor}
              strokeLinecap={'round'}
              opacity={1}
              onClick={this._onLineClick.bind(this, this._points[i].onLineClick)}
            />,
          );
          lines.push(
            <circle
              id={circleId}
              key={circleId}
              r={this._getCircleRadius(x1Point)}
              cx={this._xAxisScale(x1)}
              cy={this._yAxisScale(y1)}
              onMouseMove={this._onRectMouseMove}
              onMouseOut={this._onRectMouseOut}
              onMouseOver={this._onRectMouseMove}
              onClick={this._onDataPointClick.bind(
                this,
                this._points[i].data[j - 1].onDataPointClick,
                circleId,
                lineColor,
              )}
              opacity={1}
              fill={this._updateCircleFillColor(x1Point, lineColor)}
              stroke={lineColor}
              strokeWidth={3}
            />,
          );
          if (j + 1 === this._points[i].data.length) {
            const lastCircleId = `${circleId}${j}L`;
            lines.push(
              <circle
                id={lastCircleId}
                key={lastCircleId}
                r={this._getCircleRadius(x2Point)}
                cx={this._xAxisScale(x2)}
                cy={this._yAxisScale(y2)}
                onMouseMove={this._onRectMouseMove}
                onMouseOut={this._onRectMouseOut}
                onMouseOver={this._onRectMouseMove}
                onClick={this._onDataPointClick.bind(
                  this,
                  this._points[i].data[j].onDataPointClick,
                  lastCircleId,
                  lineColor,
                )}
                opacity={1}
                fill={this._updateCircleFillColor(x2Point, lineColor)}
                stroke={lineColor}
                strokeWidth={3}
              />,
            );
            /* eslint-enable react/jsx-no-bind */
          }
        } else {
          lines.push(
            <line
              id={lineId}
              key={lineId}
              x1={this._xAxisScale(x1)}
              y1={this._yAxisScale(y1)}
              x2={this._xAxisScale(x2)}
              y2={this._yAxisScale(y2)}
              onMouseMove={this._onRectMouseMove}
              onMouseOut={this._onRectMouseOut}
              onMouseOver={this._onRectMouseMove}
              strokeWidth={this.props.strokeWidth || 4}
              stroke={lineColor}
              strokeLinecap={'round'}
              opacity={0.1}
              onClick={this._onLineClick.bind(this, this._points[i].onLineClick)}
            />,
          );
        }
      }
    }
    lines.push(
      <line
        id={this._verticalLine}
        key={this._verticalLine}
        x1={this.state.lineXValue}
        y1={0}
        x2={this.state.lineXValue}
        y2={containerHeight}
        strokeWidth={1}
        strokeDasharray={'5,5'}
        stroke={lineColor!}
        opacity={0.5}
        visibility={this.state.displayOfLine}
      />,
    );
    return lines;
  }

  private _createColorFillBars = (containerHeight: number) => {
    const colorFillBars: JSX.Element[] = [];
    if (this.state.isSelectedLegend) {
      this._colorFillBars = this.state.selectedColorBarLegend;
    } else {
      this._colorFillBars = this.props.colorFillBars!;
    }
    for (let i = 0; i < this._colorFillBars.length; i++) {
      const colorFillBar = this._colorFillBars[i];
      const colorFillBarId = getId(colorFillBar.legend.replace(/\W/g, ''));

      if (colorFillBar.applyPattern) {
        // Using a pattern element because CSS was unable to render diagonal stripes for rect elements
        colorFillBars.push(this._getStripePattern(colorFillBar.color, i));
      }

      for (let j = 0; j < colorFillBar.data.length; j++) {
        const startX = colorFillBar.data[j].startX;
        const endX = colorFillBar.data[j].endX;
        const opacity =
          this.state.activeLegend === colorFillBar.legend ||
          this.state.activeLegend === '' ||
          this.state.isSelectedLegend
            ? this._colorFillBarsOpacity
            : 0.1;
        colorFillBars.push(
          <rect
            fill={colorFillBar.applyPattern ? `url(#${this._colorFillBarPatternId}${i})` : colorFillBar.color}
            fillOpacity={opacity}
            x={this._xAxisScale(startX)}
            y={this._yAxisScale(0) - containerHeight}
            width={Math.abs(this._xAxisScale(endX) - this._xAxisScale(startX))}
            height={containerHeight}
            key={`${colorFillBarId}${j}`}
          />,
        );
      }
    }
    return colorFillBars;
  };

  private _getStripePattern = (color: string, id: number) => {
    // This describes a tile pattern that resembles diagonal stripes
    // For more information: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
    const stripePath = 'M-4,4 l8,-8 M0,16 l16,-16 M12,20 l8,-8';
    return (
      <pattern
        id={`${this._colorFillBarPatternId}${id}`}
        width={16}
        height={16}
        key={`${this._colorFillBarPatternId}${id}`}
        patternUnits={'userSpaceOnUse'}
      >
        <path d={stripePath} stroke={color} strokeWidth={2} />
      </pattern>
    );
  };

  private _onLineClick = (func: () => void) => {
    if (func) {
      func();
    }
  };

  private _onDataPointClick = (func: () => void, circleId: string, color: string) => {
    if (func) {
      func();
    }
    this.setState({ isCircleClicked: true });
  };

  private _handleLegendClick = (
    lineChartItem: ILineChartPoints | IColorFillBarsProps,
    selectedLegend: string | null | string[],
  ): void => {
    if (lineChartItem.onLegendClick) {
      lineChartItem.onLegendClick(selectedLegend);
    }
  };

  private _handleMultipleLineLegendSelectionAction = (selectedLine: ILineChartPoints) => {
    const selectedLineIndex = this.state.selectedLegendPoints.reduce((acc, line, index) => {
      if (acc > -1 || line.legend !== selectedLine.legend) {
        return acc;
      } else {
        return index;
      }
    }, -1);

    let selectedLines: ILineChartPoints[];
    if (selectedLineIndex === -1) {
      selectedLines = [...this.state.selectedLegendPoints, selectedLine];
    } else {
      selectedLines = this.state.selectedLegendPoints
        .slice(0, selectedLineIndex)
        .concat(this.state.selectedLegendPoints.slice(selectedLineIndex + 1));
    }

    const areAllLineLegendsSelected = this.props.data && selectedLines.length === this.props.data.lineChartData!.length;

    if (
      areAllLineLegendsSelected &&
      ((this.props.colorFillBars && this.props.colorFillBars.length === this.state.selectedColorBarLegend.length) ||
        !this.props.colorFillBars)
    ) {
      // Clear all legends if all legends including color fill bar legends are selected
      // Or clear all legends if all legends are selected and there are no color fill bars
      this._clearMultipleLegendSelections();
    } else if (!selectedLines.length && !this.state.selectedColorBarLegend.length) {
      // Clear all legends if no legends including color fill bar legends are selected
      this._clearMultipleLegendSelections();
    } else {
      // Otherwise, set state when one or more legends are selected, including color fill bar legends
      this.setState({
        selectedLegendPoints: selectedLines,
        isSelectedLegend: true,
      });
    }

    const selectedLegendTitlesToPass = selectedLines.map((line: ILineChartPoints) => line.legend);
    this._handleLegendClick(selectedLine, selectedLegendTitlesToPass);
  };

  private _handleMultipleColorFillBarLegendSelectionAction = (selectedColorFillBar: IColorFillBarsProps) => {
    const selectedColorFillBarIndex = this.state.selectedColorBarLegend.reduce((acc, colorFillBar, index) => {
      if (acc > -1 || colorFillBar.legend !== selectedColorFillBar.legend) {
        return acc;
      } else {
        return index;
      }
    }, -1);

    let selectedColorFillBars: IColorFillBarsProps[];
    if (selectedColorFillBarIndex === -1) {
      selectedColorFillBars = [...this.state.selectedColorBarLegend, selectedColorFillBar];
    } else {
      selectedColorFillBars = this.state.selectedColorBarLegend
        .slice(0, selectedColorFillBarIndex)
        .concat(this.state.selectedColorBarLegend.slice(selectedColorFillBarIndex + 1));
    }

    const areAllColorFillBarLegendsSelected =
      selectedColorFillBars.length === (this.props.colorFillBars && this.props.colorFillBars!.length);

    if (
      areAllColorFillBarLegendsSelected &&
      ((this.props.data && this.props.data.lineChartData!.length === this.state.selectedLegendPoints.length) ||
        !this.props.data)
    ) {
      // Clear all legends if all legends, including line legends, are selected
      // Or clear all legends if all legends are selected and there is no line data
      this._clearMultipleLegendSelections();
    } else if (!selectedColorFillBars.length && !this.state.selectedLegendPoints.length) {
      // Clear all legends if no legends are selected, including line legends
      this._clearMultipleLegendSelections();
    } else {
      // set state when one or more legends are selected, including line legends
      this.setState({
        selectedColorBarLegend: selectedColorFillBars,
        isSelectedLegend: true,
      });
    }

    const selectedLegendTitlesToPass = selectedColorFillBars.map(
      (colorFillBar: IColorFillBarsProps) => colorFillBar.legend,
    );
    this._handleLegendClick(selectedColorFillBar, selectedLegendTitlesToPass);
  };

  private _clearMultipleLegendSelections = () => {
    this.setState({
      selectedColorBarLegend: [],
      selectedLegendPoints: [],
      isSelectedLegend: false,
    });
  };
}
