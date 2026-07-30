/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary (VerticalStackedBarChart precedent). `ChartTable.tsx`, which does use
 * hooks, keeps its own.
 */

import { clsx } from 'clsx';
import type { ChartTableProps, ChartTableStyles } from './ChartTable.types';

import styles from './ChartTable.module.css';

/**
 * Public identity class for ChartTable.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The per-slot BEM statics
 * (`fui-ChartTable__*`) were removed with the D16 sweep: there is no public class-name
 * handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + chartTableClassNames.root` is an invalid selector. Use
 * `fuiSelector(chartTableClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (DECISIONS.md D16.5).
 */
export const chartTableClassNames: { root: string } = {
  root: 'group/fui-chart-table',
};

/**
 * Apply styling to the ChartTable slots based on the state.
 *
 * Cascade priority is decided by the `@layer fui.*` order in ChartTable.module.css, not by
 * clsx argument order — see that file's header for the mapping back to the mergeClasses()
 * argument order this replaces.
 *
 * The `props.styles?.<slot>` arguments were COMMENTED OUT in the Griffel source (consumer
 * styles are deliberately not applied by this component today) and are preserved as
 * comments — enabling them is an upstream behaviour change, not a migration concern. The
 * `chart` slot (static-only, never consumed by `ChartTable.tsx`) is deleted rather than
 * left returning an empty string (DonutChart chartWrapper precedent).
 *
 * Ordering on `root` (DECISIONS.md D16.2): unconditional module class FIRST, named group
 * marker SECOND. `styles.root` is what guarantees the marker is never `classList[0]` —
 * nwsapi's `:scope` polyfill throws on the `/` under jsdom.
 *
 * No data attributes are set: nothing in this component's styling is state-driven
 * (D15.6 — data-* is fallback-only), and no `@variant` in the module reads one.
 */
export const useChartTableStyles = (props: ChartTableProps): ChartTableStyles => {
  return {
    root: clsx(styles.root, 'group/fui-chart-table' /*props.styles?.root*/),
    table: clsx(styles.table /*props.styles?.table*/),
    headerCell: clsx(styles['header-cell'] /*props.styles?.headerCell*/),
    bodyCell: clsx(styles['body-cell'] /*props.styles?.bodyCell*/),
    chartTitle: clsx(styles['chart-title'] /*props.styles?.chartTitle*/),
    svgTooltip: clsx(styles['svg-tooltip'] /*props.styles?.svgTooltip*/),
  };
};
