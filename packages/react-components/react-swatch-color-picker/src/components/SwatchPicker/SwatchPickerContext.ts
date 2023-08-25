import * as React from 'react';
import { SwatchPickerContextValue } from './SwatchPicker.types';

const SwatchPickerContext = React.createContext<SwatchPickerContextValue | undefined>(undefined);

/**
 * @internal
 */
export const swatchPickerDefaultValue: SwatchPickerContextValue = {
  shape: 'square',
  size: 'medium',
};

/**
 * @internal
 */
export const SwatchPickerProvider = SwatchPickerContext.Provider;

/**
 * @internal
 */
export const useSwatchPickerContext_unstable = () => React.useContext(SwatchPickerContext) ?? swatchPickerDefaultValue;
