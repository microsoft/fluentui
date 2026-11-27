import { slot } from '@fluentui/react-utilities';
import type * as React from 'react';

import type {
  TeachingPopoverCarouselFooterProps,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';
import { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';

export const useTeachingPopoverCarouselFooter_unstable = (
  props: TeachingPopoverCarouselFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselFooterState => {
  // The renderer composes the root children, which React does not allow alongside `dangerouslySetInnerHTML`.
  const {
    layout = 'centered',
    initialStepText,
    finalStepText,
    previous: previousProp,
    next: nextProp,
    dangerouslySetInnerHTML: _dangerouslySetInnerHTML,
    ...rest
  } = props;

  const previous = slot.optional(previousProp, {
    defaultProps: {
      navType: 'prev',
      altText: initialStepText,
    },
    renderByDefault: true,
    elementType: TeachingPopoverCarouselFooterButton,
  });

  const next = slot.always(nextProp, {
    defaultProps: {
      navType: 'next',
      altText: finalStepText,
    },
    elementType: TeachingPopoverCarouselFooterButton,
  });

  return {
    layout,
    components: {
      root: 'div',
      next: TeachingPopoverCarouselFooterButton,
      previous: TeachingPopoverCarouselFooterButton,
    },
    root: slot.always(
      {
        ref,
        ...rest,
      },
      { elementType: 'div' },
    ),
    previous,
    next,
  };
};
