"use client";

import * as React from 'react';
import type { SplitButtonProps, SplitButtonState } from './SplitButton.types';
import { useSplitButtonBase_unstable } from './useSplitButtonBase';

/**
 * Given user props, defines default props for the SplitButton and returns processed state.
 * @param props - User provided props to the SplitButton component.
 * @param ref - User provided ref to be passed to the SplitButton component.
 */
export const useSplitButton_unstable = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): SplitButtonState => {
  const {
    appearance = 'secondary',
    shape = 'rounded',
    size = 'medium',
  } = props;

  const state = useSplitButtonBase_unstable(props, ref);

  return {
    appearance,
    shape,
    size,
    ...state,
    menuButton: {
      appearance,
      shape,
      size,
      ...state.menuButton,
    },
    primaryActionButton: {
      appearance,
      shape,
      size,
      ...state.primaryActionButton,
    },
  };
};
