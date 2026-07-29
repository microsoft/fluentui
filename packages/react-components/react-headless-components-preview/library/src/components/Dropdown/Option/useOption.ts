'use client';

import type * as React from 'react';
import { useOptionBase_unstable } from '@fluentui/react-combobox';

import type { OptionProps, OptionState } from './Option.types';
import { stringifyDataAttribute } from '../../../utils/stringifyDataAttribute';

/**
 * Returns the state for an Option component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderOption`.
 */
export const useOption = (props: OptionProps, ref: React.Ref<HTMLElement>): OptionState => {
  const state: OptionState = useOptionBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selected'] = stringifyDataAttribute(state.selected);

  return state;
};
