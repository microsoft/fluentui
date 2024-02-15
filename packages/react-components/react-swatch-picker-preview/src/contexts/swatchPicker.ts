import { createContext, ContextSelector, useContextSelector, Context } from '@fluentui/react-context-selector';
import * as React from 'react';
import {
  SwatchPickerProps,
  SwatchPickerState,
  SwatchPickerOnSelectionChangeData,
  SwatchPickerOnSelectionChangeEvent,
} from '../components/SwatchPicker/SwatchPicker.types';

/**
 * The context through which individual color controls communicate with the picker.
 */
export type SwatchPickerContextValue = Pick<
  SwatchPickerProps,
  'defaultSelectedValue' | 'size' | 'shape' | 'selectedValue'
> & {
  /**
   * Callback used by ColorSwatch to request a change on it's selected state
   * Should be used to select ColorSwatch
   */
  requestSelectionChange: (data: SwatchPickerNotifySelectedData) => void;
};

export type SwatchPickerNotifySelectedData = {
  event: SwatchPickerOnSelectionChangeEvent;
} & SwatchPickerOnSelectionChangeData;

export const useSwatchPickerContextValues = (state: SwatchPickerState): SwatchPickerContextValues => {
  const { defaultSelectedValue, size, shape, requestSelectionChange, selectedValue } = state;

  const swatchPicker = React.useMemo<SwatchPickerContextValue>(
    () => ({
      defaultSelectedValue,
      size,
      shape,
      selectedValue,
      requestSelectionChange,
    }),
    [defaultSelectedValue, size, shape, selectedValue, requestSelectionChange],
  );

  return { swatchPicker };
};

export const swatchPickerContextDefaultValue: SwatchPickerContextValue = {
  defaultSelectedValue: undefined,
  requestSelectionChange: () => {
    /*noop*/
  },
  size: 'medium',
  shape: 'square',
  selectedValue: undefined,
};

export type SwatchPickerContextValues = {
  swatchPicker: SwatchPickerContextValue;
};

// export const SwatchPickerContext = React.createContext<SwatchPickerContextValue | undefined>(undefined);

const SwatchPickerContext = createContext<SwatchPickerContextValue | undefined>(
  undefined,
) as Context<SwatchPickerContextValue>;
export const SwatchPickerProvider = SwatchPickerContext.Provider;

// export const useSwatchPickerContextValue_unstable = () =>
//   React.useContext(SwatchPickerContext) ?? swatchPickerContextDefaultValue;

export const useSwatchPickerContextValue_unstable = <T>(selector: ContextSelector<SwatchPickerContextValue, T>): T =>
  useContextSelector(SwatchPickerContext, (ctx = swatchPickerContextDefaultValue) => selector(ctx));
