import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CarouselNavContainerProps, CarouselNavContainerState } from './CarouselNavContainer.types';
import { CarouselAutoplayButton } from '../CarouselAutoplayButton/CarouselAutoplayButton';
import { CarouselButton } from '../CarouselButton/CarouselButton';

/**
 * Create the state required to render CarouselNavContainer.
 *
 * The returned state can be modified with hooks such as useCarouselNavContainerStyles_unstable,
 * before being passed to renderCarouselNavContainer_unstable.
 *
 * @param props - props from this instance of CarouselNavContainer
 * @param ref - reference to root HTMLDivElement of CarouselNavContainer
 */
export const useCarouselNavContainer_unstable = (
  props: CarouselNavContainerProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselNavContainerState => {
  const { layout } = props;
  const next: CarouselNavContainerState['next'] = slot.optional(props.next, {
    defaultProps: {
      navType: 'next',
    },
    elementType: CarouselButton,
    renderByDefault: true,
  });

  const prev: CarouselNavContainerState['prev'] = slot.optional(props.prev, {
    defaultProps: {
      navType: 'prev',
    },
    elementType: CarouselButton,
    renderByDefault: true,
  });

  const autoplay: CarouselNavContainerState['autoplay'] = slot.optional(props.autoplay, {
    renderByDefault: false,
    elementType: CarouselAutoplayButton,
  });

  return {
    layout,
    components: {
      root: 'div',
      next: CarouselButton,
      prev: CarouselButton,
      autoplay: CarouselAutoplayButton,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    next,
    prev,
    autoplay,
  };
};
