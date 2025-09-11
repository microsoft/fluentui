import * as React from 'react';
import { useGroupedVerticalBarChartStyles_unstable } from './useGroupedVerticalBarChartStyles.styles';
import { select as d3Select } from 'd3-selection';
import { Axis as D3Axis } from 'd3-axis';
import { max as d3Max, min as d3Min } from 'd3-array';
import { ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';

import { useId, JSXElement } from '@fluentui/react-utilities';
import {
  ChartTypes,
  IAxisData,
  getAccessibleDataObject,
  tooltipOfAxislabels,
  XAxisTypes,
  getTypeOfAxis,
  formatScientificLimitWidth,
  getScalePadding,
  getBarWidth,
  isScalePaddingDefined,
  createNumericYAxis,
  IDomainNRange,
  domainRangeOfXStringAxis,
  createStringYAxis,
  getNextColor,
  areArraysEqual,
  calculateLongestLabelWidth,
  useRtl,
  YAxisType,
  calcRequiredWidth,
  calcTotalWidth,
  calcBandwidth,
  calcTotalBandUnits,
  sortAxisCategories,
} from '../../utilities/index';

import {
  AccessibilityProps,
  CartesianChart,
  Margins,
  Legend,
  GroupedVerticalBarChartProps,
  GroupedVerticalBarChartData,
  GVBarChartSeriesPoint,
  Legends,
  YValueHover,
  ChartPopoverProps,
  Chart,
  ImageExportOptions,
  LegendContainer,
} from '../../index';
import { toImage } from '../../utilities/image-export-utils';

type StringAxis = D3Axis<string>;
type NumericAxis = D3Axis<number | { valueOf(): number }>;

const MIN_DOMAIN_MARGIN = 8;
const X1_INNER_PADDING = 0.1;
const VERTICAL_BAR_GAP = 1;
const MIN_BAR_HEIGHT = 1;

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
>((_props, forwardedRef) => {
  const props: GroupedVerticalBarChartProps = {
    xAxisCategoryOrder: 'default',
    maxBarWidth: 24,
    ..._props,
  };
  const _tooltipId: string = useId('GVBCTooltipId_');
  const _emptyChartId: string = useId('_GVBC_empty');
  const _useRtl: boolean = useRtl();
  let _domainMargin: number = MIN_DOMAIN_MARGIN;
  let _xAxisLabels: string[] = [];
  let _datasetForBars: any[] = [];
  let _margins: Margins = { top: 0, right: 0, bottom: 0, left: 0 };
  let _groupedVerticalBarGraph: JSXElement[] = [];
  let _yMax: number = 0;
  let _calloutAnchorPoint: GVBarChartSeriesPoint | null = null;
  let _barWidth: number = 0;
  let _groupWidth: number = 0;
  let _xAxisInnerPadding: number = 0;
  let _xAxisOuterPadding: number = 0;
  let _legends: string[] = [];
  let _legendColorMap: Record<string, [string, string]> = {};
  const cartesianChartRef = React.useRef<Chart>(null);
  const Y_ORIGIN: number = 0;
  const _legendsRef = React.useRef<LegendContainer>(null);

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
      toImage: (opts?: ImageExportOptions): Promise<string> => {
        return toImage(cartesianChartRef.current?.chartContainer, _legendsRef.current?.toSVG, _useRtl, opts);
      },
    }),
    [],
  );

  const _adjustProps = () => {
    _barWidth = getBarWidth(props.barWidth, props.maxBarWidth);
    // x0_inner_padding = space_between_groups / (space_between_groups + group_width)
    // space_between_groups = 2 * bar_width
    // group_width = _legends.length * bar_width + (_legends.length - 1) * space_between_bars
    _xAxisInnerPadding = getScalePadding(
      props.xAxisInnerPadding,
      undefined,
      2 / (2 + calcTotalBandUnits(_legends.length, X1_INNER_PADDING)),
    );
    _xAxisOuterPadding = getScalePadding(props.xAxisOuterPadding);
  };

  const _createDataset = (points: GroupedVerticalBarChartData[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const datasetForBars: any = [];

    points.forEach((point: GroupedVerticalBarChartData, index: number) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const singleDatasetPointForBars: any = {};
      const legendToBarPoint: Record<string, GVBarChartSeriesPoint> = {};

      point.series.forEach((seriesPoint: GVBarChartSeriesPoint) => {
        if (!singleDatasetPointForBars[seriesPoint.legend]) {
          singleDatasetPointForBars[seriesPoint.legend] = [{ ...seriesPoint }];
          legendToBarPoint[seriesPoint.legend] = { ...seriesPoint };
        } else {
          singleDatasetPointForBars[seriesPoint.legend].push({ ...seriesPoint });
          legendToBarPoint[seriesPoint.legend].data += seriesPoint.data;
        }
      });

      singleDatasetPointForBars.xAxisPoint = point.name;
      singleDatasetPointForBars.indexNum = index;
      singleDatasetPointForBars.groupSeries = Object.values(legendToBarPoint);
      singleDatasetPointForBars.stackCallOutAccessibilityData = point.stackCallOutAccessibilityData;
      datasetForBars.push(singleDatasetPointForBars);
    });
    return datasetForBars;
  };

  const _createDataSetOfGVBC = (points: GroupedVerticalBarChartData[]) => {
    const legends = new Set<string>();
    const xAxisLabels: string[] = _getOrderedXAxisLabels(points);
    points.forEach((point: GroupedVerticalBarChartData) => {
      point.series.forEach((seriesPoint: GVBarChartSeriesPoint) => {
        legends.add(seriesPoint.legend);
      });
    });
    const datasetForBars = _createDataset(points);
    return {
      legends: Array.from(legends),
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

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const _getLegendData = (points: GroupedVerticalBarChartData[]): JSXElement => {
    const actions: Legend[] = [];

    _legends.forEach((legendTitle: string) => {
      const legend: Legend = {
        title: legendTitle,
        color: _legendColorMap[legendTitle][0],
        hoverAction: () => {
          _handleChartMouseLeave();
          _onLegendHover(legendTitle);
        },
        onMouseOutAction: () => {
          _onLegendLeave();
        },
      };

      actions.push(legend);
    });
    return (
      <Legends
        legends={actions}
        enabledWrapLines={props.enabledLegendsWrapLines}
        overflowText={props.legendsOverflowText}
        {...props.legendProps}
        onChange={onLegendSelectionChange}
        legendRef={_legendsRef}
      />
    );
  };

  const _addDefaultColors = (data?: GroupedVerticalBarChartData[]): GroupedVerticalBarChartData[] => {
    _legendColorMap = {};
    let colorIndex = 0;

    return (
      data?.map(point => {
        return {
          ...point,
          series:
            point.series?.map(seriesPoint => {
              // TODO: Add support for gradient colors
              let startColor = seriesPoint.color ? seriesPoint.color : getNextColor(colorIndex, 0);
              let endColor = startColor;
              if (!_legendColorMap[seriesPoint.legend]) {
                _legendColorMap[seriesPoint.legend] = [startColor, endColor];
              }
              colorIndex += 1;

              return {
                ...seriesPoint,
                color: seriesPoint.color ?? _legendColorMap[seriesPoint.legend][0],
              };
            }) ?? [],
        };
      }) ?? []
    );
  };

  const _getOrderedXAxisLabels = (points: GroupedVerticalBarChartData[]) => {
    if (_xAxisType !== XAxisTypes.StringAxis) {
      return [];
    }

    return sortAxisCategories(_mapCategoryToValues(points), props.xAxisCategoryOrder);
  };

  const _mapCategoryToValues = (points: GroupedVerticalBarChartData[]) => {
    const categoryToValues: Record<string, number[]> = {};
    points.forEach(point => {
      if (!categoryToValues[point.name]) {
        categoryToValues[point.name] = [];
      }
      point.series.forEach(seriesPoint => {
        categoryToValues[point.name].push(seriesPoint.data);
      });
    });
    return categoryToValues;
  };

  const points = _addDefaultColors(props.data);
  const _xAxisType: XAxisTypes = getTypeOfAxis(points![0].name, true) as XAxisTypes;
  const { legends, xAxisLabels, datasetForBars } = _createDataSetOfGVBC(points!);
  _legends = legends;
  _xAxisLabels = xAxisLabels;
  _datasetForBars = datasetForBars;
  const legendBars: JSXElement = _getLegendData(points);
  _adjustProps();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Add commentMore actions
  function _getMinMaxOfYAxis(datasetForBars: any, yAxisType?: YAxisType, useSecondaryYScale?: boolean) {
    const values: number[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    datasetForBars.forEach((data: any) => {
      data.groupSeries.forEach((point: GVBarChartSeriesPoint) => {
        if (!useSecondaryYScale === !point.useSecondaryYScale) {
          values.push(point.data);
        }
      });
    });

    return { startValue: d3Min(values)!, endValue: d3Max(values)! };
  }

  function _getDomainNRangeValues(
    points: GroupedVerticalBarChartData[],
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
    if (xAxisType === XAxisTypes.NumericAxis || xAxisType === XAxisTypes.DateAxis) {
      domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
    } else {
      domainNRangeValue = domainRangeOfXStringAxis(margins, width, isRTL);
    }
    return domainNRangeValue;
  }

  // The maxOfYVal prop is only required for the primary y-axis, so yMax should be calculated
  // using only the data points associated with the primary y-axis.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yMax = _getMinMaxOfYAxis(_datasetForBars).endValue;
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
    culture: props.culture,
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
    yScalePrimary: ScaleLinear<number, number>,
    containerHeight: number,
    containerWidth: number,
    xElement?: SVGElement | null,
    yAxisElement?: SVGElement | null,
    yScaleSecondary?: ScaleLinear<number, number>,
  ) => {
    const xScale0 = _createX0Scale(containerWidth);

    // Setting the bar width here is safe because there are no dependencies earlier in the code
    // that rely on the width of bars in vertical bar charts with string x-axis.
    _barWidth = getBarWidth(
      props.barWidth,
      props.maxBarWidth,
      calcBandwidth(xScale0.bandwidth(), _legends.length, X1_INNER_PADDING),
    );
    _groupWidth = calcRequiredWidth(_barWidth, _legends.length, X1_INNER_PADDING);

    const xScale1 = _createX1Scale();
    const allGroupsBars: JSXElement[] = [];
    _datasetForBars.forEach((singleSet: GVSingleDataPoint) => {
      allGroupsBars.push(
        _buildGraph(singleSet, xScale0, xScale1, yScalePrimary, yScaleSecondary, containerHeight, xElement!),
      );
    });
    _groupedVerticalBarGraph = allGroupsBars;
  };

  const _getMargins = (margins: Margins) => {
    _margins = margins;
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
    event: React.FocusEvent<SVGRectElement, Element>,
    pointData: GVBarChartSeriesPoint,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupData: any,
  ): void => {
    let x = 0;
    let y = 0;

    const targetRect = (event.target as SVGRectElement).getBoundingClientRect();
    x = targetRect.left + targetRect.width / 2;
    y = targetRect.top + targetRect.height / 2;
    updatePosition(x, y);
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
  };

  const _buildGraph = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    singleSet: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale0: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xScale1: any,
    yScalePrimary: ScaleLinear<number, number>,
    yScaleSecondary: ScaleLinear<number, number> | undefined,
    containerHeight: number,
    xElement: SVGElement,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
  ): JSXElement => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const singleGroup: JSXElement[] = [];
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const barLabelsForGroup: JSXElement[] = [];

    // Get the actual legends present at this x-axis point
    const presentLegends = Object.keys(singleSet).filter(key => key in _legendColorMap);
    const effectiveGroupWidth = calcRequiredWidth(_barWidth, presentLegends.length, X1_INNER_PADDING);

    // For stacked bars, center the single bar group in the available space
    // Instead of using the global legend position, use the local position within present legends
    const localScale = d3ScaleBand()
      .domain(presentLegends)
      .range(_useRtl ? [effectiveGroupWidth, 0] : [0, effectiveGroupWidth])
      .paddingInner(X1_INNER_PADDING);
    _legends.forEach((legendTitle: string, legendIndex: number) => {
      const barPoints = singleSet[legendTitle];
      if (barPoints) {
        const yBarScale = barPoints[0].useSecondaryYScale && yScaleSecondary ? yScaleSecondary : yScalePrimary;

        const xPoint = (localScale(legendTitle) ?? 0) + (localScale.bandwidth() - _barWidth) / 2;
        const isLegendActive = _legendHighlighted(legendTitle) || _noLegendHighlighted();
        const barOpacity = isLegendActive ? '' : '0.1';

        let barTotalValue = 0;
        const yBaseline = yBarScale(Y_ORIGIN);
        let yPositiveStart = yBaseline;
        let yNegativeStart = yBaseline;
        let yPoint = Y_ORIGIN;

        barPoints.forEach((pointData: GVBarChartSeriesPoint, pointIndex: number) => {
          if (!pointData.data) {
            // Not rendering data with 0.
            return;
          }
          const barGap = (VERTICAL_BAR_GAP / 2) * (pointIndex > 0 ? 2 : 0);
          const height = Math.max(yBarScale(Y_ORIGIN) - yBarScale(Math.abs(pointData.data)), MIN_BAR_HEIGHT);
          const pointColor = pointData.color; // Use the color of the current point

          if (pointData.data >= Y_ORIGIN) {
            yPositiveStart -= height + barGap;
            yPoint = yPositiveStart;
          } else {
            yPoint = yNegativeStart + barGap;
            yNegativeStart = yPoint + height;
          }

          singleGroup.push(
            <rect
              key={`${singleSet.indexNum}-${legendIndex}-${pointIndex}`}
              className={classes.opacityChangeOnHover}
              height={height}
              width={_barWidth}
              x={xPoint}
              y={yPoint}
              opacity={barOpacity}
              fill={pointColor}
              rx={props.roundCorners ? 3 : 0}
              onMouseOver={event => onBarHover(pointData, singleSet, event)}
              onMouseMove={event => onBarHover(pointData, singleSet, event)}
              onMouseOut={_onBarLeave}
              onFocus={event => onBarFocus(event, pointData, singleSet)}
              onBlur={_onBarLeave}
              onClick={pointData.onClick}
              aria-label={getAriaLabel(pointData, singleSet.xAxisPoint)}
              tabIndex={_legendHighlighted(pointData.legend) || _noLegendHighlighted() ? 0 : undefined}
              role="img"
            />,
          );

          barTotalValue += pointData.data;
        });
        if (barTotalValue !== null && !props.hideLabels && Math.ceil(_barWidth) >= 16 && isLegendActive) {
          barLabelsForGroup.push(
            <text
              key={`${singleSet.indexNum}-${legendIndex}`}
              x={xPoint + _barWidth / 2}
              y={barTotalValue >= Y_ORIGIN ? yPositiveStart - 6 : yNegativeStart + 12}
              textAnchor="middle"
              className={classes.barLabel}
              aria-hidden={true}
              style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
            >
              {typeof props.yAxisTickFormat === 'function'
                ? props.yAxisTickFormat(barTotalValue)
                : formatScientificLimitWidth(barTotalValue)}
            </text>,
          );
        }
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
        axis: xAxisElement,
      };
      xAxisElement && tooltipOfAxislabels(tooltipProps);
    }
    return (
      <g
        key={singleSet.indexNum}
        transform={`translate(${xScale0(singleSet.xAxisPoint) + (xScale0.bandwidth() - effectiveGroupWidth) / 2}, 0)`}
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
        .domain(_legends)
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
    const totalWidth = calcTotalWidth(containerWidth, _margins, MIN_DOMAIN_MARGIN);

    if (_xAxisType === XAxisTypes.StringAxis) {
      if (isScalePaddingDefined(props.xAxisOuterPadding)) {
        // Setting the domain margin for string x-axis to 0 because the xAxisOuterPadding prop is now available
        // to adjust the space before the first group and after the last group.
        _domainMargin = 0;
      } else if (props.barWidth !== 'auto') {
        // Update the bar width so that when CartesianChart rerenders,
        // the following calculations don't use the previous bar width.
        _barWidth = getBarWidth(props.barWidth, props.maxBarWidth);
        const groupWidth = calcRequiredWidth(_barWidth, _legends.length, X1_INNER_PADDING);
        /** Total width required to render the groups. Directly proportional to group width */
        const reqWidth = calcRequiredWidth(groupWidth, _xAxisLabels.length, _xAxisInnerPadding);

        if (totalWidth >= reqWidth) {
          // Center align the chart by setting equal left and right margins for domain
          _domainMargin = MIN_DOMAIN_MARGIN + (totalWidth - reqWidth) / 2;
        }
      } else if (props.mode === 'plotly' && xAxisLabels.length > 1) {
        // Calculate the remaining width after rendering groups at their maximum allowable width
        const groupBandwidth = calcBandwidth(totalWidth, _xAxisLabels.length, _xAxisInnerPadding);
        const barBandwidth = calcBandwidth(groupBandwidth, _legends.length, X1_INNER_PADDING);
        const barWidth = getBarWidth(props.barWidth, props.maxBarWidth, barBandwidth);
        const groupWidth = calcRequiredWidth(barWidth, _legends.length, X1_INNER_PADDING);
        let reqWidth = calcRequiredWidth(groupWidth, _xAxisLabels.length, _xAxisInnerPadding);
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
      `Vertical bar chart with ${_xAxisLabels.length} groups of ${_legends.length} bars each. `
    );
  };

  return !_isChartEmpty() ? (
    <CartesianChart
      {...props}
      chartTitle={_getChartTitle()}
      points={_datasetForBars}
      chartType={ChartTypes.GroupedVerticalBarChart}
      getDomainNRangeValues={_getDomainNRangeValues}
      getMinMaxOfYAxis={_getMinMaxOfYAxis}
      createStringYAxis={createStringYAxis}
      calloutProps={calloutProps}
      legendBars={legendBars}
      xAxisType={_xAxisType}
      createYAxis={createNumericYAxis}
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
