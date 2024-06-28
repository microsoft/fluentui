import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CarouselCardProps, CarouselCardState } from './CarouselCard.types';
import { CAROUSEL_ACTIVE_ITEM, CAROUSEL_ITEM } from '../constants';
import { useCarouselContext_unstable } from '../CarouselContext';
import { useCarouselStore_unstable } from '../useCarouselStore';

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
  const { value } = props;
  const { circular, cardWidth } = useCarouselContext_unstable();

  const visible = useCarouselStore_unstable(snapshot => snapshot.activeValue === value);

  const navDirection = useCarouselStore_unstable(snapshot => snapshot.navDirection);

  const currentActiveIndex: number = useCarouselStore_unstable(snapshot => {
    if (!snapshot.activeValue) {
      return 0;
    }

    return snapshot.values.indexOf(snapshot.activeValue);
  });

  const currentSelfIndex: number = useCarouselStore_unstable(snapshot => {
    if (!snapshot.activeValue) {
      return 0;
    }

    return snapshot.values.indexOf(value);
  });

  const totalCards: number = useCarouselStore_unstable(snapshot => snapshot.values.length);

  const loopCount: number = useCarouselStore_unstable(snapshot => snapshot.loopCount);

  let offsetIndex = circular ? loopCount * totalCards : 0;

  // Track if we need to modify position due to circular loop
  const cardDirection = currentActiveIndex < currentSelfIndex ? 'next' : 'prev';
  const directionMod = navDirection === cardDirection ? 0.5 : -0.5;

  if (circular && Math.abs(currentActiveIndex - currentSelfIndex) + directionMod >= totalCards / 2.0) {
    offsetIndex = currentActiveIndex < currentSelfIndex ? offsetIndex - totalCards : offsetIndex + totalCards;
  }

  const state: CarouselCardState = {
    value,
    visible,
    offsetIndex,
    cardWidth,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        [CAROUSEL_ITEM]: value,
        [CAROUSEL_ACTIVE_ITEM]: visible,
        'aria-hidden': !visible,
        inert: !visible,
        role: 'presentation',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };

  return state;
};
