import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useDrawerContextValue } from '../../contexts/drawerContext';

import type { InlineDrawerProps } from './InlineDrawer.types';
import { useInlineDrawer_unstable } from './useInlineDrawer';
import { renderInlineDrawer_unstable } from './renderInlineDrawer';
import { useInlineDrawerStyles_unstable } from './useInlineDrawerStyles.styles';

/**
 * InlineDrawer is often used for navigation that is not dismissible. As it is on the same level as
 * the main surface, users can still interact with other UI elements.
 */
export const InlineDrawer: ForwardRefComponent<InlineDrawerProps> = React.forwardRef((props, ref) => {
  const state = useInlineDrawer_unstable(props, ref);
  const contextValue = useDrawerContextValue();

  useInlineDrawerStyles_unstable(state);
  useCustomStyleHook_unstable('useDrawerInlineStyles_unstable')(state);
  useCustomStyleHook_unstable('useInlineDrawerStyles_unstable')(state);

  return renderInlineDrawer_unstable(state, contextValue);
});

InlineDrawer.displayName = 'InlineDrawer';
