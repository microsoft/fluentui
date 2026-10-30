'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderInlineDrawer,
  useDrawerContextValue,
  useInlineDrawer,
} from '@fluentui/react-headless-components-preview/drawer';

import type { InlineDrawerProps } from './InlineDrawer.types';
import { useInlineDrawerStyles } from './useInlineDrawerStyles';

/**
 * An InlineDrawer is stacked with the page content and leaves the rest of the page interactive.
 * Windmod InlineDrawer: the headless drawer decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const InlineDrawer: ForwardRefComponent<InlineDrawerProps> = React.forwardRef(
  ({ size = 'small', separator = false, ...rest }, ref) => {
    const contextValue = useDrawerContextValue();

    const state = useInlineDrawer(rest, ref);
    const styled = useInlineDrawerStyles({ ...state, size, separator });

    return renderInlineDrawer(styled, contextValue);
  },
);

InlineDrawer.displayName = 'InlineDrawer';
