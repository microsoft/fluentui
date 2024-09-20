import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
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

  transitionDuration: tokens.durationFaster,
  transitionProperty: 'background',
  transitionTimingFunction: tokens.curveEasyEase,

  ':hover .fui-NavItem': {
    backgroundColor: navItemTokens.backgroundColorHover,

    transitionDuration: tokens.durationFaster,
    transitionProperty: 'background',
    transitionTimingFunction: tokens.curveEasyEase,
  },
  ':hover': {
    backgroundColor: navItemTokens.backgroundColorHover,
  },

  ':active': {
    backgroundColor: navItemTokens.backgroundColorPressed,
  },
  // TODO add additional classes for different states and/or slots
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

  transitionDuration: tokens.durationFaster,
  transitionProperty: 'background',
  transitionTimingFunction: tokens.curveEasyEase,

  width: '100%',
  ':hover': {
    backgroundColor: 'unset',
  },
  ':active': {
    backgroundColor: 'unset',
  },
});

const useSecondaryActionButtonStyles = makeResetStyles({
  backgroundColor: navItemTokens.backgroundColorHover,

  maxWidth: '24px',
  minWidth: '24px',
  padding: '4px',

  transitionDuration: tokens.durationFaster,
  transitionProperty: 'background',
  transitionTimingFunction: tokens.curveEasyEase,
  paddingLeft: '4px',
  paddingRight: '4px',
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
    state.menuButton.className = mergeClasses(splitNavItemClassNames.menuButton, secondaryActionButtonClassNames);
  }

  return state;
};
