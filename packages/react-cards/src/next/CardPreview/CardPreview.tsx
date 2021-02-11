import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider/lib/compat/index';
import { useFocusRects } from '@fluentui/utilities';
import { CardSectionProps } from '../CardSection/CardSection.types';
import { useCardSection } from '../CardSection/useCardSection';
import { useCardPreviewClasses } from './useCardPreviewClasses';

export const CardPreview = React.forwardRef<HTMLElement, CardSectionProps>((props, ref) => {
  const { render, state } = useCardSection(props, ref);

  useCardPreviewClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--cardPreview');

  return render(state);
});

CardPreview.displayName = 'CardPreview';
