import * as React from 'react';
import { mergeCallbacks, useEventCallback } from '@fluentui/react-utilities';
import type { CarouselButtonProps, CarouselButtonState } from './CarouselButton.types';
import { useButton_unstable } from '@fluentui/react-button';
import { useCarouselContext_unstable } from '../CarouselContext';
import { useCarouselStore_unstable } from '../useCarouselStore';
import { slot } from '@fluentui/react-utilities';
import { ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons';
import { ARIAButtonElement } from '@fluentui/react-aria';

/**
 * Create the state required to render CarouselButton.
 *
 * The returned state can be modified with hooks such as useCarouselButtonStyles_unstable,
 * before being passed to renderCarouselButton_unstable.
 *
 * @param props - props from this instance of CarouselButton
 * @param ref - reference to root HTMLDivElement of CarouselButton
 */
export const useCarouselButton_unstable = (
  props: CarouselButtonProps,
  ref: React.Ref<ARIAButtonElement>,
): CarouselButtonState => {
  const { navType } = props;

  const { circular, selectPageByDirection } = useCarouselContext_unstable();
  const isTrailing = useCarouselStore_unstable(snapshot => {
    if (!snapshot.activeValue || circular) {
      return false;
    }

    if (navType === 'prev') {
      return snapshot.values.indexOf(snapshot.activeValue) === 0;
    }

    return snapshot.values.indexOf(snapshot.activeValue) === snapshot.values.length - 1;
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    if (event.isDefaultPrevented()) {
      return;
    }

    selectPageByDirection(event, navType);
  };

  const handleButtonClick = useEventCallback(mergeCallbacks(handleClick, props.onClick));

  return {
    navType,
    // We lean on react-button class to handle styling and icon enhancements
    ...useButton_unstable(
      {
        icon: slot.optional(props.icon, {
          defaultProps: {
            children: navType === 'next' ? <ChevronRightRegular /> : <ChevronLeftRegular />,
          },
          renderByDefault: true,
          elementType: 'span',
        }),
        disabled: isTrailing,
        'aria-disabled': isTrailing,
        ...props,
        onClick: handleButtonClick,
      },
      ref as React.Ref<HTMLButtonElement>,
    ),
  };
};
