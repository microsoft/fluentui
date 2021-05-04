import * as React from 'react';
import { useFocusRects } from '@fluentui/utilities';
import { useCardSection, CardSectionProps } from '../../CardSection';
import { useCardBodyStyles } from './useCardBodyStyles';

export const CardBody: React.FunctionComponent<CardSectionProps> = React.forwardRef<HTMLElement, CardSectionProps>(
  (props, ref) => {
    const { render, state } = useCardSection(props, ref);

    useCardBodyStyles(state);
    useFocusRects(state.ref);

    return render(state);
  },
);

CardBody.displayName = 'CardBody';
