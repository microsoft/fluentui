import * as React from 'react';
import { useGroupedVerticalBarChartStyles_unstable } from './useGroupedVerticalBarChartStyles.styles';
import { max as d3Max } from 'd3-array';
import { select as d3Select } from 'd3-selection';
import { Axis as D3Axis } from 'd3-axis';
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear } from 'd3-scale';

import { useId } from '@fluentui/react-utilities';
import {
  ChartTypes,
  IAxisData,
  getAccessibleDataObject,
  tooltipOfXAxislabels,
  XAxisTypes,
  getTypeOfAxis,
  formatValueWithSIPrefix,
  getScalePadding,
  getBarWidth,
  isScalePaddingDefined,
  getNextColor,
  areArraysEqual,
  calculateLongestLabelWidth,
  useRtl,
} from '../../utilities/index';

import {
  AccessibilityProps,
  CartesianChart,
  Margins,
  Legend,
  RefArrayData,
  GroupedVerticalBarChartProps,
  GroupedVerticalBarChartData,
  GVBarChartSeriesPoint,
  Legends,
  YValueHover,
  DataVizPalette,
  getColorFromToken,
  ChartPopoverProps,
  Chart,
} from '../../index';

type StringAxis = D3Axis<string>;
type NumericAxis = D3Axis<number | { valueOf(): number }>;

const MIN_DOMAIN_MARGIN = 8;
const X1_INNER_PADDING = 0.1;
// x1_inner_padding = space_between_bars / (space_between_bars + bar_width)
// => space_between_bars = (x1_inner_padding / (1 - x1_inner_padding)) * bar_width
/** Rate at which the space between the bars in a group changes wrt the bar width */
const BAR_GAP_RATE = X1_INNER_PADDING / (1 - X1_INNER_PADDING);

// This interface used for - While forming datapoints from given prop "data" in code
interface GVDataPoint {
  [key: string]: number | string;
}

// While forming datapoints from given prop "data" in code. These datapoints are used for to draw graph easily.
interface GVSingleDataPoint {
  [key: string]: GVDataPoint;
}

export const GroupedVerticalBarChart: React.FC<GroupedVerticalBarChartProps> = React.forwardRef<
  HTMLDivElement,
  GroupedVerticalBarChartProps
>((props = { maxBarWidth: 24 }, forwardedRef) => {
  const _tooltipId: string = useId('GVBCTooltipId_');
  const _emptyChartId: string = useId('_GVBC_empty');
  const _useRtl: boolean = useRtl();
  let _domainMargin: number = MIN_DOMAIN_MARGIN;
  let _dataset: GVDataPoint[] = [];
  let _keys: string[] = [];
  let _xAxisLabels: string[] = [];
  let _datasetForBars: any[] = [];
  let _margins: Margins = { top: 0, right: 0, bottom: 0, left: 0 };
  let _groupedVerticalBarGraph: JSX.Element[] = [];
  let _refArray: RefArrayData[] = [];
  let _yMax: number = 0;
  let _calloutAnchorPoint: GVBarChartSeriesPoint | null = null;
  let _barWidth: number = 0;
  let _groupWidth: number = 0;
  let _xAxisInnerPadding: number = 0;
  let _xAxisOuterPadding: number = 0;
  const cartesianChartRef = React.useRef<Chart>(null);

  const [color, setColor] = React.useState<string>('');
  const [dataForHoverCard, setDataForHoverCard] = React.useState<number>(0);
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
  const [xCalloutValue, setXCalloutValue] = React.useState<string>('');
  const [yCalloutValue, setYCalloutValue] = React.useState<string>('');
  const [YValueHover, setYValueHover] = React.useState<YValueHover[]>([]);
  const [hoverXValue, setHoverXValue] = React.useState<string>('');
  const [calloutLegend, setCalloutLegend] = React.useState<string>('');
  const [activeLegend, setActiveLegend] = React.useState<string>('');
  const [callOutAccessibilityData, setCallOutAccessibilityData] = React.useState<AccessibilityProps | undefined>(
    undefined,
  );
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
  const [isPopoverOpen, setPopoverOpen] = React.useState<boolean>(false);
  const classes = useGroupedVerticalBarChartStyles_unstable(props);

  React.useEffect(() => {
    if (!areArraysEqual(props.legendProps?.selectedLegends, selectedLegends)) {
      setSelectedLegends(props.legendProps?.selectedLegends || []);
    }
  }, [props.legendProps?.selectedLegends]);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      chartContainer: cartesianChartRef.current?.chartContainer ?? null,
    }),
    [],
  );

  const _adjustProps = () => {
    _barWidth = getBarWidth(props.barWidth, props.maxBarWidth);
    // x0_inner_padding = space_between_groups / (space_between_groups + group_width)
    // space_between_groups = 2 * bar_width
    // group_width = keys.length * bar_width + (keys.length - 1) * space_between_bars
    _xAxisInnerPadding = getScalePadding(
      props.xAxisInnerPadding,
      undefined,
      2 / (2 + keys.length + (keys.length - 1) * BAR_GAP_RATE),
    );
    _xAxisOuterPadding = getScalePadding(props.xAxisOuterPadding);
  };

  const _createDataset = (points: GroupedVerticalBarChartData[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const datasetForBars: any = [];
    const dataset: GVDataPoint[] = [];

    points.forEach((point: GroupedVerticalBarChartData, index: number) => {
      const singleDatasetPoint: GVDataPoint = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const singleDatasetPointForBars: any = {};
      const singleDataSeries: GVBarChartSeriesPoint[] = [];

      point.series.forEach((seriesPoint: GVBarChartSeriesPoint, seriesIndex) => {
        singleDatasetPoint[seriesPoint.key] = seriesPoint.data;
        singleDatasetPointForBars[seriesPoint.key] = {
          ...seriesPoint,
        };
        singleDataSeries.push(seriesPoint);
      });

      singleDatasetPointForBars.xAxisPoint = point.name;
      singleDatasetPointForBars.indexNum = index;
      singleDatasetPointForBars.groupSeries = singleDataSeries;
      singleDatasetPointForBars.stackCallOutAccessibilityData = point.stackCallOutAccessibilityData;
      datasetForBars.push(singleDatasetPointForBars);
      dataset.push(singleDatasetPoint);
    });
    _dataset = dataset;
    return datasetForBars;
  };

  const _createDataSetOfGVBC = (points: GroupedVerticalBarChartData[]) => {
    const keys: string[] = [];
    const xAxisLabels: string[] = points.map(singlePoint => singlePoint.name);
    points[0].series.forEach((singleKey: GVBarChartSeriesPoint) => {
      keys.push(singleKey.key);
    });
    const datasetForBars = _createDataset(points);
    return {
      keys,
      xAxisLabels,
      datasetForBars,
    };
  };

  const onLegendSelectionChange = (
    selectedLegends: string[],
    event: React.MouseEvent<HTMLButtonElement>,
    currentLegend?: Legend,
  ): void => {
    if (props.legendProps?.canSelectMultipleLegends) {
      setSelectedLegends(selectedLegends);
    } else {
      setSelectedLegends(selectedLegends.slice(-1));
    }
    if (props.legendProps?.onChange) {
      props.legendProps.onChange(selectedLegends, event, currentLegend);
    }
  };

  const _getLegendData = (points: GroupedVerticalBarChartData[]): JSX.Element => {
    const data = points;
    const defaultPalette: string[] = [
      getColorFromToken(DataVizPalette.color1),
      getColorFromToken(DataVizPalette.color2),
      getColorFromToken(DataVizPalette.color3),
      getColorFromToken(DataVizPalette.color4),
      getColorFromToken(DataVizPalette.color5),
    ];
    const actions: Legend[] = [];

    data.forEach((singleChartData: GroupedVerticalBarChartData) => {
      singleChartData.series.forEach((point: GVBarChartSeriesPoint) => {
        let color: string = point.color ? point.color : defaultPalette[Math.floor(Math.random() * 4 + 1)];
        const checkSimilarLegends = actions.filter((leg: Legend) => leg.title === point.legend && leg.color === color);
        if (checkSimilarLegends!.length > 0) {
          return;
        }
        const legend: Legend = {
          title: point.legend,
          color,
          hoverAction: () => {
            _handleChartMouseLeave();
            _onLegendHover(point.legend);
          },
          onMouseOutAction: () => {
            _onLegendLeave();
          },
        };

        actions.push(legend);
      });
    });
    return (
      <Legends
        legends={actions}
        enabledWrapLines={props.enabledLegendsWrapLines}
        overflowText={props.legendsOverflowText}
        {...props.legendProps}
        onChange={onLegendSelectionChange}
      />
    );
  };

  const points = props.data;
  const { keys, xAxisLabels, datasetForBars } = _createDataSetOfGVBC(points!);
  _keys = keys;
  _xAxisLabels = xAxisLabels;
  _datasetForBars = datasetForBars;
  const _xAxisType: XAxisTypes = getTypeOfAxis(points![0].name, true) as XAxisTypes;
  const legends: JSX.Element = _getLegendData(points!);
  _adjustProps();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yMax = d3Max(_dataset, (point: any) => d3Max(_keys, (key: string) => point[key]));
  _yMax = Math.max(yMax, props.yMaxValue || 0);

  const calloutProps: ChartPopoverProps = {
    clickPosition,
    isPopoverOpen,
    color,
    legend: calloutLegend,
    XValue: xCalloutValue,
    YValue: yCalloutValue ? yCalloutValue : dataForHoverCard,
    YValueHover,
    hoverXValue,
    culture: props.culture ?? 'en-us',
    isCartesian: true,
    ...props.calloutProps,
    ...getAccessibleDataObject(callOutAccessibilityData, 'text', false),
  };
  const tickParams = {
    tickValues: props.tickValues!,
    tickFormat: props.tickFormat!,
  };

  const _getGraphData = (
    xScale: StringAxis | NumericAxis,
    yScale: NumericAxis,
    containerHeight: number,
    containerWidth: number,
    xElement?: SVGElement | null,
  ) => {
    const xScale0 = _createX0Scale(containerWidth);

    // Setting the bar width here is safe because there are no dependencies earlier in the code
    // that rely on the width of bars in vertical bar charts with string x-axis.
    _barWidth = getBarWidth(
      props.barWidth,
      props.maxBarWidth,
      xScale0.bandwidth() / (_keys.length + (_keys.length - 1) * BAR_GAP_RATE),
    );
    _groupWidth = (_keys.length + (_keys.length - 1) * BAR_GAP_RATE) * _barWidth;

    const xScale1 = _createX1Scale();
    const allGroupsBars: JSX.Element[] = [];
    _datasetForBars.forEach((singleSet: GVSingleDataPoint) => {
      allGroupsBars.push(_buildGraph(singleSet, xScale0, xScale1, containerHeight, xElement!));
    });
    _groupedVerticalBarGraph = allGroupsBars;
  };

  const _getMargins = (margins: Margins) => {
    _margins = margins;
  };

  const _getOpacity = (legendTitle: string): string => {
    const opacity = _legendHighlighted(legendTitle) || _noLegendHighlighted() ? '' : '0.1';
    return opacity;
  };

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

  const onBarHover = (
    pointData: GVBarChartSeriesPoint,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupData: any,
    mouseEvent: React.MouseEvent<SVGElement>,
  ): void => {
    mouseEvent.persist();
    if (_calloutAnchorPoint !== pointData) {
      _calloutAnchorPoint = pointData;
      updatePosition(mouseEvent.clientX, mouseEvent.clientY);
      setPopoverOpen(_noLegendHighlighted() || _legendHighlighted(pointData.legend));
      setCalloutLegend(pointData.legend);
      setDataForHoverCard(pointData.data);
      setColor(pointData.color);
      setXCalloutValue(pointData.xAxisCalloutData!);
      setYCalloutValue(pointData.yAxisCalloutData!);
      setCallOutAccessibilityData(
        props.isCalloutForStack ? groupData.stackCallOutAccessibilityData : pointData.callOutAccessibilityData,
      );
      setYValueHover(groupData.groupSeries);
      setHoverXValue(pointData.xAxisCalloutData!);
    }
  };

  const _onBarLeave = (): void => {
    /**/
  };

  const _handleChartMouseLeave = (): void => {
    _calloutAnchorPoint = null;
    setPopoverOpen(false);
  };

  const onBarFocus = (
    pointData: GVBarChartSeriesPoint,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupData: any,
    refArrayIndexNumber: number,
  ): void => {
    _refArray.forEach((obj: RefArrayData, index: number) => {
      if (obj.index === pointData.legend && refArrayIndexNumber === index) {
        setPopoverOpen(_noLegendHighlighted() || _legendHighlighted(pointData.legend));
        setCalloutLegend(pointData.legend);
        setDataForHoverCard(pointData.data);
        setColor(pointData.color);
        setXCalloutValue(pointData.xAxisCalloutData!);
        setYCalloutValue(pointData.yAxisCalloutData!);
        setCallOutAccessibilityData(
          props.isCalloutForStack ? groupData.stackCallOutAccessibilityData : pointData.callOutAccessibilityData,
        );
        setYValueHover(groupData.groupSeries);
        setHoverXValue(pointData.xAxisCalloutData!);
      }
    });
  };

  const _refCallback = (element: SVGRectElement, legendTitle: string, refIndexNumber: number): void => {
    _refArray[refIndexNumber] = { index: legendTitle, refElement: element };
  };

  const _buildGraph = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    singleSet: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale0: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale1: any,
    containerHeight: number,
    xElement: SVGElement,
  ): JSX.Element => {
    const singleGroup: JSX.Element[] = [];
    const barLabelsForGroup: JSX.Element[] = [];

    const yBarScale = d3ScaleLinear()
      .domain([0, yMax])
      .range([0, containerHeight! - _margins.bottom! - _margins.top!]);

    const tempDataSet = Object.keys(datasetForBars[0]).splice(0, keys.length);
    tempDataSet.forEach((datasetKey: string, index: number) => {
      const refIndexNumber = singleSet.indexNum * tempDataSet.length + index;
      const pointData = singleSet[datasetKey];
      // To align the centers of the generated bandwidth and the calculated one when they differ,
      // use the following addend.
      const xPoint = xScale1(datasetKey) + (xScale1.bandwidth() - _barWidth) / 2;
      const yPoint = Math.max(containerHeight! - _margins.bottom! - yBarScale(pointData.data), 0);
      const startColor = pointData.color ? pointData.color : getNextColor(index, 0);

      // Not rendering data with 0.
      pointData.data &&
        singleGroup.push(
          <React.Fragment key={`${singleSet.indexNum}-${index}`}>
            <rect
              className={classes.opacityChangeOnHover}
              height={Math.max(yBarScale(pointData.data), 0)}
              width={_barWidth}
              x={xPoint}
              y={yPoint}
              data-is-focusable={!props.hideTooltip && (_legendHighlighted(pointData.legend) || _noLegendHighlighted())}
              opacity={_getOpacity(pointData.legend)}
              ref={(e: SVGRectElement | null) => {
                _refCallback(e!, pointData.legend, refIndexNumber);
              }}
              fill={startColor}
              rx={0}
              onMouseOver={onBarHover.bind(null, pointData, singleSet)}
              onMouseMove={onBarHover.bind(null, pointData, singleSet)}
              onMouseOut={_onBarLeave}
              onFocus={onBarFocus.bind(null, pointData, singleSet, refIndexNumber)}
              onBlur={_onBarLeave}
              onClick={pointData.onClick}
              aria-label={getAriaLabel(pointData, singleSet.xAxisPoint)}
              tabIndex={pointData.legend !== '' ? 0 : undefined}
              role="img"
            />
          </React.Fragment>,
        );
      if (
        pointData.data &&
        !props.hideLabels &&
        _barWidth >= 16 &&
        (_legendHighlighted(pointData.legend) || _noLegendHighlighted())
      ) {
        barLabelsForGroup.push(
          <text
            key={`${singleSet.indexNum}-${index}`}
            x={xPoint + _barWidth / 2}
            y={yPoint - 6}
            textAnchor="middle"
            className={classes.barLabel}
            aria-hidden={true}
          >
            {formatValueWithSIPrefix(pointData.data)}
          </text>,
        );
      }
    });
    // Used to display tooltip at x axis labels.
    if (!props.wrapXAxisLables && props.showXAxisLablesTooltip) {
      const xAxisElement = d3Select(xElement).call(xScale0);
      try {
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
    return (
      <g
        key={singleSet.indexNum}
        transform={`translate(${xScale0(singleSet.xAxisPoint) + (xScale0.bandwidth() - _groupWidth) / 2}, 0)`}
      >
        {singleGroup}
        {barLabelsForGroup}
      </g>
    );
  };

  // For grouped vertical bar chart, First need to define total scale (from start to end)
  // From that need to define scale for single group of bars - done by createX1Scale
  const _createX0Scale = (containerWidth: number) => {
    const x0Axis = d3ScaleBand()
      .domain(xAxisLabels)
      .range(
        _useRtl
          ? [containerWidth! - _margins.right! - _domainMargin, _margins.left! + _domainMargin]
          : [_margins.left! + _domainMargin, containerWidth! - _margins.right! - _domainMargin],
      )
      .paddingInner(_xAxisInnerPadding)
      .paddingOuter(_xAxisOuterPadding);
    return x0Axis;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _createX1Scale = (): any => {
    return (
      d3ScaleBand()
        .domain(keys)
        // When there is only one group, xScale0 adds padding around it,
        // causing the bandwidth to become smaller than the actual group width.
        // So to render bars in the group correctly, use groupWidth instead of the generated scale bandwidth.
        .range(_useRtl ? [_groupWidth, 0] : [0, _groupWidth])
        .paddingInner(X1_INNER_PADDING)
    );
  };

  const _onLegendHover = (legendTitle: string): void => {
    setActiveLegend(legendTitle);
  };

  const _onLegendLeave = (): void => {
    setActiveLegend('');
  };

  const _getAxisData = React.useCallback(
    (yAxisData: IAxisData) => {
      if (yAxisData && yAxisData.yAxisDomainValues.length) {
        const { yAxisDomainValues: domainValue } = yAxisData;
        _yMax = Math.max(domainValue[domainValue.length - 1], props.yMaxValue || 0);
      }
    },
    [props.yMaxValue],
  );

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  const _legendHighlighted = (legendTitle: string) => {
    return _getHighlightedLegend().includes(legendTitle!);
  };

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  const _noLegendHighlighted = () => {
    return _getHighlightedLegend().length === 0;
  };

  const _getHighlightedLegend = () => {
    return selectedLegends.length > 0 ? selectedLegends : activeLegend ? [activeLegend] : [];
  };

  const getAriaLabel = (point: GVBarChartSeriesPoint, xAxisPoint: string): string => {
    const xValue = point.xAxisCalloutData || xAxisPoint;
    const legend = point.legend;
    const yValue = point.yAxisCalloutData || point.data;
    return point.callOutAccessibilityData?.ariaLabel || `${xValue}. ${legend}, ${yValue}.`;
  };

  const _getDomainMargins = (containerWidth: number): Margins => {
    /** Total width available to render the bars */
    const totalWidth = containerWidth - (_margins.left! + MIN_DOMAIN_MARGIN) - (_margins.right! + MIN_DOMAIN_MARGIN);
    /** Rate at which the space between the groups changes wrt the group width */
    const groupGapRate = _xAxisInnerPadding / (1 - _xAxisInnerPadding);

    if (_xAxisType === XAxisTypes.StringAxis) {
      if (isScalePaddingDefined(props.xAxisOuterPadding)) {
        // Setting the domain margin for string x-axis to 0 because the xAxisOuterPadding prop is now available
        // to adjust the space before the first group and after the last group.
        _domainMargin = 0;
      } else if (props.barWidth !== 'auto') {
        // Update the bar width so that when CartesianChart rerenders,
        // the following calculations don't use the previous bar width.
        _barWidth = getBarWidth(props.barWidth, props.maxBarWidth);
        const groupWidth = (keys.length + (keys.length - 1) * BAR_GAP_RATE) * _barWidth;
        /** Total width required to render the groups. Directly proportional to group width */
        const reqWidth = (xAxisLabels.length + (xAxisLabels.length - 1) * groupGapRate) * groupWidth;

        if (totalWidth >= reqWidth) {
          // Center align the chart by setting equal left and right margins for domain
          _domainMargin = MIN_DOMAIN_MARGIN + (totalWidth - reqWidth) / 2;
        }
      } else if (props.mode === 'plotly' && xAxisLabels.length > 1) {
        // Calculate the remaining width after rendering groups at their maximum allowable width
        const groupBandwidth = totalWidth / (xAxisLabels.length + (xAxisLabels.length - 1) * groupGapRate);
        const barBandwidth = groupBandwidth / (keys.length + (keys.length - 1) * BAR_GAP_RATE);
        const barWidth = getBarWidth(props.barWidth, props.maxBarWidth, barBandwidth);
        const groupWidth = (keys.length + (keys.length - 1) * BAR_GAP_RATE) * barWidth;
        let reqWidth = (xAxisLabels.length + (xAxisLabels.length - 1) * groupGapRate) * groupWidth;
        const margin1 = (totalWidth - reqWidth) / 2;

        // Calculate the remaining width after accounting for the space required to render x-axis labels
        const step = calculateLongestLabelWidth(xAxisLabels) + 20;
        reqWidth = (xAxisLabels.length - _xAxisInnerPadding) * step;
        const margin2 = (totalWidth - reqWidth) / 2;

        _domainMargin = MIN_DOMAIN_MARGIN + Math.max(0, Math.min(margin1, margin2));
      }
    }

    return {
      ..._margins,
      left: _margins.left! + _domainMargin,
      right: _margins.right! + _domainMargin,
    };
  };

  const _isChartEmpty = (): boolean => {
    return !(
      props.data &&
      props.data.length > 0 &&
      props.data.filter((item: GroupedVerticalBarChartData) => item.series.length).length > 0
    );
  };

  const _getChartTitle = (): string => {
    return (
      (props.chartTitle ? `${props.chartTitle}. ` : '') +
      `Vertical bar chart with ${_xAxisLabels.length} groups of ${_keys.length} bars each. `
    );
  };

  return !_isChartEmpty() ? (
    <CartesianChart
      {...props}
      chartTitle={_getChartTitle()}
      points={_datasetForBars}
      chartType={ChartTypes.GroupedVerticalBarChart}
      calloutProps={calloutProps}
      legendBars={legends}
      xAxisType={_xAxisType}
      datasetForXAxisDomain={_xAxisLabels}
      tickParams={tickParams}
      tickPadding={props.tickPadding || 5}
      maxOfYVal={_yMax}
      getmargins={_getMargins}
      getGraphData={_getGraphData}
      getAxisData={_getAxisData}
      onChartMouseLeave={_handleChartMouseLeave}
      getDomainMargins={_getDomainMargins}
      {...(_xAxisType === XAxisTypes.StringAxis && {
        xAxisInnerPadding: _xAxisInnerPadding,
        xAxisOuterPadding: _xAxisOuterPadding,
      })}
      barwidth={_barWidth}
      componentRef={cartesianChartRef}
      /* eslint-disable react/jsx-no-bind */
      children={() => {
        return <g>{_groupedVerticalBarGraph}</g>;
      }}
    />
  ) : (
    <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
  );
});
GroupedVerticalBarChart.displayName = 'GroupedVerticalBarChart';
