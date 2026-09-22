'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CardPreviewProps } from './CardPreview.types';
import { renderCardPreview } from './renderCardPreview';
import { useCardPreview } from './useCardPreview';
import { useCardPreviewStyles } from './useCardPreviewStyles.styles';

export const CardPreview: ForwardRefComponent<CardPreviewProps> = React.forwardRef((props, ref) => {
  const state = useCardPreview(props, ref);
  useCardPreviewStyles(state);
  return renderCardPreview(state);
});

CardPreview.displayName = 'CardPreview';
