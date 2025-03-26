import * as React from 'react';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { ColorPickerState, ColorPickerProps } from '../components/ColorPicker/ColorPicker.types';
import type { HsvColor } from '../types/color';

/**
 * The context through which individual color controls communicate with the picker.
 */
export type ColorPickerContextValue = Pick<ColorPickerProps, 'shape' | 'color'> & {
  /**
   * @internal
   * Callback used by Sliders to request a change on it's selected value
   * Should be used to get value of color channel
   */
  requestChange: (event: React.ChangeEvent<HTMLInputElement>, data: { color: HsvColor }) => void;
};

export const useColorPickerContextValues = (state: ColorPickerState): ColorPickerContextValues => {
  const { color, shape, requestChange } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const colorPicker: ColorPickerContextValue = {
    requestChange,
    color,
    shape,
  };

  return { colorPicker };
};

export const colorPickerContextDefaultValue: ColorPickerContextValue = {
  requestChange: () => {
    /*noop*/
  },
  color: undefined,
  shape: 'rounded',
};

export type ColorPickerContextValues = {
  colorPicker: ColorPickerContextValue;
};

const colorPickerContext = createContext<ColorPickerContextValue | undefined>(
  undefined,
) as Context<ColorPickerContextValue>;

export const ColorPickerProvider = colorPickerContext.Provider;

export const useColorPickerContextValue_unstable = <T>(selector: ContextSelector<ColorPickerContextValue, T>): T =>
  useContextSelector(colorPickerContext, (ctx = colorPickerContextDefaultValue) => selector(ctx));
