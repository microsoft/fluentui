import * as React from 'react';
import { VirtualizerContextValues, VirtualizerState } from './Virtualizer.types';

export function useVirtualizerContextValues_unstable(state: VirtualizerState): VirtualizerContextValues {
  const { virtualizerStartIndex } = state;

  const virtualizerContext = React.useMemo(() => ({ virtualizerStartIndex }), [virtualizerStartIndex]);

  return {
    virtualizer: virtualizerContext,
  };
}
