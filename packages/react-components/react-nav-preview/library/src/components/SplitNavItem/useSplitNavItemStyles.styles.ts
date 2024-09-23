import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SplitNavItemSlots, SplitNavItemState } from './SplitNavItem.types';
import { navItemTokens, useRootDefaultClassName } from '../sharedNavStyles.styles';
import { tokens } from '@fluentui/react-theme';

export const splitNavItemClassNames: SlotClassNames<SplitNavItemSlots> = {
  root: 'fui-SplitNavItem',
  primaryNavItem: 'fui-SplitNavItem_primaryNavItem',
  menuButton: 'fui-SplitNavItem_menuButton',
  secondaryActionButton: 'fui-SplitNavItem_secondaryActionButton',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeResetStyles({
  gap: 'unset',
  alignItems: 'center',
  padding: 'unset',

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
});

const usePrimaryNavItemStyles = makeResetStyles({
  display: 'flex',
  textTransform: 'none',
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

  // transitionDuration: navItemTokens.animationTokens.animationDuration,
  // transitionTimingFunction: navItemTokens.animationTokens.animationTimingFunction,
  // transitionProperty: 'background',

  width: '100%',
});

const useSecondaryActionButtonStyles = makeResetStyles({
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
});

/**
 * Apply styling to the SplitNavItem slots based on the state
 */
export const useSplitNavItemStyles_unstable = (state: SplitNavItemState): SplitNavItemState => {
  'use no memo';

  const localRootClassNames = useRootStyles();
  const sharedRootClassNames = useRootDefaultClassName();
  const primaryNavItemClassNames = usePrimaryNavItemStyles();
  const secondaryActionButtonClassNames = useSecondaryActionButtonStyles();

  state.root.className = mergeClasses(
    splitNavItemClassNames.root,
    sharedRootClassNames,
    localRootClassNames,
    state.root.className,
  );

  if (state.primaryNavItem) {
    state.primaryNavItem.className = mergeClasses(
      splitNavItemClassNames.primaryNavItem,
      primaryNavItemClassNames,
      state.primaryNavItem.className,
    );
  }

  if (state.secondaryActionButton) {
    state.secondaryActionButton.className = mergeClasses(
      splitNavItemClassNames.secondaryActionButton,
      secondaryActionButtonClassNames,
    );
  }

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(
      splitNavItemClassNames.menuButton,
      secondaryActionButtonClassNames,
      state.menuButton.className,
    );
  }

  return state;
};
