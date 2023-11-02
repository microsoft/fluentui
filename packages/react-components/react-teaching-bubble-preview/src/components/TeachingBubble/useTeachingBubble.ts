import { usePopover_unstable } from '@fluentui/react-popover';
import type { TeachingBubbleProps, TeachingBubbleState } from './TeachingBubble.types';
import * as React from 'react';
import { TeachingBubbleCarousel } from '../TeachingBubbleCarousel/TeachingBubbleCarousel';
import { useCallback } from 'react';

export function countCarouselChildren(children: React.ReactNode | React.ReactNode[]): number {
  const childArray = Array.isArray(children) ? children : [children];
  let childCount = 0;
  childArray.forEach(child => {
    if (!child.props) {
      return;
    }
    if (child.type === TeachingBubbleCarousel) {
      childCount = React.Children.toArray(child.props.children).length;
    } else if (child.props.children) {
      const newChildCount = countCarouselChildren(child.props.children);
      if (newChildCount > 0) {
        childCount = newChildCount;
      }
    }
  });

  return childCount;
}

export const useTeachingBubble_unstable = (props: TeachingBubbleProps): TeachingBubbleState => {
  const popoverState = usePopover_unstable(props);
  const { onFinish, onPageChange } = props;

  const carouselPageCount = useCallback(() => {
    /* We intentionally run this once prior to render
     * Distinguishes between carousel vs non-carousel visual state
     * Done prior to initial render to prevent UI change post-render
     */
    return countCarouselChildren(props.children);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ToDo: Imperative setCurrentPage hook
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(carouselPageCount);

  return {
    ...popoverState,
    appearance: props.appearance,
    withArrow: props.withArrow !== undefined ? props.withArrow : true,
    currentPage: props.currentPage !== undefined ? props.currentPage : currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    onFinish,
    onPageChange,
  };
};
