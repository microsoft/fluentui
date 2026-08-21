'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderButton, useButton } from '@fluentui/react-headless-components-preview/button';

import type { ButtonProps, ButtonState } from './Button.types';
import { useButtonStyles } from './useButtonStyles';

/**
 * Buttons give people a way to trigger an action. Windmod Button: the headless button
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-button's styled useButton.
  const { appearance = 'secondary', shape = 'rounded', size = 'medium', ...rest } = props;

  const state: ButtonState = {
    ...useButton(rest, ref),
    appearance,
    shape,
    size,
  };

  useButtonStyles(state);

  return renderButton(state);
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<ButtonProps>;

Button.displayName = 'Button';
