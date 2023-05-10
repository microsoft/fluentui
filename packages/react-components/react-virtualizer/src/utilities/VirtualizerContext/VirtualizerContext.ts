import * as React from 'react';
import type { VirtualizerContextProps } from './types';
import { useMemo, useState } from 'react';

const VirtualizerContext = React.createContext<VirtualizerContextProps | undefined>(
  undefined,
) as React.Context<VirtualizerContextProps>;

export const VirtualizerContextProvider = VirtualizerContext.Provider;

export const useVirtualizerContext_unstable = () => {
  return React.useContext(VirtualizerContext);
};

export const useVirtualizerContextState_unstable = (
  passedContext?: VirtualizerContextProps,
): VirtualizerContextProps => {
  // Respect any wrapped providers while also ensuring defaults
  const virtualizerContext = useVirtualizerContext_unstable();
  const [_contextIndex, _setContextIndex] = useState<number>(-1);

  const _context = useMemo(
    () => passedContext ?? virtualizerContext ?? { contextIndex: _contextIndex, setContextIndex: _setContextIndex },
    [_contextIndex, passedContext, virtualizerContext],
  );
  const context = useMemo(() => {
    return { contextIndex: _context.contextIndex, setContextIndex: _context.setContextIndex };
  }, [_context]);

  return context;
};
