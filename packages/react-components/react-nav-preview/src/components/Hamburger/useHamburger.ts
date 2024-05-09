import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { HamburgerProps, HamburgerState } from './Hamburger.types';

/**
 * Create the state required to render Hamburger.
 *
 * The returned state can be modified with hooks such as useHamburgerStyles_unstable,
 * before being passed to renderHamburger_unstable.
 *
 * @param props - props from this instance of Hamburger
 * @param ref - reference to root HTMLDivElement of Hamburger
 */
export const useHamburger_unstable = (props: HamburgerProps, ref: React.Ref<HTMLDivElement>): HamburgerState => {
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
