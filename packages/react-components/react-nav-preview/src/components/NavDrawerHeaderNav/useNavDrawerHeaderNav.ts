import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavDrawerHeaderNavProps, NavDrawerHeaderNavState } from './NavDrawerHeaderNav.types';

/**
 * Create the state required to render NavDrawerHeaderNav.
 *
 * The returned state can be modified with hooks such as useNavDrawerHeaderNavStyles_unstable,
 * before being passed to renderNavDrawerHeaderNav_unstable.
 *
 * @param props - props from this instance of NavDrawerHeaderNav
 * @param ref - reference to root HTMLDivElement of NavDrawerHeaderNav
 */
export const useNavDrawerHeaderNav_unstable = (
  props: NavDrawerHeaderNavProps,
  ref: React.Ref<HTMLDivElement>,
): NavDrawerHeaderNavState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
