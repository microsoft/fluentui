import * as React from 'react';
import { useCardPreview } from './useCardPreview';
import { renderCardPreview } from './renderCardPreview';
import { useCardPreviewStyles } from './useCardPreviewStyles';
import type { CardPreviewProps } from './CardPreview.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Component to render image previews of documents or articles in a Card component.
 */
export const CardPreview: ForwardRefComponent<CardPreviewProps> = React.forwardRef((props, ref) => {
  const state = useCardPreview(props, ref);

  useCardPreviewStyles(state);
  return renderCardPreview(state);
});

CardPreview.displayName = 'CardPreview';
