'use client';

import type * as React from 'react';
import { useCardBase_unstable, useCardContext_unstable } from '@fluentui/react-card';

import type { CardContextValue, CardProps, CardState } from './Card.types';

/**
 * Returns the state for a Card component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderCard`.
 */
export const useCard = (props: CardProps, ref: React.Ref<HTMLDivElement>): CardState => {
  const state: CardState = useCardBase_unstable(props, ref);

  return state;
};

/**
 * Returns the context value provided by the nearest Card, enabling child components to
 * read card-level state such as the selectable accessibility properties.
 */
export const useCardContext = useCardContext_unstable;

/**
 * Maps Card state to the context value passed down to child components.
 */
export const useCardContextValue = ({ selectableA11yProps }: CardState): CardContextValue => {
  return { selectableA11yProps };
};
