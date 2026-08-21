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
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(styles.root, state.root.className);
  if (state.surface) {
    // eslint-disable-next-line react-hooks/immutability
    state.surface.className = mergeClasses(
      styles.surface,
      state.printMode === 'flow' ? styles.flow : styles.exact,
      state.surface.className,
    );
  }
  return state;
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
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    styles.item,
    state.printMode === 'flow' && styles.flow,
    state.printMode === 'exact' && styles.exact,
    state.print?.hide && styles.hidden,
    state.printMode === 'exact' &&
      (state.print?.pageBreakBefore ?? state.print?.pageBreak) &&
      styles.pageBreak,
    state.root.className,
  );
  if (state.printMode === 'exact' && state.print?.orientation === 'landscape') {
    // eslint-disable-next-line react-hooks/immutability
    state.root.style = { ...state.root.style, page: 'dashboard-grid-landscape' };
  }
  return state;
};
