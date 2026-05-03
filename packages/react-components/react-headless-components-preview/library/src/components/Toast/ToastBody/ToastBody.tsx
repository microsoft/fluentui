'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastBodyBaseProps } from './ToastBody.types';
import { useToastBody } from './useToastBody';
import { renderToastBody } from './renderToastBody';

export const ToastBody: ForwardRefComponent<ToastBodyBaseProps> = React.forwardRef((props, ref) => {
  const state = useToastBody(props, ref);
  return renderToastBody(state);
});
ToastBody.displayName = 'ToastBody';
