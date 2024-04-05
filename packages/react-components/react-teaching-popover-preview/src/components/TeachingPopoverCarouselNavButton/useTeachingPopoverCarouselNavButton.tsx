import * as React from 'react';
import { getIntrinsicElementProps, isHTMLElement, slot } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselNavButtonProps,
  TeachingPopoverCarouselNavButtonState,
} from './TeachingPopoverCarouselNavButton.types';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { useCarouselContext_unstable } from '../TeachingPopoverCarousel/Carousel/useCarouselCollection';

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
  const { index, onClick, as = 'a' } = props;
  const appearance = usePopoverContext_unstable(context => context.appearance);

  const setCurrentPage = useCarouselContext_unstable(context => context.setIndex);
  const currentPage = useCarouselContext_unstable(context => context.currentIndex);
  const totalPages = useCarouselContext_unstable(context => context.totalPages);
  const onPageChange = useCarouselContext_unstable(context => context.onPageChange);
  const store = useCarouselContext_unstable(context => context.store);
  const isSelected = currentPage === index;

  const values = store.getSnapshot();

  const setNewPage = React.useCallback(
    event => {
      if (onClick) {
        onClick(event);
      }
      if (!event.defaultPrevented && isHTMLElement(event.target)) {
        setCurrentPage(index);
        onPageChange?.(event, { event, type: 'click', index, value: values[index] });
      }
    },
    [onClick, setCurrentPage, index, onPageChange, values],
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
        'aria-label': `${currentPage + 1} of ${totalPages}`,
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
