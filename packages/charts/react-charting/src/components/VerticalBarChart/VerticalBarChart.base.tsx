import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { line as d3Line } from 'd3-shape';
import { select as d3Select } from 'd3-selection';
import {
  scaleLinear as d3ScaleLinear,
  ScaleLinear as D3ScaleLinear,
  scaleBand as d3ScaleBand,
  scaleUtc as d3ScaleUtc,
  scaleTime as d3ScaleTime,
} from 'd3-scale';
import { classNamesFunction, getId, getRTL, initializeComponentRef } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from '@fluentui/react/lib/Styling';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import {
  IAccessibilityProps,
  CartesianChart,
  ChartHoverCard,
  IBasestate,
  IMargins,
  ILegend,
  IRefArrayData,
  IVerticalBarChartProps,
  IVerticalBarChartStyleProps,
  IVerticalBarChartStyles,
  IVerticalBarChartDataPoint,
  Legends,
  IChildProps,
  IYValueHover,
  IDataPoint,
} from '../../index';
import { FocusZoneDirection } from '@fluentui/react-focus';
import { formatDateToLocaleString } from '@fluentui/chart-utilities';
import {
  ChartTypes,
  IAxisData,
  getAccessibleDataObject,
  XAxisTypes,
  NumericAxis,
  getTypeOfAxis,
  tooltipOfAxislabels,
  formatScientificLimitWidth,
  getBarWidth,
  getScalePadding,
  isScalePaddingDefined,
  calculateAppropriateBarWidth,
  findVerticalNumericMinMaxOfY,
  createNumericYAxis,
  IDomainNRange,
  domainRageOfVerticalNumeric,
  domainRangeOfDateForAreaLineScatterVerticalBarCharts,
  domainRangeOfXStringAxis,
  createStringYAxis,
  getNextGradient,
  areArraysEqual,
  calculateLongestLabelWidth,
  sortAxisCategories,
  calcTotalWidth,
  calcBandwidth,
  calcRequiredWidth,
} from '../../utilities/index';
import { IChart, IImageExportOptions } from '../../types/index';
import { ILegendContainer } from '../Legends/index';
import { toImage } from '../../utilities/image-export-utils';

enum CircleVisbility {
  show = 'visibility',
  hide = 'hidden',
}
const getClassNames = classNamesFunction<IVerticalBarChartStyleProps, IVerticalBarChartStyles>();

const MIN_DOMAIN_MARGIN = 8;

export interface IVerticalBarChartState extends IBasestate {
  dataPointCalloutProps?: IVerticalBarChartDataPoint; // define this in hover and focus
  /**
   * data point of x, where rectangle is hovered or focused
   */
  activeXdataPoint: number | string | Date | null;
  YValueHover: IYValueHover[];
  hoverXValue?: string | number | null;
  callOutAccessibilityData?: IAccessibilityProps;
  calloutLegend: string;
  selectedLegends: string[];
}

type ColorScale = (_p?: number) => string;

export class VerticalBarChartBase
  extends React.Component<IVerticalBarChartProps, IVerticalBarChartState>
  implements IChart
{
  public static defaultProps: Partial<IVerticalBarChartProps> = {
    maxBarWidth: 24,
    useUTC: true,
    xAxisCategoryOrder: 'default',
  };

  private _points: IVerticalBarChartDataPoint[];
  private _barWidth: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IVerticalBarChartStyles>;
  private _refArray: IRefArrayData[];
  private _calloutId: string;
  private margins: IMargins;
  private _isRtl: boolean = getRTL();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _bars: JSX.Element[];
  private _xAxisLabels: string[];
  private _yMax: number;
  private _yMin: number;
  private _isHavingLine: boolean;
  private _tooltipId: string;
  private _xAxisType: XAxisTypes;
  private _calloutAnchorPoint: IVerticalBarChartDataPoint | null;
  private _domainMargin: number;
  private _emptyChartId: string;
  private _xAxisInnerPadding: number;
  private _xAxisOuterPadding: number;
  private _cartesianChartRef: React.RefObject<IChart>;
  private _legendsRef: React.RefObject<ILegendContainer>;

  public constructor(props: IVerticalBarChartProps) {
    super(props);

    initializeComponentRef(this);

    this.state = {
      color: '',
      dataForHoverCard: 0,
      isCalloutVisible: false,
      refSelected: null,
      selectedLegends: props.legendProps?.selectedLegends || [],
      activeLegend: undefined,
      xCalloutValue: '',
      yCalloutValue: '',
      activeXdataPoint: null,
      YValueHover: [],
      hoverXValue: '',
      calloutLegend: '',
    };
    this._isHavingLine = this._checkForLine();
    this._calloutId = getId('callout');
    this._tooltipId = getId('VCTooltipID_');
    this._refArray = [];
    this._emptyChartId = getId('_VBC_empty');
    this._domainMargin = MIN_DOMAIN_MARGIN;
    this._cartesianChartRef = React.createRef();
    this._legendsRef = React.createRef();
  }

  public componentDidUpdate(prevProps: IVerticalBarChartProps): void {
    if (!areArraysEqual(prevProps.legendProps?.selectedLegends, this.props.legendProps?.selectedLegends)) {
      this.setState({
        selectedLegends: this.props.legendProps?.selectedLegends || [],
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public render(): JSX.Element {
    this._adjustProps();
    this._xAxisLabels = this._getOrderedXAxisLabels();
    this._yMax = Math.max(
      d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.y)!,
      this.props.yMaxValue || 0,
    );
    this._yMin = Math.min(
      d3Min(this._points, (point: IVerticalBarChartDataPoint) => point.y)!,
      this.props.yMinValue || 0,
    );
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const legendBars: JSX.Element = this._getLegendData(this._points, this.props.theme!.palette);
    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      legendColor: this.state.color,
    });
    const calloutProps = {
      isCalloutVisible: this.state.isCalloutVisible,
      directionalHint: DirectionalHint.topAutoEdge,
      id: `toolTip${this._calloutId}`,
      target: this.state.refSelected,
      isBeakVisible: false,
      ...(this._isHavingLine && {
        YValueHover: this.state.YValueHover,
        hoverXValue: this.state.hoverXValue,
      }),
      gapSpace: 15,
      color: this.state.color,
      legend: this.state.calloutLegend,
      XValue: this.state.xCalloutValue,
      YValue: this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard,
      onDismiss: this._closeCallout,
      preventDismissOnLostFocus: true,
      ...this.props.calloutProps,
      ...getAccessibleDataObject(this.state.callOutAccessibilityData),
    };
    const tickParams = {
      tickValues: this.props.tickValues,
      tickFormat: this.props.tickFormat,
    };
    return !this._isChartEmpty() ? (
      <CartesianChart
        {...this.props}
        chartTitle={this._getChartTitle()}
        points={this._points}
        supportNegativeData={this.props.supportNegativeData}
        chartType={ChartTypes.VerticalBarChart}
        xAxisType={this._xAxisType}
        createYAxis={createNumericYAxis}
        calloutProps={calloutProps}
        tickParams={tickParams}
        {...(this._isHavingLine &&
          (this._noLegendHighlighted() || this._getHighlightedLegend().length > 1) && { isCalloutForStack: true })}
        legendBars={legendBars}
        datasetForXAxisDomain={this._xAxisLabels}
        barwidth={this._barWidth}
        focusZoneDirection={FocusZoneDirection.horizontal}
        customizedCallout={this._getCustomizedCallout()}
        createStringYAxis={createStringYAxis}
        getmargins={this._getMargins}
        getMinMaxOfYAxis={findVerticalNumericMinMaxOfY}
        getGraphData={this._getGraphData}
        getDomainNRangeValues={this._getDomainNRangeValues}
        getAxisData={this._getAxisData}
        onChartMouseLeave={this._handleChartMouseLeave}
        getDomainMargins={this._getDomainMargins}
        {...(this._xAxisType === XAxisTypes.StringAxis && {
          xAxisInnerPadding: this._xAxisInnerPadding,
          xAxisOuterPadding: this._xAxisOuterPadding,
        })}
        ref={this._cartesianChartRef}
        showRoundOffXTickValues={
          !isScalePaddingDefined(this.props.xAxisInnerPadding, this.props.xAxisPadding) &&
          this.props.mode !== 'histogram'
        }
        /* eslint-disable react/jsx-no-bind */
        children={(props: IChildProps) => {
          return (
            <>
              <g>{this._bars}</g>
              {this._isHavingLine && (
                <g>
                  {this._createLine(
                    props.xScale!,
                    props.yScalePrimary!,
                    props.containerHeight,
                    props.containerWidth,
                    props.yScaleSecondary,
                  )}
                </g>
              )}
            </>
          );
        }}
      />
    ) : (
      <div
        id={this._emptyChartId}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }

  public get chartContainer(): HTMLElement | null {
    return this._cartesianChartRef.current?.chartContainer || null;
  }

  public toImage = (opts?: IImageExportOptions): Promise<string> => {
    return toImage(this._cartesianChartRef.current?.chartContainer, this._legendsRef.current?.toSVG, this._isRtl, opts);
  };

  private _getDomainNRangeValues = (
    points: IDataPoint[],
    margins: IMargins,
    width: number,
    chartType: ChartTypes,
    isRTL: boolean,
    xAxisType: XAxisTypes,
    barWidth: number,
    tickValues: Date[] | number[] | undefined,
    shiftX: number,
  ) => {
    let domainNRangeValue: IDomainNRange;
    if (xAxisType === XAxisTypes.NumericAxis) {
      domainNRangeValue = domainRageOfVerticalNumeric(points, margins, width, isRTL, barWidth!);
    } else if (xAxisType === XAxisTypes.DateAxis) {
      domainNRangeValue = domainRangeOfDateForAreaLineScatterVerticalBarCharts(
        points,
        margins,
        width,
        isRTL,
        tickValues! as Date[],
        chartType,
        barWidth,
      );
    } else {
      domainNRangeValue = domainRangeOfXStringAxis(margins, width, isRTL);
    }
    return domainNRangeValue;
  };

  private _createLine = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yScalePrimary: any,
    containerHeight: number = 0,
    containerWidth: number = 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yScaleSecondary?: any,
  ): React.ReactNode => {
    const isStringAxis = this._xAxisType === XAxisTypes.StringAxis;
    const { xBarScale } = this._getScales(containerHeight, containerWidth);
    const colorScale = this._createColors();
    const { theme } = this.props;
    const { data, lineLegendColor = theme!.palette.yellow, lineLegendText } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lineData: Array<any> = [];
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const line: JSX.Element[] = [];
    data &&
      data.forEach((item: IVerticalBarChartDataPoint, index: number) => {
        if (item.lineData && item.lineData.y) {
          lineData.push({
            x: item.x,
            y: item.lineData!.y,
            useSecondaryYScale: item.lineData!.useSecondaryYScale ?? false,
            point: item,
            index,
          });
        }
      });
    const linePath = d3Line()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .x((d: any) => (isStringAxis ? xBarScale(d.x) + 0.5 * xBarScale.bandwidth() : xScale(d.x)))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .y((d: any) => (d.useSecondaryYScale && yScaleSecondary ? yScaleSecondary(d.y) : yScalePrimary(d.y)));
    const shouldHighlight = this._legendHighlighted(lineLegendText!) || this._noLegendHighlighted() ? true : false;
    const lineBorderWidth = this.props.lineOptions?.lineBorderWidth
      ? Number.parseFloat(this.props.lineOptions!.lineBorderWidth!.toString())
      : 0;

    if (lineBorderWidth > 0) {
      line.push(
        <path
          key={getId('_VBC_line_')}
          id={getId('_VBC_line_')}
          opacity={shouldHighlight ? 1 : 0.1}
          d={linePath(lineData)!}
          fill="transparent"
          strokeLinecap="square"
          strokeWidth={3 + lineBorderWidth * 2}
          stroke={theme!.semanticColors.bodyBackground}
        />,
      );
    }
    line.push(
      <path
        key={getId('_VBC_line_')}
        id={getId('_VBC_line_')}
        opacity={shouldHighlight ? 1 : 0.1}
        d={linePath(lineData)!}
        fill="transparent"
        strokeLinecap="square"
        strokeWidth={3}
        stroke={lineLegendColor}
      />,
    );

    const dots: React.ReactNode[] = lineData.map(
      (
        item: {
          x: number | string;
          y: number;
          useSecondaryYScale: boolean;
          point: IVerticalBarChartDataPoint;
          index: number;
        },
        index: number,
      ) => {
        // Create an object to store line point ref so that the object can be passed by reference to the focus handler
        const circleRef: { refElement: SVGCircleElement | null } = { refElement: null };
        return (
          <circle
            key={index}
            id={getId('_VBC_point_')}
            cx={isStringAxis ? xBarScale(item.x) + 0.5 * xBarScale.bandwidth() : xScale(item.x)}
            cy={item.useSecondaryYScale && yScaleSecondary ? yScaleSecondary(item.y) : yScalePrimary(item.y)}
            onMouseOver={
              this._legendHighlighted(lineLegendText!)
                ? this._lineHover.bind(this, item.point)
                : this._onBarHover.bind(this, item.point, colorScale(item.y))
            }
            onMouseOut={this._onBarLeave}
            r={this._getCircleVisibilityAndRadius(item.x, lineLegendText!).radius}
            stroke={lineLegendColor}
            fill={this.props.theme!.semanticColors.bodyBackground}
            strokeWidth={3}
            visibility={this._getCircleVisibilityAndRadius(item.x, lineLegendText!).visibility}
            onClick={item.point.lineData?.onClick}
            // When no legend is highlighted: Line points are automatically displayed along with the bars
            // at the same x-axis point in the stack callout. So to prevent an increase in focusable elements
            // and avoid conveying duplicate info, make these line points non-focusable.
            data-is-focusable={this._legendHighlighted(lineLegendText!)}
            ref={e => (circleRef.refElement = e)}
            onFocus={this._lineFocus.bind(this, item.point, circleRef)}
            onBlur={this._handleChartMouseLeave}
          />
        );
      },
    );

    return (
      <>
        {line}
        {dots}
      </>
    );
  };

  private _getCircleVisibilityAndRadius = (
    xAxisPoint: string | number | Date,
    legend: string,
  ): { visibility: CircleVisbility; radius: number } => {
    const { activeXdataPoint } = this.state;
    if (!this._noLegendHighlighted()) {
      if (xAxisPoint === activeXdataPoint && this._legendHighlighted(legend)) {
        return { visibility: CircleVisbility.show, radius: 8 };
      } else if (this._legendHighlighted(legend)) {
        // Don't hide the circle to keep it focusable. For more information,
        // see https://fuzzbomb.github.io/accessibility-demos/visually-hidden-focus-test.html
        return { visibility: CircleVisbility.show, radius: 0.3 };
      } else {
        return { visibility: CircleVisbility.hide, radius: 0 };
      }
    } else {
      return {
        visibility: activeXdataPoint === xAxisPoint ? CircleVisbility.show : CircleVisbility.hide,
        radius: 8,
      };
    }
  };

  private _checkForLine = (): boolean => {
    const { data } = this.props;
    return data!.some((item: IVerticalBarChartDataPoint) => item?.lineData?.y !== undefined);
  };

  private _adjustProps(): void {
    this._xAxisType =
      this.props.data! && this.props.data!.length > 0
        ? (getTypeOfAxis(this.props.data![0].x, true) as XAxisTypes)
        : XAxisTypes.StringAxis;
    this._points = this.props.data || [];
    this._barWidth = getBarWidth(this.props.barWidth, this.props.maxBarWidth, undefined, this.props.mode);
    const { palette } = this.props.theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.blueDark];
    this._isHavingLine = this._checkForLine();
    this._xAxisInnerPadding =
      this.props.mode === 'histogram'
        ? 0
        : getScalePadding(
            this.props.xAxisInnerPadding,
            this.props.xAxisPadding,
            this._xAxisType === XAxisTypes.StringAxis ? 2 / 3 : 1 / 2,
          );
    this._xAxisOuterPadding = getScalePadding(this.props.xAxisOuterPadding, this.props.xAxisPadding, 0);
  }

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _renderContentForBothLineAndBars = (point: IVerticalBarChartDataPoint): JSX.Element => {
    const { YValueHover, hoverXValue } = this._getCalloutContentForLineAndBar(point);
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const content: JSX.Element[] = YValueHover.map((item: IYValueHover, index: number) => {
      return (
        <ChartHoverCard
          key={index}
          Legend={item.legend}
          {...(index === 0 && { XValue: `${hoverXValue || item.data}` })}
          color={item.color}
          YValue={item.data || item.y}
          culture={this.props.culture}
        />
      );
    });
    return <>{content}</>;
  };
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _renderContentForOnlyBars = (props: IVerticalBarChartDataPoint): JSX.Element => {
    const { useSingleColor = false } = this.props;
    return (
      <>
        <ChartHoverCard
          XValue={props.xAxisCalloutData || (props.x as string)}
          Legend={props.legend}
          YValue={props.yAxisCalloutData || props.y}
          color={!useSingleColor && props.color ? props.color : this._createColors()(props.y)}
          culture={this.props.culture}
        />
      </>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _renderCallout = (props?: IVerticalBarChartDataPoint): JSX.Element | null => {
    return props
      ? this._isHavingLine
        ? this._renderContentForBothLineAndBars(props)
        : this._renderContentForOnlyBars(props)
      : null;
  };

  private _getCustomizedCallout = () => {
    return this.props.onRenderCalloutPerDataPoint
      ? this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps, this._renderCallout)
      : null;
  };

  private _getGraphData = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale: any,
    yScale: NumericAxis,
    containerHeight: number,
    containerWidth: number,
    xElement?: SVGElement | null,
  ) => {
    return (this._bars =
      this._xAxisType === XAxisTypes.NumericAxis
        ? this._createNumericBars(containerHeight, containerWidth, xElement!)
        : this._xAxisType === XAxisTypes.DateAxis
        ? this._createDateBars(containerHeight, containerWidth, xElement!)
        : this._createStringBars(containerHeight, containerWidth, xElement!));
  };

  private _createColors(): D3ScaleLinear<string, string> | ColorScale {
    const increment = this._colors.length <= 1 ? 1 : 1 / (this._colors.length - 1);
    const { useSingleColor = false } = this.props;
    if (useSingleColor) {
      return (_p?: number) => {
        const { theme, colors } = this.props;
        return colors && colors.length > 0 ? colors[0] : theme!.palette.blueLight;
      };
    }
    const domainValues = [];
    for (let i = 0; i < this._colors.length; i++) {
      domainValues.push(increment * i * this._yMax);
    }
    const colorScale = d3ScaleLinear<string>().domain(domainValues).range(this._colors);
    return colorScale;
  }

  private _refCallback = (element: SVGRectElement, legendTitle: string): void => {
    this._refArray.push({ index: legendTitle, refElement: element });
  };

  private _getCalloutContentForLineAndBar = (
    point: IVerticalBarChartDataPoint,
  ): { YValueHover: IYValueHover[]; hoverXValue: string | number | null } => {
    const YValueHover: IYValueHover[] = [];
    const { theme, useSingleColor = false, enableGradient } = this.props;
    const { data, lineLegendText, lineLegendColor = theme!.palette.yellow } = this.props;
    const selectedPoint = data!.filter((xDataPoint: IVerticalBarChartDataPoint) => xDataPoint.x === point.x);
    const pointIndex = data!.indexOf(selectedPoint[0]);
    const calloutColor = !useSingleColor
      ? selectedPoint[0].color
        ? selectedPoint[0].color
        : this._createColors()(selectedPoint[0].y)
      : this._createColors()(1);

    // there might be no y value of the line for the hovered bar. so we need to check this condition
    if (
      this._isHavingLine &&
      selectedPoint[0].lineData?.y !== undefined &&
      (this._legendHighlighted(lineLegendText) || this._noLegendHighlighted())
    ) {
      // callout data for the  line
      YValueHover.push({
        legend: lineLegendText,
        color: lineLegendColor,
        y: selectedPoint[0].lineData?.y,
        data: selectedPoint[0].lineData?.yAxisCalloutData,
        yAxisCalloutData: selectedPoint[0].lineData?.yAxisCalloutData,
      });
    }
    if (this._legendHighlighted(selectedPoint[0].legend) || this._noLegendHighlighted()) {
      // callout data for the bar
      YValueHover.push({
        legend: selectedPoint[0].legend,
        y: selectedPoint[0].y,
        color: enableGradient
          ? useSingleColor
            ? getNextGradient(0, 0)[0]
            : selectedPoint[0].gradient?.[0] || getNextGradient(pointIndex, 0)[0]
          : calloutColor,
        data: selectedPoint[0].yAxisCalloutData,
        yAxisCalloutData: selectedPoint[0].yAxisCalloutData,
      });
    }
    const hoverXValue =
      point.x instanceof Date
        ? formatDateToLocaleString(point.x, this.props.culture, this.props.useUTC)
        : point.x.toString();
    return {
      YValueHover,
      hoverXValue: point.xAxisCalloutData || hoverXValue,
    };
  };

  private _onBarHover(
    point: IVerticalBarChartDataPoint,
    color: string,
    mouseEvent: React.MouseEvent<SVGElement>,
  ): void {
    mouseEvent.persist();

    const { YValueHover, hoverXValue } = this._getCalloutContentForLineAndBar(point);
    if (this._calloutAnchorPoint !== point) {
      this._calloutAnchorPoint = point;
      this.setState({
        refSelected: mouseEvent,
        /** Show the callout if highlighted bar is hovered and Hide it if unhighlighted bar is hovered */
        isCalloutVisible: this._noLegendHighlighted() || this._legendHighlighted(point.legend),
        dataForHoverCard: point.y,
        calloutLegend: point.legend!,
        color: point.color || color,
        // To display callout value, if no callout value given, taking given point.x value as a string.
        xCalloutValue:
          point.xAxisCalloutData ||
          (point.x instanceof Date
            ? formatDateToLocaleString(point.x, this.props.culture, this.props.useUTC)
            : point.x.toString()),
        yCalloutValue: point.yAxisCalloutData!,
        dataPointCalloutProps: point,
        // Hovering over a bar should highlight corresponding line points only when no legend is selected
        activeXdataPoint: this._noLegendHighlighted() || this._legendHighlighted(point.legend) ? point.x : null,
        YValueHover,
        hoverXValue,
        callOutAccessibilityData: point.callOutAccessibilityData,
      });
    }
  }

  private _onBarLeave = (): void => {
    /**/
  };

  private _handleChartMouseLeave = (): void => {
    this._calloutAnchorPoint = null;
    this.setState({
      isCalloutVisible: false,
      activeXdataPoint: null,
      YValueHover: [],
      hoverXValue: '',
    });
  };

  private _onBarFocus = (point: IVerticalBarChartDataPoint, refArrayIndexNumber: number, color: string): void => {
    const { YValueHover, hoverXValue } = this._getCalloutContentForLineAndBar(point);
    this._refArray.forEach((obj: IRefArrayData, index: number) => {
      if (obj.index === point.legend! && refArrayIndexNumber === index) {
        this.setState({
          refSelected: obj.refElement,
          /** Show the callout if highlighted bar is focused and Hide it if unhighlighted bar is focused */
          isCalloutVisible: this._noLegendHighlighted() || this._legendHighlighted(point.legend),
          calloutLegend: point.legend!,
          dataForHoverCard: point.y,
          color: point.color || color,
          xCalloutValue:
            point.xAxisCalloutData ||
            (point.x instanceof Date
              ? formatDateToLocaleString(point.x, this.props.culture, this.props.useUTC)
              : point.x.toString()),
          yCalloutValue: point.yAxisCalloutData!,
          dataPointCalloutProps: point,
          activeXdataPoint: point.x,
          YValueHover,
          hoverXValue,
          callOutAccessibilityData: point.callOutAccessibilityData,
        });
      }
    });
  };

  private _lineHover = (point: IVerticalBarChartDataPoint, mouseEvent: React.MouseEvent<SVGElement>) => {
    mouseEvent.persist();
    this._lineHoverFocus(point, mouseEvent);
  };

  private _lineFocus = (point: IVerticalBarChartDataPoint, ref: { refElement: SVGCircleElement | null }) => {
    if (ref.refElement) {
      this._lineHoverFocus(point, ref.refElement);
    }
  };

  private _lineHoverFocus = (
    point: IVerticalBarChartDataPoint,
    refSelected: React.MouseEvent<SVGElement> | SVGCircleElement,
  ) => {
    const { theme } = this.props;
    const { lineLegendText = '', lineLegendColor = theme!.palette.yellow } = this.props;
    this.setState({
      refSelected,
      isCalloutVisible: true,
      calloutLegend: lineLegendText,
      dataForHoverCard: point.lineData!.y,
      color: lineLegendColor,
      xCalloutValue:
        point.xAxisCalloutData ||
        (point.x instanceof Date
          ? formatDateToLocaleString(point.x, this.props.culture, this.props.useUTC)
          : point.x.toString()),
      yCalloutValue: point.lineData!.yAxisCalloutData,
      dataPointCalloutProps: point,
      activeXdataPoint: point.x,
    });
  };

  private _getScales = (
    containerHeight: number,
    containerWidth: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): { xBarScale: any; yBarScale: any } => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let xBarScale: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const yBarScale: any = d3ScaleLinear()
      .domain([this.props.supportNegativeData ? this._yMin : 0, this._yMax])
      .range([0, containerHeight - this.margins.bottom! - this.margins.top!]);

    if (this._xAxisType === XAxisTypes.NumericAxis) {
      const xMax = d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.x as number)!;
      const xMin = d3Min(this._points, (point: IVerticalBarChartDataPoint) => point.x as number)!;
      xBarScale = d3ScaleLinear()
        .domain(this._isRtl ? [xMax, xMin] : [xMin, xMax])
        .range([this.margins.left! + this._domainMargin, containerWidth - this.margins.right! - this._domainMargin]);
      if (
        !isScalePaddingDefined(this.props.xAxisInnerPadding, this.props.xAxisPadding) &&
        this.props.mode !== 'histogram'
      ) {
        xBarScale.nice();
      }
    } else if (this._xAxisType === XAxisTypes.DateAxis) {
      const sDate = d3Min(this._points, (point: IVerticalBarChartDataPoint) => point.x as Date)!;
      const lDate = d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.x as Date)!;
      xBarScale = this.props.useUTC ? d3ScaleUtc() : d3ScaleTime();
      xBarScale
        .domain([sDate, lDate])
        .range(
          this._isRtl
            ? [containerWidth - this.margins.right! - this._domainMargin, this.margins.left! + this._domainMargin]
            : [this.margins.left! + this._domainMargin, containerWidth - this.margins.right! - this._domainMargin],
        );
    } else {
      xBarScale = d3ScaleBand()
        .domain(this._xAxisLabels)
        .range(
          this._isRtl
            ? [containerWidth - this.margins.right! - this._domainMargin, this.margins.left! + this._domainMargin]
            : [this.margins.left! + this._domainMargin, containerWidth - this.margins.right! - this._domainMargin],
        )
        .paddingInner(this._xAxisInnerPadding)
        .paddingOuter(this._xAxisOuterPadding);
    }

    return { xBarScale, yBarScale };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _calculateMinBarHeight(yMin: number, yMax: number, yReferencePoint: number, yBarScale: any): number {
    const maxHeightFromBaseline =
      yMax < 0
        ? Math.abs(yMin - yReferencePoint)
        : Math.max(Math.abs(yMax - yReferencePoint), Math.abs(yMin - yReferencePoint));
    return Math.ceil(yBarScale(maxHeightFromBaseline) / 100.0);
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _createNumericBars(containerHeight: number, containerWidth: number, xElement: SVGElement): JSX.Element[] {
    const { useSingleColor = false } = this.props;
    const { xBarScale, yBarScale } = this._getScales(containerHeight, containerWidth);
    const colorScale = this._createColors();

    const yReferencePoint = this._yMax < 0 ? this._yMax : 0;
    const bars = this._points.map((point: IVerticalBarChartDataPoint, index: number) => {
      const shouldHighlight = this._legendHighlighted(point.legend!) || this._noLegendHighlighted() ? true : false;
      this._classNames = getClassNames(this.props.styles!, {
        theme: this.props.theme!,
        legendColor: this.state.color,
        shouldHighlight,
      });

      let barHeight: number = yBarScale(point.y) - yBarScale(yReferencePoint);
      const isHeightNegative = barHeight < 0;
      barHeight = Math.abs(barHeight);
      // Calculate threshold for minimum visible bar height
      const minBarHeight = this._calculateMinBarHeight(this._yMin, this._yMax, yReferencePoint, yBarScale);
      let adjustedBarHeight = barHeight;

      if (barHeight === 0 || (isHeightNegative && !this.props.supportNegativeData)) {
        return <React.Fragment key={point.x as string}> </React.Fragment>;
      }
      // Adjust bar height if it's smaller than the threshold
      else if (barHeight <= minBarHeight) {
        adjustedBarHeight = minBarHeight;
      }
      const xPoint = xBarScale(point.x as number) - this._barWidth / 2;
      const yPoint =
        containerHeight -
        this.margins.bottom! -
        (isHeightNegative ? -1 * adjustedBarHeight : adjustedBarHeight) -
        yBarScale(yReferencePoint);
      const baselineHeight = containerHeight - this.margins.bottom! - yBarScale(yReferencePoint);

      let startColor = point.color && !useSingleColor ? point.color : colorScale(point.y);
      let endColor = startColor;

      if (this.props.enableGradient) {
        startColor = point.gradient?.[0] || getNextGradient(index, 0, this.props.theme?.isInverted)[0];
        endColor = point.gradient?.[1] || getNextGradient(index, 0, this.props.theme?.isInverted)[1];
        if (useSingleColor) {
          startColor = getNextGradient(0, 0, this.props.theme?.isInverted)[0];
          endColor = getNextGradient(0, 0, this.props.theme?.isInverted)[1];
        }
        this._points[index].color = startColor;
      }

      const gradientId = getId('VBC_Gradient') + `_${index}_${startColor}`;

      return (
        <g key={`${point.x}_${index}` as string}>
          {this.props.enableGradient && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0" stopColor={startColor} />
                <stop offset="100%" stopColor={endColor} />
              </linearGradient>
            </defs>
          )}
          <rect
            id={getId('_VBC_bar_')}
            x={xPoint}
            className={this._classNames.opacityChangeOnHover}
            y={!isHeightNegative ? yPoint : baselineHeight}
            width={this._barWidth}
            data-is-focusable={!this.props.hideTooltip && shouldHighlight}
            height={adjustedBarHeight}
            ref={(e: SVGRectElement) => {
              this._refCallback(e, point.legend!);
            }}
            onClick={point.onClick}
            onMouseOver={this._onBarHover.bind(this, point, startColor)}
            aria-label={this._getAriaLabel(point)}
            role="img"
            onMouseLeave={this._onBarLeave}
            onFocus={this._onBarFocus.bind(this, point, index, startColor)}
            onBlur={this._onBarLeave}
            fill={this.props.enableGradient ? `url(#${gradientId})` : startColor}
            rx={this.props.roundCorners ? 3 : 0}
          />
          {this._renderBarLabel(xPoint, yPoint, point.y, point.legend!, isHeightNegative)}
        </g>
      );
    });
    // Removing un wanted tooltip div from DOM, when prop not provided.
    if (!this.props.showXAxisLablesTooltip) {
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    // Used to display tooltip at x axis labels.
    if (!this.props.wrapXAxisLables && this.props.showXAxisLablesTooltip) {
      const xAxisElement = d3Select(xElement).call(xBarScale);
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      const tooltipProps = {
        tooltipCls: this._classNames.tooltip!,
        id: this._tooltipId,
        axis: xAxisElement,
      };
      xAxisElement && tooltipOfAxislabels(tooltipProps);
    }
    return bars;
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _createStringBars(containerHeight: number, containerWidth: number, xElement: SVGElement): JSX.Element[] {
    const { useSingleColor = false } = this.props;
    const { xBarScale, yBarScale } = this._getScales(containerHeight, containerWidth);
    const colorScale = this._createColors();
    const yReferencePoint = this._yMax < 0 ? this._yMax : 0;
    const bars = this._points.map((point: IVerticalBarChartDataPoint, index: number) => {
      const shouldHighlight = this._legendHighlighted(point.legend!) || this._noLegendHighlighted();
      this._classNames = getClassNames(this.props.styles!, {
        theme: this.props.theme!,
        shouldHighlight,
      });

      let barHeight: number = yBarScale(point.y) - yBarScale(yReferencePoint);
      const isHeightNegative = barHeight < 0;
      barHeight = Math.abs(barHeight);
      // Calculate threshold for minimum visible bar height
      const minBarHeight = this._calculateMinBarHeight(this._yMin, this._yMax, yReferencePoint, yBarScale);
      let adjustedBarHeight = barHeight;

      if (barHeight === 0 || (isHeightNegative && !this.props.supportNegativeData)) {
        return <React.Fragment key={point.x as string}> </React.Fragment>;
      }
      // Adjust bar height if it's smaller than the threshold
      else if (barHeight <= minBarHeight) {
        adjustedBarHeight = minBarHeight;
      }
      const xPoint = xBarScale(point.x);
      const yPoint =
        containerHeight -
        this.margins.bottom! -
        (isHeightNegative ? -1 * adjustedBarHeight : adjustedBarHeight) -
        yBarScale(yReferencePoint);
      const baselineHeight = containerHeight - this.margins.bottom! - yBarScale(yReferencePoint);
      // Setting the bar width here is safe because there are no dependencies earlier in the code
      // that rely on the width of bars in vertical bar charts with string x-axis.
      this._barWidth = getBarWidth(this.props.barWidth, this.props.maxBarWidth, xBarScale.bandwidth(), this.props.mode);

      let startColor = point.color ? point.color : colorScale(point.y);
      let endColor = startColor;

      if (this.props.enableGradient) {
        startColor = point.gradient?.[0] || getNextGradient(index, 0, this.props.theme?.isInverted)[0];
        endColor = point.gradient?.[1] || getNextGradient(index, 0, this.props.theme?.isInverted)[1];
        if (useSingleColor) {
          startColor = getNextGradient(0, 0, this.props.theme?.isInverted)[0];
          endColor = getNextGradient(0, 0, this.props.theme?.isInverted)[1];
        }
        this._points[index].color = startColor;
      }

      const gradientId = getId('VBC_Gradient') + `_${index}_${startColor}`;

      return (
        <g
          key={point.x instanceof Date ? `${point.x.getTime()}_${index}` : `${point.x}_${index}`}
          transform={`translate(${0.5 * (xBarScale.bandwidth() - this._barWidth)}, 0)`}
        >
          {this.props.enableGradient && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0" stopColor={startColor} />
                <stop offset="100%" stopColor={endColor} />
              </linearGradient>
            </defs>
          )}
          <rect
            id={getId('_VBC_bar_')}
            x={xPoint}
            className={this._classNames.opacityChangeOnHover}
            y={!isHeightNegative ? yPoint : baselineHeight}
            width={this._barWidth}
            height={adjustedBarHeight}
            aria-label={this._getAriaLabel(point)}
            role="img"
            ref={(e: SVGRectElement) => {
              this._refCallback(e, point.legend!);
            }}
            onClick={point.onClick}
            onMouseOver={this._onBarHover.bind(this, point, startColor)}
            onMouseLeave={this._onBarLeave}
            onBlur={this._onBarLeave}
            data-is-focusable={!this.props.hideTooltip && shouldHighlight}
            onFocus={this._onBarFocus.bind(this, point, index, startColor)}
            fill={this.props.enableGradient ? `url(#${gradientId})` : startColor}
            rx={this.props.roundCorners ? 3 : 0}
          />
          {this._renderBarLabel(xPoint, yPoint, point.y, point.legend!, isHeightNegative)}
        </g>
      );
    });

    // Removing un wanted tooltip div from DOM, when prop not provided.
    if (!this.props.showXAxisLablesTooltip) {
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    // Used to display tooltip at x axis labels.
    if (!this.props.wrapXAxisLables && this.props.showXAxisLablesTooltip) {
      const xAxisElement = d3Select(xElement).call(xBarScale);
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      const tooltipProps = {
        tooltipCls: this._classNames.tooltip!,
        id: this._tooltipId,
        axis: xAxisElement,
        showTooltip: this.props.showXAxisLablesTooltip,
      };
      xAxisElement && tooltipOfAxislabels(tooltipProps);
    }
    return bars;
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _createDateBars(containerHeight: number, containerWidth: number, xElement: SVGElement): JSX.Element[] {
    const { useSingleColor = false } = this.props;
    const { xBarScale, yBarScale } = this._getScales(containerHeight, containerWidth);
    const colorScale = this._createColors();

    const yReferencePoint = this._yMax < 0 ? this._yMax : 0;
    const bars = this._points.map((point: IVerticalBarChartDataPoint, index: number) => {
      const shouldHighlight = this._legendHighlighted(point.legend!) || this._noLegendHighlighted() ? true : false;
      this._classNames = getClassNames(this.props.styles!, {
        theme: this.props.theme!,
        legendColor: this.state.color,
        shouldHighlight,
      });

      let barHeight: number = yBarScale(point.y) - yBarScale(yReferencePoint);
      const isHeightNegative = barHeight < 0;
      barHeight = Math.abs(barHeight);
      // Calculate threshold for minimum visible bar height
      const minBarHeight = this._calculateMinBarHeight(this._yMin, this._yMax, yReferencePoint, yBarScale);
      let adjustedBarHeight = barHeight;

      if (barHeight === 0 || (isHeightNegative && !this.props.supportNegativeData)) {
        return <React.Fragment key={point.x as string}> </React.Fragment>;
      }
      // Adjust bar height if it's smaller than the threshold
      else if (barHeight <= minBarHeight) {
        adjustedBarHeight = minBarHeight;
      }
      const xPoint = xBarScale(point.x as number) - this._barWidth / 2;
      const yPoint =
        containerHeight -
        this.margins.bottom! -
        (isHeightNegative ? -1 * adjustedBarHeight : adjustedBarHeight) -
        yBarScale(yReferencePoint);
      const baselineHeight = containerHeight - this.margins.bottom! - yBarScale(yReferencePoint);

      let startColor = point.color && !useSingleColor ? point.color : colorScale(point.y);
      let endColor = startColor;

      if (this.props.enableGradient) {
        startColor = point.gradient?.[0] || getNextGradient(index, 0, this.props.theme?.isInverted)[0];
        endColor = point.gradient?.[1] || getNextGradient(index, 0, this.props.theme?.isInverted)[1];
        if (useSingleColor) {
          startColor = getNextGradient(0, 0, this.props.theme?.isInverted)[0];
          endColor = getNextGradient(0, 0, this.props.theme?.isInverted)[1];
        }
        this._points[index].color = startColor;
      }

      const gradientId = getId('VBC_Gradient') + `_${index}_${startColor}`;

      return (
        <g key={point.x instanceof Date ? `${point.x.getTime()}_${index}` : `${point.x}_${index}`}>
          {this.props.enableGradient && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0" stopColor={startColor} />
                <stop offset="100%" stopColor={endColor} />
              </linearGradient>
            </defs>
          )}
          <rect
            id={getId('_VBC_bar_')}
            x={xPoint}
            className={this._classNames.opacityChangeOnHover}
            y={!isHeightNegative ? yPoint : baselineHeight}
            width={this._barWidth}
            data-is-focusable={!this.props.hideTooltip && shouldHighlight}
            height={adjustedBarHeight}
            ref={(e: SVGRectElement) => {
              this._refCallback(e, point.legend!);
            }}
            onClick={point.onClick}
            onMouseOver={this._onBarHover.bind(this, point, startColor)}
            aria-label={this._getAriaLabel(point)}
            role="img"
            onMouseLeave={this._onBarLeave}
            onFocus={this._onBarFocus.bind(this, point, index, startColor)}
            onBlur={this._onBarLeave}
            fill={this.props.enableGradient ? `url(#${gradientId})` : startColor}
            rx={this.props.roundCorners ? 3 : 0}
          />
          {this._renderBarLabel(xPoint, yPoint, point.y, point.legend!, isHeightNegative)}
        </g>
      );
    });
    // Removing un wanted tooltip div from DOM, when prop not provided.
    if (!this.props.showXAxisLablesTooltip) {
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    // Used to display tooltip at x axis labels.
    if (!this.props.wrapXAxisLables && this.props.showXAxisLablesTooltip) {
      const xAxisElement = d3Select(xElement).call(xBarScale);
      try {
        document.getElementById(this._tooltipId) && document.getElementById(this._tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      const tooltipProps = {
        tooltipCls: this._classNames.tooltip!,
        id: this._tooltipId,
        axis: xAxisElement,
      };
      xAxisElement && tooltipOfAxislabels(tooltipProps);
    }
    return bars;
  }

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _onLegendHover(legendTitle: string): void {
    this.setState({
      activeLegend: legendTitle,
    });
  }

  private _onLegendLeave(): void {
    this.setState({
      activeLegend: undefined,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _getLegendData = (data: IVerticalBarChartDataPoint[], palette: IPalette): JSX.Element => {
    const { theme, useSingleColor } = this.props;
    const { lineLegendText, lineLegendColor = theme!.palette.yellow } = this.props;
    const actions: ILegend[] = [];
    const mapLegendToColor: Record<string, string> = {};
    data.forEach((point: IVerticalBarChartDataPoint, _index: number) => {
      let color: string = !useSingleColor ? point.color! : this._createColors()(1);

      if (this.props.enableGradient) {
        const pointIndex = Math.max(this.props.data?.findIndex(item => item.legend === point.legend) || 0, 0);
        color = point.gradient?.[0] || getNextGradient(pointIndex, 0, theme?.isInverted)[0];
        if (useSingleColor) {
          color = getNextGradient(0, 0, this.props.theme?.isInverted)[0];
        }
      }

      mapLegendToColor[point.legend!] = color;
    });
    Object.entries(mapLegendToColor).forEach(([legendTitle, color]) => {
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: legendTitle,
        color,
        hoverAction: () => {
          this._handleChartMouseLeave();
          this._onLegendHover(legendTitle);
        },
        onMouseOutAction: () => {
          this._onLegendLeave();
        },
      };
      actions.push(legend);
    });
    if (this._isHavingLine && lineLegendText && lineLegendColor) {
      const lineLegend: ILegend = {
        title: lineLegendText,
        color: lineLegendColor,
        hoverAction: () => {
          this._handleChartMouseLeave();
          this._onLegendHover(lineLegendText);
        },
        onMouseOutAction: () => {
          this._onLegendLeave();
        },
        isLineLegendInBarChart: true,
      };
      actions.unshift(lineLegend);
    }
    const legends = (
      <Legends
        legends={actions}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        overflowProps={this.props.legendsOverflowProps}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
        {...this.props.legendProps}
        onChange={this._onLegendSelectionChange.bind(this)}
        ref={this._legendsRef}
      />
    );
    return legends;
  };

  private _onLegendSelectionChange(
    selectedLegends: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: ILegend,
  ): void {
    if (this.props.legendProps?.canSelectMultipleLegends) {
      this.setState({ selectedLegends });
    } else {
      this.setState({ selectedLegends: selectedLegends.slice(-1) });
    }
    if (this.props.legendProps?.onChange) {
      this.props.legendProps.onChange(selectedLegends, event, currentLegend);
    }
  }

  private _getAxisData = (yAxisData: IAxisData) => {
    if (yAxisData && yAxisData.yAxisDomainValues.length) {
      const { yAxisDomainValues: domainValue } = yAxisData;
      this._yMax = Math.max(domainValue[domainValue.length - 1], this.props.yMaxValue || 0);
      this._yMin = Math.min(domainValue[0], this.props.yMinValue || 0);
    }
  };

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  private _legendHighlighted = (legendTitle: string | undefined) => {
    return this._getHighlightedLegend().includes(legendTitle!);
  };

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  private _noLegendHighlighted = () => {
    return this._getHighlightedLegend().length === 0;
  };

  private _getHighlightedLegend() {
    return this.state.selectedLegends.length > 0
      ? this.state.selectedLegends
      : this.state.activeLegend
      ? [this.state.activeLegend]
      : [];
  }

  private _getAriaLabel = (point: IVerticalBarChartDataPoint): string => {
    const xValue = point.xAxisCalloutData
      ? point.xAxisCalloutData
      : point.x instanceof Date
      ? formatDateToLocaleString(point.x, this.props.culture, this.props.useUTC)
      : point.x;
    const legend = point.legend;
    const yValue = point.yAxisCalloutData || point.y;
    const lineLegend = this.props.lineLegendText || 'Line';
    const lineYValue = point.lineData?.yAxisCalloutData || point.lineData?.y;
    return (
      point.callOutAccessibilityData?.ariaLabel ||
      `${xValue}. ` +
        (legend ? `${legend}, ` : '') +
        `${yValue}.` +
        (typeof lineYValue !== 'undefined' ? ` ${lineLegend}, ${lineYValue}.` : '')
    );
  };

  private _renderBarLabel(xPoint: number, yPoint: number, barValue: number, legend: string, isNegativeBar: boolean) {
    if (
      this.props.hideLabels ||
      this._barWidth < 16 ||
      !(this._legendHighlighted(legend) || this._noLegendHighlighted())
    ) {
      return null;
    }

    return (
      <text
        x={xPoint + this._barWidth / 2}
        y={isNegativeBar ? yPoint + 12 : yPoint - 6}
        textAnchor="middle"
        className={this._classNames.barLabel}
        aria-hidden={true}
      >
        {typeof this.props.yAxisTickFormat === 'function'
          ? this.props.yAxisTickFormat(barValue)
          : formatScientificLimitWidth(barValue)}
      </text>
    );
  }

  private _getDomainMargins = (containerWidth: number): IMargins => {
    this._domainMargin = MIN_DOMAIN_MARGIN;

    const mapX: Record<string, number | string | Date> = {};
    this.props.data?.forEach(point => {
      if (point.x instanceof Date) {
        mapX[point.x.getTime()] = point.x;
      } else {
        mapX[point.x] = point.x;
      }
    });
    const uniqueX = Object.values(mapX);

    /** Total width available to render the bars */
    const totalWidth = calcTotalWidth(containerWidth, this.margins, MIN_DOMAIN_MARGIN);

    if (this._xAxisType === XAxisTypes.StringAxis) {
      if (isScalePaddingDefined(this.props.xAxisOuterPadding, this.props.xAxisPadding)) {
        // Setting the domain margin for string x-axis to 0 because the xAxisOuterPadding prop is now available
        // to adjust the space before the first bar and after the last bar.
        this._domainMargin = 0;
      } else if (this.props.barWidth !== 'auto' && this.props.mode !== 'histogram') {
        // Update the bar width so that when CartesianChart rerenders,
        // the following calculations don't use the previous bar width.
        this._barWidth = getBarWidth(this.props.barWidth, this.props.maxBarWidth);
        /** Total width required to render the bars. Directly proportional to bar width */
        const reqWidth = calcRequiredWidth(this._barWidth, uniqueX.length, this._xAxisInnerPadding);

        if (totalWidth >= reqWidth) {
          // Center align the chart by setting equal left and right margins for domain
          this._domainMargin = MIN_DOMAIN_MARGIN + (totalWidth - reqWidth) / 2;
        }
      } else if (['plotly', 'histogram'].includes(this.props.mode!) && uniqueX.length > 1) {
        // Calculate the remaining width after rendering bars at their maximum allowable width
        const bandwidth = calcBandwidth(totalWidth, uniqueX.length, this._xAxisInnerPadding);
        const barWidth = getBarWidth(this.props.barWidth, this.props.maxBarWidth, bandwidth, this.props.mode);
        let reqWidth = calcRequiredWidth(barWidth, uniqueX.length, this._xAxisInnerPadding);
        const margin1 = (totalWidth - reqWidth) / 2;

        let margin2 = Number.POSITIVE_INFINITY;
        // This logic may introduce gaps between histogram bars when the barWidth is restricted.
        // So disable it for histogram mode.
        if (this.props.mode !== 'histogram') {
          // Calculate the remaining width after accounting for the space required to render x-axis labels
          const step = calculateLongestLabelWidth(uniqueX as string[]) + 20;
          reqWidth = (uniqueX.length - this._xAxisInnerPadding) * step;
          margin2 = (totalWidth - reqWidth) / 2;
        }

        this._domainMargin = MIN_DOMAIN_MARGIN + Math.max(0, Math.min(margin1, margin2));
      }
    } else {
      if (this.props.mode === 'histogram') {
        // Try center-aligning the bars to eliminate any gaps caused by a restricted barWidth.
        // This only works if the bin centers are consistent across all legend groups; otherwise,
        // the calculated domainMargin may be too small.
        const barWidth = this.props.maxBarWidth!;
        const reqWidth = calcRequiredWidth(barWidth, uniqueX.length, this._xAxisInnerPadding);
        this._domainMargin += Math.max(0, (totalWidth - reqWidth) / 2);
      }

      // The histogram may appear distorted when bin centers/sizes vary across different legend groups.
      // Currently, we calculate the appropriate bar width using the closest unique x-values to make
      // the bars of the same legend group adjacent. But these x-values can come from different legend groups
      // and result in misleading visuals. Even if we compute bar widths separately within each group,
      // we still lack support for rendering bars with different widths and must use the minimum width,
      // which can cause the same issue.
      // Solution: Instead of estimating the appropriate bar width, render each bar to span the full range
      // of its corresponding bin explicitly.
      this._barWidth = getBarWidth(
        this.props.barWidth,
        this.props.maxBarWidth,
        calculateAppropriateBarWidth(
          uniqueX as number[] | Date[],
          calcTotalWidth(containerWidth, this.margins, this._domainMargin),
          this._xAxisInnerPadding,
        ),
        this.props.mode,
      );
      this._domainMargin += this._barWidth / 2;
    }

    return {
      ...this.margins,
      left: this.margins.left! + this._domainMargin,
      right: this.margins.right! + this._domainMargin,
    };
  };

  private _isChartEmpty(): boolean {
    return this._points.length === 0 || (this._points.every(point => point.y === 0) && !this._isHavingLine);
  }

  private _getChartTitle = (): string => {
    const { chartTitle, data } = this.props;
    return (
      (chartTitle ? `${chartTitle}. ` : '') +
      `Vertical bar chart with ${data?.length || 0} bars` +
      (this._isHavingLine ? ' and 1 line' : '') +
      '. '
    );
  };

  private _getOrderedXAxisLabels = () => {
    if (this._xAxisType !== XAxisTypes.StringAxis) {
      return [];
    }

    return sortAxisCategories(this._mapCategoryToValues(), this.props.xAxisCategoryOrder);
  };

  private _mapCategoryToValues = () => {
    const categoryToValues: Record<string, number[]> = {};
    this._points.forEach(point => {
      const xValue = point.x as string;
      if (!categoryToValues[xValue]) {
        categoryToValues[xValue] = [];
      }
      categoryToValues[xValue].push(point.y);
      if (point.lineData) {
        categoryToValues[xValue].push(point.lineData.y);
      }
    });
    return categoryToValues;
  };
}
