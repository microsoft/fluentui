/*
 * NOTE: this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary (VerticalStackedBarChart precedent). `PolarChart.tsx`, which does use
 * hooks, keeps its own.
 */

import { clsx } from 'clsx';
import type { PolarChartStyles, PolarChartProps } from './PolarChart.types';

import styles from './PolarChart.module.css';

/**
 * Public identity class for PolarChart.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics (`fui-polar__*`)
 * were removed with the D16 sweep: there is no public class-name handle on component
 * internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + polarChartClassNames.root` is an invalid selector. Use
 * `fuiSelector(polarChartClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (DECISIONS.md D16.5).
 */
export const polarChartClassNames: { root: string } = {
  root: 'group/fui-polar-chart',
};

/**
 * Apply styling to the PolarChart component.
 *
 * `styles.root` is what guarantees the marker is never `classList[0]` — nwsapi's `:scope` polyfill
 * throws on the `/` under jsdom.
 */
export const usePolarChartStyles = (props: PolarChartProps): PolarChartStyles => {
  return {
    root: clsx(styles.root, polarChartClassNames.root, props.styles?.root),
    // `chartWrapper` carries NO class of its own: its only library token was the
    // `fui-polar__chartWrapper` static and the module declares no `.chart-wrapper` local —
    // the wrapper is a bare positioning div. With the static removed the assignment would
    // be an identity on the consumer's own string, so it is passed straight through
    // (GaugeChart/DonutChart chartWrapper precedent).
    chartWrapper: props.styles?.chartWrapper,
    chart: clsx(styles.chart, props.styles?.chart),
    gridLineInner: clsx(styles['grid-line-inner'], props.styles?.gridLineInner),
    gridLineOuter: clsx(styles['grid-line-outer'], props.styles?.gridLineOuter),
    tickLabel: clsx(styles['tick-label'], props.styles?.tickLabel),
    legendContainer: clsx(styles['legend-container'], props.styles?.legendContainer),
  };
};
