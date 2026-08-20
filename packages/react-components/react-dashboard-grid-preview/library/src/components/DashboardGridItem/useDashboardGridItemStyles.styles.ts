'use client';

import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { DashboardGridResizeEdge } from '../../interaction/types';

export type DashboardGridItemStyleState = {
  arranging?: boolean;
  root: { className?: string };
  content?: { className?: string };
  dragHandle?: { className?: string };
  subGrid?: { className?: string };
  resizeHandles?: Partial<Record<DashboardGridResizeEdge, { className?: string }>>;
};

export const dashboardGridItemClassNames = {
  root: 'fui-DashboardGridItem',
  content: 'fui-DashboardGridItem__content',
  dragHandle: 'fui-DashboardGridItem__dragHandle',
  resizeHandle: 'fui-DashboardGridItem__resizeHandle',
  subGrid: 'fui-DashboardGridItem__subGrid',
} as const;

const useRootStyles = makeResetStyles({
  position: 'relative',
  minWidth: 0,
  minHeight: 0,
  gridColumnStart: 'calc(var(--dashboard-grid-column) + 1)',
  gridColumnEnd: 'span var(--dashboard-grid-column-span)',
  gridRowStart: 'calc(var(--dashboard-grid-row) + 1)',
  gridRowEnd: 'span var(--dashboard-grid-row-span)',
  ...createFocusOutlineStyle({ selector: 'focus-within', style: {} }),
});

const useStyles = makeStyles({
  root: {
    borderRadius: tokens.borderRadiusMedium,
    transitionProperty: 'grid-column-start, grid-row-start, grid-column-end, grid-row-end',
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    '@media (prefers-reduced-motion: reduce)': {
      transitionProperty: 'none',
    },
  },
  arranging: {
    outlineStyle: 'solid',
    outlineWidth: tokens.strokeWidthThick,
    outlineColor: tokens.colorBrandStroke1,
    outlineOffset: tokens.strokeWidthThick,
  },
  content: {
    inlineSize: '100%',
    blockSize: '100%',
    minInlineSize: 0,
    minBlockSize: 0,
    overflow: 'auto',
  },
  dragHandle: {
    cursor: 'grab',
    touchAction: 'none',
    ':active': {
      cursor: 'grabbing',
    },
  },
  subGrid: {
    minInlineSize: 0,
    minBlockSize: 0,
  },
  resizeHandle: {
    position: 'absolute',
    zIndex: 2,
    inlineSize: tokens.spacingHorizontalS,
    blockSize: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone}`,
    ...shorthands.borderStyle('none'),
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackground1,
    touchAction: 'none',
    '@media (pointer: coarse)': {
      inlineSize: `calc(${tokens.spacingHorizontalL} + ${tokens.spacingHorizontalL} + ${tokens.spacingHorizontalL})`,
      blockSize: `calc(${tokens.spacingVerticalL} + ${tokens.spacingVerticalL} + ${tokens.spacingVerticalL})`,
      backgroundColor: tokens.colorTransparentBackground,
    },
    '@media (forced-colors: active)': {
      color: 'ButtonText',
      backgroundColor: 'ButtonFace',
      ...shorthands.borderColor('ButtonText'),
    },
  },
  north: {
    insetBlockStart: 0,
    insetInlineStart: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'ns-resize',
  },
  south: {
    insetBlockEnd: 0,
    insetInlineStart: '50%',
    transform: 'translate(-50%, 50%)',
    cursor: 'ns-resize',
  },
  east: {
    insetInlineEnd: 0,
    insetBlockStart: '50%',
    transform: 'translate(50%, -50%)',
    cursor: 'ew-resize',
  },
  west: {
    insetInlineStart: 0,
    insetBlockStart: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'ew-resize',
  },
  northEast: {
    insetBlockStart: 0,
    insetInlineEnd: 0,
    transform: 'translate(50%, -50%)',
    cursor: 'nesw-resize',
  },
  northWest: {
    insetBlockStart: 0,
    insetInlineStart: 0,
    transform: 'translate(-50%, -50%)',
    cursor: 'nwse-resize',
  },
  southEast: {
    insetBlockEnd: 0,
    insetInlineEnd: 0,
    transform: 'translate(50%, 50%)',
    cursor: 'nwse-resize',
  },
  southWest: {
    insetBlockEnd: 0,
    insetInlineStart: 0,
    transform: 'translate(-50%, 50%)',
    cursor: 'nesw-resize',
  },
});

const edgeClass = (
  edge: DashboardGridResizeEdge,
  styles: ReturnType<typeof useStyles>,
): string => {
  switch (edge) {
    case 'n':
      return styles.north;
    case 's':
      return styles.south;
    case 'e':
      return styles.east;
    case 'w':
      return styles.west;
    case 'ne':
      return styles.northEast;
    case 'nw':
      return styles.northWest;
    case 'se':
      return styles.southEast;
    case 'sw':
      return styles.southWest;
  }
};

export const useDashboardGridItemStyles_unstable = <TState extends DashboardGridItemStyleState>(
  state: TState,
): TState => {
  const rootStyles = useRootStyles();
  const styles = useStyles();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    dashboardGridItemClassNames.root,
    rootStyles,
    styles.root,
    state.arranging && styles.arranging,
    state.root.className,
  );
  if (state.content) {
    // eslint-disable-next-line react-hooks/immutability
    state.content.className = mergeClasses(
      dashboardGridItemClassNames.content,
      styles.content,
      state.content.className,
    );
  }
  if (state.dragHandle) {
    // eslint-disable-next-line react-hooks/immutability
    state.dragHandle.className = mergeClasses(
      dashboardGridItemClassNames.dragHandle,
      styles.dragHandle,
      state.dragHandle.className,
    );
  }
  if (state.subGrid) {
    // eslint-disable-next-line react-hooks/immutability
    state.subGrid.className = mergeClasses(
      dashboardGridItemClassNames.subGrid,
      styles.subGrid,
      state.subGrid.className,
    );
  }
  if (state.resizeHandles) {
    for (const [edge, handle] of Object.entries(state.resizeHandles) as Array<
      [DashboardGridResizeEdge, { className?: string }]
    >) {
      // eslint-disable-next-line react-hooks/immutability
      handle.className = mergeClasses(
        dashboardGridItemClassNames.resizeHandle,
        styles.resizeHandle,
        edgeClass(edge, styles),
        handle.className,
      );
    }
  }
  return state;
};
