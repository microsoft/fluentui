'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useNavCategoryContext_unstable } from '@fluentui/react-nav';

import type { NavSubItemGroupProps, NavSubItemGroupState } from './NavSubItemGroup.types';

/**
 * Create the state required to render NavSubItemGroup.
 *
 * Headless version — conditionally renders based on open state without motion.
 *
 * @param props - props from this instance of NavSubItemGroup
 * @param ref - reference to root HTMLDivElement of NavSubItemGroup
 */
export const useNavSubItemGroup = (
  props: NavSubItemGroupProps,
  ref: React.Ref<HTMLDivElement>,
): NavSubItemGroupState => {
  const { open } = useNavCategoryContext_unstable();

  return {
    open,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        role: 'group',
        ...props,
        ref,
      }),
      { elementType: 'div' },
    ),
  };
};
