'use client';

import type * as React from 'react';
import { useNavContext, useNavSubItem as useNavSubItemBase } from '@fluentui/react-headless-components-preview/nav';
import type { NavSubItemProps, NavSubItemState } from './NavSubItem.types';

export const useNavSubItem = (
  props: NavSubItemProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): NavSubItemState => {
  const { density = 'medium' } = useNavContext();
  const state = useNavSubItemBase(props, ref);

  return {
    ...state,
    density,
    root: {
      ...state.root,
      'data-density': density,
    },
  };
};
