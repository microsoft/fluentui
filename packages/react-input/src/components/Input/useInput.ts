import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { InputProps, InputSlots, InputState } from './Input.types';

/**
 * Array of all shorthand properties listed as the keys of InputSlots
 */
export const inputShorthandProps: (keyof InputSlots)[] = [
  'input',
  'inputWrapper',
  'bookendBefore',
  'bookendAfter',
  'insideStart',
  'insideEnd',
];

/**
 * Create the state required to render Input.
 *
 * The returned state can be modified with hooks such as useInputStyles,
 * before being passed to renderInput.
 *
 * @param props - props from this instance of Input
 * @param ref - reference to root HTMLInputElement of Input
 */
export const useInput = (props: InputProps, ref: React.Ref<HTMLElement>): InputState => {
  return {
    ...props,
    components: {
      input: 'input',
    },
    // temporarily must add fake children to prevent getSlots from substituting nullRender
    input: resolveShorthand(props.input, { optional: false }),
    inputWrapper: resolveShorthand(props.inputWrapper, { optional: false }),
    bookendAfter: resolveShorthand(props.bookendAfter),
    bookendBefore: resolveShorthand(props.bookendBefore),
    insideEnd: resolveShorthand(props.insideEnd),
    insideStart: resolveShorthand(props.insideStart),
    ref,
  };
};
