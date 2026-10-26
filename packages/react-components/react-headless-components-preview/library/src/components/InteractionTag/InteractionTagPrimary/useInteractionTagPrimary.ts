'use client';

import type * as React from 'react';
import { useInteractionTagPrimaryBase_unstable } from '@fluentui/react-tags';

import type { InteractionTagPrimaryProps, InteractionTagPrimaryState } from './InteractionTagPrimary.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for an InteractionTagPrimary component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderInteractionTagPrimary`.
 */
export const useInteractionTagPrimary = (
  props: InteractionTagPrimaryProps,
  ref: React.Ref<HTMLButtonElement>,
): InteractionTagPrimaryState => {
  const state: InteractionTagPrimaryState = useInteractionTagPrimaryBase_unstable(props, ref);

  /* eslint-disable react-hooks/immutability -- intentional: decorate base state with data-* attrs for styling */
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  state.root['data-selected'] = toDataAttributeValue(state.selected);
  state.root['data-has-secondary-action'] = toDataAttributeValue(state.hasSecondaryAction);
  /* eslint-enable react-hooks/immutability */

  return state;
};
