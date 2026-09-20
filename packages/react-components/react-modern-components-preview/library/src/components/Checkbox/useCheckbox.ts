'use client';

import type * as React from 'react';
import { useCheckbox as useCheckboxBase } from '@fluentui/react-headless-components-preview/checkbox';
import type { CheckboxProps, CheckboxState } from './Checkbox.types';

export const useCheckbox = (props: CheckboxProps, ref: React.Ref<HTMLInputElement>): CheckboxState => {
  const { shape = 'square', size = 'medium', ...rest } = props;
  const state = useCheckboxBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-shape': shape,
      'data-size': size,
    },
    shape,
    size,
  };
};
