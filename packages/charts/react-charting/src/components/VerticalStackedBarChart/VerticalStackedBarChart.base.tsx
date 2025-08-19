import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { select as d3Select } from 'd3-selection';
import {
  scaleLinear as d3ScaleLinear,
  ScaleLinear as D3ScaleLinear,
  scaleBand as d3ScaleBand,
  scaleUtc as d3ScaleUtc,
  scaleTime as d3ScaleTime,
  ScaleBand,
} from 'd3-scale';
import {
  classNamesFunction,
  getId,
  getRTL,
  warnDeprecations,
  memoizeFunction,
  initializeComponentRef,
} from '@fluentui/react/lib/Utilities';
import { IPalette, IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { ILegend, ILegendContainer, Legends } from '../Legends/index';
import {
  IAccessibilityProps,
  CartesianChart,
  ChartHoverCard,
  IBasestate,
  IChildProps,
  IVerticalStackedBarDataPoint,
  IMargins,
  IVerticalStackedBarChartProps,
  IVerticalStackedBarChartStyleProps,
  IVerticalStackedBarChartStyles,
  IVerticalStackedChartProps,
  IVSChartDataPoint,
  ILineDataInVerticalStackedBarChart,
  IModifiedCartesianChartProps,
  IDataPoint,
} from '../../index';
import { FocusZoneDirection } from '@fluentui/react-focus';
import { formatDateToLocaleString } from '@fluentui/chart-utilities';
import {
  ChartTypes,
  IAxisData,
  getAccessibleDataObject,
  XAxisTypes,
  getTypeOfAxis,
  tooltipOfAxislabels,
  formatScientificLimitWidth,
  getBarWidth,
  getScalePadding,
  isScalePaddingDefined,
  calculateAppropriateBarWidth,
  findVSBCNumericMinMaxOfY,
  createNumericYAxis,
  IDomainNRange,
  domainRangeOfDateForAreaLineScatterVerticalBarCharts,
  domainRangeOfVSBCNumeric,
  domainRangeOfXStringAxis,
  createStringYAxis,
  getNextGradient,
  areArraysEqual,
  calculateLongestLabelWidth,
  YAxisType,
  sortAxisCategories,
  calcTotalWidth,
  calcBandwidth,
  calcRequiredWidth,
} from '../../utilities/index';
import { IChart, IImageExportOptions } from '../../types/index';
import { toImage } from '../../utilities/image-export-utils';

const getClassNames = classNamesFunction<IVerticalStackedBarChartStyleProps, IVerticalStackedBarChartStyles>();
type NumericScale = D3ScaleLinear<number, number>;
type StringScale = ScaleBand<string>;
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

type CalloutAnchorPointData = {
  xAxisDataPoint: string;
  chartDataPoint: IVSChartDataPoint;
};

export interface IVerticalStackedBarChartState extends IBasestate {
  dataPointCalloutProps?: IVSChartDataPoint;
  stackCalloutProps?: IVerticalStackedChartProps;
  activeXAxisDataPoint: number | string | Date;
  callOutAccessibilityData?: IAccessibilityProps;
  calloutLegend: string;
  selectedLegends: string[];
}
export class VerticalStackedBarChartBase
  extends React.Component<IVerticalStackedBarChartProps, IVerticalStackedBarChartState>
  implements IChart
{
  public static defaultProps: Partial<IVerticalStackedBarChartProps> = {
    maxBarWidth: 24,
    useUTC: true,
    xAxisCategoryOrder: 'default',
    yAxisCategoryOrder: 'default',
  };

  private _points: IVerticalStackedChartProps[];
  private _dataset: IVerticalStackedBarDataPoint[];
  private _xAxisLabels: string[];
  // eslint-disable-next-line @typescript-eslint/no-deprecated
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
  private _xAxisInnerPadding: number;
  private _xAxisOuterPadding: number;
  private _cartesianChartRef: React.RefObject<IChart>;
  private _legendsRef: React.RefObject<ILegendContainer>;
  private readonly Y_ORIGIN: number = 0;
  private _yAxisType: YAxisType;
  private _yAxisLabels: string[] = [];

  public constructor(props: IVerticalStackedBarChartProps) {
    super(props);

    initializeComponentRef(this);

    this.state = {
      isCalloutVisible: false,
      selectedLegends: props.legendProps?.selectedLegends || [],
      activeLegend: undefined,
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
    if (!this._isChartEmpty()) {
      this._adjustProps();
      this._dataset = this._createDataSetLayer();
    }
    this._createLegendsForLine = memoizeFunction((data: IVerticalStackedChartProps[]) => this._getLineLegends(data));
    this._emptyChartId = getId('_VSBC_empty');
    this._domainMargin = MIN_DOMAIN_MARGIN;
    this._cartesianChartRef = React.createRef();
    this._legendsRef = React.createRef();
  }

  public componentDidUpdate(prevProps: IVerticalStackedBarChartProps): void {
    if (!areArraysEqual(prevProps.legendProps?.selectedLegends, this.props.legendProps?.selectedLegends)) {
      this.setState({
        selectedLegends: this.props.legendProps?.selectedLegends || [],
      });
    }

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
      // eslint-disable-next-line @typescript-eslint/no-deprecated
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
          chartTitle={this._getChartTitle()}
          points={this._dataset}
          chartType={ChartTypes.VerticalStackedBarChart}
          xAxisType={this._xAxisType}
          calloutProps={calloutProps}
          createYAxis={createNumericYAxis}
          tickParams={tickParams}
          legendBars={legendBars}
          getMinMaxOfYAxis={this._getMinMaxOfYAxis}
          datasetForXAxisDomain={this._xAxisLabels}
          isCalloutForStack={shouldFocusWholeStack}
          getDomainNRangeValues={this._getDomainNRangeValues}
          createStringYAxis={createStringYAxis}
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
          {...(this._xAxisType === XAxisTypes.StringAxis && {
            xAxisInnerPadding: this._xAxisInnerPadding,
            xAxisOuterPadding: this._xAxisOuterPadding,
          })}
          ref={this._cartesianChartRef}
          showRoundOffXTickValues={!isScalePaddingDefined(this.props.xAxisInnerPadding, this.props.xAxisPadding)}
          yAxisType={this._yAxisType}
          stringDatasetForYAxisDomain={['', ...this._yAxisLabels]}
          getYDomainMargins={this._getYDomainMargins}
          /* eslint-disable react/jsx-no-bind */
          children={(props: IChildProps) => {
            return (
              <>
                <g>{this._bars}</g>
                <g>
                  {_isHavingLines &&
                    this._createLines(
                      props.xScale!,
                      props.yScalePrimary!,
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

  public get chartContainer(): HTMLElement | null {
    return this._cartesianChartRef.current?.chartContainer || null;
  }

  public toImage = (opts?: IImageExportOptions): Promise<string> => {
    return toImage(this._cartesianChartRef.current?.chartContainer, this._legendsRef.current?.toSVG, this._isRtl, opts);
  };

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
      if (this._getHighlightedLegend().length === 1) {
        shouldFocusStackOnly = false;
      } else {
        shouldFocusStackOnly = true;
      }
    } else {
      shouldFocusStackOnly = isCalloutForStack;
    }
    return shouldFocusStackOnly;
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
      domainNRangeValue = domainRangeOfVSBCNumeric(points, margins, width, isRTL, barWidth!);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale: any,
    yScalePrimary: NumericScale | StringScale,
    containerHeight: number,
    containerWidth: number,
    yScaleSecondary?: NumericScale,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
  ): JSX.Element => {
    const lineObject: LineObject = this._getFormattedLineData(this.props.data);
    const lines: React.ReactNode[] = [];
    const borderForLines: React.ReactNode[] = [];
    const dots: React.ReactNode[] = [];
    const { theme } = this.props;
    const lineBorderWidth = this.props.lineOptions?.lineBorderWidth
      ? Number.parseFloat(this.props.lineOptions!.lineBorderWidth!.toString())
      : 0;

    const xScaleBandwidthTranslate = this._xAxisType !== XAxisTypes.StringAxis ? 0 : xScale.bandwidth() / 2;
    Object.keys(lineObject).forEach((item: string, index: number) => {
      const shouldHighlight = this._isLegendHighlighted(item) || this._noLegendHighlighted(); // item is legend name
      for (let i = 1; i < lineObject[item].length; i++) {
        const x1 = xScale(lineObject[item][i - 1].xItem.xAxisPoint);
        const useSecondaryYScale =
          lineObject[item][i - 1].useSecondaryYScale && lineObject[item][i].useSecondaryYScale && yScaleSecondary;
        const y1 = useSecondaryYScale
          ? yScaleSecondary!(lineObject[item][i - 1].y as number)
          : //eslint-disable-next-line @typescript-eslint/no-explicit-any
            yScalePrimary(lineObject[item][i - 1].y as any);
        const x2 = xScale(lineObject[item][i].xItem.xAxisPoint);
        const y2 = useSecondaryYScale
          ? yScaleSecondary!(lineObject[item][i].y as number)
          : //eslint-disable-next-line @typescript-eslint/no-explicit-any
            yScalePrimary(lineObject[item][i].y as any);
        const yScaleBandwidthTranslate =
          !useSecondaryYScale && this._yAxisType === YAxisType.StringAxis
            ? (yScalePrimary as StringScale).bandwidth() / 2
            : 0;

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
              stroke={theme!.semanticColors.bodyBackground}
              transform={`translate(${xScaleBandwidthTranslate}, ${yScaleBandwidthTranslate})`}
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
            strokeWidth={lineObject[item][0].lineOptions?.strokeWidth ?? 3}
            strokeLinecap={lineObject[item][0].lineOptions?.strokeLinecap ?? 'round'}
            strokeDasharray={lineObject[item][0].lineOptions?.strokeDasharray}
            stroke={lineObject[item][i].color}
            transform={`translate(${xScaleBandwidthTranslate}, ${yScaleBandwidthTranslate})`}
            onMouseOver={this._lineHover.bind(this, lineObject[item][i - 1])}
            onMouseLeave={this._handleMouseOut}
          />,
        );
      }
    });
    Object.keys(lineObject).forEach((item: string, index: number) => {
      lineObject[item].forEach((circlePoint: LinePoint, subIndex: number) => {
        // Create an object to store line point ref so that the object can be passed by reference to the focus handler
        const circleRef: { refElement: SVGCircleElement | null } = { refElement: null };
        const noBarsActive =
          circlePoint.xItem.chartData.filter(
            dataPoint => this._noLegendHighlighted() || this._isLegendHighlighted(dataPoint.legend),
          ).length === 0;
        const yScaleBandwidthTranslate =
          !circlePoint.useSecondaryYScale && this._yAxisType === YAxisType.StringAxis
            ? (yScalePrimary as StringScale).bandwidth() / 2
            : 0;
        dots.push(
          <circle
            key={`${index}-${subIndex}-dot`}
            cx={xScale(circlePoint.xItem.xAxisPoint)}
            cy={
              circlePoint.useSecondaryYScale && yScaleSecondary
                ? yScaleSecondary(circlePoint.y as number)
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  yScalePrimary(circlePoint.y as any)
            }
            onMouseOver={this._lineHover.bind(this, circlePoint)}
            onMouseLeave={this._handleMouseOut}
            r={this._getCircleOpacityAndRadius(circlePoint.xItem.xAxisPoint, circlePoint.legend).radius}
            stroke={circlePoint.color}
            fill={this.props.theme!.semanticColors.bodyBackground}
            strokeWidth={3}
            // Elements with visibility: hidden cannot receive focus, so use opacity: 0 instead to hide them.
            // For more information, see https://fuzzbomb.github.io/accessibility-demos/visually-hidden-focus-test.html
            opacity={this._getCircleOpacityAndRadius(circlePoint.xItem.xAxisPoint, circlePoint.legend).opacity}
            transform={`translate(${xScaleBandwidthTranslate}, ${yScaleBandwidthTranslate})`}
            ref={e => (circleRef.refElement = e)}
            {...(noBarsActive && (this._noLegendHighlighted() || this._isLegendHighlighted(item))
              ? {
                  'data-is-focusable': !this.props.hideTooltip,
                  onFocus: this._lineFocus.bind(this, circlePoint, circleRef),
                  onBlur: this._handleMouseOut,
                  role: 'img',
                  'aria-label': this._getAriaLabel(circlePoint.xItem, circlePoint, true),
                }
              : {})}
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

  private _getCircleOpacityAndRadius = (
    xAxisPoint: string | number | Date,
    legend: string,
  ): { opacity: number; radius: number } => {
    const { activeXAxisDataPoint } = this.state;
    if (!this._noLegendHighlighted()) {
      if (xAxisPoint === activeXAxisDataPoint && this._isLegendHighlighted(legend)) {
        return { opacity: 1, radius: 8 };
      } else if (this._isLegendHighlighted(legend)) {
        return { opacity: 1, radius: 0.3 };
      } else {
        return { opacity: 0, radius: 0 };
      }
    } else {
      return {
        opacity: activeXAxisDataPoint === xAxisPoint ? 1 : 0,
        radius: 8,
      };
    }
  };

  private _adjustProps(): void {
    this._points = this.props.data || [];
    this._barWidth = getBarWidth(this.props.barWidth, this.props.maxBarWidth);
    const { theme } = this.props;
    const { palette } = theme!;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    this._xAxisType = getTypeOfAxis(this.props.data[0].xAxisPoint, true) as XAxisTypes;
    this._lineObject = this._getFormattedLineData(this.props.data);
    this._xAxisInnerPadding = getScalePadding(
      this.props.xAxisInnerPadding,
      this.props.xAxisPadding,
      this._xAxisType === XAxisTypes.StringAxis ? 2 / 3 : 1 / 2,
    );
    this._xAxisOuterPadding = getScalePadding(this.props.xAxisOuterPadding, this.props.xAxisPadding, 0);
    this._initYAxisParams();
  }

  private _createDataSetLayer(): IVerticalStackedBarDataPoint[] {
    const dataset: IVerticalStackedBarDataPoint[] = this._points.map(singlePointData => {
      if (this._yAxisType === YAxisType.StringAxis) {
        return {
          x: singlePointData.xAxisPoint,
          y: 0,
        };
      }
      let total: number = 0;
      singlePointData.chartData!.forEach((point: IVSChartDataPoint) => {
        total = total + (point.data as number);
      });
      return {
        x: singlePointData.xAxisPoint,
        y: total,
      };
    });
    this._xAxisLabels = this._getOrderedXAxisLabels();
    return dataset;
  }

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  // eslint-disable-next-line @typescript-eslint/no-deprecated
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

  private _getLegendData(
    data: IVerticalStackedChartProps[],
    palette: IPalette,
    lineLegends: LineLegends[],
    // eslint-disable-next-line @typescript-eslint/no-deprecated
  ): JSX.Element {
    if (this.props.hideLegend) {
      return <></>;
    }
    const defaultPalette: string[] = [palette.blueLight, palette.blue, palette.blueMid, palette.red, palette.black];
    const actions: ILegend[] = [];
    const { allowHoverOnLegend = true, theme } = this.props;

    data.forEach((singleChartData: IVerticalStackedChartProps) => {
      singleChartData.chartData.forEach((point: IVSChartDataPoint) => {
        let color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
        if (this.props.enableGradient) {
          const pointIndex = Math.max(
            singleChartData.chartData?.findIndex(item => item.legend === point.legend) || 0,
            0,
          );
          color = point.gradient?.[0] || getNextGradient(pointIndex, 0, theme?.isInverted)[0];
        }

        const checkSimilarLegends = actions.filter((leg: ILegend) => leg.title === point.legend && leg.color === color);
        if (checkSimilarLegends!.length > 0) {
          return;
        }

        const legend: ILegend = {
          title: point.legend,
          color,
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
        onChange={this._onLegendSelectionChange.bind(this)}
        ref={this._legendsRef}
      />
    );
  }

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

  private _getHighlightedLegend() {
    return this.state.selectedLegends.length > 0
      ? this.state.selectedLegends
      : this.state.activeLegend
      ? [this.state.activeLegend]
      : [];
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
    xAxisPoint: string | Date | number,
    point: IVSChartDataPoint,
    color: string,
    refSelected: React.MouseEvent<SVGElement> | SVGGElement,
  ): void {
    if (this._calloutAnchorPoint?.chartDataPoint !== point || this._calloutAnchorPoint?.xAxisDataPoint !== xAxisPoint) {
      this._calloutAnchorPoint = {
        chartDataPoint: point,
        xAxisDataPoint:
          xAxisPoint instanceof Date
            ? formatDateToLocaleString(xAxisPoint, this.props.culture, this.props.useUTC)
            : xAxisPoint.toString(),
      };
      const xCalloutValue =
        point.xAxisCalloutData ||
        (xAxisPoint instanceof Date
          ? formatDateToLocaleString(xAxisPoint, this.props.culture, this.props.useUTC)
          : xAxisPoint.toString());

      this.setState({
        refSelected,
        /**
         * Show the callout if highlighted bar is focused/hovered
         * and Hide it if unhighlighted bar is focused/hovered
         */
        isCalloutVisible: this._noLegendHighlighted() || this._isLegendHighlighted(point.legend),
        calloutLegend: point.legend,
        dataForHoverCard: point.data,
        color,
        xCalloutValue,
        yCalloutValue: point.yAxisCalloutData,
        dataPointCalloutProps: point,
        callOutAccessibilityData: point.callOutAccessibilityData,
      });
    }
  }

  private _lineHover = (lineData: LinePoint, mouseEvent: React.MouseEvent<SVGElement>) => {
    mouseEvent.persist();
    this._lineHoverFocus(lineData, mouseEvent);
  };

  private _lineFocus = (lineData: LinePoint, ref: { refElement: SVGCircleElement | null }) => {
    if (ref.refElement) {
      this._lineHoverFocus(lineData, ref.refElement);
    }
  };

  private _lineHoverFocus = (lineData: LinePoint, refSelected: React.MouseEvent<SVGElement> | SVGCircleElement) => {
    if (this._getHighlightedLegend().length === 1) {
      if (this._noLegendHighlighted() || this._isLegendHighlighted(lineData.legend)) {
        this.setState({
          refSelected,
          isCalloutVisible: true,
          xCalloutValue: `${lineData.xItem.xAxisPoint}`,
          yCalloutValue: `${lineData.yAxisCalloutData || lineData.data || lineData.y}`,
          activeXAxisDataPoint: lineData.xItem.xAxisPoint,
          color: lineData.color,
        });
      }
    } else {
      this._onStackHoverFocus(lineData.xItem, refSelected);
    }
  };

  private _onStackHover(stack: IVerticalStackedChartProps, mouseEvent: React.MouseEvent<SVGElement>): void {
    mouseEvent.persist();
    this._onStackHoverFocus(stack, mouseEvent);
  }

  private _onStackHoverFocus(
    stack: IVerticalStackedChartProps,
    refSelected: React.MouseEvent<SVGElement> | SVGGElement,
  ): void {
    if (!this._noLegendHighlighted()) {
      stack = {
        ...stack,
        chartData: stack.chartData.filter(dataPoint => this._isLegendHighlighted(dataPoint.legend)),
        lineData: stack.lineData?.filter(dataPoint => this._isLegendHighlighted(dataPoint.legend)),
      };
    }
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
      isCalloutVisible: stack.chartData.length > 0 || (stack.lineData?.length ?? 0) > 0,
      YValueHover: isLinesPresent
        ? [...lineData!.sort((a, b) => (a.data! < b.data! ? 1 : -1)), ...stack.chartData.slice().reverse()]
        : stack.chartData.slice().reverse(),
      hoverXValue:
        stack.xAxisPoint instanceof Date
          ? formatDateToLocaleString(stack.xAxisPoint, this.props.culture, this.props.useUTC)
          : stack.xAxisPoint,
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
    yBarScale: NumericScale | StringScale,
    defaultTotalHeight?: number,
  ): {
    readonly gapHeight: number;
    readonly heightValueScale: number;
    readonly absStackTotal: number;
  } {
    const { barGapMax = 0 } = this.props;

    let totalData = 0;
    let totalHeight: number;
    let sumOfPercent = 0;
    let scalingRatio: number;
    if (this._yAxisType === YAxisType.StringAxis) {
      totalHeight =
        defaultTotalHeight ?? bars.reduce((total, bar) => total + (yBarScale as StringScale)(bar.data as string)!, 0);
    } else {
      // When displaying gaps between the bars, the height of each bar is
      // adjusted so that the total of all bars is not changed by the gaps
      totalData = bars.reduce((iter, value) => iter + Math.abs(value.data as number), 0);
      totalHeight =
        defaultTotalHeight ??
        Math.abs((yBarScale as NumericScale)(totalData) - (yBarScale as NumericScale)(this.Y_ORIGIN));
      bars.forEach(point => {
        let value = (Math.abs(point.data as number) / totalData) * 100;
        if (value < 1 && value !== 0) {
          value = 1;
        }
        sumOfPercent += value;
      });
      scalingRatio = sumOfPercent !== 0 ? sumOfPercent / 100 : 1;
    }
    const gaps = barGapMax && bars.length - 1;
    const gapHeight = gaps && Math.max(barGapMin, Math.min(barGapMax, (totalHeight * barGapMultiplier) / gaps));
    const heightValueScale =
      this._yAxisType === YAxisType.StringAxis ? 0 : (totalHeight - gapHeight * gaps) / (totalData * scalingRatio!);
    return {
      gapHeight,
      heightValueScale,
      absStackTotal: totalData,
    } as const;
  }

  private _createBar = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xBarScale: any,
    yBarScale: NumericScale | StringScale,
    containerHeight: number,
    xElement: SVGElement,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
  ): JSX.Element[] => {
    const { barCornerRadius = 0, barMinimumHeight = 0 } = this.props;
    const _isHavingLines = this.props.data.some(
      (item: IVerticalStackedChartProps) => item.lineData && item.lineData.length > 0,
    );
    const shouldFocusWholeStack = this._toFocusWholeStack(_isHavingLines);

    if (this._xAxisType === XAxisTypes.StringAxis) {
      // Setting the bar width here is safe because there are no dependencies earlier in the code
      // that rely on the width of bars in vertical bar charts with string x-axis.
      this._barWidth = getBarWidth(this.props.barWidth, this.props.maxBarWidth, xBarScale.bandwidth());
    }

    const bars = this._points.map((singleChartData: IVerticalStackedChartProps, indexNumber: number) => {
      const xPoint = xBarScale(
        this._xAxisType === XAxisTypes.NumericAxis
          ? (singleChartData.xAxisPoint as number)
          : this._xAxisType === XAxisTypes.DateAxis
          ? (singleChartData.xAxisPoint as Date)
          : (singleChartData.xAxisPoint as string),
      );
      const xScaleBandwidthTranslate =
        this._xAxisType !== XAxisTypes.StringAxis ? -this._barWidth / 2 : (xBarScale.bandwidth() - this._barWidth) / 2;

      let barTotalValue = 0;

      // Removing datapoints with zero data
      const barsToDisplay = singleChartData.chartData.filter(
        point =>
          point.data !== 0 &&
          point.data !== '' &&
          !(
            this._yAxisType === YAxisType.StringAxis &&
            typeof (yBarScale as StringScale)(point.data as string) === 'undefined'
          ),
      );

      if (!barsToDisplay.length) {
        return undefined;
      }

      const { gapHeight, heightValueScale, absStackTotal } = this._getBarGapAndScale(barsToDisplay, yBarScale);

      if (heightValueScale < 0) {
        return undefined;
      }

      const yBaseline =
        containerHeight -
        this.margins.bottom! -
        (this._yAxisType === YAxisType.StringAxis ? 0 : (yBarScale as NumericScale)(this.Y_ORIGIN));
      let yPositiveStart = yBaseline;
      let yNegativeStart = yBaseline;
      let yPoint = 0;
      let heightOfLastBar = 0;

      const singleBar = barsToDisplay.map((point: IVSChartDataPoint, index: number) => {
        let startColor = point.color ? point.color : this._colors[index];
        let endColor = startColor;

        if (this.props.enableGradient) {
          startColor = point.gradient?.[0] || getNextGradient(index, 0, this.props.theme?.isInverted)[0];
          endColor = point.gradient?.[1] || getNextGradient(index, 0, this.props.theme?.isInverted)[1];
          singleChartData.chartData[index].color = startColor;
        }

        const ref: IRefArrayData = {};

        const shouldHighlight = this._isLegendHighlighted(point.legend) || this._noLegendHighlighted() ? true : false;
        this._classNames = getClassNames(this.props.styles!, {
          theme: this.props.theme!,
          shouldHighlight,
          href: this.props.href,
        });
        const rectFocusProps = !shouldFocusWholeStack &&
          shouldHighlight && {
            'data-is-focusable': !this.props.hideTooltip,
            'aria-label': this._getAriaLabel(singleChartData, point),
            onMouseOver: this._onRectHover.bind(this, singleChartData.xAxisPoint, point, startColor),
            onMouseMove: this._onRectHover.bind(this, singleChartData.xAxisPoint, point, startColor),
            onMouseLeave: this._handleMouseOut,
            onFocus: this._onRectFocus.bind(this, point, singleChartData.xAxisPoint, startColor, ref),
            onBlur: this._handleMouseOut,
            onClick: this._onClick.bind(this, point),
            role: 'img',
          };

        let barHeight: number;
        const gapOffset = index ? gapHeight : 0;
        if (this._yAxisType === YAxisType.StringAxis) {
          barHeight = Math.max(
            containerHeight -
              this.margins.bottom! -
              ((yBarScale as StringScale)(point.data as string)! + (yBarScale as StringScale).bandwidth() / 2) -
              gapOffset,
            barMinimumHeight,
            1,
          );
          yPositiveStart -= barHeight + gapOffset;
          yPoint = yPositiveStart;
        } else {
          barHeight = Math.abs(heightValueScale * (point.data as number));
          // FIXME: The current scaling logic may produce different min and gap heights for each bar stack.
          const minHeight = Math.max((heightValueScale * absStackTotal) / 100.0, barMinimumHeight);
          if (barHeight < minHeight) {
            barHeight = minHeight;
          }
          if ((point.data as number) >= this.Y_ORIGIN) {
            yPositiveStart -= barHeight + gapOffset;
            yPoint = yPositiveStart;
          } else {
            yPoint = yNegativeStart + gapOffset;
            yNegativeStart = yPoint + barHeight;
          }

          barTotalValue += point.data as number;
          heightOfLastBar = index === barsToDisplay.length - 1 ? barHeight : 0;
        }

        const gradientId = getId('VSBC_Gradient') + `_${indexNumber}_${index}`;

        // If set, apply the corner radius to the top of the final bar
        if (barCornerRadius && barHeight > barCornerRadius && index === barsToDisplay.length - 1) {
          return (
            <React.Fragment key={index + indexNumber + `${shouldFocusWholeStack}`}>
              {this.props.enableGradient && (
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0" stopColor={startColor} />
                    <stop offset="100%" stopColor={endColor} />
                  </linearGradient>
                </defs>
              )}
              <path
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
                fill={this.props.enableGradient ? `url(#${gradientId})` : startColor}
                rx={this.props.roundCorners ? 3 : 0}
                ref={e => (ref.refElement = e)}
                transform={`translate(${xScaleBandwidthTranslate}, 0)`}
                {...rectFocusProps}
              />
            </React.Fragment>
          );
        }
        if (barHeight < 0) {
          return <React.Fragment key={index + indexNumber}> </React.Fragment>;
        }
        return (
          <React.Fragment key={index + indexNumber}>
            {this.props.enableGradient && (
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0" stopColor={startColor} />
                  <stop offset="100%" stopColor={endColor} />
                </linearGradient>
              </defs>
            )}
            <rect
              className={this._classNames.opacityChangeOnHover}
              x={xPoint}
              y={yPoint}
              width={this._barWidth}
              height={barHeight}
              fill={this.props.enableGradient ? `url(#${gradientId})` : startColor}
              rx={this.props.roundCorners ? 3 : 0}
              ref={e => (ref.refElement = e)}
              {...rectFocusProps}
              transform={`translate(${xScaleBandwidthTranslate}, 0)`}
            />
          </React.Fragment>
        );
      });
      const groupRef: IRefArrayData = {};
      const someBarsActive =
        singleChartData.chartData.filter(
          dataPoint => this._noLegendHighlighted() || this._isLegendHighlighted(dataPoint.legend),
        ).length > 0;
      // FIXME: Making the entire stack focusable when stack callout is enabled adds unnecessary complexity
      // and can reduce usability in certain scenarios. Instead, each individual element within the stack
      // should be focusable on its own, with its own aria-label. This behavior is also seen in Highcharts.
      const stackFocusProps = shouldFocusWholeStack &&
        someBarsActive && {
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
      if (!this.props.hideLabels && this._yAxisType !== YAxisType.StringAxis) {
        if (this._noLegendHighlighted()) {
          showLabel = true;
          barLabel = barTotalValue;
        } else {
          barsToDisplay.forEach(point => {
            if (this._isLegendHighlighted(point.legend)) {
              showLabel = true;
              barLabel += point.data as number;
            }
          });
        }
      }
      return (
        <g key={indexNumber + `${shouldFocusWholeStack}`}>
          <g id={`${indexNumber}-singleBar`} ref={e => (groupRef.refElement = e)} {...stackFocusProps}>
            {singleBar}
          </g>
          {/*
            Note: No need to check hideLabels here, as showLabel is only set to true
            when hideLabels is false earlier in the code.
          */}
          {!this.props.hideLabels && this._barWidth >= 16 && showLabel && (
            <text
              x={xPoint + this._barWidth / 2}
              //if total bar value >=0, show label above top bar, otherwise below bottom bar
              y={barLabel >= this.Y_ORIGIN ? yPoint - 6 : yPoint + heightOfLastBar + 12}
              textAnchor="middle"
              className={this._classNames.barLabel}
              aria-label={`Total: ${barLabel}`}
              role="img"
              transform={`translate(${xScaleBandwidthTranslate}, 0)`}
            >
              {typeof this.props.yAxisTickFormat === 'function'
                ? this.props.yAxisTickFormat(barLabel)
                : formatScientificLimitWidth(barLabel)}
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
        axis: xAxisElement,
      };
      xAxisElement && tooltipOfAxislabels(tooltipProps);
    }
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return bars.filter((bar): bar is JSX.Element => !!bar);
  };

  private _getScales = (containerHeight: number, containerWidth: number) => {
    const yDomain = [Math.min(this.Y_ORIGIN, this._yMin), Math.max(this.Y_ORIGIN, this._yMax)];
    const yBarScale = d3ScaleLinear()
      .domain(yDomain)
      .range([0, containerHeight - this.margins.bottom! - this.margins.top!]);
    if (this._xAxisType === XAxisTypes.NumericAxis) {
      const xMax = d3Max(this._dataset, (point: IVerticalStackedBarDataPoint) => point.x as number)!;
      const xMin = d3Min(this._dataset, (point: IVerticalStackedBarDataPoint) => point.x as number)!;

      const xBarScale = d3ScaleLinear()
        .domain(this._isRtl ? [xMax, xMin] : [xMin, xMax])
        .range([this.margins.left! + this._domainMargin, containerWidth - this.margins.right! - this._domainMargin]);
      if (!isScalePaddingDefined(this.props.xAxisInnerPadding, this.props.xAxisPadding)) {
        xBarScale.nice();
      }

      return { xBarScale, yBarScale };
    }
    if (this._xAxisType === XAxisTypes.DateAxis) {
      const sDate = d3Min(this._dataset, (point: IVerticalStackedBarDataPoint) => {
        return point.x as Date;
      })!;
      const lDate = d3Max(this._dataset, (point: IVerticalStackedBarDataPoint) => {
        return point.x as Date;
      })!;
      const xBarScale = this.props.useUTC ? d3ScaleUtc() : d3ScaleTime();
      xBarScale
        .domain(this._isRtl ? [lDate, sDate] : [sDate, lDate])
        .range([this.margins.left! + this._domainMargin, containerWidth - this.margins.right! - this._domainMargin]);

      return { xBarScale, yBarScale };
    }
    const xBarScale = d3ScaleBand()
      .domain(this._xAxisLabels)
      .range(
        this._isRtl
          ? [containerWidth - this.margins.right! - this._domainMargin, this.margins.left! + this._domainMargin]
          : [this.margins.left! + this._domainMargin, containerWidth - this.margins.right! - this._domainMargin],
      )
      .paddingInner(this._xAxisInnerPadding)
      .paddingOuter(this._xAxisOuterPadding);

    return { xBarScale, yBarScale };
  };

  private _getGraphData = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale: any,
    yScale: NumericScale | StringScale,
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement | null,
  ) => {
    const { xBarScale, yBarScale } = this._getScales(containerHeight, containerWidth);
    return (this._bars = this._createBar(
      xBarScale,
      this._yAxisType === YAxisType.StringAxis ? yScale : yBarScale,
      containerHeight,
      xElement!,
    ));
  };

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _getAxisData = (yAxisData: IAxisData) => {
    if (yAxisData && yAxisData.yAxisDomainValues.length) {
      const { yAxisDomainValues: domainValue } = yAxisData;
      this._yMax = Math.max(domainValue[domainValue.length - 1], this.props.yMaxValue || this.Y_ORIGIN);
      this._yMin = Math.min(domainValue[0], this.props.yMinValue || this.Y_ORIGIN);
    }
  };

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  private _isLegendHighlighted = (legendTitle: string): boolean => {
    return this._getHighlightedLegend().includes(legendTitle);
  };

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  private _noLegendHighlighted = () => {
    return this._getHighlightedLegend().length === 0;
  };

  private _getAriaLabel = (
    singleChartData: IVerticalStackedChartProps,
    point?: IVSChartDataPoint | ILineDataInVerticalStackedBarChart,
    isLinePoint?: boolean,
  ): string => {
    if (!point) {
      /** if shouldFocusWholeStack is true */
      const xValue =
        singleChartData.xAxisCalloutData ||
        (singleChartData.xAxisPoint instanceof Date
          ? formatDateToLocaleString(singleChartData.xAxisPoint, this.props.culture, this.props.useUTC)
          : singleChartData.xAxisPoint);
      const pointValues = singleChartData.chartData
        .map(pt => {
          const legend = pt.legend;
          const yValue = pt.yAxisCalloutData || pt.data;
          return this._noLegendHighlighted() || this._isLegendHighlighted(legend) ? `${legend}, ${yValue}.` : '';
        })
        .filter(str => str !== '')
        .join(' ');
      const lineValues = singleChartData.lineData
        ?.map(ln => {
          const legend = ln.legend;
          const yValue = ln.yAxisCalloutData || ln.data || ln.y;
          return this._noLegendHighlighted() || this._isLegendHighlighted(legend) ? `${legend}, ${yValue}.` : '';
        })
        .filter(str => str !== '')
        .join(' ');
      return (
        singleChartData.stackCallOutAccessibilityData?.ariaLabel ||
        `${xValue}. ${pointValues}` + (lineValues ? ` ${lineValues}` : '')
      );
    }
    /** if shouldFocusWholeStack is false */
    const xValue =
      singleChartData.xAxisCalloutData ||
      (!isLinePoint && (point as IVSChartDataPoint).xAxisCalloutData) ||
      (singleChartData.xAxisPoint instanceof Date
        ? formatDateToLocaleString(singleChartData.xAxisPoint, this.props.culture, this.props.useUTC)
        : singleChartData.xAxisPoint);
    const legend = point.legend;
    const yValue =
      point.yAxisCalloutData ||
      (isLinePoint ? point.data || (point as ILineDataInVerticalStackedBarChart).y : point.data);
    return (
      (!isLinePoint && (point as IVSChartDataPoint).callOutAccessibilityData?.ariaLabel) ||
      `${xValue}. ${legend}, ${yValue}.`
    );
  };

  private _getDomainMargins = (containerWidth: number): IMargins => {
    this._domainMargin = MIN_DOMAIN_MARGIN;

    /** Total width available to render the bars */
    const totalWidth = calcTotalWidth(containerWidth, this.margins, MIN_DOMAIN_MARGIN);

    if (this._xAxisType === XAxisTypes.StringAxis) {
      if (isScalePaddingDefined(this.props.xAxisOuterPadding, this.props.xAxisPadding)) {
        // Setting the domain margin for string x-axis to 0 because the xAxisOuterPadding prop is now available
        // to adjust the space before the first bar and after the last bar.
        this._domainMargin = 0;
      } else if (this.props.barWidth !== 'auto') {
        // Update the bar width so that when CartesianChart rerenders,
        // the following calculations don't use the previous bar width.
        this._barWidth = getBarWidth(this.props.barWidth, this.props.maxBarWidth);
        /** Total width required to render the bars. Directly proportional to bar width */
        const reqWidth = calcRequiredWidth(this._barWidth, this._xAxisLabels.length, this._xAxisInnerPadding);

        if (totalWidth >= reqWidth) {
          // Center align the chart by setting equal left and right margins for domain
          this._domainMargin = MIN_DOMAIN_MARGIN + (totalWidth - reqWidth) / 2;
        }
      } else if (this.props.mode === 'plotly' && this._xAxisLabels.length > 1) {
        // Calculate the remaining width after rendering bars at their maximum allowable width
        const bandwidth = calcBandwidth(totalWidth, this._xAxisLabels.length, this._xAxisInnerPadding);
        const barWidth = getBarWidth(this.props.barWidth, this.props.maxBarWidth, bandwidth);
        let reqWidth = calcRequiredWidth(barWidth, this._xAxisLabels.length, this._xAxisInnerPadding);
        const margin1 = (totalWidth - reqWidth) / 2;

        // Calculate the remaining width after accounting for the space required to render x-axis labels
        const step = calculateLongestLabelWidth(this._xAxisLabels) + 20;
        reqWidth = (this._xAxisLabels.length - this._xAxisInnerPadding) * step;
        const margin2 = (totalWidth - reqWidth) / 2;

        this._domainMargin = MIN_DOMAIN_MARGIN + Math.max(0, Math.min(margin1, margin2));
      }
    } else {
      const data = (this.props.data?.map(point => point.xAxisPoint) as number[] | Date[] | undefined) || [];
      this._barWidth = getBarWidth(
        this.props.barWidth,
        this.props.maxBarWidth,
        calculateAppropriateBarWidth(data, totalWidth, this._xAxisInnerPadding),
      );
      this._domainMargin = MIN_DOMAIN_MARGIN + this._barWidth / 2;
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
      this.props.data.some(item => item.chartData.length > 0 || (item.lineData && item.lineData.length > 0))
    );
  }

  private _getChartTitle = (): string => {
    const { chartTitle, data } = this.props;
    const numLines = Object.keys(this._lineObject).length;
    return (
      (chartTitle ? `${chartTitle}. ` : '') +
      `Vertical bar chart with ${data?.length || 0} stacked bars` +
      (numLines > 0 ? ` and ${numLines} lines` : '') +
      '. '
    );
  };

  private _getMinMaxOfYAxis = (
    dataset: IDataPoint[],
    yAxisType?: YAxisType,
    useSecondaryYScale?: boolean,
  ): { startValue: number; endValue: number } => {
    if (!useSecondaryYScale) {
      return findVSBCNumericMinMaxOfY(dataset);
    }

    const values: number[] = [];
    this.props.data.forEach(xPoint => {
      xPoint.lineData?.forEach(point => {
        if (point.useSecondaryYScale) {
          values.push(point.y as number);
        }
      });
    });

    return { startValue: d3Min(values)!, endValue: d3Max(values)! };
  };

  private _initYAxisParams = () => {
    if (this._points[0].chartData.length > 0) {
      this._yAxisType = getTypeOfAxis(this._points[0].chartData[0].data, false) as YAxisType;
    } else {
      Object.keys(this._lineObject).forEach(lineLegend => {
        if (!this._lineObject[lineLegend][0].useSecondaryYScale) {
          this._yAxisType = getTypeOfAxis(this._lineObject[lineLegend][0].y, false) as YAxisType;
        }
      });
    }

    this._yAxisLabels = this._getOrderedYAxisLabels();
  };

  private _getYDomainMargins = (containerHeight: number): IMargins => {
    /**
     * Specifies the extra top margin to apply above the highest y-axis tick label.
     * Useful when stacked bars extend beyond the combined height of all y-axis labels (or categories).
     */
    let yAxisTickMarginTop = 0;

    /** Total height available to render the bars */
    const totalHeight = containerHeight - this.margins.bottom! - this.margins.top!;

    if (this._yAxisType === YAxisType.StringAxis) {
      /** Maximum height of the stacked bars, expressed in multiples of the height of a y-axis label (or category) */
      let maxBarHeightInLabels = 0;
      this._points.forEach(xPoint => {
        /** Height of the stacked bar, expressed in multiples of the height of a y-axis label (or category) */
        let barHeightInLabels = 0;
        xPoint.chartData.forEach(bar => {
          barHeightInLabels += this._yAxisLabels.indexOf(`${bar.data}`) + 1;
        });
        maxBarHeightInLabels = Math.max(maxBarHeightInLabels, barHeightInLabels);
      });
      /** Height of a y-axis label (or category) */
      const yAxisLabelHeight = maxBarHeightInLabels === 0 ? 0 : totalHeight / maxBarHeightInLabels;
      yAxisTickMarginTop += yAxisLabelHeight * (maxBarHeightInLabels - this._yAxisLabels.length);
    }

    return {
      ...this.margins,
      top: this.margins.top! + yAxisTickMarginTop,
    };
  };

  private _getOrderedXAxisLabels = () => {
    if (this._xAxisType !== XAxisTypes.StringAxis) {
      return [];
    }

    return sortAxisCategories(this._mapCategoryToValues(), this.props.xAxisCategoryOrder);
  };

  private _getOrderedYAxisLabels = () => {
    if (this._yAxisType !== YAxisType.StringAxis) {
      return [];
    }

    return sortAxisCategories(this._mapCategoryToValues(true), this.props.yAxisCategoryOrder);
  };

  private _mapCategoryToValues = (isYAxis = false) => {
    const categoryToValues: Record<string, number[]> = {};
    this._points.forEach(point => {
      point.chartData.forEach(bar => {
        const category = (isYAxis ? bar.data : point.xAxisPoint) as string;
        const value = isYAxis ? point.xAxisPoint : bar.data;
        if (!categoryToValues[category]) {
          categoryToValues[category] = [];
        }
        if (typeof value === 'number') {
          categoryToValues[category].push(value);
        }
      });
      point.lineData?.forEach(linePoint => {
        if (isYAxis && linePoint.useSecondaryYScale) {
          return;
        }
        const category = (isYAxis ? linePoint.y : point.xAxisPoint) as string;
        const value = isYAxis ? point.xAxisPoint : linePoint.y;
        if (!categoryToValues[category]) {
          categoryToValues[category] = [];
        }
        if (typeof value === 'number') {
          categoryToValues[category].push(value);
        }
      });
    });
    return categoryToValues;
  };
}
