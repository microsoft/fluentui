'use client';

import * as React from 'react';
import type { DynamicVirtualizerContextProps, VirtualizerContextProps } from './types';

const VirtualizerContext = React.createContext<VirtualizerContextProps | undefined>(
  undefined,
) as React.Context<VirtualizerContextProps>;

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const VirtualizerContextProvider = VirtualizerContext.Provider;

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const useVirtualizerContext_unstable = (): VirtualizerContextProps => {
  return React.useContext(VirtualizerContext);
};

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const useVirtualizerContextState_unstable = (
  passedContext?: VirtualizerContextProps,
): DynamicVirtualizerContextProps => {
  const virtualizerContext = useVirtualizerContext_unstable();
  const [_contextIndex, _setContextIndex] = React.useState<number>(-1);
  const childProgressiveSizes = React.useRef<number[]>([]);

  /* We respect any wrapped providers while also ensuring defaults or passed through
   * Order of usage -> Passed Prop -> Provider Context -> Internal State default
   */
  const context = React.useMemo(
    () => ({
      contextIndex: passedContext?.contextIndex ?? virtualizerContext?.contextIndex ?? _contextIndex,
      setContextIndex: passedContext?.setContextIndex ?? virtualizerContext?.setContextIndex ?? _setContextIndex,
      childProgressiveSizes,
    }),
    [_contextIndex, passedContext, virtualizerContext],
  );

  return context;
};
