'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useTeachingPopoverCarouselFooter as useTeachingPopoverCarouselFooterBase } from '@fluentui/react-headless-components-preview/teaching-popover';
import { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';
import type {
  TeachingPopoverCarouselFooterProps,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';

export const useTeachingPopoverCarouselFooter = (
  props: TeachingPopoverCarouselFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselFooterState => {
  const { layout = 'centered', ...rest } = props;
  const baseState = useTeachingPopoverCarouselFooterBase(rest, ref);
  return {
    ...baseState,
    layout,
    components: {
      root: 'div',
      previous: TeachingPopoverCarouselFooterButton,
      next: TeachingPopoverCarouselFooterButton,
    },
    root: { ...baseState.root, 'data-layout': layout },
    previous: slot.optional(props.previous, {
      defaultProps: { navType: 'prev' },
      renderByDefault: false,
      elementType: TeachingPopoverCarouselFooterButton,
    }),
    next: slot.always(props.next, {
      defaultProps: { navType: 'next' },
      elementType: TeachingPopoverCarouselFooterButton,
    }),
  } as TeachingPopoverCarouselFooterState;
};
