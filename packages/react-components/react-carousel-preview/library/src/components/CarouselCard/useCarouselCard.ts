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
  const { tabIndex } = props;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const selectPageByFocus = useCarouselContext(ctx => ctx.selectPageByFocus);

  const focusAttr = useFocusableGroup({ tabBehavior: 'limited' });
  const isFocusable = tabIndex !== undefined && tabIndex >= 0;
  const focusAttrProps = isFocusable ? focusAttr : {};

  // We attach a unique card id if user does not provide
  const cardId = useId(carouselCardClassNames.root);

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

  const onFocus = React.useCallback(
    (e: React.FocusEvent) => {
      if (isHTMLElement(e.currentTarget)) {
        selectPageByFocus(e, e.currentTarget, true);
      }
    },
    [selectPageByFocus],
  );

  const _onFocus = mergeCallbacks(props.onFocus, onFocus);

  const state: CarouselCardState = {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(elementRef, ref),
        // role: 'tabpanel',
        id: cardId,
        role: isFocusable ? 'tab' : 'tabpanel',
        ...props,
        onFocusCapture: _onFocus,
        ...focusAttrProps,
      }),
      { elementType: 'div' },
    ),
  };

  return state;
};
