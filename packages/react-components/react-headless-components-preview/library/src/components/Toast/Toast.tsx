'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastProps } from './Toast.types';
import { useToast } from './useToast';
import { useToastContextValues } from './useToastContextValues';
import { renderToast } from './renderToast';

export const Toast: ForwardRefComponent<ToastProps> = React.forwardRef((props, ref) => {
  const state = useToast(props, ref);
  const contextValues = useToastContextValues(state);
  return renderToast(state, contextValues);
});
Toast.displayName = 'Toast';
