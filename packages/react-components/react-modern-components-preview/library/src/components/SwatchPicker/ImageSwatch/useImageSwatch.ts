'use client';

import type * as React from 'react';
import {
  useImageSwatch as useImageSwatchBase,
  useSwatchPickerContextValue,
} from '@fluentui/react-headless-components-preview/swatch-picker';
import type { ImageSwatchProps, ImageSwatchState } from './ImageSwatch.types';

export const useImageSwatch = (props: ImageSwatchProps, ref: React.Ref<HTMLButtonElement>): ImageSwatchState => {
  const sizeFromContext = useSwatchPickerContextValue(context => context.size);
  const shapeFromContext = useSwatchPickerContextValue(context => context.shape);
  const { size = sizeFromContext ?? 'medium', shape = shapeFromContext ?? 'square', ...rest } = props;
  const state = useImageSwatchBase(rest, ref);

  return {
    ...state,
    size,
    shape,
    root: {
      ...state.root,
      'data-size': size,
      'data-shape': shape,
    },
  };
};
