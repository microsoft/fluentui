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
  'use no memo';

  const { circular } = useCarouselContext_unstable();

  // We rely on render-heavy context in circular so we want to avoid if disabled
  // As circular is static, this doesn't break rule of hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return circular ? useCarouselCardCircular(props, ref) : useCarouselCardCore(props, ref);
};

const useCarouselCardCircular = (props: CarouselCardProps, ref: React.Ref<HTMLDivElement>): CarouselCardState => {
  const coreState = useCarouselCardCore(props, ref);
  const { value } = props;
  const { circular } = useCarouselContext_unstable();

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

  // Track if we need to modify position due to circular loop
  const cardDirection = currentActiveIndex < currentSelfIndex ? 'next' : 'prev';
  const directionMod = navDirection === cardDirection ? 0.5 : -0.5;

  let offsetIndex = circular ? loopCount * totalCards : 0;
  if (circular && Math.abs(currentActiveIndex - currentSelfIndex) + directionMod >= totalCards / 2.0) {
    offsetIndex = currentActiveIndex < currentSelfIndex ? offsetIndex - totalCards : offsetIndex + totalCards;
  }

  const state: CarouselCardState = {
    ...coreState,
    offsetIndex,
  };

  return state;
};

const useCarouselCardCore = (props: CarouselCardProps, ref: React.Ref<HTMLDivElement>): CarouselCardState => {
  const { value } = props;
  const { cardWidth } = useCarouselContext_unstable();

  const visible = useCarouselStore_unstable(snapshot => snapshot.activeValue === value);

  const offsetIndex = 0;

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
