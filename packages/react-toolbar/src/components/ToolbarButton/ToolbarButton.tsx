import * as React from 'react';
import type { ToolbarButtonProps } from './ToolbarButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useToolbarButtonStyles_unstable } from './useToolbarButtonStyles';
import { useToolbarButton_unstable } from './useToolbarButton';
import { renderToolbarButton_unstable } from './renderToolbarButton';

/**
 * ToolbarButton component
 */
export const ToolbarButton: ForwardRefComponent<ToolbarButtonProps> = React.forwardRef((props, ref) => {
  const state = useToolbarButton_unstable(props, ref);
  useToolbarButtonStyles_unstable(state);
  return renderToolbarButton_unstable(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ToolbarButtonProps>;

ToolbarButton.displayName = 'ToolbarButton';
