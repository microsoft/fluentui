'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useToastContainerContextValues } from '@fluentui/react-headless-components-preview/toast';
import type { ToastContainerProps } from './ToastContainer.types';
import { renderToastContainer } from './renderToastContainer';
import { useToastContainer } from './useToastContainer';
import { useToastContainerStyles } from './useToastContainerStyles.styles';

/** Hosts one Toast and manages its lifecycle and accessibility context. */
export const ToastContainer: ForwardRefComponent<ToastContainerProps> = React.forwardRef((props, ref) => {
  const state = useToastContainer(props, ref);
  const contextValues = useToastContainerContextValues(state);
  useToastContainerStyles(state);
  return renderToastContainer(state, contextValues);
});

ToastContainer.displayName = 'ToastContainer';
