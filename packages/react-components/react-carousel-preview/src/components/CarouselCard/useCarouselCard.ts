import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CarouselCardProps, CarouselCardState } from './CarouselCard.types';
import { CAROUSEL_ACTIVE_ITEM, CAROUSEL_ITEM } from '../constants';
import { useCarouselContext_unstable } from '../CarouselContext';

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

  const visible = useCarouselContext_unstable(c => c.value === value);
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
        [CAROUSEL_ACTIVE_ITEM]: visible,
        hidden: !visible,
        role: 'presentation',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };

  if (!visible) {
    state.root.children = null;
  }

  return state;
};
