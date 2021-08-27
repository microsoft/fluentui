import * as React from 'react';
import { renderToggleButton } from './renderToggleButton';
import { useToggleButton } from './useToggleButton';
import { useToggleButtonStyles } from './useToggleButtonStyles';
import type { ToggleButtonProps } from './ToggleButton.types';

/**
 * Define a styled ToggleButton, using the `useToggleButton` hook.
 * {@docCategory Button}
 */
export const ToggleButton = React.forwardRef<HTMLElement, ToggleButtonProps>((props, ref) => {
  const state = useToggleButton(props, ref);

  useToggleButtonStyles(state);

  return renderToggleButton(state);
});

ToggleButton.displayName = 'ToggleButton';
