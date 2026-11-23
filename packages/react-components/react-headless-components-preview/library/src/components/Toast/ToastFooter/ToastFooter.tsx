'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastFooterProps } from './ToastFooter.types';
import { useToastFooter } from './useToastFooter';
import { renderToastFooter } from './renderToastFooter';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * ToastFooter contains action buttons related to the toast message.
 */
export const ToastFooter: ForwardRefComponent<ToastFooterProps> = /*#__PURE__*/ composeComponent(
  'ToastFooter',
  useToastFooter,
  renderToastFooter,
);
