'use client';

import type * as React from 'react';
import { useOptionBase_unstable } from '@fluentui/react-combobox';

import type { OptionProps, OptionState } from './Option.types';
import { toDataAttributeValue } from '../../../utils/toDataAttributeValue';

/**
 * Returns the state for an Option component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderOption`.
 */
export const useOption = (props: OptionProps, ref: React.Ref<HTMLElement>): OptionState => {
  const baseState = useOptionBase_unstable(props, ref);

  const state: OptionState = {
    ...baseState,
    root: {
      ...baseState.root,
      'data-disabled': toDataAttributeValue(baseState.disabled),
      'data-selected': toDataAttributeValue(baseState.selected),
      'data-multiselect': toDataAttributeValue(baseState.multiselect),
    },
  };

  return state;
};
