import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SplitNavItemSlots, SplitNavItemState } from './SplitNavItem.types';
import { navItemTokens, useRootDefaultClassName } from '../sharedNavStyles.styles';
import { tokens } from '@fluentui/react-theme';

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

    ':hover .fui-NavItem': navItemTokens.transitionTokens,
    ':active .fui-NavItem': navItemTokens.transitionTokens,
    ':hover .fui-NavSubItem': navItemTokens.transitionTokens,
    ':active .fui-NavSubItem': navItemTokens.transitionTokens,
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
  },
  baseSecondary: {
    maxWidth: '28px',
    minWidth: '28px',
    paddingInlineEnd: '12px',
    paddingInlineStart: '5px',
    paddingBlockStart: '5px',
    alignItems: 'start',
    backgroundColor: navItemTokens.backgroundColor,
    transitionDuration: navItemTokens.animationTokens.animationDuration,
    transitionTimingFunction: navItemTokens.animationTokens.animationTimingFunction,
    transitionProperty: 'background',

    ':hover': {
      backgroundColor: navItemTokens.backgroundColorHover,
    },
    ':active': {
      backgroundColor: navItemTokens.backgroundColorPressed,
    },
  },
  baseMedium: {
    paddingBlockStart: '9px',
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
      state.size === 'medium' && splitNavItemStyles.baseMedium,
      state.actionButton.className,
    );
  }

  if (state.toggleButton) {
    state.toggleButton.className = mergeClasses(
      splitNavItemClassNames.toggleButton,
      splitNavItemStyles.baseSecondary,
      state.size === 'medium' && splitNavItemStyles.baseMedium,
      state.toggleButton.className,
    );
  }

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(
      splitNavItemClassNames.menuButton,
      splitNavItemStyles.baseSecondary,
      state.size === 'medium' && splitNavItemStyles.baseMedium,
      state.menuButton.className,
    );
  }

  return state;
};
