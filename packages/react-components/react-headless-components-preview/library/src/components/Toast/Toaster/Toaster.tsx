'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import type { ToasterProps } from './Toaster.types';
import { useToaster } from './useToaster';
import { renderToaster } from './renderToaster';

/**
 * Toaster — subscribes to the event-driven toast state machine and renders
 * position-based slot containers. Each container is promoted to the browser
 * top layer via the native Popover API.
 *
 * Pair with useToastController from @fluentui/react-toast to dispatch and dismiss toasts imperatively.
 */
export const Toaster = (props: ToasterProps): JSXElement => {
  const state = useToaster(props);
  return renderToaster(state);
};

Toaster.displayName = 'Toaster';
