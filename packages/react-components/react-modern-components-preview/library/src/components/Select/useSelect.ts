'use client';

import type * as React from 'react';
import { useSelect as useSelectBase } from '@fluentui/react-headless-components-preview/select';
import type { SelectProps, SelectState } from './Select.types';

/**
 * Create the state required to render Select.
 */
export const useSelect = (props: SelectProps, ref: React.Ref<HTMLSelectElement>): SelectState => {
  const { appearance = 'outline', size = 'medium', ...rest } = props;
  const state = useSelectBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-size': size,
    },
    select: {
      ...state.select,
      'data-appearance': appearance,
      'data-size': size,
    },
    appearance,
    size,
  };
};
