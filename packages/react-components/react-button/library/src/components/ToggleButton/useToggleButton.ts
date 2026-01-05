'use client';

import * as React from 'react';
import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';
import { useToggleButtonBase_unstable } from './useToggleButtonBase';

/**
 * Given user props, defines default props for the ToggleButton, calls useButtonState and useChecked, and returns
 * processed state.
 * @param props - User provided props to the ToggleButton component.
 * @param ref - User provided ref to be passed to the ToggleButton component.
 */
export const useToggleButton_unstable = (
  { appearance = 'primary', shape = 'rounded', size = 'medium', ...props }: ToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToggleButtonState => {
  const state = useToggleButtonBase_unstable(props, ref);

  return {
    ...state,
    appearance,
    shape,
    size,
  };
};
