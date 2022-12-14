import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { FoobarProps, FoobarState } from './Foobar.types';

/**
 * Create the state required to render Foobar.
 *
 * The returned state can be modified with hooks such as useFoobarStyles_unstable,
 * before being passed to renderFoobar_unstable.
 *
 * @param props - props from this instance of Foobar
 * @param ref - reference to root HTMLElement of Foobar
 */
export const useFoobar_unstable = (props: FoobarProps, ref: React.Ref<HTMLElement>): FoobarState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
