import * as React from 'react';
import { getIntrinsicElementProps, isHTMLElement, slot } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselNavButtonProps,
  TeachingPopoverCarouselNavButtonState,
} from './TeachingPopoverCarouselNavButton.types';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useTeachingPopoverCarouselContext_unstable } from '../TeachingPopoverCarousel/TeachingPopoverCarouselContext';
import { useTabsterAttributes } from '@fluentui/react-tabster';

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
  const setCurrentPage = useTeachingPopoverCarouselContext_unstable(context => context.setCurrentPage);
  const currentPage = useTeachingPopoverCarouselContext_unstable(context => context.currentPage);
  const totalPages = useTeachingPopoverCarouselContext_unstable(context => context.totalPages);
  const onPageChange = useTeachingPopoverCarouselContext_unstable(context => context.onPageChange);
  const isSelected = currentPage === index;

  const setNewPage = React.useCallback(
    event => {
      if (onClick) {
        onClick(event);
      }
      if (!event.defaultPrevented && isHTMLElement(event.target)) {
        setCurrentPage(index);
        onPageChange?.(event, { event, type: 'click', currentPage: index });
      }
    },
    [onClick, setCurrentPage, index, onPageChange],
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
