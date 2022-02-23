import * as React from 'react';
import { RadioProps } from '../Radio';

export type RadioContextValue = Pick<RadioProps, 'name' | 'labelPosition'>;

/**
 * RadioContext is provided by the RadioGroup, and has default values for some radio props.
 */
export const RadioContext = React.createContext<RadioContextValue>({});
