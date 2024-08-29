import * as React from 'react';
import type { VirtualizerContextProps } from './types';
import { useMemo, useState, useRef } from 'react';

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
  const virtualizerContext = useVirtualizerContext_unstable();
  const [_contextIndex, _setContextIndex] = useState<number>(-1);
  const [_contextPosition, _setContextPosition] = useState<number>(0);
  const childProgressiveSizes = useRef<number[]>([]);

  /* We respect any wrapped providers while also ensuring defaults or passed through
   * Order of usage -> Passed Prop -> Provider Context -> Internal State default
   */
  const _context = useMemo(
    () =>
      passedContext ??
      virtualizerContext ?? {
        contextIndex: _contextIndex,
        setContextIndex: _setContextIndex,
        contextPosition: _contextPosition,
        setContextPosition: _setContextPosition,
        childProgressiveSizes,
      },
    [_contextIndex, _contextPosition, passedContext, virtualizerContext],
  );

  const context = useMemo(() => {
    return {
      contextIndex: _context.contextIndex,
      setContextIndex: _context.setContextIndex,
      contextPosition: _context.contextPosition,
      setContextPosition: _context.setContextPosition,
      childProgressiveSizes,
    };
  }, [
    _context.contextIndex,
    _context.contextPosition,
    _context.setContextIndex,
    _context.setContextPosition,
    childProgressiveSizes,
  ]);

  return context;
};
