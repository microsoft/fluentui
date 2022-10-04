import * as React from 'react';
import { useToolbarDividerStyles_unstable } from './useToolbarDividerStyles';
import type { ToolbarDividerProps } from './ToolbarDivider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDivider_unstable } from '@fluentui/react-divider';
import { useToolbarContext } from '../Toolbar/ToolbarContext';
import { useToolbarDivider_unstable } from './useToolbarDivider';

/**
 * ToolbarDivider component
 */
export const ToolbarDivider: ForwardRefComponent<ToolbarDividerProps> = React.forwardRef((props, ref) => {
  const { vertical } = useToolbarContext();
  const state = useToolbarDivider_unstable({ vertical: !vertical, ...props }, ref);
  useToolbarDividerStyles_unstable(state);
  return renderDivider_unstable(state);
});

ToolbarDivider.displayName = 'ToolbarDivider';
