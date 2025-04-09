import * as React from 'react';
import { max as d3Max } from 'd3-array';
import { select as d3Select } from 'd3-selection';
import { scaleLinear as d3ScaleLinear, ScaleLinear as D3ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';
import { Legend } from '../../components/Legends/Legends.types';
import { Legends } from '../../components/Legends/Legends';
import { useId } from '@fluentui/react-utilities';
import { useHorizontalBarChartWithAxisStyles } from './useHorizontalBarChartWithAxisStyles.styles';
import {
  AccessibilityProps,
  HorizontalBarChartWithAxisDataPoint,
  RefArrayData,
  Margins,
  ChartPopoverProps,
  Chart,
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
  areArraysEqual,
  useRtl,
  DataVizPalette,
  getColorFromToken,
} from '../../utilities/index';
type ColorScale = (_p?: number) => string;

export const HorizontalBarChartWithAxis: React.FunctionComponent<HorizontalBarChartWithAxisProps> = React.forwardRef<
  HTMLDivElement,
  HorizontalBarChartWithAxisProps
>((props, forwardedRef) => {
  const _refArray: RefArrayData[] = [];
  const _calloutId: string = useId('callout');
  const _isRtl: boolean = useRtl();
  const _tooltipId: string = useId('HBCWATooltipID_');
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
  let _bars: JSX.Element[];
  let _yAxisLabels: string[];
  let _xMax: number;
  let _calloutAnchorPoint: HorizontalBarChartWithAxisDataPoint | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tooltipElement: any;
  const cartesianChartRef = React.useRef<Chart>(null);

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
    }),
    [],
  );

  const classes = useHorizontalBarChartWithAxisStyles(props);
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

  function _renderContentForOnlyBars(point: HorizontalBarChartWithAxisDataPoint): JSX.Element {
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
          culture={props.culture ?? 'en-us'}
          clickPosition={clickPosition}
          isPopoverOpen={isPopoverOpen}
        />
      </>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function _renderCallout(props?: HorizontalBarChartWithAxisDataPoint): JSX.Element | null {
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
    return (_bars =
      _yAxisType === YAxisType.NumericAxis
        ? _createNumericBars(containerHeight, containerWidth, xElement!, yElement!)
        : _createStringBars(containerHeight, containerWidth, xElement!, yElement!));
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
  function _onBarFocus(point: HorizontalBarChartWithAxisDataPoint, refArrayIndexNumber: number, color: string): void {
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
    if (isNumericScale) {
      const xMax = d3Max(_points, (point: HorizontalBarChartWithAxisDataPoint) => point.x as number)!;
      const yMax = d3Max(_points, (point: HorizontalBarChartWithAxisDataPoint) => point.y as number)!;
      const xBarScale = d3ScaleLinear()
        .domain(_isRtl ? [xMax, 0] : [0, xMax])
        .nice()
        .range([_margins.left!, containerWidth - _margins.right!]);
      const yBarScale = d3ScaleLinear()
        .domain([0, yMax])
        .range([containerHeight - _margins.bottom!, _margins.top!]);
      return { xBarScale, yBarScale };
    } else {
      const xMax = d3Max(_points, (point: HorizontalBarChartWithAxisDataPoint) => point.x as number)!;
      // please note these padding default values must be consistent in here
      // and CatrtesianChartBase w for more details refer example
      // http://using-d3js.com/04_07_ordinal_scales.html
      const yBarScale = d3ScaleBand()
        .domain(_yAxisLabels)
        .range([containerHeight - _margins.bottom! - _barHeight / 2, _margins.top! + _barHeight / 2])
        .padding(props.yAxisPadding || 0);

      const xBarScale = d3ScaleLinear()
        .domain(_isRtl ? [xMax, 0] : [0, xMax])
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
  ): JSX.Element[] {
    const { useSingleColor = false } = props;
    const { xBarScale, yBarScale } = _getScales(containerHeight, containerWidth, true);
    const sortedBars: HorizontalBarChartWithAxisDataPoint[] = [..._points];
    sortedBars.sort((a, b) => {
      const aValue = typeof a.y === 'number' ? a.y : parseFloat(a.y);
      const bValue = typeof b.y === 'number' ? b.y : parseFloat(b.y);
      return bValue - aValue;
    });

    const bars = sortedBars.map((point: HorizontalBarChartWithAxisDataPoint, index: number) => {
      let shouldHighlight = true;
      if (isLegendHovered || isLegendSelected) {
        shouldHighlight = _isLegendHighlighted(point.legend);
      }
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

      return (
        <React.Fragment key={`${index}_${point.x}`}>
          <rect
            key={point.y}
            x={_isRtl ? xBarScale(point.x) : _margins.left!}
            y={yBarScale(point.y) - _barHeight / 2}
            data-is-focusable={shouldHighlight}
            width={
              _isRtl
                ? containerWidth - _margins.right! - Math.max(xBarScale(point.x), 0)
                : Math.max(xBarScale(point.x), 0) - _margins.left!
            }
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
            onFocus={() => _onBarFocus(point, index, startColor)}
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function _tooltipOfYAxislabels(ytooltipProps: any) {
    const { tooltipCls, yAxis, id } = ytooltipProps;
    if (yAxis === null) {
      return null;
    }
    const div = d3Select('body').append('div').attr('id', id).attr('class', tooltipCls).style('opacity', 0);
    const aa = yAxis!.selectAll('#BaseSpan')._groups[0];
    const baseSpanLength = aa && Object.keys(aa)!.length;
    const originalDataArray: string[] = [];
    for (let i = 0; i < baseSpanLength; i++) {
      const originalData = aa[i].dataset && (Object.values(aa[i].dataset)[0] as string);
      originalDataArray.push(originalData);
    }
    const tickObject = yAxis!.selectAll('.tick')._groups[0];
    const tickObjectLength = tickObject && Object.keys(tickObject)!.length;
    for (let i = 0; i < tickObjectLength; i++) {
      const d1 = tickObject[i];
      d3Select(d1)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on('mouseover', (event: any, d) => {
          if (!tooltipElement) {
            div.style('opacity', 0.9);
            div
              .text(originalDataArray[i])
              .style('left', event.pageX + 'px')
              .style('top', event.pageY - 28 + 'px');
          }
        })
        .on('mouseout', d => {
          div.style('opacity', 0);
        });
    }
  }

  function _createStringBars(
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement,
    yElement: SVGElement,
  ): JSX.Element[] {
    const { xBarScale, yBarScale } = _getScales(containerHeight, containerWidth, false);
    const { useSingleColor = false } = props;
    const bars = _points.map((point: HorizontalBarChartWithAxisDataPoint, index: number) => {
      let shouldHighlight = true;
      if (isLegendHovered || isLegendSelected) {
        shouldHighlight = _isLegendHighlighted(point.legend);
      }
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

      return (
        <React.Fragment key={`${index}_${point.x}`}>
          <rect
            transform={`translate(0,${0.5 * (yBarScale.bandwidth() - _barHeight)})`}
            key={point.x}
            x={_isRtl ? xBarScale(point.x) : _margins.left!}
            y={yBarScale(point.y)}
            rx={props.roundCorners ? 3 : 0}
            width={
              _isRtl
                ? containerWidth - _margins.right! - Math.max(xBarScale(point.x), 0)
                : Math.max(xBarScale(point.x), 0) - _margins.left!
            }
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
            onFocus={() => _onBarFocus(point, index, startColor)}
            fill={startColor}
            tabIndex={point.legend !== '' ? 0 : undefined}
          />
        </React.Fragment>
      );
    });

    // Removing un wanted tooltip div from DOM, when prop not provided, for proper cleanup
    // of unwanted DOM elements, to prevent flacky behaviour in tooltips , that might occur
    // in creating tooltips when tooltips are enabled( as we try to recreate a tspan with _tooltipId)
    if (!props.showYAxisLablesTooltip) {
      try {
        // eslint-disable-next-line @nx/workspace-no-restricted-globals
        document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
        //eslint-disable-next-line no-empty
      } catch (e) {}
    }
    // Used to display tooltip at y axis labels.
    if (props.showYAxisLablesTooltip) {
      const yAxisElement = d3Select(yElement).call(yBarScale);
      if (!tooltipElement) {
        try {
          // eslint-disable-next-line @nx/workspace-no-restricted-globals
          document.getElementById(_tooltipId) && document.getElementById(_tooltipId)!.remove();
          //eslint-disable-next-line no-empty
        } catch (e) {}
      }
      const ytooltipProps = {
        tooltipCls: classes.tooltip!,
        id: _tooltipId,
        yAxis: yAxisElement,
      };
      yAxisElement && _tooltipOfYAxislabels(ytooltipProps);
    }
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

  function _getLegendData(data: HorizontalBarChartWithAxisDataPoint[]): JSX.Element {
    const { useSingleColor } = props;
    const actions: Legend[] = [];

    data.forEach((point: HorizontalBarChartWithAxisDataPoint, _index: number) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const color: string = useSingleColor ? (props.colors ? _createColors()(1) : getNextColor(1, 0)) : point.color!;

      // mapping data to the format Legends component needs
      const legend: Legend = {
        title: point.legend!,
        color,
        hoverAction: () => {
          _handleChartMouseLeave();
          _onLegendHover(point.legend!);
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

    const reversedBars = [..._points].reverse();
    _yAxisLabels = reversedBars.map((point: HorizontalBarChartWithAxisDataPoint) => point.y as string);
    _xMax = Math.max(d3Max(_points, (point: HorizontalBarChartWithAxisDataPoint) => point.x)!, props.xMaxValue || 0);
    const legendBars: JSX.Element = _getLegendData(_points);
    return (
      <CartesianChart
        {...props}
        chartTitle={_getChartTitle()}
        points={_points}
        chartType={ChartTypes.HorizontalBarChartWithAxis}
        xAxisType={_xAxisType}
        yAxisType={_yAxisType}
        stringDatasetForYAxisDomain={_yAxisLabels}
        calloutProps={calloutProps}
        tickParams={tickParams}
        legendBars={legendBars}
        barwidth={_barHeight}
        getmargins={_getMargins}
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
