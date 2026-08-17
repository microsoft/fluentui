/*
 * NOTE: this file no longer carries a
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
 * `styles.root` is what guarantees the marker is never `classList[0]` — nwsapi's `:scope` polyfill
 * throws on the `/` under jsdom.
 */
export const useHorizontalBarChartWithAxisStyles = (
  props: HorizontalBarChartWithAxisProps,
): HorizontalBarChartWithAxisStyles => {
  return {
    root: clsx(styles.root, hbcWithAxisClassNames.root, props.styles?.root),
    opacityChangeOnHover: clsx(styles['opacity-change-on-hover']),
    xAxisTicks: '',
    barLabel: clsx(styles['bar-label']),
  };
};
