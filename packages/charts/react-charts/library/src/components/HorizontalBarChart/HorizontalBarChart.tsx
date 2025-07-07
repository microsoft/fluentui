import * as React from 'react';
import { useHorizontalBarChartStyles } from './useHorizontalBarChartStyles.styles';
import { ChartProps, HorizontalBarChartProps, ChartDataPoint, RefArrayData, HorizontalBarChartVariant } from './index';
import { formatToLocaleString } from '@fluentui/chart-utilities';
import { formatScientificLimitWidth, getAccessibleDataObject, useRtl } from '../../utilities/index';
import { useId } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { FocusableTooltipText } from '../../utilities/FocusableTooltipText';
import { Legend, Legends } from '../../index';

/**
 * HorizontalBarChart is the context wrapper and container for all HorizontalBarChart content/controls,
 * It has no direct style or slot opinions.
 *
 * HorizontalBarChart also provides API interfaces for callbacks that will occur on navigation events.
 */
export const HorizontalBarChart: React.FunctionComponent<HorizontalBarChartProps> = React.forwardRef<
  HTMLDivElement,
  HorizontalBarChartProps
>((props, forwardedRef) => {
  const legendContainer = React.useRef<HTMLDivElement | null>(null);
  const _uniqLineText: string = '_HorizontalLine_' + Math.random().toString(36).substring(7);
  const _refArray: RefArrayData[] = [];
  const _isRTL: boolean = useRtl();
  const barChartSvgRef: React.RefObject<SVGSVGElement> = React.createRef<SVGSVGElement>();
  const _emptyChartId: string = useId('_HBC_empty');
  let _barHeight: number;
  let _calloutAnchorPoint: ChartDataPoint | null;
  let isSingleBar: boolean = true;

  const [hoverValue, setHoverValue] = React.useState<string | number | Date | null>('');
  const [lineColor, setLineColor] = React.useState<string>('');
  const [legend, setLegend] = React.useState<string | null>('');
  const [xCalloutValue, setXCalloutValue] = React.useState<string | undefined>('');
  const [yCalloutValue, setYCalloutValue] = React.useState<string | undefined>('');
  const [barCalloutProps, setBarCalloutProps] = React.useState<ChartDataPoint>();
  const [barSpacingInPercent, setBarSpacingInPercent] = React.useState<number>(0);
  const [isPopoverOpen, setPopoverOpen] = React.useState<boolean>(false);
  const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
  const [selectedLegend, setSelectedLegend] = React.useState<string>('');
  const [activeLegend, setActiveLegend] = React.useState<string>('');

  function _refCallback(element: SVGGElement, legendTitle: string | undefined): void {
    _refArray.push({ index: legendTitle, refElement: element });
  }

  function _hoverOn(
    event: React.FocusEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>,
    hoverVal: string | number | Date,
    point: ChartDataPoint,
  ): void {
    if (
      (!isPopoverOpen || legend !== point.legend!) &&
      _calloutAnchorPoint !== point &&
      (_legendHighlighted(point.legend) || _noLegendHighlighted())
    ) {
      _calloutAnchorPoint = point;
      let x = 0;
      let y = 0;

      if ('clientX' in event && event.clientX && event.clientY) {
        // Mouse event
        x = event.clientX;
        y = event.clientY;
      } else {
        // Focus event
        const targetRect = (event.target as SVGRectElement).getBoundingClientRect();
        x = targetRect.left + targetRect.width / 2;
        y = targetRect.top + targetRect.height / 2;
      }

      updatePosition(x, y);
      setHoverValue(hoverVal);
      setLineColor(point.color!);
      setLegend(point.legend!);
      setXCalloutValue(point.xAxisCalloutData!);
      setYCalloutValue(point.yAxisCalloutData!);
      setBarCalloutProps(point);
      // ToDo - Confirm setting multiple state variables like this is performant.
    }
  }

  function _hoverOff(): void {
    /*ToDo. To fix*/
  }

  const _handleChartMouseLeave = () => {
    _calloutAnchorPoint = null;
    if (isPopoverOpen) {
      setPopoverOpen(false);
      setHoverValue('');
      setLineColor('');
      setLegend('');
    }
  };

  const _adjustProps = (): void => {
    _barHeight = props.barHeight || 12;
  };

  const _getChartDataText = (data: ChartProps) => {
    /* return props.barChartCustomData ? (
        <div role="text">{props.barChartCustomData(data)}</div>
      ) : ( */
    return _getDefaultTextData(data);
    //)
  };

  function _createLegends(chartProps: ChartProps[]): JSX.Element {
    const legendItems: Legend[] = [];
    chartProps.forEach((point: ChartProps) => {
      point.chartData!.forEach((dataPoint: ChartDataPoint) => {
        const color: string = dataPoint.color!;
        // mapping data to the format Legends component needs
        const legendItem: Legend = {
          title: dataPoint.legend!,
          color,
          action: () => {
            if (selectedLegend === dataPoint.legend) {
              setSelectedLegend('');
            } else {
              setSelectedLegend(dataPoint.legend!);
            }
          },
          hoverAction: () => {
            _handleChartMouseLeave();
            setActiveLegend(dataPoint.legend!);
          },
          onMouseOutAction: () => {
            setActiveLegend('');
          },
        };
        legendItems.push(legendItem);
      });
    });
    const legends = (
      <Legends legends={legendItems} centerLegends overflowText={props.legendsOverflowText} {...props.legendProps} />
    );
    return legends;
  }

  function _getDefaultTextData(data: ChartProps): JSX.Element {
    const { culture } = props;
    const accessibilityData = getAccessibleDataObject(data.chartDataAccessibilityData!, 'text', false);
    if (!isSingleBar) {
      const total = data.chartData!.reduce(
        (acc: number, point: ChartDataPoint) =>
          acc + (point.horizontalBarChartdata!.x ? point.horizontalBarChartdata!.x : 0),
        0,
      );
      return (
        <div className={classes.chartTitleRight} {...accessibilityData}>
          {formatToLocaleString(total, culture) as React.ReactNode}
        </div>
      );
    }
    const chartDataMode = props.chartDataMode || 'default';
    const chartData: ChartDataPoint = data!.chartData![0];
    const x = chartData.horizontalBarChartdata!.x;
    const y = chartData.horizontalBarChartdata!.total!;

    switch (chartDataMode) {
      case 'default':
        return (
          <div className={classes.chartTitleRight} {...accessibilityData}>
            {formatToLocaleString(x, culture) as React.ReactNode}
          </div>
        );
      case 'fraction':
        return (
          <div {...accessibilityData}>
            <span className={classes.chartTitleRight}>{formatToLocaleString(x, culture) as React.ReactNode}</span>
            <span className={classes.chartDataTextDenominator}>{' / ' + formatToLocaleString(y, culture)}</span>
          </div>
        );
      case 'percentage':
        const dataRatioPercentage = `${formatToLocaleString(Math.round((x / y) * 100), culture)}%`;
        return (
          <div className={classes.chartTitleRight} {...accessibilityData}>
            {dataRatioPercentage}
          </div>
        );
    }
  }

  function _createBenchmark(data: ChartProps): JSX.Element {
    if (data.chartData![0].horizontalBarChartdata!.total === undefined) {
      return <></>;
    }
    const totalData = data.chartData![0].horizontalBarChartdata!.total!;
    const benchmarkData = data.chartData![0].data;
    const benchmarkRatio = Math.round(((benchmarkData ? benchmarkData : 0) / totalData) * 100);

    const benchmarkStyles = {
      left: 'calc(' + benchmarkRatio + '% - 4px)',
    };

    return (
      <div className={classes.benchmarkContainer}>
        <div className={classes.triangle} style={benchmarkStyles} />
      </div>
    );
  }

  /**
   * This functions returns an array of <rect> elements, which form the bars
   * For each bar an x value, and a width needs to be specified
   * The computations are done based on percentages
   * Extra margin is also provided, in the x value to provide some spacing in between the bars
   */

  function _createBars(data: ChartProps): JSX.Element[] {
    const noOfBars =
      data.chartData?.reduce((count: number, point: ChartDataPoint) => (count += (point.data || 0) > 0 ? 1 : 0), 0) ||
      1;
    const totalMarginPercent = barSpacingInPercent * (noOfBars - 1);
    const defaultColors: string[] = [
      tokens.colorPaletteBlueForeground2,
      tokens.colorPaletteCornflowerForeground2,
      tokens.colorPaletteDarkGreenForeground2,
      tokens.colorPaletteNavyForeground2,
      tokens.colorPaletteDarkOrangeForeground2,
    ];
    // calculating starting point of each bar and it's range
    const startingPoint: number[] = [];
    const total = data.chartData!.reduce(
      (acc: number, point: ChartDataPoint) =>
        acc + (point.horizontalBarChartdata!.x ? point.horizontalBarChartdata!.x : 0),
      0,
    );
    let prevPosition = 0;
    let value = 0;

    let sumOfPercent = 0;
    data.chartData!.map((point: ChartDataPoint, index: number) => {
      const pointData = point.horizontalBarChartdata!.x ? point.horizontalBarChartdata!.x : 0;
      value = (pointData / total) * 100;
      if (value < 0) {
        value = 0;
      } else if (value < 1 && value !== 0) {
        value = 1;
      }
      sumOfPercent += value;

      return sumOfPercent;
    });

    /**
     * The %age of the space occupied by the margin needs to subtracted
     * while computing the scaling ratio, since the margins are not being
     * scaled down, only the data is being scaled down from a higher percentage to lower percentage
     * Eg: 95% of the space is taken by the bars, 5% by the margins
     * Now if the sumOfPercent is 120% -> This needs to be scaled down to 95%, not 100%
     * since that's only space available to the bars
     */
    const scalingRatio = sumOfPercent !== 0 ? (sumOfPercent - totalMarginPercent) / 100 : 1;

    const bars = data.chartData!.map((point: ChartDataPoint, index: number) => {
      const color: string = point.color ? point.color : defaultColors[Math.floor(Math.random() * 4 + 1)];
      const pointData = point.horizontalBarChartdata!.x ? point.horizontalBarChartdata!.x : 0;
      if (index > 0) {
        prevPosition += value;
      }
      value = (pointData / total) * 100;
      if (value < 0) {
        value = 0;
      } else if (value < 1 && value !== 0) {
        value = 1 / scalingRatio;
      } else {
        value = value / scalingRatio;
      }
      startingPoint.push(prevPosition);

      const xValue = point.horizontalBarChartdata!.x;
      const placeholderIndex = 1;
      const isLegendSelected: boolean = _legendHighlighted(point.legend) || _noLegendHighlighted();

      // Render bar label instead of placeholder bar for absolute-scale variant
      if (index === placeholderIndex && props.variant === HorizontalBarChartVariant.AbsoluteScale) {
        if (props.hideLabels) {
          return <text key={index} />;
        }

        const barValue = data.chartData![0].horizontalBarChartdata!.x;

        return (
          <text
            key={index}
            x={`${_isRTL ? 100 - startingPoint[index] : startingPoint[index]}%`}
            y={_barHeight / 2}
            dominantBaseline="central"
            transform={`translate(${_isRTL ? -4 : 4})`}
            className={classes.barLabel}
            aria-hidden={true}
          >
            {formatScientificLimitWidth(barValue)}
          </text>
        );
      }

      return (
        <rect
          key={index}
          x={`${
            _isRTL
              ? 100 - startingPoint[index] - value - index * barSpacingInPercent
              : startingPoint[index] + index * barSpacingInPercent
          }%`}
          y={0}
          width={value + '%'}
          height={_barHeight}
          fill={color}
          onMouseOver={point.legend !== '' ? event => _hoverOn(event, xValue, point) : undefined}
          onFocus={point.legend !== '' ? event => _hoverOn(event, xValue, point) : undefined}
          role="img"
          aria-label={_getAriaLabel(point)}
          onBlur={_hoverOff}
          onMouseLeave={_hoverOff}
          className={classes.barWrapper}
          opacity={isLegendSelected ? 1 : 0.1}
          tabIndex={point.legend !== '' ? 0 : undefined}
        />
      );
    });
    return bars;
  }

  const _getAriaLabel = (point: ChartDataPoint): string => {
    const legend = point.xAxisCalloutData || point.legend;
    const yValue =
      point.yAxisCalloutData ||
      (point.horizontalBarChartdata
        ? `${point.horizontalBarChartdata.x}/${point.horizontalBarChartdata.total ?? ''}`
        : 0);
    return point.callOutAccessibilityData?.ariaLabel || (legend ? `${legend}, ` : '') + `${yValue}.`;
  };

  function _isChartEmpty(): boolean {
    return !(props.data && props.data.length > 0);
  }

  function updatePosition(newX: number, newY: number): void {
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

  React.useEffect(() => {
    const svgWidth = barChartSvgRef?.current?.getBoundingClientRect().width || 0;
    const MARGIN_WIDTH_IN_PX = 3;
    if (svgWidth) {
      const currentBarSpacing = (MARGIN_WIDTH_IN_PX / svgWidth) * 100;
      setBarSpacingInPercent(currentBarSpacing);
    }
  }, [barChartSvgRef]);

  function _legendHighlighted(barLegend?: string) {
    if (barLegend === undefined) {
      return false;
    }
    return selectedLegend === barLegend || (selectedLegend === '' && activeLegend === barLegend);
  }

  /**
   * This function checks if none of the legends is selected or hovered.*/

  function _noLegendHighlighted() {
    return selectedLegend === '' && activeLegend === '';
  }

  const { data } = props;
  _adjustProps();
  const classes = useHorizontalBarChartStyles(props);
  const focusAttributes = useFocusableGroup();
  const legendButtons = _createLegends(data!);

  let datapoint: number | undefined = 0;
  return !_isChartEmpty() ? (
    <div className={classes.root} onMouseLeave={_handleChartMouseLeave}>
      {data!.map((points: ChartProps, index: number) => {
        if (points.chartData && points.chartData![0] && points.chartData![0].horizontalBarChartdata!.x) {
          datapoint = points.chartData![0].horizontalBarChartdata!.x;
        } else {
          datapoint = 0;
        }
        isSingleBar =
          points.chartData!.length === 1 || (points.chartData!.length > 1 && points.chartData![1].legend === '');
        if (isSingleBar) {
          points.chartData![1] = {
            legend: '',
            horizontalBarChartdata: {
              x: points.chartData![0].horizontalBarChartdata!.total! - datapoint!,
              total: points.chartData![0].horizontalBarChartdata!.total!,
            },
            color: tokens.colorBackgroundOverlay,
          };
        }

        // Hide right side text of chart title for absolute-scale variant
        const chartDataText =
          props.variant === HorizontalBarChartVariant.AbsoluteScale ? null : _getChartDataText(points!);
        const bars = _createBars(points!);
        const keyVal = _uniqLineText + '_' + index;
        // ToDo - Showtriangle property is per data series. How to account for it in the new stylesheet
        /*         const classes = useHorizontalBarChartStyles(props.styles!, {
          width: props.width,
          showTriangle: !!points!.chartData![0].data,
          variant: props.variant,
        }); */

        return (
          <div key={index}>
            <div className={classes.items} {...focusAttributes}>
              <div className={classes.chartTitle}>
                {points!.chartTitle && (
                  <FocusableTooltipText
                    className={classes.chartTitleLeft}
                    content={points!.chartTitle}
                    accessibilityData={points!.chartTitleAccessibilityData}
                  />
                )}
                {chartDataText}
              </div>
              {points!.chartData![0].data && _createBenchmark(points!)}
              <svg ref={barChartSvgRef} className={classes.chart} aria-label={points!.chartTitle}>
                <g
                  id={keyVal}
                  key={keyVal}
                  ref={(e: SVGGElement) => {
                    _refCallback(e, points!.chartData![0].legend);
                  }}
                  // NOTE: points.chartData![0] contains current data value
                  onClick={() => {
                    const p = points!.chartData![0];
                    if (p && p.onClick) {
                      p.onClick();
                    }
                  }}
                >
                  {bars}
                </g>
              </svg>
            </div>
          </div>
        );
      })}
      <ChartPopover
        xCalloutValue={xCalloutValue}
        yCalloutValue={yCalloutValue}
        culture={props.culture ?? 'en-us'}
        clickPosition={clickPosition}
        isPopoverOpen={isPopoverOpen}
        legend={legend!}
        YValue={hoverValue!}
        color={lineColor}
        isCalloutForStack={false}
        customCallout={{
          customizedCallout: props.onRenderCalloutPerHorizontalBar
            ? props.onRenderCalloutPerHorizontalBar(barCalloutProps!)
            : undefined,
          customCalloutProps: props.calloutPropsPerDataPoint
            ? props.calloutPropsPerDataPoint(barCalloutProps!)
            : undefined,
        }}
        isCartesian={false}
      />
      {!isSingleBar && (
        <div ref={(e: HTMLDivElement) => (legendContainer.current = e)} className={classes.legendContainer}>
          {legendButtons}
        </div>
      )}
    </div>
  ) : (
    <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
  );
  //TODO validate and fix focus border for issue for popover
});
HorizontalBarChart.displayName = 'HorizontalBarChart';
