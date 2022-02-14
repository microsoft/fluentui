import * as React from 'react';
import { useToolbarDivider_unstable } from './useToolbarDivider';
import { renderToolbarDivider_unstable } from './renderToolbarDivider';
import { useToolbarDividerStyles_unstable } from './useToolbarDividerStyles';
import type { ToolbarDividerProps } from './ToolbarDivider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ToolbarDivider component
 */
export const ToolbarDivider: ForwardRefComponent<ToolbarDividerProps> = React.forwardRef((props, ref) => {
  const state = useToolbarDivider_unstable(props, ref);
  useToolbarDividerStyles_unstable(state);
  return renderToolbarDivider_unstable(state);
});

ToolbarDivider.displayName = 'ToolbarDivider';
