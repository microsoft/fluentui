import * as React from 'react';
import * as shape from 'd3-shape';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { IGaugeChartProps, IGaugeChartStyleProps, IGaugeChartStyles } from './GaugeChart.types';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { getColorFromToken } from '../../utilities/colors';

const getClassNames = classNamesFunction<IGaugeChartStyleProps, IGaugeChartStyles>();

interface IGaugeChartState {}

export class GaugeChartBase extends React.Component<IGaugeChartProps, IGaugeChartState> {
  private _classNames: IProcessedStyleSet<IGaugeChartStyles>;

  public render(): React.ReactNode {
    this._classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
    });

    const innerRadius = 54;
    const outerRadius = 70;
    const { minValue, maxValue, segments, needleRotation } = this._initProps(innerRadius, outerRadius);

    return (
      <svg style={{ height: 600, width: 600 }}>
        <g transform="translate(200, 200)">
          {segments.map((segment, i) => (
            <path key={i} d={segment.d} fill={segment.color} />
          ))}
          <text x={-(outerRadius + 4)} textAnchor="end" data-is-focusable={true} className={this._classNames.limits}>
            {minValue}
          </text>
          <text x={outerRadius + 4} textAnchor="start" data-is-focusable={true} className={this._classNames.limits}>
            {maxValue}
          </text>
          <text y={0} textAnchor="middle" data-is-focusable={true} className={this._classNames.chartValue}>
            45%
          </text>
          <text
            y={8}
            textAnchor="middle"
            dominantBaseline="hanging"
            data-is-focusable={true}
            className={this._classNames.sublabel}
          >
            Medium risk
          </text>
          <g transform={`rotate(${needleRotation}, 0, 0)`}>
            {this._renderNeedle(innerRadius, outerRadius, 2, 'black')}
          </g>
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
    segments.forEach(segment => {
      maxVal += segment.size;
    });
    if (typeof maxValue !== 'undefined' && maxVal < maxValue) {
      segments.push({ size: maxValue - maxVal });
    }

    const arcGenerator = shape
      .arc()
      .padAngle(2 / outerRadius)
      .padRadius(outerRadius);
    let prevAngle = -Math.PI / 2;
    const arcData = segments.map(segment => {
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

    const needleRotation = ((currentValue - minValue) / (maxVal - minValue)) * 180;

    return {
      minValue,
      maxValue: maxVal,
      segments: arcData,
      needleRotation,
    };
  };
}
