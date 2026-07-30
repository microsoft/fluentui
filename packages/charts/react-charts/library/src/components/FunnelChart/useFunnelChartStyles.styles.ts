/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary (VerticalStackedBarChart precedent). `FunnelChart.tsx`, which does use
 * hooks, keeps its own.
 */

import { clsx } from 'clsx';
import type { FunnelChartProps, FunnelChartStyles } from './index';

import styles from './FunnelChart.module.css';

/**
 * Public identity class for FunnelChart.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics (`fui-funnel__*`)
 * were removed with the D16 sweep: there is no public class-name handle on component
 * internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + funnelClassNames.root` is an invalid selector. Use
 * `fuiSelector(funnelClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (DECISIONS.md D16.5).
 */
export const funnelClassNames: { root: string } = {
  root: 'group/fui-funnel-chart',
};

/**
 * Apply styling to the FunnelChart component.
 *
 * Cascade priority is decided by the `@layer fui.*` order in FunnelChart.module.css, not by
 * clsx argument order — see that file's header for the mapping back to the mergeClasses()
 * argument order this replaces.
 *
 * Ordering on `root` (DECISIONS.md D16.2): unconditional module class FIRST, named group
 * marker SECOND, consumer strings LAST (`className` before `props.styles?.root` preserves
 * the previous argument order; both are unlayered, so the relative order carries no cascade
 * meaning either way). `styles.root` is what guarantees the marker is never `classList[0]`
 * — nwsapi's `:scope` polyfill throws on the `/` under jsdom.
 *
 * No data attributes are set: nothing in this component's styling is state-driven
 * (D15.6 — data-* is fallback-only), and no `@variant` in the module reads one.
 */
export const useFunnelChartStyles = (props: FunnelChartProps): FunnelChartStyles => {
  const { className } = props;

  return {
    root: clsx(styles.root, 'group/fui-funnel-chart', className, props.styles?.root),
    chart: clsx(styles.chart, props.styles?.chart),
    text: clsx(styles.text, props.styles?.text),
    calloutContentRoot: clsx(styles['callout-content-root'], props.styles?.calloutContentRoot),
    chartTitle: clsx(styles['chart-title'], props.styles?.chartTitle),
    svgTooltip: clsx(styles['svg-tooltip'], props.styles?.svgTooltip),
  };
};
