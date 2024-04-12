import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import * as React from 'react';

import type {
  TeachingPopoverCarouselFooterProps,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';
import { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';

export const useTeachingPopoverCarouselFooter_unstable = (
  props: TeachingPopoverCarouselFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselFooterState => {
  const { layout = 'centered', initialStepText, finalStepText } = props;

  const appearance = usePopoverContext_unstable(context => context.appearance);

  const previous = slot.optional(props.previous, {
    defaultProps: {
      navType: 'prev',
      altText: initialStepText,
    },
    renderByDefault: true,
    elementType: TeachingPopoverCarouselFooterButton,
  });

  const next = slot.always(props.next, {
    defaultProps: {
      navType: 'next',
      altText: finalStepText,
    },
    elementType: TeachingPopoverCarouselFooterButton,
  });

  return {
    appearance,
    layout,
    components: {
      root: 'div',
      next: TeachingPopoverCarouselFooterButton,
      previous: TeachingPopoverCarouselFooterButton,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    previous,
    next,
  };
};
