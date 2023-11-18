import * as React from 'react';
import { SpinnerProps } from '../components/Spinner/Spinner.types';

const SpinnerContext = React.createContext<SpinnerContextValue | undefined>(undefined);

/**
 * @internal
 */
export type SpinnerContextValue = Pick<SpinnerProps, 'size'>;

const SpinnerContextDefaultValue: SpinnerContextValue = {};

/**
 * @internal
 */
export const SpinnerContextProvider = SpinnerContext.Provider;

/**
 * @internal
 */
export const useSpinnerContext = () => React.useContext(SpinnerContext) ?? SpinnerContextDefaultValue;
