'use client';

import * as React from 'react';
import { useGroupedVerticalBarChartStyles_unstable } from './useGroupedVerticalBarChartStyles.styles';
import { pointer as d3Pointer } from 'd3-selection';
import { max as d3Max, min as d3Min } from 'd3-array';
import { ScaleBand, ScaleLinear, scaleBand as d3ScaleBand } from 'd3-scale';

import { useId, JSXElement } from '@fluentui/react-utilities';
import {
  ChartTypes,
  IAxisData,
  getAccessibleDataObject,
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
  LineSeries,
  getColorFromToken,
  BarSeries,
  ChildProps,
} from '../../index';
import { tokens } from '@fluentui/react-theme';
import { useImageExport } from '../../utilities/hooks';
import { isInvalidValue } from '@fluentui/chart-utilities';

type NumericScale = ScaleLinear<number, number>;
type StringScale = ScaleBand<string>;

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

type GVBCLineSeries = LineSeries<string, number>;

export const GroupedVerticalBarChart: React.FC<GroupedVerticalBarChartProps> = React.forwardRef<
  HTMLDivElement,
  GroupedVerticalBarChartProps
>((_props, forwardedRef) => {
  const props: GroupedVerticalBarChartProps = {
    xAxisCategoryOrder: 'default',
    maxBarWidth: 24,
    ..._props,
  };
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
  let _barLegends: string[] = [];
  let _lineLegends: string[] = [];
  let _legendColorMap: Record<string, [string, string]> = {};
  const { cartesianChartRef, legendsRef: _legendsRef } = useImageExport(props.componentRef, props.hideLegend);
  const Y_ORIGIN: number = 0;
  const _rectRef = React.useRef<SVGRectElement>(null);
  const _uniqDotId = useId('gvbc_dot_');

  const [color, setColor] = React.useState<string | undefined>('');
  const [dataForHoverCard, setDataForHoverCard] = React.useState<number>(0);
  const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
  const [xCalloutValue, setXCalloutValue] = React.useState<string>('');
  const [yCalloutValue, setYCalloutValue] = React.useState<string | undefined>('');
  const [yValueHover, setYValueHover] = React.useState<YValueHover[]>([]);
  const [hoverXValue, setHoverXValue] = React.useState<string>('');
  const [calloutLegend, setCalloutLegend] = React.useState<string>('');
  const [activeLegend, setActiveLegend] = React.useState<string>('');
  const [callOutAccessibilityData, setCallOutAccessibilityData] = React.useState<AccessibilityProps | undefined>(
    undefined,
  );
  const [popoverTarget, setPopoverTarget] = React.useState<SVGElement | null>(null);
  const [isPopoverOpen, setPopoverOpen] = React.useState<boolean>(false);
  const [activeLinePoint, setActiveLinePoint] = React.useState<string>('');
  const classes = useGroupedVerticalBarChartStyles_unstable(props);

  React.useEffect(() => {
    if (!areArraysEqual(props.legendProps?.selectedLegends, selectedLegends)) {
      setSelectedLegends(props.legendProps?.selectedLegends || []);
    }
  }, [props.legendProps?.selectedLegends]);

  const _adjustProps = () => {
    _barWidth = getBarWidth(props.barWidth, props.maxBarWidth);
    // x0_inner_padding = space_between_groups / (space_between_groups + group_width)
    // space_between_groups = 2 * bar_width
    // group_width = _barLegends.length * bar_width + (_barLegends.length - 1) * space_between_bars
    _xAxisInnerPadding = getScalePadding(
      props.xAxisInnerPadding,
      undefined,
      2 / (2 + calcTotalBandUnits(_barLegends.length, X1_INNER_PADDING)),
    );
    _xAxisOuterPadding = getScalePadding(props.xAxisOuterPadding);
  };

  const _createDataset = (barData: GroupedVerticalBarChartData[], lineData: GVBCLineSeries[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const datasetForBars: any = [];

    const linePointsByX: Record<string, YValueHover[]> = {};
    const visitedX = new Set<string>();
    lineData.forEach(series => {
      series.data.forEach(point => {
        if (!linePointsByX[point.x]) {
          linePointsByX[point.x] = [];
        }
        linePointsByX[point.x].push({
          ...point,
          legend: series.legend,
          color: series.color,
          data: point.y,
          useSecondaryYScale: series.useSecondaryYScale,
        } as YValueHover);
      });
    });

    barData.forEach((point: GroupedVerticalBarChartData, index: number) => {
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
      singleDatasetPointForBars.groupSeries = [
        ...Object.values(legendToBarPoint),
        ...(linePointsByX[point.name] ?? []),
      ];
      singleDatasetPointForBars.stackCallOutAccessibilityData = point.stackCallOutAccessibilityData;
      datasetForBars.push(singleDatasetPointForBars);
      visitedX.add(point.name);
    });

    Object.keys(linePointsByX).forEach(xPoint => {
      if (!visitedX.has(xPoint)) {
        datasetForBars.push({
          xAxisPoint: xPoint,
          groupSeries: linePointsByX[xPoint],
        });
      }
    });

    return datasetForBars;
  };

  const _createDataSetOfGVBC = (barData: GroupedVerticalBarChartData[], lineData: GVBCLineSeries[]) => {
    const barLegends = new Set<string>();
    barData.forEach((point: GroupedVerticalBarChartData) => {
      point.series.forEach((seriesPoint: GVBarChartSeriesPoint) => {
        barLegends.add(seriesPoint.legend);
      });
    });
    const lineLegends = new Set<string>(lineData.map(series => series.legend));
    const xAxisLabels: string[] = _getOrderedXAxisLabels(barData, lineData);
    const datasetForBars = _createDataset(barData, lineData);
    return {
      barLegends: Array.from(barLegends),
      lineLegends: Array.from(lineLegends),
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

  const _getLegendData = (): JSXElement => {
    const actions: Legend[] = [];

    const addLegendButton = (legendTitle: string, isLineLegendInBarChart?: boolean) => {
      const legend: Legend = {
        title: legendTitle,
        color: _legendColorMap[legendTitle][0],
        isLineLegendInBarChart,
        hoverAction: () => {
          _handleChartMouseLeave();
          _onLegendHover(legendTitle);
        },
        onMouseOutAction: () => {
          _onLegendLeave();
        },
      };

      actions.push(legend);
    };

    _lineLegends.forEach(legendTitle => addLegendButton(legendTitle, true));
    _barLegends.forEach(legendTitle => addLegendButton(legendTitle));

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

  const _processDataV2 = (dataV2: (BarSeries<string, number> | LineSeries<string, number>)[]) => {
    const barPointsByX: Record<string, GroupedVerticalBarChartData> = {};
    const lineData: GVBCLineSeries[] = [];

    dataV2.forEach(series => {
      if (series.type === 'bar') {
        series.data.forEach(point => {
          if (!barPointsByX[point.x]) {
            barPointsByX[point.x] = { name: point.x, series: [] };
          }

          barPointsByX[point.x].series.push({
            key: series.key ?? series.legend,
            data: point.y,
            color: point.color ?? series.color,
            // gradient: series.gradient,
            legend: series.legend,
            xAxisCalloutData: point.xAxisCalloutData,
            yAxisCalloutData: point.yAxisCalloutData,
            onClick: point.onClick,
            useSecondaryYScale: series.useSecondaryYScale,
          });
        });
      } else if (series.type === 'line') {
        lineData!.push(series);
      }
    });

    return { barData: Object.values(barPointsByX), lineData };
  };

  const _prepareChartData = () => {
    let barData = props.data;
    let lineData: GVBCLineSeries[] | undefined;

    if (Array.isArray(props.dataV2) && props.dataV2.length > 0) {
      ({ barData, lineData } = _processDataV2(props.dataV2));
    }

    _legendColorMap = {};
    let colorIndex = 0;

    return {
      barData:
        barData?.map(point => {
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
        }) ?? [],

      lineData:
        lineData?.map(series => {
          let lineColor: string;
          if (typeof series.color === 'undefined') {
            lineColor = getNextColor(colorIndex, 0);
          } else {
            lineColor = getColorFromToken(series.color);
          }

          if (!_legendColorMap[series.legend]) {
            _legendColorMap[series.legend] = [lineColor, lineColor];
          }
          colorIndex += 1;

          return {
            ...series,
            color: _legendColorMap[series.legend][0],
          };
        }) ?? [],
    };
  };

  const _getOrderedXAxisLabels = (barData: GroupedVerticalBarChartData[], lineData: GVBCLineSeries[]) => {
    if (_xAxisType !== XAxisTypes.StringAxis) {
      return [];
    }

    return sortAxisCategories(_mapCategoryToValues(barData, lineData), props.xAxisCategoryOrder);
  };

  const _mapCategoryToValues = (barData: GroupedVerticalBarChartData[], lineData: GVBCLineSeries[]) => {
    const categoryToValues: Record<string, number[]> = {};
    barData.forEach(point => {
      if (!categoryToValues[point.name]) {
        categoryToValues[point.name] = [];
      }
      point.series.forEach(seriesPoint => {
        categoryToValues[point.name].push(seriesPoint.data);
      });
    });
    lineData.forEach(series => {
      series.data.forEach(point => {
        if (!categoryToValues[point.x]) {
          categoryToValues[point.x] = [];
        }
        categoryToValues[point.x].push(point.y);
      });
    });
    return categoryToValues;
  };

  const { barData, lineData } = _prepareChartData();
  const firstXValue = barData[0]?.name ?? lineData[0]?.data[0]?.x;
  const _xAxisType: XAxisTypes = isInvalidValue(firstXValue)
    ? XAxisTypes.StringAxis
    : (getTypeOfAxis(firstXValue, true) as XAxisTypes);
  const { barLegends, lineLegends, xAxisLabels, datasetForBars } = _createDataSetOfGVBC(barData, lineData);
  _barLegends = barLegends;
  _lineLegends = lineLegends;
  _xAxisLabels = xAxisLabels;
  _datasetForBars = datasetForBars;
  const legendBars: JSXElement = _getLegendData();
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
    positioning: { target: popoverTarget },
    isPopoverOpen,
    color,
    legend: calloutLegend,
    XValue: xCalloutValue,
    YValue: yCalloutValue ? yCalloutValue : dataForHoverCard,
    YValueHover: yValueHover,
    hoverXValue,
    culture: props.culture,
    isCartesian: true,
    isCalloutForStack: props.isCalloutForStack,
    ...props.calloutProps,
    ...getAccessibleDataObject(callOutAccessibilityData, 'text', false),
  };
  const tickParams = {
    tickValues: props.tickValues!,
    tickFormat: props.tickFormat!,
  };

  const _getGraphData = (
    xScale: StringScale | NumericScale,
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
      calcBandwidth(xScale0.bandwidth(), _barLegends.length, X1_INNER_PADDING),
    );
    _groupWidth = calcRequiredWidth(_barWidth, _barLegends.length, X1_INNER_PADDING);

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

  const onBarHover = (
    pointData: GVBarChartSeriesPoint,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupData: any,
    mouseEvent: React.MouseEvent<SVGElement>,
  ): void => {
    mouseEvent.persist();
    if (_calloutAnchorPoint !== pointData) {
      _calloutAnchorPoint = pointData;
      _showCallout(mouseEvent.currentTarget, pointData, groupData);
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
    focusEvent: React.FocusEvent<SVGRectElement, Element>,
    pointData: GVBarChartSeriesPoint,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupData: any,
  ): void => {
    _showCallout(focusEvent.currentTarget, pointData, groupData);
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
  ): JSXElement => {
    const singleGroup: JSXElement[] = [];
    const barLabelsForGroup: JSXElement[] = [];

    // Get the actual legends present at this x-axis point
    const presentLegends = _barLegends.filter(key => key in singleSet);
    const effectiveGroupWidth = calcRequiredWidth(_barWidth, presentLegends.length, X1_INNER_PADDING);

    // For stacked bars, center the single bar group in the available space
    // Instead of using the global legend position, use the local position within present legends
    const localScale = d3ScaleBand()
      .domain(presentLegends)
      .range(_useRtl ? [effectiveGroupWidth, 0] : [0, effectiveGroupWidth])
      .paddingInner(X1_INNER_PADDING);
    _barLegends.forEach((legendTitle: string, legendIndex: number) => {
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

          // Render individual bar label if provided
          if (pointData.barLabel && isLegendActive) {
            barLabelsForGroup.push(
              <text
                key={`${singleSet.indexNum}-${legendIndex}-${pointIndex}-label`}
                x={xPoint + _barWidth / 2}
                y={pointData.data >= Y_ORIGIN ? yPoint - 6 : yPoint + height + 12}
                textAnchor="middle"
                className={classes.barLabel}
                aria-hidden={true}
                style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
              >
                {pointData.barLabel}
              </text>,
            );
          }

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
        .domain(_barLegends)
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
        const groupWidth = calcRequiredWidth(_barWidth, _barLegends.length, X1_INNER_PADDING);
        /** Total width required to render the groups. Directly proportional to group width */
        const reqWidth = calcRequiredWidth(groupWidth, _xAxisLabels.length, _xAxisInnerPadding);

        if (totalWidth >= reqWidth) {
          // Center align the chart by setting equal left and right margins for domain
          _domainMargin = MIN_DOMAIN_MARGIN + (totalWidth - reqWidth) / 2;
        }
      } else if (props.mode === 'plotly' && xAxisLabels.length > 1) {
        // Calculate the remaining width after rendering groups at their maximum allowable width
        const groupBandwidth = calcBandwidth(totalWidth, _xAxisLabels.length, _xAxisInnerPadding);
        const barBandwidth = calcBandwidth(groupBandwidth, _barLegends.length, X1_INNER_PADDING);
        const barWidth = getBarWidth(props.barWidth, props.maxBarWidth, barBandwidth);
        const groupWidth = calcRequiredWidth(barWidth, _barLegends.length, X1_INNER_PADDING);
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

  const _isChartEmpty = (_barData: GroupedVerticalBarChartData[], _lineData: GVBCLineSeries[]): boolean => {
    return !(
      (_barData &&
        _barData.length > 0 &&
        _barData.filter((item: GroupedVerticalBarChartData) => item.series.length).length > 0) ||
      (_lineData && _lineData.length > 0 && _lineData.some(series => series.data.length > 0))
    );
  };

  const _getChartTitle = (): string => {
    return (
      (props.chartTitle ? `${props.chartTitle}. ` : '') +
      `Vertical bar chart with ${_barLegends.length} grouped bar series` +
      (_lineLegends.length > 0 ? ` and ${_lineLegends.length} line series. ` : '. ')
    );
  };

  const _createLines = (
    _lineData: GVBCLineSeries[],
    xScale: StringScale,
    yScalePrimary: NumericScale,
    yScaleSecondary?: NumericScale,
  ): React.ReactNode => {
    const lineBorders: React.ReactNode[] = [];
    const lines: React.ReactNode[] = [];
    const dots: React.ReactNode[] = [];

    const scaleLineX = (x: string) => xScale(x)! + xScale.bandwidth() / 2;

    _lineData.forEach((series, seriesIdx) => {
      const lineBorderGroup: React.ReactNode[] = [];
      const lineGroup: React.ReactNode[] = [];
      const dotGroup: React.ReactNode[] = [];
      const lineBorderWidth = series.lineOptions?.lineBorderWidth
        ? Number.parseFloat(series.lineOptions.lineBorderWidth.toString())
        : 0;
      const yScale = series.useSecondaryYScale && yScaleSecondary ? yScaleSecondary : yScalePrimary;
      const shouldHighlight = _legendHighlighted(series.legend) || _noLegendHighlighted();

      series.data.forEach((point, pointIdx) => {
        const x2 = scaleLineX(point.x);
        const y2 = yScale(point.y);

        if (pointIdx > 0) {
          const x1 = scaleLineX(series.data[pointIdx - 1].x);
          const y1 = yScale(series.data[pointIdx - 1].y);

          if (lineBorderWidth > 0) {
            lineBorderGroup.push(
              <line
                key={`lineBorder-${seriesIdx}-${pointIdx}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                fill="transparent"
                stroke={series.lineOptions?.lineBorderColor ?? tokens.colorNeutralBackground1}
                strokeWidth={3 + lineBorderWidth * 2}
                strokeLinecap="round"
                opacity={shouldHighlight ? 1 : 0.1}
              />,
            );
          }

          lineGroup.push(
            <line
              key={`line-${seriesIdx}-${pointIdx}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={series.color}
              strokeWidth={series.lineOptions?.strokeWidth ?? 3}
              strokeLinecap={series.lineOptions?.strokeLinecap ?? 'round'}
              strokeDasharray={series.lineOptions?.strokeDasharray}
              opacity={shouldHighlight ? 1 : 0.1}
              onMouseOver={e => _onLineHover(e, series, seriesIdx, pointIdx, scaleLineX)}
              onMouseLeave={_onBarLeave}
            />,
          );
        }

        const dotId = _getDotId(seriesIdx, pointIdx);
        const isLinePointActive = activeLinePoint === point.x || activeLinePoint === dotId;

        dotGroup.push(
          <circle
            key={dotId}
            id={dotId}
            cx={x2}
            cy={y2}
            r={shouldHighlight && isLinePointActive ? 8 : 0.3}
            fill={tokens.colorNeutralBackground1}
            stroke={series.color}
            strokeWidth={3}
            opacity={shouldHighlight ? 1 : 0.1}
            onMouseOver={e => _onLineHover(e, series, seriesIdx, pointIdx, scaleLineX)}
            onMouseLeave={_onBarLeave}
            tabIndex={shouldHighlight ? 0 : undefined}
            onFocus={e => _onLineFocus(e, series, seriesIdx, pointIdx)}
            onBlur={_onBarLeave}
            role="img"
            aria-label={getAriaLabel(
              {
                xAxisCalloutData: point.xAxisCalloutData,
                legend: series.legend,
                yAxisCalloutData: point.yAxisCalloutData,
                data: point.y,
                callOutAccessibilityData: point.callOutAccessibilityData,
              } as GVBarChartSeriesPoint,
              point.x,
            )}
          />,
        );
      });

      lineBorders.push(<g key={`lineBorderGroup-${seriesIdx}`}>{lineBorderGroup}</g>);
      lines.push(<g key={`lineGroup-${seriesIdx}`}>{lineGroup}</g>);
      dots.push(<g key={`dotGroup-${seriesIdx}`}>{dotGroup}</g>);
    });

    return dots.length > 0 ? (
      <g>
        {lineBorders.length > 0 ? <g>{lineBorders}</g> : null}
        {lines.length > 0 ? <g>{lines}</g> : null}
        <g>{dots}</g>
      </g>
    ) : null;
  };

  const _onLineHover = (
    event: React.MouseEvent<SVGElement>,
    series: GVBCLineSeries,
    seriesIdx: number,
    pointIdx: number,
    scaleLineX: (x: string) => number,
  ) => {
    const pointerX = d3Pointer(event, _rectRef.current)[0];

    let closestPointIdx = pointIdx;
    if (pointIdx > 0) {
      const currPointPos = scaleLineX(series.data[pointIdx].x);
      const prevPointPos = scaleLineX(series.data[pointIdx - 1].x);

      if (Math.abs(prevPointPos - pointerX) < Math.abs(currPointPos - pointerX)) {
        closestPointIdx = pointIdx - 1;
      }
    }

    event.persist();
    _showCalloutForLines(event.currentTarget, series, seriesIdx, closestPointIdx);
  };

  const _onLineFocus = (
    event: React.FocusEvent<SVGElement>,
    series: GVBCLineSeries,
    seriesIdx: number,
    pointIdx: number,
  ) => {
    _showCalloutForLines(event.currentTarget, series, seriesIdx, pointIdx);
  };

  const _showCalloutForLines = (target: SVGElement, series: GVBCLineSeries, seriesIdx: number, pointIdx: number) => {
    const point = series.data[pointIdx];
    const pointData = {
      ...point,
      legend: series.legend,
      color: series.color!,
      key: series.legend,
      data: point.y,
      yAxisCalloutData: point.yAxisCalloutData as string | undefined,
    };
    const groupData = _datasetForBars.find((singleSet: { xAxisPoint: string }) => singleSet.xAxisPoint === point.x);

    _showCallout(target, pointData, groupData, _getDotId(seriesIdx, pointIdx));
  };

  const _showCallout = (
    target: SVGElement,
    pointData: GVBarChartSeriesPoint,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groupData: any,
    _activeLinePoint = '',
  ) => {
    setPopoverTarget(target);
    setPopoverOpen(_noLegendHighlighted() || _legendHighlighted(pointData.legend));
    setCalloutLegend(pointData.legend);
    setDataForHoverCard(pointData.data);
    setColor(pointData.color);
    setXCalloutValue(pointData.xAxisCalloutData ?? groupData.xAxisPoint);
    setYCalloutValue(pointData.yAxisCalloutData);
    setCallOutAccessibilityData(
      props.isCalloutForStack ? groupData.stackCallOutAccessibilityData : pointData.callOutAccessibilityData,
    );
    setYValueHover(
      groupData.groupSeries.filter((item: YValueHover) => _noLegendHighlighted() || _legendHighlighted(item.legend!)),
    );
    setHoverXValue(pointData.xAxisCalloutData ?? groupData.xAxisPoint);
    setActiveLinePoint(props.isCalloutForStack ? groupData.xAxisPoint : _activeLinePoint);
  };

  const _getDotId = (seriesIdx: number, pointIdx: number) => {
    return _uniqDotId + `-${seriesIdx}-${pointIdx}`;
  };

  return !_isChartEmpty(barData, lineData) ? (
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
      children={(childProps: ChildProps) => {
        return (
          <>
            <rect ref={_rectRef} width="100%" height="100%" fill="transparent" style={{ pointerEvents: 'none' }} />
            <g>{_groupedVerticalBarGraph}</g>
            {_createLines(lineData, childProps.xScale, childProps.yScalePrimary, childProps.yScaleSecondary)}
          </>
        );
      }}
    />
  ) : (
    <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
  );
});
GroupedVerticalBarChart.displayName = 'GroupedVerticalBarChart';
