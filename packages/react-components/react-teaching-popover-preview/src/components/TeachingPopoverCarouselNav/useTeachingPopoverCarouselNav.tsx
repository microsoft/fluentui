import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import * as React from 'react';

import type {
  TeachingPopoverCarouselNavProps,
  TeachingPopoverCarouselNavState,
} from './TeachingPopoverCarouselNav.types';
import { TeachingPopoverCarouselNavButton } from '../TeachingPopoverCarouselNavButton/index';
import { useCarouselValues_unstable } from '../TeachingPopoverCarousel/Carousel/useCarouselValues';

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
  const values = useCarouselValues_unstable(values => values);

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
