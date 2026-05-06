'use client';

import type * as React from 'react';
import { useDrawerFooter_unstable } from '@fluentui/react-drawer';
import type { DrawerFooterProps, DrawerFooterState } from './DrawerFooter.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for a DrawerFooter component, given its props and ref.
 */
export const useDrawerFooter = (props: DrawerFooterProps, ref: React.Ref<HTMLElement>): DrawerFooterState => {
  'use no memo';

  const state: DrawerFooterState = useDrawerFooter_unstable(props, ref);
  state.root['data-scroll-state'] = stringifyDataAttribute(state.scrollState);

  return state;
};
