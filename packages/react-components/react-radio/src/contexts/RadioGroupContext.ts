import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { RadioGroupContextValue } from '../RadioGroup';

/**
 * RadioGroupContext is provided by RadioGroup, and is consumed by Radio to determine default values of some props.
 */
// eslint-disable-next-line @fluentui/no-context-default-value
export const RadioGroupContext: Context<RadioGroupContextValue> = createContext({});

export const RadioGroupProvider = RadioGroupContext.Provider;

export const useRadioGroupContext_unstable = <T>(selector: ContextSelector<RadioGroupContextValue, T>): T =>
  useContextSelector(RadioGroupContext, selector);
