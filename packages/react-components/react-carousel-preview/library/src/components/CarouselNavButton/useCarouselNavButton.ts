import { ARIAButtonElement, ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import {
  getIntrinsicElementProps,
  isHTMLElement,
  slot,
  useEventCallback,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-utilities';
import * as React from 'react';

import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import { useCarouselNavContext } from '../CarouselNav/CarouselNavContext';
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

  const index = useCarouselNavContext();
  const [controlledSlides, setControlledSlides] = React.useState('');
  const selectPageByIndex = useCarouselContext(ctx => ctx.selectPageByIndex);
  const selected = useCarouselContext(ctx => ctx.activeIndex === index);
  const subscribeForValues = useCarouselContext(ctx => ctx.subscribeForValues);

  const handleClick: ARIAButtonSlotProps['onClick'] = useEventCallback(event => {
    onClick?.(event);

    if (!event.defaultPrevented && isHTMLElement(event.target)) {
      selectPageByIndex(event, index);
    }
  });

  const defaultTabProps = useTabsterAttributes({
    focusable: { isDefault: selected },
  });

  const _carouselButton = slot.always<ARIAButtonSlotProps>(
    getIntrinsicElementProps(as, useARIAButtonProps(props.as, props)),
    {
      elementType: 'button',
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement>,
        role: 'tab',
        type: 'button',
        'aria-selected': selected,
        'aria-controls': controlledSlides,
        ...defaultTabProps,
      },
    },
  );

  useIsomorphicLayoutEffect(() => {
    return subscribeForValues(data => {
      const controlList = data.groupIndexList[index];
      const _controlledSlideIds = controlList
        .map((slideIndex: number) => {
          return data.slideNodes[slideIndex].id;
        })
        .join(' ');
      setControlledSlides(_controlledSlideIds);
    });
  }, [subscribeForValues, index]);

  // Override onClick
  _carouselButton.onClick = handleClick;

  const state: CarouselNavButtonState = {
    selected,
    components: {
      root: 'button',
    },
    root: _carouselButton,
  };

  return state;
};
