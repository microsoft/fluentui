'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToggleButtonProps } from './ToggleButton.types';
import { useToggleButton } from './useToggleButton';
import { renderToggleButton } from './renderToggleButton';

/**
 * A button component that can be toggled between checked and unchecked states.
 */
export const ToggleButton: ForwardRefComponent<ToggleButtonProps> = React.forwardRef((props, ref) => {
  const state = useToggleButton(props, ref);

  return renderToggleButton(state);
});

ToggleButton.displayName = 'ToggleButton';
