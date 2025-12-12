'use client';

import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import type { TabSlots, TabState } from './Tab.types';

export const tabClassNames: SlotClassNames<TabSlots> = {
  root: 'fui-Tab',
  icon: 'fui-Tab__icon',
  content: 'fui-Tab__content',
};

export const tabReservedSpaceClassNames = {
  content: 'fui-Tab__content--reserved-space',
};

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles_unstable = (state: TabState): TabState => {
  'use no memo';

  useTabButtonStyles_unstable(state, state.root);
  useTabContentStyles_unstable(state);
  useTabIndicatorStyles_unstable(state);

  return state;
};

/**
 * Applies styles for the Tab indicator based on its current state.
 *
 * This hook is typically used internally by `useTabStyles_unstable`. You should
 * only use it directly if you're creating a custom `Tab` component.
 *
 * @param state - The `Tab` component's current state
 * @returns The state object with updated button styles
 */
export const useTabIndicatorStyles_unstable = (state: TabState): TabState => {
  return state;
};

/**
 * Applies styles to the Tab button slot based on its current state.
 *
 * This hook is typically used internally by `useTabStyles_unstable`. You should
 * only use it directly if you're creating a custom `Tab` component.
 *
 * @param state - The Tab component's current state
 * @param slot - The button slot of the Tab component
 * @returns The state object with updated button styles
 */
export const useTabButtonStyles_unstable = (state: TabState, slot: TabState['root']): TabState => {
  'use no memo';

  const { value, ...componentState } = state;

  slot.className = getComponentSlotClassName(tabClassNames.root, slot, componentState);

  return state;
};

/**
 * Applies styles to the Tab content slot based on its current state.
 *
 * This hook is typically used internally by `useTabStyles_unstable`. You should
 * only use it directly if you're creating a custom `Tab` component.
 *
 * @param state - The Tab component's current state
 * @returns The state object with updated content styles
 */
export const useTabContentStyles_unstable = (state: TabState): TabState => {
  'use no memo';

  if (state.icon) {
    state.icon.className = getComponentSlotClassName(tabClassNames.icon, state.icon);
  }

  // This needs to be before state.content.className is updated
  if (state.contentReservedSpace) {
    state.contentReservedSpace.className = getComponentSlotClassName(
      tabReservedSpaceClassNames.content,
      state.contentReservedSpace,
    );
    // FIXME: this is a deprecated API
    // should be removed in the next major version
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    state.contentReservedSpaceClassName = state.contentReservedSpace.className;
  }

  state.content.className = getComponentSlotClassName(tabClassNames.content, state.content);

  return state;
};
