import * as React from 'react';
import { useToast_unstable } from './useToast';
import { renderToast_unstable } from './renderToast';
import { useToastStyles_unstable } from './useToastStyles.styles';
import type { ToastProps } from './Toast.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useToastContextValues_unstable } from './useToastContextValues';

/**
 * Toast component
 */
export const Toast: ForwardRefComponent<ToastProps> = React.forwardRef((props, ref) => {
  const state = useToast_unstable(props, ref);

  useToastStyles_unstable(state);
  return renderToast_unstable(state, useToastContextValues_unstable(state));
});

Toast.displayName = 'Toast';
