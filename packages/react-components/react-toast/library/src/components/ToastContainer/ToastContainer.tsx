import * as React from 'react';
import { useToastContainer_unstable } from './useToastContainer';
import { renderToastContainer_unstable } from './renderToastContainer';
import { useToastContainerStyles_unstable } from './useToastContainerStyles.styles';
import type { ToastContainerProps } from './ToastContainer.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useToastContainerContextValues_unstable } from './useToastContainerContextValues';

/**
 * ToastContainer component
 */
export const ToastContainer: ForwardRefComponent<ToastContainerProps> = React.forwardRef((props, ref) => {
  const state = useToastContainer_unstable(props, ref);

  useToastContainerStyles_unstable(state);
  return renderToastContainer_unstable(state, useToastContainerContextValues_unstable(state));
});

ToastContainer.displayName = 'ToastContainer';
