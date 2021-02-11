import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider/lib/compat/index';
import { useFocusRects } from '@fluentui/utilities';
import { CardSectionProps } from '../CardSection/CardSection.types';
import { useCardSection } from '../CardSection/useCardSection';
import { useCardBodyClasses } from './useCardBodyClasses';

export const CardBody = React.forwardRef<HTMLElement, CardSectionProps>((props, ref) => {
  const { render, state } = useCardSection(props, ref);

  useCardBodyClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--cardBody');

  return render(state);
});

CardBody.displayName = 'CardBody';
