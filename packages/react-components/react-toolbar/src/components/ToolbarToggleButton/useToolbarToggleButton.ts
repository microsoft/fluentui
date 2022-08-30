import * as React from 'react';
import { useToggleButton_unstable } from '@fluentui/react-button';
import { ToolbarToggleButtonProps, ToolbarToggleButtonState } from './ToolbarToggleButton.types';

/**
 * Given user props, defines default props for the ToggleButton, calls useButtonState and useChecked, and returns
 * processed state.
 * @param props - User provided props to the ToggleButton component.
 * @param ref - User provided ref to be passed to the ToggleButton component.
 */
export const useToolbarToggleButton_unstable = (
  props: ToolbarToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarToggleButtonState => {
  return useToggleButton_unstable(props, ref);
};
