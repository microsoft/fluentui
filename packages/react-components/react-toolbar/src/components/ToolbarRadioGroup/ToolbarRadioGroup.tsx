import * as React from 'react';
import type { ToolbarRadioGroupProps } from './ToolbarRadioGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useToolbarRadioGroup_unstable } from './useToolbarRadioGroup';
import { useToolbarRadioGroupStyles_unstable } from './useToolbarRadioGroupStyles';
import { renderToolbarRadioGroup_unstable } from './renderToolbarRadioGroup';

/**
 * ToolbarRadioGroup component is a Button to be used inside Toolbar
 * which will respect toolbar props such as `size`
 */
export const ToolbarRadioGroup: ForwardRefComponent<ToolbarRadioGroupProps> = React.forwardRef((props, ref) => {
  const state = useToolbarRadioGroup_unstable(props, ref);
  useToolbarRadioGroupStyles_unstable(state);
  return renderToolbarRadioGroup_unstable(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ToolbarRadioGroupProps>;

ToolbarRadioGroup.displayName = 'ToolbarRadioGroup';
