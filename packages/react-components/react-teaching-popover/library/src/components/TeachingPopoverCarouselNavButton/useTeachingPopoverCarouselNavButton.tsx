'use client';

import type * as React from 'react';
import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { useARIAButtonProps } from '@fluentui/react-aria';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, isHTMLElement, slot, useEventCallback } from '@fluentui/react-utilities';

import type {
  TeachingPopoverCarouselNavButtonBaseProps,
  TeachingPopoverCarouselNavButtonBaseState,
  TeachingPopoverCarouselNavButtonProps,
  TeachingPopoverCarouselNavButtonState,
} from './TeachingPopoverCarouselNavButton.types';
import { useCarouselContext_unstable } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { useValueIdContext } from '../TeachingPopoverCarouselNav/valueIdContext';

/**
 * Base hook that builds TeachingPopoverCarouselNavButton state for behavior and structure only.
 * Does not call `useTabsterAttributes` and does not read `appearance` from popover context.
 * @param props - props from this instance of TeachingPopoverCarouselNavButton
 * @param ref - reference to root HTMLElement of TeachingPopoverCarouselNavButton
 */
export const useTeachingPopoverCarouselNavButtonBase_unstable = (
  props: TeachingPopoverCarouselNavButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselNavButtonBaseState => {
  const { onClick, as = 'a' } = props;

  const value = useValueIdContext();

  const selectPageByValue = useCarouselContext_unstable(c => c.selectPageByValue);
  const isSelected = useCarouselContext_unstable(c => c.value === value);

  const handleClick: ARIAButtonSlotProps<'a'>['onClick'] = useEventCallback(event => {
    onClick?.(event);

    if (!event.defaultPrevented && isHTMLElement(event.target)) {
      selectPageByValue(event, value);
    }
  });

  const _carouselButton = slot.always<ARIAButtonSlotProps<'a'>>(
    getIntrinsicElementProps(as, useARIAButtonProps(props.as, props)),
    {
      elementType: 'button',
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        role: 'tab',
        type: 'button',
        'aria-selected': `${!!isSelected}`,
      },
    },
  );

  _carouselButton.onClick = handleClick;

  return {
    isSelected,
    components: {
      root: 'button',
    },
    root: _carouselButton,
  };
};

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
  const baseState = useTeachingPopoverCarouselNavButtonBase_unstable(props, ref);
  const appearance = usePopoverContext_unstable(context => context.appearance);

  const defaultTabProps = useTabsterAttributes({
    focusable: { isDefault: baseState.isSelected },
  });

  return {
    ...baseState,
    // tabster attrs act as defaults: base's root keys win over them, matching the
    // previous `defaultProps` merging behavior in slot.always.
    root: {
      ...defaultTabProps,
      ...baseState.root,
    },
    appearance,
  };
};
