import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useFocusRects } from '@uifabric/utilities';
import { CardSectionProps } from '../CardSection/CardSection.types';
import { useCardSection } from '../CardSection/useCardSection';
import { useCardHeaderClasses } from './useCardHeaderClasses';

export const CardHeader = React.forwardRef<HTMLElement, CardSectionProps>((props, ref) => {
  const { render, state } = useCardSection(props, ref);

  useCardHeaderClasses(state);
  useFocusRects(state.ref as any);
  useInlineTokens(state, '--cardHeader');

  return render(state);
});

CardHeader.displayName = 'CardHeader';
