'use client';

import type * as React from 'react';
import { useSpinButtonBase_unstable } from '@fluentui/react-spinbutton';

import type { SpinButtonProps, SpinButtonState } from './SpinButton.types';

/**
 * Returns the state for a SpinButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSpinButton`.
 */
export const useSpinButton = (props: SpinButtonProps, ref: React.Ref<HTMLInputElement>): SpinButtonState => {
  const state = useSpinButtonBase_unstable(props, ref);

  return state;
};
