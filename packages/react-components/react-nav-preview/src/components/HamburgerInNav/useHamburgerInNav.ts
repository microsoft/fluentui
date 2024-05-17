import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { HamburgerInNavProps, HamburgerInNavState } from './HamburgerInNav.types';

/**
 * Create the state required to render HamburgerInNav.
 *
 * The returned state can be modified with hooks such as useHamburgerInNavStyles_unstable,
 * before being passed to renderHamburgerInNav_unstable.
 *
 * @param props - props from this instance of HamburgerInNav
 * @param ref - reference to root HTMLDivElement of HamburgerInNav
 */
export const useHamburgerInNav_unstable = (
  props: HamburgerInNavProps,
  ref: React.Ref<HTMLDivElement>,
): HamburgerInNavState => {
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
