import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { VirtualizerProps } from './Virtualizer.types';
import { useVirtualizerStyles_unstable } from './useVirtualizerStyles';
import { useVirtualizer_unstable } from './useVirtualizer';
import { renderVirtualizer_unstable } from './renderVirtualizer';

/**
 * Virtualizer wrapper to contain logic within a single component.
 */
export const Virtualizer: ForwardRefComponent<VirtualizerProps> = React.forwardRef((props, ref) => {
  const state = useVirtualizer_unstable(props, ref);

  useVirtualizerStyles_unstable(state);

  return renderVirtualizer_unstable(state);
});

Virtualizer.displayName = 'Virtualizer';
