'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderToolbarRadioButton,
  useToolbarContext,
  useToolbarRadioButton,
} from '@fluentui/react-headless-components-preview/toolbar';

import type { ToolbarRadioButtonProps } from './ToolbarRadioButton.types';
import { useToolbarRadioButtonStyles } from './useToolbarRadioButtonStyles';

/**
 * A ToolbarRadioButton is a single-selection ToggleButton inside a Toolbar. Windmod
 * ToolbarRadioButton: the headless toolbar radio button decorated with the Fluent visual
 * contract (Tailwind v4 + CSS Modules).
 */
export const ToolbarRadioButton: ForwardRefComponent<ToolbarRadioButtonProps> = React.forwardRef(
  // The context fallback is read in the body, so the look props cannot default in the
  // parameter list.
  (props, ref) => {
    const contextSize = useToolbarContext(ctx => ctx.size);
    // Look props belong to windmod — the headless hook neither accepts nor resolves them.
    // Defaults mirror @fluentui/react-toolbar's styled useToolbarRadioButton, which unlike its
    // toggle sibling has no 'medium' fallback: the context's own default supplies it.
    const { appearance = 'subtle', size = contextSize, ...rest } = props;

    return renderToolbarRadioButton(
      useToolbarRadioButtonStyles({
        ...useToolbarRadioButton(rest, ref),
        appearance,
        shape: 'rounded',
        size,
      }),
    );
    // Casting is required due to lack of distributive union to support union on @types/react
  },
) as ForwardRefComponent<ToolbarRadioButtonProps>;

ToolbarRadioButton.displayName = 'ToolbarRadioButton';
