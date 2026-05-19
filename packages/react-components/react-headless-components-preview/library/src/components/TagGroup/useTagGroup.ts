'use client';

import * as React from 'react';
import { useTagGroupBase_unstable } from '@fluentui/react-tags';
import type { TagGroupContextValue } from '@fluentui/react-tags';

import type { TagGroupContextValues, TagGroupProps, TagGroupState } from './TagGroup.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a TagGroup component, given its props and ref.
 *
 * Headless: the canonical `useTagGroupBase_unstable` accepts pluggable
 * `arrowNavigationProps` and `onAfterTagDismiss` options for keyboard
 * navigation and post-dismiss focus restoration. The headless flavour omits
 * them - consumers wire those behaviours up themselves.
 */
export const useTagGroup = (props: TagGroupProps, ref: React.Ref<HTMLDivElement>): TagGroupState => {
  'use no memo';

  const state: TagGroupState = useTagGroupBase_unstable(props, ref);

  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-dismissible'] = stringifyDataAttribute(state.dismissible);

  return state;
};

/**
 * Maps the state of the TagGroup onto the context consumed by Tag children.
 * Forwards neutral design defaults so the base Tag hooks (which do not read
 * appearance/shape/size) still type-check against the canonical context value.
 */
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
