'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarDividerProps } from './ToolbarDivider.types';
import { useToolbarDivider } from './useToolbarDivider';
import { renderToolbarDivider } from './renderToolbarDivider';

/**
 * A divider component designed to be used inside a Toolbar to visually separate groups of controls.
 * Its orientation is automatically inverted relative to the toolbar's orientation.
 */
export const ToolbarDivider: ForwardRefComponent<ToolbarDividerProps> = React.forwardRef((props, ref) => {
  const state = useToolbarDivider(props, ref);

  return renderToolbarDivider(state);
});

ToolbarDivider.displayName = 'ToolbarDivider';
