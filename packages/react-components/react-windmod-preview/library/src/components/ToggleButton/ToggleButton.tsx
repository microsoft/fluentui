'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToggleButton, useToggleButton } from '@fluentui/react-headless-components-preview/toggle-button';
import { useButtonContext } from '@fluentui/react-headless-components-preview/button';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';
import { useToggleButtonStyles } from './useToggleButtonStyles';

/**
 * A ToggleButton lets people switch a setting on and off. Windmod ToggleButton: the headless
 * toggle button decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const ToggleButton: ForwardRefComponent<ToggleButtonProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-button's styled useToggleButton, which inherits the
  // ButtonContext read by composing useButton_unstable (react-button useToggleButton.ts:19). The
  // headless toggle hook carries no look props, so the read has to be made here explicitly.
  const {
    appearance = 'secondary',
    shape = 'rounded',
    size = 'medium',
    ...rest
  } = mergeContextProps(useButtonContext(), props);

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
