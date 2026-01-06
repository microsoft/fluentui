'use client';

import * as React from 'react';
import type { VirtualizerProps } from './Virtualizer.types';
import { useVirtualizerStyles_unstable } from './useVirtualizerStyles.styles';
import { useVirtualizer_unstable } from './useVirtualizer';
import { renderVirtualizer_unstable } from './renderVirtualizer';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Virtualizer pseudo-component, this functional wrapper
 * provides a simple interface for reducing the total number
 * of elements rendered at one time in large lists.
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const Virtualizer: React.FC<VirtualizerProps> = (props: VirtualizerProps) => {
  const state = useVirtualizer_unstable(props);
  useVirtualizerStyles_unstable(state);
  useCustomStyleHook_unstable('useVirtualizerStyles_unstable')(state);

  return renderVirtualizer_unstable(state);
};

Virtualizer.displayName = 'Virtualizer';
