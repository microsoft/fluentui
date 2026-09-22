'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastBodyProps } from './ToastBody.types';
import { renderToastBody } from './renderToastBody';
import { useToastBody } from './useToastBody';
import { useToastBodyStyles } from './useToastBodyStyles.styles';

/** The main content and optional subtitle of a Toast. */
export const ToastBody: ForwardRefComponent<ToastBodyProps> = React.forwardRef((props, ref) => {
  const state = useToastBody(props, ref);
  useToastBodyStyles(state);
  return renderToastBody(state);
});

ToastBody.displayName = 'ToastBody';
