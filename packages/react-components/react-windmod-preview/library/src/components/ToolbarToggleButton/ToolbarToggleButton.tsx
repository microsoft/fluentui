'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderToolbarToggleButton,
  useToolbarContext,
  useToolbarToggleButton,
} from '@fluentui/react-headless-components-preview/toolbar';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { ToolbarToggleButtonProps } from './ToolbarToggleButton.types';
import { useToolbarToggleButtonStyles } from './useToolbarToggleButtonStyles';

/**
 * A ToolbarToggleButton is a ToggleButton inside a Toolbar. Windmod ToolbarToggleButton: the
 * headless toolbar toggle button decorated with the Fluent visual contract (Tailwind v4 + CSS
 * Modules).
 */
export const ToolbarToggleButton: ForwardRefComponent<ToolbarToggleButtonProps> = React.forwardRef(
  // The context is read in the body, so the look props cannot default in the parameter list.
  (props, ref) => {
    // Look props belong to windmod — the headless hook neither accepts nor resolves them.
    // Defaults mirror @fluentui/react-toolbar's styled useToolbarToggleButton. Only `size` is
    // folded in: the Toolbar publishes no appearance.
    const contextSize = useToolbarContext(ctx => ctx.size);
    const { appearance = 'subtle', size = 'medium', ...rest } = mergeContextProps({ size: contextSize }, props);

    const state = useToolbarToggleButton(rest, ref);
    const styled = useToolbarToggleButtonStyles({
      ...state,
      appearance,
      shape: 'rounded',
      size,
    });

    return renderToolbarToggleButton(styled);
  },
);

ToolbarToggleButton.displayName = 'ToolbarToggleButton';
