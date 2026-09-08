'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastTitleProps, ToastTitleState } from './ToastTitle.types';
import { useToastTitle } from './useToastTitle';
import { renderToastTitle } from './renderToastTitle';

/**
 * Represents the title of a toast, which is a brief summary or headline for the toast message.
 */
export const ToastTitle: ForwardRefComponent<ToastTitleProps> = React.forwardRef((props, ref) => {
  const state: ToastTitleState = useToastTitle(props, ref);

  if (state.media) {
    // eslint-disable-next-line react-hooks/immutability
    state.media['data-intent'] = state.intent;
  }

  return renderToastTitle(state);
});

ToastTitle.displayName = 'ToastTitle';
