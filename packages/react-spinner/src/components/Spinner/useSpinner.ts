import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SpinnerProps, SpinnerSlots, SpinnerState } from './Spinner.types';

/**
 * Array of all shorthand properties listed in SpinnerSlots
 */
export const spinnerShorthandProps: (keyof SpinnerSlots)[] = [
  'root',
  // TODO add shorthand property names
];

/**
 * Create the state required to render Spinner.
 *
 * The returned state can be modified with hooks such as useSpinnerStyles,
 * before being passed to renderSpinner.
 *
 * @param props - props from this instance of Spinner
 * @param ref - reference to root HTMLElement of Spinner
 */
export const useSpinner = (props: SpinnerProps, ref: React.Ref<HTMLElement>): SpinnerState => {
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
