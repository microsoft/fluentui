'use client';

import * as React from 'react';
import { useToastContainer_unstable } from './useToastContainer';
import { renderToastContainer_unstable } from './renderToastContainer';
import { useToastContainerStyles_unstable } from './useToastContainerStyles.styles';
import type { ToastContainerProps } from './ToastContainer.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useToastContainerContextValues_unstable } from './useToastContainerContextValues';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * ToastContainer component
 */
export const ToastContainer: ForwardRefComponent<ToastContainerProps> = React.forwardRef((props, ref) => {
  let state = useToastContainer_unstable(props, ref);

  state = useToastContainerStyles_unstable(state);
  state = useCustomStyleHook_unstable('useToastContainerStyles_unstable')(state);

  return renderToastContainer_unstable(state, useToastContainerContextValues_unstable(state));
});

ToastContainer.displayName = 'ToastContainer';
