'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToolbarDivider, useToolbarDivider } from '@fluentui/react-headless-components-preview/toolbar';

import type { ToolbarDividerProps, ToolbarDividerState } from './ToolbarDivider.types';
import { useToolbarDividerStyles } from './useToolbarDividerStyles';

/**
 * A ToolbarDivider separates Toolbar groups. Windmod ToolbarDivider: the headless toolbar
 * divider decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const ToolbarDivider: ForwardRefComponent<ToolbarDividerProps> = React.forwardRef((props, ref) => {
  // The toolbar fixes all three Divider look props; none reaches the consumer surface.
  const state: ToolbarDividerState = {
    ...useToolbarDivider(props, ref),
    alignContent: 'center',
    appearance: 'default',
    inset: false,
  };

  return renderToolbarDivider(useToolbarDividerStyles(state));
});

ToolbarDivider.displayName = 'ToolbarDivider';
