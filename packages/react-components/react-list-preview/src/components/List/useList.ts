import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { ListLayout, ListProps, ListState } from './List.types';

/**
 * Create the state required to render List.
 *
 * The returned state can be modified with hooks such as useListStyles_unstable,
 * before being passed to renderList_unstable.
 *
 * @param props - props from this instance of List
 * @param ref - reference to root HTMLElement of List
 */
export const useList_unstable = (props: ListProps, ref: React.Ref<HTMLElement>): ListState => {
  const {
    layout = ListLayout.Vertical,
    focusableItems = false,
    focusable = false,
    customArrowNavigationOptions,
  } = props;

  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: layout === ListLayout.Grid ? 'grid-linear' : 'both',
    memorizeCurrent: true,
    ...(customArrowNavigationOptions || {}),
  });

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getNativeElementProps('div', {
        ref,
        role: 'list',
        tabIndex: focusable ? 0 : undefined,
        ...arrowNavigationAttributes,
        ...props,
      }),
      { elementType: 'div' },
    ),
    layout,
    // context:
    focusableItems,
  };
};
