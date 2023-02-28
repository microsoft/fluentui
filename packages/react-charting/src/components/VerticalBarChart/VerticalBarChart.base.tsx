import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { line as d3Line } from 'd3-shape';
import { select as d3Select } from 'd3-selection';
import { scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';
import { classNamesFunction, getId, getRTL } from '@fluentui/react/lib/Utilities';
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
} from '../../index';
import { FocusZoneDirection } from '@fluentui/react-focus';
import {
  ChartTypes,
  IAxisData,
  getAccessibleDataObject,
  XAxisTypes,
  NumericAxis,
  StringAxis,
  getTypeOfAxis,
  tooltipOfXAxislabels,
} from '../../utilities/index';
import { formatPrefix as d3FormatPrefix } from 'd3-format';

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
  activeXdataPoint: number | string | null;
  YValueHover: IYValueHover[];
  hoverXValue?: string | number | null;
  callOutAccessibilityData?: IAccessibilityProps;
  calloutLegend: string;
}

type ColorScale = (_p?: number) => string;

export class VerticalBarChartBase extends React.Component<IVerticalBarChartProps, IVerticalBarChartState> {
  private _points: IVerticalBarChartDataPoint[];
  private _barWidth: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IVerticalBarChartStyles>;
  private _refArray: IRefArrayData[];
  private _calloutId: string;
  private margins: IMargins;
  private _isRtl: boolean = getRTL();
  private _bars: JSX.Element[];
  private _xAxisLabels: string[];
  private _yMax: number;
  private _isHavingLine: boolean;
  private _tooltipId: string;
  private _xAxisType: XAxisTypes;
  private _calloutAnchorPoint: IVerticalBarChartDataPoint | null;
  private _domainMargin: number;

  public constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      color: '',
      dataForHoverCard: 0,
      isCalloutVisible: false,
      refSelected: null,
      selectedLegend: '',
      activeLegend: '',
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
    this._xAxisType =
      this.props.data! && this.props.data!.length > 0
        ? (getTypeOfAxis(this.props.data![0].x, true) as XAxisTypes)
        : XAxisTypes.StringAxis;
    this._domainMargin = MIN_DOMAIN_MARGIN;
  }

  public render(): JSX.Element {
    this._adjustProps();
    this._xAxisLabels = this._points.map((point: IVerticalBarChartDataPoint) => point.x as string);
    this._yMax = Math.max(
      d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.y)!,
      this.props.yMaxValue || 0,
    );
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
    return (
      <CartesianChart
        {...this.props}
        points={this._points}
        chartType={ChartTypes.VerticalBarChart}
        xAxisType={this._xAxisType}
        calloutProps={calloutProps}
        tickParams={tickParams}
        {...(this._isHavingLine && { isCalloutForStack: true })}
        legendBars={legendBars}
        datasetForXAxisDomain={this._xAxisLabels}
        barwidth={this._barWidth}
        focusZoneDirection={FocusZoneDirection.horizontal}
        customizedCallout={this._getCustomizedCallout()}
        getmargins={this._getMargins}
        getGraphData={this._getGraphData}
        getAxisData={this._getAxisData}
        onChartMouseLeave={this._handleChartMouseLeave}
        getDomainMargins={this._getDomainMargins}
        {...(this._xAxisType !== XAxisTypes.NumericAxis && { xAxisInnerPadding: 2 / 3, xAxisOuterPadding: 0 })}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line react/no-children-prop
        children={(props: IChildProps) => {
          return (
            <>
              <g>{this._bars}</g>
              {this._isHavingLine && (
                <g>{this._createLine(props.xScale!, props.yScale!, props.containerHeight, props.containerWidth)}</g>
              )}
            </>
          );
        }}
      />
    );
  }

  private _createLine = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yScale: any,
    containerHeight: number = 0,
    containerWidth: number = 0,
  ): React.ReactNode => {
    const isNumericAxis = this._xAxisType === XAxisTypes.NumericAxis;
    const { xBarScale } = this._getScales(containerHeight, containerWidth, isNumericAxis);
    const colorScale = this._createColors();
    const { theme } = this.props;
    const { data, lineLegendColor = theme!.palette.yellow, lineLegendText } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lineData: Array<any> = [];
    const line: JSX.Element[] = [];
    data &&
      data.forEach((item: IVerticalBarChartDataPoint, index: number) => {
        if (item.lineData && item.lineData.y) {
          lineData.push({ x: item.x, y: item.lineData!.y, point: item, index });
        }
      });
    const linePath = d3Line()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .x((d: any) => (!isNumericAxis ? xBarScale(d.x) + 0.5 * xBarScale.bandwidth() : xScale(d.x)))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .y((d: any) => yScale(d.y));
    const shouldHighlight = this._legendHighlighted(lineLegendText!) || this._noLegendHighlighted() ? true : false;
    const lineBorderWidth = this.props.lineOptions?.lineBorderWidth
      ? Number.parseFloat(this.props.lineOptions!.lineBorderWidth!.toString())
      : 0;

    if (lineBorderWidth > 0) {
      line.push(
        <path
          opacity={shouldHighlight ? 1 : 0.1}
          d={linePath(lineData)!}
          fill="transparent"
          strokeLinecap="square"
          strokeWidth={3 + lineBorderWidth * 2}
          stroke={theme!.palette.white}
        />,
      );
    }
    line.push(
      <path
        opacity={shouldHighlight ? 1 : 0.1}
        d={linePath(lineData)!}
        fill="transparent"
        strokeLinecap="square"
        strokeWidth={3}
        stroke={lineLegendColor}
      />,
    );

    const dots: React.ReactNode[] = lineData.map(
      (item: { x: number | string; y: number; point: IVerticalBarChartDataPoint; index: number }, index: number) => {
        return (
          <circle
            key={index}
            cx={!isNumericAxis ? xBarScale(item.x) + 0.5 * xBarScale.bandwidth() : xScale(item.x)}
            cy={yScale(item.y)}
            onMouseOver={this._onBarHover.bind(this, item.point, colorScale(item.y))}
            onMouseOut={this._onBarLeave}
            r={8}
            stroke={lineLegendColor}
            fill={this.props.theme!.palette.white}
            strokeWidth={3}
            visibility={this.state.activeXdataPoint === item.x ? CircleVisbility.show : CircleVisbility.hide}
            onClick={item.point.lineData?.onClick}
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

  private _checkForLine = (): boolean => {
    const { data } = this.props;
    return data!.some((item: IVerticalBarChartDataPoint) => item?.lineData?.y !== undefined);
  };

  private _adjustProps(): void {
    this._points = this.props.data || [];
    this._barWidth = this.props.barWidth || 16;
    const { palette } = this.props.theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.blueDark];
    this._isHavingLine = this._checkForLine();
  }

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  private _renderContentForBothLineAndBars = (point: IVerticalBarChartDataPoint): JSX.Element => {
    const { YValueHover, hoverXValue } = this._getCalloutContentForLineAndBar(point);
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
    xScale: StringAxis,
    yScale: NumericAxis,
    containerHeight: number,
    containerWidth: number,
    xElement?: SVGElement | null,
  ) => {
    return (this._bars =
      this._xAxisType === XAxisTypes.NumericAxis
        ? this._createNumericBars(containerHeight, containerWidth, xElement!)
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
    const { theme, useSingleColor = false } = this.props;
    const { data, lineLegendText, lineLegendColor = theme!.palette.yellow } = this.props;
    const selectedPoint = data!.filter((xDataPoint: IVerticalBarChartDataPoint) => xDataPoint.x === point.x);
    // there might be no y value of the line for the hovered bar. so we need to check this condition
    if (this._isHavingLine && selectedPoint[0].lineData?.y !== undefined) {
      // callout data for the  line
      YValueHover.push({
        legend: lineLegendText,
        color: lineLegendColor,
        y: selectedPoint[0].lineData?.y,
        data: selectedPoint[0].lineData?.yAxisCalloutData,
        yAxisCalloutData: selectedPoint[0].lineData?.yAxisCalloutData,
      });
    }
    // callout data for the bar
    YValueHover.push({
      legend: selectedPoint[0].legend,
      y: selectedPoint[0].y,
      color: !useSingleColor
        ? selectedPoint[0].color
          ? selectedPoint[0].color
          : this._createColors()(selectedPoint[0].y)
        : this._createColors()(1),
      data: selectedPoint[0].yAxisCalloutData,
      yAxisCalloutData: selectedPoint[0].yAxisCalloutData,
    });
    return { YValueHover, hoverXValue: point.xAxisCalloutData || point.x.toString() };
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
        isCalloutVisible: this.state.selectedLegend === '' || this.state.selectedLegend === point.legend,
        dataForHoverCard: point.y,
        calloutLegend: point.legend!,
        color: point.color || color,
        // To display callout value, if no callout value given, taking given point.x value as a string.
        xCalloutValue: point.xAxisCalloutData || point.x.toString(),
        yCalloutValue: point.yAxisCalloutData!,
        dataPointCalloutProps: point,
        activeXdataPoint: point.x,
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
          isCalloutVisible: this.state.selectedLegend === '' || this.state.selectedLegend === point.legend,
          calloutLegend: point.legend!,
          dataForHoverCard: point.y,
          color: point.color || color,
          xCalloutValue: point.xAxisCalloutData || point.x.toString(),
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

  private _getScales = (
    containerHeight: number,
    containerWidth: number,
    isNumericScale: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): { xBarScale: any; yBarScale: any } => {
    if (isNumericScale) {
      const xMax = d3Max(this._points, (point: IVerticalBarChartDataPoint) => point.x as number)!;
      const xMin = d3Min(this._points, (point: IVerticalBarChartDataPoint) => point.x as number)!;
      const xBarScale = d3ScaleLinear()
        .domain(this._isRtl ? [xMax, xMin] : [xMin, xMax])
        .nice()
        .range([
          this.margins.left! + this._domainMargin,
          containerWidth - this.margins.right! - this._barWidth - this._domainMargin,
        ]);
      const yBarScale = d3ScaleLinear()
        .domain([0, this._yMax])
        .range([0, containerHeight - this.margins.bottom! - this.margins.top!]);
      return { xBarScale, yBarScale };
    } else {
      const xBarScale = d3ScaleBand()
        .domain(this._xAxisLabels)
        .range([this.margins.left! + this._domainMargin, containerWidth - this.margins.right! - this._domainMargin])
        .paddingInner(2 / 3);

      const yBarScale = d3ScaleLinear()
        .domain([0, this._yMax])
        .range([0, containerHeight - this.margins.bottom! - this.margins.top!]);
      return { xBarScale, yBarScale };
    }
  };

  private _createNumericBars(containerHeight: number, containerWidth: number, xElement: SVGElement): JSX.Element[] {
    const { useSingleColor = false } = this.props;
    const { xBarScale, yBarScale } = this._getScales(containerHeight, containerWidth, true);
    const colorScale = this._createColors();
    const bars = this._points.map((point: IVerticalBarChartDataPoint, index: number) => {
      const shouldHighlight = this._legendHighlighted(point.legend!) || this._noLegendHighlighted() ? true : false;
      this._classNames = getClassNames(this.props.styles!, {
        theme: this.props.theme!,
        legendColor: this.state.color,
        shouldHighlight: shouldHighlight,
      });
      const barHeight: number = Math.max(yBarScale(point.y), 0);
      if (barHeight < 1) {
        return <React.Fragment key={point.x}> </React.Fragment>;
      }
      const xPoint = xBarScale(point.x as number);
      const yPoint = containerHeight - this.margins.bottom! - yBarScale(point.y);
      return (
        <g key={point.x}>
          <rect
            x={xPoint}
            className={this._classNames.opacityChangeOnHover}
            y={yPoint}
            width={this._barWidth}
            data-is-focusable={!this.props.hideTooltip}
            height={barHeight}
            ref={(e: SVGRectElement) => {
              this._refCallback(e, point.legend!);
            }}
            onClick={point.onClick}
            onMouseOver={this._onBarHover.bind(this, point, colorScale(point.y))}
            aria-label={this._getAriaLabel(point)}
            role="img"
            onMouseLeave={this._onBarLeave}
            onFocus={this._onBarFocus.bind(this, point, index, colorScale(point.y))}
            onBlur={this._onBarLeave}
            fill={point.color && !useSingleColor ? point.color : colorScale(point.y)}
          />
          {this._renderBarLabel(xPoint, yPoint, point.y)}
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
        xAxis: xAxisElement,
      };
      xAxisElement && tooltipOfXAxislabels(tooltipProps);
    }
    return bars;
  }

  private _createStringBars(containerHeight: number, containerWidth: number, xElement: SVGElement): JSX.Element[] {
    const { xBarScale, yBarScale } = this._getScales(containerHeight, containerWidth, false);
    const colorScale = this._createColors();
    const bars = this._points.map((point: IVerticalBarChartDataPoint, index: number) => {
      const barHeight: number = Math.max(yBarScale(point.y), 0);
      if (barHeight < 1) {
        return <React.Fragment key={point.x}> </React.Fragment>;
      }
      const xPoint = xBarScale(point.x);
      const yPoint = containerHeight - this.margins.bottom! - yBarScale(point.y);
      return (
        <g key={point.x} transform={`translate(${0.5 * (xBarScale.bandwidth() - this._barWidth)}, 0)`}>
          <rect
            x={xPoint}
            y={yPoint}
            width={this._barWidth}
            height={barHeight}
            aria-label={this._getAriaLabel(point)}
            role="img"
            ref={(e: SVGRectElement) => {
              this._refCallback(e, point.legend!);
            }}
            onClick={point.onClick}
            onMouseOver={this._onBarHover.bind(this, point, colorScale(point.y))}
            onMouseLeave={this._onBarLeave}
            onBlur={this._onBarLeave}
            data-is-focusable={!this.props.hideTooltip}
            onFocus={this._onBarFocus.bind(this, point, index, colorScale(point.y))}
            fill={point.color ? point.color : colorScale(point.y)}
          />
          {this._renderBarLabel(xPoint, yPoint, point.y)}
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
        xAxis: xAxisElement,
        showTooltip: this.props.showXAxisLablesTooltip,
      };
      xAxisElement && tooltipOfXAxislabels(tooltipProps);
    }
    return bars;
  }

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _onLegendClick(legendTitle: string): void {
    if (this.state.selectedLegend === legendTitle) {
      this.setState({
        selectedLegend: '',
      });
    } else {
      this.setState({
        selectedLegend: legendTitle,
      });
    }
  }

  private _onLegendHover(legendTitle: string): void {
    this.setState({
      activeLegend: legendTitle,
    });
  }

  private _onLegendLeave(): void {
    this.setState({
      activeLegend: '',
    });
  }

  private _getLegendData = (data: IVerticalBarChartDataPoint[], palette: IPalette): JSX.Element => {
    const { theme, useSingleColor } = this.props;
    const { lineLegendText, lineLegendColor = theme!.palette.yellow } = this.props;
    const actions: ILegend[] = [];
    data.forEach((point: IVerticalBarChartDataPoint, _index: number) => {
      const color: string = !useSingleColor ? point.color! : this._createColors()(1);
      // mapping data to the format Legends component needs
      const legend: ILegend = {
        title: point.legend!,
        color: color,
        action: () => {
          this._onLegendClick(point.legend!);
        },
        hoverAction: () => {
          this._handleChartMouseLeave();
          this._onLegendHover(point.legend!);
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
        action: () => {
          this._onLegendClick(lineLegendText);
        },
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
      />
    );
    return legends;
  };

  private _getAxisData = (yAxisData: IAxisData) => {
    if (yAxisData && yAxisData.yAxisDomainValues.length) {
      const { yAxisDomainValues: domainValue } = yAxisData;
      this._yMax = Math.max(domainValue[domainValue.length - 1], this.props.yMaxValue || 0);
    }
  };

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  private _legendHighlighted = (legendTitle: string) => {
    return (
      this.state.selectedLegend === legendTitle ||
      (this.state.selectedLegend === '' && this.state.activeLegend === legendTitle)
    );
  };

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  private _noLegendHighlighted = () => {
    return this.state.selectedLegend === '' && this.state.activeLegend === '';
  };

  private _getAriaLabel = (point: IVerticalBarChartDataPoint): string => {
    const xValue = point.xAxisCalloutData || point.x;
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

  private _renderBarLabel(xPoint: number, yPoint: number, barValue: number) {
    if (this.props.hideLabels || this._barWidth < 16) {
      return null;
    }

    return (
      <text
        x={xPoint + this._barWidth / 2}
        y={yPoint - 6}
        textAnchor="middle"
        className={this._classNames.barLabel}
        aria-hidden={true}
      >
        {d3FormatPrefix(barValue < 1000 ? '.2~' : '.1', barValue)(barValue)}
      </text>
    );
  }

  private _getDomainMargins = (containerWidth: number): IMargins => {
    if (this._xAxisType !== XAxisTypes.NumericAxis) {
      /** Total width available to render the bars */
      const totalWidth =
        containerWidth - (this.margins.left! + MIN_DOMAIN_MARGIN) - (this.margins.right! + MIN_DOMAIN_MARGIN);
      let barWidth = Math.min(this.props.barWidth || 16, 24);
      /** Total width required to render the bars. Directly proportional to bar width */
      const reqWidth = (3 * this._xAxisLabels.length - 2) * barWidth;

      this._domainMargin = MIN_DOMAIN_MARGIN;
      if (totalWidth >= reqWidth) {
        // Center align the chart by setting equal left and right margins for domain
        this._domainMargin += (totalWidth - reqWidth) / 2;
      } else {
        /** Maximum possible bar width to maintain 2:1 spacing */
        const maxBandwidth = totalWidth / (3 * this._xAxisLabels.length - 2);
        barWidth = maxBandwidth;
      }
      this._barWidth = barWidth;
    }

    return {
      ...this.margins,
      left: this.margins.left! + this._domainMargin,
      right: this.margins.right! + this._domainMargin,
    };
  };
}
