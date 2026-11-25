'use client';

import { useToaster } from './useToaster';
import { renderToaster } from './renderToaster';
import { composeComponentWithoutRef } from '../../../utils/composeComponent';
import type { ComponentWithoutRef } from '../../../utils/composeComponent';
import type { ToasterProps } from './Toaster.types';

/**
 * Toaster — subscribes to the event-driven toast state machine and renders
 * position-based slot containers. Each container is promoted to the browser
 * top layer via the native Popover API.
 *
 * Pair with useToastController from @fluentui/react-toast to dispatch and dismiss toasts imperatively.
 */
export const Toaster: ComponentWithoutRef<ToasterProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'Toaster',
  useToaster,
  renderToaster,
);
