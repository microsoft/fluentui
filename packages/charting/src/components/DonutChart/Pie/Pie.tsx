import * as React from 'react';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import { IPieProps } from './Pie.types';
import { LabeledArc } from '../Arc/Arc';
import { IDataPoint } from '../DonutChart.types';

export class Pie extends React.Component<IPieProps, {}> {
  private colors: scale.ScaleOrdinal<string | number, {}>;
  // tslint:disable:no-any
  private pie: any;

  constructor(props: IPieProps) {
    super(props);
    this.pie = shape
      .pie()
      .sort(null)
      .value((d: any) => {
        return d.value;
      });

    this.colors = scale.scaleOrdinal().range(this.props.colors!);
  }
  public arcGenerator = (d: IDataPoint, i: number): any => {
    return (
      <LabeledArc
        key={i}
        data={d}
        innerRadius={this.props.innerRadius}
        outerRadius={this.props.outerRadius}
        color={this.colors(i)}
      />
    );
  };

  public render(): JSX.Element {
    // const getClassNames = classNamesFunction<IPieProps, IPieStyles>();

    const pie = this.pie(this.props.data),
      translate = `translate(${this.props.width / 2}, ${this.props.height / 2})`;

    return (
      <svg width={this.props.width} height={this.props.height}>
        <g transform={translate}>{pie.map((d: IDataPoint, i: number) => this.arcGenerator(d, i))}</g>
      </svg>
    );
  }
}
