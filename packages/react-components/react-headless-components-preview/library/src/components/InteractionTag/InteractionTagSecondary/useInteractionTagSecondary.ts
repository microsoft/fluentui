'use client';

import type * as React from 'react';
import { useInteractionTagSecondaryBase_unstable } from '@fluentui/react-tags';

import type { InteractionTagSecondaryProps, InteractionTagSecondaryState } from './InteractionTagSecondary.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for an InteractionTagSecondary component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderInteractionTagSecondary`.
 */
export const useInteractionTagSecondary = (
  props: InteractionTagSecondaryProps,
  ref: React.Ref<HTMLButtonElement>,
): InteractionTagSecondaryState => {
  const state: InteractionTagSecondaryState = useInteractionTagSecondaryBase_unstable(props, ref);

  /* eslint-disable react-hooks/immutability -- intentional: decorate base state with data-* attrs for styling */
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  state.root['data-selected'] = toDataAttributeValue(state.selected);
  /* eslint-enable react-hooks/immutability */

  return state;
};
