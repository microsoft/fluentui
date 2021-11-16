import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ListboxProps, ListboxSlots, ListboxState } from './Listbox.types';

/**
 * Array of all shorthand properties listed in ListboxSlots
 */
export const listboxShorthandProps: (keyof ListboxSlots)[] = [
  'root',
  // TODO add shorthand property names
];

/**
 * Create the state required to render Listbox.
 *
 * The returned state can be modified with hooks such as useListboxStyles_unstable,
 * before being passed to renderListbox_unstable.
 *
 * @param props - props from this instance of Listbox
 * @param ref - reference to root HTMLElement of Listbox
 */
export const useListbox = (props: ListboxProps, ref: React.Ref<HTMLElement>): ListboxState => {
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
