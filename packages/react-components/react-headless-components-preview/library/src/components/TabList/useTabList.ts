'use client';

import type * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { useTabListBase_unstable } from '@fluentui/react-tabs';

import type { TabListProps, TabListState } from './TabList.types';
import { useArrowNavigationGroup } from '../../hooks/focusgroup';

/**
 * Returns the state for a TabList component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTabList`.
 */
export const useTabList = (props: TabListProps, ref: React.Ref<HTMLElement>): TabListState => {
  const state: TabListState = useTabListBase_unstable(props, ref);

  const { ref: focusgroupRef, ...arrowNavigationAttributes } = useArrowNavigationGroup({
    axis: state.vertical ? 'vertical' : 'horizontal',
    circular: true,
    memorizeCurrent: false,
    behavior: 'tablist',
  });

  Object.assign(state.root, arrowNavigationAttributes);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-orientation'] = state.vertical ? 'vertical' : 'horizontal';

  // eslint-disable-next-line react-hooks/immutability
  state.root.ref = useMergedRefs(state.root.ref, focusgroupRef);

  return state;
};
