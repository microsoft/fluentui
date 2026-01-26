import * as React from 'react';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import { MenuGridRowGroupProps, MenuGridRowGroupState } from './MenuGridRowGroup.types';

/**
 * Given user props, returns state and render function for a MenuGridRowGroup.
 */
export function useMenuGridRowGroup_unstable(
  props: MenuGridRowGroupProps,
  ref: React.Ref<HTMLElement>,
): MenuGridRowGroupState {
  const headerId = useId('menu-grid-row-group-header');

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        role: 'rowgroup',
        'aria-labelledby': headerId,
        ...props,
      }),
      { elementType: 'div' },
    ),
    headerId,
  };
}
