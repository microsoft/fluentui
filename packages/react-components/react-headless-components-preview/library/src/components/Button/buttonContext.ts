'use client';

import * as React from 'react';

/**
 * Internal context value used to update default values between internal components
 *
 * @internal
 */
export interface ButtonContextValue {
  size?: 'small' | 'medium' | 'large';
}

const buttonContext = React.createContext<ButtonContextValue | undefined>(undefined);

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
