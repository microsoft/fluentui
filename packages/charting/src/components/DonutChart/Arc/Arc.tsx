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
    arc: shape.arc(),
  };

  private currentRef = React.createRef<SVGPathElement>();

  public static getDerivedStateFromProps(nextProps: Readonly<IArcProps>): Partial<IArcState> | null {
    _updateChart(nextProps);
    return null;
  }

  public updateChart(newProps: IArcProps): void {
    _updateChart(newProps);
  }

  public render(): JSX.Element {
    const { color, arc, href, valueInsideDonut, theme, focusedArcId } = this.props;
    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(getStyles, { color, href, theme });
    const id = this.props.uniqText! + this.props.data!.data.legend!.replace(/\s+/, '') + this.props.data!.data.data;
    const opacity: number =
      this.props.activeArc === this.props.data!.data.legend || this.props.activeArc === '' ? 1 : 0.1;
    return (
      <g ref={this.currentRef}>
        {!!focusedArcId && focusedArcId === id && (
          <path id={id + 'focusRing'} d={arc(this.props.focusData)} className={classNames.focusRing} />
        )}
        <path
          id={id}
          d={arc(this.props.data)}
          onFocus={this._onFocus.bind(this, this.props.data!.data, id)}
          className={classNames.root}
          data-is-focusable={true}
          onMouseOver={this._hoverOn.bind(this, this.props.data!.data)}
          onMouseMove={this._hoverOn.bind(this, this.props.data!.data)}
          onMouseLeave={this._hoverOff}
          onBlur={this._onBlur}
          opacity={opacity}
          onClick={this._redirectToUrl.bind(this, href)}
          aria-labelledby={this.props.calloutId}
        />
        <text textAnchor={'middle'} className={classNames.insideDonutString} y={5}>
          {valueInsideDonut}
        </text>
      </g>
    );
  }

  private _onFocus(data: IChartDataPoint, id: string): void {
    this.props.onFocusCallback!(data, id, this.currentRef.current);
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

  private _onBlur = (): void => {
    this.props.onBlurCallback!();
  };

  private _redirectToUrl(href: string | undefined): void {
    href ? (window.location.href = href) : '';
  }
}

function _updateChart(newProps: IArcProps): void {
  newProps.arc.innerRadius(newProps.innerRadius);
  newProps.arc.outerRadius(newProps.outerRadius);
}
