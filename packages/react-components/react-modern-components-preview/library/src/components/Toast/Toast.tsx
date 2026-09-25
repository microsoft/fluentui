'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastProps } from './Toast.types';
import { renderToast } from './renderToast';
import { useToast } from './useToast';
import { useToastStyles } from './useToastStyles.styles';

/** A Toast displays a brief notification. */
export const Toast: ForwardRefComponent<ToastProps> = React.forwardRef((props, ref) => {
  const state = useToast(props, ref);
  useToastStyles(state);
  return renderToast(state);
});

Toast.displayName = 'Toast';
