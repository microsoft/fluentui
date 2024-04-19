import * as React from 'react';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, isHTMLElement, slot, useEventCallback } from '@fluentui/react-utilities';

import type {
  TeachingPopoverCarouselNavButtonProps,
  TeachingPopoverCarouselNavButtonState,
} from './TeachingPopoverCarouselNavButton.types';
import { useCarouselContext_unstable } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { useValueIdContext } from '../TeachingPopoverCarouselNav/valueIdContext';

/**
 * Create the state required to render TeachingPopoverCarouselNavButton.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverCarouselNavButtonStyles_unstable,
 * before being passed to renderTeachingPopoverCarouselNavButton_unstable.
 *
 * @param props - props from this instance of TeachingPopoverCarouselNavButton
 * @param ref - reference to root HTMLElement of TeachingPopoverCarouselNavButton
 */
export const useTeachingPopoverCarouselNavButton_unstable = (
  props: TeachingPopoverCarouselNavButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselNavButtonState => {
  const { onClick, as = 'a' } = props;

  const value = useValueIdContext();

  const appearance = usePopoverContext_unstable(context => context.appearance);
  const selectPageByValue = useCarouselContext_unstable(c => c.selectPageByValue);
  const isSelected = useCarouselContext_unstable(c => c.value === value);

  const handleClick: ARIAButtonSlotProps<'a'>['onClick'] = useEventCallback(event => {
    onClick?.(event);

    if (!event.defaultPrevented && isHTMLElement(event.target)) {
      selectPageByValue(event, value);
    }
  });

  const defaultTabProps = useTabsterAttributes({
    focusable: { isDefault: isSelected },
  });

  const _carouselButton = slot.always<ARIAButtonSlotProps<'a'>>(
    getIntrinsicElementProps(as, useARIAButtonProps(props.as, props)),
    {
      elementType: 'button',
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        role: 'tab',
        type: 'button',
        ...defaultTabProps,
      },
    },
  );

  _carouselButton.onClick = handleClick;

  const state: TeachingPopoverCarouselNavButtonState = {
    isSelected,
    appearance,
    components: {
      root: 'button',
    },
    root: _carouselButton,
  };

  return state;
};
