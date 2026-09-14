'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastProps } from './Toast.types';
import { useToast } from './useToast';
import { renderToast } from './renderToast';

/**
 * A Toast component displays temporary, non-intrusive notifications to users.
 * It's ideal for displaying brief messages, alerts, or feedback that auto-dismiss after a set duration.
 */
export const Toast: ForwardRefComponent<ToastProps> = React.forwardRef((props, ref) => {
  const state = useToast(props, ref);
  return renderToast(state);
});

Toast.displayName = 'Toast';
