'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ButtonProps } from './Button.types';
import { useButton } from './useButton';
import { renderButton } from './renderButton';

/**
 * A button component that can be rendered as another tag or focusable when disabled.
 */
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const state = useButton(props, ref);

  return renderButton(state);
});

Button.displayName = 'Button';
