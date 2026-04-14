'use client';

import type * as React from 'react';
import { useSwitchBase_unstable } from '@fluentui/react-switch';

import type { SwitchProps, SwitchState } from './Switch.types';

/**
 * Returns the state for a Switch component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSwitch`.
 */
export const useSwitch = (props: SwitchProps, ref: React.Ref<HTMLInputElement>): SwitchState => {
  const state = useSwitchBase_unstable(props, ref);

  return state;
};
