import * as React from 'react';
import { getIntrinsicElementProps, isHTMLElement, slot, useMergedRefs } from '@fluentui/react-utilities';
import { useFocusWithin } from '@fluentui/react-tabster';
import type {
  TeachingPopoverCarouselNavButtonProps,
  TeachingPopoverCarouselNavButtonState,
} from './TeachingPopoverCarouselNavButton.types';
import { useARIAButtonProps } from '@fluentui/react-aria';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useTeachingPopoverCarouselContext_unstable } from '../TeachingPopoverCarousel/TeachingPopoverCarouselContext';

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
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselNavButtonState => {
  const { navButton, index } = props;
  const appearance = usePopoverContext_unstable(context => context.appearance);
  const setCurrentPage = useTeachingPopoverCarouselContext_unstable(context => context.setCurrentPage);
  const currentPage = useTeachingPopoverCarouselContext_unstable(context => context.currentPage);
  const onPageChange = useTeachingPopoverCarouselContext_unstable(context => context.onPageChange);
  const isSelected = currentPage === index;

  const root = slot.always(
    getIntrinsicElementProps('div', {
      ref: useMergedRefs(useFocusWithin<HTMLDivElement>(), ref),
      ...props,
      onClick: undefined, // We'll pass this to the button if they want to pass as a direct prop
    }),
    { elementType: 'div' },
  );

  const userOnClick = props.onClick;
  const setNewPage = React.useCallback(
    event => {
      userOnClick?.(event);
      if (!event.defaultPrevented && isHTMLElement(event.target)) {
        setCurrentPage(index);
        onPageChange?.(event, { event, type: 'click', currentPage: index });
      }
    },
    [setCurrentPage, index, onPageChange, userOnClick],
  );

  const _carouselIcon = slot.always(navButton, {
    elementType: 'button',
    defaultProps: {
      type: 'button',
      onClick: setNewPage,
    },
  });

  const navIconButtonShorthand = useARIAButtonProps('button', _carouselIcon);

  const state: TeachingPopoverCarouselNavButtonState = {
    isSelected,
    appearance,
    components: {
      root: 'div',
      navButton: 'button',
    },
    root,
    navButton: navIconButtonShorthand,
  };

  return state;
};
