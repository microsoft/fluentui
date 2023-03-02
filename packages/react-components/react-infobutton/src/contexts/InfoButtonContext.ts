import * as React from 'react';
import { InfoButtonProps } from '../components/InfoButton/InfoButton.types';

const infoButtonContext = React.createContext<InfoButtonContextValue | undefined>(undefined);

/**
 * @internal
 */
export type InfoButtonContextValue = Pick<InfoButtonProps, 'associatedLabelId' | 'size'>;

const infoButtonContextDefaultValue: InfoButtonContextValue = {};

/**
 * @internal
 */
export const InfoButtonContextProvider = infoButtonContext.Provider;

/**
 * @internal
 */
export const useInfoButtonContext = () => React.useContext(infoButtonContext) ?? infoButtonContextDefaultValue;
