import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { RadioGroupContextValue } from '../ToolbarRadioGroup.types';

/**
 * RadioGroupContext is provided by RadioGroup, and is consumed by Radio to determine default values of some props.
 */
export const RadioGroupContext: Context<RadioGroupContextValue> = createContext({});
