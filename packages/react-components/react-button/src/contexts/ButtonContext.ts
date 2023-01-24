import * as React from 'react';
import { ButtonSize } from '../components/Button/Button.types';

const buttonContext = React.createContext<ButtonContextValue | undefined>(undefined);

/**
 * @internal
 */
export interface ButtonContextValue {
  size?: ButtonSize;
}

const buttonContextDefaultValue: ButtonContextValue = {};

/**
 * @internal
 */
export const ButtonContextProvider = buttonContext.Provider;

/**
 * @internal
 */
export const useButtonContext = () => React.useContext(buttonContext) ?? buttonContextDefaultValue;
