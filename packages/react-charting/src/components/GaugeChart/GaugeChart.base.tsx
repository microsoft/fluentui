import * as React from 'react';
import * as shape from 'd3-shape';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { IGaugeChartProps, IGaugeChartSegment, IGaugeChartStyleProps, IGaugeChartStyles } from './GaugeChart.types';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { getColorFromToken, formatValueWithSIPrefix } from '../../utilities/index';
import { ILegend, Legends } from '../Legends/index';

const BREAKPOINTS = [52, 70, 88, 106, 124, 142];
const ARC_WIDTHS = [12, 16, 20, 24, 28, 32];
const FONT_SIZES = [20, 24, 32, 32, 40, 40];
const getClassNames = classNamesFunction<IGaugeChartStyleProps, IGaugeChartStyles>();

interface IGaugeChartState {
  hoveredLegend: string;
  selectedLegend: string;
}

export class GaugeChartBase extends React.Component<IGaugeChartProps, IGaugeChartState> {
  private _classNames: IProcessedStyleSet<IGaugeChartStyles>;

  constructor(props: IGaugeChartProps) {
    super(props);

    this.state = {
      hoveredLegend: '',
      selectedLegend: '',
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
        <svg className={this._classNames.chart}>
          <g transform={`translate(${width / 2}, ${height - (margins.bottom + legendContainerHeight)})`}>
            {arcsData.map((segment, i) => (
              <path
                key={i}
                d={segment.d}
                fill={segment.color}
                opacity={this._legendHighlighted(segment.legend) || this._noLegendHighlighted() ? 1 : 0.1}
              />
            ))}
            <g transform={`rotate(${needleRotation}, 0, 0)`}>{this._renderNeedle(innerRadius, outerRadius, 2)}</g>
            {this.props.chartTitle && (
              <text
                x={0}
                y={-(outerRadius + 11)}
                textAnchor="middle"
                data-is-focusable={true}
                className={this._classNames.chartTitle}
              >
                {this.props.chartTitle}
              </text>
            )}
            {!this.props.hideLimits && (
              <>
                <text
                  x={-(outerRadius + 4)}
                  y={0}
                  textAnchor="end"
                  data-is-focusable={true}
                  className={this._classNames.limits}
                >
                  {formatValueWithSIPrefix(minValue)}
                </text>
                <text
                  x={outerRadius + 4}
                  y={0}
                  textAnchor="start"
                  data-is-focusable={true}
                  className={this._classNames.limits}
                >
                  {formatValueWithSIPrefix(maxValue)}
                </text>
              </>
            )}
            <text x={0} y={0} textAnchor="middle" data-is-focusable={true} className={this._classNames.chartValue}>
              {`${((sweptFraction[0] / sweptFraction[1]) * 100).toFixed()}%`}
            </text>
            {this.props.sublabel && (
              <text
                x={0}
                y={4}
                textAnchor="middle"
                dominantBaseline="hanging"
                data-is-focusable={true}
                className={this._classNames.sublabel}
              >
                {this.props.sublabel}
              </text>
            )}
          </g>
        </svg>
        {this._renderLegends(arcsData)}
      </div>
    );
  }

  private _renderNeedle = (innerRadius: number, outerRadius: number, strokeWidth: number) => {
    const needleLength = outerRadius - innerRadius + 4;
    strokeWidth /= 2;
    return (
      <path
        d={`
            M 0,${-strokeWidth}
            L ${-needleLength},${-strokeWidth + 2}
            A ${strokeWidth + 1},${strokeWidth + 1},0,0,0,${-needleLength},${strokeWidth + 4}
            L 0,${strokeWidth + 6}
            A ${strokeWidth + 3},${strokeWidth + 3},0,0,0,0,${-strokeWidth}
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

    return (
      <div className={this._classNames.legendContainer}>
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
}
