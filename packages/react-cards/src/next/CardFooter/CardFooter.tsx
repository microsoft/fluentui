import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider/lib/compat/index';
import { useFocusRects } from '@fluentui/utilities';
import { CardSectionProps } from '../CardSection/CardSection.types';
import { useCardSection } from '../CardSection/useCardSection';
import { useCardFooterClasses } from './useCardFooterClasses';

export const CardFooter = React.forwardRef<HTMLElement, CardSectionProps>((props, ref) => {
  const { render, state } = useCardSection(props, ref);

  useCardFooterClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--cardFooter');

  return render(state);
});

CardFooter.displayName = 'CardFooter';
