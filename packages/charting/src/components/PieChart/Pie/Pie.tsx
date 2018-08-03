import * as React from 'react';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import { IPieProps } from './Pie.types';
import { LabeledArc } from '../Arc/Arc';
import { IArcData } from '../Arc/Arc.types';

export class Pie extends React.Component<IPieProps, {}> {
  public static defaultProps: Partial<IPieProps> = {
    pie: shape
      .pie()
      .sort(null)
      // tslint:disable:no-any
      .value((d: any) => {
        return d.y;
      })
  };
  private colors: scale.ScaleOrdinal<string | number, {}>;

  constructor(props: IPieProps) {
    super(props);
    this.colors = scale.scaleOrdinal().range(this.props.colors!);
  }
  public arcGenerator = (d: IArcData, i: number): JSX.Element => {
    return (
      <LabeledArc
        key={i}
        data={d}
        innerRadius={this.props.innerRadius}
        outerRadius={this.props.outerRadius}
        color={`${this.colors(i)}`}
      />
    );
  };

  public render(): JSX.Element {
    // const getClassNames = classNamesFunction<IPieProps, IPieStyles>();
    const { pie } = this.props;

    const piechart = pie(this.props.data),
      translate = `translate(${this.props.width / 2}, ${this.props.height / 2})`;

    return (
      <svg width={this.props.width} height={this.props.height}>
        <g transform={translate}>{piechart.map((d: IArcData, i: number) => this.arcGenerator(d, i))}</g>
      </svg>
    );
  }
}
