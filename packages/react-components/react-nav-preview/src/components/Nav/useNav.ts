import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavProps, NavState } from './Nav.types';

/**
 * Create the state required to render Nav.
 *
 * The returned state can be modified with hooks such as useNavStyles_unstable,
 * before being passed to renderNav_unstable.
 *
 * @param props - props from this instance of Nav
 * @param ref - reference to root HTMLElement of Nav
 */
export const useNav_unstable = (props: NavProps, ref: React.Ref<HTMLDivElement>): NavState => {
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
