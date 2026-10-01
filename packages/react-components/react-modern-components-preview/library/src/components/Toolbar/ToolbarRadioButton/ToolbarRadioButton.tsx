'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarRadioButtonProps } from './ToolbarRadioButton.types';
import { renderToolbarRadioButton } from './renderToolbarRadioButton';
import { useToolbarRadioButton } from './useToolbarRadioButton';
import { useToolbarRadioButtonStyles } from './useToolbarRadioButtonStyles.styles';

export const ToolbarRadioButton: ForwardRefComponent<ToolbarRadioButtonProps> = React.forwardRef((props, ref) => {
  const state = useToolbarRadioButton(props, ref);

  useToolbarRadioButtonStyles(state);

  return renderToolbarRadioButton(state);
}) as ForwardRefComponent<ToolbarRadioButtonProps>;

ToolbarRadioButton.displayName = 'ToolbarRadioButton';
