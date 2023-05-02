import * as React from 'react';
import type { VirtualizerContextProps } from './types';

const VirtualizerContext = React.createContext<VirtualizerContextProps | undefined>(
  undefined,
) as React.Context<VirtualizerContextProps>;

export const VirtualizerContextProvider = VirtualizerContext.Provider;

export const useVirtualizerContext = () => {
  return React.useContext(VirtualizerContext);
};

export const useVirtualizerContextState = (): VirtualizerContextProps => {
  // Respect any wrapped providers while also ensuring defaults
  const virtualizerContext = useVirtualizerContext();
  const [_contextIndex, _setContextIndex] = React.useState<number>(-1);

  return {
    contextIndex: virtualizerContext?.contextIndex !== undefined ? virtualizerContext.contextIndex : _contextIndex,
    setContextIndex: virtualizerContext?.setContextIndex ?? _setContextIndex,
  };
};
