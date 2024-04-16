import * as React from 'react';
import type { ToolbarRadioGroupProps } from './ToolbarRadioGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderToolbarGroup_unstable,
  useToolbarGroupStyles_unstable,
  useToolbarGroup_unstable,
} from '../../ToolbarGroup';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * ToolbarRadioGroup component is a Button to be used inside Toolbar
 * which will respect toolbar props such as `size`
 */
export const ToolbarRadioGroup: ForwardRefComponent<ToolbarRadioGroupProps> = React.forwardRef((props, ref) => {
  const state = useToolbarGroup_unstable({ role: 'radiogroup', ...props }, ref);

  useToolbarGroupStyles_unstable(state);

  useCustomStyleHook_unstable('useToolbarGroupStyles_unstable')(state);

  return renderToolbarGroup_unstable(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ToolbarRadioGroupProps>;

ToolbarRadioGroup.displayName = 'ToolbarRadioGroup';
