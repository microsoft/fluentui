'use client';

import type * as React from 'react';
import { useTabBase_unstable } from '@fluentui/react-tabs';

import type { TabProps, TabState } from './Tab.types';

/**
 * Returns the state for a Tab component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTab`.
 */
export const useTab = (props: TabProps, ref: React.Ref<HTMLElement>): TabState => {
  'use no memo';

  const state: TabState = useTabBase_unstable(props, ref);

  state.root.focusgroupstart = state.selected ? '' : undefined;

  state.root['data-icon-only'] = state.iconOnly ? '' : undefined;
  state.root['data-selected'] = state.selected ? '' : undefined;

  return state;
};
