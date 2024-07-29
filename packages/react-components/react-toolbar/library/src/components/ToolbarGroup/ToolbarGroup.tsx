import * as React from 'react';
import type { ToolbarGroupProps } from './ToolbarGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useToolbarGroup_unstable } from './useToolbarGroup';
import { useToolbarGroupStyles_unstable } from './useToolbarGroupStyles.styles';
import { renderToolbarGroup_unstable } from './renderToolbarGroup';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * ToolbarGroup component is a Button to be used inside Toolbar
 * which will respect toolbar props such as `size`
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const ToolbarGroup: ForwardRefComponent<ToolbarGroupProps> = React.forwardRef((props, ref) => {
  const state = useToolbarGroup_unstable(props, ref);

  useToolbarGroupStyles_unstable(state);

  useCustomStyleHook_unstable('useToolbarGroupStyles_unstable')(state);

  return renderToolbarGroup_unstable(state);
  //FIXME: migrate to fc to remove this assertion
  // Casting is required due to lack of distributive union to support unions on @types/react
  // eslint-disable-next-line deprecation/deprecation
}) as ForwardRefComponent<ToolbarGroupProps>;

ToolbarGroup.displayName = 'ToolbarGroup';
