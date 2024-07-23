import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';

import { drawerSeparatorStyles } from '../../shared/drawerSeparatorStyles';

import type { DrawerHeaderSlots, DrawerHeaderState } from './DrawerHeader.types';

export const drawerHeaderClassNames: SlotClassNames<DrawerHeaderSlots> = {
  root: 'fui-DrawerHeader',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  width: '100%',
  maxWidth: '100%',
  padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalS}`,
  gap: tokens.spacingHorizontalS,
  alignSelf: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  position: 'relative',
  zIndex: 2,
});

const useDrawerHeaderStyles = makeStyles({
  separator: {
    ':after': {
      ...drawerSeparatorStyles,
      bottom: 0,
    },
  },

  separatorVisible: {
    ':after': {
      opacity: 1,
    },
  },
});

/**
 * Apply styling to the DrawerHeader slots based on the state
 */
export const useDrawerHeaderStyles_unstable = (state: DrawerHeaderState): DrawerHeaderState => {
  'use no memo';

  const styles = useStyles();
  const rootStyles = useDrawerHeaderStyles();

  state.root.className = mergeClasses(
    drawerHeaderClassNames.root,
    styles,
    state.scrollState !== 'none' && rootStyles.separator,
    ['middle', 'bottom'].includes(state.scrollState) && rootStyles.separatorVisible,
    state.root.className,
  );

  return state;
};
