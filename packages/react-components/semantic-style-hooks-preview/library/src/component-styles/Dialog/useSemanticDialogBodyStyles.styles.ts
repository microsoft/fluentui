import { makeResetStyles, mergeClasses } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';
import {
  dialogBodyClassNames,
  MEDIA_QUERY_BREAKPOINT_SELECTOR,
  MEDIA_QUERY_SHORT_SCREEN,
  type DialogBodyState,
} from '@fluentui/react-dialog';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

/**
 * Styles for the root slot
 */
const useResetStyles = makeResetStyles({
  overflow: 'unset',
  rowGap: semanticTokens._ctrlDialogGapBetweenContentMedium,
  columnGap: semanticTokens.gapBetweenContentSmall,
  display: 'grid',
  maxHeight: `calc(100vh - 2 * ${semanticTokens.paddingContentLarge})`,
  boxSizing: 'border-box',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: '1fr 1fr auto',

  '@supports (height: 1dvh)': {
    maxHeight: `calc(100dvh - 2 * ${semanticTokens.paddingContentLarge})`,
  },

  [MEDIA_QUERY_BREAKPOINT_SELECTOR]: {
    maxWidth: '100vw',
    gridTemplateRows: 'auto 1fr auto',
  },

  [MEDIA_QUERY_SHORT_SCREEN]: {
    maxHeight: 'unset',
  },
});

/**
 * Apply styling to the DialogBody slots based on the state
 */
export const useSemanticDialogBodyStyles = (_state: unknown): DialogBodyState => {
  'use no memo';

  const state = _state as DialogBodyState;
  const resetStyles = useResetStyles();

  state.root.className = mergeClasses(
    state.root.className,
    dialogBodyClassNames.root,
    resetStyles,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
