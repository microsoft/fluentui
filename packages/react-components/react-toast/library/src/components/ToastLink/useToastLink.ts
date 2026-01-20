'use client';

import * as React from 'react';
import { useLink_unstable } from '@fluentui/react-link';
import type { ToastLinkProps, ToastLinkState } from './ToastLink.types';

/**
 * Create the state required to render ToastLink.
 *
 * Delegates to useLink_unstable from @fluentui/react-link.
 *
 * @param props - props from this instance of ToastLink
 * @param ref - reference to root HTMLElement of ToastLink
 */
export const useToastLink_unstable = (
  props: ToastLinkProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>,
): ToastLinkState => {
  return useLink_unstable(props, ref);
};
