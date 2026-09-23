'use client';

import * as React from 'react';
import { useCheckbox as useCheckboxBase } from '@fluentui/react-headless-components-preview/checkbox';
import {
  Checkmark12Filled,
  Checkmark16Filled,
  CircleFilled,
  Square12Filled,
  Square16Filled,
} from '@fluentui/react-icons';
import type { CheckboxProps, CheckboxState } from './Checkbox.types';

export const useCheckbox = (props: CheckboxProps, ref: React.Ref<HTMLInputElement>): CheckboxState => {
  const { shape = 'square', size = 'medium', ...rest } = props;
  const state = useCheckboxBase(rest, ref);
  const mixed = state.checked === 'mixed';
  let defaultIndicator: React.ReactNode;

  if (mixed) {
    defaultIndicator = React.createElement(
      shape === 'circular' ? CircleFilled : size === 'large' ? Square16Filled : Square12Filled,
    );
  } else if (state.checked) {
    defaultIndicator = React.createElement(size === 'large' ? Checkmark16Filled : Checkmark12Filled);
  }

  return {
    ...state,
    indicator: state.indicator && {
      ...state.indicator,
      children: state.indicator.children ?? defaultIndicator,
    },
    root: {
      ...state.root,
      'data-shape': shape,
      'data-size': size,
    },
    shape,
    size,
  };
};
