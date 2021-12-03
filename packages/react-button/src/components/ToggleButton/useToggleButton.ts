import * as React from 'react';
import type { ToggleButtonProps, ToggleButtonState, RenderToggleButton } from './ToggleButton.types';
import { useToggleButtonState } from './useToggleButtonState';
import { useToggleButtonARIA } from './useToggleButtonARIA';
import { useToggleButtonStyles } from './useToggleButtonStyles';
import { renderToggleButton } from './renderToggleButton';

/**
 * Given user props, defines default props for the ToggleButton, calls useButtonState and useChecked, and returns
 * processed state.
 * @param props - User provided props to the ToggleButton component.
 * @param ref - User provided ref to be passed to the ToggleButton component.
 */
export const useToggleButton = (
  props: ToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): [ToggleButtonState, RenderToggleButton] => {
  const state: ToggleButtonState = useToggleButtonState(props);
  useToggleButtonARIA(state, props, ref);
  useToggleButtonStyles(state);

  return [state, renderToggleButton];
};
