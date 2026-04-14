'use client';

import type * as React from 'react';
import { useSpinnerBase_unstable } from '@fluentui/react-spinner';

import type { SpinnerProps, SpinnerState } from './Spinner.types';

/**
 * Returns the state for a Spinner component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSpinner`.
 */
export const useSpinner = (props: SpinnerProps, ref: React.Ref<HTMLElement>): SpinnerState => {
  'use no memo';

  const state: SpinnerState = useSpinnerBase_unstable(props, ref);

  state.root['data-label-position'] = state.labelPosition;

  return state;
};
