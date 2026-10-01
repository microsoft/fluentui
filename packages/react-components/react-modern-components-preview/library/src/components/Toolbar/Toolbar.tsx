'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarProps } from './Toolbar.types';
import { renderToolbar } from './renderToolbar';
import { useToolbar, useToolbarContextValues } from './useToolbar';
import { useToolbarStyles } from './useToolbarStyles.styles';

export const Toolbar: ForwardRefComponent<ToolbarProps> = React.forwardRef((props, ref) => {
  const state = useToolbar(props, ref);
  const contextValues = useToolbarContextValues(state);

  useToolbarStyles(state);

  return renderToolbar(state, contextValues);
});

Toolbar.displayName = 'Toolbar';
