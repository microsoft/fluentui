import * as React from 'react';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import { IPieProps } from './Pie.types';
import { LabeledArc } from '../Arc/Arc';
import { IArcData } from '../Arc/Arc.types';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';

export class Pie extends React.Component<IPieProps, {}> {
  public static defaultProps: Partial<IPieProps> = {
    pie: shape
      .pie()
      .padAngle(0.01)
      .sort(null)
      /* eslint-disable @typescript-eslint/no-explicit-any */
      .value((d: any) => d.y),
  };
  private colors: scale.ScaleOrdinal<string | number, any>;

  constructor(props: IPieProps) {
    super(props);
  }

  public arcGenerator = (d: IArcData, i: number): JSX.Element => {
    return (
      <LabeledArc
        culture={this.props.culture}
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
    const { pie, colors, data, width, height, chartTitle } = this.props;

    this.colors = scale.scaleOrdinal().range(colors!);

    const piechart = pie(data);
    const translate = `translate(${width / 2}, ${height / 2})`;

    return (
      <FocusZone direction={FocusZoneDirection.domOrder}>
        <svg width={width} height={height} aria-label={chartTitle}>
          <g transform={translate}>{piechart.map((d: IArcData, i: number) => this.arcGenerator(d, i))}</g>
        </svg>
      </FocusZone>
    );
  }
}
