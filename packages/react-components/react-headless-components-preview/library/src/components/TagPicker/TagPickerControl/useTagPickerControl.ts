'use client';

import type * as React from 'react';
import { useTagPickerControlBase_unstable } from '@fluentui/react-tag-picker';

import type { TagPickerControlProps, TagPickerControlState } from './TagPickerControl.types';
import { stringifyDataAttribute } from '../../../utils/stringifyDataAttribute';

/**
 * Returns the state for a headless TagPickerControl.
 *
 * Wraps {@link useTagPickerControlBase_unstable} (which omits `size`/`appearance`) and
 * exposes the disabled/invalid state as `data-*` attributes for styling hooks.
 */
export const useTagPickerControl = (
  props: TagPickerControlProps,
  ref: React.Ref<HTMLDivElement>,
): TagPickerControlState => {
  const state: TagPickerControlState = useTagPickerControlBase_unstable(props, ref);

  /* eslint-disable react-hooks/immutability -- decorate base state with data-* attributes */
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-invalid'] = stringifyDataAttribute(state.invalid);
  /* eslint-enable react-hooks/immutability */

  return state;
};
