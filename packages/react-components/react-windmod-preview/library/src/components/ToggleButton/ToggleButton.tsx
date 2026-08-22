'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToggleButton, useToggleButton } from '@fluentui/react-headless-components-preview/toggle-button';

import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';
import { useToggleButtonStyles } from './useToggleButtonStyles';

/**
 * A ToggleButton lets people switch a setting on and off. Windmod ToggleButton: the headless
 * toggle button decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const ToggleButton: ForwardRefComponent<ToggleButtonProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-button's styled useToggleButton.
  const { appearance = 'secondary', shape = 'rounded', size = 'medium', ...rest } = props;

  const state: ToggleButtonState = {
    ...useToggleButton(rest, ref),
    appearance,
    shape,
    size,
  };

  return renderToggleButton(useToggleButtonStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<ToggleButtonProps>;

ToggleButton.displayName = 'ToggleButton';
