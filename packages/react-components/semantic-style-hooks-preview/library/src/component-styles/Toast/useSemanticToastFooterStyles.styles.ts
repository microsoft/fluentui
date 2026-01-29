import { makeResetStyles, mergeClasses } from '@griffel/react';
import { toastFooterClassNames, type ToastFooterState } from '@fluentui/react-toast';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

/**
 * Styles for the root slot
 */
const useRootBaseClassName = makeResetStyles({
  paddingTop: semanticTokens._ctrlToastFooterPaddingContentSmall,
  gridColumnStart: 2,
  gridColumnEnd: 3,
  display: 'flex',
  alignItems: 'center',
  gap: semanticTokens._ctrlToastFooterGapBetweenCtrlDefault,
});

/**
 * Apply styling to the ToastFooter slots based on the state
 */
export const useSemanticToastFooterStyles = (_state: unknown): ToastFooterState => {
  'use no memo';

  const state = _state as ToastFooterState;

  const rootBaseClassName = useRootBaseClassName();
  state.root.className = mergeClasses(
    state.root.className,
    toastFooterClassNames.root,
    rootBaseClassName,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
