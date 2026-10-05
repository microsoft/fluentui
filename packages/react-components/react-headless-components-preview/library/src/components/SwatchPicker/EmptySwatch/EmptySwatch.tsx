'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { EmptySwatchProps } from './EmptySwatch.types';
import { useEmptySwatch } from './useEmptySwatch';
import { renderEmptySwatch } from './renderEmptySwatch';

export const EmptySwatch: ForwardRefComponent<EmptySwatchProps> = React.forwardRef((props, ref) => {
  const state = useEmptySwatch(props, ref);
  return renderEmptySwatch(state);
});

EmptySwatch.displayName = 'EmptySwatch';
