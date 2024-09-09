import * as React from 'react';
import { useToastFooter_unstable } from './useToastFooter';
import { renderToastFooter_unstable } from './renderToastFooter';
import { useToastFooterStyles_unstable } from './useToastFooterStyles.styles';
import type { ToastFooterProps } from './ToastFooter.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ToastFooter component
 */
export const ToastFooter: ForwardRefComponent<ToastFooterProps> = React.forwardRef((props, ref) => {
  const state = useToastFooter_unstable(props, ref);

  useToastFooterStyles_unstable(state);
  return renderToastFooter_unstable(state);
});

ToastFooter.displayName = 'ToastFooter';
