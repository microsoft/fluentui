import * as React from 'react';

/**
 * Context that returns true if subtle items should be rendered
 * Subtle items are rendered on hover or focus
 */
const tableRowSubtleContext = React.createContext<boolean | undefined>(undefined);

const tableRowSubtleContextDefaultValue = false;

export const TableRowSubtleContextProvider = tableRowSubtleContext.Provider;
export const useTableRowSubtleContext = () =>
  React.useContext(tableRowSubtleContext) ?? tableRowSubtleContextDefaultValue;
