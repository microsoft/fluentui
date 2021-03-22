import * as React from 'react';
import { useFocusRects } from '@fluentui/utilities';
import { useCardSection, CardSectionProps } from '../../CardSection';
import { useCardFooterStyles } from './useCardFooterStyles';

export const CardFooter: React.FunctionComponent<CardSectionProps> = React.forwardRef<HTMLElement, CardSectionProps>(
  (props, ref) => {
    const { render, state } = useCardSection(props, ref);

    useCardFooterStyles(state);
    useFocusRects(state.ref);

    return render(state);
  },
);

CardFooter.displayName = 'CardFooter';
