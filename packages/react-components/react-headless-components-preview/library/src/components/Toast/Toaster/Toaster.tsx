'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToasterProps } from './Toaster.types';
import { useToaster } from './useToaster';
import { renderToaster } from './renderToaster';

/**
 * Headless Toaster — subscribes to the event-driven toast state machine and
 * renders a `ToastContainer` (div[popover="manual"]) for each active toast.
 *
 * Position and offset are intentionally omitted: the Popover API places each
 * toast in the browser top layer, so layout is pure CSS.
 *
 * Pair with `useToastController` from `@fluentui/react-toast` to dispatch and
 * dismiss toasts imperatively.
 *
 * @example
 * ```tsx
 * // App root
 * <Toaster toasterId="app" />
 *
 * // Anywhere inside FluentProvider
 * const { dispatchToast } = useToastController('app');
 * dispatchToast(
 *   <>
 *     <ToastTitle>Saved</ToastTitle>
 *     <ToastBody>Your changes have been saved.</ToastBody>
 *   </>,
 *   { intent: 'success', timeout: 3000 },
 * );
 * ```
 */
export const Toaster: ForwardRefComponent<ToasterProps> = React.forwardRef(({ toasterId }, _ref) => {
  const state = useToaster({ toasterId }, _ref);
  return renderToaster(state);
});

Toaster.displayName = 'Toaster';
