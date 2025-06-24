import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { motionTokens } from '@fluentui/react-motion';

import type { SplitNavItemSlots, SplitNavItemState } from './SplitNavItem.types';
import { navItemTokens, useRootDefaultClassName } from '../sharedNavStyles.styles';

export const splitNavItemClassNames: SlotClassNames<SplitNavItemSlots> = {
  root: 'fui-SplitNavItem',
  navItem: 'fui-SplitNavItem__navItem',
  actionButton: 'fui-SplitNavItem__actionButton',
  toggleButton: 'fui-SplitNavItem__toggleButton',
  menuButton: 'fui-SplitNavItem__menuButton',
  /**
   * Tooltips don't have a class name prop, so this is just to satisfy the linter.
   */
  actionButtonTooltip: 'fui-SplitNavItem__actionButtonTooltip',
  toggleButtonTooltip: 'fui-SplitNavItem__toggleButtonTooltip',
  menuButtonTooltip: 'fui-SplitNavItem__menuButtonTooltip',
};
// Don't use makeResetStyles here because the sub components call it once and
// This links says that makeResetStyles should only be called once per element
// https://griffel.js.org/react/api/make-reset-styles/#limitations

const { actionButton, toggleButton, menuButton } = splitNavItemClassNames;
const buttonHoverStyles = {
  [`& .${actionButton}, & .${toggleButton}, & .${menuButton}`]: {
    opacity: 1,
    pointerEvents: 'auto',
  },
};

/**
 * Styles for the root slot
 */
const useSplitNaveItemStyles = makeStyles({
  baseRoot: {
    display: 'flex',
    gap: 'unset',
    alignItems: 'stretch',
    padding: 'unset',
    textAlign: 'unset',
    backgroundColor: navItemTokens.backgroundColor,
    ...navItemTokens.transitionTokens,

    ':hover': {
      backgroundColor: navItemTokens.backgroundColorHover,
      ...buttonHoverStyles,
    },

    ':focus-within': buttonHoverStyles,

    ':active': {
      backgroundColor: navItemTokens.backgroundColorPressed,
    },
  },
  baseNavItem: {
    // styles that we want to disagree with the default on
    display: 'flex',
    textTransform: 'none',
    alignSelf: 'stretch',
    textAlign: 'left',
    position: 'relative',
    justifyContent: 'start',
    gap: tokens.spacingVerticalL,
    backgroundColor: 'transparent',
  },
  baseSecondary: {
    minWidth: '28px',
    paddingInlineEnd: '12px',
    paddingInlineStart: '5px',
    paddingBlockStart: '5px',
    alignItems: 'start',
  },
  baseMedium: {
    paddingBlockStart: '9px',
  },

  baseLarge: {
    paddingBlockStart: '12px',
  },

  hoverAction: {
    opacity: 0,
    pointerEvents: 'none',
    transition: `opacity ${motionTokens.durationFast}ms ${motionTokens.curveEasyEase}`,
    willChange: 'opacity',
  },
});

/**
 * Apply styling to the SplitNavItem slots based on the state
 */
export const useSplitNavItemStyles_unstable = (state: SplitNavItemState): SplitNavItemState => {
  'use no memo';

  const splitNavItemStyles = useSplitNaveItemStyles();
  const sharedRootClassNames = useRootDefaultClassName();

  state.root.className = mergeClasses(
    splitNavItemClassNames.root,
    sharedRootClassNames,
    splitNavItemStyles.baseRoot,
    state.root.className,
  );

  if (state.navItem) {
    state.navItem.className = mergeClasses(
      splitNavItemClassNames.navItem,
      splitNavItemStyles.baseNavItem,
      state.navItem.className,
    );
  }

  if (state.actionButton) {
    state.actionButton.className = mergeClasses(
      splitNavItemClassNames.actionButton,
      splitNavItemStyles.baseSecondary,
      splitNavItemStyles.hoverAction,
      state.density === 'medium' && splitNavItemStyles.baseMedium,
      state.actionButton.className,
    );
  }

  if (state.toggleButton) {
    state.toggleButton.className = mergeClasses(
      splitNavItemClassNames.toggleButton,
      splitNavItemStyles.baseSecondary,
      splitNavItemStyles.hoverAction,
      state.density === 'medium' && splitNavItemStyles.baseMedium,
      state.toggleButton.className,
    );
  }

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(
      splitNavItemClassNames.menuButton,
      splitNavItemStyles.baseSecondary,
      splitNavItemStyles.hoverAction,
      state.density === 'medium' && splitNavItemStyles.baseMedium,
      state.menuButton.className,
    );
  }

  return state;
};
