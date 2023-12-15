import { usePopover_unstable } from '@fluentui/react-popover';
import type { TeachingPopoverProps, TeachingPopoverState } from './TeachingPopover.types';
import * as React from 'react';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import { useControllableState } from '@fluentui/react-utilities';

export function countCarouselChildren(children: React.ReactElement | React.ReactElement[]): number {
  const childArray = Array.isArray(children) ? children : [children];
  let childCount = 0;
  childArray.forEach((child: React.ReactElement) => {
    if (!child || !child.props) {
      return;
    }
    if (child.props && child.type === TeachingPopoverCarousel) {
      childCount = React.Children.toArray(child.props.children).length;
    } else if (child.props && child.props.children) {
      const newChildCount = countCarouselChildren(child.props.children);
      if (newChildCount > 0) {
        childCount = newChildCount;
      }
    }
  });

  return childCount;
}

export const useTeachingPopover_unstable = (props: TeachingPopoverProps): TeachingPopoverState => {
  const popoverState = usePopover_unstable(props);
  const { onFinish, onPageChange } = props;

  const carouselPageCount = React.useMemo(() => {
    /* We intentionally run this once prior to render
     * Distinguishes between carousel vs non-carousel visual state
     * Done prior to initial render to prevent UI change post-render
     */
    return countCarouselChildren(props.children);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ToDo: Imperative setCurrentPage hook
  const [currentPage, setCurrentPage] = useControllableState({
    initialState: 0,
    defaultState: props.currentPage,
    state: props.currentPage,
  });

  const [totalPages, setTotalPages] = React.useState<number>(carouselPageCount);

  return {
    ...popoverState,
    appearance: props.appearance,
    withArrow: props.withArrow ?? true,
    currentPage,
    // We trap focus because the default view has buttons/carousel.
    trapFocus: props.trapFocus ?? true,
    setCurrentPage,
    totalPages,
    setTotalPages,
    onFinish,
    onPageChange,
  };
};
