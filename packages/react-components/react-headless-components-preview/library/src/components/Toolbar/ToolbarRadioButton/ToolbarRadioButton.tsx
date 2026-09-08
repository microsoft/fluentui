'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarRadioButtonProps } from './ToolbarRadioButton.types';
import { useToolbarRadioButton } from './useToolbarRadioButton';
import { renderToolbarRadioButton } from './renderToolbarRadioButton';

/**
 * A radio button designed to be used inside a Toolbar with mutually exclusive selection behavior.
 */
export const ToolbarRadioButton: ForwardRefComponent<ToolbarRadioButtonProps> = React.forwardRef((props, ref) => {
  const state = useToolbarRadioButton(props, ref);

  return renderToolbarRadioButton(state);
}) as ForwardRefComponent<ToolbarRadioButtonProps>;

ToolbarRadioButton.displayName = 'ToolbarRadioButton';
