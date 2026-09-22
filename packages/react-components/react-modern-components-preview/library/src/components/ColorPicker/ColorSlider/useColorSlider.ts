'use client';

import type * as React from 'react';
import {
  useColorPickerContextValue,
  useColorSlider as useColorSliderBase,
} from '@fluentui/react-headless-components-preview/color-picker';
import type { ColorSliderProps, ColorSliderState } from './ColorSlider.types';

export const useColorSlider = (props: ColorSliderProps, ref: React.Ref<HTMLInputElement>): ColorSliderState => {
  const shapeFromContext = useColorPickerContextValue(context => context.shape);
  const { shape = shapeFromContext ?? 'rounded', ...rest } = props;
  const state = useColorSliderBase(rest, ref);

  return {
    ...state,
    shape,
    root: {
      ...state.root,
      'data-shape': shape,
    },
  };
};
