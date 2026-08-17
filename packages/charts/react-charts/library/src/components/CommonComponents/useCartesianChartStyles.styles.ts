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
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 *
 * The only supported way to style a Fluent component's internals is the per-slot `styles`
 * prop. `root` is retained as the component's public identity class — the Tailwind named-group
 * marker (DECISIONS.md D15.1) — usable as a selector and as a `group-*` variant target. The
 * per-slot BEM statics (`fui-cart__chartWrapper`, `fui-cart__plotContainer`,
 * `fui-cart__axisTitle`, `fui-cart__yAxis`, `fui-cart__opacityChangeOnHover`,
 * `fui-cart__legendContainer`, `fui-cart_svgTooltip`, `fui-cart__shapeStyles`,
 * `fui-cart__descriptionMessage`, `fui-cart__hover`, `fui-cart__tooltip`,
 * `fui-cart__axisAnnotation`, `fui-cart__chartTitle`, `fui-cart__chart`,
 * `fui-cart__annotationLayer`) were removed with the statics sweep (DECISIONS.md D16.1 /
 * D16.5): there is no public class-name handle on component internals.
 *
 * `xAxis` is the ONE exception and is a RETAINED IDENTITY CONSTANT, not a leftover static.
 * `CARTESIAN_XAXIS_CLASSNAME` (`utilities/utilities.ts`) is interpolated into two selectors
 * that must keep matching real DOM:
 *
 *   - `CARTESIAN_XAXIS_TEXT_SELECTOR` = `` `.${CARTESIAN_XAXIS_CLASSNAME} text` ``, passed to
 *     `getTextSize()` from `createWrapOfXLabels` (utilities.ts) to measure a candidate label
 *     line against the real axis font, and
 *   - `` `.${CARTESIAN_XAXIS_CLASSNAME} tspan` ``, queried in the same function to read the
 *     rendered line height.
 *
 * Both are LIVE today because the constant is a single, selector-safe token that reaches the
 * DOM verbatim. The conversion keeps it doing exactly that (see `xAxis` below); dropping it
 * would silently disable x-axis label wrapping.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + cartesianchartClassNames.root` is an invalid selector. Use
 * `fuiSelector(cartesianchartClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (DECISIONS.md D16.5).
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
 *
 * Cascade priority is decided by the `@layer fui.*` order in CartesianChart.module.css, not
 * by the order of the `clsx` arguments — see that file's header for the mapping back to the
 * mergeClasses() argument order this replaces.
 *
 * No data attributes are set: the only state-driven slice is `chartWrapperMinWidth`, which
 * stays a conditional class because it is a one-slot, one-property toggle with no descendant
 * that needs to read it (D15.6 — data-* is fallback-only, for state a descendant must see).
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
