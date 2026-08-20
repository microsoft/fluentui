'use client';

import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DashboardGridSlots } from './DashboardGrid.types';

export type DashboardGridStyleSlots = {
  root: { className?: string };
  surface?: { className?: string };
  placeholder?: { className?: string };
  emptyContent?: { className?: string };
};

export const dashboardGridClassNames: SlotClassNames<DashboardGridSlots> = {
  root: 'fui-DashboardGrid',
  surface: 'fui-DashboardGrid__surface',
  placeholder: 'fui-DashboardGrid__placeholder',
  emptyContent: 'fui-DashboardGrid__emptyContent',
};

const useRootStyles = makeResetStyles({
  display: 'block',
  position: 'relative',
  minWidth: 0,
  color: tokens.colorNeutralForeground1,
});

const useStyles = makeStyles({
  surface: {
    display: 'grid',
    position: 'relative',
    minWidth: 0,
    gridTemplateColumns: 'repeat(var(--dashboard-grid-columns), minmax(0, 1fr))',
    gridAutoRows: 'var(--dashboard-grid-row-height)',
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalM,
    alignItems: 'stretch',
  },
  placeholder: {
    position: 'relative',
    zIndex: 1,
    pointerEvents: 'none',
    gridColumnStart: 'calc(var(--dashboard-grid-column) + 1)',
    gridColumnEnd: 'span var(--dashboard-grid-column-span)',
    gridRowStart: 'calc(var(--dashboard-grid-row) + 1)',
    gridRowEnd: 'span var(--dashboard-grid-row-span)',
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThick} dashed ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
  },
  emptyContent: {
    gridColumn: '1 / -1',
    color: tokens.colorNeutralForeground2,
    paddingBlock: tokens.spacingVerticalXL,
    paddingInline: tokens.spacingHorizontalXL,
    textAlign: 'center',
  },
  reducedMotion: {
    '@media (prefers-reduced-motion: reduce)': {
      transitionProperty: 'none',
    },
  },
});

export const useDashboardGridStyles_unstable = <TState extends DashboardGridStyleSlots>(
  state: TState,
): TState => {
  const rootStyles = useRootStyles();
  const styles = useStyles();

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    dashboardGridClassNames.root,
    rootStyles,
    styles.reducedMotion,
    state.root.className,
  );
  if (state.surface) {
    // eslint-disable-next-line react-hooks/immutability
    state.surface.className = mergeClasses(
      dashboardGridClassNames.surface,
      styles.surface,
      styles.reducedMotion,
      state.surface.className,
    );
  }
  if (state.placeholder) {
    // eslint-disable-next-line react-hooks/immutability
    state.placeholder.className = mergeClasses(
      dashboardGridClassNames.placeholder,
      styles.placeholder,
      state.placeholder.className,
    );
  }
  if (state.emptyContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.emptyContent.className = mergeClasses(
      dashboardGridClassNames.emptyContent,
      styles.emptyContent,
      state.emptyContent.className,
    );
  }

  return state;
};
