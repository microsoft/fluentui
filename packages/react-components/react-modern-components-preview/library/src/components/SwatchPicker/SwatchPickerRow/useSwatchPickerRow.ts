'use client';

import type * as React from 'react';
import {
  useSwatchPickerContextValue,
  useSwatchPickerRow as useSwatchPickerRowBase,
} from '@fluentui/react-headless-components-preview/swatch-picker';
import type { SwatchPickerRowProps, SwatchPickerRowState } from './SwatchPickerRow.types';

export const useSwatchPickerRow = (
  props: SwatchPickerRowProps,
  ref: React.Ref<HTMLDivElement>,
): SwatchPickerRowState => {
  const spacing = useSwatchPickerContextValue(context => context.spacing) ?? 'medium';
  const state = useSwatchPickerRowBase(props, ref);

  return {
    ...state,
    spacing,
    root: {
      ...state.root,
      'data-spacing': spacing,
    },
  };
};
