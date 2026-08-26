'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderToolbarRadioButton,
  useToolbarContext,
  useToolbarRadioButton,
} from '@fluentui/react-headless-components-preview/toolbar';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { ToolbarRadioButtonProps } from './ToolbarRadioButton.types';
import { useToolbarRadioButtonStyles } from './useToolbarRadioButtonStyles';

/**
 * A ToolbarRadioButton is a single-selection ToggleButton inside a Toolbar. Windmod
 * ToolbarRadioButton: the headless toolbar radio button decorated with the Fluent visual
 * contract (Tailwind v4 + CSS Modules).
 */
export const ToolbarRadioButton: ForwardRefComponent<ToolbarRadioButtonProps> = React.forwardRef(
  // The context is read in the body, so the look props cannot default in the parameter list.
  (props, ref) => {
    // Look props belong to windmod — the headless hook neither accepts nor resolves them.
    // Defaults mirror @fluentui/react-toolbar's styled useToolbarRadioButton, which unlike its
    // toggle sibling has no 'medium' fallback: the context's own default supplies it. Only `size`
    // is folded in — the Toolbar publishes no appearance — and the destructuring default restates
    // the merged value because `Partial` widens the merged `size` to optional while the context
    // always supplies one.
    const context = { size: useToolbarContext(ctx => ctx.size) };
    const { appearance = 'subtle', size = context.size, ...rest } = mergeContextProps(context, props);

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
