import * as React from 'react';
import { RadioGroupProps } from '../RadioGroup';

export type RadioGroupContextValue = Pick<RadioGroupProps, 'name' | 'layout' | 'value' | 'defaultValue' | 'disabled'>;

/**
 * RadioGroupContext is provided by RadioGroup, and is consumed by Radio to determine default values of some props.
 */
export const RadioGroupContext = React.createContext<RadioGroupContextValue>({});
