'use client';

import type * as React from 'react';
import { useInteractionTagSecondaryBase_unstable } from '@fluentui/react-tags';

import type { InteractionTagSecondaryProps, InteractionTagSecondaryState } from './InteractionTagSecondary.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for an InteractionTagSecondary component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderInteractionTagSecondary`.
 */
export const useInteractionTagSecondary = (
  props: InteractionTagSecondaryProps,
  ref: React.Ref<HTMLButtonElement>,
): InteractionTagSecondaryState => {
  const state: InteractionTagSecondaryState = useInteractionTagSecondaryBase_unstable(props, ref);

  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-selected'] = stringifyDataAttribute(state.selected);

  return state;
};
