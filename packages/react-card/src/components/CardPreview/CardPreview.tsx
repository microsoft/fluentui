import * as React from 'react';
import { useCardPreview_unstable } from './useCardPreview';
import type { CardPreviewProps } from './CardPreview.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Component to render image previews of documents or articles in a Card component.
 */
export const CardPreview: ForwardRefComponent<CardPreviewProps> = React.forwardRef((props, ref) => {
  const [state, render] = useCardPreview_unstable(props, ref);
  return render(state);
});

CardPreview.displayName = 'CardPreview';
