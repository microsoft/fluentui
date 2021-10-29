import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { InputProps, InputSlots, InputState } from './Input.types';

/**
 * Array of all shorthand properties listed as the keys of InputSlots
 */
export const inputShorthandProps: (keyof InputSlots)[] = ['input', 'contentBefore', 'contentAfter', 'root'];

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
  const { input, contentAfter, contentBefore, fieldSize, appearance, inline } = props;

  return {
    fieldSize,
    appearance,
    inline,
    components: {
      root: 'span',
      input: 'input',
      contentBefore: 'span',
      contentAfter: 'span',
    },
    input: resolveShorthand(input, { required: true }),
    contentAfter: resolveShorthand(contentAfter),
    contentBefore: resolveShorthand(contentBefore),
    root: getNativeElementProps('span', {
      ref,
      ...props,
    }),
  };
};
