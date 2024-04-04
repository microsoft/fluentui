import * as React from 'react';
import { getIntrinsicElementProps, slot, useId } from '@fluentui/react-utilities';
import type { TeachingPopoverBodyProps, TeachingPopoverBodyState } from './TeachingPopoverBody.types';
import { CAROUSEL_ITEM } from '../TeachingPopoverCarousel/Carousel/constants';
/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverBody properties
 * @param ref - reference to root HTMLElement of TeachingPopoverBody
 */
export const useTeachingPopoverBody_unstable = (
  props: TeachingPopoverBodyProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverBodyState => {
  const { mediaLength, value } = props;

  const idValue = useId(CAROUSEL_ITEM, value);

  return {
    components: {
      root: 'div',
      media: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    media: slot.optional(props.media, { elementType: 'span' }),
    mediaLength: mediaLength ?? 'short',
    value: idValue,
  };
};
