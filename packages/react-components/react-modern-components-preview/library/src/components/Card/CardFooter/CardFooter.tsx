'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CardFooterProps } from './CardFooter.types';
import { renderCardFooter } from './renderCardFooter';
import { useCardFooter } from './useCardFooter';
import { useCardFooterStyles } from './useCardFooterStyles.styles';

export const CardFooter: ForwardRefComponent<CardFooterProps> = React.forwardRef((props, ref) => {
  const state = useCardFooter(props, ref);
  useCardFooterStyles(state);
  return renderCardFooter(state);
});

CardFooter.displayName = 'CardFooter';
