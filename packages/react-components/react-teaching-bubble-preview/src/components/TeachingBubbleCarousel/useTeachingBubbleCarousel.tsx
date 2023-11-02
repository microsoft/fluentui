import * as React from 'react';
import { getIntrinsicElementProps } from '@fluentui/react-utilities';
import { useTeachingBubbleContext_unstable } from '../../teachingBubbleContext';
import type { TeachingBubbleCarouselProps, TeachingBubbleCarouselState } from './TeachingBubbleCarousel.types';

export const useTeachingBubbleCarousel_unstable = (
  props: TeachingBubbleCarouselProps,
  ref: React.Ref<HTMLElement>,
): TeachingBubbleCarouselState => {
  const totalPages = useTeachingBubbleContext_unstable(context => context.totalPages);
  const setTotalPages = useTeachingBubbleContext_unstable(context => context.setTotalPages);
  const currentPage = useTeachingBubbleContext_unstable(context => context.currentPage);
  const setCurrentPage = useTeachingBubbleContext_unstable(context => context.setCurrentPage);

  const { as } = props;
  const reactChildArray = React.Children.toArray(props.children);

  React.useEffect(() => {
    // Update total pages if child length changes.
    if (totalPages !== reactChildArray.length) {
      setTotalPages(reactChildArray.length);
    }
  }, [reactChildArray.length, totalPages, setTotalPages]);

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
    }),
  };
};
