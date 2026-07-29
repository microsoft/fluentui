'use client';

import type * as React from 'react';
import { useToastBase_unstable } from '@fluentui/react-toast';

import type { ToastProps, ToastState } from './Toast.types';

/**
 * The `useToast` hook processes the props sent to `Toast` and returns state and slot props.
 */
export const useToast = (props: ToastProps, ref: React.Ref<HTMLElement>): ToastState => {
  const state: ToastState = useToastBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-intent'] = state.intent;

  return state;
};
