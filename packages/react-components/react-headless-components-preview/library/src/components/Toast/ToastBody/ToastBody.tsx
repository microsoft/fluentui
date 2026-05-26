'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastBodyProps } from './ToastBody.types';
import { useToastBody } from './useToastBody';
import { renderToastBody } from './renderToastBody';

/**
 * Represents the body of a toast, which typically contains the main content of the toast message.
 */
export const ToastBody: ForwardRefComponent<ToastBodyProps> = React.forwardRef((props, ref) => {
  const state = useToastBody(props, ref);
  return renderToastBody(state);
});

ToastBody.displayName = 'ToastBody';
