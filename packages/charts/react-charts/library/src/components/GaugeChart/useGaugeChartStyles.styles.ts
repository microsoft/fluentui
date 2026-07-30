/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary (VerticalStackedBarChart precedent). `GaugeChart.tsx`, which does use
 * hooks, keeps its own.
 */

import { clsx } from 'clsx';
import type { GaugeChartProps, GaugeChartStyles } from './GaugeChart.types';

import styles from './GaugeChart.module.css';

/**
 * Public identity class for GaugeChart.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics (`fui-gc__*`) were
 * removed with the D16 sweep: there is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + gaugeChartClassNames.root` is an invalid selector. Use
 * `fuiSelector(gaugeChartClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (DECISIONS.md D16.5).
 */
export const gaugeChartClassNames: { root: string } = {
  root: 'group/fui-gauge-chart',
};

/**
 * Apply styling to the GaugeChart slots based on the state.
 *
 * Cascade priority is decided by the `@layer fui.*` order in GaugeChart.module.css, not by
 * clsx argument order — see that file's header for the mapping back to the mergeClasses()
 * argument order this replaces.
 *
 * Ordering on `root` (DECISIONS.md D16.2): unconditional module class FIRST, named group
 * marker SECOND, consumer override LAST. `styles.root` is what guarantees the marker is
 * never `classList[0]` — nwsapi's `:scope` polyfill throws on the `/` under jsdom.
 *
 * No data attributes are set: nothing in this component's styling is state-driven
 * (D15.6 — data-* is fallback-only), and no `@variant` in the module reads one.
 */
export const useGaugeChartStyles = (props: GaugeChartProps): GaugeChartStyles => {
  return {
    root: clsx(styles.root, 'group/fui-gauge-chart', props.styles?.root),
    chart: clsx(styles.chart, props.styles?.chart),
    limits: clsx(styles.limits, props.styles?.limits),
    chartValue: clsx(styles['chart-value'], props.styles?.chartValue),
    sublabel: clsx(styles.sublabel, props.styles?.sublabel),
    needle: clsx(styles.needle, props.styles?.needle),
    chartTitle: clsx(styles['chart-title'], props.styles?.chartTitle),
    svgTooltip: clsx(styles['svg-tooltip'], props.styles?.svgTooltip),
    segment: clsx(styles.segment, props.styles?.segment),
    gradientSegment: clsx(styles['gradient-segment'], props.styles?.gradientSegment),
    calloutContentRoot: clsx(styles['callout-content-root'], props.styles?.calloutContentRoot),
    calloutDateTimeContainer: clsx(styles['callout-date-time-container'], props.styles?.calloutDateTimeContainer),
    calloutContentX: clsx(styles['callout-content-x'], props.styles?.calloutContentX),
    calloutBlockContainer: clsx(styles['callout-block-container'], props.styles?.calloutBlockContainer),
    shapeStyles: clsx(styles['shape-styles'], props.styles?.shapeStyles),
    calloutlegendText: clsx(styles['callout-legend-text'], props.styles?.calloutlegendText),
    calloutContentY: clsx(styles['callout-content-y'], props.styles?.calloutContentY),
    descriptionMessage: clsx(styles['description-message'], props.styles?.descriptionMessage),
    // `chartWrapper` carries NO class of its own: its only library token was the
    // `fui-gc__chartWrapper` static and the module declares no `.chart-wrapper` local — the
    // wrapper is a bare positioning div. With the static removed the assignment would be an
    // identity on the consumer's own string, so it is passed straight through (DonutChart
    // chartWrapper precedent).
    chartWrapper: props.styles?.chartWrapper,
    legendsContainer: clsx(styles['legends-container'], props.styles?.legendsContainer),
  };
};
