'use client';

import type * as React from 'react';
import { useToast as useToastBase } from '@fluentui/react-headless-components-preview/toast';
import type { ToastProps, ToastState } from './Toast.types';

/** Create the state required to render Toast. */
export const useToast = (props: ToastProps, ref: React.Ref<HTMLElement>): ToastState => {
  const { appearance, ...rest } = props;
  const state = useToastBase(rest, ref);

  return {
    ...state,
    appearance,
    root: {
      ...state.root,
      'data-appearance': appearance,
    },
  };
};
