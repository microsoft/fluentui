'use client';

import * as React from 'react';
import type { ColorPickerContextValue, ColorPickerContextValues } from '../../contexts/colorPicker';
import type { ColorPickerState } from './ColorPicker.types';

export const useColorPickerContextValues = (state: ColorPickerState): ColorPickerContextValues => {
  const { color, shape, requestChange } = state;

  const colorPicker = React.useMemo<ColorPickerContextValue>(
    () => ({
      requestChange,
      color,
      shape,
    }),
    [requestChange, color, shape],
  );

  return { colorPicker };
};
