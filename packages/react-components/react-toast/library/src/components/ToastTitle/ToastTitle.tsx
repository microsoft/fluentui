import * as React from 'react';
import { useToastTitle_unstable } from './useToastTitle';
import { renderToastTitle_unstable } from './renderToastTitle';
import { useToastTitleStyles_unstable } from './useToastTitleStyles.styles';
import type { ToastTitleProps } from './ToastTitle.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ToastTitle component
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const ToastTitle: ForwardRefComponent<ToastTitleProps> = React.forwardRef((props, ref) => {
  const state = useToastTitle_unstable(props, ref);

  useToastTitleStyles_unstable(state);
  return renderToastTitle_unstable(state);
});

ToastTitle.displayName = 'ToastTitle';
