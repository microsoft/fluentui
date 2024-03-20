import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot, useEventCallback } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselNavProps,
  TeachingPopoverCarouselNavState,
} from './TeachingPopoverCarouselNav.types';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from '@fluentui/keyboard-keys';

import { useFocusableGroup } from '@fluentui/react-tabster';
import { TeachingPopoverCarouselNavButton } from '../TeachingPopoverCarouselNavButton/index';
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
  const setCurrentPage = useTeachingPopoverCarouselContext_unstable(context => context.setCurrentPage);

  let handleKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.isDefaultPrevented()) {
      return;
    }

    let target = ev.target as HTMLDivElement;
    // We only want this enabled at the tablist level, not within
    if (target.role !== 'tablist') {
      return;
    }

    const key = ev.key;
    let _currentPage = currentPage;

    if (key === ArrowUp || key === ArrowLeft) {
      _currentPage = Math.max(0, currentPage - 1);
    } else if (key === ArrowDown || key === ArrowRight) {
      _currentPage = Math.min(totalPages - 1, currentPage + 1);
    }

    if (_currentPage !== currentPage) {
      setCurrentPage(_currentPage);
    }
  });

  handleKeyDown = mergeCallbacks(handleKeyDown, props.onKeyDown);

  // Generate the child TeachingPopoverCarouselNavButton and memoize them to prevent unnecessary re-rendering
  const rootChildren = React.useMemo(() => {
    return Array.from(Array(totalPages), (_, i) => <TeachingPopoverCarouselNavButton key={i} index={i} />);
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
        role: 'tablist',
        tabIndex: 0,
        ...props,
        children: rootChildren,
        onKeyDown: handleKeyDown,
        ...focusableGroupAttr,
      }),
      { elementType: 'div' },
    ),
  };
};
