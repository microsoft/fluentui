'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderCardPreview, useCardPreview } from '@fluentui/react-headless-components-preview/card';

import type { CardPreviewProps } from './CardPreview.types';
import { useCardPreviewStyles } from './useCardPreviewStyles';

/**
 * CardPreview is used to display a preview of the content of a Card. Windmod CardPreview: the
 * headless card preview decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const CardPreview: ForwardRefComponent<CardPreviewProps> = React.forwardRef((props, ref) => {
  const state = useCardPreview(props, ref);
  const styled = useCardPreviewStyles(state);

  return renderCardPreview(styled);
});

CardPreview.displayName = 'CardPreview';
