import * as React from 'react';
import { getIntrinsicElementProps, isHTMLElement, mergeCallbacks, slot, useId } from '@fluentui/react-utilities';
import type { CarouselCardButtonProps, CarouselCardButtonState } from './CarouselCardButton.types';
import { CarouselVisibilityChangeEvent } from '../Carousel/Carousel.types';
import { carouselCardClassNames } from '../CarouselCard/useCarouselCardStyles.styles';
import { useCarouselSliderContext } from '../CarouselSlider/CarouselSliderContext';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import { EMBLA_VISIBILITY_EVENT } from '../useEmblaCarousel';

/**
 * Create the state required to render CarouselCardButton.
 *
 * The returned state can be modified with hooks such as useCarouselCardButtonStyles_unstable,
 * before being passed to renderCarouselCardButton_unstable.
 *
 * @param props - props from this instance of CarouselCardButton
 * @param ref - reference to root HTMLDivElement of CarouselCardButton
 */
export const useCarouselCardButton_unstable = (
  props: CarouselCardButtonProps,
  ref: React.Ref<HTMLAnchorElement>,
): CarouselCardButtonState => {
  const { autoSize } = props;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const isMouseEvent = React.useRef<boolean>(false);
  const selectPageByElement = useCarouselContext(ctx => ctx.selectPageByElement);
  const containerRef = useCarouselContext(ctx => ctx.containerRef);
  const { cardFocus } = useCarouselSliderContext();

  const focusAttrProps = cardFocus ? { tabIndex: 0 } : {};

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

  const handlePointerDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.defaultPrevented) {
      isMouseEvent.current = true;
    }
  };

  const handlePointerUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.defaultPrevented) {
      isMouseEvent.current = false;
    }
  };

  const onFocusCapture = mergeCallbacks(props.onFocusCapture, handleFocus);
  const onPointerUp = mergeCallbacks(props.onPointerUp, handlePointerUp);
  const onPointerDown = mergeCallbacks(props.onPointerDown, handlePointerDown);

  return {
    autoSize,
    components: {
      root: 'a',
    },
    root: slot.always(
      getIntrinsicElementProps('a', {
        ref,
        id,
        role: 'button',
        onFocusCapture,
        onPointerUp,
        onPointerDown,
        ...props,
        ...focusAttrProps,
      }),
      { elementType: 'a' },
    ),
  };
};
