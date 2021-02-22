import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider/lib/compat/index';
import { useFocusRects } from '@fluentui/utilities';
import { useCardSection, CardSectionProps } from '../../CardSection';
import { useCardFooterClasses } from './useCardFooterClasses';

export const CardFooter = React.forwardRef<HTMLElement, CardSectionProps>((props, ref) => {
  const { render, state } = useCardSection(props, ref);

  useCardFooterClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--cardFooter');

  return render(state);
});

CardFooter.displayName = 'CardFooter';
