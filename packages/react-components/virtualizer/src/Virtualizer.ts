import * as React from 'react';

import type { VirtualizerProps } from './Virtualizer.types';
import { useVirtualizerStyles_unstable } from './useVirtualizerStyles';
import { useVirtualizer_unstable } from './useVirtualizer';
import { renderVirtualizer_unstable } from './renderVirtualizer';

/**
 * Virtualizer pseudo-component, this wrapper provides a simple interface
 * for reducing the total number of elements rendered in large lists
 */
export const Virtualizer: React.FC<VirtualizerProps> = props => {
  const state = useVirtualizer_unstable(props);
  useVirtualizerStyles_unstable(state);

  return renderVirtualizer_unstable(state);
};

Virtualizer.displayName = 'Virtualizer';
