import * as React from 'react';
import { createContext, ContextSelector, useContextSelector, Context } from '@fluentui/react-context-selector';
import { SwatchPickerProps, SwatchPickerState } from '../components/SwatchPicker/SwatchPicker.types';

/**
 * The context through which individual color controls communicate with the picker.
 */
export type SwatchPickerContextValue = Pick<
  SwatchPickerProps,
  'size' | 'shape' | 'selectedValue' | 'layout' | 'columnCount'
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
  const { size, shape, requestSelectionChange, selectedValue, layout, columnCount } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const swatchPicker: SwatchPickerContextValue = {
    size,
    shape,
    selectedValue,
    requestSelectionChange,
    layout,
    columnCount,
  };

  return { swatchPicker };
};

export const swatchPickerContextDefaultValue: SwatchPickerContextValue = {
  requestSelectionChange: () => {
    /*noop*/
  },
  size: 'medium',
  shape: 'square',
  selectedValue: undefined,
  layout: 'row',
  columnCount: 2,
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
