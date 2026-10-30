'use client';

import type * as React from 'react';
import type { ToasterProps } from './Toaster.types';
import { useToaster } from './useToaster';
import { renderToaster } from './renderToaster';
import { composeComponentWithoutRef } from '../../../utils/composeComponent';

/**
 * Toaster — subscribes to the event-driven toast state machine and renders
 * position-based slot containers. Each container is promoted to the browser
 * top layer via the native Popover API.
 *
 * Pair with useToastController from @fluentui/react-toast to dispatch and dismiss toasts imperatively.
 */
export const Toaster: React.FC<ToasterProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'Toaster',
  useToaster,
  renderToaster,
);
