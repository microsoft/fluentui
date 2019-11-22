import * as React from 'react';
import * as shape from 'd3-shape';
import { IArcProps, IArcStyles } from './Arc.types';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles } from './Arc.styles';
import { IChartDataPoint } from '../index';

export interface IArcState {
  isCalloutVisible?: boolean;
}

export class Arc extends React.Component<IArcProps, IArcState> {
  public static defaultProps: Partial<IArcProps> = {
    arc: shape.arc()
  };

  public state: IArcState = {};

  public static getDerivedStateFromProps(nextProps: Readonly<IArcProps>): Partial<IArcState> | null {
    _updateChart(nextProps);
    return null;
  }

  public updateChart(newProps: IArcProps): void {
    _updateChart(newProps);
  }

  public render(): JSX.Element {
    const { color, arc, href } = this.props;
    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(getStyles, { color, href });
    const id = this.props.uniqText! + this.props.data!.data.legend!.replace(/\s+/, '') + this.props.data!.data.data;
    const opacity: number = this.props.activeArc === this.props.data!.data.legend || this.props.activeArc === '' ? 1 : 0.1;
    return (
      <g>
        <path
          id={id}
          d={arc(this.props.data)}
          className={classNames.root}
          onMouseOver={this._hoverOn.bind(this, this.props.data!.data)}
          onMouseMove={this._hoverOn.bind(this, this.props.data!.data)}
          onMouseLeave={this._hoverOff}
          opacity={opacity}
          onClick={this._redirectToUrl.bind(this, href)}
        />
      </g>
    );
  }
  private _hoverOn(data: IChartDataPoint, mouseEvent: React.MouseEvent<SVGPathElement>): void {
    mouseEvent.persist();
    if (this.props.activeArc === this.props.data!.data.legend || this.props.activeArc === '') {
      this.props.hoverOnCallback!(data, mouseEvent);
    }
  }

  private _hoverOff = (): void => {
    this.props.hoverLeaveCallback!();
  };

  private _redirectToUrl(href: string | undefined): void {
    href ? (window.location.href = href) : '';
  }
}

function _updateChart(newProps: IArcProps): void {
  newProps.arc.innerRadius(newProps.innerRadius);
  newProps.arc.outerRadius(newProps.outerRadius);
}
