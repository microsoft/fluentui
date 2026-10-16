'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarGroupProps } from './ToolbarGroup.types';
import { renderToolbarGroup } from './renderToolbarGroup';
import { useToolbarGroup } from './useToolbarGroup';
import { useToolbarGroupStyles } from './useToolbarGroupStyles.styles';

export const ToolbarGroup: ForwardRefComponent<ToolbarGroupProps> = React.forwardRef((props, ref) => {
  const state = useToolbarGroup(props, ref);

  useToolbarGroupStyles(state);

  return renderToolbarGroup(state);
});

ToolbarGroup.displayName = 'ToolbarGroup';
