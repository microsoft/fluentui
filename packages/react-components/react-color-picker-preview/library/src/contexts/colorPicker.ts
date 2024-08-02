import * as React from 'react';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { ColorPickerProps, ColorPickerState } from '../components/ColorPicker/ColorPicker.types';

/**
 * The context through which individual color controls communicate with the picker.
 */
export type ColorPickerContextValue = Pick<ColorPickerProps, 'color'> & {
  /**
   * @internal
   * Callback used by Sliders to request a change on it's selected value
   * Should be used to get value of color channel
   */
  requestChange: (event: React.ChangeEvent<HTMLInputElement>, data: { hue?: number; alpha?: number }) => void;
  overlayColor?: string;
  hueValue?: number;
  alphaValue?: number;
};

export const useColorPickerContextValues = (state: ColorPickerState): ColorPickerContextValues => {
  const { color, requestChange, overlayColor, hueValue, alphaValue } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const colorPicker: ColorPickerContextValue = {
    requestChange,
    color,
    overlayColor,
    hueValue,
    alphaValue,
  };

  return { colorPicker };
};

export const colorPickerContextDefaultValue: ColorPickerContextValue = {
  requestChange: () => {
    /*noop*/
  },
  color: undefined,
  overlayColor: undefined,
  hueValue: undefined,
  alphaValue: undefined,
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
