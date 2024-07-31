import {
  getIntrinsicElementProps,
  isHTMLElement,
  mergeCallbacks,
  slot,
  useMergedRefs,
} from '@fluentui/react-utilities';
import * as React from 'react';

import { EMBLA_VISIBILITY_EVENT } from '../useEmblaCarousel';
import type { CarouselCardProps, CarouselCardState } from './CarouselCard.types';
import { CarouselVisibilityChangeEvent } from '../Carousel/Carousel.types';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import { useFocusableGroup } from '@fluentui/react-tabster';

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
  const elementRef = React.useRef<HTMLDivElement>(null);
  const selectPageByFocus = useCarouselContext(ctx => ctx.selectPageByFocus);

  const groupperAttr = useFocusableGroup({ tabBehavior: 'limited-trap-focus' });

  React.useEffect(() => {
    const element = elementRef.current;

    if (element) {
      const listener = (_e: Event) => {
        const event = _e as CarouselVisibilityChangeEvent;
        // const hidden = !event.detail.isVisible;
        // element.ariaHidden = hidden.toString();
        // element.inert = hidden;
        element.ariaSelected = event.detail.isVisible.toString();
      };

      element.addEventListener(EMBLA_VISIBILITY_EVENT, listener);

      return () => {
        element.removeEventListener(EMBLA_VISIBILITY_EVENT, listener);
      };
    }
  }, []);

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
        role: 'presentation',
        ...props,
        onFocus: _onFocus,
        ...groupperAttr,
      }),
      { elementType: 'div' },
    ),
  };

  return state;
};
