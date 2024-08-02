import * as React from 'react';
import { slot, useControllableState, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { CarouselAutoplayButtonProps, CarouselAutoplayButtonState } from './CarouselAutoplayButton.types';
import { useToggleButton_unstable } from '@fluentui/react-button';
import { PlayCircleRegular, PauseCircleRegular } from '@fluentui/react-icons';
import { useEventCallback } from '@fluentui/react-utilities';
import { mergeCallbacks } from '@fluentui/react-utilities';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import { ARIAButtonElement } from '@fluentui/react-aria';

/**
 * Create the state required to render CarouselAutoplayButton.
 *
 * The returned state can be modified with hooks such as useCarouselAutoplayButtonStyles_unstable,
 * before being passed to renderCarouselAutoplayButton_unstable.
 *
 * @param props - props from this instance of CarouselAutoplayButton
 * @param ref - reference to root HTMLDivElement of CarouselAutoplayButton
 */
export const useCarouselAutoplayButton_unstable = (
  props: CarouselAutoplayButtonProps,
  ref: React.Ref<ARIAButtonElement>,
): CarouselAutoplayButtonState => {
  const { onAutoplayChange } = props;
  const [autoplay, setAutoplay] = useControllableState({
    state: props.autoplay,
    defaultState: props.defaultAutoplay,
    initialState: true,
  });

  const enableAutoplay = useCarouselContext(ctx => ctx.enableAutoplay);

  useIsomorphicLayoutEffect(() => {
    // Enable/disable autoplay on state change
    enableAutoplay(autoplay);
  }, [autoplay, enableAutoplay]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    if (event.isDefaultPrevented()) {
      return;
    }
    const newValue = !autoplay;
    setAutoplay(newValue);
    onAutoplayChange?.(event, { event, type: 'click', autoplay: newValue });
  };

  const handleButtonClick = useEventCallback(mergeCallbacks(handleClick, props.onClick));

  return {
    autoplay,
    // We lean on react-button class to handle styling and icon enhancements
    ...useToggleButton_unstable(
      {
        icon: slot.optional(props.icon, {
          defaultProps: {
            children: autoplay ? <PauseCircleRegular /> : <PlayCircleRegular />,
          },
          renderByDefault: true,
          elementType: 'span',
        }),
        ...props,
        checked: autoplay,
        onClick: handleButtonClick,
      },
      ref as React.Ref<HTMLButtonElement>,
    ),
  };
};
