import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { Axis as D3Axis } from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import { scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';
import { classNamesFunction, getId, getRTL, warnDeprecations, memoizeFunction } from '@fluentui/react/lib/Utilities';
import { IPalette, IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { ILegend, Legends } from '../Legends/index';
import {
  IAccessibilityProps,
  CartesianChart,
  ChartHoverCard,
  IBasestate,
  IChildProps,
  IDataPoint,
  IMargins,
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartStyleProps,
  IVerticalStackedBarChartStyles,
  IVerticalStackedChartProps,
  IVSChartDataPoint,
  ILineDataInVerticalStackedBarChart,
  IModifiedCartesianChartProps,
} from '../../index';
import { FocusZoneDirection } from '@fluentui/react-focus';
import {
  ChartTypes,
  IAxisData,
  getAccessibleDataObject,
  XAxisTypes,
  getTypeOfAxis,
  tooltipOfXAxislabels,
  formatValueWithSIPrefix,
} from '../../utilities/index';

const getClassNames = classNamesFunction<IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles>();
type NumericAxis = D3Axis<number | { valueOf(): number }>;
type NumericScale = D3ScaleLinear<number, number>;
const COMPONENT_NAME = 'VERTICAL STACKED BAR CHART';

// When displaying gaps between bars, the max height of the gap is given in the
// props. The actual gap is calculated with this multiplier, with a minimum gap
// of 1 pixel. (If these values are changed, update the comment for barGapMax.)
const barGapMultiplier = 0.2;
const barGapMin = 1;

const MIN_DOMAIN_MARGIN = 8;

interface IRefArrayData {
  refElement?: SVGGElement | null;
}

type LinePoint = ILineDataInVerticalStackedBarChart & { index: number; xItem: IVerticalStackedChartProps };
type LineObject = { [key: string]: LinePoint[] };
type LineLegends = {
  title: string;
  color: string;
};
enum CircleVisbility {
  show = 'visibility',
  hide = 'hidden',
}

type CalloutAnchorPointData = {
  xAxisDataPoint: string;
  chartDataPoint: IVSChartDataPoint;
};

export interface IVerticalStackedBarChartState extends IBasestate {
  dataPointCalloutProps?: IVSChartDataPoint;
  stackCalloutProps?: IVerticalStackedChartProps;
  activeXAxisDataPoint: number | string;
  callOutAccessibilityData?: IAccessibilityProps;
  calloutLegend: string;
}
export class VerticalStackedBarChartBase extends React.Component<
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartState
> {
  private _points: IVerticalStackedChartProps[];
  private _dataset: IDataPoint[];
  private _xAxisLabels: string[];
  private _bars: JSX.Element[];
  private _xAxisType: XAxisTypes;
  private _barWidth: number;
  private _calloutId: string;
  private _colors: string[];
  private margins: IMargins;
  private _isRtl: boolean = getRTL();
  private _createLegendsForLine: (data: IVerticalStackedChartProps[]) => LineLegends[];
  private _lineObject: LineObject;
  private _tooltipId: string;
  private _yMax: number;
  private _yMin: number;
  private _calloutAnchorPoint: CalloutAnchorPointData | null;
  private _domainMargin: number;
  private _classNames: IProcessedStyleSet<IVerticalStackedBarChartStyles>;
  private _emptyChartId: string;

  public constructor(props: IVerticalStackedBarChartProps) {
    super(props);
    this.state = {
      isCalloutVisible: false,
      selectedLegend: '',
      activeLegend: '',
      refSelected: null,
      dataForHoverCard: 0,
      color: '',
      hoverXValue: '',
      YValueHover: [],
      xCalloutValue: '',
      yCalloutValue: '',
      activeXAxisDataPoint: '',
      calloutLegend: '',
    };
    warnDeprecations(COMPONENT_NAME, props, {
      colors: 'IVSChartDataPoint.color',
      chartLabel: 'use your own title for chart',
    });
    this._handleMouseOut = this._handleMouseOut.bind(this);
    this._calloutId = getId('callout');
    this._tooltipId = getId('VSBCTooltipId_');
    if (this._isChartEmpty()) {
      this._adjustProps();
      this._dataset = this._createDataSetLayer();
    }
    this._createLegendsForLine = memoizeFunction((data: IVerticalStackedChartProps[]) => this._getLineLegends(data));
    this._domainMargin = MIN_DOMAIN_MARGIN;
    this._emptyChartId = getId('_VSBC_empty');
  }

  public componentDidUpdate(prevProps: IVerticalStackedBarChartProps): void {
    if (
      prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width ||
      prevProps.data !== this.props.data
    ) {
      this._adjustProps();
      this._dataset = this._createDataSetLayer();
    }
  }

  public render(): React.ReactNode {
    if (!this._isChartEmpty()) {
      this._adjustProps();
      const _isHavingLines = this.props.data.some(
        (item: IVerticalStackedChartProps) => item.lineData && item.lineData.length > 0,
      );
      const shouldFocusWholeStack = this._toFocusWholeStack(_isHavingLines);
      const { isCalloutForStack = false } = this.props;
      this._dataset = this._createDataSetLayer();
      const legendBars: JSX.Element = this._getLegendData(
        this._points,
        this.props.theme!.palette,
        this._createLegendsForLine(this.props.data),
      );
      this._classNames = getClassNames(this.props.styles!, {
        theme: this.props.theme!,
        href: this.props.href!,
      });
      const calloutProps: IModifiedCartesianChartProps['calloutProps'] = {
        isCalloutVisible: this.state.isCalloutVisible,
        directionalHint: DirectionalHint.topAutoEdge,
        id: `toolTip${this._calloutId}`,
        target: this.state.refSelected,
        isBeakVisible: false,
        gapSpace: 15,
        color: this.state.color,
        legend: this.state.calloutLegend,
        XValue: this.state.xCalloutValue!,
        YValue: this.state.yCalloutValue ? this.state.yCalloutValue : this.state.dataForHoverCard,
        YValueHover: this.state.YValueHover,
        hoverXValue: this.state.hoverXValue,
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
          points={this._dataset}
          chartType={ChartTypes.VerticalStackedBarChart}
          xAxisType={this._xAxisType}
          calloutProps={calloutProps}
          tickParams={tickParams}
          legendBars={legendBars}
          datasetForXAxisDomain={this._xAxisLabels}
          isCalloutForStack={shouldFocusWholeStack}
          barwidth={this._barWidth}
          focusZoneDirection={
            isCalloutForStack || _isHavingLines ? FocusZoneDirection.horizontal : FocusZoneDirection.vertical
          }
          getmargins={this._getMargins}
          getGraphData={this._getGraphData}
          getAxisData={this._getAxisData}
          customizedCallout={this._getCustomizedCallout()}
          onChartMouseLeave={this._handleChartMouseLeave}
          getDomainMargins={this._getDomainMargins}
          supportNegativeValuesForYAxis={true}
          {...(this._xAxisType !== XAxisTypes.NumericAxis && { xAxisInnerPadding: 2 / 3, xAxisOuterPadding: 0 })}
          /* eslint-disable react/jsx-no-bind */
          // eslint-disable-next-line react/no-children-prop
          children={(props: IChildProps) => {
            return (
              <>
                <g>{this._bars}</g>
                <g>
                  {_isHavingLines &&
                    this._createLines(
                      props.xScale!,
                      props.yScale!,
                      props.containerHeight!,
                      props.containerWidth!,
                      props.yScaleSecondary,
                    )}
                </g>
              </>
            );
          }}
        />
      );
    }
    return (
      <div
        id={this._emptyChartId}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }

  /**
   * This function tells us what to focus either the whole stack as focusable item.
   * or each individual item in the stack as focusable item. basically it depends
   * on the prop `isCalloutForStack` if it's false user can focus each individual bar
   * within the bar if it's true then user can focus whole bar as item.
   * but if we have lines in the chart then we force the user to focus only the whole
   * bar, even if isCalloutForStack is false
   */
  private _toFocusWholeStack = (_isHavingLines: boolean): boolean => {
    const { isCalloutForStack = false } = this.props;
    let shouldFocusStackOnly: boolean = false;
    if (_isHavingLines) {
      if (this.state.selectedLegend !== '') {
        shouldFocusStackOnly = false;
      } else {
        shouldFocusStackOnly = true;
      }
    } else {
      shouldFocusStackOnly = isCalloutForStack;
    }
    return shouldFocusStackOnly;
  };

  private _getFormattedLineData = (data: IVerticalStackedChartProps[]): LineObject => {
    const linesData: LinePoint[] = [];
    const formattedLineData: LineObject = {};
    data.forEach((item: IVerticalStackedChartProps, index: number) => {
      if (item.lineData) {
        // injecting corresponding x data point in each of the line data
        // we inject index also , it will be helpful to draw lines when x axis is
        // of string type
        item.lineData.forEach(line => {
          linesData.push({
            ...line,
            index,
            xItem: item,
          });
        });
      }
    });
    linesData.forEach(item => {
      if (formattedLineData[item.legend]) {
        formattedLineData[item.legend].push(item);
      } else {
        formattedLineData[item.legend] = [item];
      }
    });
    return formattedLineData;
  };

  private _getLineLegends = (data: IVerticalStackedChartProps[]): LineLegends[] => {
    const lineObject: LineObject = this._lineObject;
    const lineLegends: LineLegends[] = [];
    Object.keys(lineObject).forEach((item: string) => {
      lineLegends.push({
        title: item,
        color: lineObject[item][0].color,
      });
    });
    return lineLegends;
  };

  private _createLines = (
    xScale: NumericScale,
    yScale: NumericScale,
    containerHeight: number,
    containerWidth: number,
    secondaryYScale?: NumericScale,
  ): JSX.Element => {
    const isNumeric = this._xAxisType === XAxisTypes.NumericAxis;
    const { xBarScale } = this._getScales(containerHeight, containerWidth, isNumeric);
    const lineObject: LineObject = this._getFormattedLineData(this.props.data);
    const lines: React.ReactNode[] = [];
    const borderForLines: React.ReactNode[] = [];
    const dots: React.ReactNode[] = [];
    const { theme } = this.props;
    const lineBorderWidth = this.props.lineOptions?.lineBorderWidth
      ? Number.parseFloat(this.props.lineOptions!.lineBorderWidth!.toString())
      : 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const xScaleBandwidthTranslate = isNumeric ? 0 : (xBarScale as any).bandwidth() / 2;
    Object.keys(lineObject).forEach((item: string, index: number) => {
      const shouldHighlight = this._legendHighlighted(item) || this._noLegendHighlighted(); // item is legend name
      for (let i = 1; i < lineObject[item].length; i++) {
        const x1 = isNumeric
          ? xScale(lineObject[item][i - 1].xItem.xAxisPoint as number)
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (xBarScale as any)(lineObject[item][i - 1].xItem.xAxisPoint as string);
        const useSecondaryYScale =
          lineObject[item][i - 1].useSecondaryYScale && lineObject[item][i].useSecondaryYScale && secondaryYScale;
        const y1 = useSecondaryYScale ? secondaryYScale!(lineObject[item][i - 1].y) : yScale(lineObject[item][i - 1].y);
        const x2 = isNumeric
          ? xScale(lineObject[item][i].xItem.xAxisPoint as number)
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (xBarScale as any)(lineObject[item][i].xItem.xAxisPoint as string);
        const y2 = useSecondaryYScale ? secondaryYScale!(lineObject[item][i].y) : yScale(lineObject[item][i].y);

        if (lineBorderWidth > 0) {
          borderForLines.push(
            <line
              key={`${index}-${i}-BorderLine`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              opacity={shouldHighlight ? 1 : 0.1}
              strokeWidth={3 + lineBorderWidth * 2}
              fill="transparent"
              strokeLinecap="round"
              stroke={theme!.palette.white}
              transform={`translate(${xScaleBandwidthTranslate}, 0)`}
            />,
          );
        }
        lines.push(
          <line
            key={`${index}-${i}-line`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            opacity={shouldHighlight ? 1 : 0.1}
            strokeWidth={3}
            strokeLinecap="round"
            stroke={lineObject[item][i].color}
            transform={`translate(${xScaleBandwidthTranslate}, 0)`}
            {...(this.state.selectedLegend === item && {
              onMouseOver: this._lineHover.bind(this, lineObject[item][i - 1]),
              onMouseLeave: this._lineHoverOut,
            })}
          />,
        );
      }
    });
    Object.keys(lineObject).forEach((item: string, index: number) => {
      lineObject[item].forEach((circlePoint: LinePoint, subIndex: number) => {
        dots.push(
          <circle
            key={`${index}-${subIndex}-dot`}
            cx={
              isNumeric
                ? xScale(circlePoint.xItem.xAxisPoint as number)
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (xBarScale as any)(circlePoint.xItem.xAxisPoint as string)
            }
            cy={
              circlePoint.useSecondaryYScale && secondaryYScale ? secondaryYScale(circlePoint.y) : yScale(circlePoint.y)
            }
            onMouseOver={
              this.state.selectedLegend === item
                ? this._lineHover.bind(this, circlePoint)
                : this._onStackHover.bind(this, circlePoint.xItem)
            }
            {...(this.state.selectedLegend === item && {
              onMouseLeave: this._lineHoverOut,
            })}
            r={this._getCircleVisibilityAndRadius(circlePoint.xItem.xAxisPoint, circlePoint.legend).radius}
            stroke={circlePoint.color}
            fill={this.props.theme!.palette.white}
            strokeWidth={3}
            visibility={this._getCircleVisibilityAndRadius(circlePoint.xItem.xAxisPoint, circlePoint.legend).visibility}
            transform={`translate(${xScaleBandwidthTranslate}, 0)`}
          />,
        );
      });
    });
    return (
      <>
        {borderForLines}
        {lines}
        {dots}
      </>
    );
  };

  private _getCircleVisibilityAndRadius = (
    xAxispoint: string | number,
    legend: string,
  ): { visibility: CircleVisbility; radius: number } => {
    const { selectedLegend, activeXAxisDataPoint } = this.state;
    if (selectedLegend !== '') {
      if (xAxispoint === activeXAxisDataPoint && selectedLegend === legend) {
        return { visibility: CircleVisbility.show, radius: 8 };
      } else if (selectedLegend === legend) {
        return { visibility: CircleVisbility.show, radius: 0.3 };
      } else {
        return { visibility: CircleVisbility.hide, radius: 0 };
      }
    } else {
      return {
        visibility: activeXAxisDataPoint === xAxispoint ? CircleVisbility.show : CircleVisbility.hide,
        radius: 8,
      };
    }
  };

  private _adjustProps(): void {
    this._points = this.props.data || [];
    this._barWidth = this.props.barWidth || 16;
    const { theme } = this.props;
    const { palette } = theme!;
    // eslint-disable-next-line deprecation/deprecation
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    this._xAxisType = getTypeOfAxis(this.props.data[0].xAxisPoint, true) as XAxisTypes;
    this._lineObject = this._getFormattedLineData(this.props.data);
  }

  private _createDataSetLayer(): IDataPoint[] {
    const tempArr: string[] = [];
    const dataset: IDataPoint[] = this._points.map(singlePointData => {
      let total: number = 0;
      singlePointData.chartData!.forEach((point: IVSChartDataPoint) => {
        total = total + point.data;
      });
      tempArr.push(singlePointData.xAxisPoint as string);
      return {
        x: singlePointData.xAxisPoint,
        y: total,
      };
    });
    this._xAxisLabels = tempArr;
    return dataset;
  }

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  private _renderCallout(props?: IVSChartDataPoint): JSX.Element | null {
    return props ? (
      <ChartHoverCard
        XValue={props.xAxisCalloutData}
        Legend={props.legend}
        YValue={props.yAxisCalloutData}
        color={props.color}
        culture={this.props.culture}
      />
    ) : null;
  }

  private _getCustomizedCallout = () => {
    const _isHavingLines = this.props.data.some(
      (item: IVerticalStackedChartProps) => item.lineData && item.lineData.length > 0,
    );
    return this.props.onRenderCalloutPerStack
      ? this.props.onRenderCalloutPerStack(this.state.stackCalloutProps)
      : this.props.onRenderCalloutPerDataPoint && !_isHavingLines
      ? this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps, this._renderCallout)
      : null;
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

  private _getLegendData(
    data: IVerticalStackedChartProps[],
    palette: IPalette,
    lineLegends: LineLegends[],
  ): JSX.Element {
    if (this.props.hideLegend) {
      return <></>;
    }
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const actions: ILegend[] = [];
    const { allowHoverOnLegend = true } = this.props;

    data.forEach((singleChartData: IVerticalStackedChartProps) => {
      singleChartData.chartData.forEach((point: IVSChartDataPoint) => {
        const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
        const checkSimilarLegends = actions.filter((leg: ILegend) => leg.title === point.legend && leg.color === color);
        if (checkSimilarLegends!.length > 0) {
          return;
        }

        const legend: ILegend = {
          title: point.legend,
          color: color,
          action: () => {
            this._onLegendClick(point.legend);
          },
          hoverAction: allowHoverOnLegend
            ? () => {
                this._handleChartMouseLeave();
                this._onLegendHover(point.legend);
              }
            : undefined,
          onMouseOutAction: allowHoverOnLegend ? () => this._onLegendLeave() : undefined,
        };

        actions.push(legend);
      });
    });
    const legendsOfLine: ILegend[] = [];
    if (lineLegends && lineLegends.length > 0) {
      lineLegends.forEach((point: LineLegends) => {
        const legend: ILegend = {
          title: point.title,
          color: point.color,
          isLineLegendInBarChart: true,
          action: () => {
            this._onLegendClick(point.title);
          },
          hoverAction: allowHoverOnLegend
            ? () => {
                this._handleChartMouseLeave();
                this._onLegendHover(point.title);
              }
            : undefined,
          onMouseOutAction: allowHoverOnLegend ? () => this._onLegendLeave() : undefined,
        };
        legendsOfLine.push(legend);
      });
    }
    const totalLegends: ILegend[] = legendsOfLine.concat(actions);
    return (
      <Legends
        legends={totalLegends}
        overflowProps={this.props.legendsOverflowProps}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        overflowText={this.props.legendsOverflowText}
        {...this.props.legendProps}
      />
    );
  }

  private _onRectHover(
    xAxisPoint: string,
    point: IVSChartDataPoint,
    color: string,
    mouseEvent: React.MouseEvent<SVGElement>,
  ): void {
    mouseEvent.persist();
    this._onRectFocusHover(xAxisPoint, point, color, mouseEvent);
  }

  private _onRectFocusHover(
    xAxisPoint: string,
    point: IVSChartDataPoint,
    color: string,
    refSelected: React.MouseEvent<SVGElement> | SVGGElement,
  ): void {
    if (this._calloutAnchorPoint?.chartDataPoint !== point || this._calloutAnchorPoint?.xAxisDataPoint !== xAxisPoint) {
      this._calloutAnchorPoint = {
        chartDataPoint: point,
        xAxisDataPoint: xAxisPoint,
      };
      this.setState({
        refSelected,
        /**
         * Show the callout if highlighted bar is focused/hovered
         * and Hide it if unhighlighted bar is focused/hovered
         */
        isCalloutVisible: this.state.selectedLegend === '' || this.state.selectedLegend === point.legend,
        calloutLegend: point.legend,
        dataForHoverCard: point.data,
        color,
        xCalloutValue: point.xAxisCalloutData ? point.xAxisCalloutData : xAxisPoint,
        yCalloutValue: point.yAxisCalloutData,
        dataPointCalloutProps: point,
        callOutAccessibilityData: point.callOutAccessibilityData,
      });
    }
  }

  private _lineHover = (lineData: LinePoint, mouseEvent: React.MouseEvent<SVGElement>) => {
    mouseEvent.persist();
    this.setState({
      refSelected: mouseEvent,
      isCalloutVisible: true,
      xCalloutValue: `${lineData.xItem.xAxisPoint}`,
      yCalloutValue: `${lineData.yAxisCalloutData || lineData.data || lineData.y}`,
      activeXAxisDataPoint: lineData.xItem.xAxisPoint,
      color: lineData.color,
    });
  };

  private _lineHoverOut = () => {
    this.setState({
      refSelected: null,
      isCalloutVisible: false,
      xCalloutValue: '',
      yCalloutValue: '',
      activeXAxisDataPoint: '',
      color: '',
    });
  };

  private _onStackHover(stack: IVerticalStackedChartProps, mouseEvent: React.MouseEvent<SVGElement>): void {
    mouseEvent.persist();
    this._onStackHoverFocus(stack, mouseEvent);
  }

  private _onStackHoverFocus(
    stack: IVerticalStackedChartProps,
    refSelected: React.MouseEvent<SVGElement> | SVGGElement,
  ): void {
    const lineData = stack.lineData;
    const isLinesPresent: boolean = lineData !== undefined && lineData.length > 0;
    if (isLinesPresent) {
      lineData!.forEach((item: ILineDataInVerticalStackedBarChart & { shouldDrawBorderBottom?: boolean }) => {
        item.data = item.data || item.y;
        item.shouldDrawBorderBottom = true;
      });
    }
    this.setState({
      refSelected,
      isCalloutVisible: true,
      YValueHover: isLinesPresent
        ? [...lineData!.sort((a, b) => (a.data! < b.data! ? 1 : -1)), ...stack.chartData.slice().reverse()]
        : stack.chartData.slice().reverse(),
      hoverXValue: stack.xAxisPoint,
      stackCalloutProps: stack,
      activeXAxisDataPoint: stack.xAxisPoint,
      callOutAccessibilityData: stack.stackCallOutAccessibilityData,
    });
  }

  private _onRectFocus(point: IVSChartDataPoint, xAxisPoint: string, color: string, ref: IRefArrayData): void {
    if (ref.refElement) {
      this._onRectFocusHover(xAxisPoint, point, color, ref.refElement);
    }
  }

  private _onStackFocus(stack: IVerticalStackedChartProps, groupRef: IRefArrayData): void {
    if (groupRef.refElement) {
      this._onStackHoverFocus(stack, groupRef.refElement);
    }
  }

  private _handleMouseOut = (): void => {
    /**/
  };

  private _handleChartMouseLeave = (): void => {
    this._calloutAnchorPoint = null;
    this.setState({
      isCalloutVisible: false,
      activeXAxisDataPoint: '',
    });
  };

  private _onClick(
    data: IVerticalStackedChartProps | IVSChartDataPoint,
    mouseEvent: React.MouseEvent<SVGElement>,
  ): void {
    this.props.onBarClick?.(mouseEvent, data);
    this.props.href ? (window.location.href = this.props.href) : '';
  }

  private _getBarGapAndScale(
    bars: IVSChartDataPoint[],
    yBarScale: NumericScale,
    defaultTotalHeight?: number,
  ): {
    readonly gapHeight: number;
    readonly heightValueScale: number;
  } {
    const { barGapMax = 0 } = this.props;

    // When displaying gaps between the bars, the height of each bar is
    // adjusted so that the total of all bars is not changed by the gaps
    const totalData = bars.reduce((iter, value) => iter + value.data, 0);
    const totalHeight = defaultTotalHeight ?? yBarScale(totalData);
    const gaps = barGapMax && bars.length - 1;
    const gapHeight = gaps && Math.max(barGapMin, Math.min(barGapMax, (totalHeight * barGapMultiplier) / gaps));
    const heightValueScale = (totalHeight - gapHeight * gaps) / totalData;

    return {
      gapHeight,
      heightValueScale,
    } as const;
  }

  private _createBar = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xBarScale: any,
    yBarScale: NumericScale,
    containerHeight: number,
    xElement: SVGElement,
  ): JSX.Element[] => {
    const { barCornerRadius = 0, barMinimumHeight = 0 } = this.props;
    const _isHavingLines = this.props.data.some(
      (item: IVerticalStackedChartProps) => item.lineData && item.lineData.length > 0,
    );
    const shouldFocusWholeStack = this._toFocusWholeStack(_isHavingLines);

    const bars = this._points.map((singleChartData: IVerticalStackedChartProps, indexNumber: number) => {
      let yPoint = containerHeight - this.margins.bottom!;
      const xPoint = xBarScale(
        this._xAxisType === XAxisTypes.NumericAxis
          ? (singleChartData.xAxisPoint as number)
          : (singleChartData.xAxisPoint as string),
      );
      const xScaleBandwidthTranslate =
        this._xAxisType === XAxisTypes.NumericAxis ? 0 : (xBarScale.bandwidth() - this._barWidth) / 2;
      let barTotalValue = 0;

      // Removing datapoints with zero data
      const barsToDisplay = singleChartData.chartData.filter(point => point.data !== 0);

      if (!barsToDisplay.length) {
        return undefined;
      }

      const { gapHeight, heightValueScale } = this._getBarGapAndScale(barsToDisplay, yBarScale);

      // if (heightValueScale < 0) {
      //   return undefined;
      // }

      const singleBar = barsToDisplay.map((point: IVSChartDataPoint, index: number) => {
        const color = point.color ? point.color : this._colors[index];
        const ref: IRefArrayData = {};

        const shouldHighlight = this._legendHighlighted(point.legend) || this._noLegendHighlighted() ? true : false;
        this._classNames = getClassNames(this.props.styles!, {
          theme: this.props.theme!,
          shouldHighlight: shouldHighlight,
          href: this.props.href,
        });
        const rectFocusProps = !shouldFocusWholeStack && {
          'data-is-focusable': !this.props.hideTooltip,
          'aria-label': this._getAriaLabel(singleChartData, point),
          onMouseOver: this._onRectHover.bind(this, singleChartData.xAxisPoint, point, color),
          onMouseMove: this._onRectHover.bind(this, singleChartData.xAxisPoint, point, color),
          onMouseLeave: this._handleMouseOut,
          onFocus: this._onRectFocus.bind(this, point, singleChartData.xAxisPoint, color, ref),
          onBlur: this._handleMouseOut,
          onClick: this._onClick.bind(this, point),
          role: 'img',
        };

        let barHeight = heightValueScale * point.data;
        if (barHeight < Math.max(heightValueScale * Math.ceil((this._yMax - this._yMin) / 100.0), barMinimumHeight)) {
          barHeight = Math.max(heightValueScale * Math.ceil((this._yMax - this._yMin) / 100.0), barMinimumHeight);
        }
        yPoint = yPoint - barHeight - (index ? gapHeight : 0);
        barTotalValue += point.data;
        console.log(this._yMax, this._yMin, barHeight);

        // If set, apply the corner radius to the top of the final bar
        if (barCornerRadius && barHeight > barCornerRadius && index === barsToDisplay.length - 1) {
          return (
            <path
              key={index + indexNumber + `${shouldFocusWholeStack}`}
              className={this._classNames.opacityChangeOnHover}
              d={`
                M ${xPoint} ${yPoint + barCornerRadius}
                a ${barCornerRadius} ${barCornerRadius} 0 0 1 ${barCornerRadius} ${-barCornerRadius}
                h ${this._barWidth - 2 * barCornerRadius}
                a ${barCornerRadius} ${barCornerRadius} 0 0 1 ${barCornerRadius} ${barCornerRadius}
                v ${barHeight - barCornerRadius}
                h ${-this._barWidth}
                z
              `}
              fill={color}
              ref={e => (ref.refElement = e)}
              transform={`translate(${xScaleBandwidthTranslate}, 0)`}
              {...rectFocusProps}
            />
          );
        }
        if (barHeight === 0) {
          return <React.Fragment key={index + indexNumber}> </React.Fragment>;
        }
        return (
          <rect
            key={index + indexNumber}
            className={this._classNames.opacityChangeOnHover}
            x={xPoint}
            y={yPoint}
            width={this._barWidth}
            height={barHeight}
            fill={color}
            ref={e => (ref.refElement = e)}
            {...rectFocusProps}
            transform={`translate(${xScaleBandwidthTranslate}, 0)`}
          />
        );
      });
      const groupRef: IRefArrayData = {};
      const stackFocusProps = shouldFocusWholeStack && {
        'data-is-focusable': !this.props.hideTooltip,
        'aria-label': this._getAriaLabel(singleChartData),
        onMouseOver: this._onStackHover.bind(this, singleChartData),
        onMouseMove: this._onStackHover.bind(this, singleChartData),
        onMouseLeave: this._handleMouseOut,
        onFocus: this._onStackFocus.bind(this, singleChartData, groupRef),
        onBlur: this._handleMouseOut,
        onClick: this._onClick.bind(this, singleChartData),
        role: 'img',
      };
      let showLabel = false;
      let barLabel = 0;
      if (!this.props.hideLabels) {
        if (this._noLegendHighlighted()) {
          showLabel = true;
          barLabel = barTotalValue;
        } else {
          barsToDisplay.forEach(point => {
            if (this._legendHighlighted(point.legend)) {
              showLabel = true;
              barLabel += point.data;
            }
          });
        }
      }
      return (
        <g key={indexNumber + `${shouldFocusWholeStack}`}>
          <g id={`${indexNumber}-singleBar`} ref={e => (groupRef.refElement = e)} {...stackFocusProps}>
            {singleBar}
          </g>
          {!this.props.hideLabels && this._barWidth >= 16 && showLabel && (
            <text
              x={xPoint + this._barWidth / 2}
              y={yPoint - 6}
              textAnchor="middle"
              className={this._classNames.barLabel}
              aria-label={`Total: ${barLabel}`}
              role="img"
              transform={`translate(${xScaleBandwidthTranslate}, 0)`}
            >
              {formatValueWithSIPrefix(barLabel)}
            </text>
          )}
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
    return bars.filter((bar): bar is JSX.Element => !!bar);
  };

  private _getScales = (containerHeight: number, containerWidth: number, isNumeric: boolean) => {
    const yMax = this._yMax;
    const yMin = this._yMin;
    const yBarScale = d3ScaleLinear()
      .domain([yMin, yMax])
      .range([0, containerHeight - this.margins.bottom! - this.margins.top!]);
    if (isNumeric) {
      const xMax = d3Max(this._dataset, (point: IDataPoint) => point.x as number)!;
      const xMin = d3Min(this._dataset, (point: IDataPoint) => point.x as number)!;

      const xBarScale = d3ScaleLinear()
        .domain(this._isRtl ? [xMax, xMin] : [xMin, xMax])
        .nice()
        .range([
          this.margins.left! + this._domainMargin,
          containerWidth - this.margins.right! - this._barWidth - this._domainMargin,
        ]);

      return { xBarScale, yBarScale };
    } else {
      const xBarScale = d3ScaleBand()
        .domain(this._xAxisLabels)
        .range([this.margins.left! + this._domainMargin, containerWidth - this.margins.right! - this._domainMargin])
        .paddingInner(2 / 3);

      return { xBarScale, yBarScale };
    }
  };

  private _createNumericBars = (
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement,
  ): JSX.Element[] => {
    const { xBarScale, yBarScale } = this._getScales(containerHeight, containerWidth, true);

    return this._createBar(xBarScale, yBarScale, containerHeight, xElement);
  };

  private _createStringBars = (
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement,
  ): JSX.Element[] => {
    const { xBarScale, yBarScale } = this._getScales(containerHeight, containerWidth, false);

    return this._createBar(xBarScale, yBarScale, containerHeight, xElement);
  };

  private _getGraphData = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale: any,
    yScale: NumericAxis,
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement | null,
  ) => {
    return (this._bars =
      this._xAxisType === XAxisTypes.NumericAxis
        ? this._createNumericBars(containerHeight, containerWidth, xElement!)
        : this._createStringBars(containerHeight, containerWidth, xElement!));
  };

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };

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

  private _getAriaLabel = (singleChartData: IVerticalStackedChartProps, point?: IVSChartDataPoint): string => {
    if (!point) {
      /** if shouldFocusWholeStack is true */
      const xValue = singleChartData.xAxisCalloutData || singleChartData.xAxisPoint;
      const pointValues = singleChartData.chartData
        .map(pt => {
          const legend = pt.legend;
          const yValue = pt.yAxisCalloutData || pt.data;
          return `${legend}, ${yValue}.`;
        })
        .join(' ');
      const lineValues = singleChartData.lineData
        ?.map(ln => {
          const legend = ln.legend;
          const yValue = ln.yAxisCalloutData || ln.data || ln.y;
          return `${legend}, ${yValue}.`;
        })
        .join(' ');
      return (
        singleChartData.stackCallOutAccessibilityData?.ariaLabel ||
        `${xValue}. ${pointValues}` + (lineValues ? ` ${lineValues}` : '')
      );
    }
    /** if shouldFocusWholeStack is false */
    const xValue = singleChartData.xAxisCalloutData || point.xAxisCalloutData || singleChartData.xAxisPoint;
    const legend = point.legend;
    const yValue = point.yAxisCalloutData || point.data;
    return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ${legend}, ${yValue}.`;
  };

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

  private _isChartEmpty(): boolean {
    return !(
      this.props.data &&
      this.props.data.length > 0 &&
      this.props.data.filter(item => item.chartData.length === 0).length === 0
    );
  }
}
