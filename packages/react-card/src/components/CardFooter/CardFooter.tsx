import * as React from 'react';
import { useCardSection, CardSectionProps } from '../../CardSection';
import { useCardFooterStyles } from './useCardFooterStyles';

export const CardFooter: React.FunctionComponent<CardSectionProps> = React.forwardRef<HTMLElement, CardSectionProps>(
  (props, ref) => {
    const { render, state } = useCardSection(props, ref);

    useCardFooterStyles(state);

    return render(state);
  },
);

CardFooter.displayName = 'CardFooter';
