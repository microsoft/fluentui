'use client';

import type * as React from 'react';
import { useInteractionTagBase_unstable } from '@fluentui/react-tags';

import type { InteractionTagProps, InteractionTagState } from './InteractionTag.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for an InteractionTag component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderInteractionTag`.
 */
export const useInteractionTag = (props: InteractionTagProps, ref: React.Ref<HTMLDivElement>): InteractionTagState => {
  const state: InteractionTagState = useInteractionTagBase_unstable(props, ref);

  /* eslint-disable react-hooks/immutability -- intentional: decorate base state with data-* attrs for styling */
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-selected'] = stringifyDataAttribute(state.selected);
  /* eslint-enable react-hooks/immutability */

  return state;
};
