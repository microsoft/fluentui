import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { InputProps, InputSlots, InputState } from './Input.types';

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
  'root',
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
  const { input, inputWrapper, bookendAfter, bookendBefore, insideEnd, insideStart } = props;
  return {
    components: {
      input: 'input',
    },
    // temporarily must add fake children to prevent getSlots from substituting nullRender
    input: resolveShorthand(input, { required: true }),
    inputWrapper: resolveShorthand(inputWrapper, { required: true }),
    bookendAfter: resolveShorthand(bookendAfter),
    bookendBefore: resolveShorthand(bookendBefore),
    insideEnd: resolveShorthand(insideEnd),
    insideStart: resolveShorthand(insideStart),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
