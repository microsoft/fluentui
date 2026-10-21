'use client';

import type * as React from 'react';
import { useToastTitleBase_unstable } from '@fluentui/react-toast';

import type { ToastTitleProps, ToastTitleState } from './ToastTitle.types';

/**
 * Returns the state for a ToastTitle component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToastTitle`.
 */
export const useToastTitle = (props: ToastTitleProps, ref: React.Ref<HTMLElement>): ToastTitleState => {
  const state: ToastTitleState = useToastTitleBase_unstable(props, ref);

  if (state.media) {
    // eslint-disable-next-line react-hooks/immutability
    state.media['data-intent'] = state.intent;
  }

  return state;
};
