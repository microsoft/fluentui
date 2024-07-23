import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { CarouselNavProps, CarouselNavState } from './CarouselNav.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { useCarouselStore_unstable } from '../useCarouselStore';
import { useCarouselContext_unstable } from '../CarouselContext';

/**
 * Create the state required to render CarouselNav.
 *
 * The returned state can be modified with hooks such as useCarouselNavStyles_unstable,
 * before being passed to renderCarouselNav_unstable.
 *
 * @param props - props from this instance of CarouselNav
 * @param ref - reference to root HTMLDivElement of CarouselNav
 */
export const useCarouselNav_unstable = (props: CarouselNavProps, ref: React.Ref<HTMLDivElement>): CarouselNavState => {
  const focusableGroupAttr = useArrowNavigationGroup({
    circular: false,
    axis: 'horizontal',
    memorizeCurrent: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_hasDefault: true,
  });

  const values: string[][] = [];
  const _values = useCarouselStore_unstable(snapshot => snapshot.values);
  const { groupSize, groupIndexList } = useCarouselContext_unstable();

  if (groupSize !== undefined) {
    const indexing = groupIndexList ?? [];
    indexing.forEach(groupIndexes => {
      const _group: string[] = [];
      groupIndexes.forEach(index => {
        if (index < _values.length) {
          _group.push(_values[index]);
        }
      });
      values.push(_group);
    });
  } else {
    _values.forEach(value => values.push([value]));
  }

  return {
    values,
    renderNavButton: props.children,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'tablist',
        tabIndex: 0,
        ...props,
        ...focusableGroupAttr,
        children: null,
      }),
      { elementType: 'div' },
    ),
  };
};
