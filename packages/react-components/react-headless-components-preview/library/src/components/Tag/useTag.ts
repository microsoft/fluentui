'use client';

import type * as React from 'react';
import { useTagBase_unstable } from '@fluentui/react-tags';

import type { TagProps, TagState } from './Tag.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a Tag component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTag`.
 */
export const useTag = (props: TagProps, ref: React.Ref<HTMLSpanElement | HTMLButtonElement>): TagState => {
  const state: TagState = useTagBase_unstable(props, ref);

  /* eslint-disable react-hooks/immutability -- intentional: decorate base state with data-* attrs for styling */
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  state.root['data-dismissible'] = toDataAttributeValue(state.dismissible);
  state.root['data-selected'] = toDataAttributeValue(state.selected);
  /* eslint-enable react-hooks/immutability */

  return state;
};
