import * as React from 'react';
import { useMergedEventCallbacks } from '@fluentui/react-utilities';
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
  const { onClick, role } = buttonState.root;

  const { 'aria-checked': ariaChecked, 'aria-pressed': ariaPressed, checked, onClick: onToggleClick } = useToggleState({
    ...props,
    role,
  });

  return {
    ...buttonState,

    // State calculated from a set of props
    checked,

    // Slots definition
    root: {
      ...buttonState.root,
      'aria-checked': ariaChecked,
      'aria-pressed': ariaPressed,
      onClick: useMergedEventCallbacks(
        onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>,
        onToggleClick,
      ),
    },
  };
};
