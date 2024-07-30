import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InteractiveTabSlots, InteractiveTabState } from './InteractiveTab.types';
import { tabClassNames, useTabButtonStyles, useTabContentStyles, useTabIndicatorStyles } from '../Tab';
import type { TabState } from '../Tab';
import { mergeClasses } from '@griffel/react';

export const interactiveTabClassNames: SlotClassNames<InteractiveTabSlots> = {
  ...tabClassNames,
  button: 'fui-Tab__button',
  contentBefore: 'fui-Tab__content-before',
  contentAfter: 'fui-Tab__content-after',
};

/**
 * Apply styling to the Tab slots based on the state
 */
export const useInteractiveTabStyles_unstable = (state: InteractiveTabState): InteractiveTabState => {
  'use no memo';

  const tabState = state as TabState;

  useTabIndicatorStyles(tabState);

  useTabContentStyles(tabState);

  useTabButtonStyles(tabState, state.button, interactiveTabClassNames.button);

  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(interactiveTabClassNames.contentBefore, state.contentBefore.className);
  }

  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(interactiveTabClassNames.contentAfter, state.contentAfter.className);
  }

  return state;
};
