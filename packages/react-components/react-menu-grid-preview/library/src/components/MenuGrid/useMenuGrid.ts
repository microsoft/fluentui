import * as React from 'react';
import {
  useMergedRefs,
  useEventCallback,
  mergeCallbacks,
  getIntrinsicElementProps,
  slot,
} from '@fluentui/react-utilities';

import { useTableCompositeNavigation } from '@fluentui/react-table';
import type { MenuGridProps, MenuGridState } from './MenuGrid.types';
import { useMenuContext_unstable } from '@fluentui/react-menu';
import { useValidateNesting } from '../../utils/useValidateNesting';

/**
 * Returns the props and state required to render the component
 */
export const useMenuGrid_unstable = (props: MenuGridProps, ref: React.Ref<HTMLDivElement>): MenuGridState => {
  const validateNestingRef = useValidateNesting('MenuGrid');
  const triggerId = useMenuContext_unstable(context => context.triggerId);
  const { tableRowTabsterAttribute, tableTabsterAttribute, onTableKeyDown } = useTableCompositeNavigation();
  const onKeyDown = useEventCallback(mergeCallbacks(props.onKeyDown, onTableKeyDown));

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, validateNestingRef),
        role: 'grid',
        'aria-labelledby': triggerId,
        ...tableTabsterAttribute,
        ...props,
        onKeyDown,
      }),
      { elementType: 'div' },
    ),
    tableRowTabsterAttribute,
  };
};
