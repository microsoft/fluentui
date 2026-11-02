'use client';

import type * as React from 'react';
import { useTagPickerButtonBase_unstable } from '@fluentui/react-tag-picker';

import type { TagPickerButtonProps, TagPickerButtonState } from './TagPickerButton.types';
import { toDataAttributeValue } from '../../../utils/toDataAttributeValue';

/**
 * Returns the state for a headless TagPickerButton.
 */
export const useTagPickerButton = (
  props: TagPickerButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): TagPickerButtonState => {
  const state: TagPickerButtonState = useTagPickerButtonBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability -- decorate base state with data-* attribute
  state.root['data-disabled'] = toDataAttributeValue(state.root.disabled);

  return state;
};
