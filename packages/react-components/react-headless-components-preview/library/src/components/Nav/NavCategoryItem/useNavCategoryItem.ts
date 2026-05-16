'use client';

import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot, useEventCallback } from '@fluentui/react-utilities';
import { useNavContext_unstable, useNavCategoryContext_unstable } from '@fluentui/react-nav';

import type { NavCategoryItemProps, NavCategoryItemState } from './NavCategoryItem.types';

/**
 * Create the state required to render NavCategoryItem.
 *
 * Headless version — no motion, no default expand icon.
 *
 * @param props - props from this instance of NavCategoryItem
 * @param ref - reference to root HTMLButtonElement of NavCategoryItem
 */
export const useNavCategoryItem = (
  props: NavCategoryItemProps,
  ref: React.Ref<HTMLButtonElement>,
): NavCategoryItemState => {
  const { onClick, expandIcon, icon } = props;

  const { open, value } = useNavCategoryContext_unstable();

  const { onRequestNavCategoryItemToggle, selectedCategoryValue } = useNavContext_unstable();

  const onNavCategoryItemClick = useEventCallback(
    mergeCallbacks(onClick, event =>
      onRequestNavCategoryItemToggle(event, { type: 'click', event, value: '', categoryValue: value }),
    ),
  );

  const selected = selectedCategoryValue === value && !open;
  const validAriaCurrent: 'page' | 'false' = selected && !open ? 'page' : 'false';

  return {
    open,
    value,
    selected,
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        'aria-current': validAriaCurrent,
        'aria-expanded': open,
        ...props,
        onClick: onNavCategoryItemClick,
      }),
      { elementType: 'button' },
    ),
    icon: slot.optional(icon, {
      elementType: 'span',
    }),
    expandIcon: slot.optional(expandIcon, {
      elementType: 'span',
    }),
    components: {
      root: 'button',
      icon: 'span',
      expandIcon: 'span',
    },
  };
};
