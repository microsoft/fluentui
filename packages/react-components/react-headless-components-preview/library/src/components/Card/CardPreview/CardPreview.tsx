'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { CardPreviewProps } from './CardPreview.types';
import { useCardPreview } from './useCardPreview';
import { renderCardPreview } from './renderCardPreview';

/**
 * Component to render a media preview within a Card component.
 */
export const CardPreview: ForwardRefComponent<CardPreviewProps> = React.forwardRef((props, ref) => {
  const state = useCardPreview(props, ref);

  return renderCardPreview(state);
});

CardPreview.displayName = 'CardPreview';
