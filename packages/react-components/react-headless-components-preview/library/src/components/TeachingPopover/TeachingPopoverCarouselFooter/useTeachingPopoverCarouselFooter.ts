import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';
import type {
  TeachingPopoverCarouselFooterProps,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';

export const useTeachingPopoverCarouselFooter = (
  props: TeachingPopoverCarouselFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselFooterState => ({
  components: {
    root: 'div',
    previous: TeachingPopoverCarouselFooterButton,
    next: TeachingPopoverCarouselFooterButton,
  },
  root: slot.always(getIntrinsicElementProps('div', { ref, ...props }), { elementType: 'div' }),
  previous: slot.optional(props.previous, {
    defaultProps: { navType: 'prev' },
    renderByDefault: false,
    elementType: TeachingPopoverCarouselFooterButton,
  }),
  next: slot.always(props.next, {
    defaultProps: { navType: 'next' },
    elementType: TeachingPopoverCarouselFooterButton,
  }),
});
