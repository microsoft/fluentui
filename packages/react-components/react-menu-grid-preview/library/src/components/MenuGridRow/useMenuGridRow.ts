'use client';

import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import {
  useMergedRefs,
  useEventCallback,
  mergeCallbacks,
  getIntrinsicElementProps,
  slot,
} from '@fluentui/react-utilities';

import { useMenuGridContext_unstable } from '../../contexts/menuGridContext';
import { MenuGridRowProps, MenuGridRowState } from './MenuGridRow.types';
import { useValidateNesting } from '../../utils/useValidateNesting';

/**
 * Given user props, returns state and render function for a MenuGridRow.
 */
export function useMenuGridRow_unstable(props: MenuGridRowProps, ref: React.Ref<HTMLDivElement>): MenuGridRowState {
  const validateNestingRef = useValidateNesting('MenuGridRow');
  const { tableRowTabsterAttribute } = useMenuGridContext_unstable();

  const onKeyDownToClick = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      !event.isDefaultPrevented() &&
      (event.key === Enter || event.key === Space) &&
      event.target === event.currentTarget
    ) {
      // event.preventDefault();
      event.currentTarget.click();
    }
  });

  const onKeyDown = useEventCallback(mergeCallbacks(props.onKeyDown, onKeyDownToClick));

  const onClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      props.onClick?.(event);
    }
  });

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
        onKeyDown,
        onClick,
      }),
      { elementType: 'div' },
    ),
  };
}
