import { type ARIAButtonElement } from '@fluentui/react-aria';
import { useButton_unstable } from '@fluentui/react-button';
import { ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons';
import {
  mergeCallbacks,
  useEventCallback,
  slot,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import * as React from 'react';

import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import type { CarouselButtonProps, CarouselButtonState } from './CarouselButton.types';
import type { CarouselUpdateData } from '../Carousel/Carousel.types';
import { carouselButtonClassNames } from './useCarouselButtonStyles.styles';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

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

  const { dir } = useFluent();
  const buttonRef = React.useRef<HTMLButtonElement>(undefined);
  const circular = useCarouselContext(ctx => ctx.circular);
  const [canLoop, setCanLoop] = React.useState(circular);
  const containerRef = useCarouselContext(ctx => ctx.containerRef);
  const selectPageByDirection = useCarouselContext(ctx => ctx.selectPageByDirection);
  const subscribeForValues = useCarouselContext(ctx => ctx.subscribeForValues);
  const resetAutoplay = useCarouselContext(ctx => ctx.resetAutoplay);

  const isTrailing = useCarouselContext(ctx => {
    if (circular && canLoop) {
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

    const nextIndex = selectPageByDirection(event, navType);

    let _trailing = false;
    if (navType === 'prev') {
      _trailing = nextIndex === 0;
    } else {
      _trailing = nextIndex === totalSlides - 1;
    }

    if (!circular && _trailing && containerRef?.current) {
      // Focus non-disabled element
      const buttonRefs: NodeListOf<HTMLButtonElement> = containerRef.current.querySelectorAll(
        `.${carouselButtonClassNames.root}`,
      );
      buttonRefs.forEach(_buttonRef => {
        if (_buttonRef !== buttonRef.current) {
          _buttonRef.focus();
        }
      });
    }

    resetAutoplay();
  };

  useIsomorphicLayoutEffect(() => {
    return subscribeForValues((data: CarouselUpdateData) => {
      if (data.canLoop !== undefined) {
        // Only update canLoop if it has been defined by the carousel engine
        setCanLoop(data.canLoop);
      }
      setTotalSlides(data.navItemsCount);
    });
  }, [subscribeForValues]);

  const nextArrowIcon = dir === 'ltr' ? <ChevronRightRegular /> : <ChevronLeftRegular />;
  const prevArrowIcon = dir === 'ltr' ? <ChevronLeftRegular /> : <ChevronRightRegular />;

  return {
    navType,
    // We lean on react-button class to handle styling and icon enhancements
    ...useButton_unstable(
      {
        icon: slot.optional(props.icon, {
          defaultProps: {
            children: navType === 'next' ? nextArrowIcon : prevArrowIcon,
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
      useMergedRefs(ref, buttonRef) as React.Ref<HTMLButtonElement>,
    ),
  };
};
