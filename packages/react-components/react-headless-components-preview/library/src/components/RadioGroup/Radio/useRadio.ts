'use client';

import type * as React from 'react';
import { useRadioBase_unstable } from '@fluentui/react-radio';

import type { RadioProps, RadioState } from './Radio.types';

/**
 * Returns the state for a Radio component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderRadio`.
 */
export const useRadio = (props: RadioProps, ref: React.Ref<HTMLInputElement>): RadioState => {
  const state = useRadioBase_unstable(props, ref);

  return state;
};
