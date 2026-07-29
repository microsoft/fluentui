'use client';

import type * as React from 'react';
import { useDrawerHeader_unstable } from '@fluentui/react-drawer';
import type { DrawerHeaderProps, DrawerHeaderState } from './DrawerHeader.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for a DrawerHeader component, given its props and ref.
 */
export const useDrawerHeader = (props: DrawerHeaderProps, ref: React.Ref<HTMLElement>): DrawerHeaderState => {
  const state: DrawerHeaderState = useDrawerHeader_unstable(props, ref);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-scroll-state'] = stringifyDataAttribute(state.scrollState);

  return state;
};
