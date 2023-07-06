import * as React from 'react';
import * as shape from 'd3-shape';
import { IPieProps } from './Pie.types';
import { LabeledArc } from '../Arc/Arc';
import { IArcData } from '../Arc/Arc.types';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';

export class Pie extends React.Component<IPieProps, { focussedPie: string }> {
  public static defaultProps: Partial<IPieProps> = {
    pie: shape
      .pie()
      .sort(null)
      /* eslint-disable @typescript-eslint/no-explicit-any */
      .value((d: any) => d.y),
  };

  constructor(props: IPieProps) {
    super(props);
    this.state = { focussedPie: '' };
  }

  public render(): JSX.Element {
    // const getClassNames = classNamesFunction<IPieProps, IPieStyles>();
    const { pie, colors, data, width, height, chartTitle } = this.props;

    const piechart = pie(data);
    const translate = `translate(${width / 2}, ${height / 2})`;

    return (
      <FocusZone direction={FocusZoneDirection.domOrder}>
        <svg width={width} height={height} aria-label={chartTitle}>
          <g transform={translate}>
            {piechart.map((d: IArcData, i: number) => (
              <LabeledArc
                culture={this.props.culture}
                key={i}
                data={d}
                innerRadius={this.props.innerRadius}
                outerRadius={this.props.outerRadius}
                color={colors[i]}
                theme={this.props.theme}
                onPieFocussed={this._onPieFocussed}
              />
            ))}
            <use xlinkHref={`#${this.state.focussedPie}`} />
          </g>
        </svg>
      </FocusZone>
    );
  }

  private _onPieFocussed = (id: string) => {
    this.setState({ focussedPie: id });
  };
}
