import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import type { CarouselNavProps, CarouselNavState } from './CarouselNav.types';

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
  const { appearance } = props;

  const focusableGroupAttr = useArrowNavigationGroup({
    circular: false,
    axis: 'horizontal',
    memorizeCurrent: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault: true,
  });

  const [totalSlides, setTotalSlides] = React.useState(props.totalSlides ?? 0);
  const subscribeForValues = useCarouselContext(ctx => ctx.subscribeForValues);

  useIsomorphicLayoutEffect(() => {
    return subscribeForValues(data => {
      setTotalSlides(data.navItemsCount);
    });
  }, [subscribeForValues]);

  return {
    totalSlides,
    appearance,
    renderNavButton: props.children,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'tablist',
        ...props,
        ...focusableGroupAttr,
        children: null,
      }),
      { elementType: 'div' },
    ),
  };
};
