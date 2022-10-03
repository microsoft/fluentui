import * as React from 'react';
import { useToggleButton_unstable } from '@fluentui/react-button';
import { useToolbarContext } from '../Toolbar/ToolbarContext';
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
  const { handleToggleButton, size } = useToolbarContext();
  const { onClick: onClickOriginal } = props;
  const state = useToggleButton_unstable({ size, ...props }, ref) as ToolbarToggleButtonState;

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> & React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (state.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    handleToggleButton?.(e, state.name, state.value, state.checked);
    onClickOriginal?.(e);
  };

  state.root.onClick = handleOnClick;
  return state;
};
