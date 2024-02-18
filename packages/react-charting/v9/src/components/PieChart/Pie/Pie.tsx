import * as React from 'react';
import { pie as d3Pie } from 'd3-shape';
import { ScaleOrdinal, scaleOrdinal } from 'd3-scale';
import { IPieProps } from './Pie.types';
import { LabeledArc } from '../Arc/Arc';
import { IArcData } from '../Arc/Arc.types';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { getColorFromToken, getNextColor } from '../../../utilities/colors';

export class Pie extends React.Component<IPieProps, {}> {
  public static defaultProps: Partial<IPieProps> = {
    pie: d3Pie()
      .padAngle(0.01)
      .sort(null)
      /* eslint-disable @typescript-eslint/no-explicit-any */
      .value((d: any) => d.y),
  };
  private colors: ScaleOrdinal<string | number, any>;

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
        theme={this.props.theme}
      />
    );
  };

  public render(): JSX.Element {
    // const getClassNames = classNamesFunction<IPieProps, IPieStyles>();
    const { pie, data, width, height, chartTitle, theme } = this.props;

    const defaultColors: Array<string> = [];
    if (data && !this.props.colors) {
      for (let i = 0; i < data.length; i++) {
        defaultColors.push(getNextColor(i, 0, theme?.isInverted));
      }
    }
    const { colors = defaultColors } = this.props;

    this.colors = scaleOrdinal().range(colors.map(color => getColorFromToken(color)));

    const piechart = pie(data);
    const translate = `translate(${width / 2}, ${height / 2})`;

    return (
      <FocusZone direction={FocusZoneDirection.domOrder}>
        <svg width={width} height={height} aria-label={chartTitle}>
          <g className="pie" transform={translate}>
            {piechart.map((d: IArcData, i: number) => this.arcGenerator(d, i))}
          </g>
        </svg>
      </FocusZone>
    );
  }
}
