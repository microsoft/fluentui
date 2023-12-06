import * as React from 'react';
import { getIntrinsicElementProps } from '@fluentui/react-utilities';
import type { NavLinkGroupProps, NavLinkGroupState } from './NavLinkGroup.types';

/**
 * Create the state required to render NavLinkGroup.
 *
 * The returned state can be modified with hooks such as useNavLinkGroupStyles_unstable,
 * before being passed to renderNavLinkGroup_unstable.
 *
 * @param props - props from this instance of NavLinkGroup
 * @param ref - reference to root HTMLElement of NavLinkGroup
 */
export const useNavLinkGroup_unstable = (
  props: NavLinkGroupProps,
  ref: React.Ref<HTMLDivElement>,
): NavLinkGroupState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getIntrinsicElementProps('div', {
      ref,
      ...props,
    }),
  };
};
