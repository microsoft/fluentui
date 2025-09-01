import * as React from 'react';
import { useMergedRefs, getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import { useTableCompositeNavigation } from '@fluentui/react-table';
import type { MenuGridProps, MenuGridState } from './MenuGrid.types';
import { useMenuContext_unstable } from '@fluentui/react-menu';
import { useCheckMenuGridNesting } from './useCheckMenuGridNesting';

/**
 * Returns the props and state required to render the component
 */
export const useMenuGrid_unstable = (props: MenuGridProps, ref: React.Ref<HTMLDivElement>): MenuGridState => {
  const innerRef = React.useRef<HTMLDivElement>(null);
  useCheckMenuGridNesting(innerRef);
  const triggerId = useMenuContext_unstable(context => context.triggerId);
  const { tableRowTabsterAttribute, tableTabsterAttribute, onTableKeyDown } = useTableCompositeNavigation();

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, innerRef),
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
