/*
 * NOTE: this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary. Same split as react-badge's Badge (no directive) vs CounterBadge (kept it
 * because it still calls a hook). `VerticalStackedBarChart.tsx`, which does use hooks,
 * keeps its own.
 */

import { clsx } from 'clsx';
import type { VerticalStackedBarChartProps, VerticalStackedBarChartStyles } from './VerticalStackedBarChart.types';

import styles from './VerticalStackedBarChart.module.css';

/**
 * Public identity class for VerticalStackedBarChart.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics (`fui-vsbc__*`)
 * were removed with the D16 sweep: there is no public class-name handle on component
 * internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + verticalstackedbarchartClassNames.root` is an invalid selector. Use
 * `fuiSelector(verticalstackedbarchartClassNames.root)` from `@fluentui/react-utilities`
 * at every selector site (DECISIONS.md D16.5).
 */
export const verticalstackedbarchartClassNames: { root: string } = {
  root: 'group/fui-vertical-stacked-bar-chart',
};

/**
 * Apply styling to the VerticalStackedBarChart slots based on the state.
 *
 * DELEGATION SEAM: VerticalStackedBarChart renders no element of its own — its outermost
 * node is the root `<div>` of `CartesianChart`, which this component renders itself and
 * whose props it therefore owns. That makes the `root` composition below
 * CONVERSION_GUIDE §3d **M2** (JS slot-className composition), not M3: no new public DOM
 * surface is minted, the existing `CartesianChart.styles.root` prop is the channel.
 * `VerticalStackedBarChart.tsx` forwards the value as
 * `styles={{ ...props.styles, root: classes.root }}`, placed AFTER its `{...props}` spread
 * so it wins.
 *
 * Two markers end up on that one element (`group/fui-cartesian-chart` alongside
 * `group/fui-vertical-stacked-bar-chart`). That is the sanctioned shape, not a collision —
 * react-button's ToggleButton root carries both `group/fui-toggle-button` and
 * `group/fui-button` for exactly this reason.
 *
 * Ordering (DECISIONS.md D16.2): unconditional module class FIRST, named group marker
 * SECOND, consumer override LAST. `styles.root` is what guarantees the marker is never
 * `classList[0]` — nwsapi's `:scope` polyfill throws on the `/` under jsdom.
 *
 * No data attributes are set: nothing in this component's styling is state-driven
 * (D15.6 — data-* is fallback-only), and no `@variant` in the module reads one.
 */
export const useVerticalStackedBarChartStyles = (
  props: VerticalStackedBarChartProps,
): VerticalStackedBarChartStyles => {
  return {
    // The marker is written as a LITERAL, not `verticalstackedbarchartClassNames.root`:
    // greppable, sortable by prettier-plugin-tailwindcss, and it keeps the `@deprecated`
    // constant from being self-referenced (which the `deprecation` lint rule reports as an
    // error). Same form as react-divider and this package's VerticalBarChart.
    root: clsx(styles.root, 'group/fui-vertical-stacked-bar-chart', props.styles?.root),
    // `props.href ? 'pointer' : 'default'` is PRESERVED VERBATIM from the mergeClasses
    // call it replaces. The two tokens are class NAMES no stylesheet defines (almost
    // certainly an upstream bug — the author meant cursor values, and the `<rect>`s set
    // the real `cursor` attribute separately), so they are visually inert; they are kept
    // because the conversion is a pure re-expression of the rendered DOM, and dropping
    // them belongs to an upstream fix, not this migration.
    opacityChangeOnHover: clsx(styles['opacity-change-on-hover'], props.href ? 'pointer' : 'default'),
    tooltip: clsx(styles.tooltip /*props.styles?.tooltip*/),
    barLabel: clsx(styles['bar-label'] /*props.styles?.barLabel*/),
  };
};
