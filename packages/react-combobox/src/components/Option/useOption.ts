import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { OptionProps, OptionSlots, OptionState } from './Option.types';

/**
 * Array of all shorthand properties listed in OptionSlots
 */
export const optionShorthandProps: (keyof OptionSlots)[] = [
  'root',
  // TODO add shorthand property names
];

/**
 * Create the state required to render Option.
 *
 * The returned state can be modified with hooks such as useOptionStyles_unstable,
 * before being passed to renderOption_unstable.
 *
 * @param props - props from this instance of Option
 * @param ref - reference to root HTMLElement of Option
 */
export const useOption = (props: OptionProps, ref: React.Ref<HTMLElement>): OptionState => {
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
