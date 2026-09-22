'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CardHeaderProps } from './CardHeader.types';
import { renderCardHeader } from './renderCardHeader';
import { useCardHeader } from './useCardHeader';
import { useCardHeaderStyles } from './useCardHeaderStyles.styles';

export const CardHeader: ForwardRefComponent<CardHeaderProps> = React.forwardRef((props, ref) => {
  const state = useCardHeader(props, ref);
  useCardHeaderStyles(state);
  return renderCardHeader(state);
});

CardHeader.displayName = 'CardHeader';
