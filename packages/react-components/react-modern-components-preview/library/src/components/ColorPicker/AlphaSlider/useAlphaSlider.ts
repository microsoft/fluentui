'use client';

import type * as React from 'react';
import {
  useAlphaSlider as useAlphaSliderBase,
  useColorPickerContextValue,
} from '@fluentui/react-headless-components-preview/color-picker';
import type { AlphaSliderProps, AlphaSliderState } from './AlphaSlider.types';

export const useAlphaSlider = (props: AlphaSliderProps, ref: React.Ref<HTMLInputElement>): AlphaSliderState => {
  const shapeFromContext = useColorPickerContextValue(context => context.shape);
  const { shape = shapeFromContext ?? 'rounded', ...rest } = props;
  const state = useAlphaSliderBase(rest, ref);

  return {
    ...state,
    shape,
    root: {
      ...state.root,
      'data-shape': shape,
    },
  };
};
