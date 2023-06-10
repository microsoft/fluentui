import * as React from 'react';
import * as shape from 'd3-shape';
import { getRTL } from '@fluentui/react/lib/Utilities';
import { useStyles } from './Arc.styles';
import { IChartDataPoint } from '../index';
import { IArcProps } from './index';
import { format as d3Format, formatPrefix as d3FormatPrefix } from 'd3-format';
import { mergeClasses } from '@fluentui/react-components';

export interface IArcState {
  isCalloutVisible?: boolean;
}

export const Arc = (props: IArcProps) => {
  const arc = React.useRef(shape.arc());

  const currentRef = React.useRef<SVGPathElement>(null);
  const _isRTL = React.useRef<boolean>(getRTL());

  const _onFocus = React.useCallback(
    (data: IChartDataPoint, id: string): void => {
      props.onFocusCallback!(data, id, currentRef.current);
    },
    [props.onFocusCallback],
  );

  const _hoverOn = React.useCallback(
    (data: IChartDataPoint, mouseEvent: React.MouseEvent<SVGPathElement>): void => {
      mouseEvent.persist();
      props.hoverOnCallback!(data, mouseEvent);
    },
    [props.hoverOnCallback],
  );

  const _hoverOff = React.useCallback((): void => {
    props.hoverLeaveCallback!();
  }, [props.hoverLeaveCallback]);

  const _onBlur = React.useCallback((): void => {
    props.onBlurCallback!();
  }, [props.onBlurCallback]);

  const _redirectToUrl = React.useCallback((href: string | undefined): void => {
    href ? (window.location.href = href) : '';
  }, []);

  const _getAriaLabel = React.useCallback((): string => {
    const point = props.data!.data;
    const legend = point.xAxisCalloutData || point.legend;
    const yValue = point.yAxisCalloutData || point.data || 0;
    return point.callOutAccessibilityData?.ariaLabel || (legend ? `${legend}, ` : '') + `${yValue}.`;
  }, [props.data]);

  const _renderArcLabel = React.useCallback(
    (className: string) => {
      const { data, innerRadius, outerRadius, showLabelsInPercent, totalValue, hideLabels } = props;

      if (hideLabels || Math.abs(data!.endAngle - data!.startAngle) < Math.PI / 12) {
        return null;
      }

      const [base, perp] = arc.current.centroid({ ...data!, innerRadius: innerRadius!, outerRadius: outerRadius! });
      const hyp = Math.sqrt(base * base + perp * perp);
      const labelRadius = Math.max(innerRadius!, outerRadius!) + 2;
      const angle = (data!.startAngle + data!.endAngle) / 2;
      const arcValue = data!.value;

      return (
        <text
          x={(hyp === 0 ? 0 : base / hyp) * labelRadius}
          y={(hyp === 0 ? 0 : perp / hyp) * labelRadius}
          textAnchor={angle > Math.PI !== _isRTL.current ? 'end' : 'start'}
          dominantBaseline={angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? 'hanging' : 'auto'}
          className={className}
          aria-hidden={true}
        >
          {showLabelsInPercent
            ? d3Format('.0%')(totalValue! === 0 ? 0 : arcValue / totalValue!)
            : d3FormatPrefix(arcValue < 1000 ? '.2~' : '.1', arcValue)(arcValue)}
        </text>
      );
    },
    [props],
  );

  const { href, focusedArcId, innerRadius, outerRadius } = props;
  const myStyle = useStyles();
  const id = props.uniqText! + props.data!.data.legend!.replace(/\s+/, '') + props.data!.data.data;
  const opacity: number = props.activeArc === props.data!.data.legend || props.activeArc === '' ? 1 : 0.1;
  return (
    <g ref={currentRef}>
      {!!focusedArcId && focusedArcId === id && (
        <path
          id={id + 'focusRing'}
          d={arc.current({ ...props.focusData!, innerRadius: innerRadius!, outerRadius: outerRadius! })!}
          className={myStyle.focusRing}
        />
      )}
      <path
        id={id}
        d={arc.current({ ...props.data!, innerRadius: innerRadius!, outerRadius: outerRadius! })!}
        onFocus={() => _onFocus(props.data!.data, id)}
        className={mergeClasses(myStyle.root, href && myStyle.href)}
        style={{ fill: props.color }}
        data-is-focusable={true}
        onMouseOver={mouseEvent => _hoverOn(props.data!.data, mouseEvent)}
        onMouseMove={mouseEvent => _hoverOn(props.data!.data, mouseEvent)}
        onMouseLeave={_hoverOff}
        onBlur={_onBlur}
        opacity={opacity}
        onClick={href ? () => _redirectToUrl(href) : props.data?.data.onClick}
        aria-label={_getAriaLabel()}
        role="img"
      />
      {_renderArcLabel(myStyle.arcLabel)}
    </g>
  );
};
