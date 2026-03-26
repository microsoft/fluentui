import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type {
  CarouselNavContainerBaseProps,
  CarouselNavContainerBaseState,
  CarouselNavContainerProps,
  CarouselNavContainerState,
} from './CarouselNavContainer.types';
import { CarouselAutoplayButton } from '../CarouselAutoplayButton/CarouselAutoplayButton';
import { CarouselButton } from '../CarouselButton/CarouselButton';
import { Tooltip } from '@fluentui/react-tooltip';

/**
 * Create the base state required to render CarouselNavContainer, without design-only props.
 *
 * @param props - props from this instance of CarouselNavContainer (without layout)
 * @param ref - reference to root HTMLDivElement of CarouselNavContainer
 */
export const useCarouselNavContainerBase_unstable = (
  props: CarouselNavContainerBaseProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselNavContainerBaseState => {
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
    elementType: CarouselAutoplayButton,
    renderByDefault: !!props.autoplay || !!props.autoplayTooltip,
  });

  const nextTooltip: CarouselNavContainerState['nextTooltip'] = slot.optional(props.nextTooltip, {
    defaultProps: {},
    elementType: Tooltip,
    renderByDefault: false,
  });

  const prevTooltip: CarouselNavContainerState['prevTooltip'] = slot.optional(props.prevTooltip, {
    defaultProps: {},
    elementType: Tooltip,
    renderByDefault: false,
  });

  const autoplayTooltip: CarouselNavContainerState['autoplayTooltip'] = slot.optional(props.autoplayTooltip, {
    defaultProps: {},
    elementType: Tooltip,
    renderByDefault: false,
  });

  return {
    components: {
      root: 'div',
      next: CarouselButton,
      prev: CarouselButton,
      autoplay: CarouselAutoplayButton,
      nextTooltip: Tooltip,
      prevTooltip: Tooltip,
      autoplayTooltip: Tooltip,
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
    nextTooltip,
    prevTooltip,
    autoplayTooltip,
  };
};

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

  return {
    ...useCarouselNavContainerBase_unstable(props, ref),
    layout,
  };
};
