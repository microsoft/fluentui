import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselNavProps,
  TeachingPopoverCarouselNavState,
} from './TeachingPopoverCarouselNav.types';

import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { TeachingPopoverCarouselNavButton } from '../TeachingPopoverCarouselNavButton/index';
import { useCarouselContext_unstable } from '../TeachingPopoverCarousel/Carousel/CarouselContext';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverCarouselNav properties
 * @param ref - reference to root HTMLElement of TeachingPopoverCarouselNav
 */
export const useTeachingPopoverCarouselNav_unstable = (
  props: TeachingPopoverCarouselNavProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselNavState => {
  const focusableGroupAttr = useArrowNavigationGroup({
    circular: false,
    axis: 'horizontal',
    memorizeCurrent: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault: true,
  });

  const store = useCarouselContext_unstable(c => c.store);
  const values = useSyncExternalStore(store.subscribe, () => store.getSnapshot());

  // Generate the child TeachingPopoverCarouselNavButton and memoize them to prevent unnecessary re-rendering
  const rootChildren = React.useMemo(() => {
    return Array.from(Array(values.length), (_, i) => <TeachingPopoverCarouselNavButton key={i} value={values[i]} />);
  }, [values]);

  return {
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
        ...focusableGroupAttr,
      }),
      { elementType: 'div' },
    ),
  };
};
