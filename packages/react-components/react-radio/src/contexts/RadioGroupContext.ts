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
export function useRadioGroupContext_unstable(): RadioGroupContextValue;

/**
 * @deprecated Call useRadioGroupContext_unstable() with no arguments. RadioGroupContext is now a single context object,
 * and a selector is no longer needed
 */
export function useRadioGroupContext_unstable<T>(selector: (value: RadioGroupContextValue) => T): T;

// Implementation with fallback for deprecated selector
export function useRadioGroupContext_unstable<T>(
  selector?: (value: RadioGroupContextValue) => T,
): T | RadioGroupContextValue {
  const ctx = React.useContext(RadioGroupContext) || {};
  return selector ? selector(ctx) : ctx;
}
