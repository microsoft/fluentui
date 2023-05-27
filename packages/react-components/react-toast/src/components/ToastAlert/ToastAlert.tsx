import * as React from 'react';

import { renderToastAlert_unstable } from './renderToastAlert';
import { useToastAlert_unstable } from './useToastAlert';
import { useToastAlertStyles_unstable } from './useToastAlertStyles.styles';

import type { ToastAlertProps } from './ToastAlert.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * An ToastAlert component displays a brief, important message to attract a user's attention
 *  without interrupting their current task.
 */
export const ToastAlert: ForwardRefComponent<ToastAlertProps> = React.forwardRef((props, ref) => {
  const state = useToastAlert_unstable(props, ref);

  useToastAlertStyles_unstable(state);
  return renderToastAlert_unstable(state);
}) as ForwardRefComponent<ToastAlertProps>;

ToastAlert.displayName = 'ToastAlert';
