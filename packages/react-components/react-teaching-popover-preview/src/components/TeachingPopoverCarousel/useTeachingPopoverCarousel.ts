import * as React from 'react';
import { getIntrinsicElementProps } from '@fluentui/react-utilities';
import { useTeachingPopoverContext_unstable } from '../../TeachingPopoverContext';
import type { TeachingPopoverCarouselProps, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';

export const useTeachingPopoverCarousel_unstable = (
  props: TeachingPopoverCarouselProps,
  ref: React.Ref<HTMLElement>,
): TeachingPopoverCarouselState => {
  const totalPages = useTeachingPopoverContext_unstable(context => context.totalPages);
  const setTotalPages = useTeachingPopoverContext_unstable(context => context.setTotalPages);
  const currentPage = useTeachingPopoverContext_unstable(context => context.currentPage);
  const setCurrentPage = useTeachingPopoverContext_unstable(context => context.setCurrentPage);

  const { as } = props;
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

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    components: {
      root: 'div',
    },
    root: getIntrinsicElementProps(as || 'div', {
      ref: ref as React.Ref<HTMLDivElement>,
      ...props,
      children: currentPageElement,
    }),
  };
};
