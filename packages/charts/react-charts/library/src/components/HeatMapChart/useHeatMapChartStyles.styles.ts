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
 * `styles.root` is what guarantees the marker is never `classList[0]` — nwsapi's `:scope` polyfill
 * throws on the `/` under jsdom.
 */
export const useHeatMapChartStyles = (props: HeatMapChartProps): HeatMapChartStyles => {
  return {
    root: clsx(styles.root, heatmapChartClassNames.root, props.styles?.root),
    text: clsx(styles.text /*, props.styles?.text*/),
    calloutContentRoot: clsx(styles['callout-content-root'] /*, props.styles?.calloutContentRoot*/),
  };
};
