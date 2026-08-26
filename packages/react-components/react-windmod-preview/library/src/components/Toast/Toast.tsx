'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToast, useToast } from '@fluentui/react-headless-components-preview/toast';

import type { ToastProps } from './Toast.types';
import { useToastStyles } from './useToastStyles';

/**
 * A Toast is a transient notification surface. Windmod Toast: the headless toast decorated with
 * the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Toast: ForwardRefComponent<ToastProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them. There is
  // no default: an absent appearance is the normal surface.
  ({ appearance, ...rest }, ref) => renderToast(useToastStyles({ ...useToast(rest, ref), appearance })),
);

Toast.displayName = 'Toast';
