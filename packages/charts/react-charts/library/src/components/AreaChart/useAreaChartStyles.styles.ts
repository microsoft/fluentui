/*
 * NOTE: this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary. Same split as react-badge's Badge (no directive) vs CounterBadge (kept it
 * because it still calls a hook). `AreaChart.tsx`, which does use hooks, keeps its own.
 */

import { clsx } from 'clsx';
import type { AreaChartProps, AreaChartStyles } from './index';

import styles from './AreaChart.module.css';

/**
 * Public identity class for AreaChart.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable as a
 * selector and as a `group-*` variant target. The single per-slot BEM static this object
 * used to publish (`fui-ac__tooltip`) was removed with the D16 sweep: there is no public
 * class-name handle on component internals. Nothing in the repo referenced it.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + areaChartClassNames.root` is an invalid selector. Use
 * `fuiSelector(areaChartClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (DECISIONS.md D16.5).
 */
export const areaChartClassNames: { root: string } = {
  root: 'group/fui-area-chart',
};

/**
 * Apply styling to the AreaChart slots based on the state.
 *
 * `styles.root` is what guarantees the marker is never `classList[0]` — nwsapi's `:scope` polyfill
 * throws on the `/` under jsdom.
 */
export const useAreaChartStyles = (props: AreaChartProps): AreaChartStyles => {
  return {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    root: clsx(styles.root, areaChartClassNames.root, props.styles?.root),
    tooltip: clsx(styles.tooltip /*props.styles?.tooltip*/),
  };
};
