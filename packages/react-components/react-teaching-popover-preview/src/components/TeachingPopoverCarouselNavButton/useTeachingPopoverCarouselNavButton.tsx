import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, isHTMLElement, slot } from '@fluentui/react-utilities';
import * as React from 'react';

import type {
  TeachingPopoverCarouselNavButtonProps,
  TeachingPopoverCarouselNavButtonState,
} from './TeachingPopoverCarouselNavButton.types';
import { useCarouselContext_unstable } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { useCarouselValues_unstable } from '../TeachingPopoverCarousel/Carousel/useCarouselValues';

/**
 * Create the state required to render TeachingPopoverCarouselNavButton.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverCarouselNavButtonStyles_unstable,
 * before being passed to renderTeachingPopoverCarouselNavButton_unstable.
 *
 * @param props - props from this instance of TeachingPopoverCarouselNavButton
 * @param ref - reference to root HTMLElement of TeachingPopoverCarouselNavButton
 */
export const useTeachingPopoverCarouselNavButton_unstable = (
  props: TeachingPopoverCarouselNavButtonProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): TeachingPopoverCarouselNavButtonState => {
  const { value, onClick, as = 'a' } = props;

  const appearance = usePopoverContext_unstable(context => context.appearance);
  const selectPageByValue = useCarouselContext_unstable(c => c.selectPageByValue);

  const values = useCarouselValues_unstable(values => values);
  let cValue = useCarouselContext_unstable(c => c.value);
  if (cValue === '') {
    cValue = values[0];
  }
  const index = values.indexOf(cValue ?? '');
  const totalPages = values.length;

  const isSelected = cValue === value;

  const setNewPage = React.useCallback(
    event => {
      onClick?.(event);

      if (!event.defaultPrevented && isHTMLElement(event.target)) {
        selectPageByValue(event, value);
      }
    },
    [onClick, value],
  );

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
        'aria-label': `${index + 1} of ${totalPages}`,
        ...defaultTabProps,
      },
    },
  );

  _carouselButton.onClick = setNewPage;

  const state: TeachingPopoverCarouselNavButtonState = {
    isSelected,
    appearance,
    components: {
      root: 'button',
    },
    root: _carouselButton,
  };

  return state;
};
