import * as React from 'react';

export type RadioContextValue = {
  name: string | undefined;
  labelPosition: 'after' | 'below';
};

export const RadioContext = React.createContext<RadioContextValue | undefined>(undefined);

export const useRadioContext = () => React.useContext(RadioContext);
