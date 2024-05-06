import * as React from 'react';
import { arc as d3Arc } from 'd3-shape';
import { classNamesFunction, getRTL } from '@fluentui/react/lib/Utilities';
import { getStyles } from './Arc.styles';
import { IChartDataPoint } from '../index';
import { IArcProps, IArcStyles } from './index';
import { format as d3Format } from 'd3-format';
import { formatValueWithSIPrefix } from '../../../utilities/index';

export interface IArcState {
  isCalloutVisible?: boolean;
}

export class Arc extends React.Component<IArcProps, IArcState> {
  public static defaultProps: Partial<IArcProps> = {
    arc: d3Arc(),
  };

  public state: {} = {};

  private currentRef = React.createRef<SVGPathElement>();
  private _isRTL: boolean = getRTL();

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
          data-is-focusable={this.props.activeArc === this.props.data!.data.legend || this.props.activeArc === ''}
          onMouseOver={this._hoverOn.bind(this, this.props.data!.data)}
          onMouseMove={this._hoverOn.bind(this, this.props.data!.data)}
          onMouseLeave={this._hoverOff}
          onBlur={this._onBlur}
          opacity={opacity}
          onClick={href ? this._redirectToUrl.bind(this, href) : this.props.data?.data.onClick}
          aria-label={this._getAriaLabel()}
          role="img"
        />
        {this._renderArcLabel(classNames.arcLabel)}
      </g>
    );
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

  private _getAriaLabel = (): string => {
    const point = this.props.data!.data;
    const legend = point.xAxisCalloutData || point.legend;
    const yValue = point.yAxisCalloutData || point.data || 0;
    return point.callOutAccessibilityData?.ariaLabel || (legend ? `${legend}, ` : '') + `${yValue}.`;
  };

  private _renderArcLabel = (className: string) => {
    const { arc, data, innerRadius, outerRadius, showLabelsInPercent, totalValue, hideLabels, activeArc } = this.props;

    if (
      hideLabels ||
      Math.abs(data!.endAngle - data!.startAngle) < Math.PI / 12 ||
      (activeArc !== data!.data.legend && activeArc !== '')
    ) {
      return null;
    }

    const [base, perp] = arc.centroid(data);
    const hyp = Math.sqrt(base * base + perp * perp);
    const labelRadius = Math.max(innerRadius!, outerRadius!) + 2;
    const angle = (data!.startAngle + data!.endAngle) / 2;
    const arcValue = data!.value;

    return (
      <text
        x={(hyp === 0 ? 0 : base / hyp) * labelRadius}
        y={(hyp === 0 ? 0 : perp / hyp) * labelRadius}
        textAnchor={angle > Math.PI !== this._isRTL ? 'end' : 'start'}
        dominantBaseline={angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? 'hanging' : 'auto'}
        className={className}
        aria-hidden={true}
      >
        {showLabelsInPercent
          ? d3Format('.0%')(totalValue! === 0 ? 0 : arcValue / totalValue!)
          : formatValueWithSIPrefix(arcValue)}
      </text>
    );
  };
}

function _updateChart(newProps: IArcProps): void {
  newProps.arc.innerRadius(newProps.innerRadius);
  newProps.arc.outerRadius(newProps.outerRadius);
}
