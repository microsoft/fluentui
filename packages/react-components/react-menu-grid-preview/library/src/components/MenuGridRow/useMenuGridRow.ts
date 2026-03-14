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
      event.currentTarget.click();
    }
  });

  const onKeyDown = useEventCallback(mergeCallbacks(props.onKeyDown, onKeyDownToClick));

  const onClick = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    let element = event.target as HTMLElement | null;
    while (element && element !== event.currentTarget) {
      if (element.tabIndex >= 0) {
        return;
      }
      element = element.parentElement;
    }
    props.onClick?.(event);
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
