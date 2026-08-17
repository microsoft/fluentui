/*
 * NOTE: this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — both `makeStyles`'s
 * `useStyles()` and the `useRtl()` branch are gone (the RTL rule is now `@variant rtl` in
 * the module) — so `enforce-use-client` reports the directive as unnecessary. Same split as
 * react-badge's Badge (no directive) vs CounterBadge (kept it because it still calls a hook).
 * `CartesianChart.tsx`, which does use hooks, keeps its own.
 */

import { clsx } from 'clsx';
import type { CartesianChartProps, CartesianChartStyles } from './CartesianChart.types';
import { CARTESIAN_XAXIS_CLASSNAME } from '../../utilities/utilities';

import styles from './CartesianChart.module.css';

/**
 * Public identity classes for CartesianChart.
 *
 * @internal
 */
export const cartesianchartClassNames: { root: string; xAxis: string } = {
  root: 'group/fui-cartesian-chart',
  xAxis: CARTESIAN_XAXIS_CLASSNAME,
};

/**
 * The single module-local token carried by the y-axis `<g>`, exposed on its own so
 * `CartesianChart.tsx` can build a d3/`querySelector` selector from it.
 *
 * WHY NOT `useCartesianChartStyles(props).yAxis`. That value is a `clsx` COMPOSITION, and
 * `calculateMaxYAxisLabelLength` interpolates its argument into `` `.${className} text` ``.
 * A multi-token string turns that interpolation into a descendant chain (`.a .b text`) which
 * matches nothing — which is exactly what it did under Griffel, where the composition was
 * `mergeClasses('fui-cart__yAxis', <atomics…>)`. See the note on
 * `calculateMaxYAxisLabelLength` in `CartesianChart.tsx` for what that deadness cost.
 *
 * The x-axis equivalent is `CARTESIAN_XAXIS_TEXT_SELECTOR`, which already exists in
 * `utilities/utilities.ts` and is shared with the wrapping code; the y axis has no such
 * constant and needs no PUBLIC one, so the hashed module local is the right handle
 * (CONVERSION_GUIDE §3d: no new public DOM surface unless nothing else works).
 *
 * @internal
 */
export const cartesianYAxisClassName: string = styles['y-axis'];

/**
 * Apply styling to the CartesianChart slots based on the props.
 */
export const useCartesianChartStyles = (props: CartesianChartProps): CartesianChartStyles => {
  return {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    root: clsx(styles.root, cartesianchartClassNames.root, props.styles?.root),
    chartWrapper: clsx(
      styles['chart-wrapper'],
      props.reflowProps?.mode === 'min-width' && styles['chart-wrapper-min-width'],
      props.styles?.chartWrapper,
    ),
    plotContainer: clsx(styles['plot-container'] /*props.styles?.plotContainer*/),
    axisTitle: clsx(styles['axis-title'] /*props.styles?.axisTitle*/),
    // The retained identity constant goes on LAST so the hashed module local stays the leading
    // token, matching every other slot. Order carries no cascade meaning (the `@layer` order
    // decides every tie) and both tokens are selector-safe, so the only constraint is that the
    // literal reach the DOM unchanged — which it does.
    xAxis: clsx(styles['x-axis'], CARTESIAN_XAXIS_CLASSNAME /*props.styles?.xAxis*/),
    yAxis: clsx(styles['y-axis'] /*props.styles?.yAxis*/),
    opacityChangeOnHover: clsx(styles['opacity-change-on-hover'] /*props.styles?.opacityChangeOnHover*/),
    legendContainer: clsx(styles['legend-container'] /*props.styles?.legendContainer*/),
    svgTooltip: clsx(styles['svg-tooltip'], props.styles?.svgTooltip),
    annotationLayer: clsx(styles['annotation-layer'] /*props.styles?.annotationLayer*/),
    tooltip: clsx(styles.tooltip /*props.styles?.tooltip*/),
    axisAnnotation: clsx(styles['axis-annotation'] /*props.styles?.axisAnnotation*/),
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    chart: props.styles?.chart,
  };
};
