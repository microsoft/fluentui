'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useToastLink_unstable } from './useToastLink';
import { renderToastLink_unstable } from './renderToastLink';
import { useToastLinkStyles_unstable } from './useToastLinkStyles.styles';
import type { ToastLinkProps } from './ToastLink.types';

/**
 * ToastLink is a Link component styled for use within Toast components.
 */
export const ToastLink: ForwardRefComponent<ToastLinkProps> = React.forwardRef((props, ref) => {
  const state = useToastLink_unstable(props, ref);

  useToastLinkStyles_unstable(state);

  useCustomStyleHook_unstable('useToastLinkStyles_unstable')(state);

  return renderToastLink_unstable(state);
}) as ForwardRefComponent<ToastLinkProps>;

ToastLink.displayName = 'ToastLink';
