import * as React from 'react';
import { useButton } from '../Button/useButton';
import { useChecked } from './useChecked';
import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';

/**
 * Given user props, defines default props for the ToggleButton, calls useButtonState and useChecked, and returns
 * processed state.
 * @param props - User provided props to the ToggleButton component.
 * @param ref - User provided ref to be passed to the ToggleButton component.
 */
export const useToggleButton = (
  props: ToggleButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: ToggleButtonProps,
) => {
  const state = useButton(props, ref, defaultProps);

  useChecked(state as ToggleButtonProps);

  return state as ToggleButtonState;
};
