import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TabProps, TabSlots, TabState } from './Tab.types';

/**
 * Array of all shorthand properties listed in TabSlots
 */
export const tabShorthandProps: (keyof TabSlots)[] = [
  'root',
  // TODO add shorthand property names
];

/**
 * Create the state required to render Tab.
 *
 * The returned state can be modified with hooks such as useTabStyles,
 * before being passed to renderTab.
 *
 * @param props - props from this instance of Tab
 * @param ref - reference to root HTMLElement of Tab
 */
export const useTab = (props: TabProps, ref: React.Ref<HTMLElement>): TabState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add slot types here if needed (div is the default)
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
