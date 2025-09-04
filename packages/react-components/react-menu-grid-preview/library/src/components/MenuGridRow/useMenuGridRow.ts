import * as React from 'react';
import { useMergedRefs, getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import { useMenuGridContext_unstable } from '../../contexts/menuGridContext';
import { MenuGridRowProps, MenuGridRowState } from './MenuGridRow.types';
import { useValidateMenuGridRowNesting } from './useValidateMenuGridRowNesting';

/**
 * Given user props, returns state and render function for a MenuGridRow.
 */
export function useMenuGridRow_unstable(props: MenuGridRowProps, ref: React.Ref<HTMLDivElement>): MenuGridRowState {
  const validateNestingRef = useValidateMenuGridRowNesting();
  const { tableRowTabsterAttribute } = useMenuGridContext_unstable();

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, validateNestingRef),
        role: 'row',
        tabIndex: 0,
        ...tableRowTabsterAttribute,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
}
