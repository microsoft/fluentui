'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastFooterProps } from './ToastFooter.types';
import { useToastFooter } from './useToastFooter';
import { renderToastFooter } from './renderToastFooter';

export const ToastFooter: ForwardRefComponent<ToastFooterProps> = React.forwardRef((props, ref) => {
  const state = useToastFooter(props, ref);
  return renderToastFooter(state);
});
ToastFooter.displayName = 'ToastFooter';
