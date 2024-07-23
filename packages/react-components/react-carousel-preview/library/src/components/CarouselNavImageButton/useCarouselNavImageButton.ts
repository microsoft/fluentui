import * as React from 'react';
import { getIntrinsicElementProps, isHTMLElement, slot, useEventCallback } from '@fluentui/react-utilities';
import type { CarouselNavImageButtonProps, CarouselNavImageButtonState } from './CarouselNavImageButton.types';
import { ARIAButtonElement, ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { useCarouselContext_unstable } from '../CarouselContext';
import { useCarouselNavContext } from '../CarouselNav/CarouselNavContext';
import { useCarouselStore_unstable } from '../useCarouselStore';

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
  ref: React.Ref<ARIAButtonElement>,
): CarouselNavImageButtonState => {
  const { onClick, as = 'button' } = props;

  const value = useCarouselNavContext();

  const { selectPageByValue } = useCarouselContext_unstable();
  const selected = useCarouselStore_unstable(snapshot => snapshot.activeValue === value);

  const handleClick: ARIAButtonSlotProps['onClick'] = useEventCallback(event => {
    onClick?.(event);

    if (!event.defaultPrevented && isHTMLElement(event.target)) {
      selectPageByValue(event, value);
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
    selected,
  };
};
