import * as React from 'react';

import type { RadioPickerContextValue } from '../RadioPicker';

/**
 * RadioPickerContext is provided by RadioPicker, and is consumed by Radio to determine default values of some props.
 */
export const RadioPickerContext = React.createContext<RadioPickerContextValue | undefined>(undefined);

const radioPickerContextDefaultValue: RadioPickerContextValue = {};

export const RadioPickerProvider = RadioPickerContext.Provider;

/**
 * Get the value of the RadioPickerContext.
 */
export const useRadioPickerContextValue_unstable = () =>
  React.useContext(RadioPickerContext) || radioPickerContextDefaultValue;

/**
 * @deprecated Use useRadioPickerContextValue_unstable instead.
 * RadioPickerContext is no longer a selector context, and no longer benefits from having a selector.
 */
export const useRadioPickerContext_unstable = <T>(selector: (ctx: RadioPickerContextValue) => T): T =>
  selector(useRadioPickerContextValue_unstable());
