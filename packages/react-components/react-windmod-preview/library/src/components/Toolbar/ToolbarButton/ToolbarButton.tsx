'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToolbarButton, useToolbarButton } from '@fluentui/react-headless-components-preview/toolbar';

import type { ToolbarButtonProps, ToolbarButtonState } from './ToolbarButton.types';
import { useToolbarButtonStyles } from './useToolbarButtonStyles';

/**
 * A ToolbarButton is a Button inside a Toolbar. Windmod ToolbarButton: the headless toolbar
 * button decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const ToolbarButton: ForwardRefComponent<ToolbarButtonProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-toolbar's styled useToolbarButton, which pins shape and
  // size rather than reading the toolbar's size the way the two toggle buttons do.
  const { appearance = 'subtle', ...rest } = props;

  const state: ToolbarButtonState = {
    ...useToolbarButton(rest, ref),
    appearance,
    shape: 'rounded',
    size: 'medium',
  };

  return renderToolbarButton(useToolbarButtonStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<ToolbarButtonProps>;

ToolbarButton.displayName = 'ToolbarButton';
