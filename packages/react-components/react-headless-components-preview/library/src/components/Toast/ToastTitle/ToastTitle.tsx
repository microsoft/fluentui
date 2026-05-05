'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastTitleBaseProps } from './ToastTitle.types';
import { useToastTitle } from './useToastTitle';
import { renderToastTitle } from './renderToastTitle';

export const ToastTitle: ForwardRefComponent<ToastTitleBaseProps> = React.forwardRef((props, ref) => {
  const state = useToastTitle(props, ref);
  return renderToastTitle(state);
});
ToastTitle.displayName = 'ToastTitle';
