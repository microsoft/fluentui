'use client';

import type * as React from 'react';
import { useNavBase_unstable } from '@fluentui/react-nav';
import type { NavProps, NavState } from './Nav.types';

export const useNav = (props: NavProps, ref: React.Ref<HTMLDivElement>): NavState => {
  const state: NavState = useNavBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root.focusgroup = 'toolbar block wrap';
  // eslint-disable-next-line react-hooks/immutability
  state.root.role = 'navigation';

  return state;
};
