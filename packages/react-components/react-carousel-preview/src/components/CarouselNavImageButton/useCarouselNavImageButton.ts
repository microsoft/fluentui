import * as React from 'react';
import { getIntrinsicElementProps, isHTMLElement, slot, useEventCallback } from '@fluentui/react-utilities';
import type { CarouselNavImageButtonProps, CarouselNavImageButtonState } from './CarouselNavImageButton.types';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { useCarouselContext_unstable } from '../CarouselContext';
import { useCarouselNavContext } from '../CarouselNav/CarouselNavContext';

/**
 * Create the state required to render CarouselNavImageButton.
 *
 * The returned state can be modified with hooks such as useCarouselNavImageButtonStyles_unstable,
 * before being passed to renderCarouselNavImageButton_unstable.
 *
 * @param props - props from this instance of CarouselNavImageButton
 * @param ref - reference to root HTMLButtonElement | HTMLAnchorElement of CarouselNavImageButton
 */
export const useCarouselNavImageButton_unstable = (
  props: CarouselNavImageButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): CarouselNavImageButtonState => {
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

  const image = slot.always(
    getIntrinsicElementProps('img', {
      'aria-hidden': true, // Hidden as button is responsible for navigation description
      alt: '',
      role: 'presentation',
      ...props.image,
    }),
    { elementType: 'img' },
  );

  return {
    components: {
      root: 'button',
      image: 'img',
    },
    root: _carouselButton,
    image,
    isSelected,
  };
};
