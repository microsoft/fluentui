import * as React from 'react';
import * as shape from 'd3-shape';
import { IArcProps, IArcStyles } from './Arc.types';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles } from './Arc.styles';
import { IChartDataPoint } from '../index';

export class Arc extends React.Component<IArcProps, { isCalloutVisible: boolean }> {
  public static defaultProps: Partial<IArcProps> = {
    arc: shape.arc()
  };
  constructor(props: IArcProps) {
    super(props);
    this.state = {
      isCalloutVisible: false
    };
    this._hoverOff = this._hoverOff.bind(this);
  }

  public updateChart(newProps: IArcProps): void {
    newProps.arc.innerRadius(newProps.innerRadius);
    newProps.arc.outerRadius(newProps.outerRadius);
  }

  public componentWillMount(): void {
    this.updateChart(this.props);
  }

  public componentWillReceiveProps(newProps: IArcProps): void {
    this.updateChart(newProps);
  }

  public render(): JSX.Element {
    const { color, arc } = this.props;
    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(getStyles, { color });
    const id = this.props.uniqText! + this.props.data!.data.legend!.replace(/\s+/, '') + this.props.data!.data.data;
    const opacity: number =
      this.props.activeArc === this.props.data!.data.legend || this.props.activeArc === '' ? 1 : 0.1;
    return (
      <g>
        <path
          id={id}
          d={arc(this.props.data)}
          className={classNames.root}
          onMouseOver={this._hoverOn.bind(this, this.props.data!.data, id)}
          onMouseLeave={this._hoverOff}
          opacity={opacity}
        />
      </g>
    );
  }
  private _hoverOn(data: IChartDataPoint, id: string): void {
    if (this.props.activeArc === this.props.data!.data.legend || this.props.activeArc === '') {
      this.props.hoverOnCallback!(data);
    }
  }
  private _hoverOff(): void {
    this.props.hoverLeaveCallback!();
  }
}
