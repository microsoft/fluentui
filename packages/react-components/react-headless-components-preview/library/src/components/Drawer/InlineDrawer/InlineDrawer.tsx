'use client';

import { useDrawerContextValue } from '@fluentui/react-drawer';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { InlineDrawerProps } from './InlineDrawer.types';
import { renderInlineDrawer } from './renderInlineDrawer';
import { useInlineDrawer } from './useInlineDrawer';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * InlineDrawer is stacked with the content and keeps the rest of the page interactive.
 */
export const InlineDrawer: ForwardRefComponent<InlineDrawerProps> = /*#__PURE__*/ composeComponent(
  'InlineDrawer',
  useInlineDrawer,
  renderInlineDrawer,
  useDrawerContextValue,
);
