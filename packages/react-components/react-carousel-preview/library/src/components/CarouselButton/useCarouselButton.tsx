import { type ARIAButtonElement } from '@fluentui/react-aria';
import { useButton_unstable } from '@fluentui/react-button';
import { ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons';
import { mergeCallbacks, useEventCallback, slot, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import type { CarouselButtonProps, CarouselButtonState } from './CarouselButton.types';
import { CarouselReinitData } from '../Carousel/Carousel.types';

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
  const { navType } = props;

  // Locally tracks the total number of slides, will only update if this changes.
  const [totalSlides, setTotalSlides] = React.useState(0);

  const circular = useCarouselContext(ctx => ctx.circular);
  const selectPageByDirection = useCarouselContext(ctx => ctx.selectPageByDirection);
  const subscribeForValues = useCarouselContext(ctx => ctx.subscribeForValues);

  // TODO: this should be a part of subscribeForValues() handler to avoid pulling "activeIndex"
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

  const handleButtonClick = useEventCallback(mergeCallbacks(handleClick, props.onClick));

  useIsomorphicLayoutEffect(() => {
    return subscribeForValues((data: CarouselReinitData) => {
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
        'aria-disabled': isTrailing,
        ...props,
        onClick: handleButtonClick,
      },
      ref as React.Ref<HTMLButtonElement>,
    ),
  };
};
