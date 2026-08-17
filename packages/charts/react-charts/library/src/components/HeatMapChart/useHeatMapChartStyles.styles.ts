/*
 * NOTE: this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary (VerticalStackedBarChart precedent). `HeatMapChart.tsx`, which does use
 * hooks, keeps its own.
 */

import { clsx } from 'clsx';
import type { HeatMapChartProps, HeatMapChartStyles } from './HeatMapChart.types';

import styles from './HeatMapChart.module.css';

/**
 * Public identity class for HeatMapChart.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics (`fui-hmc__*`) were
 * removed with the D16 sweep: there is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + heatmapChartClassNames.root` is an invalid selector. Use
 * `fuiSelector(heatmapChartClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (DECISIONS.md D16.5).
 */
export const heatmapChartClassNames: { root: string } = {
  root: 'group/fui-heat-map-chart',
};

/**
 * Apply styling to the HeatMapChart slots based on the state.
 *
 * DELEGATION SEAM: HeatMapChart renders no element of its own — its outermost node is the
 * root `<div>` of `CartesianChart`, which this component renders itself and whose props it
 * therefore owns. That makes the `root` composition below CONVERSION_GUIDE §3d **M2** (JS
 * slot-className composition, VerticalStackedBarChart precedent): `HeatMapChart.tsx`
 * forwards the value as `styles={{ ...props.styles, root: classes.root }}`, placed AFTER
 * its `{...props}` spread so it wins. Two markers end up on that one element
 * (`group/fui-cartesian-chart` alongside `group/fui-heat-map-chart`) — the sanctioned
 * shape, not a collision.
 *
 * `props.styles?.root` joins the composition even though the Griffel hook commented it
 * out: under Griffel the consumer's `styles.root` still reached the same element through
 * CartesianChart's own hook (HeatMapChart spreads `{...props}` onto CartesianChart, so
 * CartesianChart read `props.styles?.root` as ITS consumer override). The explicit
 * `styles={{ ... }}` override would otherwise cut that channel — including it here keeps
 * the rendered surface identical. `text`/`calloutContentRoot` keep their commented-out
 * consumer arguments verbatim (those never had another channel).
 *
 * Ordering on `root` (DECISIONS.md D16.2): unconditional module class FIRST, named group
 * marker SECOND, consumer override LAST. `styles.root` is what guarantees the marker is
 * never `classList[0]` — nwsapi's `:scope` polyfill throws on the `/` under jsdom.
 *
 * No data attributes are set: nothing in this component's styling is state-driven
 * (D15.6 — data-* is fallback-only), and no `@variant` in the module reads one.
 */
export const useHeatMapChartStyles = (props: HeatMapChartProps): HeatMapChartStyles => {
  return {
    root: clsx(styles.root, heatmapChartClassNames.root, props.styles?.root),
    text: clsx(styles.text /*, props.styles?.text*/),
    calloutContentRoot: clsx(styles['callout-content-root'] /*, props.styles?.calloutContentRoot*/),
  };
};
