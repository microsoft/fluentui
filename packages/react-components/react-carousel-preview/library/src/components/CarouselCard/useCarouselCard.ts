import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import { CAROUSEL_ACTIVE_ITEM, CAROUSEL_ITEM } from '../constants';
import { useCarouselStore_unstable } from '../useCarouselStore';
import type { CarouselCardProps, CarouselCardState } from './CarouselCard.types';

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

  const isActiveIndex = useCarouselStore_unstable(snapshot => snapshot.activeValue === value);
  // TODO: handle
  const visible = true;

  const state: CarouselCardState = {
    value,
    visible,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        [CAROUSEL_ITEM]: value,
        [CAROUSEL_ACTIVE_ITEM]: isActiveIndex,
        'aria-hidden': !visible,
        inert: !visible,
        role: 'presentation',
        ...props,
        // Ensure we set undefined on any tab index that isn't visible
        tabIndex: visible ? props.tabIndex : undefined,
      }),
      { elementType: 'div' },
    ),
  };

  return state;
};
