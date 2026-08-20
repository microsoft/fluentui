'use client';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DashboardGridDragSourceSlots } from './DashboardGridDragSource.types';
import type { DashboardGridDragSourceInternalState } from './useDashboardGridDragSource';

export const dashboardGridDragSourceClassNames: SlotClassNames<DashboardGridDragSourceSlots> = {
  root: 'fui-DashboardGridDragSource',
  preview: 'fui-DashboardGridDragSource__preview',
};

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    position: 'relative',
    cursor: 'grab',
    touchAction: 'none',
    userSelect: 'none',
    borderRadius: tokens.borderRadiusMedium,
    ...createFocusOutlineStyle(),
    ':active': {
      cursor: 'grabbing',
    },
  },
  disabled: {
    cursor: 'not-allowed',
    color: tokens.colorNeutralForegroundDisabled,
  },
  preview: {
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    visibility: 'hidden',
    pointerEvents: 'none',
    zIndex: tokens.zIndexOverlay,
    paddingBlock: tokens.spacingVerticalS,
    paddingInline: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    transitionProperty: 'transform',
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    '@media (prefers-reduced-motion: reduce)': {
      transitionProperty: 'none',
    },
    '@media (forced-colors: active)': {
      ...shorthands.border(tokens.strokeWidthThin, 'solid', 'CanvasText'),
      color: 'CanvasText',
      backgroundColor: 'Canvas',
    },
  },
});

export const useDashboardGridDragSourceStyles_unstable = (
  state: DashboardGridDragSourceInternalState,
): DashboardGridDragSourceInternalState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    dashboardGridDragSourceClassNames.root,
    styles.root,
    state.disabled && styles.disabled,
    state.root.className,
  );
  if (state.preview) {
    state.preview.className = mergeClasses(
      dashboardGridDragSourceClassNames.preview,
      styles.preview,
      state.preview.className,
    );
  }
  return state;
};
