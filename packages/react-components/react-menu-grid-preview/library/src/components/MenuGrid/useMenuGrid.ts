import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useTableCompositeNavigation } from '@fluentui/react-table';
import type { MenuGridProps, MenuGridState } from './MenuGrid.types';
import { useMenuContext_unstable } from '@fluentui/react-menu';

/**
 * Returns the props and state required to render the component
 */
export const useMenuGrid_unstable = (props: MenuGridProps, ref: React.Ref<HTMLElement>): MenuGridState => {
  const triggerId = useMenuContext_unstable(context => context.triggerId);
  const { tableRowTabsterAttribute, tableTabsterAttribute, onTableKeyDown } = useTableCompositeNavigation();

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
        role: 'grid',
        'aria-labelledby': triggerId,
        onKeyDown: onTableKeyDown,
        ...tableTabsterAttribute,
        ...props,
      }),
      { elementType: 'div' },
    ),
    tableRowTabsterAttribute,
  };
};
