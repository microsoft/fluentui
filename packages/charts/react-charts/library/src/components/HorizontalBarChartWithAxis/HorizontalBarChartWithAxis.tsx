import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';
import { Legend, LegendContainer } from '../../components/Legends/Legends.types';
import { Legends } from '../../components/Legends/Legends';
import { useId } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  AccessibilityProps,
  HorizontalBarChartWithAxisDataPoint,
  RefArrayData,
  Margins,
  ChartPopoverProps,
  Chart,
  ImageExportOptions,
} from '../../index';
import { ChildProps } from '../CommonComponents/CartesianChart.types';
import { CartesianChart } from '../CommonComponents/CartesianChart';
import { HorizontalBarChartWithAxisProps } from './HorizontalBarChartWithAxis.types';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import {
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
  areArraysEqual,
  useRtl,
  DataVizPalette,
  getColorFromToken,
  computeLongestBars,
  groupChartDataByYValue,
  MIN_DOMAIN_MARGIN,
  sortAxisCategories,
} from '../../utilities/index';
import { getClosestPairDiffAndRange } from '../../utilities/vbc-utils';
import { toImage } from '../../utilities/image-export-utils';
type ColorScale = (_p?: number) => string;

export const HorizontalBarChartWithAxis: React.FunctionComponent<HorizontalBarChartWithAxisProps> = React.forwardRef<
  HTMLDivElement,
  HorizontalBarChartWithAxisProps
>((props = { yAxisCategoryOrder: 'default' }, forwardedRef) => {
  const _refArray: RefArrayData[] = [];
  const _calloutId: string = useId('callout');
  const _isRtl: boolean = useRtl();
  const _xAxisType: XAxisTypes =
    props.data! && props.data!.length > 0
      ? (getTypeOfAxis(props.data![0].x, true) as XAxisTypes)
      : XAxisTypes.NumericAxis;
  const _yAxisType: YAxisType =
    props.data! && props.data!.length > 0
      ? (getTypeOfAxis(props.data![0].y, false) as YAxisType)
      : YAxisType.StringAxis;
  const _emptyChartId: string = useId('_HBCWithAxis_empty');
  let _points: HorizontalBarChartWithAxisDataPoint[] = [];
  let _barHeight: number = 0;
  let _colors: string[] = [];
  let _margins: Margins;
  let _bars: JSXElement[];
  let _yAxisLabels: string[];
  let _xMax: number;
  let _calloutAnchorPoint: HorizontalBarChartWithAxisDataPoint | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let _longestBarPositiveTotalValue: number;
  let _longestBarNegativeTotalValue: number;
  let _domainMargin: number = MIN_DOMAIN_MARGIN;
  let _yAxisPadding: number = props.yAxisPadding ?? 0.5;
  const cartesianChartRef = React.useRef<Chart>(null);
  const X_ORIGIN: number = 0;
  const _legendsRef = React.useRef<LegendContainer>(null);

  const [color, setColor] = React.useState<string>('');
  const [dataForHoverCard, setDataForHoverCard] = React.useState<number>(0);
  const [isLegendSelected, setIsLegendSelected] = React.useState<boolean>(
    (props.legendProps?.selectedLegends && props.legendProps.selectedLegends.length > 0) ||
      props.legendProps?.selectedLegend !== undefined,
  );
  const [isLegendHovered, setIsLegendHovered] = React.useState<boolean>(false);
  const [selectedLegendTitle, setSelectedLegendTitle] = React.useState<string>(props.legendProps?.selectedLegend ?? '');
  const [xCalloutValue, setXCalloutValue] = React.useState<string>('');
  const [yCalloutValue, setYCalloutValue] = React.useState<string>('');
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
  const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<HorizontalBarChartWithAxisDataPoint>();
  const [callOutAccessibilityData, setCallOutAccessibilityData] = React.useState<AccessibilityProps>();
  const [isPopoverOpen, setPopoverOpen] = React.useState<boolean>(false);
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
  const prevPropsRef = React.useRef<HorizontalBarChartWithAxisProps | null>(null);

  React.useEffect(() => {
    if (prevPropsRef.current) {
      const prevProps = prevPropsRef.current;
      if (!areArraysEqual(prevProps.legendProps?.selectedLegends, props.legendProps?.selectedLegends)) {
        setSelectedLegends(props.legendProps?.selectedLegends || []);
      }
    }
    prevPropsRef.current = props;
  }, [props]);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      chartContainer: cartesianChartRef.current?.chartContainer ?? null,
      toImage: (opts?: ImageExportOptions): Promise<string> => {
        return toImage(cartesianChartRef.current?.chartContainer, _legendsRef.current?.toSVG, _isRtl, opts);
      },
    }),
    [],
  );

  function _adjustProps(): void {
    _points = props.data || [];
    _barHeight = props.barHeight || 32;
    const defaultPalette: string[] = [
      getColorFromToken(DataVizPalette.color6),
      getColorFromToken(DataVizPalette.color1),
      getColorFromToken(DataVizPalette.color5),
      getColorFromToken(DataVizPalette.color7),
    ];
    _colors = props.colors! || defaultPalette;
  }

  function _getMargins(margins: Margins) {
    _margins = margins;
  }

  function _renderContentForOnlyBars(point: HorizontalBarChartWithAxisDataPoint): JSXElement {
    const { useSingleColor = false } = props;
    let selectedPointIndex = 0;
    props.data!.forEach((yDataPoint: HorizontalBarChartWithAxisDataPoint, index: number) => {
      if (yDataPoint.y === point.y) {
        selectedPointIndex = index;
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let color: string;
    if (useSingleColor) {
      //if useSingle color , then check if user has given a palette or not
      // and pick the first color from that or else from our paltette.
      color = props.colors ? _createColors()(1) : getNextColor(1, 0);
    } else {
      color = point.color ? point.color : props.colors ? _createColors()(point.x) : getNextColor(selectedPointIndex, 0);
    }
    return (
      <>
        <ChartPopover
          XValue={point.xAxisCalloutData || point.x.toString()}
          legend={point.legend}
          YValue={point.yAxisCalloutData || point.y}
          color={color}
          culture={props.culture}
          clickPosition={clickPosition}
          isPopoverOpen={isPopoverOpen}
        />
      </>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function _renderCallout(props?: HorizontalBarChartWithAxisDataPoint): JSXElement | null {
    return props ? _renderContentForOnlyBars(props) : null;
  }

  function _getCustomizedCallout() {
    return props.onRenderCalloutPerDataPoint
      ? props.onRenderCalloutPerDataPoint(dataPointCalloutProps, _renderCallout)
      : null;
  }

  function _getGraphData(
    xScale: NumericAxis,
    yScale: NumericAxis | StringAxis,
    containerHeight: number,
    containerWidth: number,
    xElement?: SVGElement | null,
    yElement?: SVGElement | null,
  ) {
    const stackedChartData = groupChartDataByYValue(_points);
    const longestBars = computeLongestBars(stackedChartData, X_ORIGIN);
    _longestBarPositiveTotalValue = longestBars.longestPositiveBar;
    _longestBarNegativeTotalValue = longestBars.longestNegativeBar;

    const { xBarScale, yBarScale } =
      _yAxisType === YAxisType.NumericAxis
        ? _getScales(containerHeight, containerWidth, true)
        : _getScales(containerHeight, containerWidth, false);
    const xRange = xBarScale.range();
    let allBars: JSXElement[] = [];
    // when the chart mounts, the xRange[1] is sometimes seen to be < 0 (like -40) while xRange[0] > 0.
    if (xRange[0] < xRange[1]) {
      allBars = stackedChartData
        .map(singleBarData =>
          _yAxisType === YAxisType.NumericAxis
            ? _createNumericBars(
                containerHeight,
                containerWidth,
                xElement!,
                yElement!,
                singleBarData,
                xBarScale,
                yBarScale,
              )
            : _createStringBars(
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

    return (_bars = allBars);
  }

  function _createColors(): D3ScaleLinear<string, string> | ColorScale {
    const increment = _colors.length <= 1 ? 1 : 1 / (_colors.length - 1);
    const { useSingleColor = false } = props;
    if (useSingleColor) {
      return (_p?: number) => {
        const { colors } = props;
        return colors && colors.length > 0 ? colors[0] : getColorFromToken(DataVizPalette.color16);
      };
    }
    const domainValues = [];
    for (let i = 0; i < _colors.length; i++) {
      domainValues.push(increment * i * _xMax);
    }
    const colorScale = d3ScaleLinear<string>().domain(domainValues).range(_colors);
    return colorScale;
  }

  function _refCallback(element: SVGRectElement, legendTitle: string): void {
    _refArray.push({ index: legendTitle, refElement: element });
  }

  function _onBarHover(
    point: HorizontalBarChartWithAxisDataPoint,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    color: string,
    mouseEvent: React.MouseEvent<SVGElement, MouseEvent>,
  ): void {
    mouseEvent.persist();
    // eslint-disable-next-line @typescript-eslint/no-shadow
    if ((isLegendSelected === false || _isLegendHighlighted(point.legend)) && _calloutAnchorPoint !== point) {
      _calloutAnchorPoint = point;
      setPopoverOpen(true);
      _updatePosition(mouseEvent.clientX, mouseEvent.clientY);
      setDataForHoverCard(point.x);
      setSelectedLegendTitle(point.legend!);
      setColor(props.useSingleColor || props.enableGradient ? color : point.color!);
      // To display callout value, if no callout value given, taking given point.x value as a string.
      setXCalloutValue(point.yAxisCalloutData! || point.y.toString());
      setYCalloutValue(point.xAxisCalloutData || point.x.toString());
      setDataPointCalloutProps(point);
      setCallOutAccessibilityData(point.callOutAccessibilityData);
    }
  }

  function _onBarLeave(): void {
    setPopoverOpen(false);
  }

  function _handleChartMouseLeave(): void {
    _calloutAnchorPoint = null;
    setPopoverOpen(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function _onBarFocus(
    event: React.FocusEvent<SVGRectElement, Element>,
    point: HorizontalBarChartWithAxisDataPoint,
    refArrayIndexNumber: number,
    color: string,
  ): void {
    let cx = 0;
    let cy = 0;

    const targetRect = (event.target as SVGRectElement).getBoundingClientRect();
    cx = targetRect.left + targetRect.width / 2;
    cy = targetRect.top + targetRect.height / 2;
    _updatePosition(cx, cy);
    if ((isLegendSelected === false || _isLegendHighlighted(point.legend)) && _calloutAnchorPoint !== point) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      _refArray.forEach((obj: RefArrayData, index: number) => {
        if (refArrayIndexNumber === index) {
          setPopoverOpen(true);
          setSelectedLegendTitle(point.legend!);
          setDataForHoverCard(point.x);
          setColor(props.useSingleColor ? color : point.color!);
          setXCalloutValue(point.yAxisCalloutData || point.y.toString());
          setYCalloutValue(point.xAxisCalloutData! || point.x.toString());
          setDataPointCalloutProps(point);
          setCallOutAccessibilityData(point.callOutAccessibilityData);
        }
      });
    }
  }

  function _getScales(
    containerHeight: number,
    containerWidth: number,
    isNumericScale: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): { xBarScale: any; yBarScale: any } {
    const xMax = _longestBarPositiveTotalValue;
    const xMin = _longestBarNegativeTotalValue;
    const xDomain = [Math.min(X_ORIGIN, xMin), Math.max(X_ORIGIN, xMax)];
    if (isNumericScale) {
      const yMax = d3Max(_points, (point: HorizontalBarChartWithAxisDataPoint) => point.y as number)!;
      const yMin = d3Min(_points, (point: HorizontalBarChartWithAxisDataPoint) => point.y as number)!;
      const yDomainMax = Math.max(yMax, props.yMaxValue || 0);
      // Default to 0 if yMinValue is not provided.
      const yMinProp = props.yMinValue || 0;
      const yDomainMin = Math.min(yMin, yMinProp);
      const xBarScale = d3ScaleLinear()
        .domain(xDomain)
        .nice()
        .range([_margins.left!, containerWidth - _margins.right!]);
      const yBarScale = d3ScaleLinear()
        .domain([yDomainMin, yDomainMax])
        .range([containerHeight - (_margins.bottom! + _domainMargin), _margins.top! + _domainMargin]);
      return { xBarScale, yBarScale };
    } else {
      // please note these padding default values must be consistent in here
      // and CatrtesianChartBase w for more details refer example
      // http://using-d3js.com/04_07_ordinal_scales.html
      const yBarScale = d3ScaleBand()
        .domain(_yAxisLabels)
        .range([containerHeight - (_margins.bottom! + _domainMargin), _margins.top! + _domainMargin])
        .padding(_yAxisPadding);

      const xBarScale = d3ScaleLinear()
        .domain(xDomain)
        .nice()
        .range([_margins.left!, containerWidth - _margins.right!]);
      return { xBarScale, yBarScale };
    }
  }

  function _createNumericBars(
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement,
    yElement: SVGElement,
    singleBarData: HorizontalBarChartWithAxisDataPoint[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xBarScale: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yBarScale: any,
  ): JSXElement[] {
    const { useSingleColor = false } = props;
    const sortedBars: HorizontalBarChartWithAxisDataPoint[] = [...singleBarData];
    sortedBars.sort((a, b) => {
      const aValue = typeof a.y === 'number' ? a.y : parseFloat(a.y);
      const bValue = typeof b.y === 'number' ? b.y : parseFloat(b.y);
      return bValue - aValue;
    });

    let prevWidthPositive = 0;
    let prevWidthNegative = 0;
    let prevPoint = 0;

    const totalPositiveBars = singleBarData.filter(
      (point: HorizontalBarChartWithAxisDataPoint) => point.x >= X_ORIGIN,
    ).length;
    const totalNegativeBars = singleBarData.length - totalPositiveBars;
    let currPositiveCounter = 0;
    let currNegativeCounter = 0;

    const bars = sortedBars.map((point: HorizontalBarChartWithAxisDataPoint, index: number) => {
      let shouldHighlight = true;
      if (isLegendHovered || isLegendSelected) {
        shouldHighlight = _isLegendHighlighted(point.legend);
      }
      if (point.x >= X_ORIGIN) {
        ++currPositiveCounter;
      }
      if (point.x < X_ORIGIN) {
        ++currNegativeCounter;
      }
      const barStartX = _isRtl
        ? containerWidth -
          (_margins.right! + Math.max(xBarScale(point.x + X_ORIGIN), xBarScale(X_ORIGIN)) - _margins.left!)
        : Math.min(xBarScale(point.x + X_ORIGIN), xBarScale(X_ORIGIN));
      const barHeight: number = Math.max(yBarScale(point.y), 0);
      if (barHeight < 1) {
        return <React.Fragment key={point.x}> </React.Fragment>;
      }
      let startColor: string;
      if (useSingleColor) {
        //if useSingle color , then check if user has given a palette or not
        // and pick the first color from that or else from our paltette.
        startColor = props.colors ? _createColors()(1) : getNextColor(1, 0);
      } else {
        startColor = props.colors ? _createColors()(point.x) : getNextColor(index, 0);
      }

      startColor = point.color && !useSingleColor ? point.color : startColor;

      const prevBarWidth = Math.abs(xBarScale(prevPoint + X_ORIGIN) - xBarScale(X_ORIGIN));
      prevPoint > X_ORIGIN ? (prevWidthPositive += prevBarWidth) : (prevWidthNegative += prevBarWidth);
      const currentWidth = Math.abs(xBarScale(point.x + X_ORIGIN) - xBarScale(X_ORIGIN));
      const gapWidthLTR =
        currentWidth > 2 &&
        ((point.x > X_ORIGIN && currPositiveCounter !== totalPositiveBars) ||
          (point.x < X_ORIGIN && (totalPositiveBars !== 0 || currNegativeCounter > 1)))
          ? 2
          : 0;
      const gapWidthRTL =
        currentWidth > 2 &&
        ((point.x > X_ORIGIN && (totalNegativeBars !== 0 || currPositiveCounter > 1)) ||
          (point.x < X_ORIGIN && currNegativeCounter !== totalNegativeBars))
          ? 2
          : 0;
      let xStart = X_ORIGIN;
      if (_isRtl) {
        xStart = point.x > X_ORIGIN ? barStartX - prevWidthPositive : barStartX + prevWidthNegative;
      } else {
        xStart = point.x > X_ORIGIN ? barStartX + prevWidthPositive : barStartX - prevWidthNegative;
      }
      prevPoint = point.x;

      return (
        <React.Fragment key={`${index}_${point.x}`}>
          <rect
            key={point.y}
            x={xStart}
            y={yBarScale(point.y) - _barHeight / 2}
            data-is-focusable={shouldHighlight}
            width={currentWidth - (_isRtl ? gapWidthRTL : gapWidthLTR)}
            height={_barHeight}
            ref={(e: SVGRectElement) => {
              _refCallback(e, point.legend!);
            }}
            rx={props.roundCorners ? 3 : 0}
            onClick={point.onClick}
            onMouseOver={(event: React.MouseEvent<SVGElement, MouseEvent>) => _onBarHover(point, startColor, event)}
            aria-label={_getAriaLabel(point)}
            role="img"
            aria-labelledby={`toolTip${_calloutId}`}
            onMouseLeave={_onBarLeave}
            onFocus={event => _onBarFocus(event, point, index, startColor)}
            onBlur={_onBarLeave}
            fill={startColor}
            opacity={shouldHighlight ? 1 : 0.1}
            tabIndex={point.legend !== '' ? 0 : undefined}
          />
        </React.Fragment>
      );
    });
    return bars;
  }

  function _getUniqueYValues() {
    const mapY: Record<string, number | string> = {};
    props.data?.forEach((point: HorizontalBarChartWithAxisDataPoint) => {
      mapY[point.y] = point.y;
    });
    const uniqueY = Object.values(mapY);
    return uniqueY;
  }

  function _calculateAppropriateBarHeight(data: number[] | Date[], totalWidth: number, innerPadding: number) {
    const result = getClosestPairDiffAndRange(data);
    if (!result || result[1] === 0) {
      return 16;
    }
    const closestPairDiff = result[0];
    let range = result[1];
    const yMax = d3Max(_points, (point: HorizontalBarChartWithAxisDataPoint) => point.y as number)!;
    // Since we are always rendering from 0 to yMax, we need to ensure that the range is at least yMax
    // to calculate the bar height correctly.
    range = Math.max(range, yMax);
    // Refer to https://microsoft.github.io/fluentui-charting-contrib/docs/rfcs/fix-overlapping-bars-on-continuous-axes
    // for the derivation of the following formula.
    const barWidth = Math.floor(
      (totalWidth * closestPairDiff * (1 - innerPadding)) / (range + closestPairDiff * (1 - innerPadding)),
    );
    return barWidth;
  }

  function _getDomainMarginsForHorizontalBarChart(containerHeight: number): Margins {
    _domainMargin = MIN_DOMAIN_MARGIN;
    const uniqueY = _getUniqueYValues();
    /** Rate at which the space between the bars changes wrt the bar height */
    _yAxisPadding = _yAxisPadding === 1 ? 0.99 : _yAxisPadding;
    const barGapRate = _yAxisPadding / (1 - _yAxisPadding);
    const numBars = uniqueY.length + (uniqueY.length - 1) * barGapRate;
    // Total height available to render the bars
    const totalHeight = containerHeight - (_margins.top! + MIN_DOMAIN_MARGIN) - (_margins.bottom! + MIN_DOMAIN_MARGIN);
    if (_yAxisType !== YAxisType.StringAxis) {
      // Calculate bar height dynamically
      _barHeight =
        props.barHeight || _calculateAppropriateBarHeight(uniqueY as number[] | Date[], totalHeight, _yAxisPadding);
      _barHeight = Math.max(_barHeight, 1);
      _domainMargin += _barHeight / 2;
    } else {
      // Calculate the appropriate bar height
      _barHeight = props.barHeight || totalHeight / numBars;
      /** Total height required to render the bars. Directly proportional to bar height */
      const reqHeight = numBars * _barHeight;
      if (totalHeight >= reqHeight) {
        // Center align the chart by setting equal left and right margins for domain
        _domainMargin = MIN_DOMAIN_MARGIN + (totalHeight - reqHeight) / 2;
      }
    }

    return {
      ..._margins,
      top: _margins.top! + _domainMargin,
      bottom: _margins.bottom! + _domainMargin,
    };
  }

  function _createStringBars(
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement,
    yElement: SVGElement,
    singleBarData: HorizontalBarChartWithAxisDataPoint[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xBarScale: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yBarScale: any,
  ): JSXElement[] {
    const { useSingleColor = false } = props;
    let prevWidthPositive = 0;
    let prevWidthNegative = 0;
    let prevPoint = 0;
    const totalPositiveBars = singleBarData.filter(
      (point: HorizontalBarChartWithAxisDataPoint) => point.x >= X_ORIGIN,
    ).length;
    const totalNegativeBars = singleBarData.length - totalPositiveBars;
    let currPositiveCounter = 0;
    let currNegativeCounter = 0;
    const bars = singleBarData.map((point: HorizontalBarChartWithAxisDataPoint, index: number) => {
      let shouldHighlight = true;
      if (isLegendHovered || isLegendSelected) {
        shouldHighlight = _isLegendHighlighted(point.legend);
      }
      if (point.x >= X_ORIGIN) {
        ++currPositiveCounter;
      }
      if (point.x < X_ORIGIN) {
        ++currNegativeCounter;
      }
      const barStartX = _isRtl
        ? containerWidth -
          (_margins.right! + Math.max(xBarScale(point.x + X_ORIGIN), xBarScale(X_ORIGIN)) - _margins.left!)
        : Math.min(xBarScale(point.x + X_ORIGIN), xBarScale(X_ORIGIN));
      const barHeight: number = Math.max(yBarScale(point.y), 0);
      if (barHeight < 1) {
        return <React.Fragment key={point.x}> </React.Fragment>;
      }
      let startColor: string;
      if (useSingleColor) {
        //if useSingle color , then check if user has given a palette or not
        // and pick the first color from that or else from our paltette.
        startColor = props.colors ? _createColors()(1) : getNextColor(1, 0);
      } else {
        startColor = props.colors ? _createColors()(point.x) : getNextColor(index, 0);
      }

      startColor = point.color && !useSingleColor ? point.color : startColor;
      const prevBarWidth = Math.abs(xBarScale(prevPoint + X_ORIGIN) - xBarScale(X_ORIGIN));
      prevPoint > 0 ? (prevWidthPositive += prevBarWidth) : (prevWidthNegative += prevBarWidth);
      const currentWidth = Math.abs(xBarScale(point.x + X_ORIGIN) - xBarScale(X_ORIGIN));
      const gapWidthLTR =
        currentWidth > 2 &&
        ((point.x > X_ORIGIN && currPositiveCounter !== totalPositiveBars) ||
          (point.x < X_ORIGIN && (totalPositiveBars !== 0 || currNegativeCounter > 1)))
          ? 2
          : 0;
      const gapWidthRTL =
        currentWidth > 2 &&
        ((point.x > X_ORIGIN && (totalNegativeBars !== 0 || currPositiveCounter > 1)) ||
          (point.x < X_ORIGIN && currNegativeCounter !== totalNegativeBars))
          ? 2
          : 0;
      prevPoint = point.x;
      let xStart = X_ORIGIN;
      if (_isRtl) {
        xStart = point.x > X_ORIGIN ? barStartX - prevWidthPositive : barStartX + prevWidthNegative;
      } else {
        xStart = point.x > X_ORIGIN ? barStartX + prevWidthPositive : barStartX - prevWidthNegative;
      }
      return (
        <React.Fragment key={`${index}_${point.x}`}>
          <rect
            transform={`translate(0,${0.5 * (yBarScale.bandwidth() - _barHeight)})`}
            key={point.x}
            x={xStart}
            y={yBarScale(point.y)}
            rx={props.roundCorners ? 3 : 0}
            width={currentWidth - (_isRtl ? gapWidthRTL : gapWidthLTR)}
            height={_barHeight}
            aria-labelledby={`toolTip${_calloutId}`}
            aria-label={_getAriaLabel(point)}
            role="img"
            ref={(e: SVGRectElement) => {
              _refCallback(e, point.legend!);
            }}
            onClick={point.onClick}
            onMouseOver={(event: React.MouseEvent<SVGElement, MouseEvent>) => _onBarHover(point, startColor, event)}
            onMouseLeave={_onBarLeave}
            onBlur={_onBarLeave}
            data-is-focusable={shouldHighlight}
            opacity={shouldHighlight ? 1 : 0.1}
            onFocus={event => _onBarFocus(event, point, index, startColor)}
            fill={startColor}
            tabIndex={point.legend !== '' ? 0 : undefined}
          />
        </React.Fragment>
      );
    });
    return bars;
  }

  function _onLegendHover(customMessage: string): void {
    if (!_isLegendSelected()) {
      setIsLegendHovered(true);
      setSelectedLegendTitle(customMessage);
    }
  }

  function _onLegendLeave(isLegendFocused?: boolean): void {
    if (!!isLegendFocused || !_isLegendSelected()) {
      setIsLegendHovered(false);
      setSelectedLegendTitle('');
      setIsLegendSelected(isLegendFocused ? false : _isLegendSelected());
    }
  }

  function _getLegendData(data: HorizontalBarChartWithAxisDataPoint[]): JSXElement {
    const { useSingleColor } = props;
    const actions: Legend[] = [];
    const mapLegendToColor: Record<string, string> = {};

    data.forEach((point: HorizontalBarChartWithAxisDataPoint, _index: number) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const color: string = useSingleColor ? (props.colors ? _createColors()(1) : getNextColor(1, 0)) : point.color!;

      mapLegendToColor[point.legend!] = color;
    });
    Object.entries(mapLegendToColor).forEach(([legendTitle, color]) => {
      // mapping data to the format Legends component needs
      const legend: Legend = {
        title: legendTitle,
        color,
        hoverAction: () => {
          _handleChartMouseLeave();
          _onLegendHover(legendTitle);
        },
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onMouseOutAction: (isLegendSelected?: boolean) => {
          _onLegendLeave(isLegendSelected);
        },
      };
      actions.push(legend);
    });
    const legends = (
      <Legends
        legends={actions}
        enabledWrapLines={props.enabledLegendsWrapLines}
        overflowText={props.legendsOverflowText}
        {...props.legendProps}
        onChange={_onLegendSelectionChange}
        legendRef={_legendsRef}
      />
    );
    return legends;
  }

  function _isLegendSelected(): boolean {
    return isLegendSelected!;
  }

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  function _isLegendHighlighted(legend?: string) {
    return _getHighlightedLegend().includes(legend!);
  }

  function _getHighlightedLegend() {
    return selectedLegends.length > 0 ? selectedLegends : selectedLegendTitle ? [selectedLegendTitle] : [];
  }

  function _onLegendSelectionChange(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    selectedLegends: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: Legend,
  ): void {
    if (props.legendProps?.canSelectMultipleLegends) {
      setSelectedLegends(selectedLegends);
      setSelectedLegendTitle(currentLegend?.title!);
    } else {
      setSelectedLegends(selectedLegends.slice(-1));
      setSelectedLegendTitle(currentLegend?.title!);
    }
    setIsLegendSelected(selectedLegends.length > 0);
    if (props.legendProps?.onChange) {
      props.legendProps.onChange(selectedLegends, event, currentLegend);
    }
  }

  function _getAxisData(yAxisData: IAxisData) {
    if (yAxisData && yAxisData.yAxisDomainValues.length) {
      // For HBCWA x and y Values are swapped
      const { yAxisDomainValues: domainValue } = yAxisData;
      _xMax = Math.max(domainValue[domainValue.length - 1], props.xMaxValue || 0);
    }
  }
  function _getAriaLabel(point: HorizontalBarChartWithAxisDataPoint): string {
    const xValue = point.xAxisCalloutData || point.x;
    const yValue = point.yAxisCalloutData || point.y;
    return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ` + `${yValue}.`;
  }

  function _getChartTitle(): string {
    const { chartTitle, data } = props;
    return (chartTitle ? `${chartTitle}. ` : '') + `Horizontal bar chart with ${data?.length || 0} bars. `;
  }

  function _getOrderedYAxisLabels() {
    const shouldOrderYAxisLabelsByCategoryOrder =
      _yAxisType === YAxisType.StringAxis && props.yAxisCategoryOrder !== 'default';
    if (!shouldOrderYAxisLabelsByCategoryOrder) {
      // Keep the original ordering logic as the default behavior to ensure backward compatibility
      const reversedBars = [..._points].reverse();
      return reversedBars.map((point: HorizontalBarChartWithAxisDataPoint) => point.y as string);
    }

    return sortAxisCategories(_mapCategoryToValues(), props.yAxisCategoryOrder);
  }

  function _mapCategoryToValues() {
    const categoryToValues: Record<string, number[]> = {};
    _points.forEach(point => {
      if (!categoryToValues[point.y]) {
        categoryToValues[point.y] = [];
      }
      categoryToValues[point.y].push(point.x);
    });
    return categoryToValues;
  }

  function _isChartEmpty(): boolean {
    return !(props.data && props.data.length > 0);
  }

  function _updatePosition(newX: number, newY: number): void {
    const threshold = 1; // Set a threshold for movement
    const { x, y } = clickPosition;

    // Calculate the distance moved
    const distance = Math.sqrt(Math.pow(newX - x, 2) + Math.pow(newY - y, 2));
    // Update the position only if the distance moved is greater than the threshold
    if (distance > threshold) {
      setClickPosition({ x: newX, y: newY });
      setPopoverOpen(true);
    }
  }

  function _getDomainNRangeValues(
    points: HorizontalBarChartWithAxisDataPoint[],
    margins: Margins,
    width: number,
    chartType: ChartTypes,
    isRTL: boolean,
    xAxisType: XAxisTypes,
    barWidth: number,
    tickValues: Date[] | number[] | undefined,
    shiftX: number,
  ) {
    let domainNRangeValue: IDomainNRange;
    if (xAxisType === XAxisTypes.NumericAxis) {
      domainNRangeValue = domainRangeOfNumericForHorizontalBarChartWithAxis(
        points,
        margins,
        width,
        isRTL,
        shiftX,
        X_ORIGIN,
      );
    } else {
      domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    }
    return domainNRangeValue;
  }

  if (!_isChartEmpty()) {
    _adjustProps();
    const calloutProps: ChartPopoverProps = {
      color: color,
      legend: selectedLegendTitle,
      XValue: xCalloutValue,
      YValue: yCalloutValue ? yCalloutValue : dataForHoverCard,
      ...props.calloutProps,
      ...getAccessibleDataObject(callOutAccessibilityData),
      customCallout: {
        customizedCallout: _getCustomizedCallout() !== null ? _getCustomizedCallout()! : undefined,
        customCalloutProps: props.calloutPropsPerDataPoint
          ? props.calloutPropsPerDataPoint(dataPointCalloutProps!)
          : undefined,
      },
      isCartesian: true,
      isPopoverOpen,
      clickPosition,
    };
    const tickParams = {
      tickValues: props.tickValues,
      tickFormat: props.tickFormat,
    };

    _yAxisLabels = _getOrderedYAxisLabels();
    _xMax = Math.max(d3Max(_points, (point: HorizontalBarChartWithAxisDataPoint) => point.x)!, props.xMaxValue || 0);
    const legendBars: JSXElement = _getLegendData(_points);
    return (
      <CartesianChart
        yAxisPadding={_yAxisPadding}
        {...props}
        chartTitle={_getChartTitle()}
        points={_points}
        chartType={ChartTypes.HorizontalBarChartWithAxis}
        xAxisType={_xAxisType}
        yAxisType={_yAxisType}
        getDomainNRangeValues={_getDomainNRangeValues}
        stringDatasetForYAxisDomain={_yAxisLabels}
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        createYAxis={createYAxisForHorizontalBarChartWithAxis}
        createStringYAxis={createStringYAxisForHorizontalBarChartWithAxis}
        getMinMaxOfYAxis={findHBCWANumericMinMaxOfY}
        barwidth={_barHeight}
        getmargins={_getMargins}
        getYDomainMargins={_getDomainMarginsForHorizontalBarChart}
        getGraphData={_getGraphData}
        getAxisData={_getAxisData}
        onChartMouseLeave={_handleChartMouseLeave}
        componentRef={cartesianChartRef}
        /* eslint-disable react/jsx-no-bind */
        // eslint-disable-next-line @typescript-eslint/no-shadow
        children={(props: ChildProps) => {
          return (
            <>
              <g>{_bars}</g>
            </>
          );
        }}
      />
    );
  } else {
    return (
      <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
    );
  }
});
HorizontalBarChartWithAxis.displayName = 'HorizontalBarChartWithAxis';
