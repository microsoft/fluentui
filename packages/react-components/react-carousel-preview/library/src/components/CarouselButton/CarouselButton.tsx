import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselButton_unstable } from './useCarouselButton';
import { renderCarouselButton_unstable } from './renderCarouselButton';
import { useCarouselButtonStyles_unstable } from './useCarouselButtonStyles.styles';
import type { CarouselButtonProps } from './CarouselButton.types';

/**
 * A default navigation button that will set value to the next/previous page,
 * driven by it's type 'next' or 'previous'.
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const CarouselButton: ForwardRefComponent<CarouselButtonProps> = React.forwardRef((props, ref) => {
  const state = useCarouselButton_unstable(props, ref);

  useCarouselButtonStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useCarouselButtonStyles_unstable')(state);

  return renderCarouselButton_unstable(state);
  //FIXME: migrate to fc to remove this assertion
  // Casting is required due to lack of distributive union to support unions on @types/react
  // eslint-disable-next-line deprecation/deprecation
}) as ForwardRefComponent<CarouselButtonProps>;

CarouselButton.displayName = 'CarouselButton';
