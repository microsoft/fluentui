import { useFocusableGroup } from '@fluentui/react-tabster';
import {
  getIntrinsicElementProps,
  isHTMLElement,
  mergeCallbacks,
  slot,
  useMergedRefs,
  useId,
} from '@fluentui/react-utilities';
import * as React from 'react';

import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import type { CarouselVisibilityChangeEvent } from '../Carousel/Carousel.types';
import { EMBLA_VISIBILITY_EVENT } from '../useEmblaCarousel';
import type { CarouselCardProps, CarouselCardState } from './CarouselCard.types';
import { carouselCardClassNames } from './useCarouselCardStyles.styles';
import { useCarouselSliderContext } from '../CarouselSlider/CarouselSliderContext';

/**
 * Create the state required to render CarouselCard.
 *
 * The returned state can be modified with hooks such as useCarouselCardStyles_unstable,
 * before being passed to renderCarouselCard_unstable.
 *
 * @param props - props from this instance of CarouselCard
 * @param ref - reference to root HTMLDivElement of CarouselCard
 */
export const useCarouselCard_unstable = (
  props: CarouselCardProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselCardState => {
  const { autoSize } = props;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const isMouseEvent = React.useRef<boolean>(false);
  const selectPageByElement = useCarouselContext(ctx => ctx.selectPageByElement);
  const containerRef = useCarouselContext(ctx => ctx.containerRef);
  const { cardFocus } = useCarouselSliderContext();

  const focusAttr = useFocusableGroup({
    tabBehavior: 'limited',
  });
  const focusAttrProps = cardFocus ? { ...focusAttr, tabIndex: 0 } : {};

  // We attach a unique card id if user does not provide
  const id = useId(carouselCardClassNames.root, props.id);

  React.useEffect(() => {
    const element = elementRef.current;

    if (element) {
      const listener = (_e: Event) => {
        const event = _e as CarouselVisibilityChangeEvent;
        // When there is no tab index present, only current cards should be visible to accessibility
        if (!cardFocus) {
          const hidden = !event.detail.isVisible;
          element.ariaHidden = hidden.toString();
          element.inert = hidden;
        }
      };

      element.addEventListener(EMBLA_VISIBILITY_EVENT, listener);

      return () => {
        element.removeEventListener(EMBLA_VISIBILITY_EVENT, listener);
      };
    }
  }, [cardFocus]);

  const handleFocus = React.useCallback(
    (e: React.FocusEvent) => {
      if (!e.defaultPrevented && isHTMLElement(e.currentTarget) && !isMouseEvent.current) {
        // We want to prevent any browser scroll intervention for 'offscreen' focus
        containerRef?.current?.scrollTo(0, 0);
        selectPageByElement(e, e.currentTarget, false);
      }
      // Mouse focus event has been consumed
      isMouseEvent.current = false;
    },
    [selectPageByElement, containerRef],
  );

  const handlePointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.defaultPrevented) {
      isMouseEvent.current = true;
    }
  };

  const handlePointerUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.defaultPrevented) {
      isMouseEvent.current = false;
    }
  };

  const onFocusCapture = mergeCallbacks(props.onFocusCapture, handleFocus);
  const onPointerUp = mergeCallbacks(props.onPointerUp, handlePointerUp);
  const onPointerDown = mergeCallbacks(props.onPointerDown, handlePointerDown);

  const state: CarouselCardState = {
    autoSize,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(elementRef, ref),
        role: 'tabpanel',
        tabIndex: cardFocus ? 0 : undefined,
        ...props,
        id,
        onFocusCapture,
        onPointerUp,
        onPointerDown,
        ...focusAttrProps,
      }),
      { elementType: 'div' },
    ),
  };

  return state;
};
