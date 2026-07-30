'use client';

import * as React from 'react';
import { useToastFooter_unstable } from './useToastFooter';
import { renderToastFooter_unstable } from './renderToastFooter';
import { useToastFooterStyles_unstable } from './useToastFooterStyles.styles';
import type { ToastFooterProps } from './ToastFooter.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * ToastFooter component
 */
export const ToastFooter: ForwardRefComponent<ToastFooterProps> = React.forwardRef((props, ref) => {
  let state = useToastFooter_unstable(props, ref);

  state = useToastFooterStyles_unstable(state);
  state = useCustomStyleHook_unstable('useToastFooterStyles_unstable')(state);

  return renderToastFooter_unstable(state);
});

ToastFooter.displayName = 'ToastFooter';
