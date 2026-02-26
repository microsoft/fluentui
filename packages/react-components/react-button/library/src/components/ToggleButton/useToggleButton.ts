'use client';

import * as React from 'react';
import { useToggleState } from '../../utils/useToggleState';
import { useButton_unstable, useButtonBase_unstable } from '../Button/useButton';
import type { ToggleButtonBaseState, ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';

/**
 * Given user props, defines default props for the ToggleButton, calls useButtonState and useChecked, and returns
 * processed state.
 * @param props - User provided props to the ToggleButton component.
 * @param ref - User provided ref to be passed to the ToggleButton component.
 */
export const useToggleButton_unstable = (
  props: ToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToggleButtonState => {
  const { checked = false, defaultChecked = false, ...buttonProps } = props;
  const buttonState = useButton_unstable(buttonProps, ref);

  return useToggleState(props, buttonState);
};

/**
 * Base hook for ToggleButton component, which manages state related to slots structure and ARIA attributes.
 *
 * @param props - User provided props to the ToggleButton component.
 * @param ref - User provided ref to be passed to the ToggleButton component.
 */
export const useToggleButtonBase_unstable = (
  props: ToggleButtonProps,
  ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToggleButtonBaseState => {
  const { checked = false, defaultChecked = false, ...buttonProps } = props;
  const buttonState = useButtonBase_unstable(buttonProps, ref);

  return useToggleState(props, buttonState);
};
