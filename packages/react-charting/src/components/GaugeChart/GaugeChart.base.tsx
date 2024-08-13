import * as React from 'react';
import { arc as d3Arc } from 'd3-shape';
import { classNamesFunction, getRTL } from '@fluentui/react/lib/Utilities';
import {
  IGaugeChartProps,
  IGaugeChartSegment,
  IGaugeChartStyleProps,
  IGaugeChartStyles,
  GaugeValueFormat,
  GaugeChartVariant,
} from './GaugeChart.types';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { convertToLocaleString } from '../../utilities/locale-util';
import {
  Points,
  formatValueWithSIPrefix,
  getAccessibleDataObject,
  getColorFromToken,
  getNextColor,
  pointTypes,
} from '../../utilities/index';
import { ILegend, LegendShape, Legends, Shape } from '../Legends/index';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { IYValueHover } from '../../index';
import { SVGTooltipText } from '../../utilities/SVGTooltipText';
import { select as d3Select } from 'd3-selection';

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

const getClassNames = classNamesFunction<IGaugeChartStyleProps, IGaugeChartStyles>();

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
  segment: IExtendedSegment,
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

interface IYValue extends Omit<IYValueHover, 'y'> {
  y?: string | number;
}
export interface IGaugeChartState {
  hoveredLegend: string;
  selectedLegend: string;
  focusedElement?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calloutTarget: any;
  isCalloutVisible: boolean;
  hoverXValue: string | number;
  hoverYValues: IYValue[];
  width: number;
  height: number;
}
export interface IExtendedSegment extends IGaugeChartSegment {
  start: number;
  end: number;
}

export class GaugeChartBase extends React.Component<IGaugeChartProps, IGaugeChartState> {
  private _classNames: IProcessedStyleSet<IGaugeChartStyles>;
  private _isRTL: boolean;
  private _innerRadius: number;
  private _outerRadius: number;
  private _minValue: number;
  private _maxValue: number;
  private _segments: IExtendedSegment[];
  private _calloutAnchor: string;
  private _rootElem: HTMLDivElement | null;
  private _margins: { left: number; right: number; top: number; bottom: number };
  private _legendsHeight: number;

  constructor(props: IGaugeChartProps) {
    super(props);

    this._margins = this._getMargins();
    this._legendsHeight = !props.hideLegend ? 24 : 0;

    this.state = {
      hoveredLegend: '',
      selectedLegend: '',
      focusedElement: '',
      calloutTarget: null,
      isCalloutVisible: false,
      hoverXValue: '',
      hoverYValues: [],
      width: 140 + this._margins.left + this._margins.right,
      height: 70 + this._margins.top + this._margins.bottom + this._legendsHeight,
    };

    this._isRTL = getRTL(props.theme);
    this._calloutAnchor = '';
  }

  public componentDidMount(): void {
    if (this._rootElem) {
      this.setState({
        width: this._rootElem.clientWidth,
        height: this._rootElem.clientHeight,
      });
    }
  }

  public render(): React.ReactNode {
    this._margins = this._getMargins();
    this._legendsHeight = !this.props.hideLegend ? 24 : 0;

    const width = this.props.width || this.state.width;
    const height = this.props.height || this.state.height;

    this._outerRadius = Math.min(
      (width - (this._margins.left + this._margins.right)) / 2,
      height - (this._margins.top + this._margins.bottom + this._legendsHeight),
    );

    const { arcWidth, chartValueSize } = this._getStylesBasedOnBreakpoint();
    this._innerRadius = this._outerRadius - arcWidth;

    const { arcs } = this._processProps();

    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      className: this.props.className,
      chartWidth: width,
      chartHeight: height - this._legendsHeight,
      chartValueSize,
    });

    return (
      <div className={this._classNames.root} ref={el => (this._rootElem = el)}>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <svg
            className={this._classNames.chart}
            role="region"
            aria-label={this._getChartTitle()}
            onMouseLeave={this._handleMouseOut}
          >
            <g transform={`translate(${width / 2}, ${height - (this._margins.bottom + this._legendsHeight)})`}>
              {this.props.chartTitle && (
                <text
                  x={0}
                  y={-(this._outerRadius + TITLE_OFFSET)}
                  textAnchor="middle"
                  className={this._classNames.chartTitle}
                  aria-hidden={true}
                >
                  {this.props.chartTitle}
                </text>
              )}
              {!this.props.hideMinMax && (
                <>
                  <text
                    x={(this._isRTL ? 1 : -1) * (this._outerRadius + LABEL_OFFSET)}
                    y={0}
                    textAnchor="end"
                    className={this._classNames.limits}
                    role="img"
                    aria-label={`Min value: ${this._minValue}`}
                  >
                    {formatValueWithSIPrefix(this._minValue)}
                  </text>
                  <text
                    x={(this._isRTL ? -1 : 1) * (this._outerRadius + LABEL_OFFSET)}
                    y={0}
                    textAnchor="start"
                    className={this._classNames.limits}
                    role="img"
                    aria-label={`Max value: ${this._maxValue}`}
                  >
                    {formatValueWithSIPrefix(this._maxValue)}
                  </text>
                </>
              )}
              {arcs.map((arc, index) => {
                const segment = this._segments[arc.segmentIndex];

                return (
                  <path
                    key={index}
                    d={arc.d}
                    fill={segment.color}
                    fillOpacity={this._legendHighlighted(segment.legend) || this._noLegendHighlighted() ? 1 : 0.1}
                    strokeWidth={this.state.focusedElement === segment.legend ? ARC_PADDING : 0}
                    className={this._classNames.segment}
                    {...getAccessibleDataObject(
                      {
                        ariaLabel: getSegmentLabel(segment, this._minValue, this._maxValue, this.props.variant, true),
                        ...segment.accessibilityData,
                      },
                      'img',
                      true,
                    )}
                    onFocus={e => this._handleFocus(e, segment.legend)}
                    onBlur={this._handleBlur}
                    onMouseEnter={e => this._handleMouseOver(e, segment.legend)}
                    onMouseMove={e => this._handleMouseOver(e, segment.legend)}
                    data-is-focusable={this._legendHighlighted(segment.legend) || this._noLegendHighlighted()}
                  />
                );
              })}
              {this._renderNeedle()}
              <g
                onMouseEnter={e => this._handleMouseOver(e, 'Chart value')}
                onMouseMove={e => this._handleMouseOver(e, 'Chart value')}
              >
                <SVGTooltipText
                  content={getChartValueLabel(
                    this.props.chartValue,
                    this._minValue,
                    this._maxValue,
                    this.props.chartValueFormat,
                  )}
                  textProps={{
                    x: 0,
                    y: 0,
                    textAnchor: 'middle',
                    className: this._classNames.chartValue,
                    'aria-hidden': 'true',
                  }}
                  maxWidth={this._innerRadius * 2 - 24}
                  wrapContent={this._wrapContent}
                />
              </g>
              {this.props.sublabel && (
                <SVGTooltipText
                  content={this.props.sublabel}
                  textProps={{
                    x: 0,
                    y: 4,
                    textAnchor: 'middle',
                    dominantBaseline: 'hanging',
                    className: this._classNames.sublabel,
                  }}
                  maxWidth={this._innerRadius * 2}
                  wrapContent={this._wrapContent}
                />
              )}
            </g>
          </svg>
        </FocusZone>
        {this._renderLegends()}
        {!this.props.hideTooltip && this.state.isCalloutVisible && (
          <Callout
            target={this.state.calloutTarget}
            directionalHint={DirectionalHint.topAutoEdge}
            gapSpace={15}
            isBeakVisible={false}
            onDismiss={this._handleCalloutDismiss}
            {...this.props.calloutProps}
          >
            {this._multiValueCallout({
              hoverXValue: this.state.hoverXValue,
              YValueHover: this.state.hoverYValues,
            })}
          </Callout>
        )}
      </div>
    );
  }

  private _getMargins = () => {
    const { hideMinMax, chartTitle, sublabel } = this.props;

    return {
      left: (!hideMinMax ? LABEL_OFFSET + LABEL_WIDTH : 0) + GAUGE_MARGIN,
      right: (!hideMinMax ? LABEL_OFFSET + LABEL_WIDTH : 0) + GAUGE_MARGIN,
      top: (chartTitle ? TITLE_OFFSET + LABEL_HEIGHT : EXTRA_NEEDLE_LENGTH / 2) + GAUGE_MARGIN,
      bottom: (sublabel ? LABEL_OFFSET + LABEL_HEIGHT : 0) + GAUGE_MARGIN,
    };
  };

  private _getStylesBasedOnBreakpoint = () => {
    for (let index = BREAKPOINTS.length - 1; index >= 0; index -= 1) {
      if (this._outerRadius >= BREAKPOINTS[index].minRadius) {
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
  };

  private _processProps = () => {
    const { minValue = 0, maxValue, theme } = this.props;

    let total = minValue;
    const segments: IExtendedSegment[] = this.props.segments.map((segment, index) => {
      const size = Math.max(segment.size, 0);
      total += size;
      return {
        legend: segment.legend,
        size,
        color:
          typeof segment.color !== 'undefined'
            ? getColorFromToken(segment.color, theme!.isInverted)
            : getNextColor(index, 0, theme!.isInverted),
        accessibilityData: segment.accessibilityData,
        start: total - size,
        end: total,
      };
    });
    if (typeof maxValue !== 'undefined' && total < maxValue) {
      segments.push({
        legend: 'Unknown',
        size: maxValue - total,
        color: theme!.palette.neutralLight,
        start: total,
        end: maxValue,
      });
      total = maxValue;
    }

    const arcGenerator = d3Arc()
      .padAngle(ARC_PADDING / this._outerRadius)
      .padRadius(this._outerRadius);
    const rtlSafeSegments = this._isRTL ? Array.from(segments).reverse() : segments;
    let prevAngle = -Math.PI / 2;
    const arcs = rtlSafeSegments.map((segment, index) => {
      const endAngle = prevAngle + (segment.size / (total - minValue)) * Math.PI;
      const d = arcGenerator({
        innerRadius: this._innerRadius,
        outerRadius: this._outerRadius,
        startAngle: prevAngle,
        endAngle,
      })!;
      prevAngle = endAngle;
      return {
        d,
        segmentIndex: this._isRTL ? segments.length - 1 - index : index,
      };
    });

    this._minValue = minValue;
    this._maxValue = total;
    this._segments = segments;

    return {
      arcs,
    };
  };

  private _renderNeedle = () => {
    const needleRotation = calcNeedleRotation(this.props.chartValue, this._minValue, this._maxValue);
    const rtlSafeNeedleRotation = this._isRTL ? 180 - needleRotation : needleRotation;
    const strokeWidth = 2;
    const halfStrokeWidth = strokeWidth / 2;
    const needleLength = this._outerRadius - this._innerRadius + EXTRA_NEEDLE_LENGTH;

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
          className={this._classNames.needle}
          transform={`translate(${-this._innerRadius + EXTRA_NEEDLE_LENGTH / 2})`}
          data-is-focusable={true}
          onFocus={e => this._handleFocus(e, 'Needle')}
          onBlur={this._handleBlur}
          onMouseEnter={e => this._handleMouseOver(e, 'Needle')}
          onMouseMove={e => this._handleMouseOver(e, 'Needle')}
          role="img"
          aria-label={
            'Current value: ' +
            getChartValueLabel(this.props.chartValue, this._minValue, this._maxValue, this.props.chartValueFormat)
          }
        />
      </g>
    );
  };

  private _renderLegends = () => {
    if (this.props.hideLegend) {
      return null;
    }

    const legends: ILegend[] = this._segments.map(segment => {
      return {
        title: segment.legend,
        color: segment.color!,
        action: () => {
          if (this.state.selectedLegend === segment.legend) {
            this.setState({ selectedLegend: '' });
          } else {
            this.setState({ selectedLegend: segment.legend });
          }
        },
        hoverAction: () => {
          this.setState({ hoveredLegend: segment.legend });
        },
        onMouseOutAction: () => {
          this.setState({ hoveredLegend: '' });
        },
      };
    });

    return (
      <div className={this._classNames.legendsContainer}>
        <Legends legends={legends} centerLegends {...this.props.legendProps} />
      </div>
    );
  };

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  private _legendHighlighted = (legend: string) => {
    return (
      this.state.selectedLegend === legend || (this.state.selectedLegend === '' && this.state.hoveredLegend === legend)
    );
  };

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  private _noLegendHighlighted = () => {
    return this.state.selectedLegend === '' && this.state.hoveredLegend === '';
  };

  private _handleFocus = (focusEvent: React.FocusEvent<SVGElement>, focusedElement: string) => {
    this._showCallout(focusEvent.target, focusedElement, true);
  };

  private _handleBlur = () => {
    this._hideCallout(true);
  };

  private _handleMouseOver = (mouseEvent: React.MouseEvent<SVGElement>, hoveredElement: string) => {
    this._showCallout(mouseEvent.target, hoveredElement, false);
  };

  private _handleMouseOut = () => {
    this._hideCallout(false);
  };

  private _handleCalloutDismiss = () => {
    this._hideCallout(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _showCallout = (target: any, legend: string, isFocusEvent: boolean) => {
    if (this._calloutAnchor === legend) {
      return;
    }

    this._calloutAnchor = legend;
    const hoverXValue: string =
      'Current value is ' +
      getChartValueLabel(this.props.chartValue, this._minValue, this._maxValue, this.props.chartValueFormat, true);
    const hoverYValues: IYValue[] = this._segments.map(segment => {
      const yValue: IYValue = {
        legend: segment.legend,
        y: getSegmentLabel(segment, this._minValue, this._maxValue, this.props.variant),
        color: segment.color,
      };
      return yValue;
    });
    this.setState({
      calloutTarget: target,
      /** Show the callout if highlighted arc is hovered/focused and Hide it if unhighlighted arc is hovered/focused */
      isCalloutVisible:
        ['Needle', 'Chart value'].includes(legend) ||
        this.state.selectedLegend === '' ||
        this.state.selectedLegend === legend,
      hoverXValue,
      hoverYValues,
      ...(isFocusEvent ? { focusedElement: legend } : {}),
    });
  };

  private _hideCallout = (isBlurEvent?: boolean) => {
    this._calloutAnchor = '';
    this.setState({
      calloutTarget: null,
      isCalloutVisible: false,
      hoverXValue: '',
      hoverYValues: [],
      ...(isBlurEvent ? { focusedElement: '' } : {}),
    });
  };

  private _wrapContent = (content: string, id: string, maxWidth: number) => {
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
  };

  // TO DO: Write a common functional component for Multi value callout and divide sub count method
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _multiValueCallout = (calloutProps: any) => {
    const yValueHoverSubCountsExists: boolean = this._yValueHoverSubCountsExists(calloutProps.YValueHover);
    return (
      <div className={this._classNames.calloutContentRoot}>
        <div
          className={this._classNames.calloutDateTimeContainer}
          style={yValueHoverSubCountsExists ? { marginBottom: '11px' } : {}}
        >
          <div
            className={this._classNames.calloutContentX}
            {...getAccessibleDataObject(calloutProps!.xAxisCalloutAccessibilityData, 'text', false)}
          >
            {convertToLocaleString(calloutProps!.hoverXValue, this.props.culture)}
          </div>
        </div>
        <div
          className={this._classNames.calloutInfoContainer}
          style={yValueHoverSubCountsExists ? { display: 'flex' } : {}}
        >
          {calloutProps!.YValueHover &&
            calloutProps!.YValueHover.map((yValue: IYValueHover, index: number, yValues: IYValueHover[]) => {
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
                            borderBottom: `1px solid ${this.props.theme!.semanticColors.menuDivider}`,
                            paddingBottom: '10px',
                          }),
                        }
                      : {
                          ...(shouldDrawBorderBottom && {
                            borderBottom: `1px solid ${this.props.theme!.semanticColors.menuDivider}`,
                            paddingBottom: '10px',
                          }),
                        }
                  }
                >
                  {this._getCalloutContent(yValue, index, yValueHoverSubCountsExists, isLast)}
                </div>
              );
            })}
          {!!calloutProps.descriptionMessage && (
            <div className={this._classNames.descriptionMessage}>{calloutProps.descriptionMessage}</div>
          )}
        </div>
      </div>
    );
  };

  private _yValueHoverSubCountsExists(yValueHover?: IYValueHover[]) {
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

  private _getCalloutContent(
    xValue: IYValueHover,
    index: number,
    yValueHoverSubCountsExists: boolean,
    isLast: boolean,
  ): React.ReactNode {
    const marginStyle: React.CSSProperties = isLast ? {} : { marginRight: '16px' };
    const toDrawShape = xValue.index !== undefined && xValue.index !== -1;
    const _classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      lineColor: xValue.color,
      toDrawShape,
    });

    const { culture } = this.props;
    const yValue = convertToLocaleString(xValue.y, culture);
    if (!xValue.yAxisCalloutData || typeof xValue.yAxisCalloutData === 'string') {
      return (
        <div style={yValueHoverSubCountsExists ? marginStyle : {}}>
          {yValueHoverSubCountsExists && (
            <div className="ms-fontWeight-semibold" style={{ fontSize: '12pt' }}>
              {xValue.legend!} ({yValue})
            </div>
          )}
          <div id={`${index}_${xValue.y}`} className={_classNames.calloutBlockContainer}>
            {toDrawShape && (
              <Shape
                svgProps={{
                  className: _classNames.shapeStyles,
                }}
                pathProps={{ fill: xValue.color }}
                shape={Points[xValue.index! % Object.keys(pointTypes).length] as LegendShape}
              />
            )}
            <div>
              <div className={_classNames.calloutlegendText}> {xValue.legend}</div>
              <div className={_classNames.calloutContentY}>
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
              <div key={subcountName} className={_classNames.calloutBlockContainer}>
                <div className={_classNames.calloutlegendText}> {convertToLocaleString(subcountName, culture)}</div>
                <div className={_classNames.calloutContentY}>
                  {convertToLocaleString(subcounts[subcountName], culture)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  private _getChartTitle = (): string => {
    const { chartTitle } = this.props;
    return (chartTitle ? `${chartTitle}. ` : '') + `Gauge chart with ${this._segments.length} segments. `;
  };
}
