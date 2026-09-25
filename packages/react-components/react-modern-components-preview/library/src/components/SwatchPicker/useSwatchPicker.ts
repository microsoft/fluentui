'use client';

import type * as React from 'react';
import { useSwatchPicker as useSwatchPickerBase } from '@fluentui/react-headless-components-preview/swatch-picker';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';

export const useSwatchPicker = (props: SwatchPickerProps, ref: React.Ref<HTMLDivElement>): SwatchPickerState => {
  const { size = 'medium', shape = 'square', spacing = 'medium', ...rest } = props;
  const state = useSwatchPickerBase(rest, ref);

  return {
    ...state,
    size,
    shape,
    spacing,
    root: {
      ...state.root,
      'data-size': size,
      'data-shape': shape,
      'data-spacing': spacing,
    },
  };
};

export {
  useSwatchPickerContextValue,
  useSwatchPickerContextValues,
} from '@fluentui/react-headless-components-preview/swatch-picker';
