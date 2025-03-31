import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselAutoplayButton_unstable } from './useCarouselAutoplayButton';
import { renderCarouselAutoplayButton_unstable } from './renderCarouselAutoplayButton';
import { useCarouselAutoplayButtonStyles_unstable } from './useCarouselAutoplayButtonStyles.styles';
import type { CarouselAutoplayButtonProps } from './CarouselAutoplayButton.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * If the Carousel is on auto-play, the user may opt into pausing the auto-play feature via the
 * CarouselAutoplayButton which must be present for auto-play to be enabled.
 *
 * If CarouselAutoplayButton is present, auto-play will default to true on mount.
 */
export const CarouselAutoplayButton: ForwardRefComponent<CarouselAutoplayButtonProps> = React.forwardRef(
  (props, ref) => {
    const state = useCarouselAutoplayButton_unstable(props, ref);

    useCarouselAutoplayButtonStyles_unstable(state);
    useCustomStyleHook_unstable('useCarouselAutoplayButtonStyles_unstable')(state);

    return renderCarouselAutoplayButton_unstable(state);
  },
);

CarouselAutoplayButton.displayName = 'CarouselAutoplayButton';
