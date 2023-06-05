import * as React from 'react';
import { useToastLayout_unstable } from './useToastLayout';
import { renderToastLayout_unstable } from './renderToastLayout';
import { useToastLayoutStyles_unstable } from './useToastLayoutStyles.styles';
import type { ToastLayoutProps } from './ToastLayout.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ToastLayout component
 */
export const ToastLayout: ForwardRefComponent<ToastLayoutProps> = React.forwardRef((props, ref) => {
  const state = useToastLayout_unstable(props, ref);

  useToastLayoutStyles_unstable(state);
  return renderToastLayout_unstable(state);
});

ToastLayout.displayName = 'ToastLayout';
