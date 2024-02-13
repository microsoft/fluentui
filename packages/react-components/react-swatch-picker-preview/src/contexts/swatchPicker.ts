import * as React from 'react';
import {
  SwatchPickerProps,
  SwatchPickerState,
  SwatchPickerSelectData,
  SwatchPickerSelectEvent,
} from '../components/SwatchPicker/SwatchPicker.types';

/**
 * The context through which individual color controls communicate with the picker.
 */
export type SwatchPickerContextValue = Pick<SwatchPickerProps, 'size' | 'shape' | 'selectedValue'> & {
  /**
   * Notify the picker about color selection.
   */
  notifySelected: (data: SwatchPickerNotifySelectedData) => void;
};

export type SwatchPickerNotifySelectedData = { event: SwatchPickerSelectEvent } & SwatchPickerSelectData;

export const useSwatchPickerContextValues = (state: SwatchPickerState): SwatchPickerContextValues => {
  const { size, shape, notifySelected, selectedValue } = state;

  const swatchPicker = React.useMemo<SwatchPickerContextValue>(
    () => ({
      size,
      shape,
      selectedValue,
      notifySelected,
    }),
    [size, shape, selectedValue, notifySelected],
  );

  return { swatchPicker };
};

export const swatchPickerContextDefaultValue: SwatchPickerContextValue = {
  notifySelected: () => {
    /*noop*/
  },
  size: 'medium',
  shape: 'square',
  selectedValue: undefined,
};

export type SwatchPickerContextValues = {
  swatchPicker: SwatchPickerContextValue;
};

export const SwatchPickerContext = React.createContext<SwatchPickerContextValue | undefined>(undefined);
export const SwatchPickerProvider = SwatchPickerContext.Provider;
export const useSwatchPickerContextValue_unstable = () =>
  React.useContext(SwatchPickerContext) ?? swatchPickerContextDefaultValue;
