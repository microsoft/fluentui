'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarToggleButtonProps } from './ToolbarToggleButton.types';
import { renderToolbarToggleButton } from './renderToolbarToggleButton';
import { useToolbarToggleButton } from './useToolbarToggleButton';
import { useToolbarToggleButtonStyles } from './useToolbarToggleButtonStyles.styles';

export const ToolbarToggleButton: ForwardRefComponent<ToolbarToggleButtonProps> = React.forwardRef((props, ref) => {
  const state = useToolbarToggleButton(props, ref);

  useToolbarToggleButtonStyles(state);

  return renderToolbarToggleButton(state);
}) as ForwardRefComponent<ToolbarToggleButtonProps>;

ToolbarToggleButton.displayName = 'ToolbarToggleButton';
