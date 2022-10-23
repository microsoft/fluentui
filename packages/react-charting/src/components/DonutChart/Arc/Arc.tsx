import * as React from 'react';
import * as shape from 'd3-shape';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { getStyles } from './Arc.styles';
import { IChartDataPoint } from '../index';
import { IArcProps, IArcStyles } from './index';
import { wrapTextInsideDonut } from '../../../utilities/index';

export interface IArcState {
  isCalloutVisible?: boolean;
}

const TEXT_PADDING: number = 5;

export class Arc extends React.Component<IArcProps, IArcState> {
  public static defaultProps: Partial<IArcProps> = {
    arc: shape.arc(),
  };

  public state: {} = {};

  private currentRef = React.createRef<SVGPathElement>();

  public static getDerivedStateFromProps(nextProps: Readonly<IArcProps>): Partial<IArcState> | null {
    _updateChart(nextProps);
    return null;
  }

  public updateChart(newProps: IArcProps): void {
    _updateChart(newProps);
  }

  public render(): JSX.Element {
    const { arc, href, focusedArcId } = this.props;
    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(getStyles, {
      color: this.props.color,
      href: href!,
      theme: this.props.theme!,
    });
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
          onClick={href ? this._redirectToUrl.bind(this, href) : this.props.data?.data.onClick}
          aria-labelledby={this.props.calloutId}
          role="text"
        />
        <text textAnchor={'middle'} className={classNames.insideDonutString} y={5}>
          {this.props.valueInsideDonut!}
        </text>
      </g>
    );
  }

  public componentDidUpdate(): void {
    const { href } = this.props;
    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(getStyles, {
      color: this.props.color,
      href: href!,
      theme: this.props.theme!,
    });

    wrapTextInsideDonut(classNames.insideDonutString, this.props.innerRadius! * 2 - TEXT_PADDING);
  }

  private _onFocus(data: IChartDataPoint, id: string): void {
    this.props.onFocusCallback!(data, id, this.currentRef.current);
  }

  private _hoverOn(data: IChartDataPoint, mouseEvent: React.MouseEvent<SVGPathElement>): void {
    mouseEvent.persist();
    this.props.hoverOnCallback!(data, mouseEvent);
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
