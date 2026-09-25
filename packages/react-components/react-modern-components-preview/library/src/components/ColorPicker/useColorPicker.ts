'use client';

import type * as React from 'react';
import { useColorPicker as useColorPickerBase } from '@fluentui/react-headless-components-preview/color-picker';
import type { ColorPickerProps, ColorPickerState } from './ColorPicker.types';

export const useColorPicker = (props: ColorPickerProps, ref: React.Ref<HTMLDivElement>): ColorPickerState => {
  const { shape = 'rounded', ...rest } = props;
  const state = useColorPickerBase(rest, ref);

  return {
    ...state,
    shape,
    root: {
      ...state.root,
      'data-shape': shape,
    },
  };
};
