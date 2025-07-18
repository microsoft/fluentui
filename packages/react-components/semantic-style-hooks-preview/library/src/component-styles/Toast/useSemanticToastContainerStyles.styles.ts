import { makeResetStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { toastContainerClassNames, type ToastContainerState } from '@fluentui/react-toast';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';


const useRootBaseClassName = makeResetStyles({
  boxSizing: 'border-box',
  marginTop: semanticTokens.gapBetweenCtrlLgDefault,
  pointerEvents: 'all',
  borderRadius: semanticTokens._ctrlToastContainerFlyoutRest,
  ...createCustomFocusIndicatorStyle({
    outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens._ctrlToastContainerCtrlFocusOuterStroke}`,
  }),
});

/**
 * Apply styling to the ToastContainer slots based on the state
 */
export const useSemanticToastContainerStyles = (_state: unknown): ToastContainerState => {
  'use no memo';

  const state = _state as ToastContainerState;

  const rootBaseClassName = useRootBaseClassName();
  state.root.className = mergeClasses(state.root.className, toastContainerClassNames.root, rootBaseClassName, getSlotClassNameProp_unstable(state.root));

  return state;
};
