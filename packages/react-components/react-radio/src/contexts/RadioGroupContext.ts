import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { RadioGroupContextValue } from '../RadioGroup';

/**
 * RadioGroupContext is provided by RadioGroup, and is consumed by Radio to determine default values of some props.
 */
export const RadioGroupContext: Context<RadioGroupContextValue> = createContext<RadioGroupContextValue | undefined>(
  undefined,
) as Context<RadioGroupContextValue>;

const radioGroupContextDefaultValue: RadioGroupContextValue = {};

export const RadioGroupProvider = RadioGroupContext.Provider;

export const useRadioGroupContext_unstable = <T>(selector: ContextSelector<RadioGroupContextValue, T>): T =>
  useContextSelector(RadioGroupContext, (ctx = radioGroupContextDefaultValue) => selector(ctx));
