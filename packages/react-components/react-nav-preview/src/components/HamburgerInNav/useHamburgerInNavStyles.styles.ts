import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { ButtonSlots, useButtonStyles_unstable } from '@fluentui/react-components';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { HamburgerInNavState } from './HamburgerInNav.types';
import { navItemTokens } from '../sharedNavStyles.styles';

export const hamburgerInNavClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-HamburgerInNav',
  icon: 'fui-HamburgerInNav__icon',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    marginTop: '10px',
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
 * Apply styling to the HamburgerInNav slots based on the state
 */
export const useHamburgerInNavStyles_unstable = (state: HamburgerInNavState): HamburgerInNavState => {
  useButtonStyles_unstable(state);
  const styles = useStyles();

  state.root.className = mergeClasses(hamburgerInNavClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(hamburgerInNavClassNames.icon, state.icon.className);
  }

  return state;
};
