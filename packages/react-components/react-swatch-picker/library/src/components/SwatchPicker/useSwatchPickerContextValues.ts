'use client';

import * as React from 'react';
import type { SwatchPickerContextValue, SwatchPickerContextValues } from '../../contexts/swatchPicker';
import type { SwatchPickerState } from './SwatchPicker.types';

export const useSwatchPickerContextValues = (state: SwatchPickerState): SwatchPickerContextValues => {
  const { isGrid, size, shape, spacing, requestSelectionChange, selectedValue } = state;

  const swatchPicker = React.useMemo<SwatchPickerContextValue>(
    () => ({
      isGrid,
      size,
      shape,
      spacing,
      selectedValue,
      requestSelectionChange,
    }),
    [isGrid, size, shape, spacing, selectedValue, requestSelectionChange],
  );

  return { swatchPicker };
};
