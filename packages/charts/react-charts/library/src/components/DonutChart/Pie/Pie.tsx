'use client';

/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { pie as d3Pie } from 'd3-shape';
import type { PieProps } from './index';
import { Arc } from '../Arc/index';
import type { ChartDataPoint } from '../index';
import { pieInsideDonutStringClassName, usePieStyles } from './usePieStyles.styles';
import { wrapTextInsideDonut } from '../../../utilities/index';
const TEXT_PADDING: number = 5;

// Create a Pie within Donut Chart variant which uses these default styles and this styled subcomponent.
/**
 * Pie component within Donut Chart.
 * {@docCategory PieDonutChart}
 */
export const Pie: React.FunctionComponent<PieProps> = React.forwardRef<HTMLDivElement, PieProps>(
  (props, forwardedRef) => {
    const rootNode = React.useRef<SVGGElement | null>(null);
    React.useEffect(() => {
      // `wrapTextInsideDonut` interpolates this argument into `` `.${selectorClass}` ``, so it must
      // be ONE class token. `classes.insideDonutString` is a clsx composition that grows extra
      // tokens as soon as a consumer passes `className`/`styles.insideDonutString` to <Pie>, at
      // which point the selector silently matches nothing. Pass the module local directly — it is
      // the same token the composition leads with today, so nothing about the render changes.
      //
      // The wrap is SCOPED to this Pie's own `<g>` (third argument): the module local is shared
      // by every Pie on the page, so an unscoped call would re-wrap the center text of every
      // mounted DonutChart using THIS Pie's radius. The deps re-run the wrap when the radius or
      // the value changes (the `key` on the `<text>` below recreates the node on value change,
      // because the wrap replaces React's text child with tspans and a detached text node would
      // otherwise swallow the update).
      wrapTextInsideDonut(pieInsideDonutStringClassName, props.innerRadius! * 2 - TEXT_PADDING, rootNode.current);
    }, [props.innerRadius, props.valueInsideDonut]);

    let _totalValue: number;
    const classes = usePieStyles(props);
    const pieForFocusRing = d3Pie()
      .sort(null)

      .value((d: any) => d.data)
      .padAngle(0);

    function _focusCallback(
      data: ChartDataPoint,
      id: string,
      e: React.FocusEvent<SVGPathElement>,
      targetElement?: HTMLElement | null,
    ): void {
      props.onFocusCallback!(data, id, e, targetElement);
    }

    function _hoverCallback(
      data: ChartDataPoint,
      e: React.MouseEvent<SVGPathElement>,
      targetElement?: HTMLElement | null,
    ): void {
      props.hoverOnCallback!(data, e, targetElement);
    }

    function _computeTotalValue() {
      let totalValue = 0;
      props.data.forEach((arc: ChartDataPoint) => {
        totalValue += arc.data!;
      });
      return totalValue;
    }

    function arcGenerator(d: any, i: number, focusData: any, href?: string): JSXElement {
      const color = d && d.data && d.data.color;
      return (
        <Arc
          key={i}
          data={d}
          focusData={focusData}
          innerRadius={props.innerRadius}
          outerRadius={props.outerRadius}
          color={color!}
          onFocusCallback={_focusCallback}
          hoverOnCallback={_hoverCallback}
          onBlurCallback={props.onBlurCallback}
          hoverLeaveCallback={props.hoverLeaveCallback}
          uniqText={props.uniqText}
          activeArc={props.activeArc}
          href={href}
          calloutId={props.calloutId}
          valueInsideDonut={props.valueInsideDonut}
          focusedArcId={props.focusedArcId}
          showLabelsInPercent={props.showLabelsInPercent}
          totalValue={_totalValue}
          hideLabels={props.hideLabels}
        />
      );
    }

    const { data } = props;

    // Filter out data points with value 0 to avoid gaps in the donut chart
    const filteredData = data.filter((d: ChartDataPoint) => d.data !== 0);

    const focusData = pieForFocusRing(filteredData.map(d => d.data!));

    const piechart = d3Pie<ChartDataPoint>()
      .sort(null)

      .value((d: any) => d.data)
      .padAngle(0.02)(filteredData);
    const translate = `translate(${props.width / 2}, ${props.height / 2})`;

    _totalValue = _computeTotalValue();

    return (
      // `classes.root` carries Pie's `group/fui-donut-pie` marker — the only addressable handle
      // on anything Pie renders, since `insideDonutString` is a hashed module local. `.root` in
      // Pie.module.css is identity-only, so this adds a class token and changes no pixel.
      <g
        ref={rootNode}
        className={classes.root}
        transform={translate}
        role="listbox"
        aria-label={`Donut chart with ${piechart.length} slices`}
      >
        {piechart.map((d: any, i: number) => arcGenerator(d, i, focusData[i], props.href))}
        {props.valueInsideDonut && (
          <text
            key={`value-inside-donut-${props.valueInsideDonut}`}
            y={5}
            textAnchor="middle"
            dominantBaseline="middle"
            className={classes.insideDonutString}
          >
            {props.valueInsideDonut}
          </text>
        )}
      </g>
    );
  },
);
Pie.displayName = 'Pie';
