import * as React from 'react';
import { getIntrinsicElementProps, isHTMLElement, slot, useEventCallback } from '@fluentui/react-utilities';
import type { CarouselNavButtonProps, CarouselNavButtonState } from './CarouselNavButton.types';
import { useCarouselNavContext } from '../CarouselNav/CarouselNavContext';
import { useCarouselContext_unstable } from '../CarouselContext';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { useTabsterAttributes } from '@fluentui/react-tabster';

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
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): CarouselNavButtonState => {
  const { onClick, as = 'a' } = props;

  const value = useCarouselNavContext();

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

  // Override onClick
  _carouselButton.onClick = handleClick;

  const state: CarouselNavButtonState = {
    isSelected,
    components: {
      root: 'button',
    },
    root: _carouselButton,
  };

  return state;
};
