import * as React from 'react';
import { SwatchPickerProps, SwatchPickerState } from '../components/SwatchPicker/SwatchPicker.types';

export interface Color {
  hex: string;
}

export type DefaultColor = {
  hex: string;
  id?: string;
};

/**
 * The context through which individual color controls communicate with the picker.
 */
export type SwatchPickerContextValue<ColorT = DefaultColor> = Pick<
  SwatchPickerProps,
  'layout' | 'columnCount' | 'size' | 'shape'
> & {
  /**
   * Notify the picker about color preview change.
   */
  notifyPreview: (color: ColorT, status: boolean) => void;

  /**
   * Notify the picker about color selection.
   */
  notifySelected: (color: ColorT) => void;
};

export const useSwatchPickerContextValues = (state: SwatchPickerState): SwatchPickerContextValues => {
  const { layout, size, shape, columnCount, notifyPreview, notifySelected } = state;

  const swatchPicker = React.useMemo<SwatchPickerContextValue>(
    () => ({
      layout,
      size,
      shape,
      columnCount,
      notifyPreview,
      notifySelected,
    }),
    [layout, size, shape, columnCount, notifyPreview, notifySelected],
  );

  return { swatchPicker };
};

export const swatchPickerContextDefaultValue: SwatchPickerContextValue = {
  notifyPreview: () => {
    /*noop*/
  },
  notifySelected: () => {
    /*noop*/
  },
  layout: 'row',
  columnCount: 2,
  size: 'medium',
  shape: 'square',
};

export type SwatchPickerContextValues = {
  swatchPicker: SwatchPickerContextValue;
};

export const SwatchPickerContext = React.createContext<SwatchPickerContextValue | undefined>(undefined);
export const SwatchPickerProvider = SwatchPickerContext.Provider;
export const useSwatchPickerContextValue_unstable = () =>
  React.useContext(SwatchPickerContext) ?? swatchPickerContextDefaultValue;
