'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useLinkStyles_unstable } from '@fluentui/react-link';
import type { ToastLinkSlots, ToastLinkState } from './ToastLink.types';

export const toastLinkClassNames: SlotClassNames<ToastLinkSlots> = {
  root: 'fui-ToastLink',
};

/**
 * Toast-specific inverted brand color styles
 * Applied when ToastLink is rendered within an inverted Toast
 */
const useToastInvertedStyles = makeStyles({
  inverted: {
    color: tokens.colorBrandForegroundInverted,
    ':hover': {
      color: tokens.colorBrandForegroundInverted,
    },
    ':active': {
      color: tokens.colorBrandForegroundInverted,
    },
  },
});

/**
 * Apply styling to the ToastLink slots based on the state.
 */
export const useToastLinkStyles_unstable = (state: ToastLinkState): ToastLinkState => {
  'use no memo';

  const toastInvertedStyles = useToastInvertedStyles();
  const userClassName = state.root.className;

  state.root.className = undefined;

  // Apply base Link styles (handles appearance, backgroundAppearance, disabled, etc.)
  useLinkStyles_unstable(state);

  if (state.backgroundAppearance === 'inverted') {
    state.root.className = mergeClasses(
      toastLinkClassNames.root,
      state.root.className,
      toastInvertedStyles.inverted,
      userClassName,
    );
  } else {
    state.root.className = mergeClasses(toastLinkClassNames.root, state.root.className, userClassName);
  }

  return state;
};
