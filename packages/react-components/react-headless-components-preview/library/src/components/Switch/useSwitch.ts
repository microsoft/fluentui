'use client';

import type * as React from 'react';
import { useSwitchBase_unstable } from '@fluentui/react-switch';

import type { SwitchProps, SwitchState } from './Switch.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a Switch component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSwitch`.
 */
export const useSwitch = (props: SwitchProps, ref: React.Ref<HTMLInputElement>): SwitchState => {
  'use no memo';

  const state: SwitchState = useSwitchBase_unstable(props, ref);

  // Set data attributes for disabled, disabledFocusable, and checked states to simplify styling.
  state.root['data-disabled'] = stringifyDataAttribute(state.input.disabled || state.disabledFocusable);
  state.root['data-disabled-focusable'] = stringifyDataAttribute(state.disabledFocusable);
  state.root['data-checked'] = stringifyDataAttribute(state.input.checked);

  return state;
};
