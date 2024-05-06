import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavDrawerBodyProps, NavDrawerBodyState } from './NavDrawerBody.types';

/**
 * Create the state required to render NavDrawerBody.
 *
 * The returned state can be modified with hooks such as useNavDrawerBodyStyles_unstable,
 * before being passed to renderNavDrawerBody_unstable.
 *
 * @param props - props from this instance of NavDrawerBody
 * @param ref - reference to root HTMLDivElement of NavDrawerBody
 */
export const useNavDrawerBody_unstable = (
  props: NavDrawerBodyProps,
  ref: React.Ref<HTMLDivElement>,
): NavDrawerBodyState => {
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
