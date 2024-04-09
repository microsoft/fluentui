import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselCardProps,
  TeachingPopoverCarouselCardState,
} from './TeachingPopoverCarouselCard.types';
/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverCarouselCard properties
 * @param ref - reference to root HTMLElement of TeachingPopoverCarouselCard
 */
export const useTeachingPopoverCarouselCard_unstable = (
  props: TeachingPopoverCarouselCardProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselCardState => {
  const { value } = props;

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    value,
  };
};
