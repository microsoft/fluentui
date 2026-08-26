'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToastBody, useToastBody } from '@fluentui/react-headless-components-preview/toast';

import type { ToastBodyProps } from './ToastBody.types';
import { useToastBodyStyles } from './useToastBodyStyles';

/**
 * A ToastBody carries a toast's message. Windmod ToastBody: the headless toast body decorated with
 * the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const ToastBody: ForwardRefComponent<ToastBodyProps> = React.forwardRef(
  (props: ToastBodyProps, ref: React.Ref<HTMLElement>) => renderToastBody(useToastBodyStyles(useToastBody(props, ref))),
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<ToastBodyProps>;

ToastBody.displayName = 'ToastBody';
