import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { ButtonSlots, useButtonStyles_unstable } from '@fluentui/react-button';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { HamburgerState } from './Hamburger.types';
import { navItemTokens } from '../sharedNavStyles.styles';

export const hamburgerClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Hamburger',
  icon: 'fui-Hamburger__icon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    textDecorationLine: 'none',
    backgroundColor: navItemTokens.backgroundColor,
    ...shorthands.border('none'),
    ':hover': {
      backgroundColor: navItemTokens.backgroundColorHover,
    },
    ':active': {
      backgroundColor: navItemTokens.backgroundColorPressed,
    },
  },
});

/**
 * Apply styling to the Hamburger slots based on the state
 */
export const useHamburgerStyles_unstable = (state: HamburgerState): HamburgerState => {
  'use no memo';

  useButtonStyles_unstable(state);
  const styles = useStyles();

  state.root.className = mergeClasses(hamburgerClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(hamburgerClassNames.icon, state.icon.className);
  }

  return state;
};
