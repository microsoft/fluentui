import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InteractiveTabInternalSlots, InteractiveTabSlots, InteractiveTabState } from './InteractiveTab.types';
import { useTabButtonStyles, useTabContentStyles, useTabIndicatorStyles } from '../Tab/useTabStyles.styles';
import type { TabState } from '../Tab/Tab.types';

export const interactiveTabClassNames: SlotClassNames<InteractiveTabSlots> = {
  root: 'fui-InteractiveTab',
  button: 'fuiInteractiveTab__button',
  icon: 'fuiInteractiveTab__icon',
  content: 'fui-InteractiveTab__content',
  contentBefore: 'fui-InteractiveTab__before-content',
  contentAfter: 'fui-InteractiveTab__after-content',
};

const interactiveTabInternalClassNames: SlotClassNames<InteractiveTabInternalSlots> = {
  ...interactiveTabClassNames,
  contentReservedSpace: 'fui-InteractiveTab__content--reserved-space',
};

/**
 * Apply styling to the Tab slots based on the state
 */
export const useInteractiveTabStyles_unstable = (state: InteractiveTabState): InteractiveTabState => {
  'use no memo';

  const tabState = state as TabState;

  useTabIndicatorStyles(tabState, interactiveTabInternalClassNames);

  useTabContentStyles(tabState, interactiveTabInternalClassNames);

  useTabButtonStyles(tabState, state.button, interactiveTabInternalClassNames.button);

  return state;
};
