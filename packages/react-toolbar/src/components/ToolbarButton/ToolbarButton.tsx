import * as React from 'react';
import { useToolbarButton_unstable } from './useToolbarButton';
import { renderToolbarButton_unstable } from './renderToolbarButton';
import { useToolbarButtonStyles_unstable } from './useToolbarButtonStyles';
import type { ToolbarButtonProps } from './ToolbarButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ToolbarButton component - TODO: add more docs
 */
export const ToolbarButton: ForwardRefComponent<ToolbarButtonProps> = React.forwardRef((props, ref) => {
  const state = useToolbarButton_unstable(props, ref);

  useToolbarButtonStyles_unstable(state);
  return renderToolbarButton_unstable(state);
});

ToolbarButton.displayName = 'ToolbarButton';
