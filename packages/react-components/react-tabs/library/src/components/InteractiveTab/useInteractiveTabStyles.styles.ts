import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InteractiveTabSlots, InteractiveTabState } from './InteractiveTab.types';
import { useTabButtonStyles, useTabContentStyles, useTabIndicatorStyles } from '../Tab';
import type { TabState } from '../Tab';
import { mergeClasses } from '@griffel/react';

export const interactiveTabClassNames: SlotClassNames<InteractiveTabSlots> = {
  root: 'fui-InteractiveTab',
  icon: 'fui-InteractiveTab__icon',
  content: 'fui-InteractiveTab__content',
  button: 'fui-InteractiveTab__button',
  contentBefore: 'fui-InteractiveTab__contentBefore',
  contentAfter: 'fui-InteractiveTab__contentAfter',
};

const reservedSpaceClassNames = {
  content: 'fui-Tab__content--reserved-space',
};

/**
 * Apply styling to the Tab slots based on the state
 */
export const useInteractiveTabStyles_unstable = (state: InteractiveTabState): InteractiveTabState => {
  'use no memo';

  const tabState = state as TabState;

  useTabIndicatorStyles(tabState);

  useTabContentStyles(tabState);

  useTabButtonStyles(tabState, state.button);

  state.root.className = mergeClasses(interactiveTabClassNames.root, state.root.className);
  state.button.className = mergeClasses(interactiveTabClassNames.button, state.button.className);
  state.content.className = mergeClasses(interactiveTabClassNames.content, state.content.className);

  if (state.icon) {
    state.icon.className = mergeClasses(interactiveTabClassNames.icon, state.icon.className);
  }

  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(interactiveTabClassNames.contentBefore, state.contentBefore.className);
  }

  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(interactiveTabClassNames.contentAfter, state.contentAfter.className);
  }

  if (state.contentReservedSpace) {
    state.contentReservedSpace.className = mergeClasses(
      reservedSpaceClassNames.content,
      state.contentReservedSpace.className,
    );
  }

  return state;
};
