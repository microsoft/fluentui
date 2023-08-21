import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';

import {
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
  SURFACE_BORDER_WIDTH,
  SURFACE_PADDING,
  useDialogContext_unstable,
} from '../../contexts';
import type { DialogSurfaceSlots, DialogSurfaceState } from './DialogSurface.types';
import { useMotionStyles } from '@fluentui/react-motion-preview/src/index';

export const dialogSurfaceClassNames: SlotClassNames<DialogSurfaceSlots> = {
  root: 'fui-DialogSurface',
  backdrop: 'fui-DialogSurface__backdrop',
};

/**
 * Styles for the root slot
 */
const backdropBackground = {
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
};
const useSurfaceStyles = makeStyles({
  focusOutline: createFocusOutlineStyle(),
  root: {
    ...shorthands.inset(0),
    ...shorthands.padding(0),
    ...shorthands.padding(SURFACE_PADDING),
    ...shorthands.margin('auto'),
    ...shorthands.borderStyle('none'),
    ...shorthands.overflow('unset'),
    ...shorthands.border(SURFACE_BORDER_WIDTH, 'solid', tokens.colorTransparentStroke),
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),

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
    opacity: 0,
    transform: 'scale(0.85) translate3D(0, 10%, 0)',
    transitionDuration: tokens.durationNormal,
    transitionProperty: 'opacity, transform, box-shadow',

    '&::backdrop': backdropBackground,

    [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
      maxWidth: '100vw',
    },
  },

  visible: {
    boxShadow: tokens.shadow64,
    opacity: 1,
    transform: 'scale(1) translate3D(0, 0, 0)',
  },

  entering: {
    transitionTimingFunction: tokens.curveDecelerateMid,
  },
  exiting: {
    transitionTimingFunction: tokens.curveAccelerateMin,
  },
});

const useBackdropStyles = makeStyles({
  backdrop: {
    ...shorthands.inset('0px'),
    ...backdropBackground,
    position: 'fixed',
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveLinear,
    transitionProperty: 'opacity',
    willChange: 'opacity',
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  nestedDialogBackdrop: {
    backgroundColor: 'transparent',
  },
  nestedNativeDialogBackdrop: {
    '&::backdrop': {
      backgroundColor: 'transparent',
    },
  },
});

/**
 * Apply styling to the DialogSurface slots based on the state
 */
export const useDialogSurfaceStyles_unstable = (state: DialogSurfaceState): DialogSurfaceState => {
  const surfaceStyles = useSurfaceStyles();
  const backdropStyles = useBackdropStyles();
  const isNestedDialog = useDialogContext_unstable(ctx => ctx.isNestedDialog);

  const motionClasses = useMotionStyles(
    state.motion,
    mergeClasses(
      state.motion.isActive() && surfaceStyles.visible,
      state.motion.type === 'entering' && surfaceStyles.entering,
      state.motion.type === 'exiting' && surfaceStyles.exiting,
    ),
  );

  const backdropMotionClasses = useMotionStyles(
    state.backdropMotion,
    mergeClasses(state.backdropMotion.isActive() && backdropStyles.visible),
  );

  state.root.className = mergeClasses(
    dialogSurfaceClassNames.root,
    surfaceStyles.root,
    surfaceStyles.focusOutline,
    isNestedDialog && backdropStyles.nestedNativeDialogBackdrop,
    motionClasses,
    state.root.className,
  );

  if (state.backdrop) {
    state.backdrop.className = mergeClasses(
      dialogSurfaceClassNames.backdrop,
      backdropStyles.backdrop,
      isNestedDialog && backdropStyles.nestedDialogBackdrop,
      backdropMotionClasses,
      state.backdrop.className,
    );
  }

  return state;
};
