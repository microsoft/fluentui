import * as React from 'react';
import { useCardPreview } from './useCardPreview';
import { CardPreviewProps } from './CardPreview.types';
import { renderCardPreview } from './renderCardPreview';
import { useCardPreviewStyles } from './useCardPreviewStyles';

/**
 * Component to render image previews of documents or articles in a Card component.
 */
export const CardPreview = React.forwardRef<HTMLElement, CardPreviewProps>((props, ref) => {
  const state = useCardPreview(props, ref);

  useCardPreviewStyles(state);
  return renderCardPreview(state);
});

CardPreview.displayName = 'CardPreview';
