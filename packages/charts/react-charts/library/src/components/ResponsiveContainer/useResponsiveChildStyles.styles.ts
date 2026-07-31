/*
 * NOTE: this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — `makeStyles`'s
 * `useStyles()` call is gone — so `enforce-use-client` reports the directive as
 * unnecessary. Same split as react-badge's Badge (no directive) vs CounterBadge (kept it
 * because it still calls a hook). `ResponsiveContainer.tsx`, which does use hooks, keeps
 * its own.
 */

import { clsx } from 'clsx';
import type { ResponsiveChildStyles } from './ResponsiveContainer.types';

import styles from './ResponsiveContainer.module.css';

/**
 * Public identity class for the responsive-child styling contract.
 *
 * @internal
 * @deprecated for styling. The only supported way to style a Fluent component's internals
 * is the per-slot `styles` props. `root` is retained as the contract's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5). It lands on the
 * ROOT OF THE WRAPPED CHART (the same element the removed `fui-charts-resp-child__root`
 * static landed on, via `ResponsiveContainer`'s cloneElement styles injection), marking
 * "chart sized by a ResponsiveContainer". The per-slot BEM statics
 * (`fui-charts-resp-child__*`) were removed with the D16 sweep.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + responsiveChildClassNames.root` is an invalid selector. Use
 * `fuiSelector(responsiveChildClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (DECISIONS.md D16.5).
 */
export const responsiveChildClassNames: { root: string } = {
  root: 'group/fui-responsive-child',
};

/**
 * Apply styling to the responsive-child slots.
 *
 * DELEGATION SEAM: these values are injected by `ResponsiveContainer.tsx` into the wrapped
 * chart's `styles` prop (cloneElement), i.e. every subject element is owned by the CHILD
 * chart — which is why ResponsiveContainer.module.css authors its rules UNLAYERED (see the
 * module header, D2 amendment 5) and why no new DOM surface is minted here
 * (CONVERSION_GUIDE §3d M2: the chart's existing `styles` prop is the channel).
 *
 * Marker ordering (DECISIONS.md D16.2): the marker rides AFTER the unconditional module
 * class inside this fragment, and the fragment itself is appended after the consumer's own
 * `styles.root` by the caller — the final DOM class string is composed by the chart's own
 * hook (`clsx(chartModuleClass, chartMarker, …, thisFragment)`), so a marker is never
 * `classList[0]` (nwsapi's `:scope` polyfill throws on the `/` under jsdom).
 */
export const useResponsiveChildStyles = (): ResponsiveChildStyles => {
  return {
    // The marker is written as a LITERAL, not `responsiveChildClassNames.root`: greppable,
    // and it keeps the `@deprecated` constant from being self-referenced (which the
    // `deprecation` lint rule reports as an error).
    root: clsx(styles.root, 'group/fui-responsive-child'),
    chartWrapper: clsx(styles['chart-wrapper']),
    chart: clsx(styles.chart),
  };
};
