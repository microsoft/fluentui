import * as React from 'react';
import type { ToolbarButtonProps } from './ToolbarButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderButton_unstable, useButtonStyles_unstable, useButton_unstable } from '@fluentui/react-button';
import { useToolbarContext } from '../Toolbar/ToolbarContext';

/**
 * ToolbarButton component is a Button to be used inside Toolbar
 * which will respect toolbar props such as `size`
 */
export const ToolbarButton: ForwardRefComponent<ToolbarButtonProps> = React.forwardRef((props, ref) => {
  const { size } = useToolbarContext();
  const state = useButton_unstable({ size, ...props }, ref);
  useButtonStyles_unstable(state);
  return renderButton_unstable(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ToolbarButtonProps>;

ToolbarButton.displayName = 'ToolbarButton';
