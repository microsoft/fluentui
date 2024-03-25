import * as React from 'react';
import { createContext, ContextSelector, useContextSelector, Context } from '@fluentui/react-context-selector';
import { SwatchPickerProps, SwatchPickerState } from '../components/SwatchPicker/SwatchPicker.types';

/**
 * The context through which individual color controls communicate with the picker.
 */
export type SwatchPickerContextValue = Pick<
  SwatchPickerProps,
  'size' | 'shape' | 'spacing' | 'selectedValue' | 'grid'
> & {
  /**
   * Callback used by ColorSwatch to request a change on it's selected state
   * Should be used to select ColorSwatch
   */
  requestSelectionChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    data: { selectedValue: string; selectedColor: string },
  ) => void;
};

export const useSwatchPickerContextValues = (state: SwatchPickerState): SwatchPickerContextValues => {
  const { grid, size, shape, spacing, requestSelectionChange, selectedValue } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const swatchPicker: SwatchPickerContextValue = {
    grid,
    size,
    shape,
    spacing,
    selectedValue,
    requestSelectionChange,
  };

  return { swatchPicker };
};

export const swatchPickerContextDefaultValue: SwatchPickerContextValue = {
  requestSelectionChange: () => {
    /*noop*/
  },
  grid: false,
  size: 'medium',
  shape: 'square',
  spacing: 'medium',
  selectedValue: undefined,
};

export type SwatchPickerContextValues = {
  swatchPicker: SwatchPickerContextValue;
};

const SwatchPickerContext = createContext<SwatchPickerContextValue | undefined>(
  undefined,
) as Context<SwatchPickerContextValue>;

export const SwatchPickerProvider = SwatchPickerContext.Provider;

export const useSwatchPickerContextValue_unstable = <T>(selector: ContextSelector<SwatchPickerContextValue, T>): T =>
  useContextSelector(SwatchPickerContext, (ctx = swatchPickerContextDefaultValue) => selector(ctx));
