import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';
import type {
  TeachingPopoverCarouselFooterProps,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';

export const useTeachingPopoverCarouselFooter = (
  props: TeachingPopoverCarouselFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselFooterState => {
  const { previous, next, ...rest } = props;

  return {
    components: {
      root: 'div',
      previous: TeachingPopoverCarouselFooterButton,
      next: TeachingPopoverCarouselFooterButton,
    },
    root: slot.always({ ref, ...rest }, { elementType: 'div' }),
    previous: slot.optional(previous, {
      defaultProps: { navType: 'prev' },
      renderByDefault: false,
      elementType: TeachingPopoverCarouselFooterButton,
    }),
    next: slot.always(next, {
      defaultProps: { navType: 'next' },
      elementType: TeachingPopoverCarouselFooterButton,
    }),
  };
};
