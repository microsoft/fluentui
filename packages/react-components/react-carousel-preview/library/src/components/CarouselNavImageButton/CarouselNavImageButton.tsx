import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselNavImageButton_unstable } from './useCarouselNavImageButton';
import { renderCarouselNavImageButton_unstable } from './renderCarouselNavImageButton';
import { useCarouselNavImageButtonStyles_unstable } from './useCarouselNavImageButtonStyles.styles';
import type { CarouselNavImageButtonProps } from './CarouselNavImageButton.types';

/**
 * A variant child element of CarouselNav, a singular image button that displays a
 * preview of card content and will set the carousels active value on click.
 */
export const CarouselNavImageButton: ForwardRefComponent<CarouselNavImageButtonProps> = React.forwardRef(
  (props, ref) => {
    const state = useCarouselNavImageButton_unstable(props, ref);

    useCarouselNavImageButtonStyles_unstable(state);
    // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
    // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
    // useCustomStyleHook_unstable('useCarouselNavImageButtonStyles_unstable')(state);
    return renderCarouselNavImageButton_unstable(state);
  },
);

CarouselNavImageButton.displayName = 'CarouselNavImageButton';
