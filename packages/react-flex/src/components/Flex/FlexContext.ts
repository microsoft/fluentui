import * as React from 'react';

type FlexContextProps = {
  disableShrink: boolean;
  gap: string;
};

const initialState: FlexContextProps = {
  disableShrink: false,
  gap: '0px',
};

export const FlexContext = React.createContext(initialState);
