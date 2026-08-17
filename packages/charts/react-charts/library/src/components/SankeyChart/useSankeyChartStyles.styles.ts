/*
 * NOTE: this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary (VerticalStackedBarChart precedent). `SankeyChart.tsx`, which does use
 * hooks, keeps its own.
 */

import { clsx } from 'clsx';
import type { SankeyChartProps, SankeyChartStyles } from './SankeyChart.types';

import styles from './SankeyChart.module.css';

/**
 * Public identity class for SankeyChart.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics (`fui-sc__*`) were
 * removed with the D16 sweep: there is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + sankeyChartClassNames.root` is an invalid selector. Use
 * `fuiSelector(sankeyChartClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (DECISIONS.md D16.5).
 *
 * NOT covered by this constant: the LITERAL `nodeName`/`tempText` class names in
 * `SankeyChart.tsx` — a d3 text-measurement seam, not styling identity (ledger note,
 * react-charts). They stay global literal strings.
 */
export const sankeyChartClassNames: { root: string } = {
  root: 'group/fui-sankey-chart',
};

/**
 * Apply styling to the SankeyChart slots based on the state.
 *
 * `styles.root` is what guarantees the marker is never `classList[0]` — nwsapi's `:scope` polyfill
 * throws on the `/` under jsdom.
 */
export const useSankeyChartStyles = (props: SankeyChartProps): SankeyChartStyles => {
  return {
    root: clsx(styles.root, sankeyChartClassNames.root, props.styles?.root),
    nodes: clsx(styles.nodes /*, props.styles?.nodes*/),
    links: clsx(styles.links /*, props.styles?.links*/),
    nodeTextContainer: clsx(styles['node-text-container'] /*, props.styles?.nodeTextContainer*/),
    toolTip: clsx(styles['tool-tip'] /*, props.styles?.toolTip*/),
    chartWrapper: clsx(
      props.reflowProps?.mode === 'min-width' ? styles['chart-wrapper'] : '',
      props.styles?.chartWrapper,
    ),
    chart: clsx(styles.chart, props.styles?.chart),
    chartTitle: clsx(styles['chart-title'], props.styles?.chartTitle),
    svgTooltip: clsx(styles['svg-tooltip'], props.styles?.svgTooltip),
  };
};
