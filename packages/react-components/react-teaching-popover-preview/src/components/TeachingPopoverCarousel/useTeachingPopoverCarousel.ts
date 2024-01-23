import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useTeachingPopoverContext_unstable } from '../../TeachingPopoverContext';
import type { TeachingPopoverCarouselProps, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { Button } from '@fluentui/react-button';
import { TeachingPopoverPageCount } from '../TeachingPopoverPageCount/TeachingPopoverPageCount';

export const useTeachingPopoverCarousel_unstable = (
  props: TeachingPopoverCarouselProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselState => {
  const { carouselLayout = 'centered', carouselType = 'icon', strings } = props;

  const totalPages = useTeachingPopoverContext_unstable(context => context.totalPages);
  const setTotalPages = useTeachingPopoverContext_unstable(context => context.setTotalPages);
  const currentPage = useTeachingPopoverContext_unstable(context => context.currentPage);
  const setCurrentPage = useTeachingPopoverContext_unstable(context => context.setCurrentPage);

  const appearance = useTeachingPopoverContext_unstable(context => context.appearance);

  const reactChildArray = React.Children.toArray(props.children);

  React.useEffect(() => {
    // Update total pages if child length changes.
    if (totalPages !== reactChildArray.length) {
      setTotalPages(reactChildArray.length);
    }
  }, [reactChildArray.length, totalPages, setTotalPages]);

  // Get current pagination child (w/ array safety)
  const currentPageElement =
    currentPage < reactChildArray.length ? reactChildArray[currentPage] : reactChildArray[reactChildArray.length - 1];

  const previous = slot.optional(props.previous, {
    defaultProps: {
      appearance: appearance === 'brand' ? 'outline' : undefined,
      children: currentPage === 0 ? strings.initialStepText : strings.previous,
    },
    renderByDefault: true,
    elementType: Button,
  });
  const next = slot.always(props.next, {
    defaultProps: {
      appearance: appearance === 'brand' ? undefined : 'primary',
      children: currentPage === totalPages - 1 ? strings.finalStepText : strings.next,
    },
    elementType: Button,
  });
  const pageCount = slot.always(props.pageCount, {
    defaultProps: {
      countStyle: carouselType,
      children: carouselType === 'text' ? ` ${strings.separatorText} ` : undefined,
    },
    elementType: TeachingPopoverPageCount,
  });
  const footer = slot.always(props.footer, { elementType: 'div' });

  return {
    appearance,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    carouselLayout,
    components: {
      root: 'div',
      footer: 'div',
      next: Button,
      previous: Button,
      pageCount: TeachingPopoverPageCount,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
        children: currentPageElement,
      }),
      { elementType: 'div' },
    ),
    previous,
    next,
    pageCount,
    footer,
  };
};
