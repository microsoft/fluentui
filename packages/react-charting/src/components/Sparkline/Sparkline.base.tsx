import * as React from 'react';
import { createRef } from 'react';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { area as d3Area, curveMonotoneX as d3CurveBasis } from 'd3-shape';
import { max as d3Max, extent as d3Extent } from 'd3-array';
import { csvParse as d3CsvParse } from 'd3-dsv';
import { ISparklineProps } from '../../index';
// @ts-ignore

export interface ISparklineState {
  data: any[] | null;
}

export class SparklineBase extends React.Component<ISparklineProps, ISparklineState> {
  private xRef: React.RefObject<any> = createRef();
  private yRef: React.RefObject<any> = createRef();

  private margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50,
  };

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
    this.width = 380 - this.margin.left - this.margin.right;
    this.height = 140 - this.margin.top - this.margin.bottom;
  }

  public componentDidMount() {
    console.log('componentDidMount');

    // set the ranges
    this.x = d3ScaleLinear().range([this.margin.left, this.width - this.margin.right]);
    this.y = d3ScaleLinear().range([this.height - this.margin.bottom, this.margin.top]);

    const area = d3Area()
      .x((d: any) => this.x(d.xVal))
      .y0(this.height)
      .y1((d: any) => this.y(d.close))
      .curve(d3CurveBasis);
    this.area = area;

    const rawData = d3CsvParse(this.props.inpData);
    rawData.forEach((d: any) => {
      d.xVal = d.xVal;
      d.yVal = +d.yVal;
    });
    this.x.domain(d3Extent(rawData, (d: any) => d.xVal));
    this.y.domain([0, d3Max(rawData, (d: any) => d.close)]);
    // ToDo: Map domain and range properly.
    // ToDo: Assign ids to each sparkline properly.
    // ToDo: Create a sparkline controller.
    console.log('data->', rawData);

    this.setState({
      data: rawData,
    });
  }

  public areaPath() {
    // @ts-ignore
    return (
      <path
        className="area"
        d={this.area(this.state.data)}
        opacity={1}
        fillOpacity={0.7}
        fill={'#627CEF'}
        strokeWidth={3}
        stroke={'#437C95'}
      />
    );
  }

  public render() {
    return (
      <svg width={this.width} height={this.height}>
        {this.state.data ? this.areaPath() : null}
      </svg>
    );
  }
}
