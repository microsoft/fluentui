import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { useToggleButton_unstable } from '@fluentui/react-button';
import { useToolbarContext_unstable } from '../Toolbar/ToolbarContext';
import { ToolbarRadioButtonProps, ToolbarRadioButtonState } from './ToolbarRadioButton.types';

/**
 * Given user props, defines default props for the RadioButton, calls useButtonState and useChecked, and returns
 * processed state.
 * @param props - User provided props to the RadioButton component.
 * @param ref - User provided ref to be passed to the RadioButton component.
 */
export const useToolbarRadioButton_unstable = (
  props: ToolbarRadioButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarRadioButtonState => {
  const handleRadio = useToolbarContext_unstable(ctx => ctx.handleRadio);
  const checked = useToolbarContext_unstable(ctx => !!ctx.checkedValues[props.name]?.includes(props.value));
  const size = useToolbarContext_unstable(ctx => ctx.size);

  const { onClick: onClickOriginal } = props;
  const toggleButtonState = useToggleButton_unstable(
    { size, checked, role: 'radio', 'aria-checked': checked, ...props },
    ref,
  );
  const state: ToolbarRadioButtonState = {
    ...toggleButtonState,
    name: props.name,
    value: props.value,
  };

  const handleOnClick = useEventCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent> & React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      handleRadio?.(e, state.name, state.value, state.checked);
      onClickOriginal?.(e);
    },
  );
  state.root['aria-pressed'] = undefined;
  state.root.onClick = handleOnClick;
  return state;
};
