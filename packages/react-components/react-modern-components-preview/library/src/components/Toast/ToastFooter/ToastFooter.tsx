'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastFooterProps } from './ToastFooter.types';
import { renderToastFooter } from './renderToastFooter';
import { useToastFooter } from './useToastFooter';
import { useToastFooterStyles } from './useToastFooterStyles.styles';

/** Contains actions related to a Toast notification. */
export const ToastFooter: ForwardRefComponent<ToastFooterProps> = React.forwardRef((props, ref) => {
  const state = useToastFooter(props, ref);
  useToastFooterStyles(state);
  return renderToastFooter(state);
});

ToastFooter.displayName = 'ToastFooter';
