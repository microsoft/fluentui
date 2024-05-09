import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavDrawerHeaderProps, NavDrawerHeaderState } from './NavDrawerHeader.types';

/**
 * Create the state required to render NavDrawerHeader.
 *
 * The returned state can be modified with hooks such as useNavDrawerHeaderStyles_unstable,
 * before being passed to renderNavDrawerHeader_unstable.
 *
 * @param props - props from this instance of NavDrawerHeader
 * @param ref - reference to root HTMLDivElement of NavDrawerHeader
 */
export const useNavDrawerHeader_unstable = (
  props: NavDrawerHeaderProps,
  ref: React.Ref<HTMLDivElement>,
): NavDrawerHeaderState => {
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
