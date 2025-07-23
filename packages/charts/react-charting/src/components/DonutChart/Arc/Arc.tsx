import * as React from 'react';
import { arc as d3Arc } from 'd3-shape';
import { classNamesFunction, getId, getRTL } from '@fluentui/react/lib/Utilities';
import { getStyles } from './Arc.styles';
import { IChartDataPoint } from '../index';
import { IArcProps, IArcStyleProps, IArcStyles } from './index';
import { format as d3Format } from 'd3-format';
import { formatScientificLimitWidth } from '../../../utilities/index';

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

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public render(): JSX.Element {
    const { arc, href, focusedArcId, activeArc } = this.props;
    const getClassNames = classNamesFunction<IArcStyleProps, IArcStyles>();
    const id =
      this.props.uniqText! +
      (typeof this.props.data!.data.legend === 'string' ? this.props.data!.data.legend.replace(/\s+/g, '') : '') +
      this.props.data!.data.data;
    const opacity: number =
      activeArc && activeArc.length > 0 ? (activeArc.includes(this.props.data?.data.legend!) ? 1 : 0.1) : 1;
    const startAngle = this.props.data?.startAngle ?? 0;
    const endAngle = (this.props.data?.endAngle ?? 0) - startAngle;
    const cornerRadius = this.props.roundCorners ? 3 : 0;

    const classNames = getClassNames(getStyles, {
      solidFill: this.props.enableGradient ? 'transparent' : this.props.color,
      gradientFill: `conic-gradient(
          from ${startAngle}rad,
          ${this.props.color},
          ${this.props.nextColor} ${endAngle}rad
        )`,
      href: href!,
      theme: this.props.theme!,
      opacity,
    });

    const clipId = getId('Arc_clip') + `${this.props.color}_${this.props.nextColor}`;

    return (
      <g ref={this.currentRef}>
        {!!focusedArcId && focusedArcId === id && (
          <path
            id={id + 'focusRing'}
            d={arc.cornerRadius(cornerRadius)(this.props.focusData)}
            className={classNames.focusRing}
          />
        )}

        <path
          id={id}
          d={arc.cornerRadius(cornerRadius)(this.props.data)}
          onFocus={this._onFocus.bind(this, this.props.data!.data, id)}
          className={classNames.root}
          data-is-focusable={
            this._shouldHighlightArc(this.props.data!.data.legend!) || this.props.activeArc?.length === 0
          }
          onMouseOver={this._hoverOn.bind(this, this.props.data!.data)}
          onMouseMove={this._hoverOn.bind(this, this.props.data!.data)}
          onMouseLeave={this._hoverOff}
          onBlur={this._onBlur}
          onClick={href ? this._redirectToUrl.bind(this, href) : this.props.data?.data.onClick}
          aria-label={this._getAriaLabel()}
          role="img"
        />
        {this._renderArcLabel(classNames.arcLabel)}

        {this.props.enableGradient && (
          <>
            <clipPath id={clipId}>
              <path d={arc.cornerRadius(cornerRadius)(this.props.data)} />
            </clipPath>
            <foreignObject x="-50%" y="-50%" width="100%" height="100%" clipPath={`url(#${clipId})`}>
              <div className={classNames.gradientArc} />
            </foreignObject>
          </>
        )}
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

  private _shouldHighlightArc = (legend?: string): boolean => {
    const { activeArc } = this.props;
    // If no activeArc is provided, highlight all arcs. Otherwise, only highlight the arcs that are active.
    return !activeArc || activeArc.length === 0 || legend === undefined || activeArc.includes(legend);
  };

  private _renderArcLabel = (className: string) => {
    const { arc, data, innerRadius, outerRadius, showLabelsInPercent, totalValue, hideLabels } = this.props;
    if (
      hideLabels ||
      Math.abs(data!.endAngle - data!.startAngle) < Math.PI / 12 ||
      !this._shouldHighlightArc(data!.data.legend!)
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
          : formatScientificLimitWidth(arcValue)}
      </text>
    );
  };
}

function _updateChart(newProps: IArcProps): void {
  newProps.arc.innerRadius(newProps.innerRadius);
  newProps.arc.outerRadius(newProps.outerRadius);
}
