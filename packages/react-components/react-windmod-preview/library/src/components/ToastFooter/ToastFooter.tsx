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
export const ToastFooter: ForwardRefComponent<ToastFooterProps> = React.forwardRef(
  (props: ToastFooterProps, ref: React.Ref<HTMLElement>) =>
    renderToastFooter(useToastFooterStyles(useToastFooter(props, ref))),
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<ToastFooterProps>;

ToastFooter.displayName = 'ToastFooter';
