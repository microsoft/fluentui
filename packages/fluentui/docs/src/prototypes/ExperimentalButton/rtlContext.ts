import * as React from 'react';

export const RtlContext = React.createContext({
  rtl: false,
});

export const useRtl = (defaultValue = { rtl: false }) => {
  const context = React.useContext(RtlContext) || defaultValue;
  return context.rtl;
};

export const RtlContextProvider = RtlContext.Provider;
