import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { CarouselItemProps, CarouselItemState } from './CarouselItem.types';
import { useCarouselContext_unstable } from '../CarouselContext';

export const useCarouselItem_unstable = (
  props: CarouselItemProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselItemState => {
  const { value } = props;
  const visible = useCarouselContext_unstable(c => c.value === value);

  return {
    value,
    visible,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        'data-carousel-item': value,
        'data-carousel-active-item': visible,
        hidden: !visible,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
