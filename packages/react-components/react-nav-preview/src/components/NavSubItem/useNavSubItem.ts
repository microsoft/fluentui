import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavSubItemProps, NavSubItemState } from './NavSubItem.types';

/**
 * Create the state required to render NavSubItem.
 *
 * The returned state can be modified with hooks such as useNavSubItemStyles_unstable,
 * before being passed to renderNavSubItem_unstable.
 *
 * @param props - props from this instance of NavSubItem
 * @param ref - reference to root HTMLDivElement of NavSubItem
 */
export const useNavSubItem_unstable = (props: NavSubItemProps, ref: React.Ref<HTMLDivElement>): NavSubItemState => {
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
