import * as React from 'react';
import type { ToolbarButtonProps } from './ToolbarButton.types';
import { useToolbarContext } from '../Toolbar/ToolbarContext';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Button } from '@fluentui/react-button';

/**
 * ToolbarButton component is a Button to be used inside Toolbar
 * which will respect toolbar props such as `size`
 */
export const ToolbarButton: ForwardRefComponent<ToolbarButtonProps> = React.forwardRef((props, ref) => {
  const { size } = useToolbarContext();
  return <Button {...props} size={size} ref={ref} />;
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ToolbarButtonProps>;

ToolbarButton.displayName = 'ToolbarButton';
