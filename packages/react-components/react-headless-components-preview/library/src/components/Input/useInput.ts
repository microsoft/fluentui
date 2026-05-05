'use client';

import type * as React from 'react';
import { useInputBase_unstable } from '@fluentui/react-input';

import type { InputProps, InputState } from './Input.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for an Input component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderInput`.
 */
export const useInput = (props: InputProps, ref: React.Ref<HTMLInputElement>): InputState => {
  'use no memo';

  const state: InputState = useInputBase_unstable(props, ref);

  // Set data attribute for disabled state to simplify styling.
  state.root['data-disabled'] = stringifyDataAttribute(state.input.disabled);

  return state;
};
