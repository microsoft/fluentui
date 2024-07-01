import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavDividerProps, NavDividerState } from './NavDivider.types';

/**
 * Create the state required to render NavDivider.
 *
 * The returned state can be modified with hooks such as useNavDividerStyles_unstable,
 * before being passed to renderNavDivider_unstable.
 *
 * @param props - props from this instance of NavDivider
 * @param ref - reference to root HTMLDivElement of NavDivider
 */
export const useNavDivider_unstable = (props: NavDividerProps, ref: React.Ref<HTMLDivElement>): NavDividerState => {
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
