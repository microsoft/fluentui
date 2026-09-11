'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToastFooter, useToastFooter } from '@fluentui/react-headless-components-preview/toast';

import type { ToastFooterProps } from './ToastFooter.types';
import { useToastFooterStyles } from './useToastFooterStyles';

/**
 * A ToastFooter holds a toast's actions. Windmod ToastFooter: the headless toast footer decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const ToastFooter: ForwardRefComponent<ToastFooterProps> = React.forwardRef((props, ref) => {
  const state = useToastFooter(props, ref);
  const styled = useToastFooterStyles(state);

  return renderToastFooter(styled);
});

ToastFooter.displayName = 'ToastFooter';
