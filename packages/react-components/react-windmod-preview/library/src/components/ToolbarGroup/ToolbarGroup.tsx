'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToolbarGroup, useToolbarGroup } from '@fluentui/react-headless-components-preview/toolbar';

import type { ToolbarGroupProps } from './ToolbarGroup.types';
import { useToolbarGroupStyles } from './useToolbarGroupStyles';

/**
 * A ToolbarGroup clusters related Toolbar children. Windmod ToolbarGroup: the headless group
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const ToolbarGroup: ForwardRefComponent<ToolbarGroupProps> = React.forwardRef((props, ref) => {
  const state = useToolbarGroup(props, ref);
  const styled = useToolbarGroupStyles(state);

  return renderToolbarGroup(styled);
});

ToolbarGroup.displayName = 'ToolbarGroup';
