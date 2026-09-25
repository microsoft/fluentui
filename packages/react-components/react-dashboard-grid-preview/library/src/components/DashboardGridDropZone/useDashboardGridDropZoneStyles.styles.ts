'use client';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DashboardGridDropZoneSlots } from './DashboardGridDropZone.types';
import type { DashboardGridDropZoneInternalState } from './useDashboardGridDropZone';

export const dashboardGridDropZoneClassNames: SlotClassNames<DashboardGridDropZoneSlots> = {
  root: 'fui-DashboardGridDropZone',
  indicator: 'fui-DashboardGridDropZone__indicator',
};

const useStyles = makeStyles({
  root: {
    position: 'relative',
    borderRadius: tokens.borderRadiusMedium,
  },
  disabled: {
    cursor: 'not-allowed',
  },
  indicator: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderRadius: tokens.borderRadiusMedium,
    opacity: 0,
    transitionProperty: 'opacity, transform',
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    '@media (prefers-reduced-motion: reduce)': {
      transitionProperty: 'none',
    },
  },
  active: {
    opacity: 1,
  },
  valid: {
    border: `${tokens.strokeWidthThick} solid ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
  },
  invalid: {
    border: `${tokens.strokeWidthThick} dashed ${tokens.colorPaletteRedBorder2}`,
    backgroundColor: tokens.colorPaletteRedBackground1,
    transform: 'scale(0.98)',
  },
  forcedColors: {
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
      ...shorthands.borderColor('CanvasText'),
      backgroundColor: 'Canvas',
    },
  },
});

export const useDashboardGridDropZoneStyles_unstable = (
  state: DashboardGridDropZoneInternalState,
): DashboardGridDropZoneInternalState => {
  const styles = useStyles();
  return {
    ...state,
    root: {
      ...state.root,
      className: mergeClasses(
        dashboardGridDropZoneClassNames.root,
        styles.root,
        state.disabled && styles.disabled,
        state.root.className,
      ),
    },
    indicator: state.indicator
      ? {
          ...state.indicator,
          className: mergeClasses(
            dashboardGridDropZoneClassNames.indicator,
            styles.indicator,
            state.dropState.active && styles.active,
            state.dropState.active && (state.dropState.valid ? styles.valid : styles.invalid),
            state.dropState.active && styles.forcedColors,
            state.indicator.className,
          ),
        }
      : undefined,
  };
};
