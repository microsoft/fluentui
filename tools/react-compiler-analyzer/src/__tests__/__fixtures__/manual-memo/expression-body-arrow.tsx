import * as React from 'react';

type WidgetContextValue = { value: string };

const WidgetContext = React.createContext<WidgetContextValue>({ value: '' });

export const WidgetContextProvider: React.FC<React.ProviderProps<WidgetContextValue>> = ({ value, children }) => (
  <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>
);

export const useWidgetContext = (): WidgetContextValue => React.useContext(WidgetContext);
