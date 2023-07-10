import * as React from 'react';
import type { SpinnerSize } from '../components/Spinner/Spinner.types';

const SpinnerContext = React.createContext<SpinnerContextValue | undefined>(undefined);

/**
 * @internal
 */
export interface SpinnerContextValue {
  size?: SpinnerSize;
}

const SpinnerContextDefaultValue: SpinnerContextValue = { size: 'medium' };

/**
 * @internal
 */
export const SpinnerContextProvider = SpinnerContext.Provider;

/**
 * @internal
 */
export const useSpinnerContext = () => React.useContext(SpinnerContext) ?? SpinnerContextDefaultValue;
