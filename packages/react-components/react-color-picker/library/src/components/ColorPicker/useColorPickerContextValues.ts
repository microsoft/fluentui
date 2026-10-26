'use client';

import * as React from 'react';
import type { ColorPickerContextValue, ColorPickerContextValues } from '../../contexts/colorPicker';
import type { ColorPickerBaseState, ColorPickerState } from './ColorPicker.types';

export const useColorPickerBaseContextValues_unstable = (state: ColorPickerBaseState): ColorPickerContextValues => {
  const { color, requestChange } = state;

  const colorPicker = React.useMemo<ColorPickerContextValue>(
    () => ({
      requestChange,
      color,
      shape: undefined,
    }),
    [requestChange, color],
  );

  return { colorPicker };
};

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
