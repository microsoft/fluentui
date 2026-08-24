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
    display: 'block',
    position: 'relative',
    minWidth: 0,
    overflow: 'visible',
  },
  placeholder: {
    position: 'absolute',
    zIndex: tokens.zIndexContent,
    pointerEvents: 'none',
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThick} dashed ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
  },
  emptyContent: {
    position: 'relative',
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

export const useDashboardGridStyles_unstable = <TState extends DashboardGridStyleSlots>(state: TState): TState => {
  const rootStyles = useRootStyles();
  const styles = useStyles();

  return {
    ...state,
    root: {
      ...state.root,
      className: mergeClasses(dashboardGridClassNames.root, rootStyles, styles.reducedMotion, state.root.className),
    },
    surface: state.surface
      ? {
          ...state.surface,
          className: mergeClasses(
            dashboardGridClassNames.surface,
            styles.surface,
            styles.reducedMotion,
            state.surface.className,
          ),
        }
      : undefined,
    placeholder: state.placeholder
      ? {
          ...state.placeholder,
          className: mergeClasses(dashboardGridClassNames.placeholder, styles.placeholder, state.placeholder.className),
        }
      : undefined,
    emptyContent: state.emptyContent
      ? {
          ...state.emptyContent,
          className: mergeClasses(
            dashboardGridClassNames.emptyContent,
            styles.emptyContent,
            state.emptyContent.className,
          ),
        }
      : undefined,
  } as TState;
};
