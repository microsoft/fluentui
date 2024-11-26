import * as React from 'react';
import { arc as d3Arc } from 'd3-shape';
import { useArcStyles_unstable } from './useArcStyles.styles';
import { ChartDataPoint } from '../index';
import { ArcProps } from './index';
import { format as d3Format } from 'd3-format';
import { formatValueWithSIPrefix, useRtl } from '../../../utilities/index';
import { useId } from '@fluentui/react-utilities';

// Create a Arc within Donut Chart variant which uses these default styles and this styled subcomponent.
/**
 * Arc component within Donut Chart.
 * {@docCategory ArcDonutChart}
 */
export const Arc: React.FunctionComponent<ArcProps> = React.forwardRef<HTMLDivElement, ArcProps>(
  (props, forwardedRef) => {
    const arc = d3Arc().cornerRadius(5);
    const currentRef = React.createRef<SVGPathElement>();
    const _isRTL: boolean = useRtl();
    const classes = useArcStyles_unstable(props);

    React.useEffect(() => {
      _updateChart(props);
    }, [props]);

    function _onFocus(data: ChartDataPoint, id: string): void {
      props.onFocusCallback!(data, id, currentRef.current);
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

    function _renderArcLabel(className: string) {
      const { data, innerRadius, outerRadius, showLabelsInPercent, totalValue, hideLabels, activeArc } = props;

      if (
        hideLabels ||
        Math.abs(data!.endAngle - data!.startAngle) < Math.PI / 12 ||
        (activeArc !== data!.data.legend && activeArc !== '')
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
            : formatValueWithSIPrefix(arcValue)}
        </text>
      );
    }

    function _updateChart(newProps: ArcProps): void {
      if (newProps.arc && newProps.innerRadius && newProps.outerRadius) {
        newProps.arc.innerRadius(newProps.innerRadius);
        newProps.arc.outerRadius(newProps.outerRadius);
      }
    }

    const { href, focusedArcId } = props;
    //TO DO 'replace' is throwing error
    const id = props.uniqText! + props.data!.data.legend!.replace(/\s+/, '') + props.data!.data.data;
    const opacity: number = props.activeArc === props.data!.data.legend || props.activeArc === '' ? 1 : 0.1;

    // check if gradient ([string, string]) or color (string) is provided
    const useGradient = Array.isArray(props.color);
    const clipId = useId('Arc_clip') + (useGradient ? `${props.color[0]}_${props.color[1]}` : (props.color as string));

    const fill = useGradient
      ? `conic-gradient(
      from ${props.data?.startAngle}rad,
      ${props.color[0]},
      ${props.color[1]} ${props.data!.endAngle - props.data!.startAngle}rad
    )`
      : (props.color as string);

    const pathData = arc({ ...props.data!, innerRadius: props.innerRadius, outerRadius: props.outerRadius })!;
    const focusPathData = arc({ ...props.focusData!, innerRadius: props.innerRadius, outerRadius: props.outerRadius })!;

    return (
      <g ref={currentRef}>
        {!!focusedArcId && focusedArcId === id && (
          // TODO innerradius and outerradius were absent
          <path id={id + 'focusRing'} d={focusPathData} className={classes.focusRing} />
        )}
        <path
          // TODO innerradius and outerradius were absent
          id={id}
          d={pathData}
          style={{ fill: 'transparent', cursor: href ? 'pointer' : 'default' }}
          onFocus={_onFocus.bind(this, props.data!.data, id)}
          data-is-focusable={props.activeArc === props.data!.data.legend || props.activeArc === ''}
          onMouseOver={_hoverOn.bind(this, props.data!.data)}
          onMouseMove={_hoverOn.bind(this, props.data!.data)}
          onMouseLeave={_hoverOff}
          onBlur={_onBlur}
          onClick={props.data?.data.onClick}
          aria-label={_getAriaLabel()}
          role="img"
        />
        {/* clipping mask  */}
        <clipPath id={clipId}>
          <path d={pathData} />
        </clipPath>
        {/* div to attach conic-gradient fill to */}
        <foreignObject x="-50%" y="-50%" width="100%" height="100%" clipPath={`url(#${clipId})`}>
          <div
            className={classes.root}
            style={{
              width: '100%',
              height: '100%',
              background: fill,
              opacity,
            }}
          />
        </foreignObject>
        {_renderArcLabel(classes.arcLabel)}
      </g>
    );
  },
);
Arc.displayName = 'Arc';
