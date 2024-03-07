import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavDrawerProps, NavDrawerState } from './NavDrawer.types';

/**
 * Create the state required to render NavDrawer.
 *
 * The returned state can be modified with hooks such as useNavDrawerStyles_unstable,
 * before being passed to renderNavDrawer_unstable.
 *
 * @param props - props from this instance of NavDrawer
 * @param ref - reference to root HTMLDivElement of NavDrawer
 */
export const useNavDrawer_unstable = (props: NavDrawerProps, ref: React.Ref<HTMLDivElement>): NavDrawerState => {
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
