import * as React from 'react';
import { createRef } from 'react';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { area as d3Area, curveMonotoneX as d3CurveBasis } from 'd3-shape';
import { max as d3Max, extent as d3Extent } from 'd3-array';
import { ILineChartPoints } from '../../types/IDataPoint';
import { ISparklineProps } from '../../index';
// @ts-ignore

export interface ISparklineState {
  data: ILineChartPoints[] | null;
}

export class SparklineBase extends React.Component<ISparklineProps, ISparklineState> {
  /*private xRef: React.RefObject<any> = createRef();
  private yRef: React.RefObject<any> = createRef();

  private margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50,
  };*/

  // Todo: Async shimmer loading
  // Load text after the chart
  // Making color configurable
  // UI redlining
  // Aria label and accessibility
  // Styling
  // Use FocusZone direction={FocusZoneDirection.horizontal} isCircularNavigation={true}

  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private area: any;

  constructor(props: ISparklineProps) {
    super(props);
    this.state = {
      data: null,
    };
    this.width = 80;
    this.height = 20;
  }

  public componentDidMount() {
    console.log('componentDidMount');

    const area = d3Area()
      .x((d: any) => this.x(d.x))
      .y0(this.height)
      .y1((d: any) => this.y(d.y))
      .curve(d3CurveBasis);
    this.area = area;

    const rawData = this.props.data!.lineChartData!;

    const [xMin, xMax] = d3Extent(rawData, (d: any) => d.x);

    this.x = d3ScaleLinear().domain([xMin, xMax]).range([0, this.width]);
    this.y = d3ScaleLinear()
      .domain([0, d3Max(rawData, (d: any) => d.y)])
      .range([this.height - 4, 0]); //ToDo: handle RTL
    //ToDo: Use utils
    // ToDo: Map domain and range properly.
    // ToDo: Assign ids to each sparkline properly.

    console.log('data->', rawData);

    this.setState({
      data: rawData,
    });
  }

  public areaPath() {
    return (
      <path
        className="area"
        d={this.area(this.state.data)}
        opacity={1}
        fillOpacity={0.4}
        fill={this.props.color}
        strokeWidth={2}
        stroke={this.props.color}
      />
    );
  }

  public render() {
    return (
      <>
        <svg width={this.width} height={this.height}>
          {this.state.data ? this.areaPath() : null}
        </svg>
        <span style={{ marginLeft: '8px' }}>{this.props.data!.chartTitle!}</span>
      </>
    );
  }
}
