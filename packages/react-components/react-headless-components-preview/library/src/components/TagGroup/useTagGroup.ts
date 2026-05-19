'use client';

import * as React from 'react';
import { useTagGroupBase_unstable } from '@fluentui/react-tags';
import type { TagGroupContextValue } from '@fluentui/react-tags';

import type { TagGroupContextValues, TagGroupProps, TagGroupState } from './TagGroup.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a TagGroup component, given its props and ref.
 */
export const useTagGroup = (props: TagGroupProps, ref: React.Ref<HTMLDivElement>): TagGroupState => {
  const state: TagGroupState = useTagGroupBase_unstable(props, ref);

  /* eslint-disable react-hooks/immutability -- intentional: decorate base state with data-* attrs for styling */
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-dismissible'] = stringifyDataAttribute(state.dismissible);
  /* eslint-enable react-hooks/immutability */

  return state;
};

export const useTagGroupContextValues = (state: TagGroupState): TagGroupContextValues => {
  const { handleTagDismiss, handleTagSelect, selectedValues, disabled, dismissible, role } = state;

  const tagGroup: TagGroupContextValue = React.useMemo(
    () => ({
      handleTagDismiss,
      handleTagSelect,
      selectedValues,
      disabled,
      dismissible,
      role,
      size: 'medium',
      appearance: 'filled',
    }),
    [handleTagDismiss, handleTagSelect, selectedValues, disabled, dismissible, role],
  );

  return { tagGroup };
};
