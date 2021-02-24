import * as React from 'react';
import { useFocusRects } from '@fluentui/utilities';
import { useCardSection, CardSectionProps } from '../../CardSection';
import { useCardFooterClasses } from './useCardFooterClasses';

export const CardFooter = React.forwardRef<HTMLElement, CardSectionProps>((props, ref) => {
  const { render, state } = useCardSection(props, ref);

  useCardFooterClasses(state);
  useFocusRects(state.ref);

  return render(state);
});

CardFooter.displayName = 'CardFooter';
