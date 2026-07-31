/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary (VerticalStackedBarChart precedent). `HorizontalBarChartWithAxis.tsx`,
 * which does use hooks, keeps its own.
 */

import { clsx } from 'clsx';
import type { HorizontalBarChartWithAxisProps, HorizontalBarChartWithAxisStyles } from './index';

import styles from './HorizontalBarChartWithAxis.module.css';

/**
 * Public identity class for HorizontalBarChartWithAxis.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics (`fui-hbcwa__*`)
 * were removed with the D16 sweep: there is no public class-name handle on component
 * internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + hbcWithAxisClassNames.root` is an invalid selector. Use
 * `fuiSelector(hbcWithAxisClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (DECISIONS.md D16.5).
 */
export const hbcWithAxisClassNames: { root: string } = {
  root: 'group/fui-horizontal-bar-chart-with-axis',
};

/**
 * Apply styling to the HorizontalBarChartWithAxis slots based on the state.
 *
 * DELEGATION SEAM: HorizontalBarChartWithAxis renders no element of its own — its
 * outermost node is the root `<div>` of `CartesianChart`, which this component renders
 * itself and whose props it therefore owns. That makes the `root` composition below
 * CONVERSION_GUIDE §3d **M2** (JS slot-className composition, VerticalStackedBarChart
 * precedent): `HorizontalBarChartWithAxis.tsx` forwards the value as
 * `styles={{ ...props.styles, root: classes.root }}`, placed AFTER its `{...props}`
 * spread so it wins. Two markers end up on that one element
 * (`group/fui-cartesian-chart` alongside `group/fui-horizontal-bar-chart-with-axis`) —
 * the sanctioned shape, not a collision.
 *
 * `props.styles?.root` joins the composition even though the Griffel hook never read it:
 * under Griffel the consumer's `styles.root` still reached the same element through
 * CartesianChart's own hook (this component spreads `{...props}` onto CartesianChart, so
 * CartesianChart read `props.styles?.root` as ITS consumer override). The explicit
 * `styles={{ ... }}` override would otherwise cut that channel — including it here keeps
 * the rendered surface identical (HeatMapChart precedent). The three Griffel-era slots
 * keep their no-consumer-argument shape verbatim (those never had another channel).
 *
 * Ordering on `root` (DECISIONS.md D16.2): unconditional module class FIRST, named group
 * marker SECOND, consumer override LAST. `styles.root` is what guarantees the marker is
 * never `classList[0]` — nwsapi's `:scope` polyfill throws on the `/` under jsdom.
 *
 * `xAxisTicks` composes to the empty string: its Griffel slice was `{}` (no atomics) and
 * its only token was the removed `fui-hbcwa__xAxisTicks` static. The key stays because it
 * is part of the public `HorizontalBarChartWithAxisStyles` contract (VSBC known-dead-slot
 * precedent).
 *
 * No data attributes are set: nothing in this component's styling is state-driven
 * (D15.6 — data-* is fallback-only), and no `@variant` in the module reads one.
 */
export const useHorizontalBarChartWithAxisStyles = (
  props: HorizontalBarChartWithAxisProps,
): HorizontalBarChartWithAxisStyles => {
  return {
    root: clsx(styles.root, 'group/fui-horizontal-bar-chart-with-axis', props.styles?.root),
    opacityChangeOnHover: clsx(styles['opacity-change-on-hover']),
    xAxisTicks: '',
    barLabel: clsx(styles['bar-label']),
  };
};
