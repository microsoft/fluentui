import { makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { DrawerFooterSlots, DrawerFooterState } from './DrawerFooter.types';

export const drawerFooterClassNames: SlotClassNames<DrawerFooterSlots> = {
  root: 'fui-DrawerFooter',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalXXL, tokens.spacingVerticalXXL),

  width: '100%',
  maxWidth: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  columnGap: tokens.spacingHorizontalS,
  boxSizing: 'border-box',
});

/**
 * Apply styling to the DrawerFooter slots based on the state
 */
export const useDrawerFooterStyles_unstable = (state: DrawerFooterState): DrawerFooterState => {
  const styles = useStyles();

  state.root.className = mergeClasses(drawerFooterClassNames.root, styles, state.root.className);

  return state;
};
