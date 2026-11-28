'use client';

import type * as React from 'react';
import { useNavBase_unstable } from '@fluentui/react-nav';
import type { NavProps, NavState } from './Nav.types';

export const useNav = (props: NavProps, ref: React.Ref<HTMLDivElement>): NavState => {
  const state: NavState = useNavBase_unstable(props, ref);

  state.root.role ??= 'navigation';

  return state;
};
