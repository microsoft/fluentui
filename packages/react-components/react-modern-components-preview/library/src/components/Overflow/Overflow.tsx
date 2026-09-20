'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { OverflowProps } from './Overflow.types';
import { renderOverflow } from './renderOverflow';
import { useOverflow } from './useOverflow';
import { useOverflowContextValues } from './useOverflowContextValues';
import { useOverflowStyles } from './useOverflowStyles.styles';

export const Overflow: ForwardRefComponent<OverflowProps> = React.forwardRef((props, ref) => {
  const state = useOverflow(props, ref);
  const contextValues = useOverflowContextValues(state);

  useOverflowStyles(state);

  return renderOverflow(state, contextValues);
});

Overflow.displayName = 'Overflow';
