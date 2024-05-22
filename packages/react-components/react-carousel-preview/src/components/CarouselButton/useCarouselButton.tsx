import * as React from 'react';
import { mergeCallbacks, useEventCallback } from '@fluentui/react-utilities';
import type { CarouselButtonProps, CarouselButtonState } from './CarouselButton.types';
import { useButton_unstable } from '@fluentui/react-button';
import { useCarouselContext_unstable } from '../CarouselContext';
import { useCarouselValues_unstable } from '../useCarouselValues';
import { slot } from '@fluentui/react-utilities';
import { ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons';

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
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): CarouselButtonState => {
  const { navType } = props;

  const selectPageByDirection = useCarouselContext_unstable(c => c.selectPageByDirection);
  const values = useCarouselValues_unstable(snapshot => snapshot);
  const activeValue = useCarouselContext_unstable(c => c.value);
  const loop = useCarouselContext_unstable(c => c.loop);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    if (event.isDefaultPrevented()) {
      return;
    }

    selectPageByDirection(event, navType, loop);
  };

  const handleButtonClick = useEventCallback(mergeCallbacks(handleClick, props.onClick));

  const isTrailing = React.useMemo(() => {
    if (!activeValue || loop) {
      return false;
    }

    if (navType === 'prev') {
      return values.indexOf(activeValue) === 0;
    }

    return values.indexOf(activeValue) === values.length - 1;
  }, [navType, activeValue, values, loop]);

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
        ...props,
        onClick: handleButtonClick,
      },
      ref,
    ),
  };
};
