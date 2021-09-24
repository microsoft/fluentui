import * as React from 'react';
import { renderToggleButton } from './renderToggleButton';
import { useToggleButton } from './useToggleButton';
import { useToggleButtonStyles } from './useToggleButtonStyles';
import type { ToggleButtonProps } from './ToggleButton.types';

/**
 * ToggleButtons are buttons that toggle between two defined states when triggered.
 */
export const ToggleButton: React.FunctionComponent<ToggleButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>((props, ref) => {
  const state = useToggleButton(props, ref);

  useToggleButtonStyles(state);

  return renderToggleButton(state);
});

ToggleButton.displayName = 'ToggleButton';
