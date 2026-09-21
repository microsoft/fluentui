'use client';

import type * as React from 'react';
import { useTagGroupBase_unstable } from '@fluentui/react-tags';

import type { TagGroupProps, TagGroupState } from './TagGroup.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a TagGroup component, given its props and ref.
 */
export const useTagGroup = (props: TagGroupProps, ref: React.Ref<HTMLDivElement>): TagGroupState => {
  const state: TagGroupState = useTagGroupBase_unstable(props, ref);

  /* eslint-disable react-hooks/immutability -- intentional: decorate base state with focusgroup + data-* attrs */
  state.root.focusgroup = 'toolbar inline wrap';
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  state.root['data-dismissible'] = toDataAttributeValue(state.dismissible);
  /* eslint-enable react-hooks/immutability */

  return state;
};
