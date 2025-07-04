import { makeResetStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';
import type { DrawerBodyState } from '@fluentui/react-drawer';
import { drawerBodyClassNames } from '@fluentui/react-drawer';

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
export const useSemanticDrawerBodyStyles = (_state: unknown): DrawerBodyState => {
  'use no memo';

  const state = _state as DrawerBodyState;

  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    drawerBodyClassNames.root,
    styles,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
