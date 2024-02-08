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
export type SwatchPickerContextValue = Pick<
  SwatchPickerProps,
  'layout' | 'columnCount' | 'size' | 'shape' | 'selectedValue' | 'defaultSelectedValue'
> & {
  /**
   * Notify the picker about color selection.
   */
  notifySelected: (data: SwatchPickerNotifySelectedData) => void;
};

export type SwatchPickerNotifySelectedData = { event: SwatchPickerSelectEvent } & SwatchPickerSelectData;

export const useSwatchPickerContextValues = (state: SwatchPickerState): SwatchPickerContextValues => {
  const { layout, size, shape, columnCount, notifySelected, selectedValue, defaultSelectedValue } = state;

  const swatchPicker = React.useMemo<SwatchPickerContextValue>(
    () => ({
      layout,
      size,
      shape,
      columnCount,
      selectedValue,
      defaultSelectedValue,
      notifySelected,
    }),
    [layout, size, shape, columnCount, selectedValue, defaultSelectedValue, notifySelected],
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
  selectedValue: undefined,
  defaultSelectedValue: undefined,
};

export type SwatchPickerContextValues = {
  swatchPicker: SwatchPickerContextValue;
};

export const SwatchPickerContext = React.createContext<SwatchPickerContextValue | undefined>(undefined);
export const SwatchPickerProvider = SwatchPickerContext.Provider;
export const useSwatchPickerContextValue_unstable = () =>
  React.useContext(SwatchPickerContext) ?? swatchPickerContextDefaultValue;
