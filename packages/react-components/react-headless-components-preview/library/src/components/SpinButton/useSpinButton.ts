'use client';

import type * as React from 'react';
import { useSpinButtonBase_unstable } from '@fluentui/react-spinbutton';

import type { SpinButtonProps, SpinButtonState } from './SpinButton.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a SpinButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSpinButton`.
 */
export const useSpinButton = (props: SpinButtonProps, ref: React.Ref<HTMLInputElement>): SpinButtonState => {
  'use no memo';

  const state: SpinButtonState = useSpinButtonBase_unstable(props, ref);

  // Set data attributes for disabled, spin direction, and bound states to simplify styling.
  state.root['data-disabled'] = stringifyDataAttribute(state.input.disabled);
  state.root['data-spin-state'] = state.spinState !== 'rest' ? state.spinState : undefined;
  state.root['data-at-bound'] = state.atBound !== 'none' ? state.atBound : undefined;

  return state;
};
