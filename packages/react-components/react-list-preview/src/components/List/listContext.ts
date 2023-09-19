import * as React from 'react';
import { ListContextValue } from './List.types';

const listContext = React.createContext<ListContextValue | undefined>(undefined);

export const listContextDefaultValue: ListContextValue = {
  focusableItems: false,
};

export const ListContextProvider = listContext.Provider;
export const useListContext = () => React.useContext(listContext) ?? listContextDefaultValue;
