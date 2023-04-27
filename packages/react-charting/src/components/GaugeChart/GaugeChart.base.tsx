import * as React from 'react';
import * as shape from 'd3-shape';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { IGaugeChartProps, IGaugeChartSegment, IGaugeChartStyleProps, IGaugeChartStyles } from './GaugeChart.types';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import {
  Points,
  convertToLocaleString,
  formatValueWithSIPrefix,
  getAccessibleDataObject,
  getColorFromToken,
  pointTypes,
} from '../../utilities/index';
import { ILegend, LegendShape, Legends, Shape } from '../Legends/index';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { IYValueHover } from '../../index';
import { TooltipText } from './TooltipText';
import { select as d3Select } from 'd3-selection';

const BREAKPOINTS = [52, 70, 88, 106, 124, 142];
const ARC_WIDTHS = [12, 16, 20, 24, 28, 32];
const FONT_SIZES = [20, 24, 32, 32, 40, 40];
const getClassNames = classNamesFunction<IGaugeChartStyleProps, IGaugeChartStyles>();

interface IYValue extends Omit<IYValueHover, 'y'> {
  y?: string | number;
}
interface IGaugeChartState {
  hoveredLegend: string;
  selectedLegend: string;
  focusedSegment: string;
  hoveredElement: SVGElement | null;
  isCalloutVisible: boolean;
  hoverXValue: string | number;
  hoverYValues: IYValue[];
}

export class GaugeChartBase extends React.Component<IGaugeChartProps, IGaugeChartState> {
  private _classNames: IProcessedStyleSet<IGaugeChartStyles>;

  constructor(props: IGaugeChartProps) {
    super(props);

    this.state = {
      hoveredLegend: '',
      selectedLegend: '',
      focusedSegment: '',
      hoveredElement: null,
      isCalloutVisible: false,
      hoverXValue: '',
      hoverYValues: [],
    };
  }

  public render(): React.ReactNode {
    const margins = {
      left: (!this.props.hideLimits ? 4 + 36 : 0) + 16,
      right: (!this.props.hideLimits ? 4 + 36 : 0) + 16,
      top: (this.props.chartTitle ? 11 + 16 : 2) + 16,
      bottom: (this.props.sublabel ? 4 + 16 : 0) + 16,
    };
    const legendContainerHeight = !this.props.hideLegend ? 24 : 0;

    const width = this.props.width || 140 + margins.left + margins.right;
    const height = this.props.height || 70 + margins.top + margins.bottom + legendContainerHeight;
    const outerRadius = Math.min(
      (width - (margins.left + margins.right)) / 2,
      height - (margins.top + margins.bottom + legendContainerHeight),
    );

    let innerRadius = outerRadius - ARC_WIDTHS[0];
    let fontSize = FONT_SIZES[0];
    for (let idx = BREAKPOINTS.length - 1; idx >= 0; idx -= 1) {
      if (outerRadius >= BREAKPOINTS[idx]) {
        innerRadius = outerRadius - ARC_WIDTHS[idx];
        fontSize = FONT_SIZES[idx];
        break;
      }
    }

    const { minValue, maxValue, arcsData } = this._initProps(innerRadius, outerRadius);
    const sweptFraction = [this.props.currentValue - minValue, maxValue - minValue];
    const needleRotation = (sweptFraction[0] / sweptFraction[1]) * 180;

    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      fontSize,
      width,
      height: height - legendContainerHeight,
      className: this.props.className,
    });

    return (
      <div className={this._classNames.root}>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <svg
            className={this._classNames.chart}
            onMouseEnter={e => this._onChartMouseOver(e, sweptFraction, arcsData, minValue)}
            onMouseMove={e => this._onChartMouseOver(e, sweptFraction, arcsData, minValue)}
            onMouseLeave={this._onChartMouseOut}
            role="presentation"
            aria-label="Gauge"
            aria-description={`This is a gauge chart with ${arcsData.length} section represented.`}
          >
            <g transform={`translate(${width / 2}, ${height - (margins.bottom + legendContainerHeight)})`}>
              {this.props.chartTitle && (
                <text x={0} y={-(outerRadius + 11)} textAnchor="middle" className={this._classNames.chartTitle}>
                  {this.props.chartTitle}
                </text>
              )}
              {!this.props.hideLimits && (
                <>
                  <text
                    x={-(outerRadius + 4)}
                    y={0}
                    textAnchor="end"
                    className={this._classNames.limits}
                    role="img"
                    aria-label={`Min value: ${minValue}`}
                  >
                    {formatValueWithSIPrefix(minValue)}
                  </text>
                  <text
                    x={outerRadius + 4}
                    y={0}
                    textAnchor="start"
                    className={this._classNames.limits}
                    role="img"
                    aria-label={`Max value: ${maxValue}`}
                  >
                    {formatValueWithSIPrefix(maxValue)}
                  </text>
                </>
              )}
              {arcsData.map((segment, i) => (
                <path
                  key={i}
                  d={segment.d}
                  fill={segment.color}
                  fillOpacity={this._legendHighlighted(segment.legend) || this._noLegendHighlighted() ? 1 : 0.1}
                  strokeWidth={this.state.focusedSegment === segment.legend ? 2 : 0}
                  className={this._classNames.segment}
                  onFocus={() => this._onSegmentFocus(segment.legend)}
                  onBlur={this._onSegmentBlur}
                  data-is-focusable={true}
                  role="img"
                  aria-label={segment.legend}
                  aria-description={`${segment.size} out of ${maxValue - minValue}, or ${(
                    (segment.size / (maxValue - minValue)) *
                    100
                  ).toFixed()}%`}
                />
              ))}
              <g transform={`rotate(${needleRotation}, 0, 0)`}>{this._renderNeedle(innerRadius, outerRadius, 2)}</g>
              <TooltipText
                content={`${((sweptFraction[0] / sweptFraction[1]) * 100).toFixed()}%`}
                textProps={{
                  x: 0,
                  y: 0,
                  textAnchor: 'middle',
                  className: this._classNames.chartValue,
                  role: 'img',
                  'aria-label': `Current value: ${sweptFraction[0]} out of ${sweptFraction[1]}, or ${(
                    (sweptFraction[0] / sweptFraction[1]) *
                    100
                  ).toFixed()}%`,
                }}
                maxWidth={innerRadius * 2 - 24}
                wrapContent={this._wrapContent}
              />
              {this.props.sublabel && (
                <TooltipText
                  content={this.props.sublabel}
                  textProps={{
                    x: 0,
                    y: 4,
                    textAnchor: 'middle',
                    dominantBaseline: 'hanging',
                    className: this._classNames.sublabel,
                    role: 'img',
                    'aria-label': this.props.sublabel,
                  }}
                  maxWidth={innerRadius * 2}
                  wrapContent={this._wrapContent}
                />
              )}
            </g>
          </svg>
        </FocusZone>
        {this._renderLegends(arcsData)}
        {!this.props.hideTooltip && this.state.isCalloutVisible && (
          <Callout
            target={this.state.hoveredElement}
            directionalHint={DirectionalHint.topAutoEdge}
            gapSpace={15}
            isBeakVisible={false}
            onDismiss={this._onCalloutDismiss}
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

  private _renderNeedle = (innerRadius: number, outerRadius: number, strokeWidth: number) => {
    const needleLength = outerRadius - innerRadius + 4;
    strokeWidth /= 2;
    return (
      <path
        d={`
            M 0,${-strokeWidth - 3}
            L ${-needleLength},${-strokeWidth - 1}
            A ${strokeWidth + 1},${strokeWidth + 1},0,0,0,${-needleLength},${strokeWidth + 1}
            L 0,${strokeWidth + 3}
            A ${strokeWidth + 3},${strokeWidth + 3},0,0,0,0,${-strokeWidth - 3}
          `}
        strokeWidth={strokeWidth * 2}
        className={this._classNames.needle}
        transform={`translate(${-innerRadius + 2})`}
      />
    );
  };

  private _initProps = (innerRadius: number, outerRadius: number) => {
    const { minValue = 0, maxValue, segments = [], theme } = this.props;

    let maxVal = minValue;
    segments.forEach(segment => {
      maxVal += segment.size;
    });
    if (typeof maxValue !== 'undefined' && maxVal < maxValue) {
      segments.push({ legend: 'Unknown', size: maxValue - maxVal });
      maxVal = maxValue;
    }

    const arcGenerator = shape
      .arc()
      .padAngle(2 / outerRadius)
      .padRadius(outerRadius);
    let prevAngle = -Math.PI / 2;
    const arcsData = segments.map(segment => {
      const endAngle = prevAngle + (segment.size / (maxVal - minValue)) * Math.PI;
      const d = arcGenerator({
        innerRadius,
        outerRadius,
        startAngle: prevAngle,
        endAngle,
      })!;
      prevAngle = endAngle;
      return {
        d,
        legend: segment.legend,
        size: segment.size,
        color:
          typeof segment.color !== 'undefined'
            ? getColorFromToken(segment.color, theme!.isInverted)
            : theme!.palette.neutralLight,
      };
    });

    return {
      minValue,
      maxValue: maxVal,
      arcsData,
    };
  };

  private _renderLegends = (segments: IGaugeChartSegment[]) => {
    if (this.props.hideLegend) {
      return null;
    }

    const legends: ILegend[] = segments.map(segment => {
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

    return <Legends legends={legends} centerLegends {...this.props.legendProps} />;
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

  private _onSegmentFocus = (segmentLegend: string) => {
    this.setState({ focusedSegment: segmentLegend });
  };

  private _onSegmentBlur = () => {
    this.setState({ focusedSegment: '' });
  };

  private _onCalloutDismiss = () => {
    this.setState({ isCalloutVisible: false });
  };

  private _onChartMouseOver = (
    mouseEvent: React.MouseEvent<SVGElement>,
    sweptFraction: number[],
    arcsData: IGaugeChartSegment[],
    minValue: number,
  ) => {
    if (this.state.isCalloutVisible) {
      return;
    }

    const target = mouseEvent.target as SVGElement;
    const hoverXValue: string = `Current value is ${sweptFraction[0]}/${sweptFraction[1]}`;
    let total = minValue;
    const hoverYValues: IYValue[] = arcsData.map(segment => {
      const yValue: IYValue = {
        legend: segment.legend,
        y: `${total} - ${total + segment.size}`,
        color: segment.color,
      };
      total += segment.size;
      return yValue;
    });
    this.setState({
      hoveredElement: target,
      isCalloutVisible: true,
      hoverXValue,
      hoverYValues,
    });
  };

  private _onChartMouseOut = () => {
    this.setState({ hoveredElement: null, isCalloutVisible: false, hoverXValue: '', hoverYValues: [] });
  };

  private _wrapContent = (content: string, id: string, maxWidth: number) => {
    let textOverflow = false;
    const text = d3Select<SVGTextElement, {}>(`#${id}`);
    text.text(content);
    let textLength = text.node()!.getComputedTextLength();
    while (textLength > maxWidth && content.length > 0) {
      content = content.slice(0, -1);
      text.text(content + '...');
      textOverflow = true;
      textLength = text.node()!.getComputedTextLength();
    }
    return textOverflow;
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
}
