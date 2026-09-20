'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useButton } from './useButton';
import { renderButton } from './renderButton';
import { useButtonStyles } from './useButtonStyles.styles';
import type { ButtonProps } from './Button.types';

/**
 * Button component - TODO: add more docs
 */
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const state = useButton(props, ref);

  useButtonStyles(state);

  return renderButton(state);
});

Button.displayName = 'Button';
