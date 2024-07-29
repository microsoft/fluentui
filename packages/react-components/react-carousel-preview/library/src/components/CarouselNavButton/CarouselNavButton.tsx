import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselNavButton_unstable } from './useCarouselNavButton';
import { renderCarouselNavButton_unstable } from './renderCarouselNavButton';
import { useCarouselNavButtonStyles_unstable } from './useCarouselNavButtonStyles.styles';
import type { CarouselNavButtonProps } from './CarouselNavButton.types';

/**
 * The child element of CarouselNav, a singular button that will set the carousels active value on click.
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const CarouselNavButton: ForwardRefComponent<CarouselNavButtonProps> = React.forwardRef((props, ref) => {
  const state = useCarouselNavButton_unstable(props, ref);

  useCarouselNavButtonStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useCarouselNavButtonStyles_unstable')(state);
  return renderCarouselNavButton_unstable(state);
  //FIXME: migrate to fc to remove this assertion
  // Casting is required due to lack of distributive union to support unions on @types/react
  // eslint-disable-next-line deprecation/deprecation
}) as ForwardRefComponent<CarouselNavButtonProps>;

CarouselNavButton.displayName = 'CarouselNavButton';
