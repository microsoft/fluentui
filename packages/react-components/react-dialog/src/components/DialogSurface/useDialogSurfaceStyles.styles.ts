import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { MEDIA_QUERY_BREAKPOINT_SELECTOR, SURFACE_BORDER_WIDTH, SURFACE_PADDING } from '../../contexts';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';

export const dialogSurfaceClassNames: SlotClassNames<DialogSurfaceSlots> = {
  root: 'fui-DialogSurface',
  backdrop: 'fui-DialogSurface__backdrop',
};

/**
 * Styles for the root slot
 */
const useRootBaseStyle = makeResetStyles({
  ...createFocusOutlineStyle(),
  inset: 0,
  padding: SURFACE_PADDING,
  margin: 'auto',
  borderStyle: 'none',
  overflow: 'unset',
  border: `${SURFACE_BORDER_WIDTH} solid ${tokens.colorTransparentStroke}`,
  borderRadius: tokens.borderRadiusXLarge,

  display: 'block',
  userSelect: 'unset',
  visibility: 'unset',
  position: 'fixed',
  height: 'fit-content',
  maxWidth: '600px',
  maxHeight: '100vh',
  boxSizing: 'border-box',
  backgroundColor: tokens.colorNeutralBackground1,
  color: tokens.colorNeutralForeground1,

  [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
    maxWidth: '100vw',
  },
});

const rootVisible = {
  boxShadow: tokens.shadow64,
  transform: 'scale(1) translateZ(0)',
  opacity: 1,
};
const rootWhenAnimating = {
  transitionDuration: tokens.durationGentle,
  transitionProperty: 'opacity, transform, box-shadow',
  // // FIXME: https://github.com/microsoft/fluentui/issues/29473
  transitionTimingFunction: tokens.curveDecelerateMid,
};
const useRootStyles = makeStyles({
  animated: {
    // initial style before animation:
    opacity: 0,
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.1)',
    transform: 'scale(0.85) translateZ(0)',
  },
  static: {
    boxShadow: tokens.shadow64,
  },
  unmounted: {},
  entering: {
    ...rootWhenAnimating,
    ...rootVisible,
  },
  entered: rootVisible,
  idle: rootVisible,
  exiting: {
    ...rootWhenAnimating,
    transitionTimingFunction: tokens.curveAccelerateMin,
  },
  exited: {},
});

/**
 * Styles for the backdrop slot
 */
const backdropVisible = {
  opacity: 1,
};
const useBackdropBaseStyle = makeResetStyles({
  inset: '0px',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  position: 'fixed',

  // initial style before animation:
  transitionDuration: tokens.durationGentle,
  transitionTimingFunction: tokens.curveLinear,
  transitionProperty: 'opacity',
  willChange: 'opacity',
  opacity: 0,
});

const useBackdropStyles = makeStyles({
  nestedDialogBackdrop: {
    backgroundColor: tokens.colorTransparentBackground,
  },
  unmounted: {},
  entering: backdropVisible,
  entered: backdropVisible,
  idle: backdropVisible,
  exiting: {
    transitionTimingFunction: tokens.curveAccelerateMin,
  },
  exited: {},
});

/**
 * Apply styling to the DialogSurface slots based on the state
 */
export const useDialogSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  const { isNestedDialog, root, backdrop, transitionStatus } = state;

  const rootBaseStyle = useRootBaseStyle();
  const rootStyles = useRootStyles();

  const backdropBaseStyle = useBackdropBaseStyle();
  const backdropStyles = useBackdropStyles();

  root.className = mergeClasses(
    dialogSurfaceClassNames.root,
    rootBaseStyle,
    transitionStatus ? rootStyles.animated : rootStyles.static,
    transitionStatus && rootStyles[transitionStatus],
    root.className,
  );

  if (backdrop) {
    backdrop.className = mergeClasses(
      dialogSurfaceClassNames.backdrop,
      backdropBaseStyle,
      isNestedDialog && backdropStyles.nestedDialogBackdrop,
      transitionStatus && backdropStyles[transitionStatus],
      backdrop.className,
    );
  }

  return state;
};
