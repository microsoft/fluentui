import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SplitNavItemSlots, SplitNavItemState } from './SplitNavItem.types';
import { navItemTokens, useRootDefaultClassName } from '../sharedNavStyles.styles';
import { tokens } from '@fluentui/react-theme';

export const splitNavItemClassNames: SlotClassNames<SplitNavItemSlots> = {
  root: 'fui-SplitNavItem',
  primaryNavItem: 'fui-SplitNavItem_primaryNavItem',
  secondaryActionButton: 'fui-SplitNavItem_secondaryActionButton',
  secondaryToggleButton: 'fui-SplitNavItem_secondaryToggleButton',
  menuButton: 'fui-SplitNavItem_menuButton',
};
// Don't use makeResetStyles here because the subcomponents call it once and
// This links says that makeResetStyles should only be called once per element
// https://griffel.js.org/react/api/make-reset-styles/#limitations

/**
 * Styles for the root slot
 */
const useSplitNaveItemStyles = makeStyles({
  baseRoot: {
    gap: 'unset',
    alignItems: 'start',
    padding: 'unset',
    textAlign: 'unset',
    backgroundColor: navItemTokens.backgroundColor,

    transitionDuration: navItemTokens.animationTokens.animationDuration,
    transitionTimingFunction: navItemTokens.animationTokens.animationTimingFunction,
    transitionProperty: 'background',

    ':hover .fui-NavItem': {
      backgroundColor: navItemTokens.backgroundColorHover,
      transitionDuration: navItemTokens.animationTokens.animationDuration,
      transitionTimingFunction: navItemTokens.animationTokens.animationTimingFunction,
      transitionProperty: 'background',
    },

    ':active .fui-NavItem': {
      backgroundColor: navItemTokens.backgroundColorPressed,
      transitionDuration: navItemTokens.animationTokens.animationDuration,
      transitionTimingFunction: navItemTokens.animationTokens.animationTimingFunction,
      transitionProperty: 'background',
    },
  },
  basePrimaryNavItem: {
    // styles that we want to disagree with the default on
    display: 'flex',
    textTransform: 'none',
    textAlign: 'left',
    position: 'relative',
    justifyContent: 'start',
    gap: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalS} ${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
    backgroundColor: navItemTokens.backgroundColor,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground2,
    textDecorationLine: 'none',
    border: 'none',
    // this element can change between a button and an anchor
    // so we need to reset box sizing to prevent horizontal overflow
    boxSizing: 'border-box',
    cursor: 'pointer',
    width: '100%',
  },
  baseSecondary: {
    maxWidth: '24px',
    minWidth: '24px',
    paddingLeft: '4px', // todo use logical properties
    paddingRight: '4px',

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
  secondaryMedium: {
    marginBlockStart: '4px',
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

  if (state.primaryNavItem) {
    state.primaryNavItem.className = mergeClasses(
      splitNavItemClassNames.primaryNavItem,
      splitNavItemStyles.basePrimaryNavItem,
      state.primaryNavItem.className,
    );
  }

  if (state.secondaryActionButton || state.secondaryToggleButton || state.menuButton) {
    // These should be the same for all 3 buttons
    // and only computed once if present
    const mergedSecondaryClassNames = mergeClasses(
      splitNavItemStyles.baseSecondary,
      state.size === 'medium' && splitNavItemStyles.secondaryMedium,
    );

    if (state.secondaryActionButton) {
      state.secondaryActionButton.className = mergeClasses(
        splitNavItemClassNames.secondaryActionButton,
        mergedSecondaryClassNames,
        state.secondaryActionButton.className,
      );
    }

    if (state.secondaryToggleButton) {
      state.secondaryToggleButton.className = mergeClasses(
        splitNavItemClassNames.secondaryToggleButton,
        mergedSecondaryClassNames,
        state.secondaryToggleButton.className,
      );
    }

    if (state.menuButton) {
      state.menuButton.className = mergeClasses(
        splitNavItemClassNames.menuButton,
        mergedSecondaryClassNames,
        state.menuButton.className,
      );
    }
  }

  return state;
};
