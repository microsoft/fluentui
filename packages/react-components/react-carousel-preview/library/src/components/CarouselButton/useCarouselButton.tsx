import { type ARIAButtonElement } from '@fluentui/react-aria';
import { useButton_unstable } from '@fluentui/react-button';
import { ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons';
import { mergeCallbacks, useEventCallback, slot, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import type { CarouselButtonProps, CarouselButtonState } from './CarouselButton.types';
import type { CarouselUpdateData } from '../Carousel/Carousel.types';

/**
 * Create the state required to render CarouselButton.
 *
 * The returned state can be modified with hooks such as useCarouselButtonStyles_unstable,
 * before being passed to renderCarouselButton_unstable.
 *
 * @param props - props from this instance of CarouselButton
 * @param ref - reference to root HTMLDivElement of CarouselButton
 */
export const useCarouselButton_unstable = (
  props: CarouselButtonProps,
  ref: React.Ref<ARIAButtonElement>,
): CarouselButtonState => {
  const { navType = 'next' } = props;

  // Locally tracks the total number of slides, will only update if this changes.
  const [totalSlides, setTotalSlides] = React.useState(0);

  const circular = useCarouselContext(ctx => ctx.circular);
  const selectPageByDirection = useCarouselContext(ctx => ctx.selectPageByDirection);
  const subscribeForValues = useCarouselContext(ctx => ctx.subscribeForValues);

  const isTrailing = useCarouselContext(ctx => {
    if (ctx.activeIndex === undefined || circular) {
      return false;
    }

    if (navType === 'prev') {
      return ctx.activeIndex === 0;
    }

    return ctx.activeIndex === totalSlides - 1;
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    if (event.isDefaultPrevented()) {
      return;
    }

    selectPageByDirection(event, navType);
  };

  useIsomorphicLayoutEffect(() => {
    return subscribeForValues((data: CarouselUpdateData) => {
      setTotalSlides(data.navItemsCount);
    });
  }, [subscribeForValues]);

  return {
    navType,
    // We lean on react-button class to handle styling and icon enhancements
    ...useButton_unstable(
      {
        icon: slot.optional(props.icon, {
          defaultProps: {
            children: navType === 'next' ? <ChevronRightRegular /> : <ChevronLeftRegular />,
          },
          renderByDefault: true,
          elementType: 'span',
        }),
        disabled: isTrailing,
        tabIndex: isTrailing ? -1 : 0,
        'aria-disabled': isTrailing,
        appearance: 'subtle',
        ...props,
        onClick: useEventCallback(mergeCallbacks(handleClick, props.onClick)),
      },
      ref as React.Ref<HTMLButtonElement>,
    ),
  };
};
