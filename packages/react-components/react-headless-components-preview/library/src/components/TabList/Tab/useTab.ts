'use client';

import type * as React from 'react';
import { useTabBase_unstable } from '@fluentui/react-tabs';

import type { TabProps, TabState } from './Tab.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for a Tab component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTab`.
 */
export const useTab = (props: TabProps, ref: React.Ref<HTMLElement>): TabState => {
  'use no memo';

  const state: TabState = useTabBase_unstable(props, ref);

  state.root.focusgroupstart = stringifyDataAttribute(state.selected);
  state.root['data-icon-only'] = stringifyDataAttribute(state.iconOnly);
  state.root['data-selected'] = stringifyDataAttribute(state.selected);

  return state;
};
