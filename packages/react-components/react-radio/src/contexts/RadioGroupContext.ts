import * as React from 'react';

import type { RadioGroupContextValue } from '../RadioGroup';

/**
 * RadioGroupContext is provided by RadioGroup, and is consumed by Radio to determine default values of some props.
 */
export const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);

const radioGroupContextDefaultValue: RadioGroupContextValue = {};

export const RadioGroupProvider = RadioGroupContext.Provider;

/**
 * Get the value of the RadioGroupContext.
 */
export const useRadioGroupContextValue_unstable = () =>
  React.useContext(RadioGroupContext) || radioGroupContextDefaultValue;

/**
 * @deprecated Use useRadioGroupContextValue_unstable instead.
 * RadioGroupContext is no longer a selector context, and no longer benefits from having a selector.
 */
export const useRadioGroupContext_unstable = <T>(selector: (ctx: RadioGroupContextValue) => T): T =>
  selector(useRadioGroupContextValue_unstable());
