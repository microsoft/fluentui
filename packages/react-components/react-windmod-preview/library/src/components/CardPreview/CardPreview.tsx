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
  return renderCardPreview(useCardPreviewStyles(useCardPreview(props, ref)));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<CardPreviewProps>;

CardPreview.displayName = 'CardPreview';
