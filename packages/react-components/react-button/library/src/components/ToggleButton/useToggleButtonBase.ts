'use client';

import * as React from 'react';
import { useToggleState } from '../../utils/useToggleState';
import { useButtonBase_unstable } from '../Button/index';
import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';
import { DistributiveOmit } from '@fluentui/react-utilities';

type ToggleButtonBaseProps = DistributiveOmit<ToggleButtonProps, 'appearance' | 'shape' | 'size'>;
type ToggleButtonBaseState = DistributiveOmit<ToggleButtonState, 'appearance' | 'shape' | 'size'>;

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
