import * as React from 'react';
import { arc as d3Arc } from 'd3-shape';
import { useArcStyles } from './useArcStyles.styles';
import { ChartDataPoint } from '../index';
import { ArcProps } from './index';
import { format as d3Format } from 'd3-format';
import { formatScientificLimitWidth, useRtl } from '../../../utilities/index';

// Create a Arc within Donut Chart variant which uses these default styles and this styled subcomponent.
/**
 * Arc component within Donut Chart.
 * {@docCategory ArcDonutChart}
 */
export const Arc: React.FunctionComponent<ArcProps> = React.forwardRef<HTMLDivElement, ArcProps>(
  (props, forwardedRef) => {
    const arc = d3Arc();
    const currentRef = React.createRef<SVGPathElement>();
    const _isRTL: boolean = useRtl();
    const classes = useArcStyles(props);

    React.useEffect(() => {
      _updateChart(props);
    }, [props]);

    function _onFocus(data: ChartDataPoint, id: string, event: React.FocusEvent<SVGPathElement, Element>): void {
      props.onFocusCallback!(data, id, event, currentRef.current);
    }

    function _hoverOn(data: ChartDataPoint, mouseEvent: React.MouseEvent<SVGPathElement>): void {
      mouseEvent.persist();
      props.hoverOnCallback!(data, mouseEvent);
    }

    function _hoverOff(): void {
      props.hoverLeaveCallback!();
    }

    function _onBlur(): void {
      props.onBlurCallback!();
    }

    function _getAriaLabel(): string {
      const point = props.data!.data;
      const legend = point.xAxisCalloutData || point.legend;
      const yValue = point.yAxisCalloutData || point.data || 0;
      return point.callOutAccessibilityData?.ariaLabel || (legend ? `${legend}, ` : '') + `${yValue}.`;
    }

    function _shouldHighlightArc(legend?: string): boolean {
      const { activeArc } = props;
      // If no activeArc is provided, highlight all arcs. Otherwise, only highlight the arcs that are active.
      return !activeArc || activeArc.length === 0 || legend === undefined || activeArc.includes(legend);
    }

    function _renderArcLabel(className: string) {
      const { data, innerRadius, outerRadius, showLabelsInPercent, totalValue, hideLabels } = props;

      if (
        hideLabels ||
        Math.abs(data!.endAngle - data!.startAngle) < Math.PI / 12 ||
        !_shouldHighlightArc(data!.data.legend!)
      ) {
        return null;
      }

      const [base, perp] = arc.centroid({ ...data!, innerRadius, outerRadius });
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
            : formatScientificLimitWidth(arcValue)}
        </text>
      );
    }

    function _updateChart(newProps: ArcProps): void {
      if (newProps.arc && newProps.innerRadius && newProps.outerRadius) {
        newProps.arc.innerRadius(newProps.innerRadius);
        newProps.arc.outerRadius(newProps.outerRadius);
      }
    }

    const { href, focusedArcId, activeArc } = props;
    //TO DO 'replace' is throwing error
    const id =
      props.uniqText! +
      (typeof props.data!.data.legend === 'string' ? props.data!.data.legend.replace(/\s+/g, '') : '') +
      props.data!.data.data;
    const opacity: number =
      activeArc && activeArc.length > 0 ? (activeArc.includes(props.data?.data.legend!) ? 1 : 0.1) : 1;
    const cornerRadius = props.roundCorners ? 3 : 0;
    return (
      <g ref={currentRef}>
        {!!focusedArcId && focusedArcId === id && (
          // TODO innerradius and outerradius were absent
          <path
            id={id + 'focusRing'}
            d={
              arc.cornerRadius(cornerRadius)({
                ...props.data!,
                innerRadius: props.innerRadius,
                outerRadius: props.outerRadius,
              })!
            }
            className={classes.focusRing}
          />
        )}
        <path
          // TODO innerradius and outerradius were absent
          id={id}
          d={
            arc.cornerRadius(cornerRadius)({
              ...props.data!,
              innerRadius: props.innerRadius,
              outerRadius: props.outerRadius,
            })!
          }
          className={classes.root}
          style={{ fill: props.color, cursor: href ? 'pointer' : 'default' }}
          onFocus={event => _onFocus(props.data!.data, id, event)}
          onMouseOver={event => _hoverOn(props.data!.data, event)}
          onMouseMove={event => _hoverOn(props.data!.data, event)}
          onMouseLeave={_hoverOff}
          tabIndex={_shouldHighlightArc(props.data!.data.legend!) || props.activeArc?.length === 0 ? 0 : undefined}
          onBlur={_onBlur}
          opacity={opacity}
          onClick={props.data?.data.onClick}
          aria-label={_getAriaLabel()}
          role="img"
        />
        {_renderArcLabel(classes.arcLabel)}
      </g>
    );
  },
);
Arc.displayName = 'Arc';
