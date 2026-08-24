'use client';

import type * as React from 'react';
import { makeStaticStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export type DashboardGridPrintStyleState = {
  printMode?: 'flow' | 'exact';
  root: { className?: string };
  surface?: { className?: string };
};

const useStyles = makeStyles({
  root: {
    '@media print': {
      overflow: 'visible',
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  surface: {
    '@media print': {
      overflow: 'visible',
      blockSize: 'auto !important',
    },
  },
  flow: {
    '@media print': {
      display: 'block',
    },
  },
  exact: {
    '@media print': {
      display: 'grid',
    },
  },
});

const usePrintPageStyles = makeStaticStyles({
  '@page dashboard-grid-landscape': {
    size: 'landscape',
  },
});

export const useDashboardGridPrintStyles_unstable = <TState extends DashboardGridPrintStyleState>(
  state: TState,
): TState => {
  usePrintPageStyles();
  const styles = useStyles();
  return {
    ...state,
    root: {
      ...state.root,
      className: mergeClasses(styles.root, state.root.className),
    },
    surface: state.surface
      ? {
          ...state.surface,
          className: mergeClasses(
            styles.surface,
            state.printMode === 'flow' ? styles.flow : styles.exact,
            state.surface.className,
          ),
        }
      : undefined,
  } as TState;
};

const useItemStyles = makeStyles({
  item: {
    '@media print': {
      breakInside: 'avoid',
      position: 'static',
      insetInlineStart: 'auto !important',
      top: 'auto !important',
      height: 'auto !important',
    },
  },
  flow: {
    '@media print': {
      float: 'left',
      height: 'auto',
      width: 'var(--dashboard-grid-print-width) !important',
    },
  },
  exact: {
    '@media print': {
      width: 'auto !important',
    },
  },
  hidden: {
    '@media print': {
      display: 'none',
    },
  },
  pageBreak: {
    '@media print': {
      breakBefore: 'page',
    },
  },
});

export type DashboardGridPrintItemStyleState = {
  printMode?: 'flow' | 'exact';
  print?: {
    hide?: boolean;
    pageBreakBefore?: boolean;
    /** @deprecated Use `pageBreakBefore`. */
    pageBreak?: boolean;
    orientation?: 'portrait' | 'landscape';
  };
  root: { className?: string; style?: React.CSSProperties };
};

export const useDashboardGridPrintItemStyles_unstable = <TState extends DashboardGridPrintItemStyleState>(
  state: TState,
): TState => {
  const styles = useItemStyles();
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Reads the legacy page-break field for migration compatibility.
  const pageBreakBefore = state.print?.pageBreakBefore ?? state.print?.pageBreak;
  return {
    ...state,
    root: {
      ...state.root,
      className: mergeClasses(
        styles.item,
        state.printMode === 'flow' && styles.flow,
        state.printMode === 'exact' && styles.exact,
        state.print?.hide && styles.hidden,
        state.printMode === 'exact' && pageBreakBefore && styles.pageBreak,
        state.root.className,
      ),
      style:
        state.printMode === 'exact' && state.print?.orientation === 'landscape'
          ? { ...state.root.style, page: 'dashboard-grid-landscape' }
          : state.root.style,
    },
  } as TState;
};
