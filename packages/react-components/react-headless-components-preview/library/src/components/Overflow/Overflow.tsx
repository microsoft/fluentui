'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { OverflowProps } from './Overflow.types';
import { useOverflow } from './useOverflow';
import { useOverflowContextValues } from './useOverflowContextValues';
import { renderOverflow } from './renderOverflow';

/**
 * Provides an overflow context for `OverflowItem` descendants without any built-in styling.
 */
export const Overflow: ForwardRefComponent<OverflowProps> = React.forwardRef((props, ref) => {
  const state = useOverflow(props, ref);
  const contextValues = useOverflowContextValues(state);

  return renderOverflow(state, contextValues);
});

Overflow.displayName = 'Overflow';
