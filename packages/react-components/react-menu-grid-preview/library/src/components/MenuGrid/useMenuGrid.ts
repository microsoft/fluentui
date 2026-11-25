'use client';

import * as React from 'react';
import {
  useMergedRefs,
  useEventCallback,
  mergeCallbacks,
  getIntrinsicElementProps,
  slot,
} from '@fluentui/react-utilities';

import { useTableCompositeNavigation } from '@fluentui/react-table';
import {
  useArrowNavigationGroup,
  useFocusFinders,
  useMergedTabsterAttributes_unstable,
  useTabsterAttributes,
} from '@fluentui/react-tabster';
import type { MenuGridProps, MenuGridState } from './MenuGrid.types';
import { useMenuContext_unstable } from '@fluentui/react-menu';
import { useValidateNesting } from '../../utils/useValidateNesting';

/**
 * Returns the props and state required to render the component
 */
export const useMenuGrid_unstable = (props: MenuGridProps, ref: React.Ref<HTMLDivElement>): MenuGridState => {
  const { circular = true, ...restProps } = props;
  const validateNestingRef = useValidateNesting('MenuGrid');
  const innerRef = React.useRef<HTMLDivElement>(null);
  const { findAllFocusable } = useFocusFinders();
  const triggerId = useMenuContext_unstable(context => context.triggerId);

  const { tableRowTabsterAttribute, tableTabsterAttribute, onTableKeyDown } = useTableCompositeNavigation();

  const circularGridAttribute = useArrowNavigationGroup({ circular });
  const mergedTabsterAttribute = useMergedTabsterAttributes_unstable(tableTabsterAttribute, circularGridAttribute);

  const ignoreEnterKeyAttribute = useTabsterAttributes({
    focusable: {
      ignoreKeydown: { Enter: true },
    },
  });
  const mergedRowTabsterAttribute = useMergedTabsterAttributes_unstable(
    tableRowTabsterAttribute,
    ignoreEnterKeyAttribute,
  );

  const onKeyDown = useEventCallback(mergeCallbacks(props.onKeyDown, onTableKeyDown));

  const setFocusByFirstCharacter = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => {
      if (!innerRef.current) {
        return;
      }

      const target = e.target as HTMLElement;

      // Only apply first-letter navigation when event target is a grid row, otherwise it may conflict with other components inside the grid row
      if (target.role !== 'row') {
        return;
      }

      const rows = findAllFocusable(innerRef.current, (el: HTMLElement) => el.role === 'row');

      let startIndex = rows.indexOf(itemEl) + 1;
      if (startIndex === rows.length) {
        startIndex = 0;
      }

      const firstChars = rows.map(row => row.textContent?.charAt(0).toLowerCase());
      const char = e.key.toLowerCase();

      const getIndexFirstChars = (start: number) => {
        for (let i = start; i < firstChars.length; i++) {
          if (char === firstChars[i]) {
            return i;
          }
        }
        return -1;
      };

      // Check remaining rows in the grid
      let index = getIndexFirstChars(startIndex);

      // If not found in remaining rows, check from beginning
      if (index === -1) {
        index = getIndexFirstChars(0);
      }

      // If match was found, focus it
      if (index > -1) {
        rows[index].focus();
      }
    },
    [findAllFocusable],
  );

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, validateNestingRef, innerRef),
        role: 'grid',
        'aria-labelledby': triggerId,
        ...mergedTabsterAttribute,
        ...restProps,
        onKeyDown,
      }),
      { elementType: 'div' },
    ),
    tableRowTabsterAttribute: mergedRowTabsterAttribute,
    setFocusByFirstCharacter,
  };
};
