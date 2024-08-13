import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { CarouselItemProps } from './CarouselItem.types';
import { useCarouselItem_unstable } from './useCarouselItem';
import { renderCarouselItem_unstable } from './renderCarouselItem';

/**
 * Define a CarouselItem, using the `useCarouselItem_unstable` and 'renderCarouselItem_unstable' hooks.
 * It has no styling opinions.
 */
export const CarouselItem: ForwardRefComponent<CarouselItemProps> = React.forwardRef((props, ref) => {
  const state = useCarouselItem_unstable(props, ref);

  return renderCarouselItem_unstable(state);
});

CarouselItem.displayName = 'CarouselItem';
