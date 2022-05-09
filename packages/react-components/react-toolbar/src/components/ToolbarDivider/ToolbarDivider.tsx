import * as React from 'react';
import { useToolbarDividerStyles_unstable } from './useToolbarDividerStyles';
import type { ToolbarDividerProps } from './ToolbarDivider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDivider_unstable, useDivider_unstable } from '@fluentui/react-divider';

/**
 * ToolbarDivider component
 */
export const ToolbarDivider: ForwardRefComponent<ToolbarDividerProps> = React.forwardRef((props, ref) => {
  const state = useDivider_unstable({ vertical: true, ...props }, ref);
  useToolbarDividerStyles_unstable(state);
  return renderDivider_unstable(state);
});

ToolbarDivider.displayName = 'ToolbarDivider';
