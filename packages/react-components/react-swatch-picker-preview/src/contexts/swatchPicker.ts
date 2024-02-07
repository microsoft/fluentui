import * as React from 'react';
import {
  SwatchPickerProps,
  SwatchPickerState,
  SwatchPickerSelectData,
} from '../components/SwatchPicker/SwatchPicker.types';

/**
 * The context through which individual color controls communicate with the picker.
 */
export type SwatchPickerContextValue = Pick<
  SwatchPickerProps,
  'layout' | 'columnCount' | 'size' | 'shape' | 'selected' | 'defaultSelected'
> & {
  /**
   * Notify the picker about color selection.
   */
  // notifySelected: (color: string) => void;
  notifySelected: (data: SwatchPickerSelectData) => void;
};

export const useSwatchPickerContextValues = (state: SwatchPickerState): SwatchPickerContextValues => {
  const { layout, size, shape, columnCount, notifySelected, selected, defaultSelected } = state;

  const swatchPicker = React.useMemo<SwatchPickerContextValue>(
    () => ({
      layout,
      size,
      shape,
      columnCount,
      selected,
      defaultSelected,
      notifySelected,
    }),
    [layout, size, shape, columnCount, selected, defaultSelected, notifySelected],
  );

  return { swatchPicker };
};

export const swatchPickerContextDefaultValue: SwatchPickerContextValue = {
  notifySelected: () => {
    /*noop*/
  },
  layout: 'row',
  columnCount: 2,
  size: 'medium',
  shape: 'square',
  selected: undefined,
  defaultSelected: undefined,
};

export type SwatchPickerContextValues = {
  swatchPicker: SwatchPickerContextValue;
};

export const SwatchPickerContext = React.createContext<SwatchPickerContextValue | undefined>(undefined);
export const SwatchPickerProvider = SwatchPickerContext.Provider;
export const useSwatchPickerContextValue_unstable = () =>
  React.useContext(SwatchPickerContext) ?? swatchPickerContextDefaultValue;
