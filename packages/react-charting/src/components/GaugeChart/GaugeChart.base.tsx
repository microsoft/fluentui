import * as React from 'react';
import * as shape from 'd3-shape';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { IGaugeChartProps, IGaugeChartStyleProps, IGaugeChartStyles } from './GaugeChart.types';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { getColorFromToken } from '../../utilities/colors';
import { formatValueWithSIPrefix } from '../../utilities/utilities';

const BREAKPOINTS = [142, 124, 106, 88, 70, 52];
const ARC_WIDTHS = [32, 28, 24, 20, 16, 12];
const FONT_SIZES = [40, 40, 32, 32, 24, 20];
const getClassNames = classNamesFunction<IGaugeChartStyleProps, IGaugeChartStyles>();

interface IGaugeChartState {}

export class GaugeChartBase extends React.Component<IGaugeChartProps, IGaugeChartState> {
  private _classNames: IProcessedStyleSet<IGaugeChartStyles>;

  public render(): React.ReactNode {
    const width = this.props.width || 220;
    const height = this.props.height || 110;
    const gaugeMarginHorizontal = 80;
    const gaugeMarginVertical = 40;

    const outerRadius = Math.min((width - gaugeMarginHorizontal) / 2, height - gaugeMarginVertical);
    let innerRadius = outerRadius - ARC_WIDTHS[ARC_WIDTHS.length - 1];
    let fontSize = FONT_SIZES[FONT_SIZES.length - 1];
    for (let idx = 0; idx < BREAKPOINTS.length; idx += 1) {
      if (outerRadius >= BREAKPOINTS[idx]) {
        innerRadius = outerRadius - ARC_WIDTHS[idx];
        fontSize = FONT_SIZES[idx];
        break;
      }
    }

    const { minValue, maxValue, segments, sublabel } = this._initProps(innerRadius, outerRadius);
    const fraction = [this.props.currentValue - minValue, maxValue - minValue];
    const needleRotation = (fraction[0] / fraction[1]) * 180;

    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
      fontSize,
    });

    return (
      <svg style={{ width, height }}>
        <g transform={`translate(${width / 2}, ${height - gaugeMarginVertical / 2})`}>
          {segments.map((segment, i) => (
            <path key={i} d={segment.d} fill={segment.color} />
          ))}
          <g transform={`rotate(${needleRotation}, 0, 0)`}>
            {this._renderNeedle(innerRadius, outerRadius, 2, 'black')}
          </g>
          <text x={-(outerRadius + 4)} textAnchor="end" data-is-focusable={true} className={this._classNames.limits}>
            {formatValueWithSIPrefix(minValue)}
          </text>
          <text x={outerRadius + 4} textAnchor="start" data-is-focusable={true} className={this._classNames.limits}>
            {formatValueWithSIPrefix(maxValue)}
          </text>
          <text y={0} textAnchor="middle" data-is-focusable={true} className={this._classNames.chartValue}>
            {`${((fraction[0] / fraction[1]) * 100).toFixed()}%`}
          </text>
          {sublabel && (
            <text
              y={8}
              textAnchor="middle"
              dominantBaseline="hanging"
              data-is-focusable={true}
              className={this._classNames.sublabel}
            >
              {sublabel}
            </text>
          )}
        </g>
      </svg>
    );
  }

  private _renderNeedle = (innerRadius: number, outerRadius: number, strokeWidth: number, fill: string) => {
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
    const { minValue = 0, maxValue, segments = [], theme, currentValue } = this.props;

    let maxVal = minValue;
    let sublabel: string | undefined;
    segments.forEach(segment => {
      const prevVal = maxVal;
      maxVal += segment.size;
      if (currentValue >= prevVal && currentValue <= maxVal) {
        sublabel = segment.label;
      }
    });
    if (typeof maxValue !== 'undefined' && maxVal < maxValue) {
      segments.push({ size: maxValue - maxVal });
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
        color:
          typeof segment.color !== 'undefined'
            ? getColorFromToken(segment.color, theme!.isInverted)
            : theme!.palette.neutralLight,
      };
    });

    return {
      minValue,
      maxValue: maxVal,
      segments: arcsData,
      sublabel,
    };
  };
}
