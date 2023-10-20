import * as React from 'react';
import type { ToolbarButtonProps } from './ToolbarButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderButton_unstable } from '@fluentui/react-button';
import { useToolbarButtonStyles_unstable } from './useToolbarButtonStyles.styles';
import { useToolbarButton_unstable } from './useToolbarButton';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * ToolbarButton component is a Button to be used inside Toolbar
 * which will respect toolbar props such as `size`
 */
export const ToolbarButton: ForwardRefComponent<ToolbarButtonProps> = React.forwardRef((props, ref) => {
  const state = useToolbarButton_unstable(props, ref);

  useToolbarButtonStyles_unstable(state);

  useCustomStyleHook_unstable('useToolbarButtonStyles_unstable')(state);

  return renderButton_unstable(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ToolbarButtonProps>;

ToolbarButton.displayName = 'ToolbarButton';
