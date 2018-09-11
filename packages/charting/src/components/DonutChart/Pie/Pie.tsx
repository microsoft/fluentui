import * as React from 'react';
import * as shape from 'd3-shape';
import { IPieProps } from './Pie.types';
import { Arc } from '../Arc/Arc';
import { IArcData } from '../Arc/Arc.types';
import { IChartDataPoint } from '../index';

export class Pie extends React.Component<IPieProps, {}> {
  public static defaultProps: Partial<IPieProps> = {
    pie: shape
      .pie()
      .sort(null)
      // tslint:disable:no-any
      .value((d: any) => {
        return d.data;
      })
  };
  constructor(props: IPieProps) {
    super(props);
    this._hoverCallback = this._hoverCallback.bind(this);
  }

  public arcGenerator = (d: IArcData, i: number): JSX.Element => {
    const color = d && d.data && d.data.color;
    return (
      <Arc
        key={i}
        data={d}
        innerRadius={this.props.innerRadius}
        outerRadius={this.props.outerRadius}
        color={color!}
        hoverOnCallback={this._hoverCallback}
        hoverLeaveCallback={this.props.hoverLeaveCallback}
        uniqText={this.props.uniqText}
        activeArc={this.props.activeArc}
      />
    );
  };

  public render(): JSX.Element {
    const { pie, data, width, height } = this.props;

    const piechart = pie(data),
      translate = `translate(${width / 2}, ${height / 2})`;

    return <g transform={translate}>{piechart.map((d: IArcData, i: number) => this.arcGenerator(d, i))}</g>;
  }
  private _hoverCallback(data: IChartDataPoint): void {
    this.props.hoverOnCallback!(data);
  }
}
