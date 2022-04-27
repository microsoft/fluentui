import * as React from 'react';
import { useToggleState } from '../../utils/useToggleState';
import { useButton_unstable } from '../Button/useButton';
import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';

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
  const buttonState = useButton_unstable(props, ref);

  return useToggleState(props, buttonState);
};
