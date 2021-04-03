import * as React from 'react';
import { ToggleButtonProps, ToggleButtonStyleSelectors } from './ToggleButton.types';
import { renderToggleButton } from './renderToggleButton';
import { useToggleButton } from './useToggleButton';
import { useToggleButtonStyles } from './useToggleButtonStyles';

/**
 * Define a styled ToggleButton, using the `useToggleButton` hook.
 * {@docCategory Button}
 */
export const ToggleButton = React.forwardRef<HTMLElement, ToggleButtonProps>((props, ref) => {
  const state = useToggleButton(props, ref);

  const receivedChildren = !!state.children?.children;
  const receivedIcon = !!state.icon?.children;

  const styleSelectors: ToggleButtonStyleSelectors = {
    checked: state.checked,
    disabled: state.disabled,
    iconOnly: receivedIcon && !receivedChildren,
    primary: state.primary,
    size: state.size,
    subtle: state.subtle,
    transparent: state.transparent,
  };

  useToggleButtonStyles(state, styleSelectors);

  return renderToggleButton(state);
});

ToggleButton.displayName = 'ToggleButton';
