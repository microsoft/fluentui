import * as React from 'react';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { area as d3Area, line as d3Line, curveLinear as d3curveLinear } from 'd3-shape';
import { max as d3Max, extent as d3Extent } from 'd3-array';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { ILineChartDataPoint } from '../../types/IDataPoint';
import { classNamesFunction, getId, getRTL } from '@fluentui/react/lib/Utilities';
import { ISparklineProps, ISparklineStyleProps, ISparklineStyles } from '../../index';

const getClassNames = classNamesFunction<ISparklineStyleProps, ISparklineStyles>();

export interface ISparklineState {
  _points: ILineChartDataPoint[] | null;
  _width: number;
  _height: number;
  _valueTextWidth: number;
}

export class SparklineBase extends React.Component<ISparklineProps, ISparklineState> {
  private margin = {
    top: 2,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  private x: any;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  private y: any;
  private area: any;
  private line: any;
  private _emptyChartId: string;
  private _isRTL: boolean = getRTL();

  constructor(props: ISparklineProps) {
    super(props);
    this.state = {
      _points: null,
      _width: this.props.width! || 80,
      _height: this.props.height! || 20,
      _valueTextWidth: this.props.valueTextWidth! || 80,
    };
    this._emptyChartId = getId('_SparklineChart_empty');
  }

  public componentDidMount() {
    if (!this._isChartEmpty()) {
      const area = d3Area()
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .x((d: any) => this.x(d.x))
        .y0(this.state._height)
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .y1((d: any) => this.y(d.y))
        .curve(d3curveLinear);
      this.area = area;

      const line = d3Line()
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .x((d: any) => this.x(d.x))
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .y((d: any) => this.y(d.y))
        .curve(d3curveLinear);
      this.line = line;

      const points = this.props.data!.lineChartData![0].data;

      /* eslint-disable @typescript-eslint/no-explicit-any */
      const [xMin, xMax] = d3Extent(points, (d: any) => d.x);

      this.x = d3ScaleLinear()
        .domain([xMin, xMax])
        .range([this.margin.left!, this.state._width - this.margin.right!]);
      this.y = d3ScaleLinear()
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .domain([0, d3Max(points, (d: any) => d.y)])
        .range([this.state._height - this.margin.bottom!, this.margin.top!]);

      this.setState({
        _points: points,
      });
    }
  }

  public drawSparkline() {
    return (
      <>
        <path
          className="line"
          d={this.line(this.state._points)}
          fill={'transparent'}
          opacity={1}
          strokeWidth={2}
          stroke={this.props.data!.lineChartData![0].color!}
        />
        <path
          className="area"
          d={this.area(this.state._points)}
          opacity={1}
          fillOpacity={0.2}
          fill={this.props.data!.lineChartData![0].color!}
          role="img"
          aria-hidden
        />
      </>
    );
  }

  public render() {
    const classNames = getClassNames(this.props.styles!, {
      theme: this.props.theme!,
    });
    return !this._isChartEmpty() ? (
      <FocusZone
        direction={FocusZoneDirection.horizontal}
        isCircularNavigation={true}
        className={classNames.inlineBlock}
      >
        <div className={classNames.inlineBlock}>
          {this.state._width >= 50 && this.state._height >= 16 ? (
            <svg
              width={this.state._width}
              height={this.state._height}
              data-is-focusable={true}
              aria-label={`Sparkline with label ${this.props.data!.lineChartData![0].legend!}`}
            >
              {this.state._points ? this.drawSparkline() : null}
            </svg>
          ) : (
            <></>
          )}
          {this.props.showLegend && this.props.data!.lineChartData![0].legend ? (
            <svg width={this.state._valueTextWidth} height={this.state._height} data-is-focusable={true}>
              <text
                x="0%"
                textAnchor={this._isRTL ? 'end' : 'start'}
                dx={8}
                y="100%"
                dy={-5}
                className={classNames.valueText}
              >
                {this.props.data!.lineChartData![0].legend!}
              </text>
            </svg>
          ) : (
            <></>
          )}
        </div>
      </FocusZone>
    ) : (
      <div
        id={this._emptyChartId}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }

  private _isChartEmpty(): boolean {
    return !(
      this.props.data &&
      this.props.data.lineChartData &&
      this.props.data.lineChartData.length > 0 &&
      this.props.data.lineChartData.filter(item => item.data.length === 0).length === 0
    );
  }
}
