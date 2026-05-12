'use client';

import type * as React from 'react';
import { useRadioBase_unstable } from '@fluentui/react-radio';

import type { RadioProps, RadioState } from './Radio.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for a Radio component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderRadio`.
 */
export const useRadio = (props: RadioProps, ref: React.Ref<HTMLInputElement>): RadioState => {
  'use no memo';

  const state: RadioState = useRadioBase_unstable(props, ref);

  // Set data attribute for disabled state to simplify styling.
  state.root['data-disabled'] = stringifyDataAttribute(state.input.disabled);

  return state;
};
