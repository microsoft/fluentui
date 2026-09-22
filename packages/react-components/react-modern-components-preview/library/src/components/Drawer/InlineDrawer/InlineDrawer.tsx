'use client';

import * as React from 'react';
import { useDrawerContextValue } from '@fluentui/react-headless-components-preview/drawer';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { InlineDrawerProps } from './InlineDrawer.types';
import { renderInlineDrawer } from './renderInlineDrawer';
import { useInlineDrawer } from './useInlineDrawer';
import { useInlineDrawerStyles } from './useInlineDrawerStyles.styles';

/**
 * InlineDrawer is stacked with the content and keeps the rest of the page interactive.
 */
export const InlineDrawer: ForwardRefComponent<InlineDrawerProps> = React.forwardRef((props, ref) => {
  const state = useInlineDrawer(props, ref);
  const contextValue = useDrawerContextValue();
  useInlineDrawerStyles(state);
  return renderInlineDrawer(state, contextValue);
});

InlineDrawer.displayName = 'InlineDrawer';
