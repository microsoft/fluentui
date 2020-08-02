import * as React from 'react';

type FlexContextProps = {
  disableShrink: boolean;
  gap: undefined | string;
};

const initialState: FlexContextProps = {
  disableShrink: false,
  gap: undefined,
};

export const FlexContext = React.createContext(initialState);
