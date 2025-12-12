'use client';

import { getComponentSlotClassName, SlotClassNames } from '@fluentui/react-utilities';
import type { TabListSlots, TabListState } from './TabList.types';

export const tabListClassNames: SlotClassNames<TabListSlots> = {
  root: 'fui-TabList',
};
/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles_unstable = (state: TabListState): TabListState => {
  'use no memo';

  const { selectedValue, ...componentState } = state;

  state.root.className = getComponentSlotClassName(tabListClassNames.root, state.root, componentState);

  return state;
};
