'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { CardHeaderProps } from './CardHeader.types';
import { useCardHeader } from './useCardHeader';
import { renderCardHeader } from './renderCardHeader';

/**
 * Component to render an image, text and an action in a Card component.
 */
export const CardHeader: ForwardRefComponent<CardHeaderProps> = React.forwardRef((props, ref) => {
  const state = useCardHeader(props, ref);

  return renderCardHeader(state);
});

CardHeader.displayName = 'CardHeader';
