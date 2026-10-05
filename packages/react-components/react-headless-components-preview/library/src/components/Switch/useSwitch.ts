'use client';

import type * as React from 'react';
import { useSwitchBase_unstable } from '@fluentui/react-switch';

import type { SwitchProps, SwitchState } from './Switch.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a Switch component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSwitch`.
 */
export const useSwitch = (props: SwitchProps, ref: React.Ref<HTMLInputElement>): SwitchState => {
  const state: SwitchState = useSwitchBase_unstable(props, ref);

  // Set data attributes for disabled, disabledFocusable, and checked states to simplify styling.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.input.disabled || state.disabledFocusable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled-focusable'] = toDataAttributeValue(state.disabledFocusable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = toDataAttributeValue(state.input.checked);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-label-position'] = state.labelPosition;

  return state;
};
