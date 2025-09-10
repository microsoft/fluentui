import * as React from 'react';

const tableHeaderContext = React.createContext<string | undefined>(undefined);

const tableHeaderContextDefaultValue = '';

export const TableHeaderContextProvider = tableHeaderContext.Provider;
export const useIsInTableHeader = (): boolean =>
  React.useContext(tableHeaderContext) === tableHeaderContextDefaultValue;
