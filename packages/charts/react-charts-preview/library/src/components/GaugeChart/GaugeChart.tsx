import * as React from 'react';
import { useGaugeChartStyles_unstable } from './useGaugeChartStyles.styles';
import { select as d3Select } from 'd3-selection';
import { arc as d3Arc } from 'd3-shape';
import { YValueHover } from '../../index';
import {
  Points,
  areArraysEqual,
  formatValueWithSIPrefix,
  getAccessibleDataObject,
  getColorFromToken,
  getNextColor,
  pointTypes,
  useRtl,
} from '../../utilities/index';
import { useId } from '@fluentui/react-utilities';
import { convertToLocaleString } from '../../utilities/locale-util';
import { SVGTooltipText } from '../../utilities/SVGTooltipText';
import { Legend, LegendShape, Legends, Shape } from '../Legends/index';
import { GaugeChartVariant, GaugeValueFormat, GaugeChartProps, GaugeChartSegment } from './GaugeChart.types';
import { useFocusableGroup } from '@fluentui/react-tabster';

const GAUGE_MARGIN = 16;
const LABEL_WIDTH = 36;
const LABEL_HEIGHT = 16;
const LABEL_OFFSET = 4;
const TITLE_OFFSET = 11;
const EXTRA_NEEDLE_LENGTH = 4;
export const ARC_PADDING = 2;
export const BREAKPOINTS = [
  { minRadius: 52, arcWidth: 12, fontSize: 20 },
  { minRadius: 70, arcWidth: 16, fontSize: 24 },
  { minRadius: 88, arcWidth: 20, fontSize: 32 },
  { minRadius: 106, arcWidth: 24, fontSize: 32 },
  { minRadius: 124, arcWidth: 28, fontSize: 40 },
  { minRadius: 142, arcWidth: 32, fontSize: 40 },
];

export const calcNeedleRotation = (chartValue: number, minValue: number, maxValue: number) => {
  let needleRotation = ((chartValue - minValue) / (maxValue - minValue)) * 180;
  if (needleRotation < 0) {
    needleRotation = 0;
  } else if (needleRotation > 180) {
    needleRotation = 180;
  }

  return needleRotation;
};

export const getSegmentLabel = (
  segment: ExtendedSegment,
  minValue: number,
  maxValue: number,
  variant?: GaugeChartVariant,
  isAriaLabel: boolean = false,
) => {
  if (isAriaLabel) {
    return minValue === 0 && variant === GaugeChartVariant.SingleSegment
      ? `${segment.legend}, ${segment.size} out of ${maxValue} or ${((segment.size / maxValue) * 100).toFixed()}%`
      : `${segment.legend}, ${segment.start} to ${segment.end}`;
  }

  return minValue === 0 && variant === GaugeChartVariant.SingleSegment
    ? `${segment.size} (${((segment.size / maxValue) * 100).toFixed()}%)`
    : `${segment.start} - ${segment.end}`;
};

export const getChartValueLabel = (
  chartValue: number,
  minValue: number,
  maxValue: number,
  chartValueFormat?: GaugeValueFormat | ((sweepFraction: [number, number]) => string),
  forCallout: boolean = false,
): string => {
  if (forCallout) {
    // When displaying the chart value as a percentage, use fractions in the callout, and vice versa.
    // This helps clarify the actual value and avoid repetition.
    return minValue !== 0
      ? chartValue.toString()
      : chartValueFormat === GaugeValueFormat.Fraction
      ? `${((chartValue / maxValue) * 100).toFixed()}%`
      : `${chartValue}/${maxValue}`;
  }

  return typeof chartValueFormat === 'function'
    ? chartValueFormat([chartValue - minValue, maxValue - minValue])
    : minValue !== 0
    ? chartValue.toString()
    : chartValueFormat === GaugeValueFormat.Fraction
    ? `${chartValue}/${maxValue}`
    : `${((chartValue / maxValue) * 100).toFixed()}%`;
};

interface YValue extends Omit<YValueHover, 'y'> {
  y?: string | number;
}
export interface ExtendedSegment extends GaugeChartSegment {
  start: number;
  end: number;
}

export const GaugeChart: React.FunctionComponent<GaugeChartProps> = React.forwardRef<HTMLDivElement, GaugeChartProps>(
  (props, forwardedRef) => {
    const _getMargins = () => {
      const { hideMinMax, chartTitle, sublabel } = props;
      return {
        left: (!hideMinMax ? LABEL_OFFSET + LABEL_WIDTH : 0) + GAUGE_MARGIN,
        right: (!hideMinMax ? LABEL_OFFSET + LABEL_WIDTH : 0) + GAUGE_MARGIN,
        top: (chartTitle ? TITLE_OFFSET + LABEL_HEIGHT : EXTRA_NEEDLE_LENGTH / 2) + GAUGE_MARGIN,
        bottom: (sublabel ? LABEL_OFFSET + LABEL_HEIGHT : 0) + GAUGE_MARGIN,
      };
    };
    const _rootElem = React.useRef<HTMLDivElement | null>(null);
    const _margins: { left: number; right: number; top: number; bottom: number } = _getMargins();
    const _isRTL: boolean = useRtl();
    const _legendsHeight: number = !props.hideLegend ? 24 : 0;
    const [width, setWidth] = React.useState<number>(140 + _getMargins().left + _getMargins().right);
    const [height, setHeight] = React.useState<number>(70 + _getMargins().top + _getMargins().bottom + _legendsHeight);
    const _width = props.width || width;
    const _height = props.height || height;
    const _outerRadius: number = Math.min(
      (_width - (_margins.left + _margins.right)) / 2,
      _height - (_margins.top + _margins.bottom + _legendsHeight),
    );
    const { arcWidth } = _getStylesBasedOnBreakpoint();
    const _innerRadius: number = _outerRadius - arcWidth;
    let _minValue!: number;
    let _maxValue!: number;
    let _segments!: ExtendedSegment[];
    let _calloutAnchor: string = '';
    const _clipId: string = useId('Arc_clip');
    const [hoveredLegend, setHoveredLegend] = React.useState<string>('');
    const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
    const [focusedElement, setFocusedElement] = React.useState<string | undefined>('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [calloutTarget, setCalloutTarget] = React.useState<any>(null);
    const [isCalloutVisible, setIsCalloutVisible] = React.useState<boolean>(false);
    const [hoverXValue, setHoverXValue] = React.useState<string | number>('');
    const [hoverYValues, setHoverYValues] = React.useState<YValue[]>([]);

    React.useEffect(() => {
      if (_rootElem.current) {
        setWidth(_rootElem.current.clientWidth);
        setHeight(_rootElem.current.clientHeight);
      }
      if (!areArraysEqual(props.legendProps?.selectedLegends, selectedLegends)) {
        setSelectedLegends(props.legendProps?.selectedLegends || []);
      }
    }, [props.legendProps?.selectedLegends, selectedLegends]);

    const classes = useGaugeChartStyles_unstable(props);
    //const chartContainer = (): HTMLElement | null => {
    //return _rootElem;
    //};

    function _getStylesBasedOnBreakpoint() {
      for (let index = BREAKPOINTS.length - 1; index >= 0; index -= 1) {
        if (_outerRadius >= BREAKPOINTS[index].minRadius) {
          return {
            arcWidth: BREAKPOINTS[index].arcWidth,
            chartValueSize: BREAKPOINTS[index].fontSize,
          };
        }
      }
      return {
        arcWidth: BREAKPOINTS[0].arcWidth,
        chartValueSize: BREAKPOINTS[0].fontSize,
      };
    }

    function _processProps() {
      const { minValue = 0, maxValue, segments, roundCorners } = props;

      let total = minValue;
      const processedSegments: ExtendedSegment[] = segments.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (segment: { size: number; legend: any; color: string; accessibilityData: any }, index: number) => {
          const size = Math.max(segment.size, 0);
          total += size;
          return {
            legend: segment.legend,
            size,
            color:
              typeof segment.color !== 'undefined'
                ? getColorFromToken(segment.color, false)
                : getNextColor(index, 0, false),
            accessibilityData: segment.accessibilityData,
            start: total - size,
            end: total,
          };
        },
      );
      if (typeof maxValue !== 'undefined' && total < maxValue) {
        processedSegments.push({
          legend: 'Unknown',
          size: maxValue - total,
          color: 'neutralLight',
          start: total,
          end: maxValue,
        });
        total = maxValue;
      }

      const arcGenerator = d3Arc()
        .cornerRadius(roundCorners ? 3 : 0)
        .padAngle(ARC_PADDING / _outerRadius)
        .padRadius(_outerRadius);
      const rtlSafeSegments = _isRTL ? Array.from(processedSegments).reverse() : processedSegments;
      let prevAngle = -Math.PI / 2;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const arcs = rtlSafeSegments.map((segment, index) => {
        const endAngle = prevAngle + (segment.size / (total - minValue)) * Math.PI;
        const d = arcGenerator({
          innerRadius: _innerRadius,
          outerRadius: _outerRadius,
          startAngle: prevAngle,
          endAngle,
        })!;
        prevAngle = endAngle;
        return {
          d,
          segmentIndex: _isRTL ? processedSegments.length - 1 - index : index,
          startAngle: prevAngle - (segment.size / (total - minValue)) * Math.PI,
          endAngle,
        };
      });

      _minValue = minValue;
      _maxValue = total;
      _segments = processedSegments;

      return {
        arcs,
      };
    }

    function _renderNeedle() {
      const needleRotation = calcNeedleRotation(props.chartValue, _minValue, _maxValue);
      const rtlSafeNeedleRotation = _isRTL ? 180 - needleRotation : needleRotation;
      const strokeWidth = 2;
      const halfStrokeWidth = strokeWidth / 2;
      const needleLength = _outerRadius - _innerRadius + EXTRA_NEEDLE_LENGTH;

      return (
        <g transform={`rotate(${rtlSafeNeedleRotation}, 0, 0)`}>
          <path
            d={`
            M 0,${-halfStrokeWidth - 3}
            L ${-needleLength},${-halfStrokeWidth - 1}
            A ${halfStrokeWidth + 1},${halfStrokeWidth + 1},0,0,0,${-needleLength},${halfStrokeWidth + 1}
            L 0,${halfStrokeWidth + 3}
            A ${halfStrokeWidth + 3},${halfStrokeWidth + 3},0,0,0,0,${-halfStrokeWidth - 3}
          `}
            strokeWidth={strokeWidth}
            className={classes.needle}
            transform={`translate(${-_innerRadius + EXTRA_NEEDLE_LENGTH / 2})`}
            data-is-focusable={true}
            onFocus={e => _handleFocus(e, 'Needle')}
            onBlur={_handleBlur}
            onMouseEnter={e => _handleMouseOver(e, 'Needle')}
            onMouseMove={e => _handleMouseOver(e, 'Needle')}
            role="img"
            aria-label={
              'Current value: ' + getChartValueLabel(props.chartValue, _minValue, _maxValue, props.chartValueFormat)
            }
          />
        </g>
      );
    }

    function _renderLegends() {
      if (props.hideLegend) {
        return null;
      }

      const legends: Legend[] = _segments.map((segment, index) => {
        const color: string = segment.color || getNextColor(index, 0, false);

        return {
          title: segment.legend,
          color,
          hoverAction: () => {
            setHoveredLegend(segment.legend);
          },
          onMouseOutAction: () => {
            setHoveredLegend('');
          },
        };
      });

      return (
        <div className={classes.legendsContainer}>
          <Legends
            legends={legends}
            centerLegends
            {...props.legendProps}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={_onLegendSelectionChange}
          />
        </div>
      );
    }

    function _onLegendSelectionChange(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      selectedLegends: string[],
      event: React.MouseEvent<HTMLButtonElement>,
      currentLegend?: Legend,
    ): void {
      if (props.legendProps?.canSelectMultipleLegends) {
        setSelectedLegends(selectedLegends);
      } else {
        setSelectedLegends(selectedLegends.slice(-1));
      }
      if (props.legendProps?.onChange) {
        props.legendProps.onChange(selectedLegends, event, currentLegend);
      }
    }

    /**
     * This function checks if the given legend is highlighted or not.
     * A legend can be highlighted in 2 ways:
     * 1. selection: if the user clicks on it
     * 2. hovering: if there is no selected legend and the user hovers over it
     */
    function _legendHighlighted(legend: string) {
      return _getHighlightedLegend().includes(legend!);
    }

    /**
     * This function checks if none of the legends is selected or hovered.
     */
    function _noLegendHighlighted() {
      return _getHighlightedLegend().length === 0;
    }

    function _getHighlightedLegend() {
      return selectedLegends.length > 0 ? selectedLegends : hoveredLegend ? [hoveredLegend] : [];
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    function _handleFocus(focusEvent: React.FocusEvent<SVGElement>, focusedElement: string) {
      _showCallout(focusEvent.target, focusedElement, true);
    }

    function _handleBlur() {
      _hideCallout(true);
    }

    function _handleMouseOver(mouseEvent: React.MouseEvent<SVGElement>, hoveredElement: string) {
      _showCallout(mouseEvent.target, hoveredElement, false);
    }

    function _handleMouseOut() {
      _hideCallout(false);
    }

    function _handleCalloutDismiss() {
      _hideCallout(false);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function _showCallout(target: any, legend: string, isFocusEvent: boolean) {
      if (_calloutAnchor === legend) {
        return;
      }
      _calloutAnchor = legend;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const hoverXValue: string =
        'Current value is ' + getChartValueLabel(props.chartValue, _minValue, _maxValue, props.chartValueFormat, true);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const hoverYValues: YValue[] = _segments.map(segment => {
        const yValue: YValue = {
          legend: segment.legend,
          y: getSegmentLabel(segment, _minValue, _maxValue, props.variant),
          color: props.enableGradient ? segment.gradient?.[0] : segment.color,
        };
        return yValue;
      });
      setCalloutTarget(target);
      setIsCalloutVisible(
        ['Needle', 'Chart value'].includes(legend) || _noLegendHighlighted() || _legendHighlighted(legend),
      );
      setHoverXValue(hoverXValue);
      setHoverYValues(hoverYValues);
      if (isFocusEvent) {
        setFocusedElement(legend);
      }
    }

    function _hideCallout(isBlurEvent?: boolean) {
      _calloutAnchor = '';
      setCalloutTarget(null);
      setIsCalloutVisible(false);
      setHoverXValue('');
      setHoverYValues([]);
      if (isBlurEvent) {
        setFocusedElement('');
      }
    }

    function _wrapContent(content: string, id: string, maxWidth: number) {
      const textElement = d3Select<SVGTextElement, {}>(`#${id}`);
      textElement.text(content);
      if (!textElement.node()) {
        return false;
      }

      let isOverflowing = false;
      let textLength = textElement.node()!.getComputedTextLength();
      while (textLength > maxWidth && content.length > 0) {
        content = content.slice(0, -1);
        textElement.text(content + '...');
        isOverflowing = true;
        textLength = textElement.node()!.getComputedTextLength();
      }
      return isOverflowing;
    }

    // TO DO: Write a common functional component for Multi value callout and divide sub count method
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function _multiValueCallout(calloutProps: any, classNames: any, culture: string) {
      const yValueHoverSubCountsExists: boolean = _yValueHoverSubCountsExists(calloutProps.YValueHover);
      return (
        <div className={classNames.calloutContentRoot}>
          <div
            className={classNames.calloutDateTimeContainer}
            style={yValueHoverSubCountsExists ? { marginBottom: '11px' } : {}}
          >
            <div
              className={classNames.calloutContentX}
              {...getAccessibleDataObject(calloutProps!.xAxisCalloutAccessibilityData, 'text', false)}
            >
              {convertToLocaleString(calloutProps!.hoverXValue, culture)}
            </div>
          </div>
          <div
            className={classNames.calloutInfoContainer}
            style={yValueHoverSubCountsExists ? { display: 'flex' } : {}}
          >
            {calloutProps!.YValueHover &&
              calloutProps!.YValueHover.map((yValue: YValueHover, index: number, yValues: YValueHover[]) => {
                const isLast: boolean = index + 1 === yValues.length;
                const { shouldDrawBorderBottom = false } = yValue;
                return (
                  <div
                    {...getAccessibleDataObject(yValue.callOutAccessibilityData, 'text', false)}
                    key={`callout-content-${index}`}
                    style={
                      yValueHoverSubCountsExists
                        ? {
                            display: 'inline-block',
                            ...(shouldDrawBorderBottom && {
                              borderBottom: `1px solid ${classNames.semanticColors.menuDivider}`,
                              paddingBottom: '10px',
                            }),
                          }
                        : {
                            ...(shouldDrawBorderBottom && {
                              borderBottom: `1px solid ${classNames.semanticColors.menuDivider}`,
                              paddingBottom: '10px',
                            }),
                          }
                    }
                  >
                    {_getCalloutContent(yValue, index, yValueHoverSubCountsExists, isLast)}
                  </div>
                );
              })}
            {!!calloutProps.descriptionMessage && (
              <div className={classNames.descriptionMessage}>{calloutProps.descriptionMessage}</div>
            )}
          </div>
        </div>
      );
    }

    function _yValueHoverSubCountsExists(yValueHover?: YValueHover[]) {
      if (yValueHover) {
        return yValueHover.some(
          (yValue: {
            legend?: string;
            y?: number;
            color?: string;
            yAxisCalloutData?: string | { [id: string]: number };
          }) => yValue.yAxisCalloutData && typeof yValue.yAxisCalloutData !== 'string',
        );
      }
      return false;
    }

    function _getCalloutContent(
      xValue: YValueHover,
      index: number,
      yValueHoverSubCountsExists: boolean,
      isLast: boolean,
    ): React.ReactNode {
      const marginStyle: React.CSSProperties = isLast ? {} : { marginRight: '16px' };
      const toDrawShape = xValue.index !== undefined && xValue.index !== -1;
      const { culture } = props;
      const yValue = convertToLocaleString(xValue.y, culture);
      if (!xValue.yAxisCalloutData || typeof xValue.yAxisCalloutData === 'string') {
        return (
          <div style={yValueHoverSubCountsExists ? marginStyle : {}}>
            {yValueHoverSubCountsExists && (
              <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
                {xValue.legend!} ({yValue})
              </div>
            )}
            <div id={`${index}_${xValue.y}`} className={classes.calloutBlockContainer}>
              {toDrawShape && (
                <Shape
                  svgProps={{
                    className: classes.shapeStyles,
                  }}
                  pathProps={{ fill: xValue.color }}
                  shape={Points[xValue.index! % Object.keys(pointTypes).length] as LegendShape}
                />
              )}
              <div>
                <div className={classes.calloutlegendText}> {xValue.legend}</div>
                <div className={classes.calloutContentY}>
                  {convertToLocaleString(
                    xValue.yAxisCalloutData ? xValue.yAxisCalloutData : xValue.y || xValue.data,
                    culture,
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        const subcounts: { [id: string]: number } = xValue.yAxisCalloutData as { [id: string]: number };
        return (
          <div style={marginStyle}>
            <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
              {xValue.legend!} ({yValue})
            </div>
            {Object.keys(subcounts).map((subcountName: string) => {
              return (
                <div key={subcountName} className={classes.calloutBlockContainer}>
                  <div className={classes.calloutlegendText}> {convertToLocaleString(subcountName, culture)}</div>
                  <div className={classes.calloutContentY}>
                    {convertToLocaleString(subcounts[subcountName], culture)}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    }

    function _getChartTitle(): string {
      const { chartTitle } = props;
      return (chartTitle ? `${chartTitle}. ` : '') + `Gauge chart with ${_segments.length} segments. `;
    }
    const { arcs } = _processProps();
    const focusAttributes = useFocusableGroup();
    return (
      <div className={classes.root} ref={el => (_rootElem.current = el)} {...focusAttributes}>
        <svg className={classes.chart} role="region" aria-label={_getChartTitle()} onMouseLeave={_handleMouseOut}>
          <g transform={`translate(${width / 2}, ${height - (_margins.bottom + _legendsHeight)})`}>
            {props.chartTitle && (
              <text
                x={0}
                y={-(_outerRadius + TITLE_OFFSET)}
                textAnchor="middle"
                className={classes.chartTitle}
                aria-hidden={true}
              >
                {props.chartTitle}
              </text>
            )}
            {!props.hideMinMax && (
              <>
                <text
                  x={(_isRTL ? 1 : -1) * (_outerRadius + LABEL_OFFSET)}
                  y={0}
                  textAnchor="end"
                  className={classes.limits}
                  role="img"
                  aria-label={`Min value: ${_minValue}`}
                >
                  {formatValueWithSIPrefix(_minValue)}
                </text>
                <text
                  x={(_isRTL ? -1 : 1) * (_outerRadius + LABEL_OFFSET)}
                  y={0}
                  textAnchor="start"
                  className={classes.limits}
                  role="img"
                  aria-label={`Max value: ${_maxValue}`}
                >
                  {formatValueWithSIPrefix(_maxValue)}
                </text>
              </>
            )}
            {arcs.map((arc, index) => {
              const segment = _segments[arc.segmentIndex];

              const clipId = _clipId + `${index}_${arc.startAngle}_${arc.endAngle}`;

              /*const arcClassNames = getClassNames(props.styles!, {
                theme: props.theme!,
                solidFill: props.enableGradient ? 'transparent' : segment.color!,
                gradientFill: `conic-gradient(
                  from ${arc.startAngle}rad at 50% 100%,
                  ${segment.gradient?.[0]},
                  ${segment.gradient?.[1]} ${arc.endAngle - arc.startAngle}rad
                )`,
                opacity: _legendHighlighted(segment.legend) || _noLegendHighlighted() ? 1 : 0.1,
              });*/

              return (
                <React.Fragment key={index}>
                  <path
                    d={arc.d}
                    strokeWidth={focusedElement === segment.legend ? ARC_PADDING : 0}
                    className={classes.segment}
                    {...getAccessibleDataObject(
                      {
                        ariaLabel: getSegmentLabel(segment, _minValue, _maxValue, props.variant, true),
                        ...segment.accessibilityData,
                      },
                      'img',
                      true,
                    )}
                    onFocus={e => _handleFocus(e, segment.legend)}
                    onBlur={_handleBlur}
                    onMouseEnter={e => _handleMouseOver(e, segment.legend)}
                    onMouseMove={e => _handleMouseOver(e, segment.legend)}
                    data-is-focusable={_legendHighlighted(segment.legend) || _noLegendHighlighted()}
                  />

                  {props.enableGradient && (
                    <>
                      <clipPath id={clipId}>
                        <path d={arc.d} />
                      </clipPath>
                      <foreignObject x="-50%" y="-100%" width="100%" height="100%" clipPath={`url(#${clipId})`}>
                        <div className={classes.gradientSegment} />
                      </foreignObject>
                    </>
                  )}
                </React.Fragment>
              );
            })}
            {_renderNeedle()}
            <g
              onMouseEnter={e => _handleMouseOver(e, 'Chart value')}
              onMouseMove={e => _handleMouseOver(e, 'Chart value')}
            >
              <SVGTooltipText
                content={getChartValueLabel(props.chartValue, _minValue, _maxValue, props.chartValueFormat)}
                textProps={{
                  x: 0,
                  y: 0,
                  textAnchor: 'middle',
                  className: classes.chartValue,
                  'aria-hidden': 'true',
                }}
                maxWidth={_innerRadius * 2 - 24}
                wrapContent={_wrapContent}
              />
            </g>
            {props.sublabel && (
              <SVGTooltipText
                content={props.sublabel}
                textProps={{
                  x: 0,
                  y: 4,
                  textAnchor: 'middle',
                  dominantBaseline: 'hanging',
                  className: classes.sublabel,
                }}
                maxWidth={_innerRadius * 2}
                wrapContent={_wrapContent}
              />
            )}
          </g>
        </svg>
        {_renderLegends()}
        {!props.hideTooltip && isCalloutVisible && (
          <Callout
            target={calloutTarget}
            gapSpace={15}
            isBeakVisible={false}
            onDismiss={_handleCalloutDismiss}
            {...props.calloutProps}
          >
            {_multiValueCallout({
              hoverXValue: hoverXValue,
              YValueHover: hoverYValues,
            })}
          </Callout>
        )}
      </div>
    );
  },
);
GaugeChart.displayName = 'GaugeChart';
