'use client';

import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselFooterButtonBaseProps,
  TeachingPopoverCarouselFooterButtonBaseState,
  TeachingPopoverCarouselFooterButtonProps,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useCarouselContext_unstable } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { useEventCallback } from '@fluentui/react-utilities';
import { useButton_unstable } from '@fluentui/react-button';
import { useCarouselValues_unstable } from '../TeachingPopoverCarousel/Carousel/useCarouselValues';

/**
 * Base hook that builds TeachingPopoverCarouselFooterButton state for behavior and structure only.
 * Does not read `appearance` from the popover context, does not derive the button's
 * appearance from the navType/popoverAppearance combination, and does not call
 * `useButton_unstable` (the styled hook does that with the right appearance).
 * @param props - props from this instance of TeachingPopoverCarouselFooterButton
 * @param ref - reference to root HTMLDivElement of TeachingPopoverCarouselFooterButton
 */
export const useTeachingPopoverCarouselFooterButtonBase_unstable = (
  props: TeachingPopoverCarouselFooterButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselFooterButtonBaseState => {
  const { navType, altText } = props;

  const selectPageByDirection = useCarouselContext_unstable(c => c.selectPageByDirection);
  const values = useCarouselValues_unstable(snapshot => snapshot);
  const activeValue = useCarouselContext_unstable(c => c.value);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    if (event.isDefaultPrevented()) {
      return;
    }

    selectPageByDirection(event, navType);
  };

  const handleButtonClick = useEventCallback(mergeCallbacks(handleClick, props.onClick));

  const isTrailing = React.useMemo(() => {
    if (!activeValue) {
      return false;
    }

    if (navType === 'prev') {
      return values.indexOf(activeValue) === 0;
    }

    return values.indexOf(activeValue) === values.length - 1;
  }, [navType, activeValue, values]);

  /* Handle altText on trailing step */
  let buttonChild = props.children;
  if (isTrailing) {
    buttonChild = altText;
  }

  return {
    navType,
    altText,
    components: {
      root: 'button',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        ...props,
        onClick: handleButtonClick,
        children: buttonChild,
      }),
      { elementType: 'button' },
    ),
  };
};

/**
 * Create the state required to render TeachingPopoverCarouselFooterButton.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverCarouselFooterButtonStyles_unstable,
 * before being passed to renderTeachingPopoverCarouselFooterButton_unstable.
 *
 * @param props - props from this instance of TeachingPopoverCarouselFooterButton
 * @param ref - reference to root HTMLDivElement of TeachingPopoverCarouselFooterButton
 */
export const useTeachingPopoverCarouselFooterButton_unstable = (
  props: TeachingPopoverCarouselFooterButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselFooterButtonState => {
  const baseState = useTeachingPopoverCarouselFooterButtonBase_unstable(props, ref);
  const popoverAppearance = usePopoverContext_unstable(context => context.appearance);

  let buttonAppearanceType: 'primary' | 'outline' | undefined;

  if (props.navType === 'next') {
    buttonAppearanceType = popoverAppearance === 'brand' ? undefined : 'primary';
  } else {
    buttonAppearanceType = popoverAppearance === 'brand' ? 'outline' : undefined;
  }

  const buttonState = useButton_unstable({ appearance: buttonAppearanceType, ...props }, ref);

  return {
    ...buttonState,
    navType: baseState.navType,
    altText: baseState.altText,
    root: baseState.root,
    popoverAppearance,
  };
};
