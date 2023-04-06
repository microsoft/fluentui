import * as React from 'react';

import type { RadioGroupContextValue } from '../RadioGroup';

/**
 * RadioGroupContext is provided by RadioGroup, and is consumed by Radio to determine default values of some props.
 */
export const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);

export const RadioGroupProvider = RadioGroupContext.Provider;

/**
 * Get the value of the RadioGroupContext.
 */
export function useRadioGroupContext_unstable(): RadioGroupContextValue {
  return React.useContext(RadioGroupContext) || {};
}
