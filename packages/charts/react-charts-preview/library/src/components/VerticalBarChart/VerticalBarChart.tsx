import * as React from 'react';
import { useVerticalBarChartStyles_unstable } from './useVerticalBarChartStyles.styles';
import { max as d3Max, min as d3Min } from 'd3-array';
import { line as d3Line } from 'd3-shape';
import { select as d3Select } from 'd3-selection';
import {
  scaleLinear as d3ScaleLinear,
  ScaleLinear as D3ScaleLinear,
  scaleBand as d3ScaleBand,
  scaleUtc as d3ScaleUtc,
} from 'd3-scale';
import { useId } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import {
  AccessibilityProps,
  CartesianChart,
  Margins,
  Legend,
  RefArrayData,
  VerticalBarChartProps,
  VerticalBarChartDataPoint,
  Legends,
  ChildProps,
  YValueHover,
  ChartPopover,
} from '../../index';
import {
  ChartTypes,
  IAxisData,
  getAccessibleDataObject,
  XAxisTypes,
  NumericAxis,
  getTypeOfAxis,
  tooltipOfXAxislabels,
  formatValueWithSIPrefix,
  getBarWidth,
  getScalePadding,
  isScalePaddingDefined,
  calculateAppropriateBarWidth,
  useRtl,
} from '../../utilities/index';

enum CircleVisbility {
  show = 'visibility',
  hide = 'hidden',
}

const MIN_DOMAIN_MARGIN = 8;

// Create a VerticalBarChart variant which uses these default styles and this styled subcomponent.
/**
 * VerticalBarchart component
 * {@docCategory VerticalBarChart}
 */
export const VerticalBarChart: React.FunctionComponent<VerticalBarChartProps> = React.forwardRef<
  HTMLDivElement,
  VerticalBarChartProps
>((props, forwardedRef) => {
  let _points: VerticalBarChartDataPoint[] = [];
  let _barWidth: number = 0;
  let _colors: string[];
  const _refArray: RefArrayData[] = [];
  let margins: Margins;
  const _useRtl: boolean = useRtl();
  let _bars: JSX.Element[];
  let _xAxisLabels: string[];
  let _yMax: number;
  let _isHavingLine: boolean = _checkForLine();
  const _tooltipId: string = useId('VCTooltipID_');
  const _xAxisType: XAxisTypes =
    props.data! && props.data!.length > 0
      ? (getTypeOfAxis(props.data![0].x, true) as XAxisTypes)
      : XAxisTypes.StringAxis;
  let _calloutAnchorPoint: VerticalBarChartDataPoint | null;
  let _domainMargin: number;
  const _emptyChartId: string = useId('_VBC_empty');
  const _vbcLineId: string = useId('_VBC_line_');
  const _vbcPointId: string = useId('_VBC_point_');
  const _vbcBarId: string = useId('_VBC_bar_');
  let _xAxisInnerPadding: number = 0;
  let _xAxisOuterPadding: number = 0;
  type ColorScale = (_p?: number) => string;

  const [color, setColor] = React.useState<string>('');
  const [dataForHoverCard, setDataForHoverCard] = React.useState<number>(0);
  const [selectedLegend, setSelectedLegend] = React.useState<string | undefined>('');
  const [activeLegend, setActiveLegend] = React.useState<string | undefined>('');
  const [xCalloutValue, setXCalloutValue] = React.useState<string | undefined>('');
  const [yCalloutValue, setYCalloutValue] = React.useState<string | undefined>('');
  const [activeXdataPoint, setActiveXDatapoint] = React.useState<string | number | Date | null>(null);
  const [YValueHover, setYValueHover] = React.useState<YValueHover[]>();
  const [hoverXValue, setHoverXValue] = React.useState<string | number | undefined>('');
  const [calloutLegend, setCalloutLegend] = React.useState<string>('');
  const [callOutAccessibilityData, setCalloutAccessibilityData] = React.useState<AccessibilityProps>();
  const [dataPointCalloutProps, setDataPointCalloutProps] = React.useState<VerticalBarChartDataPoint>();
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);

  function _createLine(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yScale: any,
    containerHeight: number = 0,
    containerWidth: number = 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yScaleSecondary?: any,
  ): React.ReactNode {
    const isStringAxis = _xAxisType === XAxisTypes.StringAxis;
    const colorScale = _createColors();
    const { data, lineLegendColor = tokens.colorPaletteYellowBackground1, lineLegendText } = props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lineData: Array<any> = [];
    const line: JSX.Element[] = [];
    data &&
      data.forEach((item: VerticalBarChartDataPoint, index: number) => {
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
      .x((d: any) => (isStringAxis ? xScale(d.x) + 0.5 * xScale.bandwidth() : xScale(d.x)))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .y((d: any) => (d.useSecondaryYScale && yScaleSecondary ? yScaleSecondary(d.y) : yScale(d.y)));
    const shouldHighlight = _legendHighlighted(lineLegendText!) || _noLegendHighlighted() ? true : false;
    const lineBorderWidth = props.lineOptions?.lineBorderWidth
      ? Number.parseFloat(props.lineOptions!.lineBorderWidth!.toString())
      : 0;

    if (lineBorderWidth > 0) {
      line.push(
        <path
          key={_vbcLineId}
          id={_vbcLineId}
          opacity={shouldHighlight ? 1 : 0.1}
          d={linePath(lineData)!}
          fill="transparent"
          strokeLinecap="square"
          strokeWidth={3 + lineBorderWidth * 2}
          stroke={tokens.colorNeutralBackground1}
        />,
      );
    }
    line.push(
      <path
        key={_vbcLineId}
        id={_vbcLineId}
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
          point: VerticalBarChartDataPoint;
          index: number;
        },
        index: number,
      ) => {
        // Create an object to store line point ref so that the object can be passed by reference to the focus handler
        const circleRef: { refElement: SVGCircleElement | null } = { refElement: null };
        return (
          <circle
            key={index}
            id={`${_vbcPointId}-${index}`}
            cx={isStringAxis ? xScale(item.x) + 0.5 * xScale.bandwidth() : xScale(item.x)}
            cy={item.useSecondaryYScale && yScaleSecondary ? yScaleSecondary(item.y) : yScale(item.y)}
            onMouseOver={
              _legendHighlighted(lineLegendText!)
                ? _lineHover.bind(item.point)
                : event => _onBarHover(item.point, colorScale(item.y), event)
            }
            onMouseOut={_onBarLeave}
            r={_getCircleVisibilityAndRadius(item.x, lineLegendText!).radius}
            stroke={lineLegendColor}
            fill={tokens.colorNeutralBackground1}
            strokeWidth={3}
            visibility={_getCircleVisibilityAndRadius(item.x, lineLegendText!).visibility}
            onClick={item.point.lineData?.onClick}
            // When no legend is highlighted: Line points are automatically displayed along with the bars
            // at the same x-axis point in the stack callout. So to prevent an increase in focusable elements
            // and avoid conveying duplicate info, make these line points non-focusable.
            data-is-focusable={_legendHighlighted(lineLegendText!)}
            ref={e => (circleRef.refElement = e)}
            onFocus={_lineFocus.bind(item.point, circleRef)}
            onBlur={_handleChartMouseLeave}
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
  }

  function _getCircleVisibilityAndRadius(
    xAxisPoint: string | number | Date,
    legend: string,
  ): { visibility: CircleVisbility; radius: number } {
    if (selectedLegend !== '') {
      if (xAxisPoint === activeXdataPoint && selectedLegend === legend) {
        return { visibility: CircleVisbility.show, radius: 8 };
      } else if (selectedLegend === legend) {
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
  }

  function _checkForLine(): boolean {
    const { data } = props;
    return data!.some((item: VerticalBarChartDataPoint) => item?.lineData?.y !== undefined);
  }

  function _adjustProps(): void {
    _points = props.data || [];
    _barWidth = getBarWidth(props.barWidth, props.maxBarWidth);
    const defaultColors: string[] = [
      tokens.colorPaletteBlueForeground2,
      tokens.colorPaletteCornflowerForeground2,
      tokens.colorPaletteDarkGreenForeground2,
      tokens.colorPaletteNavyForeground2,
      tokens.colorPaletteDarkOrangeForeground2,
    ];
    _colors = props.colors || defaultColors;
    _isHavingLine = _checkForLine();
    _xAxisInnerPadding = getScalePadding(props.xAxisInnerPadding, props.xAxisPadding, 2 / 3);
    _xAxisOuterPadding = getScalePadding(props.xAxisOuterPadding, props.xAxisPadding, 0);
  }

  function _getMargins(_margins: Margins) {
    margins = _margins;
  }

  function _renderContentForBothLineAndBars(point: VerticalBarChartDataPoint): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { YValueHover, hoverXValue } = _getCalloutContentForLineAndBar(point);
    const content: JSX.Element[] = YValueHover.map((item: YValueHover, index: number) => {
      return (
        <>
          <ChartPopover
            culture={props.culture ?? 'en-us'}
            clickPosition={clickPosition}
            isPopoverOpen={isPopoverOpen}
            legend={item.legend!}
            {...(index === 0 && { XValue: `${hoverXValue || item.data}` })}
            YValue={item.data || item.y}
            color={item.color}
            isCalloutForStack={false}
          />
        </>
      );
    });
    return <>{content}</>;
  }

  function _renderContentForOnlyBars(_props: VerticalBarChartDataPoint): JSX.Element {
    return (
      <>
        <ChartPopover
          XValue={_props.xAxisCalloutData || (_props.x as string)}
          xCalloutValue={xCalloutValue}
          yCalloutValue={yCalloutValue}
          culture={props.culture ?? 'en-us'}
          clickPosition={clickPosition}
          isPopoverOpen={isPopoverOpen}
          legend={_props.legend!}
          YValue={_props.yAxisCalloutData || _props.y}
          color={!props.useSingleColor && _props.color ? _props.color : _createColors()(_props.y)}
          isCalloutForStack={false}
        />
      </>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function _renderCallout(props?: VerticalBarChartDataPoint): JSX.Element | null {
    return props ? (_isHavingLine ? _renderContentForBothLineAndBars(props) : _renderContentForOnlyBars(props)) : null;
  }

  function _getCustomizedCallout() {
    return props.onRenderCalloutPerDataPoint
      ? props.onRenderCalloutPerDataPoint(dataPointCalloutProps, _renderCallout)
      : null;
  }

  function _getGraphData(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale: any,
    yScale: NumericAxis,
    containerHeight: number,
    containerWidth: number,
    xElement?: SVGElement | null,
  ) {
    return (_bars =
      _xAxisType === XAxisTypes.NumericAxis
        ? _createNumericBars(containerHeight, containerWidth, xElement!)
        : _xAxisType === XAxisTypes.DateAxis
        ? _createDateBars(containerHeight, containerWidth, xElement!)
        : _createStringBars(containerHeight, containerWidth, xElement!));
  }

  function _createColors(): D3ScaleLinear<string, string> | ColorScale {
    const increment = _colors.length <= 1 ? 1 : 1 / (_colors.length - 1);
    const { useSingleColor = false } = props;
    if (useSingleColor) {
      return (_p?: number) => {
        const { colors } = props;
        return colors && colors.length > 0 ? colors[0] : tokens.colorPaletteBlueBackground2;
      };
    }
    const domainValues = [];
    for (let i = 0; i < _colors.length; i++) {
      domainValues.push(increment * i * _yMax);
    }
    const colorScale = d3ScaleLinear<string>().domain(domainValues).range(_colors);
    return colorScale;
  }

  function _refCallback(element: SVGRectElement, legendTitle: string): void {
    _refArray.push({ index: legendTitle, refElement: element });
  }

  function _getCalloutContentForLineAndBar(point: VerticalBarChartDataPoint): {
    YValueHover: YValueHover[];
    hoverXValue: string | number | undefined;
  } {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const YValueHover: YValueHover[] = [];
    const { useSingleColor = false } = props;
    const { data, lineLegendText, lineLegendColor = tokens.colorPaletteYellowBackground1 } = props;
    const selectedPoint = data!.filter((xDataPoint: VerticalBarChartDataPoint) => xDataPoint.x === point.x);
    // there might be no y value of the line for the hovered bar. so we need to check this condition
    if (_isHavingLine && selectedPoint[0].lineData?.y !== undefined) {
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
          : _createColors()(selectedPoint[0].y)
        : _createColors()(1),
      data: selectedPoint[0].yAxisCalloutData,
      yAxisCalloutData: selectedPoint[0].yAxisCalloutData,
    });
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const hoverXValue = point.x instanceof Date ? point.x.toLocaleString() : point.x.toString();
    return {
      YValueHover,
      hoverXValue: point.xAxisCalloutData || hoverXValue,
    };
  }

  function _onBarHover(
    point: VerticalBarChartDataPoint,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    color: string,
    mouseEvent: React.MouseEvent<SVGElement>,
  ): void {
    mouseEvent.persist();

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { YValueHover, hoverXValue } = _getCalloutContentForLineAndBar(point);
    if (_calloutAnchorPoint !== point) {
      _calloutAnchorPoint = point;
      /** Show the callout if highlighted bar is hovered and Hide it if unhighlighted bar is hovered */
      updatePosition(mouseEvent.clientX, mouseEvent.clientY);
      setPopoverOpen(selectedLegend === '' || selectedLegend === point.legend);
      setDataForHoverCard(point.y);
      setCalloutLegend(point.legend!);
      setColor(point.color || color);
      // To display callout value, if no callout value given, taking given point.x value as a string.
      setXCalloutValue(
        point.xAxisCalloutData || (point.x instanceof Date ? point.x.toLocaleDateString() : point.x.toString()),
      );
      setDataPointCalloutProps(point);
      // Hovering over a bar should highlight corresponding line points only when no legend is selected
      setActiveXDatapoint(_noLegendHighlighted() ? point.x : null);
      setYValueHover(YValueHover);
      setHoverXValue(hoverXValue);
      setCalloutAccessibilityData(point.callOutAccessibilityData);
    }
  }

  function _onBarLeave(): void {
    /**/
  }

  function _handleChartMouseLeave(): void {
    _calloutAnchorPoint = null;
    setPopoverOpen(false);
    setActiveXDatapoint(null);
    setYValueHover([]);
    setHoverXValue('');
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function _onBarFocus(point: VerticalBarChartDataPoint, refArrayIndexNumber: number, color: string): void {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { YValueHover, hoverXValue } = _getCalloutContentForLineAndBar(point);
    _refArray.forEach((obj: RefArrayData, index: number) => {
      if (obj.index === point.legend! && refArrayIndexNumber === index) {
        /** Show the callout if highlighted bar is hovered and Hide it if unhighlighted bar is hovered */
        setPopoverOpen(selectedLegend === '' || selectedLegend === point.legend);
        setDataForHoverCard(point.y);
        setCalloutLegend(point.legend!);
        setColor(point.color || color);
        // To display callout value, if no callout value given, taking given point.x value as a string.
        setXCalloutValue(
          point.xAxisCalloutData || (point.x instanceof Date ? point.x.toLocaleDateString() : point.x.toString()),
        );
        setYCalloutValue(point.yAxisCalloutData!);
        setDataPointCalloutProps(point);
        // Hovering over a bar should highlight corresponding line points only when no legend is selected
        setActiveXDatapoint(point.x);
        setYValueHover(YValueHover);
        setHoverXValue(hoverXValue);
        setCalloutAccessibilityData(point.callOutAccessibilityData);
      }
    });
  }

  function _lineHover(point: VerticalBarChartDataPoint, mouseEvent: React.MouseEvent<SVGElement>) {
    mouseEvent.persist();
    _lineHoverFocus(point, mouseEvent);
  }

  function _lineFocus(point: VerticalBarChartDataPoint, ref: { refElement: SVGCircleElement | null }) {
    if (ref.refElement) {
      _lineHoverFocus(point, ref.refElement);
    }
  }

  function _lineHoverFocus(
    point: VerticalBarChartDataPoint,
    _refSelected: React.MouseEvent<SVGElement> | SVGCircleElement,
  ) {
    const { lineLegendText = '', lineLegendColor = tokens.colorPaletteYellowBackground1 } = props;
    setPopoverOpen(false);
    setCalloutLegend(lineLegendText);
    setDataForHoverCard(point.lineData!.y);
    setColor(lineLegendColor);
    setXCalloutValue(
      point.xAxisCalloutData || (point.x instanceof Date ? point.x.toLocaleDateString() : point.x.toString()),
    );
    setYCalloutValue(point.lineData!.yAxisCalloutData);
    setDataPointCalloutProps(point);
    setActiveXDatapoint(point.x);
  }

  function _getScales(
    containerHeight: number,
    containerWidth: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): { xBarScale: any; yBarScale: any } {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let xBarScale: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const yBarScale: any = d3ScaleLinear()
      .domain([0, _yMax])
      .range([0, containerHeight - margins.bottom! - margins.top!]);

    if (_xAxisType === XAxisTypes.NumericAxis) {
      const xMax = d3Max(_points, (point: VerticalBarChartDataPoint) => point.x as number)!;
      const xMin = d3Min(_points, (point: VerticalBarChartDataPoint) => point.x as number)!;
      xBarScale = d3ScaleLinear()
        .domain(_useRtl ? [xMax, xMin] : [xMin, xMax])
        .nice()
        .range([margins.left! + _domainMargin, containerWidth - margins.right! - _domainMargin]);
    } else if (_xAxisType === XAxisTypes.DateAxis) {
      const sDate = d3Min(_points, (point: VerticalBarChartDataPoint) => point.x as Date)!;
      const lDate = d3Max(_points, (point: VerticalBarChartDataPoint) => point.x as Date)!;
      xBarScale = d3ScaleUtc()
        .domain([sDate, lDate])
        .range(
          _useRtl
            ? [containerWidth - margins.right! - _domainMargin, margins.left! + _domainMargin]
            : [margins.left! + _domainMargin, containerWidth - margins.right! - _domainMargin],
        );
    } else {
      xBarScale = d3ScaleBand()
        .domain(_xAxisLabels)
        .range(
          _useRtl
            ? [containerWidth - margins.right! - _domainMargin, margins.left! + _domainMargin]
            : [margins.left! + _domainMargin, containerWidth - margins.right! - _domainMargin],
        )
        .paddingInner(_xAxisInnerPadding)
        .paddingOuter(_xAxisOuterPadding);
    }

    return { xBarScale, yBarScale };
  }

  const classes = useVerticalBarChartStyles_unstable(props);

  function _createNumericBars(containerHeight: number, containerWidth: number, xElement: SVGElement): JSX.Element[] {
    const { useSingleColor = false } = props;
    const { xBarScale, yBarScale } = _getScales(containerHeight, containerWidth);
    const colorScale = _createColors();
    const bars = _points.map((point: VerticalBarChartDataPoint, index: number) => {
      const shouldHighlight = _legendHighlighted(point.legend!) || _noLegendHighlighted() ? true : false;

      const barHeight: number = Math.max(yBarScale(point.y), 0);
      let adjustedBarHeight = 0;
      if (barHeight <= 0) {
        return <React.Fragment key={point.x as string}> </React.Fragment>;
      } else if (barHeight <= Math.ceil(yBarScale(_yMax) / 100.0)) {
        adjustedBarHeight = Math.ceil(yBarScale(_yMax) / 100.0);
      } else {
        adjustedBarHeight = barHeight;
      }
      const xPoint = xBarScale(point.x as number) - _barWidth / 2;
      const yPoint = containerHeight - margins.bottom! - adjustedBarHeight;
      return (
        <g key={point.x as string}>
          <rect
            id={`${_vbcBarId}-${index}`}
            x={xPoint}
            y={yPoint}
            width={_barWidth}
            data-is-focusable={!props.hideTooltip && shouldHighlight}
            height={adjustedBarHeight}
            ref={(e: SVGRectElement) => {
              _refCallback(e, point.legend!);
            }}
            onClick={point.onClick}
            onMouseOver={event => _onBarHover(point, colorScale(point.y), event)}
            aria-label={_getAriaLabel(point)}
            role="img"
            onMouseLeave={_onBarLeave}
            onFocus={_onBarFocus.bind(point, index, colorScale(point.y))}
            onBlur={_onBarLeave}
            fill={point.color && !useSingleColor ? point.color : colorScale(point.y)}
            tabIndex={point.legend !== '' ? 0 : undefined}
            opacity={shouldHighlight ? '1' : '0.1'}
          />
          {_renderBarLabel(xPoint, yPoint, point.y, point.legend!)}
        </g>
      );
    });
    // Removing un wanted tooltip div from DOM, when prop not provided.
    if (!props.showXAxisLablesTooltip) {
      try {
        // eslint-disable-next-line no-restricted-globals
        document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    // Used to display tooltip at x axis labels.
    if (!props.wrapXAxisLables && props.showXAxisLablesTooltip) {
      const xAxisElement = d3Select(xElement).call(xBarScale);
      try {
        // eslint-disable-next-line no-restricted-globals
        document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      const tooltipProps = {
        tooltipCls: classes.tooltip!,
        id: _tooltipId,
        xAxis: xAxisElement,
      };
      xAxisElement && tooltipOfXAxislabels(tooltipProps);
    }
    return bars;
  }

  function _createStringBars(containerHeight: number, containerWidth: number, xElement: SVGElement): JSX.Element[] {
    const { xBarScale, yBarScale } = _getScales(containerHeight, containerWidth);
    const colorScale = _createColors();
    const bars = _points.map((point: VerticalBarChartDataPoint, index: number) => {
      const barHeight: number = Math.max(yBarScale(point.y), 0);
      let adjustedBarHeight = 0;
      if (barHeight <= 0) {
        return <React.Fragment key={point.x instanceof Date ? point.x.getTime() : point.x}> </React.Fragment>;
      } else if (barHeight <= Math.ceil(yBarScale(_yMax) / 100.0)) {
        adjustedBarHeight = Math.ceil(yBarScale(_yMax) / 100.0);
      } else {
        adjustedBarHeight = barHeight;
      }
      const xPoint = xBarScale(point.x);
      const yPoint = containerHeight - margins.bottom! - adjustedBarHeight;
      // Setting the bar width here is safe because there are no dependencies earlier in the code
      // that rely on the width of bars in vertical bar charts with string x-axis.
      _barWidth = getBarWidth(props.barWidth, props.maxBarWidth, xBarScale.bandwidth());
      return (
        <g
          key={point.x instanceof Date ? point.x.getTime() : point.x}
          transform={`translate(${0.5 * (xBarScale.bandwidth() - _barWidth)}, 0)`}
        >
          <rect
            id={`${_vbcBarId}-${index}`}
            x={xPoint}
            y={yPoint}
            width={_barWidth}
            height={adjustedBarHeight}
            aria-label={_getAriaLabel(point)}
            role="img"
            ref={(e: SVGRectElement) => {
              _refCallback(e, point.legend!);
            }}
            onClick={point.onClick}
            onMouseOver={event => _onBarHover(point, colorScale(point.y), event)}
            onMouseLeave={_onBarLeave}
            onBlur={_onBarLeave}
            data-is-focusable={!props.hideTooltip}
            onFocus={_onBarFocus.bind(point, index, colorScale(point.y))}
            fill={point.color ? point.color : colorScale(point.y)}
            tabIndex={point.legend !== '' ? 0 : undefined}
          />
          {_renderBarLabel(xPoint, yPoint, point.y, point.legend!)}
        </g>
      );
    });

    // Removing un wanted tooltip div from DOM, when prop not provided.
    if (!props.showXAxisLablesTooltip) {
      try {
        // eslint-disable-next-line no-restricted-globals
        document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    // Used to display tooltip at x axis labels.
    if (!props.wrapXAxisLables && props.showXAxisLablesTooltip) {
      const xAxisElement = d3Select(xElement).call(xBarScale);
      try {
        // eslint-disable-next-line no-restricted-globals
        document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      const tooltipProps = {
        tooltipCls: classes.tooltip!,
        id: _tooltipId,
        xAxis: xAxisElement,
        showTooltip: props.showXAxisLablesTooltip,
      };
      xAxisElement && tooltipOfXAxislabels(tooltipProps);
    }
    return bars;
  }

  function _createDateBars(containerHeight: number, containerWidth: number, xElement: SVGElement): JSX.Element[] {
    const { useSingleColor = false } = props;
    const { xBarScale, yBarScale } = _getScales(containerHeight, containerWidth);
    const colorScale = _createColors();
    const bars = _points.map((point: VerticalBarChartDataPoint, index: number) => {
      const shouldHighlight = _legendHighlighted(point.legend!) || _noLegendHighlighted() ? true : false;
      const barHeight: number = Math.max(yBarScale(point.y), 0);
      let adjustedBarHeight = 0;
      if (barHeight <= 0) {
        return <React.Fragment key={point.x instanceof Date ? point.x.getTime() : point.x}> </React.Fragment>;
      } else if (barHeight <= Math.ceil(yBarScale(_yMax) / 100.0)) {
        adjustedBarHeight = Math.ceil(yBarScale(_yMax) / 100.0);
      } else {
        adjustedBarHeight = barHeight;
      }
      const xPoint = xBarScale(point.x as number) - _barWidth / 2;
      const yPoint = containerHeight - margins.bottom! - adjustedBarHeight;
      return (
        <g key={point.x instanceof Date ? point.x.getTime() : point.x}>
          <rect
            id={`${_vbcBarId}-${index}`}
            x={xPoint}
            className={classes.opacityChangeOnHover}
            y={yPoint}
            width={_barWidth}
            data-is-focusable={!props.hideTooltip && shouldHighlight}
            height={adjustedBarHeight}
            ref={(e: SVGRectElement) => {
              _refCallback(e, point.legend!);
            }}
            onClick={point.onClick}
            onMouseOver={event => _onBarHover(point, colorScale(point.y), event)}
            aria-label={_getAriaLabel(point)}
            role="img"
            onMouseLeave={_onBarLeave}
            onFocus={_onBarFocus.bind(point, index, colorScale(point.y))}
            onBlur={_onBarLeave}
            fill={point.color && !useSingleColor ? point.color : colorScale(point.y)}
            tabIndex={point.legend !== '' ? 0 : undefined}
          />
          {_renderBarLabel(xPoint, yPoint, point.y, point.legend!)}
        </g>
      );
    });
    // Removing un wanted tooltip div from DOM, when prop not provided.
    if (!props.showXAxisLablesTooltip) {
      try {
        // eslint-disable-next-line no-restricted-globals
        document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    // Used to display tooltip at x axis labels.
    if (!props.wrapXAxisLables && props.showXAxisLablesTooltip) {
      const xAxisElement = d3Select(xElement).call(xBarScale);
      try {
        // eslint-disable-next-line no-restricted-globals
        document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
        // eslint-disable-next-line no-empty
      } catch (e) {}
      const tooltipProps = {
        tooltipCls: classes.tooltip!,
        id: _tooltipId,
        xAxis: xAxisElement,
      };
      xAxisElement && tooltipOfXAxislabels(tooltipProps);
    }
    return bars;
  }

  function _onLegendClick(legendTitle: string): void {
    if (selectedLegend === legendTitle) {
      setSelectedLegend('');
    } else {
      setSelectedLegend(legendTitle);
    }
  }

  function _onLegendHover(legendTitle: string): void {
    setActiveLegend(legendTitle);
  }

  function _onLegendLeave(): void {
    setActiveLegend('');
  }

  function _getLegendData(data: VerticalBarChartDataPoint[]): JSX.Element {
    const { useSingleColor } = props;
    const { lineLegendText, lineLegendColor = tokens.colorPaletteYellowForeground1 } = props;
    const actions: Legend[] = [];
    data.forEach((point: VerticalBarChartDataPoint, _index: number) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const color: string = !useSingleColor ? point.color! : _createColors()(1);
      // mapping data to the format Legends component needs
      const legend: Legend = {
        title: point.legend!,
        color,
        action: () => {
          _onLegendClick(point.legend!);
        },
        hoverAction: () => {
          _handleChartMouseLeave();
          _onLegendHover(point.legend!);
        },
        onMouseOutAction: () => {
          _onLegendLeave();
        },
      };
      actions.push(legend);
    });
    if (_isHavingLine && lineLegendText && lineLegendColor) {
      const lineLegend: Legend = {
        title: lineLegendText,
        color: lineLegendColor,
        action: () => {
          _onLegendClick(lineLegendText);
        },
        hoverAction: () => {
          _handleChartMouseLeave();
          _onLegendHover(lineLegendText);
        },
        onMouseOutAction: () => {
          _onLegendLeave();
        },
        isLineLegendInBarChart: true,
      };
      actions.unshift(lineLegend);
    }
    const legends = (
      <Legends
        legends={actions}
        enabledWrapLines={props.enabledLegendsWrapLines}
        overflowText={props.legendsOverflowText}
        {...props.legendProps}
      />
    );
    return legends;
  }

  function _getAxisData(yAxisData: IAxisData) {
    if (yAxisData && yAxisData.yAxisDomainValues.length) {
      const { yAxisDomainValues: domainValue } = yAxisData;
      _yMax = Math.max(domainValue[domainValue.length - 1], props.yMaxValue || 0);
    }
  }

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  function _legendHighlighted(legendTitle: string) {
    return selectedLegend === legendTitle || (selectedLegend === '' && activeLegend === legendTitle);
  }

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  function _noLegendHighlighted() {
    return selectedLegend === '' && activeLegend === '';
  }

  function _getAriaLabel(point: VerticalBarChartDataPoint): string {
    const xValue = point.xAxisCalloutData
      ? point.xAxisCalloutData
      : point.x instanceof Date
      ? point.x.toLocaleString()
      : point.x;
    const legend = point.legend;
    const yValue = point.yAxisCalloutData || point.y;
    const lineLegend = props.lineLegendText || 'Line';
    const lineYValue = point.lineData?.yAxisCalloutData || point.lineData?.y;
    return (
      point.callOutAccessibilityData?.ariaLabel ||
      `${xValue}. ` +
        (legend ? `${legend}, ` : '') +
        `${yValue}.` +
        (typeof lineYValue !== 'undefined' ? ` ${lineLegend}, ${lineYValue}.` : '')
    );
  }

  function _renderBarLabel(xPoint: number, yPoint: number, barValue: number, legend: string) {
    if (props.hideLabels || _barWidth < 16 || !(_legendHighlighted(legend) || _noLegendHighlighted())) {
      return null;
    }

    return (
      <text
        x={xPoint + _barWidth / 2}
        y={yPoint - 6}
        textAnchor="middle"
        className={classes.barLabel}
        aria-hidden={true}
      >
        {formatValueWithSIPrefix(barValue)}
      </text>
    );
  }

  function _getDomainMargins(containerWidth: number): Margins {
    _domainMargin = MIN_DOMAIN_MARGIN;

    /** Total width available to render the bars */
    const totalWidth = containerWidth - (margins.left! + MIN_DOMAIN_MARGIN) - (margins.right! + MIN_DOMAIN_MARGIN);

    if (_xAxisType === XAxisTypes.StringAxis) {
      if (isScalePaddingDefined(props.xAxisOuterPadding, props.xAxisPadding)) {
        // Setting the domain margin for string x-axis to 0 because the xAxisOuterPadding prop is now available
        // to adjust the space before the first bar and after the last bar.
        _domainMargin = 0;
      } else if (props.barWidth !== 'auto') {
        /** Rate at which the space between the bars changes wrt the bar width */
        const barGapRate = _xAxisInnerPadding / (1 - _xAxisInnerPadding);
        // Update the bar width so that when CartesianChart rerenders,
        // the following calculations don't use the previous bar width.
        _barWidth = getBarWidth(props.barWidth, props.maxBarWidth);
        /** Total width required to render the bars. Directly proportional to bar width */
        const reqWidth = (_xAxisLabels.length + (_xAxisLabels.length - 1) * barGapRate) * _barWidth;

        if (totalWidth >= reqWidth) {
          // Center align the chart by setting equal left and right margins for domain
          _domainMargin = MIN_DOMAIN_MARGIN + (totalWidth - reqWidth) / 2;
        }
      }
    } else {
      const data = (props.data?.map(point => point.x) as number[] | Date[] | undefined) || [];
      _barWidth = getBarWidth(props.barWidth, props.maxBarWidth, calculateAppropriateBarWidth(data, totalWidth));
      _domainMargin = MIN_DOMAIN_MARGIN + _barWidth / 2;
    }

    return {
      ...margins,
      left: margins.left! + _domainMargin,
      right: margins.right! + _domainMargin,
    };
  }

  function _isChartEmpty(): boolean {
    return (
      _points.length === 0 || (d3Max(_points, (point: VerticalBarChartDataPoint) => point.y)! <= 0 && !_isHavingLine)
    );
  }

  function updatePosition(newX: number, newY: number) {
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

  _adjustProps();
  _xAxisLabels = _points.map((point: VerticalBarChartDataPoint) => point.x as string);
  _yMax = Math.max(d3Max(_points, (point: VerticalBarChartDataPoint) => point.y)!, props.yMaxValue || 0);
  const legendBars: JSX.Element = _getLegendData(_points);
  const calloutProps = {
    ...(_isHavingLine && {
      YValueHover: YValueHover,
      hoverXValue: hoverXValue,
    }),
    color: color,
    legend: calloutLegend,
    XValue: xCalloutValue,
    YValue: yCalloutValue ? yCalloutValue : dataForHoverCard,
    ...props.calloutProps,
    ...getAccessibleDataObject(callOutAccessibilityData),
    clickPosition: clickPosition,
    isPopoverOpen: isPopoverOpen,
    isCalloutForStack: _isHavingLine && _noLegendHighlighted(),
    culture: props.culture ?? 'en-us',
    isCartesian: true,
    customCallout: {
      customizedCallout: _getCustomizedCallout() != null ? _getCustomizedCallout()! : undefined,
      customCalloutProps: props.customProps ? props.customProps(dataPointCalloutProps!) : undefined,
    },
  };

  const tickParams = {
    tickValues: props.tickValues,
    tickFormat: props.tickFormat,
  };
  return !_isChartEmpty() ? (
    <CartesianChart
      {...props}
      points={_points}
      chartType={ChartTypes.VerticalBarChart}
      xAxisType={_xAxisType}
      calloutProps={calloutProps}
      tickParams={tickParams}
      {...(_isHavingLine && _noLegendHighlighted() && { isCalloutForStack: true })}
      legendBars={legendBars}
      datasetForXAxisDomain={_xAxisLabels}
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
      /* eslint-disable react/jsx-no-bind */
      // eslint-disable-next-line react/no-children-prop
      children={(props: ChildProps) => {
        return (
          <>
            <g>{_bars}</g>
            {_isHavingLine && (
              <g>
                {_createLine(
                  props.xScale!,
                  props.yScale!,
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
    <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
  );
});
VerticalBarChart.displayName = 'VerticalBarChart';
