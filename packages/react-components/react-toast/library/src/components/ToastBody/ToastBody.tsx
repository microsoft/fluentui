import * as React from 'react';
import { useToastBody_unstable } from './useToastBody';
import { renderToastBody_unstable } from './renderToastBody';
import { useToastBodyStyles_unstable } from './useToastBodyStyles.styles';
import type { ToastBodyProps } from './ToastBody.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ToastBody component
 */
export const ToastBody: ForwardRefComponent<ToastBodyProps> = React.forwardRef((props, ref) => {
  const state = useToastBody_unstable(props, ref);

  useToastBodyStyles_unstable(state);
  return renderToastBody_unstable(state);
});

ToastBody.displayName = 'ToastBody';
