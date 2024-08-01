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
   * Callback used by ColorSwatch to request a change on it's selected state
   * Should be used to select ColorSwatch
   */
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: { value: number; channel: 'hue' | 'saturation' | 'lightness' | 'alpha'; color?: string },
  ) => void;
};

export const useColorPickerContextValues = (state: ColorPickerState): ColorPickerContextValues => {
  const { color, onChange } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const colorPicker: ColorPickerContextValue = {
    onChange,
    color,
  };

  return { colorPicker };
};

export const colorPickerContextDefaultValue: ColorPickerContextValue = {
  onChange: () => {
    /*noop*/
  },
  color: undefined,
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
