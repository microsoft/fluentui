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
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const ToolbarButton: ForwardRefComponent<ToolbarButtonProps> = React.forwardRef((props, ref) => {
  const state = useToolbarButton_unstable(props, ref);

  useToolbarButtonStyles_unstable(state);

  useCustomStyleHook_unstable('useToolbarButtonStyles_unstable')(state);

  return renderButton_unstable(state);
  //FIXME: migrate to fc to remove this assertion
  // Casting is required due to lack of distributive union to support unions on @types/react
  // eslint-disable-next-line deprecation/deprecation
}) as ForwardRefComponent<ToolbarButtonProps>;

ToolbarButton.displayName = 'ToolbarButton';
