'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarGroupProps } from './ToolbarGroup.types';
import { useToolbarGroup } from './useToolbarGroup';
import { renderToolbarGroup } from './renderToolbarGroup';

/**
 * A group component used inside a Toolbar to visually and semantically group related controls.
 */
export const ToolbarGroup: ForwardRefComponent<ToolbarGroupProps> = React.forwardRef((props, ref) => {
  const state = useToolbarGroup(props, ref);

  return renderToolbarGroup(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ToolbarGroupProps>;

ToolbarGroup.displayName = 'ToolbarGroup';
