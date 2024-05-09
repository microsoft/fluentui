import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavDrawerFooterProps, NavDrawerFooterState } from './NavDrawerFooter.types';

/**
 * Create the state required to render NavDrawerFooter.
 *
 * The returned state can be modified with hooks such as useNavDrawerFooterStyles_unstable,
 * before being passed to renderNavDrawerFooter_unstable.
 *
 * @param props - props from this instance of NavDrawerFooter
 * @param ref - reference to root HTMLDivElement of NavDrawerFooter
 */
export const useNavDrawerFooter_unstable = (
  props: NavDrawerFooterProps,
  ref: React.Ref<HTMLDivElement>,
): NavDrawerFooterState => {
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
