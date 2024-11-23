import type { ARIAButtonElement } from '@fluentui/react-aria';
import { useToggleButton_unstable } from '@fluentui/react-button';
import { PlayCircleRegular, PauseCircleRegular } from '@fluentui/react-icons';
import { mergeCallbacks, slot, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';

import type { CarouselAutoplayButtonProps, CarouselAutoplayButtonState } from './CarouselAutoplayButton.types';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';

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
  const { onCheckedChange, checked, defaultChecked } = props;

  const [autoplay, setAutoplay] = useControllableState({
    state: checked,
    defaultState: defaultChecked,
    initialState: false,
  });
  const enableAutoplay = useCarouselContext(ctx => ctx.enableAutoplay);

  React.useEffect(() => {
    // Initialize carousel autoplay based on button state
    enableAutoplay(autoplay);

    return () => {
      // We uninitialize autoplay if the button gets unmounted.
      enableAutoplay(false);
    };
  }, [autoplay, enableAutoplay]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    if (event.isDefaultPrevented()) {
      return;
    }

    const newValue = !autoplay;

    setAutoplay(newValue);
    onCheckedChange?.(event, { event, type: 'click', checked: newValue });
  };

  return {
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
        onClick: useEventCallback(mergeCallbacks(handleClick, props.onClick)),
      },
      ref as React.Ref<HTMLButtonElement>,
    ),
  };
};
