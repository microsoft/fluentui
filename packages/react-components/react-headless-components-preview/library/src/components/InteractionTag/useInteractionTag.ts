'use client';

import type * as React from 'react';
import { useInteractionTagBase_unstable } from '@fluentui/react-tags';

import type { InteractionTagProps, InteractionTagState } from './InteractionTag.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Marks the root of an InteractionTag so TagGroup can tell which focusable elements are dismissed together.
 *
 * @internal
 */
export const INTERACTION_TAG_ATTRIBUTE = 'data-fui-interaction-tag';

/**
 * Returns the state for an InteractionTag component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderInteractionTag`.
 */
export const useInteractionTag = (props: InteractionTagProps, ref: React.Ref<HTMLDivElement>): InteractionTagState => {
  const state: InteractionTagState = useInteractionTagBase_unstable(props, ref);

  /* eslint-disable react-hooks/immutability -- intentional: decorate base state with data-* attrs for styling */
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  state.root['data-selected'] = toDataAttributeValue(state.selected);
  /* eslint-enable react-hooks/immutability */
  Object.assign(state.root, { [INTERACTION_TAG_ATTRIBUTE]: '' });

  return state;
};
