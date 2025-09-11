import * as React from 'react';
import { max as d3Max, min as d3Min } from 'd3-array';
import { select as d3Select } from 'd3-selection';
import { useVerticalStackedBarChartStyles } from './useVerticalStackedBarChartStyles.styles';
import {
  scaleLinear as d3ScaleLinear,
  ScaleLinear as D3ScaleLinear,
  scaleBand as d3ScaleBand,
  scaleUtc as d3ScaleUtc,
  scaleTime as d3ScaleTime,
  ScaleBand,
} from 'd3-scale';
import { useId } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import {
  AccessibilityProps,
  CartesianChart,
  ChildProps,
  VerticalStackedBarDataPoint,
  Margins,
  VerticalStackedBarChartProps,
  VerticalStackedChartProps,
  VSChartDataPoint,
  LineDataInVerticalStackedBarChart,
  ModifiedCartesianChartProps,
  Legend,
  ChartPopover,
  Legends,
  Chart,
  DataPoint,
  ImageExportOptions,
  LegendContainer,
} from '../../index';
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
  areArraysEqual,
  calculateLongestLabelWidth,
  useRtl,
  DataVizPalette,
  getColorFromToken,
  findVSBCNumericMinMaxOfY,
  YAxisType,
  createNumericYAxis,
  IDomainNRange,
  domainRangeOfDateForAreaLineScatterVerticalBarCharts,
  domainRangeOfVSBCNumeric,
  domainRangeOfXStringAxis,
  createStringYAxis,
  calcTotalWidth,
  calcBandwidth,
  calcRequiredWidth,
  sortAxisCategories,
} from '../../utilities/index';
import { toImage } from '../../utilities/image-export-utils';
import { formatDateToLocaleString } from '@fluentui/chart-utilities';

type NumericScale = D3ScaleLinear<number, number>;
type StringScale = ScaleBand<string>;
const barGapMultiplier = 0.2;
const barGapMin = 1;
const MIN_DOMAIN_MARGIN = 8;

interface RefArrayData {
  refElement?: SVGGElement | null;
}

type LinePoint = LineDataInVerticalStackedBarChart & { index: number; xItem: VerticalStackedChartProps };
type LineObject = { [key: string]: LinePoint[] };
type LineLegends = {
  title: string;
  color: string;
};
type CalloutAnchorPointData = {
  xAxisDataPoint: string;
  chartDataPoint: VSChartDataPoint;
};

export const VerticalStackedBarChart: React.FunctionComponent<VerticalStackedBarChartProps> = React.forwardRef<
  HTMLDivElement,
  VerticalStackedBarChartProps
>((_props, forwardedRef) => {
  const props: VerticalStackedBarChartProps = {
    xAxisCategoryOrder: 'default',
    yAxisCategoryOrder: 'default',
    maxBarWidth: 24,
    ..._props,
  };
  const _isRtl: boolean = useRtl();
  const _createLegendsForLine: (data: VerticalStackedChartProps[]) => LineLegends[] = (
    data: VerticalStackedChartProps[],
  ) => _getLineLegends(data);
  const _tooltipId: string = useId('VSBCTooltipId_');
  const _emptyChartId: string = useId('_VSBC_empty');
  let _points: VerticalStackedChartProps[] = [];
  let _dataset: VerticalStackedBarDataPoint[];
  let _xAxisLabels: string[] = [];
  let _bars: JSXElement[];
  let _xAxisType: XAxisTypes =
    props.data! && props.data!.length > 0
      ? (getTypeOfAxis(props.data[0]!.xAxisPoint, true) as XAxisTypes)
      : XAxisTypes.StringAxis;
  let _barWidth: number = 0;
  let _colors: string[];
  let _margins: Margins;
  let _lineObject: LineObject;
  let _yMax: number;
  let _yMin: number;
  let _calloutAnchorPoint: CalloutAnchorPointData | null;
  let _domainMargin: number = MIN_DOMAIN_MARGIN;
  let _xAxisInnerPadding: number = 0;
  let _xAxisOuterPadding: number = 0;
  const cartesianChartRef = React.useRef<Chart>(null);
  const Y_ORIGIN: number = 0;
  const _legendsRef = React.useRef<LegendContainer>(null);
  let _yAxisType: YAxisType;
  let _yAxisLabels: string[] = [];

  const [selectedLegends, setSelectedLegends] = React.useState(props.legendProps?.selectedLegends || []);
  const [activeLegend, setActiveLegend] = React.useState<string | undefined>(undefined);
  const [dataForHoverCard, setDataForHoverCard] = React.useState(0);
  const [color, setColor] = React.useState('');
  const [hoverXValue, setHoverXValue] = React.useState<string | number>('');
  const [YValueHover, setYValueHover] = React.useState<(LineDataInVerticalStackedBarChart | VSChartDataPoint)[]>([]);
  const [xCalloutValue, setXCalloutValue] = React.useState('');
  const [yCalloutValue, setYCalloutValue] = React.useState('');
  const [activeXAxisDataPoint, setActiveXAxisDataPoint] = React.useState<number | string | Date>('');
  const [calloutLegend, setCalloutLegend] = React.useState('');
  const [stackCalloutProps, setStackCalloutProps] = React.useState<VerticalStackedChartProps>();
  const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<VSChartDataPoint>();
  const [callOutAccessibilityData, setCallOutAccessibilityData] = React.useState<AccessibilityProps>();
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const prevPropsRef = React.useRef<VerticalStackedBarChartProps | null>(null);
  React.useEffect(() => {
    if (prevPropsRef.current) {
      const prevProps = prevPropsRef.current;
      if (!areArraysEqual(prevProps.legendProps?.selectedLegends, props.legendProps?.selectedLegends)) {
        setSelectedLegends(props.legendProps?.selectedLegends || []);
      }
      if (prevProps.height !== props.height || prevProps.width !== props.width || prevProps.data !== props.data) {
        _adjustProps();
        _dataset = _createDataSetLayer();
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

  function _getLegendData(data: VerticalStackedChartProps[], lineLegends: LineLegends[]): JSXElement {
    if (props.hideLegend) {
      return <></>;
    }
    const defaultPalette: string[] = [
      getColorFromToken(DataVizPalette.color6),
      getColorFromToken(DataVizPalette.color1),
      getColorFromToken(DataVizPalette.color5),
      getColorFromToken(DataVizPalette.color7),
      getColorFromToken(DataVizPalette.color10),
    ];
    const actions: Legend[] = [];
    const { allowHoverOnLegend = true } = props;

    data.forEach((singleChartData: VerticalStackedChartProps) => {
      singleChartData.chartData.forEach((point: VSChartDataPoint) => {
        const color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
        const checkSimilarLegends = actions.filter((leg: Legend) => leg.title === point.legend && leg.color === color);
        if (checkSimilarLegends!.length > 0) {
          return;
        }

        const legend: Legend = {
          title: point.legend,
          color,
          hoverAction: allowHoverOnLegend
            ? () => {
                _handleChartMouseLeave();
                _onLegendHover(point.legend);
              }
            : undefined,
          onMouseOutAction: allowHoverOnLegend ? () => _onLegendLeave() : undefined,
        };

        actions.push(legend);
      });
    });
    const legendsOfLine: Legend[] = [];
    if (lineLegends && lineLegends.length > 0) {
      lineLegends.forEach((point: LineLegends) => {
        const legend: Legend = {
          title: point.title,
          color: point.color,
          isLineLegendInBarChart: true,
          hoverAction: allowHoverOnLegend
            ? () => {
                _handleChartMouseLeave();
                _onLegendHover(point.title);
              }
            : undefined,
          onMouseOutAction: allowHoverOnLegend ? () => _onLegendLeave() : undefined,
        };
        legendsOfLine.push(legend);
      });
    }
    const totalLegends: Legend[] = legendsOfLine.concat(actions);
    return (
      <Legends
        legends={totalLegends}
        enabledWrapLines={props.enabledLegendsWrapLines}
        overflowText={props.legendsOverflowText}
        {...props.legendProps}
        onChange={_onLegendSelectionChange}
        legendRef={_legendsRef}
      />
    );
  }

  function _getHighlightedLegend() {
    return selectedLegends.length > 0 ? selectedLegends : activeLegend ? [activeLegend] : [];
  }

  function _lineHoverFocus(
    lineData: LinePoint,
    event: React.MouseEvent<SVGElement> | React.FocusEvent<SVGCircleElement, Element>,
  ): void {
    let clientX = 0;
    let clientY = 0;
    if ('clientX' in event) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      const boundingRect = event.target.getBoundingClientRect();
      clientX = boundingRect.left + boundingRect.width / 2;
      clientY = boundingRect.top + boundingRect.height / 2;
    }
    if (_getHighlightedLegend().length === 1) {
      if (_noLegendHighlighted() || _isLegendHighlighted(lineData.legend)) {
        _updatePosition(clientX, clientY);
        setPopoverOpen(true);
        setXCalloutValue(`${lineData.xItem.xAxisPoint}`);
        setYCalloutValue(`${lineData.yAxisCalloutData || lineData.data || lineData.y}`);
        setActiveXAxisDataPoint(lineData.xItem.xAxisPoint);
        setColor(lineData.color);
      }
    } else {
      _onStackHoverFocus(lineData.xItem, event as React.MouseEvent<SVGElement>);
    }
  }

  function _onStackHoverFocus(
    stack: VerticalStackedChartProps,
    mouseEvent: React.MouseEvent<SVGElement> | SVGGElement,
  ): void {
    let clientX = 0;
    let clientY = 0;
    if ('clientX' in mouseEvent) {
      clientX = mouseEvent.clientX;
      clientY = mouseEvent.clientY;
    } else {
      // Handle case where mouseEvent is an SVGGElement
      const boundingRect = mouseEvent.getBoundingClientRect();
      clientX = boundingRect.left + boundingRect.width / 2;
      clientY = boundingRect.top + boundingRect.height / 2;
    }
    if (!_noLegendHighlighted()) {
      stack = {
        ...stack,
        chartData: stack.chartData.filter((dataPoint: { legend: any }) => _isLegendHighlighted(dataPoint.legend)),
        lineData: stack.lineData?.filter((dataPoint: { legend: any }) => _isLegendHighlighted(dataPoint.legend)),
      };
    }
    const lineData = stack.lineData;
    const isLinesPresent: boolean = lineData !== undefined && lineData.length > 0;
    if (isLinesPresent) {
      lineData!.forEach((item: LineDataInVerticalStackedBarChart & { shouldDrawBorderBottom?: boolean }) => {
        item.data = item.data || item.y;
        item.shouldDrawBorderBottom = true;
      });
    }
    _updatePosition(clientX, clientY);
    setPopoverOpen(stack.chartData.length > 0 || (stack.lineData?.length ?? 0) > 0);
    setYValueHover(
      isLinesPresent
        ? [...lineData!.sort((a, b) => (a.data! < b.data! ? 1 : -1)), ...stack.chartData.slice().reverse()]
        : stack.chartData.slice().reverse(),
    );
    setHoverXValue(
      stack.xAxisPoint instanceof Date
        ? formatDateToLocaleString(stack.xAxisPoint, props.culture, props.useUTC as boolean)
        : stack.xAxisPoint,
    );
    setStackCalloutProps(stack);
    setActiveXAxisDataPoint(stack.xAxisPoint);
    setCallOutAccessibilityData(stack.stackCallOutAccessibilityData);
  }

  function _handleChartMouseLeave(): void {
    _calloutAnchorPoint = null;
    setPopoverOpen(false);
    setActiveXAxisDataPoint('');
  }

  const _onClick = (
    data: VerticalStackedChartProps | VSChartDataPoint,
    mouseEvent: React.MouseEvent<SVGElement>,
  ): void => {
    props.onBarClick?.(mouseEvent, data);
    props.href ? (window.location.href = props.href) : '';
  };

  function _adjustProps(): void {
    _points = props.data || [];
    _barWidth = getBarWidth(props.barWidth, props.maxBarWidth);
    const defaultColors: string[] = [
      getColorFromToken(DataVizPalette.color6),
      getColorFromToken(DataVizPalette.color1),
      getColorFromToken(DataVizPalette.color5),
      getColorFromToken(DataVizPalette.color7),
      getColorFromToken(DataVizPalette.color10),
    ];
    _colors = defaultColors;
    _xAxisType = getTypeOfAxis(props.data[0].xAxisPoint, true) as XAxisTypes;
    _lineObject = _getFormattedLineData(props.data);
    _xAxisInnerPadding = getScalePadding(
      props.xAxisInnerPadding,
      props.xAxisPadding,
      _xAxisType === XAxisTypes.StringAxis ? 2 / 3 : 1 / 2,
    );
    _xAxisOuterPadding = getScalePadding(props.xAxisOuterPadding, props.xAxisPadding, 0);
    _initYAxisParams();
  }

  function _createDataSetLayer(): VerticalStackedBarDataPoint[] {
    const dataset: VerticalStackedBarDataPoint[] = _points.map(singlePointData => {
      if (_yAxisType === YAxisType.StringAxis) {
        return {
          x: singlePointData.xAxisPoint,
          y: 0,
        };
      }
      let total: number = 0;
      singlePointData.chartData!.forEach((point: VSChartDataPoint) => {
        total = total + (point.data as number);
      });
      return {
        x: singlePointData.xAxisPoint,
        y: total,
      };
    });
    _xAxisLabels = _getOrderedXAxisLabels();
    return dataset;
  }

  function _onLegendHover(legendTitle: string): void {
    setActiveLegend(legendTitle);
  }

  function _onLegendLeave(): void {
    setActiveLegend(undefined);
  }

  function _onLegendSelectionChange(
    _selectedLegends: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: Legend,
  ): void {
    if (props.legendProps?.canSelectMultipleLegends) {
      setSelectedLegends(_selectedLegends);
    } else {
      setSelectedLegends(_selectedLegends.slice(-1));
    }
    if (props.legendProps?.onChange) {
      props.legendProps.onChange(_selectedLegends, event, currentLegend);
    }
  }

  function _getMargins(margins: Margins) {
    _margins = margins;
  }

  function _getGraphData(
    xScale: any,
    yScale: NumericScale | StringScale,
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement | null,
  ) {
    const { xBarScale, yBarScale } = _getScales(containerHeight, containerWidth);
    return (_bars = _createBar(
      xBarScale,
      _yAxisType === YAxisType.StringAxis ? yScale : yBarScale,
      containerHeight,
      xElement!,
    ));
  }

  function _getAxisData(yAxisData: IAxisData) {
    if (yAxisData && yAxisData.yAxisDomainValues.length) {
      const { yAxisDomainValues: domainValue } = yAxisData;
      _yMax = Math.max(domainValue[domainValue.length - 1], props.yMaxValue || Y_ORIGIN);
      _yMin = Math.min(domainValue[0], props.yMinValue || Y_ORIGIN);
    }
  }

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  function _isLegendHighlighted(legendTitle: string) {
    return _getHighlightedLegend().includes(legendTitle);
  }

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  function _noLegendHighlighted() {
    return _getHighlightedLegend().length === 0;
  }

  function _getAriaLabel(
    singleChartData: VerticalStackedChartProps,
    point?: VSChartDataPoint | LineDataInVerticalStackedBarChart,
    isLinePoint?: boolean,
  ): string {
    if (!point) {
      /** if shouldFocusWholeStack is true */
      const xValue =
        singleChartData.xAxisCalloutData ||
        (singleChartData.xAxisPoint instanceof Date
          ? formatDateToLocaleString(singleChartData.xAxisPoint, props.culture, props.useUTC as boolean)
          : singleChartData.xAxisPoint);
      const pointValues = singleChartData.chartData
        .map(pt => {
          const legend = pt.legend;
          const yValue = pt.yAxisCalloutData || pt.data;
          return _noLegendHighlighted() || _isLegendHighlighted(legend) ? `${legend}, ${yValue}.` : '';
        })
        .filter(str => str !== '')
        .join(' ');
      const lineValues = singleChartData.lineData
        ?.map(ln => {
          const legend = ln.legend;
          const yValue = ln.yAxisCalloutData || ln.data || ln.y;
          return _noLegendHighlighted() || _isLegendHighlighted(legend) ? `${legend}, ${yValue}.` : '';
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
      (!isLinePoint && (point as VSChartDataPoint).xAxisCalloutData) ||
      (singleChartData.xAxisPoint instanceof Date
        ? formatDateToLocaleString(singleChartData.xAxisPoint, props.culture, props.useUTC as boolean)
        : singleChartData.xAxisPoint);
    const legend = point.legend;
    const yValue =
      point.yAxisCalloutData ||
      (isLinePoint ? point.data || (point as LineDataInVerticalStackedBarChart).y : point.data);
    return (
      (!isLinePoint && (point as VSChartDataPoint).callOutAccessibilityData?.ariaLabel) ||
      `${xValue}. ${legend}, ${yValue}.`
    );
  }

  function _getCustomizedCallout() {
    const _isHavingLines = props.data.some(
      (item: VerticalStackedChartProps) => item.lineData && item.lineData.length > 0,
    );
    return props.onRenderCalloutPerStack
      ? props.onRenderCalloutPerStack(stackCalloutProps)
      : props.onRenderCalloutPerDataPoint && !_isHavingLines
      ? props.onRenderCalloutPerDataPoint(dataPointCalloutProps, _renderCallout)
      : null;
  }

  function _toFocusWholeStack(_isHavingLines: boolean): boolean {
    const { isCalloutForStack = false } = props;
    let shouldFocusStackOnly: boolean = false;
    if (_isHavingLines) {
      if (_getHighlightedLegend().length === 1) {
        shouldFocusStackOnly = false;
      } else {
        shouldFocusStackOnly = true;
      }
    } else {
      shouldFocusStackOnly = isCalloutForStack;
    }
    return shouldFocusStackOnly;
  }

  function _getDomainNRangeValues(
    points: DataPoint[],
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
  }

  function _getFormattedLineData(data: VerticalStackedChartProps[]): LineObject {
    const linesData: LinePoint[] = [];
    const formattedLineData: LineObject = {};
    data.forEach((item: VerticalStackedChartProps, index: number) => {
      if (item.lineData) {
        item.lineData.forEach((line: any) => {
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
  }

  function _getLineLegends(data: VerticalStackedChartProps[]): LineLegends[] {
    const lineObject: LineObject = _lineObject;
    const lineLegends: LineLegends[] = [];
    Object.keys(lineObject).forEach((item: string) => {
      lineLegends.push({
        title: item,
        color: lineObject[item][0].color,
      });
    });
    return lineLegends;
  }

  function _createLines(
    xScale: any,
    yScalePrimary: NumericScale | StringScale,
    containerHeight: number,
    containerWidth: number,
    yScaleSecondary?: NumericScale,
  ): JSXElement {
    const lineObject: LineObject = _getFormattedLineData(props.data);
    const lines: React.ReactNode[] = [];
    const borderForLines: React.ReactNode[] = [];
    const dots: React.ReactNode[] = [];
    //const { theme } = props;
    const lineBorderWidth = props.lineOptions?.lineBorderWidth
      ? Number.parseFloat(props.lineOptions!.lineBorderWidth!.toString())
      : 0;
    const xScaleBandwidthTranslate = _xAxisType !== XAxisTypes.StringAxis ? 0 : xScale.bandwidth() / 2;
    Object.keys(lineObject).forEach((item: string, index: number) => {
      const shouldHighlight = _isLegendHighlighted(item) || _noLegendHighlighted();
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
          !useSecondaryYScale && _yAxisType === YAxisType.StringAxis
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
              stroke={tokens.colorNeutralBackground1}
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
            onMouseOver={event => _lineHover(lineObject[item][i - 1], event)}
            onMouseLeave={_handleMouseOut}
          />,
        );
      }
    });
    Object.keys(lineObject).forEach((item: string, index: number) => {
      lineObject[item].forEach((circlePoint: LinePoint, subIndex: number) => {
        const circleRef: { refElement: SVGCircleElement | null } = { refElement: null };
        const noBarsAndLinesActive =
          circlePoint.xItem.chartData.filter(
            dataPoint => _noLegendHighlighted() || _isLegendHighlighted(dataPoint.legend),
          ).length === 0;
        const yScaleBandwidthTranslate =
          !circlePoint.useSecondaryYScale && _yAxisType === YAxisType.StringAxis
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
            onMouseOver={event => _lineHover(circlePoint, event)}
            onMouseLeave={_handleMouseOut}
            r={_getCircleOpacityAndRadius(circlePoint.xItem.xAxisPoint, circlePoint.legend).radius}
            stroke={circlePoint.color}
            fill={tokens.colorNeutralBackground1}
            strokeWidth={3}
            // Elements with visibility: hidden cannot receive focus, so use opacity: 0 instead to hide them.
            // For more information, see https://fuzzbomb.github.io/accessibility-demos/visually-hidden-focus-test.html
            opacity={_getCircleOpacityAndRadius(circlePoint.xItem.xAxisPoint, circlePoint.legend).opacity}
            transform={`translate(${xScaleBandwidthTranslate}, ${yScaleBandwidthTranslate})`}
            ref={e => (circleRef.refElement = e)}
            {...(noBarsAndLinesActive
              ? {
                  tabIndex: !props.hideTooltip ? 0 : undefined,
                  onFocus: event => _lineFocus(event, circlePoint, circleRef),
                  onBlur: _handleMouseOut,
                  role: 'img',
                  'aria-label': _getAriaLabel(circlePoint.xItem, circlePoint as VSChartDataPoint),
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
  }

  function _getCircleOpacityAndRadius(
    xAxisPoint: string | number | Date,
    legend: string,
  ): { opacity: number; radius: number } {
    if (!_noLegendHighlighted()) {
      if (xAxisPoint === activeXAxisDataPoint && _isLegendHighlighted(legend)) {
        return { opacity: 1, radius: 8 };
      } else if (_isLegendHighlighted(legend)) {
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
  }

  function _renderCallout(props?: VSChartDataPoint): JSXElement | null {
    return props ? (
      <ChartPopover
        culture={props.culture}
        XValue={props.xAxisCalloutData}
        xCalloutValue={xCalloutValue}
        yCalloutValue={yCalloutValue}
        clickPosition={clickPosition}
        isPopoverOpen={isPopoverOpen}
        legend={props.legend}
        YValue={props.yAxisCalloutData}
        color={props.color}
      />
    ) : null;
  }

  function _onRectHover(
    xAxisPoint: string | number | Date,
    point: VSChartDataPoint,
    color: string,
    mouseEvent: React.MouseEvent<SVGElement>,
  ): void {
    mouseEvent.persist();
    _onRectFocusHover(xAxisPoint, point, color, mouseEvent);
  }

  function _onRectFocusHover(
    xAxisPoint: string | number | Date,
    point: VSChartDataPoint,
    color: string,
    mouseEvent: React.MouseEvent<SVGElement> | SVGGElement,
  ) {
    let clientX = 0;
    let clientY = 0;
    if ('clientX' in mouseEvent) {
      clientX = mouseEvent.clientX;
      clientY = mouseEvent.clientY;
    } else {
      // Handle case where mouseEvent is an SVGGElement
      const boundingRect = mouseEvent.getBoundingClientRect();
      clientX = boundingRect.left + boundingRect.width / 2;
      clientY = boundingRect.top + boundingRect.height / 2;
    }
    if (_calloutAnchorPoint?.chartDataPoint !== point || _calloutAnchorPoint?.xAxisDataPoint !== xAxisPoint) {
      _calloutAnchorPoint = {
        chartDataPoint: point,
        xAxisDataPoint:
          xAxisPoint instanceof Date
            ? formatDateToLocaleString(xAxisPoint, props.culture, props.useUTC as boolean)
            : xAxisPoint.toString(),
      };
      const xCalloutValue =
        point.xAxisCalloutData ||
        (xAxisPoint instanceof Date
          ? formatDateToLocaleString(xAxisPoint, props.culture, props.useUTC as boolean)
          : xAxisPoint.toString());

      _updatePosition(clientX, clientY);
      setPopoverOpen(_noLegendHighlighted() || _isLegendHighlighted(point.legend));
      setCalloutLegend(point.legend);
      setDataForHoverCard(point.data as number);
      setColor(color);
      setXCalloutValue(xCalloutValue);
      setYCalloutValue(point.yAxisCalloutData!);
      setDataPointCalloutProps(point);
      setCallOutAccessibilityData(point.callOutAccessibilityData);
    }
  }

  function _lineHover(lineData: LinePoint, mouseEvent: React.MouseEvent<SVGElement>) {
    mouseEvent.persist();
    _lineHoverFocus(lineData, mouseEvent);
  }

  function _lineFocus(
    event: React.FocusEvent<SVGCircleElement, Element>,
    lineData: LinePoint,
    ref: { refElement: SVGCircleElement | null },
  ) {
    if (ref.refElement) {
      _lineHoverFocus(lineData, event);
    }
  }

  function _onStackHover(stack: VerticalStackedChartProps, mouseEvent: React.MouseEvent<SVGElement>): void {
    mouseEvent.persist();
    _onStackHoverFocus(stack, mouseEvent);
  }

  function _onRectFocus(point: VSChartDataPoint, xAxisPoint: string, color: string, ref: RefArrayData): void {
    if (ref.refElement) {
      _onRectFocusHover(xAxisPoint, point, color, ref.refElement);
    }
  }

  function _onStackFocus(stack: VerticalStackedChartProps, groupRef: RefArrayData): void {
    if (groupRef.refElement) {
      _onStackHoverFocus(stack, groupRef.refElement);
    }
  }

  function _handleMouseOut(): void {
    setPopoverOpen(false);
  }

  function _getBarGapAndScale(
    bars: VSChartDataPoint[],
    yBarScale: NumericScale | StringScale,
    defaultTotalHeight?: number,
  ): {
    readonly gapHeight: number;
    readonly heightValueScale: number;
    readonly absStackTotal: number;
  } {
    const { barGapMax = 0 } = props;
    let totalData = 0;
    let totalHeight: number;
    let sumOfPercent = 0;
    let scalingRatio: number;
    if (_yAxisType === YAxisType.StringAxis) {
      totalHeight =
        defaultTotalHeight ?? bars.reduce((total, bar) => total + (yBarScale as StringScale)(bar.data as string)!, 0);
    } else {
      // When displaying gaps between the bars, the height of each bar is
      // adjusted so that the total of all bars is not changed by the gaps
      totalData = bars.reduce((iter, value) => iter + Math.abs(value.data as number), 0);
      totalHeight =
        defaultTotalHeight ?? Math.abs((yBarScale as NumericScale)(totalData) - (yBarScale as NumericScale)(Y_ORIGIN));
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
      _yAxisType === YAxisType.StringAxis ? 0 : (totalHeight - gapHeight * gaps) / (totalData * scalingRatio!);
    return {
      gapHeight,
      heightValueScale,
      absStackTotal: totalData,
    } as const;
  }

  function _getScales(containerHeight: number, containerWidth: number) {
    const yDomain = [Math.min(Y_ORIGIN, _yMin), Math.max(Y_ORIGIN, _yMax)];
    const yBarScale = d3ScaleLinear()
      .domain(yDomain)
      .range([0, containerHeight - _margins.bottom! - _margins.top!]);
    if (_xAxisType === XAxisTypes.NumericAxis) {
      const xMax = d3Max(_dataset, (point: VerticalStackedBarDataPoint) => point.x as number)!;
      const xMin = d3Min(_dataset, (point: VerticalStackedBarDataPoint) => point.x as number)!;

      const xBarScale = d3ScaleLinear()
        .domain(_isRtl ? [xMax, xMin] : [xMin, xMax])
        .range([_margins.left! + _domainMargin, containerWidth - _margins.right! - _domainMargin]);
      if (!isScalePaddingDefined(props.xAxisInnerPadding, props.xAxisPadding)) {
        xBarScale.nice();
      }
      return { xBarScale, yBarScale };
    }
    if (_xAxisType === XAxisTypes.DateAxis) {
      const sDate = d3Min(_dataset, (point: VerticalStackedBarDataPoint) => {
        return point.x as Date;
      })!;
      const lDate = d3Max(_dataset, (point: VerticalStackedBarDataPoint) => {
        return point.x as Date;
      })!;
      const xBarScale = props.useUTC ? d3ScaleUtc() : d3ScaleTime();
      xBarScale
        .domain(_isRtl ? [lDate, sDate] : [sDate, lDate])
        .range([_margins.left! + _domainMargin, containerWidth - _margins.right! - _domainMargin]);

      return { xBarScale, yBarScale };
    }
    const xBarScale = d3ScaleBand()
      .domain(_xAxisLabels)
      .range(
        _isRtl
          ? [containerWidth - _margins.right! - _domainMargin, _margins.left! + _domainMargin]
          : [_margins.left! + _domainMargin, containerWidth - _margins.right! - _domainMargin],
      )
      .paddingInner(_xAxisInnerPadding)
      .paddingOuter(_xAxisOuterPadding);

    return { xBarScale, yBarScale };
  }

  const _isChartEmpty = (): boolean => {
    return !(
      props.data &&
      props.data.length > 0 &&
      props.data.some(item => item.chartData.length > 0 || (item.lineData && item.lineData.length > 0))
    );
  };

  function _updatePosition(newX: number, newY: number) {
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

  function _getDomainMargins(containerWidth: number): Margins {
    _domainMargin = MIN_DOMAIN_MARGIN;

    const totalWidth = calcTotalWidth(containerWidth, _margins, MIN_DOMAIN_MARGIN);

    if (_xAxisType === XAxisTypes.StringAxis) {
      if (isScalePaddingDefined(props.xAxisOuterPadding, props.xAxisPadding)) {
        // Setting the domain margin for string x-axis to 0 because the xAxisOuterPadding prop is now available
        // to adjust the space before the first bar and after the last bar.
        _domainMargin = 0;
      } else if (props.barWidth !== 'auto') {
        // Update the bar width so that when CartesianChart rerenders,
        // the following calculations don't use the previous bar width.
        _barWidth = getBarWidth(props.barWidth, props.maxBarWidth);
        /** Total width required to render the bars. Directly proportional to bar width */
        const reqWidth = calcRequiredWidth(_barWidth, _xAxisLabels.length, _xAxisInnerPadding);

        if (totalWidth >= reqWidth) {
          // Center align the chart by setting equal left and right margins for domain
          _domainMargin = MIN_DOMAIN_MARGIN + (totalWidth - reqWidth) / 2;
        }
      } else if (props.mode === 'plotly' && _xAxisLabels.length > 1) {
        // Calculate the remaining width after rendering bars at their maximum allowable width
        const bandwidth = calcBandwidth(totalWidth, _xAxisLabels.length, _xAxisInnerPadding);
        const barWidth = getBarWidth(props.barWidth, props.maxBarWidth, bandwidth);
        let reqWidth = calcRequiredWidth(barWidth, _xAxisLabels.length, _xAxisInnerPadding);
        const margin1 = (totalWidth - reqWidth) / 2;

        let margin2 = Number.POSITIVE_INFINITY;
        if (!props.hideTickOverlap) {
          // Calculate the remaining width after accounting for the space required to render x-axis labels
          const step = calculateLongestLabelWidth(_xAxisLabels) + 20;
          reqWidth = (_xAxisLabels.length - _xAxisInnerPadding) * step;
          margin2 = (totalWidth - reqWidth) / 2;
        }

        _domainMargin = MIN_DOMAIN_MARGIN + Math.max(0, Math.min(margin1, margin2));
      }
    } else {
      const data = (props.data?.map(point => point.xAxisPoint) as number[] | Date[] | undefined) || [];
      _barWidth = getBarWidth(
        props.barWidth,
        props.maxBarWidth,
        calculateAppropriateBarWidth(data, totalWidth, _xAxisInnerPadding),
      );
      _domainMargin = MIN_DOMAIN_MARGIN + _barWidth / 2;
    }

    return {
      ..._margins,
      left: _margins.left! + _domainMargin,
      right: _margins.right! + _domainMargin,
    };
  }

  function _getChartTitle(): string {
    const { chartTitle, data } = props;
    const numLines = Object.keys(_lineObject).length;
    return (
      (chartTitle ? `${chartTitle}. ` : '') +
      `Vertical bar chart with ${data?.length || 0} stacked bars` +
      (numLines > 0 ? ` and ${numLines} lines` : '') +
      '. '
    );
  }

  const classes = useVerticalStackedBarChartStyles(props);
  function _createBar(
    xBarScale: any,
    yBarScale: NumericScale | StringScale,
    containerHeight: number,
    xElement: SVGElement,
  ): JSXElement[] {
    const { barCornerRadius = 0, barMinimumHeight = 0 } = props;
    const _isHavingLines = props.data.some(
      (item: VerticalStackedChartProps) => item.lineData && item.lineData.length > 0,
    );
    const shouldFocusWholeStack = _toFocusWholeStack(_isHavingLines);

    if (_xAxisType === XAxisTypes.StringAxis) {
      _barWidth = getBarWidth(props.barWidth, props.maxBarWidth, xBarScale.bandwidth());
    }

    const bars = _points.map((singleChartData: VerticalStackedChartProps, indexNumber: number) => {
      const xPoint = xBarScale(
        _xAxisType === XAxisTypes.NumericAxis
          ? (singleChartData.xAxisPoint as number)
          : _xAxisType === XAxisTypes.DateAxis
          ? (singleChartData.xAxisPoint as Date)
          : (singleChartData.xAxisPoint as string),
      );
      const xScaleBandwidthTranslate =
        _xAxisType !== XAxisTypes.StringAxis ? -_barWidth / 2 : (xBarScale.bandwidth() - _barWidth) / 2;

      let barTotalValue = 0;

      const barsToDisplay = singleChartData.chartData.filter(
        point =>
          point.data !== 0 &&
          point.data !== '' &&
          !(
            _yAxisType === YAxisType.StringAxis &&
            typeof (yBarScale as StringScale)(point.data as string) === 'undefined'
          ),
      );

      if (!barsToDisplay.length) {
        return undefined;
      }

      const { gapHeight, heightValueScale, absStackTotal } = _getBarGapAndScale(barsToDisplay, yBarScale);

      if (heightValueScale < 0) {
        return undefined;
      }

      const yBaseline =
        containerHeight -
        _margins.bottom! -
        (_yAxisType === YAxisType.StringAxis ? 0 : (yBarScale as NumericScale)(Y_ORIGIN));
      let yPositiveStart = yBaseline;
      let yNegativeStart = yBaseline;
      let yPoint = 0;
      let heightOfLastBar = 0;

      const singleBar = barsToDisplay.map((point: VSChartDataPoint, index: number) => {
        const startColor = point.color ? point.color : _colors[index];
        const ref: RefArrayData = {};
        const shouldHighlight = _isLegendHighlighted(point.legend) || _noLegendHighlighted() ? true : false;
        const rectFocusProps = !shouldFocusWholeStack &&
          shouldHighlight && {
            'aria-label': _getAriaLabel(singleChartData, point),
            onMouseOver: (event: React.MouseEvent<SVGElement, MouseEvent>) =>
              _onRectHover(singleChartData.xAxisPoint, point, startColor, event),
            onMouseMove: (event: React.MouseEvent<SVGElement, MouseEvent>) =>
              _onRectHover(singleChartData.xAxisPoint, point, startColor, event),
            onMouseLeave: _handleMouseOut,
            onFocus: () => _onRectFocus(point, singleChartData.xAxisPoint as string, startColor, ref),
            onBlur: _handleMouseOut,
            onClick: (event: React.MouseEvent<SVGElement, MouseEvent>) => _onClick(point, event),
            role: 'img',
            tabIndex: !props.hideTooltip && shouldHighlight ? 0 : undefined,
          };

        let barHeight: number;
        const gapOffset = index ? gapHeight : 0;
        if (_yAxisType === YAxisType.StringAxis) {
          barHeight = Math.max(
            containerHeight -
              _margins.bottom! -
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
          if ((point.data as number) >= Y_ORIGIN) {
            yPositiveStart -= barHeight + gapOffset;
            yPoint = yPositiveStart;
          } else {
            yPoint = yNegativeStart + gapOffset;
            yNegativeStart = yPoint + barHeight;
          }

          barTotalValue += point.data as number;
          heightOfLastBar = index === barsToDisplay.length - 1 ? barHeight : 0;
        }

        if (barCornerRadius && barHeight > barCornerRadius && index === barsToDisplay.length - 1) {
          return (
            <React.Fragment key={index + indexNumber + `${shouldFocusWholeStack}`}>
              <path
                className={classes.opacityChangeOnHover}
                d={`
                  M ${xPoint} ${yPoint + barCornerRadius}
                  a ${barCornerRadius} ${barCornerRadius} 0 0 1 ${barCornerRadius} ${-barCornerRadius}
                  h ${_barWidth - 2 * barCornerRadius}
                  a ${barCornerRadius} ${barCornerRadius} 0 0 1 ${barCornerRadius} ${barCornerRadius}
                  v ${barHeight - barCornerRadius}
                  h ${-_barWidth}
                  z
                `}
                fill={startColor}
                rx={props.roundCorners ? 3 : 0}
                ref={e => (ref.refElement = e)}
                transform={`translate(${xScaleBandwidthTranslate}, 0)`}
                cursor={props.href ? 'pointer' : 'default'}
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
            <rect
              className={classes.opacityChangeOnHover}
              x={xPoint}
              y={yPoint}
              width={_barWidth}
              height={barHeight}
              fill={startColor}
              opacity={shouldHighlight ? 1 : 0.1}
              cursor={props.href ? 'pointer' : 'default'}
              rx={props.roundCorners ? 3 : 0}
              ref={e => (ref.refElement = e)}
              {...rectFocusProps}
              transform={`translate(${xScaleBandwidthTranslate}, 0)`}
            />
          </React.Fragment>
        );
      });
      const groupRef: RefArrayData = {};
      const someBarsActive =
        singleChartData.chartData.filter(dataPoint => _noLegendHighlighted() || _isLegendHighlighted(dataPoint.legend))
          .length > 0;
      // FIXME: Making the entire stack focusable when stack callout is enabled adds unnecessary complexity
      // and can reduce usability in certain scenarios. Instead, each individual element within the stack
      // should be focusable on its own, with its own aria-label. This behavior is also seen in Highcharts.
      const stackFocusProps = shouldFocusWholeStack &&
        someBarsActive && {
          'aria-label': _getAriaLabel(singleChartData),
          onMouseOver: (event: any) => _onStackHover(singleChartData, event),
          onMouseMove: (event: any) => _onStackHover(singleChartData, event),
          onMouseLeave: _handleMouseOut,
          onFocus: () => _onStackFocus(singleChartData, groupRef),
          onBlur: _handleMouseOut,
          onClick: (event: any) => _onClick(singleChartData, event),
          role: 'img',
          tabIndex: !props.hideTooltip ? 0 : undefined,
        };
      let showLabel = false;
      let barLabel = 0;
      if (!props.hideLabels && _yAxisType !== YAxisType.StringAxis) {
        if (_noLegendHighlighted()) {
          showLabel = true;
          barLabel = barTotalValue;
        } else {
          barsToDisplay.forEach(point => {
            if (_isLegendHighlighted(point.legend)) {
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
          {!props.hideLabels && _barWidth >= 16 && showLabel && (
            <text
              x={xPoint + _barWidth / 2}
              //if total bar value >=0, show label above top bar, otherwise below bottom bar
              y={barLabel >= Y_ORIGIN ? yPoint - 6 : yPoint + heightOfLastBar + 12}
              textAnchor="middle"
              className={classes.barLabel}
              aria-label={`Total: ${barLabel}`}
              role="img"
              transform={`translate(${xScaleBandwidthTranslate}, 0)`}
              style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
            >
              {typeof props.yAxisTickFormat === 'function'
                ? props.yAxisTickFormat(barLabel)
                : formatScientificLimitWidth(barLabel)}
            </text>
          )}
        </g>
      );
    });
    if (!props.showXAxisLablesTooltip) {
      try {
        document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    if (!props.wrapXAxisLables && props.showXAxisLablesTooltip) {
      const xAxisElement = d3Select(xElement).call(xBarScale);
      try {
        document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      const tooltipProps = {
        tooltipCls: classes.tooltip!,
        id: _tooltipId,
        axis: xAxisElement,
      };
      xAxisElement && tooltipOfAxislabels(tooltipProps);
    }
    return bars.filter((bar): bar is JSXElement => !!bar);
  }

  function _getMinMaxOfYAxis(
    dataset: DataPoint[],
    yAxisType?: YAxisType,
    useSecondaryYScale?: boolean,
  ): { startValue: number; endValue: number } {
    if (!useSecondaryYScale) {
      return findVSBCNumericMinMaxOfY(dataset);
    }

    const values: number[] = [];
    props.data.forEach(xPoint => {
      xPoint.lineData?.forEach(point => {
        // useSecondaryYScale is applicable only for lines in VSBC
        if (point.useSecondaryYScale) {
          values.push(point.y as number);
        }
      });
    });

    return { startValue: d3Min(values)!, endValue: d3Max(values)! };
  }

  function _initYAxisParams() {
    if (_points[0].chartData.length > 0) {
      _yAxisType = getTypeOfAxis(_points[0].chartData[0].data, false) as YAxisType;
    } else {
      Object.keys(_lineObject).forEach(lineLegend => {
        if (!_lineObject[lineLegend][0].useSecondaryYScale) {
          _yAxisType = getTypeOfAxis(_lineObject[lineLegend][0].y, false) as YAxisType;
        }
      });
    }

    _yAxisLabels = _getOrderedYAxisLabels();
  }

  function _getYDomainMargins(containerHeight: number): Margins {
    /**
     * Specifies the extra top margin to apply above the highest y-axis tick label.
     * Useful when stacked bars extend beyond the combined height of all y-axis labels (or categories).
     */
    let yAxisTickMarginTop = 0;

    /** Total height available to render the bars */
    const totalHeight = containerHeight - _margins.bottom! - _margins.top!;

    if (_yAxisType === YAxisType.StringAxis) {
      /** Maximum height of the stacked bars, expressed in multiples of the height of a y-axis label (or category) */
      let maxBarHeightInLabels = 0;
      _points.forEach(xPoint => {
        /** Height of the stacked bar, expressed in multiples of the height of a y-axis label (or category) */
        let barHeightInLabels = 0;
        xPoint.chartData.forEach(bar => {
          barHeightInLabels += _yAxisLabels.indexOf(`${bar.data}`) + 1;
        });
        maxBarHeightInLabels = Math.max(maxBarHeightInLabels, barHeightInLabels);
      });
      /** Height of a y-axis label (or category) */
      const yAxisLabelHeight = maxBarHeightInLabels === 0 ? 0 : totalHeight / maxBarHeightInLabels;
      yAxisTickMarginTop += yAxisLabelHeight * (maxBarHeightInLabels - _yAxisLabels.length);
    }

    return {
      ..._margins,
      top: _margins.top! + yAxisTickMarginTop,
    };
  }

  function _getOrderedXAxisLabels() {
    if (_xAxisType !== XAxisTypes.StringAxis) {
      return [];
    }

    return sortAxisCategories(_mapCategoryToValues(), props.xAxisCategoryOrder);
  }

  function _getOrderedYAxisLabels() {
    if (_yAxisType !== YAxisType.StringAxis) {
      return [];
    }

    return sortAxisCategories(_mapCategoryToValues(true), props.yAxisCategoryOrder);
  }

  function _mapCategoryToValues(isYAxis = false) {
    const categoryToValues: Record<string, number[]> = {};
    _points.forEach(point => {
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
  }

  if (!_isChartEmpty()) {
    _adjustProps();
    const _isHavingLines = props.data.some(
      (item: VerticalStackedChartProps) => item.lineData && item.lineData.length > 0,
    );
    const shouldFocusWholeStack = _toFocusWholeStack(_isHavingLines);
    _dataset = _createDataSetLayer();
    const legendBars: JSXElement = _getLegendData(_points, _createLegendsForLine(props.data));
    const calloutProps: ModifiedCartesianChartProps['calloutProps'] = {
      color: color,
      legend: calloutLegend,
      XValue: xCalloutValue!,
      YValue: yCalloutValue ? yCalloutValue : dataForHoverCard,
      YValueHover: YValueHover,
      hoverXValue: hoverXValue,
      ...props.calloutProps,
      ...getAccessibleDataObject(callOutAccessibilityData),
      clickPosition: clickPosition,
      isPopoverOpen: isPopoverOpen,
      isCalloutForStack:
        props.isCalloutForStack || (_isHavingLines && (_noLegendHighlighted() || _getHighlightedLegend().length > 1)),
      isCartesian: true,
      customCallout: {
        customizedCallout: _getCustomizedCallout() !== null ? _getCustomizedCallout()! : undefined,
        customCalloutProps: props.calloutPropsPerDataPoint
          ? props.calloutPropsPerDataPoint(dataPointCalloutProps!)
          : undefined,
      },
    };
    const tickParams = {
      tickValues: props.tickValues,
      tickFormat: props.tickFormat,
    };
    return (
      <CartesianChart
        {...props}
        chartTitle={_getChartTitle()}
        points={_dataset}
        chartType={ChartTypes.VerticalStackedBarChart}
        xAxisType={_xAxisType}
        getMinMaxOfYAxis={_getMinMaxOfYAxis}
        calloutProps={calloutProps}
        createYAxis={createNumericYAxis}
        tickParams={tickParams}
        legendBars={legendBars}
        datasetForXAxisDomain={_xAxisLabels}
        isCalloutForStack={shouldFocusWholeStack}
        getDomainNRangeValues={_getDomainNRangeValues}
        createStringYAxis={createStringYAxis}
        barwidth={_barWidth}
        getmargins={_getMargins}
        getGraphData={_getGraphData}
        getAxisData={_getAxisData}
        onChartMouseLeave={_handleChartMouseLeave}
        getDomainMargins={_getDomainMargins}
        {...(_xAxisType === XAxisTypes.StringAxis && {
          xAxisInnerPadding: _xAxisInnerPadding,
          xAxisOuterPadding: _xAxisOuterPadding,
        })}
        componentRef={cartesianChartRef}
        showRoundOffXTickValues={!isScalePaddingDefined(props.xAxisInnerPadding, props.xAxisPadding)}
        yAxisType={_yAxisType!}
        stringDatasetForYAxisDomain={['', ..._yAxisLabels]}
        getYDomainMargins={_getYDomainMargins}
        /* eslint-disable react/jsx-no-bind */
        children={(props: ChildProps) => {
          return (
            <>
              <g>{_bars}</g>
              <g>
                {_isHavingLines &&
                  _createLines(
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
  return <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />;
});
VerticalStackedBarChart.displayName = 'VerticalStackedBarChart';
