'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastTitleProps } from './ToastTitle.types';
import { useToastTitle } from './useToastTitle';
import { renderToastTitle } from './renderToastTitle';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Represents the title of a toast, which is a brief summary or headline for the toast message.
 */
export const ToastTitle: ForwardRefComponent<ToastTitleProps> = /*#__PURE__*/ composeComponent(
  'ToastTitle',
  useToastTitle,
  renderToastTitle,
);
