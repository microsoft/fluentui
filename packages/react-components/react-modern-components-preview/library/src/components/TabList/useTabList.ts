'use client';

import type * as React from 'react';
import {
  useTabList as useTabListBase,
  useTabListContextValues,
} from '@fluentui/react-headless-components-preview/tab-list';
import type { TabListProps, TabListState } from './TabList.types';

export { useTabListContextValues };

export const useTabList = (props: TabListProps, ref: React.Ref<HTMLElement>): TabListState => {
  const { appearance = 'transparent', reserveSelectedTabSpace = true, size = 'medium', ...rest } = props;
  const state = useTabListBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-size': size,
    },
    appearance,
    reserveSelectedTabSpace,
    size,
  };
};
