'use client';

import type * as React from 'react';
import { useSpinButtonBase_unstable } from '@fluentui/react-spinbutton';

import type { SpinButtonProps, SpinButtonState } from './SpinButton.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a SpinButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSpinButton`.
 */
export const useSpinButton = (props: SpinButtonProps, ref: React.Ref<HTMLInputElement>): SpinButtonState => {
  const state: SpinButtonState = useSpinButtonBase_unstable(props, ref);

  // Set data attributes for disabled, spin direction, and bound states to simplify styling.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.input.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-spin-state'] = state.spinState !== 'rest' ? state.spinState : undefined;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-at-bound'] = state.atBound !== 'none' ? state.atBound : undefined;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-invalid'] = toDataAttributeValue(state.input['aria-invalid']);

  return state;
};
