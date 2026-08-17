/*
 * NOTE: this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary. Same split as react-badge's Badge (no directive) vs CounterBadge (kept it
 * because it still calls a hook). `GroupedVerticalBarChart.tsx`, which does use hooks,
 * keeps its own.
 */

import { clsx } from 'clsx';
import type { GroupedVerticalBarChartProps, GroupedVerticalBarChartStyles } from '../../index';

import styles from './GroupedVerticalBarChart.module.css';

/**
 * Public identity class for GroupedVerticalBarChart.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics (the `fui-gvbc**…`
 * strings — a pre-existing `__`→`**` typo) were removed with the D16 sweep: there is no
 * public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + groupedVerticalBarChartClassNames.root` is an invalid selector. Use
 * `fuiSelector(groupedVerticalBarChartClassNames.root)` from `@fluentui/react-utilities`
 * at every selector site (DECISIONS.md D16.5).
 */
export const groupedVerticalBarChartClassNames: { root: string } = {
  root: 'group/fui-grouped-vertical-bar-chart',
};

/**
 * Apply styling to the GroupedVerticalBarChart slots based on the state.
 *
 * DELEGATION SEAM: GroupedVerticalBarChart renders no element of its own — its outermost
 * node is the root `<div>` of `CartesianChart`, which this component renders itself and
 * whose props it therefore owns. That makes the `root` composition below
 * CONVERSION_GUIDE §3d **M2** (JS slot-className composition), not M3: no new public DOM
 * surface is minted, the existing `CartesianChart.styles.root` prop is the channel.
 * `GroupedVerticalBarChart.tsx` forwards the value as
 * `styles={{ ...props.styles, root: classes.root }}`, placed AFTER its `{...props}` spread
 * so it wins.
 *
 * Two markers end up on that one element (`group/fui-cartesian-chart` alongside
 * `group/fui-grouped-vertical-bar-chart`). That is the sanctioned shape, not a collision —
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
export const useGroupedVerticalBarChartStyles_unstable = (
  props: GroupedVerticalBarChartProps,
): GroupedVerticalBarChartStyles => {
  return {
    // The marker is written as a LITERAL, not `groupedVerticalBarChartClassNames.root`:
    // greppable, sortable by prettier-plugin-tailwindcss, and it keeps the `@deprecated`
    // constant from being self-referenced (which the `deprecation` lint rule reports as an
    // error). Same form as react-divider and this package's VerticalBarChart.
    root: clsx(styles.root, groupedVerticalBarChartClassNames.root, props.styles?.root),
    opacityChangeOnHover: clsx(styles['opacity-change-on-hover'] /*props.styles?.opacityChangeOnHover*/),
    tooltip: clsx(styles.tooltip /*props.styles?.tooltip*/),
    barLabel: clsx(styles['bar-label'] /*props.styles?.barLabel*/),
  };
};
