import * as React from 'react';
import { renderToolbarDivider_unstable } from './renderToolbarDivider';
import { useToolbarDividerStyles_unstable } from './useToolbarDividerStyles';
import type { ToolbarDividerProps } from './ToolbarDivider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDivider_unstable } from '@fluentui/react-divider';

/**
 * ToolbarDivider component
 */
export const ToolbarDivider: ForwardRefComponent<ToolbarDividerProps> = React.forwardRef((props, ref) => {
  const state = useDivider_unstable({ vertical: true, ...props }, ref);
  useToolbarDividerStyles_unstable(state);
  return renderToolbarDivider_unstable(state);
});

ToolbarDivider.displayName = 'ToolbarDivider';
