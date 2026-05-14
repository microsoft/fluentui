'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarButtonProps } from './ToolbarButton.types';
import { useToolbarButton } from './useToolbarButton';
import { renderToolbarButton } from './renderToolbarButton';

/**
 * A button component designed to be used inside a Toolbar, inheriting toolbar context such as size.
 */
export const ToolbarButton: ForwardRefComponent<ToolbarButtonProps> = React.forwardRef((props, ref) => {
  const state = useToolbarButton(props, ref);

  return renderToolbarButton(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ToolbarButtonProps>;

ToolbarButton.displayName = 'ToolbarButton';
