'use client';

import type * as React from 'react';
import { useInlineDrawerBase_unstable } from '@fluentui/react-drawer';

import { stringifyDataAttribute } from '../../../utils';
import type { InlineDrawerProps, InlineDrawerState } from './InlineDrawer.types';

/**
 * Returns the state for an InlineDrawer component, given its props and ref.
 */
export const useInlineDrawer = (props: InlineDrawerProps, ref: React.Ref<HTMLElement>): InlineDrawerState => {
  const state: InlineDrawerState = useInlineDrawerBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-open'] = stringifyDataAttribute(state.open);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-position'] = state.position;

  return state;
};
