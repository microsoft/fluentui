'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderToolbarToggleButton,
  useToolbarContext,
  useToolbarToggleButton,
} from '@fluentui/react-headless-components-preview/toolbar';

import type { ToolbarToggleButtonProps } from './ToolbarToggleButton.types';
import { useToolbarToggleButtonStyles } from './useToolbarToggleButtonStyles';

/**
 * A ToolbarToggleButton is a ToggleButton inside a Toolbar. Windmod ToolbarToggleButton: the
 * headless toolbar toggle button decorated with the Fluent visual contract (Tailwind v4 + CSS
 * Modules).
 */
export const ToolbarToggleButton: ForwardRefComponent<ToolbarToggleButtonProps> = React.forwardRef(
  // The context fallback is read in the body, so the look props cannot default in the
  // parameter list.
  (props, ref) => {
    const contextSize = useToolbarContext(ctx => ctx.size);
    // Look props belong to windmod — the headless hook neither accepts nor resolves them.
    // Defaults mirror @fluentui/react-toolbar's styled useToolbarToggleButton.
    const { appearance = 'subtle', size = contextSize ?? 'medium', ...rest } = props;

    return renderToolbarToggleButton(
      useToolbarToggleButtonStyles({
        ...useToolbarToggleButton(rest, ref),
        appearance,
        shape: 'rounded',
        size,
      }),
    );
  },
);

ToolbarToggleButton.displayName = 'ToolbarToggleButton';
