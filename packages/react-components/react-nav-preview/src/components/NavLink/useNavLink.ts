import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavLinkProps, NavLinkState } from './NavLink.types';

/**
 * Create the state required to render NavLink.
 *
 * The returned state can be modified with hooks such as useNavLinkStyles_unstable,
 * before being passed to renderNavLink_unstable.
 *
 * @param props - props from this instance of NavLink
 * @param ref - reference to root HTMLElement of NavLink
 */
export const useNavLink_unstable = (props: NavLinkProps, ref: React.Ref<HTMLDivElement>): NavLinkState => {
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
