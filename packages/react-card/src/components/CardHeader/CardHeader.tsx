import * as React from 'react';
import { useCardSection, CardSectionProps } from '../../CardSection';
import { useCardHeaderStyles } from './useCardHeaderStyles';

export const CardHeader: React.FunctionComponent<CardSectionProps> = React.forwardRef<HTMLElement, CardSectionProps>(
  (props, ref) => {
    const { render, state } = useCardSection(props, ref);

    useCardHeaderStyles(state);

    return render(state);
  },
);

CardHeader.displayName = 'CardHeader';
