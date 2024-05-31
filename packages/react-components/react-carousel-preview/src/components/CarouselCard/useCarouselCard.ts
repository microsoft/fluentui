import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CarouselCardProps, CarouselCardState } from './CarouselCard.types';
import { CAROUSEL_ACTIVE_ITEM, CAROUSEL_ITEM } from '../constants';
import { useCarouselContext_unstable } from '../CarouselContext';
import { useCarouselValues_unstable } from '../useCarouselValues';

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

  const _value = useCarouselContext_unstable(c => c.value);
  const circular = useCarouselContext_unstable(c => c.circular);
  const values = useCarouselValues_unstable(snapshot => snapshot);

  const currentIndex = _value ? values.indexOf(_value) : null;
  let peekDir: 'prev' | 'next' | null | undefined = null;

  if (currentIndex !== null && currentIndex >= 0) {
    let nextValue = currentIndex + 1 < values.length ? values[currentIndex + 1] : null;
    let prevValue = currentIndex - 1 >= 0 ? values[currentIndex - 1] : null;

    if (!nextValue && circular) {
      nextValue = values[0];
    }

    if (!prevValue && circular) {
      prevValue = values[values.length - 1];
    }

    if (nextValue === value || prevValue === value) {
      peekDir = nextValue === value ? 'next' : 'prev';
    }
  }
  const visible = _value === value;
  const state: CarouselCardState = {
    value,
    visible,
    peekDir,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        [CAROUSEL_ITEM]: value,
        [CAROUSEL_ACTIVE_ITEM]: visible,
        hidden: !visible && !peekDir,
        role: 'presentation',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };

  if (!visible && !peekDir) {
    state.root.children = null;
  }

  return state;
};
