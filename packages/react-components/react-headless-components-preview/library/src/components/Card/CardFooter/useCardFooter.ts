'use client';

import type * as React from 'react';
import { useCardFooterBase_unstable } from '@fluentui/react-card';

import type { CardFooterProps, CardFooterState } from './CardFooter.types';

/**
 * Returns the state for a CardFooter component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderCardFooter`.
 */
export const useCardFooter = (props: CardFooterProps, ref: React.Ref<HTMLElement>): CardFooterState => {
  const state: CardFooterState = useCardFooterBase_unstable(props, ref);

  return state;
};
