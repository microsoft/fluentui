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
import { useCharacterSearch } from './useCharacterSearch';

/**
 * Given user props, returns state and render function for a MenuGridRow.
 */
export function useMenuGridRow_unstable(props: MenuGridRowProps, ref: React.Ref<HTMLDivElement>): MenuGridRowState {
  const validateNestingRef = useValidateNesting('MenuGridRow');
  const innerRef = React.useRef<HTMLDivElement>(null);
  const { tableRowTabsterAttribute } = useMenuGridContext_unstable();

  const { characterSearchOnKeyDown, characterSearchRef } = useCharacterSearch();

  const onKeyDownToClick = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      !event.isDefaultPrevented() &&
      (event.key === Enter || event.key === Space) &&
      event.target === event.currentTarget
    ) {
      event.currentTarget.click();
    }
  });

  const onKeyDown = useEventCallback(
    mergeCallbacks(props.onKeyDown, mergeCallbacks(onKeyDownToClick, characterSearchOnKeyDown)),
  );

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

  const state: MenuGridRowState = {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, validateNestingRef, innerRef, characterSearchRef),
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

  return state;
}
