import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';
import { classNamesFunction, getId, getRTL, initializeComponentRef } from '@fluentui/react/lib/Utilities';
import { IProcessedStyleSet, IPalette } from '@fluentui/react/lib/Styling';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { ILegend, ILegendContainer } from '../../components/Legends/Legends.types';
import { Legends } from '../../components/Legends/Legends';
import {
  IAccessibilityProps,
  IBasestate,
  IHorizontalBarChartWithAxisDataPoint,
  IRefArrayData,
  IMargins,
  IChart,
  IImageExportOptions,
} from '../../types/IDataPoint';
import { IChildProps, IYValueHover } from '../CommonComponents/CartesianChart.types';
import { CartesianChart } from '../CommonComponents/CartesianChart';
import {
  IHorizontalBarChartWithAxisProps,
  IHorizontalBarChartWithAxisStyleProps,
  IHorizontalBarChartWithAxisStyles,
} from './HorizontalBarChartWithAxis.types';
import { FocusZoneDirection } from '@fluentui/react-focus';
import {
  ChartHoverCard,
  ChartTypes,
  IAxisData,
  getAccessibleDataObject,
  YAxisType,
  XAxisTypes,
  NumericAxis,
  StringAxis,
  getTypeOfAxis,
  getNextColor,
  findHBCWANumericMinMaxOfY,
  createYAxisForHorizontalBarChartWithAxis,
  IDomainNRange,
  domainRangeOfNumericForHorizontalBarChartWithAxis,
  createStringYAxisForHorizontalBarChartWithAxis,
  getNextGradient,
  areArraysEqual,
  computeLongestBars,
  groupChartDataByYValue,
  MIN_DOMAIN_MARGIN,
  sortAxisCategories,
} from '../../utilities/index';
import { toImage } from '../../utilities/image-export-utils';
import { getClosestPairDiffAndRange } from '../../utilities/vbc-utils';

const getClassNames = classNamesFunction<IHorizontalBarChartWithAxisStyleProps, IHorizontalBarChartWithAxisStyles>();
export interface IHorizontalBarChartWithAxisState extends IBasestate {
  selectedLegendTitle: string;
  dataPointCalloutProps?: IHorizontalBarChartWithAxisDataPoint; // define this in hover and focus
  /**
   * data point of x, where rectangle is hovered or focused
   */
  activeXdataPoint: number | null;
  YValueHover: IYValueHover[];
  hoverXValue?: string | number | null;
  callOutAccessibilityData?: IAccessibilityProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltipElement?: any;
  selectedLegends: string[];
}

type ColorScale = (_p?: number) => string;

export class HorizontalBarChartWithAxisBase
  extends React.Component<IHorizontalBarChartWithAxisProps, IHorizontalBarChartWithAxisState>
  implements IChart
{
  public static defaultProps: Partial<IHorizontalBarChartWithAxisProps> = {
    yAxisCategoryOrder: 'default',
  };

  private _points: IHorizontalBarChartWithAxisDataPoint[];
  private _barHeight: number;
  private _colors: string[];
  private _classNames: IProcessedStyleSet<IHorizontalBarChartWithAxisStyles>;
  private _refArray: IRefArrayData[];
  private _calloutId: string;
  private margins: IMargins;
  private _isRtl: boolean = getRTL();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _bars: JSX.Element[];
  private _yAxisLabels: string[];
  private _xMax: number;
  private _xAxisType: XAxisTypes;
  private _yAxisType: YAxisType;
  private _calloutAnchorPoint: IHorizontalBarChartWithAxisDataPoint | null;
  private _cartesianChartRef: React.RefObject<IChart>;
  private _legendsRef: React.RefObject<ILegendContainer>;
  private _longestBarPositiveTotalValue: number;
  private _longestBarNegativeTotalValue: number;
  private readonly X_ORIGIN: number = 0;
  private _domainMargin: number;
  private _yAxisPadding: number;

  public constructor(props: IHorizontalBarChartWithAxisProps) {
    super(props);

    initializeComponentRef(this);

    this.state = {
      color: '',
      dataForHoverCard: 0,
      isCalloutVisible: false,
      isLegendSelected:
        (props.legendProps?.selectedLegends && props.legendProps.selectedLegends.length > 0) ||
        props.legendProps?.selectedLegend !== undefined,
      isLegendHovered: false,
      refSelected: null,
      selectedLegendTitle: props.legendProps?.selectedLegend ?? '',
      xCalloutValue: '',
      yCalloutValue: '',
      activeXdataPoint: null,
      YValueHover: [],
      hoverXValue: '',
      selectedLegends: props.legendProps?.selectedLegends || [],
    };
    this._calloutId = getId('callout');
    this._refArray = [];
    this._xAxisType =
      this.props.data! && this.props.data!.length > 0
        ? (getTypeOfAxis(this.props.data![0].x, true) as XAxisTypes)
        : XAxisTypes.NumericAxis;
    this._yAxisType =
      this.props.data! && this.props.data!.length > 0
        ? (getTypeOfAxis(this.props.data![0].y, false) as YAxisType)
        : YAxisType.StringAxis;
    this._cartesianChartRef = React.createRef();
    this._legendsRef = React.createRef();
    this._domainMargin = MIN_DOMAIN_MARGIN;
    this._yAxisPadding = this.props.yAxisPadding ?? 0.5;
  }

  public componentDidUpdate(prevProps: IHorizontalBarChartWithAxisProps): void {
    if (!areArraysEqual(prevProps.legendProps?.selectedLegends, this.props.legendProps?.selectedLegends)) {
      this.setState({
        selectedLegends: this.props.legendProps?.selectedLegends || [],
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public render(): JSX.Element {
    this._adjustProps();
    this._yAxisLabels = this._getOrderedYAxisLabels();
    this._xMax = Math.max(
      d3Max(this._points, (point: IHorizontalBarChartWithAxisDataPoint) => point.x)!,
      this.props.xMaxValue || 0,
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
      gapSpace: 15,
      color: this.state.color,
      legend: this.state.selectedLegendTitle,
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
        yAxisPadding={this._yAxisPadding}
        chartTitle={this._getChartTitle()}
        points={this._points}
        chartType={ChartTypes.HorizontalBarChartWithAxis}
        xAxisType={this._xAxisType}
        yAxisType={this._yAxisType}
        stringDatasetForYAxisDomain={this._yAxisLabels}
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        createYAxis={createYAxisForHorizontalBarChartWithAxis}
        getDomainNRangeValues={this._getDomainNRangeValues}
        createStringYAxis={createStringYAxisForHorizontalBarChartWithAxis}
        getMinMaxOfYAxis={findHBCWANumericMinMaxOfY}
        barwidth={this._barHeight}
        focusZoneDirection={FocusZoneDirection.vertical}
        customizedCallout={this._getCustomizedCallout()}
        getmargins={this._getMargins}
        getYDomainMargins={this._getDomainMarginsForHorizontalBarChart}
        getGraphData={this._getGraphData}
        getAxisData={this._getAxisData}
        onChartMouseLeave={this._handleChartMouseLeave}
        ref={this._cartesianChartRef}
        /* eslint-disable react/jsx-no-bind */
        children={(props: IChildProps) => {
          return (
            <>
              <g>{this._bars}</g>
            </>
          );
        }}
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
    points: IHorizontalBarChartWithAxisDataPoint[],
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
      domainNRangeValue = domainRangeOfNumericForHorizontalBarChartWithAxis(
        points,
        margins,
        width,
        isRTL,
        shiftX,
        this.X_ORIGIN,
      );
    } else {
      domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    }
    return domainNRangeValue;
  };

  private _adjustProps(): void {
    this._points = this.props.data || [];
    this._barHeight = this.props.barHeight || 32;
    const { palette } = this.props.theme!;
    this._colors = this.props.colors || [palette.blueLight, palette.blue, palette.blueMid, palette.blueDark];
  }

  private _getMargins = (margins: IMargins) => {
    this.margins = margins;
  };

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _renderContentForOnlyBars = (point: IHorizontalBarChartWithAxisDataPoint): JSX.Element => {
    const { useSingleColor = false, enableGradient = false } = this.props;
    let selectedPointIndex = 0;
    this.props.data!.forEach((yDataPoint: IHorizontalBarChartWithAxisDataPoint, index: number) => {
      if (yDataPoint.y === point.y) {
        selectedPointIndex = index;
      }
    });
    let color: string;
    if (useSingleColor) {
      //if useSingle color , then check if user has given a palette or not
      // and pick the first color from that or else from our paltette.
      color = this.props.colors ? this._createColors()(1) : getNextColor(1, 0, this.props.theme?.isInverted);
      if (enableGradient) {
        color = getNextGradient(0, 0, this.props.theme?.isInverted)[0];
      }
    } else {
      color = point.color
        ? point.color
        : this.props.colors
        ? this._createColors()(point.x)
        : getNextColor(selectedPointIndex, 0, this.props.theme?.isInverted);
    }
    return (
      <>
        <ChartHoverCard
          XValue={point.xAxisCalloutData || point.x.toString()}
          Legend={point.legend}
          YValue={point.yAxisCalloutData || point.y}
          color={color}
          culture={this.props.culture}
        />
      </>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _renderCallout = (props?: IHorizontalBarChartWithAxisDataPoint): JSX.Element | null => {
    return props ? this._renderContentForOnlyBars(props) : null;
  };

  private _getCustomizedCallout = () => {
    return this.props.onRenderCalloutPerDataPoint
      ? this.props.onRenderCalloutPerDataPoint(this.state.dataPointCalloutProps, this._renderCallout)
      : null;
  };

  private _getGraphData = (
    xScale: NumericAxis,
    yScale: NumericAxis | StringAxis,
    containerHeight: number,
    containerWidth: number,
    xElement?: SVGElement | null,
    yElement?: SVGElement | null,
  ) => {
    const stackedChartData = groupChartDataByYValue(this._points);
    const longestBars = computeLongestBars(stackedChartData, this.X_ORIGIN);
    this._longestBarPositiveTotalValue = longestBars.longestPositiveBar;
    this._longestBarNegativeTotalValue = longestBars.longestNegativeBar;
    const { xBarScale, yBarScale } =
      this._yAxisType === YAxisType.NumericAxis
        ? this._getScales(containerHeight, containerWidth, true)
        : this._getScales(containerHeight, containerWidth, false);
    const xRange = xBarScale.range();
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    let allBars: JSX.Element[] = [];
    // when the chart mounts, the xRange[1] is sometimes seen to be < 0 (like -40) while xRange[0] > 0.
    if (xRange[0] < xRange[1]) {
      allBars = stackedChartData
        .map(singleBarData =>
          this._yAxisType === YAxisType.NumericAxis
            ? this._createNumericBars(
                containerHeight,
                containerWidth,
                xElement!,
                yElement!,
                singleBarData,
                xBarScale,
                yBarScale,
              )
            : this._createStringBars(
                containerHeight,
                containerWidth,
                xElement!,
                yElement!,
                singleBarData,
                xBarScale,
                yBarScale,
              ),
        )
        .flat();
    }

    return (this._bars = allBars);
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
      domainValues.push(increment * i * this._xMax);
    }
    const colorScale = d3ScaleLinear<string>().domain(domainValues).range(this._colors);
    return colorScale;
  }

  private _refCallback = (element: SVGRectElement, legendTitle: string): void => {
    this._refArray.push({ index: legendTitle, refElement: element });
  };

  private _getCalloutContentForBar = (
    point: IHorizontalBarChartWithAxisDataPoint,
  ): { YValueHover: IYValueHover[]; hoverXValue: string | number | null } => {
    const YValueHover: IYValueHover[] = [];
    const { useSingleColor = false, enableGradient = false } = this.props;
    const { data } = this.props;
    const selectedPoint = data!.filter((yDataPoint: IHorizontalBarChartWithAxisDataPoint) => yDataPoint.y === point.y);
    let selectedPointIndex = 0;
    data!.forEach((yDataPoint: IHorizontalBarChartWithAxisDataPoint, index: number) => {
      if (yDataPoint.y === point.y) {
        selectedPointIndex = index;
      }
    });
    let color: string;
    if (useSingleColor) {
      //if useSingle color , then check if user has given a palette or not
      // and pick the first color from that or else from our paltette.
      color = this.props.colors ? this._createColors()(1) : getNextColor(1, 0, this.props.theme?.isInverted);
      if (enableGradient) {
        color = getNextGradient(0, 0, this.props.theme?.isInverted)[0];
      }
    } else {
      color = selectedPoint[0].color
        ? selectedPoint[0].color
        : this.props.colors
        ? this._createColors()(selectedPoint[0].x)
        : getNextColor(selectedPointIndex, 0, this.props.theme?.isInverted);
    }
    // callout data for the bar
    YValueHover.push({
      legend: selectedPoint[0].legend,
      // For HBCWA x and y Values are swapped
      y: selectedPoint[0].x,
      color,
      data: selectedPoint[0].yAxisCalloutData,
      yAxisCalloutData: selectedPoint[0].yAxisCalloutData,
    });
    return { YValueHover, hoverXValue: point.yAxisCalloutData || point.y.toString() };
  };

  private _onBarHover(
    point: IHorizontalBarChartWithAxisDataPoint,
    color: string,
    mouseEvent: React.MouseEvent<SVGElement>,
  ): void {
    mouseEvent.persist();

    const { YValueHover, hoverXValue } = this._getCalloutContentForBar(point);
    if (
      (this.state.isLegendSelected === false || this._isLegendHighlighted(point.legend)) &&
      this._calloutAnchorPoint !== point
    ) {
      this._calloutAnchorPoint = point;
      this.setState({
        refSelected: mouseEvent,
        isCalloutVisible: true,
        dataForHoverCard: point.x,
        selectedLegendTitle: point.legend!,
        color: this.props.useSingleColor || this.props.enableGradient ? color : point.color,
        // To display callout value, if no callout value given, taking given point.x value as a string.
        xCalloutValue: point.yAxisCalloutData! || point.y.toString(),
        yCalloutValue: point.xAxisCalloutData || point.x.toString(),
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

  private _onBarFocus = (
    point: IHorizontalBarChartWithAxisDataPoint,
    refArrayIndexNumber: number,
    color: string,
  ): void => {
    if (
      (this.state.isLegendSelected === false || this._isLegendHighlighted(point.legend)) &&
      this._calloutAnchorPoint !== point
    ) {
      const { YValueHover, hoverXValue } = this._getCalloutContentForBar(point);
      this._refArray.forEach((obj: IRefArrayData, index: number) => {
        if (refArrayIndexNumber === index) {
          this.setState({
            refSelected: obj.refElement,
            isCalloutVisible: true,
            selectedLegendTitle: point.legend!,
            dataForHoverCard: point.x,
            color: this.props.useSingleColor ? color : point.color,
            xCalloutValue: point.yAxisCalloutData || point.y.toString(),
            yCalloutValue: point.xAxisCalloutData! || point.x.toString(),
            dataPointCalloutProps: point,
            activeXdataPoint: point.x,
            YValueHover,
            hoverXValue,
            callOutAccessibilityData: point.callOutAccessibilityData,
          });
        }
      });
    }
  };

  private _getScales = (
    containerHeight: number,
    containerWidth: number,
    isNumericScale: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): { xBarScale: any; yBarScale: any } => {
    const xMax = this._longestBarPositiveTotalValue;
    const xMin = this._longestBarNegativeTotalValue;
    const xDomain = [Math.min(this.X_ORIGIN, xMin), Math.max(this.X_ORIGIN, xMax)];
    if (isNumericScale) {
      const yMax = d3Max(this._points, (point: IHorizontalBarChartWithAxisDataPoint) => point.y as number)!;
      const yMin = d3Min(this._points, (point: IHorizontalBarChartWithAxisDataPoint) => point.y as number)!;
      const yDomainMax = Math.max(yMax, this.props.yMaxValue || 0);
      // Default to 0 if yMinValue is not provided.
      const yMinProp = this.props.yMinValue || 0;
      const yDomainMin = Math.min(yMin, yMinProp);
      const xBarScale = d3ScaleLinear()
        .domain(xDomain)
        .nice()
        .range([this.margins.left!, containerWidth - this.margins.right!]);
      const yBarScale = d3ScaleLinear()
        .domain([yDomainMin, yDomainMax])
        .range([containerHeight - (this.margins.bottom! + this._domainMargin), this.margins.top! + this._domainMargin]);
      return { xBarScale, yBarScale };
    } else {
      // please note these padding default values must be consistent in here
      // and CatrtesianChartBase w for more details refer example
      // http://using-d3js.com/04_07_ordinal_scales.html
      const yBarScale = d3ScaleBand()
        .domain(this._yAxisLabels)
        .range([containerHeight - (this.margins.bottom! + this._domainMargin), this.margins.top! + this._domainMargin])
        .padding(this._yAxisPadding);

      const xBarScale = d3ScaleLinear()
        .domain(xDomain)
        .nice()
        .range([this.margins.left!, containerWidth - this.margins.right!]);
      return { xBarScale, yBarScale };
    }
  };

  private _createNumericBars(
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement,
    yElement: SVGElement,
    singleBarData: IHorizontalBarChartWithAxisDataPoint[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xBarScale: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yBarScale: any,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
  ): JSX.Element[] {
    const { useSingleColor = false } = this.props;
    const sortedBars: IHorizontalBarChartWithAxisDataPoint[] = [...singleBarData];
    sortedBars.sort((a, b) => {
      const aValue = typeof a.y === 'number' ? a.y : parseFloat(a.y);
      const bValue = typeof b.y === 'number' ? b.y : parseFloat(b.y);
      return bValue - aValue;
    });

    let prevWidthPositive = 0;
    let prevWidthNegative = 0;
    let prevPoint = 0;
    const totalPositiveBars = singleBarData.filter(
      (point: IHorizontalBarChartWithAxisDataPoint) => point.x >= this.X_ORIGIN,
    ).length;
    const totalNegativeBars = singleBarData.length - totalPositiveBars;
    let currPositiveCounter = 0;
    let currNegativeCounter = 0;
    const bars = sortedBars.map((point: IHorizontalBarChartWithAxisDataPoint, index: number) => {
      let shouldHighlight = true;
      if (this.state.isLegendHovered || this.state.isLegendSelected) {
        shouldHighlight = this._isLegendHighlighted(point.legend);
      }
      this._classNames = getClassNames(this.props.styles!, {
        theme: this.props.theme!,
        legendColor: this.state.color,
        shouldHighlight,
      });
      if (point.x >= this.X_ORIGIN) {
        ++currPositiveCounter;
      }
      if (point.x < this.X_ORIGIN) {
        ++currNegativeCounter;
      }
      const barStartX = this._isRtl
        ? containerWidth -
          (this.margins.right! +
            Math.max(xBarScale(point.x + this.X_ORIGIN), xBarScale(this.X_ORIGIN)) -
            this.margins.left!)
        : Math.min(xBarScale(point.x + this.X_ORIGIN), xBarScale(this.X_ORIGIN));
      const barHeight: number = Math.max(yBarScale(point.y), 0);
      if (barHeight < 1) {
        return <React.Fragment key={point.x}> </React.Fragment>;
      }
      let startColor: string;
      if (useSingleColor) {
        //if useSingle color , then check if user has given a palette or not
        // and pick the first color from that or else from our paltette.
        startColor = this.props.colors ? this._createColors()(1) : getNextColor(1, 0, this.props.theme?.isInverted);
      } else {
        startColor = this.props.colors
          ? this._createColors()(point.x)
          : getNextColor(index, 0, this.props.theme?.isInverted);
      }

      startColor = point.color && !useSingleColor ? point.color : startColor;
      let endColor = startColor;

      if (this.props.enableGradient) {
        const pointIndex = Math.max(
          this._points.findIndex(item => item === point),
          0,
        );
        startColor = point.gradient?.[0] || getNextGradient(pointIndex, 0, this.props.theme?.isInverted)[0];
        endColor = point.gradient?.[1] || getNextGradient(pointIndex, 0, this.props.theme?.isInverted)[1];
        if (useSingleColor) {
          startColor = getNextGradient(0, 0, this.props.theme?.isInverted)[0];
          endColor = getNextGradient(0, 0, this.props.theme?.isInverted)[1];
        }
        this._points[pointIndex].color = startColor;
      }

      const gradientId = getId('HBCWA_Gradient') + `_${index}_${point.x}`;
      const prevBarWidth = Math.abs(xBarScale(prevPoint + this.X_ORIGIN) - xBarScale(this.X_ORIGIN));
      prevPoint > this.X_ORIGIN ? (prevWidthPositive += prevBarWidth) : (prevWidthNegative += prevBarWidth);
      const currentWidth = Math.abs(xBarScale(point.x + this.X_ORIGIN) - xBarScale(this.X_ORIGIN));
      const gapWidthLTR =
        currentWidth > 2 &&
        ((point.x > this.X_ORIGIN && currPositiveCounter !== totalPositiveBars) ||
          (point.x < this.X_ORIGIN && (totalPositiveBars !== 0 || currNegativeCounter > 1)))
          ? 2
          : 0;
      const gapWidthRTL =
        currentWidth > 2 &&
        ((point.x > this.X_ORIGIN && (totalNegativeBars !== 0 || currPositiveCounter > 1)) ||
          (point.x < this.X_ORIGIN && currNegativeCounter !== totalNegativeBars))
          ? 2
          : 0;
      let xStart = this.X_ORIGIN;
      if (this._isRtl) {
        xStart = point.x > this.X_ORIGIN ? barStartX - prevWidthPositive : barStartX + prevWidthNegative;
      } else {
        xStart = point.x > this.X_ORIGIN ? barStartX + prevWidthPositive : barStartX - prevWidthNegative;
      }
      prevPoint = point.x;
      return (
        <React.Fragment key={`${index}_${point.x}`}>
          {this.props.enableGradient && (
            <defs>
              <linearGradient id={gradientId}>
                <stop offset="0" stopColor={startColor} />
                <stop offset="100%" stopColor={endColor} />
              </linearGradient>
            </defs>
          )}
          <rect
            key={point.y}
            x={xStart}
            className={this._classNames.opacityChangeOnHover}
            y={yBarScale(point.y) - this._barHeight / 2}
            data-is-focusable={shouldHighlight}
            width={currentWidth - (this._isRtl ? gapWidthRTL : gapWidthLTR)}
            height={this._barHeight}
            ref={(e: SVGRectElement) => {
              this._refCallback(e, point.legend!);
            }}
            rx={this.props.roundCorners ? 3 : 0}
            onClick={point.onClick}
            onMouseOver={this._onBarHover.bind(this, point, startColor)}
            aria-label={this._getAriaLabel(point)}
            role="img"
            aria-labelledby={`toolTip${this._calloutId}`}
            onMouseLeave={this._onBarLeave}
            onFocus={this._onBarFocus.bind(this, point, index, startColor)}
            onBlur={this._onBarLeave}
            fill={this.props.enableGradient ? `url(#${gradientId})` : startColor}
          />
        </React.Fragment>
      );
    });
    return bars;
  }

  private _getUniqueYValues() {
    const mapY: Record<string, number | string> = {};
    this.props.data?.forEach((point: IHorizontalBarChartWithAxisDataPoint) => {
      mapY[point.y] = point.y;
    });
    const uniqueY = Object.values(mapY);
    return uniqueY;
  }

  private _calculateAppropriateBarHeight = (data: number[] | Date[], totalWidth: number, innerPadding: number) => {
    const result = getClosestPairDiffAndRange(data);
    if (!result || result[1] === 0) {
      return 16;
    }
    const closestPairDiff = result[0];
    let range = result[1];
    const yMax = d3Max(this._points, (point: IHorizontalBarChartWithAxisDataPoint) => point.y as number)!;
    // Since we are always rendering from 0 to yMax, we need to ensure that the range is at least yMax
    // to calculate the bar height correctly.
    range = Math.max(range, yMax);
    // Refer to https://microsoft.github.io/fluentui-charting-contrib/docs/rfcs/fix-overlapping-bars-on-continuous-axes
    // for the derivation of the following formula.
    const barWidth = Math.floor(
      (totalWidth * closestPairDiff * (1 - innerPadding)) / (range + closestPairDiff * (1 - innerPadding)),
    );
    return barWidth;
  };

  private _getDomainMarginsForHorizontalBarChart = (containerHeight: number): IMargins => {
    this._domainMargin = MIN_DOMAIN_MARGIN;
    const uniqueY = this._getUniqueYValues();
    /** Rate at which the space between the bars changes wrt the bar height */
    this._yAxisPadding = this._yAxisPadding === 1 ? 0.99 : this._yAxisPadding;
    const barGapRate = this._yAxisPadding / (1 - this._yAxisPadding);
    const numBars = uniqueY.length + (uniqueY.length - 1) * barGapRate;
    // Total height available to render the bars
    const totalHeight =
      containerHeight - (this.margins.top! + MIN_DOMAIN_MARGIN) - (this.margins.bottom! + MIN_DOMAIN_MARGIN);
    if (this._yAxisType !== YAxisType.StringAxis) {
      // Calculate bar height dynamically
      this._barHeight =
        this.props.barHeight ||
        this._calculateAppropriateBarHeight(uniqueY as number[] | Date[], totalHeight, this._yAxisPadding);
      this._barHeight = Math.max(this._barHeight, 1);
      this._domainMargin += this._barHeight / 2;
    } else {
      // Calculate the appropriate bar height
      this._barHeight = this.props.barHeight || totalHeight / numBars;
      /** Total height required to render the bars. Directly proportional to bar height */
      const reqHeight = numBars * this._barHeight;
      if (totalHeight >= reqHeight) {
        // Center align the chart by setting equal left and right margins for domain
        this._domainMargin = MIN_DOMAIN_MARGIN + (totalHeight - reqHeight) / 2;
      }
    }

    return {
      ...this.margins,
      top: this.margins.top! + this._domainMargin,
      bottom: this.margins.bottom! + this._domainMargin,
    };
  };

  private _createStringBars(
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement,
    yElement: SVGElement,
    singleBarData: IHorizontalBarChartWithAxisDataPoint[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xBarScale: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yBarScale: any,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
  ): JSX.Element[] {
    const { useSingleColor = false } = this.props;
    let prevWidthPositive = 0;
    let prevWidthNegative = 0;
    let prevPoint = 0;
    const totalPositiveBars = singleBarData.filter(
      (point: IHorizontalBarChartWithAxisDataPoint) => point.x >= this.X_ORIGIN,
    ).length;
    const totalNegativeBars = singleBarData.length - totalPositiveBars;
    let currPositiveCounter = 0;
    let currNegativeCounter = 0;
    const bars = singleBarData.map((point: IHorizontalBarChartWithAxisDataPoint, index: number) => {
      let shouldHighlight = true;
      if (this.state.isLegendHovered || this.state.isLegendSelected) {
        shouldHighlight = this._isLegendHighlighted(point.legend);
      }
      this._classNames = getClassNames(this.props.styles!, {
        theme: this.props.theme!,
        legendColor: this.state.color,
        shouldHighlight,
      });
      if (point.x >= this.X_ORIGIN) {
        ++currPositiveCounter;
      }
      if (point.x < this.X_ORIGIN) {
        ++currNegativeCounter;
      }
      const barStartX = this._isRtl
        ? containerWidth -
          (this.margins.right! +
            Math.max(xBarScale(point.x + this.X_ORIGIN), xBarScale(this.X_ORIGIN)) -
            this.margins.left!)
        : Math.min(xBarScale(point.x + this.X_ORIGIN), xBarScale(this.X_ORIGIN));
      const barHeight: number = Math.max(yBarScale(point.y), 0);
      if (barHeight < 1) {
        return <React.Fragment key={point.x}> </React.Fragment>;
      }
      let startColor: string;
      if (useSingleColor) {
        //if useSingle color , then check if user has given a palette or not
        // and pick the first color from that or else from our paltette.
        startColor = this.props.colors ? this._createColors()(1) : getNextColor(1, 0, this.props.theme?.isInverted);
      } else {
        startColor = this.props.colors
          ? this._createColors()(point.x)
          : getNextColor(index, 0, this.props.theme?.isInverted);
      }

      startColor = point.color && !useSingleColor ? point.color : startColor;
      let endColor = startColor;

      if (this.props.enableGradient) {
        const pointIndex = this._points.findIndex(item => item === point);
        startColor = point.gradient?.[0] || getNextGradient(pointIndex, 0, this.props.theme?.isInverted)[0];
        endColor = point.gradient?.[1] || getNextGradient(pointIndex, 0, this.props.theme?.isInverted)[1];
        if (useSingleColor) {
          startColor = getNextGradient(0, 0, this.props.theme?.isInverted)[0];
          endColor = getNextGradient(0, 0, this.props.theme?.isInverted)[1];
        }
        this._points[pointIndex].color = startColor;
      }

      const gradientId = getId('HBCWA_Gradient') + `_${index}_${point.x}`;
      const prevBarWidth = Math.abs(xBarScale(prevPoint + this.X_ORIGIN) - xBarScale(this.X_ORIGIN));
      prevPoint > 0 ? (prevWidthPositive += prevBarWidth) : (prevWidthNegative += prevBarWidth);
      const currentWidth = Math.abs(xBarScale(point.x + this.X_ORIGIN) - xBarScale(this.X_ORIGIN));
      const gapWidthLTR =
        currentWidth > 2 &&
        ((point.x > this.X_ORIGIN && currPositiveCounter !== totalPositiveBars) ||
          (point.x < this.X_ORIGIN && (totalPositiveBars !== 0 || currNegativeCounter > 1)))
          ? 2
          : 0;
      const gapWidthRTL =
        currentWidth > 2 &&
        ((point.x > this.X_ORIGIN && (totalNegativeBars !== 0 || currPositiveCounter > 1)) ||
          (point.x < this.X_ORIGIN && currNegativeCounter !== totalNegativeBars))
          ? 2
          : 0;
      prevPoint = point.x;
      let xStart = this.X_ORIGIN;
      if (this._isRtl) {
        xStart = point.x > this.X_ORIGIN ? barStartX - prevWidthPositive : barStartX + prevWidthNegative;
      } else {
        xStart = point.x > this.X_ORIGIN ? barStartX + prevWidthPositive : barStartX - prevWidthNegative;
      }
      return (
        <React.Fragment key={`${index}_${point.x}`}>
          {this.props.enableGradient && (
            <defs>
              <linearGradient id={gradientId}>
                <stop offset="0" stopColor={startColor} />
                <stop offset="100%" stopColor={endColor} />
              </linearGradient>
            </defs>
          )}
          <rect
            transform={`translate(0,${0.5 * (yBarScale.bandwidth() - this._barHeight)})`}
            key={point.x}
            className={this._classNames.opacityChangeOnHover}
            x={xStart}
            y={yBarScale(point.y)}
            rx={this.props.roundCorners ? 3 : 0}
            width={currentWidth - (this._isRtl ? gapWidthRTL : gapWidthLTR)}
            height={this._barHeight}
            aria-labelledby={`toolTip${this._calloutId}`}
            aria-label={this._getAriaLabel(point)}
            role="img"
            ref={(e: SVGRectElement) => {
              this._refCallback(e, point.legend!);
            }}
            onClick={point.onClick}
            onMouseOver={this._onBarHover.bind(this, point, startColor)}
            onMouseLeave={this._onBarLeave}
            onBlur={this._onBarLeave}
            data-is-focusable={shouldHighlight}
            onFocus={this._onBarFocus.bind(this, point, index, startColor)}
            fill={this.props.enableGradient ? `url(#${gradientId})` : startColor}
          />
        </React.Fragment>
      );
    });

    return bars;
  }

  private _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _onLegendHover(customMessage: string): void {
    if (!this._isLegendSelected()) {
      this.setState({
        isLegendHovered: true,
        selectedLegendTitle: customMessage,
      });
    }
  }

  private _onLegendLeave(isLegendFocused?: boolean): void {
    if (!!isLegendFocused || !this._isLegendSelected()) {
      this.setState({
        isLegendHovered: false,
        selectedLegendTitle: '',
        isLegendSelected: isLegendFocused ? false : this._isLegendSelected(),
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _getLegendData = (data: IHorizontalBarChartWithAxisDataPoint[], palette: IPalette): JSX.Element => {
    const { useSingleColor } = this.props;
    const actions: ILegend[] = [];
    const mapLegendToColor: Record<string, string> = {};

    data.forEach((point: IHorizontalBarChartWithAxisDataPoint, _index: number) => {
      let color: string = useSingleColor
        ? this.props.colors
          ? this._createColors()(1)
          : getNextColor(1, 0, this.props.theme?.isInverted)
        : point.color!;

      if (this.props.enableGradient) {
        color = point.gradient?.[0] || getNextGradient(_index, 0, this.props.theme?.isInverted)[0];
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
        onMouseOutAction: (isLegendSelected?: boolean) => {
          this._onLegendLeave(isLegendSelected);
        },
      };
      actions.push(legend);
    });
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

  private _isLegendSelected = (): boolean => {
    return this.state.isLegendSelected!;
  };

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  private _isLegendHighlighted = (legend?: string) => {
    return this._getHighlightedLegend().includes(legend!);
  };

  private _getHighlightedLegend() {
    return this.state.selectedLegends.length > 0
      ? this.state.selectedLegends
      : this.state.selectedLegendTitle
      ? [this.state.selectedLegendTitle]
      : [];
  }

  private _onLegendSelectionChange(
    selectedLegends: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: ILegend,
  ): void {
    if (this.props.legendProps?.canSelectMultipleLegends) {
      this.setState({
        selectedLegends,
        selectedLegendTitle: currentLegend?.title!,
      });
    } else {
      this.setState({
        selectedLegends: selectedLegends.slice(-1),
        selectedLegendTitle: currentLegend?.title!,
      });
    }
    this.setState({
      isLegendSelected: selectedLegends.length > 0,
    });
    if (this.props.legendProps?.onChange) {
      this.props.legendProps.onChange(selectedLegends, event, currentLegend);
    }
  }

  private _getAxisData = (yAxisData: IAxisData) => {
    if (yAxisData && yAxisData.yAxisDomainValues.length) {
      // For HBCWA x and y Values are swapped
      const { yAxisDomainValues: domainValue } = yAxisData;
      this._xMax = Math.max(domainValue[domainValue.length - 1], this.props.xMaxValue || 0);
    }
  };
  private _getAriaLabel = (point: IHorizontalBarChartWithAxisDataPoint): string => {
    const xValue = point.xAxisCalloutData || point.x;
    const yValue = point.yAxisCalloutData || point.y;
    return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ` + `${yValue}.`;
  };

  private _getChartTitle = (): string => {
    const { chartTitle, data } = this.props;
    return (chartTitle ? `${chartTitle}. ` : '') + `Horizontal bar chart with ${data?.length || 0} bars. `;
  };

  private _getOrderedYAxisLabels = () => {
    const shouldOrderYAxisLabelsByCategoryOrder =
      this._yAxisType === YAxisType.StringAxis && this.props.yAxisCategoryOrder !== 'default';
    if (!shouldOrderYAxisLabelsByCategoryOrder) {
      // Keep the original ordering logic as the default behavior to ensure backward compatibility
      const reversedBars = [...this._points].reverse();
      return reversedBars.map((point: IHorizontalBarChartWithAxisDataPoint) => point.y as string);
    }

    return sortAxisCategories(this._mapCategoryToValues(), this.props.yAxisCategoryOrder);
  };

  private _mapCategoryToValues = () => {
    const categoryToValues: Record<string, number[]> = {};
    this._points.forEach(point => {
      if (!categoryToValues[point.y]) {
        categoryToValues[point.y] = [];
      }
      categoryToValues[point.y].push(point.x);
    });
    return categoryToValues;
  };
}
