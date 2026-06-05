'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { CardFooterProps } from './CardFooter.types';
import { useCardFooter } from './useCardFooter';
import { renderCardFooter } from './renderCardFooter';

/**
 * Component to render the footer of a Card.
 */
export const CardFooter: ForwardRefComponent<CardFooterProps> = React.forwardRef((props, ref) => {
  const state = useCardFooter(props, ref);

  return renderCardFooter(state);
});

CardFooter.displayName = 'CardFooter';
