/*
 * NOTE: this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary. Same split as react-badge's Badge (no directive) vs CounterBadge (kept it
 * because it still calls a hook). `ScatterChart.tsx`, which does use hooks, keeps its own.
 */

import { clsx } from 'clsx';
import type { ScatterChartProps, ScatterChartStyles } from './ScatterChart.types';

import styles from './ScatterChart.module.css';

/**
 * Public identity class for ScatterChart.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics were removed with
 * the D16 sweep: there is no public class-name handle on component internals. Note that
 * they were verbatim COPIES of LineChart's `fui-line__*` strings (this component published
 * `fui-line__root`, not `fui-scatter__root`); nothing in the repo referenced either set.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + scatterChartClassNames.root` is an invalid selector. Use
 * `fuiSelector(scatterChartClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (DECISIONS.md D16.5).
 */
export const scatterChartClassNames: { root: string } = {
  root: 'group/fui-scatter-chart',
};

/**
 * Apply styling to the ScatterChart slots based on the state.
 *
 * DELEGATION SEAM: ScatterChart renders no element of its own — its outermost node is the
 * root `<div>` of `CartesianChart`, which ScatterChart renders itself and whose props it
 * therefore owns. That makes the `root` composition below CONVERSION_GUIDE §3d **M2**
 * (JS slot-className composition), not M3: no new public DOM surface is minted, the
 * existing `CartesianChart.styles.root` prop is the channel. `ScatterChart.tsx` forwards
 * the value as `styles={{ ...props.styles, root: classes.root }}`, placed AFTER its
 * `{...props}` spread so it wins.
 *
 * Two markers end up on that one element once CartesianChart converts
 * (`group/fui-cartesian-chart` alongside `group/fui-scatter-chart`). That is the sanctioned
 * shape, not a collision — react-button's ToggleButton root carries both
 * `group/fui-toggle-button` and `group/fui-button` for exactly this reason, so a descendant
 * can address whichever identity it means.
 *
 * Ordering (DECISIONS.md D16.2): unconditional module class FIRST, named group marker
 * SECOND, consumer override LAST. `styles.root` is what guarantees the marker is never
 * `classList[0]` — nwsapi's `:scope` polyfill throws on the `/` under jsdom.
 *
 * KNOWN DEAD SLOT: `tooltip` has no render site — `ScatterChart.tsx` reads only
 * `classes.markerLabel`, and the component draws its hover surface through `ChartPopover`.
 * The slot is preserved verbatim rather than deleted because it is part of the
 * `ScatterChartStyles` (→ `CartesianChartStyles`) contract and CONVERSION_GUIDE §3 forbids
 * dropping exports mid-migration; retiring it belongs to the Phase 3 sweep.
 *
 * No data attributes are set: nothing in this component's styling is state-driven
 * (D15.6 — data-* is fallback-only), and no `@variant` in the module reads one.
 */
export const useScatterChartStyles = (props: ScatterChartProps): ScatterChartStyles => {
  return {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    root: clsx(styles.root, scatterChartClassNames.root, props.styles?.root),
    tooltip: clsx(styles.tooltip /*props.styles?.tooltip*/),
    markerLabel: clsx(styles['marker-label'], props.styles?.markerLabel),
  };
};
