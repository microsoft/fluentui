'use client';

import type * as React from 'react';
import {
  useEmptySwatch as useEmptySwatchBase,
  useSwatchPickerContextValue,
} from '@fluentui/react-headless-components-preview/swatch-picker';
import type { EmptySwatchProps, EmptySwatchState } from './EmptySwatch.types';

export const useEmptySwatch = (props: EmptySwatchProps, ref: React.Ref<HTMLButtonElement>): EmptySwatchState => {
  const sizeFromContext = useSwatchPickerContextValue(context => context.size);
  const shapeFromContext = useSwatchPickerContextValue(context => context.shape);
  const { size = sizeFromContext ?? 'medium', shape = shapeFromContext ?? 'square', ...rest } = props;
  const state = useEmptySwatchBase(rest, ref);

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
