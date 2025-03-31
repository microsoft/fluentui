import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselNavImageButton_unstable } from './useCarouselNavImageButton';
import { renderCarouselNavImageButton_unstable } from './renderCarouselNavImageButton';
import { useCarouselNavImageButtonStyles_unstable } from './useCarouselNavImageButtonStyles.styles';
import type { CarouselNavImageButtonProps } from './CarouselNavImageButton.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * A variant child element of CarouselNav, a singular image button that displays a
 * preview of card content and will set the carousels active value on click.
 */
export const CarouselNavImageButton: ForwardRefComponent<CarouselNavImageButtonProps> = React.forwardRef(
  (props, ref) => {
    const state = useCarouselNavImageButton_unstable(props, ref);

    useCarouselNavImageButtonStyles_unstable(state);
    useCustomStyleHook_unstable('useCarouselNavImageButtonStyles_unstable')(state);

    return renderCarouselNavImageButton_unstable(state);
  },
);

CarouselNavImageButton.displayName = 'CarouselNavImageButton';
