import {
  getIntrinsicElementProps,
  isHTMLElement,
  mergeCallbacks,
  slot,
  useMergedRefs,
  useId,
} from '@fluentui/react-utilities';
import * as React from 'react';

import { EMBLA_VISIBILITY_EVENT } from '../useEmblaCarousel';
import type { CarouselCardProps, CarouselCardState } from './CarouselCard.types';
import { CarouselVisibilityChangeEvent } from '../Carousel/Carousel.types';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { carouselCardClassNames } from './useCarouselCardStyles.styles';

const focusMap = {
  off: undefined,
  'no-tab': 'limited-trap-focus',
  'tab-exit': 'limited',
  'tab-only': 'unlimited',
} as const;

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
  const { focusMode = 'off', autoSize } = props;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const isMouseEvent = React.useRef<boolean>(false);
  const selectPageByElement = useCarouselContext(ctx => ctx.selectPageByElement);

  const focusAttr = useFocusableGroup({
    tabBehavior: focusMap[focusMode],
  });
  const isFocusable = focusMode !== 'off';
  const focusAttrProps = isFocusable ? { ...focusAttr, tabIndex: 0 } : {};

  // We attach a unique card id if user does not provide
  const id = useId(carouselCardClassNames.root, props.id);

  React.useEffect(() => {
    const element = elementRef.current;

    if (element) {
      const listener = (_e: Event) => {
        const event = _e as CarouselVisibilityChangeEvent;
        // When there is no tab index present, only current cards should be visible to accessibility
        if (!isFocusable) {
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
  }, [isFocusable]);

  const handleFocusCapture = React.useCallback(
    (e: React.FocusEvent) => {
      if (!e.defaultPrevented && isHTMLElement(e.currentTarget) && !isMouseEvent.current) {
        selectPageByElement(e, e.currentTarget, true);
      }
    },
    [selectPageByElement],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.defaultPrevented) {
      isMouseEvent.current = true;
    }
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.defaultPrevented) {
      isMouseEvent.current = false;
    }
  };

  const onFocusCapture = mergeCallbacks(props.onFocusCapture, handleFocusCapture);
  const onMouseUp = mergeCallbacks(props.onMouseUp, handleMouseUp);
  const onMouseDown = mergeCallbacks(props.onMouseDown, handleMouseDown);
  const state: CarouselCardState = {
    autoSize,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(elementRef, ref),
        role: 'tabpanel',
        ...props,
        id,
        onFocusCapture,
        onMouseDown,
        onMouseUp,
        ...focusAttrProps,
      }),
      { elementType: 'div' },
    ),
  };

  return state;
};
