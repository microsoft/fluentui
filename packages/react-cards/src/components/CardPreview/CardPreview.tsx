import * as React from 'react';
import { useFocusRects } from '@fluentui/utilities';
import { useCardSection, CardSectionProps } from '../../CardSection';
import { useCardPreviewStyles } from './useCardPreviewStyles';

export const CardPreview: React.FunctionComponent<CardSectionProps> = React.forwardRef<HTMLElement, CardSectionProps>(
  (props, ref) => {
    const { render, state } = useCardSection(props, ref);

    useCardPreviewStyles(state);
    useFocusRects(state.ref);

    return render(state);
  },
);

CardPreview.displayName = 'CardPreview';
