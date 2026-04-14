'use client';

import type * as React from 'react';
import { useTabListBase_unstable } from '@fluentui/react-tabs';

import type { TabListProps, TabListState } from './TabList.types';

/**
 * Returns the state for a TabList component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTabList`.
 */
export const useTabList = (props: TabListProps, ref: React.Ref<HTMLElement>): TabListState => {
  'use no memo';

  const state: TabListState = useTabListBase_unstable(props, ref);

  state.root.focusgroup = state.vertical ? 'tablist block wrap no-memory' : 'tablist inline wrap no-memory';

  return state;
};
