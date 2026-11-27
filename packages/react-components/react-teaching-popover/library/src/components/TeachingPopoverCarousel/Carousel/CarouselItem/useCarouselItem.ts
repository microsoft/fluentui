'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { CarouselItemProps, CarouselItemState } from './CarouselItem.types';
import { useCarouselContext_unstable } from '../CarouselContext';
import { CAROUSEL_ACTIVE_ITEM, CAROUSEL_ITEM } from '../constants';

export const useCarouselItem_unstable = (
  props: CarouselItemProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselItemState => {
  // Inactive items render no content, so `dangerouslySetInnerHTML` must not inject any.
  const { value, dangerouslySetInnerHTML: _dangerouslySetInnerHTML, ...rest } = props;

  const visible = useCarouselContext_unstable(c => c.value === value);
  const state: CarouselItemState = {
    value,
    visible,
    components: {
      root: 'div',
    },
    root: slot.always(
      {
        ref,
        [CAROUSEL_ITEM]: value,
        [CAROUSEL_ACTIVE_ITEM]: visible,
        hidden: !visible,
        ...rest,
      },
      { elementType: 'div' },
    ),
  };

  if (!visible) {
    state.root.children = null;
  }

  return state;
};
