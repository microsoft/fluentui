import * as React from 'react';
import { getIntrinsicElementProps, slot, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { CarouselNavProps, CarouselNavState } from './CarouselNav.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { useCarouselContext_unstable } from '../CarouselContext';
import { CarouselReinitData } from '../Carousel/Carousel.types';

/**
 * Create the state required to render CarouselNav.
 *
 * The returned state can be modified with hooks such as useCarouselNavStyles_unstable,
 * before being passed to renderCarouselNav_unstable.
 *
 * @param props - props from this instance of CarouselNav
 * @param ref - reference to root HTMLDivElement of CarouselNav
 */
export const useCarouselNav_unstable = (props: CarouselNavProps, ref: React.Ref<HTMLDivElement>): CarouselNavState => {
  const focusableGroupAttr = useArrowNavigationGroup({
    circular: false,
    axis: 'horizontal',
    memorizeCurrent: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault: true,
  });

  const [totalSlides, setTotalSlides] = React.useState(0);
  const { subscribeForValues } = useCarouselContext_unstable();

  useIsomorphicLayoutEffect(() => {
    subscribeForValues((data: CarouselReinitData) => {
      setTotalSlides(data.nodes.length);
    });
  }, []);

  return {
    totalSlides,
    renderNavButton: props.children,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'tablist',
        tabIndex: 0,
        ...props,
        ...focusableGroupAttr,
        children: null,
      }),
      { elementType: 'div' },
    ),
  };
};
