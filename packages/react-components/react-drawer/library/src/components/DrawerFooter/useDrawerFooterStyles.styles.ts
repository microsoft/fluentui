import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';

import { drawerSeparatorStyles } from '../../shared/drawerSeparatorStyles';

import type { DrawerFooterSlots, DrawerFooterState } from './DrawerFooter.types';

export const drawerFooterClassNames: SlotClassNames<DrawerFooterSlots> = {
  root: 'fui-DrawerFooter',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  width: '100%',
  maxWidth: '100%',
  padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalXXL}`,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  columnGap: tokens.spacingHorizontalS,
  boxSizing: 'border-box',
  position: 'relative',
  zIndex: 2,
});

const useDrawerFooterStyles = makeStyles({
  separator: {
    ':before': {
      ...drawerSeparatorStyles,
      top: 0,
    },
  },

  separatorVisible: {
    ':before': {
      opacity: 1,
    },
  },
});

/**
 * Apply styling to the DrawerFooter slots based on the state
 */
export const useDrawerFooterStyles_unstable = (state: DrawerFooterState): DrawerFooterState => {
  'use no memo';

  const styles = useStyles();
  const rootStyles = useDrawerFooterStyles();

  state.root.className = mergeClasses(
    drawerFooterClassNames.root,
    styles,
    state.scrollState !== 'none' && rootStyles.separator,
    ['middle', 'top'].includes(state.scrollState) && rootStyles.separatorVisible,
    state.root.className,
  );

  return state;
};
