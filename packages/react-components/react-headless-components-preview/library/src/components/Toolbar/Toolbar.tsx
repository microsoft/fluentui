'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarProps } from './Toolbar.types';
import { useToolbar, useToolbarContextValues } from './useToolbar';
import { renderToolbar } from './renderToolbar';

/**
 * A toolbar component that provides a container for grouping a set of controls such as buttons and menu items.
 */
export const Toolbar: ForwardRefComponent<ToolbarProps> = React.forwardRef((props, ref) => {
  const state = useToolbar(props, ref);
  const contextValues = useToolbarContextValues(state);

  return renderToolbar(state, contextValues);
});

Toolbar.displayName = 'Toolbar';
