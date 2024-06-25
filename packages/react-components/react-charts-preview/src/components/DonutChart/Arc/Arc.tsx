import * as React from 'react';
import { arc as d3Arc } from 'd3-shape';
import { useArcStyles_unstable } from './Arc.styles';
import { IChartDataPoint } from '../index';
import { IArcProps, IArcStyles } from './index';
import { format as d3Format } from 'd3-format';
import { formatValueWithSIPrefix, isRtl } from '../../../utilities/index';

// Create a Arc within Donut Chart variant which uses these default styles and this styled subcomponent.
/**
 * Arc component within Donut Chart.
 * {@docCategory ArcDonutChart}
 */
export const Arc: React.FunctionComponent<IArcProps> = React.forwardRef<HTMLDivElement, IArcProps>(
  (props, forwardedRef) => {
    const currentRef = React.createRef<SVGPathElement>();
    const _isRTL: boolean = isRtl();
    const classes = useArcStyles_unstable(props);

    function _onFocus(data: IChartDataPoint, id: string): void {
      props.onFocusCallback!(data, id, currentRef.current);
    }

    function _hoverOn(data: IChartDataPoint, mouseEvent: React.MouseEvent<SVGPathElement>): void {
      mouseEvent.persist();
      props.hoverOnCallback!(data, mouseEvent);
    }

    function _hoverOff(): void {
      props.hoverLeaveCallback!();
    }

    function _onBlur(): void {
      props.onBlurCallback!();
    }

    function _redirectToUrl(href: string | undefined): void {
      href ? (window.location.href = href) : '';
    }

    function _getAriaLabel(): string {
      const point = props.data!.data;
      const legend = point.xAxisCalloutData || point.legend;
      const yValue = point.yAxisCalloutData || point.data || 0;
      return point.callOutAccessibilityData?.ariaLabel || (legend ? `${legend}, ` : '') + `${yValue}.`;
    }

    function _renderArcLabel(className: string) {
      const { arc, data, innerRadius, outerRadius, showLabelsInPercent, totalValue, hideLabels, activeArc } = props;

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
          textAnchor={angle > Math.PI !== _isRTL ? 'end' : 'start'}
          dominantBaseline={angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? 'hanging' : 'auto'}
          className={className}
          aria-hidden={true}
        >
          {showLabelsInPercent
            ? d3Format('.0%')(totalValue! === 0 ? 0 : arcValue / totalValue!)
            : formatValueWithSIPrefix(arcValue)}
        </text>
      );
    }

    function _updateChart(newProps: IArcProps): void {
      newProps.arc.innerRadius(newProps.innerRadius);
      newProps.arc.outerRadius(newProps.outerRadius);
    }
    function updateChart(newProps: IArcProps): void {
      _updateChart(newProps);
    }

    const { arc, href, focusedArcId } = props;
    const id = props.uniqText! + props.data!.data.legend!.replace(/\s+/, '') + props.data!.data.data;
    const opacity: number = props.activeArc === props.data!.data.legend || props.activeArc === '' ? 1 : 0.1;
    return (
      <g ref={currentRef}>
        {!!focusedArcId && focusedArcId === id && (
          <path id={id + 'focusRing'} d={arc(props.focusData)} className={classes.focusRing} />
        )}
        <path
          id={id}
          d={arc(props.data)}
          onFocus={_onFocus.bind(this, props.data!.data, id)}
          className={classes.root}
          data-is-focusable={props.activeArc === props.data!.data.legend || props.activeArc === ''}
          onMouseOver={_hoverOn.bind(this, props.data!.data)}
          onMouseMove={_hoverOn.bind(this, props.data!.data)}
          onMouseLeave={_hoverOff}
          onBlur={_onBlur}
          opacity={opacity}
          onClick={href ? _redirectToUrl.bind(this, href) : props.data?.data.onClick}
          aria-label={_getAriaLabel()}
          role="img"
        />
        {_renderArcLabel(classes.arcLabel)}
      </g>
    );
  },
);
Arc.displayName = 'Arc';
