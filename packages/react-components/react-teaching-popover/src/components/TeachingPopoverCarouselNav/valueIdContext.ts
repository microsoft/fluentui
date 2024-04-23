import * as React from 'react';

const valueIdContext = React.createContext<string | undefined>(undefined);

export const valueIdContextDefaultValue = '';

export const useValueIdContext = () => React.useContext(valueIdContext) ?? valueIdContextDefaultValue;

export const ValueIdContextProvider = valueIdContext.Provider;
