import * as React from 'react';
import type { ToolbarToggleButtonProps } from './ToolbarToggleButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderToggleButton_unstable,
  useToggleButtonStyles_unstable,
  useToggleButton_unstable,
} from '@fluentui/react-button';
import { useToolbarContext } from '../Toolbar/ToolbarContext';

/**
 * ToolbarToggleButton component
 */
export const ToolbarToggleButton: ForwardRefComponent<ToolbarToggleButtonProps> = React.forwardRef((props, ref) => {
  const { size } = useToolbarContext();

  const state = useToggleButton_unstable({ size, ...props }, ref);

  useToggleButtonStyles_unstable(state);
  return renderToggleButton_unstable(state);
}) as ForwardRefComponent<ToolbarToggleButtonProps>;

ToolbarToggleButton.displayName = 'ToolbarToggleButton';
