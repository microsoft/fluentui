import * as React from 'react';
import { useGaugeChartStyles } from './useGaugeChartStyles.styles';
import { select as d3Select } from 'd3-selection';
import { arc as d3Arc } from 'd3-shape';
import { YValueHover } from '../../index';
import {
  Points,
  areArraysEqual,
  formatScientificLimitWidth,
  getAccessibleDataObject,
  getColorFromToken,
  getNextColor,
  pointTypes,
  useRtl,
} from '../../utilities/index';
import { formatToLocaleString } from '@fluentui/chart-utilities';
import { SVGTooltipText } from '../../utilities/SVGTooltipText';
import { Legend, LegendShape, Legends, Shape, LegendContainer } from '../Legends/index';
import { GaugeChartVariant, GaugeValueFormat, GaugeChartProps, GaugeChartSegment } from './GaugeChart.types';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { ChartPopover } from '../CommonComponents/ChartPopover';
import { ImageExportOptions } from '../../types/index';
import { toImage } from '../../utilities/image-export-utils';

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

export const calcNeedleRotation = (chartValue: number, minValue: number, maxValue: number): number => {
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
): string => {
  if (isAriaLabel) {
    return minValue === 0 && variant === 'single-segment'
      ? `${segment.legend}, ${segment.size} out of ${maxValue} or ${((segment.size / maxValue) * 100).toFixed()}%`
      : `${segment.legend}, ${segment.start} to ${segment.end}`;
  }

  return minValue === 0 && variant === 'single-segment'
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
      : chartValueFormat === 'fraction'
      ? `${((chartValue / maxValue) * 100).toFixed()}%`
      : `${chartValue}/${maxValue}`;
  }

  return typeof chartValueFormat === 'function'
    ? chartValueFormat([chartValue - minValue, maxValue - minValue])
    : minValue !== 0
    ? chartValue.toString()
    : chartValueFormat === 'fraction'
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
    const _legendsRef = React.useRef<LegendContainer>(null);
    const _getMargins = () => {
      const { hideMinMax, chartTitle, sublabel } = props;
      return {
        left: (!hideMinMax ? LABEL_OFFSET + LABEL_WIDTH : 0) + GAUGE_MARGIN,
        right: (!hideMinMax ? LABEL_OFFSET + LABEL_WIDTH : 0) + GAUGE_MARGIN,
        top: (chartTitle ? TITLE_OFFSET + LABEL_HEIGHT : EXTRA_NEEDLE_LENGTH / 2) + GAUGE_MARGIN,
        bottom: (sublabel ? LABEL_OFFSET + LABEL_HEIGHT : 0) + GAUGE_MARGIN,
      };
    };
    const _margins: { left: number; right: number; top: number; bottom: number } = _getMargins();
    const _legendsHeight: number = !props.hideLegend ? 32 : 0;
    const _rootElem = React.useRef<HTMLDivElement | null>(null);
    const _isRTL: boolean = useRtl();
    const [width, setWidth] = React.useState<number>(140 + _getMargins().left + _getMargins().right);
    const [height, setHeight] = React.useState<number>(70 + _getMargins().top + _getMargins().bottom + _legendsHeight);
    const [hoveredLegend, setHoveredLegend] = React.useState<string>('');
    const [selectedLegends, setSelectedLegends] = React.useState<string[]>(props.legendProps?.selectedLegends || []);
    const [focusedElement, setFocusedElement] = React.useState<string | undefined>('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [clickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });
    const [isPopoverOpen, setPopoverOpen] = React.useState(false);
    const [hoverXValue, setHoverXValue] = React.useState<string | number>('');
    const [hoverYValues, setHoverYValues] = React.useState<YValue[]>([]);
    const prevPropsRef = React.useRef<GaugeChartProps | null>(null);
    const _width = props.width || width;
    const _height = props.height || height;
    const _outerRadius: number = Math.min(
      (_width - (_margins.left + _margins.right)) / 2,
      _height - (_margins.top + _margins.bottom + _legendsHeight),
    );
    const { arcWidth, chartValueSize } = _getStylesBasedOnBreakpoint();
    const _innerRadius: number = _outerRadius - arcWidth;
    let _minValue!: number;
    let _maxValue!: number;
    let _segments!: ExtendedSegment[];
    let _calloutAnchor: string = '';

    React.useEffect(() => {
      if (_rootElem.current) {
        setWidth(_rootElem.current.clientWidth);
        setHeight(_rootElem.current.clientHeight);
      }
    }, []);

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
        chartContainer: _rootElem.current,
        toImage: (opts?: ImageExportOptions): Promise<string> => {
          return toImage(_rootElem.current, _legendsRef.current?.toSVG, _isRTL, opts);
        },
      }),
      [],
    );

    const classes = useGaugeChartStyles(props);
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
            legendRef={_legendsRef}
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
      _showCallout(focusEvent, focusedElement, true);
    }

    function _handleBlur() {
      _hideCallout(true);
    }

    function _handleMouseOver(mouseEvent: React.MouseEvent<SVGElement>, hoveredElement: string) {
      _showCallout(mouseEvent, hoveredElement, false);
    }

    function _handleMouseOut() {
      _hideCallout(false);
    }

    function _handleCalloutDismiss() {
      _hideCallout(false);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function _showCallout(
      event: React.MouseEvent<SVGElement, MouseEvent> | React.FocusEvent<SVGElement, Element>,
      legend: string,
      isFocusEvent: boolean,
    ) {
      if (_calloutAnchor === legend) {
        return;
      }
      let clientX = 0;
      let clientY = 0;
      if ('clientX' in event) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const target = event.currentTarget as HTMLElement | SVGElement;
        if (target && 'getBoundingClientRect' in target) {
          const boundingRect = target.getBoundingClientRect();
          clientX = boundingRect.left + boundingRect.width / 2;
          clientY = boundingRect.top + boundingRect.height / 2;
        }
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
          color: segment.color,
        };
        return yValue;
      });
      _updatePosition(clientX, clientY);
      setPopoverOpen(
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
      setPopoverOpen(false);
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
    function _multiValueCallout(calloutProps: any) {
      const yValueHoverSubCountsExists: boolean = _yValueHoverSubCountsExists(calloutProps.YValueHover);
      return (
        <div className={classes.calloutContentRoot}>
          <div
            className={classes.calloutDateTimeContainer}
            style={yValueHoverSubCountsExists ? { marginBottom: '11px' } : {}}
          >
            <div
              className={classes.calloutContentX}
              {...getAccessibleDataObject(calloutProps!.xAxisCalloutAccessibilityData, 'text', false)}
            >
              {formatToLocaleString(calloutProps!.hoverXValue, props.culture) as React.ReactNode}
            </div>
          </div>
          <div className={classes.calloutInfoContainer} style={yValueHoverSubCountsExists ? { display: 'flex' } : {}}>
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
                              paddingBottom: '10px',
                            }),
                          }
                        : {
                            ...(shouldDrawBorderBottom && {
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
              <div className={classes.descriptionMessage}>{calloutProps.descriptionMessage}</div>
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
      const yValue = formatToLocaleString(xValue.y, culture) as React.ReactNode;
      if (!xValue.yAxisCalloutData || typeof xValue.yAxisCalloutData === 'string') {
        return (
          <div style={yValueHoverSubCountsExists ? marginStyle : {}}>
            {yValueHoverSubCountsExists && (
              <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
                {xValue.legend!} ({yValue})
              </div>
            )}
            <div
              id={`${index}_${xValue.y}`}
              className={classes.calloutBlockContainer}
              style={{ borderInlineStart: `4px solid ${xValue.color}` }}
            >
              {toDrawShape && (
                <Shape
                  svgProps={{
                    className: classes.shapeStyles,
                  }}
                  pathProps={{ fill: xValue.color }}
                  shape={Points[xValue.index! % Object.keys(pointTypes).length] as LegendShape}
                  style={{ display: 'flex' }}
                />
              )}
              <div>
                <div className={classes.calloutlegendText}> {xValue.legend}</div>
                <div className={classes.calloutContentY}>
                  {
                    formatToLocaleString(
                      xValue.yAxisCalloutData ? xValue.yAxisCalloutData : xValue.y || xValue.data,
                      culture,
                    ) as React.ReactNode
                  }
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
                  <div className={classes.calloutlegendText}>
                    {' '}
                    {formatToLocaleString(subcountName, culture) as React.ReactNode}
                  </div>
                  <div className={classes.calloutContentY}>
                    {formatToLocaleString(subcounts[subcountName], culture) as React.ReactNode}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    }

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

    function _getChartTitle(): string {
      const { chartTitle } = props;
      return (chartTitle ? `${chartTitle}. ` : '') + `Gauge chart with ${_segments.length} segments. `;
    }
    const { arcs } = _processProps();
    const focusAttributes = useFocusableGroup();
    return (
      <div className={classes.root} ref={el => (_rootElem.current = el)}>
        <div className={classes.chartWrapper} {...focusAttributes}>
          <svg
            className={classes.chart}
            width={_width}
            height={_height - _legendsHeight}
            role="region"
            aria-label={_getChartTitle()}
            onMouseLeave={_handleMouseOut}
          >
            <g transform={`translate(${_width / 2}, ${_height - (_margins.bottom + _legendsHeight)})`}>
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
                    {formatScientificLimitWidth(_minValue)}
                  </text>
                  <text
                    x={(_isRTL ? -1 : 1) * (_outerRadius + LABEL_OFFSET)}
                    y={0}
                    textAnchor="start"
                    className={classes.limits}
                    role="img"
                    aria-label={`Max value: ${_maxValue}`}
                  >
                    {formatScientificLimitWidth(_maxValue)}
                  </text>
                </>
              )}
              {arcs.map((arc, index) => {
                const segment = _segments[arc.segmentIndex];
                return (
                  <React.Fragment key={index}>
                    <path
                      d={arc.d}
                      strokeWidth={focusedElement === segment.legend ? ARC_PADDING : 0}
                      className={classes.segment}
                      fill={segment.color}
                      opacity={_legendHighlighted(segment.legend) || _noLegendHighlighted() ? 1 : 0.1}
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
                      onMouseLeave={e => _handleCalloutDismiss()}
                      onMouseMove={e => _handleMouseOver(e, segment.legend)}
                      tabIndex={_legendHighlighted(segment.legend) || _noLegendHighlighted() ? 0 : undefined}
                    />
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
                    fontSize: chartValueSize,
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
        </div>
        {_renderLegends()}
        {!props.hideTooltip && isPopoverOpen && (
          <ChartPopover
            {...props.calloutProps}
            clickPosition={clickPosition}
            isPopoverOpen={isPopoverOpen}
            customCallout={{
              customizedCallout: _multiValueCallout({ hoverXValue: hoverXValue, YValueHover: hoverYValues }),
            }}
          />
        )}
      </div>
    );
  },
);
GaugeChart.displayName = 'GaugeChart';
