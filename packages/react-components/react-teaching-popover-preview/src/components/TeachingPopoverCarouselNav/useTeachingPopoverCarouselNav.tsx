import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselNavProps,
  TeachingPopoverCarouselNavState,
} from './TeachingPopoverCarouselNav.types';

import { useFocusableGroup } from '@fluentui/react-tabster';
import { TeachingPopoverCarouselNavIcon } from '../TeachingPopoverCarouselNavIcon/index';
import { useTeachingPopoverCarouselContext_unstable } from '../TeachingPopoverCarousel/TeachingPopoverCarouselContext';

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverCarouselNav properties
 * @param ref - reference to root HTMLElement of TeachingPopoverCarouselNav
 */
export const useTeachingPopoverCarouselNav_unstable = (
  props: TeachingPopoverCarouselNavProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselNavState => {
  const focusableGroupAttr = useFocusableGroup({ tabBehavior: 'limited' });
  const totalPages = useTeachingPopoverCarouselContext_unstable(context => context.totalPages);
  const currentPage = useTeachingPopoverCarouselContext_unstable(context => context.currentPage);

  // Generate the child RatingItems and memoize them to prevent unnecessary re-rendering
  const rootChildren = React.useMemo(() => {
    return Array.from(Array(totalPages), (_, i) => <TeachingPopoverCarouselNavIcon index={i} />);
  }, [totalPages]);

  return {
    totalPages,
    currentPage,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'list',
        tabIndex: 0,
        children: rootChildren,
        ...props,
        ...focusableGroupAttr,
      }),
      { elementType: 'div' },
    ),
  };
};
