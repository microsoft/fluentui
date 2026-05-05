'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarToggleButtonProps } from './ToolbarToggleButton.types';
import { useToolbarToggleButton } from './useToolbarToggleButton';
import { renderToolbarToggleButton } from './renderToolbarToggleButton';

/**
 * A toggle button designed to be used inside a Toolbar with toolbar toggle-group behavior.
 */
export const ToolbarToggleButton: ForwardRefComponent<ToolbarToggleButtonProps> = React.forwardRef((props, ref) => {
  const state = useToolbarToggleButton(props, ref);

  return renderToolbarToggleButton(state);
});

ToolbarToggleButton.displayName = 'ToolbarToggleButton';
