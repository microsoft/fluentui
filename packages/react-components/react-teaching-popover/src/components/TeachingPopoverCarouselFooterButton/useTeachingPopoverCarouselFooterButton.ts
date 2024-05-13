import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselFooterButtonProps,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useCarouselContext_unstable } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { useEventCallback } from '@fluentui/react-utilities';
import { useButton_unstable } from '@fluentui/react-button';
import { useCarouselValues_unstable } from '../TeachingPopoverCarousel/Carousel/useCarouselValues';

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
  const { navType, altText } = props;

  const popoverAppearance = usePopoverContext_unstable(context => context.appearance);
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

  let buttonAppearanceType: 'primary' | 'outline' | undefined;

  if (navType === 'next') {
    buttonAppearanceType = popoverAppearance === 'brand' ? undefined : 'primary';
  } else {
    buttonAppearanceType = popoverAppearance === 'brand' ? 'outline' : undefined;
  }

  /* Handle altText on trailing step */
  let buttonChild = props.children;
  if (isTrailing) {
    buttonChild = altText;
  }

  return {
    ...useButton_unstable({ appearance: buttonAppearanceType, ...props }, ref),
    navType,
    popoverAppearance,
    altText,
    // Override useButton root slot
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        appearance: buttonAppearanceType,
        ...props,
        onClick: handleButtonClick,
        children: buttonChild,
      }),
      { elementType: 'button' },
    ),
  };
};
