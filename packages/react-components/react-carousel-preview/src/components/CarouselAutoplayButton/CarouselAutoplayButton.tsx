import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselAutoplayButton_unstable } from './useCarouselAutoplayButton';
import { renderCarouselAutoplayButton_unstable } from './renderCarouselAutoplayButton';
import { useCarouselAutoplayButtonStyles_unstable } from './useCarouselAutoplayButtonStyles.styles';
import type { CarouselAutoplayButtonProps } from './CarouselAutoplayButton.types';

/**
 * CarouselAutoplayButton component - TODO: add more docs
 */
export const CarouselAutoplayButton: ForwardRefComponent<CarouselAutoplayButtonProps> = React.forwardRef(
  (props, ref) => {
    const state = useCarouselAutoplayButton_unstable(props, ref);

    useCarouselAutoplayButtonStyles_unstable(state);
    // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
    // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
    // useCustomStyleHook_unstable('useCarouselAutoplayButtonStyles_unstable')(state);
    return renderCarouselAutoplayButton_unstable(state);
  },
);

CarouselAutoplayButton.displayName = 'CarouselAutoplayButton';
