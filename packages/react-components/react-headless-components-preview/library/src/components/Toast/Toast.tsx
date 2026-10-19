'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastProps } from './Toast.types';
import { useToast } from './useToast';
import { renderToast } from './renderToast';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A Toast component displays temporary, non-intrusive notifications to users.
 * It's ideal for displaying brief messages, alerts, or feedback that auto-dismiss after a set duration.
 */
export const Toast: ForwardRefComponent<ToastProps> = /*#__PURE__*/ composeComponent('Toast', useToast, renderToast);
