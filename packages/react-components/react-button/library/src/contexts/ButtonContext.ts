'use client';

import * as React from 'react';
import type { ButtonSize } from '../components/Button/Button.types';

const buttonContext = React.createContext<ButtonContextValue | undefined>(undefined);

/**
 * Internal context value used to update default values between internal components
 *
 * @internal
 */
export interface ButtonContextValue {
  size?: ButtonSize;
}

const buttonContextDefaultValue: ButtonContextValue = {};

/**
 * Internal context provider used to update default values between internal components
 *
 * @internal
 */
export const ButtonContextProvider = buttonContext.Provider;

/**
 * Internal context hook used to update default values between internal components
 *
 * @internal
 */
export const useButtonContext = (): ButtonContextValue => {
  return React.useContext(buttonContext) ?? buttonContextDefaultValue;
};
