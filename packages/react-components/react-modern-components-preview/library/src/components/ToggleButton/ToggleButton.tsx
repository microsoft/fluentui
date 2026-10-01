'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToggleButtonProps } from './ToggleButton.types';
import { renderToggleButton } from './renderToggleButton';
import { useToggleButton } from './useToggleButton';
import { useToggleButtonStyles } from './useToggleButtonStyles.styles';

export const ToggleButton: ForwardRefComponent<ToggleButtonProps> = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ToggleButtonProps
>((props, ref) => {
  const state = useToggleButton(props, ref);
  useToggleButtonStyles(state);
  return renderToggleButton(state);
});

ToggleButton.displayName = 'ToggleButton';
