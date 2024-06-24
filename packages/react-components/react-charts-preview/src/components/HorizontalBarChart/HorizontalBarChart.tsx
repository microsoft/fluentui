import * as React from 'react';
import { useHorizontalBarChartStyles_unstable } from './useHorizontalBarChartStyles.styles';
import {
  IAccessibilityProps,
  IChartProps,
  IHorizontalBarChartProps,
  IChartDataPoint,
  IRefArrayData,
  HorizontalBarChartVariant,
} from './index';
import { convertToLocaleString } from '../../utilities/locale-util';
import { formatValueWithSIPrefix, getAccessibleDataObject, isRtl, find } from '../../utilities/index';
import { useId } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { useFocusableGroup } from '@fluentui/react-tabster';

/**
 * HorizontalBarChart is the context wrapper and container for all HorizontalBarChart content/controls,
 * It has no direct style or slot opinions.
 *
 * HorizontalBarChart also provides API interfaces for callbacks that will occur on navigation events.
 */
export const HorizontalBarChart: React.FunctionComponent<IHorizontalBarChartProps> = React.forwardRef<
  HTMLDivElement,
  IHorizontalBarChartProps
>((props, forwardedRef) => {
  let _barHeight: number;
  //let _classNames: IProcessedStyleSet<IHorizontalBarChartStyles>;
  let _uniqLineText: string = '_HorizontalLine_' + Math.random().toString(36).substring(7);
  let _calloutId: string;
  let _refArray: IRefArrayData[] = [];
  let _calloutAnchorPoint: IChartDataPoint | null;
  const _isRTL: boolean = isRtl();
  let barChartSvgRef: React.RefObject<SVGSVGElement> = React.createRef<SVGSVGElement>();
  const _emptyChartId: string = useId('_HBC_empty');

  const [isCalloutVisible, setIsCalloutVisible] = React.useState<boolean>(false);
  const [refSelected, setRefSelected] = React.useState<SVGGElement | null | undefined>(null);
  const [color, setColor] = React.useState<string>('');
  const [hoverValue, setHoverValue] = React.useState<string | number | Date | null>('');
  const [lineColor, setLineColor] = React.useState<string>('');
  const [legend, setLegend] = React.useState<string | null>('');
  const [xCalloutValue, setXCalloutValue] = React.useState<string | undefined>('');
  const [yCalloutValue, setYCalloutValue] = React.useState<string | undefined>('');
  const [barCalloutProps, setBarCalloutProps] = React.useState<IChartDataPoint>();
  const [callOutAccessibilityData, setCallOutAccessibilityData] = React.useState<IAccessibilityProps | undefined>();
  const [barSpacingInPercent, setBarSpacingInPercent] = React.useState<number>(0);

  function _refCallback(element: SVGGElement, legendTitle: string | undefined): void {
    _refArray.push({ index: legendTitle, refElement: element });
  }

  function _hoverOn(hoverValue: string | number | Date | null, point: IChartDataPoint): void {
    if ((!isCalloutVisible || legend !== point.legend!) && _calloutAnchorPoint !== point) {
      const currentHoveredElement = find(
        _refArray,
        (currentElement: IRefArrayData) => currentElement.index === point.legend,
      );
      _calloutAnchorPoint = point;
      setIsCalloutVisible(true);
      setHoverValue(hoverValue);
      setLineColor(point.color!);
      setLegend(point.legend!);
      setRefSelected(currentHoveredElement!.refElement);
      setXCalloutValue(point.xAxisCalloutData!);
      setYCalloutValue(point.yAxisCalloutData!);
      setBarCalloutProps(point);
      setCallOutAccessibilityData(point.callOutAccessibilityData);
      // ToDo - Confirm setting multiple state variables like this is performant.
    }
  }

  function _hoverOff(): void {
    /**/
  }

  const _handleChartMouseLeave = () => {
    _calloutAnchorPoint = null;
    if (isCalloutVisible) {
      setIsCalloutVisible(false);
      setHoverValue('');
      setRefSelected(null);
      setLineColor('');
      setLegend('');
    }
  };

  const _adjustProps = (): void => {
    _barHeight = props.barHeight || 12;
  };

  const _getChartDataText = (data: IChartProps) => {
    /* return props.barChartCustomData ? (
        <div role="text">{props.barChartCustomData(data)}</div>
      ) : ( */
    return _getDefaultTextData(data);
    //)
  };

  function _getDefaultTextData(data: IChartProps): JSX.Element {
    const { culture } = props;
    const chartDataMode = props.chartDataMode || 'default';
    const chartData: IChartDataPoint = data!.chartData![0];
    const x = chartData.horizontalBarChartdata!.x;
    const y = chartData.horizontalBarChartdata!.y;

    const accessibilityData = getAccessibleDataObject(data.chartDataAccessibilityData!, 'text', false);
    switch (chartDataMode) {
      case 'default':
        return (
          <div className={classes.chartTitleRight} {...accessibilityData}>
            {convertToLocaleString(x, culture)}
          </div>
        );
      case 'fraction':
        return (
          <div {...accessibilityData}>
            <span className={classes.chartTitleRight}>{convertToLocaleString(x, culture)}</span>
            <span className={classes.chartDataTextDenominator}>{' / ' + convertToLocaleString(y, culture)}</span>
          </div>
        );
      case 'percentage':
        const dataRatioPercentage = `${convertToLocaleString(Math.round((x / y) * 100), culture)}%`;
        return (
          <div className={classes.chartTitleRight} {...accessibilityData}>
            {dataRatioPercentage}
          </div>
        );
    }
  }

  function _createBenchmark(data: IChartProps): JSX.Element {
    const totalData = data.chartData![0].horizontalBarChartdata!.y;
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

  function _createBars(data: IChartProps): JSX.Element[] {
    const noOfBars =
      data.chartData?.reduce((count: number, point: IChartDataPoint) => (count += (point.data || 0) > 0 ? 1 : 0), 0) ||
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
      (acc: number, point: IChartDataPoint) =>
        acc + (point.horizontalBarChartdata!.x ? point.horizontalBarChartdata!.x : 0),
      0,
    );
    let prevPosition = 0;
    let value = 0;

    let sumOfPercent = 0;
    data.chartData!.map((point: IChartDataPoint, index: number) => {
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

    const bars = data.chartData!.map((point: IChartDataPoint, index: number) => {
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
            {formatValueWithSIPrefix(barValue)}
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
          data-is-focusable={point.legend !== '' ? true : false}
          width={value + '%'}
          height={_barHeight}
          fill={color}
          onMouseOver={point.legend !== '' ? _hoverOn.bind(xValue, point) : undefined}
          onFocus={point.legend !== '' ? _hoverOn.bind(xValue, point) : undefined}
          role="img"
          aria-label={_getAriaLabel(point)}
          onBlur={_hoverOff}
          onMouseLeave={_hoverOff}
          className={classes.barWrapper}
          tabIndex={point.legend !== '' ? 0 : undefined}
        />
      );
    });
    return bars;
  }

  const _closeCallout = () => {
    setIsCalloutVisible(false);
  };

  const _getAriaLabel = (point: IChartDataPoint): string => {
    const legend = point.xAxisCalloutData || point.legend;
    const yValue =
      point.yAxisCalloutData ||
      (point.horizontalBarChartdata ? `${point.horizontalBarChartdata.x}/${point.horizontalBarChartdata.y}` : 0);
    return point.callOutAccessibilityData?.ariaLabel || (legend ? `${legend}, ` : '') + `${yValue}.`;
  };

  function _isChartEmpty(): boolean {
    return !(props.data && props.data.length > 0);
  }

  React.useEffect(() => {
    const svgWidth = barChartSvgRef?.current?.getBoundingClientRect().width || 0;
    const MARGIN_WIDTH_IN_PX = 3;
    if (svgWidth) {
      const currentBarSpacing = (MARGIN_WIDTH_IN_PX / svgWidth) * 100;
      setBarSpacingInPercent(currentBarSpacing);
    }
  }, []);

  const { data } = props;
  _adjustProps();
  const classes = useHorizontalBarChartStyles_unstable(props);
  const focusAttributes = useFocusableGroup();

  let datapoint: number | undefined = 0;
  return !_isChartEmpty() ? (
    <div className={classes.root} onMouseLeave={_handleChartMouseLeave}>
      {data!.map((points: IChartProps, index: number) => {
        if (points.chartData && points.chartData![0] && points.chartData![0].horizontalBarChartdata!.x) {
          datapoint = points.chartData![0].horizontalBarChartdata!.x;
        } else {
          datapoint = 0;
        }
        points.chartData![1] = {
          legend: '',
          horizontalBarChartdata: {
            x: points.chartData![0].horizontalBarChartdata!.y - datapoint!,
            y: points.chartData![0].horizontalBarChartdata!.y,
          },
          color: tokens.colorBackgroundOverlay,
        };

        // Hide right side text of chart title for absolute-scale variant
        const chartDataText =
          props.variant === HorizontalBarChartVariant.AbsoluteScale ? null : _getChartDataText(points!);
        const bars = _createBars(points!);
        const keyVal = _uniqLineText + '_' + index;
        // ToDo - Showtriangle property is per data series. How to account for it in the new stylesheet
        /*         const classes = useHorizontalBarChartStyles_unstable(props.styles!, {
          width: props.width,
          showTriangle: !!points!.chartData![0].data,
          variant: props.variant,
        }); */

        return (
          <div key={index}>
            <div className={classes.items} {...focusAttributes}>
              <div className={classes.chartTitle}>
                {points!.chartTitle && ( // ToDo - Update Focusable tooltip text to use v9 controls.
                  <div
                    className={classes.chartTitleLeft}
                    {...getAccessibleDataObject(points!.chartTitleAccessibilityData)}
                  >
                    {points!.chartTitle}
                  </div>
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
    </div>
  ) : (
    <div id={_emptyChartId} role={'alert'} style={{ opacity: '0' }} aria-label={'Graph has no data to display'} />
  );
});
HorizontalBarChart.displayName = 'HorizontalBarChart';
