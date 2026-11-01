'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastContainerProps } from './ToastContainer.types';
import { useToastContainer } from './useToastContainer';
import { useToastContainerContextValues } from './useToastContainerContextValues';
import { renderToastContainer } from './renderToastContainer';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Wraps a Toast and provides context for its content and behavior.
 *
 * The ToastContainer should be rendered inside a Toaster, which manages the stacking and positioning of multiple ToastContainers.
 */
export const ToastContainer: ForwardRefComponent<ToastContainerProps> = /*#__PURE__*/ composeComponent(
  'ToastContainer',
  useToastContainer,
  renderToastContainer,
  useToastContainerContextValues,
);
