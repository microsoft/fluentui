import * as React from 'react';
import { ButtonSize } from '../components/Button/Button.types';

const buttonContext = React.createContext<ButtonContextValue | undefined>(undefined);

/**
 * @internal
 * Internal context value used to update default values between internal components
 */
export interface ButtonContextValue {
  size?: ButtonSize;
}

const buttonContextDefaultValue: ButtonContextValue = {};

/**
 * @internal
 * Internal context provider used to update default values between internal components
 */
export const ButtonContextProvider = buttonContext.Provider;

/**
 * @internal
 * Internal context hook used to update default values between internal components
 */
export const useButtonContext = () => React.useContext(buttonContext) ?? buttonContextDefaultValue;
