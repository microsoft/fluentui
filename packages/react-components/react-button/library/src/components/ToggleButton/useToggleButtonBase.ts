'use client';

import * as React from 'react';
import { useToggleState } from '../../utils/useToggleState';
import { useButtonBase_unstable } from '../Button/useButtonBase';
import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';
import { DistributiveOmit } from '@fluentui/react-utilities/src/index';
import { ButtonDesignProps } from '../Button/Button.types';

type ToggleButtonBaseProps = DistributiveOmit<ToggleButtonProps, keyof ButtonDesignProps>;
type ToggleButtonBaseState = DistributiveOmit<ToggleButtonState, keyof ButtonDesignProps>;

/**
 * Given user props, defines default props for the ToggleButton, calls useButtonState and useChecked, and returns
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
