/*
 * NOTE: this file no longer carries a
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
 * Ordering (DECISIONS.md D16.2): unconditional module class FIRST, named group marker SECOND —
 * `styles.root` is what guarantees the marker is never `classList[0]` (nwsapi's `:scope` polyfill
 * throws on the `/` under jsdom).
 */
export const useAnnotationOnlyChartStyles = (): { root: string; content: string; title: string } => {
  return {
    root: clsx(styles.root, 'group/fui-annotation-only-chart'),
    content: clsx(styles.content),
    title: clsx(styles.title),
  };
};
