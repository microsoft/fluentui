'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import { renderToastTrigger } from './renderToastTrigger';
import { ToastTriggerProps } from './ToastTrigger.types';
import { useToastTrigger } from './useToastTrigger';

/**
 * Represents the trigger element for a toast, which is typically a button or interactive element
 * that closes the toast when activated.
 */
export const ToastTrigger = (props: ToastTriggerProps): JSXElement | null => {
  const state = useToastTrigger(props);
  return renderToastTrigger(state);
};
