'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarDividerProps } from './ToolbarDivider.types';
import { renderToolbarDivider } from './renderToolbarDivider';
import { useToolbarDivider } from './useToolbarDivider';
import { useToolbarDividerStyles } from './useToolbarDividerStyles.styles';

export const ToolbarDivider: ForwardRefComponent<ToolbarDividerProps> = React.forwardRef((props, ref) => {
  const state = useToolbarDivider(props, ref);

  useToolbarDividerStyles(state);

  return renderToolbarDivider(state);
});

ToolbarDivider.displayName = 'ToolbarDivider';
