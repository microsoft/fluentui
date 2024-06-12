import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { CarouselItemProps, CarouselItemState } from './CarouselItem.types';
import { useCarouselContext_unstable } from '../CarouselContext';
import { CAROUSEL_ACTIVE_ITEM, CAROUSEL_ITEM } from '../constants';

export const useCarouselItem_unstable = (
  props: CarouselItemProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselItemState => {
  const { value } = props;

  const visible = useCarouselContext_unstable(c => c.value === value);
  const state: CarouselItemState = {
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
