'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { EmptySwatchProps } from './EmptySwatch.types';
import { renderEmptySwatch } from './renderEmptySwatch';
import { useEmptySwatch } from './useEmptySwatch';
import { useEmptySwatchStyles } from './useEmptySwatchStyles.styles';

export const EmptySwatch: ForwardRefComponent<EmptySwatchProps> = React.forwardRef((props, ref) => {
  const state = useEmptySwatch(props, ref);
  useEmptySwatchStyles(state);
  return renderEmptySwatch(state);
});

EmptySwatch.displayName = 'EmptySwatch';
