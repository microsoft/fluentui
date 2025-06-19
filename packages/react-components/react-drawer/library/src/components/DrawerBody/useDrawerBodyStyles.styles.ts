import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

import type { DrawerBodySlots, DrawerBodyState } from './DrawerBody.types';

export const drawerBodyClassNames: SlotClassNames<DrawerBodySlots> = {
  root: 'fui-DrawerBody',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  padding: `0 ${semanticTokens.paddingContentLarge}`,
  flex: 1,
  alignSelf: 'stretch',
  position: 'relative',
  zIndex: 1,
  overflow: 'auto',

  ':last-child': {
    paddingBottom: `calc(${semanticTokens.paddingContentLarge} + 1px)`,
  },

  ':first-child': {
    paddingTop: `calc(${semanticTokens.paddingContentLarge} + 1px)`,
  },
});

/**
 * Apply styling to the DrawerBody slots based on the state
 */
export const useDrawerBodyStyles_unstable = (state: DrawerBodyState): DrawerBodyState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(drawerBodyClassNames.root, styles, state.root.className);

  return state;
};
