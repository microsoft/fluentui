import { type ARIAButtonElement, type ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import {
  getIntrinsicElementProps,
  isHTMLElement,
  slot,
  useEventCallback,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import * as React from 'react';

import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import { useCarouselNavContext } from '../CarouselNav/CarouselNavContext';
import { useCarouselNavIndexContext } from '../CarouselNav/CarouselNavIndexContext';
import type { CarouselNavButtonProps, CarouselNavButtonState } from './CarouselNavButton.types';

/**
 * Create the state required to render CarouselNavButton.
 *
 * The returned state can be modified with hooks such as useCarouselNavButtonStyles_unstable,
 * before being passed to renderCarouselNavButton_unstable.
 *
 * @param props - props from this instance of CarouselNavButton
 * @param ref - reference to root HTMLDivElement of CarouselNavButton
 */
export const useCarouselNavButton_unstable = (
  props: CarouselNavButtonProps,
  ref: React.Ref<ARIAButtonElement>,
): CarouselNavButtonState => {
  const { onClick, as = 'button' } = props;

  const { appearance } = useCarouselNavContext();
  const index = useCarouselNavIndexContext();

  const selectPageByIndex = useCarouselContext(ctx => ctx.selectPageByIndex);
  const selected = useCarouselContext(ctx => ctx.activeIndex === index);
  const subscribeForValues = useCarouselContext(ctx => ctx.subscribeForValues);
  const resetAutoplay = useCarouselContext(ctx => ctx.resetAutoplay);

  const handleClick: ARIAButtonSlotProps['onClick'] = useEventCallback(event => {
    onClick?.(event);

    if (!event.defaultPrevented && isHTMLElement(event.target)) {
      selectPageByIndex(event, index);
    }

    // Ensure any autoplay timers are extended/reset
    resetAutoplay();
  });

  const defaultTabProps = useTabsterAttributes({
    focusable: { isDefault: selected },
  });

  const buttonRef = React.useRef<HTMLElement>(undefined);
  const _carouselButton = slot.always<ARIAButtonSlotProps>(
    getIntrinsicElementProps(as, useARIAButtonProps(props.as, props)),
    {
      elementType: 'button',
      defaultProps: {
        ref: useMergedRefs(ref, buttonRef),
        role: 'tab',
        type: 'button',
        'aria-selected': selected,
        ...defaultTabProps,
      },
    },
  );

  useIsomorphicLayoutEffect(() => {
    return subscribeForValues(data => {
      const controlList = data.groupIndexList?.[index] ?? [];
      const _controlledSlideIds = controlList
        .map((slideIndex: number) => {
          return data.slideNodes[slideIndex].id;
        })
        .join(' ');
      if (buttonRef.current) {
        buttonRef.current.setAttribute('aria-controls', _controlledSlideIds);
      }
    });
  }, [index, subscribeForValues]);

  // Override onClick
  _carouselButton.onClick = handleClick;

  const state: CarouselNavButtonState = {
    selected,
    appearance,
    components: {
      root: 'button',
    },
    root: _carouselButton,
  };

  return state;
};
