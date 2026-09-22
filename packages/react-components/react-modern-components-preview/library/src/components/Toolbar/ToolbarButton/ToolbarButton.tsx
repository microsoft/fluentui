'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarButtonProps } from './ToolbarButton.types';
import { renderToolbarButton } from './renderToolbarButton';
import { useToolbarButton } from './useToolbarButton';
import { useToolbarButtonStyles } from './useToolbarButtonStyles.styles';

export const ToolbarButton: ForwardRefComponent<ToolbarButtonProps> = React.forwardRef((props, ref) => {
  const state = useToolbarButton(props, ref);

  useToolbarButtonStyles(state);

  return renderToolbarButton(state);
}) as ForwardRefComponent<ToolbarButtonProps>;

ToolbarButton.displayName = 'ToolbarButton';
