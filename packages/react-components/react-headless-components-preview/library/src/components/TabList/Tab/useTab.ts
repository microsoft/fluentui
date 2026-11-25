'use client';

import type * as React from 'react';
import { useTabBase_unstable } from '@fluentui/react-tabs';

import type { TabProps, TabState } from './Tab.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a Tab component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTab`.
 */
export const useTab = (props: TabProps, ref: React.Ref<HTMLElement>): TabState => {
  const state: TabState = useTabBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root.focusgroupstart = toDataAttributeValue(state.selected);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-icon-only'] = toDataAttributeValue(state.iconOnly);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selected'] = toDataAttributeValue(state.selected);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);

  return state;
};
