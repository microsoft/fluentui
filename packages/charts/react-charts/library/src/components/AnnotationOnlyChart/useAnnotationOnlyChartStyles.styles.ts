/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): this file no longer carries a
 * `'use client'` directive. After conversion it calls no React hook — the `makeStyles`
 * hook is gone — so `enforce-use-client` reports the directive as unnecessary
 * (VerticalStackedBarChart precedent). `AnnotationOnlyChart.tsx`, which does use hooks,
 * keeps its own.
 */

import { clsx } from 'clsx';

import styles from './AnnotationOnlyChart.module.css';

/**
 * Apply styling to the AnnotationOnlyChart slots.
 *
 * The Griffel source was a bare `makeStyles` hook — no statics constant and no
 * `props.styles` channel (`AnnotationOnlyChartProps` declares no `styles` prop), so the
 * signature stays argument-less and no classNames constant is introduced (D16.5 narrows
 * EXISTING statics; it does not add new public surface).
 *
 * `root` is the component's outermost SLOT — the outer container div carries only a
 * `data-*` attribute and no class channel — so the D15.1 marker
 * `group/fui-annotation-only-chart` rides it (the react-tooltip "marker rides the
 * outermost slot" precedent). Ordering (DECISIONS.md D16.2): unconditional module class
 * FIRST, named group marker SECOND — `styles.root` is what guarantees the marker is never
 * `classList[0]` (nwsapi's `:scope` polyfill throws on the `/` under jsdom).
 *
 * Cascade priority is decided by the `@layer fui.*` order in
 * AnnotationOnlyChart.module.css — see that file's header.
 *
 * No data attributes are set by this hook: the `data-chart-annotation-*` attributes on the
 * component's DOM predate the migration and are consumer/test seams, not styling state
 * (D15.6 — data-* is fallback-only); no `@variant` in the module reads one.
 */
export const useAnnotationOnlyChartStyles = (): { root: string; content: string; title: string } => {
  return {
    root: clsx(styles.root, 'group/fui-annotation-only-chart'),
    content: clsx(styles.content),
    title: clsx(styles.title),
  };
};
