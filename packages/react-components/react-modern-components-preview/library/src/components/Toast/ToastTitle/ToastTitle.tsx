'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToastTitleProps } from './ToastTitle.types';
import { renderToastTitle } from './renderToastTitle';
import { useToastTitle } from './useToastTitle';
import { useToastTitleStyles } from './useToastTitleStyles.styles';

/** The title and optional media or action region of a Toast. */
export const ToastTitle: ForwardRefComponent<ToastTitleProps> = React.forwardRef((props, ref) => {
  const state = useToastTitle(props, ref);
  useToastTitleStyles(state);
  return renderToastTitle(state);
});

ToastTitle.displayName = 'ToastTitle';
