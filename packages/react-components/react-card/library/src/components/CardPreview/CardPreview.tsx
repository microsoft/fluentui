import * as React from 'react';
import { useCardPreview_unstable } from './useCardPreview';
import { renderCardPreview_unstable } from './renderCardPreview';
import { useCardPreviewStyles_unstable } from './useCardPreviewStyles.styles';
import type { CardPreviewProps } from './CardPreview.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Component to render image previews of documents or articles in a Card component.
 */
export const CardPreview: ForwardRefComponent<CardPreviewProps> = React.forwardRef((props, ref) => {
  const state = useCardPreview_unstable(props, ref);

  useCardPreviewStyles_unstable(state);

  useCustomStyleHook_unstable('useCardPreviewStyles_unstable')(state);

  return renderCardPreview_unstable(state);
});

CardPreview.displayName = 'CardPreview';
