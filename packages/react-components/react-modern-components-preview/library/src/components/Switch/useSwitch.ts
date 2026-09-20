'use client';

import type * as React from 'react';
import { useSwitch as useSwitchBase } from '@fluentui/react-headless-components-preview/switch';
import type { SwitchProps, SwitchState } from './Switch.types';

/**
 * Create the state required to render Switch.
 */
export const useSwitch = (props: SwitchProps, ref: React.Ref<HTMLInputElement>): SwitchState => {
  const { size = 'medium', ...rest } = props;
  const state = useSwitchBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-size': size,
    },
    size,
  };
};
