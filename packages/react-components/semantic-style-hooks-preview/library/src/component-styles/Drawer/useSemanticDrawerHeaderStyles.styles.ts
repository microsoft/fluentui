import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { drawerSeparatorStyles } from './semanticDrawSeparatorStyles';
import { drawerHeaderClassNames, type DrawerHeaderState } from '@fluentui/react-drawer';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
    '::after': {
      ...drawerSeparatorStyles,
      bottom: 0,
    },
  },

  separatorVisible: {
    '::after': {
      opacity: 1,
    },
  },
});

/**
 * Apply styling to the DrawerHeader slots based on the state
 */
export const useSemanticDrawerHeaderStyles = (_state: unknown): DrawerHeaderState => {
  'use no memo';

  const state = _state as DrawerHeaderState;

  const styles = useStyles();
  const rootStyles = useDrawerHeaderStyles();

  state.root.className = mergeClasses(
    state.root.className,
    drawerHeaderClassNames.root,
    styles,
    state.scrollState !== 'none' && rootStyles.separator,
    ['middle', 'bottom'].includes(state.scrollState) && rootStyles.separatorVisible,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
