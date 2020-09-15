import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useFocusRects } from '@uifabric/utilities';
import { CardSectionProps } from '../CardSection/CardSection.types';
import { useCardSection } from '../CardSection/useCardSection';
import { useCardFooterClasses } from './useCardFooterClasses';

export const CardFooter = React.forwardRef<HTMLElement, CardSectionProps>((props, ref) => {
  const { render, state } = useCardSection(props, ref);

  useCardFooterClasses(state);
  useFocusRects(state.ref as any);
  useInlineTokens(state, '--cardFooter');

  return render(state);
});

CardFooter.displayName = 'CardFooter';
