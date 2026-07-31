'use client';

import type * as React from 'react';
import { useNavSubItemBase_unstable } from '@fluentui/react-nav';
import { stringifyDataAttribute } from '../../../utils';
import type { NavSubItemProps, NavSubItemState } from './NavSubItem.types';

export const useNavSubItem = (
  props: NavSubItemProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): NavSubItemState => {
  const state: NavSubItemState = useNavSubItemBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selected'] = stringifyDataAttribute(state.selected);

  return state;
};
