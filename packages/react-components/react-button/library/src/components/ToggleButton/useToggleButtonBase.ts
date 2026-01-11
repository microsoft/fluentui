'use client';

import * as React from 'react';
import { useToggleState } from '../../utils/useToggleState';
import { useButtonBase_unstable } from '../Button/index';
import type { ToggleButtonBaseProps, ToggleButtonBaseState } from './ToggleButton.types';

/**
 * Given user props, defines base props (including behavioral and structural ones) for the ToggleButton returns
 * processed state.
 * @param props - User provided props to the ToggleButton component.
 * @param ref - User provided ref to be passed to the ToggleButton component.
 */
export const useToggleButtonBase_unstable = (
  props: ToggleButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToggleButtonBaseState => {
  const buttonState = useButtonBase_unstable(props, ref);

  return useToggleState(props, buttonState);
};
