'use client';

import type * as React from 'react';
import { useCardHeaderBase_unstable } from '@fluentui/react-card';

import type { CardHeaderProps, CardHeaderState } from './CardHeader.types';

/**
 * Returns the state for a CardHeader component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderCardHeader`.
 */
export const useCardHeader = (props: CardHeaderProps, ref: React.Ref<HTMLElement>): CardHeaderState => {
  const state: CardHeaderState = useCardHeaderBase_unstable(props, ref);

  return state;
};
