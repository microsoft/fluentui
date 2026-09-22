'use client';

import type * as React from 'react';
import {
  useColorArea as useColorAreaBase,
  useColorPickerContextValue,
} from '@fluentui/react-headless-components-preview/color-picker';
import type { ColorAreaProps, ColorAreaState } from './ColorArea.types';

export const useColorArea = (props: ColorAreaProps, ref: React.Ref<HTMLDivElement>): ColorAreaState => {
  const shapeFromContext = useColorPickerContextValue(context => context.shape);
  const { shape = shapeFromContext ?? 'rounded', ...rest } = props;
  const state = useColorAreaBase(rest, ref);

  return {
    ...state,
    shape,
    root: {
      ...state.root,
      'data-shape': shape,
    },
  };
};
