'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderToolbar,
  useToolbar,
  useToolbarContextValues,
} from '@fluentui/react-headless-components-preview/toolbar';

import type { ToolbarProps } from './Toolbar.types';
import { useToolbarStyles } from './useToolbarStyles';

/**
 * A Toolbar groups related commands. Windmod Toolbar: the headless toolbar decorated with the
 * Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Toolbar: ForwardRefComponent<ToolbarProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-toolbar's styled useToolbar.
  ({ size = 'medium', ...rest }, ref) => {
    // The headless state omits `size`, so the context values must be built from the state that
    // carries it — otherwise the children read `undefined` and fall back to medium.
    const styled = useToolbarStyles({
      ...useToolbar(rest, ref),
      size,
    });

    return renderToolbar(styled, useToolbarContextValues(styled));
  },
);

Toolbar.displayName = 'Toolbar';
