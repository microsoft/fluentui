'use client';

import * as React from 'react';
import { useSelect as useSelectBase } from '@fluentui/react-headless-components-preview/select';
import { ChevronDownRegular } from '@fluentui/react-icons';
import type { SelectProps, SelectState } from './Select.types';

/**
 * Create the state required to render Select.
 */
export const useSelect = (props: SelectProps, ref: React.Ref<HTMLSelectElement>): SelectState => {
  const { appearance = 'outline', size = 'medium', ...rest } = props;
  const state = useSelectBase(rest, ref);

  return {
    ...state,
    icon: state.icon && {
      ...state.icon,
      children: state.icon.children ?? React.createElement(ChevronDownRegular),
    },
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
