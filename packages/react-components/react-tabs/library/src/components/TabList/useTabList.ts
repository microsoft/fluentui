'use client';

import * as React from 'react';
import type { TabListProps, TabListState } from './TabList.types';
import { useTabListBase_unstable } from './useTabListBase';

/**
 * Create the state required to render TabList.
 *
 * The returned state can be modified with hooks such as useTabListStyles_unstable,
 * before being passed to renderTabList_unstable.
 *
 * @param props - props from this instance of TabList
 * @param ref - reference to root HTMLElement of TabList
 */
export const useTabList_unstable = (props: TabListProps, ref: React.Ref<HTMLElement>): TabListState => {
  const { appearance = 'transparent', reserveSelectedTabSpace = true, size = 'medium' } = props;
  const state = useTabListBase_unstable(props, ref);

  return {
    ...state,
    appearance,
    reserveSelectedTabSpace,
    size,
  };
};
