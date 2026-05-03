'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastContainerProps } from './ToastContainer.types';
import { useToastContainer } from './useToastContainer';
import { useToastContainerContextValues } from './useToastContainerContextValues';
import { renderToastContainer } from './renderToastContainer';

export const ToastContainer: ForwardRefComponent<ToastContainerProps> = React.forwardRef((props, ref) => {
  const state = useToastContainer(props, ref);
  const contextValues = useToastContainerContextValues(state);
  return renderToastContainer(state, contextValues);
});

ToastContainer.displayName = 'ToastContainer';
