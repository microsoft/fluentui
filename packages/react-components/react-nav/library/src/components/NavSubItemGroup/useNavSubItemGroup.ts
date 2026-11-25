'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { Collapse } from '@fluentui/react-motion-components-preview';

import type {
  NavSubItemGroupBaseProps,
  NavSubItemGroupBaseState,
  NavSubItemGroupProps,
  NavSubItemGroupState,
} from './NavSubItemGroup.types';
import { useNavCategoryContext_unstable } from '../NavCategoryContext';

/**
 * Create the state required to render NavSubItemGroup.
 *
 * The returned state can be modified with hooks such as useNavSubItemGroupStyles_unstable,
 * before being passed to renderNavSubItemGroup_unstable.
 *
 * @param props - props from this instance of NavSubItemGroup
 * @param ref - reference to root HTMLDivElement of NavSubItemGroup
 */
export const useNavSubItemGroup_unstable = (
  props: NavSubItemGroupProps,
  ref: React.Ref<HTMLDivElement>,
): NavSubItemGroupState => {
  const state = useNavSubItemGroupBase_unstable(props, ref);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      collapseMotion: Collapse,
    },
    collapseMotion: presenceMotionSlot(props.collapseMotion, {
      elementType: Collapse,
      defaultProps: {
        visible: state.open,
        unmountOnExit: true,
      },
    }),
  };
};

/**
 * The base state used in rendering NavSubItemGroup, excluding any design-related properties such as motion props.
 *
 * @param props - props from this instance of NavSubItemGroup
 * @param ref - reference to root HTMLDivElement of NavSubItemGroup
 * @returns - The base state of NavSubItemGroup
 */
export const useNavSubItemGroupBase_unstable = (
  props: NavSubItemGroupBaseProps,
  ref: React.Ref<HTMLDivElement>,
): NavSubItemGroupBaseState => {
  const { open } = useNavCategoryContext_unstable();

  return {
    open,
    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
        ref,
      }),
      { elementType: 'div' },
    ),
  };
};
